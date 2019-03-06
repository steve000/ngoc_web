<template>
    <div class="view-storage">
        <div class="DetailsLeftBox detailsBigBox">
            <div class="viewLeftTop">
                <el-row>
                    <el-col :span="8">
                        <h4 class="order">
                            <span>单号：</span>
                            <span >{{billDetail.purchaseId}}</span>
                        </h4>
                    </el-col>
                    <el-col :span="8">
                        <h4 class="order">
                            <span>单据状态：</span>
                            <span>{{billDetail.status==1?'待收货':'入库收货'}}</span>
                        </h4>
                    </el-col>
                    <el-col :span="8">
                        <h4 class="order">
                            <span>审批状态：</span>
                            <span>{{billDetail.approveStatus==0?'草稿':'审核通过'}}</span>
                        </h4>
                    </el-col>
                    <el-col :span="24" v-show="billDetail.approveStatus==0">
                        <el-button type="text" class="mr15"
                                    @click="$router.push({ name:'purchaseOrderEdit', params: {seqNo: billDetail.seqNo}})">编辑
                        </el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="tab-container">
                <el-tabs v-model="activeTabName" type="card">
                    <el-tab-pane label="商品清单" name="first">
                        <div class="stockPerInList">
                                <el-table :data="productList">
                                    <el-table-column label="商品名称" prop="skuName" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.skuName">{{scope.row.skuName}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="sku编码" prop="skuId" min-width="110">
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
                                    <el-table-column label="采购单价（元）" prop="purchasePrice" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.purchasePrice">
                                                {{scope.row.purchasePrice!==null ? scope.row.purchasePrice:0}}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="采购数量" prop="purchaseCount" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.purchaseCount">{{scope.row.purchaseCount}}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="总价（元）" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show">{{(scope.row.purchasePrice*scope.row.purchaseCount)?(scope.row.purchasePrice*scope.row.purchaseCount):'--'}}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="备注" prop="comments" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.comments">
                                                {{scope.row.comments !== "" && scope.row.comments !== null ? scope.row.comments : '无'}}
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="DetailsRightBox">
            <h3>基本信息</h3>
            <el-form :modle="billDetail" label-position="left" class="TotalBasic">
                <!-- <el-form-item label="订单类型：">
                    <span>{{billDetail.billType ? billDetail.billType : '--'}}</span>
                </el-form-item> -->
                <el-form-item label="实体：">
                    <span>{{userEntity ? userEntity : '--'}}</span>
                </el-form-item>
                <el-form-item label="供应商名称：">
                    <span>{{billDetail.vendorName ? billDetail.vendorName : '--'}}</span>
                </el-form-item>
                <el-form-item label="合同编号：">
                    <span>{{billDetail.contractNo ? billDetail.contractNo : '--'}}</span>
                </el-form-item>
                <el-form-item label="计划到货时间：">
                    <span>{{billDetail.planArrivalTime ? (billDetail.planArrivalTime).split(' ')[0] : '--'}}</span>
                </el-form-item>
                <!-- <el-form-item label="收货仓信息："> -->
                    <!-- <span>{{billDetail.linkMsg.linkman ? billDetail.linkMsg.linkman : '--'}}</span> -->
                    <!-- <span>{{billDetail.linkMsg.phone ? billDetail.linkMsg.phone : '--'}}</span> -->
                    <!-- <span>{{billDetail.linkMsg.address ? billDetail.linkMsg.address : '--'}}</span> -->
                <!-- </el-form-item> -->
                <el-form-item label="操作人：">
                    <span>{{billDetail.operateUsername ? billDetail.operateUsername : '--'}}</span>
                </el-form-item>
                <el-form-item label="更新时间：">
                    <span>{{billDetail.updateTime ? billDetail.updateTime : '--'}}</span>
                </el-form-item>
                <el-form-item label="审批人：">
                    <span>{{billDetail.approveUserName ? billDetail.approveUserName : '--'}}</span>
                </el-form-item>
                <el-form-item label="审批时间：">
                    <span>{{billDetail.approveTime ? billDetail.approveTime : '--'}}</span>
                </el-form-item>
                <el-form-item label="创建时间：">
                    <span>{{billDetail.createTime ? billDetail.createTime : '--'}}</span>
                </el-form-item>
                <el-form-item label="备注：">
                    <span>{{billDetail.comments ? billDetail.comments : '--'}}</span>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import PlatformMixins from '~/mixins/platform'
    import utils from '~/utils/misc';
    import Modal from '~/components/common/Modal';
    import DownloadExcel from '~/components/common/DownloadExcel.vue';
    import moment from 'moment';
    import QuitMixins from '~/mixins/quit'

    export default {
        name: 'purchaseOrderInfo',
        data () {
            return {
                id: 0,  //接收id
                userEntity: "",
                seqNo: 0,
                billDetail: {}, //详情
                productList: [],  //商品清单
                info:{},
                supplier: "",
                stockNameList: [],
                activeTabName: 'first',
                header: [],
                isSnDialogVisible: false,
                isCancelStockInDialogVisible: false,
                snList: [],
                excelName: '',
                totalAmount: 0
            }
        },
        mixins: [PlatformMixins, QuitMixins],
        components: {
            Modal, DownloadExcel
        },
        mounted(){
            console.log(this.$route.params)
            this.seqNo = this.$route.params.seqNo;
            this.userEntity = sessionStorage.getItem("entityName");
            this.queryData()
        },
        methods: {
            ...mapActions(["showPageLoading", "hidePageLoading", 'purchaseOrderQuery']),
            getRadioValue(value){
            },
            queryData(){
                this.showPageLoading();
                this.purchaseOrderQueryFunction({seqNo: this.seqNo});
            },
            formatMomentData(date){
                return utils.formatMomentData(date)
            },
            purchaseOrderQueryFunction(param){
                this.purchaseOrderQuery(param).then((resp) => {
                    this.hidePageLoading();
                    console.log(resp,"3214214123412312312");
                    this.billDetail = resp;
                    resp.productList.forEach(function (i, k) {
                        i.purchasePrice = i.purchasePrice / 100
                        return i
                    });
                    this.productList = resp.productList;
                    this.info = resp.linkMsg;
                    console.log(this.billDetail,"详情");
                    console.log(this.productList,"详情商品列表");
                });
            }
        }
    }
