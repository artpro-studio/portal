<template>
  <div class="counter_pages">
    <div class="counter_pages__top pages__title flex space-between">
      <div class="text">
        <h1>{{$t('titlePage')}}</h1>
        <p>{{$t('modalCountTitle')}}</p>
      </div>
      <div class="counter_pages__actions">
        <v-btn
          color="primary"
          class="recoveryCounter"
          @click="recoveryCounter"
          text>{{$t('modalCountRecovery')}}</v-btn>
        <v-btn
          color="primary"
          class="sendModal"
          @click="sendCounter"
        >
          {{$t('modalCountSend')}}
        </v-btn>
      </div>
    </div>
    <div class="counter_pages__content">
      <v-card>
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
                    <v-col cols="12" md="5" sm="5">
                      <v-list-item-title>{{ item.titleForm }}</v-list-item-title>
                    </v-col>
                    <v-col cols="12" md="7" sm="7">
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
    </div>



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
                        <v-text-field v-model="search.selectInput" :placeholder="$t('placeholderName')" @input="searchService"></v-text-field>
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
    mixins:[handlerAxiosMixins],
      data(){
          return{
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
            service:{
              modal:false,
              data:'',
              list:[]
            },
            search:{
              selectInput:'',
            }
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
      },
      methods:{
        searchService(e) {
          //Поиск услгу
          //
        },
        async openService(){
          //Открытие выбора услуги
          this.service.modal = true

          let request = await this.handlerAxios('get', 'v1/auth/organization')

          if(request.status != true){
            return false
          }

          this.service.list = request.data.content
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
        }
      }
    }
</script>

<i18n>
  {
    "ru": {
      "titlePage": "Показание счетчиков",
      "titleAddress": "Информация по адресу",
      "titleCompany": "Информация по управляющей организации",
      "description": "Заполните поля чтобы найти дом в нашей системе",
      "infoText": "Возникли вопросы?",
      "inputSearch": "Введите ваш адрес",
      "region": "Регион",
      "area": "Район",
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
      "titlePage": "Счетчик кăтартни",
      "titleAddress": "Адрес информаци",
      "titleCompany": "Управляющи организацийӗнчи информаци",
      "description": "Пирĕн системăра çурт тупас тесе кашни йĕркине çырса тухăр",
      "infoText": "Ыйтусем тухсан çыхăнмалли",
      "inputSearch": "Хăвăр адреса çырăр",
      "region": "Регион",
      "area": "Район",
      "settlement": "Халӑх пункчӗ",
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
  .v-btn:not(.v-btn--round).v-size--default{
    width: auto;
  }
  .formCounter{
    margin-bottom: 20px;
    .v-list-item__title{
      text-align: left;
      text-align: left;
      font-size: 1.2em;
      font-weight: 100;
    }
    .formCounter__top{
      .col-12{
        padding: 0px 10px;
      }
    }
    .col{
      padding: 4px 10px;
    }
  }
  .counter_pages{
    &__content{
      .v-card{
        box-shadow: none;
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
            padding-bottom: 0px;
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
        padding: 55px 0;
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
  }
  @media screen and (max-width: 650px){
    .counter_pages__actions{
      flex-wrap: wrap;
      display: flex;
    }
    .sendModal{
      width: 100% !important;
      order: 1;
      margin-bottom: 10px;
    }
    .recoveryCounter{
      width: 100% !important;
      order: 2;
    }
    .counter_pages{
      &__content{
        .container{
          .row{
            .col-md-4{
              border-right: none;
            }
          }
        }
        .text{
          h4{
            font-size: 1.9em;
          }
          p{
            font-size: 1.3em;
          }
        }
        .modal__bottom{
          padding: 20px 5px;
          padding-bottom: 5px;
          .v-card__title{
            word-break: break-word;
          }
          .v-card__text{
            font-size: 1.4em;
            margin-top: 2px;
          }
          .v-form{
            .col{
              padding: 0;
            }
          }
        }
      }
    }
    .formCounter{
      .col-sm-7{
        padding: 0;
      }
      .v-list-item__title{
        font-size: 1.5em;
      }
      .v-card__actions{
        padding: 0;
      }
    }
  }
</style>
