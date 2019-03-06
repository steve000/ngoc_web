<template>
    <div class='createPurchase-view'>
        <!-- 基本信息 -->
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper" >
                <el-form label-width="110px" :model="feeComputeAddForm" :rules="rules" ref="feeComputeAddForm">
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="支付实体：" prop="payUserGroupId">
                                <el-select v-model="feeComputeAddForm.payGroupName"
                                    disabled
                                    :multiple="false"
                                    filterable
                                    clearable
                                    size="small"
                                    popper-class="max-length"
                                    placeholder="请选择或输入支付实体"
                                    @change="getPayGroupInfo(feeComputeAddForm.payUserGroupId)"
                                    class="text-dash-show row_width"
                                    >
                                    <el-option
                                        v-for="(item, index) in payGroupList"
                                        :key="index"
                                        :label="item.groupName"
                                        :value="item.userGroupId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                            <el-form-item label="收款实体：" prop="recUserGroupId">
                                <el-select v-model="feeComputeAddForm.recGroupName"
                                    disabled
                                    :multiple="false"
                                    filterable
                                    clearable
                                    size="small"
                                    popper-class="max-length"
                                    placeholder="请选择或输入收款实体"
                                    @change="getRecUserGroupInfo(feeComputeAddForm.recUserGroupId)"
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
                                      v-model="feeComputeAddForm.remark" :maxlength="200" placeholder="请输入备注，最多200个字" size="small" style="width:735px;"></el-input>
                            <span style="display:block">{{feeComputeAddForm.remark.length}}/200</span>
                          </el-form-item>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="content">
            <div class="title">
                <div>费用明细</div>
            </div>
            <!-- <div class="addProduct">
                <el-button plain size="mini" @click="addGoodsMsg"><i class="el-icon-plus"></i>添加商品信息</el-button>
            </div> -->
            <div class="content-wrapper" style="padding-left: 20px">
                <product-list :relatedContract="relatedContract" :contractData="feeComputeAddForm.recUserGroupId" :checkProductList="feeComputeAddForm.detailList">
                </product-list>
            </div>
        </div>
        <div>
    </div> 
        <div class="btn-section pt20">
            <el-button type="primary" @click="savePurchase('feeComputeAddForm')" size="small">保存</el-button>
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
import productList from "~/components/stocks/feeCompute/feeComputeListAdd";
export default {
  name: "feeComputeEdit",
  mixins: [MessageMixins, PlatformMixins, QuitMixins],
  components: { productList },
  data() {
    //正则校验
    let payUserGroupId = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请选择支付实体!'));
        } else {
            return callback();
        }
    }
    let recUserGroupId = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请选择收款实体!'));
        } else if (value == this.feeComputeAddForm.payUserGroupId) {
          return callback(new Error('请不要选择相同收付款实体!'));
        } else {
            return callback();
        }
    }
    return {
      // 需要提交的表单数据
      feeComputeAddForm: {
        payGroupName: "",
        recGroupName: "",
        payUserGroupId: "",
        recUserGroupId: "",
        remark: "",
        detailList: [
          {
            feeName: "",
            feeTotal: "",
            feeNo: "",
            remark: "",
          }
        ]
      },
      entityId: '',
      operator: "",
      relatedContract: false, //关联合同
      payGroupList: [],
      recUserGroupList: [],
      rules: {
          payUserGroupId: [{required: true, validator: payUserGroupId, trigger: 'change'}],
          recUserGroupId: [{required: true, validator: recUserGroupId, trigger: 'change'}],
      },
    };
  },
  mounted() {
    const userName = sessionStorage.getItem("entityName");
    const entityId = sessionStorage.getItem("entityId");
    this.operator = userName;
    this.entityId = entityId;
    this.feeComputeAddForm.payGroupName = userName
    this.feeComputeAddForm.payUserGroupId = entityId
    // this.groupFilter();
    this.getStockFeecomputeQueryFunction()
  },
  computed: {},
  methods: {
    ...mapActions([
      "stockFeecomputeEdit",
      "showPageLoading",
      "hidePageLoading",
      "userGroupQuery",
      "userGroupAll",
      "stockLogisticscostQueryusergroupfeelist",
      "stockFeecomputeQuery"
    ]),
    getStockFeecomputeQueryFunction() {
      let obj = {
        id: this.$route.params.id
      }
      this.stockFeecomputeQuery(obj).then(res => {
        this.feeComputeAddForm = res
        let obj = {
          payUserGroupId: this.feeComputeAddForm.payUserGroupId,
          recUserGroupId: this.feeComputeAddForm.recUserGroupId,
          status: 0,
          approveStatus: 1
        }
        this.stockLogisticscostQueryusergroupfeelist(obj).then(res => {
          this.feeComputeAddForm.detailList = res.result;
        });
      });
    },

    savePurchase(feeComputeAddForm) {
      this.$refs[feeComputeAddForm].validate((valid) => {
        if (valid) {
          let datas = {};
          datas = this.feeComputeAddForm;
          this.stockFeecomputeEdit(datas).then(purchaseId => {
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
      this.quit(routesMapping.feeCompute, true);
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
    getPayGroupInfo(val) {
      this.payGroupList.forEach((item, index) => {
        if (item.userGroupId == val) {
          this.feeComputeAddForm.payUserGroupId = item.userGroupId;
          this.feeComputeAddForm.payGroupName = item.groupName;
        }
      });
    },
    getRecUserGroupInfo(val) {
      let num = 0
      this.recUserGroupList.forEach((item, index) => {
        if (item.userGroupId == val) {
          this.feeComputeAddForm.recUserGroupId = item.userGroupId;
          this.feeComputeAddForm.recGroupName = item.groupName;
        }
        num++
      });
      if (num == this.recUserGroupList.length) {
        if (this.feeComputeAddForm.payUserGroupId) {
          let obj = {
            payUserGroupId: this.feeComputeAddForm.payUserGroupId,
            recUserGroupId: val,
            status: 0,
            approveStatus: 1
          }
          this.stockLogisticscostQueryusergroupfeelist(obj).then(res => {
            this.feeComputeAddForm.detailList = res.result;
          });
        } else {
          this.$message({
            type: "warning",
            message: `请先选择支付实体`
          });
        }

      }
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
