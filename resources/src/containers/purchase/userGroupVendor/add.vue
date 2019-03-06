<template>
    <div class='createPurchase-view'>
        <!-- 基本信息 -->
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper" >
              <el-form label-width="110px" :model="userGroupVendorForm" :rules="userGroupVendorValidate" ref="userGroupVendorForm">
                  <div>
                      <div class="displayStyle">
                          <el-form-item label="操作人：">
                            <el-input v-model="userName" placeholder="请填写操作人" type="text" class="row_width" size="small" disabled>
                              </el-input>
                          </el-form-item>
                      </div>
                  </div>
                  <div>
                    <div class="displayStyle">
                          <el-form-item label="供应商名称：" prop="vendorName">
                            <el-select :multiple="false" filterable clearable @change="changeVendorNameFun" v-model="userGroupVendorForm.vendorName" placeholder="请填写供应商名称" class="row_width" size="small">
                                <el-option v-for="(item, index) in vendorNameList" :key='index' :value='item.vendorId' :label="item.vendorName"></el-option>
                              </el-select>
                          </el-form-item>
                      </div>
                      <div class="displayStyle">
                          <el-form-item label="供应商编码：">
                            <el-input v-model="vendorNumber" placeholder="请填写供应商编码" type="text" class="row_width" size="small" disabled>
                              </el-input>
                          </el-form-item>
                      </div>
                  </div>
         
                  <div>
                    <div class="displayStyle">
                        <el-form-item label="备注：">
                          <el-input type="textarea" :rows="6"
                                    v-model="userGroupVendorForm.comment" :maxlength="200" placeholder="请输入备注，最多200个字" size="small" style="width:735px;"></el-input>
                          <span style="display:block">{{userGroupVendorForm.comment.length}}/200</span>
                        </el-form-item>
                      </div>
                  </div>
              </el-form>
            </div>
        </div>
        <div class="btn-section pt20" style="text-align:center">
            <el-button  type="primary" @click="savePurchase('userGroupVendorForm')" size="small">保存</el-button>
            <el-button type="primary" plain size="small"  class="cancel-button" @click="OnBackLatePage('userGroupVendorForm')">取消</el-button>
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
  name: "userGroupVendorAdd",
  mixins: [MessageMixins, PlatformMixins, QuitMixins],
  components: {},
  data() {
    //正则校验
    let vendorName = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请填写供应商名称!'));
        } else {
            return callback();
        }
    }
    return {
      // 需要提交的表单数据
      userGroupVendorForm: {
        vendorSeqNo: "",
        userGroupId: "",
        dataStatus: 1,
        comment: "",
      },
      userName: '',
      vendorNumber: '',
      vendorNameList: [],
      userGroupVendorValidate: {
          vendorName: [{required: true, validator: vendorName, trigger: 'change'}],
      },
    };
  },
  mounted() {
    this.userName = sessionStorage.getItem('userName')
    this.userGroupVendorForm.userGroupId = sessionStorage.getItem('entityId')
     this.getVendorNameListFun()
  },
  computed: {},
  methods: {
    ...mapActions([
      "purchaseUsergroupvendorQuerynotbindlist",
      "purchaseUsergroupvendorAdd",
      "showPageLoading",
      "hidePageLoading",
    ]),
    getVendorNameListFun() {
      let obj = {
        vendorEnableFlag: 1
      }
      this.purchaseUsergroupvendorQuerynotbindlist(obj).then(res => {
        this.vendorNameList = res.result
      })
    },
    changeVendorNameFun(val) {
      this.vendorNameList.forEach((item, index) => {
        if (val == item.vendorId) {
          this.userGroupVendorForm.vendorSeqNo = item.vendorSeqNo
          this.vendorNumber = item.vendorNumber
        }
      })
    },
    savePurchase(Form) {
      if (Form == 'userGroupVendorForm') {
        this.$refs[Form].validate((valid) => {
          if (valid) {
            let datas = {};
            datas = this.userGroupVendorForm;
            delete datas.vendorName
            this.purchaseUsergroupvendorAdd(datas).then(res => {
              this.OnBackLatePage(Form);
            });
          } else {
            this.showSuccess("请填写必填项");
            return false;
          }
        });
      }
    },
    //点击取消
    OnBackLatePage(Form) {
      this.$message({
        type: "success",
        message: `操作成功`
      });
      this.$refs[Form].resetFields();
      this.quit(routesMapping.userGroupVendorIndex, true);
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


  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 85px;
    height: 85px;
    line-height: 85px;
    text-align: center;
  }
  .avatar {
    width: 85px;
    height: 85px;
    display: block;
  }

}
</style>
