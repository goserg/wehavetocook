<template>
  <div class="recipe">
    <Container>
      <h2 v-if="recipe==null">Новый рецепт</h2>
      <h2 v-else>Редактировать</h2>
      <TextInput
        v-model="name"
        placeholder="Название рецепта"
      />
      <TextInput
        v-model="time"
        placeholder="Время приготовления, в минутах"
      />
    </Container>
    <Container>
      <img
        v-if="recipe"
        class="old_img"
        :src="imageURL"
        alt="Изображение из базы данных"
      >
      <h3 v-if="recipe">Заменить картинку:</h3>
      <h3 v-else>Загрузите картинку:</h3>
      <ImageInput
        @change="onFileSelected"
        ref="imageInput"
      />
    </Container>
    <Container>
      <h3>Ингридиенты</h3>
      <div
        v-for="(ingredient, index) in ingredients"
        :key="index"
        class="recipe__ingredient"
      > 
        <TextInput
          placeholder="Ингридиент"
          v-model="ingredient.name"
        />
        <TextInput
          v-model="ingredient.value"
          placeholder="шт."
        />
        <Button
          text
          @click="deleteIngredient(index)"
        >
          ✖
        </Button>
      </div>
      <Button @click="ingredients.push({name: '', value: ''})">
        Добавить
      </Button>
    </Container>
    <Container class="steps">
      <h3>Этапы приготовления</h3>
      <div
        class="steps__step"
        v-for="(step, index) in steps"
        :key="index + step"
      >
        <h4>{{ index }}</h4>
        <div
          class="multiline"
          contenteditable
          v-html="step"
          :value="step"
          @input="onInput(index, $event)"
        ></div>
      </div>
      <Button
        @click="steps.push('')"
      >
        Добавить
      </Button>
    </Container>

    <router-link
      class="submit-container"
      :to="{name: 'main'}"
    >
      <Button
        @click="publish"
        fill
        :disabled="!readyToPublish"
        v-if="!recipe"
      >
        Опубликовать
      </Button>
      <Button
        @click="update"
        fill
        :disabled="!readyToPublish"
        v-else
      >
        Редактировать
      </Button>
    </router-link>
    <router-link
      :to="{name: 'main'}"
    >
      <Button
        float
        @click="clear"
      >
        <svg width="0.7em" viewBox="0 0 16 16" class="bi bi-house" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
          <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
        </svg>
      </Button>
    </router-link>
  </div>
</template>

<script>
import { db, storage } from '../firebase'
import firebase from 'firebase'
import Button from '../components/Button'
import Container from '../components/Container'
import ImageInput from '../components/ImageInput'
import TextInput from '../components/TextInput'

export default {
  components: {
    Button,
    Container,
    ImageInput,
    TextInput
  },
  props: {
    recipe: Object,
    recipe_id: String,
    imageURL: String
  },
  watch: {
    recipe(val) {
      if (val) {
        this.name = val.name
        this.time = val.time
        this.ingredients = val.ingredients
        this.steps = val.process
        storage.ref().child(val.imgURL).getDownloadURL().then(url => {
          this.mainImage = url
        })
      }
    }
  },
  mounted() {
    if (this.recipe) {
      this.name = this.recipe.name
      this.time = this.recipe.time
      this.ingredients = this.recipe.ingredients
      this.steps = this.recipe.process
    }
  },
  data() {
    return {
      name: '',
      time: '',
      ingredients: [],
      steps: [],
      mainImage: null,
      imageChanged: false,
      drawComponent: true
    }
  },
  computed: {
    readyToPublish() {
      return (
        (this.mainImage || !this.imageChanged) &&
        this.name &&
        this.time &&
        this.ingredients.length != 0 &&
        this.steps.length != 0
      )
    }
  },
  methods: {
    deleteIngredient(index) {
      this.ingredients.splice(index, 1)
    },
    onInput(index, e) {
      this.steps[index] = e.target.innerHTML
    },
    publish() {
      storage.ref().child('images/'+this.mainImage.name).put(this.mainImage).then(() => {
        db.collection('recipes').add({
          author: firebase.auth().currentUser.uid,
          ingredients: this.ingredients,
          imgURL: 'images/'+this.mainImage.name,
          name: this.name,
          process: this.steps,
          rating: 0,
          time: this.time,
          likes: [],
          dislikes: []
        })
        this.clear()
        this.$store.commit('updateRecipes')
      })
    },
    update() {
      if (this.imageChanged) {
        fetch(this.mainImage).then(res => res.blob().then(blob => {
          storage.ref().child('images/'+this.name).put(blob).then(() => {
            db.collection('recipes').doc(this.recipe_id).set({
              author: firebase.auth().currentUser.uid,
              ingredients: this.ingredients,
              imgURL: 'images/'+this.name,
              name: this.name,
              process: this.steps,
              time: this.time
            })
            this.clear()
            this.$store.commit('updateRecipes')
          })
        }))
      } else {
        db.collection('recipes').doc(this.recipe_id).set({
          author: firebase.auth().currentUser.uid,
          ingredients: this.ingredients,
          imgURL: this.recipe.imgURL,
          name: this.name,
          process: this.steps,
          time: this.time
        })
          this.clear()
          this.$store.commit('updateRecipes')
      }
    },
    onFileSelected(event) {
      this.mainImage = event
      this.imageChanged = true
    },
    clear() {
      this.name = ''
      this.time = ''
      this.ingredients = []
      this.steps = []
      this.mainImage = null
      this.$refs.imageInput.reset()
      this.imageChanged = false
    }
  }
}
</script>

<style lang="scss" scoped>
.recipe {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__ingredient {
    display: grid;
    grid-template-columns: 3fr 1fr min-content;
    grid-gap: 2px;
    input {
      min-width: 20px;
    }
  }

  .steps {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__step {
      display: flex;
      flex-direction: row;
      h4 {
        margin: 0;
        padding: 0.2rem;
      }
      .multiline {
        outline: 0;
        background: white;
        padding: 0.2rem;
        text-align: left;
        flex-grow: 1;
      }
    }
  }
  .submit-container {
    margin: 1rem;
  }
}
.old_img {
  height: auto;
  width: 100%;
}
</style>