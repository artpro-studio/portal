<template>
  <div class="wrapper">
    <div class="container">

      <searchForm
        title="Информация по адресу"
        isChecked="true"
        :dataSearch="dataSearch"
        @liveSend="liveSend"
        @sendParams="sendParams"
        @sendParamsOrg="sendParamsOrg"
        @clearData="clearData"
        @switchHandler="switchHandler"
        @liveSendOrganization="liveSendOrganization"
      />

      <searchList
        :data="dataList"
        :isParams="isParams"
        @sendParams="liveSend"
        @sendParamsOrg="liveSendOrganization"
      />

      <searchContent
        :dataSearch="dataSearch"
        :isSettings="isSettings"
        :isParams="isParams"
        @selectOrganization="liveSendOrganization"
      />

      <apiMaps :dataSearch="dataSearch" :isParams="isParams"/>

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
    head() {
      return {
        title: 'Справочник',
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          {
            hid: 'description',
            name: 'description',
            content: 'Справочник'
          }
        ]
      }
    },
    mixins:[handlerAxiosMixins],
    data(){
      return{
        listServices:[],
        isSettings:false,//Включены ли расширеные настройки
        dataSearch:{},
        dataList:{
          rows:[],
        },
        isParams: false, //Организация или адрес
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
      switchHandler(status){
        this.isSettings = status
      },
      liveSend(data){
        this.dataSearch = data || {};
        this.isParams = false
      },
      liveSendOrganization(data){
        this.dataSearch = data;
        this.isParams = false
        this.isParams = true
      },
      sendParams(data){
        this.dataList = data || {}
        this.isParams = false
        this.dataSearch = {}
      },
      sendParamsOrg(data){
        this.dataList = data || {}
        this.isParams = true
        this.dataSearch = {}
      },
      clearData(){
        this.dataSearch = {};
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
