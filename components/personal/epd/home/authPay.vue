<template>
    <form action="">
        <div class="form_login_auth" v-if="!$store.state.auth.token">
            <h4 >Вход в личный кабинет</h4>
            <p>Заполните все поля</p>
            <div class="field">
                <label
                    for="login"
                :class="{'active':$v.form.login.required}"
                    >Логин</label>
                <input
                type="text"
                id="login"
                v-model="form.login"
                @input="$v.form.login.$touch()"
                :class="{'active':$v.form.login.required}"
                >
            </div>
            <div class="field">
                <label
                for="password"
                :class="{'active':$v.form.password.required}"
                >Пароль</label>
                <input
                    type="password"
                    id="password"
                    v-model="form.password"
                    @input="$v.form.password.$touch()"
                    :class="{'active':$v.form.password.required, 'error':!$v.form.password.minLength}"
                >
                <div class="more">
                    <a href="">Восстановить</a>
                    <span><img src="@/libs/img/eye.svg" alt=""></span>
                </div>
            </div>
            <div class="error" v-if="$store.state.auth.errorUser">
                <p>Такой пользователь не найден</p>
            </div>
            <div class="button">
                <nuxt-link
                    to="/pay/registration"
                    class="btn grey"
                    >Регистрация</nuxt-link>
                <button
                    type="submit"
                    class="btn"
                    @click.prevent="clickАuthorization()"
                    >Войти</button>
            </div>
            <div class="auth__bottom">
                <p>Авторизация с помощью:</p>
                <div class="auth__bottom__content">
                    <a href=""><img src="/icon/yandex.png" alt=""></a>
                    <a href=""><img src="/icon/gmail.png" alt=""></a>
                    <a href=""><img src="/icon/vk.png" alt=""></a>
                </div>
            </div>
        </div>
       <div class="form_auth_personal" v-if="$store.state.auth.user">
           <h4 >Здравствуйте! {{$store.state.auth.user.last_name}}  {{$store.state.auth.user.first_name}}</h4>
           <p>Ваш профиль:</p>
           <nuxt-link tag="div" to="/personal" class="user" >
               <div class="image" v-if="!$store.state.auth.user.user_icon">
                   <img src="@/libs/img/user.png"  alt="">
               </div>
               <div class="image" v-else>
                   <img :src="'http://45.67.57.180' + $store.state.auth.user.user_icon"  alt="">
               </div>
               <div class="user_info">
                    <p v-if="$store.state.auth.user.last_name != ''">{{$store.state.auth.user.last_name}}  {{$store.state.auth.user.first_name}}</p>
                    <p v-else>{{$store.state.auth.user.email}}</p>
                    <span>{{$store.state.auth.user.organization}}</span>
               </div>
           </nuxt-link>
           <nuxt-link to="/pay/personal" class="btn">Войти в личный кабинет</nuxt-link>
       </div>
    </form>
</template>


<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
    data(){
        return{
            form:{
                login:'',
                password: ''
            },
            Authenticated:false
        }
    },
    methods:{
        async clickАuthorization(){
            if(!(this.$v.form.password.$invalid)){

                try{
                    const formAuth = {
                        username: this.form.login,
                        password: this.form.password,
                    }

                    await this.$store.dispatch('auth/login', formAuth);
                    let AuthForm = this.$store.state.auth.errorUser;
                    if(!AuthForm){
                        this.$router.push('/pay/personal');
                    }

                }catch (e) {
                    throw e
                }


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
    validations:{
        form:{
            login:{
                required
            },
            password:{
                required,
                minLength: minLength(2)
            }
        },

    }
}
</script>
<style lang="scss" scoped>
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
    .auth__bottom{
        margin-top: 20px;
        p{
            text-align: center;
            font-weight: 300;
            font-size: 16px;
            line-height: 130.6%;
            color: #333333;
            opacity: 1;
        }
        a{
            margin: 0px 5px;
            img{
                height: 30px;
            }
        }
        .auth__bottom__content{
            display: flex;
            justify-content: center;
        }
    }
    @media screen and (max-width:650px){
         form{
             padding: 30px;
             .button{
                 flex-wrap: wrap;
                 .btn{
                     width: 100% !important;
                     margin-bottom: 10px;
                     order: 0;
                     &.grey{
                         order: 1;
                         margin-bottom: 0;
                     }
                 }
             }
         }
    }
</style>
