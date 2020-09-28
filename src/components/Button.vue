<template>
  <button
    class="button"
    :class="{
      'button_float': float,
      'button_text': text,
      'button_disabled': disabled,
      'button_fill': fill
      }"
    @click="handleClick"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    float: Boolean,
    text: Boolean,
    disabled: Boolean,
    fill: Boolean
  },
  methods: {
    handleClick() {
      if (!this.disabled) this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  background: var(--background-gradient);
  color: white;
  border: 1px solid var(--main-color);
  font-size: 1rem;
  font-weight: bold;
  padding: 0.3rem 1rem;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.5);
  }
  &_text {
    background: transparent;
    border: 0;
    outline: 0;
    padding: 0.2rem;
    color: var(--main-color);
    &:hover {
      color: var(--main-color-light);
      box-shadow: none;
    }
  }
  &_float {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    height: 3.5rem;
    width: 3.5rem;
    line-height: 3.5rem;
    border-radius: 100%;
    outline: 0;
    padding: 0;
    box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.5);

    font-size: 3rem;

    &:focus {
      outline: 1px solid white;
    }
  }
  &_disabled {
    background: gray;
    box-shadow: 0 0 0 transparent;
    border-color: transparent;
    &:hover {
      box-shadow: none;
    }
  }
  &_fill {
    width: 100%;
  }
}
</style>