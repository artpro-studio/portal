<template>
 <div class="footer" :class="classList">
   <div class="wrapper">
     <div class="container">
       <p>Сайт разработала компания <a href="https://4info.pro/">4info.pro</a></p>
     </div>
   </div>
 </div>
</template>
<script>
  export default {
    props:['classList']
  }
</script>
<style scoped lang="scss">
  .footer{
    text-align: right;
    &.fixed{
      position: fixed;
      bottom: 15px;
      left: 0;
      width: 100%;
      z-index: 2;
    }
    p{
      margin-bottom: 0;
      font-size: 14px;
      color: #333;
      font-weight: 100;
      a{
        color: #0079FE;
        text-decoration: none;
        font-weight: normal;
      }
    }
  }
</style>
