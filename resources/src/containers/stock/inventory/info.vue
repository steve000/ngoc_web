<template>
    <el-row class="viewPurchase detailsBigBox">
        <!-- 左边信息 -->
        <el-row  class="viewPurchaseLeft DetailsLeftBox">
            <div class="viewLeftTop">
                <el-row >
                        <h4 class="order">盘点单号：{{ inventoryForm.billNo}}</h4>
                        <h4 class="status goodsStatus">单据状态：<span v-if="inventoryForm.status == 0">正在盘点</span><span v-if="inventoryForm.status == 1">盘点完成</span></h4>
                        <h4 class="status">审批状态：<span v-if="inventoryForm.approveStatus == 0">草稿</span><span v-if="inventoryForm.approveStatus == 1">审批通过</span></h4>
                </el-row>
            </div>
            <!-- <el-row> -->
            <div class="viewLeftTop">
                <el-row >
                        <h4 class="order">商品清单</h4>
                </el-row>
            </div>
            <div style="padding: 20px 20px 0;">
              <el-table :data="inventoryForm.productList">
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
                  <el-table-column label="账面数量" prop="totalCount">
                      <template slot-scope="scope" >
                          <div class="row-show" :title="scope.row.totalCount">
                              {{scope.row.totalCount ? scope.row.totalCount : '--'}}
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column label="实盘数量" prop="actualCount">
                      <template slot-scope="scope" >
                          <div class="row-show" :title="scope.row.actualCount">
                              {{scope.row.actualCount ? scope.row.actualCount : '--'}}
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column label="盈亏数量" prop="adjustCount">
                      <template slot-scope="scope" >
                          <div class="row-show" :title="scope.row.adjustCount">
                              {{scope.row.adjustCount ? scope.row.adjustCount : '--'}}
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column label="类型" prop="resultType">
                      <template slot-scope="scope" >
                          <div class="row-show" :title="scope.row.resultType">
                              <span v-if="scope.row.resultType == 0">正常</span>
                              <span v-if="scope.row.resultType == 1">盘盈</span>
                              <span v-if="scope.row.resultType == 2">盘亏</span>
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column label="备注" prop="comments" min-width="100">
                      <template slot-scope="scope" >
                          <div class="row-show" :title="scope.row.comments">
                              {{scope.row.comments ? scope.row.comments : '--'}}
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
            <el-form :modle="inventoryForm" label-position="left" class="TotalBasic">
              <el-form-item label="仓库名称：">
                  <span>{{inventoryForm.storehouseName ? inventoryForm.storehouseName : '--'}}</span>
              </el-form-item>
              <el-form-item label="操作人：">
                  <span>{{inventoryForm.operateUserName ? inventoryForm.operateUserName : '--'}}</span>
              </el-form-item>
              <el-form-item label="审批人：">
                  <span>{{inventoryForm.approveUser_Name ? inventoryForm.approveUser_Name : '--'}}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                  <span>{{inventoryForm.createTime ? inventoryForm.createTime : '--'}}</span>
              </el-form-item>
              <el-form-item label="编辑时间：">
                  <span>{{inventoryForm.updateTime ? inventoryForm.updateTime : '--'}}</span>
              </el-form-item>
              <el-form-item label="结束时间：">
                  <span>{{inventoryForm.finishTime ? inventoryForm.finishTime : '--'}}</span>
              </el-form-item>
              <el-form-item label="备注：">
                  <span style="word-wrap:break-word">{{inventoryForm.finishTime ? inventoryForm.finishTime : '--'}}</span>
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
        name: 'inventoryInfo',
        mixins: [platform,QuitMixins],
        components: {},
        data() {
            return {
                // 需要提交的表单数据
                inventoryForm: {
                }
            }
        },
        mounted(){
            this.refreshPage();
        },
        activated() {
           this.refreshPage();
        },
        methods: {
            ...mapActions(["inventoryInfo","showPageLoading", "hidePageLoading"]),
            refreshPage(){
                let datas = {
                    id: this.$route.params.id,
                    billNo: this.$route.params.billNo,
                }
              this.inventoryInfo(datas).then((res) =>{
                this.inventoryForm = res
              })
            },

            //去编辑页面
            // editPurchaseOrder(){
            //     this.shiftPage(routesMapping.EditPurchase,`/purchase/EditPurchase/${this.purchaseId}`)
            // },
            editPurchaseOrder() {
                this.$router.push({path: `/sales/promotion/normalPromotionEdit/`, query:{id: this.$route.query.id}})
            },
            // 返回
            goBack() {
                this.$message({
                    type: 'success',
                    message: `操作成功`
                })
              this.quit(routesMapping.inventoryIndex,true)
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
