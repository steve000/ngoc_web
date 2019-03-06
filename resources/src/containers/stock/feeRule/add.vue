<template>
    <div class='createPurchase-view'>
        <!-- 基本信息 -->
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper" >
                <el-form label-width="150px" :model="feeRuleAddForm" :rules="rules" ref="feeRuleAddForm">
                    <div>
                        <div class="displayStyle">
                          <el-form-item label="规则名称：" prop="ruleName">
                            <el-input type="text" v-model="feeRuleAddForm.ruleName" placeholder="请输入规则名称" size="small" class="row_width"></el-input>
                          </el-form-item>
                        </div>
                        <div class="displayStyle">
                          <el-form-item label="规则计算方法名：" prop="ruleCalcMethod">
                            <el-input type="text" v-model="feeRuleAddForm.ruleCalcMethod" placeholder="规则计算方法名" size="small" class="row_width"></el-input>
                          </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                          <el-form-item label="规则计算时间：" prop="ruleCalcTime">
                            <el-time-picker
                              v-model="feeRuleAddForm.ruleCalcTime"
                              size="small" 
                              class="row_width"
                              value-format="HH:mm:ss"
                              placeholder="请输入规则计算时间">
                            </el-time-picker>
                          </el-form-item>
                        </div>
                        <div class="displayStyle">
                          <el-form-item label="费用名称：" prop="feeName">
                            <el-input type="text" v-model="feeRuleAddForm.feeName" placeholder="请输入费用名称" size="small" class="row_width"></el-input>
                          </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                          <el-form-item label="支付实体：">
                            <el-input type="text" v-model="operator" placeholder="请输入支付实体：" size="small" class="row_width" disabled></el-input>
                          </el-form-item>
                        </div>
                        <div class="displayStyle">
                            <el-form-item label="收款实体：" prop="recUserGroupId">
                                <el-select v-model="feeRuleAddForm.recUserGroupId"
                                    :multiple="false"
                                    filterable
                                    clearable
                                    size="small"
                                    popper-class="max-length"
                                    placeholder="请选择或输入收款实体"
                                    @change="getRecUserGroupInfo(feeRuleAddForm.recUserGroupId)"
                                    class="text-dash-show row_width"
                                    >
                                    <el-option
                                        v-for="(item, index) in recUserGroupList"
                                        :key="index"
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
                                      v-model="feeRuleAddForm.remark" :maxlength="200" placeholder="请输入备注，最多200个字" size="small" style="width:776px;"></el-input>
                            <span style="display:block">{{feeRuleAddForm.remark.length}}/200</span>
                          </el-form-item>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
        <div>
    </div> 
        <div class="btn-section pt20">
            <el-button type="primary" @click="savePurchase('feeRuleAddForm')" size="small">保存</el-button>
            <el-button plain type="primary" size="small" @click="OnBackLatePage">取消</el-button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import MessageMixins from "~/mixins/messages";
import PlatformMixins from "~/mixins/platform";
import QuitMixins from "~/mixins/quit";
import { routesMapping } from "~/router";
export default {
  name: "feeRuleAdd",
  mixins: [MessageMixins, PlatformMixins, QuitMixins],
  components: {},
  data() {
    //正则校验
    let ruleName = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('规则名称不能为空!'));
        } else {
            return callback();
        }
    }
    let ruleCalcMethod = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('规则计算方法名不能为空!'));
        } else {
            return callback();
        }
    }
    let ruleCalcTime = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('规则计算时间不能为空!'));
        } else {
            return callback();
        }
    }
    let feeName = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('费用名称不能为空!'));
        } else {
            return callback();
        }
    }

    let recUserGroupId = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请选择收款实体!'));
        } else if (value == this.entityId) {
          return callback(new Error('请不要选择相同收付款实体!'));
        } else {
            return callback();
        }
    }
    return {
      // 需要提交的表单数据
      feeRuleAddForm: {
        ruleName: "",
        ruleCalcMethod: "",
        ruleCalcTime: "",
        feeName: "",
        recUserGroupId: "",
        recGroupName: "",
        remark: "",
      },
      entityId: '',
      operator: "",
      relatedContract: false, //关联合同
      payGroupList: [],
      recUserGroupList: [],
      rules: {
        ruleName: [{required: true, validator: ruleName, trigger: 'change'}],
        ruleCalcMethod: [{required: true, validator: ruleCalcMethod, trigger: 'change'}],
        ruleCalcTime: [{required: true, validator: ruleCalcTime, trigger: 'change'}],
        feeName: [{required: true, validator: feeName, trigger: 'change'}],
        recUserGroupId: [{required: true, validator: recUserGroupId, trigger: 'change'}],
      },
    };
  },
  mounted() {
    // this.addGoodsMsg();
    const userName = sessionStorage.getItem("entityName");
    const entityId = sessionStorage.getItem("entityId");
    this.operator = userName;
    this.entityId = entityId;
    this.groupFilter();
  },
  computed: {},
  methods: {
    ...mapActions([
      "stockFeeruleAdd",
      "showPageLoading",
      "hidePageLoading",
      "userGroupQuery",
      "userGroupAll",
    ]),
    savePurchase(feeRuleAddForm) {
      this.$refs[feeRuleAddForm].validate((valid) => {
        if (valid) {
          let datas = {};
          datas = this.feeRuleAddForm;
          this.stockFeeruleAdd(datas).then(purchaseId => {
            this.OnBackLatePage();
          });
        } else {
          this.showSuccess("请填写必填项");
          return false;
        }
      });
    },

    //点击取消
    OnBackLatePage() {
      this.$message({
        type: "success",
        message: `操作成功`
      });
      this.quit(routesMapping.feeRule, true);
    },
    // 搜索当前用户下实体和所有可用实体
    groupFilter() {
      // 当前用户下
      let par = {
        uid: sessionStorage.getItem("userId"),
      };
      this.userGroupQuery(par).then(res => {
        this.payGroupList = res.result;
      });
      // 所有实体
      let par2 = {
        status: 1
      };
      this.userGroupAll(par2).then(res => {
        this.recUserGroupList = res.result;
      });
    },
    getRecUserGroupInfo(val) {
      this.recUserGroupList.forEach((item, index) => {
        if (item.userGroupId == val) {
          this.feeRuleAddForm.recUserGroupId = item.userGroupId;
          this.feeRuleAddForm.recGroupName = item.groupName;
        }
      });
    },
  }
};
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
