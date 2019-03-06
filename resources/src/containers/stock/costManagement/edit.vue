<template>
    <div class='createPurchase-view'>
        <!-- 基本信息 -->
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper" >
                <el-form label-width="110px" :model="logisticsCostEntryForm" :rules="rules" ref="logisticsCostEntryForm">
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="费用名称" prop="feeName">
                                <el-input v-model="logisticsCostEntryForm.feeName" placeholder="请填写费用名称" class="row_width" size="small" type="text">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                            <el-form-item label="费用金额" prop="feeTotal">
                                <el-input v-model="logisticsCostEntryForm.feeTotal" v-number-decimal-only placeholder="请填写费用金额" class="row_width" size="small" type="number">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="支持实体">
                                <el-input v-model="logisticsCostEntryForm.payGroupName" placeholder="请填写支持实体" class="row_width" size="small" disabled>
                                </el-input>
                            </el-form-item>
                        </div>

                        <div class="displayStyle">
                            <el-form-item label="收款实体">
                                <el-select v-model="logisticsCostEntryForm.recGroupName"
                                    :multiple="false"
                                    filterable
                                    clearable
                                    size="small"
                                    popper-class="max-length"
                                    placeholder="请选择或输入收款实体"
                                    @change="getGroupInfo(logisticsCostEntryForm.recUserGroupId)"
                                    class="text-dash-show row_width"
                                    >
                                    <el-option
                                        v-for="(item) in groupList"
                                        :key="item.userGroupId"
                                        :label="item.groupName"
                                        :value="item.userGroupId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                          <el-form-item label="备注：">
                            <el-input type="textarea" :rows="6"
                                      v-model="logisticsCostEntryForm.remark" :maxlength="200" placeholder="请输入备注，最多200个字" size="small" style="width:735px;"></el-input>
                            <span style="display:block">{{logisticsCostEntryForm.remark.length}}/200</span>
                          </el-form-item>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="btn-section pt20">
            <el-button type="primary" @click="savePurchase('logisticsCostEntryForm')" size="small">保存</el-button>
            <el-button plain type="primary" size="small" @click="OnBackLatePage('logisticsCostEntryForm')">取消</el-button>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex';
    import MessageMixins from '~/mixins/messages';
    import PlatformMixins from '~/mixins/platform';
    import QuitMixins from '~/mixins/quit';
    import { directives } from '~/utils/directives/index'
    import {routesMapping} from '~/router';
    export default {
        name: 'logisticsCostEntryEdit',
        mixins: [MessageMixins, PlatformMixins,QuitMixins],
        components :{},
        data() {
            //正则校验
            let feeName = (rule, value, callback) => {
              if (!value) {
                return callback(new Error('请填写费用名称!'));
              } else {
                return callback();
              }
            }
            let feeTotal = (rule, value, callback) => {
              if (value == 0) {
                return callback(new Error('费用金额不能为0!'));
              } else {
                return callback();
              }
            }
            return{
              // 需要提交的表单数据
              logisticsCostEntryForm: {
                id: '',
                feeName: '',
                feeTotal: '',
                payUserGroupId: '',
                payGroupName: '',
                recUserGroupId: '',
                recGroupName: '',
                remark: ''
              },
              groupList: [],
              rules: {
                  feeName: [{required: true, validator: feeName, trigger: 'blurs'}],
                  feeTotal: [{required: true, validator: feeTotal, trigger: 'blurs'}],
              },
            }
        },
        mounted(){
          this.stockLogisticscostQueryCheck()
        },
        computed: {
        },
        methods:{
            ...mapActions(["userGroupAll","stockLogisticscostEdit","stockLogisticscostQuery","SearchGoodsList","showPageLoading","hidePageLoading"]),
            // 带ID查看请求
            stockLogisticscostQueryCheck () {
                let datas = {
                    id: this.$route.params.id
                }
              this.stockLogisticscostQuery(datas).then((res) =>{
                  for (var x in res) {
                      for (var y in this.logisticsCostEntryForm) {
                          if ( x == y ) {
                              this.logisticsCostEntryForm[y] = res[x]
                          }
                      }
                  }
              }).then(next => {
                this.groupFilter()
              })
            },
            savePurchase(logisticsCostEntryForm){
              this.$refs[logisticsCostEntryForm].validate((valid) => {
                if (valid) {
                  let datas = {}
                  datas = this.logisticsCostEntryForm
                  this.stockLogisticscostEdit(datas).then((res) =>{
                      this.showSuccess("保存成功");
                      this.OnBackLatePage(logisticsCostEntryForm);
                  })
                } else {
                  this.showSuccess("请填写必填项");
                  return false;
                }
              });
            },
            //点击取消
            OnBackLatePage(logisticsCostEntryForm){
              this.$refs[logisticsCostEntryForm].resetFields();
              this.$message({
                  type: 'success',
                  message: `操作成功`
              })
              this.quit(routesMapping.logisticsCostEntry,true)
            },
            // 搜索业务实体
            groupFilter(){
              this.logisticsCostEntryForm.payGroupName = sessionStorage.getItem('entityName');
              this.logisticsCostEntryForm.payUserGroupId = sessionStorage.getItem('entityId',);
              let par = {status: 1}
              this.userGroupAll(par).then(res => {
                res.result.forEach((item, index) => {
                  if (this.logisticsCostEntryForm.payUserGroupId != item.userGroupId) {
                      this.groupList.push(item)
                  }
                })
              });
            },
            getGroupInfo(val){
                this.groupList.forEach((item, index) => {
                    if (item.userGroupId == val) {
                        this.logisticsCostEntryForm.recUserGroupId = item.userGroupId
                        this.logisticsCostEntryForm.recGroupName = item.groupName
                    }
                })
            },
        }
    }
