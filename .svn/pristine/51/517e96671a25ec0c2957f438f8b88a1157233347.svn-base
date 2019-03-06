<!-- 新增条形码 -->
<template>
    <div class="createInsteadDelivery">
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper">
                <el-form label-width="110px" :model="createInsteadDeliveryParams" ref="createInsteadDeliveryParams">
                    <div class="displayStyle">
                        <el-form-item label="商品名称：">
                            <el-select
                                v-model="searchKey"
                                class="rowUI"
                                size="small"
                                clearable
                                filterable
                                :filter-method="skuNameFilter"
                                placeholder="选择商品名称"
                                no-data-text="没有找到相关的商品"
                                @change="selectedSetGoods">
                                <el-option
                                v-for="(item, k) in skuList"
                                :key="item.skuId"
                                :label="item.skuName"
                                :value="item.skuId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="sku编码：">
                            <el-input v-model="skuId" placeholder="" disabled class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle" style="width:100%">
                        <el-form-item label="条码：" >
                            <el-input v-model="skuBarCode" placeholder="请输入条码" class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div style="margin-left: 25px;">
                        <el-form-item label="备注：" label-width="110px">
                            <el-input type="textarea" :rows="4" :maxlength="200" v-model="remark" resize="none" style="min-width: 1100px;">
                            </el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="content">
            <div class="pl20 pb20">
                <el-button type="primary" style="width:90px;" @click="submitCreateOrder">提交</el-button>
                <el-button plain style="width:90px;" @click="quit(routesMapping.GoodsMultiBarManage, true)">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import PlatformMixins from "~/mixins/platform";
import QuitMixins from "~/mixins/quit";
import { routesMapping } from "~/router";
import { mapActions } from "vuex";
export default {
  name: "GoodsMultiBarAdd",
  mixins: [PlatformMixins, QuitMixins],
  data() {
    const validatorloginFail = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入数字'))
            } else if ( value > 99 || value < 1 ) {
                return callback(new Error('输入范围：1-99'))
            } else {
                return callback();
            }
		}
    return {
      // 商品名称loading
      queryGoodsNameLoading: false,
      // 输入符合要求的商品的list
      skuList: [],
      // 所有的list
      filterskuList: [],
      searchKey: "",
      skuId: "",
      skuBarCode: "",
      remark: "",
      // 新增条形码参数对象
      createInsteadDeliveryParams: {},
      // 模糊查询商品名称
      queryGoodsName: "",
      rules: {
        loginFailMaxTimes:[{ required: true, validator: validatorloginFail, trigger: 'blur' }],
      }
    };
  },
  mounted() {
    this.skuNameAll("");
  },
  methods: {
    ...mapActions(["querySkuCodeByProductName", "goodsMultiBarAdd"]),
    //拿到所有list数据
    skuNameAll(val) {
      this.querySkuCodeByProductName({ searchKey: val }).then(res => {
        console.log(res);
        this.filterskuList = res.result;
        this.skuList = res.result;
      });
    },
    // 选择
    skuNameFilter(string) {
      if (!string) {
        return (this.skuList = this.filterskuList);
      }
      this.skuList = this.filterskuList.filter(item => {
        if (
          (item.skuId && item.skuId.toString().indexOf(string) >= 0) ||
          (item.skuName && item.skuName.toString().indexOf(string)) >= 0
        ) {
          return item;
        }
      });
    },
    // 选择产品名称后带出产品编码
    selectedSetGoods(val) {
      console.log(22222222222);
      this.skuId = val;
    },
    // 提交新增条形码
    submitCreateOrder() {
      this.$confirm("确认此次提交？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.createInsteadDeliveryParams = {
            skuId: this.skuId,
            skuBarCode: this.skuBarCode,
            remark: this.remark
          };
          this.goodsMultiBarAdd(this.createInsteadDeliveryParams).then(res => {
            console.log(res);
            if (res) {
              this.$message({
                type: "success",
                message: `新增条形码成功`
              });
              this.quit(this.routesMapping.GoodsMultiBarManage, true);
            } else {
              this.$message({
                type: "warning",
                message: `新增条形码失败`
              });
            }
          });
        })
        .catch(err => {
          console.log("取消保存");
        });
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
