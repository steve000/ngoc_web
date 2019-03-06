<template>
    <div class="checkRepresentOrder product-detail-layout table-bottom-line">
        <div class="inner-box">
            <div class="order-content">
                <div class="top-tab">
                    <div class="sale-item-number">
                        <span v-if="orderDetail && orderDetail.orderId">销售单号：{{this.$route.params.saleOrderId}}</span>
                        <!--0-已取消；1-未发货；2-待出库；3-部分出库；4-已发货；5-已完成；6-已拒收-->
                        <span v-if="getStatus">状态：{{getStatus}}</span>
                        <span v-if="orderDetail && orderDetail.orderType === 14">订单类型：代发订单</span>
                    </div>
                    <div>
                        <template v-if="getStatus === '部分出库'">
                            <el-button type="primary" @click="outboundFunc" class="edit-btn">出库</el-button>
                        </template>
                        <template v-if="getStatus === '未出库'">
                            <el-button type="primary" @click="outboundFunc
                            " class="edit-btn">出库</el-button>
                            <el-button type="primary" class="edit-btn" @click="cancelOrder">取消订单</el-button>
                            <span class="icon-edit-box" style="cursor: pointer;" @click="toEditPage">
                                <i class="iconfont1 icon-bianji"></i>
                            </span>
                        </template>

                    </div>
                    <ul class="sale-order-tab">
                        <li v-for="(item,index) in saleOrderTab" :key="index" :class="{'active':item.title === currentTitle}" @click="changeTab(item.title)">{{item.title}}</li>
                    </ul>
                </div>
                <div class="order-list product-list-table-common">
                    <template v-if="currentTitle==='商品清单'">
                        <GoodsListTable :saleList="saleList" :proxy="true"></GoodsListTable>
                    </template>
                    <template v-else-if="currentTitle==='出库记录'">
                        <template v-if="outStoreList&&outStoreList.length > 0">
                            <div v-for="(item,index) in outStoreList" :key="index">
                                <OutboundRecordTable :outStoreList="item"></OutboundRecordTable>
                                <div v-if="outStoreList.length && outStoreList.length > 1 && index !== outStoreList.length - 1" class="bottom-line"></div>
                            </div>
                        </template>
                        <template v-else>
                            <OutboundRecordTable :outStoreList="null"></OutboundRecordTable>
                        </template>
                    </template>
                    <template v-else-if="currentTitle==='操作日志'">
                        <OperationLogTable :logList="logList" :isRepresent="true"></OperationLogTable>
                    </template>
                    <!-- <el-button plain @click="goBack" class="btn-plain-special">返回</el-button> -->
                </div>
            </div>
            <!-- <div class="goods-base-info" style="width: 280px;"> -->
            <div class="goods-base-info">
                <ProxyBaseInfo :orderDetail="orderDetail"></ProxyBaseInfo>
            </div>
        </div>
        <!-- 出库操作 -->
        <el-dialog title="出库操作" :visible.sync="outboundVisible" width="1060px">
            <div>
                <span style="font-size:14px;color: #666666; width:80px;">发货仓库：</span>
                <el-select v-model="selectedWarehouse" placeholder="请选择发货仓库" style="width:200px;" @change="updataSelectedWarehouse">
                    <el-option v-for="item in storeList" :key="item.storehouseId" :label="item.storehouseName" :value="item.storehouseId">
                    </el-option>
                </el-select>
            </div>
            <el-row class="mt30">
                <el-table :data="outboundGoodsList" :height="outboundGoodsList && outboundGoodsList.length ? '' : '38'" max-height="170" style="border: 1px solid #ebeef5;border-right: 1px solid #ebeef5;">
                    <el-table-column prop="skuName" label="商品名称" show-overflow-tooltip></el-table-column>
                    <el-table-column width="78">
                        <template slot-scope="scope">
                            <div v-show="selectedWarehouse && ((scope.row.saleCount - scope.row.sendCount) > scope.row.unableCount) " class="inventory">库存不足</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="skuId" label="商品编码" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="unitName" label="单位" show-overflow-tooltip width="80"></el-table-column>
                    <el-table-column prop="saleCount" label="销售数量" show-overflow-tooltipwidth="120"></el-table-column>
                    <el-table-column prop="sendCount" label="已出库" show-overflow-tooltip width="120"></el-table-column>
                    <el-table-column label="本次出库" width="120">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.outCount" size="small" style="width: 100px;" @keyup.native="setOutboundCount(scope.row, scope.$index)">
                            </el-input>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="outboundVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveStoreout">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
