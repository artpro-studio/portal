<template>
  <div class="maps" id="maps" v-if="isViewMaps != false">
    <div class="maps__title">
      <h3>Местоположение:</h3>
      <p>Заполните поля чтобы найти информацию в нашей системе</p>
    </div>
    <div class="maps__content">
        <yandex-map
          id="map"
          v-if="showMap"
          :settings="settings"
          :coords="coords"
          zoom=18>
          <ymap-marker
            :coords="coords"
            marker-id="123123"
            marker-type="placemark"
          />
        </yandex-map>
    </div>
  </div>
</template>
<script>
  import { yandexMap, ymapMarker , loadYmap } from 'vue-yandex-maps'


  export default {
    props:['dataSearch', 'isParams'],
    data(){
      return{
        showMap: false,
        isViewMaps: false,
        coords: [54.82896654088406, 39.831893822753904],
        settings:{
          apiKey: '706cf26a-1ad9-433c-98d9-788371b97012',
          lang: 'ru_RU',
          coordorder: 'latlong',
          version: '2.1'
        }
      }
    },
    async created() {
      this.mapsMethods()
    },
    async mounted() {
      this.showMap = true
      // здесь доступна переменная ymaps
    },
    methods:{
      async mapsMethods(){
        try {
          this.showMap = false;
          let address = this.dataSearch.formattedAddress || this.dataSearch.orgAddress
          let request = await this.$axios.$get(`https://geocode-maps.yandex.ru/1.x?geocode=${address}&apikey=706cf26a-1ad9-433c-98d9-788371b97012&format=json`)
          let coorsString = request.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
          coorsString = coorsString.split(' ')
          this.coords = [coorsString[1], coorsString[0]]
          this.showMap = true;

        } catch (e) {
          console.log(e)
        }
      }
    },
    components: { yandexMap, ymapMarker },
    watch:{
      dataSearch: async function (e) {
        if(Object.keys(e).length == 0){
          this.isViewMaps = false;
          return false
        }
        this.isViewMaps = true;
        this.mapsMethods()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .maps{
    margin-top: 50px;
  }
  .maps__content{
    height: 500px;
  }
  .ymap-container {
    height: 100%;
  }
  @media screen and (max-width: 650px){
    .maps__content{
      height: 300px;
    }
  }
</style>
