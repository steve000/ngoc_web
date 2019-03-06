<template>
    <div class='createReturn-view'>
        <!-- 基本信息 -->
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper padding0">
                <el-form label-position="left" label-width="100px" :model="editRefundForm" :rules="rules" ref="editRefundForm">
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="操作员：" label-width="100px">
                                <el-input size="small" v-model="operator" :disabled="true" class="row_width">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle posRelative">
                            <el-form-item label="关联销售单：" label-width="110px" prop="orderId">
                                <el-input size="small" prefix-icon="el-icon-search" v-model="editRefundForm.orderId" :disabled="true" class="row_width"></el-input>
                            </el-form-item>
                            <div class="searchView pull-right" @click="toQueryDetail(editRefundForm.orderId)">查看</div>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="退货单号：" label-width="100px">
                                <el-input size="small" v-model="editRefundForm.returnId" :disabled="true" class="row_width">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle posRelative">
                            <el-form-item label="创建时间：" label-width="110px" prop="orderId">
                                <el-input size="small" prefix-icon="el-icon-search" v-model="createTime" :disabled="true" class="row_width"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="订单类型：" label-width="100px">
                                <el-input size="small" :value="calReturnType" :disabled="true" class="row_width">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                            <el-form-item label="渠道：" label-width="110px">
                                <el-input size="small" :value="channelName" :disabled="true" class="row_width">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle1" v-if="invType==1">
                            <el-form-item label="收货仓库：" prop="storehouseId">
                                <el-select size="small" @change="choosestorehouse(editRefundForm.stockId)" v-model="editRefundForm.stockId" filterable placeholder="选择收货仓库" class="row_width">
                                    <el-option v-for="item in storeList" :key="item.storehouseId" :label="item.storehouseName" :value="String(item.storehouseId)">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <!-- <div class="displayStyle1" v-if="editRefundForm.channelId==-1">
                            <el-form-item label="客户：" label-width="110px">
                                <el-input size="small" :value="editRefundForm.customerName" :disabled="true" class="row_width">
                                </el-input>
                            </el-form-item>
                        </div> -->
                        <!-- <div class="displayStyle1" v-else>
                            <el-form-item label="客户：" label-width="100px">
                                <el-input size="small" :value="editRefundForm.customerName" :disabled="true" class="row_width">
                                </el-input>
                            </el-form-item>
                        </div> -->
                    </div>
                    <div style="margin-left: 25px;">
                        <el-form-item style="margin-bottom:0;padding-bottom:11px;" class="baseInfo-remark mt4" label="备注:" prop="remark" label-width="100px">
                            <el-input size="small" class="remark_width" type="textarea" :rows="4" v-model="editRefundForm.remark"></el-input>
                            <div class="limittext">200字以内</div>
                        </el-form-item>
                    </div>
                    <div class="title" v-if="invType==1">
                        <div>收货仓信息</div>
                    </div>
                    <div class="content-wrapper padding0" v-if="invType==1">
                        <div>
                            <div class="displayStyle">
                                <el-form-item label="收货人：" label-width="100px" prop="storeLinkMan">
                                    <el-input size="small" v-model="editRefundForm.storeLinkMan" :disabled="true" class="row_width">
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="displayStyle">
                                <el-form-item label="联系电话：" label-width="100px" prop="storeLinkTel">
                                    <el-input size="small" v-model="editRefundForm.storeLinkTel" :disabled="true" class="row_width">
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div>
                            <div class="displayStyle">
                                <el-form-item label="收货地址：" label-width="100px">
                                    <el-input size="small" v-model="editRefundForm.storeArea" :disabled="true" class="row_width">
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="displayStyle">
                                <el-form-item label="详细地址：" label-width="100px" prop="storeDetailAddress">
                                    <el-input size="small" v-model="editRefundForm.storeAddress" :disabled="true" class="row_width">
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="content">
            <div class="title">
                <div>商品清单</div>
            </div>
            <div class="content-wrapper">
                <table width="100%">
                    <thead>
                        <th width="260" style="padding-left:20px">商品名称</th>
                        <th>商品编码</th>
                        <th>单位</th>
                        <th>销售单价（元）</th>
                        <th>本次退货</th>
                        <th>总价（元）</th>
                        <th>备注</th>
                    </thead>
                    <tr v-for="(one,index) in checkProductList" :key="index">
                        <td :title="one.skuName" v-if="one.skuName">{{one.skuName}}</td>
                        <td v-else>--</td>
                        <td :title="one.skuId" v-if="one.skuId">{{one.skuId}}</td>
                        <td v-else>--</td>
                        <td :title="one.unitName" v-if="one.unitName">{{one.unitName}}</td>
                        <td v-else>--</td>
                        <td :title="one.price/100" v-if="one.price">{{one.price/100}}</td>
                        <td v-else>--</td>
                        <td :title="one.returnCount">
                            <el-input class="table-input" size="small" v-model="one.returnCount" type="tel" maxlength="7" @keyup.native="setValue(one,index)"></el-input>
                        </td>
                        <td v-if="one.returnCount && one.price">
                            <el-input class="table-input" size="small" type="number" :value="getTotalMoney(one)/100" :disabled="true"></el-input>
                        </td>
                        <td v-else>--</td>
                        <td :title="one.remark">
                            <div style="position: relative;">
                                <el-input placeholder="100字以内" class="table-input" type="text" v-model="one.remark" size="small"></el-input>
                                <!--<div class="iconfont1 icon-shanchuhang" @click="deleteProduct(index)"></div>-->
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div style="height:20px;background-color:white"></div>
        <div class="returnorderContainer">
            <div class="orderCount">
                <p style="display: inline-block"> 退货合计金额:</p>
                <span>￥{{totalAmount/100}}</span>
            </div>
        </div>
        <div class="submitBtn">
            <el-button type="primary" @click="createReturn('editRefundForm')" size="small">提交</el-button>
            <el-button size="small" @click="OnBackLatePage">取消</el-button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import MessageMixins from '~/mixins/messages';
