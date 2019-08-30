<template lang='pug'>
  .dt-map
    #dt-map__content
    city-button(v-if="map" :map="map" @change-city="onChangeCity")
</template>

<script>
  import CityButton from './city-button'

  export default {
    name: 'dt-map',
    components: { CityButton },
    data () {
      return {
        map: '',
        mouseTool: '',
        geolocation: '',
        typeList: [{
          type: 1,
          text: '卫星图'
        }, {
          type: 2,
          text: '普通图'
        }]
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
  }
</style>
