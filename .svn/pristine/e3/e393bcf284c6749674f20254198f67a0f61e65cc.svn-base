<template>
    <div class="ngoc-home">
        <div class="content-box">
            <div class="title">
                <h3>预警信息</h3>
            </div>
            <div class="warningInfo">
                <div class="retentionOrder">
                <div class="sunTitle">滞留订单</div>
                <div class="retentionContent">
                    <ul>
                        <li v-for="(item,index) in retentionOrder" :key="index">
                            <div class="inner" @click="item.count?homeToStatus(item.timeLen):''">
                            <span>{{item.count}}</span>
                            <span>{{item.text}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                </div>
                <div class="abnormalOrder">
                <div class="sunTitle">异常订单</div>
                <div class="abnormalContent">
                    <ul>
                        <li v-for="(item,index) in abnormalContent"  @click="abnormalNum[index]?homeToErrorStatus(item.errorType):''" :key="index">
                            <div class="inner">
                            <span v-if="!abnormalNum[index]">0</span>
                            <span v-else>{{abnormalNum[index]}}</span>
                            <span>{{item.text}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
            <template>
              <keep-alive>
                 <chartsView class="ngoc-home"></chartsView>
              </keep-alive>
            </template>
            <div class="title">
                <h3>链路各环节订单分布</h3>
            </div>
            <div class="linkSpreadOrder">
                <ul>
                    <li v-for="(item,index) in linkSpreadOrder" @click="item.count?homeToStatus(item.orderStatus):''" :key="index">
                        <span class="icon-status0"></span>
                        <span>{{item.count}}</span>
                        <span>{{item.textStatus}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import "~/utils/echartResizeHelper";
import QuitMixins from "~/mixins/quit";
import { mapActions } from "vuex";
import platform from "~/mixins/platform";
import chartsView from "~/components/index/chartsView";
export default {
  name: "creaeteSalesOrder",
  mixins: [platform, QuitMixins],
  components: { chartsView },
  data() {
    return {
      retentionNum: [0, 0, 0],
      abnormalNum: [],
      errorTypeCount: "",
      errorParams: {
        pageNo: 1,
        pageSize: 0,
        errorType: "1,2,3,4,5,6,7"
      },
      orderStatus: [1, 2, 3, 4, 5],
      linkSpreadOrder: [
        {
          count: 0,
          textStatus: "未发货",
          orderStatus: 1
        },
        {
          count: 0,
          textStatus: "部分发货",
          orderStatus: 3
        },
        {
          count: 0,
          textStatus: "待出库",
          orderStatus: 2
        },
        {
          count: 0,
          textStatus: "已发货",
          orderStatus: 4
        },
        {
          count: 0,
          textStatus: "已完成",
          orderStatus: 5
        }
      ],
      abnormalContent: [
        {
          text: "库存不足",
          errorType: 7
        },
        {
          text: "超时未送达",
          errorType: 3
        },
        {
          text: "地址信息不全",
          errorType: 6
        },
        {
          text: "已拒收",
          errorType: 1
        },
        {
          text: "超时未出库",
          errorType: 2
        },
        {
          text: "其它异常",
          errorType: 3
        }
      ],
      retentionOrder: [
        {
          timeLen: 24,
          type: 11,
          count: 0,
          text: "24小时未发货"
        },
        {
          timeLen: 48,
          type: 11,
          count: 0,
          text: "48小时未发货"
        },
        {
          timeLen: 72,
          type: 11,
          count: 0,
          text: "72小时未发货"
        }
      ],
      activeName: "first"
    };
  },
  created() {
    this.getData();
  },
  methods: {
    ...mapActions([
      "showPageLoading",
      "hidePageLoading",
      "querySalesOrderList",
      "queryRetentionOrderCountAction",
      "statisticsOrderNumAction",
      "querySaleOrderEchartsAction"
    ]),
    homeToStatus(data) {
      this.$router.push({ name: "SalesOrder" });
      this.$store.commit("HOME_TO_ORDERSALES_STATUS", data);
    },
    homeToErrorStatus(data) {
      this.$router.push({ name: "SalesOrder" });
      let _error = { isErrorType: true, errorType: data };
      this.$store.commit("HOME_TO_ORDERSALES_ERRORSTATUS", { _error });
    },
    getData() {
      this.querySalesOrderListFunc();
      this.getStatisticsOrder();
      this.queryRetentionOrderCount();
    },

    //异常订单
    querySalesOrderListFunc() {
      this.querySalesOrderList(this.errorParams).then(resp => {
        let data = resp.result;
        if (data.length > 0) {
          let inputers = {},
            number = {};
          for (var i in data) {
            if (data[i].errorType !== "") {
              if (!number[data[i].errorType]) {
                number[data[i].errorType] = 1;
              } else {
                number[data[i].errorType]++;
              }
              inputers[data[i].errorType] = data[i].inputer;
            }
          }
          //numberSort存放 出现次数
          let numberSort = [];
          for (var i in number) {
            numberSort.push(number[i]);
          }
          this.abnormalNum = numberSort;
        }
      });
    },
    //链路各环节订单分布
    async getStatisticsOrder() {
      let _linkSpreadOrder = this.linkSpreadOrder;
      let THIS = this;
      THIS.showPageLoading();
      for (let i in _linkSpreadOrder) {
        try {
          await THIS.statisticsOrderNumAction(
            Object.assign(
              {},
              { errorType: 0, orderType: 11 },
              { orderStatus: _linkSpreadOrder[i].orderStatus }
            )
          ).then(resp => {
            if (resp.count) {
              THIS.$set(THIS.linkSpreadOrder[i], "count", resp);
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
      THIS.hidePageLoading();
    },
    //滞留订单
    async queryRetentionOrderCount() {
      let THIS = this;
      THIS.showPageLoading();
      let _retentionOrder = JSON.parse(JSON.stringify(THIS.retentionOrder));
      for (let i in _retentionOrder) {
        delete _retentionOrder[i].text;
        delete _retentionOrder[i].count;
        try {
          await THIS.queryRetentionOrderCountAction(_retentionOrder[i]).then(
            resp => {
              THIS.$set(THIS.retentionOrder[i], "count", resp.count);
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
      this.hidePageLoading();
    }
  }
};
</script>
<style lang='scss'>
.ngoc-home {
  .content-box {
    padding: 0 20px 20px;
    .title {
      color: #888;
      h3 {
        font-size: 15px;
        line-height: 60px;
      }
    }
    .warningInfo {
      background-color: white;
      padding: 30px;
      display: flex;
      width: 100%;
      justify-content: space-between;
      .abnormalOrder,
      .retentionOrder {
        display: inline-block;
        line-height: 1;
        .sunTitle {
          font-size: 14px;
          color: #333;
        }
        ul {
          display: flex;
          width: 100%;
          margin-top: 30px;
          margin-bottom: 10px;
          li {
            display: inline-block;
            width: 33.33%;
            cursor: pointer;
            .inner {
              display: inline-block;
            }
            span {
              display: block;
              text-align: center;
              &:nth-child(1) {
                font-size: 18px;
                color: #233e75;
                font-family: Arial, Helvetica, sans-serif;
              }
              &:nth-child(2) {
                font-size: 12px;
                color: #9c9c9c;
                margin-top: 12px;
              }
            }
          }
        }
      }
      .abnormalOrder {
        flex: 6;
        padding-left: 70px;
      }
      .retentionOrder {
        flex: 4;
        ul {
          border-right: 1px solid #dae4ea;
        }
      }
    }
    .linkSpreadOrder {
      background-color: white;
      ul {
        display: flex;
        height: 150px;
        width: 100%;
        align-items: center;
        justify-content: center;
        li {
          flex: 1;
          cursor: pointer;
          span {
            display: block;
            text-align: center;
            line-height: 1;
            &:nth-child(2) {
              font-size: 24px;
              font-family: Arial, Helvetica, sans-serif;
            }
            &:nth-child(3) {
              font-size: 12px;
              color: #9c9c9c;
              margin-top: 15px;
            }
          }
        }
      }
    }
  }
}
</style>