import PlatformMixins from '~/mixins/platform';
import GoodsSelect from '~/components/common/GoodsSelect';
import utils from '~/utils/misc';
import QuitMixins from '~/mixins/quit';
import { routesMapping } from '~/router';

export default {
    name: 'CreateOutbound',
    mixins: [MessageMixins, PlatformMixins, QuitMixins],
    components: {
        GoodsSelect
    },
    data() {
        let validatorStorehouseId = (rule, value, callback) => {
            if (!this.editRefundForm.stockId) {
                return callback(new Error('请选择收货仓库!'));
            } else {
                return callback();
            }
        };
        let validatorStoreLinkMan = (rule, value, callback) => {
            if (!this.editRefundForm.storeLinkMan) {
                return callback(new Error('请输入收货人!'));
            } else {
                return callback();
            }
        };
        let validatorStoreLinkTel = (rule, value, callback) => {
            if (!/^((1[3-8][0-9])+\d{8})$/.test(this.editRefundForm.storeLinkTel)) {
                return callback(new Error('请正确输入联系电话!'));
            } else {
                return callback();
            }
        };
        let validatorstoreArea = (rule, value, callback) => {
            if (!this.editRefundForm.storeArea) {
                return callback(new Error('请选择收货地址!'));
            } else {
                return callback();
            }
        };
        let validatorStoreDetailAddress = (rule, value, callback) => {
            if (!this.editRefundForm.storeAddress) {
                return callback(new Error('请输入详细地址!'));
            } else {
                return callback();
            }
        }
        return {
            productListTemp: [],
            checkProductList: [],
            storeList: [],
            addressList: [],
            createTime: '',
            operator: '',
            channelName: '',
            returnType: '',
            invType: "",
            customerId: "",
            addNewProductListItem: {
                saleSkuId: null,
                saleSerialNo: null,
            },
            editRefundForm: {
                orderId: null,
                stockId: null,
                remark: '',
                storeLinkMan: '',
                storeLinkTel: '',
                storeArea: '',
                storeAddress: '',
                stockName: '',
                channelId: '',
                customerName: "",
                customerId: "",

            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                },
            },
            rules: {
                storehouseId: [{ required: true, validator: validatorStorehouseId, trigger: 'change,blur' }],
                // storeLinkMan:[{required:true,validator:validatorStoreLinkMan,trigger:'change,blur'}],
                // storeLinkTel:[{required:true,validator:validatorStoreLinkTel,trigger:'change,blur'}],
                // storeArea:[{required:true,validator:validatorstoreArea,trigger:'change'}],
                // storeDetailAddress:[{required:true,validator:validatorStoreDetailAddress,trigger:'change,blur'}],
            },
        }
    },
    created() {
        // this.querySockList();
    },
    mounted() {
        const userName = sessionStorage.getItem('userName');
        console.log(this.$route.params);
        const _returnId = this.$route.params.returnId;
        const _orderId = this.$route.params.orderId;
        this.operator = userName;
        this.editRefundForm.returnId = _returnId;
        this.editRefundForm.orderId = _orderId;
        this.queryRefundInfoFunction();
        this.queryProductDetail();
    },
    computed: {
        ...mapState({
            getSkuListByCondition: ({ outboundWarehouseList }) => outboundWarehouseList.productList,
            queryRefundGoodsDetail: ({ changeList }) => changeList.queryRefundGoodsDetail,
        }),
        totalAmount: function () {
            if (this.checkProductList.length > 0) {
                let res = 0;
                this.checkProductList.forEach(item => {
                    res += (parseInt(item.returnCount) * parseInt(item.price) || 0)
                });
                return res
            }
        },
        calReturnType: function () {
            let _returnType = this.returnType;
            switch (_returnType) {
                case 21:
                    return '普通退货';
                    break;
                case 22:
                    return '代售退货';
                    break;
                case 23:
                    return '代发退货';
                    break;

            }
        }
    },
    watch: {
        'editRefundForm.remark': {
            handler(nval, oval) {
                if (String(nval).length > 200) {
                    this.$message({
                        type: 'warning',
                        message: `备注长度不能大于200字符，默认取前200个字符！`
                    });
                    this.setRemark(String(nval).substring(0, 200));
                }
            }
        },
        'checkProductList': {
            handler(nval, oval) {
                nval.forEach((item, index) => {
                    if (String(item.remark).length > 100) {
                        this.$message({
                            type: 'warning',
                            message: `备注长度不能大于100字符，默认取前100个字符！`
                        });
                        this.$nextTick(() => {
                            item.remark = String(item.remark).substring(0, 100);
                        })
                    }
                })
            },
            deep: true
        }
    },
    methods: {
        ...mapActions(["queryRefundInfo", "queryRefundGoods", "addNewRefuseOrder", "getStorehouseList", "querySkuList", "querySkuDetail", "showPageLoading", "createProcureOrder", "hidePageLoading", "querySalesOrder", "queryStoreList", "queryReceivingAddress", "querySalesOrderId", "queryStoreById", "returnOrderUpdate"]),
        querySockList(datas) {
            // const datas = { bizType: 1 };
            // if (resp.orderType === 23) {
            //     datas.bizType = 4
            // }
            this.queryStoreList(datas).then((resp) => {
                this.storeList = resp;
            })
        },
        setRemark(value) {
            this.$nextTick(() => {
                this.editRefundForm.remark = value;
            })
        },
        queryRefundInfoFunction() {
            this.queryRefundInfo({ returnId: this.editRefundForm.returnId }).then(resp => {
                const datas = { bizType: 1, channelId: resp.channelId };
                if (resp.returnType === 23) {
                    datas.bizType = 4;
                }
                this.querySockList(datas);
                this.editRefundForm.storeLinkMan = resp.storeLinkMan;
                this.editRefundForm.storeLinkTel = resp.storeLinkTel;
                this.editRefundForm.storeAddress = resp.storeAddress;
                this.editRefundForm.stockId = resp.stockId;
                this.editRefundForm.stockName = resp.stockName;
                this.editRefundForm.remark = resp.remark;
                this.channelName = resp.channelId == -1 ? '其它' : resp.channelName;
                this.editRefundForm.channelId = resp.channelId;
                this.editRefundForm.channelName = resp.channelName;
                this.returnType = resp.returnType;
                this.createTime = utils.formatDate(new Date(resp.createTime), "yyyy-MM-dd HH:mm:ss");
                this.invType = resp.invType;
                this.customerId = resp.customerId;
                this.editRefundForm.customerName = resp.customerName;
                this.editRefundForm.customerId = resp.customerId;
                if (this.invType == 1) this.queryStoreByIdFunction();

            })
        },
        getTotalMoney(row) {
            let returnCount = parseFloat(row.returnCount) || 0;
            let price = parseFloat(row.price) || 0;
            return returnCount * price;
        },
        clearSkuId(index) {
            this.$set(this.checkProductList, index, { purchaseCount: 0 })
        },
        goodsSelect(resp, index) {
            resp.purchasePrice = resp.price;
            var product = Object.assign({}, this.checkProductList[index], resp);
            this.$set(this.checkProductList, index, product)
        },
        queryProductDetail() {
            if (!this.editRefundForm.orderId) {
                return;
            } else {
                this.showPageLoading();
                this.queryRefundGoods({ returnId: this.editRefundForm.returnId }).then((resp) => {
                    this.hidePageLoading();
                    this.productListTemp = this.queryRefundGoodsDetail.result;
                    this.checkProductList = this.queryRefundGoodsDetail.result;
                    // this.checkProductList=resp.result.map(val => Object.assign({}, val, {returnCount: 0, returnTotal: 0}));
                }
                ).then((resp) => {
                    // this.addressList=resp.result;
                });
            }
        },
        choosestorehouse(value) {
            let choosenItem = this.storeList.filter(item => item.storehouseId === value)[0];
            this.editRefundForm.stockId = String(choosenItem.storehouseId);
            this.editRefundForm.stockName = choosenItem.storehouseName;
            this.queryStoreByIdFunction();
        },
        //根据仓库id获取仓库信息详情
        queryStoreByIdFunction() {
            this.showPageLoading();
            this.queryStoreById({ storehouseId: this.editRefundForm.stockId }).then(resp => {
                this.editRefundForm.storeArea = resp.province + '-' + resp.city + '-' + resp.area;
                if (resp.links.length >= 1) {
                    this.editRefundForm.storeLinkMan = resp.links[0].linkman
                        ? resp.links[0].linkman
                        : "";
                    this.editRefundForm.storeLinkTel = resp.links[0].phone
                        ? resp.links[0].phone
                        : "";
                } else {
                    this.editRefundForm.storeLinkMan = '';
                    this.editRefundForm.storeLinkTel = '';
                }
                this.editRefundForm.storeAddress = resp.storehouseAddress
                    ? resp.storehouseAddress
                    : "";
                this.editRefundForm.area = resp.area ? resp.area : "";
                this.editRefundForm.areaCode = resp.areaCode ? resp.areaCode : "";
                this.editRefundForm.city = resp.city ? resp.city : "";
                this.editRefundForm.cityCode = resp.cityCode ? resp.cityCode : "";
                this.editRefundForm.province = resp.province ? resp.province : "";
                this.editRefundForm.provinceCode = resp.provinceCode
                    ? resp.provinceCode
                    : "";
                this.hidePageLoading();
            })
        },
        setValue(row, index) {
            row.returnCount = Number(String(row.returnCount).replace(/[^\d]/g, ""));
            if (parseInt(row.returnCount) < 0) {
                row.returnCount = 0;
            } else if (row.returnCount.length > 1 && row.returnCount.indexOf(0) === 0) {
                row.returnCount = ""
            } else if (row.price && row.returnCount) {
                let maxreturnCount = this.productListTemp[index].canReturnCount;
                if (maxreturnCount < row.returnCount) {
                    row.returnCount = maxreturnCount;
                    this.$message({
                        type: 'error',
                        message: `当前最大可退货数量为：${maxreturnCount}`
                    });
                    return;
                }
                row.returnTotal = row.price * row.returnCount;
            } else {
                row.returnTotal = 0;
            }
        },
        clearDefult(count) {
            count = " ";
        },
        //编辑-提交退货单
        createReturn(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let productDetailListArray = [];
                    this.checkProductList.forEach(item => {
                        productDetailListArray.push({
                            saleSkuId: item.saleSkuId,
                            saleSerialNo: item.serialNo,
                            serialNo: item.serialNo,
                            productId: item.productId,
                            skuId: item.skuId,
                            skuName: item.skuName,
                            barCode: item.barCode,
                            unitId: item.unitId,
                            unitName: item.unitName,
                            price: item.price,
                            returnCount: parseInt(item.returnCount),
                            returnTotal: parseInt(item.returnTotal),
                            remark: item.remark,
                            productName: item.productName,
                            cateIdFirst: item.cateIdFirst,
                            cateIdSecond: item.cateIdSecond,
                            unitValue: item.unitValue,
                            brandId: item.brandId,
                            sendCount: item.sendCount,
                        })
                    });
                    //验证本次退货是否为零
                    let isValid = productDetailListArray.some((item, index, array1) => {
                        if (item.returnCount != 0) return true;
                    })
                    if (isValid) {
                        this.editRefundForm.returnSkuList = productDetailListArray;
                        this.returnOrderUpdate(this.editRefundForm).then((resp) => {
                            this.showSuccess("操作成功");
                            this.OnBackLatePage();
                        })
                    } else {
                        this.showWarning('退货数量不能为零!');
                    }

                } else {
                    this.showWarning('请先正确填写表单信息!');
                    return false
                }
            })
        },
        toQueryDetail(orderId) {
            if (!orderId) {
                this.$message('请输入销售订单号!');
                return;
            }
            this.$router.push({
                name: "CheckSalesOrder",
                params: { saleOrderId: orderId }
            });
        },
        //点击取消
        OnBackLatePage() {
            this.quit(routesMapping.SalesReturn, true)
        },
    }
}
</script>
<style lang='scss'>
.createReturn-view {
  height: 100%;
  position: relative;
  margin: 0 20px;
  background-color: white;
  border-top: 10px solid #e9eef1;
  .content {
    .content-wrapper {
      padding: 20px 20px 0;
      &.padding0 {
        padding: 20px 0 0;
      }
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
  .returnorderContainer {
    background-color: white;
    padding: 0 20px;
    .orderCount {
      height: 50px;
      line-height: 50px;
      background: #fbfbfb;
      border: 1px solid #f1f1f1;
      text-align: right;
      padding-right: 15px;
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
    & > button {
      width: 90px;
    }
  }
  .el-table__body-wrapper {
    overflow: inherit;
  }
  .baseInfo-remark {
    position: relative;
    .limittext {
      position: absolute;
      bottom: 0px;
      right: 40px;
      font-size: 12px;
      color: #dddddd;
    }
  }
  .remark_width {
    width: calc(100% - 20px);
    textarea {
      min-height: 80px;
    }
  }
}
</style>
<style lang='scss'>
.createReturn-view {
  .mt4 {
    margin-top: 4px;
  }
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
    &:hover {
      border: 2px dashed #539eff;
    }
  }
  .content .title {
    background-color: white;
  }
}
.searchView {
  color: #3b8cff;
  font-size: 14px;
  display: inline-block;
  position: absolute;
  right: -45px;
  top: 9px;
  cursor: pointer;
}
.posRelative {
  position: relative;
}
</style>
