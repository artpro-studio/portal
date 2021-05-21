<template>
  <v-row align="center">
    <v-col cols="6">
      <h1>Роли</h1>
    </v-col>
    <v-col cols="6" style="display: flex;justify-content: flex-end;">
      <v-btn color="primary" class="green" @click="create.modal = true">Добавить роли</v-btn>
    </v-col>
    <v-col cols="12">
      <v-data-table
        :headers="data.headers"
        :items="data.content"
        :items-per-page="5"
        no-data-text="Ничего не найдено"
        class="elevation-1"
      >
        <template v-slot:item.code="props">
          <nuxt-link :to="`/admin/role/${props.item.id}`">{{props.item.code}}</nuxt-link>
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
          Создание роли
        </v-card-title>

        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Символьный код"
                  v-model="create.form.code"
                  hide-details="auto"
                ></v-text-field>
                <v-text-field
                  label="Название"
                  v-model="create.form.name"
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
            code:'',
            name:'',
          }
        },
        data:{
          headers:[],
          content:[],
        }
      }
    },
    async created() {
      let request = await this.handlerAxios('get', 'v1/auth/role')
      if(request.status == true){
        this.data = request.role
        this.data.headers.push({ text: 'Действия', value: 'actions'})
        this.data.content.forEach(item => {item.actions = ''})
      }

    },
    methods:{
      async createUser(){
        //Добавление пользователя
        let request = await this.handlerAxios('post', 'v1/auth/role', this.create.form)
        if(request.status != true){
          return false;
        }

        this.create.modal = false;
        this.data.content.push(request.data.content[0])
      },
      async deleteUser(item){
        //Удаление пользователя
        let request = await this.handlerAxios('delete', `v1/auth/role/?id=${item.id}`)
        if(request.status != true){
          return false
        }

        this.data.content = this.data.content.filter(el => el.id != item.id)
      }
    }
  }
</script>
