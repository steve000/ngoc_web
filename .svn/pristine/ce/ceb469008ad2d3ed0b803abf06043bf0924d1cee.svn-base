<template>
    <div class='createPurchase-view'>
        <!-- 基本信息 -->
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper" >
              <el-form label-width="150px" :model="vendorSpuAddForm">
                  <div>
                      <div class="displayStyle">
                          <el-form-item label="供应商名称：">
                            <el-input v-model="vendorSpuAddForm.vendorName" placeholder="请填写供应商名称" class="row_width" size="small" disabled>
                              </el-input>
                          </el-form-item>
                      </div>
                      <div class="displayStyle">
                          <el-form-item label="供应商编码：">
                            <el-input v-model="vendorSpuAddForm.vendorId" placeholder="请填写供应商编码" class="row_width" size="small" disabled>
                              </el-input>
                          </el-form-item>
                      </div>
                  </div>

                  <div>
                      <div class="displayStyle">
                          <el-form-item label="产品名称：">
                            <el-input v-model="vendorSpuAddForm.productName" placeholder="请填写产品名称" class="row_width" size="small" disabled>
                              </el-input>
                          </el-form-item>
                      </div>
                      <div class="displayStyle">
                          <el-form-item label="单位：">
                            <el-input v-model="vendorSpuAddForm.unitId" placeholder="请填写单位" class="row_width" size="small" disabled>
                              </el-input>
                          </el-form-item>
                      </div>
                  </div>

                  <div>
                      <div class="displayStyle">
                          <el-form-item label="采购价（元）：">
                            <el-input v-model="vendorSpuAddForm.price" placeholder="请填写采购价" class="row_width" size="small" disabled>
                              </el-input>
                          </el-form-item>
                      </div>
                  </div>

                  <div>
                    <div class="displayStyle">
                        <el-form-item label="规格：">
                          <el-input type="textarea" :rows="6"
                                    v-model="vendorSpuAddForm.standard" placeholder="请输入规格" size="small" style="width:735px;" disabled></el-input>
                        </el-form-item>
                      </div>
                  </div>
                  <div>
                    <div class="displayStyle">
                        <el-form-item label="简介：">
                          <el-input type="textarea" :rows="6"
                                    v-model="vendorSpuAddForm.introduce" placeholder="请输入简介" size="small" style="width:735px;" disabled></el-input>
                        </el-form-item>
                      </div>
                  </div>
                  <div>
                    <div class="displayStyle">
                        <el-form-item label="备注：">
                          <el-input type="textarea" :rows="6"
                                    v-model="vendorSpuAddForm.remark" :maxlength="200" placeholder="请输入备注，最多200个字" size="small" style="width:735px;" disabled></el-input>
                        </el-form-item>
                      </div>
                  </div>

                  <div class="title" v-if="isShow">
                      <div>产品图片</div>
                  </div>
                  <div class="content-wrapper">
                    <div>
                        <div class="displayStyle" v-for="(item, index) in vendorSpuAddForm.productPicList" :key="index">
                            <img :src="item.picPath" class="avatar" @click="enlarge(item.picPath)" v-if="item.picPath">
                            <el-dialog :visible.sync="dialogVisible">
                              <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                            <div class="textInfo" style="text-align:center;margin-top:10px;" v-if="item.picPath">{{item.picPlace}}</div>
                        </div>
                    </div>
                  </div>
                  <div class="title">
                      <div>审批信息</div>
                  </div>
                  <div class="content-wrapper" >
                    <div>
                      <div class="displayStyle">
                          <el-form-item label="创建人：">
                            <el-input v-model="vendorSpuAddForm.createUserName" placeholder="请填写创建人" class="row_width" size="small" disabled>
                              </el-input>
                          </el-form-item>
                      </div>
                      <div class="displayStyle">
                          <el-form-item label="创建时间：">
                            <el-input v-model="vendorSpuAddForm.createTime" placeholder="请填写创建时间" class="row_width" size="small" disabled>
                              </el-input>
                          </el-form-item>
                      </div>
                    </div>
                    <div>
                      <div class="displayStyle">
                          <el-form-item label="审批人：">
                            <el-input v-model="vendorSpuAddForm.approveUserName" placeholder="请填写审批人" class="row_width" size="small" disabled>
                              </el-input>
                          </el-form-item>
                      </div>
                      <div class="displayStyle">
                          <el-form-item label="审批状态：">
                            <el-input v-model="vendorSpuAddForm.approveStatus" placeholder="请填写审批状态" class="row_width" size="small" disabled>
                              </el-input>
                          </el-form-item>
                      </div>
                    </div>
                    <div>
                      <div class="displayStyle">
                          <el-form-item label="引进人：">
                            <el-input v-model="vendorSpuAddForm.importUserName" placeholder="请填写引进人" class="row_width" size="small" disabled>
                              </el-input>
                          </el-form-item>
                      </div>
                      <div class="displayStyle">
                          <el-form-item label="引进状态：">
                            <el-input v-model="vendorSpuAddForm.importStatus" placeholder="请填写引进状态" class="row_width" size="small" disabled>
                              </el-input>
                          </el-form-item>
                      </div>
                    </div>
                    <div>
                      <div class="displayStyle">
                          <el-form-item label="操作时间：">
                            <el-input v-model="vendorSpuAddForm.operateTime" placeholder="请填写操作时间" class="row_width" size="small" disabled>
                              </el-input>
                          </el-form-item>
                      </div>
                    </div>
                  </div>
              </el-form>
            </div>
        </div>
        <div class="btn-section pt20">
            <el-button size="small"  class="cancel-button" @click="OnBackLatePage">返回</el-button>
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
  name: "vendorSpuDetails",
  mixins: [MessageMixins, PlatformMixins, QuitMixins],
  components: {},
  data() {
    return {
      // 需要提交的表单数据
      vendorSpuAddForm: {
        productPicList: []
      },
      dialogImageUrl: '',
      dialogVisible: false,
      isShow: true
    };
  },
  mounted() {
    this.checkDetailsFun()
  },
  computed: {},
  methods: {
    ...mapActions([
      "purchaseVendorspuQuery",
      "showPageLoading",
      "hidePageLoading",
    ]),
    checkDetailsFun () {
      let datas = {
        id: this.$route.query.id
      }
      this.purchaseVendorspuQuery(datas).then(res => {
        this.vendorSpuAddForm = res
        this.vendorSpuAddForm.productPicList.forEach(item => {
          if (item.picPath) {
            this.isShow = true
          } else {
            this.isShow = false
          }
        })
        this.vendorSpuAddForm.approveStatus == 0 ? this.vendorSpuAddForm.approveStatus = '草稿' : (this.vendorSpuAddForm.approveStatus == 1 ? this.vendorSpuAddForm.approveStatus = '审批通过' : '')
        this.vendorSpuAddForm.importStatus == 0 ? this.vendorSpuAddForm.importStatus = '未引进' : (this.vendorSpuAddForm.importStatus == 1 ? this.vendorSpuAddForm.importStatus = '已引进' : '')
      });
    },
    //点击取消
    OnBackLatePage() {
      this.$message({
        type: "success",
        message: `操作成功`
      });
      this.quit(routesMapping.vendorSpuIndex, true);
    },
    enlarge(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
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
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
