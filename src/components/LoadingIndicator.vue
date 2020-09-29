<template>
  <div class="loading-indicator">
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.loading-indicator {
  position: absolute;
  width: 2rem;
  height: 2rem;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 0 3px var(--main-color);
  border-radius: 100%;
  z-index: 2;
  animation: loading 1.2s infinite linear;
  &::after {
    content: "";
    position: absolute;
    width: 2rem;
    height: 2rem;
    background:  #eee;
    transform: translateY(1rem);
  }
}

@keyframes loading {
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>