<template>
  <div class="export">
    <h4>Выгрузка платежей</h4>
    <p>Выберите распределение</p>
    <form action>
      <div class="field">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dataStart"
              label="Дата начала"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dataStart"
            @input="menu = false"
          ></v-date-picker>
        </v-menu>
      </div>
      <div class="checkboxList">
        <v-radio-group v-model="radios" class="checkboxList__content">
          <v-radio value="street">
            <template v-slot:label>
              <div>По улицам</div>
            </template>
          </v-radio>
          <v-radio value="house">
            <template v-slot:label>
              <div>По домам</div>
            </template>
          </v-radio>
          <v-radio value="no-type">
            <template v-slot:label>
              <div>Без распределения</div>
            </template>
          </v-radio>
        </v-radio-group>
      </div>
      <div class="button">
        <v-btn
          color="primary"
          @click.prevent="UploadFile()"
        >
          Выгрузить платежи
        </v-btn>
      </div>
    </form>
    <div class="error_field" v-if="error">
      <p>Вы вели не верный формат даты</p>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      dataStart: null,
      dataEnd: null,
      error: false,
      radios:false,
      menu:false,
    };
  },
  methods: {
    async UploadFile() {
      //Скачивание выгрузки
      try {
        if (this.dataStart != null) {
          this.error = false;
          if (new Date(this.dataStart) <= new Date(this.dataStart)) {
            this.error = false;

            var formdata = new FormData();
            formdata.append("start_date", this.dataStart);
            formdata.append("end_date", this.dataStart);
            const file = await this.$axios.$post(
              process.env.baseUrl + "/api/GetPayments/",
              formdata
            );

            let url = process.env.baseUrl + "/" + file["path"][0];
            if (file["path"].length > 0) {
              get_file_url(url);
            } else {
              this.$notificationError(
                "Нет данных по вашей дате",
                "Пожалуйста сперва загрузите данные"
              );
            }
          } else {
            this.error = true;
          }
        } else {
          this.error = true;
        }
      } catch (e) {
        throw e;
      }
    }
  },
  validations: {
    dataStart: {
      required
    },
    dataEnd: {
      required
    }
  }
};
function get_file_url(url) {
  let link_url = document.createElement("a");

  link_url.download = url.substring(url.lastIndexOf("/") + 1, url.length);
  link_url.href = url;
  document.body.appendChild(link_url);
  link_url.click();
  document.body.removeChild(link_url);
  //delete link_url;
}
</script>

<style lang="scss" scoped>
.error_field {
  margin-top: 5px;
  p {
    color: #f68c8c;
    font-size: 14px;
  }
}
.wrap_content .export {
  width: 100%;
  padding-top: 0px;
  padding-left: 100px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.wrap_content .export h4 {
  font-weight: 300;
  font-size: 24px;
  line-height: 29px;
  color: #818283;
  margin-bottom: 4px;
}
.wrap_content .export p {
  font-size: .9em;
  font-weight: 300;
  color: #B7B7B7;
}
.wrap_content .export form {
  margin-top: 30px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.wrap_content .export form .field {
  margin-right: 63px;
}
.wrap_content .export form .field:nth-child(2) {
  margin-right: 0;
}
.wrap_content .export form .field label {
  position: relative;
  display: block;
  font-weight: 300;
  font-size: 13px;
  line-height: 16px;
  color: #adaeaf;
  left: 0;
}
.wrap_content .export form .field input {
  margin-top: 5px;
  border: none;
  font-weight: 300;
  font-size: 18px;
  line-height: 18px;
  color: #333333;
  border-bottom: 1px solid #e6e7e9;
  padding: 7px 7px;
  width: 190px;
  font-family: "SF UI Display";
}
.wrap_content .export form .button {
  width: 100%;
  margin-top: 10px;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
.wrap_content .export form .button input {
  font-weight: 100;
  font-family: "SF UI Display";
  width: 200px;
  margin-right: 40px;
}
.wrap_content .export form .button a {
  outline: transparent;
  font-style: normal;
  font-weight: 100;
  font-size: 16px;
  line-height: 19px;
  color: #333333;
  cursor: pointer;
}
.checkboxList{
  width: 100%;
}

@media screen and (max-width: 768px) {
  .wrap_content .export {
    width: 100%;
  }
}
@media screen and (max-width: 650px) {
  .wrap_content .export h4 {
    font-weight: 300;
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 5px;
  }
  .wrap_content .export form .field {
    width: 45%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-right: 26px;
  }
  .wrap_content .export form .field label {
    font-size: 10px;
  }
  .wrap_content .export form .field input {
    width: 100%;
    font-weight: 300;
    font-size: 14px;
    line-height: 17px;
  }
  .wrap_content .export form .button .btn {
    font-size: 14px;
    margin-right: 15px;
    width: 140px;
  }
  .wrap_content .export form .button a {
    font-size: 14px;
  }
}
</style>
