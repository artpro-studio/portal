<script src="../../../../VueTrackTrash/vuetracktrash/store/auth.js"></script>
<template>
  <v-row align="center">
    <v-col cols="12">
      <v-card v-if="$store.state.user.errorUser != false">
        <v-card-title class="headline grey lighten-2">
          Авторизация
        </v-card-title>

        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Логин"
                  v-model="create.form.login"
                  hide-details="auto"
                ></v-text-field>
                <v-text-field
                  label="Пароль"
                  v-model="create.form.password"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>

        </v-form>

        <v-col cols="12" class="flex">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="createUser"
            >
              Войти
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-card>
      <v-card v-else>
        <v-card-title class="headline grey lighten-2">
          Вы авторизованы
        </v-card-title>


      </v-card>
    </v-col>
  </v-row>

</template>

<script>
  import handlerAxiosMixins from '~/mixins/hendlerAxios.mixins'

  export default {
    mixins:[handlerAxiosMixins],
    layout: 'admin',
    data () {
      return {
        create: {
          modal: false,
          form:{
            login:'',
            password:'',
          }
        },
      }
    },
    methods:{
      async createUser(){
        let request = await this.$store.dispatch('user/login', this.create.form)
      }
    }
  }
</script>
