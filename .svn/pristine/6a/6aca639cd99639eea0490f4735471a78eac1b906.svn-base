<template>
    <div class='createPurchase-view'>
        <!-- 基本信息 -->
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper" >
                <el-form label-width="150px" :model="vendorRegisterAddForm" :rules="rules" ref="vendorRegisterAddForm">
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="供应商名称：" prop="vendorName">
                              <el-input v-model="vendorRegisterAddForm.vendorName" placeholder="请填写供应商名称" type="text" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>

                    <div>
                        <div class="displayStyle">
                            <el-form-item label="地址：" prop="regionParams">
                              <!-- <el-input v-model="vendorRegisterAddForm.address" placeholder="请填写地址" type="text" class="row_width" size="small">
                                </el-input> -->
                                <RegionSelect @region="regionChange" ref="regionParams" class="row_width"></RegionSelect>  
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                            <el-form-item label="详细地址：" prop="address">
                              <el-input v-model="vendorRegisterAddForm.address" placeholder="请填写详细地址" type="text" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>

                    <div class="title">
                        <div>详细信息</div>
                    </div>
                    <div class="content-wrapper" >
                      <div>
                          <div class="displayStyle">
                              <el-form-item label="组织机构代码证号：" prop="orgcertNumber">
                                <el-input v-model="vendorRegisterAddForm.orgcertNumber" type="number" placeholder="请填写组织机构代码证号" class="row_width" size="small">
                                  </el-input>
                              </el-form-item>
                          </div>
                          <div class="displayStyle">
                              <el-form-item label="税务登记号：" prop="vatRegistrationNum">
                                <el-input v-model="vendorRegisterAddForm.vatRegistrationNum" type="number" placeholder="请填写税务登记号" class="row_width" size="small">
                                  </el-input>
                              </el-form-item>
                          </div>
                      </div>
                      <div>
                          <div class="displayStyle">
                              <el-form-item label="纳税资质：" prop="vatFlag">
                                <el-input v-model="vendorRegisterAddForm.vatFlag" placeholder="请填写纳税资质" type="text" class="row_width" size="small">
                                  </el-input>
                              </el-form-item>
                          </div>
                          <div class="displayStyle">
                              <el-form-item label="银行名称：" prop="bankName">
                                <el-input v-model="vendorRegisterAddForm.bankName" placeholder="请填写银行名称：" type="text" class="row_width" size="small">
                                  </el-input>
                              </el-form-item>
                          </div>
                      </div>
                      <div>
                          <div class="displayStyle">
                              <el-form-item label="银行开户行名称：" prop="bankBranchName">
                                <el-input v-model="vendorRegisterAddForm.bankBranchName" placeholder="请填写银行开户行名称" type="text" class="row_width" size="small">
                                  </el-input>
                              </el-form-item>
                          </div>
                          <div class="displayStyle">
                              <el-form-item label="开户行账号：" prop="bankAccountNum">
                                <el-input v-model="vendorRegisterAddForm.bankAccountNum" placeholder="请填写开户行账号：" type="number" class="row_width" size="small">
                                  </el-input>
                              </el-form-item>
                          </div>
                      </div>
                      <div>
                          <div class="displayStyle">
                              <el-form-item label="开户行户名：" prop="bankAccountName">
                                <el-input v-model="vendorRegisterAddForm.bankAccountName" placeholder="请填写开户行户名" type="text" class="row_width" size="small">
                                  </el-input>
                              </el-form-item>
                          </div>
                      </div>
                    </div>

                    <div class="title">
                        <div>联系信息</div>
                    </div>
                    <div class="content-wrapper" >
                      <div>
                          <div class="displayStyle">
                              <el-form-item label="联系人：" prop="linkman">
                                <el-input v-model="vendorRegisterAddForm.linkman" type="text" placeholder="请填写联系人" class="row_width" size="small">
                                  </el-input>
                              </el-form-item>
                          </div>
                          <div class="displayStyle">
                              <el-form-item label="联系电话：" prop="phoneNum">
                                <el-input v-model="vendorRegisterAddForm.phoneNum" type="number" placeholder="请填写联系电话" class="row_width" size="small">
                                  </el-input>
                              </el-form-item>
                          </div>
                      </div>
                      <div>
                          <div class="displayStyle">
                              <el-form-item label="邮箱：" prop="email">
                                <el-input v-model="vendorRegisterAddForm.email" placeholder="请填写邮箱" type="text" class="row_width" size="small">
                                  </el-input>
                              </el-form-item>
                          </div>
                      </div>
                    </div>

                    <div class="title">
                        <div>登录信息</div>
                    </div>
                    <div class="content-wrapper" >
                      <div>
                          <div class="displayStyle">
                              <el-form-item label="用户：" prop="userName">
                                <el-select :multiple="false" filterable clearable @change="changeUserNameFun" v-model="vendorRegisterAddForm.userName" placeholder="请填写用户" class="row_width" size="small">
                                  <el-option v-for="(one) in userNameList" :key='one.uid' :value='one.uid' :label="one.username"></el-option>
                                </el-select>
                              </el-form-item>
                          </div>
                          <div class="displayStyle">
                              <el-form-item label="实体：" prop="userGroupName">
                                <el-input v-model="vendorRegisterAddForm.userGroupName" type="text" placeholder="请填写实体" class="row_width" size="small" disabled>
                                  </el-input>
                              </el-form-item>
                          </div>
                      </div>
                    </div>
                </el-form>

            </div>
        </div>
        <div class="btn-section pt20">
            <el-button type="primary" @click="savePurchase('vendorRegisterAddForm')" size="small">保存</el-button>
            <el-button type="primary" plain size="small" class="cancel-button" @click="OnBackLatePage('vendorRegisterAddForm')">取消</el-button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import MessageMixins from "~/mixins/messages";
