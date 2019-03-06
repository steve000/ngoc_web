<template>
    <div class='createPurchase-view'>
        <!-- 基本信息 -->
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper" >
                <el-form label-width="110px" :model="inventoryForm" :rules="rules" ref="inventoryForm">
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="操作人：">
                                <el-input v-model="operator" placeholder="请填写操作人" class="row_width" size="small" disabled>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="仓库名称：" prop="storehouseId">
                                <el-select v-model="inventoryForm.storehouseId"
                                    :multiple="false"
                                    filterable
                                    clearable
                                    size="small"
                                    popper-class="max-length"
                                    placeholder="请选择或输入仓库名称"
                                    @change="getGroupInfo(inventoryForm.storehouseId)"
                                    class="text-dash-show row_width"
                                    >
                                    <el-option
                                        v-for="(item, index) in groupList"
                                        :key="index"
                                        :label="item.storehouseName"
                                        :value="item.storehouseId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                          <el-form-item label="备注：">
                            <el-input type="textarea" :rows="6"
                                      v-model="inventoryForm.comments" :maxlength="200" placeholder="请输入备注，最多200个字" size="small" style="width:735px;"></el-input>
                            <span style="display:block">{{inventoryForm.comments.length}}/200</span>
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
                <product-list :relatedContract="relatedContract" :contractData="inventoryForm.storehouseId" :checkProductList="inventoryForm.productList">
                </product-list>
            </div>
        </div>
        <div>
    </div> 
        <div class="btn-section pt20">
            <el-button type="primary" @click="savePurchase('inventoryForm')" size="small">保存</el-button>
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
import ProductList from "~/components/stocks/inventory/inventoryListAdd";
export default {
  name: "CreatePurchase",
  mixins: [MessageMixins, PlatformMixins, QuitMixins],
  components: { ProductList },
  data() {
    //正则校验
    let storehouseId = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请选择仓库名称!'));
        } else {
            return callback();
        }
    }
    return {
      // 需要提交的表单数据
      inventoryForm: {
        storehouseId: "",
        storehouseName: "",
        comments: "",
        productList: [
          {
            skuId: "",
            skuName: "",
            productId: "",
            totalCount: "",
            actualCount: "",
            adjustCount: "",
            resultType: "",
            comments: "",
            serialNo: ""
          }
        ]
      },
      entityId: '',
      operator: "",
      relatedContract: false, //关联合同
      purchaseId: "",
      groupList: [],
      rules: {
          storehouseId: [{required: true, validator: storehouseId, trigger: 'change'}],
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
      "inventoryAdd",
      "showPageLoading",
      "hidePageLoading",
      "queryUserGroupStoreHouse"
    ]),
    // 表格初始化
    addGoodsMsg() {
      this.inventoryForm.productList.push({
        skuId: "",
        skuName: "",
        productId: "",
        totalCount: "",
        actualCount: "",
        adjustCount: "",
        resultType: "",
        comments: "",
        serialNo: ""
      });
    },

    savePurchase(inventoryForm) {
      this.$refs[inventoryForm].validate((valid) => {
        if (valid) {
          let isUp = true
          this.inventoryForm.productList.forEach((item, index) => {
            if (item.skuId == '' || item.actualCount == '') {
              isUp = false
              this.$message({
                type: "warning",
                message: `商品名称或者实盘数量不能为空`
              });
            }
          })
          if (isUp) {
            let datas = {};
            datas = this.inventoryForm;
            console.log(datas, 998);
            this.inventoryAdd(datas).then(purchaseId => {
              //   this.showSuccess("保存成功");
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
      this.quit(routesMapping.inventoryIndex, true);
    },
    // 搜索仓库名
    groupFilter() {
      let par = {
        userGroupId: this.entityId,
        status: 0,
        storehouseChildType: 1
      };
      this.queryUserGroupStoreHouse(par).then(res => {
        this.groupList = res.result;
      });
    },
    getGroupInfo(val) {
      if (this.inventoryForm.storehouseId) {
        this.$confirm('确认修改仓库名称，修改后清空商品详情?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.inventoryForm.productList = []
            this.inventoryForm.productList.push({
              skuId: "",
              skuName: "",
              productId: "",
              totalCount: "",
              actualCount: "",
              adjustCount: "",
              resultType: "",
              comments: "",
              serialNo: ""
            });
            this.groupList.forEach((item, index) => {
              if (item.storehouseId == val) {
                this.inventoryForm.storehouseId = item.storehouseId;
                this.inventoryForm.storehouseName = item.storehouseName;
                
              }
            });
            // this.showSuccess();
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消修改'
            });
        });
      }
    }
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
