<template>
  <div class="search_home">
    <div class="search_home__top">
      <div class="text">
        <h1>{{pageText.title}}</h1>
        <p>{{$t('description')}}</p>
      </div>
      <div class="search_home__info">
        <a href="mailto:info@portal-jkh.ru" class="search_home_mail" v-if="isChecked != 'true'"><span>{{$t('infoText')}}</span><img src="/img/default/mail.svg" alt="">info@portal-jkh.ru</a>
        <div class="switcherItem"  v-if="isChecked != 'false'">
          <p @click="typePage = !typePage">Поиск: Адресов</p>
          <v-switch
            v-model="typePage"
            :label="$t('checkName')"
            class="liveSearchAddress"
            color="info"
            @change="swichHandler"
            v-if="isChecked != 'false'"
          ></v-switch>
        </div>

      </div>
    </div>
    <div class="search_home__content">
      <v-form v-if="search.isSettings != true" class="fullSearch" @submit="liveSend" ref="searchForm">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-combobox
                v-model="search.input"
                class="liveSearch"
                @keyup="liveSearch($event)"
                @change="liveChange($event)"
                :label="search.label"
                :items="search.dataLive"
                no-data-text="Ничего не найдео"
                item-value="guid"
                :item-text="controls.liveItemText"
                hide-details="auto"
                :filter="filterCombo"

                clearable
                persistent-hint
                return-object
              ></v-combobox>
            </v-col>
          </v-row>
        </v-container>
        <v-row class="flex mt-6" justify="end">
          <v-card-actions>
            <v-btn
              class="icon_btn"
              color="primary"
              @click="counter.modal = true"
              x-small
              text
              v-if="isChecked != 'false' && typePage != true && this.search.input"
            ><v-icon>mdi-plus</v-icon> {{$t('countName')}}</v-btn>

            <v-btn
              color="primary"
              class="btn_maps"
              v-if="dataContent.length > 0"
              @click="scrollMaps"
              text
            >{{$t('viewMap')}}</v-btn>

            <v-spacer></v-spacer>

            <v-btn
              color="primary"
              class="btn_toggle"
              @click="toggleSearch"
              text
            >
             {{$t('settingsName')}}
            </v-btn>

            <v-btn
              :disabled="controlButton.liveButton"
              color="primary"
              class="btn_search"
              @click.prevent="liveSend"
              type="submit"

            >
             <span v-if="typePage != true">{{$t('buttonName')}}</span>
             <span v-if="typePage != false">{{$t('buttonNameOrg')}}</span>
            </v-btn>

          </v-card-actions>
        </v-row>
      </v-form>

      <v-form v-if="search.isSettings == true" class="formParams" @submit="sendParams(true)">
        <v-container>
          <v-row>
            <v-col cols="12" md="2" sm="6">
              <v-select
                v-model="search.settings.region"
                :items="search.regionList"
                attach
                :label="$t('region')"
                :no-data-text="$t('noSearch')"
                item-text="name"
                @change="changeSettings('region')"
                return-object
              >
                <template v-slot:prepend-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-text-field v-model="search.inputRegion" :placeholder="$t('placeholderName')" @input="searchRegionList"></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-select
                v-model="search.settings.area"
                :items="search.areaList"
                attach
                :label="$t('area')"
                :no-data-text="$t('noSearch')"
                item-text="name"
                @change="changeSettings('area')"
                return-object
              >
                <template v-slot:prepend-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-text-field
                        v-model="search.inputArea"
                        :placeholder="$t('placeholderName')"
                        @input="searchAreaList"></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="2" sm="6" >
              <v-select
                v-model="search.settings.city"
                :items="search.cityList"
                attach
                :label="$t('settlement')"
                :no-data-text="$t('noSearch')"
                item-text="name"
                @change="changeSettings('city')"
                return-object
              >
                <template v-slot:prepend-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-text-field v-model="search.inputCity" :placeholder="$t('placeholderName')" @input="searchCityList"></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-select
                v-model="search.settings.street"
                :items="search.streetList"
                attach
                :label="$t('street')"
                :no-data-text="$t('noSearch')"
                item-text="name"
                @change="changeSettings('street')"
                return-object
              >
                <template v-slot:prepend-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-text-field v-model="search.inputStreet" :placeholder="$t('placeholderName')" @input="searchStreetList"></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="2" sm="4">
              <v-select
                v-model="search.settings.home"
                :items="search.homeList"
                attach
                :label="$t('house')"
                :no-data-text="$t('noSearch')"
                item-text="houseTextAddress"
                @change="changeSettings('home')"
                return-object
              >
                <template v-slot:prepend-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-text-field v-model="search.inputHome" :placeholder="$t('placeholderName')" @input="searchHouseList"></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-container>
        <v-row class="flex mt-6" justify="end">
          <v-card-actions>
            <v-btn
              class="icon_btn"
              color="primary"
              @click="counter.modal = true"
              x-small
              text
              v-if="isChecked != 'false' && typePage != true"
            ><v-icon>mdi-plus</v-icon> {{$t('countName')}}</v-btn>
            <v-btn
              color="primary"
              class="btn_maps"
              @click="scrollMaps"
              v-if="dataContent.length > 0"
              text>{{$t('viewMap')}}</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="toggleSearch"
              class="btn_toggle"
              text
            >
             {{$t('liveSearch')}}
            </v-btn>
            <v-btn
              color="primary"
              class="btn_search"
              @click.prevent="sendParams(true)"
              :disabled="controlButton.paramsButton"
            >
              <span v-if="typePage != true">{{$t('buttonName')}}</span>
              <span v-if="typePage != false">{{$t('buttonNameOrg')}}</span>
            </v-btn>
          </v-card-actions>
        </v-row>
      </v-form>
    </div>





    <v-dialog
      content-class="modal modalCounter"
      v-model="counter.modal"
      max-width="1300"
    >
      <sendCounter
        :dataService="service.listSortIds"
        :isModal="true"
        @closeModal="closeModalCounter"
      />
    </v-dialog>




    <div class="preloader" v-if="preloader.modal">
      <div class="preloader__content">
        <img src="/preloader.svg" alt="Загрзука">
        <h4>Пожалуйста подождите</h4>
        <p>Данные загружаются</p>
      </div>
    </div>

  </div>
