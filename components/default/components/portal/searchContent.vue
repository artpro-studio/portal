<template>
  <div class="search__wrapper" v-if="isParams == false && Object.keys(data).length > 0">
      <v-container v-if="isSettings == true">
        <v-row>
          <v-col cols="12">

            <div class="search_list">
              <v-list-item class="list__item">
                <v-list-item-avatar>
                  <img src="/img/default/pin.svg" alt="Адрес">
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>428034, Чувашская Республика, г. Чебоксары, ул. Радужная д. 4 кв. 61</v-list-item-title>
                  <div class="item_down">
                    <v-list-item-subtitle>Управляющая компания:  ООО УК “Управдом”</v-list-item-subtitle>
                    <v-list-item-subtitle>Управляющая компания:  ООО УК “Управдом”</v-list-item-subtitle>
                    <v-list-item-subtitle>Управляющая компания:  ООО УК “Управдом”</v-list-item-subtitle>
                  </div>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="list__item">
                <v-list-item-avatar>
                  <img src="/img/default/pin.svg" alt="Адрес">
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>428034, Чувашская Республика, г. Чебоксары, ул. Радужная д. 4 кв. 61</v-list-item-title>
                  <div class="item_down">
                    <v-list-item-subtitle>Управляющая компания:  ООО УК “Управдом”</v-list-item-subtitle>
                    <v-list-item-subtitle>Управляющая компания:  ООО УК “Управдом”</v-list-item-subtitle>
                    <v-list-item-subtitle>Управляющая компания:  ООО УК “Управдом”</v-list-item-subtitle>
                  </div>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="list__item">
                <v-list-item-avatar>
                  <img src="/img/default/pin.svg" alt="Адрес">
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>428034, Чувашская Республика, г. Чебоксары, ул. Радужная д. 4 кв. 61</v-list-item-title>
                  <div class="item_down">
                    <v-list-item-subtitle>Управляющая компания:  ООО УК “Управдом”</v-list-item-subtitle>
                    <v-list-item-subtitle>Управляющая компания:  ООО УК “Управдом”</v-list-item-subtitle>
                    <v-list-item-subtitle>Управляющая компания:  ООО УК “Управдом”</v-list-item-subtitle>
                  </div>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="list__item">
                <v-list-item-avatar>
                  <img src="/img/default/pin.svg" alt="Адрес">
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>428034, Чувашская Республика, г. Чебоксары, ул. Радужная д. 4 кв. 61</v-list-item-title>
                  <div class="item_down">
                    <v-list-item-subtitle>Управляющая компания:  ООО УК “Управдом”</v-list-item-subtitle>
                    <v-list-item-subtitle>Управляющая компания:  ООО УК “Управдом”</v-list-item-subtitle>
                    <v-list-item-subtitle>Управляющая компания:  ООО УК “Управдом”</v-list-item-subtitle>
                  </div>
                </v-list-item-content>
              </v-list-item>
            </div>

            <div class="paginations text-center">
              <v-pagination
                v-model="page"
                :length="4"
                circle
              ></v-pagination>
            </div>

          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="isSettings == false">
        <v-row justify="space-between">
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
                  <v-list-item-subtitle>Многоквартирный</v-list-item-subtitle>
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
                  <v-list-item-title>Площадь общего имущества:</v-list-item-title>
                  <v-list-item-subtitle>{{data.landSurveyTotalSquare}}</v-list-item-subtitle>
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
                  <v-list-item-title>Общая площадь нежилых помещений:</v-list-item-title>
                  <v-list-item-subtitle>Многоквартирный</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Общая отапливаемая площадь:</v-list-item-title>
                  <v-list-item-subtitle>Многоквартирный</v-list-item-subtitle>
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
                  <v-list-item-subtitle>{{dataContent.floorCount}}</v-list-item-subtitle>
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
                  <v-list-item-subtitle>{{data.cadastreNumber}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col cols="12" md="5">
            <v-card
              class="mx-auto"
            >
              <div class="search_title">
                <h4>Управляющие и ресурсоснобщающие оргназации::</h4>
                <p>Вся информация о доме</p>
              </div>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>  Тип дома:</v-list-item-title>
                  <v-list-item-subtitle>Многоквартирный</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>  Тип дома:</v-list-item-title>
                  <v-list-item-subtitle>Многоквартирный</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>  Тип дома:</v-list-item-title>
                  <v-list-item-subtitle>Многоквартирный</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
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
                  <v-list-item-subtitle>Многоквартирный</v-list-item-subtitle>
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
                  <v-list-item-title>ИНФСс:</v-list-item-title>
                  <v-list-item-subtitle>Многоквартирный</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Адрес:</v-list-item-title>
                  <v-list-item-subtitle>Многоквартирный</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>  Тип дома:</v-list-item-title>
                  <v-list-item-subtitle>Многоквартирный</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </div>

</template>
<script>
  import '/assets/scss/portal/search.scss'
  export default {
    props:['data', 'isSettings', 'isParams'],
    data(){
      return{
        page:1,
        dataContent: {},
      }
    },
    watch:{
      data: function (e) {
        console.log('searchContent', e)
        this.dataContent = e;
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
