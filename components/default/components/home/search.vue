<template>
  <div class="search_home">
    <div class="search_home__top">
      <div class="text">
        <h1>{{pageText.title}}</h1>
        <p>{{$t('description')}}</p>
      </div>
      <div class="search_home__info">
        <a href="mailto:info@portal-jkh.ru" v-if="isChecked != 'true'"><span>{{$t('infoText')}}</span><img src="/img/default/mail.svg" alt="">info@portal-jkh.ru</a>
        <v-switch
          v-model="typePage"
          :label="$t('checkName')"
          color="info"
          @change="swichHandler"
          v-if="isChecked != 'false'"
        ></v-switch>
      </div>
    </div>
    <div class="search_home__content">
      <v-form v-if="search.isSettings != true" class="fullSearch">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-combobox
                v-model="search.input"
                class="liveSearch"
                @keydown="liveSearch($event)"
                :label="$t('inputSearch')"
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
              @click="openModelCounter"
              x-small
              text
              v-if="isChecked != 'false'"
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
              color="primary"
              class="btn_search"
              @click="liveSend"
            >
              {{$t('buttonName')}}
            </v-btn>

          </v-card-actions>
        </v-row>
      </v-form>

      <v-form v-if="search.isSettings == true">
        <v-container>
          <v-row>
            <v-col cols="12" md="3" sm="6">
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
            <v-col cols="12" md="2" sm="6">
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
            <v-col cols="12" md="3" sm="6" >
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
            <v-col cols="12" md="1" sm="4">
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
              v-if="isChecked != 'false'"
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
              @click="sendParams(true)"
            >
              {{$t('buttonName')}}
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
      <v-card>
        <div class="modal__top">
          <div class="top__text">
            <v-card-title>
              {{$t('modalCountTitle')}}
            </v-card-title>

            <v-card-text>
              <b>Адрес:</b> г Чебоксары ул Радужная д 4 кв 613
            </v-card-text>
          </div>


          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              class="recoveryCounter"
              @click="recoveryCounter"
              v-if="counter.oldData.length > 0"
              text
            >{{$t('modalCountRecovery')}}</v-btn>
            <v-btn
              color="primary"
              class="sendModal"
              @click="sendCounter"
            >
              {{$t('modalCountSend')}}
            </v-btn>
            <v-btn
              color="primary darken-1"
              class="closeModal"
              text
              @click="counter.modal = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </div>

        <v-form class="formCounter">
          <v-container>
            <v-row>
              <v-col cols="12" md="4" v-for="item in counter.forms" :key="item.id">

                <div class="text" @click="openService" v-if="item.isHidden == true">
                  <v-icon>mdi-plus</v-icon>
                  <h4>{{$t('modalCountItemTitle')}}</h4>
                  <p>{{$t('modalCountItemDesc')}}</p>
                </div>

                <v-form v-if="item.isHidden != true" class="formCounter">
                  <v-row class="formCounter__top" align="center">
                    <v-col cols="6">
                      <v-list-item-title>{{ item.titleForm }}</v-list-item-title>
                    </v-col>
                    <v-col cols="6">
                      <v-card-actions>
                        <v-btn
                          color="primary darken-1"
                          text
                          @click="dublicateService(item.id)"
                        >
                          {{$t('modalCountItemCopy')}}
                        </v-btn>
                        <v-btn
                          color="red"
                          @click="deleteService(item.id)"
                          text
                        >
                          {{$t('modalCountItemDelete')}}
                        </v-btn>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-select
                        v-model="item.type"
                        :items="counter.types"
                        v-if="item.isType != false"
                        item-text="name"
                        item-value="name"
                        :label="$t('modalCountItemType')"
                      ></v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="item.licNumber"
                        :label="$t('modalCountItemLic')"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="item.thisView"
                        :label="$t('modalCountItemThisView')"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="item.comment"
                        :label="$t('modalCountItemComment')"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>

                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <div class="modal__footer">
          <div class="modal__bottom">
            <div class="top__text">
              <v-card-title>
                {{$t('modalCountEmailTitle')}}
              </v-card-title>

              <v-card-text>
                {{$t('modalCountEmailDesc')}}
              </v-card-text>
            </div>
          </div>
          <v-form value>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="counter.fromEmail"
                    :label="$t('modalCountEmailInput')"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </div>

      </v-card>
    </v-dialog>


    <v-dialog
      v-model="service.modal"
      content-class="modal"
      max-width="500"
    >
      <v-card>
        <div class="modal__top">
          <div class="top__text">
            <v-card-title>{{$t('modalServiceTitle')}}</v-card-title>
          </div>
        </div>

        <v-form class="modalService">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="service.data"
                  :items="service.list"
                  attach
                  :label="$t('modalServiceSelectText')"
                  :no-data-text="$t('noSearch')"
                  item-value="MunicipalResource"
                  item-text="shortName"
                >
                  <template v-slot:prepend-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-text-field v-model="search.selectInput" :placeholder="$t('placeholderName')" @input="searchRegionList"></v-text-field>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-container>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary darken-1"
              text
              @click="service.modal = false"
            >
              {{$t('modalServiceClose')}}
            </v-btn>
            <v-btn
              color="primary"
              @click="selectService"
            >
              {{$t('modalServiceSend')}}
            </v-btn>
          </v-card-actions>
        </v-form>

      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  import Cookie from 'cookie'
  import Cookies from 'js-cookie'
  import handlerAxiosMixins from '~/mixins/hendlerAxios.mixins'

  export default {
    props:['title', 'isChecked', 'data'],
    mixins:[handlerAxiosMixins],
    data(){
      return{
        //Заголвок страницы
        pageText:{
          title: this.title ?? '',
        },
        controls:{
          //Настройки для полей
          liveItemText: 'formattedAddress'
        },
        //Какой тип поиска по адресу=false по огранизации=true
        typePage:false,
        //Данные по услугам
        service:{
          modal:false,
          data:'',
          list:[]
        },
        //Данные по счетчикам
        counter:{
          modal:false,
          forms:[
            {
              id:0,
              titleForm:'',
              type: '',
              licNumber: '',
              thisView: 0,
              comment:'',
              email:'',
              isType: false,
              isHidden: true
            },
            {
              id:1,
              type: '',
              licNumber: '',
              thisView: 0,
              comment:'',
              email:'',
              inn:'',
              isType: false,
              isHidden: true
            },
            {
              id:2,
              titleForm:'',
              type: '',
              licNumber: '',
              thisView: 0,
              comment:'',
              email:'',
              inn:'',
              isType: false,
              isHidden: true
            },
            {
              id:3,
              titleForm:'',
              type: '',
              licNumber: '',
              thisView: 0,
              comment:'',
              email:'',
              inn:'',
              isType: false,
              isHidden: true
            },
            {
              id:4,
              titleForm:'',
              type: '',
              licNumber: '',
              thisView: 0,
              comment:'',
              email:'',
              inn:'',
              isType: false,
              isHidden: true
            },
            {
              id:5,
              titleForm:'',
              type: '',
              licNumber: '',
              thisView: 0,
              comment:'',
              email:'',
              inn:'',
              isType: false,
              isHidden: true
            },
          ],
          types:[
            {
              id: 0,
              name: 'Горячая вода (сан)',
            },
            {
              id: 1,
              name: 'Холодная вода (сан)',
            },
            {
              id: 1,
              name: 'Холодная вода (кух)',
            },
            {
              id: 1,
              name: 'Холодная вода (кух)',
            },
          ],
          fromEmail: '',
          isOld:false,
          oldData:[],
        },
        //Параметры поиска
        search:{
          dataLive:[],
          isSettings: false,
          input:'',
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
        setTimeoutReq: {}
      }
    },
    async created() {
      const cookieStr = process.browser ? document.cookie : ''
      const cookies = Cookie.parse(cookieStr || '') || {};

      //Сохраняем данные из кукие прошлые показания
      if(cookies.dataCounter){
        let jsonCookie = JSON.parse(cookies.dataCounter)
        this.counter.oldData = jsonCookie
      }

      this.pageText.title = this.$t('titleAddress');

      try {
        //Полчуние региона
        let request = await this.handlerAxios('get', 'v1/address/region/')
        this.search.regionListAll = request.data
        this.search.regionList = request.data

        //Если есть гет параметр на дом
        if(this.$route.query.house){
          let formData = {
            guid: this.$route.query.house
          }
          request = await this.handlerAxios('post', 'v1/address/house-one/', formData)
          this.$emit('liveSend', request.house)
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
      }catch (e) {
        console.log(e);
      }

    },
    methods:{
      filterCombo(){
        //Фильтр для live поиска
        return this.search.dataLive;
      },
      async liveSearch(event){
        //Живой поиск
        try {
          //Поиск по оргназиации
          if(this.typePage != false){

            clearTimeout(this.setTimeoutReq);
            this.setTimeoutReq = setTimeout(async () => {
              let formData = {
                search: event.target.value
              }
              let request = await this.handlerAxios('post', 'v1/organization/live-search/', formData)
              if(request.status == true){
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
      swichHandler(){
        //Переключение поиска по адресу или по огранизации
        this.search.input = '';
        this.search.dataLive = [];

        if(this.typePage != false){
          this.pageText.title = this.$t('titleCompany')
          this.controls.liveItemText = 'fullName'
          return true
        }

        this.pageText.title = this.$t('titleAddress')
        this.controls.liveItemText = 'formattedAddress'
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
              formData =  {
                aoGuid: this.search.settings.region.aoGuid
              }
              request = await this.handlerAxios('post', 'v1/address/area', formData)
              //Записываем районы
              this.search.areaListAll = request.area;
              this.search.areaList = request.area;
              break;
            case 'area':
              formData =  {
                aoGuid: this.search.settings.area.aoGuid
              }
              request = await this.handlerAxios('post', 'v1/address/city', formData)
              //Записываем населеный пункт
              this.search.cityListAll = request.city;
              this.search.cityList = request.city;

              //Записываем улицы
              this.search.streetListAll = request.street;
              this.search.streetList = request.street;
              break;
            case 'city':
              formData =  {
                aoGuid: this.search.settings.city.aoGuid
              }
              request = await this.handlerAxios('post', 'v1/address/street', formData)
              //Записываем населеный пункт
              this.search.streetList = request.street;
              this.search.streetListAll = request.street;
              break;
            case 'street':
              formData =  {
                and:{
                  region: this.search.settings.region.id,
                  settlement: this.search.settings.city.id,
                  street: this.search.settings.street.id,
                },
                or:[
                  {area: this.search.settings.area.id},
                  {city: this.search.settings.area.id}
                ]
              }
              request = await this.handlerAxios('post', 'v1/address/home', formData)
              this.search.homeListAll = request.house
              this.search.homeList = request.house
              //Записываем населеный пункт
              break;
            case 'home':
              break;
          }
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
          let houseGuid = this.search.input.guid

          let formData = {
            guid: houseGuid
          }
          let request = await this.handlerAxios('post', 'v1/address/house-one/', formData)
          if(request.status == true){
            this.$emit('liveSend', request.house)
            this.$router.push(`/portal/?house=${houseGuid}`)
          }
        } catch (e) {
          console.log(e)
        }
      },
      async sendParams(typeSetting){
        //Оптравка расширеные на стройки
        try{
          //Открытие новой страницы с параметрами по дому
          //Если расширеные настройки
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
          }
        } catch (e) {
          console.log(e)
        }
      },
      scrollMaps(){
        //Скролл к карте
        document.getElementById("maps").scrollIntoView({block: "center", behavior: "smooth"})
      },
      async openModelCounter(){
        //Открытие модылки для показании счетчиков
        this.counter.modal = true
        let request = await this.handlerAxios('get', 'v1/auth/organization')

        if(request.status != true){
          return false
        }

        this.service.list = request.data.content
      },
      openService(){
        //Открытие выбора услуги
        this.service.modal = true
      },
      selectService(e){
        //Выбор услуги в модалке
        let isVisibleType = false;


        //Проверка были ли выбрана услуга
        if(this.service.data == ''){
          this.service.data = '';
          alert('Выберите услугу')
          return false;
        }

        //Определяем тип услуги и показывать ли варианты счетчиков
        switch (this.service.data.code) {
            case 'plumbing':
              isVisibleType = true;
              break;
        }

        //Находим первую свободную ячейку
        let itemFormIndex = this.counter.forms.findIndex(item => item.isHidden == true)

        //Если ячейки все заняты
        if(itemFormIndex == -1){
          this.service.data = ''
          alert('Все ячейки заполены')
          this.closeSelectService()
          return false
        }

        //Получаем все данные по выбраной услуги
        let itemService = this.service.list.find(item => item.MunicipalResource.code === this.service.data.code)


        //Заполняем данные по счетчику
        this.counter.forms[itemFormIndex].isType = isVisibleType;
        this.counter.forms[itemFormIndex].titleForm = itemService.shortName;
        this.counter.forms[itemFormIndex].email = itemService.email;
        this.counter.forms[itemFormIndex].inn = itemService.inn;
        this.counter.forms[itemFormIndex].isHidden = false;
        console.log(isVisibleType, this.counter.forms[itemFormIndex]);


        this.closeSelectService()
        this.service.data = ''
      },
      closeSelectService(){
        //Закрытие модалки выбора услуги
        this.service.modal = false
        this.service.data = ''
      },
      deleteService(id){
        //Удаление счетчика с услугой
        const idIndex = this.counter.forms.findIndex(item => item.id == id)
        this.counter.forms[idIndex].type = ''
        this.counter.forms[idIndex].licNumber = ''
        this.counter.forms[idIndex].thisView = 0
        this.counter.forms[idIndex].comment = ''
        this.counter.forms[idIndex].email = ''
        this.counter.forms[idIndex].inn = ''
        this.counter.forms[idIndex].isType = false
        this.counter.forms[idIndex].isHidden = true
        this.counter.forms[idIndex].titleForm = ''
      },
      dublicateService(id){
        //Дублируем счетчик с улоугой в показаниях
        const idIndex = this.counter.forms.findIndex(item => item.id == id)

        let itemFormIndex = this.counter.forms.findIndex(item => item.isHidden == true)

        if(itemFormIndex == -1){
          this.service.data = ''
          alert('Все ячейки заполены')
          this.closeSelectService()
          return false
        }


        this.counter.forms[itemFormIndex].titleForm = this.counter.forms[idIndex].titleForm
        this.counter.forms[itemFormIndex].type = this.counter.forms[idIndex].type
        this.counter.forms[itemFormIndex].licNumber = this.counter.forms[idIndex].licNumber
        this.counter.forms[itemFormIndex].thisView = this.counter.forms[idIndex].thisView
        this.counter.forms[itemFormIndex].comment = this.counter.forms[idIndex].comment
        this.counter.forms[itemFormIndex].email = this.counter.forms[idIndex].email
        this.counter.forms[itemFormIndex].inn = this.counter.forms[idIndex].inn
        this.counter.forms[itemFormIndex].isType = this.counter.forms[idIndex].isType
        this.counter.forms[itemFormIndex].isHidden = this.counter.forms[idIndex].isHidden

        console.log(this.counter.forms)
      },
      async sendCounter(){
        //Отправка показанй
        console.log(this.counter.forms);
        let formData = {
          data: this.counter.forms.filter(item => item.isHidden != true),
          fromEmail: this.counter.fromEmail
        }

        let request = await this.handlerAxios('post', 'v1/sendCounter/' , formData)

        if(request.status != true){
          return false;
        }

        //Сохраняем данные в cookie
        let arrCookie = [];
        formData.data.forEach(item => {

          let itemArr = {
            titleForm:item.titleForm,
            licNumber: item.licNumber,
            email: item.email,
            isType: item.isType,
            isHidden: item.isHidden
          }
          arrCookie.push(itemArr)

        })

        Cookies.set('dataCounter', JSON.stringify(arrCookie));

        //Удаляем счетчики
        this.counter.forms.forEach(item => {
          item.type = ''
          item.licNumber = ''
          item.thisView = 0
          item.comment = ''
          item.email = ''
          item.inn = ''
          item.isType = false
          item.isHidden = true
          item.titleForm = ''
        })
        this.counter.fromEmail = ''

        this.counter.modal = false

      },
      recoveryCounter(){
        //Востанваливаем данные из кукие и заполняем форму показаний
        for(let index = 0; index < this.counter.oldData.length; index++){
          this.counter.forms[index].titleForm = this.counter.oldData[index].titleForm
          this.counter.forms[index].licNumber = this.counter.oldData[index].licNumber
          this.counter.forms[index].email = this.counter.oldData[index].email
          this.counter.forms[index].isHidden = this.counter.oldData[index].isHidden
          this.counter.forms[index].isType = this.counter.oldData[index].isType
        }
      },
    },

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
      "region": "Регион",
      "area": "Район или город ФЗ",
      "settlement": "Населеный пункт",
      "street": "Улица",
      "house": "Дом",
      "countName": "Подать показания счетчиков",
      "viewMap":"Посмотреть на карте",
      "settingsName": "Расширеный поиск",
      "buttonName": "Найти свой дом",
      "placeholderName": "Поиск",
      "noSearch": "Ничего не найдено",
      "liveSearch": "Живой поиск",
      "checkName": "Поиск по УК",
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
      "region": "Регион",
      "area": "Район е федераци пĕлтерĕшлĕ хула",
      "settlement": "Хула-ял",
      "street": "Урам",
      "house": "Ҫурт",
      "countName": " Счетчик кăтартнине памалли",
      "viewMap":"Карттă çинче пăхăр",
      "settingsName": "Хушма опцисем",
      "buttonName": "Çурт тупмалли",
      "placeholderName": "Шырав",
      "noSearch": "Нимĕн те тупайман",
      "liveSearch": "Йăпăр-япăр шырав",
      "checkName": "УК шыравӗ",
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

  .search_home__content .v-card__actions{
    width: 100%;
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
    .modal{
      margin: 0;

      &.modalCounter{
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
