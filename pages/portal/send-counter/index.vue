<template>
  <div class="wrapper">
    <div class="container">
      <sendCounter />
    </div>
  </div>
</template>
<script>

  import sendCounter from '/components/Default/Portal/DefaultCounter'
  export default {
    head() {
      return {
        title: 'Передача показаний счетчиков коммунальных ресурсов в УК и РСО',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Передать показания счетчиков коммунальных ресурсов в адрес любой управляющией и ресурсоснабжающей организации Чувашской Республики'
          },
          {
            name: 'keywords',
            content: 'счетчики, показания, жкх, передать счетчик'
          }
        ],
      }
    },
    components:{
      sendCounter,
    }
  }
</script>
<style lang="scss" scoped>

</style>
