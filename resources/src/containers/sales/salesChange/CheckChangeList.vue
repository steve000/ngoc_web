<template>
    <div class="checkChangeList product-detail-layout table-bottom-line">
        <div class="inner-box">
            <div class="order-content">
                <div class="top-tab">
                    <div class="sale-item-number">
                        <span>销售换货单号：{{changeDetail && changeDetail.changeId ? changeDetail.changeId:'--'}}</span>
                        <span class="status" v-if="getStatus">状态：{{getStatus}}</span>
                        <!-- <span v-if="changeDetail.invType === 1">收货仓：{{changeDetail.stockName}}</span> -->
                    </div>
                    <div v-if="changeDetail.invType === 1">
                        <template v-if="getStatus === '未收货'">
                            <el-button type="primary" class="edit-btn" @click="inStoreFunction">入库</el-button>
                            <span class="icon-edit-box" style="cursor: pointer;" @click="$router.push({ name:'EditChangeOrder', params: {changeId: $route.params.changeId}})">
                                <i class="iconfont1 icon-bianji"></i>
                            </span>
                        </template>
                        <template v-if="getStatus === '已入库'">
                            <el-button type="primary" class="edit-btn" @click="outStoreFunction">出库</el-button>
                            <el-button type="primary" class="edit-btn" @click="turnToReturn">转退货</el-button>
                        </template>
                    </div>
                    <ul class="sale-order-tab" v-if="changeDetail.invType === 1">
                        <li v-for="(item, index) in saleOrderTab" :key="index" :class="{'active':item.title === currentTitle}" @click="changeTab(item.title)">{{item.title}}</li>
                    </ul>
                    <ul class="sale-order-tab" v-else>
                        <li v-for="(item, index) in saleOrderTab2" :key="index" :class="{'active':item.title === currentTitle}" @click="changeTab(item.title)">{{item.title}}</li>
                    </ul>
                </div>
                <div class="order-list product-list-table-common">
                    <template v-if="currentTitle==='商品清单'">
                        <ChangeProductList :changeList="changeList"></ChangeProductList>
                    </template>
                    <template v-else-if="currentTitle==='物流单'">
                        <LogisticsInfo :logisticsRecords='logisticsRecords'></LogisticsInfo>
                    </template>
                    <template v-else-if="currentTitle==='入库记录'">
                        <ChangeInboundRecordTable :inStoreList="inStoreList"></ChangeInboundRecordTable>
                    </template>
                    <template v-else-if="currentTitle==='出库记录'">
                        <template v-if="outStoreList&&outStoreList.length > 0">
                            <!-- <ChangeOutboundRecordTable :outStoreList="outStoreList" :commonInfoMap="commonInfoMap"></ChangeOutboundRecordTable> -->
                            <div v-for="(item, index) in outStoreList" :key="index">
                                <ChangeOutboundRecordTable :outStoreList="item"></ChangeOutboundRecordTable>
                                <div v-if="outStoreList && outStoreList.length > 1 && index !== outStoreList.length - 1" class="bottom-line"></div>
                            </div>
                        </template>
                        <template v-else>
                            <ChangeOutboundRecordTable :outStoreList="null" :commonInfoMap="null"></ChangeOutboundRecordTable>
                        </template>
                    </template>
                    <!-- <template v-else-if="currentTitle==='拒收记录'">
                        <template v-if="refuseInStoreList&&refuseInStoreList.length > 0">
                            <div v-for="(item,index) in refuseInStoreList" :key="index">
                                <OutboundAbnormal :refuseInStoreList="item"></OutboundAbnormal>
                                <div class="bottom-line" v-if="refuseInStoreList.length && refuseInStoreList.length > 1 && index !== refuseInStoreList.length - 1"></div>
                            </div>
                        </template>
                        <template v-else>
                            <OutboundAbnormal :refuseInStoreList="null"></OutboundAbnormal>
                        </template>
                    </template> -->
                    <template v-else-if="currentTitle==='操作日志'">
                        <ChangeOperationLogTable :logList="logList"></ChangeOperationLogTable>
                    </template>
                    <!-- <el-button plain @click="goBack" class="btn-plain-special">返回</el-button> -->
                </div>
            </div>
            <!-- <div class="goods-base-info" style="width: 280px;"> -->
            <div class="goods-base-info" style="width: 19%;">
                <ChangeBaseInfo :changeDetail="changeDetail"></ChangeBaseInfo>
            </div>
        </div>

        <!--入库-->
        <InstoreDialog @confirmInStore="confirmInStore" @closeDiaolog='closeDiaolog' :inStoreDialogVisible="inStoreDialogVisible" :saleChangeSkus="changeDetail.saleChangeSkusModels" :inStoreDisabled="storeDisabled"></InstoreDialog>
        <!--出库-->
        <OutstoreDialog @closeDiaolog="closeOutstoreDiaolog" :channelId="changeDetail.channelId" :orderId="changeDetail.changeId" @confirmOutStore="confirmOutStore" :orderType="changeDetail.changeType" :outStoreDialogVisible="outStoreDialogVisible" :saleChangeSkus="changeDetail.saleChangeSkusModels" :outStoreDisabled="storeDisabled"></OutstoreDialog>

    </div>

