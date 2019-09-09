<template lang='pug'>
  .toggle-button
    i.cubeic-eye-invisible(v-if="visible" @click="onToggle")
    i.cubeic-eye-visible(v-if="!visible" @click="onToggle")
</template>

<script>
  export default {
    name: 'toggle-button',
    props: ['visible'],
    methods: {
      onToggle() {
        this.$emit('toggle', !this.visible)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .toggle-button {
    flex: 1;
    text-align: center;
  }
</style>
