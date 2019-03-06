<template>
    <el-row class="viewPurchase detailsBigBox">
        <!-- 左边信息 -->
        <el-row  class="viewPurchaseLeft DetailsLeftBox">
            <div class="viewLeftTop">
                <el-row >
                        <h4 class="order">促销单号：{{ presentPromotionForm.promotionNo}}</h4>
                        <h4 class="status goodsStatus">单据状态：<span v-if="presentPromotionForm.status == 0">已保存</span><span v-if="presentPromotionForm.status == 1">已记账</span>
                        </h4>
                        <h4 class="status">审批状态：<span v-if="presentPromotionForm.approveStatus == 0">草稿</span><span v-if="presentPromotionForm.approveStatus == 1">审批通过</span></h4>
                </el-row>
                <el-row v-if="presentPromotionForm.approveStatus == 0">
                      <el-button type="primary" size="small"  @click="editPurchaseOrder()" style="margin-top:10px;">编辑</el-button>  
                </el-row>
            </div>
            <!-- <el-row> -->
            <div style="padding: 20px 20px 0;">

                <el-tabs v-model="tabName" type="border-card">
                    <el-tab-pane label="赠劵信息" name="first">
                        <el-table :data="presentPromotionForm.couponList">
                            <el-table-column label="满足金额"  prop="needTotal">
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.needTotal">
                                        {{scope.row.needTotal ? scope.row.needTotal : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="赠卷金额" prop="descTotal" >
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.descTotal">
                                        {{scope.row.descTotal ? scope.row.descTotal : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="有效期开始时间" prop="beginTime">
                                <template slot-scope="scope" >
                                    <div class="row-show" :title="scope.row.beginTime">
                                        {{scope.row.beginTime ? scope.row.beginTime : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="有效期结束时间" prop="endTime">
                                <template slot-scope="scope" >
                                            <div class="row-show" :title="scope.row.endTime">
                                        {{scope.row.endTime ? scope.row.endTime : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="使用范围" name="second" v-if="!presentPromotionForm.isCtrlUseArea">
                        <el-table :data="presentPromotionForm.skuList">
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
            <el-form :modle="presentPromotionForm" label-position="left" class="TotalBasic">
              <el-form-item label="创建人：">
                  <span>{{presentPromotionForm.createUsername ? presentPromotionForm.createUsername : '--'}}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                  <span>{{presentPromotionForm.createTime ? presentPromotionForm.createTime : '--'}}</span>
              </el-form-item>
              <el-form-item label="记账人：">
                  <span>{{presentPromotionForm.accountUsername ? presentPromotionForm.accountUsername : '--'}}</span>
              </el-form-item>
              <!--<el-form-item label="记账时间：">
                   没有找到对应字段 
                  <span>{{presentPromotionForm.none ? presentPromotionForm.none : '--'}}</span>
              </el-form-item>-->
              <el-form-item label="开始时间：">
                  <span>{{presentPromotionForm.beginTime ? presentPromotionForm.beginTime : '--'}}</span>
              </el-form-item>
              <el-form-item label="结束时间：">
                  <span>{{presentPromotionForm.endTime ? presentPromotionForm.endTime : '--'}}</span>
              </el-form-item>
              <el-form-item label="促销标题：">
                  <span>{{presentPromotionForm.promotionTitle ? presentPromotionForm.promotionTitle : '--'}}</span>
              </el-form-item>
              <el-form-item label="控制赠劵使用范围">
                  <span  v-if="presentPromotionForm.isCtrlUseArea ==0">否</span>
                  <span  v-if="presentPromotionForm.isCtrlUseArea ==1">是</span>
              </el-form-item>
              <el-form-item label="促销详情描述：">
                  <span>{{presentPromotionForm.descriptions ? presentPromotionForm.descriptions : '--'}}</span>
              </el-form-item>
              <el-form-item label="业务实体：">
                  <span>{{presentPromotionForm.groupName ? presentPromotionForm.groupName : '--'}}</span>
              </el-form-item>
              <el-form-item label="备注：">
                  <span style="word-wrap:break-word">{{presentPromotionForm.remark ? presentPromotionForm.remark : '--'}}</span>
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
        name: 'presentPromotionDetails',
        mixins: [platform,QuitMixins],
        components: {},
        data() {
            return {
                tabName: 'first',
                // 需要提交的表单数据
                presentPromotionForm: {
                    id: null,
                    promotionNo: "",
                    promotionTitle: "",
                    isCtrlUseArea: null,
                    promotionType: "",
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
                        skuName: ""
                    }
                    ],
                    couponList: [
                    {
                        id: null,
                        promotionNo: "",
                        needTotal: null,
                        descTotal: null,
                        beginTime: "",
                        endTime: ""
                    }
                    ]
                },
            }
        },
        mounted(){
            this.refreshPage();
        },
        activated() {
           this.refreshPage();
        },
        methods: {
            ...mapActions(["presentPromotionInfo","showPageLoading", "hidePageLoading"]),
            refreshPage(){
                let datas = {
                    id: this.$route.params.id
                }
              this.presentPromotionInfo(datas).then((res) =>{
                this.presentPromotionForm = res
                this.presentPromotionForm.couponList.forEach(item => {
                    item.needTotal = item.needTotal / 100
                    item.descTotal = item.descTotal / 100
                })
              })
            },
            editPurchaseOrder() {
                this.$router.push({path: `/sales/promotion/presentPromotionEdit/${this.$route.params.id}`})
            },
            // 返回
            goBack() {
                this.$message({
                    type: 'success',
                    message: `操作成功`
                })
              this.quit(routesMapping.presentPromotion,true)
            }
        },
        watch: {
            'presentPromotionForm.isCtrlUseArea': function () {
                if( this.presentPromotionForm.isCtrlUseArea == false ) {
                    this.tabName = "first"
                }
            }
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
