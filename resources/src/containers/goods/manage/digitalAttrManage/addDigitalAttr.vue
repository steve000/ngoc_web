<!-- 新增商品属性 -->
<template>
    <div class="createInsteadDelivery">
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper">
                <el-form label-width="110px" :model="createInsteadDeliveryParams" ref="createInsteadDeliveryParams">
                    <div class="displayStyle">
                        <el-form-item label="产品名称：" required>
                            <el-select
                                v-model="searchKey"
                                :filter-method="skuNameFilter"
                                size="small"
                                class="rowUI"
                                clearable
                                filterable
                                placeholder="选择产品名称："
                                no-data-text="没有找到相关的产品"
                                @change="selectedSetGoods">
                                <el-option
                                v-for="(item, k) in productList"
                                :key="item.productId"
                                :label="item.productName"
                                :value="item.productId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="spu编码：">
                            <el-input v-model="createInsteadDeliveryParams.productId" placeholder="" disabled class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="属性1：" >
                            <el-input v-model="createInsteadDeliveryParams.udp1" placeholder="" class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="属性2：" >
                            <el-input v-model="createInsteadDeliveryParams.udp2" placeholder="" class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="属性3：" >
                            <el-input v-model="createInsteadDeliveryParams.udp3" placeholder="" class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="属性4：" >
                            <el-input v-model="createInsteadDeliveryParams.udp4" placeholder="" class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="属性5：" >
                            <el-input v-model="createInsteadDeliveryParams.udp5" placeholder="" class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="属性6：" >
                            <el-input v-model="createInsteadDeliveryParams.udp6" placeholder="" class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="属性7：" >
                            <el-input v-model="createInsteadDeliveryParams.udp7" placeholder="" class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="属性8：" >
                            <el-input v-model="createInsteadDeliveryParams.udp8" placeholder="" class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="属性9：" >
                            <el-input v-model="createInsteadDeliveryParams.udp9" placeholder="" class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="属性10：" >
                            <el-input v-model="createInsteadDeliveryParams.udp10" placeholder="" class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="属性11：" >
                            <el-input v-model="createInsteadDeliveryParams.udp11" placeholder="" class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="属性12：" >
                            <el-input v-model="createInsteadDeliveryParams.udp12" placeholder="" class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="属性13：" >
                            <el-input v-model="createInsteadDeliveryParams.udp13" placeholder="" class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="属性14：" >
                            <el-input v-model="createInsteadDeliveryParams.udp14" placeholder="" class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="属性15：" >
                            <el-input v-model="createInsteadDeliveryParams.udp15" placeholder="" class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="属性16：" >
                            <el-input v-model="createInsteadDeliveryParams.udp16" placeholder="" class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="属性17：" >
                            <el-input v-model="createInsteadDeliveryParams.udp17" placeholder="" class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="属性18：" >
                            <el-input v-model="createInsteadDeliveryParams.udp18" placeholder="" class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="属性19：" >
                            <el-input v-model="createInsteadDeliveryParams.udp19" placeholder="" class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="属性20：" >
                            <el-input v-model="createInsteadDeliveryParams.udp20" placeholder="" class="rowUI" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="content">
            <div class="pl20 pb20" :ref="createOrderRules">
                <el-button type="primary" style="width:90px;" prop="channelId" @click="submitCreateOrder">提交</el-button>
                <el-button plain style="width:90px;" @click="quit(routesMapping.insteadDelivery, true)">取消</el-button>
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
  name: "GoodsDigitalAttrAdd",
  mixins: [PlatformMixins, QuitMixins],
  data() {
    return {
      // 商品名称loading
      queryGoodsNameLoading: false,
      // 输入商品的list
      productList: [],
      // 所有的list
      filterProductList: [],
      searchKey: "",
      // 新增商品属性参数对象
      createInsteadDeliveryParams: {
        productId: "",
        udp1: "",
        udp2: "",
        udp3: "",
        udp4: "",
        udp5: "",
        udp6: "",
        udp7: "",
        udp8: "",
        udp9: "",
        udp10: "",
        udp11: "",
        udp12: "",
        udp13: "",
        udp14: "",
        udp15: "",
        udp16: "",
        udp17: "",
        udp18: "",
        udp19: "",
        udp20: ""
      },
      remark: "",
      //创建提交信息
      createOrderRules: {
        channelId: [
          { required: true, message: "请输入商品名称", trigger: "change" }
        ]
      },
      // 模糊查询商品名称
      queryGoodsName: ""
    };
  },
  mounted() {
      this.skuNameAll("");
  },
  methods: {
    ...mapActions(["querySpuCodeByProductName", "goodsDigitalAttrAdd","digitalAttrEditSpuIfExist"]),
    //根据输入获取产品名称下拉列表   根据商品名称查询到spu
    skuNameAll(val) {
        this.querySpuCodeByProductName({ productName: val }).then(res => {
            console.log(res);
            this.filterProductList = res.result;
            this.productList = res.result;
        });
    },
    // 选择
    skuNameFilter(string) {
      if (!string) {
        return (this.productList = this.filterProductList);
      }
      this.productList = this.filterProductList.filter(item => {
        if (
          (item.productId && item.productId.toString().indexOf(string) >= 0) ||
          (item.productName && item.productName.toString().indexOf(string)) >= 0
        ) {
          return item;
        }
      });
    },
    // 选择产品名称后带出产品编码
    selectedSetGoods(val) {
      console.log(22222222222);
      console.log(val)
      this.createInsteadDeliveryParams.productId = val;
      //判断下这个值是否已经存在属性
      if (this.createInsteadDeliveryParams.productId) {
          this.digitalAttrEditSpuIfExist({ productId: val }).then(res => {
            console.log(res);
            if (res.existFlag === 1) {
                this.$message({
                    type: "warning",
                    message: `此产品存在属性，请新增其他产品`
                });
            }
        });
      }
      
    },

    // 提交新增商品属性
    submitCreateOrder() {
      this.goodsDigitalAttrAdd(this.createInsteadDeliveryParams).then(res => {
        console.log(res);
        if (res) {
          this.$message({
            type: "success",
            message: `新增商品属性成功`
          });
          this.quit(this.routesMapping.GoodsDigitalAttrManage, true);
        } else {
          this.$message({
            type: "warning",
            message: `新增商品属性失败`
          });
        }
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
