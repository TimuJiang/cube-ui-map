<template lang='pug'>
  .dt-map
    #dt-map__content
    .tool-bar
      city-button(v-if="map && !search" :map="map" @change-city="onChangeCity")
      brand-button(v-if="map && !search" :map="map" @change-city="onChangeBrand")
      search-button(v-if="map && !search" :map="map" @click.native="onToggle")
      search-input(v-if="map && search" @close="onClose")
</template>

<script>
  import CityButton from './city-button'
  import BrandButton from './brand-button'
  import SearchButton from './search-button'
  import SearchInput from './search-input'
  export default {
    name: 'dt-map',
    components: { CityButton, BrandButton, SearchButton, SearchInput },
    data () {
      return {
        map: '',
        mouseTool: '',
        geolocation: '',
        search: false
      }
    },
    mounted () {
      this.initMap()
    },
    methods: {
      initMap (type) {
        this.map && this.map.destroy()
        this.type = type || 2
        let myType = type === 1 ? {
          layers: [new AMap.TileLayer.Satellite()]
        } : {}
        // eslint-disable-next-line no-undef
        this.map = new AMap.Map('dt-map__content', {
          resizeEnable: true,
          ...myType
        })
        // eslint-disable-next-line no-undef
        this.mouseTool = new AMap.MouseTool(this.map)
        // eslint-disable-next-line no-undef
        this.contextMenu = new AMap.ContextMenu({
          isCustom: true,
          content: '<div id="edit-context-menu"></div>'
        })
        if (this.city) {
          this.map.setCity(this.city)
        }
      },
      onChangeCity(city) {
        this.map.setCity(city)
      },
      onChangeBrand() {},
      onToggle() {
        this.search = true
      },
      onClose() {
        this.search = false
      }
    }
  }
</script>
<style lang="scss">
  #dt-map__content {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
</style>
<style lang="scss" scoped>
  .dt-map {
    position: relative;
    height: 100%;
    width: 100%;
    .tool-bar {
      display: flex;
      box-sizing: border-box;
      position: absolute;
      width: 100%;
      z-index: 2;
      background: #ffffff;
      padding: 16px 20px;
      align-items: center;

    }
  }
</style>
