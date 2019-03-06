<template>
    <el-row class="viewPurchase detailsBigBox">
        <!-- 左边信息 -->
        <el-row  class="viewPurchaseLeft DetailsLeftBox">
            <div class="viewLeftTop">
                <el-row >
                    <div>
                        <h4 class="order">采购单号：{{ goodsAllData.purchaseId}}</h4>
                        <h4 class="status goodsStatus">状态：
                            <span v-if="goodsAllData.approveStatus == 1">草稿</span>
                            <span v-if="goodsAllData.approveStatus == 2">审批中</span>
                            <span v-if="goodsAllData.approveStatus == 3">已驳回</span>
                            <span v-if="goodsAllData.approveStatus == 4">已撤销</span>
                            <span v-if="goodsAllData.approveStatus == 5">
                                <i v-if="goodsAllData.status == 1">待收货</i>
                                <i v-if="goodsAllData.status == 2">部分收货</i>
                                <i v-if="goodsAllData.status == 3">已收货</i>
                            </span>
                        </h4>
                        <h4 class="status">需求标题：{{goodsAllData.purchaseTitle}}</h4>
                    </div>
                </el-row>
                <el-row >
                    <div v-if="goodsAllData.approveStatus == 5" class="rukuAndEditBtn">
                        <el-button v-if="goodsAllData.status == 1 || goodsAllData.status == 2" type="primary" size="small"  @click="queryWaitStockInProductFunction()">入库</el-button>
                    </div>
                    <el-tooltip class="item rukuAndEditBtn" effect="light" content="编辑" placement="right"   v-if="goodsAllData.approveStatus == 1 || goodsAllData.approveStatus == 3" @click="editPurchaseOrder()">
                        <span class="editIcon" @click="editPurchaseOrder()"><i class="el-icon-edit"></i></span>
                    </el-tooltip>
                </el-row>
            </div>
            <!-- <el-row> -->
                <el-tabs v-model="activeTabName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="商品清单" name="first">
                        <el-table :data="goodsAllData.skuList.sku">
                            <el-table-column label="商品名称"  prop="skuName">
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.skuName">
                                        {{scope.row.skuName ? scope.row.skuName : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="sku编码" prop="skuId" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.skuId">
                                        {{scope.row.skuId ? scope.row.skuId : '--'}}

                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="单位" prop="unitName" width="50">
                                <template slot-scope="scope" >
                                    <div class="row-show" :title="scope.row.unitName">
                                        {{scope.row.unitName ? scope.row.unitName : '--'}}

                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="定价方式" prop="unitName" width="80">
                                <template slot-scope="scope" >
                                    <div class="row-show" v-if="scope.row.priceType ==1" title="固定价">
                                        固定价
                                    </div>
                                    <div class="row-show" v-if="scope.row.priceType ==2" title="自由价">
                                        自由价
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="含税采购单价(元)" prop="unitName" min-width="120">
                                <template slot-scope="scope" >
                                    <div class="row-show" :title="scope.row.purchasePrice">
                                        {{scope.row.purchasePrice ? scope.row.purchasePrice : '--'}}

                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="含税总额（元）" prop="unitName" min-width="100">
                                <template slot-scope="scope" >
                                    <div class="row-show" :title="scope.row.purchasePrice * scope.row.purchaseCount">
                                        {{scope.row.purchasePrice * scope.row.purchaseCount}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="税率" min-width="50">
                                <template slot-scope="scope" >
                                    <div class="row-show" :title="scope.row.taxRate">
                                        {{scope.row.taxRate}}%
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="不含税采购单价（元）" min-width="130" >
                                <template slot-scope="scope" >
                                    <div class="row-show" :title="(scope.row.purchasePrice/(1+(scope.row.taxRate)*0.01)).toFixed(2)">
                                        {{(scope.row.purchasePrice/(1+(scope.row.taxRate)*0.01)).toFixed(2)}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="不含税总额（元）" prop="purchaseCount" min-width="110">
                                <template slot-scope="scope">
                                    <div class="row-show" :title="(scope.row.purchaseCount * (scope.row.purchasePrice/(1+(scope.row.taxRate)*0.01)).toFixed(2)).toFixed(2)">
                                        {{(scope.row.purchaseCount * (scope.row.purchasePrice/(1+(scope.row.taxRate)*0.01)).toFixed(2)).toFixed(2)}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="采购数量" prop="purchaseCount" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.purchaseCount">
                                        {{scope.row.purchaseCount ? scope.row.purchaseCount : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="备注" prop="comment" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.comment">
                                        {{scope.row.comment ? scope.row.comment : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="orderBox">
                            <div class="orderContainer">
                                <div class="orderCount">
                                    <p style="display: inline-block"> 订单合计含税金额 : </p>
                                    <span>￥{{Number(taxToTal).toFixed(2)}}</span>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="入库记录" name="second">
                        <purchase-put-storage-record :purchaseId="purchaseId"></purchase-put-storage-record>
                    </el-tab-pane>
                    <el-tab-pane label="审批详情" name="third">
                        <div class="stepDiv" v-if="approveResult" v-for="(item,index) in approveResult">
                            <el-row>
                                <el-col :span="3">
                                    <div class="styleTime">
                                        {{new Date(item.createTime).getHours()}} : {{new Date(item.createTime).getMinutes()}}
                                    </div>
                                    <div>
                                    {{new Date(item.createTime).getFullYear()}} - {{new Date(item.createTime).getMonth()+1}} - {{new Date(item.createTime).getDate()}}
                                </div>
                                </el-col>
                                <el-col :span="10">
                                    <div>操作人 ： {{item.approveUserName}}<span class="styleStepName">{{item.content}}</span></div>
                                    <div>审批意见 : {{item.result}}</div>
                                </el-col>
                            </el-row>
                            <div class="stepVerticalLine" v-if="index+1 !== approveResult.length"></div>
                        </div>
                        <div v-if="approveResult == ''" style="text-align:center;margin-top:10px;color:#666666">暂无数据</div>
                    </el-tab-pane>
                    <el-tab-pane label="操作日志" name="fourth">
                        <purchase-operation-log :purchaseId="purchaseId"></purchase-operation-log>
                    </el-tab-pane>
                </el-tabs>
            <!-- </el-row> -->
        </el-row>
        <!--右边基本信息-->
        <el-row class="viewPurchaseRight DetailsRightBox" >
            <h3>基本信息</h3>
            <el-form :modle="goodsAllData" label-position="left" class="TotalBasic">
                    <el-form-item label="操作人：">
                        <span>{{goodsAllData.operateUserName ? goodsAllData.operateUserName : '--'}}</span>
                    </el-form-item>
                    <el-form-item label="创建时间：">
                        <span>{{goodsAllData.createTime ? goodsAllData.createTime : '--'}}</span>
                    </el-form-item>
                    <el-form-item label="部门：">
                        <span>{{goodsAllData.purchaseDepartment ? goodsAllData.purchaseDepartment : '--'}}</span>
                    </el-form-item>
                    <el-form-item label="供应商：">
                        <span>{{goodsAllData.vendorName ? goodsAllData.vendorName : '--'}}</span>
                    </el-form-item>
                    <!-- 未关联合同显示 -->
                    <div v-if="JSON.stringify(contractInfo) != '{}'">
                        <el-form-item label="合同编号：">
                            <span>{{goodsAllData.contractNo ? goodsAllData.contractNo : '--'}}</span>
                        </el-form-item>
                        <el-form-item label="合同名称：">
                            <span>{{contractInfo.contractName ? contractInfo.contractName : '--'}}</span>
                        </el-form-item>
                        <el-form-item label="合同类型：">
                            <span  v-if="contractInfo.contractType ==1">订单采购</span>
                            <span  v-if="contractInfo.contractType ==2">框架采购</span>
                        </el-form-item>
                        <el-form-item label="合同金额：">
                            <label class="IndexNum"><i>￥</i>
                                <span  v-if="contractInfo.contractCurrencyAmount">{{Number(contractInfo.contractCurrencyAmount)/100}}</span><span v-else>--</span></label>
                        </el-form-item>
                        <el-form-item label="可用金额：">
                            <label class="IndexNum"><i>￥</i> <span >{{Number(contractInfo.contractCurrencyAmount)/100 - Number(contractInfo.contractUsedAmount)/100}}</span></label>
                        </el-form-item>
                    </div>
                    <el-form-item label="计划到货时间：">
                        <span>{{goodsAllData.planArrivalTime ? goodsAllData.planArrivalTime : '--'}}</span>
                    </el-form-item>
                    <el-form-item label="收货信息：">
                        <div style="padding-left: 30%;">
                            <div> {{addressInfo.linkman}}  </div>
                            <div>{{addressInfo.province}}{{addressInfo.city}}{{addressInfo.area}}{{addressInfo.address}} </div>
                            <div> {{addressInfo.phone}} </div>
                        </div>

                    </el-form-item>
                    <el-form-item label="备注：">
                        <span style="word-wrap:break-word">{{goodsAllData.comment ? goodsAllData.comment : '--'}}</span>
                    </el-form-item>
            </el-form>
        </el-row>
        <div class="model-container">
            <confirm-stock-in-modal v-if="isStockInDialogVisible" @save="confirmStockInSuccess" @close="isStockInDialogVisible=false" :row="row">
            </confirm-stock-in-modal>
        </div>
    </el-row>
</template>
<script>
    import {routesMapping} from '~/router'
    import {mapActions, mapState} from 'vuex'
    import platform from '~/mixins/platform';
    import QuitMixins from '~/mixins/quit';
    import Modal from '~/components/common/Modal.vue';
    import ConfirmStockInModal from '~/components/common/ConfirmStockInModal.vue'
    import PurchasePutStorageRecord from '~/components/purchase/PurchasePutStorageRecord.vue'
    import PurchaseOperationLog from '~/components/purchase/PurchaseOperationLog.vue'
    export default {
        name: 'ViewPurchaseOrder',
        mixins: [platform,QuitMixins],
        components: { Modal,ConfirmStockInModal,PurchasePutStorageRecord,PurchaseOperationLog},
        data() {
            return {
                activeTabName: 'first',
                purchaseId:'',
                isStockInDialogVisible:false,
                InStoreRecord:[],
                goodsAllData:{skuList:[]},
                addressInfo:{},
                contractInfo:{},
                taxToTal:0,
                approveResult:[],
                row:{
                    vendorSeqNo:'',
                    purchaseId:''
                },
            }
        },
        mounted(){
            this.refreshPage();
        },
        watch: {
            $route(to, from) {
                // if(from.name === 'ViewPurchaseOrder'){
                //     this.refreshPage();
                // }
            }
        },
        activated() {
           this.refreshPage();
        },
        methods: {
            ...mapActions(["queryPurchaseDetails","showPageLoading", "hidePageLoading","queryPurchaseApproveLog"]),
            refreshPage(){
                this.purchaseId = this.$route.params.purchaseId;//仓库id
                let params = {purchaseId:this.purchaseId,isPage:false}
                //获取采购的基本详情
                this.showPageLoading()
                this.queryPurchaseDetails(params).then((resp)=>{
                    this.hidePageLoading()
                    this.taxToTal = 0;
                    this.goodsAllData = resp;
                    this.row.vendorNumber = resp.vendorSeqNo
                    this.contractInfo = {...resp.contractInfo};
                    this.addressInfo = resp.addressInfo;
                    this.goodsAllData.skuList.sku.forEach(item => {
                        item.purchasePrice = Number(item.purchasePrice)/100;
                        this.taxToTal += item.purchasePrice * item.purchaseCount
                    })
                })
                //获取审批的数据
                this.queryPurchaseApproveLog({purchaseId:this.purchaseId}).then((resp) => {
                    console.log(!resp,"审批详情")
                    this.approveResult = resp;
                })
            },
            //点击入库
            queryWaitStockInProductFunction(){
                this.row.purchaseId = this.purchaseId
                this.isStockInDialogVisible = true;
            },
            //入库成功
            confirmStockInSuccess(){
                this.isStockInDialogVisible=false;
                this.refreshPage();
            },
            //去编辑页面
            editPurchaseOrder(){
                this.shiftPage(routesMapping.EditPurchase,`/purchase/EditPurchase/${this.purchaseId}`)
            },
            handleClick(tab, event) {},
        },
    }
</script>
<style lang='scss'>
    .viewPurchase{
        .stepDiv{
            color:#666666;
            padding:22px 22px 0 22px;
            .el-col.el-col-3{
                div{
                    text-align:center;
                }
            }
            .styleTime, .styleStepName{
                font-size:14px;
                color:#333333;
                line-height:30px;
            }
            .styleStepName{
                margin-left:30px;
            }
            .stepVerticalLine{
                width:1px;
                height:30px;
                background-color:#ECEEF5;
                margin:14px 0 0px 6.2%;
            }
        }
        .orderBox{
            background-color: white;  margin-top:20px;
            .orderContainer{
                background-color: #FBFBFB; padding: 0px 20px; border: 1px solid #F1F1F1; height: 50px;
                line-height: 50px;
                .orderCount{
                    float: right;
                    span{
                        color: red; font-size: 18px;
                    }
                }
            }
        }
        .goodsStatus{
            i{
                font-style:normal;
            }
        }
        table{
            width: 100% !important;
        }
        .el-table {
            font-size: 12px;
            color: #888;
            border: 1px solid #eceef5;
            border-bottom: none;
        }
        .el-table__empty-block {
            border-bottom: 1px solid #eceef5;
        }
        padding:20px 20px 0 20px;
        .editDetailsDialogTab{
            margin-top:20px;
        }
        .model-container {
            height: auto;
        }
        .el-form-item__label{
            font-size: 12px;
            line-height: 24px!important;
            color:#666666;
        }
        .el-form-item__content{
            line-height: 24px!important;
            font-size: 12px;
            span{
                color:#333333;
            }
        }
        .el-table th, .el-table tr{
            font-size: 12px;
        }
        .edieOrderDetailsLeft{
            width:77%;
            display:inline-block;
        }
        .edieOrderDetailsRight{
            border:1px solid #ECEEF5;
        }
        .edieOrderDetailsRight{
            width:21%; display:inline-block; margin-left:10px; padding:20px; vertical-align: top; background-color: white;
            h3{
                margin-bottom:10px;font-size:14px;
            }
            .IndexNum{
                i{
                    font-style:normal;
                }
            }
            .el-form-item{
                margin-bottom:5px;
            }
        }
    }
    .page-content{
        background: #e9eef1;
    }
</style>
<style lang='scss' scoped>
    .procurements-config-wrapper{
        overflow:inherit;
    }
</style>
