<template>
    <div class='createPurchase-view'>
        <!-- 基本信息 -->
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper" >
                <el-form label-width="150px" :model="vendorEditForm" ref="vendorEditForm">
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="供应商名称：" prop="vendorName">
                              <el-input v-model="vendorEditForm.vendorName" placeholder="请填写供应商名称" type="text" class="row_width" size="small" disabled>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                            <el-form-item label="供应商编码：" prop="vendorNumber">
                              <el-input v-model="vendorEditForm.vendorNumber" placeholder="请填写供应商编码" type="text" class="row_width" size="small" disabled>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                          <div class="displayStyle">
                              <el-form-item label="组织机构代码证号：" prop="orgcertNumber">
                                <el-input v-model="vendorEditForm.orgcertNumber" type="text" placeholder="请填写组织机构代码证号：" class="row_width" size="small" disabled>
                                  </el-input>
                              </el-form-item>
                          </div>
                          <div class="displayStyle">
                              <el-form-item label="税务登记号：" prop="vatRegistrationNum">
                                <el-input v-model="vendorEditForm.vatRegistrationNum" type="text" placeholder="请填写税务登记号" class="row_width" size="small" disabled>
                                  </el-input>
                              </el-form-item>
                          </div>
                      </div>
                      <div>
                          <div class="displayStyle">
                              <el-form-item label="纳税资质：" prop="vatFlag">
                                <el-input v-model="vendorEditForm.vatFlag" placeholder="请填写纳税资质" type="text" class="row_width" size="small" disabled>
                                  </el-input>
                              </el-form-item>
                          </div>
                          <div class="displayStyle">
                              <el-form-item label="所在地区：">
                                <el-input v-model="AddressAll" placeholder="请填写所在地区：" type="text" class="row_width" size="small" disabled>
                                  </el-input>
                              </el-form-item>
                          </div>
                      </div>
                      <div>
                          <div class="displayStyle">
                              <el-form-item label="详细地址：" prop="address">
                                <el-input v-model="vendorEditForm.address" placeholder="请填写详细地址" type="text" class="row_width" size="small" disabled>
                                  </el-input>
                              </el-form-item>
                          </div>
                      </div>
                      <div>
                      <div class="displayStyle">
                          <el-form-item label="备注：">
                            <el-input type="textarea" :rows="6"
                                      v-model="vendorEditForm.comments" :maxlength="200" placeholder="请输入备注，最多200个字" size="small" style="width:735px;" disabled></el-input>
                            <span style="display:block" v-if="vendorEditForm.comments!=null">{{vendorEditForm.comments.length}}/200</span>
                          </el-form-item>
                        </div>
                    </div>

                    <div class="title">
                        <div>联系人信息</div>
                    </div>
                    <div class="content-wrapper" >
                      <div>
                          <div class="displayStyle">
                              <el-form-item label="联系人：" prop="linkman">
                                <el-input v-model="vendorEditForm.linkman" placeholder="请填写联系人" type="text" class="row_width" size="small" disabled>
                                  </el-input>
                              </el-form-item>
                          </div>
                          <div class="displayStyle">
                              <el-form-item label="联系电话：" prop="phoneNum">
                                <el-input v-model="vendorEditForm.phoneNum" placeholder="请填写联系电话" type="text" class="row_width" size="small" disabled>
                                  </el-input>
                              </el-form-item>
                          </div>
                      </div>
                      <!-- <div class="displayStyle">
                          <el-form-item label="备注：">
                            <el-input type="textarea" :rows="6"
                                      v-model="vendorEditForm.linkComments" :maxlength="200" placeholder="请输入备注，最多200个字" size="small" style="width:735px;" disabled></el-input>
                            <span style="display:block">{{vendorEditForm.linkComments.length}}/200</span>
                          </el-form-item>
                        </div> -->
                    </div>

                    <div class="title">
                        <div>账户信息</div>
                    </div>
                    <div class="content-wrapper" >
                      <div>
                          <div class="displayStyle">
                              <el-form-item label="开户行名称：" prop="bankBranchName">
                                <el-input v-model="vendorEditForm.bankBranchName" placeholder="请填写银行开户行名称" type="text" class="row_width" size="small" disabled>
                                  </el-input>
                              </el-form-item>
                          </div>
                          <div class="displayStyle">
                              <el-form-item label="开户行账号：" prop="bankAccountNum">
                                <el-input v-model="vendorEditForm.bankAccountNum" placeholder="请填写开户行账号：" type="text" class="row_width" size="small" disabled>
                                  </el-input>
                              </el-form-item>
                          </div>
                      </div>

                    </div>

             
                </el-form>

            </div>
        </div>
        <div class="btn-section pt20">
            <el-button size="small"  class="cancel-button" @click="OnBackLatePage('vendorEditForm')">返回</el-button>
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
  name: "vendorDetails",
  mixins: [MessageMixins, PlatformMixins, QuitMixins],
  components: {},
  data() {
  
    return {
      // 需要提交的表单数据
      vendorEditForm: {
        comments: ''
      },
      AddressAll: ''
    };
  },
  mounted() {
    this.checkFun();
  },
  computed: {},
  methods: {
    ...mapActions([
      "purchaseVendorQuery",
      "showPageLoading",
      "hidePageLoading"
    ]),
    checkFun() {
      let datas = {
        vendorSeqNo: this.$route.query.vendorSeqNo
      };
      this.purchaseVendorQuery(datas).then(res => {
        this.vendorEditForm = res;
        this.AddressAll = res.province + res.city + res.area
      });
    },
    //点击取消
    OnBackLatePage() {
      this.$message({
        type: "success",
        message: `操作成功`
      });
      this.quit(routesMapping.vendorIndex, true);
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
