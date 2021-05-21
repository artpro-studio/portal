<template>
    <v-form ref="form" autocomplete="false" @submit="callMinForm">
      <div class="field">
        <v-text-field
          v-model="minCallback.name"
          label="ФИО"
          :error-messages="nameErrors"
          autocomplete="false"
          @input="$v.minCallback.name.$touch()"
          @blur="$v.minCallback.name.$touch()"
          required
        ></v-text-field>
      </div>
      <div class="field">
        <v-text-field
          v-mask="'+7 (###) ###-##-##'"
          v-model="minCallback.phone"
          label="Телефон"
          autocomplete="false"
          :error-messages="phoneErrors"
          @input="$v.minCallback.phone.$touch()"
          @blur="$v.minCallback.phone.$touch()"

          required
        ></v-text-field>
      </div>
      <div class="button">
        <v-btn
          color="primary"
          @click.prevent="callMinForm"
          class="btn"
        >
          Оставить заявку
        </v-btn>
      </div>
      <div class="lisence">
        <p>Нажимая на кнопку вы соглашаетесь с политикой конфидециальности</p>
      </div>

<!--      <pre>-->
<!--        {{$v.minCallback}}-->
<!--      </pre>-->


      <v-dialog
        v-model="send.isGood"
        content-class="modal modalIsGood"
        max-width="500"
      >

        <v-card>
          <v-card-title class="headline">Спасиб, Ваша заявка принята!</v-card-title>
          <v-card-text>Наш менеджер свяжется с вами в ближайшее время обсудить условия договр</v-card-text>
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


    </v-form>

</template>


<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'
  import handlerAxiosMixins from '~/mixins/hendlerAxios.mixins'
  export default {
      data(){
          return{
            send:{
              isGood:false,
            },
             minCallback:{
                name:'',
                phone:''
            },
          }
      },
      mixins:[handlerAxiosMixins, validationMixin],
      validations: {
        minCallback: {
          name: { required, minLength: minLength(10) },
          phone: { required, minLength: minLength(11) },
          required
        }
      },
      computed:{
        nameErrors () {
          const errors = []
          if (!this.$v.minCallback.name.$dirty) return errors
          !this.$v.minCallback.name.minLength && errors.push('Name must be at most 10 characters long')
          !this.$v.minCallback.name.required && errors.push('Name is required.')
          return errors
        },
        phoneErrors () {
          const errors = []
          if (!this.$v.minCallback.phone.$dirty) return errors
          !this.$v.minCallback.phone.minLength && errors.push('Name must be at most 10 characters long')
          !this.$v.minCallback.phone.required && errors.push('Name is required.')
          return errors
        },
      },
      methods:{
           async callMinForm(){
             if(this.minCallback.name === '' && this.minCallback.phone === ''){
               this.$messagesError('Заполните поля');
               this.$v.$touch()
               return false;
             }
             if(this.$v.minCallback.$error === true){
               this.$messagesError('Заполните правильно поля');
               this.$v.$touch()
               return false;
             }
              const minForm = {
                  name: this.minCallback.name,
                  phone: this.minCallback.phone
              }
              let request = await this.handlerAxios('post', 'v1/callback/', minForm)

               if(request.status != true){
                 this.$messagesSuccess('Сообщение не отрпавоено');
                 return false
               }

               this.send.isGood = true;
               setTimeout(() => {
                 this.send.isGood = false;
               }, 10000)

          },
      },

  }
</script>
<style lang="scss" scoped>
  .field{
    width: calc(50% - 10px);
    label{
      font-size: 16px;
      top: 15px;
      transition:.4s all;
      &.active{
        font-size:12px;
        top:7px;
      }
    }
    input{
      font-size: 16px;
      transition:.4s all;
      &.active{
        padding-top: 18px;
        padding-bottom: 10px;
      }
      &.error{
        border:1px solid red;
      }
    }
  }
  .button{
    width: 100%;
    margin-top: 20px;
    .btn{
      font-weight: normal;
      width: 180px;
    }
  }
  .lisence{
    margin-top: 10px;
    p{
      font-size: .8em;
      font-weight: 100;
    }
  }
  @media screen and (max-width: 650px){
    .field{
      width: 100%;
      margin-bottom: 10px;
    }
    .button{
      width: 100%;
      margin-top: 10px;
      .btn{
        width: 100%;
      }
    }
    .lisence{
      p{
        font-size: 1em;
      }
    }
  }
</style>
