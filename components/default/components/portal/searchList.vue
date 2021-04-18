<template>
    <div class="search_list" v-if="isParams">
      <div class="page_info">
        <p>Найдено адресов: <b>{{pageContent.count}}</b></p>
      </div>
      <div class="item" v-for="(item, index) in pageContent.rows" :key="item.id" :title="item.formattedAddress" @click="sendParams(item.guid)">
        <div class="item__icon">
          <img src="/img/default/pin.svg" title="Иконка" alt="Иконка">
        </div>
        <div class="item__info">
          <div class="item__title">
            <h4>{{item.formattedAddress}}</h4>
          </div>
          <div class="item__description">
            <p>Управляющая компания:  ООО УК “Управдом”</p>
            <p>Вода:  АО “Водоканал”</p>
            <p>Газ:  ООО “Газпром межрегионгаз Чебоксары”</p>
          </div>
        </div>
      </div>

      <div class="pagination">
        <v-pagination
          v-model="page"
          @input="pageNav"
          :length="pageLength"
          :total-visible="12"
          circle
        ></v-pagination>
      </div>

    </div>
</template>

<script>
  import hendlerAxiosMixin from '/mixins/hendlerAxios.mixins'

  export default {
    props:['data', 'isParams'],
    mixins:[hendlerAxiosMixin],
      data(){
        return{
          page: 1,
          pageLength : 10,
          pageContent: {},
        }
      },
      methods:{
        async pageNav(e){
          console.log(e, this.page)
          this.pageContent.data.offset = this.page;
          let request = await this.handlerAxios('post', 'v1/address/home', this.pageContent.data)
          if(request.status == true){
            this.pageContent.rows = request.house.rows
          }
        },
        async sendParams(guid){
          //Оптравка выбор дома
          try{
            let formData = {
              guid: guid
            }
            let request = await this.handlerAxios('post', 'v1/address/house-one/', formData)
            if(request.status == true){
              this.$emit('sendParams', request.house)
              this.$router.push(`/portal/?house=${guid}`)
            }
          } catch (e) {
            console.log(e)
          }
        }
      },
      watch:{
        data: function (e) {
          console.log('watch', e)
          this.pageContent = e;
          this.pageLength = Math.ceil(+e.count / 10)
          this.page = 1
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
