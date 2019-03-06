<template>
    <div class='createPurchase-view'>
        <!-- 基本信息 -->
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper">
                <el-form label-position="left" label-width="130px" :model="createPurchaseForm" :rules="rules" ref="createPurchaseForm">
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="渠道名：" label-width="90px">
                                <el-input v-model="operator" :disabled="false" class="row_width" placeholder="输入渠道名称" @change="queryChannelForGoods">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="content">
            <div class="title">
                <div>渠道售卖商品</div>
            </div>
            <div class="content-wrapper">
                <div class="addProduct">
                    <el-button size="mini" class="el-icon-plus" @click="addNewProduct">新增商品</el-button>
                </div>
                <table width="100%" >
                     <thead>
                         <th width="260" style="padding-left:20px">NGOC商品名称</th>
                         <th>NGOC商品编码</th>
                         <th>渠道商品名称</th>
                         <th>渠道商品编码</th>
                         <th>销售方式</th>
                         <th>收货方</th>
                         <th>最低价/元</th>
                         <th>最高价/元</th>
                         <th>备注</th>
                     </thead >
                     <tr v-for="(one,index) in checkProductList" :key="index">
                         <td width="260">
                             <el-select v-model="one.skuId"
                                        style="width: 250px"
                                        :filter-method="skuNameFilter"
                                        filterable
                                        size="small"
                                        clearable
                                        popper-class="max-length"
                                        placeholder="请选择或搜索商品"
                                        @clear="clearSkuId(index)"
                                        @change="queryProductDetail(one.skuId,index)"
                                     >
                                 <el-option
                                     v-for="(item,n) in productList"
                                     :key="n"
                                     :label="item.skuName"
                                     :value="item.skuId">
                                 </el-option>
                             </el-select>
                         </td>
                         <td :title="one.skuId" v-if="one.skuId">{{one.skuId}}</td>
                         <td v-else>--</td>
                         <td :title="one.unitName" v-if="one.unitName">{{one.unitName}}</td>
                         <td v-else>--</td>
                         <td :title="one.purchasePrice">
                             <el-input class="table-input" size="small" type="number" v-model="one.purchasePrice" :min="0" @keyup.native="setValue1(one,index)" @change="validateZero(one,index)"></el-input>
                         </td>
                         <td :title="one.purchaseCount">
                             <el-input class="table-input" size="small" type="number" v-model="one.purchaseCount" :min="0" @keyup.native="setValue(one,index)" @change="validateZero(one,index)" @onfocus.native="clearDefult(one.purchaseCount)"></el-input>
                         </td>
                         <td v-if="one.purchasePrice && one.purchaseCount">
                             <el-input class="table-input" size="small" type="number" :value="getTotalMoney(one)" :disabled="true"></el-input>
                         </td>
                         <td v-else>--</td>
                         <td :title="one.comment">
                             <div style="position: relative;">
                                 <el-input class="table-input" type="text" v-model="one.comment" size="small"></el-input>
                                 <div class="iconfont1 icon-shanchuhang" @click="deleteProduct(index)"></div>
                             </div>
                         </td>
                     </tr>
                 </table>
            </div>
        </div>
        <div style="height:20px;background-color:white"></div>
        <div class="orderContainer">
            <div class="orderCount">
                <p style="display: inline-block"> 订单合计金额:</p>
                <span>￥{{totalAmount}}</span>
            </div>
        </div>
        <div class="submitBtn">
            <el-button size="small" @click="OnBackLatePage">取消</el-button>
            <el-button  type="primary" @click="createPurchase('createPurchaseForm')" size="small">提交</el-button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import MessageMixins from "~/mixins/messages";
