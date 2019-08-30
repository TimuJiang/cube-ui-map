<template lang='pug'>
  .index
    dt-map()
</template>

<script>
  import DtMap from './index/dt-map'

  export default {
    name: 'index',
    components: { DtMap },
    data () {
      return {}
    },
    mounted () {
    },
    methods: {}
  }
</script>
<style lang="scss" scoped>
  .index {
    width: 100vw;
    height: 100vh;
  }
</style>
