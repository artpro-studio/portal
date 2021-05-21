<template>
  <div class="search__wrapper" v-if="Object.keys(dataContent).length > 0">
      <v-container v-if="isParams == false">
        <v-row justify="space-between">
          <v-col cols="12">
            <h1>{{dataContent.formattedAddress}}</h1>
          </v-col>

          <v-col cols="12" md="6">
            <v-card
              class="mx-auto"
            >
              <div class="search_title">
                <h4>Общая информация:</h4>
                <p>Вся информация о доме</p>
              </div>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Тип дома:</v-list-item-title>
                  <v-list-item-subtitle v-if="dataContent.houseTypeId != null">{{dataContent.houseTypeId.name}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Год постройки:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.buildingYear}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Общая площадь:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.totalSquare}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Общая площадь жилых и нежилых помещений:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.residentialSquare}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Количество жилых помещений:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.residentialPremiseCount}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Количество не жилых помещений:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.nonResidentialPremiseCount}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Общая отапливаемая площадь:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.totalSquare}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Дата ввода в эксплуатацию:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.operationYear}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Количество этажей:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.maxFloorCount}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Колличество жилых помещений:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.residentialPremiseCount}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Общее колличество проживающих:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.accountCount}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>ФИАС дома:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.fiasHouseGuid}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Кадастровый номер:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.cadastreNumber}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col cols="12" md="5">
            <v-card
              class="mx-auto"
            >
              <div class="search_title">
                <h4>Управляющие и ресурсоснобщающие организации:</h4>
                <p>Вся информация о доме</p>
              </div>
              <ul v-if="dataContent.resourceProvisionOrganizationList.length > 0">
                <li v-if="dataContent.managementOrganization" @click="selectCompany(dataContent.managementOrganization.guid)" >{{dataContent.managementOrganization.shortName}}</li>
                <li v-for="(item, index) in dataContent.resourceProvisionOrganizationList" :key="index" @click="selectCompany(item.guid)">{{item.shortName}}</li>
              </ul>
            </v-card>
            <v-card
              class="mx-auto"
            >
              <div class="search_title">
                <h4>Почтовое отделение</h4>
              </div>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Почтовый индекс:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.postalCode}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Адрес почтового отделения:</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          color="primary"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          mdi-information-outline
                        </v-icon>
                        <span  v-bind="attrs"
                               v-on="on">{{dataContent.postalAddress}}</span>
                      </template>
                      <span>{{dataContent.postalAddress}}</span>
                    </v-tooltip>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-card
              class="mx-auto"
            >
              <div class="search_title">
                <h4>Налоговая инспекция</h4>
              </div>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>ИНФС:</v-list-item-title>
                  <v-list-item-subtitle></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="isParams == true">
        <v-row justify="space-between">
          <v-col cols="12">
            <h1>{{dataContent.shortName}}</h1>
          </v-col>
          <v-col cols="12" md="6">
            <v-card
              class="mx-auto"
            >
              <div class="search_title">
                <h4>Информация о компании:</h4>
                <p>Вся информация о компании</p>
              </div>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Полное наименование:</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          color="primary"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          mdi-information-outline
                        </v-icon>
                        <span  v-bind="attrs"
                               v-on="on">{{dataContent.fullName}}</span>
                      </template>
                      <span>{{dataContent.fullName}}</span>
                    </v-tooltip>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Сокращенное наименование:</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          color="primary"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          mdi-information-outline
                        </v-icon>
                        <span  v-bind="attrs"
                               v-on="on">{{dataContent.shortName}}</span>
                      </template>
                      <span>{{dataContent.shortName}}</span>
                    </v-tooltip>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Дата государственной регистрации:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.registrationDate}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>ОГРН:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.ogrn}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>ИНН:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.inn}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>КПП:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.kpp}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Юридический адрес:</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          color="primary"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          mdi-information-outline
                        </v-icon>
                        <span  v-bind="attrs"
                               v-on="on">{{dataContent.orgAddress}}</span>
                      </template>
                      <span>{{dataContent.orgAddress}}</span>
                    </v-tooltip>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Функция организации:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.organizationTypeName}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>ОКВЭД:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.okved}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col cols="12" md="5">
            <v-card
              class="mx-auto"
            >
              <div class="search_title">
                <h4>Информация о руководителе:</h4>
                <p>Информация</p>
              </div>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Должность руководителя:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.managementPost}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>ФИО руководителя:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.chiefLastName}} {{dataContent.chiefFirstName}} {{dataContent.chiefMiddleName}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <div class="search_title">
                <h4>Контактная информация:</h4>
              </div>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Адрес места нахождения:</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          color="primary"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          mdi-information-outline
                        </v-icon>
                        <span  v-bind="attrs"
                               v-on="on">{{dataContent.orgAddress}}</span>
                      </template>
                      <span>{{dataContent.orgAddress}}</span>
                    </v-tooltip>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Адрес электронной почты:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.email}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Официальный сайт:</v-list-item-title>
                  <v-list-item-subtitle><a :href="dataContent.url" target="_blank">{{dataContent.url}}</a></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Телефон:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.phone}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col cols="12" md="5">
            <v-card
              class="mx-auto"
              v-if="dataContent.OpeningHours.length > 0"
            >
              <div class="search_title">
                <h4>Режим работы:</h4>
              </div>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Понедельник:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.OpeningHours[0].breakHoursBegin}} - {{dataContent.OpeningHours[0].breakHoursEnd}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Вторник</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.OpeningHours[1].breakHoursBegin}} - {{dataContent.OpeningHours[1].breakHoursEnd}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Среда:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.OpeningHours[2].breakHoursBegin}} - {{dataContent.OpeningHours[2].breakHoursEnd}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Четверг:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.OpeningHours[3].breakHoursBegin}} - {{dataContent.OpeningHours[3].breakHoursEnd}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Пятница:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.OpeningHours[4].breakHoursBegin}} - {{dataContent.OpeningHours[4].breakHoursEnd}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Суббота:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.OpeningHours[5].breakHoursBegin}} - {{dataContent.OpeningHours[6].breakHoursEnd}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Воскресенье:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.OpeningHours[6].breakHoursBegin}} - {{dataContent.OpeningHours[6].breakHoursEnd}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col cols="12" md="5">
            <v-card
              class="mx-auto"
              v-if="dataContent.chiefLastName.length > 0"
            >
              <div class="search_title">
                <h4>Приема граждан:</h4>
              </div>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Лицо, осуществялеющее прием:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.chiefLastName}} {{dataContent.chiefFirstName}} {{dataContent.chiefMiddleName}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Адрес места приема:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.citizensReceptionLocation}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Телефон для записи:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.citizensReceptionPhones}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Понедельник</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.ReceptionHours[0].breakHoursBegin}} - {{dataContent.ReceptionHours[0].breakHoursEnd}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Вторник:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.ReceptionHours[1].breakHoursBegin}} - {{dataContent.ReceptionHours[1].breakHoursEnd}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Среда:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.ReceptionHours[2].breakHoursBegin}} - {{dataContent.ReceptionHours[2].breakHoursEnd}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Четверг:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.ReceptionHours[3].breakHoursBegin}} - {{dataContent.ReceptionHours[3].breakHoursEnd}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Пятница:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.ReceptionHours[4].breakHoursBegin}} - {{dataContent.ReceptionHours[4].breakHoursEnd}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Суббота:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.ReceptionHours[5].breakHoursBegin}} - {{dataContent.ReceptionHours[5].breakHoursEnd}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Воскресенье:</v-list-item-title>
                  <v-list-item-subtitle>{{dataContent.ReceptionHours[6].breakHoursBegin}} - {{dataContent.ReceptionHours[6].breakHoursEnd}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </div>

</template>
<script>
  import handlerAxiosMixins from '~/mixins/hendlerAxios.mixins'
  import '/assets/scss/portal/search.scss'
  export default {
    props:['dataSearch', 'isSettings', 'isParams'],
    mixins:[handlerAxiosMixins],
    data(){
      return{
        page:1,
        dataContent: this.dataSearch || {},
      }
    },
    methods:{
      async selectCompany(guid){
        let formData = {
          guid: guid
        }
        await this.$router.push(`/portal/?organization=${guid}`)
      }
    },
    watch:{
      dataSearch: function (e) {
        this.dataContent = e;
      },
      isParams: function (e) {
      }
    }
  }
</script>
<style lang="scss" scoped>
  ul{
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    li{
      margin-bottom: 8px;
      margin-right: 30px;
      font-size: .9em;
      font-weight: 300;
      color: #0079FE;
      cursor: pointer;
    }
  }
  h1{
    font-style: normal;
    font-weight: 300;
    font-size: 1.3em;
  }
</style>