</template>
<script>
  import Cookie from 'cookie'
  import Cookies from 'js-cookie'
  import handlerAxiosMixins from '~/mixins/hendlerAxios.mixins'
  import serviceModal from "/components/default/components/portal/serviceModal";
  import sendCounter from '/components/default/components/portal/counter'

  export default {
    props:['title', 'isChecked', 'data'],
    mixins:[handlerAxiosMixins],
    components:{serviceModal, sendCounter},
    data(){
      return{
        localRoute: this.$route.query,
        preloader:{
          modal:false,
        },
        //Заголвок страницы
        pageText:{
          title: this.title ?? '',
        },
        controls:{
          //Настройки для полей
          liveItemText: 'formattedAddress',
          isSend: true,
        },
        //Какой тип поиска по адресу=false по огранизации=true
        typePage:false,
        //Данные по услугам
        service:{
          listSortIds:[],
        },
        //Данные по счетчикам
        counter:{
          modal:false,
        },
        //Параметры поиска
        search:{
          dataLive:[],
          isSettings: false,
          label: this.$t('inputSearch'),
          input: null,
          inputRegion:'',
          inputArea:'',
          inputCity:'',
          inputStreet:'',
          inputHome:'',
          settings:{
            region: '',
            area:'',
            city:'',
            street:'',
            home:''
          },
          regionListAll:[],
          areaListAll:[],
          cityListAll:[],
          streetListAll:[],
          homeListAll:[],

          regionList: this.regionListAll || [],
          areaList: this.areaListAll || [],
          cityList: this.cityListAll || [],
          streetList: this.streetListAll || [],
          homeList: this.homeListAll || [],
        },
        dataContent: this.data || [],
        setTimeoutReq: {},
        send:{
          isGood:false,
        },
        controlButton:{
          liveButton: false,
          paramsButton:false,
        },
        maxView: [v => v.length <= 6 || 'Макимальное колличество символов 6'],
        rulesLic: [v => (v.length >= 6 && v.length <= 13) || 'Макимальное колличество символов 13'],
        isNotNull: [v => v.length != '' || 'Значение не должно быть пустым'],
      }
    },
    async mounted() {
      const cookieStr = process.browser ? document.cookie : ''
      const cookies = Cookie.parse(cookieStr || '') || {};

      //Сохраняем данные из кукие прошлые показания
      if(cookies.dataCounter){
        let jsonCookie = JSON.parse(cookies.dataCounter)
        this.counter.oldData = jsonCookie
      }

      this.pageText.title = this.$t('titleAddress');

      try {
        this.createRouter();

      }catch (e) {
        console.log(e);
      }

    },
    methods:{
      closeModalCounter(e){
        this.counter.modal = e;
      },
      filterCombo(){
        //Фильтр для live поиска
        return this.search.dataLive;
      },
      async liveSearch(event){
        //Живой поиск
        try {
          if(event.target.value === ''){
            return true
          }
          //Поиск по оргназиации
          if(this.typePage != false){

            clearTimeout(this.setTimeoutReq);
            this.setTimeoutReq = setTimeout(async () => {
              let formData = {
                search: event.target.value
              }
              let request = await this.handlerAxios('post', 'v1/organization/live-search/', formData)
              if(request.status == true){
                request.data.rows = request.data.rows.map(item => {
                  item.shortName = item.shortName + ' - ' + item.orgAddress
                  return item
                })
                this.search.dataLive = request.data.rows
              }
            }, 1000);

            return true;
          }

          //Поиск по адресу
          clearTimeout(this.setTimeoutReq);
          this.setTimeoutReq = setTimeout(async () => {
            let formData = {
              search: event.target.value
            }
            let request = await this.handlerAxios('post', 'v1/address/live-house/', formData)
            if(request.status == true){
              this.search.dataLive = request.house.rows
            }
          }, 1000);

        } catch (e) {
          console.log(e)
        }
      },
      liveChange(){
        document.querySelector('.fullSearch .btn_search ').focus()
      },
      swichHandler(){
        //Переключение поиска по адресу или по огранизации
        this.$emit('switchHandler', this.typePage)

        this.search.dataLive = []
        for(let key in this.$route.query){
          this.$route.query[key] = ''
        }
        document.querySelector('.fullSearch input').value = ''

        if(this.typePage != false){
          this.pageText.title = this.$t('titleCompany')
          this.controls.liveItemText = 'shortName'
          this.search.label = this.$t('inputSearchOrg')
          this.$emit('clearData')
          return true
        }
        this.$emit('clearData')
        this.pageText.title = this.$t('titleAddress')
        this.controls.liveItemText = 'formattedAddress'
        this.search.label = this.$t('inputSearch')
        this.search.input = '';
        this.$route.query.house = '';
        this.$route.query.organization = '';
        //this.$refs.searchForm.inputs[0].value = '';
      },
      toggleSearch(){
        this.search.isSettings = !this.search.isSettings
        this.$emit('clearData')

      },
      async changeSettings(typeSelect){
        //Выбор select поиска
        let request = [], formData = {};
        try {
          switch (typeSelect) {
            case 'region':
              this.search.settings.area = ''
              this.search.settings.street = ''
              this.search.settings.city = ''
              this.search.settings.home = ''

              if(!this.search.settings.region.aoGuid){
                this.search.settings.region = ''
                this.search.streetListAll = []
                this.search.streetList = []
                this.search.cityListAll = []
                this.search.cityList = []
                break;
              }
              formData =  {
                aoGuid: this.search.settings.region.aoGuid
              }
              request = await this.handlerAxios('post', 'v1/address/area', formData)
              //Записываем районы
              request.area.unshift({name: '', guid: '', id:0})
              this.search.areaListAll = request.area;
              this.search.areaList = request.area;
              break;

            case 'area':
              this.search.settings.street = ''
              this.search.settings.city = ''
              this.search.settings.home = ''
              if(!this.search.settings.area.aoGuid){
                this.search.settings.area = ''
                this.search.streetListAll = []
                this.search.streetList = []
                this.search.cityListAll = []
                this.search.cityList = []
                this.search.homeListAll = []
                this.search.homeList = []
                break;
              }

              formData =  {
                aoGuid: this.search.settings.area.aoGuid
              }
              request = await this.handlerAxios('post', 'v1/address/city', formData)
              //Записываем населеный пункт
              request.city.unshift({name: '', guid: '', id:0})
              this.search.cityListAll = request.city;
              this.search.cityList = request.city;

              //Записываем улицы
              request.street.unshift({name: '', guid: '', id:0})
              this.search.streetListAll = request.street;
              this.search.streetList = request.street;
              break;
            case 'city':
              this.search.settings.street = ''
              this.search.settings.home = ''
              if(!this.search.settings.city.aoGuid){
                this.search.settings.city = ''
                this.search.homeListAll = []
                this.search.homeList = []
                break;
              }
              formData =  {
                aoGuid: this.search.settings.city.aoGuid
              }
              request = await this.handlerAxios('post', 'v1/address/street', formData)
              //Записываем населеный пункт
              request.street.unshift({name: '', guid: '', id:0})
              this.search.streetList = request.street;
              this.search.streetListAll = request.street;
              break;
            case 'street':
              this.search.settings.home = ''
              if(!this.search.settings.street.aoGuid){
                this.search.settings.street = ''
                break;
              }
              formData =  {
                and:{
                  region: this.search.settings.region.id,
                  settlement: this.search.settings.city.id,
                  street: this.search.settings.street.id,
                },
                or:[
                  {area: this.search.settings.area.id},
                  {city: this.search.settings.area.id}
                ],
                limit: 100000
              }
              request = await this.handlerAxios('post', 'v1/address/home', formData)
              request.house.rows.unshift({houseTextAddress: '', guid: '', id:0})
              this.search.homeListAll = request.house.rows
              this.search.homeList = request.house.rows
              //Записываем населеный пункт
              break;
            case 'home':
              break;
          }

          document.querySelector('.formParams .btn_search ').focus()
        } catch (e) {
          console.log(e)
        }

      },
      searchRegionList(e) {
        //Фильтр реиона по строке поиска
        if (this.search.inputRegion) {
          const pattern = new RegExp(`\b?${this.search.inputRegion}\b?`, 'ig')
          this.search.regionList =  this.search.regionListAll.filter(thing =>  thing.name.toLowerCase().match(pattern))
        } else {
          this.search.regionList = this.search.regionListAll
        }
      },
      searchAreaList(e) {
        //Фильтр района по строке поиска
        if (this.search.inputArea) {
          const pattern = new RegExp(`\b?${this.search.inputArea}\b?`, 'ig')
          this.search.areaList =  this.search.areaListAll.filter(thing =>  thing.name.toLowerCase().match(pattern))
        } else {
          this.search.areaList = this.search.areaListAll
        }
      },
      searchCityList(e) {
        //Фильтр населеного пункта по строке поиска
        if (this.search.inputCity) {
          const pattern = new RegExp(`\b?${this.search.inputCity}\b?`, 'ig')
          this.search.cityList =  this.search.cityListAll.filter(thing =>  thing.name.toLowerCase().match(pattern))
        } else {
          this.search.cityList = this.search.cityListAll
        }
      },
      searchStreetList(e) {
        //Фильтр улицы по строке поиска
        if (this.search.inputStreet ){
          const pattern = new RegExp(`\b?${this.search.inputStreet}\b?`, 'ig')
          this.search.streetList =  this.search.streetListAll.filter(thing =>  thing.name.toLowerCase().match(pattern))
        } else {
          this.search.streetList = this.search.streetListAll
        }
      },
      searchHouseList(e) {
        //Фильтр дома по строке поиска
        if (this.search.inputHome ){
          const pattern = new RegExp(`\b?${this.search.inputHome}\b?`, 'ig')
          this.search.homeList =  this.search.homeListAll.filter(thing =>  thing.houseTextAddress.toLowerCase().match(pattern))
        } else {
          this.search.homeList = this.search.homeListAll
        }
      },
      async liveSend(){
        //Оптравка живой поиск
        try{
          let request = {}, formData = {}
          this.controlButton.liveButton = true;
          //Проверка пустая ли строка
          if(!this.search.input.guid){
            this.$messagesError("Заполните поле поиска");
            this.controlButton.liveButton = false;
            return false;
          }

          //Отправка огранзиаци
          if(this.typePage != false){

            let organizationGuid = this.search.input.guid

            formData = {
              guid: organizationGuid
            }
            let request = await this.handlerAxios('post', 'v1/organization-guid/', formData)
            if(request.status != true){
              return false;
            }
            this.$emit('liveSendOrganization', request.organization)
            this.$router.push(`/portal/?organization=${organizationGuid}`)
            this.controlButton.liveButton = false;

            return true
          }

          //Отправка дома
          let houseGuid = this.search.input.guid

          formData = {
            guid: houseGuid
          }
          request = await this.handlerAxios('post', 'v1/address/house-one/', formData)
          if(request.status == true){
            this.$emit('liveSend', request.house)
            this.$router.push(`/portal/?house=${houseGuid}`)
            this.listOrganizations(request.house.resourceProvisionOrganizationList, request.house.managementOrganization)
            this.controlButton.liveButton = false;
          }
        } catch (e) {
          this.controlButton.liveButton = false;
          console.log(e)
        }
      },
      async sendParams(typeSetting){
        //Оптравка расширеные на стройки
        try{

          //Открытие новой страницы с параметрами по дому
          //Если расширеные настройки
          this.controlButton.paramsButton = true;
          if(this.typePage != false){
            //Запрос по организациям
            this.preloader.modal = true;
            let formData =  {
              and:{
                region: this.search.settings.region.id,
                settlement: this.search.settings.city.id,
                street: this.search.settings.street.id,
              },
            }
            if(this.search.settings.area.id){
              formData.or  = [{area: this.search.settings.area.id}, {city: this.search.settings.area.id}]
            }
            let request = await this.handlerAxios('post', 'v1/organization-params/', formData)
            if(request.status != true){
              this.$messagesError("Произошла ошибка");
              setTimeout(() => {
                this.preloader.modal = false;
              }, 2000)
              return false
            }
            request.organizations.data = formData
            this.$emit('sendParamsOrg', request.organizations)
            this.controlButton.paramsButton = false;
            setTimeout(() => {
              this.preloader.modal = false;
            }, 2000)
            return true
          }


          //Если дом выбран
          if(this.search.settings.home){
            this.search.input = this.search.settings.home
            this.liveSend();
            this.controlButton.paramsButton = false;
            return true;
          }


          let formData =  {
            and:{
              region: this.search.settings.region.id,
              settlement: this.search.settings.city.id,
              street: this.search.settings.street.id,
            },
          }
          if(this.search.settings.area.id){
            formData.or  = [{area: this.search.settings.area.id}, {city: this.search.settings.area.id}]
          }


          let request = await this.handlerAxios('post', 'v1/address/home', formData)

          if(request.status == true){
            //Если запрос прошел собираем данные
            let data = {
              region: this.search.settings.region.id,
              area: this.search.settings.area.id,
              city: this.search.settings.area.id,
              settlement: this.search.settings.city.id,
              street: this.search.settings.street.id,
            }
            let urlParams = '?';
            for(let key in data){
              if(data[key]){
                urlParams += `&${key}=${data[key]}`
              }
            }
            request.house.data = formData

            this.$emit('sendParams', request.house)
            this.$router.push(`/portal/${urlParams}`)
            this.controlButton.paramsButton = false;
          }
          this.controlButton.paramsButton = false;
        } catch (e) {
          this.controlButton.paramsButton = false;
          console.log(e)
        }
      },
      scrollMaps(){
        //Скролл к карте
        document.getElementById("maps").scrollIntoView({block: "center", behavior: "smooth"})
      },

      watchData(e){
        if(this.$route.query.organization){
          this.search.input = e.fullName
          this.pageText.title = this.$t('titleCompany')
          this.controls.liveItemText = 'fullName'
          this.typePage = true
        }
      },

      listOrganizations(data, org){
        //Формирование списка доступных организаций по адресу
        this.service.listSortIds = data.map(item => {
          return item.id
        })
        this.service.listSortIds.push(org.id)
      },
      async createRouter(){
        //Полчуние региона
        let request = await this.handlerAxios('get', 'v1/address/region/')
        this.search.regionListAll = request.data
        this.search.regionList = request.data

        //Если есть гет параметр на дом
        if(this.$route.query.house){
          this.typePage = false;
          let formData = {
            guid: this.$route.query.house
          }
          request = await this.handlerAxios('post', 'v1/address/house-one/', formData)
          this.listOrganizations(request.house.resourceProvisionOrganizationList, request.house.managementOrganization)
          this.$emit('liveSend', request.house)
          this.search.input = request.house
          this.search.dataLive = []
          this.controls.liveItemText = 'formattedAddress'
          console.log('this.search.input', this.search.input)
          return true;
        }

        //Если есть гет параметр на организацию
        if(this.$route.query.organization){
          this.typePage = true
          let formData = {
            guid: this.$route.query.organization
          }
          request = await this.handlerAxios('post', 'v1/organization-guid/', formData)
          this.search.dataLive = []
          this.pageText.title = this.$t('titleCompany')
          this.controls.liveItemText = 'fullName'
          this.$emit('liveSendOrganization', request.organization)
          this.search.input = request.organization
          console.log('organization', request.organization)
          console.log('this.search.input', this.search.input)
          return true;
        }


        //есть ли гет параметры по расширеным настройкам
        if(this.$route.query.region){
          let formData =  {
            and:{
              region: this.$route.query.region,
              settlement: this.$route.query.city,
              street: this.$route.query.street,
            },
          }
          if(this.$route.query.area){
            formData.or  = [{area: this.$route.query.area}, {city: this.$route.query.area}]
          }


          let request = await this.handlerAxios('post', 'v1/address/home', formData)

          request.house.data = formData

          this.$emit('sendParams', request.house)
          return true;
        }

        const date = new Date();
        if(date.getDate() >= 1 && date.getDate() <= 25){
          this.controls.isSend = false;
        }
      }
    },
    watch:{
      typePage: function (e) {
        this.swichHandler();
      },
      data: function (e) {
        this.watchData(e)
      },
      async "$route.query.organization"() {
        if(this.$route.query.organization){
          this.createRouter();
        }
      },
      async "$route.query.house"() {
       if(this.$route.query.house){
         this.createRouter();
       }
      },
    }
  }
