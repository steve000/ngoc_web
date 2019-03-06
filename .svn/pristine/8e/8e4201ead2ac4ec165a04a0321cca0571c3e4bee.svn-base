<template>
    <div class='createPurchase-view'>
        <!-- 基本信息 -->
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper" >
                <el-form label-width="110px" :model="conGroupPromotionForm" ref="conGroupPromotionForm" :rules="rules">
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="促销标题：">
                                <el-input v-model="conGroupPromotionForm.promotionTitle" placeholder="请填写促销标题" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                            <el-form-item label="条件类型：">
                                <el-select v-model="conGroupPromotionForm.conditionType" disabled class="row_width" size="small">
                                    <el-option  :value='0' label='按数量'></el-option>
                                    <el-option  :value='1' label='按金额'></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                          <el-form-item label-width="0px">
                            <el-checkbox v-model="conGroupPromotionForm.isBillPro" disabled>整单满减</el-checkbox>
                          </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                          <el-form-item label="开始时间：" prop="beginTime">
                            <el-date-picker
                            v-model="conGroupPromotionForm.beginTime"
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
                            v-model="conGroupPromotionForm.endTime"
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
                                <el-select v-model="conGroupPromotionForm.groupName"
                                    :multiple="false"
                                    filterable
                                    clearable
                                    size="small"
                                    popper-class="max-length"
                                    placeholder="请选择或输入业务实体"
                                    @clear="clearSkuId()"
                                    @change="getGroupInfo(conGroupPromotionForm.userGroupId)"
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
                                <el-input v-model="conGroupPromotionForm.descriptions" placeholder="请填写促销详情描述" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                          <el-form-item label="备注：">
                            <el-input type="textarea" :rows="6"
                                      v-model="conGroupPromotionForm.remark" :maxlength="200" placeholder="请输入备注，最多200个字" size="small" style="width:735px;"></el-input>
                            <span style="display:block">{{conGroupPromotionForm.remark.length}}/200</span>
                          </el-form-item>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="content">
            <!-- <div class="title">
                <div>商品清单</div>
            </div> -->
            <div class="content-wrapper" style="padding-left: 20px">
                <product-list :promotionType="conGroupPromotionForm.conditionType" :isBillPro="conGroupPromotionForm.isBillPro" :checkProductList="conGroupPromotionForm.resultList" :checkProductList2="conGroupPromotionForm.skuList">
                </product-list>
            </div>
        </div>
        <div class="content" style="padding:20px 20px 0 20px;">
        <h4>说明</h4>
        <el-input
            style='color:#000;' 
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            :disabled='true'
            v-model="explainTexter"
        ></el-input>
        </div>
        <div class="btn-section pt20">
            <el-button  class="cancel-button" @click="savePurchase('conGroupPromotionForm')" size="small">保存</el-button>
            <el-button size="small"  class="cancel-button" @click="cancelFunction('conGroupPromotionForm')">取消</el-button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import MessageMixins from "~/mixins/messages";