</script>
<style lang='scss' scoped>
    .createPurchase-view {
        height: 100%;
        position: relative;
        padding: 10px 30px 0px 30px;
        .content {
            .title{
                color: #333;
                font-weight: 700;
                background-color: #ffffff;
                border-bottom: 1px solid #E5E5E5;
                .receiveTitle{
                    display: inline-block;
                }
                .downIcon{
                    cursor: pointer;
                    transition: 1s;
                }
            }
            .content-wrapper{
                padding: 20px 20px 1px 10px;
                .displayStyle ,.displayStyle1{
                    display: inline-block;
                    padding-left: 25px;
                    .row_width{
                        width: 300px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        height: 36px;
                        color: #666666;
                    }
                    .sousuoIcon {
                        width: 14px;
                        height: 14px;
                        color: #bebebe;
                    }
                }
                .contarctInformation{
                    margin-left: 126px;
                    margin-bottom: 15px;
                    .contarctInformation_form{
                        background-color: #F8F9FB;
                        padding-bottom: 6px;
                        padding-top: 18px;
                        .contractInfo1,.contractInfo2{
                            display: inline-block;
                            .contract_row_width{
                                width: 240px;
                            }
                        }
                    }
                }
                .supplierNo{
                    margin-left: 195px;
                }
                .text-dash-show{
                    font-size: 14px;
                }
            }
            .addProduct{
                // margin-bottom: 16px;
                margin-top: 15px;
                margin-left: 20px;
            }
        }
        .orderBox{
            background-color: white;
            padding: 0px 20px;
            .orderContainer{
                background-color: #FBFBFB;
                padding: 0px 20px;
                border: 1px solid #F1F1F1;
                height: 50px;
                line-height: 50px;
                .orderCount{
                    float: right;
                    span{
                        color: red;
                        font-size: 18px;
                    }
                }
            }
        }
        .cancel-button{
             color: #3B8CFF;
             border: 1px solid #BFD9FE;
        }
        .unvalid{
            border-radius:5px;
        }
        .el-table__body-wrapper {
            overflow: inherit;
        }

    }

</style>
<style lang='scss'>
    .createPurchase-view {
        .procurements-config-wrapper {
            overflow: inherit;
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
            width:300px;
            margin-left: 0px;
            font-size: 14px;
        }
        .el-form-item__label{
            color: #333;
        }
        .el-form-item{
            margin-bottom: 13px;
        }
        .el-textarea__inner{
            margin-top: 5px;
            height:80px;
            margin-left: 2px;
        }
        .el-input__inner{
            border: 1px solid #E0E0E0;
            color: #666666;
            &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                font-size:14px!important;
            }
            &::-moz-placeholder { /* Mozilla Firefox 19+ */
                font-size:14px!important;
            }
            &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                font-size:14px!important;
            }
        }
        .el-date-editor input{
            border: 1px solid #E0E0E0;
            color: #666666;
            &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                font-size:14px!important;
            }
            &::-moz-placeholder { /* Mozilla Firefox 19+ */
                font-size:14px!important;
            }
            &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                font-size:14px!important;
            }
        }
        .el-select .el-input input{
            border: 1px solid #E0E0E0;
            color: #666666;
            &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                font-size:14px!important;
            }
            &::-moz-placeholder { /* Mozilla Firefox 19+ */
                font-size:14px!important;
            }
            &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                font-size:14px!important;
            }
        }
        .el-input.is-disabled .el-input__inner{
            background-color: #f0f0f0;
            font-size: 14px;
        }
        .unvalid .el-input__inner{
            border-color: red !important;
        }
    }
</style>
