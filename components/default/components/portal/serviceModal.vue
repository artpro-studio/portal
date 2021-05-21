<template>
  <v-card>
    <div class="modal__top">
      <div class="top__text">
        <v-card-title>{{$t('modalServiceTitle')}}</v-card-title>
      </div>
    </div>
    <v-form class="modalService" @submit.prevent="searchService">
      <v-col cols="12">
        <div class="modalService__search">
          <v-text-field
            v-model="search.input"
            :label="$t('labelSearch')"
            @submit.prevent="searchService"
            @keyup="searchService"
          ></v-text-field>
        </div>


        <serviceItemComponent
          :data="service.list"
          :search="search.input"
          :count="service.countPage"
          @selectService="selectService"
        />


      </v-col>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary darken-1"
          text
          @click.prevent="closeModal"
        >
          {{$t('modalServiceClose')}}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
    import Cookies from "js-cookie";
    import handlerAxiosMixins from '~/mixins/hendlerAxios.mixins'
    import serviceItemComponent from '/components/default/components/portal/serviceItem';

    export default {
      props:['modal', 'listIds'],
      mixins:[handlerAxiosMixins],
      components:{ serviceItemComponent },
      data(){
        return{
          service:{
            data:'',
            list:[],
            countPage:'',
            resources:[],
          },
          search:{
            selectInput:'',
            input:'',
          },
          setTimeoutReq: {}
        }
      },
      async created() {
        this.createMethod()
      },
      methods:{
        searchService(){
          //Поиск услуг
          try {
            //Поиск по адресу
            clearTimeout(this.setTimeoutReq);
            this.setTimeoutReq = setTimeout(async () => {
              let formData = {
                search: this.search.input
              }
              let request = await this.handlerAxios('post', 'v1/auth/organization-search/', formData)
              if(request.status == true){
                this.service.list = request.data.rows
                this.service.countPage = Math.ceil(request.data.count / 20)
              }
            }, 1000);

          } catch (e) {
            console.log(e)
          }
        },
        selectService(itemData){
          try {
            //Выбор услуги в модалке
            let isVisibleType = false;

            //Проверка были ли выбрана услуга
            if(Object.keys(itemData).length == 0){
              this.$messagesInfo("Все ячейки заполены");
              return false;
            }
            if(itemData.email == null){
              this.$messagesError("Нелья выбрать компанию, компаня не подтвердила почту");
              return false
            }

              // //Находим первую свободную ячейку
              // let itemFormIndex = this.counter.forms.findIndex(item => item.isHidden == true)


              let formData = {
                resources: this.service.resources,
                data: itemData
              }
              this.$emit('selectService', formData)
              this.closeModal()

          } catch (e) {
            console.log(e)
          }
        },
        closeModal(){
          this.$emit('closeModal', false)
        },
        async createMethod(){
          if(this.modal != true){
            return false
          }

          try{
            let formData = {
              search: this.search.input,
              ids: this.listIds
            }
            let request = await this.handlerAxios('post', 'v1/auth/organization-search', formData)

            if(request.status != true){
              return false
            }

            this.service.list = request.data.rows
            this.service.resources = request.resources
            this.service.countPage = Math.ceil(request.data.count / 20)
          } catch (e) {
            console.log(e)
          }
        }
      },
      watch:{
        modal: async function (e) {
          this.createMethod()
        }
      }
    }
</script>
<i18n>
  {
  "ru": {
    "modalServiceTitle":"Выберите поставщика услуг",
    "modalServiceSend":"Выбрать",
    "modalServiceClose":"Отменить",
    "modalServiceSelectText":"Услуги",
    "labelSearch": "Поиск поставщика услуг"
  },
  "ch": {
    "modalServiceTitle":"Пулӑшу ӗҫӗсен тавар тӑратаканне суйласа илӗр",
    "modalServiceSend":"Суйласа ларт",
    "modalServiceClose":"Пăрахăçла",
    "modalServiceSelectText":"Тивĕçтерÿсем",
    "labelSearch": "Пулӑшу ӗҫӗсен тавар тӑратаканне шырамалли"
    }
  }

</i18n>
<style lang="scss" scoped>
  .v-card__title{
    font-size: 30px;
    font-weight: 300;
  }
  @media screen and (max-width: 650px){
    .modalService{
      &__search{
        padding: 0 15px;
      }
    }
  }
</style>
