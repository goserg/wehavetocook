<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.container {
  background: white;
  margin: 1rem auto;
  padding: 1rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: .2rem;
  overflow: hidden;
  width: 95%;
  max-width: 900px;
}
</style>