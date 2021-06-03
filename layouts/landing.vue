<template>
  <v-app :class="{ch: this.$store.state.user.language == 2}">
    <headerDefault :fixed="true" :hiddenCircle="true" />
    <nuxt />
    <footerDefault />
    <SnackbarMain />
  </v-app>
</template>
<script>
  import headerDefault from '/components/Default/DefaultHeader'
  import footerDefault from '/components/Default/DefaultFooter'
  import SnackbarMain from  '/components/SnackbarMain'

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
      SnackbarMain
    }
  }
</script>
<style lang="scss"></style>
