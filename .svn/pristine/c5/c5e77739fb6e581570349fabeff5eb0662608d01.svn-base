<template>
  <div class="purchase-list">
    <div class="content pt20">
      <h4>基本信息</h4>
      <el-form :model="combPromotionForm"  label-width="130px" size="mini" ref="combPromotionForm" :rules="rules">
        <div>
          <div class="displayStyle">     
            <el-form-item label="促销标题：">
              <el-input class="row_width" size="small" v-model="combPromotionForm.promotionTitle" placeholder="请填写促销标题"></el-input>
            </el-form-item>
          </div>  
          <div class="displayStyle">     
            <el-form-item label="促销类型：" prop="promotionType">
              <el-select  class="row_width" size="small" :disabled='true' v-model="combPromotionForm.promotionType"  placeholder="促销类型选择">
                <el-option label="自由组合" :value="0"></el-option>
                <el-option label="固定套餐" :value="1"></el-option>
                <el-option label="套餐自选" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </div>  
        </div>
        <div> 
          <div class="displayStyle">     
            <el-form-item label="促销开始时间：" prop="beginTime">
              <el-date-picker
                v-model="combPromotionForm.beginTime"
                type="datetime"
                class="row_width" size="small"
                placeholder="选择日期时间"
                :default-time="['00:00:00']"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </div>  
          <div class="displayStyle">       
          
            <el-form-item label="促销结束时间：" prop="endTime">
              <el-date-picker
                v-model="combPromotionForm.endTime"
                type="datetime" 
                class="row_width" size="small"        
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
                <el-select v-model="combPromotionForm.groupName"
                  :multiple="false"
                  filterable
                  clearable
                  size="small"
                  popper-class="max-length"
                  placeholder="请选择或输入业务实体"
                  @change="getGroupInfo(combPromotionForm.userGroupId)"
                  class="row_width"
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
              <el-input class="row_width" size="small" v-model="combPromotionForm.descriptions" placeholder="促销详情描述"></el-input>
            </el-form-item>
          </div>      
        </div>

      </el-form>
    </div>
    <div class="content-wrapper">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="商品清单" name="first">
          <h4>商品清单</h4>
          <div class="addProduct" style="margin-top:10px">
              <el-button plain size="mini" @click="addGoodsMsg"><i class="el-icon-plus"></i>添加商品信息</el-button>
          </div>
          <el-table
            :data="combPromotionList"
            style="width: 100%">
            <el-table-column type='index' widtn='60' label="操作">
              <template slot-scope="scope">
                <div @click='deleteThisRow(scope)'><i class='el-icon-remove-outline'></i></div>
              </template>
            </el-table-column>
            <el-table-column
              prop="skuName"
              label="商品名称"
              width="180">
              <template slot-scope="scope">
                <el-select
                    v-model="scope.row.skuName"
                    value-key="skuName"
                    :multiple="false"
                    filterable
                    placeholder="输入商品名称"
                    no-data-text="没有找到相关的商品"
                    @change="selectedSetGoods(scope.row)"
                    size="small">
                    <el-option
                        v-for="(item, k) in productList"
                        :key="k"
                        :label="item.skuName"
                        :value="item">
                    </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="skuId"
              label="sku编码"
              width="180">
              <template slot-scope="scope">
                <el-input 
                disabled
                size="small"
                v-model="scope.row.skuId"></el-input>
              </template>
            </el-table-column>
            <el-table-column
            :change='moustCountTotal()'
              prop="mustCount"
              label="购买数量">
              <template slot-scope="scope">
                <el-input 
                size="small"
                :disabled="isMustCount"
                type='number'
                v-number-decimal-only
                v-model="scope.row.mustCount"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="canReplace"
              label="可替换">
              <template slot-scope="scope">
                <el-checkbox 
                :disabled='isWhether'
                v-model="scope.row.canReplace" 
                :false-label=0 :true-label=1 
                :checked='scope.row.canReplace==1?true:false'>
                
                </el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
              prop="replaceSkuName"
              label="替换商品名称">
              <template slot-scope="scope">
                <el-select
                    :disabled='scope.row.canReplace==1?false:true'
                    v-model="scope.row.replaceSkuName"
                    value-key="replaceSkuName"
                    :multiple="false"
                    filterable
                    placeholder="输入商品名称"
                    no-data-text="没有找到相关的商品"
                    @change="selectreplaceSkuName(scope.row)"
                    size="small">
                    <el-option
                        v-for="(item, k) in productList"
                        :key="k"
                        :label="item.skuName"
                        :value="item">
                    </el-option>
                </el-select>
              </template>            
            </el-table-column>
            <el-table-column
              prop="replaceSkuId"
              label="替换商品编码">
              <template slot-scope="scope">
                <el-input 
                disabled
                size="small"
                v-model="scope.row.replaceSkuId"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="addTotal"
              label="加价金额">
              <template slot-scope="scope">
                <el-input size="small" type='number' v-number-decimal-only v-model="scope.row.addTotal"></el-input>
              </template>
            </el-table-column>
          </el-table>            
        </el-tab-pane>
        <el-tab-pane label="促销结果" name="second">
          <h4>促销结果</h4>
          <div class="addProduct" style="margin-top:10px">
            <el-button  v-if="combPromotionForm.promotionType==0" plain size="mini" @click="addGoodsMsg"><i class="el-icon-plus"></i>添加促销结果</el-button>
          </div>
          <el-table :data='resultList' style='width:300px'>
            <el-table-column v-if="combPromotionForm.promotionType==0" type='index' widtn='60' label="操作">
              <template slot-scope="scope">
                <div @click='deleteThisRow(scope)'><i class='el-icon-remove-outline'></i></div>
              </template>
            </el-table-column>
            <el-table-column widtn='120' prop="buyCount" label="数量">
              <template slot-scope="scope">
                <el-input type='number' v-number-decimal-only size="small" :disabled='combPromotionForm.promotionType!==0' v-model="scope.row.buyCount"></el-input>
              </template>
            </el-table-column>
            <el-table-column widtn='120' prop="buyTotal" label="金额">
              <template slot-scope="scope">
                <el-input type='number' v-number-decimal-only size="small" :min="0" v-model="scope.row.buyTotal"></el-input>
              </template>
            </el-table-column>
          </el-table>

        </el-tab-pane>

    <div>
      <div>
        <h4>说明</h4>
        <el-input
          style='color:#000;margin-top:10px' 
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          :disabled='true'
          v-model="explainTexter"
        ></el-input>
      </div>
    </div>    
    <div class="pl20 pb20" style="margin-top:20px;">
        <el-button type="primary" size="small" @click="submitCreateOrder('combPromotionForm')">提交</el-button>
        <el-button plain type="primary" size="small" @click="quit(routesMapping.SalesOrder, true)">取消</el-button>
    </div>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import TableHeightMixins from "~/mixins/tableheight";
