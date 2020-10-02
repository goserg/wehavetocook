<template>
  <div class="detailed">
    <h1>
      {{data.name}}
    </h1>
    <img class="detailed_image" :src="imageURL" alt="картинка">
    <div class="detailed_stats">
      <div class="detailed_stats_author">
        Автор рецепта: {{ authorName }} <img :src="authorImg" alt="аватар автора">
      </div>
    </div>
    <div class="detailed_main">
      <h3>Ингридиенты:</h3>
      <p
        v-for="(ingr, i) in data.ingredients"
        :key="ingr + i"
      >
        {{i+1}}. {{ingr.name}}: {{ingr.value}}
      </p>
      <h3>Рецепт:</h3>
      <p
        v-for="(step, i) in data.process"
        :key="step + i"
      >
        {{i}}. {{step}}
      </p>
    </div>
    <router-link
      :to="{name: 'main'}"
    >
      <Button
        float
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
import { db } from '../firebase'
import Button from '../components/Button'

export default {
  components: {
    Button
  },
  data() {
    return {
      authorImg: '',
      authorName: ''
    }
  },
  props: {
    data: Object,
    imageURL: String
  },
  watch: {
    data() {
      db.collection('users').doc(this.data.author).get().then(doc => {
          if (doc.exists) {
            this.authorImg = doc.data().photoURL
            this.authorName = doc.data().name
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!")
          }
      }).catch(function(error) {
          console.log("Error getting document:", error)
      })
    }
  },
  mounted() {
    db.collection('users').doc(this.data.author).get().then(doc => {
        if (doc.exists) {
          this.authorImg = doc.data().photoURL
          this.authorName = doc.data().name
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!")
        }
    }).catch(function(error) {
        console.log("Error getting document:", error)
    })
  }
}
</script>

<style lang="scss" scoped>
.detailed {
  display: flex;
  flex-direction: column;
  &_stats {
    display: flex;
    padding: 0.5rem;
    justify-content: space-evenly;
    &_author {
      img {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
  &_main {
    text-align: left;
    padding: 1rem;
  }
  &_image {
    width: 100%;
  }
}
</style>