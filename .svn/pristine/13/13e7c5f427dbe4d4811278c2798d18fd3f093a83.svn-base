<template>
    <div class='createPurchase-view'>
        <!-- 基本信息 -->
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper" >
                <el-form label-width="150px" :model="addPurchaseContractData" ref="addPurchaseContractData" :rules="rules">
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="合同编号：" prop="conNo">
                                <el-input v-model="addPurchaseContractData.conNo" class="row_width" size="small" disabled>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                            <el-form-item label="合同名称：" prop="conName">
                                <el-input v-model="addPurchaseContractData.conName" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>

                    <div>
                        <div class="displayStyle">
                            <el-form-item class="startAndEndTimeFontSize" label="合同开始时间：" prop="contractStartTime">
                                <el-date-picker
                                v-model="addPurchaseContractData.contractStartTime"
                                type="datetime"
                                :editable="false"
                                class="row_width" size="small"
                                placeholder="选择日期时间"
                                :default-time="['00:00:00']"
                                value-format="yyyy-MM-dd HH:mm:ss">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                            <el-form-item class="startAndEndTimeFontSize" label="合同结束时间：" prop="contractEndTime">
                                <el-date-picker
                                v-model="addPurchaseContractData.contractEndTime"
                                type="datetime"
                                :editable="false"
                                class="row_width" size="small"
                                placeholder="选择日期时间"
                                :default-time="['00:00:00']"
                                value-format="yyyy-MM-dd HH:mm:ss">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                    </div>

                    <div>
                        <div class="displayStyle">
                            <el-form-item label="供应商名称:" prop="vendorName">
                                <el-select v-model="addPurchaseContractData.vendorName"
                                    :multiple="false"
                                    filterable
                                    clearable
                                    size="small"
                                    popper-class="max-length"
                                    placeholder="请选择或输入供应商名称"
                                    @change="getGroupInfo"
                                    class="text-dash-show row_width"
                                    >
                                    <el-option
                                        v-for="(item) in groupList"
                                        :key="item.vendorId"
                                        :label="item.vendorName"
                                        :value="item.vendorId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                            <el-form-item label="结算方式:" prop="payType">
                                 <el-select class="row_width" v-model="addPurchaseContractData.payType" placeholder="请选择">
                                    <el-option :label="'先款后货'" :value="1"></el-option>
                                    <el-option :label="'货到付款'" :value="2"></el-option>
                                  </el-select>
                            </el-form-item>
                        </div>
                    </div>

                    <div>
                      <div class="displayStyle">
                          <el-form-item label="备注：">
                            <el-input type="textarea" :rows="6" :maxlength="200"
                                      v-model="addPurchaseContractData.remark" placeholder="请输入备注，最多200个字" size="small" style="width:735px;"></el-input>
                            <span style="display:block">{{addPurchaseContractData.remark.length}}/200</span>
                          </el-form-item>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="content">
            <div class="title">
                <div>商品清单</div>
            </div>
            <div class="addProduct">
                    <el-button plain size="mini" @click="addGoodsMsg"><i class="el-icon-plus"></i>添加商品信息</el-button>
                </div>
            <div class="content-wrapper" style="padding-left: 20px">
                <product-list :checkProductList="addPurchaseContractData.productList">
                </product-list>
            </div>
        </div>
        <div class="btn-section pt20">
            <el-button  class="cancel-button" @click="savePurchase('addPurchaseContractData')" size="small">保存</el-button>
            <el-button size="small"  class="cancel-button" @click="OnBackLatePage">取消</el-button>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex';
    import MessageMixins from '~/mixins/messages';
    import PlatformMixins from '~/mixins/platform';
    import utils from '~/utils/commonMethod';
    import QuitMixins from '~/mixins/quit';
    import {routesMapping} from '~/router';
    import ProductList from '~/components/contract/AddPurchaseContractList';
    export default {
        name: 'AddPurchaseContract',
        mixins: [MessageMixins, PlatformMixins,QuitMixins],
        components :{ProductList},
        data() {
            // 正则校验
            let conNo = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请选择合同编号!'));
                } else {
                    return callback();
                }
            }
            let conName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请选择合同名称!'));
                } else {
                    return callback();
                }
            }
            let vendorName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请选择供应商名称!'));
                } else {
                    return callback();
                }
            }
            let payType = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请选择结算方式!'));
                } else {
                    return callback();
                }
            }
            let contractStartTime = (rule, value, callback) => {
                let now = new Date()
                let time = new Date(value)
                if (!value) {
                    return callback(new Error('请选择开始时间!'));
                } else if (time.getTime() < now.getTime()) {
                    return callback(new Error('请选择晚于当前时间'));
                } else {
                    return callback();
                }
            }
            let contractEndTime = (rule, value, callback) => {
                let now = new Date()
                let time = new Date(value)
                let beginTime = new Date(this.addPurchaseContractData.contractStartTime)
                if (!value) {
                    return callback(new Error('请选择结束时间!'));
                } else if (time.getTime() < now.getTime()) {
                    return callback(new Error('请选择晚于当前时间'));
                } else if (time.getTime() < beginTime.getTime()) {
                    return callback(new Error('请选择晚于开始时间'));
                } else {
                    return callback();
                }
            }
            return{
                // 需要提交的表单数据
                addPurchaseContractData: {
                    conNo: '',
                    conName: '',
                    contractStartTime: '',
                    contractEndTime: '',
                    payType: '',
                    vendorName: '',
                    conVendorId: '',
                    remark: '',
                    productList: [
                        {
                        skuId: '',
                        skuName: '',
                        unitId: '',
                        unitName: '',
                        unitValue: '',
                        priceType: '',
                        taxIncludePrice: '',
                        taxExcludedPrice: '',
                        taxRate: '',
                        purchaseCount: '',
                        comments: '',
                        }
                    ]
                },
                operator:'',
                groupList: [],
                rules: {
                    conNo: [{required: true, validator: conNo, trigger: 'change'}],
                    conName: [{required: true, validator: conName, trigger: 'change'}],
                    vendorName: [{required: true, validator: vendorName, trigger: 'change'}],
                    payType: [{required: true, validator: payType, trigger: 'change'}],
                    contractStartTime: [{required: true, validator: contractStartTime, trigger: 'change', type: 'date'}],
                    contractEndTime:[{required: true, validator: contractEndTime, trigger: 'change', type: 'date'}],
                },
            }
        },
        mounted(){
            const userName = sessionStorage.getItem('userName');
            this.operator = userName;
            this.groupFilter()
            this.getPurchaseContractQueryFun()
        },
        computed: {
        },
        methods:{
            ...mapActions(["purchaseContractEdit","purchaseContractQuery","vendorQuerylistbyusergroupid","showPageLoading","hidePageLoading"]),
            // 表格初始化
            addGoodsMsg(){
                this.addPurchaseContractData.productList.push({
                    skuId: '',
                    skuName: '',
                    unitId: '',
                    unitName: '',
                    unitValue: '',
                    priceType: '',
                    taxIncludePrice: '',
                    taxExcludedPrice: '',
                    taxRate: '',
                    purchaseCount: '',
                    comments: ''
                });
            },
            getPurchaseContractQueryFun() {
                let datas = {
                    contractSeqNo:this.$route.params.contractSeqNo
                }
                this.purchaseContractQuery(datas).then((res) =>{
                    this.addPurchaseContractData = res
                })
            },
           
            savePurchase(addPurchaseContractData){
                let fun = false
                this.addPurchaseContractData.productList.forEach((item, index) => {
                    if (!item.taxIncludePrice || item.taxIncludePrice < 0) {
                        this.$message({
                            type: 'warning',
                            message: `请填写含税采购单价并且不能小于0`
                        })
                        fun = false
                    } else if (!item.taxExcludedPrice || item.taxExcludedPrice < 0) {
                        this.$message({
                            type: 'warning',
                            message: `请填写不含税采购单价并且不能小于0`
                        })
                        fun = false
                    } else if (!item.taxRate || item.taxRate < 0) {
                        this.$message({
                            type: 'warning',
                            message: `请填写税率并且不能小于0`
                        })
                        fun = false
                    } else if (!item.purchaseCount || item.purchaseCount <= 0) {
                        this.$message({
                            type: 'warning',
                            message: `请填写采购总量并且不能小于0`
                        })
                        fun = false
                    } else if (!item.skuName) {
                        this.$message({
                            type: 'warning',
                            message: `请填写商品名称`
                        })
                        fun = false
                    } else if (!item.priceType) {
                        this.$message({
                            type: 'warning',
                            message: `请填写定价方式`
                        })
                        fun = false
                    } else {
                        fun = true
                    }
                })
                if (fun) {
                    this.$refs[addPurchaseContractData].validate((valid) => {
                    if (valid) {
                        let datas = {}
                        datas = this.addPurchaseContractData
                        this.purchaseContractEdit(datas).then((res) =>{
                            this.OnBackLatePage(addPurchaseContractData);
                        })
                    } else {
                        this.showSuccess("请填写必填项");
                        return false;
                    }
                    });
                }
            },

            //点击取消
            OnBackLatePage(){
                this.$message({
                    type: 'success',
                    message: `操作成功`
                })
                this.quit(routesMapping.ContractManagement,true)
            },
            // 搜索供应商名称
            groupFilter(){
                let par = {
                    vendorEnableFlag: 1,  // 状态启用
                    userGroupId: sessionStorage.getItem('entityId')
                    }
                this.vendorQuerylistbyusergroupid(par).then(res => {
                    this.groupList = res.result;
                });
                
            },
            getGroupInfo(val){
                this.groupList.forEach((item, index) => {
                    if (item.vendorId == val) {
                        this.addPurchaseContractData.vendorName = item.vendorName
                        this.addPurchaseContractData.conVendorId = item.vendorNumber
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
    .title {
      color: #333;
      font-weight: 700;
      background-color: #ffffff;
      border-bottom: 1px solid #e5e5e5;
      .receiveTitle {
        display: inline-block;
      }
      .downIcon {
        cursor: pointer;
        transition: 1s;
      }
    }
    .content-wrapper {
      padding: 20px 20px 1px 10px;
      .displayStyle,
      .displayStyle1 {
        display: inline-block;
        padding-left: 25px;
        .row_width {
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
      .contarctInformation {
        margin-left: 126px;
        margin-bottom: 15px;
        .contarctInformation_form {
          background-color: #f8f9fb;
          padding-bottom: 6px;
          padding-top: 18px;
          .contractInfo1,
          .contractInfo2 {
            display: inline-block;
            .contract_row_width {
              width: 240px;
            }
          }
        }
      }
      .supplierNo {
        margin-left: 195px;
      }
      .text-dash-show {
        font-size: 14px;
      }
    }
    .addProduct {
      // margin-bottom: 16px;
      margin-top: 15px;
      margin-left: 20px;
    }
  }
  .orderBox {
    background-color: white;
    padding: 0px 20px;
    .orderContainer {
      background-color: #fbfbfb;
      padding: 0px 20px;
      border: 1px solid #f1f1f1;
      height: 50px;
      line-height: 50px;
      .orderCount {
        float: right;
        span {
          color: red;
          font-size: 18px;
        }
      }
    }
  }
  .cancel-button {
    color: #3b8cff;
    border: 1px solid #bfd9fe;
  }
  .unvalid {
    border-radius: 5px;
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
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 300px;
    margin-left: 0px;
    font-size: 14px;
  }
  .el-form-item__label {
    color: #333;
  }
  .el-form-item {
    margin-bottom: 13px;
  }
  .el-textarea__inner {
    margin-top: 5px;
    height: 80px;
    margin-left: 2px;
  }
  .el-input__inner {
    border: 1px solid #e0e0e0;
    color: #666666;
    &::-webkit-input-placeholder {
      /* WebKit, Blink, Edge */
      font-size: 14px !important;
    }
    &::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      font-size: 14px !important;
    }
    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      font-size: 14px !important;
    }
  }
  .el-date-editor input {
    border: 1px solid #e0e0e0;
    color: #666666;
    &::-webkit-input-placeholder {
      /* WebKit, Blink, Edge */
      font-size: 14px !important;
    }
    &::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      font-size: 14px !important;
    }
    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      font-size: 14px !important;
    }
  }
  .el-select .el-input input {
    border: 1px solid #e0e0e0;
    color: #666666;
    &::-webkit-input-placeholder {
      /* WebKit, Blink, Edge */
      font-size: 14px !important;
    }
    &::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      font-size: 14px !important;
    }
    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      font-size: 14px !important;
    }
  }
  .el-input.is-disabled .el-input__inner {
    background-color: #f0f0f0;
    font-size: 14px;
  }
  .unvalid .el-input__inner {
    border-color: red !important;
  }
}
</style>
