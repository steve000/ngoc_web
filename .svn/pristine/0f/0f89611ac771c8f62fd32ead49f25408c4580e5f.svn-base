<template>
    <div class="create-storage">
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper">
                <el-form label-position="right" label-width="140px" :model="param" :rules="rules" class="topContent">

                    <el-form-item label="收货仓库：" required>
                        <el-input class="rowUI"  v-model="param.storehouseName" size="small" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="供应商：" required>
                        <el-input class="rowUI"  v-model="param.vendorName" size="small" :disabled="true"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="合同名称：" prop="contractName">
                        <el-select
                            v-model="param.contractName"
                            size="small"
                            class="rowUI"
                            clearable
                            filterable
                            :filter-method="contractNameFilter"
                            placeholder="选择合同名称："
                            no-data-text="没有找到相关的合同"
                            @change="selectedContract">
                            <el-option
                            v-for="(item, k) in contractList"
                            :key="item.conNo + k + item.conName"
                            :label="item.conName"
                            :value="item.conNo">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="合同编号：" >
                        <el-input class="rowUI"  v-model="param.contractNo" size="small" :disabled="true"></el-input>
                    </el-form-item>

                    <el-col :span="13" style="margin-top: 5px" prop="comments">
                        <el-form-item label="备注：">
                            <el-input type="textarea"
                                      :autosize="{ minRows: 5, maxRows: 5 }"
                                      :maxlength="200"
                                      v-model="param.comments" placeholder="请输入备注，200字以内"></el-input>
                            <span>{{param.comments.length}}/200</span>
                        </el-form-item>
                    </el-col>

                </el-form>
            </div>
        </div>

        <div class="content">
            <div class="title">
                <div>商品清单</div>
            </div>
            <div class="content-wrapper">
                <div class="form-item-contaniner">
                    <div class="addProduct">
                        <el-button size="mini" @click="addNewProduct">
                            <i class="el-icon-plus"></i>
                            <span>添加商品行</span>
                        </el-button>
                    </div>
                    <table class="productTable native-table-show">
                        <thead>
                            <tr class="thead-tr-show">
                                <th width="16%" style="padding-left:20px">商品名称</th>
                                <th width="16%">sku编码</th>
                                <th width="12%">单位</th>
                                <th width="12%">退货价(元)</th>
                                <th width="12%">退货数量(元)</th>
                                <th width="12%">总价(元)</th>
                                <th width="20%">备注</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(one,index) in checkskuList" class="tbody-tr-show">
                            <!--sku名称-->
                            <td>
                                <el-select v-model="one.skuName"
                                           style="padding-left: 13px"
                                           :filter-method="skuNameFilter"
                                           filterable
                                           size="small"
                                           popper-class="max-length"
                                           placeholder="请选择或输入商品的名字"
                                           @change="queryProductDetail(one.skuName,index)"
                                           class="text-dash-show"
                                >
                                    <el-option
                                        v-for="(item,n) in skuList"
                                        :key="item.skuId + n + item.skuName"
                                        :label="item.skuName"
                                        :value="item.skuId">
                                    </el-option>
                                </el-select>
                            </td>
                            <!--sku编码-->
                            <td :title="one.skuId"><span>{{one.skuId ? one.skuId : '--'}}</span></td>
                            <!-- 单位 -->
                            <td :title="one.unitName"><span>{{one.unitName ? one.unitName : '--'}}</span></td>
                            <!-- 退货价 -->
                            <td :title="one.purchasePrice">
                              <el-input class="table-input" size="small" type="number" :disabled="contractName!=''" v-model="one.purchasePrice" @keyup.native="priceChange(one)" @blur="priceChange(one)" :min="0"></el-input>
                              </td>
                            <!--退货数量-->
                            <td :title="one.returnCount">
                                <el-input class="table-input" size="small" type="number" :disabled="contractName!=''" v-model="one.returnCount" @keyup.native="getpurchaseTotalPrice(one)" @blur="getpurchaseTotalPrice(one)" :min="0" :class="one.isCountValidate == false?'unvalid':''"></el-input>
                            </td>
                            <!-- 总价 -->
                            <td :title="one.totalPrice"><span>{{one.totalPrice ? one.totalPrice : '--'}}</span></td>
                            <td :title="one.comments">
                                <div class="table-operation">
                                    <el-input class="table-input" type="text" placeholder="请输入20字备注" :maxlength="20" v-model="one.comments"
                                              size="small"></el-input>
                                    <div class="iconfont1 icon-shanchuhang" @click="deleteProduct(index)"></div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="orderContainer">
                        <div class="orderCount">
                            配送合计金额 : <span>￥{{totalAmount}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-section pt20">
            <el-button type="primary" size="small" @click="createStockOutFrom()">提交</el-button>
            <el-button  size="small" class="cancel-button" @click="quit(routesMapping.purchaseIndex,true)">取消</el-button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import MessageMixins from "~/mixins/messages";
import PlatformMixins from "~/mixins/platform";
import QuitMixins from "~/mixins/quit";
import AddressSelect from "~/components/common/AddressSelect";
import utils from "~/utils/commonMethod";

export default {
  name: "purchaseReturnBillEdit",
  mixins: [MessageMixins, PlatformMixins, QuitMixins],
  components: { AddressSelect },
  data() {
    let contractTest = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择合同"));
      } else {
        return callback();
      }
    };
    let validatorComments = (rule, value, callback) => {
      if (value.length > 200) {
        return callback(new Error("请输入200以内的汉字"));
      } else {
        return callback();
      }
    };
    return {
      //根据登录拿到
      operator: "",
      entityName: "",
      userGroupId: 0,
      // 提交信息
      creatData: {},
      //  拿到编辑信息
      param: {
        comments: ""
      },
      // 传过来的参数
      seqNo: 0,
      //   客户实体
      allGroupList: [],
      filterAllGroupList: [],
      // 商品列表
      skuList: [],
      skuListTemp: [],
      checkskuList: [{}],
      // 合同
      contractList:[],
      contractListTemp: [],
      rules: {
        contractName: [{ required: true, validator: contractTest, trigger: 'blur' }],
        comments: [{required: false,validator: validatorComments,trigger: "change"}]
      },
    };
  },
  computed: {
    totalAmount: function() {
      console.log(this.checkskuList,"计算总额")
      if (this.checkskuList.length > 0) {
        let resNumType = 0;
        this.checkskuList.forEach(item => {
          let StockOutTotalPrice = Number(item.totalPrice) || 0;
          resNumType += StockOutTotalPrice;
        });
        resNumType = Number(resNumType).toFixed(2);
        console.log(resNumType,"????duoshao")
        return resNumType;
      }
    }
  },
  // watch: {
  //     checkskuList: function (navl, oval) {
  //         console.log(navl,oval,"123")
  //         let Arr1 = [];
  //         navl.forEach((item, index) => {
  //             Arr1.push(item.totalPrice)
  //         })
  //         this.totalAmount = eval(Arr1.join('+'))
  //     }
  // },
  mounted() {
    this.operator = sessionStorage.getItem("userName");
    this.entityName = sessionStorage.getItem("entityName");
    this.userGroupId = sessionStorage.getItem("entityId");
    this.seqNo = this.$route.params.seqNo;
    console.log(this.seqNo,"带过来的参数")
    this.queryData(); //初始化根据参数拿到详细数据
  },
  methods: {
    ...mapActions([
      "purchaseVendorLIstByUserGroup", //查询实体下供应商列表
      "queryUserGroupStoreHouse", //查仓库接口
      "purchaseReturnBillQuery", //拿到详细数据
      "purchaseReturnBillEdit", //要货编辑接口
      "purchaseContractQueryall", //拿到所有合同(实体id,供应商id)
      "purchaseContractQuery", //根据合同seqNo  拿到skuList
      "showPageLoading",
      "hidePageLoading"
    ]),
    // 查询详细数据
    queryData() {
      this.showPageLoading();
      this.purchaseReturnBillQueryFunction({ seqNo: this.seqNo });
    },
    purchaseReturnBillQueryFunction(param) {
      this.purchaseReturnBillQuery(param).then(resp => {
        this.hidePageLoading();
        // console.log(resp,"32142312");
        this.param = resp;
        // 拿到详情里的skuList
        if (resp.skuList.length > 0) { 
          let contractSkuList = resp.skuList;
          for (let iii = 0; iii < contractSkuList.length; iii++) {
            contractSkuList[iii].purchasePrice = Number(contractSkuList[iii].purchasePrice) / 100;
            contractSkuList[iii].totalPrice = Number(contractSkuList[iii].purchasePrice) * Number(contractSkuList[iii].returnCount); //总价
          }
          console.log(contractSkuList,"根据合同id拿到商品信息");  
          // this.checkskuList = contractSkuList;
          this.skuList = contractSkuList;
          this.skuListTemp = contractSkuList;
        } else {
          this.$message("合同中没有商品信息带出");
        }
        console.log(this.param,"待编辑的详细信息");
        console.log(this.checkskuList,"拿到的商品列表");

        //供应商和实体信息 拿到合同list
        this.purchaseContractAll(this.param.vendorNumber,this.param.vendorName); 
      });
    },

    //拿到所有合同数据
    purchaseContractAll(vendorNumber,vendorName) {
      if (vendorName === "") {
        this.$message({
          message: "请先选择供应商",
          type: "warning"
        })
      } else {
        let postData = {
          conVendorId: vendorNumber,
          vendorName: vendorName,
          userGroupId: this.userGroupId
        };
        this.purchaseContractQueryall(postData).then(res => {
          console.log(res);
          this.contractListTemp = res.result;
          this.contractList = res.result;
        });
      }
    },
    // 选择
    contractNameFilter(string) {
      if (!string) {
        return (this.contractList = this.contractListTemp);
      }
      this.contractList = this.contractListTemp.filter(item => {
        if (
          (item.skuId && item.skuId.toString().indexOf(string) >= 0) ||
          (item.skuName && item.skuName.toString().indexOf(string)) >= 0
        ) {
          return item;
        }
      });
    },
    // 选择合同名称后带出合同编码
    selectedContract(val) {
      console.log(val,"拿到合同id");
      this.param.contractNo = val;
      this.param.contractSeqNo = this.contractList.find((item,index) => {
            return item.conNo === val;
        }).contractSeqNo;
        this.getPurchaseList(this.param.contractSeqNo)   //选择合同后拿到带有采购单价价skuList  （合同详情接口）
    },

    // 根据合同拿到详情（包含采购价等商品list）
    getPurchaseList(contractSeqNo) {
      this.purchaseContractQuery({contractSeqNo: contractSeqNo}).then(resp => {
        //根据合同id 拿到详情里的productList
        if (resp.productList.length > 0) {
          let contractSkuList = resp.productList;
          for (let iii = 0; iii < contractSkuList.length; iii++) {
            contractSkuList[iii].purchasePrice = contractSkuList[iii].taxIncludePrice; //含税采购价作为采购单价
            contractSkuList[iii].returnCount = contractSkuList[iii].purchaseCount; //含税采购价作为采购单价
            contractSkuList[iii].totalPrice = Number(contractSkuList[iii].purchasePrice) * Number(contractSkuList[iii].returnCount); //总价
          }
          console.log(contractSkuList,"根据合同id拿到商品信息");  
          this.skuList = contractSkuList;
          this.skuListTemp = contractSkuList;
        }
      });
    },
    // 单价改变设置总价
    priceChange(item, index) {
      console.log(item,index,"输入采购价,计算");
      if (!item.purchasePrice) {
        console.log("计算11");
          if (item.purchasePrice === '') {
              this.$set(item, "totalPrice", utils.mul(item.purchasePrice, item.returnCount))
          }
          this.$set(item, "purchasePrice", undefined)
          return false
      }
      if (utils.ifNoNum(item.purchasePrice)) {
        console.log("计算22");
          this.$set(item, "purchasePrice", Number(item.purchasePrice))
          this.$set(item, "oldpPurchasePrice", Number(item.purchasePrice))
          this.$set(item, "totalPrice", utils.mul(item.purchasePrice, item.returnCount))
          console.log(item.totalPrice,"计算出的金额-单价");
      } else {
        console.log("计算33");
          this.$set(item, "purchasePrice", item.oldpPurchasePrice)
      }
    },
    // 选择采购数量 计算出单项总额
    getpurchaseTotalPrice(item) {
      console.log(item,"输入采购数量，计算出单项采购价");

      if (item.returnCount === '') {
        console.log(11)
        this.$set(item, "returnCount", undefined)
        return false
      }
      if (utils.isDigit(item.returnCount)) {
        console.log(22)
        this.$set(item, "returnCount", Number(item.returnCount))
        this.$set(item, "oldReturnCount", Number(item.returnCount))
        this.$set(item, "totalPrice", utils.mul(item.purchasePrice, item.returnCount))
          console.log(item.totalPrice,"计算出的金额-数量");
      } else {
        console.log(33)
        this.$set(item, "returnCount", item.oldReturnCount);
      }

    },

    // 清空收货仓
    clearInStoreInfo() {
      this.createStockIn = {};
    },
    createStockOutFrom() {
      //   this.$refs["createStockOut"].validate(valid => {
      // if (valid) {
      //   this.$refs["address"].validate(valid => {
      // if (valid) {
      this.submitForm();
      // } else {
      //   this.showWarning("请完善地址信息");
      // }
      //   });
      // } else {
      //   this.showWarning("请完善表单信息");
      // }
      //   });
    },
    submitForm() {
      if (this.checkskuList.length <= 0) {
        this.showWarning("请添加商品清单");
        return;
      }
      //   提交数据汇总
      console.log(this.param, "头部信息");
      console.log(this.checkskuList, "商品清单信息");

      this.creatData.vendorSeqNo = this.param.vendorSeqNo;
      this.creatData.vendornumber = this.param.vendornumber;
      this.creatData.vendorName = this.param.vendorName;
      this.creatData.contractNo = this.param.contractNo;
      this.creatData.contractSeqNo = this.param.contractSeqNo;
      this.creatData.comments = this.param.comments;
      this.creatData.seqNo = this.param.seqNo;
      this.creatData.purchaseReturnNo = this.param.purchaseReturnNo;

      this.creatData.skuList = [];

      for (let i = 0; i < this.checkskuList.length; i++) {
        let checkskuListItem = this.checkskuList[i];
        if (!Number(checkskuListItem.returnCount)) {
          this.showWarning("退货数量不能为空或者0");
          return false;
        }
        if (checkskuListItem.purchasePrice === "") {
          this.showWarning("请正确填写商品单价");
          return false;
        }

        let skuListItem = {
          skuId: checkskuListItem.skuId,
          skuName: checkskuListItem.skuName,
          productId: checkskuListItem.productId,
          productName: checkskuListItem.productName,
          unitId: checkskuListItem.unitId,
          unitValue: checkskuListItem.unitValue,
          unitName: checkskuListItem.unitName,
          purchasePrice: Number(checkskuListItem.purchasePrice) * 100,
          returnCount: checkskuListItem.returnCount,
          comments: checkskuListItem.comments?checkskuListItem.comments:"--",
          seqNo: checkskuListItem.seqNo,
          productSeriaNo: i+1
        };
        this.creatData.skuList.push(skuListItem);
      }
      this.showPageLoading();
      this.purchaseReturnBillEdit(this.creatData)
        .then(resp => {
          this.hidePageLoading();
          this.$message({
            message: "退货单编辑成功",
            type: "success"
          });
          this.quit(this.routesMapping.purchaseReturnBillIndex, true);
        })
        .catch(error => {
          this.$message({
            message: error.msg,
            type: "warning"
          });
          this.hidePageLoading();
        });
    },
    addNewProduct() {
      this.checkskuList.push({});
    },
    deleteProduct(index) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // let clearData = this.checkskuList[index]
        this.checkskuList.splice(index, 1);
        // this.skuList.push(clearData);
        // this.skuListTemp.push(clearData);
        this.$message({
          message: "删除成功",
          type: "success"
        });
      });
    },
    setSelectTips() {
      setTimeout(() => {
        let aa = document.getElementsByClassName(
          "el-select-dropdown__empty"
        )[0];
        if (aa && aa.textContent) {
          aa.textContent = "请输入不少于4个字符查询条件";
        }
      }, 50);
    },
    setSelectTipsDataNone() {
      setTimeout(() => {
        let aa = document.getElementsByClassName(
          "el-select-dropdown__empty"
        )[0];
        if (aa && aa.textContent) {
          aa.textContent = "无数据";
        }
      }, 50);
    },
    //过滤商品
    skuNameFilter(string) {
      if (!string) {
        return (this.skuList = this.skuListTemp);
      }
      this.skuList = this.skuListTemp.filter(item => {
        if (
          item.skuName.toString().indexOf(string) >= 0 ||
          item.productName.toString().indexOf(string) >= 0 ||
          item.skuId.toString().indexOf(string) >= 0
        ) {
          return item;
        }
      });
    },

    queryProductDetail(skuId, index) {
      console.log(skuId, index, "21321");
      console.log(this.skuList, this.skuListTemp, "当前已有list");
      console.log(this.checkskuList, "当前已有勾选数据");
      if (!skuId) return false;
      this.checkskuList[index] = this.skuListTemp.find(item => {
        return item.skuId === skuId;
      });
      console.log(this.checkskuList, "勾选后商品信息");
      // 选择完之后 skulist 变少一条
      // var newArr = new Array();
      // for (var i = 0; i < this.skuList.length; i++) {
      //   var j = this.skuList[i];
      //   if (j.skuId !== skuId) {
      //     newArr.push(j);
      //   }
      // }
      // this.skuList = newArr;
      // this.skuListTemp = newArr;
      // console.log(this.skuList, this.skuListTemp, "剔除之后的list");
    },
    // clearSkuId(index) {
    //   let clearData = this.checkskuList[index]
    //   this.$set(this.checkskuList, index, {});
    //   this.skuList.push(clearData);
    //   this.skuListTemp.push(clearData);
    // }
  }
};
</script>

