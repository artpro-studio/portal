<template>
  <div>
    <div v-for="(item, index) in propData" :key="index" class="item" @click="clickAddress(item.guid)">
      <div class="item__icon">
        <img src="/img/default/pin.svg" title="Иконка" alt="Иконка">
      </div>
      <div class="item__info">
        <div class="item__title">
          <h4>{{item.fullName}}</h4>
        </div>
        <div class="item__description">
          <p>Телефон:  {{item.phone}}</p>
          <p>Email:  {{item.email}}</p>
          <p>Сайт:  {{item.url}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import handlerAxiosMixins from '~/mixins/hendlerAxios.mixins'
  export default {
    name: "itemOrg.vue",
    props:['propData'],
    mixins:[handlerAxiosMixins],
    methods:{
      async clickAddress(guid){
        if(this.isParams != true){
          //Оптравка выбор дома
          let formData = {
            guid: guid
          }
          let request = await this.handlerAxios('post', 'v1/organization-guid/', formData)
          if(request.status == true){
            this.$router.push(`/portal/?organization=${guid}`)
            this.$emit('sendParams', request.organization)
          }
          return true
        }
        this.$emit('clickAddress', guid)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .item{
    display: flex;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid rgba(48, 48, 48, 0.1);
    transition: .4s all;
    padding: 10px;
    &:hover{
      background-color: rgba(48, 48, 48, 0.1);
    }
    &__icon{
      margin-right: 12px;
      img{
        height: 29px;
      }
    }
    &__info{

    }
    &__title{
      margin-bottom: 5px;
      h4{
        font-weight: 300;
        font-size: 18px;
        line-height: 1.3;
      }
    }
    &__description{
      display: flex;
      align-items: center;
      p{
        font-weight: 300;
        font-size: 14px;
        line-height: 1.3;
        margin-right: 10px;
        margin-bottom: 5px;
      }
    }
  }
  @media screen and (max-width: 650px){
    .item{
      position:relative;
      &__icon{
        position: absolute;
        margin-right: 0;
        top: 17px;
        left: 0;
        img{
          height: 20px;
        }
      }
      &__title{
        margin-bottom: 15px;
        h4{
          font-size: 14px;
          padding-left: 15px;
        }
      }
      &__description{
        flex-wrap: wrap;
        p{
          margin-bottom: 5px;
          font-size: 12px;
        }
      }
    }
  }
</style>
