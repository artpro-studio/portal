<template>
  <v-app :class="{ch: this.$store.state.user.language == 2}">
    <headerDefault :fixed="true" :hiddenCircle="true" />
    <nuxt />
    <footerDefault />
    <Snackbar />
  </v-app>
</template>
<script>
  import headerDefault from '/components/default/header'
  import footerDefault from '/components/default/footer'
  import Snackbar from  '~/components/snackbar-main'

  import '/assets/scss/fonts.scss'
  export default {
    data () {
      return {
        fixed: false,

      }
    },
    components:{
      headerDefault,
      footerDefault,
      Snackbar
    }
  }
</script>
<style lang="scss"></style>
