<template>
  <div class="wrapper">
    <div class="container">

      <searchForm title="Поиск по адресу" isChecked="false"/>

      <div class="home_service">
        <div class="title__section">
          <h2>{{$t('pageTitle')}}</h2>
          <p>{{$t('pageDesc')}}</p>
        </div>
        <div class="home_service__content">
          <nuxt-link :to="localePath('/jkh/')">
            <span class="bg" style="background-image: url('/img/default/service/serice1.png')"></span>
            <span class="text">
              <span class="title">{{$t('lkTitle')}}</span>
              <span class="desc">{{$t('lkDesc')}}</span>
            </span>
          </nuxt-link>
          <nuxt-link :to="localePath('/epd/')">
            <span class="bg" style="background-image: url('/img/default/service/service2.png')"></span>
            <span class="text">
              <span class="title">{{$t('epdTitle')}}</span>
              <span class="desc">{{$t('epdDesc')}}</span>
            </span>
          </nuxt-link>
          <nuxt-link :to="localePath('/portal/')">
            <span class="bg" style="background-image: url('/img/default/service/service3.png')"></span>
            <span class="text">
              <span class="title">{{$t('portalTitle')}}</span>
              <span class="desc">{{$t('portalDesc')}}</span>
            </span>
          </nuxt-link>
          <nuxt-link :to="localePath('/portal/send-counter/')" class="itemIblock">
            <span class="bg"></span>
            <span class="text">
              <span class="title">{{$t('countTitle')}}</span>
              <span class="desc">{{$t('countDesc')}}</span>
            </span>
            <span class="item_info">{{$t('countText')}}</span>
          </nuxt-link>
          <nuxt-link :to="localePath('/report-portal/')">
            <span class="bg" style="background-image: url('/img/default/service/service4.png')"></span>
            <span class="text">
              <span class="title">{{$t('reportTitle')}}</span>
              <span class="desc">{{$t('reportDesc')}}</span>
            </span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import searchForm from '@/components/default/components/home/search'

export default {
  data(){
    return{

    }
  },
  components:{
    searchForm
  },
}
</script>

<i18n>
  {
    "ru": {
      "pageTitle": "Наши сервисы",
      "pageDesc": "Выберите нужный вам сервис",
      "lkTitle": "Личный кабинет потребителя",
      "lkDesc": "Для физических лиц",
      "epdTitle": "Единый платежный документ",
      "epdDesc": "Для юридических лиц",
      "portalTitle": "Информационный портал",
      "portalDesc": "Для физических лиц",
      "countTitle": "Показание счетчиков",
      "countDesc": "Показание счетчиков",
      "countText": "Показания собираются с 10-20 числа",
      "reportTitle": "Отчетный порт",
      "reportDesc": "Для юридических лиц"
    },
    "ch": {
      "pageTitle": "Пирĕн сервиссем",
      "pageDesc": "Хӑвӑра кирлӗ сервиса суйласа илӗр",
      "lkTitle": "Усă куракансен харпăр кабинечĕ",
      "lkDesc": "Физически сăпатсем валли",
      "epdTitle": "Пĕрлештернĕ тÿлев докуменчĕ",
      "epdDesc": "Юридически сăпатсем валли",
      "portalTitle": "Информаци порталĕ",
      "portalDesc": "Физически сăпатсем валли",
      "countTitle": "Счетчик кăтартни",
      "countDesc": "Физически сăпатсем валл",
      "countText": "Счетчик кăтартнисем 10-мĕшĕнчен пуçласа 20-мĕш таран пуçтарăнаççĕ",
      "reportTitle": "Отчетлă порталĕ",
      "reportDesc": "Юридически сăпатсем валли"
    }
  }

</i18n>

<style lang="scss">
  @import "assets/scss/home";
</style>
