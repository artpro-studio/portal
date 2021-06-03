<template>
  <v-form ref="form" @submit="clickАuth()">
    <div class="form_login_auth" v-if="!$store.state.user.user">
      <h4 >Вход в обьединеные платежи</h4>s
      <p>Заполните все поля</p>
      <div class="field">
        <v-text-field
          v-model="form.login"
          label="Логин"
        ></v-text-field>
      </div>
      <div class="field">
        <v-text-field
          :append-icon="password.show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="password.show ? 'text' : 'password'"
          v-model="form.password"
          label="Пароль"
          @click:append="password.show = !password.show"
        ></v-text-field>
      </div>
      <div class="error" v-if="$store.state.user.errorUser">
        <p>Такой пользователь не найден</p>
      </div>
      <div class="button">
        <a
          href="javascript:void(0);"
          class="btn grey"
          attr-iblock = "contacts_section"
          @click="scrollTop($event)"
        >Стать учатсником</a>

        <v-btn
          color="primary"
          @click.prevent="clickАuth()"
          class="btn"
        >
          Войти
        </v-btn>

      </div>
    </div>
    <div class="form_auth_personal" v-if="$store.state.user.user">
      <h4 >Здравствуйте! {{$store.state.user.user.lastName}}  {{$store.state.user.user.firstName}}</h4>
      <p>Ваш профиль:</p>
      <nuxt-link tag="div" to="/personal" class="user" >
        <div class="image" v-if="!$store.state.user.user">
          <img src="@/libs/img/user.png"  alt="">
        </div>
        <div class="image" v-else>
          <img src=""  alt="">
        </div>
        <div class="user_info">
          <p v-if="$store.state.user.user.lastName != ''">{{$store.state.user.user.lastName}}  {{$store.state.user.user.firstName}}</p>

        </div>
      </nuxt-link>
      <nuxt-link to="/epd/personal" class="btn">Войти в личный кабинет</nuxt-link>
    </div>
  </v-form>
</template>


<script>
  import handlerAxiosMixins from '~/mixins/hendlerAxios.mixins'
  export default {
    mixins:[handlerAxiosMixins],
      data(){
        return{
            password:{
              show: false,
            },
            form:{
                login:'',
                password: ''
            },
            Authenticated: false,
            rules: {
              required: value => !!value || 'Заполните.',
              min: v => v.length >= 3 || 'Минимально 8 символов',
              emailMatch: () => (`The email and password you entered don't match`),
            }
        }
    },
    methods:{
          async clickАuth(){
            try{
              //Проверка на авторизацию
              debugger;
              if(this.$store.state.user.token){
                this.$router.push({
                  path: '/epd/personal/'
                })
                return ;
              }


              let request = await this.$store.dispatch('user/login', this.form)
              if(request.status != true){
                this.$messagesError('Вы ввели не верный логин или пароль');
                return ;
              }

              this.$router.push({
                path: '/epd/personal/'
              })

            }catch (e) {
              throw e
            }
          },
          scrollTop($event){
              var elementId = $event.target.getAttribute('attr-iblock'),
                  scrollPage = document.getElementById(elementId).offsetTop;
              window.scrollTo({
                  top: scrollPage,
                  behavior: 'smooth'
              });
          }
      },

  }
</script>
<style lang="scss" scoped>
    form{
    display: none;
    background: #FFFFFF;
    border-radius: 5px;
    width: 400px;
    padding: 35px;
    box-sizing: border-box;
    h4{
      font-style: normal;
      font-weight: 300;
      font-size: 20px;
      line-height: 130.6%;
    }
    p{
      font-weight: 300;
      font-size: 16px;
      line-height: 130.6%;
      color: #333333;
      opacity: 0.5;
      margin-bottom: 20px;
    }
    .field{
      position: relative;
      margin-bottom: 15px;
      .button{
        left: -8px;
      }
      label{
        font-weight: 300;
        font-size: 21px;
        line-height: 130.6%;
        color: #C0C0C0;
        position: absolute;
        top: 8px;
        left: 22px;
        transition: .4s all;
        &.active{
          font-size:12px;
          top:7px;
        }
      }
      input{
        border: 1px solid #B7B7B7;
        border-radius: 5px;
        width: 100%;
        box-sizing: border-box;
        padding: 14px 22px;
        transition: .4s all;
        height: 46px;
        &.active{
          padding-top: 18px;
          padding-bottom: 10px;
        }
        &.error{
          border:1px solid red;
        }
      }
      .more{
        position: absolute;
        display: flex;
        right: 0;
        top: 14px;
        a{
          color: #0079FE;
          font-weight: 300;
          font-size: 14px;
        }
      }
    }
    .button{
      display: flex;
      justify-content: space-between;
      .btn{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 160px;
        height: 50px;
        &.grey{
          background-color: #EBEBEB !important;
          color: #333 !important;
          text-decoration: none;
          padding: 0;
          font-size: .9em;
          border-radius: 5px;
        }
      }
    }
  }
    body .form_auth_personal{
        .user{
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            cursor: pointer;
        }
        .image{
            width: 43px;
            height: 43px;
            border-radius: 50%;
            margin-right: 10px;
            display: flex;
            overflow: hidden;
            -webkit-box-pack: center;
            justify-content: center;
            img{
            height: 100%;
            }
        }
        .user_info{
            p{
                font-weight: bold !important;
                font-size: 16px !important;
                line-height: 10px !important;
                color: #333333 !important;
                opacity: 1 !important;
                margin-bottom: 5px !important;
            }
            span{
                font-weight: 300 !important;
                font-size: 14px !important;
                line-height: 1 !important;
                color: #B7B7B7 !important;
            }
        }
    }
    .btn{
        padding: 15px 30px;
        width: 100%;
        display: block;
        box-sizing: border-box;
        text-align: center;
    }
    .wrapper .iSite.epd .head form .error{
        p{
            color: #ff0000;
            font-size: 12px;
            font-weight: normal;
        }
    }
  @media screen and (max-width: 650px){
    form{
      .button{
        flex-wrap: wrap;
        .btn{
          width: 100%;
          margin-bottom: 10px;
          &.grey{
            order: 2;
            width: 100%;
            font-size: 1.1em;
            margin-bottom: 0;
          }
        }
      }
    }
  }
</style>
