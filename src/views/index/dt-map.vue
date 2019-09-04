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
  import axios from 'axios'

  export default {
    name: 'dt-map',
    components: { CityButton, BrandButton, SearchButton, SearchInput },
    data () {
      return {
        map: '',
        mouseTool: '',
        geolocation: '',
        search: false,
        currentCity: '',
        jsxList: [],
        jxsMarkerList: [],
        businessList: [],
        businessMarkerList: []
      }
    },
    mounted () {
      this.initMap()
    },
    methods: {
      initMap (type) {
        this.map && this.map.destroy()
        // eslint-disable-next-line no-undef
        this.map = new AMap.Map('dt-map__content', {
          resizeEnable: true
        })
        // eslint-disable-next-line no-undef
        this.mouseTool = new AMap.MouseTool(this.map)
      },
      onChangeCity (city) {
        this.map.setCity(city)
        this.currentCity = city
        this.loadData()
        this.loadBusinessDistrict()
      },
      onChangeBrand () {
      },
      onToggle () {
        this.search = true
      },
      onClose () {
        this.search = false
      },
      loadData () {
        axios.post('/capitalization/map/jxsList', { cityCode: this.currentCity })
          .then(response => {
            this.jsxList = response.data.data
            this.addJxsList()
          })
      },
      loadBusinessDistrict () {
        axios.post('/capitalization/map/tradList', { cityCode: this.currentCity })
          .then(response => {
            this.businessList = response.data.data
            this.addBusinessList()
          })
      },
      addJxsList () {
        this.map.clearMap(this.jxsMarkerList)
        this.jxsMarkerList = []
        let marker
        let icon
        const { Icon, Size, Pixel, Marker } = AMap
        this.jsxList.forEach(j => {
          // eslint-disable-next-line no-undef
          let url = `./images/jxs_${j.brand}.png`
          icon = new Icon({
            size: new Size(18, 25),
            image: url,
            imageSize: new Size(18, 25)
          })
          marker = new Marker({
            icon: icon,
            position: [j.longitude, j.latitude],
            offset: new Pixel(-18, -12.5)
          })
          marker.setLabel({
            offset: new Pixel(20, 20),
            content: j.name,
            direction: 'center'
          })
          this.jxsMarkerList.push(marker)
        })
        this.map.add(this.jxsMarkerList)
        this.map.setFitView(this.jxsMarkerList, true, [20, 20, 20, 20])
      },
      addBusinessList () {
        this.map.clearMap(this.businessMarkerList)
        this.businessMarkerList = []
        let marker
        let icon
        const { Icon, Size, Pixel } = AMap
        this.businessList.forEach(j => {
          let url = `./images/b-bg.png`
          icon = new Icon({
            size: new Size(90, 90),
            image: url,
            imageSize: new Size(90, 90)
          })
          marker = new AMap.Marker({
            icon: icon,
            position: [j.longitude, j.latitude],
            offset: new Pixel(-45, -45)
          })
          this.businessMarkerList.push(marker)
          this.map.setFitView(this.businessMarkerList, true, [20, 20, 20, 20])
        })
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

    .cube-btn {

    }
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
      padding: 10px 16px;
      align-items: center;

    }
  }
</style>
