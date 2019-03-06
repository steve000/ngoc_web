<template>
    <div class='createPurchase-view'>
        <!-- 基本信息 -->
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper" >
                <el-form label-width="110px" :model="channelPriceForm" :rules="rules" ref="channelPriceForm">
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="操作人">
                                <el-input v-model="entityName" class="row_width" size="small" disabled>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                            <el-form-item label="渠道名称" prop="channelId">
                                <el-select v-model="channelPriceForm.channelId"
                                    :multiple="false"
                                    filterable
                                    clearable
                                    size="small"
                                    popper-class="max-length"
                                    placeholder="请选择或输入渠道名称"
                                    @change="getGroupInfo(channelPriceForm.channelId)"
                                    class="text-dash-show row_width"
                                    :disabled="channelPriceForm.usedCount > 0"
                                    >
                                    <el-option
                                        v-for="(item, index) in groupList"
                                        :key="index"
                                        :label="item.channelName"
                                        :value="item.channelId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="商品名称" prop="skuId">
                                <el-select v-model="channelPriceForm.skuName"
                                    :multiple="false"
                                    filterable
                                    clearable
                                    size="small"
                                    popper-class="max-length"
                                    placeholder="请选择或输入渠道名称"
                                    @focus="getSKUFocus"
                                    @change="getSKUInfo(channelPriceForm.skuId)"
                                    class="text-dash-show row_width"
                                    :disabled="channelPriceForm.usedCount > 0"
                                    >
                                    <el-option
                                        v-for="(item, index) in skuList"
                                        :key="index"
                                        :label="item.skuName"
                                        :value="item.skuId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                          <el-form-item label="渠道价" v-number-decimal-only prop="channelPrice">
                            <el-input type="number" v-model="channelPriceForm.channelPrice" class="row_width" placeholder="请输入渠道价" size="small"></el-input>
                          </el-form-item>
                        </div>
                    </div>

                    <div>
                      <div class="displayStyle">
                        <el-form-item label="分配数量" v-number-decimal-only prop="totalCount">
                          <el-input type="number" v-model="channelPriceForm.totalCount" class="row_width" placeholder="请输入分配数量" size="small" :disabled="channelPriceForm.usedCount > 0" @change="totalCountChange"></el-input>
                        </el-form-item>
                      </div>
                      <div class="displayStyle">
                        <el-form-item label="已用数量" v-number-decimal-only prop="usedCount">
                          <el-input type="number" v-model="channelPriceForm.usedCount" class="row_width" placeholder="请输入已用数量" size="small"></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <div>
                      <div class="displayStyle">
                        <el-form-item label="剩余数量" v-number-decimal-only prop="remainingCount">
                          <el-input type="number" v-model="channelPriceForm.remainingCount" class="row_width" placeholder="请输入剩余数量" size="small" :disabled="channelPriceForm.usedCount > 0"></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                          <el-form-item label="备注：">
                            <el-input type="textarea" :rows="6"
                                      v-model="channelPriceForm.comments" :maxlength="200" placeholder="请输入备注，最多200个字" size="small" style="width:735px;"></el-input>
                            <span style="display:block">{{channelPriceForm.comments.length}}/200</span>
                          </el-form-item>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
        <div>
    </div> 
        <div class="btn-section pt20">
            <el-button  type="primary" @click="savePurchase('channelPriceForm')" size="small">保存</el-button>
            <el-button type="primary" plain size="small"  class="cancel-button" @click="OnBackLatePage('channelPriceForm')">取消</el-button>
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
  name: "channelPriceEdit",
  mixins: [MessageMixins, PlatformMixins, QuitMixins],
  components: {},
  data() {
    //正则校验
    let channelId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择渠道"));
      } else {
        return callback();
      }
    };
    let skuId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择商品"));
      } else {
        return callback();
      }
    };
    let channelPrice = (rule, value, callback) => {
      if (value <= 0) {
        return callback(new Error("渠道价不能小于等于0"));
      } else {
        return callback();
      }
    };
    let totalCount = (rule, value, callback) => {
      if (value <= 0) {
        return callback(new Error("分配数量不能小于等于0"));
      } else {
        return callback();
      }
    };
    return {
      // 需要提交的表单数据
      channelPriceForm: {
        channelId: "",
        channelName: "",
        skuId: "",
        skuName: "",
        productId: "",
        productName: "",
        channelPrice: "",
        totalCount: "",
        comments: "",
        usedCount: "",
        remainingCount: "",
        id: "",
      },
      entityName: "",
      entityId: "",
      groupList: [],
      skuList: [],
      one: '',
      rules: {
        channelId: [
          { required: true, validator: channelId, trigger: "change" }
        ],
        skuId: [{ required: true, validator: skuId, trigger: "change" }],
        channelPrice: [
          { required: true, validator: channelPrice, trigger: "change" }
        ],
        totalCount: [
          { required: true, validator: totalCount, trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    const entityName = sessionStorage.getItem("entityName");
    const entityId = sessionStorage.getItem("entityId");
    this.entityName = entityName;
    this.entityId = entityId;
    this.groupFilter();
    this.getchannelpriceQuery()
  },
  computed: {},
  methods: {
    ...mapActions([
      "channelQueryallbychannelid",
      "channelChannelquery",
      "channelpriceEdit",
      "showPageLoading",
      "hidePageLoading",
      "channelpriceQuery"
    ]),
    getchannelpriceQuery() {
      let parm = {
        id: this.$route.query.id
      };
      this.channelpriceQuery(parm).then(res => {
        this.channelPriceForm = res;
        this.channelPriceForm.channelPrice = this.channelPriceForm.channelPrice / 100
        // console.log(this.channelPlanForm, 887);
      });
    },

    savePurchase(channelPriceForm) {
      this.$refs[channelPriceForm].validate(valid => {
        if (valid) {
          this.channelPriceForm.channelPrice = this.channelPriceForm.channelPrice * 100
          let datas = {};
          datas = this.channelPriceForm;
          this.channelpriceEdit(datas).then(res => {
            this.$message({
                type: 'success',
                message: `编辑成功`
            })
            this.quit(routesMapping.channelPrice, true)
          });
        } else {
          this.showWarning("请填写必填项");
          return false;
        }
      });
    },

    //点击取消
    OnBackLatePage(){
        this.quit(routesMapping.channelPrice,true)
    },
    // 搜索渠道名称
    groupFilter() {
      let par = {
        searchContent: ""
      };
      this.channelChannelquery(par).then(res => {
        this.groupList = res.result;
      });
    },
    getGroupInfo(val) {
      if (this.one && this.one != val) {
        this.channelPriceForm.skuName = ''
        this.channelPriceForm.skuId = ''
        this.channelPriceForm.channelPrice = ''
        this.channelPriceForm.totalCount = ''
        this.channelPriceForm.usedCount = ''
        this.channelPriceForm.remainingCount = ''
      }

      let num = 0
      this.groupList.forEach((item, index) => {
        if (item.channelId == val) {
          this.channelPriceForm.channelId = item.channelId;
          this.channelPriceForm.channelName = item.channelName;
        }
        // if (item.userGroupId == this.entityId) {
        //   this.$refs['channelPriceForm'].resetFields();
        //   this.$message({
        //       type: 'warning',
        //       message: `渠道名称重复清空表单`
        //   })
        // }
        num++
      });
      if (num == this.groupList.length) {
        this.SKUFilter(val);
      }
      this.one = this.channelPriceForm.channelId
    },

    getSKUFocus() {
      if (this.skuList.length == 0) {
        this.$message({
            type: 'warning',
            message: `请重新选择渠道名称，该渠道下无商品`
        })
      }
    },
    // 搜索商品名称
    SKUFilter(val) {
      let par = {
        channelId: val
      };
      this.channelQueryallbychannelid(par).then(res => {
        this.skuList = res.result;
      });
    },
    getSKUInfo(val) {
      this.channelPriceForm.totalCount = ''
      this.channelPriceForm.remainingCount = ''
      this.skuList.forEach((item, index) => {
        if (item.skuId == val) {
          this.channelPriceForm.skuId = item.skuId;
          this.channelPriceForm.skuName = item.skuName;
          this.channelPriceForm.productId = item.productId;
          this.channelPriceForm.productName = item.productName;
        }
      });
      this.channelPriceForm.totalCount = ''
    },
    totalCountChange(val) {
      if (this.channelPriceForm.usedCount == 0) {
        this.channelPriceForm.remainingCount =  val
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
