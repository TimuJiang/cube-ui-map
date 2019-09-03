<template lang='pug'>
  .brand-button
    cube-button(:light="true"  @click="showBrandPicker" icon="cubeic-select") {{currentBrand.text}}
</template>

<script>
  export default {
    name: 'brand-button',
    props: ['map'],
    data () {
      return {
        currentBrand: '',
        brandPicker: '',
        currentIndex: 0
      }
    },
    created () {
      this._brand = [
        { text: '全部', value: 0 },
        { text: '吉利', value: 1 },
        { text: '领克', value: 2 }
    ]
    },
    mounted () {
      this.currentBrand = this._brand[this.currentIndex]
      this.brandPicker = this.$createPicker({
        title: '选择品牌',
        zIndex: 999,
        onSelect: this.selectHandle,
        onCancel: this.cancelHandle
      })
    },
    methods: {
      showBrandPicker () {
        this.brandPicker.setData([this._brand], [this.currentIndex])
        this.brandPicker.show()
      },
      selectHandle (value, index, text) {
        let i = index[0]
        this.currentBrand = this._brand[i]
      },
      cancelHandle () {
      }
    }
  }
</script>
<style lang="scss" scoped>
  .brand-button {
    flex: 1;
    margin-left: 20px;
  }
</style>
