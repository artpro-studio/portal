<template>
  <div class="counter_pages">
    <div class="counter_pages__top pages__title d-flex space-between align-center">
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
            :disabled="controls.isSend"
          >
            {{$t('modalCountSend')}}
          </v-btn>
          <v-btn
            color="primary"
            class="recoveryCounter"
            @click="closeModal"
            v-if="isModal"
            text> <v-icon
            medium
            dark
          >mdi-close</v-icon></v-btn>
      </div>
    </div>
    <div class="counter_pages__content">
      <v-card>
        <v-form class="formCounter">
          <v-container>
            <v-row>
              <v-col cols="12" md="4" v-for="(item, index) in counter.forms" :key="item.id" v-if="index === 0 || counter.forms[index - 1].email != ''">
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
                        :items="item.types"
                        v-if="item.isType != false"
                        :rules="isNotNull"
                        item-text="municipalResourceName"
                        item-value="municipalResourceName"
                        :label="$t('modalCountItemType')"
                      ></v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="item.licNumber"
                        type="number"
                        :rules="rulesLic"
                        counter="15"
                        hint="Лицевой счет от 6 до 13 символов"
                        :label="$t('modalCountItemLic')"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="item.thisView"
                        type="number"
                        :rules="maxView"
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
        <div class="captcha">
          <recaptcha />
        </div>
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
      max-width="1200"
    >
        <serviceModal
          :modal="service.modal"
          :listIds="service.listSortIds"
          @closeModal="closeModalService"
          @selectService="selectService"
        />
    </v-dialog>


    <v-dialog
      v-model="send.isGood"
      content-class="modal modalIsGood"
      max-width="500"
    >

      <v-card>
        <v-card-title class="headline">Спасибо за использование сервиса!</v-card-title>
        <v-card-text>Ваши показания счетчиков отправлены выбранным организациям.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary darken-1"
            text
            @click="send.isGood = false"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

  </div>
</template>

