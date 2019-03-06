<template>
	<div class="salesModuleList change-list-out-wrapper">
		<div class="table-container">
			<div class="top-scroll-section top-scroll-sectionSpe">
				<div>
					<div class="filterControl">
						<div class="filterDate">
							<SearchDate ref="searchDate" @onHandleDate="handleDate({type:1,value:Object.values($event).join('~')})" :isClearDate="isClearDate"></SearchDate>
						</div>
						<div class="filterSearch">
							<search ref="search" @searchValue="getSearchValue({type:0,value:$event})" :isClear='isClear' :showPlaceholder="'输入编号/客户或物流信息查询'"></search>
						</div>
					</div>
					<div class="search_result_container" v-if="searchItemValueArray.length>0">
						<search-result :searchItemValueArray="searchItemValueArray" :count="totalCount" @deleteItem="getDeleteItem"></search-result>
					</div>
				</div>
				<div class="table-wrapper table-wrapperSpe" id="change-list-table-wrapper">
					<ChangeListTable :changeOrderList="changeOrderList" @changeAddressFunction="changeAddressFunction" @getListRefresh="getListRefresh" @queryOutStoreFcuntion="queryOutStoreFcuntion" @queryPurchaseDetailsFcuntion="queryPurchaseDetailsFcuntion" @setCurOperationRow="setCurOperationRow">
					</ChangeListTable>
				</div>
			</div>
			<div class="pagination-section" v-if="totalCount !== 0">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="param.pageNo" background :page-size="param.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
				</el-pagination>
			</div>
		</div>
		<div class="model-container">
			<!--入库-->
			<InstoreDialog @confirmInStore="confirmInStore" @closeDiaolog="closeDiaolog" :inStoreDialogVisible="inStoreDialogVisible" :saleChangeSkus="inStockGoods.saleChangeSkusModels" :inStoreDisabled="inStoreDisabled"></InstoreDialog>
			<!--出库-->
			<OutstoreDialog @closeDiaolog="closeOutstoreDiaolog" @confirmOutStore="confirmOutStore" :outStoreDialogVisible="outStoreDialogVisible" :saleChangeSkus="currentChangeList.saleChangeSkusModels" :outStoreDisabled="outStoreDisabled" :orderType="currentChangeList.changeType" :orderId="currentChangeList.changeId" :channelId="currentChangeList.channelId"></OutstoreDialog>
			<!--修改收货信息-->
			<!--非excel导入且渠道不为空 start-->
			<el-dialog title="收货信息" :visible.sync="changeReceiveAddress" width="800px" class="remark-log-dialog out-store-operating">
				<div class="product-list-table-common change-receive-address">
					<div class="add-address">
						<el-button plain size="small" @click="addAddressBtn">
							<i class="el-icon-plus"></i>新增地址</el-button>
					</div>
					<el-table class="ProductListTable sale-list-table" :data="customerInStoreInfo" highlight-current-row @row-click="changeCurrentAddress" style="width: 100%">
						<el-table-column width="40">
							<template slot-scope="scope">
								<el-radio v-model="radio" :label="scope.row.channelAddressId" id="address-radio-label"></el-radio>
							</template>
						</el-table-column>
						<el-table-column property="linkMan" label="收货人">
							<template slot-scope="scope">
								<span>{{scope.row.linkMan}}</span>
							</template>
						</el-table-column>
						<el-table-column label="收货地址" show-overflow-tooltip>
							<template slot-scope="scope">
								{{ `${scope.row.province}-${scope.row.city}-${scope.row.area} ${scope.row.address}` }}
							</template>
						</el-table-column>
						<el-table-column label="联系电话">
							<template slot-scope="scope">
								<span>{{`${scope.row.phone.substr(0,3)} ${scope.row.phone.substr(3,4)} ${scope.row.phone.substr(6,4)}`}}</span>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="saveContactAddress">保存</el-button>
				</span>
			</el-dialog>
			<!--非excel导入，且渠道不为空 end-->

			<!--excel导入，或渠道为空 start-->

			<el-dialog title="收货信息" :visible.sync="editImportOrderAdress" width="660px" top="25vh">
				<ReceivingInformation @submit="submitEditImportAddress" ref="ReceivingInformation" class="clearfix" :buttonName="'确认'"></ReceivingInformation>
			</el-dialog>

			<!--excel导入，或渠道为空 end-->

			<!-- 新增地址 -->
			<el-dialog title="新增地址" :visible.sync="addReceiverAddress" width="660px" top="25vh">
				<ReceivingInformation @submit="submitCreateAddress" ref="ReceivingInformation" class="clearfix" :buttonName="'确认'"></ReceivingInformation>
			</el-dialog>
		</div>
	</div>
