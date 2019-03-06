<!-- 新增商品属性 -->
<template>
    <div class="createInsteadDelivery">
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper">
                <el-form label-width="110px" :model="editOrderParams" ref="editOrderParams" :rules="editOrderRules">
                    <div class="displayStyle" style="width: 100%;">
                        <el-form-item label="发布实体：">
                            <el-input v-model="entityName" placeholder="当前登录实体" disabled size="small" class="rowUI">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="商品名称：" prop="skuName">
                            <el-input v-model="editOrderParams.skuName" placeholder="商品名称" disabled size="small" class="rowUI">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="sku编码：" required>
                            <el-input v-model="editOrderParams.skuId" placeholder="" disabled size="small" class="rowUI">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="开始时间：" prop="beginTime">
                            <el-date-picker
                              v-model="editOrderParams.beginTime"
                              type="date"
                              size="small"
                              class="rowUI"
                              value-format="yyyy-MM-dd"
                              format="yyyy-MM-dd"
                              placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="结束时间：" prop="endTime">
                            <el-date-picker
                              v-model="editOrderParams.endTime"
                              type="date"
                              size="small"
                              class="rowUI"
                              value-format="yyyy-MM-dd"
                              format="yyyy-MM-dd"
                              placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="最低价：" prop="minPrice">
                            <el-input v-model="editOrderParams.minPrice" @keyup.native="changeMinPrice(createOrderParams)" @blur="changeMinPrice(createOrderParams)" placeholder="" :min="0" type="number" size="small" class="rowUI">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="最高价：" prop="maxPrice">
                            <el-input v-model="editOrderParams.maxPrice" @keyup.native="changeMaxPrice(createOrderParams)" @blur="changeMaxPrice(createOrderParams)" placeholder="" :min="0" type="number" size="small" class="rowUI">
                            </el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="content">
            <div class="pl20 pb20">
                <el-button type="primary" style="width:90px;" prop="channelId" @click="submitCreateOrder">提交</el-button>
                <el-button plain style="width:90px;" @click="quit(routesMapping.commodityRelease, true)">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import PlatformMixins from "~/mixins/platform";
import QuitMixins from "~/mixins/quit";
import { routesMapping } from "~/router";
import { mapActions, mapState } from "vuex";
import utils from "~/utils/commonMethod";

