<template>
  <div class="table-list-special-common-style changeListTable">
    <el-table class="table1" :data="changeOrderList" border :default-expand-all="true" @row-click="setCurOperationRow">
      <el-table-column type="expand" width="0">
        <template slot-scope="scope">
          <div class="remark-box remarkShow">
            <span class="salesEditRemark" @click="funEditRemark(scope.$index,scope.row)">备注：{{scope.row.remark?scope.row.remark:'无'}}
              <i class="iconfont1 icon-bianji other_hook"></i>
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="编号" prop="changeId" width="220">
        <template slot-scope="scope">
          <div class="order-number change-order-number" @click="toChangeList(scope.row.changeId)">
            <div>换货编号：
              <span>{{scope.row.changeId}}</span>
            </div>
          </div>
          <div class=" order-number">
            <div :title="scope.row.orderId"> 销售编号：{{scope.row.orderId}}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="100" class="more-operate-col">
        <template slot-scope="scope">
          <div class="row-btn-show show-more-btn">
            <div>
              <template v-if="Number(scope.row.errorType) !== 5&& Number(scope.row.errorType) !== 8 &&scope.row.invType">
                <el-button type="text" class="mr15" v-if="scope.row.changeStatus ===1" @click="queryPurchaseDetailsFcuntion(scope.row.changeId)">入库
                </el-button>
                <el-button type="text" class="mr15" v-if="scope.row.changeStatus ===3" @click="queryOutStoreFcuntion(scope.row.changeId)">出库
                </el-button>
              </template>
              <el-button type="text" class="mr15" v-if="Number(scope.row.errorType) ===8" @click="inStoreAgain(scope.row.changeId)">重新入库
              </el-button>
              <el-button type="text" class="mr15" v-if="Number(scope.row.errorType) ===5" @click="outStoreAgain(scope.row.changeId)">重新出库
              </el-button>
              <more-operating @onEdit="editChangeOrderFunction(scope.row.changeId)" @onComplete="finishOrder(scope.row.changeId)" v-if="scope.row.changeStatus <5 && scope.row.changeStatus>0 && Number(scope.row.errorType) !==5&& Number(scope.row.errorType) !==8" @onCancel="cancelChangeOrderFunction(scope.row.changeId)" :status="scope.row.changeStatus" @onToReturn="toReturnFunction(scope.row.changeId)" @onChange="changeAddress(scope.row)" :invType="scope.row.invType">
              </more-operating>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="changeStatus" min-width="110">
        <template slot-scope="scope">
          <div class="row-show">
            <span :class="returnClass(scope.row.changeStatus)"></span> {{statusText[scope.row.changeStatus]}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="渠道" prop="channelName" min-width="80">
        <template slot-scope="scope">
          <div class="row-show">
            {{ Number(scope.row.channelId) !== -1 ? scope.row.channelName : '其他' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="换货金额（元）" min-width="80">
        <template slot-scope="scope">
          {{scope.row.changeTotal/100|keepTwoNum}}
        </template>

      </el-table-column>
      <!--<el-table-column label="收货仓" prop="stockName" min-width="185">-->
      <!--<template slot-scope="scope">-->
      <!--<div class="row-show" :title="scope.row.stockName">{{scope.row.stockName}}</div>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column label="客户" min-width="100">
        <template slot-scope="scope">
          <!--<div class="row-show" :title="scope.row.stockName">{{scope.row.stockName}}</div>-->
          <div class="buyer-information">
            <p>{{scope.row.custLinkMan}}</p>
            <p v-if="scope.row.custLinkTel">{{`${scope.row.custLinkTel.substr(0, 3)} ${scope.row.custLinkTel.substr(3, 4)} ${scope.row.custLinkTel.substr(7, 4)}`}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="物流信息" min-width="80">
        <template slot-scope="scope">
          {{scope.row.extLisDeliverNo?scope.row.extLisDeliverNo:'无'}}
        </template>
      </el-table-column>
      <el-table-column label="换货时间" min-width="80">
        <template slot-scope="scope">
          <div class="row-show" :title="formatFullDateAnother(scope.row.createTime)">{{formatFullDateAnother(scope.row.createTime)}}</div>
        </template>
      </el-table-column>
      <div slot="empty" class="table_slot_empty_text">
        <div><img src="../../../layouts/images/nodata.png" /></div>
        <div>暂无数据</div>
      </div>
    </el-table>
    <edit-remark v-if="dialogVisible" :dialogVisible="dialogVisible" class="editRemark" v-on:onCancel="hideDialog" v-on:onEdit="changeCurrentOrderRemark($event)" :remarkDetail="remarkRow?remarkRow.remark:''" :returnId="remarkRow?remarkRow.changeId:''"></edit-remark>
  </div>
</template>




<script>
import TableHeightMixins from "~/mixins/tableheight";
import MoreOperating from "~/components/common/MoreOperatingChangeOrder";
import EditRemark from "~/components/common/EditRemark";
import utils from "~/utils/commonMethod";
import filters from "~/mixins/filters";
import { mapActions, mapState } from "vuex";

export default {
  name: "change-list-table",
  mixins: [TableHeightMixins, filters],
  props: {
    changeOrderList: {
      type: Array
    }
  },
  components: {
    MoreOperating,
    EditRemark
  },
  data() {
    return {
      statusText: {
        0: "已取消",
        1: "未收货",
        2: "待入库",
        3: "已入库",
        4: "待出库",
        5: "已出库",
        6: "已完成",
        7: "转退货"
      },
      cancelChangeOrderParam: {
        changeId: "",
        changeStatus: 0,
      },
      dialogVisible: false,
      // 编辑备注
      remarkData: null,
      remarkIndex: null,
      remarkRow: null
    };
  },
  methods: {
    ...mapActions([
      "editChangeOrderremark",
      "changeStatusUpdate",
      "editChangeOrderremark",
      "showPageLoading",
      "hidePageLoading",
      "inStockAgain",
      "outStockAgain",
    ]),
    setCurOperationRow(row) {
      this.$emit('setCurOperationRow', row)
    },
    // 改变备注
    changeCurrentOrderRemark(data) {
      this.editChangeOrderremark({
        changeId: data[1],
        remark: data[0]
      }).then(res => {
        if (res.code === 0) {
          this.$message({
            message: `修改备注成功`,
            type: 'success',
          });

          this.dialogVisible = false;
          this.remarkRow.remark = data[0];
        } else {
          this.$message({
            type: "error",
            message: `修改备注失败`
          });
        }
      });
    },
    // 查看换货商品详情列表
    toChangeList(changeId) {
      this.$router.push(`/sales/change/checkList/${changeId}`);
    },
    // 日期格式化
    formatFullDateAnother(data) {
      return utils.formatFullDateAnother(data);
    },
    toReturnFunction(id) {
      // 转退货
      this.$confirm("确认转退货?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.showPageLoading();
          const datas = {
            changeId: id,
            changeStatus: 7
          };
          this.changeStatusUpdate(datas).then(res => {
            this.$message({
              message: '操作成功',
              type: 'success',
            });
            this.hidePageLoading();
            this.$emit("getListRefresh");
          });
        })
        .catch(() => { });
    },
    cancelChangeOrderFunction(changeId) {
      // 取消换货单
      this.cancelChangeOrderParam.changeId = changeId;
      this.$confirm("确认取消换货单", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.changeStatusUpdate(this.cancelChangeOrderParam).then(resp => {
            this.$message({ type: 'success', message: `订单 ${changeId} 取消成功` });
            this.$emit("getListRefresh");
          });
        })
        .catch(() => { });
    },
    // 完成订单
    finishOrder(changeId) {
      const datas = {
        changeId: changeId,
        changeStatus: 6,
      };
      this.$confirm("确认完成换货单", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.changeStatusUpdate(datas).then(resp => {
            this.$message({
              message: '操作成功',
              type: 'success',
            });
            this.$emit("getListRefresh");
          });
        })
        .catch(() => { });
    },
    changeAddress(row) {
      // 修改地址
      this.$emit("changeAddressFunction", row);
    },
    returnClass(status) {
      // 状态标识class
      if (status === 1) {
        return " circle circle-FFA416";
      } else if (status === 2 || status === 4) {
        return " circle circle-FF6369";
      } else {
        return " circle circle-8E939A";
      }
    },
    // 编辑备注
    funEditRemark(_index, _one) {
      this.dialogVisible = true;
      this.remarkIndex = _index;
      this.remarkRow = _one;
    },
    hideDialog(data) {
      this.dialogVisible = data;
    },
    editChangeOrderFunction(changeId) {
      // 编辑换货
      // this.$router.push(`/sales/change/editOrder/${changeId}`)
      this.$router.push({
        name: "EditChangeOrder",
        params: {
          changeId: changeId
        }
      });
    },
    queryOutStoreFcuntion(id) {
      // 出库
      this.$emit("queryOutStoreFcuntion", id);
    },
    queryPurchaseDetailsFcuntion(id) {
      // 入库
      this.$emit("queryPurchaseDetailsFcuntion", id);
    },
    // 重新入库
    inStoreAgain(changeId) {
      //  orderType （订单类型 1-销售订单 2-退货订单 3-换货订单）
      //  type  (入库单类型   4：退货入库,  5：出库拒收入库  6：销售换货入库 7-销售代发入库 8-出库撤销入口)
      this.showPageLoading();
      const datas = {
        relatedSheetId: changeId,
        orderType: 3,
        type: 6,
      };
      this.inStockAgain(datas).then((res) => {
        this.hidePageLoading();
        this.$emit("loaded");
        this.$message(
          {
            type: 'success',
            message: res.success
          }
        );
      }).catch(err => this.hidePageLoading());
    },
    // 重新出库
    outStoreAgain(changeId) {
      // number orderType (订单类型 1-销售订单 2-退货订单 3-换货订单)
      // number type (类型 1:销售出库，2:退货出库, 3:后台出库,4-换货出库)
      // number bizType (类型 1-普通；2-代售；3.代发；4-代发出库)
      this.showPageLoading();
      const datas = {
        relatedSheetId: changeId,
        bizType: 1,
        type: 4,
        orderType: 3,
      };
      this.outStockAgain(datas).then((res) => {
        this.hidePageLoading();
        this.$emit("getListRefresh");
        this.$message(res.success);
      }).catch(err => this.hidePageLoading());
    },
  },
  mounted() {
    this.setTableHeight(245);
  }
};
</script>


<style lang="scss">
.remarkShow {
  cursor: pointer;
  font-size: 12px;
  padding-left: 4px;
  span {
    max-width: 100rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    vertical-align: bottom;
  }
  &:hover .icon-bianji {
    color: #3b8cff;
  }
}

.popover222 {
  width: 100px;
}
.changeListTable {
  padding: 0 0 20px 0;
  .table1 .el-table__row {
    .popover222 {
      visibility: hidden;
      cursor: pointer;
    }
    &:hover {
      .popover222 {
        visibility: visible;
      }
    }
  }
}
</style>
<style lang="scss" scope>
.more-operate-col {
  border-left: none;
  .cell {
    font-size: 12px;
  }
}
</style>
