<template>
    <div class="purchase-contract-view detailsBigBox">
        <div class="DetailsLeftBox">
            <div class="viewLeftTop">
                <el-row >
                    <div>
                        <h4 class="order">合同编号：{{purchaseContractDetails.conNo}}</h4>
                        <!-- <h4 class="status">合同名称：{{purchaseContractDetails.contractName}}</h4> -->
                        <h4 class="status">合同状态：
                            <span v-if="purchaseContractDetails.contractStatus == 1">启用中</span>
                            <span v-if="purchaseContractDetails.contractStatus == 2">未启用</span>
                            <span v-if="purchaseContractDetails.contractStatus == 3">作废</span>
                        </h4>
                    </div>
                </el-row>
                <!-- <el-row>
                    <el-tooltip class="item rukuAndEditBtn" effect="light" content="编辑" placement="right"   v-if="purchaseContractDetails.status == 2" @click="editPurchaseOrder()">
                        <span  class="editIcon" @click="editPurchaseOrder()"><i class="el-icon-edit"></i></span>
                    </el-tooltip>
                </el-row> -->
            </div>
            <el-row>
                <el-tabs v-model="activeTabName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="商品清单" name="first">
                        <el-table :data="checkProductList" border width="100%">
                            <el-table-column label="商品名称" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.skuName" >
                                        {{scope.row.skuName ? scope.row.skuName : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="sku编码" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.skuId">{{scope.row.skuId ? scope.row.skuId : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            
                            <el-table-column label="单位" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.unitName" >
                                    {{scope.row.unitName ? scope.row.unitName : '--'}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column label="定价方式" >
                                <template slot-scope="scope">
                                    <div class="row-show" v-if="scope.row.priceType == 1" >固定价</div>
                                     <div class="row-show" v-if="scope.row.priceType == 2" >自由价</div>
                                     <div class="row-show" v-if="!scope.row.priceType" >--</div>
                                </template>
                            </el-table-column>
                            <el-table-column label="不含税采购单价" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.taxExcludedPrice" >
                                    {{scope.row.taxExcludedPrice ? scope.row.taxExcludedPrice : '--'}}</div>
                                    <!-- <div class="row-show" v-if="scope.row.priceType == 1" >{{Number(scope.row.fixPrice)/100}}</div>
                                    <div class="row-show" v-if="scope.row.priceType == 2" >{{Number(scope.row.minPrice)/100}} ~ {{Number(scope.row.maxPrice)/100}}</div> -->
                                </template>
                            </el-table-column>
                            <el-table-column label="税率" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.taxRate" >
                                        {{scope.row.taxRate ? scope.row.taxRate : '--'}}%
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="含税采购单价" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.taxIncludePrice" >
                                    {{scope.row.taxIncludePrice ? scope.row.taxIncludePrice : '--'}}</div>
                                    <!-- <div class="row-show" v-if="scope.row.priceType == 1" >{{((Number(scope.row.fixPrice)/100)*(1+(scope.row.taxRate)*0.01)).toFixed(2)}}</div> -->
                                    <!-- <div class="row-show" v-if="scope.row.priceType == 2" >{{((Number(scope.row.minPrice)/100)*(1+(scope.row.taxRate)*0.01)).toFixed(2)}} ~ {{((Number(scope.row.maxPrice)/100)*(1+(scope.row.taxRate)*0.01)).toFixed(2)}}</div> -->
                                </template>
                            </el-table-column>
                            <el-table-column label="采购总量" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.purchaseCount" >
                                        {{scope.row.purchaseCount ? scope.row.purchaseCount : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="备注" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.comments" >
                                        {{scope.row.comments ? scope.row.comments : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="btn-section pt20">
                            <el-button size="small"  class="cancel-button" @click="OnBackLatePage">返回</el-button>
                        </div>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="已发生订单" name="seconed">
                        <el-table :data="finshOrder" border >
                            <el-table-column label="采购单编号" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.purchaseId" >
                                        {{scope.row.purchaseId ? scope.row.purchaseId : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="单据状态" >
                                <template slot-scope="scope">
                                    <div class="row-show" v-if="scope.row.status == 1" title="待收货"><span class="RedDot"></span>待收货</div>
                                    <div class="row-show" v-if="scope.row.status == 2" title="部分收货"><span class="RedDot"></span>部分收货</div>
                                    <div class="row-show" v-if="scope.row.status == 3" title="已收货"><span class="RedDot"></span>已收货</div>
                                </template>
                            </el-table-column>
                            <el-table-column label="订单金额" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="Number(scope.row.totalAmount)/100" >{{Number(scope.row.totalAmount)/100}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column label="计划到货时间" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.planArrivalTime" >
                                        {{scope.row.planArrivalTime ? scope.row.planArrivalTime : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作人" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.operateUserName" >
                                        {{scope.row.operateUserName ? scope.row.operateUserName : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="部门" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.purchaseDepartment" >
                                        {{scope.row.purchaseDepartment ? scope.row.purchaseDepartment : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="创建时间" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.createTime">
                                        {{scope.row.createTime ? scope.row.createTime : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="备注" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.comment" >
                                        {{scope.row.comment ? scope.row.comment : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane> -->
                </el-tabs>
            </el-row>
        </div>
        <el-row class="DetailsRightBox" >
            <h3>基本信息</h3>
            <el-form :modle="purchaseContractDetails" label-position="left">
                    <el-form-item label="合同名称：">
                        {{purchaseContractDetails.conName ? purchaseContractDetails.conName : '--'}}
                    </el-form-item>
                    <el-form-item label="合同生效日期：">
                        <span>{{purchaseContractDetails.contractStartTime ? purchaseContractDetails.contractStartTime : '--'}}</span>
                    </el-form-item>
                    <el-form-item label="合同失效日期：">
                        <span>
                            {{purchaseContractDetails.contractEndTime ? purchaseContractDetails.contractEndTime : '--'}}
                        </span>
                    </el-form-item>
                    <el-form-item label="供应商名称 ：">
                        <span>
                            {{purchaseContractDetails.vendorName ? purchaseContractDetails.vendorName : '--'}}
                        </span>
                    </el-form-item>
                    <el-form-item label="结算方式：">
                        <span v-if="purchaseContractDetails.payType == 1">先款后货</span>
                        <span v-if="purchaseContractDetails.payType == 2">货到付款</span>
                    </el-form-item>

                    <el-form-item label="录入人：">
                        {{purchaseContractDetails.createUsername ? purchaseContractDetails.createUsername : '--'}}
                    </el-form-item>

                    <el-form-item label="录入时间：">
                        {{purchaseContractDetails.createTime ? purchaseContractDetails.createTime : '--'}}
                    </el-form-item>

                    <el-form-item label="启用人：">
                        {{purchaseContractDetails.enableUsername ? purchaseContractDetails.enableUsername : '--'}}
                    </el-form-item>

                    <el-form-item label="启用时间：">
                        {{purchaseContractDetails.enableTime ? purchaseContractDetails.enableTime : '--'}}
                    </el-form-item>

                    <el-form-item label="作废人：" v-if="purchaseContractDetails.contractStatus == 3">
                        {{purchaseContractDetails.disenableUsername ? purchaseContractDetails.disenableUsername : '--'}}
                    </el-form-item>

                    <el-form-item label="作废时间：" v-if="purchaseContractDetails.contractStatus == 3">
                        {{purchaseContractDetails.disenableTime ? purchaseContractDetails.disenableTime : '--'}}
                    </el-form-item>
                    <el-form-item label="备注：">
                        <span  style="word-wrap:break-word">{{purchaseContractDetails.remark ? purchaseContractDetails.remark : '--'}}</span>
                    </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex';
    import MessageMixins from '~/mixins/messages';
    import PlatformMixins from '~/mixins/platform';
    import {routesMapping} from '~/router';
    import QuitMixins from '~/mixins/quit'
    export default {
        name: 'PurchaseContractView',
        mixins: [MessageMixins, PlatformMixins,QuitMixins],
        data() {
            return{
                activeTabName:"first",
                checkProductList:[],
                purchaseContractDetails:{},
                orderstatus:{
                    contractType1:"订单采购",
                    contractType2:"框架合同",
                    settlementType1:"先款后货",
                    settlementType2:"先货后款",
                    status1:"启用",
                    status2:"未启用"
                },
                finshOrder:[],
                contractSeqNo:''
            }
        },
        mounted(){
            this.getDetailsList()
        },
        beforeMount(){
            this.contractSeqNo= this.$route.params.contractNo
        },
        activated() {
            this.getDetailsList()
        },
        methods:{
            ...mapActions(["purchaseContractQuery","showPageLoading", "hidePageLoading","ContractSeqPurchaseList"]),
            getDetailsList(){
                this.showPageLoading()
                this.purchaseContractQuery({contractSeqNo:this.$route.params.contractSeqNo}).then((resp)=>{
                    this.hidePageLoading()
                    this.purchaseContractDetails = resp;
                    this.checkProductList = resp.productList;
                })
                // let params2 = {
                //     contractSeqNo:this.contractSeqNo,
                //     isPage:false
                // }
                // this.ContractSeqPurchaseList(params2).then((resp) =>{
                //     this.finshOrder = resp.orderList
                // })
            },
            handleClick(tab, event) {},
            OnBackLatePage(){
                this.quit(routesMapping.ContractManagement,true)
            },
            editPurchaseOrder(){
               //this.$router.push(`/contract/EditPurchaseContract/${this.purchaseContractDetails.contractSeqNo}`)
               this.shiftPage(routesMapping.EditPurchaseContract,`/contract/EditPurchaseContract/${this.purchaseContractDetails.contractSeqNo}`)
            },
        }
    }
 </script>
 <style lang="scss">
    .purchase-contract-view{
        .submitBtn{
            padding: 20px;
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
        .RedDot{
            display:inline-block;
            width:6px;
            height:6px;
            border-radius:50%;
            background:#F66E6E;
            margin-right:6px;
        }

    }
</style>
