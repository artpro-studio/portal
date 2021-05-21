<template>
  <div class="wrapper">
    <div class="container">
      <sendCounter />
    </div>
  </div>
</template>
<script>

  import sendCounter from '/components/default/components/portal/counter'
  export default {
    head() {
      return {
        title: 'Показание счетчиков',
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          {
            hid: 'description',
            name: 'description',
            content: 'Показание счетчиков'
          }
        ]
      }
    },
    components:{
      sendCounter,
    }
  }
</script>
<style lang="scss" scoped>

</style>
