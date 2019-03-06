<template>
	<div class='createReturnOrder-view'>
		<div class="content">
			<div class="title">
				<div>基本信息</div>
			</div>
			<div class="content-wrapper">
				<el-form label-position="left" label-width="100px" :model="createRefundForm" :rules="rules" ref="createRefundForm">
					<div>
						<div>
							<div class="displayStyle">
								<el-form-item label="操作人：" label-width="100px">
									<el-input size="small" v-model="operator" :disabled="true" class="row_width">
									</el-input>
								</el-form-item>
							</div>
							<div class="displayStyle posRelative">
								<el-form-item label="关联销售单：" label-width="110px" prop="orderId">
									<el-autocomplete size="small" prefix-icon="el-icon-search" class="row_width" v-model.trim="createRefundForm.orderId" :fetch-suggestions="getSalseOrderByBlurry" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
								</el-form-item>
								<div class="searchView pull-right" v-if="hasCompleteOrderId" @click="toQueryDetail(createRefundForm.orderId)">查看</div>
							</div>
						</div>
						<div>
							<div class="displayStyle">
								<el-form-item style="margin-bottom:14px;" label="渠道：" label-width="100px">
									<el-input size="small" :value="createRefundForm.channelId==-1?'其他':createRefundForm.channelName" :disabled="true" class="row_width">
									</el-input>
								</el-form-item>
							</div>
							<!-- <div class="displayStyle" v-if="createRefundForm.channelId==-1">
								<el-form-item style="margin-bottom:14px;padding-left:9px;" label="客户：" label-width="110px">
									<el-input size="small" style="margin-left:-9px;" :value="createRefundForm.customerName" :disabled="true" class="row_width">
									</el-input>
								</el-form-item>
							</div> -->
						</div>
						<div>
							<div class="displayStyle1" v-if="invType==1">
								<el-form-item label="收货仓库：" prop="storehouseId">
									<el-select size="small" @change="choosestorehouse(createRefundForm.stockId)" v-model="createRefundForm.stockId" filterable placeholder="选择收货仓库" class="row_width">
										<el-option v-for="item in storeList" :key="item.storehouseId" :label="item.storehouseName" :value="item.storehouseId">
										</el-option>
									</el-select>
								</el-form-item>
							</div>
							<div style="margin-bottom:9px;" class="displayStyle" v-if="invType==1">
								<el-form-item style="margin-left:9px;" label="订单类型：" label-width="110px">
									<el-input size="small" style="margin-left:-9px;" :value="calOrderType" :disabled="true" class="row_width">
									</el-input>
								</el-form-item>
							</div>
							<div style="margin-bottom:9px;" class="displayStyle" v-else>
								<el-form-item label="订单类型：" label-width="100px">
									<el-input size="small" :value="calOrderType" :disabled="true" class="row_width">
									</el-input>
								</el-form-item>
							</div>
						</div>
						<div style="margin-left: 25px;margin-top:px;">
							<el-form-item class="baseInfo-remark" label="备注:" prop="remark" label-width="100px">
								<el-input size="small" class="remark_width" type="textarea" v-model="createRefundForm.remark"></el-input>
								<div class="limittext">200字以内</div>
							</el-form-item>
						</div>
						<div class="title" v-if="invType==1">
							<div>收货仓信息</div>
						</div>
						<div class="content-wrapper" v-if="invType==1">
							<div>
								<div class="displayStyle">
									<el-form-item label="收货人：" label-width="100px" prop="storeLinkMan">
										<el-input size="small" v-model="createRefundForm.storeLinkMan" :disabled="true" class="row_width">
										</el-input>
									</el-form-item>
								</div>
								<div class="displayStyle">
									<el-form-item label="收货电话：" label-width="100px" prop="storeLinkTel">
										<el-input size="small" v-model="createRefundForm.storeLinkTel" :disabled="true" class="row_width">
										</el-input>
									</el-form-item>
								</div>
							</div>
							<div>
								<div class="displayStyle">
									<el-form-item label="所在地区：" label-width="100px" prop="storeArea">
										<el-input size="small" v-model="storeArea" :disabled="true" class="row_width">
										</el-input>
									</el-form-item>
								</div>
								<div class="displayStyle">
									<el-form-item label="详细地址：" label-width="100px" prop="storeDetailAddress">
										<el-input size="small" v-model="createRefundForm.storeAddress" :disabled="true" class="row_width">
										</el-input>
									</el-form-item>
								</div>
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
			<div class="content-wrapper padding_lr_20">
				<table width="100%">
					<thead>
						<th width="260" style="padding-left:20px">商品名称</th>
						<th>商品编码</th>
						<th>单位</th>
						<th>销售单价(元)</th>
						<th>本次退货</th>
						<th>总价(元)</th>
						<th>备注</th>
					</thead>
					<tr v-for="(one,index) in checkProductList" :key="index">
						<td :title="one.skuName" v-if="one.skuName">{{one.skuName}}</td>
						<td v-else>--</td>
						<td :title="one.skuId" v-if="one.skuId">{{one.skuId}}</td>
						<td v-else>--</td>
						<td :title="one.unitName" v-if="one.unitName">{{one.unitName}}</td>
						<td v-else>--</td>
						<td :title="one.price" v-if="one.price">{{one.price/100}}</td>
						<td v-else>--</td>
						<td :title="one.returnCount">
							<el-input class="table-input" size="small" type="tel" maxlength="7" v-model="one.returnCount" :min="0" @keyup.native="setValue(one,index)"></el-input>
						</td>
						<td v-if="one.returnCount && one.price">
							<el-input class="table-input" size="small" type="number" :value="getTotalMoney(one)" :disabled="true"></el-input>
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
				<div class="empty_text" v-if="checkProductList.length==0">
					暂无数据
				</div>
			</div>
		</div>
		<div style="height:20px;background-color:white"></div>
		<div class="returnorderContainer">
			<div class="orderCount">
				<p style="display: inline-block"> 退货合计金额:</p>
				<span v-if="totalAmount>0">￥{{totalAmount/100}}</span>
				<span v-else>--</span>
			</div>
		</div>
		<div class="submitBtn">
			<el-button type="primary" @click="createReturn('createRefundForm')" size="small">提交</el-button>
			<el-button size="small" class="btnCancel" @click="OnBackLatePage">取消</el-button>
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
import { isNull } from 'util';

