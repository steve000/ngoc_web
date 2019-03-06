<template>
    <div class="checkReturnList product-detail-layout table-bottom-line">
        <div class="inner-box">
            <div class="order-content">
                <div class="top-tab">
                    <div class="sale-item-number">
                        <span>销售退货单号：{{$route.params.returnId}}</span>
                        <!-- CANCELED(0,"已取消"), -->
                        <!--NOTINSTORAGE(1,"未收货"),-->
                        <!--BEINTOSTORAGE(2,"待入库"),-->
                        <!--HAVEINTOSTORAGE(3,"已完成"); -->
                        <span v-if="getStatus">状态：{{getStatus}}</span>
                    </div>
                    <div>
                        <template v-if="getStatus==='未收货'">
                            <el-button type="primary" class="edit-btn" @click="confirmStockIn" v-if="Number(returnDetail.invType) !== 0">入库</el-button>
                            <span class="icon-edit-box" @click="toEditPage">
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
                        <ReturnProductList :returnList="returnList"></ReturnProductList>
                    </template>
                    <template v-else-if="currentTitle==='入库记录'">
                        <ReturnInboundRecordTable :inStoreList="inStoreList"></ReturnInboundRecordTable>
                    </template>
                    <template v-else-if="currentTitle==='操作日志'">
                        <ReturnOperationLogTable :logList="logList"></ReturnOperationLogTable>
                    </template>
                    <!-- <el-button plain @click="goBack" class="btn-plain-special">返回</el-button> -->
                </div>
            </div>
            <!-- <div class="goods-base-info" style="width: 280px;"> -->
            <div class="goods-base-info" style="width: 19%;">
                <ReturnBaseInfo :returnDetail="returnDetail"></ReturnBaseInfo>
            </div>
        </div>
        <el-dialog title="入库操作" :visible.sync="isStockInDialogVisible" width="60%">
            <el-table :data="returnList" :height="200">
                <el-table-column label="商品名称" prop="skuName" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.skuName">{{scope.row.skuName}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="商品编码" prop="skuId" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.skuId">{{scope.row.skuId}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="单位" prop="unitName" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.unitName">{{scope.row.unitName}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="退货数量" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.returnCount">{{scope.row.returnCount}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="入库数量" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.returnCount">{{scope.row.returnCount}}</div>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" :disabled="disableStockIn" @click="createStockInOrder">确认入库</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
import { mapActions, mapState } from 'vuex';
import PlatformMixins from '~/mixins/platform';
import { routesMapping } from '~/router';
import QuitMixins from '~/mixins/quit'
import ReturnInboundRecordTable from '~/components/sales/salesReturn/ReturnInboundRecordTable'; // 入库记录
import ReturnOperationLogTable from '~/components/sales/salesReturn/ReturnOperationLogTable'; // 操作日志
import ReturnBaseInfo from '~/components/sales/salesReturn/ReturnBaseInfo'; // 商品详情
import ReturnProductList from '~/components/sales/salesReturn/ReturnProductList'; // 商品详情
export default {
    name: "CheckReturnList",
    mixins: [PlatformMixins, QuitMixins],
    components: {
        ReturnInboundRecordTable,
        ReturnOperationLogTable,
        ReturnBaseInfo,
        ReturnProductList,
    },
    created() {
        this.getReturnInfo();
        this.getReturnList();
    },
    data() {
        return {
            // 切换订单
            saleOrderTab: [
                { title: '商品清单' },
                { title: '入库记录' },
                { title: '操作日志' },
            ],
            returnList: [], // 商品清单
            currentTitle: '商品清单',  // 当前订单类别
            returnDetail: {}, // 订单商品详情
            logList: [], // 日志列表
            inStoreList: null, // 入库记录
            isStockInDialogVisible: false,//是否显示入库弹窗
            createStockIn: {//确认入库
                inSkuList: [],
                relatedSheetId: '',
                storehouseId: '',
                type: 4,
                channelId: '',
                bizType: 1,
            },
            disableStockIn: false,
        };
    },
    methods: {
        ...mapActions([
            "showPageLoading",
            "hidePageLoading",
            "queryLog",
            "queryLogList",
            "querySinglePutstorage",
            "queryRefundInfo",
            "queryRefundGoods",
            "saveInStore",
        ]),
        changeTab(title) {
            this.currentTitle = title;
            switch (title) {
                case '入库记录': this.getInStore(); break;
                case '操作日志': this.getLog(); break;
            }
        },
        // 查询入库
        getInStore() {
            this.showPageLoading();
            const datas = {
                bizType: 1,
                type: 4,
                relatedSheetId: this.$route.params.returnId,
            };
            if (this.returnDetail.returnType === 22) {
                datas.bizType = 2;
            } else if (this.returnDetail.returnType === 23) {
                datas.bizType = 4;
            }
            // querySinglePutstorage
            this.querySinglePutstorage(datas).then((res) => {
                this.hidePageLoading();
                if (res.data === null) {
                    this.inStoreList = null;
                    return;
                }
                this.inStoreList = res.stockPerInList.toString() === '' ? null : res.stockPerInList[0];
            });
        },
        getLog() { // 查询日志列表
            this.showPageLoading();
            const params = {
                billType: 1,
                billId: this.$route.params.returnId,
            };
            this.queryLogList(params).then((res) => {
                this.logList = res.result;
                this.hidePageLoading();
            });
        },
        // 获取退货商品信息
        getReturnInfo() {
            this.showPageLoading();
            const datas = {
                returnId: this.$route.params.returnId,
            };
            this.queryRefundInfo(datas).then((res) => {
                this.returnDetail = res;
            }).catch(() => {
                this.hidePageLoading();
            });
        },
        goBack() { // 返回列表页
            this.OnBackLatePage();
        },
        getReturnList() {// 获取退票订单列表
            this.queryRefundGoods({ returnId: this.$route.params.returnId }).then((res) => {
                this.returnList = res.result;
                this.hidePageLoading();
            }).catch(() => {
                this.hidePageLoading();
            });
        },
        //点击取消
        OnBackLatePage() {
            this.quit(routesMapping.SalesReturn, true)
        },
        /**
         * 确认入库操作
         */
        createStockInOrder() {
            this.disableStockIn = true;
            this.showPageLoading();
            this.createStockIn.bizType = { 21: 1, 22: 2, 23: 4 }[this.returnDetail.returnType];
            this.createStockIn.relatedSheetId = this.returnDetail.returnId;
            this.createStockIn.storehouseId = this.returnDetail.stockId;
            this.createStockIn.channelId = this.returnDetail.channelId;
            let skuList = this.returnDetail.saleReturnSkuList;
            for (let i = 0; i < skuList.length; i++) {
                if (skuList[i].inCount || skuList[i].returnCount) {
                    let skuListItem = {
                        skuId: skuList[i].skuId,
                        skuPrice: skuList[i].price,
                        totalCount: skuList[i].inCount || skuList[i].returnCount,
                        inCount: skuList[i].inCount || skuList[i].returnCount,
                        relatedSeqNo: skuList[i].serialNo,
                        productId: skuList[i].productId,
                    };
                    this.createStockIn.inSkuList.push(skuListItem);
                }
            }
            this.saveInStore(this.createStockIn).then((resp) => {
                this.$message({
                    message: '入库成功',
                });
                this.quit(routesMapping.SalesReturn);
                this.isStockInDialogVisible = false;
                this.disableStockIn = false;
                this.hidePageLoading();
            });
        },
        confirmStockIn() {
            this.isStockInDialogVisible = true;
        },
        // 编辑新开页面
        toEditPage() {
            this.$router.push({
                name: "EditReturnOrder",
                params: { returnId: this.returnDetail.returnId, orderId: this.returnDetail.orderId }
            });
        },
    },
    computed: {
        getStatus() {
            switch (this.returnDetail && this.returnDetail.returnStatus) {
                case 0: return '已取消'; break;
                case 1: return '未收货'; break;
                case 2: return '待入库'; break;
                case 3: return '已完成'; break;
                default: return null;
            }
        },
    },
    watch: {
        '$route'(to, from) {
            if (this.$route.params.returnId) {
                // if (this.returnDetail.returnId !== this.$route.params.returnId) {
                //     this.currentTitle = "商品清单";
                // }
                this.currentTitle = "商品清单";
                this.getReturnInfo();
                this.getReturnList();
            }
        }
    },
}
</script>
<style lang="scss">
.checkReturnList {
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
.el-checkbox__inner::after {
  /*border: 2px solid #fff;*/
  border-color: #fff !important;
  border-bottom-width: 2px;
}
</style>
<style scoped lang="scss">
.inner-box {
  height: 100%;
  padding-top: 10px;
  .order-content {
    // width: 1010px;
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
.return-edit-order {
  margin-right: 8px;
}
</style>
