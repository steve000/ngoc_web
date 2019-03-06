<template>
	<div class="checkSalesOrder product-detail-layout table-bottom-line">
		<div class="inner-box">
			<div class="order-content">
				<div class="top-tab">
					<div class="sale-item-number">
						<span v-if="orderDetail && orderDetail.orderId">销售单号：{{orderDetail && orderDetail.orderId ? orderDetail.orderId:'无'}}</span>
						<!--0-已取消；1-未发货；2-待出库；3-部分出库；4-已发货；5-已完成；6-已拒收-->
						<span v-if="getStatus">状态：{{getStatus}}</span>
						<span class="isUrgent">
							<el-checkbox v-model="isChecked" disabled v-if="orderAttrbute.urgentFlag && orderAttrbute.urgentFlag !== 0">加急标识</el-checkbox>
						</span>
						<span v-if="orderDetail && Number(orderDetail.orderType) === 12">订单类型：代售订单</span>
						<span v-if="orderDetail && Number(orderDetail.orderType) === 13">订单类型：代发订单</span>
					</div>
					<div v-if="orderDetail.invType === 1 && orderDetail.orderType>10&&orderDetail.orderType<14">
						<template v-if="getStatus === '未发货' || getStatus === '部分发货'">
							<el-button type="primary" @click="outboundFunc" class="edit-btn" v-if="orderDetail && Number(orderDetail.errorType) !== 6">出库</el-button>
						</template>
						<template v-if="Number(orderDetail.orderStatus) === 2 && orderDetail.saleCount > orderDetail.sendCount && Number(orderDetail.errorType) !== 6">
							<el-button type="primary" @click="outboundFunc" class="edit-btn">出库</el-button>
						</template>
						<template v-if="orderDetail && getStatus === '未发货' && Number(orderDetail.errorType) !== 6">
							<el-button class="edit-btn self-specail-btn" @click="cancelOrder" plain>取消订单</el-button>
							<span class="icon-edit-box" style="cursor: pointer;" @click="toEditPage">
								<i class="iconfont1 icon-bianji"></i>
							</span>
						</template>
					</div>
					<div v-else>
						<template v-if="orderDetail && getStatus === '未发货'">
							<el-button class="edit-btn self-specail-btn" @click="cancelOrder" plain>取消订单</el-button>
							<el-button class="edit-btn self-specail-btn" @click="finishedOrder" plain>完成订单</el-button>
							<span class="icon-edit-box" style="cursor: pointer;" @click="toEditPage">
								<i class="iconfont1 icon-bianji"></i>
							</span>
						</template>
					</div>
					<ul class="sale-order-tab">
						<li v-for="(item,index) in saleOrderTab" :key="index" :class="{'active':item.title === currentTitle}" @click="changeTab(item.title)">{{item.title}}</li>
					</ul>
				</div>
				<div class="order-list product-list-table-common">
					<template v-if="currentTitle==='商品清单'">
						<GoodsListTable :saleList="saleList"></GoodsListTable>
					</template>
					<template v-else-if="currentTitle==='出库记录'">

						<template v-if="outStoreList&&outStoreList.length > 0">
							<div v-for="(item,index) in outStoreList" :key="index">
								<OutboundRecordTable :outStoreList="item"></OutboundRecordTable>
								<div v-if="outStoreList.length && outStoreList.length > 1 && index !== outStoreList.length - 1" class="bottom-line"></div>
							</div>
						</template>
						<template v-else>
							<OutboundRecordTable :outStoreList="null"></OutboundRecordTable>
						</template>
					</template>
					<template v-else-if="currentTitle==='退货记录'">
						<ReturnsTable :tableData="tableData"></ReturnsTable>
					</template>
					<template v-else-if="currentTitle==='换货记录'">
						<ChangeRecordTable :changeList="changeList"></ChangeRecordTable>
					</template>
					<template v-else-if="currentTitle==='操作日志'">
						<OperationLogTable :logList="logList"></OperationLogTable>
					</template>
					<template v-else-if="currentTitle==='拒收记录'">
						<template v-if="inStoreList&&inStoreList.length > 0">
							<div v-for="(item,index) in inStoreList" :key="index">
								<OutboundAbnormal :inStoreList="item"></OutboundAbnormal>
								<div class="bottom-line" v-if="inStoreList.length && inStoreList.length > 1 && index !== inStoreList.length - 1"></div>
							</div>
						</template>
						<template v-else>
							<OutboundAbnormal :inStoreList="null"></OutboundAbnormal>
						</template>
						<!-- <OutboundAbnormal :inStoreList="inStoreList"></OutboundAbnormal> -->
					</template>
					<template v-else-if="currentTitle==='物流单'">
						<LogisticsInfo :logisticsRecords='logisticsRecords'></LogisticsInfo>
					</template>
					<!-- <el-button plain @click="goBack" class="btn-plain-special">返回</el-button> -->
				</div>
			</div>
			<div class="goods-base-info">
				<GoodsBaseInfo></GoodsBaseInfo>
			</div>
		</div>
		<!-- 出库操作 -->
		<el-dialog title="出库操作" :visible.sync="outboundVisible" width="1060px" @close="closeOutboundVisible">
			<div>
				<span style="font-size:14px;color: #666666; width:80px;">发货仓库：</span>
				<el-select v-model="selectedWarehouse" placeholder="请选择发货仓库" style="width:200px;" @change="updataSelectedWarehouse">
					<el-option v-for="item in warehouseOptions" :key="item.storehouseId" :label="item.storehouseName" :value="item.storehouseId">
					</el-option>
				</el-select>
				<span v-if="curWarehouse.storehouseType === 2">
					<span style="font-size:14px;color: #666666; width:80px;" class="ml20">运输方式：</span>
					<el-select v-model="outboundParams.deliveryType" placeholder="请选择" style="width:130px;">
						<el-option v-for="(item, index) in deliveryTypeOptions" :key="index" :label="item.label" :value="item.value" size='small'>
						</el-option>
					</el-select>
					<el-input v-model="outboundParams.expressCompany" placeholder="请输入承运商" style="width:130px;" class="ml10"></el-input>
					<el-checkbox class="ml10" v-model="outboundParams.isUrgent" size="medium" border :true-label="'X'" :false-label="''" style="border: none;padding-left: 0;">加急标识
					</el-checkbox>
				</span>
			</div>
			<div class="mt20" v-if="curWarehouse.storehouseType === 2">
				<span style="font-size:14px;color: #666666; width:80px;">销售类别：</span>
				<el-select v-model="outboundParams.saleCategory" placeholder="请选择" style="width:200px;">
					<el-option v-for="item in saleCategoryOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<el-row class="mt20">
				<el-table :data="outboundGoodsList" :height="outboundGoodsList.length ? '' : '38'" max-height="170" style="border: 1px solid #ebeef5;border-right: 1px solid #ebeef5;">
					<el-table-column prop="skuName" label="商品名称" show-overflow-tooltip></el-table-column>
					<el-table-column width="78">
						<template slot-scope="scope">
							<div v-show="selectedWarehouse && ((scope.row.saleCount - scope.row.sendCount) > scope.row.unableCount) " class="inventory">库存不足</div>
						</template>
					</el-table-column>
					<el-table-column prop="skuId" label="商品编码" show-overflow-tooltip></el-table-column>
					<el-table-column prop="unitName" label="单位" show-overflow-tooltip width="80"></el-table-column>
					<el-table-column prop="saleCount" label="销售数量" show-overflow-tooltipwidth="120"></el-table-column>
					<el-table-column prop="sendCount" label="已出库" show-overflow-tooltip width="120"></el-table-column>
					<el-table-column label="本次出库" width="120">
						<template slot-scope="scope">
							<el-input v-model="scope.row.outCount" type="number" size="small" style="width: 100px;" @keyup.native="setOutboundCount(scope.row, scope.$index)">
							</el-input>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<div class="addressInformation">
				<div class="addressInformation_title">
					收货信息
				</div>
				<el-button plain size="small" @click="addReceiverAddress = true" v-if="!(orderDetail.custAddressId === -1 || orderDetail.channelId === '-1')">
					<i class="el-icon-plus"></i>新增地址
				</el-button>
				<el-row class="mt10">
					<div v-if="!(orderDetail.custAddressId === -1 || orderDetail.channelId === '-1')">
						<el-table :data="updateReceiverAddressArr" max-height="170" style="border: 1px solid #ebeef5;" key="table">
							<el-table-column width="50">
								<template slot-scope="scope">
									<el-radio v-model="curReceivingAdd" size="medium" :label="scope.row.channelAddressId" style="width: 16px;overflow:hidden;vertical-align: middle;">
									</el-radio>
								</template>
							</el-table-column>
							<el-table-column prop="linkMan" label="收货人" show-overflow-tooltip></el-table-column>
							<el-table-column label="收货地址" show-overflow-tooltip>
								<template slot-scope="scope">
									{{ `${scope.row.province}-${scope.row.city}-${scope.row.area} ${scope.row.address}` }}
								</template>
							</el-table-column>
							<el-table-column prop="phone" label="联系电话" show-overflow-tooltip></el-table-column>
						</el-table>
					</div>
					<div v-else>
						<el-table :data="updateReceiverAddressArr" max-height="170" style="border: 1px solid #ebeef5;" key="table1">
							<el-table-column prop="linkMan" label="收货人" show-overflow-tooltip></el-table-column>
							<el-table-column label="收货地址" show-overflow-tooltip>
								<template slot-scope="scope">
									{{ `${scope.row.province}-${scope.row.city}-${scope.row.area} ${scope.row.address}` }}
								</template>
							</el-table-column>
							<el-table-column prop="phone" label="联系电话" show-overflow-tooltip></el-table-column>
							<el-table-column width="80" label="操作">
								<template slot-scope="scope">
									<a @click="editorAddress(scope.row)" class="createAddress_func">编辑</a>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-row>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="saveStoreout">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 新增地址 -->
		<el-dialog title="新增地址" :visible.sync="addReceiverAddress" width="660px" top="25vh">
			<ReceivingInformation @submit="submitCreateAddress" ref="ReceivingInformation" class="clearfix" :buttonName="'确认'"></ReceivingInformation>
		</el-dialog>
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { routesMapping } from "~/router";
import QuitMixins from "~/mixins/quit";
import PlatformMixins from "~/mixins/platform";
import GoodsListTable from "~/components/sales/salesOrder/GoodsListTable"; // 商品清单
import ReturnsTable from "~/components/sales/salesReturn/ReturnsTable"; // 退货
import OutboundRecordTable from "~/components/sales/salesOrder/OutboundRecordTable"; // 出库记录
import ChangeRecordTable from "~/components/sales/changeOrder/ChangeRecordTable"; // 换货记录
import OperationLogTable from "~/components/sales/LogComponent/OperationLogTable"; // 操作日志
import OutboundAbnormal from "~/components/sales/salesOrder/OutboundAbnormal"; // 拒收记录
import GoodsBaseInfo from "~/components/sales/salesOrder/GoodsBaseInfo"; // 商品详情
import LogisticsInfo from "~/components/sales/salesOrder/LogisticsInfo"; // 物流单
import ReceivingInformation from "~/components/common/ReceivingInformation"; // 收货信息
import utils from "~/utils/commonMethod";

