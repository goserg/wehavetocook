<template>
  <header class="header">
    <Button
      text
      @click="$store.commit('switchSidebar')"
    >
      <svg width="2rem" height="2rem" viewBox="0 0 16 16" class="bi bi-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
      </svg>
    </Button>

    <router-link :to="{name: 'main'}" class="title">
      <span class="start">W</span>e
      <span class="start">H</span>ave
      <span class="start">T</span>o
      <span class="start">Co</span>ok
    </router-link>
  </header>
</template>

<script>
import Button from '../components/Button'

export default {
  components: {
    Button
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  padding: 1rem;
  font-size: 2rem;
  place-items: center;
  .title {
    margin: 0 auto;
    color: #0d4e39;
    font-family: 'Vollkorn', serif;
    text-decoration: none;
    .start {
      font-family: 'Roboto', sans-serif;
      display: inline-block;
      background: linear-gradient(135deg, #0a3c2e, #006a20);
      color: white;
      border: 1px solid #022103;
      padding: 0 0.3rem;
    }
  }
}
@media (max-width: 600px) {
  .title {
    font-size: 1.5rem;
  }
}
</style>