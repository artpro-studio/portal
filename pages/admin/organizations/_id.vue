<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="data.shortName"
            label="Сокращенное наименование"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="data.fullName"
            label="Полное наименование"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="data.ogrn"
            label="ОГРН"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="data.inn"
            label="ИНН"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="data.kpp"
            label="КПП"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="data.email"
            label="Email"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-select
            v-model="data.MunicipalResourceId"
            :items="resources"
            label="Выберите ресурс"
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
            v-model="data.url"
            label="Сайт"
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
        data:{
          shortName:'',
          fullName:'',
          ogrn:'',
          inn:'',
          kpp:'',
          email:'',
          url:'',
          MunicipalResourceId:null
        },
        resources:[],
      }
    },
    async created() {
      let request = await this.handlerAxios('get', `v1/auth/organization/single/?id=${this.$route.params.id}`)
      this.data = request.organization
      this.data.MunicipalResourceId = request.organization.MunicipalResource != null ? request.organization.MunicipalResource.id : null
      this.resources = request.resources
    },
    methods:{
      async saveUser(){
        let request = await this.handlerAxios('put', `v1/auth/organization/?id=${this.$route.params.id}`, this.data)
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
