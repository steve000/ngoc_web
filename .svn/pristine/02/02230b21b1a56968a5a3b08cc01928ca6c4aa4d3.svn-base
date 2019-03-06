<template>
    <el-row class="viewPurchase detailsBigBox">
        <!-- 左边信息 -->
        <el-row  class="viewPurchaseLeft DetailsLeftBox">
            <div class="viewLeftTop">
                <el-row >
                        <h4 class="order">促销单号：{{ conGroupPromotionForm.promotionNo}}</h4>
                        <h4 class="status goodsStatus">单据状态：<span v-if="conGroupPromotionForm.status == 0">已保存</span><span v-if="conGroupPromotionForm.status == 1">已记账</span></h4>
                        <h4 class="status">审批状态：<span v-if="conGroupPromotionForm.approveStatus == 0">草稿</span><span v-if="conGroupPromotionForm.approveStatus == 1">审批通过</span></h4>
                </el-row>
                <el-row >
                      <el-button type="primary" size="small"  @click="editPurchaseOrder()" style="margin-top:10px;">编辑</el-button>  
                </el-row>
            </div>
            <!-- <el-row> -->
            <div style="padding: 20px 20px 0;">

                <el-tabs v-model="tabName" type="border-card">
                    <el-tab-pane label="促销条件" name="first">
                        <el-table :data="conGroupPromotionForm.skuList">
                            <el-table-column label="商品名称"  prop="skuName">
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.skuName">
                                        {{scope.row.skuName ? scope.row.skuName : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="SKU编码" prop="skuId" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.skuId">
                                        {{scope.row.skuId ? scope.row.skuId : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="数量" prop="buyCount">
                                <template slot-scope="scope" >
                                    <div class="row-show" :title="scope.row.buyCount">
                                        {{scope.row.buyCount ? scope.row.buyCount : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="金额" prop="buyTotal">
                                <template slot-scope="scope" >
                                            <div class="row-show" :title="scope.row.buyTotal">
                                        {{scope.row.buyTotal ? scope.row.buyTotal : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="促销结果" name="second" v-if="!conGroupPromotionForm.isBillPro"> -->
                    <el-tab-pane label="促销结果" name="second">
                        <el-table :data="conGroupPromotionForm.resultList">
                            <el-table-column label="商品名称"  prop="skuName">
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.skuName">
                                        {{scope.row.skuName ? scope.row.skuName : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="SKU编码" prop="skuId" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.skuId">
                                        {{scope.row.skuId ? scope.row.skuId : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="优惠类型" prop="descType" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.descType" v-if="scope.row.descType == 0">
                                        按优惠价
                                    </div>
                                    <div class="row-show" :title="scope.row.descType" v-if="scope.row.descType == 1">
                                        按优惠率
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="价格" prop="descPrice" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.descPrice">
                                        {{scope.row.descPrice ? scope.row.descPrice : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="折扣" prop="descRate" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.descRate">
                                        {{scope.row.descRate ? scope.row.descRate : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            
                        </el-table>
                    </el-tab-pane>
                </el-tabs>

              <div class="orderBox">
                <el-button type="primary" size="small"  @click="goBack()">返回</el-button>  
              </div>
            </div>
            <!-- </el-row> -->
        </el-row>
        <!--右边基本信息-->
        <el-row class="viewPurchaseRight DetailsRightBox" >
            <h3>基本信息</h3>
            <el-form :modle="conGroupPromotionForm" label-position="left" class="TotalBasic">
              <el-form-item label="创建人：">
                  <span>{{conGroupPromotionForm.createUsername ? conGroupPromotionForm.createUsername : '--'}}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                  <span>{{conGroupPromotionForm.createTime ? conGroupPromotionForm.createTime : '--'}}</span>
              </el-form-item>
              <el-form-item label="记账人：">
                  <span>{{conGroupPromotionForm.accountUsername ? conGroupPromotionForm.accountUsername : '--'}}</span>
              </el-form-item>
              <el-form-item label="开始时间：">
                  <span>{{conGroupPromotionForm.beginTime ? conGroupPromotionForm.beginTime : '--'}}</span>
              </el-form-item>
              <el-form-item label="结束时间：">
                  <span>{{conGroupPromotionForm.endTime ? conGroupPromotionForm.endTime : '--'}}</span>
              </el-form-item>
              <el-form-item label="促销标题：">
                  <span>{{conGroupPromotionForm.promotionTitle ? conGroupPromotionForm.promotionTitle : '--'}}</span>
              </el-form-item>
              <el-form-item label="条件类型">
                  <span  v-if="conGroupPromotionForm.promotionType ==0">按数量</span>
                  <span  v-if="conGroupPromotionForm.promotionType ==1">按金额</span>
              </el-form-item>
              <!-- API没见到这个字段 -->
              <!-- <el-form-item label="整单满减">
                  <span  v-if="conGroupPromotionForm.promotionType ==0">否</span>
                  <span  v-if="conGroupPromotionForm.promotionType ==1">是</span>
              </el-form-item> -->
              <el-form-item label="促销详情描述：">
                  <span>{{conGroupPromotionForm.descriptions ? conGroupPromotionForm.descriptions : '--'}}</span>
              </el-form-item>
              <el-form-item label="业务实体：">
                  <span>{{conGroupPromotionForm.groupName ? conGroupPromotionForm.groupName : '--'}}</span>
              </el-form-item>
              <el-form-item label="备注：">
                  <span style="word-wrap:break-word">{{conGroupPromotionForm.remark ? conGroupPromotionForm.remark : '--'}}</span>
              </el-form-item>
            </el-form>
        </el-row>
    </el-row>
</template>
<script>
    import {routesMapping} from '~/router'
    import {mapActions, mapState} from 'vuex'
    import platform from '~/mixins/platform';
    import QuitMixins from '~/mixins/quit';
    import Modal from '~/components/common/Modal.vue';
    import PurchasePutStorageRecord from '~/components/purchase/PurchasePutStorageRecord.vue'
    import PurchaseOperationLog from '~/components/purchase/PurchaseOperationLog.vue'
    export default {
        name: 'conGroupPromotionDetails',
        mixins: [platform,QuitMixins],
        components: {},
        data() {
            return {
                tabName: 'first',
                // 需要提交的表单数据
                conGroupPromotionForm: {
                    id: null,
                    promotionNo: "",
                    promotionTitle: "",
                    isBillPro: null,
                    promotionType: null,
                    beginTime: "",
                    endTime: "",
                    userGroupId: "",
                    groupName: "",
                    createUsername: "",
                    createTime: "",
                    accountUsername: "",
                    approveUsername: "",
                    approveStatus: null,
                    descriptions: "",
                    status: null,
                    remark: "",
                    skuList: [
                        {
                            id: null,
                            promotionNo: "",
                            skuId: null,
                            skuName: "",
                            buyCount: null,
                            buyTotal: null
                        }
                    ],
                    resultList: [
                        {
                            id: null,
                            promotionNo: "",
                            skuId: null,
                            skuName: "",
                            descType: null,
                            descPrice: null,
                            descRate: null
                        }
                    ]
                },
            }
        },
        mounted(){
            this.refreshPage();
        },
        // activated() {
        //    this.refreshPage();
        // },
        methods: {
            ...mapActions(["conGroupPromotionInfo","showPageLoading", "hidePageLoading"]),
            refreshPage(){
                let datas = {
                    id: this.$route.query.id
                }
              this.conGroupPromotionInfo(datas).then((res) =>{
                this.conGroupPromotionForm = res
                this.conGroupPromotionForm.skuList.forEach(item => {
                    item.buyTotal = item.buyTotal / 100
                })
                this.conGroupPromotionForm.resultList.forEach(item => {
                    item.descPrice = item.descPrice / 100
                })
              })
            },
            editPurchaseOrder() {
                this.$router.push({path: `/sales/promotion/conGroupPromotionEdit`, query:{id: this.$route.query.id}})
            },
            // 返回
            goBack() {
                this.$message({
                    type: 'success',
                    message: `操作成功`
                })
              this.quit(routesMapping.conGroupPromotion,true)
            }
        },
        watch: {
            // 'conGroupPromotionForm.isBillPro': function () {
            //     if( this.conGroupPromotionForm.isBillPro == false ) {
            //         this.tabName = "first"
            //     }
            // }
        }
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
