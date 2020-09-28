<template>
  <main>
    <Card
      v-for="recipe in $store.state.recipes"
      :key="recipe.id"
      :data="recipe.data()"
      :selected="selected===recipe.id"
      @click="select(recipe.id)"
    >
    </Card>

    <router-link :to="{name: 'new'}">
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

export default {
  data() {
    return {
      selected: null
    }
  },
  methods: {
    select(id) {
      this.selected = this.selected === id ? null : id
    }
  },
  components: {
    Card,
    Button
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