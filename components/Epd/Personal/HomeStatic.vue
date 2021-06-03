<template>
  <div class="statistics" id="chart">
    <h4>{{ message }}</h4>
    <p>Введите даты для просмотра статистики</p>
    <form action>
      <div class="field">
        <label for="date1">Дата начала</label>
        <input type="date" id="date1" v-model="dataStart" />
      </div>
      <div class="field">
        <label for="date2">Дата конца</label>
        <input type="date" id="date2" v-model="dataEnd" />
      </div>
      <div class="button">
        <a
          href="javascript:void(0)"
          class="btn"
          @click.prevent="UploadDateStatic()"
          >Посмотреть статистику</a
        >
      </div>
    </form>
    <div class="error_field" v-if="error">
      <p>Вы вели не верный формат даты</p>
    </div>
    <div class="statistics_content" v-if="$store.state.static.isStatics">
      <div class="graph">
        <div class="graph_pie">
          <HomeChart></HomeChart>
          <div class="procent">
            <span>{{ $store.state.static.procent }}%</span>
          </div>
        </div>
      </div>
      <div class="table">
        <table>
          <thead>
            <tr>
              <th>Наименование <img src="/img/arrow-sort.svg" alt="" /></th>
              <th>Всего счетов <img src="img/arrow-sort.svg" alt="" /></th>
              <th>Оплачено <img src="img/arrow-sort.svg" alt="" /></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in $store.state.static.list" :key="item.id">
              <td>{{ item.area }}</td>
              <td>{{ item.total_count }}</td>
              <td>
                {{ item.payment_count }}
                <span
                  >(<strong
                    >{{
                      parseInt((item.payment_count * 100) / item.total_count)
                    }}%</strong
                  >)</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import HomeChart from "../Personal/HomeChart";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      message: "Статистика за период",
      data1: [60, 40],
      dataStart: null,
      dataEnd: null,
      error: false,
      list: {},
      sections: [{ value: 25 }, { value: 25 }, { value: 25 }, { value: 25 }]
    };
  },
  components: {
    HomeChart
  },
  methods: {
    async UploadDateStatic() {
      //Статистика
      try {
        if (this.dataStart != null && this.dataEnd != null) {
          this.error = false;
          if (new Date(this.dataStart) <= new Date(this.dataStart)) {
            let dataStart = this.dataStart;
            let dataEnd = this.dataEnd;
            const formData = {
              dataStart: dataStart,
              dataEnd: dataEnd,
              isStatics: true
            };
            await this.$store.dispatch("static/dateStatic", formData);
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
</script>

<style lang="scss" scoped>
.wrap_content .statistics {
  width: 100%;
  margin-top: 60px;
}
.wrap_content .statistics .statistics_content {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
.wrap_content .statistics .statistics_content canvas {
  height: 250px !important;
  width: 250px !important;
}
.wrap_content .statistics h4 {
  font-weight: 300;
  font-size: 24px;
  line-height: 29px;
  color: #adaeaf;
  margin-bottom: 5px;
}
.wrap_content .statistics p {
  font-weight: 100;
  font-size: 16px;
  line-height: 29px;
  color: #adaeaf;
  margin-bottom: 15px;
}
.wrap_content .statistics .table {
  margin-left: 7%;
}
.wrap_content .statistics table {
  width: 640px;
}
.wrap_content .statistics table tr th {
  text-align: left;
  font-weight: 300;
  font-size: 16px;
  line-height: 198.6%;
  color: #adaeaf;
  padding: 10px 0;
}
.wrap_content .statistics table tr th img {
  margin-left: 10px;
}
.wrap_content .statistics table tr th:nth-child(2) {
  text-align: center;
}
.wrap_content .statistics table tr th:nth-child(3) {
  text-align: center;
}
.wrap_content .statistics table tr td {
  font-weight: normal;
  font-size: 16px;
  line-height: 253.6%;
}
.wrap_content .statistics table tr td span {
  color: #b7b7b7;
  font-weight: 100;
}
.wrap_content .statistics table tr td span strong {
  color: #b7b7b7;
  font-weight: 100;
}
.wrap_content .statistics table tr td:nth-child(2) {
  text-align: center;
}
.wrap_content .statistics table tr td:nth-child(3) {
  text-align: center;
}
.wrap_content .statistics .graph_pie {
  width: 250px;
  position: relative;
  height: 250px;
}
.wrap_content #pie-chart {
  height: 250px !important;
}
.wrap_content .statistics .graph_pie .procent {
  position: absolute;
  top: 46%;
  left: 50%;
  margin-left: -30px;
}
.wrap_content .statistics .graph_pie .procent span {
  font-weight: normal;
  font-size: 36px;
  line-height: 43px;
  color: #333333;
}

.wrap_content .statistics form {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.wrap_content .statistics form .field {
  margin-right: 63px;
}
.wrap_content .statistics form .field:nth-child(2) {
  margin-right: 0;
}
.wrap_content .statistics form .field label {
  position: relative;
  display: block;
  font-weight: 300;
  font-size: 13px;
  line-height: 16px;
  color: #adaeaf;
  left: 0;
}
.wrap_content .statistics form .field input {
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
.wrap_content .statistics form .button {
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
.wrap_content .statistics form .button a {
  cursor: pointer;
  font-weight: 100;
  font-family: "SF UI Display";
  width: 200px;
  margin-right: 40px;
}
@media screen and (max-width: 1200px) {
  .wrap_content .statistics .table {
    margin-left: 3%;
  }
}
@media screen and (max-width: 996px) {
  .wrap_content .statistics table {
    width: 480px;
  }
}
@media screen and (max-width: 768px) {
  .wrap_content .statistics .statistics_content {
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .wrap_content .statistics .statistics_content .graph {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;
  }
  .wrap_content .statistics .statistics_content .table {
    margin-left: 0;
    width: 100%;
  }
  .wrap_content .statistics .statistics_content .table table {
    width: 100%;
  }
}

@media screen and (max-width: 650px) {
  .wrap_content .statistics {
    margin-top: 40px;
  }
  .wrap_content .statistics h4 {
    font-weight: 100;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    margin-bottom: 10px;
  }
  .wrap_content .statistics .statistics_content canvas {
    width: 160px !important;
    height: 160px !important;
  }
  .wrap_content .statistics .statistics_content table tr th {
    font-size: 13px;
    padding: 5px 0;
  }
  .wrap_content .statistics .statistics_content table tr th img {
    margin-left: 3px;
    height: 10px;
    position: relative;
    top: 1px;
  }
  .wrap_content .statistics .statistics_content table tr td {
    font-size: 13px;
    line-height: 200.6%;
  }
  .wrap_content .statistics .graph_pie .procent {
    top: 40%;
  }
  .wrap_content .statistics .graph_pie .procent span {
    font-size: 36px;
  }
}
.wrap_content .statistics .error_field {
  margin-top: 5px;
  p {
    color: #f68c8c;
    font-size: 14px;
    font-weight: normal;
  }
}
</style>
