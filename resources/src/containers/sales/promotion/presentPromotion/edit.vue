<template>
    <div class='createPurchase-view'>
        <!-- 基本信息 -->
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper" >
                <el-form label-width="110px" :model="presentPromotionForm" ref="presentPromotionForm" :rules="rules">
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="促销标题：">
                                <el-input v-model="presentPromotionForm.promotionTitle" placeholder="请填写促销标题" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                          <el-form-item label="">
                            <el-checkbox v-model="presentPromotionForm.isCtrlUseArea" disabled>控制赠劵使用范围</el-checkbox>
                          </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                          <el-form-item label="开始时间：" prop="beginTime">
                            <el-date-picker
                            v-model="presentPromotionForm.beginTime"
                            type="datetime"
                            class="row_width" 
                            size="small"
                            :editable="false"
                            placeholder="选择日期时间"
                            :default-time="['00:00:00']"
                            value-format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>
                          </el-form-item>
                        </div>  
                        <div class="displayStyle">       
                          <el-form-item label="结束时间：" prop="endTime">
                            <el-date-picker
                            v-model="presentPromotionForm.endTime"
                            type="datetime" 
                            size="small"
                            :editable="false"            
                            placeholder="选择日期时间"
                            :default-time="['23:59:59']"
                            value-format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>        
                          </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="业务实体：" prop="userGroupId">
                                <el-select v-model="presentPromotionForm.groupName"
                                    :multiple="false"
                                    filterable
                                    clearable
                                    size="small"
                                    popper-class="max-length"
                                    placeholder="请选择或输入业务实体"
                                    @clear="clearSkuId()"
                                    @change="getGroupInfo(presentPromotionForm.userGroupId)"
                                    class="text-dash-show row_width"
                                    >
                                    <el-option
                                        v-for="(item) in groupList"
                                        :key="item.userGroupId"
                                        :label="item.groupName"
                                        :value="item.userGroupId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                            <el-form-item label="促销详情描述：">
                                <el-input v-model="presentPromotionForm.descriptions" placeholder="请填写促销详情描述" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                          <el-form-item label="备注：">
                            <el-input type="textarea" :rows="6"
                                      v-model="presentPromotionForm.remark" :maxlength="200" placeholder="请输入备注，最多200个字" size="small" style="width:735px;"></el-input>
                            <span style="display:block">{{presentPromotionForm.remark.length}}/200</span>
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
            <div class="content-wrapper" style="padding-left: 20px">
                <product-list :isCtrlUseArea="presentPromotionForm.isCtrlUseArea" :checkProductList="presentPromotionForm.couponList" :checkProductList2="presentPromotionForm.skuList">
                </product-list>
            </div>
        </div>
        <div class="btn-section pt20">
            <el-button  class="cancel-button" @click="savePurchase('presentPromotionForm')" size="small">保存</el-button>
            <el-button size="small"  class="cancel-button" @click="cancelFunction('presentPromotionForm')">取消</el-button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import MessageMixins from "~/mixins/messages";
