<template>
  <div class="text-input">
    <input
      type="text"
      class="text-input_input"
      placeholder=" "
      v-bind:value="value"
      @input="$emit('input', $event.target.value)"
    >
    <span class="text-input_placeholder">
      {{ placeholder }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
    value: [String, Number]
  }
}
</script>

<style lang="scss" scoped>
  .text-input {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: gray;
    }
    &:focus-within::after{
      height: 2px;
      background: var(--background-gradient);
    }
    &_placeholder {
      position: absolute;
      left: 0.2rem;
      top: 0.2rem;
      font-size: 1rem;
      color: gray;
      display: none;
      pointer-events: none;
    }
    &_input {
      padding: 0.2rem;
      width: 100%;
      font-size: 1rem;
      border: 0;
      outline: 0;
      &:placeholder-shown+.text-input_placeholder{
        display: block;
      }
    }
  }
</style>