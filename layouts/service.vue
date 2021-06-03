<template>
  <v-app>
    <DefaultHeader />
    <v-main>
      <div class="services__pages">
       <div class="wrapper">
         <div class="container">
           <div class="text">
             <h1>{{$t('title')}}</h1>
             <p>{{$t('desc')}}</p>
           </div>
         </div>
       </div>
      </div>
    </v-main>
    <DefaultFooter classList="fixed" />
  </v-app>
</template>

<script>
  import DefaultHeader from '~/components/Default/DefaultHeader'
  import DefaultFooter from '~/components/Default/DefaultFooter'


  import '/assets/scss/fonts.scss'
  export default {
    data () {
      return {
        fixed: false,

      }
    },
    components:{
      DefaultHeader,
      DefaultFooter
    }
  }
</script>


<i18n>
  {
    "ru": {
      "title": "Сервис находится в разработке",
      "desc": "Нужно немного терпения"
    },
    "ch": {
      "title": "Сервис хатӗрленсе тӑрать",
      "desc": "Кăшт чăтăмлăх кирлĕ"
    }
  }

</i18n>
<style lang="scss">

  .services__pages{
    background-image: url('static/service.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    background-color: #F2F6F7;
    height: 100vh;
    margin-top: -110px;
    padding-top: 110px;
    h1{
      font-weight: 100;
      font-size: 36px;
      line-height: 130.6%;
    }
    p{
      font-size: 18px;
      font-weight: 100;
    }
  }

  @media screen and (max-width: 1200px){
    .services__pages{
      background-size: cover;
    }
  }

  @media screen and (max-width: 650px) {
    .services__pages {
      background-size: 280%;
      background-position: 22% 1700%;
      h1{
        font-size: 26px;
      }
    }
  }

</style>
