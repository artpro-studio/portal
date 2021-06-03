
<script>
  //Importing Line class from the vue-chartjs wrapper
  import { Pie } from 'vue-chartjs'

  //Exporting this so it can be used in other components
  export default {
    extends: Pie,
    data () {
      return {
        datacollection: {
          //Data to be represented on x-axis
          labels: ['Не оплачено', 'Оплачено'],
          datasets: [
            {
                label: 'Data One',
                backgroundColor:[
                    '#0079FE',
                    '#EBEBEB'
                ],
                //Data to be represented on y-axis
                data: [this.$store.state.static.dataPie.col2,this.$store.state.static.dataPie.col]
            }
          ]
        },
        //Chart.js options that controls the appearance of the chart
        options: {
          legend: {
            display: true,
            enabled: false,
          },
          responsive: true,
          maintainAspectRatio: false,
          cutoutPercentage: 95,
          rotation: 20,
          enabled:false,
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.renderChart(this.datacollection, this.options);
    }
  }
</script>
<style lang="scss">
    .wrap_content #pie-chart{
        height: 250px !important;
      }
</style>