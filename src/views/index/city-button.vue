<template lang='pug'>
  .city-button(:light="true"  @click="showAddressPicker" icon="cubeic-select")
    span {{currentCity}}
    img.cubeic-pulldown(src="./down.png")
</template>

<script>
  export default {
    name: 'city-button',
    props: ['map'],
    data () {
      return {
        citySearch: '',
        district: '',
        currentCity: '',
        currentProvince: '',
        defaultSelectIndex: [0, 0],
        addressData: []
      }
    },
    mounted () {
      // eslint-disable-next-line no-undef
      this.district = new AMap.DistrictSearch({
        subdistrict: 2,
        showbiz: false
      })
      this.citySearch = new AMap.CitySearch()
      this.citySearch.getLocalCity((status, result) => {
        console.log(status)
        console.log(result)
        if (status === 'complete' && result.info === 'OK') {
          this.currentCity = result.city
          this.currentProvince = result.province
          this.init()
          this.$emit('change-city', this.currentCity)
        }
      })
    },
    methods: {
      showAddressPicker () {
        this.addressPicker.setData(this.addressData, this.defaultSelectIndex)
        this.addressPicker.show()
      },
      async init () {
        const citys = await this.loadCity()
        this.addressData = []
        // eslint-disable-next-line no-unused-vars
        let index1 = 0
        // eslint-disable-next-line no-unused-vars
        let index2 = 0
        citys.forEach((c, idx) => {
          let data = {
            value: c.name,
            text: c.name,
            children: []
          }
          if (c.name === this.currentProvince) index1 = idx
          if (c.districtList) {
            c.districtList.forEach((l, idx2) => {
              let sub = {
                value: l.name,
                text: l.name
              }
              if (l.name === this.currentCity) index2 = idx2
              data.children.push(sub)
            })
          }
          this.defaultSelectIndex = [index1, index2]
          this.addressData.push(data)
        })
        this.addressPicker = this.$createCascadePicker({
          title: '选择城市',
          zIndex: 999,
          selectIndex: [2],
          data: this.addressData,
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      },
      selectHandle (value, index, text) {
        this.defaultSelectIndex = index
        this.currentCity = text[1]
        this.currentProvince = text[0]
        this.$emit('change-city', this.currentCity)
      },
      cancelHandle () {
      },
      loadCity () {
        return new Promise((resolve, reject) => {
          this.district.search('中国', function (status, result) {
            if (status === 'complete') {
              resolve(result.districtList[0].districtList)
            }
          })
        })
      }
    }
  }
</script>
<style scoped>
  .city-button >>> .cubeic-select {

  }
</style>
<style lang="scss" scoped>
  .city-button {
    flex: 2;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    background: #EFF0F2;
    border-radius: 2px;
    color: #666666;
    .cubeic-pulldown {
      width: 13px;
      height: 13px;
    }
  }
</style>
