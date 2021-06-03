<template>
  <div class="wrapper">
    <div class="container">

      <HomeSearchFrom title="Поиск по адресу" isChecked="false"/>

      <div class="home_service">
        <div class="title__section">
          <h2>{{$t('pageTitle')}}</h2>
          <p>{{$t('pageDesc')}}</p>
        </div>
        <div class="home_service__content">
          <nuxt-link :to="localePath('/Portal/')" class="there">
            <span class="bg" style="background-image: url('/img/default/service/service3.png')"></span>
            <span class="text">
              <span class="title">{{$t('portalTitle')}}</span>
              <span class="desc">{{$t('portalDesc')}}</span>
            </span>
          </nuxt-link>
          <nuxt-link :to="localePath('/Portal/send-counter/')" class="itemIblock four">
            <span class="bg"></span>
            <span class="text">
              <span class="title">{{$t('countTitle')}}</span>
              <span class="desc">{{$t('countDesc')}}</span>
            </span>
          </nuxt-link>
          <a href="https://www.chelife.ru/" target="_blank" class="five">
            <span class="bg" style="background-image: url('/img/default/service/service4.png')"></span>
            <span class="text">
              <span class="title">{{$t('reportTitle')}}</span>
              <span class="desc">{{$t('reportDesc')}}</span>
            </span>
          </a>


          <a href="https://lk.jkh-pay.ru/" class="one">
            <span class="bg" style="background-image: url('/img/default/service/serice1.png')"></span>
            <span class="text">
              <span class="title">{{$t('lkTitle')}}</span>
              <span class="desc">{{$t('lkDesc')}}</span>
            </span>
          </a>

          <nuxt-link :to="localePath('/Epd/')" class="two">
            <span class="bg" style="background-image: url('/img/default/service/service2.png')"></span>
            <span class="text">
              <span class="title">{{$t('epdTitle')}}</span>
              <span class="desc">{{$t('epdDesc')}}</span>
            </span>
          </nuxt-link>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HomeSearchFrom from '../components/Default/Home/HomeSearchForm'

export default {
  head() {
    return {
      title: 'Портал ЖКХ города Чебоксары и Чувашской Республики Чувашия',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Информационно-справочный ресурс жилищно-коммунального хозяйства города Чебоксары и Чувашской Республики. Справочник жилых домов и обслуживающих организаций. Передача показания счетчиков.'
        },
        {
          name: 'keywords',
          content: 'жкх, портал, Чувашия, Чебоксры, дом, счетчики, личный кабинет'
        }
      ],
    }
  },
  data(){
    return{

    }
  },
  components:{
    HomeSearchFrom
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
      "epdTitle": "Личный кабинет поставщика",
      "epdDesc": "Для юридических лиц",
      "portalTitle": "Информационно-справочный портал",
      "portalDesc": "Справочник жилого фонда, обслуживающих и ресурсоснабжающих организаций",
      "countTitle": "Показание счетчиков",
      "countDesc": "передаются с 20 по 25 число месяца",
      "countText": "",
      "reportTitle": "Новости",
      "reportDesc": "Портал chelife.ru"
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