import PlatformMixins from "~/mixins/platform";
import RegionSelect from "~/components/common/RegionSelect";
import QuitMixins from "~/mixins/quit";
import { routesMapping } from "~/router";
export default {
  name: "vendorRegisterAdd",
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
    let orgcertNumber = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请填写组织机构代码证号!'));
        } else {
            return callback();
        }
    }
    let vatRegistrationNum = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请填写税务登记号!'));
        } else {
            return callback();
        }
    }
    let vatFlag = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请填写纳税资质!'));
        } else {
            return callback();
        }
    }
    let bankName = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请填写银行名称!'));
        } else {
            return callback();
        }
    }
    let bankBranchName = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请填写银行开户行名称!'));
        } else {
            return callback();
        }
    }
    let bankAccountNum = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请填写开户行账号!'));
        } else {
            return callback();
        }
    }
    let bankAccountName = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请填写开户行户名!'));
        } else {
            return callback();
        }
    }
    let userName = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请填写用户!'));
        } else {
            return callback();
        }
    }
    let userGroupName = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请填写实体!'));
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
    let phoneNum = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请填写联系电话!'));
        } else if (!/^((1[3-8][0-9])+\d{8})$/.test(value)) {
            return callback(new Error("请正确输入联系电话!"));
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
      vendorRegisterAddForm: {
        vendorId: "",
        vendorNumber: '',
        vendorName: "",
        address: "",
        linkman: "",
        phoneNum: "",
        bankBranchName: "",
        email: "",
        vatFlag: "",
        // vendorType: "",
        bankName: "",
        bankAccountName: "",
        bankAccountNum: "",
        orgcertNumber: "",
        vatRegistrationNum: "",
        userName: "",
        userGroupId: "",
        userId: "",
        userGroupName: "",
        operateUid: '',
        operateUserName: '',
        province: '',
        city: '',
        area: '',
        provinceCode: '',
        cityCode: '',
        areaCode: '',
        password: '',
      },
      userNameList: [],
      rules: {
          vendorName: [{required: true, validator: vendorName, trigger: 'change'}],
          address: [{required: true, validator: address, trigger: 'change'}],
          orgcertNumber: [{required: true, validator: orgcertNumber, trigger: 'change'}],
          vatRegistrationNum: [{required: true, validator: vatRegistrationNum, trigger: 'change'}],
          vatFlag: [{required: true, validator: vatFlag, trigger: 'change'}],
          bankName: [{required: true, validator: bankName, trigger: 'change'}],
          bankBranchName: [{required: true, validator: bankBranchName, trigger: 'change'}],
          bankAccountNum: [{required: true, validator: bankAccountNum, trigger: 'change'}],
          bankAccountName: [{required: true, validator: bankAccountName, trigger: 'change'}],
          userName: [{required: true, validator: userName, trigger: 'change'}],
          userGroupName: [{required: true, validator: userGroupName, trigger: 'change'}],
          email: [{required: true, validator: email, trigger: 'change'}],
          phoneNum: [{required: true, validator: phoneNum, trigger: 'change'}],
          regionParams: [{required: true, validator: regionParams, trigger: 'blur'}],

      },
      AddressParams: {
        area: [],
        areaCode: [],
      },
    };
  },
  mounted() {
    this.checkAddFun()
  },
  computed: {},
  methods: {
    ...mapActions([
      "purchaseVendorregisterQuery",
      "sysUserQueryall",
      "purchaseVendorImport",
      "showPageLoading",
      "hidePageLoading",
    ]),
    checkAddFun() {
      let datas = {
        id: this.$route.query.id
      }
      this.purchaseVendorregisterQuery(datas).then(res => {
        for (var x in res) {
            for (var y in this.vendorRegisterAddForm) {
                if ( x == y ) {
                    this.vendorRegisterAddForm[y] = res[x]
                }
            }
        }
        this.vendorRegisterAddForm.vendorId = res.id

        const obj = Object.assign({}, {
            checkedItems: [res.provinceCode, res.cityCode, res.areaCode],
        })
        this.$refs.regionParams.checkedItems = obj.checkedItems
      }).then(next => {
        if (this.vendorRegisterAddForm.userName) {
          let par = {
            // userName: this.vendorRegisterAddForm.userName,
            userName: '',
          }
          this.sysUserQueryall(par).then(res => {
            this.userNameList = res.result
            this.userNameList.forEach((item, index) => {
              if (this.vendorRegisterAddForm.userName == item.username) {

                this.vendorRegisterAddForm.userGroupId = item.userGroupList[0].userGroupId
                this.vendorRegisterAddForm.userGroupName = item.userGroupList[0].groupName
              }
            })
          }) 
        }
      });
    },
    changeUserNameFun (val) {
      this.userNameList.forEach((item, index) => {
        if (val == item.uid) {
          this.vendorRegisterAddForm.userId = item.uid
          this.vendorRegisterAddForm.userName = item.username
          this.vendorRegisterAddForm.userGroupId = item.userGroupList[0].userGroupId
          this.vendorRegisterAddForm.userGroupName = item.userGroupList[0].groupName
        }
      })
    },
    savePurchase(vendorRegisterAddForm) {
      this.$refs[vendorRegisterAddForm].validate((valid) => {
        if (valid) {

          if (!this.AddressParams.areaCode.length || !this.AddressParams.area.length) {
            this.$message({
              type: "warning",
              message: `请选择所在地区`
            });
          } else {
            this.vendorRegisterAddForm.province = this.AddressParams.area[0]
            this.vendorRegisterAddForm.city = this.AddressParams.area[1]
            this.vendorRegisterAddForm.area = this.AddressParams.area[2]
            this.vendorRegisterAddForm.provinceCode = this.AddressParams.areaCode[0]
            this.vendorRegisterAddForm.cityCode = this.AddressParams.areaCode[1]
            this.vendorRegisterAddForm.areaCode = this.AddressParams.areaCode[2]
            // this.vendorRegisterAddForm.operateUserName = this.vendorRegisterAddForm.userName
            // this.vendorRegisterAddForm.operateUid = this.vendorRegisterAddForm.userId
            this.vendorRegisterAddForm.operateUserName = sessionStorage.getItem('userName')
            this.vendorRegisterAddForm.operateUid = sessionStorage.getItem('userId')
            let datas = {};
            datas = this.vendorRegisterAddForm;
            this.purchaseVendorImport(datas).then(res => {
              this.$message({
                type: "success",
                message: `供应商审批引进成功`
              });
              this.OnBackLatePage(vendorRegisterAddForm);
            });
          }

        } else {
          this.showWarning("请填写必填项");
          return false;
        }
      });
    },
    //点击取消
    OnBackLatePage(vendorRegisterAddForm) {
      this.$refs[vendorRegisterAddForm].resetFields();
      this.quit(routesMapping.vendorRegisterIndex, true);
    },
    regionChange(region, regionName) {
      this.AddressParams.area = regionName;
      this.AddressParams.areaCode = region;
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
