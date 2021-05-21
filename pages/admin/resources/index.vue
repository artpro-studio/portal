<template>
  <v-row align="center">
    <v-col cols="6">
      <h1>Ресурсы</h1>
    </v-col>
    <v-col cols="6" style="display: flex;justify-content: flex-end;">
      <v-btn color="primary" class="green" @click="create.modal = true">Добавить ресурс</v-btn>
    </v-col>
    <v-col cols="12">
      <v-data-table
        :headers="data.headers"
        :items="data.content"
        :items-per-page="5"
        no-data-text="Ничего не найдено"
        class="elevation-1"
      >
        <template v-slot:item.name="props">
          <nuxt-link :to="`/admin/resources/${props.item.id}`">{{props.item.name}}</nuxt-link>
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
          Создание ресурса
        </v-card-title>

        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Полное название"
                  v-model="create.form.municipalResourceName"
                  hide-details="auto"
                ></v-text-field>
                <v-text-field
                  label="Название"
                  v-model="create.form.name"
                  hide-details="auto"
                ></v-text-field>
                <v-text-field
                  label="Код"
                  v-model="create.form.code"
                  hide-details="auto"
                ></v-text-field>
                <v-checkbox
                  v-model="create.form.canLinkWithDevice"
                  label="Исп. в счетчиках?"
                ></v-checkbox>
                <v-checkbox
                  v-model="create.form.isDeleted"
                  label="Удален?"
                ></v-checkbox>

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
            municipalResourceName:'',
            name:'',
            code:'',
            isDeleted:false,
            canLinkWithDevice:false,
            MunicipalResourceId:'',
          }
        },
        data:{
          headers:[],
          content:[],
        },
        resources:[],
      }
    },
    async created() {
      let request = await this.handlerAxios('get', 'v1/auth/organization/resources')
      if(request.status == true){
        this.data = request.data
        this.data.MunicipalResourceId = request.data.MunicipalResource
        this.resources = request.resources
        this.data.headers.push({ text: 'Действия', value: 'actions'})
        this.data.content.forEach(item => {item.actions = ''})
      }

    },
    methods:{
      async createUser(){
        //Добавление пользователя
        let formData = {
          data: this.create.form
        }
        let request = await this.handlerAxios('post', 'v1/auth/organization/resources', formData)
        if(request.status != true){
          return false;
        }

        this.create.modal = false;
        this.data.content.push(request.data.content[0])
      },
      async deleteUser(item){
        //Удаление пользователя
        let request = await this.handlerAxios('delete', `v1/auth/organization/resources/?id=${item.id}`)
        if(request.status != true){
          return false
        }

        this.data.content = this.data.content.filter(el => el.id != item.id)
      }
    }
  }
</script>
