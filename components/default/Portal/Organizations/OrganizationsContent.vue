<template>
  <div class="search_list__body">
    <div class="search_list">
      <div class="page_info">
        <p>Найдено организаций: <b>{{count}}</b></p>
      </div>

      <Org :propData="list" @sendParams="clickOrg" />

      <div class="pagination">
        <v-pagination
          v-model="pageNavigation.page"
          @input="paginationChange"
          :length="pageNavigation.pageLength"
          :total-visible="12"
          circle
        ></v-pagination>
      </div>

    </div>
  </div>
</template>

<script>
  import Org from "./OrganizationsItem";
  export default {
    props: ['dataCount', 'dataList', 'pageNav'],
    components:{Org},
    data(){
      return{
        list: this.dataList || [],
        count: this.dataCount || 0,
        pageNavigation: this.pageNav ? {...this.pageNav} : {page:1, pageLength: 1},
        page: 1,
        pageLength: 1,
      }
    },
    methods:{
      clickOrg(org){
        this.$emit('sendParams', org)
      },
      newData(){
        this.list = this.dataList
        this.count = this.dataCount
        this.pageNavigation.pageLength = +this.count / 10
      },
      async paginationChange(){
        try {
          this.$emit('pageNav', this.pageNavigation.page)
        } catch (e) {
          console.log(e)
        }

      }
    },
    watch:{
      dataList: function (e) {
        this.newData()
      },
      pageNav: function (e) {
        this.pageNavigation = e
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search_list{
    margin-top: 30px;
  }
  .page_info{
    margin: 30px 0;
    p{
      font-weight: 300;
      font-size: 18px;
      line-height: 21px;
    }
  }

  .pagination{
    margin-top: 50px;
  }
</style>
