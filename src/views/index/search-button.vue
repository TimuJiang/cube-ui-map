<template lang='pug'>
  .search-button
    i.cubeic-search
</template>

<script>
  export default {
    name: 'search-button',
  }
</script>
<style lang="scss" scoped>
  .search-button {
    flex: 1;
    text-align: right;
    .cubeic-search {
      font-size: 24px;
      color: #666666;
    }
  }
</style>