</script>

<style lang="scss">
    .view-storage {
        height: 100%;
        padding: 20px 20px 0 20px;
        .viewLeftTop {
            div:nth-child(1) {
                padding-bottom: 16px;
            }
            div:nth-child(2) {
                padding-bottom: 16px;
            }
            div {
                overflow: hidden;
            }
        }
        .sku-list {
            .view-sn-type {
                padding: 0px 0px 20px;
                text-align: right;
                cursor: pointer;
                i {
                    margin-right: 6px;
                }
                font-size: 13px;
                color: #3B8CFF;
            }
        }
        .orderContainer {
            background-color: #FBFBFB;
            padding: 0px 20px;
            border: 1px solid #F1F1F1;
            height: 50px;
            line-height: 50px;
            margin: 20px 0px;
            .orderCount {
                text-align: right;
                span {
                    color: red;
                    font-size: 18px;
                }
            }
        }
        .stockPerInList {
            .stockPerInItem {
                padding-bottom: 20px;
                /*border-bottom: 1px solid #EDEFF6;;*/
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
            overflow-y: scroll;
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
        .cancel-stockIn {
            height: auto;
            font-size: 14px;
            color: #666666;
            line-height: 25px;
            i {
                font-size: 24px;
                color: #E6A23B;
                vertical-align: middle;
            }
            span {
                display: inline-block;
                background: #F9F2F4;
                border-radius: 2px;
                height: 20px;
                padding: 0px 10px;
                color: #C8284F;
            }
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
    }
</style>
