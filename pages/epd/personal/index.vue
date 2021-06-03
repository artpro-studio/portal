<template>
  <v-row class="wrap_content mt-5">
    <v-col cols="12" md="4">
      <HomeFileLoad />
    </v-col>
    <v-col cols="12" md="8">
      <HomeUploadStatic />
    </v-col>
  </v-row>
</template>

<script>
  import HomeFileLoad from "../../../components/Epd/Personal/HomeFileLoad";
  import HomeUploadStatic from "../../../components/Epd/Personal/HomeUploadStatic";
  export default {
    name: "index.vue",
    layout: 'personalEPD',
    components:{
      HomeFileLoad,
      HomeUploadStatic,
    },
  }
</script>

<style scoped>

</style>
