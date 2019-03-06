<template>
    <el-row class="viewPurchase detailsBigBox">
        <!-- 左边信息 -->
        <el-row  class="viewPurchaseLeft DetailsLeftBox">
            <div class="viewLeftTop">
                <el-row >
                        <h4 class="status goodsStatus" style="margin-left:0;">渠道名称：{{ channelPlanForm.channelName}}</h4>
                        <h4 class="status goodsStatus">计划类型：<span v-if="channelPlanForm.planType == 0">年度计划</span><span v-if="channelPlanForm.status == 1">月度计划</span></h4>
                </el-row>
                <!-- <el-row >
                      <el-button type="primary" size="small"  @click="editPurchaseOrder()" style="margin-top:10px;">编辑</el-button>  
                </el-row> -->
            </div>
            <div class="viewLeftTop">
                <el-row >
                        <h4 class="order">计划详情</h4>
                </el-row>
            </div>
            <div style="padding: 20px 20px 0;">
              <el-table :data="channelPlanForm.planList">
                  <el-table-column label="年"  prop="yearNo">
                      <template slot-scope="scope">
                          <div class="row-show" :title="scope.row.yearNo">
                              {{scope.row.yearNo ? scope.row.yearNo : '--'}}
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column label="月" prop="monthNo" >
                      <template slot-scope="scope">
                          <div class="row-show" :title="scope.row.monthNo">
                              {{scope.row.monthNo ? scope.row.monthNo : '--'}}

                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column label="计划金额" prop="planTotal">
                      <template slot-scope="scope" >
                          <div class="row-show" :title="scope.row.planTotal">
                              {{scope.row.planTotal ? scope.row.planTotal : '--'}}
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column label="实际销售金额" prop="factsaleTotal">
                      <template slot-scope="scope" >
                          <div class="row-show" :title="scope.row.factsaleTotal">
                              {{scope.row.factsaleTotal ? scope.row.factsaleTotal : '--'}}
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column label="实际退货金额" prop="factreturnTotal">
                      <template slot-scope="scope" >
                          <div class="row-show" :title="scope.row.factreturnTotal">
                              {{scope.row.factreturnTotal ? scope.row.factreturnTotal : '--'}}
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
            <el-form :modle="channelPlanForm" label-position="left" class="TotalBasic">
              <el-form-item label="操作人：">
                  <span>{{channelPlanForm.operateUserName ? channelPlanForm.operateUserName : '--'}}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                  <span>{{channelPlanForm.createTime ? channelPlanForm.createTime : '--'}}</span>
              </el-form-item>
              <el-form-item label="更新时间：">
                  <span>{{channelPlanForm.updateTime ? channelPlanForm.updateTime : '--'}}</span>
              </el-form-item>
              <el-form-item label="备注：">
                  <span style="word-wrap:break-word">{{channelPlanForm.comments ? channelPlanForm.comments : '--'}}</span>
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
        name: 'channelPlanDetails',
        mixins: [platform,QuitMixins],
        components: {},
        data() {
            return {
                // 需要提交的表单数据
                channelPlanForm: {},
            }
        },
        mounted(){
            this.refreshPage();
        },
        activated() {
           this.refreshPage();
        },
        methods: {
            ...mapActions(["channelplanQuery","showPageLoading", "hidePageLoading"]),
            refreshPage(){
                let parm = {
                    id: this.$route.query.id
                }
							this.channelplanQuery(parm).then((res) =>{
								this.channelPlanForm = res
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
              this.quit(routesMapping.channelPlan,true)
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
