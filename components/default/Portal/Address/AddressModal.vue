<template>
    <div class="addressModal">
      <v-card>
        <div class="modal__top">
          <div class="top__text">
            <v-card-title>Список адресов</v-card-title>
            <v-card-subtitle>{{nameCompany}}</v-card-subtitle>
          </div>
        </div>
        <v-form class="modalService" >
          <v-col cols="12">
            <div class="modalService__search">
              <v-text-field
                v-model="search.input"
                label="Введите адрес"
                @keyup="sendAddress(1)"
              ></v-text-field>
            </div>

            <contentAddress
              :dataCount="address.count"
              :dataList="address.list"
              :pageNav="pageNav"
              @paginationChange="sendAddress"
              @sendParams="closeModal"
            />

          </v-col>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary darken-1"
              text
              @click.prevent="closeModal"
            >
              Закрыть
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
      <div class="preloader" v-if="preloader">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
      </div>
    </div>
</template>

<script>
  import handlerAxiosMixins from '~/mixins/hendlerAxios.mixins'
  import contentAddress from "./AddressContent";
    export default {

        name: "addressModal",
        props:['modal', 'orgId', 'nameCompany'],
        mixins:[handlerAxiosMixins],
        components:{contentAddress},
        data(){
          return{
            search:{
              input:'',
            },
            address:{
              list: [],
              count: 0,
            },
            setTimeoutReq: {},
            pageNav:{
              page: 1,
              pageLength:'',
            },
            preloader: true,
          }
        },
        created() {
          this.sendAddress(1);
        },
        methods:{
          closeModal(){
            this.$emit('closeModal', false)
            this.search.input = ''
            this.address.list = []
            this.address.count = 0
            this.setTimeoutReq = {}
            this.pageNav.page = 1
            this.pageNav.pageLength = 1
          },
          async sendAddress(page){
            try {
              this.pageNav.page = page || this.pageNav.page

              clearTimeout(this.setTimeoutReq);

              this.setTimeoutReq = setTimeout(async () => {
                this.preloader = true;
                let formData = {
                  offset: this.pageNav.page ,
                  search: this.search.input,
                  org: this.orgId
                }
                let request = await this.handlerAxios('post', 'v1/Address/search-house-org/', formData)
                if(request.status != true){
                  this.$messagesError("Произошла ошибка");
                  this.closeModal();
                  return;
                }

                this.address.list = request.house.rows
                this.address.count = request.house.count
                this.preloader = false

              }, 1000);

            } catch (e) {
              this.$messagesError("Произошла ошибка");
              this.closeModal();
              console.log(e)
            }
          }
        },
        watch:{
          modal: function (e) {
            if(e != true){
              return;
            }
            this.sendAddress(1);
          }
        }
    }
</script>

<style lang="scss" scoped>
  .addressModal{
    position: relative;
  }
  .preloader{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 2;
    display: flex;
    justify-content: center;
    .v-progress-circular{
      top: 35%;
    }
    svg{
      width: 100px;
      height: 100px;
    }
  }
</style>
