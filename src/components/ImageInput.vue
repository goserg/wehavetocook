<template>
  <div class="image_input">
    <img v-if="selectedImage" id="img" alt="главное фото блюда">
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
  data() {
    return {
      selectedImage: null
    }
  },
  watch: {
    selectedImage(val) {
      this.$emit('change', val)
    }
  },
  methods: {
    handleButton() {
      document.querySelector('#input_file').click()
    },
    onFileSelected(event) {
      let reader = new FileReader()
      let file = event.target.files[0]
      this.selectedImage = file
      reader.readAsDataURL(file)
      reader.onload = () => {
        document.querySelector('#img').src = reader.result
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