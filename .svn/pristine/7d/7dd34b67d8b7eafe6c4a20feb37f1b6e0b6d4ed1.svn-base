<template>
    <div class='createPurchase-view'>
        <!-- 基本信息 -->
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper" >
                <el-form label-width="110px" :model="storehouseLocationAddForm" :rules="rules" ref="storehouseLocationAddForm">
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="仓库名称：" prop="storehouseId">
                                <el-select v-model="storehouseLocationAddForm.storehouseId"
                                    :multiple="false"
                                    filterable
                                    clearable
                                    size="small"
                                    popper-class="max-length"
                                    placeholder="请选择或输入仓库名称："
                                    @change="getStorehouse(storehouseLocationAddForm.storehouseId)"
                                    class="text-dash-show row_width"
                                    >
                                    <el-option
                                        v-for="(item, index) in storehouseList"
                                        :key="index"
                                        :label="item.storehouseName"
                                        :value="item.storehouseId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                            <el-form-item label="仓库编号：">
                                <el-input v-model="storehouseLocationAddForm.storehouseId" placeholder="请填写仓库编号" class="row_width" size="small" disabled>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="仓位名称：" prop="locationName">
                                <el-input v-model="storehouseLocationAddForm.locationName" placeholder="仓位名称" type="text" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                            <el-form-item label="仓位编号：" prop="locationId">
                                <el-input v-model="storehouseLocationAddForm.locationId" v-number-only placeholder="仓位编号" type="number" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="排：" prop="row">
                                <el-input v-model="storehouseLocationAddForm.row" v-number-only placeholder="请填写排号" type="number" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                            <el-form-item label="列：" prop="columns">
                                <el-input v-model="storehouseLocationAddForm.columns" v-number-only placeholder="请填写列号" type="number" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
        <div>
    </div> 
        <div class="btn-section pt20">
            <el-button @click="savePurchase('storehouseLocationAddForm')" size="small" type="primary">保存</el-button>
            <el-button size="small" @click="OnBackLatePage" type="primary" plain>取消</el-button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import MessageMixins from "~/mixins/messages";
import PlatformMixins from "~/mixins/platform";
import { directives } from '~/utils/directives/index'
import QuitMixins from "~/mixins/quit";
import { routesMapping } from "~/router";
export default {
  name: "storehouseLocationAdd",
  mixins: [MessageMixins, PlatformMixins, QuitMixins],
  components: {},
  data() {
    //正则校验
    let storehouseId = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请选择仓库名称!'));
        } else {
            return callback();
        }
    }
    let locationName = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请填写仓位名称!'));
        } else {
            return callback();
        }
    }
    let locationId = (rule, value, callback) => {
      if (!value) {
          return callback(new Error('请填写仓位编号!'));
      } else {
          return callback();
      }
    }
    let row = (rule, value, callback) => {
      if (!value) {
          return callback(new Error('请填写排号!'));
      } else {
          return callback();
      }
    }
    let columns = (rule, value, callback) => {
      if (!value) {
          return callback(new Error('请填写列号!'));
      } else {
          return callback();
      }
    }
    return {
      // 需要提交的表单数据
      storehouseLocationAddForm: {
        storehouseId: "",
        storehouseName: "",
        locationId: "",
        locationName: "",
        row: "",
        columns: "",
      },
      entityId: '',
      operator: "",
      purchaseId: "",
      storehouseList: [],
      currentStorehouseList: [],
      rules: {
          storehouseId: [{required: true, validator: storehouseId, trigger: 'change'}],
          locationName: [{required: true, validator: locationName, trigger: 'change'}],
          locationId: [{required: true, validator: locationId, trigger: 'change'}],
          row: [{required: true, validator: row, trigger: 'change'}],
          columns: [{required: true, validator: columns, trigger: 'change'}],
      },
    };
  },
  mounted() {
    const userName = sessionStorage.getItem("entityName");
    const entityId = sessionStorage.getItem("entityId");
    this.operator = userName;
    this.entityId = entityId;
    this.getStorehouseList();
  },
  computed: {},
  methods: {
    ...mapActions([
      "stockStorehouselocationAdd",
      "showPageLoading",
      "hidePageLoading",
      "queryUserGroupStoreHouse",
      "stockStorehouselocationQuerypagelist",
    ]),
    savePurchase(storehouseLocationAddForm) {
      this.$refs[storehouseLocationAddForm].validate((valid) => {
        if (valid) {

            let flag = true

            if (this.currentStorehouseList.length) {
              this.currentStorehouseList.forEach((item, index) => {
                if (this.storehouseLocationAddForm.locationName == item.locationName) {
                  this.$message({
                    type: "warning",
                    message: `不能填写该仓库下相同仓位名称!`
                  });
                  flag = false
                }
                if (this.storehouseLocationAddForm.locationId == item.locationId) {
                  this.$message({
                    type: "warning",
                    message: `不能填写该仓库下相同仓位编号!`
                  });
                  flag = false
                }
                if (this.storehouseLocationAddForm.row == item.row) {
                  this.$message({
                    type: "warning",
                    message: `不能填写该仓库下相同排号!`
                  });
                  flag = false
                }
                if (this.storehouseLocationAddForm.columns == item.columns) {
                  this.$message({
                    type: "warning",
                    message: `不能填写该仓库下相同列号!`
                  });
                  flag = false
                }
              })
            } 
            // else {
            //   this.$message({
            //     type: "warning",
            //     message: `请选择仓库名称!`
            //   });
            //   flag = false
            // }

            if (flag) {
              let datas = {};
              datas = this.storehouseLocationAddForm;
              this.stockStorehouselocationAdd(datas).then(res => {
                this.OnBackLatePage();
              });
            }

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
      this.quit(routesMapping.storehouseLocation, true);
    },
    // 搜索当前实体下仓库名
    getStorehouseList() {
      let par = {
        userGroupId: this.entityId,
        status: 0,
        storehouseChildType: 1
      };
      this.queryUserGroupStoreHouse(par).then(res => {
        this.storehouseList = res.result;
      });
    },
    getStorehouse(val) {
      let num = 0
      this.storehouseList.forEach((item, index) => {
        if (item.storehouseId == val) {
          this.storehouseLocationAddForm.storehouseId = item.storehouseId;
          this.storehouseLocationAddForm.storehouseName = item.storehouseName;
        }
        num++
      });
      if (num == this.storehouseList.length) {
        let par = {
          pageNo: 1,
          pageSize: 10,
          searchKey: val
        };
        this.stockStorehouselocationQuerypagelist(par).then(res => {
          this.currentStorehouseList = res.result;
        });
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
