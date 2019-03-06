<template>
    <div class="create-storage">
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper">
                <el-form label-position="right" label-width="110px" :model="param" :rules="rules" class="topContent">
                    <el-form-item label="操作人：" required>
                        <el-input class="form-input-width"  v-model="operator" size="small" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="配送实体：" required>
                        <el-input class="form-input-width"  v-model="entityName" size="small" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="客户实体：" required>
                        <el-input class="form-input-width"  v-model="param.custUserGroupName" size="small" :disabled="true"></el-input>
                    </el-form-item>
                    <!-- <div> -->
                        <el-form-item label="收货仓库： " prop="inStorehouseName">
                            <el-select v-model="param.inStorehouseName"
                                       class="form-input-width"
                                       placeholder="仓库名称或者编码"
                                       size="small"
                                       clearable
                                       filterable
                                       @clear="clearInStoreInfo()"
                                       @change="inStoreChoosed(param.inStorehouseName)"
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
                    <!-- </div> -->
                    <!-- <div> -->
                        <el-form-item label="发货仓库： " prop="outStorehouseName">
                            <el-select v-model="param.outStorehouseName"
                                       class="form-input-width"
                                       placeholder="仓库名称或者编码"
                                       size="small"
                                       clearable
                                       filterable
                                       @clear="clearOutStoreInfo()"
                                       @change="outStoreChoosed(param.outStorehouseName)"
                                       :filter-method="outStoreFilter"
                                       :popper-class="'max-length'"
                                      >
                                <el-option v-for="(item,index) in outStorehouseList"
                                           :key="item.storehouseName + index + item.storehouseId"
                                           :label="item.storehouseName"
                                           :value="item.storehouseId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    <!-- </div> -->
                    <!-- <el-row> -->
                        <el-col :span="13" style="margin-top: 5px" prop="remark">
                            <el-form-item label="备注：">
                                <el-input type="textarea"
                                          :autosize="{ minRows: 5, maxRows: 5 }"
                                          :maxlength="200"
                                          v-model="param.remark" placeholder="请输入备注，200字以内"></el-input>
                                          <!-- <span>{{param.remark.length}}/200</span> -->
                            </el-form-item>
                        </el-col>
                    <!-- </el-row> -->
                </el-form>
            </div>
        </div>
        <div class="content">
            <div class="title">
                <div>发货仓信息</div>
            </div>
            <div class="content-wrapper">
                <el-form label-position="right" label-width="110px" :model="createStockOut" :rules="addressValidate"  ref="address">
                        <div class="displayStyle">
                            <el-form-item label="发货人：" prop="linkman" >
                                <el-input v-model="createStockOut.linkman" size="small"
                                          placeholder="选择发货仓带出发货人" :maxlength="20" disabled></el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                            <el-form-item label="联系电话：" prop="phone" >
                                <el-input v-model="createStockOut.phone" size="small" type="number"
                                          placeholder="选择发货仓带出联系电话" disabled></el-input>
                            </el-form-item>
                        </div>
                        <!-- <div class="displayStyle">
                            <el-form-item label="所在地区：" prop="area" >
                                    <el-input v-model="createStockOut.storeArea" size="small"
                                            placeholder="选择发货仓带出所在地区" disabled></el-input>
                                </el-form-item>
                        </div> -->
                        <div class="displayStyle">
                            <el-form-item label="详细地址：" prop="storehouseAddress">
                                <el-input v-model="createStockOut.storehouseAddress" size="small" placeholder="选择发货仓带出详细地址"
                                    :maxlength="90" disabled></el-input>
                            </el-form-item>
                        </div>
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
                                <th width="150">退货价（元）</th>
                                <th width="150">退货数量</th>
                                <!-- <th width="150">退货总价（元）</th> -->
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
                            <!--退货价-->
                            <td :title="one.returnPrice">
                                <el-input placeholder="0" class="table-input" size="small" type="number" v-model="one.returnPrice" :min="0"  @keyup.native="priceChange(one)" @blur="priceChange(one)"></el-input>
                            </td>
                            <!--退货数量-->
                            <td :title="one.returnCount">
                                <el-input placeholder="0" class="table-input" size="small" type="number"v-model="one.returnCount" :min="0" @keyup.native="getpurchaseTotalPrice(one)" @blur="getpurchaseTotalPrice(one)"></el-input>
                            </td>
                            <!--退货总价-->
                            <!-- <td :title="one.Totalprice">
                                <span v-if="one.stockOutCount && one.skuPrice">{{one.stockOutCount*one.skuPrice}}</span>
                                <span v-else>--</span>
                            </td> -->
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
                    <div class="orderContainer">
                        <div class="orderCount">
                            配送合计金额 : <span>￥{{totalAmount}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-section pt20">
            <el-button type="primary" size="small" @click="createStockOutFrom('createStockOut')">提交</el-button>
            <el-button  size="small" class="cancel-button" @click="quit(routesMapping.returnOrderIndex,true)">取消</el-button>
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
  name: "returnOrderEdit",
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
      //根据登录拿到
      operator: sessionStorage.getItem("userName"),
      entityName: sessionStorage.getItem("entityName"),
      userGroupId: sessionStorage.getItem("entityId"),
      paramsData:{},
      // 所以提交信息
      creatData: {},
      // 选择仓库后的信息
      createStockOut: {},
      createStockIn: {},
      //  拿到编辑信息
      param: {
        remark: ""
      },
      id: 0,
      distributionReturnNo: 0,
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
        outStorehouseName: [{required: true, message: "请选择发货仓库", trigger: 'change'}],
        inStorehouseName: [{required: true, message: "请选择收货仓库", trigger: 'change'}],
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
          let StockOutTotalPrice = utils.mul(item.returnPrice, item.returnCount) || 0;
          resNumType += StockOutTotalPrice;
        });
        resNumType = Number(resNumType).toFixed(2);
        return resNumType;
      }
    }
  },
  mounted() {
    this.paramsData = this.$route.params;
    console.log(this.paramsData,"带的参数");
    this.id = this.$route.params.id;
    this.distributionReturnNo = this.$route.params.distributionReturnNo;
    this.queryData(); //初始化根据参数拿到详细数据
  },
  methods: {
    ...mapActions([
      "userGroupAll", //查询所有实体
      "queryUserGroupStoreHouse", //查仓库接口
      "querySkuListByUserGroup", //拿到用户下商品列表   选择用户后执行
      "returnOrderAdd", //新增接口
      "returnOrderInfo", //拿到详细数据
      "returnOrderEdit", //编辑接口
      "createStockOutSheet",
      "QueryProductEffectiveStock",
      "showPageLoading",
      "hidePageLoading"
    ]),
    // 查询详细数据
    queryData() {
      this.showPageLoading();
      this.returnOrderInfoFunction({ id: this.id, distributionReturnNo: this.distributionReturnNo });
    },
    returnOrderInfoFunction(param) {
      this.returnOrderInfo(param).then(resp => {
        this.hidePageLoading();
        // console.log(resp,"3214214123412312312");
        this.param = resp;
        resp.skuList.forEach(function (i, k) {
            i.returnPrice = i.returnPrice / 100
            return i
        })
        this.checkskuList = resp.skuList;
        console.log(this.param,"待编辑的详细信息");
        console.log(this.checkskuList,"拿到的商品列表");

        this.createStockOut.storehouseId = this.param.outStorehouseId;
        this.createStockOut.storehouseName = this.param.outStorehouseName;
        this.createStockOut.linkman = this.param.outStorehouseLinkMan;
        this.createStockOut.phone = this.param.outStorehouseLinkTel;
        this.createStockOut.storehouseAddress = this.param.outStorehouseAddress;

        this.createStockIn.storehouseId = this.param.inStorehouseId;
        this.createStockIn.storehouseName = this.param.inStorehouseName;
        this.createStockIn.linkman = this.param.inStorehouseLinkMan;
        this.createStockIn.phone = this.param.inStorehouseLinkTel;
        this.createStockIn.storehouseAddress = this.param.inStorehouseAddress;

        this.getOutStorehouseType();  //配发实体ID查询（登录即固定不变）
        this.getInStorehouseType(this.param.custUserGroupId);  //客户实体ID查询
        this.getSkuListByUserGroup(this.param.custUserGroupId); //根据客户实体查询商品列表
      });
    },
    // 发货仓 配送实体ID
    getOutStorehouseType() {
      let postData = {
        userGroupId: this.userGroupId,
        storehouseName: this.param.inStorehouseName,
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
    },
    // 收货仓 客户实体ID
    getInStorehouseType(customId) {
      if (customId !== "") {
        let postData = {
          userGroupId: customId,
          storehouseName: this.param.inStorehouseName,
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
      } else {
        this.$message({
          message: "请先选择配送实体",
          type: "warning"
        });
      }
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
        console.log(this.skuListTemp, "用户实体下商品列表");
      });
    },
    
    // 发货仓
    outStoreChoosed(storehouseId) {
      this.param.outStorehouseName = "";
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
      this.param.inStorehouseName = "";
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
    // 选择地址 弃用
    selectSendAddress(addressCode, addressName) {
      this.sendInfo.provinceCode = addressCode[0];
      this.sendInfo.cityCode = addressCode[1];
      this.sendInfo.areaCode = addressCode[2];
      this.sendInfo.province = addressName[0];
      this.sendInfo.city = addressName[1];
      this.sendInfo.area = addressName[2];
    },
    // 弃用
    selectArriveAddress(addressCode, addressName) {
      this.arriveInfo.provinceCode = addressCode[0];
      this.arriveInfo.cityCode = addressCode[1];
      this.arriveInfo.areaCode = addressCode[2];
      this.arriveInfo.province = addressName[0];
      this.arriveInfo.city = addressName[1];
      this.arriveInfo.area = addressName[2];
    },

    // 单价改变设置总价
    priceChange(item) {
      console.log(item,"输入配送退回价,计算");
      if (item.returnPrice === '') {
        console.log("计算11");
          this.$set(item, "returnPrice", undefined)
          return false
      }
      if (utils.ifNoNum(item.returnPrice)) {
        console.log("计算22");
          this.$set(item, "returnPrice", Number(item.returnPrice))
          this.$set(item, "oldreturnPrice", Number(item.returnPrice))
          this.$set(item, "totalPrice", utils.mul(item.returnPrice, item.returnCount))
          console.log(item.totalPrice,"计算出的金额-单价");
      } else {
        console.log("计算33");
          this.$set(item, "returnPrice", item.oldreturnPrice)
      }
    },
    // 选择配送退回数量 计算出单项总额
    getpurchaseTotalPrice(item) {
      console.log(item,"输入配送退回数量，计算");
      if (item.returnCount === '') {
        console.log("计算11");
          this.$set(item, "returnCount", undefined)
          return false
      }
      if (utils.isDigit(item.returnCount)) {
        console.log("计算22");
          this.$set(item, "returnCount", Number(item.returnCount))
          this.$set(item, "oldreturnCount", Number(item.returnCount))
          this.$set(item, "totalPrice", utils.mul(item.purchasePrice, item.returnCount))
          console.log(item.totalPrice,"计算出的金额-数量");
      } else {
        console.log("计算33");
          this.$set(item, "returnCount", item.oldreturnCount);
      }
    },
    chooseGoods() {
      if (!this.param.custUserGroupName) {
        this.showWarning("请先选择客户实体!");
        return false;
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

      this.creatData.id = this.param.id;
      this.creatData.distributionReturnNo = this.param.distributionReturnNo;
      this.creatData.remark = this.param.remark;

      this.creatData.outStorehouseId = this.createStockOut.storehouseId;
      this.creatData.outStorehouseName = this.createStockOut.storehouseName;
      this.creatData.outStorehouseLinkMan = this.createStockOut.linkman;
      this.creatData.outStorehouseLinkTel = this.createStockOut.phone;
      this.creatData.outStorehouseAddress = this.createStockOut.storehouseAddress;

      this.creatData.inStorehouseId = this.createStockIn.storehouseId;
      this.creatData.inStorehouseName = this.createStockIn.storehouseName;
      this.creatData.inStorehouseLinkMan = this.createStockIn.linkman;
      this.creatData.inStorehouseLinkTel = this.createStockIn.phone;
      this.creatData.inStorehouseAddress = this.createStockIn.storehouseAddress;

      for (let i = 0; i < this.checkskuList.length; i++) {
        let checkskuListItem = this.checkskuList[i];
        if (!Number(checkskuListItem.returnCount)) {
          this.showWarning("退货数量不能为空或者0");
          return false;
        }
        if (checkskuListItem.returnPrice === "") {
          this.showWarning("请正确填写商品单价");
          return false;
        }
        // if (checkskuListItem.stockOutCount) {
        let skuListItem = {
          skuId: checkskuListItem.skuId,
          skuName: checkskuListItem.skuName,
          productId: checkskuListItem.productId,
          productName: checkskuListItem.productName,
          unitId: checkskuListItem.unitId,
          unitValue: checkskuListItem.unitValue,
          unitName: checkskuListItem.unitName,
          barCode: checkskuListItem.barCode,
          returnPrice: Number(checkskuListItem.returnPrice) * 100,
          returnCount: checkskuListItem.returnCount,
          remark: checkskuListItem.remark,
          serialNo: i+1
        };
        this.creatData.skuList.push(skuListItem);
        // }
      }

      this.showPageLoading();
      this.returnOrderEdit(this.creatData)
        .then(resp => {
          this.hidePageLoading();
          this.showSuccess("操作成功");
          this.quit(this.routesMapping.returnOrderIndex, true);
        })
        .catch(error => {
          this.showWarning("操作失败");
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
