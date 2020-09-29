<template>
  <div class="image_input">
    <img v-if="selectedImage" :src="selectedImage" alt="главное фото блюда">
    <Button @click="handleButton">
      {{selectedImage ? 'Другое изображение' : 'Выберите изображение'}}
    </Button>
    <input
      type="file"
      id="input_file"
      @change="onFileSelected"
      hidden
      accept="image/*"
    />
  </div>
</template>

<script>
import Button from '../components/Button'
export default {
  components: {
    Button
  },
  props: {
    image: String
  },
  data() {
    return {
      selectedImage: null
    }
  },
  watch: {
    selectedImage(val) {
      this.$emit('change', val)
    },
    image() {
      this.selectedImage = this.image
    }
  },
  methods: {
    handleButton() {
      document.querySelector('#input_file').click()
      console.log(this.selectedImage)
    },
    onFileSelected(event) {
      let reader = new FileReader()
      let file = event.target.files[0]
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.selectedImage = reader.result
      };
    }
  }
}
</script>

<style lang="scss" scoped>
.image_input {
  display: flex;
  flex-direction: column;
  img {
    display: block;
    max-width: 100%;
    margin: 0 auto;
  }
}
</style>