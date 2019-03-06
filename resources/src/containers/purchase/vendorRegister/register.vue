<template>
    <div class='createPurchase-view'>
        <!-- 基本信息 -->
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper" >
                <el-form label-width="110px" :model="vendorRegisterRegisterForm" :rules="rules" ref="vendorRegisterRegisterForm">
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="供应商名称：" prop="vendorName">
                              <el-input v-model="vendorRegisterRegisterForm.vendorName" placeholder="请填写供应商名称" type="text" :maxlength="128" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                              <el-form-item label="所在地区：" prop="regionParams">
                                <RegionSelect @region="regionChange" ref="regionParams" class="row_width"></RegionSelect>  
                              </el-form-item>
                          </div>
                        <div class="displayStyle">
                            <el-form-item label="地址：" prop="address">
                              <el-input v-model="vendorRegisterRegisterForm.address" placeholder="请填写地址" :maxlength="100" type="text" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                          <el-form-item label="简介：" prop="introduce">
                            <el-input type="textarea" :rows="6"
                                      v-model="vendorRegisterRegisterForm.introduce" :maxlength="200" placeholder="请输入简介，200字以内" size="small" style="width:735px;"></el-input>
                            <span style="display:block">{{vendorRegisterRegisterForm.introduce.length}}/200</span>
                          </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                          <el-form-item label="备注：">
                            <el-input type="textarea" :rows="6"
                                      v-model="vendorRegisterRegisterForm.comments" :maxlength="200" placeholder="请输入备注，最多200个字" size="small" style="width:735px;"></el-input>
                            <span style="display:block">{{vendorRegisterRegisterForm.comments.length}}/200</span>
                          </el-form-item>
                        </div>
                    </div>

                    <div class="title">
                        <div>联系信息</div>
                    </div>
                    <div class="content-wrapper" >
                      <div>
                          <div class="displayStyle">
                              <el-form-item label="联系人：" prop="linkman">
                                <el-input v-model="vendorRegisterRegisterForm.linkman" type="text" :maxlength="48" placeholder="请填写联系人" class="row_width" size="small">
                                  </el-input>
                              </el-form-item>
                          </div>
                          <div class="displayStyle">
                              <el-form-item label="联系电话：" prop="phoneNum">
                                <el-input v-model="vendorRegisterRegisterForm.phoneNum" :maxlength="11" v-number-only placeholder="请填写联系电话" class="row_width" size="small">
                                  </el-input>
                              </el-form-item>
                          </div>
                      </div>
                      <div>
                          <div class="displayStyle">
                              <el-form-item label="邮箱：" prop="email">
                                <el-input v-model="vendorRegisterRegisterForm.email" placeholder="请填写邮箱" type="text" class="row_width" size="small">
                                  </el-input>
                              </el-form-item>
                          </div>
                      </div>
                    </div>

                </el-form>

            </div>
        </div>
        <div class="btn-section pt20">
            <el-button type="primary" @click="savePurchase('vendorRegisterRegisterForm')" size="small">保存</el-button>
            <el-button type="primary" plain size="small"  class="cancel-button" @click="OnBackLatePage('vendorRegisterRegisterForm')">取消</el-button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import MessageMixins from "~/mixins/messages";
import PlatformMixins from "~/mixins/platform";
import { directives } from '~/utils/directives/index'
import RegionSelect from "~/components/common/RegionSelect";
import QuitMixins from "~/mixins/quit";
import { routesMapping } from "~/router";
export default {
  name: "vendorRegisterRegister",
  mixins: [MessageMixins, PlatformMixins, QuitMixins],
  components: {RegionSelect},
  data() {
    //正则校验
    let vendorName = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请填写供应商名称!'));
        } else {
            return callback();
        }
    }
    let address = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请填写地址!'));
        } else {
            return callback();
        }
    }
    let linkman = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请填写联系人!'));
        } else {
            return callback();
        }
    }
    let phoneNum = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请填写联系电话!'));
        } else if (!/^((1[3-8][0-9])+\d{8})$/.test(value)) {
            return callback(new Error("请正确输入联系电话!"));
        } else {
            return callback();
        }
    }
    let email = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请填写邮箱!'));
        } else if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
          return callback(new Error("请正确填写邮箱!"));
        } else {
            return callback();
        }
    }
    let introduce = (rule, value, callback) => {
        if (value.length>200) {
            return callback(new Error('最多输入200个字!'));
        } else {
            return callback();
        }
    }
    let comments = (rule, value, callback) => {
        if (value.length>200) {
            return callback(new Error('最多输入200个字!'));
        } else {
            return callback();
        }
    }
    let regionParams = (rule, value, callback) => {
        if (!this.AddressParams.areaCode.length || !this.AddressParams.area.length) {
            return callback(new Error('请选择所在地区!'));
        } else {
            return callback();
        }
    }
    

    return {
      // 需要提交的表单数据
      vendorRegisterRegisterForm: {
        vendorName: "",
        address: "",
        introduce: "",
        comments: "",
        linkman: "",
        email: "",
        phoneNum: ""
      },
      rules: {
          vendorName: [{required: true, validator: vendorName, trigger: 'change'}],
          address: [{required: true, validator: address, trigger: 'change'}],
          linkman: [{required: true, validator: linkman, trigger: 'change'}],
          phoneNum: [{required: true, validator: phoneNum, trigger: 'change'}],
          email: [{required: true, validator: email, trigger: 'change'}],
          introduce: [{required: true, validator: introduce, trigger: 'change'}],
          comments: [{required: true, validator: comments, trigger: 'change'}],
          regionParams: [{required: true, validator: regionParams, trigger: 'blur'}],
          
      },
       AddressParams: {
        area: [],
        areaCode: [],
      },
    };
  },
  mounted() {
  },
  computed: {},
  methods: {
    ...mapActions([
      "purchaseVendorregisterRegister",
      "showPageLoading",
      "hidePageLoading",
    ]),
    savePurchase(vendorRegisterRegisterForm) {
      this.$refs[vendorRegisterRegisterForm].validate((valid) => {
        if (valid) {
          if (!this.AddressParams.areaCode.length || !this.AddressParams.area.length) {
            this.$message({
              type: "warning",
              message: `请选择所在地区`
            });
          } else {
            this.vendorRegisterRegisterForm.province = this.AddressParams.area[0]
            this.vendorRegisterRegisterForm.city = this.AddressParams.area[1]
            this.vendorRegisterRegisterForm.area = this.AddressParams.area[2]
            this.vendorRegisterRegisterForm.provinceCode = this.AddressParams.areaCode[0]
            this.vendorRegisterRegisterForm.cityCode = this.AddressParams.areaCode[1]
            this.vendorRegisterRegisterForm.areaCode = this.AddressParams.areaCode[2]
            let datas = {};
            datas = this.vendorRegisterRegisterForm;
            this.purchaseVendorregisterRegister(datas).then(res => {
              this.$message({
                type: "success",
                message: `供应商注册` + res.msg
              });
              this.$router.push(`/purchase/vendorRegisterIndex`);
            }).catch((err) => {
              this.$message({
                type: "warning",
                message: `供应商注册` + err.msg
              });
            });
          }
        } else {
          this.showWarning("请填写必填项");
          return false;
        }
      });
    },
    //点击取消
    OnBackLatePage(vendorRegisterRegisterForm) {
      this.$router.push(`/purchase/vendorRegisterRegister`);
    },
    regionChange(region, regionName) {
      this.AddressParams.area=regionName;
      this.AddressParams.areaCode=region;
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
