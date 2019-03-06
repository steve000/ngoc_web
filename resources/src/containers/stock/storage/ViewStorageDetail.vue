<template>
    <div class="view-storage">
        <div class="DetailsLeftBox detailsBigBox">
            <div class="viewLeftTop">
                <div>
                    <h4 class="order">入库单号：{{ stockPerInId}}</h4>
                    <h4 class="status">状态：{{this.inStatusText[this.stockPerInInStatus]}}</h4>
                    <h4 class="status">入库类型：{{sheetTypeText[viewStockDetail.type]}}</h4>
                </div>
                <div v-if="stockPerInInStatus === 1">
                    <el-button class="cancel-button"
                               @click="isCancelStockInDialogVisible=true">取消
                    </el-button>
                </div>
            </div>
            <div class="tab-container">
                <el-tabs v-model="activeTabName" type="card">
                    <el-tab-pane label="商品清单" name="first">
                        <div class="stockPerInList">
                            <div class="stockPerInItem" v-for="item in stockInListDetail">
                                <div class="stockIn-item-container" v-if="snList.length>0">
                                    <span class="view-sn" @click="isSnDialogVisible = true">
                                        <i class="iconfont1 icon-chakan"></i>查看串码</span>
                                </div>
                                <el-table :data="item.skuList">
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
                                            <div class="row-show" :title="scope.row.unitName">{{scope.row.unitName}}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column v-for="item,index in header" :key="index" :label="item.label"
                                                     :prop="item.prop" min-width="100">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row[item.prop]">
                                                {{item.prop === 'actualInCount' ? getActualInCount(scope.row) : scope.row[item.prop]}}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <!--<el-table-column label="备注" prop="comments" min-width="110">-->
                                        <!--<template slot-scope="scope">-->
                                            <!--<div class="row-show" :title="scope.row.comments">-->
                                                <!--{{scope.row.comments !== "" && scope.row.comments !== null ? scope.row.comments : '无'}}-->
                                            <!--</div>-->
                                        <!--</template>-->
                                    <!--</el-table-column>-->
                                </el-table>
                                <div class="orderContainer">
                                    <div class="orderCount">
                                        已入库合计金额 : <span>￥{{item.totalAmount}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="DetailsRightBox">
            <h3>基本信息</h3>
            <el-form :modle="viewStockDetail" label-position="left" class="TotalBasic">
                <el-form-item label="操作人：">
                    <span>{{viewStockDetail.operator ? viewStockDetail.operator : '--'}}</span>
                </el-form-item>
                <el-form-item label="创建时间：">
                    <span>{{viewStockDetail.createTime ? viewStockDetail.createTime : '--'}}</span>
                </el-form-item>
                <el-form-item label="更新时间：">
                    <span>{{viewStockDetail.updateTime ? viewStockDetail.updateTime : '--'}}</span>
                </el-form-item>
                <el-form-item label="供应商："
                              v-if="viewStockDetail.type===1 || viewStockDetail.type===2 || viewStockDetail.type===3">
                    <span>{{viewStockDetail.supplierName ? viewStockDetail.supplierName : '--'}}</span>
                </el-form-item>
                <el-form-item label="关联业务单号：" v-if="viewStockDetail.type!==2">
                    <span>{{viewStockDetail.relatedSheetId ? viewStockDetail.relatedSheetId : '--'}}</span>
                </el-form-item>
                <el-form-item label="收货仓库：">
                    <span>{{viewStockDetail.storehouseName ? viewStockDetail.storehouseName : '--'}}</span>
                </el-form-item>
                <el-form-item label="入库原因："  v-if="viewStockDetail.type===2" >
                    <span>{{viewStockDetail.reasonType ? reasonType[viewStockDetail.reasonType] : '--'}}</span>
                </el-form-item>
                <el-form-item label="备注：">
                    <span>{{viewStockDetail.comments ? viewStockDetail.comments : '--'}}</span>
                </el-form-item>
            </el-form>
        </div>
        <modal v-model="isSnDialogVisible"
               title="查看串码"
               :footerVisible="false"
               width="60%">
            <download-excel
                v-if="snList.length>0"
                :downloadText="'下载串码'"
                :excelName="excelName"
                :data="snList"
                :label="['串码']"></download-excel>
            <div class="snListContainer">
                <span v-for="item in snList">{{item}}</span>
            </div>
        </modal>
        <modal :title="'取消入库'"
               v-model="isCancelStockInDialogVisible"
               @save="cancelStockInFunction"
               :showCancelButton="false"
               :width="'30%'">
            <div class="cancel-stockIn">
                <i class="iconfont1 icon-tishi"></i>请确认是否与中移物流线下沟通无误，取消后当前<span>{{stockPerInId}}</span>入库单讲作废，是否取消？
            </div>
        </modal>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import PlatformMixins from '~/mixins/platform';
    import utils from '~/utils/misc';
    import Modal from '~/components/common/Modal';
    import DownloadExcel from '~/components/common/DownloadExcel.vue';
    import moment from 'moment';
    import QuitMixins from '~/mixins/quit';
    import {SHEET_TYPE_TEXT,IN_STATUS_TEXT,REASON_TYPE_TEXT} from '~/constants/const'
    export default {
        name: 'viewStockDetail',
        data () {
            return {
                viewStockDetail: {},
                stockPerInId: "",
                supplier: "",
                stockNameList: [],
                sheetTypeText: SHEET_TYPE_TEXT,
                inStatusText: IN_STATUS_TEXT,
                activeTabName: 'first',
                header: [],
                skuList: [],
                stockInListDetail: [],
                stockPerInInStatus: 0,
                isSnDialogVisible: false,
                isCancelStockInDialogVisible: false,
                snList: [],
                excelName: '',
                totalAmount: 0,
                reasonType: REASON_TYPE_TEXT
            }
        },
        mixins: [PlatformMixins, QuitMixins],
        components: {
            Modal, DownloadExcel
        },
        mounted(){
            this.stockPerInId = this.$route.params.stockPerInId;
            this.queryData();
            this.showSnModal(this.stockPerInId);
            this.queryStockInListDetailFunction({stockPerInId: this.stockPerInId});
        },
        methods: {
            ...mapActions(['queryStockInProductList', 'queryStockInBasicDetail', 'queryStockInListDetail', 'querySnList', 'cancelStockIn']),
            queryData(){
                this.queryStockInBasicDetailFunction({stockPerInId: this.stockPerInId});
            },
            queryStockInBasicDetailFunction(param){
                this.queryStockInBasicDetail(param).then((res) => {
                    this.viewStockDetail = res;
                    switch (res.type) {
                        case 1:
                            this.header = [
                                {prop: "price", label: "采购单价（元）"},
                                {prop: "inCount", label: "计划入库"},
                                {prop: "actualInCount", label: "实际入库"},
                                {prop: "totalAmount", label: "入库总价（元）"},
                            ];
                            break;
                        case 2:
                            this.header = [
                                {prop: "price", label: "商品单价（元）"},
                                {prop: "inCount", label: "计划入库"},
                                {prop: "actualInCount", label: "实际入库"},
                                {prop: "totalAmount", label: "入库总价（元）"},
                                {prop: "comments", label: "备注"},
                            ];
                            break;
                        case 3:
                            this.header = [
                                {prop: "actualInTotalCount", label: "入库数量"},
                                {prop: "actualInTotalCount", label: "实际入库"}
                            ];
                            break;
                        case 4:
                            this.header = [
                                {prop: "inCount", label: "退货数量"},
                                {prop: "inCount", label: "计划入库"},
                                {prop: "price", label: "销售单价（元）"},
                                {prop: "actualInCount", label: "实际入库"},
                                {prop: "totalAmount", label: "入库总价（元）"},
                            ];
                            break;
                        case 5:
                            this.header = [
                                {prop: "inCount", label: "退货数量"},
                                {prop: "inCount", label: "计划入库"},
                                {prop: "price", label: "销售单价（元）"},
                                {prop: "actualInCount", label: "实际入库"},
                                {prop: "totalAmount", label: "入库总价（元）"},
                            ];
                            break;
                        case 6:
                            this.header = [
                                {prop: "inCount", label: "换货数量"},
                                {prop: "inCount", label: "计划入库"},
                                {prop: "price", label: "销售单价（元）"},
                                {prop: "actualInCount", label: "实际入库"},
                                {prop: "totalAmount", label: "入库总价（元）"},
                            ];
                            break;
                        case 7:
                            this.header = [
                                {prop: "totalCount", label: "销售数量"},
                                {prop: "inCount", label: "计划入库"},
                                {prop: "price", label: "销售单价（元）"},
                                {prop: "actualInCount", label: "实际入库"},
                                {prop: "totalAmount", label: "入库总价（元）"},
                            ];
                            break;
                        case 8:
                            this.header = [
                                {prop: "actualInCount", label: "撤销出库数量"},
//                                {prop: "inCount", label: "计划入库"},
                                {prop: "price", label: "商品单价（元）"},
                                {prop: "actualInCount", label: "入库数量"},
                                {prop: "totalAmount", label: "入库总价（元）"},
                            ];
                            break;
                    }
                });
            },
            viewPurchaseDetail(purchaseId){
                this.$router.push(`/purchase/ViewPurchaseOrder/${purchaseId}`)
            },
            queryStockInListDetailFunction(param){
                this.queryStockInListDetail(param).then((res) => {
                    for (let i = 0; i < res.length; i++) {
                        let item = res[i];
                        let totalAmount = 0;
                        for (let j = 0; j < item.skuList.length; j++) {
                            let skuItem = item.skuList[j];
                            skuItem.price = ((Number(skuItem.price)) / 100).toFixed(2);
                            let total = skuItem.price * Number(skuItem.actualInCount);
                            skuItem.totalAmount = total.toFixed(2);
                            totalAmount += total;
                        }
                        res[i].totalAmount = totalAmount.toFixed(2);
                    }
                    res.length > 0 ? this.stockPerInInStatus = res[0].inStatus : '';
                    this.stockInListDetail = res;

                })
            },
            showSnModal(stockPerInId){
                this.querySnListFunction({stockPerInId: stockPerInId});
            },
            querySnListFunction(param){
                this.querySnList(param).then((res) => {
                    if (res && res.length > 0) {
                        for (let i = 0; i < res.length; i++) {
                            if (res[i] !== null && res[i] !== "") {
                                this.snList.push(res[i])
                            }
                        }
                        let now = moment().format('YYYY-MM-DD');
                        this.excelName = `${param.stockPerInId} ${now}`
                    }
                })
            },
            cancelStockInFunction(){
                this.cancelStockIn({stockPerInId: this.stockPerInId}).then((res) => {
                    this.$message({
                        type: 'success',
                        message: '取消成功!'
                    });
                    this.isCancelStockInDialogVisible = false;
                    this.queryData();
                    this.queryStockInListDetailFunction({stockPerInId: this.stockPerInId});
                }).catch((err)=>{
                    this.$message({
                        type: 'error',
                        message: '取消入库失败，请稍后再试!'
                    });
                    this.isCancelStockInDialogVisible = false;
                });
            },
            getActualInCount(row){
                if (this.viewStockDetail.type === 2 && this.stockPerInInStatus === 3) {
                    return row.inCount
                }
                if (this.viewStockDetail.type === 2 && this.stockPerInInStatus !== 3) {
                    return "--"
                }
                if (this.viewStockDetail.type === 1 && this.stockPerInInStatus !== 3) {
                    return "--"
                } else {
                    return row.actualInCount
                }
            }
        }
    }
</script>

<style lang="scss">
    .view-storage {
        height: 100%;
        padding: 20px 20px 0 20px;
        .viewLeftTop {
            div:nth-child(2) {
                padding-top: 16px;
            }
            div {
                overflow: hidden;
            }
        }
        .DetailsRightBox {
            width: 21.95%;
        }
        .stockPerInList {
            .stockPerInItem {
                padding-bottom: 20px;
                .stockIn-item-container {
                    line-height: 40px;
                    font-size: 12px;
                    color: #333333;
                    label {
                        display: inline-block;
                        width: 25%;
                        span:nth-child(1) {
                            display: inline-block;
                            width: 72px;
                            font-size: 12px;
                            color: #666666
                        }
                        span:nth-child(2) {
                            color: #333333;
                            font-size: 12px;
                        }
                    }
                }
                .view-sn {
                    float: right;
                    cursor: pointer;
                    i {
                        margin-right: 6px;
                    }
                    font-size: 13px;
                    color: #3B8CFF;
                }
            }

        }
        .snListContainer {
            width: 100%;
            max-height: 200px;
            overflow-y: auto;
            span {
                display: inline-block;
                width: auto;
                padding: 0px 15px;
                font-size: 12px;
                line-height: 44px;
                color: #666666;
            }
        }
        .cancel-button {
            color: #3B8CFF;
            border: 1px solid #BFD9FE;
            padding: 10px 0px;
            font-size: 14px;
            width: 90px;
        }
        .el-table {
            border: 1px solid #eceef5;
            border-bottom: none;
        }
        .el-table thead tr th:nth-child(1) {
            border-left: none;
        }
        .el-table__empty-block {
            border-bottom: 1px solid #eceef5;
        }
        .el-dialog__body{
            padding-bottom: 30px;
        }
    }
</style>