import { directives } from '~/utils/directives/index'
import PlatformMixins from "~/mixins/platform";
import { routesMapping } from "~/router";
import QuitMixins from "~/mixins/quit";
import MessageMixins from "~/mixins/messages";

export default {
  name: "ListDetails",
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
        let beginTime = new Date(this.combPromotionForm.beginTime)
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
    let promotionType = (rule, value, callback) => {
        if (value === '' || value === undefined) {
            return callback(new Error('请选择促销类型!'));
        } else {
            return callback();
        }
    }
    return {
      groupList: [],
      combPromotionList: [],
      resultList: [],
      goodsAllList: [],
      productList: [],
      getCombPromotionList: {},
      activeName2: "first",
      combPromotionForm: {},
      promotionTypeText: "",
      isWhether: true,
      isMustCount: true,
      explainTexter:
        '【自由组合促销】基本信息中促销类型选择‘自由组合’，并设置好其他基本信息，促销商品信息中设置参与促销的商品，"需要购买数量"不需要填写，默认为 O ,"是否可替换"不需要勾选．替换商品表不需要填写，促销结果表中按需要设置数量、金额（促销商品中任选几个，金额是多少）.' +
        '\n【固定套餐促销】基本信息中促销类型选择"固定套餐"．并设置好其他基本信息，促销商品信息中设置参与促销的商品，"需要购买数量"一般情况下不需要修改，默认为1，（除非套餐中该商品是多个则需耍修改,"是否可替换"字段不需要勾选,替换商品表不需要填写,促销结果表中"数量"字段不需要填写，默认为套餐单品总数、金额需要根据情况填写.' +
        '\n【套餐自选促销】基本信息中促销类型选择‘套餐自选’．并设置好其他基本信息，促销商品表中设置参与促销的商品，"需要购买数量"一般惰况下不需要修改，默认为1，（除非套餐中该商品是多个则需要修改） ,"是否可替换"字段根据情况看是否需要勾选;如果勾选了‘是否可替换”，则替换商品表中必须填写可替换的商品，以及加价金额．否则不需要。',
      rules: {
        beginTime: [{required: true, validator: beginTime, trigger: 'change'}],
        endTime:[{required: true, validator: endTime, trigger: 'change'}],
        userGroupId:[{required: true, validator: userGroupId, trigger: 'change'}],
        promotionType:[{required: true, validator: promotionType, trigger: 'change'}],
      }, 
      
    };
  },
  mixins: [TableHeightMixins, PlatformMixins, QuitMixins, MessageMixins], //判断高度，
  components: {},
  //props: {},
  watch: {},
  computed: {
    ...mapState({})
  },
  mounted() {
    // this.getCategoryList(this.datas);
    this.getSessRow();
    this.groupFilter();
    this.queryProductList();
    //this.getGoodsConfigUnit();
    //this.getQueryAllBrands();
  },
  watch: {},
  methods: {
    ...mapActions([
      "userGroupAll",
      "manageCategoryAll",
      "querySkuCodeByProductName",
      "manageBrandAll",
      "combPromotionEdit",
      "combPromotionInfo"
    ]),
    getSessRow() {
      let params = {
        id: parseFloat(this.$route.params.id)
      };
      this.combPromotionInfo(params).then(res => {
        this.combPromotionForm = res; //全数据
        this.combPromotionList = res.skuList; //商品列表
        this.resultList = res.resultList; //促销结果列表
        this.combPromotionList.forEach(item => {
          item.addTotal = item.addTotal / 100
        })
        this.resultList.forEach(item => {
          item.buyTotal = item.buyTotal / 100
        })
        if (this.combPromotionForm.promotionType == 0) {
          this.isMustCount = true
          this.isWhether = true
        } else if (this.combPromotionForm.promotionType == 1) {
          this.isMustCount = false
          this.isWhether = true
          this.moustCountTotal();
        } else {
          this.isMustCount = false
          this.isWhether = false
          this.moustCountTotal();
        }
        // this.isWhether = !this.combPromotionForm.promotionType;
        if (res.skuList.length < 1) {
          this.combPromotionList.push({
            addTotal: "0",
            canReplace: 0,
            mustCount: 0,
            replaceSkuId: null,
            replaceSkuName: "",
            skuId: null,
            skuName: ""
          });
        }
        if (res.resultList.length < 1) {
          this.resultList.push({ buyCount: "", buyTotal: "" });
        }
      });
    },

    //算总数量
    moustCountTotal() {
      if (this.combPromotionForm.promotionType) {
        let mustCountAll1 = 0;
        for (let i = 0; i < this.combPromotionList.length; i++) {
          mustCountAll1 =
            parseInt(mustCountAll1) +
            parseInt(this.combPromotionList[i].mustCount);
          //console.log('i值',i)//this.combPromotionList[i])
        }
        console.log(mustCountAll1, "合计:");
        this.resultList[0].buyCount = mustCountAll1;
        //this.resultList[0].buyCount=this.mustCountAll
      }
    },

    //是否勾选

    // 设置商品信息
    selectedSetGoods(row) {
      row.skuId = row.skuName.skuId;
      row.skuName = row.skuName.skuName;
    },
    selectreplaceSkuName(row) {
      row.replaceSkuId = row.replaceSkuName.skuId;
      row.replaceSkuName = row.replaceSkuName.skuName;
    },

    // 查询所有商品
    queryProductList(val) {
      this.querySkuCodeByProductName({ searchContent: val }).then(res => {
        if (res.result) {
          this.productList = res.result.map(i => {
            i.price = i.price / 100;
            return i;
          });
        } else {
          this.productList = [];
        }
      });
    },

    // 表格初始化
    addGoodsMsg() {
      if (this.activeName2 === "first") {
        if (this.combPromotionForm.promotionType) {
          this.combPromotionList.push({
            addTotal: "0",
            canReplace: 0,
            mustCount: 1,
            replaceSkuId: null,
            replaceSkuName: "",
            skuId: null,
            skuName: ""
          });
        } else {
          this.combPromotionList.push({
            addTotal: "0",
            canReplace: 0,
            mustCount: 0,
            replaceSkuId: null,
            replaceSkuName: "",
            skuId: null,
            skuName: ""
          });
        }
      } else {
        this.resultList.push({ buyCount: "", buyTotal: "" });
      }
    },
    //提交
    submitCreateOrder(combPromotionForm) {

      this.$refs[combPromotionForm].validate((valid) => {
          if (valid) {
              let goArr = true

              this.combPromotionForm.skuList = this.combPromotionList;
              this.combPromotionForm.resultList = this.resultList;
              let params = this.combPromotionForm;
              let begintime = Date.parse(params.beginTime);
              let endtime = Date.parse(params.endTime);
              let newdate = Date.parse(new Date());
              console.log(params, 111);
              if (!params.promotionTitle) {
                this.$message({
                  type: "warning",
                  message: "标题不能为空"
                });
                goArr = false
              } else if (begintime < newdate) {
                this.$message({
                  type: "warning",
                  message: "开始时间小于当前时间"
                });
                goArr = false
              } else if (!params.beginTime) {
                this.$message({
                  type: "warning",
                  message: "开始时间不能为空"
                });
                goArr = false
              } else if (!params.endTime) {
                this.$message({
                  type: "warning",
                  message: "结束时间不能为空"
                });
                goArr = false
              } else if (endtime < begintime) {
                this.$message({
                  type: "warning",
                  message: "结束时间不能小于开始时间"
                });
                goArr = false
              } else if (!params.groupName) {
                this.$message({
                  type: "warning",
                  message: "业务实体不能为空"
                });
                goArr = false
              } else if (!params.skuList.length || !params.resultList.length) {
                this.$message({
                  type: "warning",
                  message: "商品清单子表不能为空"
                });
                goArr = false
              } else if (params.skuList.length) {
                params.skuList.forEach(item => {
                  if (!item.skuName) {
                    this.$message({
                      type: "warning",
                      message: "商品名称不能为空"
                    });
                    goArr = false
                  }
                  if (item.canReplace && !item.replaceSkuName) {
                    this.$message({
                      type: "warning",
                      message: "替换商品名称不能为空"
                    });
                    goArr = false
                  }
                  if (item.replaceSkuName && item.addTotal < 0) {
                    this.$message({
                      type: "warning",
                      message: "加价金额不能小于0"
                    });
                    goArr = false
                  }
                })
              } else if (params.resultList.length) {
                params.resultList.forEach(item => {
                  if (item.buyTotal && item.buyTotal < 0) {
                    this.$message({
                      type: "warning",
                      message: "促销结果金额不能小于0"
                    });
                    goArr = false
                  }
                })
              } else {}

              if (params.promotionType == 0) {
                params.resultList.forEach(item => {
                  if (item.buyCount <= 0) {
                    this.$message({
                      type: "warning",
                      message: "促销结果数量必须大于0"
                    });
                    goArr = false
                  }
                })
              }

              if (params.promotionType == 1 || params.promotionType == 2) {
                params.skuList.forEach(item => {
                  if (item.mustCount <= 0) {
                    this.$message({
                      type: "warning",
                      message: "购买数量必须大于0"
                    });
                    goArr = false
                  }
                })
              }

              if (goArr) {

                params.skuList.forEach(item => {
                    item.addTotal = item.addTotal * 100
                })
                params.resultList.forEach(item => {
                    item.buyTotal = item.buyTotal * 100
                })

                this.combPromotionEdit(params).then(res => {
                  this.$message({
                    type: "success",
                    message: `操作成功`
                  });
                  this.quit(routesMapping.PurchaseOrder, true);
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

    deleteThisRow(row) {
      let index = row.$index;
      if (this.activeName2 === "first") {
        this.combPromotionList.splice(index, 1);
      } else {
        this.resultList.splice(index, 1);
      }
    },
    handleClick(tab, event) {},
    //业务实体搜索
    groupFilter() {
      let par = {
        status: 1 // 状态启用
      };
      this.userGroupAll(par).then(res => {
        this.groupList = res.result;
      });
    },

    getGroupInfo(val) {
      this.groupList.forEach((item, index) => {
        if (item.userGroupId == val) {
          this.combPromotionForm.userGroupId = item.userGroupId;
          this.combPromotionForm.groupName = item.groupName;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.page-content {
  background-color: #fff;
}
.purchase-list {
  .table-container {
    padding-top: 20px;
    background-color: #fff;
    height: 100%;
    .nav-top {
      display: flex;
      height: auto;
      justify-content: space-between;
      align-items: flex-start;
    }
    .table-wrapper {
      width: 100%;
      .el-table__body-wrapper tbody tr:hover {
        .operate-container_div {
          display: block;
        }
      }
      .operate-container {
        padding-right: 16px;
        min-width: 72px;
        font-size: 12px;
        .operate-container_div {
          display: none;
        }
        div {
          float: right;
        }
      }
    }
  }
  .display-flex {
    display: flex;
  }
  .icon-shijian {
    font-size: 12px;
  }
  .icon-bianji {
    font-size: 12px;
  }
  .model-container {
    height: auto;
  }
  .date-conatiner {
    &:hover {
      .date-edit-contaniner .date-picker-container {
        display: block;
      }
      .date-edit-contaniner .date-edit {
        display: block;
      }
    }
    .date-edit-contaniner {
      position: relative;
      text-align: right;
      .date-edit {
        cursor: pointer;
        position: absolute;
        z-index: 9;
        width: 20px;
        display: none;
      }
      .date-picker-container {
        opacity: 0;
        position: absolute;
        left: -88px;
        z-index: 10;
        width: 120px;
        display: none;
        .el-input--small .el-input__inner {
          cursor: pointer;
          border: none;
        }
        .el-input {
          width: 120px;
        }
        .el-input__prefix {
          display: none;
        }
      }
    }
  }
  .show-more {
    display: flex;
    width: 100%;
    height: 44px;
    justify-content: space-between;
    position: relative;
    &:hover {
      .show-more-icon {
        display: block;
      }
    }
    .show-more-content {
      white-space: nowrap;
      overflow: hidden;
      min-width: 108px;
      text-overflow: ellipsis;
    }
    .show-more-icon {
      min-width: 28px;
      font-size: 12px;
      position: absolute;
      right: 0px;
      display: none;
      z-index: 10;
    }
  }
  .font-color-F56C6C {
    color: #f56c6c;
  }
  .select-storehouse-container {
    margin-bottom: 12px;
    .el-input__inner {
      height: 34px;
      color: #666666;
      border: 1px solid #e0e0e0;
    }
    .el-form-item__label {
      font-size: 14px;
      color: #151515;
    }
  }
  .textarea-container {
    position: relative;
    .textarea-tips {
      color: #9c9c9c;
      position: absolute;
      top: 138px;
    }
  }
  .form-margin-top {
    margin-top: 15px;
  }
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
  }
  .content-wrapper,
  .pt20 {
    padding: 15px;
  }
  .el-textarea.is-disabled .el-textarea__inner {
    color: #000;
  }
}
</style>
