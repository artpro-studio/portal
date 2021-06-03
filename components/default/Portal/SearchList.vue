<template>
    <div class="search_list__body">

      <contentAddress
        :dataCount="pageContent.count"
        :dataList="pageContent.rows"
        :pageNav="pageNav"
        @sendParams="sendParams"
        @pageNav="pageNavAddress"

        v-if="isParams == false && pageContent.rows.length > 0"
      />


      <contentOrg
        :dataCount="pageContent.count"
        :dataList="pageContent.rows"
        :pageNav="pageNav"
        @sendParams="sendParamsOrg"
        @pageNav="pageNavOrg"
        v-if="isParams == true && pageContent.rows.length > 0"
      />

    </div>

</template>

<script>
  import hendlerAxiosMixin from '/mixins/hendlerAxios.mixins'
  import contentAddress from "./Address/AddressContent";
  import contentOrg from "./Organizations/OrganizationsContent";

  export default {
    props:['data', 'isParams'],
    components:{
      contentAddress,
      contentOrg
    },
    mixins:[hendlerAxiosMixin],
      data(){
        return{
          pageNav: {page: 1, pageLength : 10,  data:{}, or: null, and: null},
          pageContent: {
            rows:[],
          },
        }
      },
      methods:{
        async pageNavAddress(e){
            //Поиск адресов
            console.log('pageNavAddress', e)
            this.pageNav.page = e || this.pageNav.page;
            let request = await this.handlerAxios('post', 'v1/Address/Home', this.pageNav)
            if(request.status == true){
              this.pageContent.rows = request.house.rows
            }

        },
        async pageNavOrg(e){
          try {
            //Поиск организаций
            this.pageNav.page = e || this.pageNav.page;
            let request = await this.handlerAxios('post', 'v1/organization-params/', this.pageNav)
            if(request.status == true){
              this.pageContent.rows = request.organizations.rows
            }
          } catch (e) {
            console.log(e)
          }
        },
        async sendParams(data){
          try{
            if(this.isParams != true){
              //Оптравка выбор дома
              this.pageContent.rows = []
              this.$emit('sendParams', data)
              return true
            }
            //Оптравка выбор организации

          } catch (e) {
            console.log(e)
          }
        },
        async sendParamsOrg(data){
          try {
            this.pageContent.rows = [];
            this.$emit('sendParamsOrg', data)
          } catch (e) {

          }
        }
      },
      watch:{
        data: function (e) {

          this.pageContent = e;

          console.log('e',e)
          if(!e.data){
            this.page = 1
            return
          }

          this.pageNav.or = e.data.or || this.pageNav.or
          this.pageNav.and = e.data.and || this.pageNav.and
          this.pageNav.page = e.data.offset || 1
          this.pageLength = +e.count ? Math.ceil(+e.count / 10) : 1
        },
      }
  }
</script>

<style lang="scss" scoped>
  .search_list{
    margin-top: 50px;
  }
    .page_info{
      margin: 30px 0;
      p{
        font-weight: 300;
        font-size: 18px;
        line-height: 21px;
      }
    }
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
  .pagination{
    margin-top: 50px;
  }
</style>
