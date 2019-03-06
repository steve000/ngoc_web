<template>
    <div class="create-storage">
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper">
                <el-form label-position="right" label-width="130px" :model="param" :rules="rules" class="topContent">
                    <el-form-item label="操作人：" required>
                        <el-input class="form-input-width"  v-model="param.operator" size="small" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="要货实体：" required>
                        <el-input class="form-input-width"  v-model="param.entityName" size="small" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="配送实体：" prop="disUserGroupName">
                        <el-select v-model="param.disUserGroupName"
                                   class="form-input-width"
                                   size="small"
                                   placeholder="请选择配送实体"
                                   @change="customGroupChoosed(param.disUserGroupName)"
                                   :popper-class="'max-length'"
                                >
                            <el-option
                                v-for="(item,index) in allGroupList"
                                :key="index"
                                :label="item.groupName"
                                :value="item.userGroupId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="收货仓库： " prop="createInStorehouseName">
                        <el-select v-model="param.createInStorehouseName"
                                    class="form-input-width"
                                    placeholder="仓库名称或者编码"
                                    size="small"
                                    clearable
                                    filterable
                                    @clear="clearInStoreInfo()"
                                    @change="inStoreChoosed(param.createInStorehouseName)"
                                    :filter-method="inStoreFilter"
                                    :popper-class="'max-length'"
                                  >
                            <el-option v-for="(item,index) in inStorehouseList"
                                        :key="item.storehouseName + index + item.storehouseId"
                                        :label="item.storehouseName"
                                        :value="item.storehouseId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-col :span="13" style="margin-top: 5px" prop="remark">
                        <el-form-item label="备注：">
                            <el-input type="textarea"
                                      :autosize="{ minRows: 5, maxRows: 5 }"
                                      :maxlength="200"
                                      v-model="param.remark" placeholder="请输入备注，200字以内"></el-input>
                                      <span>{{param.remark.length}}/200</span>
                        </el-form-item>
                    </el-col>
                </el-form>
            </div>
        </div>

        <div class="content">
            <div class="title">
                <div>收货仓信息</div>
            </div>
            <div class="content-wrapper">
                <el-form label-position="right" label-width="110px" :model="createStockIn" :rules="addressValidate"  ref="address">
                        <div class="displayStyle">
                            <el-form-item label="收货人：" prop="linkman" >
                                <el-input v-model="createStockIn.linkman" size="small"
                                          placeholder="选择收货仓带出收货人" :maxlength="20"  disabled></el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                            <el-form-item label="联系电话：" prop="phone" >
                                <el-input v-model="createStockIn.phone" size="small" type="number"
                                          placeholder="选择收货仓带出联系电话" disabled></el-input>
                            </el-form-item>
                        </div>
                        <!-- <div class="displayStyle">
                            <el-form-item label="所在地区：" prop="area" >
                                <el-input v-model="createStockIn.storeArea" size="small"
                                            placeholder="选择收货仓带出所在地区" disabled></el-input>
                            </el-form-item>
                        </div> -->
                        <div class="displayStyle">
                            <el-form-item label="详细地址：" prop="storehouseAddress">
                                <el-input v-model="createStockIn.storehouseAddress" size="small" placeholder="选择收货仓带出详细地址"
                                        :maxlength="90" disabled></el-input>
                            </el-form-item>
                        </div>
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
                                <th width="230" style="padding-left:20px">商品名称</th>
                                <th width="150">sku编码</th>
                                <th width="110">单位</th>
                                <th width="150">要货数量</th>
                                <th min-width="150">备注</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(one,index) in checkskuList" class="tbody-tr-show">
                            <!--sku名称-->
                            <td>
                                <el-select v-model="one.skuName"
                                           style="padding-left: 13px"
                                           filterable
                                           clearable
                                           size="small"
                                           @focus="chooseGoods"
                                           popper-class="max-length"
                                           placeholder="请选择商品"
                                           @change="queryProductDetail(one.skuName,index)"
                                           class="text-dash-show"
                                >
                                    <el-option
                                        v-for="(item,n) in skuList"
                                        :key="item.skuId + n + item.skuName"
                                        :label="item.skuName"
                                        :value="item">
                                    </el-option>
                                </el-select>
                            </td>
                            <!--sku编码-->
                            <td :title="one.skuId"><span>{{one.skuId ? one.skuId : '--'}}</span></td>
                            <!-- 单位 -->
                            <td :title="one.unitName"><span>{{one.unitName ? one.unitName : '--'}}</span></td>
                            <!--要货数量-->
                            <td :title="one.requireCount">
                                <el-input placeholder="0" class="table-input" size="small" type="number" v-model="one.requireCount" :min="0" @keyup.native="getpurchaseTotalPrice(one)" @blur="getpurchaseTotalPrice(one)"></el-input>
                            </td>
                            <td :title="one.remark">
                                <div class="table-operation">
                                    <el-input class="table-input" type="text" placeholder="请输入20字备注" :maxlength="20" v-model="one.remark"
                                              size="small"></el-input>
                                    <div class="iconfont1 icon-shanchuhang" @click="deleteProduct(index)"></div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="btn-section pt20">
            <el-button type="primary" size="small" @click="createStockOutFrom('createStockOut')">提交</el-button>
            <el-button  size="small" class="cancel-button" @click="quit(routesMapping.distributionIndex,true)">取消</el-button>
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
  name: "requireOrderAdd",
  mixins: [MessageMixins, PlatformMixins, QuitMixins],
  components: { AddressSelect },
  data() {
    let validatorComments = (rule, value, callback) => {
      if (value.length > 200) {
        return callback(new Error("请输入200以内的汉字"));
      } else {
        return callback();
      }
    };
    let validatePhone = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        console.log("4444");
        const phoneReg = /^[1][3,4,7,8][0-9]{9}$/;
        let res = phoneReg.test(value);
        if (res) {
          callback();
        } else {
          callback(new Error("请输入正确的电话号码！"));
        }
      }
    };
    return {
      // 所以提交信息
      creatData: {},
      // 选择仓库后的信息
      createStockOut: {},
      createStockIn: {},
      //   其他信息
      param: {
        operator: sessionStorage.getItem("userName"),
        entityName: sessionStorage.getItem("entityName"),
        userGroupId: sessionStorage.getItem("entityId"),
        disUserGroupId: 0,
        disUserGroupName: "",
        billType: "主动配送",
        createInStorehouseName: "",
        remark: ""
      },
      //   客户实体
      allGroupList: [],
      filterAllGroupList: [],
      //   商品列表
      skuList: [],
      skuListTemp: [],
      checkskuList: [{}],
      // 发货仓库list
      outStorehouseList: [],
      outStorehouseListTemp: [],
      // 收货仓库list
      inStorehouseList: [],
      inStorehouseListTemp: [],
      rules: {
        disUserGroupName: [{required: true, message: "请选择配送实体", trigger: 'change'}],
        createInStorehouseName: [{required: true, message: "请选择收货仓库", trigger: 'change'}],
        remark:[{required: false, validator: validatorComments, trigger: 'change'}],
      },
      addressValidate: {
        linkman: [{required: false,message: "请输入联系人", trigger: 'change'}],
        phone: [{required: false, validator: validatePhone, trigger: 'change'}],
        storehouseAddress: [{required: false, message: "请输入地址", trigger: 'change'}],
      }
    };
  },
  computed: {
    totalAmount: function() {
      if (this.checkskuList.length > 0) {
        let resNumType = 0;
        this.checkskuList.forEach(item => {
          let StockOutTotalPrice = item.skuPrice * item.stockOutCount || 0;
          resNumType += StockOutTotalPrice;
        });
        resNumType = Number(resNumType).toFixed(2);
        return resNumType;
      }
    }
  },
  mounted() {
    // 当前登录实体为要货实体 拿到收货仓库
    this.getInStorehouseType();
    this.getAllGroupList();
  },
  methods: {
    ...mapActions([
      "userGroupAll", //查询所有实体
      "queryUserGroupStoreHouse", //查仓库接口
      "querySkuListByUserGroup", //拿到用户下商品列表   选择用户后执行
      "requireOrderAdd", //要货新增接口
      "showPageLoading",
      "hidePageLoading"
    ]),
    //拿到所有用户实体作为配送实体
    getAllGroupList() {
      let postData = {
        groupName: this.entityName,
        status: 1
      };
      this.userGroupAll(postData).then(resp => {
        this.filterAllGroupList = resp.result;
        this.allGroupList = this.filterAllGroupList.filter(item => {
          if (item.groupName && item.groupName !== this.param.entityName) {
            return item;
          }
        });
        console.log(this.allGroupList, "配送实体");
      });
    },
    // 选择配送实体
    customGroupChoosed(val) {
      console.log(val, "选择的配送实体ID");
      this.param.disUserGroupId = val;
      this.param.disUserGroupName = this.allGroupList.find(item => {
        return item.userGroupId === val;
      }).groupName;
      // this.getOutStorehouseType(val); //执行拿发货仓list  要货订单无发货仓
      this.getSkuListByUserGroup(val); //拿到配送实体下商品列表
    },
    // 发货仓 配送实体ID
    getOutStorehouseType(val) {
      if (val !== "") {
        let postData = {
          userGroupId: val,
          status: 0,
          storehouseChildType: 1
        };
        this.queryUserGroupStoreHouse(postData).then(resp => {
          resp.result.forEach(function (i, k) {
              i.storeArea = i.province + "-" + i.city + "-" + i.area
              return i
          });
          this.outStorehouseList = resp.result;
          this.outStorehouseListTemp = resp.result;
          console.log(this.outStorehouseListTemp, "发货仓list");
        });
      } else {
        this.$message({
          message: "请先选择配送实体",
          type: "warning"
        });
      }
    },
    // 收货仓 当前登录实体ID
    getInStorehouseType() {
      let postData = {
        userGroupId: this.param.userGroupId,
        status: 0,
        storehouseChildType: 1
      };
      this.queryUserGroupStoreHouse(postData).then(resp => {
        resp.result.forEach(function (i, k) {
            i.storeArea = i.province + "-" + i.city + "-" + i.area
            return i
        });
        this.inStorehouseList = resp.result;
        this.inStorehouseListTemp = resp.result;
        console.log(this.inStorehouseListTemp, "收货仓list");
      });
    },
    //拿到用户下商品列表
    getSkuListByUserGroup(userGroupId) {
      let postData = {
        userGroupId: userGroupId,
        status: 1
      };
      this.querySkuListByUserGroup(postData).then(resp => {
        // 过滤操作用
        this.skuList = resp.result;
        this.skuListTemp = resp.result;
        console.log(this.skuListTemp, "配送实体下商品列表");
      });
    },
    // 发货仓
    outStoreChoosed(storehouseId) {
      console.log(storehouseId, "发货仓");
      if (!storehouseId) return false;
      this.createStockOut = this.outStorehouseListTemp.find(item => {
        return item.storehouseId === storehouseId;
      });
      console.log(this.createStockOut, "发货仓信息");
    },
    outStoreFilter(string) {
      if (!string) {
        return (this.outStorehouseList = this.outStorehouseListTemp);
      }
      this.outStorehouseList = this.outStorehouseListTemp.filter(item => {
        if (
          (item.storehouseId &&
            item.storehouseId.toString().indexOf(string) >= 0) ||
          (item.storehouseName &&
            item.storehouseName.toString().indexOf(string)) >= 0
        ) {
          return item;
        }
      });
    },
    // 收货仓
    inStoreChoosed(storehouseId) {
      console.log(storehouseId, "收货仓");
      if (!storehouseId) return false;
      this.createStockIn = this.inStorehouseListTemp.find(item => {
        return item.storehouseId === storehouseId;
      });
      console.log(this.createStockIn, "收货仓信息");
    },
    inStoreFilter(string) {
      if (!string) {
        return (this.inStorehouseList = this.inStorehouseListTemp);
      }
      this.inStorehouseList = this.inStorehouseListTemp.filter(item => {
        if (
          (item.storehouseId &&
            item.storehouseId.toString().indexOf(string) >= 0) ||
          (item.storehouseName &&
            item.storehouseName.toString().indexOf(string)) >= 0
        ) {
          return item;
        }
      });
    },

    chooseGoods() {
      if (this.param.disUserGroupId == 0) {
        this.showWarning("请先选择配送实体!");
        return false;
      }
    },
    // 选择要货数量
    getpurchaseTotalPrice(item) {
      console.log(item,"输入要货数量，计算");
      if (item.requireCount === '') {
        console.log("计算11");
          this.$set(item, "requireCount", undefined)
          return false
      }
      if (utils.isDigit(item.requireCount)) {
        console.log("计算22");
          this.$set(item, "requireCount", Number(item.requireCount))
          this.$set(item, "oldRequireCount", Number(item.requireCount))
      } else {
        console.log("计算33");
          this.$set(item, "requireCount", item.oldRequireCount);
      }
    },
    queryProductDetail(val, index) {
      console.log(val, index, "21321");
      const good = Object.assign({}, val);
      this.$set(this.checkskuList, index, good);
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
    //   this.$set(this.checkskuList, index, {});
    // }

    // 清空两个仓
    clearOutStoreInfo() {
      this.createStockOut = {};
    },
    clearInStoreInfo() {
      this.createStockIn = {};
    },
    createStockOutFrom(formName) {
        this.creatData.skuList = [];
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
      console.log(this.createStockOut, "发货仓信息");
      console.log(this.createStockIn, "收货仓信息");

      this.creatData.status = 1;
      this.creatData.approveStatus = 0;
      this.creatData.remark = this.param.remark;
      this.creatData.disUserGroupId = this.param.disUserGroupId;
      this.creatData.disUserGroupName = this.param.disUserGroupName;

      this.creatData.inStorehouseId = this.createStockIn.storehouseId;
      this.creatData.inStorehouseName = this.createStockIn.storehouseName;
      this.creatData.inStorehouseLinkMan = this.createStockIn.linkman;
      this.creatData.inStorehouseLinkTel = this.createStockIn.phone;
      this.creatData.inStorehouseAddress = this.createStockIn.storehouseAddress;

      for (let i = 0; i < this.checkskuList.length; i++) {
        let checkskuListItem = this.checkskuList[i];
        if (!Number(checkskuListItem.requireCount)) {
          this.showWarning("要货数量不能为空或者0");
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
          barCode: checkskuListItem.barCode,
          requireCount: checkskuListItem.requireCount,
          remark: checkskuListItem.remark?checkskuListItem.remark:"--",
          id: checkskuListItem.id,
          serialNo: i+1
        };
        this.creatData.skuList.push(skuListItem);
      }

      this.showPageLoading();
      this.requireOrderAdd(this.creatData).then(resp => {
          this.hidePageLoading();
          this.showSuccess("操作成功");
          this.quit(this.routesMapping.requireOrderIndex, true);
        })
        .catch(error => {
          this.showWarning("操作失败");
          this.hidePageLoading();
          if (error.code == 16022) {
            let meg = JSON.parse(error.msg);
            let keys = Object.keys(meg);
            let values = Object.values(meg);
            this.$message({
              message: `skuId为${keys[0]}的库存不足，库存为${values[0]}`,
              type: "error"
            });
          }
          if (error.code == 16017) {
            this.$message({
              message: error.msg,
              type: "error"
            });
          }
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
        this.checkskuList.splice(index, 1);
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
    .displayStyle {
      display: inline-block;
      width: 40%;
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
