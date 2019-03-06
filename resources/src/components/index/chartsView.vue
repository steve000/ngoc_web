<template>
<div>
    <div class="title">
      <h3>渠道订单量分布</h3>
    </div>
    <div class="chartsView">
    <div ref="myCharts" id="myCharts" v-on-echart-resize></div>
    <div class="chartsViewLatestTime">近一周</div>
    </div>
</div>
</template>

<script>
import { mapActions } from "vuex";
import echarts from "echarts";

export default {
  name: "chartsView",
  data() {
    
    return {
      echarts: "",
      textTime:"4月1日-4月30日",
      chartOptions: {
        title: {
          text: "",
          textStyle:{
              color:"#333",
              fontSize:14,
              align:"right",
              fontWeight:400,
          },
          left:37,
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "3%",
          top: "15%",
          containLabel: true
        },
        legend: {
          data: [],
          left: "175"
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: []
          }
        ],
        yAxis: {
          type: "value",
        },
        series: []
      }
    };
  },
  created(){
    this.querySaleOrderEchartsFunc();
  },
  mounted(){
        this.echarts = echarts.init(this.$refs.myCharts);
        this.echarts.setOption(this.chartOptions);
  },
  watch:{
    chartOptions: {
      handler(newVal, oldVal) {
        if (this.echarts) {
          if (newVal) {
            this.echarts.setOption(newVal);
          } else {
            this.echarts.setOption(oldVal);
          }
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions([
      "showPageLoading",
      "hidePageLoading",
      "querySaleOrderEchartsAction"
    ]),
        //渠道订单量分布
    async querySaleOrderEchartsFunc() {
      let THIS = this;
      THIS.showPageLoading();
        let seriesTemp = {
          name: "",
          type: "line",
          areaStyle: {
            normal: {
              type: "default",
              color: new echarts.graphic.LinearGradient(0,0,0,1,[
                  {
                    offset: 0,
                    color: "rgba(199, 37, 50,0.2)"
                  },
                  {
                    offset: 1,
                    color: "rgba(199, 37, 50,0.2)"
                  }
                ],
                false
              )
            }
          },
          smooth: true,
          itemStyle: {
            normal: { areaStyle: { type: "default" } }
          },
          data: []
        };
        let timeData='';let seriesTempArr=[];let legendArr=[];
      await THIS.querySaleOrderEchartsAction().then(resp => {
        if( resp.series.length>0 && resp.xAxis.categories.length>0){
          timeData=resp.xAxis.categories;
          resp.series.forEach(element => {
           seriesTempArr.push(Object.assign({},seriesTemp,element));
           legendArr.push(element.name);
          });
          THIS.$set(THIS.chartOptions,'series',seriesTempArr);
          THIS.$set(THIS.chartOptions.legend,'data',legendArr);
          THIS.$set(THIS.chartOptions.xAxis[0],'data',timeData); 
          THIS.$set(THIS.chartOptions.title,'text',THIS.textTime); 
          THIS.hidePageLoading();
        }
      });
    },
  }
};
</script>

<style lang="scss">
    .chartsView {
      background-color: white;
      padding-top: 30px;
      height: 386px;
      width: 100%;
      position: relative;
      #myCharts {
        height: 100%;
        width: 100%;
      }
      .chartsViewLatestTime{
        font-size: 13px;
        position: absolute;
        top: 30px;
        right: 37px;
    }
    }
</style>