export default {
  name: "commodityReleaseEdit",
  mixins: [PlatformMixins, QuitMixins],
  components: {  },
  data() {
    let selectSkuFail = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请选择商品'))
        }else {
            return callback();
        }
    };
    let beginTimeFail = (rule, value, callback) => {
      let now = new Date();
      let time = new Date(value);
      let endTime = new Date(this.editOrderParams.endTime);
      if (!value) {
        return callback(new Error("请选择开始时间!"));
      // } else if (time.getTime() > now.getTime()) {
        // return callback(new Error("请选择早于当前时间"));
      } else {
        return callback();
      }
    };
    let endTimeFail = (rule, value, callback) => {
      let now = new Date();
      let time = new Date(value);
      let beginTime = new Date(this.editOrderParams.beginTime);
      if (!value) {
        return callback(new Error("请选择结束时间!"));
      // } else if (time.getTime() < now.getTime()) {
        // return callback(new Error("请选择晚于当前时间"));
      } else if (time.getTime() < beginTime.getTime()) {
        return callback(new Error("请选择晚于开始时间"));
      } else {
        return callback();
      }
    };
    let minPriceFail = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请不小于0的商品最低价'))
        } else {
            return callback();
        }
    };
    let maxPriceFail = (rule, value, callback) => {
      if (!value) {
          return callback(new Error('请不小于0的商品最高价'))
      } else {
          return callback();
      }
    };
    return {
      // 商品名称loading
      queryGoodsNameLoading: false,
      searchKey: "",
      entityName: sessionStorage.getItem("entityName"),
      // 编辑商品属性参数对象
      editOrderParams: {},
      remark: "",
      //编辑信息校验
      editOrderRules: {
        skuName:[{ required: true, validator: selectSkuFail, trigger: 'blur' }],
        beginTime: [{required: true, validator: beginTimeFail, trigger: 'change,blur', type: 'date'}],
        endTime:[{required: true, validator: endTimeFail, trigger: 'change,blur', type: 'date'}],
        minPrice:[{ required: true, validator: minPriceFail, trigger: 'change,blur' }],
        maxPrice:[{ required: true, validator: maxPriceFail, trigger: 'change,blur' }]
      },
      isResetDate: false
    };
  },
  mounted() {
    this.getSelectSkuData()
  },
  methods: {
    ...mapActions(["groupSkuQuery", "groupSkuEdit","showPageLoading","hidePageLoading"]),
    // 根据传的id拿到详情
    getSelectSkuData() {
      let param = {
        id: this.$route.params.id
      };
      this.groupSkuQuery(param).then(res => {
        console.log(res,"选中的信息");
        this.editOrderParams = res;
        this.editOrderParams.minPrice = (Number(this.editOrderParams.minPrice) / 100).toFixed(2)
        this.editOrderParams.maxPrice = (Number(this.editOrderParams.maxPrice) / 100).toFixed(2)
      });
    },
    // 最高价
    changeMaxPrice (item) {
        console.log(item,"输入最高价,计算");
        if (item.maxPrice === '') {
            console.log("计算11");
            this.$set(item, "maxPrice", undefined)
            return false
        }
        if (utils.ifNoNum(item.maxPrice)) {
            console.log("计算22");
            if (item.minPrice == "") {
              this.$set(item, "maxPrice", Number(item.maxPrice))   
              this.$set(item, "oldmaxPrice", Number(item.maxPrice))
            } else if (item.maxPrice && Number(item.maxPrice) > Number(item.minPrice)) {
              this.$set(item, "maxPrice", Number(item.maxPrice))   
              this.$set(item, "oldmaxPrice", Number(item.maxPrice))
            } else {
              this.showWarning("请输入大于最低价的金额");
            }
        } else {
            console.log("计算33");
            this.$set(item, "maxPrice", item.oldmaxPrice)
        }
    },
    // 最低价
    changeMinPrice (item) {
        console.log(item,"输入最低价,计算");
        if (item.minPrice === '') {
            console.log("计算11");
            this.$set(item, "minPrice", undefined)
            return false
        }
        if (utils.ifNoNum(item.minPrice)) {
            console.log("计算22");
            if (item.maxPrice == "") {
              this.$set(item, "minPrice", Number(item.minPrice))   
              this.$set(item, "oldminPrice", Number(item.minPrice))
            } else if (item.maxPrice && Number(item.minPrice) < Number(item.maxPrice)) {
              this.$set(item, "minPrice", Number(item.minPrice))   
              this.$set(item, "oldminPrice", Number(item.minPrice))
            } else {
              this.showWarning("请输入小于最高价的金额");
            }
        } else {
            console.log("计算33");
            this.$set(item, "minPrice", item.oldminPrice)
        }
    },
    // 提交新增商品属性
    submitCreateOrder() {
      if (
        this.editOrderParams.beginTime == "" ||
        this.editOrderParams.endTime == ""
      ) {
        this.$message({
          type: "warning",
          message: "起止时间不能为空"
        });
      } else if (
        Number(this.editOrderParams.maxPrice) >
          Number(this.editOrderParams.minPrice) &&
        Number(this.editOrderParams.minPrice) > 0 &&
        Number(this.editOrderParams.minPrice) > 0
      ) {
        this.showPageLoading();
        let postData = {
          id: this.$route.params.id,
          beginTime: this.editOrderParams.beginTime,
          endTime: this.editOrderParams.endTime,
          maxPrice: this.editOrderParams.maxPrice * 100,
          minPrice: this.editOrderParams.minPrice * 100
        };
        this.groupSkuEdit(postData).then(res => {
          this.hidePageLoading();
          console.log(res);
          if (res) {
            this.$message({
              type: "success",
              message: `新增组合商品成功`
            });
            this.quit(this.routesMapping.commodityRelease, true);
          } else {
            this.$message({
              type: "warning",
              message: `新增组合商品失败`
            });
          }
        });
      } else {
        this.$message({
          type: "warning",
          message: "最高最低价不符合要求"
        });
      }
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.createInsteadDelivery {
  height: 100%;
  padding: 20px;
  .content {
    background-color: #fff;
    .title {
      font-size: 14px;
      color: #333333;
      line-height: 44px;
      height: 44px;
      background-color: #fff;
      border-bottom: 1px solid #e5e5e5;
    }
    .content-wrapper {
      padding: 20px 20px 1px 20px;
      .displayStyle,
      .displayStyle1 {
        display: inline-block;
        width: 45%;
        padding-left: 25px;
        .row_width {
          width: 300px;
          height: 36px;
        }
      }
    }
    .addProduct {
      margin-bottom: 20px;
    }
    table thead th {
      background: #f6f7fb;
      width: 100px;
      height: 44px;
    }
    table {
      border: 1px solid #eee;
      border-collapse: collapse;
      margin: 0 auto;
      text-align: left;
      font-size: 12px;
      tr {
        border-bottom: 1px solid #eee;
        background: #ffffff;
        height: 44px;
        overflow: hidden;
        box-shadow: 0 1px 0 0 #f2f6fd;
        border: 1px solid #f0f3fa;
        transition: 1s;
        .iconfont1 {
          width: 16px;
          height: 16px;
          top: -6px;
          right: -1px;
          position: absolute;
          display: none;
          background-color: white;
          color: red;
          transition: 1s;
        }
        &:hover {
          //    border: 1px dashed #539EFF;
          outline: 1px dashed #539eff;
          outline-offset: 0px;
          transition: 1s;
          .iconfont1 {
            display: block;
            cursor: pointer;
            transition: 1s;
          }
        }
        td {
          padding-left: 5px;
          .table-input {
            width: 120px;
          }
        }
      }
    }
  }
  .orderContainer {
    margin: 20px;
    background-color: #fbfbfb;
    border: 1px solid #f1f1f1;
    text-align: right;
    font-size: 14px;
    color: #333333;
    .orderCount {
      height: 50px;
      line-height: 50px;
      margin-right: 15px;
      span {
        color: red;
        font-size: 18px;
      }
    }
  }
  .submitBtn {
    clear: both;
    padding: 20px;
    background-color: white;
  }
  .el-table__body-wrapper {
    overflow: inherit;
  }
  .createAddress_func {
    margin: 0 10px;
    padding: 3px;
    width: 58px;
    height: 20px;
    cursor: pointer;
    &.defalut_address {
      background-color: #ffeddd;
      color: #ff9624;
      border: 1px solid #ff9624;
    }
    &.set_defalutAddress {
      display: none;
      background-color: #ff9624;
      color: #fff;
      border: 1px solid #ff9624;
    }
  }
  .el-table__row:hover {
    .createAddress_func {
      &.set_defalutAddress {
        display: inline;
      }
    }
  }
  .inventory {
    background-color: #fa5555;
    color: #fff;
    font-size: 12px;
    width: 58px;
    height: 20px;
    line-height: 20px;
    text-align: center;
  }
}
</style>
