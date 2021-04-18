<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="data.name"
            label="Наименование"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="data.municipalResourceName"
            label="Полное наименование"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="data.code"
            label="Символьный код"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-checkbox
            v-model="data.canLinkWithDevice"
            label="Исп. в счетчиках?"
          ></v-checkbox>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-checkbox
            v-model="data.isDeleted"
            label="Удален?"
          ></v-checkbox>
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
          canLinkWithDevice: true,
          code: "plumbing",
          isDeleted: false,
          municipalResourceName: "Вода",
          name: "Вода"
        },
      }
    },
    async created() {
      let request = await this.handlerAxios('get', `v1/auth/organization/resources/single/?id=${this.$route.params.id}`)
      this.data = request.resources
    },
    methods:{
      async saveUser(){
        let request = await this.handlerAxios('put', `v1/auth/organization/resources/?id=${this.$route.params.id}`, this.data)
      }
    }
  }
</script>

<style scoped>

</style>
