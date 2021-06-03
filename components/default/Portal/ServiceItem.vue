<template>
  <div class="service">
    <div class="service_list">
      <div class="service_list__serviceItem" v-for="(item, index) in localData" :key="data.id" @click="selectService(item)">
        <div class="icon"><v-icon>mdi-home</v-icon></div>
        <div class="text">
          <h4>{{item.shortName}}</h4>
          <div class="text_bottom">
            <p v-if="item.orgAddress" class="full">{{item.orgAddress}}</p>
            <p v-if="item.email">Email: {{item.email}}</p>
            <p v-if="item.inn">Инн: {{item.inn}}</p>
            <p v-if="item.url">Сайт: {{item.url}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination text-center">
      <v-pagination
        v-model="page"
        :length="lengthPage"
        :total-visible="12"
        @input="paginationChange"
        circle
      ></v-pagination>
    </div>
  </div>

</template>

<script>
  import hendlerAxios from '/mixins/hendlerAxios.mixins'
    export default {
      props:['data', 'search', 'count'],
      mixins:[hendlerAxios],
      data(){
        return{
          page: 1,
          localData: [],
          lengthPage: 1,
        }
      },
      methods:{
        selectService(item){
          this.$emit('selectService', item)
        },
        async paginationChange(){
          try {
            let formData = {
              search: this.search || '',
              offset: this.page
            }
            let request = await this.handlerAxios('post', 'v1/auth/organization-search/', formData)
            if(request.status != true){
              return false
            }

            this.localData = request.data.rows
          } catch (e) {
            console.log(e)
          }

        }
      },
      watch:{
        data: function (e) {
          this.localData = e;
          this.lengthPage = this.count ;
          this.page = 1
        }
      }
    }
</script>

<style lang="scss" scoped>
  .pagination{
    margin-top: 35px;
  }
  .service_list{
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    &__serviceItem{
      width: 50%;
      display: flex;
      align-items: flex-start;
      cursor: pointer;
      border-bottom: 1px solid rgba(48, 48, 48, 0.1);
      transition: 0.4s all;
      padding: 7px 10px;
      &:hover{
        background-color: rgba(48, 48, 48, 0.1);
      }
      i{
        color: #0079FE;
        margin-right: 10px;
      }
      h4{
        font-weight: 300;
        font-size: 18px;
        line-height: 1.3;
      }
      p{
        font-weight: 300;
        font-size: 14px;
        line-height: 1.3;
        margin-right: 10px;
        margin-top: 5px;
        margin-bottom: 0;
      }
      .text_bottom{
        display: flex;
        flex-wrap: wrap;
        p{
          &.full{
            width: 100%;
          }
        }
      }
    }
  }
  @media screen and (max-width: 650px){
    .service_list{
      flex-wrap: wrap;
      &__serviceItem{
        width: 100%;
        padding: 10px 10px;
        h4{
          font-size: 16px;
        }
        p{
          font-size: 12px;
        }
      }
    }
  }
</style>