</template>

<script>

import { mapActions } from 'vuex';
import PlatformMixins from '~/mixins/platform';
import { routesMapping } from '~/router';
import QuitMixins from '~/mixins/quit'
import ChangeOutboundRecordTable from '~/components/sales/changeOrder/ChangeOutboundRecordTable'; // 出库记录
import ChangeInboundRecordTable from '~/components/sales/changeOrder/ChangeInboundRecordTable'; // 入库记录
import ChangeOperationLogTable from '~/components/sales/changeOrder/ChangeOperationLogTable'; // 操作日志
import ChangeProductList from '~/components/sales/changeOrder/ChangeProductList'; // 商品清单
import ChangeBaseInfo from '~/components/sales/changeOrder/ChangeBaseInfo'; // 基本信息
import InstoreDialog from '~/components/sales/changeOrder/InstoreDialog' // 入库弹出框组件
import OutstoreDialog from '~/components/sales/changeOrder/OutstoreDialog' // 出库弹出框组件
import LogisticsInfo from "~/components/sales/salesOrder/LogisticsInfo"; // 物流单
import OutboundAbnormal from "~/components/sales/salesOrder/OutboundAbnormal"; // 拒收记录

export default {
    name: "CheckChangeList",
    mixins: [PlatformMixins, QuitMixins],
    components: {
        ChangeOutboundRecordTable,
        ChangeOperationLogTable,
        ChangeInboundRecordTable,
        ChangeProductList,
        ChangeBaseInfo,
        InstoreDialog,
        OutstoreDialog,
        LogisticsInfo,
        OutboundAbnormal,
    },
    mounted() {
        this.getChangeList();
        this.getChangeInfo();
    },
    data() {
        return {
            // 切换订单
            saleOrderTab: [],
            saleOrderTab2: [
                { title: '商品清单' },
                { title: '操作日志' },
            ],
            changeList: [], // 商品清单
            currentTitle: '商品清单',  // 当前订单类别
            changeDetail: {}, // 订单商品详情
            logList: [], // 日志列表
            outStoreList: null,
            inStoreList: null, // 入库记录
            inStoreDialogVisible: false, // 入库
            outStoreDialogVisible: false, // 出库
            storeDisabled: false, // 出入库禁用按钮
            // 物流信息
            logisticsRecords: null,
            // refuseInStoreList: null, // 拒收记录列表
        };
    },

    methods: {
        ...mapActions([
            "showPageLoading",
            "hidePageLoading",
            "queryLog",
            "querySinglePutstorage",
            "queryLogList",
            "queryChangeOrderInfoById",
            "queryChangeGoodsById",
            "changeStatusUpdate",
            "queryChangeOutStoreRecord",
            "saveOutStore",
            "saveInStore",
            "getRouterList",
        ]),
        changeTab(title) {
            this.currentTitle = title;
            switch (title) {
                case '入库记录': this.getInStore(); break;
                case '出库记录': this.getOutStore(); break;
                case '物流单': this.getRouter(); break;
                // case '拒收记录': this.getRefuseInStore(); break;
                case '操作日志': this.getLog(); break;
            }
        },

        // 查询入库
        getInStore() {
            this.showPageLoading();
            const datas = {
                bizType: 1,
                type: 6,
                relatedSheetId: this.$route.params.changeId,
            };
            if (this.changeDetail.changeType === 33) {
                datas.bizType = 4;
            } else if (this.changeDetail.changeType === 32) {
                datas.bizType = 2;
            }
            this.querySinglePutstorage(datas).then((res) => {
                this.hidePageLoading();
                if (res.data === null) {
                    this.inStoreList = null;
                    return;
                }
                this.inStoreList = res.toString() === '' ? null : res.stockPerInList[0];
            }).catch(() => {
                this.hidePageLoading();
            });
        },
        // 查询拒收记录
        // getRefuseInStore() {
        //     this.showPageLoading();
        //     const datas = {
        //         bizType: 1,
        //         type: 5,
        //         relatedSheetId: this.$route.params.changeId,
        //     };
        //     if (this.changeDetail.changeType === 33) {
        //         datas.bizType = 4;
        //     } else if (this.changeDetail.changeType === 32) {
        //         datas.bizType = 2;
        //     }
        //     this.querySinglePutstorage(datas).then((res) => {
        //         this.hidePageLoading();
        //         if (res.data === null) {
        //             this.refuseInStoreList = null;
        //             return;
        //         }
        //         this.refuseInStoreList = res.toString() === '' ? null : res.stockPerInList;
        //     }).catch(() => {
        //         this.hidePageLoading();
        //     });
        // },
        getLog() { // 查询日志列表
            this.showPageLoading();
            const params = {
                billType: 2,
                billId: this.$route.params.changeId,
            };
            this.queryLogList(params).then((res) => {
                this.logList = res.result;
                this.hidePageLoading();
            }).catch(() => {
                this.hidePageLoading();
            });
        },
        // 获取换货商品信息
        getChangeInfo() {
            const datas = {
                changeId: this.$route.params.changeId,
            };
            this.queryChangeOrderInfoById(datas).then((res) => {
                this.hidePageLoading();
                this.changeDetail = res;
                if (res.extLisDeliverNo) {
                    this.saleOrderTab = [
                        { title: '商品清单' },
                        { title: '物流单' },
                        { title: '入库记录' },
                        { title: '出库记录' },
                        // { title: '拒收记录' },
                        { title: '操作日志' },
                    ];
                    return;
                }
                this.saleOrderTab = [
                    { title: '商品清单' },
                    { title: '入库记录' },
                    { title: '出库记录' },
                    // { title: '拒收记录' },
                    { title: '操作日志' },
                ];

            }).catch(() => {
                this.hidePageLoading();
            });
        },
        goBack() { // 返回列表页
            // this.$router.push('/sales/change');
            this.OnBackLatePage();
        },
        getChangeList() {// 获取换货订单列表
            this.showPageLoading();
            this.queryChangeGoodsById({ changeId: this.$route.params.changeId }).then((res) => {
                this.changeList = res;
            }).catch(() => {
                this.hidePageLoading();
            });
        },
        // 转退货
        turnToReturn() {
            this.$confirm('确认转退货?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.showPageLoading();
                const datas = {
                    changeId: this.$route.params.changeId,
                    changeStatus: 7,
                };
                this.changeStatusUpdate(datas).then((res) => {
                    this.hidePageLoading();
                    if (res.msg === '处理成功') {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                        });
                        this.getChangeInfo();
                    }
                });
            }).catch(() => {
                this.hidePageLoading();
            });
        },
        //点击取消
        OnBackLatePage() {
            this.quit(routesMapping.SalesChange, true)
        },
        // 获取出库记录
        getOutStore() {
            this.showPageLoading();
            // bizType: //1-普通；2-代售；3.代发；4-代发出库
            // type:1:销售出库，2:退货出库, 3:后台出库,4-换货出库
            const datas = {
                type: 4,
                bizType: 1,
                relatedSheetId: this.$route.params.changeId,
            };
            if (this.changeDetail.changeType === 33) {
                datas.bizType = 4;
            } else if (this.changeDetail.changeType === 32) {
                datas.bizType = 2;
            }
            this.queryChangeOutStoreRecord(datas).then((res) => {
                this.hidePageLoading();
                if (res.data === null) {
                    this.outStoreList = null;
                    return;
                }
                this.outStoreList = res;
            }).catch(() => {
                this.hidePageLoading();
            });
        },
        // 入库
        inStoreFunction() {
            this.inStoreDialogVisible = true;
        },
        // 出库
        outStoreFunction() {
            this.outStoreDialogVisible = true;
        },
        confirmOutStore(outboundParams, shipStockName, stockType) { // 确认出库
            if (!shipStockName) {
                this.$message({ message: "请选择收货仓库", type: 'warning' });
                return;
            }
            this.showPageLoading();
            this.storeDisabled = true;
            const newProductDetailList = [];
            this.changeDetail.saleChangeSkusModels.map((val) => {
                let items = {};
                items.skuId = val.skuId;
                items.outCount = val.changeCount;
                items.saleCount = val.changeCount;
                items.relatedSheetSeqNo = val.serialNo;
                items.skuPrice = val.price;
                items.productId = val.productId;
                newProductDetailList.push(items);
            });
            const bizType = { 31: 1, 32: 2, 33: 4 }[this.changeDetail.changeType];
            const datas = {
                stockId: shipStockName,
                relatedSheetId: this.changeDetail.changeId,
                type: 4, // 订单类型，换货订单
                bizType, // 1：普通，2：代售 3：代发，4：代发出库
                custAddressId: this.changeDetail.customerAddressId,
                custLinkMan: this.changeDetail.custLinkMan,
                custLinkTel: this.changeDetail.custLinkTel,
                receiveAddress: this.changeDetail.customerAddress,
                stockType: stockType,
                sendSkuList: newProductDetailList,
                channelId: this.changeDetail.channelId,
                province: this.changeDetail.province,
                city: this.changeDetail.city,
                area: this.changeDetail.area,
                provinceCode: this.changeDetail.provinceCode,
                cityCode: this.changeDetail.cityCode,
                areaCode: this.changeDetail.areaCode,
            };
            const params = Object.assign({}, datas, outboundParams);
            this.saveOutStore(params).then((res) => {
                this.storeDisabled = false;
                this.hidePageLoading();
                if (res === -1) {
                    this.$message({
                        type: "error",
                        message: `中移物流请求超时，请到异常订单中重试`
                    });
                } else {
                    this.$message({
                        message: '出库成功',
                        type: 'success',
                    });
                }
                this.outStoreDialogVisible = false;
                this.getChangeInfo();
            }).catch(() => {
                this.hidePageLoading();
                this.storeDisabled = false;
            });
        },
        confirmInStore() { // 确认入库
            this.showPageLoading();
            this.storeDisabled = true;
            const bizType = { 31: 1, 32: 2, 33: 4 }[this.changeDetail.changeType];
            const datas = {
                type: 6,
                bizType,
                channelId: this.changeDetail.channelId,
                storehouseId: this.changeDetail.stockId,
                relatedSheetId: this.changeDetail.changeId,
                inSkuList: [],
            };
            this.changeDetail.saleChangeSkusModels.forEach(function (item) {
                const itemValue = {};
                itemValue.skuId = item.skuId;
                itemValue.skuPrice = item.price;
                itemValue.totleCount = item.changeCount;
                itemValue.inCount = item.changeCount;
                itemValue.relatedSeqNo = item.serialNo;
                itemValue.productId = item.productId;
                datas.inSkuList.push(itemValue);
            });
            this.saveInStore(datas).then((res) => {
                this.hidePageLoading();
                this.storeDisabled = false;
                this.inStoreDialogVisible = false;
                if (res === -1) {
                    this.$message({
                        type: "error",
                        message: `中移物流请求超时，请到异常订单中重试`
                    });
                } else {
                    this.$message({
                        message: '入库成功',
                        type: 'success',
                    });
                }
                this.getChangeInfo();
            }).catch(() => {
                this.storeDisabled = false;
                this.hidePageLoading();
            });
        },
        // 子组件触发的关闭弹窗
        closeDiaolog() {
            this.inStoreDialogVisible = false;
        },
        // 子组件触发的关闭弹窗
        closeOutstoreDiaolog() {
            this.outStoreDialogVisible = false;
        },
        // 获取物流记录
        getRouter() {
            this.getRouterList({ orderId: this.$route.params.changeId }).then(
                res => {
                    this.logisticsRecords = res;
                }
            );
        },
    },
    computed: {
        getStatus() {
            switch (this.changeDetail && this.changeDetail.changeStatus) {
                case 0: return '已取消'; break;
                case 1: return '未收货'; break;
                case 2: return '待入库'; break;
                case 3: return '已入库'; break;
                case 4: return '待出库'; break;
                case 5: return '已出库'; break;
                case 6: return '已完成'; break;
                case 7: return '转退货'; break;
                default: return null;
            }
        },
    },
    watch: {
        '$route'(to, from) {
            if (to.name === 'CheckChangeList') {
                // if (this.changeDetail.changeId !== this.$route.params.changeId) {
                //     this.currentTitle = "商品清单";
                // }
                this.currentTitle = "商品清单";
                this.getChangeList();
                this.getChangeInfo();
            }
        }
    },
}

</script>
<style lang="scss">
.checkChangeList {
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
.el-checkbox__inner::after {
  border-color: #fff !important;
  border-bottom-width: 2px;
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
    margin-bottom: 12px;
    .status {
      margin-right: 40px;
    }
  }
  .sale-item-number span:nth-of-type(1) {
    margin-right: 30px;
    font-size: 14px;
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
.bottom-line {
  width: 100%;
  height: 1px;
  background: #eeeff6;
  margin-bottom: 20px;
}
.out-store-operating .sale-type-wapper {
  margin-bottom: 20px;
}
.out-store-operating .ship-store {
  margin-bottom: 20px;
}
</style>
