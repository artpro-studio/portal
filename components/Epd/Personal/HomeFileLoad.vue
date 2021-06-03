<template>
    <div class="import">
        <h4>Загрзука  реестра</h4>
        <p>Выберите распределение</p>
        <form action="" enctype="multipart/form-data">
            <label for="file">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 412 412" style="enable-background:new 0 0 412 412;" xml:space="preserve">
                    <g>
                        <g>
                            <g>
                                <path d="M334,140h-64c-4.4,0-8,3.6-8,8c0,4.4,3.6,8,8,8h64c13.2,0,24,10.8,24,24v192c0,13.2-10.8,24-24,24H78
                                    c-13.2,0-24-10.8-24-24V180c0-13.2,10.8-24,24-24h72c4.4,0,8-3.6,8-8c0-4.4-3.6-8-8-8H78c-22,0-40,18-40,40v192c0,22,18,40,40,40
                                    h256c22,0,40-18,40-40V180C374,158,356,140,334,140z"/>
                                <path d="M206,28c4.4,0,8-3.6,8-8V8c0-4.4-3.6-8-8-8c-4.4,0-8,3.6-8,8v12C198,24.4,201.6,28,206,28z"/>
                                <path d="M129.6,211.6c-3.2,3.2-3.2,8,0,11.2l70.8,70.8c1.6,1.6,3.6,2.4,5.6,2.4s4-0.8,5.6-2.4l70.8-70.8c3.2-3.2,3.2-8,0-11.2
                                    s-8-3.2-11.2,0L214,268.8V56c0-4.4-3.6-8-8-8c-4.4,0-8,3.6-8,8v212.8l-57.2-57.2C137.6,208.4,132.8,208.4,129.6,211.6z"/>
                            </g>
                        </g>
                    </g>
                    </svg>
                <p>Перенесите сюда файл</p>
                <span>формат файла: xlsx, xls</span>
            </label>
            <input
                type="file"
                id="file"
                @change="loadFile($event)"
            >
        </form>
        <EpdPreloader v-if="loading" />
    </div>
</template>
<script>
import { required, minLength } from 'vuelidate/lib/validators'
import EpdPreloader from '../EpdPreloader'
export default {
    data(){
        return{
            form:{
                file:null,
            },
            loading:false,
        }
    },
    components:{
      EpdPreloader
    },
    methods:{
        async loadFile(evt){
            debugger;
            let formData = new FormData();
            formData.append('file', evt.target.files['0'])
            this.loading = true;
            const token = await this.$axios.$post(process.env.baseUrl + '/api/incoming-registry/',formData);
            this.loading = false;
            if(token['success']){
                this.$notificationSuccess('Файл загружен','Началась обработка данных');
                this.$axios.$post(process.env.baseUrl + '/api/StartParse/',token);
            }else{
                 this.$notificationError('Файл не загружен','Пожалуйста напишите в техподдержку');
            }

        }
    },
    validations:{
        form:{
            file:{
                required
            },
        },

    }
}
</script>
<style lang="scss" scoped>
  .wrap_content .import {
    width: 100%; }
    .wrap_content .import  h4{
        font-weight: 300;
        font-size: 24px;
        line-height: 29px;
        color: #818283;
        margin-bottom: 4px;
    }
    .wrap_content .import p {
      font-size: .9em;
      font-weight: 300;
      color: #B7B7B7;
    }
  .wrap_content .import form{
    margin-top: 30px;
  }
    .wrap_content .import form label {
      display: block;
      cursor: pointer;
      border: 3px dashed #E6E7E9;
      -webkit-box-sizing: border-box;
              box-sizing: border-box;
      border-radius: 15px;
      text-align: center;
      width: 100%;
      padding: 42px 0;
      -webkit-transition: .4s all;
      -o-transition: .4s all;
      transition: .4s all;
      position: relative; }
      .wrap_content .import form label:hover {
        -webkit-transform: scale(1.05);
            -ms-transform: scale(1.05);
                transform: scale(1.05); }
      .wrap_content .import form label svg {
        height: 35px;
        margin-bottom: 10px; }
        .wrap_content .import form label svg path {
          fill: #B7B7B7; }
      .wrap_content .import form label p {
        font-weight: normal;
        font-size: 18px;
        line-height: 20px;
        color: #B7B7B7;
        margin-bottom: 0px; }
      .wrap_content .import form label span {
        font-weight: 100;
        font-size: 12px;
        line-height: 18px;
        color: #B7B7B7; }
    .wrap_content .import form input {
      display: none; }
       @media screen and (max-width: 768px) {
            .wrap_content .import {
            width: 100%; }
            .wrap_content .import form label {
                width: 100%; }
       }
        @media screen and (max-width: 650px) {
            .wrap_content .import{
                margin-bottom: 25px;
            }
            .wrap_content .import form label {
                padding: 40px 0; }
            .wrap_content .import form label svg {
                height: 30px; }
            .wrap_content .import form label p {
                font-size: 16px;
                line-height: 20px; }
            .wrap_content .import form label span {
                display: block;
                font-size: 12px;
                line-height: 14px; }
            .wrap_content .import h4{
                font-weight: 300;
                font-size: 16px;
                line-height: 19px;
                margin-bottom: 10px;
            }
        }
</style>