<script>
  import Cookie from 'cookie'
  import Cookies from 'js-cookie'
  import handlerAxiosMixins from '~/mixins/hendlerAxios.mixins'

  import serviceModal from "/components/default/components/portal/serviceModal";

    export default {
      props:['dataService', 'isModal'],
      mixins:[handlerAxiosMixins],
      components:{serviceModal},
      data(){
          return{
            counter:{
              modal:false,
              forms:[
                {
                  id:0,
                  titleForm:'',
                  type: '',
                  types: [],
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
                  types: [],
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
                  types: [],
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
                  types: [],
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
                  types: [],
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
                  types: [],
                  licNumber: '',
                  thisView: 0,
                  comment:'',
                  email:'',
                  inn:'',
                  isType: false,
                  isHidden: true
                },
              ],
              types:[],
              fromEmail: '',
              isOld:false,
              oldData:[],
            },
            service:{
              modal:false,
              listSortIds: this.dataService || [],
            },
            search:{
              selectInput:'',
            },
            send:{
              isGood:false,
            },
            controls:{
              isSend: true,
            },
            maxView: [v => v.length <= 6 || 'Макимальное колличество символов 6'],
            rulesLic: [v => (v.length >= 6 && v.length <= 13) || 'Макимальное колличество символов 13'],
            isNotNull: [v => v.length != '' || 'Значение не должно быть пустым'],
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

        const date = new Date();
        if(date.getDate() >= 1 && date.getDate() <= 25){
          this.controls.isSend = false;
        }
      },
      methods:{
        closeModal(){
            this.$emit('closeModal', false)
        },
        closeModalService(){
          //Открытие выбора услуги
          this.service.modal = false;
        },
        openService(){
          //Открытие выбора услуги
          this.service.modal = true
        },
        dublicateService(id){
          //Дублируем счетчик с улоугой в показаниях
          const idIndex = this.counter.forms.findIndex(item => item.id == id)

          let itemFormIndex = this.counter.forms.findIndex(item => item.isHidden == true)

          if(itemFormIndex == -1){
            this.service.data = ''
            this.$messagesError("Все ячейки заполены");
            this.closeSelectService()
            return false
          }


          this.counter.forms[itemFormIndex].titleForm = this.counter.forms[idIndex].titleForm
          this.counter.forms[itemFormIndex].type = this.counter.forms[idIndex].type
          this.counter.forms[itemFormIndex].types = this.counter.forms[idIndex].types
          this.counter.forms[itemFormIndex].licNumber = this.counter.forms[idIndex].licNumber
          this.counter.forms[itemFormIndex].thisView = this.counter.forms[idIndex].thisView
          this.counter.forms[itemFormIndex].comment = this.counter.forms[idIndex].comment
          this.counter.forms[itemFormIndex].email = this.counter.forms[idIndex].email
          this.counter.forms[itemFormIndex].inn = this.counter.forms[idIndex].inn
          this.counter.forms[itemFormIndex].isType = this.counter.forms[idIndex].isType
          this.counter.forms[itemFormIndex].isHidden = this.counter.forms[idIndex].isHidden

        },
        recoveryCounter(){
          //Востанваливаем данные из кукие и заполняем форму показаний
          for(let index = 0; index < this.counter.oldData.length; index++){
            this.counter.forms[index].titleForm = this.counter.oldData[index].titleForm
            this.counter.forms[index].licNumber = this.counter.oldData[index].licNumber
            this.counter.forms[index].email = this.counter.oldData[index].email
            this.counter.forms[index].isHidden = this.counter.oldData[index].isHidden
            this.counter.forms[index].isType = this.counter.oldData[index].isType
            this.counter.forms[index].type = this.counter.oldData[index].type
            this.counter.forms[index].types = this.counter.oldData[index].types
          }
        },
        async sendCounter(){
          //Отправка показанй
          try {
            let isValid = false;
            //Проверка на заполнение данных
            this.counter.forms.forEach(item => {
              if(item.isHidden != true){
                if(item.type === ''){
                  this.$messagesError('Выберите тип счетчика');
                  isValid = false;
                  return false;
                }

                if(item.thisView.length > 6 ){
                  this.$messagesError('Укажите правильные показания');
                  isValid = false;
                  return false;
                }
                if(item.licNumber.length < 6 || item.licNumber.length > 13){
                  this.$messagesError('Укажите правильный лицевой счет');
                  isValid = false;
                  return false;
                }
                isValid = true;
              }

            })


            const token = await this.$recaptcha.getResponse()
            if(token && isValid){
              if(this.counter.forms[0].email === ''){
                this.$messagesSuccess('Вы не заполнили данные');
                return false;
              }
              let formData = {
                data: this.counter.forms.filter(item => item.isHidden != true),
                fromEmail: this.counter.fromEmail
              }

              let request = await this.handlerAxios('post', 'v1/sendCounter/' , formData)

              if(request.status != true){
                return false;
              }

              //Открытие модалки об успешной отправки формы
              this.send.isGood = true;
              setTimeout(() => {
                this.send.isGood = false;
              }, 10000)

              //Сохраняем данные в cookie
              let arrCookie = [];
              formData.data.forEach(item => {

                let itemArr = {
                  titleForm:item.titleForm,
                  licNumber: item.licNumber,
                  email: item.email,
                  isType: item.isType,
                  isHidden: item.isHidden,
                  type: item.type,
                  types: item.types,
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

              await this.$recaptcha.reset()
            }

            //send token to server alongside your form data

          } catch (error) {
            this.$messagesError('Произошла ошибка, провертье правильность заполнения полей');
            console.log(error)
          }


        },
        selectService(itemData){
          //Когда выбрана услуга
          let itemFormIndex = this.counter.forms.findIndex(item => item.isHidden == true)

          //Если ячейки все заняты
          if(itemFormIndex == -1){
            this.$messagesError("Все ячейки заполены");
            return false
          }

          //Заполняем данные по счетчику
          this.counter.forms[itemFormIndex].types = itemData.data.municipalResource.length > 0 ?  itemData.data.municipalResource : itemData.resources
          this.counter.forms[itemFormIndex].isType = true
          this.counter.forms[itemFormIndex].titleForm = itemData.data.shortName;
          this.counter.forms[itemFormIndex].email = itemData.data.email;
          this.counter.forms[itemFormIndex].inn = itemData.data.inn;
          this.counter.forms[itemFormIndex].isHidden = false;
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
      },
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
      "modalCountTitle": "Подать показания счетчиков, показания принимаются с 20 по 25 числа",
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
  .modalIsGood{
    .v-card__title{
      font-weight: 300;
    }
    .v-card__text{
      font-size: 1em;
    }
  }

  .v-btn:not(.v-btn--round).v-size--default{
    width: auto;
  }
  .modal{
    .v-card__title{
      font-size: 30px;
      font-weight: 300;
    }
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
        box-shadow: none !important;
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
            &:nth-child(3n){
              border-right: none;
            }
            &:active{
              background-color: #E6F2FF;
            }
          }
        }
      }
      .text{
        padding: 55px 10px;
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
  .modalService{

    input{
      height: 26px !important;
    }
    ul{
      list-style-type: none;
      margin: 0;
      padding: 0;
      column-count: 4;
      margin-top: 30px;
      li{
        font-size: 14px;
        color: #333;
        margin-bottom: 10px;
        cursor: pointer;
        transition: .4s all;
        &:hover{
          color: #0079FE;
        }
      }
    }
  }
  @media screen and (max-width: 650px){
    .modalIsGood .v-card__text{
      font-size: 1.3em;
    }
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
