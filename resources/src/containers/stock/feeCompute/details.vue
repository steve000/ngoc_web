<template>
    <el-row class="viewPurchase detailsBigBox">
        <!-- 左边信息 -->
        <el-row  class="viewPurchaseLeft DetailsLeftBox">
            <div class="viewLeftTop">
                <el-row >
                        <h4 class="order">单号：{{ feeComputeForm.computeNo}}</h4>
                        <h4 class="status goodsStatus">单据状态：<span v-if="feeComputeForm.status == 0">已保存</span><span v-if="feeComputeForm.status == 1">已记账</span></h4>
                        <h4 class="status">审批状态：<span v-if="feeComputeForm.approveStatus == 0">草稿</span><span v-if="feeComputeForm.approveStatus == 1">审批通过</span></h4>
                </el-row>
            </div>
            <!-- <el-row> -->
            <div class="viewLeftTop">
                <el-row >
                        <h4 class="order">费用明细</h4>
                </el-row>
            </div>
            <div style="padding: 20px 20px 0;">
              <el-table :data="feeComputeForm.detailList">
                  <el-table-column label="费用名称"  prop="feeName">
                      <template slot-scope="scope">
                          <div class="row-show" :title="scope.row.feeName">
                              {{scope.row.feeName ? scope.row.feeName : '--'}}
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column label="费用金额" prop="feeTotal" >
                      <template slot-scope="scope">
                          <div class="row-show" :title="scope.row.feeTotal">
                              {{scope.row.feeTotal || scope.row.feeTotal == 0 ? scope.row.feeTotal : '--'}}

                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column label="支付实体" prop="payGroupName">
                      <template slot-scope="scope" >
                          <div class="row-show" :title="feeComputeForm.payGroupName">
                              {{feeComputeForm.payGroupName ? feeComputeForm.payGroupName : '--'}}
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column label="收款实体" prop="recGroupName">
                      <template slot-scope="scope" >
                          <div class="row-show" :title="feeComputeForm.recGroupName">
                              {{feeComputeForm.recGroupName ? feeComputeForm.recGroupName : '--'}}
                          </div>
                      </template>
                  </el-table-column>
              </el-table>
              <div style="text-align:center;height:20px;">费用总额：{{totalCost}}</div>
              <div class="orderBox">
                <el-button type="primary" size="small"  @click="goBack()">返回</el-button>  
              </div>
            </div>
            <!-- </el-row> -->
        </el-row>
        <!--右边基本信息-->
        <el-row class="viewPurchaseRight DetailsRightBox" >
            <h3>基本信息</h3>
            <el-form :modle="feeComputeForm" label-position="left" class="TotalBasic">
              <el-form-item label="创建人：">
                  <span>{{feeComputeForm.createUserName ? feeComputeForm.createUserName : '--'}}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                  <span>{{feeComputeForm.createTime ? feeComputeForm.createTime : '--'}}</span>
              </el-form-item>
              <el-form-item label="记账人：">
                  <span>{{feeComputeForm.accountUserName ? feeComputeForm.accountUserName : '--'}}</span>
              </el-form-item>
              <el-form-item label="记账时间：" v-if="feeComputeForm.accountTimeLong > 0">
                  <span>{{feeComputeForm.accountTime ? feeComputeForm.accountTime : '--'}}</span>
              </el-form-item>
              <el-form-item label="审核人：">
                  <span>{{feeComputeForm.approveUserName ? feeComputeForm.approveUserName : '--'}}</span>
              </el-form-item>
              <el-form-item label="审核时间：" v-if="feeComputeForm.approveTimeLong > 0">
                  <span>{{feeComputeForm.approveTime ? feeComputeForm.approveTime : '--'}}</span>
              </el-form-item>
              <el-form-item label="支付实体：">
                  <span>{{feeComputeForm.payGroupName ? feeComputeForm.payGroupName : '--'}}</span>
              </el-form-item>
              <el-form-item label="收款实体：">
                  <span>{{feeComputeForm.recGroupName ? feeComputeForm.recGroupName : '--'}}</span>
              </el-form-item>
              <el-form-item label="备注：">
                  <span style="word-wrap:break-word">{{feeComputeForm.remark ? feeComputeForm.remark : '--'}}</span>
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
    export default {
        name: 'feeComputeDetails',
        mixins: [platform,QuitMixins],
        components: {},
        data() {
            return {
                // 需要提交的表单数据
                feeComputeForm: {},
                totalCost: ''
            }
        },
        mounted(){
            this.refreshPage();
        },
        activated() {
           this.refreshPage();
        },
        methods: {
            ...mapActions(["stockFeecomputeQuery","showPageLoading", "hidePageLoading"]),
            refreshPage(){
                let datas = {
                    id: this.$route.params.id,
                }
              this.stockFeecomputeQuery(datas).then((res) =>{
                this.feeComputeForm = res
                if (this.feeComputeForm.detailList.length) {
                    let empArr = []
                    this.feeComputeForm.detailList.forEach((item, index) => {
                        empArr.push(item.feeTotal)
                    })
                    this.totalCost = eval(empArr.join('+'))
                } else {
                    this.$message({
                        type: 'warning',
                        message: `获取费用明细失败`
                    })
                }
                
              })
            },

            //去编辑页面
            // editPurchaseOrder(){
            //     this.shiftPage(routesMapping.EditPurchase,`/purchase/EditPurchase/${this.purchaseId}`)
            // },
            editPurchaseOrder() {
                this.$router.push({path: `/sales/promotion/normalPromotionEdit/${this.$route.params.id}`})
            },
            // 返回
            goBack() {
                this.$message({
                    type: 'success',
                    message: `操作成功`
                })
              this.quit(routesMapping.feeCompute,true)
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
