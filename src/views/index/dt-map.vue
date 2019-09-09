<template lang='pug'>
  .dt-map
    #dt-map__content
    .tool-bar
      city-button(v-if="map" :map="map" @change-city="onChangeCity")
      brand-button(v-if="map" :map="map" @change-brand="onChangeBrand")
      toggle-button(v-if="map" @toggle="onToggle" :visible="visible")
      search-button(v-if="map" :map="map" @click.native="showDrawer")
    cube-drawer(
      ref="drawer"
      title="请选择"
      :data="[jsxList]"
      :style="{zIndex: 999}"
    )
      span(slot="title") 经销商
      cube-drawer-panel(
        :index="0"
        :data="jsxList"
      )
        cube-drawer-item(v-for="(item, i) in jsxList" :item="item" :key="i" :index="i")
          span {{item.name}}
</template>

<script>
  import CityButton from './city-button'
  import BrandButton from './brand-button'
  import ToggleButton from './toggle-button'
  import SearchButton from './search-button'
  import axios from 'axios'

  const lintStyle = {
    borderWeight: 2,
    strokeColor: '#222222',
    strokeOpacity: 0.9,
    strokeStyle: 'solid'
  }
  const lineStyle2 = {
    borderWeight: 2,
    strokeColor: '#3d89ff',
    strokeOpacity: 0.9,
    strokeStyle: 'solid'
  }
  const textStyle = {
    'background': 'linear-gradient(180deg, #3d89ff, #3d89ff)',
    'width': '60px',
    'border-width': 0,
    'text-align': 'center',
    'font-size': '14px',
    'color': '#FFFFFF',
    'line-height': '24px',
    'border-radius': '5px'
  }
  const textStyle2 = {
    'background': 'linear-gradient(180deg, #7E7E7E, #222222)',
    'width': '60px',
    'border-width': 0,
    'text-align': 'center',
    'font-size': '14px',
    'color': '#FFFFFF',
    'line-height': '24px',
    'border-radius': '5px'
  }
  export default {
    name: 'dt-map',
    components: { CityButton, BrandButton, SearchButton, ToggleButton },
    data () {
      return {
        map: '',
        visible: true,
        mouseTool: '',
        geolocation: '',
        brand: '',
        currentCity: '',
        jsxList: [],
        jxsMarkerList: [],
        businessList: [],
        businessMarkerList: [],
        businessMap: {},
        polylineList: [],
        tempPoint: [],
        drawMarker: []
      }
    },
    mounted () {
      this.initMap()
    },
    methods: {
      onToggle (value) {
        this.visible = value
        if (this.visible) {
          this.map.add(this.polylineList)
        } else {
          this.map.remove(this.polylineList)
        }
      },
      initMap (type) {
        this.map && this.map.destroy()
        // eslint-disable-next-line no-undef
        this.map = new AMap.Map('dt-map__content', {
          resizeEnable: true
        })
      },
      onChangeCity (city) {
        this.map.setCity(city)
        this.currentCity = city
        this.map.clearMap()
        this.loadData()
        this.loadBusinessDistrict()
      },
      onChangeBrand (brand) {
        this.brand = brand.value
        this.map.remove(this.jxsMarkerList)
        this.addJxsList()
      },
      showDrawer () {
        this.$refs.drawer.show()
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
        this.jxsMarkerList = []
        let marker
        let icon
        const { Icon, Size, Pixel, Marker } = AMap
        this.jsxList.forEach(j => {
          if (j.longitude && j.latitude) {
            if (!this.brand || this.brand === j.brand) {
              let url = `./images/jxs_${j.brand}.png`
              icon = new Icon({
                size: new Size(18, 25),
                image: url,
                imageSize: new Size(18, 25)
              })
              marker = new Marker({
                icon: icon,
                zIndex: 110,
                position: [j.longitude, j.latitude],
                offset: new Pixel(-9, -25)
              })
              this.jxsMarkerList.push(marker)
            }
          }
        })
        this.map.add(this.jxsMarkerList)
        this.map.setFitView(this.jxsMarkerList, true, [20, 20, 20, 20])
      },
      addBusinessList () {
        this.businessMarkerList = []
        this.businessMap = {}
        let marker
        let icon
        let text
        const { Icon, Size, Pixel, Marker, Text } = AMap
        this.businessList.forEach((j, index) => {
          if (j.longitude && j.latitude) {
            this.businessMap[j.id] = j
            let url = `./images/b-bg.png`
            icon = new Icon({
              size: new Size(90, 90),
              image: url,
              imageSize: new Size(90, 90)
            })
            marker = new Marker({
              icon: icon,
              position: [j.longitude, j.latitude],
              offset: new Pixel(-45, -45)
            })
            text = new Text({
              text: j.bussCircle,
              anchor: 'center',
              draggable: false,
              style: {
                'background': 'transparent',
                'width': '60px',
                'border-width': 0,
                'text-align': 'center',
                'font-size': '14px',
                'word-break': 'break-all',
                'white-space': 'pre-wrap',
                'color': '#FFFFFF'
              },
              extData: {
                index
              },
              position: [j.longitude, j.latitude]
            })
            text.on('click', this.onClickBusinessMarker, this)
            this.businessMarkerList.push(marker)
            this.businessMarkerList.push(text)
          }
        })
        this.map.add(this.businessMarkerList)
        // this.map.setFitView(this.businessMarkerList, true, [20, 20, 20, 20])
        this.drawPolyline()
      },
      onClickBusinessMarker (e) {
        if (this.tempPoint.length === 1 && this.tempPoint[0] === e.target.getPosition()) {
          const toast = this.$createToast({
            time: 2000,
            type: 'warn',
            txt: '不能连接自己'
          })
          toast.show()
          return
        }
        if (this.tempPoint.length === 2) {
          this.tempPoint = []
          this.map.remove(this.drawMarker)
          this.drawMarker = []
        }
        if (this.tempPoint.length < 1) {
          this.tempPoint.push(e.target.getPosition())
        } else {
          this.tempPoint.push(e.target.getPosition())
          const { Text, Polyline } = AMap
          const polyline = new Polyline({
            path: this.tempPoint,
            ...lineStyle2,
            zIndex: 113
          })
          let distance = this.getDistance(this.tempPoint[0], this.tempPoint[1])
          let center = this.getCenter(this.tempPoint[0], this.tempPoint[1])
          const text = new Text({
            text: distance,
            anchor: 'center',
            draggable: false,
            style: textStyle,
            position: center
          })
          this.drawMarker.push(polyline)
          this.drawMarker.push(text)
        }
        this.map.add(this.drawMarker)
      },
      drawPolyline () {
        let target
        let polyline
        let text
        this.polylineList = []
        const { Text, Polyline, LngLat } = AMap
        this.businessList.forEach(b => {
          if (b.connects) {
            target = this.businessMap[b.connects]
            polyline = new Polyline({
              path: [[b.longitude, b.latitude], [target.longitude, target.latitude]],
              ...lintStyle,
              zIndex: 111
            })
            let distance = this.getDistance(new LngLat(b.longitude, b.latitude), new LngLat(target.longitude, target.latitude))
            let center = this.getCenter(new LngLat(b.longitude, b.latitude), new LngLat(target.longitude, target.latitude))
            text = new Text({
              text: distance,
              anchor: 'center',
              draggable: false,
              style: textStyle2,
              position: center
            })
            this.polylineList.push(polyline)
            this.polylineList.push(text)
          }
        })
        this.map.add(this.polylineList)
      },
      getDistance (b, t) {
        let d = AMap.GeometryUtil.distance(b, t)
        return Math.round(d / 100) / 10 + 'km'
      },
      getCenter (b, t) {
        return b.divideBy(2).add(t.divideBy(2))
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

    .marker-business-name {
      border: none !important;
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
