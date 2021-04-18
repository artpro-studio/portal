<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="role.code"
            label="Логин"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="role.name"
            label="Имя"
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
        role:{
          code:'',
          name:''
        },
      }
    },
    async created() {
      let request = await this.handlerAxios('get', `v1/auth/role/single/?id=${this.$route.params.id}`)
      this.role = request.role
    },
    methods:{
      async saveUser(){
        let request = await this.handlerAxios('put', `v1/auth/role/?id=${this.$route.params.id}`, this.role)
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