</template>
<script>
import Search from "~/components/common/Search";
import SearchDate from "~/components/common/SearchDate";
import Modal from "~/components/Modal";
import { mapActions, mapState } from "vuex";
import QuitMixins from "~/mixins/quit";
import PlatformMixins from "~/mixins/platform";
import utils from "~/utils/commonMethod";
import ReceivingInformation from "~/components/common/ReceivingInformation.vue"; // 收货信息
import InstoreDialog from "~/components/sales/changeOrder/InstoreDialog"; // 入库弹出框组件
import OutstoreDialog from "~/components/sales/changeOrder/OutstoreDialog"; // 出库弹出框组件
import ChangeListTable from "~/components/sales/changeOrder/ChangeListTable"; // 列表组件
import SearchResult from "~/components/common/SearchResultTag";

export default {
	name: "changeOrderList",
	data() {
		return {
			param: {
				pageSize: 10,
				pageNo: 1,
				searchContent: "",
				changeStatus: "",
				changeType: '31,32,33',
				errorType: 0,
				invType: 1,
			},
			inStoreDialogVisible: false, // 入库
			outStoreDialogVisible: false, // 出库
			changeReceiveAddress: false, // 收货信息
			addReceiverAddress: false, // 新增收货地址
			editImportOrderAdress: false, // excel导入或渠道为空
			remark: "",
			showResetButton: false,
			isSearch: false,
			isShowSearchResult: false,
			changeOrderList: [],
			totalCount: 0,
			inStockGoods: [],
			customerInStoreInfo: [], // 客户地址数据
			radio: 0, // 单选按钮
			currentChangeList: {}, // 换货商品详情列表
			curChangeOrderId: "", // 当前换货id
			curOperationRow: {}, // 编辑当前行的信息
			// 新增地址参数
			createAddressParams: {
				channelId: "",
				linkMan: "",
				phone: "",
				area: [],
				address: "",
				isDefault: "0"
			},
			// 非渠道编辑地址
			editImportOrderData: {
				channelId: "",
				linkMan: "",
				phone: "",
				area: [],
				address: "",
				isDefault: "0",
				channelAddressId: -1,
				changeId: ""
			},
			// 收货地址校验
			createAddressRules: {
				linkMan: [
					{ required: true, message: "请输入联系人", trigger: "blur" },
					{ max: 10, message: "输入内容长度请在10个字符内", trigger: "blur" }
				],
				phone: [
					{ required: true, message: "请输入联系电话", trigger: "blur" },
					{ max: 16, message: "输入内容长度请在16个字符内", trigger: "blur" }
				],
				area: [
					{
						required: true,
						message: "请选择收货地址",
						trigger: "change",
						type: "array"
					}
				],
				address: [
					{ required: true, message: "请输入详细地址", trigger: "blur" },
					{ max: 200, message: "输入内容长度请在200个字符内", trigger: "blur" }
				]
			},
			inStoreDisabled: false, // 入库禁用
			outStoreDisabled: false, // 出库禁用
			// 搜索条件集合
			searchItemValueArray: [],
			isClear: false,
			isClearDate: false
		};
	},
	mixins: [QuitMixins, PlatformMixins],
	components: {
		Search,
		Modal,
		SearchDate,
		ReceivingInformation,
		InstoreDialog,
		OutstoreDialog,
		ChangeListTable,
		SearchResult
	},
	props: { flag: Number, curClickMenu: Number },
	created() {
		this.queryChangeListFunction(this.param);
	},
	watch: {
		$route(to) {
			if (to.name === 'SalesChange') {
				this.queryChangeListFunction(this.param);
				this.$emit('refreshCount');
			}
		},
		flag: function (nval) {
			this.param.pageSize = 10;
			this.param.pageNo = 1;
			this.param.changeStatus = parseInt(nval) !== -1 ? parseInt(nval) : "";
			if (parseInt(nval) === -1 && this.param.errorType !== '') {
				this.param.errorType = '5,8,2,3';
				this.initData();
				return;
			}
			if (parseInt(nval) > 20 && parseInt(nval) < 25) {
				this.param.changeType = '';
				this.param.changeStatus = '';
			}
			switch (parseInt(nval)) {
				case 21: this.param.errorType = '5'; break;
				case 22: this.param.errorType = '8'; break;
				case 23: this.param.errorType = '2'; break;
				case 24: this.param.errorType = '3'; break;
			}
			setTimeout(() => {
				this.searchItemValueArray.splice(0, 10);
			}, 0);
			this.param.channelType = '';
			this.param.searchContent = "";
			this.$refs.search.searchForm.searchValue = "";
			this.param.startDate = '';
			this.param.endDate = '';
			this.$refs.searchDate.curDate = '';
			this.initData();
		},
		curClickMenu: function (val) {
			this.param.pageSize = 10;
			this.param.pageNo = 1;
			this.param.changeStatus = "";
			this.param.changeType = this.curClickMenu;
			this.param.errorType = '';
			this.param.invType = 0;
			if (parseInt(this.curClickMenu) === 31) {
				this.param.changeType = '31,32,33';
				this.param.invType = 1;
			}
			if (parseInt(this.curClickMenu) === 34) {
				this.param.changeType = '';
				this.param.errorType = '5,8,2,3';
			}
			this.initData();
		},
		changeReceiveAddress: function () {
			// 弹窗关闭reset数据
			if (!this.changeReceiveAddress) {
				this.customerInStoreInfo = [];
			}
		},
		inStoreDialogVisible: function () {
			// 弹窗关闭reset数据 // 入库
			// this.customerInStoreInfo = this.inStoreDialogVisible ? this.customerInStoreInfo: [];
		},
		outStoreDialogVisible: function () {
			// 弹窗关闭reset数据   出库
			this.currentChangeList = this.outStoreDialogVisible
				? this.currentChangeList
				: {};
			// this.shipStockName = '';
		}
	},
	mounted() {
		this.refreshPage(this.param);
	},
	methods: {
		...mapActions([
			"changeList",
			"showPageLoading",
			"hidePageLoading",
			"queryChangeOrderInfoById",
			"saveOutStore",
			"saveInStore",
			"queryChannelAddress",
			"editChangeOrderAddress",
			"createNewChannelAddress",
			"editChannelAddressStatus",
			"setDefaultChannelAddress",
		]),
		setCurOperationRow(row) {
			this.curOperationRow = Object.assign({}, row)
		},
		handleSizeChange(nSize) {
			this.param.pageSize = nSize;
			this.refreshPage(this.param);
		},
		handleCurrentChange(nPage) {
			this.param.pageNo = nPage;
			this.refreshPage(this.param);
		},
		refreshPage(nval) {
			this.showPageLoading();
			this.queryChangeListFunction(nval);
		},
		initData() {
			this.getReset();
		},
		getSearchValue(searchValue) {
			this.param.pageSize = 10;
			this.param.pageNo = 1;
			this.param.searchContent = searchValue.value;
			let i = this.searchItemValueArray.findIndex(val => val.type === 0);
			if (i === -1) {
				this.searchItemValueArray.push({ type: 0, value: searchValue.value });
			} else {
				this.searchItemValueArray.splice(i, 1, {
					type: 0,
					value: searchValue.value
				});
			}
			this.isSearch = true;
			this.isClear = false;
			this.refreshPage(this.param);
		},
		// 按照时间来搜索
		handleDate(val, timeIndex = null) {
			this.param = Object.assign({}, this.param, {
				startDate: val.value.split("~")[0],
				endDate: val.value.split("~")[1]
			});
			this.refreshPage(this.param);
			if (this.param.startDate === "") {
				return;
			}
			let i = this.searchItemValueArray.findIndex(val => val.type === 1);
			if (i === -1) {
				this.searchItemValueArray.push({ type: 1, value: val.value.split("~")[2]?'时间：'+val.value.split("~")[2]:'时间：'+val.value });
			} else {
				this.searchItemValueArray.splice(i, 1, { type: 1, value: val.value.split("~")[2]?'时间：'+val.value.split("~")[2]:'时间：'+val.value });
			}

			this.isClearDate = false;
		},
		// 删除搜索条件
		getDeleteItem(item) {
			this.searchItemValueArray.splice(
				this.searchItemValueArray.findIndex(val => val.type === item.type),
				1
			);
			switch (item.type) {
				case 0:
					this.isClear = true;
					this.param.searchContent = "";
					this.refreshPage(this.param);
					break;
				case 1:
					this.isClearDate = true;
					break;
				default:
					break;
			}
		},
		queryChangeListFunction(param) {
			this.changeList(param)
				.then(resp => {
					this.hidePageLoading();
					this.changeOrderList = resp.result;
					this.totalCount = resp.totalCount;
					if (this.isSearch) {
						this.showResetButton = true;
						this.isShowSearchResult = true;
					}
				})
				.catch(err => {
					this.changeOrderList = [];
					this.totalCount = 0;
					this.hidePageLoading();
				});
		},
		queryPurchaseDetailsFcuntion(id) {
			// 入库
			this.getChangeInfo(id).then(res => {
				this.inStockGoods = res;
				this.inStoreDialogVisible = true;
			});
		},
		queryOutStoreFcuntion(id) {
			// 出库
			// this.querySockList();
			this.getChangeInfo(id).then(res => {
				this.currentChangeList = res;
				this.outStoreDialogVisible = true;
			});
		},
		// 获取换货商品信息
		getChangeInfo(id) {
			this.showPageLoading();
			return new Promise((resolve, reject) => {
				const datas = {
					changeId: id
				};
				this.queryChangeOrderInfoById(datas)
					.then(res => {
						this.hidePageLoading();
						resolve(res);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		getReset() {
			this.showResetButton = false;
			this.isShowSearchResult = false;
			this.param.searchContent = "";
			this.isSearch = false;
			this.outStoreDisabled = false;
			this.inStoreDisabled = false;
			this.refreshPage(this.param);
		},
		changeAddressFunction(row) {
			// 更换收货地址
			if (row.customerAddressId === -1) {
				// this.editImportOrderData.channelId = row.channelId;
				// this.editImportOrderData.channelAddressId = -1;
				this.editImportOrderData.changeId = row.changeId;
				// this.editImportOrderData.linkMan = row.custLinkMan;
				// this.editImportOrderData.phone = row.custLinkTel;
				// // this.editImportOrderData.area = row.customerAddress
				// // 	.split(" ")[0]
				// // 	.split("-");
				// this.editImportOrderData.area = [row.province, row.city, row.area];
				// this.editImportOrderData.address = row.customerAddress;

				// console.log(row.customerAddress, 645);
				// console.log(this.editImportOrderData, 21212);
				this.editImportOrderAdress = true;
				const obj = Object.assign({}, {
					linkMan: row.custLinkMan,
					region: [row.provinceCode, row.cityCode, row.areaCode],
					regionName: [row.province, row.city, row.area],
					phone: row.custLinkTel,
					address: row.customerAddress,
					isDefault: 0,
					channelId: row.channelId,
					channelAddressId: -1,
				})
				let i = 0
				const time = setInterval(() => {
					if (this.$refs.ReceivingInformation && this.$refs.ReceivingInformation.datas && this.$refs.ReceivingInformation.datas.length) {
						this.$refs.ReceivingInformation.ReceivingInformationParams = obj
						this.curReceivingAdd = 0
						this.$refs.ReceivingInformation.clearForm('ReceivingInformationParams')
						clearInterval(time)
					}
					if (i === 10) {
						clearInterval(time)
					}
					++i
				}, 500)
				return;
			}
			this.curChangeOrderId = row.changeId;
			this.radio = row.customerAddressId;
			this.createAddressParams.channelId = row.channelId;
			this.getCustomerAddress(row.channelId).then(res => {
				this.customerInStoreInfo = res.result;
				this.changeReceiveAddress = true;
			});
		},
		confirmOutStore(outboundParams, shipStockName, stockType) {
			// 确认出库
			if (!shipStockName) {
				this.$message({ message: "请选择发货仓库", type: 'warning' });
				return;
			}
			this.showPageLoading();
			this.outStoreDisabled = true;
			const newProductDetailList = [];
			this.currentChangeList.saleChangeSkusModels.map(val => {
				let items = {};
				items.skuId = val.skuId;
				items.outCount = val.changeCount;
				items.saleCount = val.changeCount;
				items.relatedSheetSeqNo = val.serialNo;
				items.skuPrice = val.price;
				items.productId = val.productId;
				newProductDetailList.push(items);
			});
			const bizType = { 31: 1, 32: 2, 33: 4 }[this.currentChangeList.changeType]
			const datas = {
				stockId: shipStockName,
				relatedSheetId: this.currentChangeList.changeId,
				type: 4, // 订单类型，换货订单
				bizType, // 1：普通，2：代售 3：代发，4：代发出库
				custAddressId: this.currentChangeList.customerAddressId,
				custLinkMan: this.currentChangeList.custLinkMan,
				custLinkTel: this.currentChangeList.custLinkTel,
				receiveAddress: this.currentChangeList.customerAddress,
				stockType: stockType,
				sendSkuList: newProductDetailList,
				channelId: this.currentChangeList.channelId,
				province: this.currentChangeList.province,
				city: this.currentChangeList.city,
				area: this.currentChangeList.area,
				provinceCode: this.currentChangeList.provinceCode,
				cityCode: this.currentChangeList.cityCode,
				areaCode: this.currentChangeList.areaCode,
			};
			const params = Object.assign({}, datas, outboundParams);
			this.saveOutStore(params)
				.then(res => {
					this.outStoreDisabled = false;
					this.hidePageLoading();
					if (res === -1) {
						this.$message({
							type: "error",
							message: `中移物流请求超时，请到异常订单中重试`
						});
					} else {
						this.$message({
							message: '出库成功',
							type: 'success',
						});
					}
					this.$emit('refreshCount');
					this.outStoreDialogVisible = false;
					this.initData();
				})
				.catch(() => {
					this.hidePageLoading();
					this.outStoreDisabled = false;
				});
		},
		confirmInStore() {
			// 确认入库
			this.showPageLoading();
			this.inStoreDisabled = true;
			let bizType = { 31: 1, 32: 2, 33: 4 }[this.curOperationRow.changeType];
			const datas = {
				type: 6,
				bizType,
				channelId: this.inStockGoods.channelId,
				storehouseId: this.inStockGoods.stockId,
				relatedSheetId: this.inStockGoods.changeId,
				inSkuList: []
			};
			this.inStockGoods.saleChangeSkusModels.forEach(function (item) {
				const itemValue = {};
				itemValue.skuId = item.skuId;
				itemValue.skuPrice = item.price;
				itemValue.totleCount = item.changeCount;
				itemValue.inCount = item.changeCount;
				itemValue.productId = item.productId;
				itemValue.relatedSeqNo = item.serialNo;
				itemValue.productId = item.productId;
				datas.inSkuList.push(itemValue);
			});
			this.saveInStore(datas)
				.then(res => {
					this.hidePageLoading();
					if (res === -1) {
						this.$message({
							type: "error",
							message: `中移物流请求超时，请到异常订单中重试`
						});
					} else {
						this.$message({
							message: '入库成功',
							type: 'success',
						});
					}
					this.inStoreDisabled = false;
					this.inStoreDialogVisible = false;
					this.$emit('refreshCount');
					this.initData();
				})
				.catch(() => {
					this.hidePageLoading();
					this.inStoreDisabled = false;
				});
		},
		// 根据客户id获取客户地址
		getCustomerAddress(custId) {
			this.showPageLoading();
			return new Promise((resolve, reject) => {
				this.queryChannelAddress({ channelId: custId })
					.then(res => {
						this.hidePageLoading();
						resolve(res);
					})
					.catch(err => {
						this.hidePageLoading();
						reject(err);
					});
			});
		},
		changeCurrentAddress(val) {
			// 更改收货地址触发
			this.radio = val.channelAddressId;
		},
		saveContactAddress() {
			// 保存收货地址
			if (this.customerInStoreInfo.length === 0) {
				this.$message({
					message: "未选择要更改的地址",
					type: "warning"
				});
				return;
			}
			const datas = {
				channelAddressId: this.radio,
				changeId: this.curChangeOrderId
			};
			this.editChangeOrderAddress(datas).then(res => {
				this.changeReceiveAddress = false;
				this.$message({
					message: '修改成功',
					type: 'success',
				});

				this.initData();
			});
		},
		// 重置新增地址的表单
		clearForm(name) {
			this.$refs[name].resetFields();
		},
		// 保存地址
		submitCreateAddress(params) {
			this.inStoreDisabled = true; // 禁用按钮
			const msg = Object.assign(
				{},
				{
					channelId: this.createAddressParams.channelId,
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
			this.createNewChannelAddress(msg)
				.then(res => {
					this.inStoreDisabled = false;
					if (res.code === 0) {
						this.getCustomerAddress(this.createAddressParams.channelId)
							.then(res => {
								this.customerInStoreInfo = res.result;
								this.addReceiverAddress = false;
								this.$refs.ReceivingInformation.resetForm(
									"ReceivingInformationParams"
								);
							})
							.catch(() => {
								this.inStoreDisabled = true;
							});
					} else {
						return false;
					}
				})
				.catch(() => {
					this.inStoreDisabled = true;
				});
		},
		// 新增收货地址
		addAddressBtn() {
			this.addReceiverAddress = true;
		},
		// 设置默认收货地址
		setDefaultAddress(item, index) {
			this.showPageLoading();
			this.setDefaultChannelAddress({ channelAddressId: item.channelAddressId })
				.then(res => {
					this.hidePageLoading();
					if (res.code === 0) {
						this.getCustomerAddress(this.createAddressParams.channelId).then(
							res => {
								this.customerInStoreInfo = res.result;
								this.changeReceiveAddress = true;
							}
						);
					} else {
						this.$message({
							type: "error",
							message: "设置失败"
						});
					}
				})
				.catch(() => {
					this.hidePageLoading();
				});
		},
		// 提交编辑excel导入的地址
		submitEditImportAddress(params) {
			const datas = {
				province: params.regionName[0],
				city: params.regionName[1],
				area: params.regionName[2],
				provinceCode: params.region[0],
				cityCode: params.region[1],
				areaCode: params.region[2],
				custLinkMan: params.linkMan,
				custLinkTel: params.phone,
				customerAddress: params.address,
				changeId: this.editImportOrderData.changeId,
				channelId: this.editImportOrderData.channelId,
				channelAddressId: this.editImportOrderData.channelAddressId,
				custArea: this.editImportOrderData.area.join("-"),
			};
			this.showPageLoading();
			// const datas = {
			// 	custLinkMan: params.linkMan,
			// 	channelId: this.editImportOrderData.channelId,
			// 	changeId: this.editImportOrderData.changeId,
			// 	channelAddressId: this.editImportOrderData.channelAddressId,
			// 	custLinkTel: this.editImportOrderData.phone,
			// 	customerAddress: this.editImportOrderData.address,
			// 	custArea: this.editImportOrderData.area.join("-")
			// };
			this.editChangeOrderAddress(datas)
				.then(res => {
					if (res.code === 0) {
						this.hidePageLoading();
						this.editImportOrderAdress = false;
						this.$message({
							message: '修改成功',
							type: 'success',
						});
						this.initData();
						return;
					}
					this.$message({
						type: "warning",
						message: "修改失败"
					});
				})
				.catch(() => {
					this.hidePageLoading();
				});
		},
		// 子组件触发的关闭弹窗
		closeDiaolog() {
			this.inStoreDialogVisible = false;
			this.inStoreDisabled = false;
		},
		// 子组件触发的关闭弹窗
		closeOutstoreDiaolog() {
			this.outStoreDialogVisible = false;
			this.outStoreDisabled = false;
		},
		// 列表子组件触发刷新
		getListRefresh() {
			this.$emit('refreshCount');
			this.refreshPage(this.param);
		}
	}
};
</script>

<style lang="scss">
.salesModuleList {
  .table-container {
    padding-top: 20px;
    background-color: #fff;
    height: 100%;
    // #change-list-table-wrapper {
    //   .cell {
    //     font-size: 12px;
    //   }
    //   /*更多操作*/
    //   .el-table_1_column_3.is-leaf {
    //     border-left: none;
    //   }
    // }
    .el-table__body-wrapper {
      overflow-x: hidden;
    }
  }
  .display-flex {
    display: flex;
  }
  .model-container {
    height: auto;
    .el-dialog__header {
      .el-dialog__title {
        font-size: 16px;
        color: #333333;
      }
    }
  }

  .change-receive-address #address-radio-label .el-radio__label {
    display: none !important;
  }
}
</style>
<style scoped lang="scss">
.salesModuleList {
  /*默认联系人*/
  .change-receive-address .default-contact-btn {
    line-height: 20px;
    font-size: 12px;
    border-radius: 1px;
    background: #ff9b44;
    color: #fff;
    display: inline-block;
    margin-left: 34px;
    text-align: center;
    padding: 0 2px 0 3px;
  }
  /*新增收货地址*/
  .add-address {
    margin: 20px;
  }
  /*更多操作*/
  .show-more-btn {
    text-align: right;
    display: inline-block;
    padding-right: 20px;
  }
}
</style>
<style lang="scss" scoped>
.table-wrapper {
  height: calc(100% - 72px);
}
</style>
