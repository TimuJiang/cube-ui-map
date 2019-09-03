<template lang='pug'>
  .search-input
    cube-input.input(v-model="value" :maxlength="40")
    .link-button(@click="onclose") 取销
    transition(name="fade-up")
      .search-input__content
        .search-input__content__item(v-for="item in 30" :key="item")
          span xxxxxx
</template>

<script>
  export default {
    name: 'search-input',
    data () {
      return {
        value: ''
      }
    },
    methods: {
      onclose () {
        this.$emit('close')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .search-input {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    .input {
      flex: auto;
    }
    .link-button {
      font-size: 32px;
      margin-left: 20px;
      color: #666666;
    }
    &__content {
      position: fixed;
      z-index: 1000;
      top: 100px;
      bottom: 60px;
      left: 20px;
      right: 20px;
      overflow-y: auto;
      border-radius: 8px;
      background: #ffffff;
      box-shadow: 0px 0px 5px 5px rgba(0,0,0, 0.13);
    }
    &__content__item {
      height: 60px;
      line-height: 60px;
      padding-left: 20px;
      font-size: 28px;
    }
  }
</style>