import PlatformMixins from "~/mixins/platform";
import QuitMixins from "~/mixins/quit";
import { routesMapping } from "~/router";
import ProductList from "~/containers/sales/promotion/presentPromotionProductList";
export default {
  name: "presentPromotionEdit",
  mixins: [MessageMixins, PlatformMixins, QuitMixins],
  components: { ProductList },
  data() {
    // 正则校验
    let beginTime = (rule, value, callback) => {
        let now = new Date()
        let time = new Date(value)
        if (!value) {
            return callback(new Error('请选择开始时间!'));
        } else if (time.getTime() < now.getTime()) {
            return callback(new Error('请选择晚于当前时间'));
        } else {
            return callback();
        }
    }
    let endTime = (rule, value, callback) => {
        let now = new Date()
        let time = new Date(value)
        let beginTime = new Date(this.presentPromotionForm.beginTime)
        if (!value) {
            return callback(new Error('请选择结束时间!'));
        } else if (time.getTime() < now.getTime()) {
            return callback(new Error('请选择晚于当前时间'));
        } else if (time.getTime() < beginTime.getTime()) {
            return callback(new Error('请选择晚于开始时间'));
        } else {
            return callback();
        }
    }
    let userGroupId = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请选择业务实体!'));
        } else {
            return callback();
        }
    }
    return {
      // 需要提交的表单数据
      presentPromotionForm: {
        id: null,
        promotionNo: "",
        promotionTitle: "",
        isCtrlUseArea: null,
        promotionType: "",
        beginTime: "",
        endTime: "",
        userGroupId: "",
        groupName: "",
        createUsername: "",
        createTime: "",
        accountUsername: "",
        approveUsername: "",
        approveStatus: null,
        descriptions: "",
        status: null,
        remark: "",
        skuList: [
          {
            id: null,
            promotionNo: "",
            skuId: null,
            skuName: ""
          }
        ],
        couponList: [
          {
            id: null,
            promotionNo: "",
            needTotal: null,
            descTotal: null,
            beginTime: "",
            endTime: ""
          }
        ]
      },
      groupList: [],
      rules: {
          beginTime: [{required: true, validator: beginTime, trigger: 'change'}],
          endTime:[{required: true, validator: endTime, trigger: 'change'}],
          userGroupId:[{required: true, validator: userGroupId, trigger: 'change'}],
      },
    };
  },
  mounted() {
    this.getPresentPromotionInfo();
    this.groupFilter()
  },
  computed: {},
  methods: {
    ...mapActions([
      "userGroupAll",
      "presentPromotionInfo",
      "presentPromotionEdit",
      "SearchGoodsList",
      "showPageLoading",
      "hidePageLoading"
    ]),
    getPresentPromotionInfo() {
      let datas = {
        id: this.$route.params.id
      };
      this.presentPromotionInfo(datas).then(res => {
        for (var x in res) {
            for (var y in this.presentPromotionForm) {
                if ( x == y ) {
                    this.presentPromotionForm[y] = res[x]
                }
            }
        }
                this.presentPromotionForm.isCtrlUseArea == 1 ? this.presentPromotionForm.isCtrlUseArea = true : this.presentPromotionForm.isCtrlUseArea = false
                this.presentPromotionForm.couponList.forEach(item => {
                    item.needTotal = item.needTotal / 100
                    item.descTotal = item.descTotal / 100
                })
      });
    },

    savePurchase(presentPromotionForm) {

      this.$refs[presentPromotionForm].validate((valid) => {
          if (valid) {
              let goArr = true

              if (this.presentPromotionForm.couponList.length > 0) {
                  // let newArr = []
                  this.presentPromotionForm.couponList.forEach(item => {
                        let now = new Date()
                        let time = new Date(item.beginTime)
                        let time2 = new Date(item.endTime)
                      if (item.needTotal === '' || item.needTotal === undefined) {
                          this.$message({
                              type: 'warning',
                              message: '商品清单金额不能为空'
                          }); 
                          goArr = false
                      } else if (item.needTotal <= 0 || item.descTotal <= 0) {
                          this.$message({
                              type: 'warning',
                              message: '商品清单满足金额，赠送金额，必须大于0'
                          }); 
                          goArr = false
                      } else if (item.needTotal < item.descTotal) {
                          this.$message({
                              type: 'warning',
                              message: '商品清单赠送金额必须小于满足金额'
                          }); 
                          goArr = false
                      } else if (!item.beginTime || !item.endTime) {
                          this.$message({
                              type: 'warning',
                              message: '商品清单时间不能为空'
                          }); 
                          goArr = false
                      } else if (time.getTime() < now.getTime() || time2.getTime() < now.getTime()) {
                          this.$message({
                              type: 'warning',
                              message: '商品清单请选择晚于当前时间'
                          }); 
                          goArr = false
                      } else if (time2.getTime() < time.getTime()) {
                          this.$message({
                              type: 'warning',
                              message: '商品清单请选择晚于开始时间'
                          }); 
                          goArr = false
                      } else {
                          // newArr.push(item.skuName)
                          // var nary=newArr.sort(); 
                          // for(var i=0;i<this.presentPromotionForm.couponList.length;i++){
                          //     if (nary[i]==nary[i+1]){
                          //         // console.log("数组重复内容："+nary[i]);
                          //         this.$message({
                          //             type: 'warning',
                          //             message: '请选择不重复商品'
                          //         });
                          //         goArr = false
                          //     }
                          // }
                      }
                  })
              } else if (this.presentPromotionForm.couponList.length == 0) {
                  this.$message({
                      type: 'warning',
                      message: '商品清单赠卷信息不能为空'
                  }); 
                  goArr = false
              } 
              if (this.presentPromotionForm.isCtrlUseArea) {

                  if (this.presentPromotionForm.skuList.length > 0) {
                      let newArr = []
                      this.presentPromotionForm.skuList.forEach(item => {
                          if (!item.skuName) {
                              this.$message({
                                  type: 'warning',
                                  message: '商品清单商品名称不能为空'
                              }); 
                              goArr = false
                          } else if (item.skuName) {
                            newArr.push(item.skuName)
                        }
                      })
                      if (newArr.length) {
                            var nary=newArr.sort(); 
                            for(var i=0;i<this.presentPromotionForm.skuList.length;i++){
                                if (nary[i]==nary[i+1]){
                                    // console.log("数组重复内容："+nary[i]);
                                    this.$message({
                                        type: 'warning',
                                        message: '商品清单请选择不重复商品'
                                    });
                                    goArr = false
                                }
                            }
                      }
                  } else if (this.presentPromotionForm.skuList.length == 0) {
                      this.$message({
                          type: 'warning',
                          message: '商品清单不能为空'
                      }); 
                      goArr = false
                  }
                  
              }


              if (goArr) {

                this.presentPromotionForm.couponList.forEach(item => {
                    item.needTotal = item.needTotal * 100
                    item.descTotal = item.descTotal * 100
                })

                let datas = {};
                datas = this.presentPromotionForm;
                datas.isCtrlUseArea
                  ? (datas.isCtrlUseArea = 1)
                  : (datas.isCtrlUseArea = 0);
                this.presentPromotionEdit(datas).then(res => {
                  this.OnBackLatePage();
                });

              }
          
          } else {
              this.$message({
                  type: 'warning',
                  message: '请填写必填项'
              });
          return false;
          }
      });
      
    },


    // 取消提交表单
    cancelFunction (presentPromotionForm) {
        this.$refs[presentPromotionForm].resetFields();
        this.OnBackLatePage()
    },
    //点击取消
    OnBackLatePage() {
      this.$message({
        type: 'success',
        message: `操作成功`
      })
      this.quit(routesMapping.presentPromotion, true);
    },
    // 搜索业务实体
    groupFilter(string){
      let par = {
      status: 1,  // 状态启用
      }
      this.userGroupAll(par).then(res => {
          this.groupList = res.result;
      });
    },
    getGroupInfo(val){
        this.groupList.forEach((item, index) => {
            if (item.userGroupId == val) {
                this.presentPromotionForm.userGroupId = item.userGroupId
                this.presentPromotionForm.groupName = item.groupName
            }
        })
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
