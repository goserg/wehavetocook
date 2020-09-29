<template>
  <main>
    <LoadingIndicator v-if="$store.state.loading"/>
    <Card
      v-for="recipe in $store.state.recipes"
      :key="recipe.id"
      :data="recipe.data()"
      :recipe_id="recipe.id"
    >
    </Card>

    <router-link :to="{name: 'editor'}">
      <Button
        float
        v-if="$store.state.user != null"
      >
        +
      </Button>
    </router-link>
  </main>
</template>

<script>
import Card from '../components/Card'
import Button from '../components/Button'
import LoadingIndicator from '../components/LoadingIndicator'

export default {
  data() {
    return {}
  },
  methods: {},
  components: {
    Card,
    Button,
    LoadingIndicator
  },
  mounted() {
    this.$store.commit('updateRecipes')
  }
}
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>