</script>
<i18n>
  {
    "ru": {
      "titleAddress": "Информация по адресу",
      "titleCompany": "Информация по управляющей организации",
      "description": "Заполните поля чтобы найти дом в нашей системе",
      "infoText": "Возникли вопросы?",
      "inputSearch": "Введите ваш адрес",
      "inputSearchOrg": "Введите организацию",
      "region": "Регион",
      "area": "Район или город",
      "settlement": "Населеный пункт",
      "street": "Улица",
      "house": "Дом",
      "countName": "Подать показания счетчиков",
      "viewMap":"Посмотреть на карте",
      "settingsName": "Расширеный поиск",
      "buttonName": "Перейти в карточку дома",
      "buttonNameOrg": "Перейти в карточку организации",
      "placeholderName": "Поиск",
      "noSearch": "Ничего не найдено",
      "liveSearch": "Живой поиск",
      "checkName": "Организаций",
      "modalCountTitle": "Подать показания счетчиков",
      "modalCountSend":"Отправить",
      "modalCountRecovery":"Восстановить прошлые данные",
      "modalCountItemTitle":"Добавить счетчик",
      "modalCountItemDesc":"Нажмите на поле чтобы добавить услугу и показание счетчика",
      "modalCountItemDelete":"Удалить",
      "modalCountItemCopy":"Дублировать",
      "modalCountItemType":"Выберите тип счетчика",
      "modalCountItemLic":"Лицевой счет",
      "modalCountItemThisView":"Текущее показание",
      "modalCountItemComment":"Комментарий",
      "modalCountEmailTitle":"Напишите вашу электронную почту",
      "modalCountEmailDesc":"и мы отправим копию вашей заявки",
      "modalCountEmailInput":"Электронная почта",
      "modalServiceTitle":"Выберите услугу",
      "modalServiceSend":"Выбрать",
      "modalServiceClose":"Отменить",
      "modalServiceSelectText":"Услуги"
    },
    "ch": {
      "titleAddress": "Адрес информаци",
      "titleCompany": "Управляющи организацийӗнчи информаци",
      "description": "Пирĕн системăра çурт тупас тесе кашни йĕркине çырса тухăр",
      "infoText": "Ыйтусем тухсан çыхăнмалли",
      "inputSearch": "Хăвăр адреса çырăр",
      "inputSearchOrg": "Организацие ҫырса ярӑр",
      "region": "Регион",
      "area": "Район е федераци пĕлтерĕшлĕ хула",
      "settlement": "Хула-ял",
      "street": "Урам",
      "house": "Ҫурт",
      "countName": " Счетчик кăтартнине памалли",
      "viewMap":"Карттă çинче пăхăр",
      "settingsName": "Хушма опцисем",
      "buttonName": "Ҫурт карточкине куҫăр",
      "buttonNameOrg": "Организаци карточкине куҫăр",
      "placeholderName": "Шырав",
      "noSearch": "Нимĕн те тупайман",
      "liveSearch": "Йăпăр-япăр шырав",
      "checkName": "Организаций",
      "modalCountTitle": "Счетчик кăтартнине памалли",
      "modalCountSend":"Яр",
      "modalCountRecovery":"Иртнĕ даннăйсене тавăрмалли",
      "modalCountItemTitle":"Счетчик хушса пар",
      "modalCountItemDesc":"Тивĕçтерÿ хушма тата счетчик кăтартнине пама йĕрки çине пусăр",
      "modalCountItemDelete":"Тасатмалли",
      "modalCountItemCopy":"Дубликат тумалли",
      "modalCountItemType":"Счетчик типне суйлăр",
      "modalCountItemLic":"Пайăр счет",
      "modalCountItemThisView":"Хальхи кăтартни",
      "modalCountItemComment":"Комментари",
      "modalCountEmailTitle":"Хăвăр электронлă адреса çырса",
      "modalCountEmailDesc":"эпир сирĕн заявкăн копине ярса паратпăр",
      "modalCountEmailInput":"Электронлă адрес",
      "modalServiceTitle":"Тивĕçтерÿ суйлăр",
      "modalServiceSend":"Суйласа ларт",
      "modalServiceClose":"Пăрахăçла",
      "modalServiceSelectText":"Тивĕçтерÿсем"
    }
  }

