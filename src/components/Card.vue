<template>
  <router-link
    class="card"
    :to="{name: 'recipe', params: {data: data, imgURL: url}}"
  >
    <div
      class="head"
      @mouseup="$emit('click')"
    >
      <img
        class="head_image"
        :src="url"
      >
      <div class="head_info">
        <div class="head_info_name">
          <span class="start">{{ data.name.slice(0, 2) }}</span>{{ data.name.slice(2) }}
        </div>
        <Rating>
          {{ data.rating }}
        </Rating>
        <Time>
          {{ data.time }} мин.
        </Time>
      </div>
    </div>
    <router-link :to="{name: 'editor', params: {recipe: data, recipe_id: recipe_id}}">
      <div
        class="author"
        v-if="$store.state.user && data.author == $store.state.user.uid"
      >
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>
      </div>
    </router-link>
  </router-link>
</template>

<script>
import { storage } from '../firebase'

import Rating from '../components/Rating'
import Time from '../components/Time'

export default {
  props: {
    data: Object,
    recipe_id: String
  },
  data() {
    return {
      url: ''
    }
  },
  methods: {
  },
  mounted() {
    if (this.data.imgURL[0]=='i') {
      storage.ref().child(this.data.imgURL).getDownloadURL().then(url => {
        this.url = url
      })
    } else {
      this.url = this.data.imgURL
    }
  },
  components: {
    Rating,
    Time
  }
}
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  background: white;
  margin: 0 auto;
  transition: max-height 0.5s;
  max-height: 75px;
  border-radius: 0.25rem;
  overflow: hidden;
  width: 100%;
  text-align: left;
  text-decoration: none;
  .head {
    display: flex;
    align-items: center;

    &_image {
      width: 75px;
      height: 75px;
    }

    &_info {
      display: grid;
      grid-template-columns: min-content 1fr min-content;
      grid-gap: 0.2rem 1rem;
      padding: 0 1rem;
      &_name {
        grid-column: 1/4;
        text-align: left;
        font-size: 1.2rem;
        font-family: 'Vollkorn', serif;
        color: #0d4e39;
        .start {
          font-family: 'Roboto', sans-serif;
          display: inline-block;
          background: linear-gradient(135deg, #0a3c2e, #006a20);
          color: white;
          border: 1px solid #022103;
          padding: 0 0.2rem;
        }
      }
    }
  }
}
.author {
  position: absolute;
  background: var(--background-gradient);
  color: white;
  padding: 0.1rem 0.2rem;
  top: 0;
  right: 2rem;
}
</style>