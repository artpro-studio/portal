<template>
  <v-row align="center">
    <v-col cols="6">
      <h1>Пользователи</h1>
    </v-col>
    <v-col cols="6" style="display: flex;justify-content: flex-end;">
      <v-btn color="primary" class="green" @click="create.modal = true">Добавить пользователя</v-btn>
    </v-col>
    <v-col cols="12">
      <v-data-table
        :headers="users.headers"
        :items="users.content"
        :items-per-page="5"
        no-data-text="Ничего не найдено"
        class="elevation-1"
      >
        <template v-slot:item.login="props">
          <nuxt-link :to="`/admin/users/${props.item.id}`">{{props.item.login}}</nuxt-link>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            @click="deleteUser(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
    <v-dialog
      v-model="create.modal"
      width="500"
    >

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Создание пользователя
        </v-card-title>

        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">

                <v-text-field
                  label="Имя"
                  v-model="create.form.firstName"
                  hide-details="auto"
                ></v-text-field>

                <v-text-field
                  label="Фамилия"
                  v-model="create.form.lastName"
                  hide-details="auto"
                ></v-text-field>

                <v-text-field
                  label="Логин"
                  v-model="create.form.login"
                  hide-details="auto"
                ></v-text-field>

                <v-select
                  v-model="create.form.Role"
                  :items="roleList"
                  label="Выбор роли"
                  item-text="name"
                  item-value="id"
                  no-data-text="Ничего не найднео"
                ></v-select>

                <v-text-field
                  label="Пароль"
                  v-model="create.form.password"
                  hide-details="auto"
                ></v-text-field>

              </v-col>
            </v-row>
          </v-container>

        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="createUser"
          >
            Создать
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

</template>

<script>
  import handlerAxiosMixins from '~/mixins/hendlerAxios.mixins'

  export default {
    mixins:[handlerAxiosMixins],
    layout: 'admin',
    middleware:['isAdmin'],
    data () {
      return {
        create: {
          modal: false,
          form:{
            firstName:'',
            lastName:'',
            login:'',
            Role:'',
            password:'',
          }
        },
        users:{
          headers:[],
          content:[],
        },
        roleList:[]
      }
    },
    async created() {
      let request = await this.handlerAxios('get', 'v1/auth/')
      if(request.status == true){

        this.users = request.users
        this.roleList = request.role

        this.users.headers.push({ text: 'Действия', value: 'actions'})
        this.users.content.forEach(item => {item.actions = ''})
      }

    },
    methods:{
      async createUser(){
        //Добавление пользователя
        let request = await this.handlerAxios('post', 'v1/auth/', this.create.form)
        if(request.status != true){
          return false;
        }

        this.create.modal = false;
        this.users.content.push(request.data.content[0])
      },
      async deleteUser(item){
        //Удаление пользователя
        let request = await this.handlerAxios('delete', `v1/auth/user/?id=${item.id}`)
        if(request.status != true){
          return false
        }

        this.users.content = this.users.content.filter(el => el.id != item.id)
      }
    }
  }
</script>