<style lang="scss">
.create-storage {
  height: auto;
  margin: 20px 20px 0 20px;
  .content-wrapper {
    clear: both;
    .topContent {
      height: 330px;
      .el-form-item {
        width: 50%;
        float: left;
        .el-form-item {
          width: 50%;
          float: left;
        }
      }
    }
  }
  .content {
    .title {
      color: #333;
      font-weight: 700;
    }
    .addProduct {
      margin-bottom: 16px;
    }
    .form-item-contaniner {
      .orderContainer {
        background-color: #fbfbfb;
        padding: 0px 20px;
        border: 1px solid #f1f1f1;
        height: 50px;
        line-height: 50px;
        margin-top: 20px;
        .orderCount {
          text-align: right;
          span {
            color: red;
            font-size: 18px;
          }
        }
      }
    }
  }
  .receiveAddress {
    display: inline-block;
  }
  .btn-section {
    padding-bottom: 20px;
    background-color: #fff;
    width: 100%;
    .el-button {
      padding: 10px 0px;
      font-size: 14px;
    }
    .cancel-button {
      color: #3b8cff;
      border: 1px solid #bfd9fe;
    }
  }
  .unvalid {
    border-radius: 5px;
    .el-input__inner {
      border-color: red !important;
    }
  }
  .el-form-item__label {
    padding-right: 20px;
    border-radius: 0px;
  }

  .form-input-width {
    width: 300px;
    font-size: 12px;
    color: #666;
  }
  .el-table {
    .row-show {
      color: #333;
      text-align: left;
    }
    .title {
      display: flex;
      justify-content: space-between;
    }
  }
  .el-form-item {
    span {
      color: #333;
    }
    .el-textarea {
      width: 1158px;
    }
    .el-form-item__label {
      color: #333;
    }
  }
  .order-form-item {
    position: relative;
    .order-tips {
      position: absolute;
      left: 0px;
      top: 34px;
      font-size: 12px;
    }
  }
  .search_div {
    margin: 0px 0px 20px;
    .el-form-item {
      margin-bottom: 0px;
    }
    .el-select {
      width: 250px;
    }
  }
  .float_button {
    text-align: right;
  }
  .operator_button {
    color: #409eff;
    font-size: 14px;
    cursor: pointer;
  }
  .flex {
    display: flex;
    flex-wrap: nowrap;
    .flex-item {
      max-height: 50%;
      min-width: 400px;
    }
  }
}
</style>
<style lang='scss'>
.el-select-dropdown > el-popper {
  width: 296px;
}
</style>
