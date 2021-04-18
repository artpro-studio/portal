<script src="../../../../../VueTrackTrash/vuetracktrash/middleware/personal-auth.js"></script>
<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="user.login"
            label="Логин"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="user.firstName"
            label="Имя"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="user.lastName"
            label="Фамилия"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="user.Role"
            :items="roleList"
            label="Выбор роли"
            item-text="name"
            item-value="id"
            no-data-text="Ничего не найднео"
          ></v-select>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="user.password"
            label="Пароль"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="user.confirm_password"
            label="Повторите пароль"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn
            color="primary"
            type="submit"
            @click.prevent="saveUser"
          >
            Сохранить
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
  import handlerAxiosMixins from '~/mixins/hendlerAxios.mixins'

  export default {
    mixins:[handlerAxiosMixins],
    layout: 'admin',
    middleware:['isAdmin'],
    data(){
      return{
        roleList:[],
        user:{
          login:'',
          firstName:'',
          lastName:'',
          password:'',
          Role:'',
          confirm_password:'',
        },
      }
    },
    async created() {
      let request = await this.handlerAxios('get', `v1/auth/user/?id=${this.$route.params.id}`)
      this.roleList = request.role
      this.user = request.user
    },
    methods:{
      async saveUser(){
        let request = await this.handlerAxios('put', `v1/auth/user/?id=${this.$route.params.id}`, this.user)
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