</i18n>
<style lang="scss" scoped>
  @keyframes preloader {
    0%{
      transform: rotate(0);
    }
    100%{
      transform: rotate(100000deg);
    }
  }
  .preloader{
    position: fixed;
    top: 0;
    z-index: 1000;
    background-color: rgba(255,255,255,.95);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    img{
      width: 100px;
      height: 100px;
      margin-bottom: 15px;
      animation: preloader 400s linear;
      animation-iteration-count: infinite;
    }
    h4{
      color: #333333;
      font-size: 1.7em;
      font-weight: 500;
      margin-bottom: 5px;
    }
    p{
      color: #333333;
      font-size: 1.2em;
      font-weight: 100;
    }
  }
  .modalCounter{
    .captcha{
      padding-left: 30px;
    }
  }
  .modalIsGood{
    .v-card__title{
      font-weight: 300;
    }
    .v-card__text{
      font-size: 1em;
    }
  }
  .search_home__content .v-card__actions{
    width: 100%;
    button{
      width: auto;
    }
  }
  .icon_btn{
    color: #333 !important;
    transition: .4s all;
    &:hover{
      transform: scale(1.1);
    }
    .v-ripple__container{
      display: none !important;
    }
    &:before{
      display: none !important;
    }
    &:after{
      display: none;
    }
    .v-icon{
      color: #fff;
      background-color: #0079FE;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
  .switcherItem{
    display: flex;
    align-items: center;
    p{
      margin-bottom: 0;
      font-weight: normal;
      font-size: 16px;
      margin-right: 10px;
      color: rgba(0, 0, 0, 0.6);
      cursor: pointer;
    }
  }
  .modalService{
    .col{
      padding: 30px 12px;
    }
  }
  .modal{
    .modal__top{
      padding: 20px 30px;
      border-bottom: 1px rgba(50,50,50, .2) solid;
      display: flex;
      justify-content: space-between;
      .v-card__title{
        font-size: 2em;
        font-weight: 100;
        color: #333;
        padding: 0;
        margin-bottom: 0px;
      }
      .v-card__text{
        padding: 0;
        font-size: 1em;
        font-weight: 300;
        margin-top: 10px;
      }
    }
    .modal__bottom{
       padding: 20px 30px;
      padding-bottom: 0;
       display: flex;
       justify-content: space-between;
       .v-card__title{
         font-size: 2em;
         font-weight: 100;
         color: #333;
         padding: 0;
         margin-bottom: 0px;
       }
       .v-card__text{
         padding: 0;
         font-size: 1em;
         font-weight: 300;
         margin-top: 10px;
       }
     }
    .modal__footer{
      width: 100%;
    }
    .container{
      padding: 0;
      max-width: 100%;
      .row{
        margin: 0;
        .col-md-4{
          border: 1px rgba(50,50,50,.3) dashed;
          border-top: none;
          border-left: none;
          cursor: pointer;
          text-align: center;
          margin: 0;
          padding: 0;
          -webkit-transition: .4s;
          -moz-transition: .4s;
          -ms-transition: .4s;
          -o-transition: .4s;
          transition: .4s;

          &:active{
            background-color: #E6F2FF;
          }
        }
      }
    }
    .text{
      padding: 55px 20px;
      &:hover{
        background-color: #F2F8FF;
      }
      .v-icon.v-icon{
        color: #fff;
        background-color: #0079FE;
        border-radius: 50%;
        width: 45px;
        height: 45px;
        margin-bottom: 10px;
        &:hover{
          background-color: #0079FE;
        }
      }
      h4{
        font-size: 1.5em;
        color: #333;
        font-weight: 100;
      }
      p{
        font-size: 1em;
        font-weight: 100;
        line-height: 1.3;
      }
    }
    .v-select .v-menu__content{
      max-width: 100% !important;
    }
  }
  .search_home__content .v-input__control .v-label{
    top: 4px;
  }
  .formCounter{
    padding: 0px 0 20px 0;
    &__top{
      .v-card__actions{
        padding: 0;
      }
      .v-btn{
        width: auto !important;
      }
      .col{
        padding: 0px 10px !important;
      }
    }
    .v-list-item__title{
      text-align: left;
      font-size: 1.2em;
      font-weight: 100;
    }
    .col{
      padding: 4px 10px;
    }
  }
  .liveSearch {
    input{
      padding-left: 15px !important;
    }
  }
  @media screen and (max-width: 900px){
    .formCounter__top{
      .v-card__actions{
        justify-content: flex-end;
      }
    }
    .modal{
      .modal__top{
        .v-card__title{
          font-size: 1.5em;
        }
        .v-card__text{
          margin-top: 0;
          font-size: 14px;
        }
      }
    }
  }
  @media screen and (max-width: 650px){
    .preloader{
      &__content{
        img{
          height: 70px;
          width: 70px;
        }
      }
    }
    .modalIsGood .v-card__text{
      font-size: 1.3em;
    }
    .modal{
      margin: 0;

      &.modalCounter{
        .captcha{
          padding-left: 15px;
        }
        .modal__top{
          padding-top: 60px;
        }

        .closeModal{
          position: absolute;
          top: 10px;
          right: 0px;
        }
        .sendModal{
          width: 100%;
          margin-top: 20px;
          margin-bottom: 20px;
        }
      }


      .v-card{
        display: flex;
        flex-wrap: wrap;
      }
      .modal__top{
        padding: 15px;
        flex-wrap: wrap;
        order: 0;
        width: 100%;
        .v-card__title{
          line-height: 1.4rem;
          font-size: 16px;
        }
        .v-card__text{
          margin-top: 10px;
          font-size: 14px;
          word-break: break-word;
        }
        .v-card__actions{
          width: 100%;
          padding: 0;
          flex-wrap: wrap;
          .sendModal{
            order: 1;
            margin-left: 0;
            margin-bottom: 10px;
          }
          .recoveryCounter{
            order: 2;
            width: 100% !important;
          }
        }
      }
      .modal__bottom{
        padding: 15px;
        order: 1;
        padding-bottom: 0;
        .v-card__title{
          line-height: 1.2;
          font-size: 18px !important;
        }
        .v-card__text{
          margin-top: 1px;
          font-size: 12px !important;
        }
      }
      .text{
        padding: 20px;
        h4{
          font-size: 1.8em;
          margin-bottom: 5px;
        }
        p{
          font-size: 1.3em;
        }
        .v-icon.v-icon{
          width: 35px;
          height: 35px;
        }
      }
      .v-form{
        order: 4;
        width: 100%;
      }
      .formCounter{
        .container{
          .row{
            .col-12{
              &:nth-child(1){
                border-top: 1px rgba(50, 50, 50, 0.3) dashed;
              }
            }
          }
        }
      }
    }
  }
</style>
