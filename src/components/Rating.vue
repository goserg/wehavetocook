<template>
  <div class='rating'>
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .rating {
    position: relative;
    background: green;
    color: white;
    font-weight: bold;
    font-size: 0.8rem;
    height: 1rem;
    line-height: 1.1rem;
    padding: 0 0.2rem;
    margin-right: 0.5rem;
    &::after,
    &::before {
      position: absolute;
      content: '';
      border-left: 0.5rem solid green;
      right: -0.5rem;  
    }
    &::after {
      border-bottom: 0.5rem solid transparent;
      top: 0;
    }
    &::before {
      border-top: 0.5rem solid transparent;
      bottom: 0;
    }
  }
</style>