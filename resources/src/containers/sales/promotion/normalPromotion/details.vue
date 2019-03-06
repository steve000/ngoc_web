<template>
    <el-row class="viewPurchase detailsBigBox">
        <!-- 左边信息 -->
        <el-row  class="viewPurchaseLeft DetailsLeftBox">
            <div class="viewLeftTop">
                <el-row >
                        <h4 class="order">促销单号：{{ normalPromotionForm.promotionNo}}</h4>
                        <h4 class="status goodsStatus">单据状态：<span v-if="normalPromotionForm.status == 0">已保存</span><span v-if="normalPromotionForm.status == 1">已记账</span></h4>
                        <h4 class="status">审批状态：<span v-if="normalPromotionForm.approveStatus == 0">草稿</span><span v-if="normalPromotionForm.approveStatus == 1">审批通过</span></h4>
                </el-row>
                <el-row v-if="normalPromotionForm.approveStatus == 0">
                      <el-button type="primary" size="small"  @click="editPurchaseOrder()" style="margin-top:10px;">编辑</el-button>  
                </el-row>
            </div>
            <!-- <el-row> -->
            <div style="padding: 20px 20px 0;">
              <el-table :data="normalPromotionForm.skuList">
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
                  <el-table-column label="数量" prop="descCount" width="50">
                      <template slot-scope="scope" >
                          <div class="row-show" :title="scope.row.descCount">
                              <!-- {{scope.row.descCount ? scope.row.descCount : '--'}} -->
                              {{scope.row.descCount}}

                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column label="优惠类型" prop="descType" width="80">
                      <template slot-scope="scope" >
                          <div class="row-show" v-if="scope.row.descType ==0" title="按优惠价">
                              按优惠价
                          </div>
                          <div class="row-show" v-if="scope.row.descType ==1" title="按优惠折扣">
                              按优惠折扣
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column label="价格" prop="descPrice" min-width="120">
                      <template slot-scope="scope" >
                          <div class="row-show" :title="scope.row.descPrice">
                              <!-- {{scope.row.descPrice ? scope.row.descPrice : '--'}} -->
                              {{scope.row.descPrice}}
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column label="折扣" prop="descRate" min-width="100">
                      <template slot-scope="scope" >
                          <div class="row-show" :title="scope.row.descRate">
                              <!-- {{scope.row.descRate ? scope.row.descRate : '--'}} -->
                              {{scope.row.descRate}}
                          </div>
                      </template>
                  </el-table-column>
              </el-table>
              <div class="orderBox">
                <el-button type="primary" size="small"  @click="goBack()">返回</el-button>  
              </div>
            </div>
            <!-- </el-row> -->
        </el-row>
        <!--右边基本信息-->
        <el-row class="viewPurchaseRight DetailsRightBox" >
            <h3>基本信息</h3>
            <el-form :modle="normalPromotionForm" label-position="left" class="TotalBasic">
              <el-form-item label="创建人：">
                  <span>{{normalPromotionForm.createUsername ? normalPromotionForm.createUsername : '--'}}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                  <span>{{normalPromotionForm.createTime ? normalPromotionForm.createTime : '--'}}</span>
              </el-form-item>
              <el-form-item label="记账人：">
                  <span>{{normalPromotionForm.accountUsername ? normalPromotionForm.accountUsername : '--'}}</span>
              </el-form-item>
              <el-form-item label="记账时间：">
                  <span>{{normalPromotionForm.accountTime ? normalPromotionForm.accountTime : '--'}}</span>
              </el-form-item>
              <el-form-item label="开始时间：">
                  <span>{{normalPromotionForm.beginTime ? normalPromotionForm.beginTime : '--'}}</span>
              </el-form-item>
              <el-form-item label="结束时间：">
                  <span>{{normalPromotionForm.endTime ? normalPromotionForm.endTime : '--'}}</span>
              </el-form-item>
              <el-form-item label="促销标题：">
                  <span>{{normalPromotionForm.promotionTitle ? normalPromotionForm.promotionTitle : '--'}}</span>
              </el-form-item>
              <el-form-item label="促销类型：">
                  <span  v-if="normalPromotionForm.promotionType ==0">限时促销</span>
                  <span  v-if="normalPromotionForm.promotionType ==1">批量促销</span>
                  <span  v-if="normalPromotionForm.promotionType ==2">偶数促销</span>
              </el-form-item>
              <el-form-item label="促销详情描述：">
                  <span>{{normalPromotionForm.descriptions ? normalPromotionForm.descriptions : '--'}}</span>
              </el-form-item>
              <el-form-item label="业务实体：">
                  <span>{{normalPromotionForm.groupName ? normalPromotionForm.groupName : '--'}}</span>
              </el-form-item>
              <el-form-item label="备注：">
                  <span style="word-wrap:break-word">{{normalPromotionForm.remark ? normalPromotionForm.remark : '--'}}</span>
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
        name: 'ViewPurchaseOrder',
        mixins: [platform,QuitMixins],
        components: {},
        data() {
            return {
                // 需要提交的表单数据
                normalPromotionForm: {
                  accountTime: '',
                  id: 0,
                  promotionNo: '',
                  createUsername: '',
                  createTime: '',
                  accountUsername: '',
                  approveUsername: '',
                  approveStatus: 0,
                  status: 0,
                  promotionTitle: '',
                  promotionType: '',
                  beginTime: '',
                  endTime: '',
                  userGroupId: '',
                  groupName: '',
                  descriptions: '',
                  remark: '',
                  skuList: [
                    {
                      id: 0,
                      promotionNo: '',
                      skuId: 0,
                      skuName: '',
                      descType: 0,
                      descPrice: 0,
                      descRate: 0,
                      descCount: 0
                    }
                  ]
                },
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
            ...mapActions(["normalPromotionInfo","showPageLoading", "hidePageLoading"]),
            refreshPage(){
                let datas = {
                    id: this.$route.params.id
                }
              this.normalPromotionInfo(datas).then((res) =>{
                this.normalPromotionForm = res
                this.checkProductList = res.skuList
                this.checkProductList.forEach(item => {
                    item.descPrice = item.descPrice / 100

                })
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
            // editPurchaseOrder(){
            //     this.shiftPage(routesMapping.EditPurchase,`/purchase/EditPurchase/${this.purchaseId}`)
            // },
            editPurchaseOrder() {
                this.$router.push({path: `/sales/promotion/normalPromotionEdit/${this.$route.params.id}`})
            },
            handleClick(tab, event) {},
            // 返回
            goBack() {
                this.$message({
                    type: 'success',
                    message: `操作成功`
                })
              this.quit(routesMapping.normalPromotion,true)
            }
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
