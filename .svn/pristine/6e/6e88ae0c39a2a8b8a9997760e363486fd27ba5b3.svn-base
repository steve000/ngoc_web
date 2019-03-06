<template>
    <div class='createPurchase-view'>
        <!-- 基本信息 -->
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper" >
                <el-form label-width="110px" :model="channelPlanForm" :rules="rules" ref="channelPlanForm">
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="操作人">
                                <el-input v-model="entityName" class="row_width" size="small" disabled>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                            <el-form-item label="渠道名称" prop="channelId">
                                <el-select v-model="channelPlanForm.channelName"
                                    disabled
                                    :multiple="false"
                                    filterable
                                    clearable
                                    size="small"
                                    popper-class="max-length"
                                    placeholder="请选择或输入渠道名称"
                                    @clear="clearSkuId()"
                                    @change="getGroupInfo(channelPlanForm.channelId)"
                                    class="text-dash-show row_width"
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
                          <el-form-item label="计划类型" prop="planType">
                            <el-select
                            	disabled
															@change="changePlanType"
                              placeholder="请选择计划类型"
                              size="small"
                              v-model="channelPlanForm.planType">
                                <el-option :value="0" label="年度计划"></el-option>
                                <el-option :value="1" label="月度计划"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                          <el-form-item label="备注：">
                            <el-input type="textarea" :rows="6"
                                      v-model="channelPlanForm.comments" :maxlength="200" placeholder="请输入备注，最多200个字" size="small" style="width:735px;"></el-input>
                            <span style="display:block">{{channelPlanForm.comments.length}}/200</span>
                          </el-form-item>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="content">
            <div class="title">
                <div>计划详情</div>
            </div>
            <div class="addProduct">
                    <el-button plain size="mini" @click="addGoodsMsg"><i class="el-icon-plus"></i>添加计划详情</el-button>
                </div>
            <div class="content-wrapper" style="padding-left: 20px">
                <channel-planList-add :contractData="contractData" :checkProductList="channelPlanForm.planList" @validateEmit="validateEmit">
                </channel-planList-add>
            </div>
        </div>
        <div>
    </div> 
        <div class="btn-section pt20">
            <el-button type="primary" @click="savePurchase('channelPlanForm')" size="small">保存</el-button>
            <el-button type="primary" plain size="small" @click="OnBackLatePage('channelPlanForm')">取消</el-button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import MessageMixins from "~/mixins/messages";
import PlatformMixins from "~/mixins/platform";
import QuitMixins from "~/mixins/quit";
import { routesMapping } from "~/router";
import ChannelPlanListAdd from "~/components/sales/channel/channelPlanListAdd";
export default {
  name: "channelPlanEdit",
  mixins: [MessageMixins, PlatformMixins, QuitMixins],
  components: { ChannelPlanListAdd },
  data() {
    //正则校验
    let channelId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写费用名称!"));
      } else {
        return callback();
      }
    };
    let planType = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        return callback(new Error("请选择计划类型"));
      } else {
        return callback();
      }
    };
    return {
      // 需要提交的表单数据
      channelPlanForm: {
        channelId: "",
        channelName: "",
        planType: "",
        comments: "",
        planList: [
          {
            serialNo: "",
            yearNo: "",
            monthNo: "",
            planTotal: "",
            comments: ""
          }
        ]
      },
      entityName: "",
      entityId: "",
      checkProductList: [],
      contractData: {
        planType: -1,
        validateEmit: true
      },
      groupList: [],
      rules: {
        channelId: [
          { required: true, validator: channelId, trigger: "change" }
        ],
        planType: [{ required: true, validator: planType, trigger: "change" }]
      }
    };
  },
  mounted() {
    this.addGoodsMsg();
    const entityName = sessionStorage.getItem("entityName");
    const entityId = sessionStorage.getItem("entityId");
    this.entityName = entityName;
    this.entityId = entityId;
    this.channelplanQueryCheck();
    // this.groupFilter()
  },
  computed: {},
  methods: {
    ...mapActions([
      "channelChannelquery",
      "channelplanQuery",
      "channelplanEdit",
      "showPageLoading",
      "hidePageLoading"
    ]),
    // // 表格初始化
    addGoodsMsg() {
      this.channelPlanForm.planList.push({
        serialNo: "",
        yearNo: "",
        monthNo: "",
        planTotal: "",
        comments: ""
      });
    },
    channelplanQueryCheck() {
      let parm = {
        id: this.$route.query.id
      };
      this.channelplanQuery(parm).then(res => {
        this.channelPlanForm = res;
        this.contractData.planType = this.channelPlanForm.planType;
        this.channelPlanForm.planList.forEach((item, index) => {
          if (typeof(item.yearNo) == 'number') {
            item.yearNo = item.yearNo + ''
          }
          if (typeof(item.monthNo) == 'number') {
            item.monthNo = item.monthNo + ''
          }
        })
        console.log(this.channelPlanForm, 887);
      });
    },

    savePurchase(channelPlanForm) {
        this.$refs[channelPlanForm].validate(valid => {
          if (valid) {
            if (this.contractData.validateEmit) {

              // this.channelPlanForm.planList = this.checkProductList
              let datas = {};
              datas = this.channelPlanForm;
              let goArr = true;
              if (datas.planType == 0) {
                let yearArr = [];
                datas.planList.forEach(item => {
                  if (item.yearNo) {
                    yearArr.push(item.yearNo);
                  }
                });
                if (yearArr.length) {
                  var nary = yearArr.sort();
                  for (var i = 0; i < datas.planList.length; i++) {
                    if (nary[i] == nary[i + 1]) {
                      // console.log("数组重复内容："+nary[i]);
                      this.$message({
                        type: "warning",
                        message: "请选择不重复年份"
                      });
                      goArr = false;
                    }
                  }
                }
                // console.log(goArr, 777)
              }


              datas.planList.forEach(item => {
                  if (item.planTotal == 0 || item.planTotal == '') {
                      this.showWarning("计划金额不能为0或空");
                      goArr = false;
                  }
              })

              if (goArr) {
                this.channelplanEdit(datas).then(res => {
                  this.OnBackLatePage(channelPlanForm);
                });
              }
            } else {
                this.showWarning("计划详情表单填写不正确，请按提示规则填写");
            }
          } else {
            this.showWarning("请填写必填项");
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
      this.quit(routesMapping.channelPlan, true);
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
      this.groupList.forEach((item, index) => {
        if (item.channelId == val) {
          this.channelPlanForm.channelId = item.channelId;
          this.channelPlanForm.channelName = item.channelName;
        }
        if (item.userGroupId == this.entityId) {
          this.channelPlanForm.planList = [];
        }
      });
    },
    changePlanType(val) {
      this.contractData.planType = val;
    },
    validateEmit(val) {
      this.contractData.validateEmit = val;
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
