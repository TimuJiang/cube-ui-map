<template lang='pug'>
  .search-button
    i.cubeic-more
</template>

<script>
  export default {
    name: 'search-button',
    props: {
      jxs: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data() {
      return {
        selectedIndex: [0]
      }
    },
    methods: {
      changeHandler() {},
      selectHandler() {},
      cancelHandler() {}
    }
  }
</script>
<style lang="scss" scoped>
  .search-button {
    flex: 1;
    text-align: right;
    .cubeic-more {
      font-size: 18px;
      color: #666666;
    }
  }
</style>
