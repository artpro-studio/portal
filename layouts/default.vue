<template>
  <v-app :class="{ch: this.$store.state.user.language == 2}">
    <DefaultHeader />
    <v-main>
        <nuxt />
    </v-main>
    <DefaultFooter />
    <SnackbarMain />
  </v-app>
</template>

<script>
  import DefaultHeader from '../components/Default/DefaultHeader'
  import DefaultFooter from '../components/Default/DefaultFooter'
  import SnackbarMain from '../components/SnackbarMain'

  import '/assets/scss/fonts.scss'
  export default {
    data () {
      return {
        fixed: false,

      }
    },
    components:{
      DefaultHeader,
      DefaultFooter,
      SnackbarMain
    }
  }
</script>
<style lang="scss">

  body{
    font-family: 'SF Pro Display', sans-serif;
    font-size: 18px;
    line-height: 1.4;
    color: #333;
  }
  /*.v-application.ch{*/
  /*     font-family: 'jornschv', sans-serif !important;*/
  /*   }*/
  .pages__title{
    h1{
      font-size: 2em;
      font-weight: 100;
    }
    p{
      font-size: 1em;
      font-weight: 100;
    }
    &.flex{
      display: flex;
    }
    &.space-between{
      justify-content: space-between;
    }
  }
  .v-application{
    font-family: 'SF Pro Display', sans-serif;
  }
  .wrapper{
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    .container{
      max-width: 1240px;
      padding: 0;
    }
  }
  .v-input.v-text-field{
    border: 1px solid #C4C4C4 !important;
    box-sizing: border-box !important;
    border-radius: 5px !important;
    padding-right: 10px;
    &.v-input--is-label-active{
      label{
        top: 10px !important;
      }
    }
    &.v-input--is-focused{
      label{
        top: 10px !important;
      }
    }
  }
  .v-input.v-text-field > .v-input__control > .v-input__slot > .v-text-field__slot{
    padding: 3px 14px !important;
  }
  .v-input.v-text-field .v-label{
    top: 4px !important;
    left: 14px !important;
  }
  .v-input.v-text-field > .v-input__control > .v-input__slot:before{
    border-color: #C4C4C4 !important;
  }
  .fullSearch{
    .v-input.v-text-field .v-label{
      top: 0px !important;
    }
    .v-input.v-text-field.v-input--is-label-active label{
      top: 10px !important;
    }
    .v-input.v-text-field.v-input--is-focused label{
      top: 10px !important;
    }
  }
  .liveSearch{
    input{
      padding-left: 15px !important;
    }
  }

  .v-application .primary{
    background-color: #0079FE !important;
    border-color: #0079FE !important;
    font-size: .9em;
  }
  .v-btn:not(.v-btn--round).v-size--default{
    width: 166px;
    height: 50px;
  }
  .v-application .primary--text{
    width: auto !important;
    color: #0079FE !important;
    font-size: .9em !important;
    .v-btn__content{
      font-weight: 300;
    }
  }
  .v-input--selection-controls__input .v-icon{
    font-size: 1.2em !important;
    width: 100% !important;
  }
  .checkboxList{
    &__content{
      .v-input--radio-group__input{
        display: flex;
        flex-direction: row;
        .v-radio{
          width: auto;
          margin-bottom: 7px !important;
          margin-right: 15px;
        }
      }
    }
  }
  .v-btn__content{
    text-transform: none;
    letter-spacing: 0px;
    font-weight: 100;
  }
  .theme--light.v-btn.v-btn--disabled.v-btn--has-bg{
    background-color: rgba(0, 121, 254, .5) !important;
    color: #fff !important;
  }
  .v-input.v-text-field{
    .v-input__slot{
      margin-bottom: 0;
    }
    .v-text-field__details{
      display: none;
    }
  }
  .modal{
    background-color: #fff;
    .v-select .v-menu__content{
      max-width: 100% !important;
      min-width: 100% !important;
    }
    &.modalCounter{
      padding: 30px;
    }
  }
  input[type='number'] {
    -moz-appearance:textfield;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  .v-select{
    &__selections{
      flex-wrap: nowrap !important;
    }
    .v-select__selection--comma{
      margin: 7px 4px 7px 16px;
    }
    .v-input__control{
      .v-select__slot{
        .v-label{
          top: 0 !important;
        }
      }
    }
    .v-list-item__content{
      padding: 0;
    }
    .v-list-item__title{
      padding: 0px 10px;
      font-weight: 300;
    }
    .v-menu__content{
      box-shadow: 0px -3px 5px -3px rgb(0 0 0 / 20%), 0px 4px 10px 1px rgb(0 0 0 / 4%), 0px 3px 14px 2px rgb(0 0 0 / 0%);
    }
    .v-list{
      padding: 0;
    }
    .v-list-item{
      padding: 0;
    }
    .v-input__append-inner{
      margin-top: -1px !important;
    }
    .v-input__slot{
      margin-bottom: 0;
    }
    .v-text-field__details{
      display: none;
    }
    .v-label{
      top: 1px !important;
    }
    .v-text-field{
      padding-top: 0;
      border-radius: 0;
      border: none;
      border-bottom: 1px #C4C4C4 solid;
    }
    &.v-input.v-text-field{
      &.v-input--is-label-active{
        label{
          top: 10px !important;
        }
      }
      &.v-input--is-focused{
        label{
          top: 10px !important;
        }
      }
    }
  }
  /*SWITCHER*/
  .v-input--switch .v-input--selection-controls__input{
    width: 55px !important;
  }
  .theme--light.v-input--switch .v-input--switch__thumb{
    left: 6px !important;
  }
  .v-input--switch__track{
    width: 55px !important;
    height: 27px !important;
    border-radius: 50px !important;
    top: calc(50% - 13px) !important;
  }
  .v-application--is-ltr .v-input--switch.v-input--is-dirty .v-input--selection-controls__ripple{
    transform: translate(27px, 0) !important;
  }
  .v-application--is-ltr .v-input--switch.v-input--is-dirty .v-input--switch__thumb{
    transform: translate(27px, 0) !important;
    color: #fff !important;
  }
  .v-application--is-ltr .v-input--switch .v-input--selection-controls__ripple{
    left: -8px !important;
  }
  .v-application .v-input--switch .info--text{
    color: #0079FE !important;
    opacity: 1 !important;
  }
  /*ENDSWITCHER*/

  .title_page{
    h1,h2,h3,h4,h5{
      font-size: 2em;
    }
  }

  .paginations{
    margin-top: 40px;
  }
  /*Меню*/
  .modalMenu{
    background-color: rgba(0, 121, 254, .9);
    padding-top: 0px;
    .v-sheet.v-list{
      background-color: transparent;
      color: #fff;
    }
    .v-list-item{
      margin-bottom: 100px;
      .v-list-item__title{
        font-size: 2em;
        color: #fff;
        font-weight: 100;
        margin-bottom: 40px;
      }
      ul{
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        margin-bottom: 40px;
        li{
          margin: 0 15px;
          &:nth-child(1){
            margin-left: 0;
          }
          &:last-child{
            margin-right: 0;
          }
          a{
            color: #fff;
            font-size: 1em;
            text-decoration: none;
            font-weight: 100;
          }
        }
      }
      .bthWhite{
        background-color: #fff;
        width: 170px;
        height: 50px;
        display: flex;
        font-size: 1em;
        align-items: center;
        justify-content: center;
        flex: none;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
        transition: .4s all;
        &:hover{
          background-color: #e8e8e8;
        }
      }
    }
  }
  /*END Меню*/
  body .v-application .v-progress-circular{
    width: 80px !important;
    height: 80px !important;
    svg{
      width: 80px !important;
      height: 80px !important;
    }
  }

  @media screen and (max-width: 1420px){
    .wrapper{
      padding: 0 15px;
    }
  }
  @media screen and (max-width: 1330px){
    body{
      font-size: 16px;
    }
    .wrapper{
      padding: 0 15px;
    }
  }
  @media screen and (max-width: 1265px){
    .modalMenu{
      .container{
        max-width: none;
      }
    }
  }
  @media screen and (max-width: 1200px){
    body{
      font-size: 15px;
    }
  }
  @media screen and (max-width: 996px){
    .modalMenu{
      .v-list-item{
        ul{
          flex-wrap: wrap;
          margin-left: -15px;
          li{
            &:nth-child(1){
              margin-left: 15px;
            }
            margin-bottom: 15px;
          }
        }
      }
    }
    .container{
      width: 100% !important;
    }
  }
  @media screen and (max-width: 650px){
    .modal{
      margin: 0;

    }
    .wrapper{
      padding: 0 15px;
      .container{
        padding: 0;
      }
    }
    body{
      font-size: 12px;
    }

    .v-application .primary--text{
      font-size: 1.1em !important;
      .v-btn__content{
        font-weight: 300;
        font-size: 1.1em;
      }
    }
    .v-text-field{
      .v-label{
        font-size: 14px;
      }
    }
    .v-select.v-input.v-text-field.v-input--is-focused label {
      top: 7px !important;
      font-size: .8em !important;
    }
    .theme--light.v-input{
      border: 1px solid #C4C4C4;
      box-sizing: border-box;
      border-radius: 5px;
      &.v-input--is-label-active{
        label{
          top: 10px;
        }
      }
      &.v-input--is-focused{
        label{
          top: 10px;
          transform: translateY(-18px) scale(1);
        }
      }
    }
    .v-btn:not(.v-btn--round).v-size--default{
      font-size: 1.1em;
      width: 135px;
      height: 45px;
    }
    .v-autocomplete__content{
      .v-list-item{
        border-bottom: 1px rgba(0,0,0, .05) solid;
      }
      .v-list-item__title{
        white-space: normal;
        font-size: 1em;
      }
    }
    .modalMenu{
      padding-top: 50px;
      .v-list-item{
        margin-bottom: 10px;
        .v-list-item__title{
          margin-bottom: 20px;
        }
        ul{
          flex-wrap: wrap;
          margin-left: -10px;
          margin-bottom: 20px;
          li{
            &:nth-child(1){
              margin-left: 10px;
            }
            margin: 0 10px;
            margin-bottom: 10px;
          }
        }
        .bthWhite{
          font-size: 1.1em;
          width: 140px;
          height: 45px;
        }
      }
    }
    .modalMenu .v-list-item ul li a{
      font-size: 1.2em;
    }
    .pages__title{
      flex-wrap: wrap;
      p{
        font-size: 1.3em;
      }
    }
  }


</style>