import PlatformMixins from "~/mixins/platform";
import GoodsSelect from "~/components/common/GoodsSelect";
import utils from "~/utils/misc";
import QuitMixins from "~/mixins/quit";
import { routesMapping } from "~/router";
export default {
  name: "CreateOutbound",
  mixins: [MessageMixins, PlatformMixins, QuitMixins],
  components: {
    GoodsSelect
  },
  data() {
    //正则校验
    let validatorStorehouseId = (rule, value, callback) => {
      if (!this.createPurchaseForm.storehouseId) {
        return callback(new Error("请选择收货仓库!"));
      } else {
        return callback();
      }
    };
    let validatorPlanArrivalTime = (rule, value, callback) => {
      if (!this.createPurchaseForm.planArrivalTime) {
        return callback(new Error("请选择到货时间!"));
      } else {
        return callback();
      }
    };
    return {
      operator: "",
      productList: [],
      productListTemp: [],
      checkProductList: [],
      storeList: [],
      supplierList: [],
      supplierListTemp: [],
      createPurchaseForm: {
        storehouseId: "",
        storehouseName: "",
        planArrivalTime: "",
        supplier: "",
        supplierId: "",
        comment: ""
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      rules: {
        storehouseId: [
          {
            required: true,
            validator: validatorStorehouseId,
            trigger: "change,blur"
          }
        ],
        planArrivalTime: [
          {
            required: true,
            validator: validatorPlanArrivalTime,
            trigger: "change,blur"
          }
        ]
      }
    };
  },
  mounted() {
    // this.querySockList();
    // this.initTableData();
    // this.getProductList();
    // this.getSupplierList();
    // const userName = sessionStorage.getItem('userName');
    // this.operator = userName;
  },
  computed: {
    ...mapState({
      getSkuListByCondition: ({ outboundWarehouseList }) =>
        outboundWarehouseList.productList
    }),
    totalAmount: function() {
      if (this.checkProductList.length > 0) {
        let res = 0;
        this.checkProductList.forEach(item => {
          res += parseInt(item.purchaseTotalPrice) || 0;
        });
        return res;
      }
    }
  },
  methods: {
    ...mapActions([
      "getStorehouseList",
      "querySupplierList",
      "querySkuList",
      "querySkuDetail",
      "showPageLoading",
      "createProcureOrder",
      "hidePageLoading"
    ]),
    initTableData() {
      this.checkProductList.push({
        purchaseCount: 0,
        productId: null,
        skuId: null,
        purchasePrice: null,
        comment: null
      });
    },
    querySockList() {
      this.getStorehouseList({ pageType: 2, storehouseStatus: [0] }).then(
        resp => {
          this.storeList = resp.result;
        }
      );
    },
    //获取渠道商品
    queryChannelForGoods() {},
    //获取商品名称
    getProductList() {
      this.querySkuList({ sku_status: 0 }).then(resp => {
        this.productList = resp;
        this.productListTemp = resp;
      });
    },
    getTotalMoney(row) {
      var purchaseCount = parseFloat(row.purchaseCount) || 0;
      var purchasePrice = parseFloat(row.purchasePrice) || 0;
      return purchaseCount * purchasePrice;
    },
    clearSkuId(index) {
      this.$set(this.checkProductList, index, { purchaseCount: 0 });
    },
    goodsSelect(resp, index) {
      resp.purchasePrice = resp.price;
      var product = Object.assign({}, this.checkProductList[index], resp);
      this.$set(this.checkProductList, index, product);
    },
    queryProductDetail(skuId, index) {
      if (!skuId) return;
      this.querySkuDetail({ skuId: skuId }).then(resp => {
        resp[0].purchaseCount = 0;
        resp[0].purchasePrice = resp[0].cost;
        resp[0].purchaseTotalPrice = 0;
        resp[0].comment = "";
        var product = Object.assign({}, this.checkProductList[index], resp[0]);
        this.$set(this.checkProductList, index, product);
      });
      // var pro = this.productList.find(item=>{
      //     if (item.skuId == skuId) {
      //         return item
      //     }
      // })
      // var product = Object.assign({},pro)
      // this.$set(this.checkProductList,index,product)
    },
    addNewProduct(index) {
      this.initTableData();
    },
    skuNameFilter(string) {
      let length = utils.getLength(string);
      if (!string) {
        return (this.productList = this.productListTemp);
      }
      if (length > 0 && length < 4) {
        this.productList = [];
      } else {
        this.productList = this.productListTemp.filter(item => {
          if (
            item.skuName.toString().indexOf(string) >= 0 ||
            item.productName.toString().indexOf(string) >= 0
          ) {
            return item;
          }
        });
      }
    },
    supplierFilter(string) {
      let length = utils.getLength(string);
      if (!string) {
        return (this.supplierList = this.supplierListTemp);
      }
      if (length > 0 && length < 4) {
        this.supplierList = [];
      } else {
        this.supplierList = this.supplierListTemp.filter(item => {
          console.log(item.supplierId);
          console.log(item.supplierName);
          if (
            item.supplierId.toString().indexOf(string) >= 0 ||
            item.supplierName.toString().indexOf(string) >= 0
          ) {
            return item;
          }
        });
      }
    },
    getSupplierList() {
      var reqData = {
        searchContent: this.createPurchaseForm.supplier,
        isPage: false
      };
      this.querySupplierList(reqData).then(resp => {
        if (resp.purchaseList && resp.purchaseList.length > 0) {
          this.supplierList = resp.purchaseList;
          this.supplierListTemp = resp.purchaseList;
        }
      });
    },
    querySearchAsync(queryString, cb) {
      let length = utils.getLength(queryString);
      if (length > 0 && length < 4) {
        cb([]);
        return;
      } else if (!queryString) {
        this.querySupplierList(queryString, cb);
      } else {
        this.querySupplierList(queryString, cb);
      }
    },
    querySupplierList(queryString, cb) {
      var reqData = {
        searchContent: queryString,
        isPage: false
      };
      var _this = this;
      this.querySupplierList(reqData).then(resp => {
        if (resp.purchaseList && resp.purchaseList.length > 0) {
          _this.supplierList = [];
          resp.purchaseList.forEach(function(item) {
            item.value = item.supplierName;
            _this.supplierList.push(item);
          });
        }
        cb(_this.supplierList);
      });
    },
    choosestorehouse(value) {
      let choosenItem = this.storeList.filter(
        item => item.storehouseId === value
      )[0];
      this.createPurchaseForm.storehouseId = choosenItem.storehouseId;
      this.createPurchaseForm.storehouseName = choosenItem.storehouseName;
    },
    chooseSupplier(value) {
      let choosenItem = this.supplierList.filter(
        item => item.supplierId === value
      )[0];
      this.createPurchaseForm.supplierId = choosenItem.supplierId;
      this.createPurchaseForm.supplier = choosenItem.supplierName;
    },
    deleteProduct(index) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.checkProductList.splice(index, 1);
          this.showSuccess();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //设置采购单价
    setValue1(row, index) {
      if (parseInt(row.purchasePrice) < 0) {
        row.purchasePrice = 0;
        this.$set(this.checkProductList[index], "price", 0);
      } else if (
        row.purchasePrice.length > 1 &&
        row.purchasePrice.indexOf(0) === 0
      ) {
        row.purchasePrice = " ";
      } else if (row.purchasePrice && row.purchaseCount) {
        row.purchaseTotalPrice = row.purchasePrice * row.purchaseCount;
        this.$set(
          this.checkProductList[index],
          "purchaseTotalPrice",
          row.purchaseTotalPrice
        );
      } else {
        this.$set(this.checkProductList[index], "purchaseTotalPrice", 0);
      }
    },
    //设置采购数量
    setValue(row, index) {
      if (parseInt(row.purchaseCount) < 0) {
        row.purchaseCount = 0;
        this.$set(this.checkProductList[index], "purchaseTotalPrice", 0);
      } else if (
        row.purchaseCount.length > 1 &&
        row.purchaseCount.indexOf(0) === 0
      ) {
        row.purchaseCount = " ";
      } else if (row.purchasePrice && row.purchaseCount) {
        row.purchaseTotalPrice = row.purchasePrice * row.purchaseCount;
        this.$set(
          this.checkProductList[index],
          "purchaseTotalPrice",
          row.purchaseTotalPrice
        );
      } else {
        this.$set(this.checkProductList[index], "purchaseTotalPrice", 0);
      }
    },
    // 校验输入的值是否为0
    validateZero(row, index) {
      if (!parseInt(row.purchasePrice)) {
        row.purchasePrice = 0;
        this.$set(this.checkProductList[index], "purchasePrice", 0);
      }
      if (!parseInt(row.purchaseCount)) {
        row.purchaseCount = 0;
        this.$set(this.checkProductList[index], "purchaseTotalPrice", 0);
      }
    },
    clearDefult(count) {
      count = " ";
    },
    //创建
    createPurchase(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let validatePurchaseCount = true;
          let productList = true;
          let validatePurchasePrice = true;
          if (this.checkProductList.length < 1) {
            this.showWarning("请添加商品清单");
            return false;
          }
          this.checkProductList.forEach(item => {
            if (Number(item.purchaseCount) === 0) {
              validatePurchaseCount = false;
            }
            if (item.productId == null || item.skuId == null) {
              productList = false;
            }
            if (!item.purchasePrice || item.purchasePrice == null) {
              validatePurchasePrice = false;
            }
          });
          if (validatePurchaseCount === false) {
            this.showWarning("采购数量不能为0");
            return false;
          }
          if (productList === false) {
            this.showWarning("请完善商品信息");
            return false;
          }
          if (validatePurchasePrice === false) {
            this.showWarning("采购价格不能为空");
            return false;
          }
          let productDetailListArray = [];
          this.checkProductList.forEach(item => {
            productDetailListArray.push({
              productId: item.productId,
              skuId: item.skuId,
              purchasePrice: item.purchasePrice,
              purchaseCount: item.purchaseCount,
              comment: item.comment
            });
          });
          //                        productDetailListArray.filter(item=>{
          //                            debugger
          //                            if(item.skuId == null || !item.skuId){
          //                                console.log(55555)
          //                                return
          //                            }
          //                        })
          this.createPurchaseForm.skuList = productDetailListArray;
          this.createProcureOrder(this.createPurchaseForm).then(resp => {
            this.showSuccess("操作成功");
            this.OnBackLatePage();
          });
        } else {
          this.showWarning("请先正确填写表单信息!");
          return false;
        }
      });
    },
    //点击取消
    OnBackLatePage() {
      this.quit(routesMapping.PurchaseOrder, true);
    }
  }
};
</script>
<style lang='scss'>
.createPurchase-view {
  height: 100%;
  position: relative;
  padding: 20px;
  .content {
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
    .orderCount {
      height: 50px;
      line-height: 50px;
      float: right;
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
}
</style>
<style lang='scss'>
.createPurchase-view {
  .procurements-config-wrapper {
    overflow: inherit;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 200px;
  }
  table {
    border-collapse: collapse;
  }
  .el-table tr {
    position: relative;
    .close-img-btn {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1000;
      display: none;
      width: 16px;
      height: 16px;
      background: transparent url("../../layouts/images/close-red.png")
        no-repeat;
      background-size: contain;
    }
    &:hover {
      border: 2px dashed #539eff;
      .close-img-btn {
        display: block;
        cursor: pointer;
      }
    }
  }
}
</style>