import PlatformMixins from "~/mixins/platform";
import QuitMixins from "~/mixins/quit";
import { routesMapping } from "~/router";
import ProductList from "~/containers/sales/promotion/conGroupPromotionProductList";
export default {
  name: "conGroupPromotionEdit",
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
        let beginTime = new Date(this.conGroupPromotionForm.beginTime)
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
      conGroupPromotionForm: {
        conditionType: "",
        id: null,
        promotionNo: "",
        promotionTitle: "",
        beginTime: "",
        endTime: "",
        userGroupId: "",
        groupName: "",
        descriptions: "",
        remark: "",
        skuList: [
          {
            buyCount: null,
            buyTotal: null,
            id: null,
            skuId: null,
            skuName: ""
          }
        ],
        resultList: [
          {
            id: null,
            skuId: null,
            skuName: "",
            descType: null,
            descPrice: null,
            descRate: null,
          }
        ],
        isBillPro: null
      },
      explainTexter:'[折扣]字段说明:当优惠类型为1--按优惠折扣时有效,指的是按照原价的百分之多少计算促销价格;例如:如果希望打八折则填写80,希望打九折则填写90',
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
      "conGroupPromotionInfo",
      "conGroupPromotionEdit",
      "SearchGoodsList",
      "showPageLoading",
      "hidePageLoading"
    ]),
    getPresentPromotionInfo() {
      let datas = {
        id: this.$route.query.id
      };
      this.conGroupPromotionInfo(datas).then(res => {
        console.log(res, 333)
        res.conditionType = +res.conditionType
        res.resultList.forEach(item => {
            item.descType = +item.descType
        })
        console.log(res, 222)
        // res.conditionType == 0 ? this.conGroupPromotionForm.promotionType = '按数量' : ''
        for (var x in res) {
            for (var y in this.conGroupPromotionForm) {
                if ( x == y ) {
                    this.conGroupPromotionForm[y] = res[x]
                }
            }
        }
        console.log(this.conGroupPromotionForm, 11)
        if(res.resultList.length<1){
            this.conGroupPromotionForm.resultList.push({skuId:null,skuName:null});
        }
        if(res.skuList.length<1){
            this.conGroupPromotionForm.skuList.push({skuId:null,skuName:null})
        }
        
        this.conGroupPromotionForm.isBillPro == 1 ? this.conGroupPromotionForm.isBillPro = true : this.conGroupPromotionForm.isBillPro = false
        this.conGroupPromotionForm.skuList.forEach(item => {
            item.buyTotal = item.buyTotal / 100
        })
        this.conGroupPromotionForm.resultList.forEach(item => {
            item.descPrice = item.descPrice / 100
        })
      });
    },

    savePurchase(conGroupPromotionForm) {

      this.$refs[conGroupPromotionForm].validate((valid) => {
          if (valid) {
              let goArr = true

              if (this.conGroupPromotionForm.skuList.length > 0) {
                  let newArr = []
                  this.conGroupPromotionForm.skuList.forEach(item => {
                      if (!item.skuName) {
                          this.$message({
                              type: 'warning',
                              message: '商品名称不能为空'
                          }); 
                          goArr = false
                      } else if (item.buyCount < 0 || item.buyTotal < 0) {
                          this.$message({
                              type: 'warning',
                              message: '数量，金额，不能小于0'
                          }); 
                          goArr = false
                      } else if (item.skuName) {
                            newArr.push(item.skuName)
                        }
                  })
                  if (newArr.length) {
                        var nary=newArr.sort(); 
                        for(var i=0;i<this.conGroupPromotionForm.skuList.length;i++){
                            if (nary[i]==nary[i+1]){
                                // console.log("数组重复内容："+nary[i]);
                                this.$message({
                                    type: 'warning',
                                    message: '请选择不重复商品'
                                });
                                goArr = false
                            }
                        }
                  }
              } else if (this.conGroupPromotionForm.skuList.length == 0) {
                  this.$message({
                      type: 'warning',
                      message: '商品清单不能为空'
                  }); 
                  goArr = false
              } 
              if (!this.conGroupPromotionForm.isBillPro) {

                  if (this.conGroupPromotionForm.resultList.length > 0) {
                      let newArr = []
                      this.conGroupPromotionForm.resultList.forEach(item => {
                          if (!item.skuName) {
                              this.$message({
                                  type: 'warning',
                                  message: '商品名称不能为空'
                              }); 
                              goArr = false
                          } else if (item.descPrice < 0 || item.descRate < 0) {
                              this.$message({
                                  type: 'warning',
                                  message: '价格，折扣，不能小于0'
                              }); 
                              goArr = false
                          } else if (item.skuName) {
                            newArr.push(item.skuName)
                        }
                      })
                      if (newArr.length) {
                            var nary=newArr.sort(); 
                            for(var i=0;i<this.conGroupPromotionForm.resultList.length;i++){
                                if (nary[i]==nary[i+1]){
                                    // console.log("数组重复内容："+nary[i]);
                                    this.$message({
                                        type: 'warning',
                                        message: '请选择不重复商品'
                                    });
                                    goArr = false
                                }
                            }
                      }
                  } else if (this.conGroupPromotionForm.resultList.length == 0) {
                      this.$message({
                          type: 'warning',
                          message: '商品清单不能为空'
                      }); 
                      goArr = false
                  }
                  
              }


              if (goArr) {

                this.conGroupPromotionForm.skuList.forEach(item => {
                    item.buyTotal = item.buyTotal * 100
                })
                this.conGroupPromotionForm.resultList.forEach(item => {
                    item.descPrice = item.descPrice * 100
                })

                let datas = {};
                datas = this.conGroupPromotionForm;
                datas.isBillPro
                  ? (datas.isBillPro = 1)
                  : (datas.isBillPro = 0);
                delete datas.isBillPro
                this.conGroupPromotionEdit(datas).then(res => {
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
    cancelFunction (conGroupPromotionForm) {
        this.$refs[conGroupPromotionForm].resetFields();
        this.OnBackLatePage()
    },
    //点击取消
    OnBackLatePage() {
      this.$message({
        type: 'success',
        message: `操作成功`
      })
      this.quit(routesMapping.conGroupPromotion, true);
    },
    // 搜索业务实体
    groupFilter(){
        let par = {status: 1}
        this.userGroupAll(par).then(res => {
            this.groupList = res.result;
        });
    },
    getGroupInfo(val){
        this.groupList.forEach((item, index) => {
            if (item.userGroupId == val) {
                this.conGroupPromotionForm.userGroupId = item.userGroupId
                this.conGroupPromotionForm.groupName = item.groupName
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
