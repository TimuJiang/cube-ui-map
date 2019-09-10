<template lang='pug'>
    .brand-button(:light="true"  @click="showBrandPicker" icon="cubeic-select")
      span {{currentBrand.text}}
      img.cubeic-pulldown(src="./down.png")
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
        { text: '全部', value: '' },
        { text: '吉利', value: 'geely' },
        { text: '几何', value: 'geometry' },
        { text: '领克', value: 'lynk' }
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
        this.currentIndex = i
        this.currentBrand = this._brand[i]
        this.$emit('change-brand', this.currentBrand)
      },
      cancelHandle () {
      }
    }
  }
</script>
<style lang="scss" scoped>
  .brand-button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 20px;
    padding: 10px 16px;
    background: #EFF0F2;
    font-size: 16px;
    border-radius: 2px;
    color: #666666;
    .cubeic-pulldown {
      width: 13px;
      height: 13px;
    }
  }
</style>