import { mapActions, mapState } from 'vuex';
import { routesMapping } from '~/router';
import QuitMixins from '~/mixins/quit'
import PlatformMixins from '~/mixins/platform';
import GoodsListTable from '~/components/sales/salesOrder/GoodsListTable'; // 商品清单
import OutboundRecordTable from '~/components/sales/salesOrder/OutboundRecordTable'; // 出库记录
import OperationLogTable from '~/components/sales/LogComponent/OperationLogTable'; // 操作日志
import ProxyBaseInfo from '~/components/sales/salesProxy/ProxyBaseInfo'; // 商品详情
import utils from "~/utils/commonMethod";

export default {
    name: "CheckRepresentOrder",
    mixins: [PlatformMixins, QuitMixins],
    components: {
        GoodsListTable,
        OutboundRecordTable,
        OperationLogTable,
        ProxyBaseInfo,
    },
    mounted() {
        this.getSalesOrder();
        this.getGoodsInfo();
    },
    data() {
        return {
            // 切换订单
            saleOrderTab: [
                { title: '商品清单' },
                { title: '出库记录' },
                { title: '操作日志' },
            ],
            saleList: [], // 商品清单
            outStoreList: null, // 出库记录列表
            currentTitle: '商品清单',  // 当前订单类别
            orderDetail: null, // 订单商品详情
            logList: [], // 日志列表
            orderAttrbute: {},
            outboundVisible: false,
            value: '', // 选择的仓库
            changeList: [], // 换货记录
            // 仓库地址
            warehouseOptions: [],
            // 选中仓库
            selectedWarehouse: '',
            // 出库商品列表
            outboundGoodsList: null,
            // 仓库地址
            storeList: [], // 仓库列表
            commonInfoMap: null, // 出库详情
        };
    },
    methods: {
        ...mapActions(["showPageLoading",
            "hidePageLoading",
            "queryGoodsDetail",
            "querySalesOrder",
            "querySalesOrderById",
            "queryLogList",
            "queryChangeOutStoreRecord",
            "getRefundBySaleId",
            "querySalesOutStoreList",
            "queryStoreList",
            "saveOutStore",
            "editOrderStatus",
        ]),
        // 出库
        // 设置本次出库数量
        setOutboundCount(item, index) {
            if (utils.isNum(item.outCount)) {
                this.$set(item, "outCount", Number(item.outCount))
                if (item.outCount < 0) {
                    this.$set(item, "outCount", Math.abs(item.outCount))
                }
                if (item.outCount > item.usableCount) {
                    this.$set(item, "outCount", item.usableCount)
                }
                const arr = this.outboundGoodsList.concat()
                arr.splice(index, 1)
                // 如果有skuid相同的订单
                if (arr.some(i => i.skuId === item.skuId)) {
                    // 当前skuid相同订单的出库数量总数
                    const sum = this.outboundGoodsList.filter(i => i.skuId === item.skuId).map(i => i.outCount).reduce((x, y) => (Number(x) + Number(y)))
                    // 剩余库存数 = 可用库存数 - 当前skuid相同订单的出库数量总数
                    const residueNum = item.unableCount - sum
                    if (residueNum < 0) {
                        const num = item.unableCount - item.oldOutCount
                        if (isNaN(num)) {
                            this.$set(item, "outCount", item.defalutCount)
                            this.$set(item, "oldOutCount", item.outCount)
                        } else {
                            const sum = arr.filter(i => i.skuId === item.skuId).map(i => i.outCount).reduce((x, y) => (Number(x) + Number(y)))
                            this.$set(item, "outCount", num > 0 ? item.unableCount - sum : 0)
                            this.$set(item, "oldOutCount", item.outCount)
                        }
                    } else if (residueNum === 0) {
                        this.$set(item, "outCount", item.outCount)
                        this.$set(item, "oldOutCount", item.outCount)
                    }
                }
            } else {
                this.$set(item, "outCount", undefined);
            }
        },
        changeTab(title) {
            this.currentTitle = title;
            switch (title) {
                case '出库记录': this.getOutStore(); break;
                case '操作日志': this.getOrderLog(); break;
            }
        },
        // 获取商品清单
        getSalesOrder() {
            this.showPageLoading();
            const params = {
                orderId: this.$route.params.saleOrderId,
            };
            this.querySalesOrder(params).then((res) => {
                this.saleList = res.result;
            }).catch(() => {
                this.hidePageLoading();
            });
        },
        // 获取商品信息
        getGoodsInfo() {
            const datas = {
                orderId: this.$route.params.saleOrderId,
            };
            this.querySalesOrderById(datas).then((res) => {
                this.hidePageLoading();
                this.orderDetail = res;
            }).catch(() => {
                this.hidePageLoading();
            });
            this.queryGoodsDetail(datas);
        },
        getOrderLog() { // 获取订单日志
            this.showPageLoading();
            // 0-销售订单;1-销售退单;2-销售换货
            const params = {
                billId: this.$route.params.saleOrderId,
                billType: 0,
            };
            this.queryLogList(params).then((res) => {
                this.hidePageLoading();
                this.logList = res.result;
            });
        },
        getOutStore() { // 出库记录
            this.showPageLoading();
            // bizType：1-普通；2-代售；3.代发；4-代发出库
            // 2018.6.8 steve 与黄工联调查询出库记录{ type:1 biztype:3 }
            const datas = {
                type: 1,
                bizType: 3,
                relatedSheetId: this.$route.params.saleOrderId,
            };
            this.queryChangeOutStoreRecord(datas).then((res) => {
                this.hidePageLoading();
                if (res.data === null) {
                    this.outStoreList = null;
                    return;
                }
                this.outStoreList = res;
            });
        },
        goBack() { // 返回列表页
            this.OnBackLatePage();
        },
        //点击取消
        OnBackLatePage() {
            this.quit(routesMapping.InsteadDelivery, true)
        },
        getOrderRefund() {
            this.showPageLoading();
            this.getRefundBySaleId({ orderId: this.$route.params.saleOrderId }).then((res) => {
                this.hidePageLoading();
                this.tableData = res.result;
            });
        },
        // 出库初始化
        outboundFunc(row) {
            this.outboundVisible = true;
            this.queryStoreList({ bizType: 1, channelId: row.channelId }).then(res => {
                this.storeList = res;
                this.updataSelectedWarehouse(-1);
            });
        },
        // 出库-选中仓库更新商品列表
        updataSelectedWarehouse(val) {
            if (val !== -1) {
                this.selectedWarehouse = val
            }
            this.querySalesOutStoreList({
                orderId: this.$route.params.saleOrderId,
                storehouseId: val,
                type: 1
            }).then(res => {
                if (res && res.list) {
                    res.list.forEach(i => {
                        i.usableCount = (i.saleCount - i.sendCount) < 0 ? 0 : (i.saleCount - i.sendCount);
                        if (i.usableCount > i.unableCount) {
                            i.usableCount = i.unableCount;
                        }
                        i.defalutCount = i.outCount
                    });
                    this.outboundGoodsList = res.list;
                }
            });
        },
        // 保存出库
        saveStoreout() {
            if (!this.selectedWarehouse) {
                this.$message({
                    type: "warning",
                    message: `请选择发货仓库`
                });
                return false
            }
            const curwarehouse = this.storeList.find(
                i => i.storehouseId === this.selectedWarehouse
            );
            const params = Object.assign({}, {
                relatedSheetId: this.$route.params.saleOrderId,
                channelId: this.orderDetail.channelId,
                stockId: curwarehouse.storehouseId,
                stockType: curwarehouse.storehouseType,
                remark: this.orderDetail.remark,
                type: 1,
                bizType: 3,
            });
            params.sendSkuList = this.outboundGoodsList.map(i => ({
                skuId: i.skuId,
                outCount: i.outCount === null ? 0 : i.outCount,
                saleCount: i.saleCount,
                relatedSheetSeqNo: i.serialNo,
                skuPrice: i.price,
                productId: i.productId
            }))
            this.showPageLoading();
            const that = this;
            this.saveOutStore(params).then(res => {
                that.hidePageLoading();
                that.outboundVisible = false;
                that.getSalesOrder();
                that.getGoodsInfo();
                that.getOutStore();
                if (res === -1) {
                    that.$message({
                        type: "error",
                        message: `中移物流请求超时，请到异常订单中重试`
                    });
                } else {
                    that.$message({
                        type: "success",
                        message: `出库成功`
                    });
                }
            }).catch(err => {
                this.hidePageLoading()
                this.$message({
                    type: "error",
                    message: err.msg
                })
            })
        },
        cancelOrder() { // 取消订单
            this.$confirm('确认取消订单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.showPageLoading();
                const cancelDatas = {
                    orderId: this.$route.params.saleOrderId,
                    orderStatus: 0,
                };
                this.editOrderStatus(cancelDatas).then((res) => {
                    this.hidePageLoading();
                    this.getGoodsInfo();
                });
            }).catch(() => {
            });

        },
        toEditPage() {
            this.$router.push(`/sales/proxy/updateOrder/${this.$route.params.saleOrderId}`);
        },
    },
    computed: {
        getStatus() {
            switch (this.orderDetail && this.orderDetail.orderStatus) {
                case 0: return '已取消'; break;
                case 1: return '未出库'; break;
                case 2: return '待出库'; break;
                case 3: return '部分出库'; break;
                case 4: return '已发货'; break;
                case 5: return '已完成'; break;
                case 6: return '已拒收'; break;
                default: return null;
            }
        },
    },
    watch: {
        '$route'(to, from) {
            if (to.name === 'CheckRepresentOrder') {
                // if (this.orderDetail.orderId !== this.$route.params.saleOrderId) {
                //     this.currentTitle = "商品清单";
                // }
                this.currentTitle = "商品清单";
                this.getSalesOrder();
                this.getGoodsInfo();
            }
        }
    },
}
</script>
<style lang="scss">
.checkRepresentOrder {
  // width:100%;
  // padding: 0 30px;
  // .order-content{
  //     width: 80%;
  // }
  .el-table td {
    border-bottom: none;
  }
  .el-button {
    border-radius: 2px;
  }
}
.top-tab {
  .edit-btn {
    width: 60px;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    padding: 0;
  }
  // 编辑按钮
  .icon-bianji {
    font-size: 14px !important;
  }
}
.isUrgent {
  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background: #1989fa;
    border-color: #1989fa;
  }
  .el-checkbox__input.is-disabled + span.el-checkbox__label {
    color: #666 !important;
    font-size: 12px;
  }
}
.el-checkbox__inner::after {
  border-color: #fff !important;
  border-bottom-width: 2px;
}
</style>
<style scoped lang="scss">
.inner-box {
  height: 100%;
  padding-top: 10px;
  .order-content {
    background: #fff;
    margin-right: 16px;
    height: 100%;
  }
  /*顶部切换*/
  .top-tab {
    background: #f6f7fb;
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
  }
  .sale-item-number {
    color: #333;
    font-size: 12px;
    margin-bottom: 15px;
    .isUrgent {
      color: #666;
      margin-left: 30px;
    }
  }
  .sale-item-number span:nth-of-type(1) {
    margin-right: 30px;
    font-size: 14px;
  }
  .sale-item-number span:nth-of-type(2) {
    margin-right: 30px;
    font-size: 12px;
  }
  .sale-order-tab {
    margin-top: 15px;
  }
  .sale-order-tab li {
    display: inline-block;
    width: 86px;
    height: 36px;
    background: #e7e8ed;
    margin-right: 6px;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
    color: #666;
  }
  .sale-order-tab li.active {
    background: #fff;
    color: #333;
  }
  .order-list {
    box-sizing: border-box;
    padding: 21px;
    background: #fff;
  }
}
/*选择仓库*/
.choose-warehouse {
  margin-top: 20px;
}
/*出库*/
.outbound-wrapper {
  margin-top: 16px;
}
.inventory {
  background-color: #fa5555;
  color: #fff;
  font-size: 12px;
  width: 58px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
</style>
