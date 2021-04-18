<template>
  <div class="wrapper">
    <div class="container">

      <searchForm
        title="Информация по адресу"
        isChecked="true"
        :data="data"
        @liveSend="liveSend"
        @sendParams="sendParams"
        @clearData="clearData"
      />

      <searchList
        :data="dataList"
        :isParams="isParams"
        @sendParams="liveSend"
      />

      <searchContent
        :data="data"
        :isSettings="isSettings"
        :isParams="isParams"
      />

      <apiMaps :data="data" :isParams="isParams"/>

    </div>
  </div>
</template>
<script>
  import handlerAxiosMixins from '~/mixins/hendlerAxios.mixins'
  import searchForm from '/components/default/components/home/search'
  import searchContent from '/components/default/components/portal/searchContent'
  import apiMaps from '/components/default/components/portal/maps'
  import Search from "../../components/default/components/home/search";
  import searchList from '/components/default/components/portal/searchList'

  export default {
    mixins:[handlerAxiosMixins],
    data(){
      return{
        listServices:[],
        isSettings:false,
        data:{},
        dataList:{
          rows:[],
        },
        isParams: false,
      }
    },
    async created() {
      let request = await this.handlerAxios('get', `v1/auth/organization/`)
    },
    components:{
      Search,
      searchForm,
      searchContent,
      apiMaps,
      searchList
    },
    methods:{
      liveSend(data){
        console.log('LiveSend', data)
        this.data = data;
        this.isParams = false
      },
      sendParams(data){
        console.log('sendParams', data)
        this.dataList = data
        this.isParams = true
      },
      clearData(){
        console.log('clearData')
        this.data = {};
        this.dataList = {
          rows:[]
        };
        this.isParams = false
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