export default {
	name: "CreateReturnOrder",
	mixins: [MessageMixins, PlatformMixins, QuitMixins],
	components: {
		GoodsSelect
	},
	data() {
		//正则校验
		let validatorStorehouseId = (rule, value, callback) => {
			if (!this.createRefundForm.stockId) {
				return callback(new Error("请选择收货仓库!"));
			} else {
				return callback();
			}
		};
		let validatorPlanArrivalTime = (rule, value, callback) => {
			if (!this.createRefundForm.planArrivalTime) {
				return callback(new Error("请选择到货时间!"));
			} else {
				return callback();
			}
		};
		let validatororderId = (rule, value, callback) => {
			if (!this.createRefundForm.orderId) {
				// 重置数据
				this.checkProductList = [];
				this.invType = 0;
				this.orderType = '';
				this.createRefundForm.channelName = '';
				return callback(new Error("请输入关联销售单!"));
			} else {
				return callback();
			}
		};
		let validatorStoreLinkMan = (rule, value, callback) => {
			if (!this.createRefundForm.storeLinkMan) {
				return callback(new Error("请输入收货人!"));
			} else {
				return callback();
			}
		};
		let validatorStoreLinkTel = (rule, value, callback) => {
			if (
				!this.createRefundForm.storeLinkTel ||
				!/^((1[3-8][0-9])+\d{8})$/.test(this.createRefundForm.storeLinkTel)
			) {
				return callback(new Error("请正确输入联系电话!"));
			} else {
				return callback();
			}
		};
		let validatorStoreAddress = (rule, value, callback) => {
			if (!this.storeArea) {
				return callback(new Error("请选择收货地址!"));
			} else {
				return callback();
			}
		};
		let validatorStoreDetailAddress = (rule, value, callback) => {
			if (!this.createRefundForm.storeAddress) {
				return callback(new Error("请输入详细地址!"));
			} else {
				return callback();
			}
		};
		return {
			productListTemp: [],
			checkProductList: [],
			storeList: [],
			addressList: [],
			productDetailListArray: [],
			operator: "",
			addNewProductListItem: {
				saleSkuId: null,
				saleSerialNo: null
			},
			storeArea: "",
			createRefundForm: {
				orderId: null,
				stockId: null,
				remark: "",
				storeLinkMan: "",
				storeLinkTel: "",
				storeAddress: "",
				stockName: "",
				channelName: "",
				returnType: null,
				channelId: null,
				area: "",
				areaCode: "",
				city: "",
				cityCode: "",
				province: "",
				provinceCode: "",
				invType: "",
			},
			invType: 0,
			orderType: "",
			customerName: "",
			customerId: "",
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
				// planArrivalTime: [{required: true, validator: validatorPlanArrivalTime, trigger: 'change,blur'}],
				orderId: [
					{
						required: true,
						validator: validatororderId,
						trigger: "blur"
					}
				]
				// storeLinkMan: [{required: true, validator: validatorStoreLinkMan, trigger: 'change,blur'}],
				// storeLinkTel: [{required: true, trigger: 'change',message:'请输入收货电话'}],
				// storeArea: [{required: true, trigger: 'change',message:'请选择所在地区'}],
				// storeAddress: [{required: true, validator: validatorStoreAddress, trigger: 'change'}],
				// storeDetailAddress: [{required: true,validator: validatorStoreDetailAddress,trigger: 'change,blur'}],
			},
			hasCompleteOrderId: false, // 是否可以显示查看按钮
		};
	},
	mounted() {
		this.rules.storehouseId[0].required = this.invType == 1 ? true : false;
		// this.querySockList();
		const userName = sessionStorage.getItem("userName");
		this.operator = userName;
		if (this.$route.params.orderId && this.$route.params.orderId !== "0") {
			this.createRefundForm.orderId = String(this.$route.params.orderId);
			this.queryProductDetail();
		}
	},
	watch: {
		"$route.params.orderId": function () {
			if (this.$route.params.orderId && this.$route.params.orderId !== "0") {
				this.createRefundForm.orderId = String(this.$route.params.orderId);
				this.queryProductDetail();
			}
		},
		"createRefundForm.remark": {
			handler(nval, oval) {
				if (String(nval).length >= 200) {
					this.$message({
						type: "warning",
						message: `备注长度不能大于200字符，默认取前200个字符！`
					});
					this.$nextTick(() => {
						this.createRefundForm.remark = String(nval).substring(0, 200);
					});
				}
			}
		},
		checkProductList: {
			handler(nval, oval) {
				if (nval.length) {
					nval.forEach((item, index) => {
						if (String(item.remark).length > 100) {
							this.$message({
								type: "warning",
								message: `备注长度不能大于100字符，默认取前100个字符！`
							});
							this.$nextTick(() => {
								item.remark = String(item.remark).substring(0, 100);
							});
						}
					});
				}
			},
			deep: true
		}
	},
	computed: {
		...mapState({
			getSkuListByCondition: ({ outboundWarehouseList }) =>
				outboundWarehouseList.productList,
			queryReturnProListByOrderDetail: ({ returnList }) =>
				returnList.queryReturnProListByOrderDetail
		}),
		totalAmount: function () {
			if (this.checkProductList.length) {
				return this.checkProductList
					.map(row => row.returnCount * row.price || 0)
					.reduce((x, y) => x + y);
			}
		},
		calOrderType: function () {
			let _orderType = this.orderType;
			switch (_orderType) {
				case 11:
					this.createRefundForm.returnType = 21;
					return "普通退货";
					break;
				case 12:
					this.createRefundForm.returnType = 22;
					return "代售退货";
					break;
				case 13:
					this.createRefundForm.returnType = 23;
					return "代发退货";
					break;
				default:
					return null;
					break;
			}
		}
	},
	methods: {
		...mapActions([
			"querySaleOrderBlurry",
			"addNewRefuseOrder",
			"getStorehouseList",
			"querySkuList",
			"querySkuDetail",
			"showPageLoading",
			"createProcureOrder",
			"hidePageLoading",
			"querySalesOrder",
			"queryStoreList",
			"queryReceivingAddress",
			"queryReturnProListByOrderId",
			"queryStoreById"
		]),
		querySockList(datas) {
			this.queryStoreList(datas).then(resp => {
				this.storeList = resp;
			});
		},
		getTotalMoney(row) {
			var returnCount = parseFloat(row.returnCount) || 0;
			var price = parseFloat(row.price) / 100 || 0;
			return (returnCount * price).toFixed(2);
		},
		goodsSelect(resp, index) {
			resp.purchasePrice = resp.price;
			let product = Object.assign({}, this.checkProductList[index], resp);
			this.$set(this.checkProductList, index, product);
		},
		toQueryDetail(orderId) {
			if (!orderId) {
				this.$message("请输入销售订单号!");
				return;
			}
			this.$router.push({
				name: "CheckSalesOrder",
				params: { saleOrderId: orderId }
			});
			// const hrefTo = this.$router.resolve({ path: `/sales/check/salesOrder/${orderId}`});
			// window.open(hrefTo.href, '_blank');
		},
		// 选择订单后
		handleSelect(val) {
			if (val) {
				this.hasCompleteOrderId = true;
				this.queryProductDetail();
			}
		},
		// 关联销售单号时，通过模糊查询获取可换货订单号
		getSalseOrderByBlurry(val, cb) {
			if (isNull(val) || val == "") {
				cb([]);
			} else {
				if (val) {
					this.hasCompleteOrderId = false;
					const reg = /\w+$/;
					if (!reg.test(val)) {
						this.$message({
							type: "warning",
							message: "请输入正确的销售单号"
						});
						return;
					}
					this.$refs.createRefundForm.clearValidate();
					const datas = {
						orderId: val
					};
					this.querySaleOrderBlurry(datas).then(res => {
						const results = res.result.filter(
							val =>
								val.orderType <= 13 &&
								val.orderType >= 11 &&
								(val.orderStatus === 3 || val.orderStatus === 5 || val.orderStatus === 4)
						);
						for (let i of results) {
							i.value = i.orderId; //将CUSTOMER_NAME作为value
						}
						cb(results);
					});
				} else {
					this.checkProductList = this.orderType = this.createRefundForm.channelName = this.createRefundForm.stockId = this.invType = '';
				}
			}
		},
		queryProductDetail() {
			if (!this.createRefundForm.orderId) {
				return;
			} else {
				this.showPageLoading();
				this.queryReturnProListByOrderId({
					orderId: this.createRefundForm.orderId
				}).then(resp => {
					this.hidePageLoading();
					// if (resp.orderStatus !== 3 && resp.orderStatus !== 5) {
					// 	this.$message({
					// 		type: "warning",
					// 		message: "只有已完成或者已/部分发货订单可操作退货！"
					// 	});
					// 	return;
					// }
					const datas = { bizType: 1, channelId: resp.channelId };
					if (resp.orderType === 13) {
						datas.bizType = 4
					}
					this.querySockList(datas);
					this.hasCompleteOrderId = true;
					this.productListTemp = this.queryReturnProListByOrderDetail.pluList;
					this.checkProductList = resp.pluList;
					this.createRefundForm.channelName = resp.channelId == -1 ? '其它' :resp.channelName;
					this.createRefundForm.channelId = resp.channelId;
					this.invType = resp.invType;
					this.createRefundForm.invType = resp.invType;
					this.createRefundForm.customerName = resp.customerId == -1 ? '其它' : resp.customerName;
					this.createRefundForm.customerId = resp.customerId;
					if (resp.invType == 0) {
						this.createRefundForm.stockId = -1;
					}
					this.orderType = resp.orderType;
					this.checkProductList.forEach((p1, p2, p3) => {
						let product = Object.assign(
							{},
							this.checkProductList[p2],
							this.addNewProductListItem
						);
						let returnCount = parseInt(p1.saleCount);
						this.$set(this.checkProductList, p2, product);
					});
					this.checkProductList = resp.pluList.map((val, index) => {
						this.$set(
							this.checkProductList[index],
							"returnCount",
							this.checkProductList[index].exChangeCount
						);
					});
					this.checkProductList = resp.pluList.map(val =>
						Object.assign({}, val, { returnTotal: val.returnCount * val.price })
					);
				});
			}
		},
		choosestorehouse(value) {
			this.$refs.createRefundForm.clearValidate(["stockId"]);
			let choosenItem = this.storeList.filter(
				item => item.storehouseId === value
			)[0];
			this.createRefundForm.stockId = choosenItem.storehouseId;
			this.createRefundForm.stockName = choosenItem.storehouseName;
			this.queryStoreByIdFunction();
		},
		//根据仓库id获取仓库信息详情
		queryStoreByIdFunction() {
			this.showPageLoading();
			this.queryStoreById({ storehouseId: this.createRefundForm.stockId }).then(
				resp => {
					this.storeArea = resp.province + "-" + resp.city + "-" + resp.area;
					if (resp.links.length >= 1) {
						this.createRefundForm.storeLinkMan = resp.links[0].linkman
							? resp.links[0].linkman
							: "";
						this.createRefundForm.storeLinkTel = resp.links[0].phone
							? resp.links[0].phone
							: "";
					} else {
						this.createRefundForm.storeLinkMan = '';
						this.createRefundForm.storeLinkTel = '';
					}
					this.createRefundForm.storeAddress = resp.storehouseAddress
						? resp.storehouseAddress
						: "";
					this.createRefundForm.area = resp.area ? resp.area : "";
					this.createRefundForm.areaCode = resp.areaCode ? resp.areaCode : "";
					this.createRefundForm.city = resp.city ? resp.city : "";
					this.createRefundForm.cityCode = resp.cityCode ? resp.cityCode : "";
					this.createRefundForm.province = resp.province ? resp.province : "";
					this.createRefundForm.provinceCode = resp.provinceCode
						? resp.provinceCode
						: "";
					this.hidePageLoading();
				}
			);
		},
		//设置退货数量
		setValue(row, index) {
			row.returnCount = Number(String(row.returnCount).replace(/[^\d]/g, ""));
			if (parseInt(row.returnCount) < 0) {
				row.returnCount = 0;
				this.$set(this.checkProductList[index], "returnTotal", 0);
			} else if (row.returnCount.length > 1 && row.returnCount.indexOf(0) === 0) {
				row.returnCount = 0;
			} else if (row.price >= 0 && row.exChangeCount >= 0) {
				let maxReturnCount = this.productListTemp[index].exChangeCount;
				if (this.productListTemp[index].exChangeCount < row.returnCount) {
					this.$set(
						this.checkProductList[index],
						"returnCount",
						maxReturnCount
					);
					this.$message({
						type: "error",
						message: `当前最大可退货数量为：${maxReturnCount}`
					});
					return;
				}
				row.returnTotal = row.price * row.returnCount;
			} else {
				this.$set(this.checkProductList[index], "returnTotal", 0);
			}

		},
		filterNumbers() {
			this.channelAddressTemp.phone = this.channelAddressTemp.phone.replace(/[^\d]/g, "");
		},
		isInteger(obj) {
			const reg = /^[1-9]\d{0,6}$/;
			return typeof obj === "number" && obj % 1 === 0 && reg.test(obj);
		},
		clearDefult(count) {
			count = " ";
		},
		//创建-提交退货单
		createReturn(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let productDetailListArray = [];
					if (!this.hasCompleteOrderId) {
						this.$message({ message: '请先关联正确的销售单号', type: 'warning' });
						return;
					}
					this.checkProductList.forEach(item => {
						productDetailListArray.push({
							saleSkuId: item.orderSkuId,
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
							returnTotal: item.returnTotal,
							remark: item.remark,
							productName: item.productName,
							cateIdFirst: item.cateIdFirst,
							cateIdSecond: item.cateIdSecond,
							unitValue: item.unitValue,
							brandId: item.brandId,
							sendCount: item.sendCount
						});
					});
					// 验证本次退货是否为零
					let isValid = productDetailListArray.some((item, index, array1) => {
						return item.returnCount != 0;
					});

					// let isValid=true;
					if (isValid) {
						this.showPageLoading();
						this.createRefundForm.returnSkuList = productDetailListArray;
						this.addNewRefuseOrder(this.createRefundForm).then(resp => {
							this.showSuccess("操作成功");
							this.hidePageLoading();
							this.OnBackLatePage();
						});
					} else {
						this.showWarning("退货数量不能为零!");
					}
				} else {
					this.showWarning("请先正确填写表单信息!");
					return false;
				}
			});
		},
		//点击取消
		OnBackLatePage() {
			this.quit(routesMapping.SalesReturn);
		}
	}
};
</script>
<style lang='scss'>
.createReturnOrder-view {
  position: relative;
  background-color: white;
  margin: 0 30px 0;
  height: 100%;
  border-top: 10px solid #e9eef1;
  .empty_text {
    width: 100%;
    line-height: 44px;
    height: 44px;
    border: 1px solid #f2f6fd;
    border-top: none;
    color: #909399;
    font-size: 12px;
    text-align: center;
  }
  .remark_width {
    width: calc(100% - 20px);
    textarea {
      min-height: 80px !important;
      border-color: #e0e0e0;
    }
  }
  .el-form-item__label {
    color: #333;
  }
  .content {
    .content-wrapper {
      padding: 20px 0 1px;
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
  .returnorderContainer {
    padding: 0 20px;
    background-color: white;
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
      top: 40px;
      right: 40px;
      font-size: 12px;
      color: #dddddd;
    }
  }
  .btnCancel {
    color: #3b8cff;
    border-color: #bfd9fe;
  }
}
</style>
<style lang='scss'>
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

.content .title {
  background-color: white;
  border-bottom: 1px solid #e5e5e5;
  color: #333;
}

.createReturnOrder-view .content .content-wrapper {
  &.padding_lr_20 {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>



