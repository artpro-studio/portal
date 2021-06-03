<template>
  <v-form ref="form" autocomplete="false">
    <div class="field">
      <v-text-field
        v-model="epdCallback.name"
        label="ФИО"
        :error-messages="nameErrors"
        autocomplete="false"
        @input="$v.epdCallback.name.$touch()"
        @blur="$v.epdCallback.name.$touch()"
        required
      ></v-text-field>
    </div>
    <div class="field">
      <v-text-field
        v-mask="'+7 (###) ###-##-##'"
        v-model="epdCallback.phone"
        label="Телефон"
        autocomplete="false"
        @input="$v.epdCallback.phone.$touch()"
        @blur="$v.epdCallback.phone.$touch()"
        required
      ></v-text-field>
    </div>
    <div class="field full">
      <v-textarea
        v-model="epdCallback.text"
        label="Ваше сообщение"
        autocomplete="false"
        auto-grow
      ></v-textarea>
    </div>
    <div class="button">
      <v-btn
        color="primary"
        @click="callMinForm"
        class="btn"
      >
        Оставить заявку
      </v-btn>
    </div>
    <div class="lisence">
      <p>Нажимая на кнопку вы соглашаетесь с политикой конфидециальности</p>
    </div>

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
    mixins:[handlerAxiosMixins, validationMixin],
      data(){
          return{
            send:{
              isGood:false,
            },
              epdCallback:{
                  name:'',
                  phone:'',
                  text:'',
              },
          }
      },
      validations: {
        epdCallback: {
          name: { required, minLength: minLength(10) },
          phone: { required, minLength: minLength(11) },
          required
        }
      },
      computed:{
        nameErrors () {
          const errors = []
          if (!this.$v.epdCallback.name.$dirty) return errors
          !this.$v.epdCallback.name.minLength && errors.push('Name must be at most 10 characters long')
          !this.$v.epdCallback.name.required && errors.push('Name is required.')
          return errors
        },
        phoneErrors () {
          const errors = []
          if (!this.$v.epdCallback.phone.$dirty) return errors
          !this.$v.epdCallback.phone.minLength && errors.push('Name must be at most 10 characters long')
          !this.$v.epdCallback.phone.required && errors.push('Name is required.')
          return errors
        },
      },
      methods:{
           async callMinForm(){
             if(this.epdCallback.name === '' && this.epdCallback.phone === ''){
               this.$messagesError('Заполните поля');
               this.$v.$touch()
               return false;
             }
             if(this.$v.epdCallback.$error === true){
               this.$messagesError('Заполните правильно поля');
               this.$v.$touch()
               return false;
             }

              const minForm = {
                  name: this.epdCallback.name,
                  phone: this.epdCallback.phone,
                  comment: this.epdCallback.text
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
    margin-bottom: 15px;
    &.full{
      width: 100%;
    }
  }
  .button{
    margin-top: 25px;
    margin-bottom: 20px;
  }
  .lisence{
    p{
      font-weight: 100;
      font-size: .9em;
    }
  }
  @media screen and (max-width: 650px){
    .field{
      width: 100%;
      margin-bottom: 10px;
    }
    .button{
      margin-top: 15px;
      margin-bottom: 10px;
      width: 100%;
      .btn{
        width: 100%;
      }
    }
    .lisence{
      p{
        font-weight: 100;
        font-size: 1em;
      }
    }
  }
</style>
