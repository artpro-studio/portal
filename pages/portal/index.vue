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
  import searchForm from '/components/Default/Home/HomeSearchForm'
  import searchContent from '/components/Default/Portal/SearchContent'
  import apiMaps from '/components/Default/Portal/DefaultMaps'
  import Search from "../../components/Default/Home/HomeSearchForm";
  import searchList from '/components/Default/Portal/SearchList'

  export default {
    head() {
      return {
        title: 'Информационно-справочный портал объектов ЖКХ Чувашии',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Получить подробную информацию об объектах жилого фонда, об управляющих и ресурсоснабжающих организациях Чувашской Республики - Чувашия'
          },
          {
            name: 'keywords',
            content: 'справочник, жкх, дом, УК, управляющая компания, РСО, ресурсоснабжающая организация'
          }
        ],
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
        console.log('sendParamsIndex', data)
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