export default {
	name: "CheckSalesOrder",
	mixins: [PlatformMixins, QuitMixins],
	components: {
		GoodsListTable,
		ReturnsTable,
		OutboundRecordTable,
		ChangeRecordTable,
		OperationLogTable,
		OutboundAbnormal,
		GoodsBaseInfo,
		LogisticsInfo,
		ReceivingInformation
	},
	mounted() {
		this.getSalesOrder();
		this.getGoodsInfo();
		this.getOrderAttr();
	},
	data() {
		return {
			// 本次出库操作数组
			curOutboundGoodsArr: [],
			// 出库商品列表
			outboundGoodsList: [],
			// 出库弹框
			outboundVisible: false,
			// 根据orderId获取的地址列表
			updateReceiverAddressArr: [],
			// 仓库地址
			warehouseOptions: [],
			// 选中仓库
			selectedWarehouse: "",
			// 切换订单
			saleOrderTab: [{ title: "商品清单" }],
			saleList: [], // 商品清单
			tableData: [], // 退货列表
			outStoreList: [], // 出库记录列表
			currentTitle: "商品清单", // 当前订单类别
			orderDetail: {}, // 订单商品详情
			logList: [], // 日志列表
			isChecked: true,
			orderAttrbute: {},
			dialogVisible: false,
			changeList: [], // 换货记录
			// 出库参数
			outboundParams: {
				expressCompany: "",
				deliveryType: '20',
				isUrgent: '',
				saleCategory: 'A'
			},
			// 配送方式Options
			deliveryTypeOptions: [
				{ label: "物流配送", value: '20' },
				{ label: "客户自提", value: '30' }
			],
			// 销售类别Options
			saleCategoryOptions: [
				{ label: "零售", value: "A" },
				{ label: "分销", value: "B" }
			],
			// 物流信息
			logisticsRecords: null,
			// 新增收货地址弹框
			addReceiverAddress: false,
			// 当地前收货地址index
			curReceivingAdd: "",
			curWarehouse: {},
			inStoreList: null, // 拒收记录列表
		};
	},
	methods: {
		...mapActions([
			"showPageLoading",
			"hidePageLoading",
			"salesModule",
			"queryStoreList",
			"queryChannelAddress",
			"saveOutStore",
			"queryLogList",
			"editOrderStatus",
			"querySalesChangeList",
			"querySalesOutStoreList",
			"querySalesOrderById",
			"querySalesOrderListById",
			"queryOrderAttr",
			"getRefundBySaleId",
			"editOrderStatus",
			"queryChangeOutStoreRecord",
			"queryGoodsDetail",
			"getRouterList",
			"createChannelAddressAction",
			"queryAddressByChannelIdAction",
			"querySinglePutstorage"
		]),
		// 关闭出库清除
		closeOutboundVisible() {
			this.updateReceiverAddressArr = []
			this.warehouseOptions = []
			this.selectedWarehouse = ''
			this.outboundParams = {
				expressCompany: "",
				deliveryType: '20',
				isUrgent: '',
				saleCategory: 'A'
			}
			this.outboundGoodsList = []
			this.curWarehouse = {}
		},
		// 编辑地址
		editorAddress(item) {
			this.addReceiverAddress = true
			const obj = Object.assign({}, {
				linkMan: item.linkMan,
				region: [item.provinceCode, item.cityCode, item.areaCode],
				regionName: [],
				phone: item.phone,
				address: item.address,
				isDefault: item.isDefault,
				custAddressId: item.custAddressId,
				channelAddressId: -1
			})
			let i = 0
			const time = setInterval(() => {
				if (this.$refs.ReceivingInformation.datas.length) {
					this.$refs.ReceivingInformation.ReceivingInformationParams = obj
					this.curReceivingAdd = -1
					this.$refs.ReceivingInformation.clearForm('ReceivingInformationParams')
					clearInterval(time)
				}
				if (i === 6) {
					clearInterval(time)
				}
				++i
			}, 500)
		},
		// 保存地址
		submitCreateAddress(params) {
			if (this.orderDetail.custAddressId === -1 || this.orderDetail.channelId === '-1') {
				this.updateReceiverAddressArr = [{
					linkMan: params.linkMan,
					phone: params.phone,
					provinceCode: params.region[0],
					cityCode: params.region[1],
					areaCode: params.region[2],
					province: params.regionName[0],
					city: params.regionName[1],
					area: params.regionName[2],
					address: params.address,
					custAddressId: params.custAddressId,
					channelAddressId: -1
				}]
				this.addReceiverAddress = false;
			} else {
				const msg = Object.assign(
					{},
					{
						channelId: this.orderDetail.channelId,
						linkMan: params.linkMan,
						phone: params.phone,
						provinceCode: params.region[0],
						cityCode: params.region[1],
						areaCode: params.region[2],
						province: params.regionName[0],
						city: params.regionName[1],
						area: params.regionName[2],
						address: params.address,
						isDefault: "0"
					}
				);
				this.createChannelAddressAction(msg).then(res => {
					if (res.code === 0) {
						this.queryAddressByChannelIdAction({
							channelId: this.orderDetail.channelId
						}).then(res => {
							if (res && res.result) {
								this.updateReceiverAddressArr = res.result;
								this.addReceiverAddress = false;
								this.$refs.ReceivingInformation.resetForm(
									"ReceivingInformationParams"
								);
								this.$message({
									type: "success",
									message: `新增地址成功`
								});
							}
						});
					}
				})
			}
		},
		// 出库
		// 设置本次出库数量
		setOutboundCount(item, index) {
			if (utils.isNum(item.outCount)) {
				this.$set(item, "outCount", Number(item.outCount))
				if (item.outCount < 0) {
					this.$set(item, "outCount", Math.abs(item.outCount))
				}
				if (item.outCount > item.usableCount) {
					this.$set(item, "outCount", item.usableCount)
				}
				const arr = this.outboundGoodsList.concat()
				arr.splice(index, 1)
				// 如果有skuid相同的订单
				if (arr.some(i => i.skuId === item.skuId)) {
					// 当前skuid相同订单的出库数量总数
					const sum = this.outboundGoodsList.filter(i => i.skuId === item.skuId).map(i => i.outCount).reduce((x, y) => (Number(x) + Number(y)))
					// 剩余库存数 = 可用库存数 - 当前skuid相同订单的出库数量总数
					const residueNum = item.unableCount - sum
					if (residueNum < 0) {
						const num = item.unableCount - item.oldOutCount
						if (isNaN(num)) {
							this.$set(item, "outCount", item.defalutCount)
							this.$set(item, "oldOutCount", item.outCount)
						} else {
							const sum = arr.filter(i => i.skuId === item.skuId).map(i => i.outCount).reduce((x, y) => (Number(x) + Number(y)))
							this.$set(item, "outCount", num > 0 ? item.unableCount - sum : 0)
							this.$set(item, "oldOutCount", item.outCount)
						}
					} else if (residueNum === 0) {
						this.$set(item, "outCount", item.outCount)
						this.$set(item, "oldOutCount", item.outCount)
					}
				}
			} else {
				this.$set(item, "outCount", undefined);
			}
		},
		// 出库-选中仓库更新商品列表
		updataSelectedWarehouse(val) {
			const data = {
				orderId: this.orderDetail.orderId,
				storehouseId: val,
				type: 1,
			};
			if (val !== -1) {
				this.selectedWarehouse = val;
				this.curWarehouse = this.warehouseOptions.find(i => i.storehouseId === val)
			}
			this.querySalesOutStoreList(data).then(res => {
				if (res && res.list) {
					res.list.forEach(i => {
						i.usableCount = (i.saleCount - i.sendCount) < 0 ? 0 : (i.saleCount - i.sendCount)
						if (i.usableCount > i.unableCount) {
							i.usableCount = i.unableCount;
						}
						i.defalutCount = i.outCount
					});
					this.outboundGoodsList = res.list;
				}
			})
		},
		// 出库初始化
		outboundFunc() {
			const bizType = { 11: 1, 12: 2, 13: 4 }[this.orderDetail.orderType]
			this.outboundVisible = true
			this.getStoreList({ bizType, channelId: this.orderDetail.channelId }, true)
			if (!(this.orderDetail.custAddressId === -1 || this.orderDetail.channelId === '-1')) {
				this.queryAddressByChannelIdAction({
					channelId: this.orderDetail.channelId
				}).then(res => {
					if (res && res.result) {
						this.updateReceiverAddressArr = res.result
						this.curReceivingAdd = this.orderDetail.custAddressId
					}
				});
			} else {
				this.updateReceiverAddressArr = [
					{
						linkMan: this.orderDetail.custLinkMan,
						province: this.orderDetail.province,
						city: this.orderDetail.city,
						area: this.orderDetail.area,
						address: this.orderDetail.custAddress,
						provinceCode: this.orderDetail.provinceCode,
						cityCode: this.orderDetail.cityCode,
						areaCode: this.orderDetail.areaCode,
						phone: this.orderDetail.custLinkTel,
						custAddressId: this.orderDetail.custAddressId,
						channelAddressId: -1
					}
				];
				this.curReceivingAdd = -1;
			}
		},
		// 条件查询仓库
		getStoreList(param = {}, ifUpdate = false) {
			this.queryStoreList(param).then(res => {
				this.warehouseOptions = res;
				if (ifUpdate) {
					this.updataSelectedWarehouse(-1);
				}
			});
		},
		// 保存出库
		saveStoreout() {
			if (!this.selectedWarehouse) {
				this.$message({
					type: "warning",
					message: `请选择发货仓库`
				});
				return false
			}
			let bizType;
			if (this.orderDetail.orderType === 11) {
				bizType = 1;
			} else if (this.orderDetail.orderType === 12) {
				bizType = 2;
			} else if (this.orderDetail.orderType === 13) {
				bizType = 4;
			}
			const curwarehouse = this.warehouseOptions.find(
				i => i.storehouseId === this.selectedWarehouse
			);
			if (typeof this.curReceivingAdd === 'number') {
				const curAddress = this.updateReceiverAddressArr.find(
					i => i.channelAddressId === this.curReceivingAdd
				)
				Object.assign(
					curAddress,
					{ custAddressId: curAddress.channelAddressId },
					{ custLinkMan: curAddress.linkMan },
					{ custLinkTel: curAddress.phone },
					{ customerName: curAddress.custLinkMan },
					{ receiveAddress: curAddress.address }
				);
				const params = Object.assign(
					{},
					{ relatedSheetId: this.orderDetail.orderId },
					{ remark: this.orderDetail.remark },
					{ channelId: this.orderDetail.channelId },
					{ stockId: curwarehouse.storehouseId },
					{ stockType: curwarehouse.storehouseType },
					{ bizType: bizType },
					{ type: 1 },
					curAddress,
					this.curWarehouse.storehouseType === 2 ? this.outboundParams : {}
				);
				params.sendSkuList = this.outboundGoodsList.map(i => ({
					skuId: i.skuId,
					outCount: i.outCount === null ? 0 : i.outCount,
					saleCount: i.saleCount,
					relatedSheetSeqNo: i.serialNo,
					skuPrice: i.price,
					productId: i.productId
				}));
				this.showPageLoading();
				this.saveOutStore(params).then(res => {
					this.getSalesOrder();
					this.getGoodsInfo();
					this.getOrderAttr();
					this.hidePageLoading();
					if (res === -1) {
						this.$message({
							type: "error",
							message: `中移物流请求超时，请到异常订单中重试`
						})
					} else {
						this.$message({
							type: "success",
							message: `出库成功`
						})
					}
					this.outboundVisible = false;
				}).catch(err => {
					this.hidePageLoading()
					this.$message({
						type: "error",
						message: err.msg
					})
				})
			} else {
				this.$message({
					type: "warning",
					message: `请选择收货地址`
				});
			}
		},
		changeTab(title) {
			this.currentTitle = title;
			switch (title) {
				case "出库记录":
					this.getOutStore();
					break;
				case "退货记录":
					this.getOrderRefund();
					break;
				case "操作日志":
					this.getOrderLog();
					break;
				case "换货记录":
					this.getSalesChangeList();
					break;
				case "物流单":
					this.getRouter();
					break;
				case "拒收记录":
					this.getInStore();
					break;
			}
		},
		// 获取商品清单
		getSalesOrder() {
			this.showPageLoading();
			const params = {
				orderId: this.$route.params.saleOrderId
			};
			this.querySalesOrderListById(params)
				.then(res => {
					this.saleList = res.result;
					this.hidePageLoading();
				})
				.catch(() => {
					this.hidePageLoading();
				});
		},
		// 获取商品信息
		getGoodsInfo() {
			const datas = {
				orderId: this.$route.params.saleOrderId
			};
			this.queryGoodsDetail(datas)
				.then(res => {
					this.orderDetail = res;
				})
				.catch(() => {
					this.hidePageLoading();
				});
		},
		getOrderLog() {
			// 获取订单日志
			this.showPageLoading();
			// 0-销售订单;1-销售退单;2-销售换货
			const params = {
				billId: this.$route.params.saleOrderId,
				billType: 0
			};
			this.queryLogList(params)
				.then(res => {
					this.hidePageLoading();
					this.logList = res.result;
				})
				.catch(() => {
					this.hidePageLoading();
				});
		},
		getOutStore() {
			// 出库记录
			this.showPageLoading();
			const datas = {
				type: 1,
				bizType: 1,
				relatedSheetId: this.$route.params.saleOrderId
			};
			if (this.orderDetail.orderType === 12) {
				datas.bizType = 2;
			} else if (this.orderDetail.orderType === 13) {
				datas.bizType = 4;
			}
			this.queryChangeOutStoreRecord(datas)
				.then(res => {
					this.hidePageLoading();
					if (res.data === null) {
						this.outStoreList = null;
						return;
					}
					this.outStoreList = res;
				})
				.catch(() => {
					this.hidePageLoading();
				});
		},
		// 获取订单属性
		getOrderAttr() {
			this.queryOrderAttr({ orderId: this.$route.params.saleOrderId })
				.then(res => {
					this.hidePageLoading();
					this.saleOrderTab = [{ title: "商品清单" }];
					if (Number(res.logisticsFlag)) {
						this.saleOrderTab.push({ title: "物流单" });
					}
					if (Number(res.outStoreFlag)) {
						this.saleOrderTab.push({ title: "出库记录" });
					}
					if (Number(res.returnFlag)) {
						this.saleOrderTab.push({ title: "退货记录" });
					}
					if (Number(res.changeFlag)) {
						this.saleOrderTab.push({ title: "换货记录" });
					}
					if (Number(res.outStoreErrorFlag)) {
						this.saleOrderTab.push({ title: "拒收记录" });
					}
					if (Number(res.operLogFlag)) {
						this.saleOrderTab.push({ title: "操作日志" });
					}
					this.orderAttrbute = res;
				})
				.catch(() => {
					this.hidePageLoading();
				});
		},
		// 获取物流记录
		getRouter() {
			this.showPageLoading();
			this.getRouterList({ orderId: this.$route.params.saleOrderId }).then(
				res => {
					this.hidePageLoading();
					this.logisticsRecords = res;
				}
			).catch(() => {
				this.hidePageLoading();
			});
		},
		goBack() {
			// 返回列表页
			this.OnBackLatePage();
		},
		//点击取消
		OnBackLatePage() {
			this.quit(routesMapping.SalesOrder, true);
		},
		getOrderRefund() {
			this.showPageLoading();
			this.getRefundBySaleId({ orderId: this.$route.params.saleOrderId })
				.then(res => {
					this.hidePageLoading();
					this.tableData = res.result;
				})
				.catch(() => {
					this.hidePageLoading();
				});
		},
		cancelOrder() {
			// 取消订单
			this.$confirm("确认取消订单?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					this.showPageLoading();
					const cancelDatas = {
						orderId: this.$route.params.saleOrderId,
						orderStatus: 0
					};
					this.editOrderStatus(cancelDatas)
						.then(res => {
							this.hidePageLoading();
							this.getGoodsInfo();
						})
						.catch(() => {
							this.hidePageLoading();
						});
				})
				.catch(() => { });
		},
		finishedOrder() {
			// 完成订单
			this.$confirm("确认完成订单?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					this.showPageLoading();
					const datas = {
						orderId: this.$route.params.saleOrderId,
						orderStatus: 5
					};
					this.editOrderStatus(datas)
						.then(res => {
							this.hidePageLoading();
							this.getGoodsInfo();
						})
						.catch(() => {
							this.hidePageLoading();
						});
				})
				.catch(() => { });
		},
		getSalesChangeList() {
			this.showPageLoading();
			this.querySalesChangeList({ orderId: this.$route.params.saleOrderId })
				.then(res => {
					this.hidePageLoading();
					this.changeList = res;
				})
				.catch(() => {
					this.hidePageLoading();
				});
		},
		toEditPage() {
			this.$router.push({ name: 'UpdateSalesOrder', params: { orderId: this.$route.params.saleOrderId } });
		},
		// 查询拒收记录
		getInStore() {
			this.showPageLoading();
			const datas = {
				type: 5,
				bizType: 1,
				relatedSheetId: this.$route.params.saleOrderId
			};
			if (this.orderDetail.orderType === 12) {
				datas.bizType = 2;
			} else if (this.orderDetail.orderType === 13) {
				datas.bizType = 4;
			}
			this.querySinglePutstorage(datas).then((res) => {
				this.hidePageLoading();
				if (res.data === null) {
					this.inStoreList = null;
					return;
				}
				this.inStoreList = res.toString() === '' ? null : res.stockPerInList;
			}).catch(() => {
				this.hidePageLoading();
			});
		},
	},
	computed: {
		// ...mapState({
		//     orderDetail: ({ goodsDetail }) => goodsDetail.goodsDetailItem,
		// }),
		getStatus() {
			switch (this.orderDetail && this.orderDetail.orderStatus) {
				case 0:
					return "已取消";
					break;
				case 1:
					return "未发货";
					break;
				case 2:
					return "待出库";
					break;
				case 3:
					return "部分发货";
					break;
				case 4:
					return "已发货";
					break;
				case 5:
					return "已完成";
					break;
				case 6:
					return "已拒收";
					break;
				default:
					return null;
			}
		}
	},
	watch: {
		$route(to, from) {
			if (to.name === 'CheckSalesOrder') {
				// if (this.orderDetail.orderId !== this.$route.params.saleOrderId) {
				// 	this.currentTitle = "商品清单";
				// }
				this.currentTitle = "商品清单";
				this.getSalesOrder();
				this.getGoodsInfo();
				this.getOrderAttr();
			}
		}
	}
};
</script>
<style lang="scss">
.top-tab {
  .edit-btn {
    width: 60px;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    padding: 0;
  }
  // 编辑按钮
  .icon-bianji {
    font-size: 14px !important;
  }
}
.isUrgent {
  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background: #1989fa;
    border-color: #1989fa;
  }
  .el-checkbox__input.is-disabled + span.el-checkbox__label {
    color: #666 !important;
    font-size: 12px;
  }
}
.el-checkbox__inner::after {
  /*border: 2px solid #fff;*/
  border-color: #fff !important;
  border-bottom-width: 2px;
}
.checkSalesOrder {
  .el-table td {
    border-bottom: none;
  }
  .el-button {
    border-radius: 2px;
  }
  .receivingInformation {
    .el-form {
      .displayStyle {
        padding-left: 15px;
        .linkMan,
        .phone {
          width: 180px;
        }
        .address,
        .region {
          width: 490px;
        }
      }
      .saveAdd,
      .saveAdd:hover {
        float: right;
        margin-right: 5px;
        background-color: #3b8cff !important;
        width: 100px;
        color: #fff !important;
      }
    }
  }
}
</style>
<style scoped lang="scss">
.inner-box {
  height: 100%;
  padding-top: 10px;
  .order-content {
    background: #fff;
    margin-right: 16px;
    height: 100%;
  }
  // 右侧商品详情
  .goods-base-info {
    min-width: 280px;
  }
  /*顶部切换*/
  .top-tab {
    background: #f6f7fb;
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
  }
  .sale-item-number {
    color: #333;
    font-size: 12px;
    margin-bottom: 15px;
    .isUrgent {
      color: #666;
      margin-left: 30px;
    }
  }
  .sale-item-number span:nth-of-type(1) {
    margin-right: 30px;
    font-size: 14px;
  }
  .sale-order-tab {
    margin-top: 15px;
  }
  .sale-order-tab li {
    display: inline-block;
    width: 86px;
    height: 36px;
    background: #e7e8ed;
    margin-right: 6px;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
    color: #666;
  }
  .sale-order-tab li.active {
    background: #fff;
    color: #333;
  }
  .order-list {
    box-sizing: border-box;
    padding: 21px;
    background: #fff;
  }
}
/*选择仓库*/
.choose-warehouse {
  margin-top: 20px;
}
/*出库*/
.outbound-wrapper {
  margin-top: 16px;
}
.bottom-line {
  width: 100%;
  height: 1px;
  background: #eeeff6;
  margin: 20px 0;
}
/*取消和完成订单的按钮*/
.self-specail-btn {
  width: 72px;
  height: 28px;
  border: 1px solid #bfd9fe;
  border-radius: 2px;
  font-size: 12px;
  color: #3b8cff;
  text-align: center;
  line-height: 28px;
  background: transparent;
}
.self-specail-btn.el-button.is-plain:focus,
.self-specail-btn.el-button.is-plain:hover {
  border-color: #bfd9fe;
  color: #3b8cff;
  background: transparent;
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
.addressInformation {
  margin-top: 20px;
  background: #f8f9fb;
  padding: 0 20px 20px;
  .addressInformation_title {
    padding: 20px 0;
    font-size: 14px;
    color: #333333;
    line-height: 14px;
  }
}
</style>

