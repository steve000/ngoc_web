<template>
    <el-row class="viewPurchase detailsBigBox">
        <!-- 左边信息 -->
        <el-row  class="viewPurchaseLeft DetailsLeftBox">
            <div class="viewLeftTop">
                <el-row >
                        <h4 class="order">费用名称：{{ logisticsCostEntryForm.feeName}}</h4>
                        <h4 class="status goodsStatus">单据状态：<span v-if="logisticsCostEntryForm.status == 0">未结算</span><span v-if="logisticsCostEntryForm.status == 1">已结算</span></h4>
                        <h4 class="status">审批状态：<span v-if="logisticsCostEntryForm.approveStatus == 0">草稿</span><span v-if="logisticsCostEntryForm.approveStatus == 1">审批通过</span></h4>
                </el-row>
                <el-row >
                      <el-button type="primary" size="small" v-if="logisticsCostEntryForm.approveStatus == 0"  @click="editPurchaseOrder()" style="margin-top:10px;">编辑</el-button>  
                </el-row>
            </div>
        </el-row>
        <!--右边基本信息-->
        <el-row class="viewPurchaseRight DetailsRightBox" >
            <h3>基本信息</h3>
            <el-form :modle="logisticsCostEntryForm" label-position="left" class="TotalBasic">
              <el-form-item label="费用金额：">
                  <span>{{logisticsCostEntryForm.feeTotal ? logisticsCostEntryForm.feeTotal : '--'}}</span>
              </el-form-item>
              <el-form-item label="支付实体：">
                  <span>{{logisticsCostEntryForm.payGroupName ? logisticsCostEntryForm.payGroupName : '--'}}</span>
              </el-form-item>
              <el-form-item label="收款实体：">
                  <span>{{logisticsCostEntryForm.recGroupName ? logisticsCostEntryForm.recGroupName : '--'}}</span>
              </el-form-item>
              <el-form-item label="创建人：">
                  <span>{{logisticsCostEntryForm.createUserName ? logisticsCostEntryForm.createUserName : '--'}}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                  <span>{{logisticsCostEntryForm.createTime ? logisticsCostEntryForm.createTime : '--'}}</span>
              </el-form-item>
              <el-form-item label="审批人：">
                  <span>{{logisticsCostEntryForm.approveUserName ? logisticsCostEntryForm.approveUserName : '--'}}</span>
              </el-form-item>
              <el-form-item label="审批时间：">
                  <span>{{logisticsCostEntryForm.approveTime ? logisticsCostEntryForm.approveTime : '--'}}</span>
              </el-form-item>
              <el-form-item label="备注：">
                  <span style="word-wrap:break-word">{{logisticsCostEntryForm.remark ? logisticsCostEntryForm.remark : '--'}}</span>
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
        name: 'logisticsCostEntryDetails',
        mixins: [platform,QuitMixins],
        components: {},
        data() {
            return {
                // 需要提交的表单数据
                logisticsCostEntryForm: {
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
                  feeNo: '',
                  feeName: '',
                  feeTotal: '',
                  payUserGroupId: '',
                  payGroupName: '',
                  recUserGroupId: '',
                  recGroupName: '',
                  createUserId: '',
                  approveUserId: '',
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
            ...mapActions(["stockLogisticscostQuery","showPageLoading", "hidePageLoading"]),
            refreshPage(){
                let datas = {
                    id: this.$route.params.id
                }
              this.stockLogisticscostQuery(datas).then((res) =>{
                this.logisticsCostEntryForm = res
              })
            },
            //去编辑页面
            editPurchaseOrder() {
                this.$router.push(`/stock/costManagement/logisticsCostEntryEdit/${this.$route.params.id}`)
            },
            // 返回
            goBack() {
                this.$message({
                    type: 'success',
                    message: `操作成功`
                })
              this.quit(routesMapping.logisticsCostEntry,true)
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
