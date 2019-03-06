<!-- 销售列表 -->
<template>
	<div class="salesModuleList" @click="removeClickEffect('sale-order-table-list')">
		<div class="table-container">
			<div class="top-scroll-section">
				<!-- 筛选 -->
				<div class="top-search-wrapper">
					<div class="filterControl">
						<div class="filterDate">
							<div style="display: flex;">
								<SearchDate @onHandleDate="handleDate" :time="timeLen" :clearable="false" ref="searchDate" showPlaceholder="输入关键字查询" :defaultDate="defaultDate"></SearchDate>
								<div class="ml20">
									<span>渠道：</span>
									<el-select v-model="param.channelType" placeholder="请选择" @change="channelChange" size="medium" style="height: 34px;" popper-class="select-menu-specail">
										<el-option v-for="item in channelTypeOptions" :key="item.channelId" :label="item.channelName" :value="item.channelId">
										</el-option>
									</el-select>
								</div>
							</div>
						</div>
						<div class="filterSearch">
							<search showPlaceholder="输入编号/客户或物流信息查询" @searchValue="getSearchValue" :showResetButton="showResetButton" @reset="getReset" :isShowSearchResult="isShowSearchResult" :count="totalCount" ref="search"></search>
						</div>
					</div>
				</div>
				<div class="search_result_container" v-show="searchItemValueArray.length>0">
					<search-result :searchItemValueArray="searchItemValueArray" :count="totalCount" @deleteItem="getDeleteItem"></search-result>
				</div>
				<el-row class="pb20 funcBtnReset" v-if="level1 === '1' && level2 !== '2' && level2 !== '4' && level2 !== '5' && level2 !== '0'">
					<span class="totalNum">已选择{{ selectOrderLength }}条：</span>
					<el-button plain size="small" @click="batchOutbound" class="btnBlurReset">批量出库</el-button>
				</el-row>
				<el-row class="pb20 funcBtnReset" v-else-if="level1 === '2' || level1 === '3'">
					<span class="totalNum">已选择{{ selectOrderLength }}条：</span>
					<el-button plain size="small" @click="exportOrders" class="btnBlurReset">导出</el-button>
					<el-button plain size="small" @click="batchModifyOrderStatus(0)" class="btnBlurReset" v-if="level2 !== '5' && level2 !== '0'">取消订单</el-button>
					<el-button plain size="small" @click="batchModifyOrderStatus(5)" class="btnBlurReset" v-if="level2 !== '5' && level2 !== '0'">完成订单</el-button>
				</el-row>
				<div class="table-list-special-common-style" id="sale-order-table-list">
					<el-table :data="salesList" border @select="handleSelect" @row-click="setCurOperationRow" default-expand-all ref="multipleTable" @select-all="handleSelectAll" :cell-class-name="cellStyle">
						<el-table-column type="expand" width="0">
							<template slot-scope="scope">
								<div class="remark-box remarkShow">
									<span @click="funEditRemark(scope.$index,scope.row)" class="salesEditRemark">备注：{{scope.row.remark?scope.row.remark:'无'}}
										<i class="iconfont1 icon-bianji other_hook"></i>
									</span>
								</div>
							</template>
						</el-table-column>
						<el-table-column type="selection" width="35" :selectable="selectable"></el-table-column>
						<el-table-column label="编号" prop="orderId" min-width="300">
							<template slot-scope="scope">
								<div class="row-title-container">
									<div class="row-title-order">
										<div class="order-number change-order-number">
											<div @click="$router.push({name: 'CheckSalesOrder', params: {orderTag: level1, saleOrderId: scope.row.orderId}})">订单编号：
												<span>{{scope.row.orderId}}</span>
											</div>
										</div>
										<div class=" order-number">
											<div :title="scope.row.orderId"> 外部订单编号：{{scope.row.oriOrderNo?scope.row.oriOrderNo:'无'}}
											</div>
										</div>
									</div>
									<div class="operate-container">
										<div>
											<a class="plr5 clblue" @click="outboundFunc(scope.row, scope.$index)" v-if="(((level1 === '1') && (scope.row.orderStatus === 1 || scope.row.orderStatus === 2 || scope.row.orderStatus === 3)) || ((level1 === '4') && (scope.row.orderStatus === 2 || scope.row.orderStatus === 3))) && (scope.row.saleCount > scope.row.sendCount)">
												出库
											</a>
											<a class="plr5 clblue" @click="confirmRefuse(scope.row)" v-if="((level1 === '4') && (scope.row.errorType === 1))">
												确认拒收
											</a>
											<a class="plr5 clblue" @click="againOutStore(scope.row, scope.$index)" v-if="((level1 === '4') && (scope.row.errorType === 5))">
												重传
											</a>
											<a class="plr5 clblue" @click="errEditADD(scope.row, scope.$index)" v-if="((level1 === '4') && (scope.row.errorType === 6))">
												编辑地址
											</a>
											<span v-if="(level1 !=='4' && (scope.row.orderStatus===5 || scope.row.orderStatus===3 )) || (level1 ==='4' && (scope.row.orderStatus === 5 || scope.row.orderStatus === 3 ) && (scope.row.errorType === 2 || scope.row.errorType === 3 ))">
												<a class="plr5 clblue" v-if="scope.row.sendCount> (scope.row.returnCount + scope.row.rejectCount)" @click="$router.push({name: 'CreateReturnOrder', params: {orderId: scope.row.orderId}})">退货</a>
												<a class="plr5 clblue" v-if="(scope.row.sendCount > (scope.row.returnCount + scope.row.rejectCount))" @click="$router.push({name: 'CreateChangeOrder', params: {orderIdChange: scope.row.orderId}})">换货</a>
											</span>
										</div>
										<div class="operate-container_div">
											<more-operat v-if="scope.row.orderStatus === 1 && level1 === '1'" :buttonList="[{ type: 'edit', text: '编辑' }, { type: 'cancel', text: '取消订单' }]" style="margin-top:2px;" @onClick="onClickOperateButton" @hide="getHide(scope.$index,'sale-order-table-list')" :isEnd="scope.$index===salesList.length-1" @show="setTableTrBg(scope.$index,'sale-order-table-list')" :row="scope.row"></more-operat>
											<more-operat v-else-if="scope.row.orderStatus === 1 && (level1 === '2' || level1 === '3')" :buttonList="[{ type: 'edit', text: '编辑' }, { type: 'cancel', text: '取消订单' }, { type: 'complete', text: '完成订单' }]" style="margin-top:2px;" @onClick="onClickOperateButton" @hide="getHide(scope.$index,'sale-order-table-list')" :isEnd="scope.$index===salesList.length-1" @show="setTableTrBg(scope.$index,'sale-order-table-list')" :row="scope.row"></more-operat>
											<span v-else style="display: inline-block;width:26px;height:1px;"></span>
										</div>
									</div>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="状态" min-width="100" show-overflow-tooltip>
							<template slot-scope="scope">
								<div class="row-show" v-if="level1 === '4'">
									<span :class="returnClass(scope.row.errorType)"></span>
									<span>{{errorText[scope.row.errorType]}}</span>
								</div>
								<div class="row-show" v-else>
									<span :class="returnClass(scope.row.errorType)"></span>
									<span>{{statusText[scope.row.orderStatus]}}</span>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="渠道" prop="channelName" show-overflow-tooltip min-width="100">
							<template slot-scope="scope">
								<span>
									{{ scope.row.channelName ? scope.row.channelName : '其他' }}
								</span>
							</template>
						</el-table-column>
						<el-table-column label="销售数量" prop="saleCount" show-overflow-tooltip :key="Math.random()" v-if="level1 === '1'" min-width="60"></el-table-column>
						<el-table-column label="订单金额(元)" prop="saleTotal" show-overflow-tooltip min-width="60"></el-table-column>
						<el-table-column label="客户" show-overflow-tooltip>
							<template slot-scope="scope">
								<div class="buyer-information">
									<div>
										<p>{{scope.row.custLinkMan}}</p>
									</div>
									<p v-if="scope.row.custLinkTel">{{`${scope.row.custLinkTel.substr(0, 3)} ${scope.row.custLinkTel.substr(3, 4)} ${scope.row.custLinkTel.substr(7, 4)}`}}</p>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="出库数量" prop="sendCount" show-overflow-tooltip :key="Math.random()" v-if="level1 === '1'"></el-table-column>
						<el-table-column label="物流信息" min-width="80">
							<template slot-scope="scope">
								{{scope.row.extLisDeliverNo?scope.row.extLisDeliverNo:'无'}}
							</template>
						</el-table-column>
						<el-table-column label="下单时间" show-overflow-tooltip min-width="80">
							<template slot-scope="scope">
								<div class="row-show">{{ scope.row.createTime | dateFormat('yyyy-MM-dd HH:mm:ss') }}</div>
							</template>
						</el-table-column>
						<div slot="empty" class="table_slot_empty_text">
							<div><img src="../../../layouts/images/nodata.png" /></div>
							<div>暂无数据</div>
						</div>
					</el-table>
				</div>
			</div>
			<div class="pagination-section" v-if="salesList.length">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="param.pageNo" background :page-size="param.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
				</el-pagination>
			</div>
		</div>
		<!-- 弹框 -->
		<div class="model-container">
			<!-- 出库操作 -->
			<el-dialog title="出库操作" :visible.sync="outboundVisible" width="1060px" @close="closeOutboundVisible" class="batchOutbound">
				<div>
					<span style="font-size:14px;color: #666666; width:80px;">发货仓库：</span>
					<el-select v-model="selectedWarehouse" placeholder="请选择发货仓库" style="width:200px;" @change="updataSelectedWarehouse">
						<el-option v-for="(item, k) in warehouseOptions" :key="k" :label="item.storehouseName" :value="item.storehouseId">
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
						<el-option v-for="(item, k) in saleCategoryOptions" :key="k" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<el-row class="mt20 smallTable">
					<el-table :data="outboundGoodsList" :height="outboundGoodsList.length ? '' : '38'" max-height="170" style="border-left: 1px solid #ebeef5;border-right: 1px solid #ebeef5;">
						<el-table-column prop="skuName" label="商品名称" show-overflow-tooltip></el-table-column>
						<el-table-column width="78">
							<template slot-scope="scope">
								<div v-show="selectedWarehouse && ((scope.row.saleCount - scope.row.sendCount) > scope.row.unableCount) " class="inventory">库存不足</div>
							</template>
						</el-table-column>
						<el-table-column prop="skuId" label="商品编码" show-overflow-tooltip></el-table-column>
						<el-table-column prop="unitName" label="单位" show-overflow-tooltip></el-table-column>
						<el-table-column prop="saleCount" label="销售数量" show-overflow-tooltip></el-table-column>
						<el-table-column prop="sendCount" label="已出库" show-overflow-tooltip></el-table-column>
						<el-table-column label="本次出库" width="120">
							<template slot-scope="scope">
								<el-input v-model="scope.row.outCount" type="number" size="small" style="width: 100px;" @keyup.native="setOutboundCount(scope.row, scope.$index)"></el-input>
							</template>
						</el-table-column>
					</el-table>
				</el-row>
				<div class="addressInformation" style="padding: 0 20px 20px 20px;">
					<div class="addressInformation_title" style="padding: 10px 0">
						收货信息
					</div>
					<el-button plain size="small" @click="addReceiverAddress = true" v-if="!(curOperationRow.custAddressId === -1 || curOperationRow.channelId === '-1')">
						<i class="el-icon-plus"></i>新增地址
					</el-button>
					<el-row class="mt10">
						<div v-if="!(curOperationRow.custAddressId === -1 || curOperationRow.channelId === '-1')">
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
				<span slot="footer" class="dialog-footer" style="padding-right: 10px;">
					<el-button type="primary" @click="saveStoreout">确 定</el-button>
				</span>
			</el-dialog>
			<!-- 批量出库 -->
			<el-dialog title="批量出库" :visible.sync="batchOutboundVisible" width="660px" class="batchOutbound" @close="closeBatchOutbound">
				<div>
					<span class="batchOutbound_label">发货仓库：</span>
					<el-select v-model="curBatchOutbound" placeholder="请选择" style="width:525px;" @change="selectBatchOutbound">
						<el-option v-for="(item, k) in warehouseOptions" :key="k" :label="item.storehouseName" :value="item.storehouseId">
						</el-option>
					</el-select>
					<div class="mt20" v-if="curBatchOutboundWarehouse.storehouseType === 2">
						<span class="batchOutbound_label">运输方式：</span>
						<el-select v-model="outboundParams.deliveryType" placeholder="请选择" style="width:130px;">
							<el-option v-for="(item, index) in deliveryTypeOptions" :key="index" :label="item.label" :value="item.value" size='small'>
							</el-option>
						</el-select>
						<el-input v-model="outboundParams.expressCompany" placeholder="请输入承运商" style="width:286px;" class="ml10"></el-input>
						<el-checkbox class="ml10" v-model="outboundParams.isUrgent" size="medium" border :true-label="'X'" :false-label="''" style="border: none;padding-left: 0;">加急标识
						</el-checkbox>
					</div>
					<div class="mt20" v-if="curBatchOutboundWarehouse.storehouseType === 2">
						<span class="batchOutbound_label">销售类别：</span>
						<el-select v-model="outboundParams.saleCategory" placeholder="请选择" style="width:130px;">
							<el-option v-for="(item, k) in saleCategoryOptions" :key="k" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<span slot="footer" class="dialog-footer" style="padding-right: 10px;">
					<el-button type="primary" @click="submitBatchOutbound">确 定</el-button>
				</span>
			</el-dialog>
			<!-- 新增地址 -->
			<el-dialog :title="((curOperationRow.custAddressId == -1 || curOperationRow.channelId === '-1' ) ? '编辑地址' : '新增地址')" :visible.sync="addReceiverAddress" width="660px" top="25vh" @close="closeAddReceiverAddress">
				<ReceivingInformation @submit="submitCreateAddress" ref="ReceivingInformation" class="clearfix" :buttonName="'确认'"></ReceivingInformation>
			</el-dialog>
		</div>
		<edit-remark v-if="dialogVisible" :dialogVisible="dialogVisible" class="editRemark" v-on:onCancel="hideDialog" v-on:onEdit="submitUpdateRemark($event)" :remarkDetail="remarkRow?remarkRow.remark:''" :returnId="remarkRow?remarkRow.orderId:''"></edit-remark>
	</div>
</template>
<script>
import EditRemark from "~/components/common/EditRemark";
import Search from "~/components/common/Search";
import MoreOperat from '~/components/common/MoreOperating';
import { mapActions } from "vuex";
import QuitMixins from "~/mixins/quit";
import PlatformMixins from "~/mixins/platform";
import filters from "~/mixins/filters";
import utils from "~/utils/commonMethod";
import SearchDate from "~/components/common/SearchDate";
import ReceivingInformation from "~/components/common/ReceivingInformation.vue"; // 收货信息
import SearchResult from "~/components/common/SearchResult.vue";
import moreOperateMixin from '~/mixins/moreOperate';
import messages from '~/mixins/messages';

export default {
	name: "salesList",
	data() {
		return {
			// 本次出库操作数组
			curOutboundGoodsArr: [],
			// 出库商品列表
			outboundGoodsList: [],
			// 出库弹框
			outboundVisible: false,
			// 当前操作row信息
			curOperationRow: {},
			// 渠道
			channelTypeOptions: [],
			// 仓库地址
			warehouseOptions: [],
			// 选中仓库
			selectedWarehouse: "",
			// 表单选中数组
			selectOrderArr: [],
			// 列表请求参数
			param: {
				pageSize: 10,
				pageNo: 1,
				orderStatus: null,
				searchContent: "",
				channelType: "",
				orderType: "11,12,13",
				errorType: 0,
				invType: 1
			},
			statusText: {
				0: "已取消",
				1: "未发货",
				2: "待出库",
				3: "部分发货",
				4: "已发货",
				5: "已完成"
			},
			errorText: {
				0: "无异常",
				1: "已拒收",
				2: "超时未出库",
				3: "超时未送达",
				4: "收货信息变更",
				5: "出库异常",
				6: "地址信息异常",
			},
			// 批量出库
			batchOutboundVisible: false,
			// 搜索重置按钮
			showResetButton: false,
			isSearch: false,
			isShowSearchResult: false,
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() < Date.now() - 8.64e7;
				}
			},
			// 订单列表
			salesList: [],
			// 查询数量总数
			totalCount: 0,
			// 当前菜单1级
			level1: "1",
			// 当前菜单2级
			level2: "",
			// 更改收货地址
			// 根据orderId获取的地址列表
			updateReceiverAddressArr: [],
			// 当地前收货地址index
			curReceivingAdd: "",
			// 新增收货地址弹框
			addReceiverAddress: false,
			// 新增地址参数
			createAddressParams: {
				linkMan: "",
				phone: "",
				cascade: [],
				address: "",
				isDefault: "0"
			},
			// 批量出库选中仓
			curBatchOutbound: "",
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
			// 第一个选中的订单
			firstSelectedOrder: null,
			timeLen: null,
			// 搜索条件集合
			searchItemValueArray: [],
			dialogVisible: false,
			// 编辑备注
			remarkData: null,
			remarkIndex: null,
			remarkRow: null,
			curWarehouse: {},
			// 批量出库渠道id
			batchOutboundChannelId: '',
			// 批量出库当前仓库
			curBatchOutboundWarehouse: {},
			defaultDate: [null, null],
		};
	},
	mixins: [QuitMixins, PlatformMixins, filters, moreOperateMixin, messages],
	components: {
		Search,
		SearchDate,
		EditRemark,
		ReceivingInformation,
		SearchResult,
		MoreOperat
	},
	mounted() {
		this.refreshPage(this.param);
		this.getChannelAll();
	},
	methods: {
		...mapActions([
			"showPageLoading",
			"hidePageLoading",
			"queryChannelBySearch",
			"queryStoreList",
			"querySalesOrderList",
			"updateOrderMemark",
			"exportSalesOrder",
			"querySalesOutStoreList",
			"queryAddressByChannelIdAction",
			"saveOutStore",
			"createChannelAddressAction",
			"editOrderStatus",
			"editBatchOrderStatusAction",
			"saveSalesStoreOutBatch",
			"getstatusChannel",
			"outStockAgain",
			"updateOrderAddress",
			"updataSalesErrorefuse"
		]),
		// 首页跳转设置初始时间
		setDefaultDate() {
			if (this.timeLen !== '') {
				const time = {
					24: [utils.getTime('oneDaysAgo'), utils.getTime('oneDaysAgo')],
					48: [utils.getTime('TwoDaysAgo'), utils.getTime('TwoDaysAgo')],
					72: [utils.getTime('year'), utils.getTime('ThreeDaysAgo')]
				}[this.timeLen]
				this.defaultDate = time;
			}
		},
		// 清除地址编辑信息
		closeAddReceiverAddress() {
			this.$refs.ReceivingInformation.resetForm('ReceivingInformationParams')
		},
		// 选择批量出库仓库
		selectBatchOutbound(val) {
			this.curBatchOutboundWarehouse = this.warehouseOptions.find(i => i.storehouseId === val)
		},
		// 关闭批量出库清除
		closeBatchOutbound() {
			this.batchOutboundChannelId = ''
			this.warehouseOptions = []
			this.curBatchOutbound = ''
			this.selectOrderArr = []
			this.$refs.multipleTable.clearSelection();
			this.firstSelectedOrder = null
			this.outboundParams = {
				expressCompany: "",
				deliveryType: '20',
				isUrgent: '',
				saleCategory: 'A'
			}
			this.curBatchOutboundWarehouse = {}
		},
		// 确认拒收
		confirmRefuse(row) {
			this.updataSalesErrorefuse({ orderId: row.orderId }).then(res => {
				this.refreshPage(this.param)
				this.showSuccess()
			})
		},
		// 异常订单编辑地址
		errEditADD(row) {
			row.ifEdit = true
			this.addReceiverAddress = true
			const obj = Object.assign({}, {
				orderId: row.orderId,
				linkMan: row.custLinkMan,
				phone: row.custLinkTel,
				address: row.custAddress,
				region: [row.provinceCode, row.cityCode, row.areaCode],
				regionName: [],
				ifEdit: true
			})
			if (!/^\d{0,11}$/.test(row.custLinkTel)) {
				obj.phone = ''
			}
			if (row.provinceCode === null || row.cityCode === null || row.areaCode === null) {
				obj.region = []
			}
			let i = 0
			const time = setInterval(() => {
				if (this.$refs.ReceivingInformation && this.$refs.ReceivingInformation.datas.length) {
					this.$refs.ReceivingInformation.ReceivingInformationParams = obj
					this.$refs.ReceivingInformation.clearForm('ReceivingInformationParams')
					setTimeout(() => {
						this.$refs.ReceivingInformation.submit()
					}, 0)
					clearInterval(time)
				}
				if (i === 6) {
					clearInterval(time)
				}
				++i
			}, 500)
		},
		// 重新出库
		againOutStore(row) {
			// number orderType (订单类型 1-销售订单 2-退货订单 3-换货订单)
			// number type (类型 1:销售出库，2:退货出库, 3:后台出库,4-换货出库)
			// number bizType (类型 1-普通；2-代售；3.代发；4-代发出库)
			this.showPageLoading();
			const bizType = { 11: 1, 12: 2, 13: 4 }[row.orderType];
			const datas = {
				relatedSheetId: row.orderId,
				bizType,
				type: 1,
				orderType: 1,
			};
			this.outStockAgain(datas).then((res) => {
				this.hidePageLoading();
				this.queryListFunction(this.param);
				this.$message({
					type: 'success',
					message: res.msg
				});
			}).catch(err => this.hidePageLoading());
		},
		cellStyle({ row, column, rowIndex, columnIndex }) {
			if (columnIndex === 2) {
				return 'col-first';
			}
		},
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
		// 点击更多触发相应操作
		onClickOperateButton(type, row) {
			if (type === 'cancel') {
				this.modifyOrderStatus(row, 0)
			} else if (type === 'edit') {
				this.$router.push({ name: 'UpdateSalesOrder', params: { orderId: row.orderId } })
			} else if (type === 'complete') {
				this.modifyOrderStatus(row, 5)
			}
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
		/* 表格条件筛选 */
		// 时间改变
		// 按照时间来搜索
		handleDate(val, timeIndex) {
			this.param = Object.assign({}, this.param, val)
			this.refreshPage(this.param)
			if (!this.param.startDate) {
				return;
			}
			const index = utils.matchStrOfArr(this.searchItemValueArray, "时间：");
			setTimeout(() => {
				switch (timeIndex) {
					case 0:
						index === -1
							? this.searchItemValueArray.push("时间：今天")
							: this.$set(this.searchItemValueArray, index, `时间：今天`);
						break;
					case 1:
						index === -1
							? this.searchItemValueArray.push("时间：昨天")
							: this.$set(this.searchItemValueArray, index, `时间：昨天`);
						break;
					case 2:
						index === -1
							? this.searchItemValueArray.push("时间：本周")
							: this.$set(this.searchItemValueArray, index, `时间：本周`);
						break;
					case undefined:
						index === -1
							? this.searchItemValueArray.push(
								`时间：${val.startDate}~${val.endDate}`
							)
							: this.$set(
								this.searchItemValueArray,
								index,
								`时间：${val.startDate}~${val.endDate}`
							);
						break;
				}
			}, 0)
		},
		hideDialog(data) {
			this.dialogVisible = data;
		},
		funEditRemark(_index, _one) {
			this.dialogVisible = true;
			this.remarkIndex = _index;
			this.remarkRow = _one;
		},
		// 删除搜索条件
		getDeleteItem(index) {
			const str = this.searchItemValueArray[index].split("：")[0];
			switch (str) {
				case "时间":
					this.param.startDate = null;
					this.param.endDate = null;
					this.$refs.searchDate.curDate = null;
					break;
				case "渠道":
					this.param.channelType = null;
					break;
				default:
					this.param.searchContent = "";
					this.$refs.search.searchForm.searchValue = "";
					break;
			}
			setTimeout(() => {
				this.searchItemValueArray.splice(index, 1);
			}, 0);
			this.refreshPage(this.param);
		},
		// 搜索
		getSearchValue(searchValue) {
			this.param.pageSize = 10;
			this.param.pageNo = 1;
			if (this.param.searchContent === "") {
				this.searchItemValueArray.push(searchValue);
			} else {
				this.$set(
					this.searchItemValueArray,
					this.searchItemValueArray.findIndex(
						i => i === this.param.searchContent
					),
					searchValue
				);
			}
			this.param.searchContent = searchValue;
			this.isSearch = true;
			this.refreshPage(this.param);
		},
		// 渠道筛选
		channelChange(val) {
			const obj = this.channelTypeOptions.find(i => i.channelId === val);
			const channelName = `渠道：${obj.channelName}`;
			if (utils.matchStrOfArr(this.searchItemValueArray, "渠道：") === -1) {
				this.searchItemValueArray.push(channelName);
			} else {
				this.$set(
					this.searchItemValueArray,
					utils.matchStrOfArr(this.searchItemValueArray, "渠道："),
					channelName
				);
			}
			this.refreshPage(this.param);
		},
		// 批量出库
		batchOutbound() {
			if (!this.selectOrderArr.length) {
				this.$message({
					message: "请先选择需要批量出库的单据！",
					type: "warning"
				});
			} else {
				if (
					this.selectOrderArr.some(
						x => x.orderStatus === 1 || x.orderStatus === 3
					)
				) {
					this.batchOutboundVisible = true;
					if (this.batchOutboundChannelId) {
						this.getStoreList({ bizType: 4, channelId: this.batchOutboundChannelId });
					} else {
						this.getStoreList({ bizType: 1 });
					}
				}
			}
		},
		/* 查询 */
		// 查询所有渠道
		getChannelAll() {
			this.queryChannelBySearch({ searchContent: '' }).then(res => {
				if (res.result.length) {
					res.result.push({ channelName: '其他', channelId: '-1' })
					this.channelTypeOptions = res.result;
				}
			});
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
		// 查询订单列表
		queryListFunction(param) {
			this.querySalesOrderList(param).then(resp => {
				this.hidePageLoading();
				this.salesList = resp.result.map((i, k) => {
					i.$index = k
					i.saleTotal = i.saleTotal / 100;
					return i;
				});
				this.totalCount = resp.totalCount;
				if (this.isSearch) {
					this.showResetButton = true;
					this.isShowSearchResult = false;
				}
				this.selectOrderArr = []
				this.$emit("loaded");
			}).catch(err => {
				this.salesList = [];
				this.totalCount = 0;
			});
		},
		// 表格选中
		handleSelect(selectedArr, row) {
			if (this.flag.split('-')[0] === '1') {
				// 选中+1
				if (selectedArr.length - this.selectOrderArr.length === 1) {
					// 如果没有第一个选中项
					if (!this.firstSelectedOrder) {
						this.firstSelectedOrder = Object.assign({}, selectedArr[0]);
						this.selectOrderArr = selectedArr.concat();
					}
					// 如果有第一个选中项
					// 普通和代售
					if (this.firstSelectedOrder.orderType === 11 || this.firstSelectedOrder.orderType === 12) {
						if (selectedArr.some(i => i.orderType === 13)) {
							this.$refs.multipleTable.toggleRowSelection(row)
							this.$message({
								type: 'warning',
								message: '不支持普通、代售订单与代发订单批量出库'
							});
						} else {
							this.selectOrderArr = selectedArr.concat();
						}
						// 代发和渠道id
					} else if (this.firstSelectedOrder.orderType === 13) {
						if (selectedArr.findIndex(i => i.orderType === 11 || i.orderType === 12) > -1) {
							this.$refs.multipleTable.toggleRowSelection(row)
							this.$message({
								type: 'warning',
								message: '不支持代发订单与普通、代售订单批量出库'
							});
						} else if (selectedArr.some(i => i.channelId !== this.firstSelectedOrder.channelId)) {
							this.$refs.multipleTable.toggleRowSelection(row)
							this.$message({
								type: 'warning',
								message: '不支持代发订单与渠道不同的代发订单批量出库'
							});
						} else {
							this.batchOutboundChannelId = this.firstSelectedOrder.channelId
							this.selectOrderArr = selectedArr.concat();
						}
					}
				} else {
					if (selectedArr.length === 0) {
						this.firstSelectedOrder = null;
					}
					this.selectOrderArr = selectedArr.concat();
				}
			} else {
				this.selectOrderArr = selectedArr;
			}
		},
		// 表格选中全部
		handleSelectAll(selectedArr) {
			if (this.flag.split('-')[0] === '1') {
				// 如果没有第一个选中项
				if (!this.firstSelectedOrder) {
					this.firstSelectedOrder = Object.assign({}, selectedArr[0]);
				}
				// 普通和代售
				if (this.firstSelectedOrder.orderType === 11 || this.firstSelectedOrder.orderType === 12) {
					if (selectedArr.some(i => i.orderType === 13)) {
						this.$refs.multipleTable.clearSelection()
						this.$message({
							type: 'warning',
							message: '不支持普通、代售订单与代发订单批量出库'
						});
					} else {
						this.selectOrderArr = selectedArr;
					}
					// 代发和渠道id
				} else if (this.firstSelectedOrder.orderType === 13) {
					if (selectedArr.some(i => i.orderType === 11 || i.orderType === 12)) {
						this.$refs.multipleTable.clearSelection();
						this.$message({
							type: 'warning',
							message: '不支持代发订单与普通、代售订单批量出库'
						});
					} else if (selectedArr.some(i => i.channelId !== this.firstSelectedOrder.channelId)) {
						this.$refs.multipleTable.clearSelection()
						this.$message({
							type: 'warning',
							message: '不支持代发订单与渠道不同的代发订单批量出库'
						});
					} else {
						this.batchOutboundChannelId = this.firstSelectedOrder.channelId
						this.selectOrderArr = selectedArr;
					}
				} else {
					this.selectOrderArr = selectedArr;
				}
			} else {
				this.selectOrderArr = selectedArr;
			}
		},
		// 改变pageSize
		handleSizeChange(nSize) {
			this.param.pageSize = nSize;
			this.refreshPage(this.param);
		},
		// 改变pageNo
		handleCurrentChange(nPage) {
			this.param.pageNo = nPage;
			this.refreshPage(this.param);
		},
		// 刷新页面
		refreshPage(nval) {
			this.showPageLoading();
			this.queryListFunction(nval);
		},
		// 重置
		getReset() {
			this.showResetButton = false;
			this.isShowSearchResult = false;
			this.param.searchContent = "";
			this.isSearch = false;
			this.refreshPage(this.param);
		},
		// 返回圆点class
		returnClass(status) {
			if (status === 0 || status === 6 || status === 5) {
				return " circle circle-8E939A";
			} else if (status === 1 || status === 2) {
				return " circle circle-FF6369";
			} else if (status === 3) {
				return " circle circle-FFA416";
			} else if (status === 4) {
				return " circle circle-66C23A";
			}
		},
		// 跳转订单详情
		handleCurrentItem(id) {
			this.$router.push(`/sales/check/salesOrder/${id}`);
		},
		// 设置当前编辑row, 弹出编辑框
		setCurOperationRow(row, event, column) {
			this.$set(this.$data, 'curOperationRow', Object.assign({}, row))
		},
		// 提交更新备注
		submitUpdateRemark(data) {
			this.updateOrderMemark({ orderId: data[1], remark: data[0] }).then(
				res => {
					if (res === 1) {
						this.$message({
							type: "success",
							message: `修改备注成功`
						});
						this.remarkRow.remark = data[0];
					} else {
						this.$message({
							type: "error",
							message: `修改备注失败`
						});
					}
					this.dialogVisible = false;
				}
			);
		},
		// 导出订单
		exportOrders() {
			if (!this.selectOrderArr.length) {
				this.showWarning(`请选择导出订单`)
				return false
			}
			const arr = this.selectOrderArr.map(i => i.orderId);
			this.exportSalesOrder({ orderIdList: arr, dataType: 'file' }).then(res => {
				const _fileType = "application/vnd.ms-excel";
				const blob = new Blob([res])
				const a = document.createElement('a');
				a.download = '导出订单.xls';
				a.href = window.URL.createObjectURL(blob)
				a.id = 'downloadExportExcel'
				document.getElementsByTagName('body')[0].appendChild(a)
				a.click()
				document.getElementsByTagName('body')[0].removeChild(document.getElementById('downloadExportExcel'))
			})
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
				orderId: this.curOperationRow.orderId,
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
						// usableCount 要出库数量， saleCount销售数量， sendCount已出库数量，unableCount可用库存数
						i.usableCount = (i.saleCount - i.sendCount) < 0 ? 0 : (i.saleCount - i.sendCount)
						if (i.usableCount > i.unableCount) {
							i.usableCount = i.unableCount;
						}
						i.defalutCount = i.outCount
					});
					this.outboundGoodsList = res.list;
				}
			});
		},
		// 出库初始化
		outboundFunc(row, index) {
			const bizType = { 11: 1, 12: 2, 13: 4 }[row.orderType];
			this.outboundVisible = true
			this.getStoreList({ bizType, channelId: row.channelId }, true)
			if (!(row.custAddressId === -1 || row.channelId === '-1')) {
				this.queryAddressByChannelIdAction({
					channelId: row.channelId
				}).then(res => {
					if (res && res.result) {
						this.updateReceiverAddressArr = res.result;
						this.curReceivingAdd = row.custAddressId
					}
				});
			} else {
				this.updateReceiverAddressArr = [
					{
						linkMan: row.custLinkMan,
						province: row.province,
						city: row.city,
						area: row.area,
						address: row.custAddress,
						phone: row.custLinkTel,
						custAddressId: row.custAddressId,
						provinceCode: row.provinceCode,
						cityCode: row.cityCode,
						areaCode: row.areaCode,
						channelAddressId: -1
					}
				];
				this.curReceivingAdd = -1
			}
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
			const bizType = { 11: 1, 12: 2, 13: 4 }[this.curOperationRow.orderType];
			const curwarehouse = this.warehouseOptions.find(
				i => i.storehouseId === this.selectedWarehouse
			);
			if (typeof this.curReceivingAdd !== 'number') {
				this.$message({
					type: "warning",
					message: `请选择收货地址`
				});
				return false
			}
			const curAddress = this.updateReceiverAddressArr.find(
				i => i.channelAddressId === this.curReceivingAdd
			);
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
				{ relatedSheetId: this.curOperationRow.orderId },
				{ remark: this.curOperationRow.remark },
				{ channelId: this.curOperationRow.channelId },
				{ stockId: curwarehouse.storehouseId },
				{ stockType: curwarehouse.storehouseType },
				{ bizType: bizType },
				{ type: 1 },
				curAddress,
				this.curWarehouse.storehouseType === 2 ? this.outboundParams : {}
			);
			params.sendSkuList = this.outboundGoodsList.map(i => ({
				skuId: i.skuId,
				outCount: !i.outCount ? 0 : i.outCount,
				saleCount: i.saleCount,
				relatedSheetSeqNo: i.serialNo,
				skuPrice: i.price,
				productId: i.productId
			}));
			this.showPageLoading()
			this.saveOutStore(params).then(res => {
				if (res === -1) {
					this.$message({
						type: "error",
						message: `中移物流请求超时，请到异常订单中重试`
					});
				} else {
					this.$message({
						type: "success",
						message: `出库成功`
					});
				}
				this.hidePageLoading();
				this.outboundVisible = false;
				this.refreshPage(this.param);
			}).catch(err => {
				this.hidePageLoading()
				this.$message({
					type: "error",
					message: err.msg
				})
			})
		},
		// 保存地址
		submitCreateAddress(params) {
			if (params.ifEdit) {
				const obj = {
					orderId: params.orderId,
					custLinkTel: params.phone,
					custLinkMan: params.linkMan,
					custAddress: params.address,
					custAddressId: -1,
					provinceCode: params.region[0],
					cityCode: params.region[1],
					areaCode: params.region[2],
					province: params.regionName[0],
					city: params.regionName[1],
					area: params.regionName[2],
					errorType: this.curOperationRow.errorType
				}
				this.updateOrderAddress(obj).then(res => {
					this.refreshPage(this.param)
					this.showSuccess()
					this.addReceiverAddress = false
					this.$refs.ReceivingInformation.resetForm("ReceivingInformationParams")
				}).catch(() => {
					this.showError(res.msg)
				});
				return false
			}
			if (this.curOperationRow.custAddressId === -1 || this.curOperationRow.channelId === '-1') {
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
					channelAddressId: -1
				}]
				this.addReceiverAddress = false;
				this.$refs.ReceivingInformation.resetForm("ReceivingInformationParams")
			} else {
				const msg = Object.assign(
					{},
					{
						channelId: this.curOperationRow.channelId,
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
							channelId: this.curOperationRow.channelId
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
						})
					}
				})
			}
		},
		// 修改订单状态
		modifyOrderStatus(item, statu) {
			let confirmType = `warning`;
			let confirmText;
			if (statu === 0) {
				confirmText = `取消`;
			} else if (statu === 5) {
				confirmText = `完成`;
			}
			this.$confirm(`确认${confirmText}选中的订单？`, `${confirmText}订单`, {
				confirmButtonText: "确定",
				type: confirmType
			}).then(() => {
				this.editOrderStatus({
					orderId: item.orderId,
					orderStatus: statu
				}).then(res => {
					if (res === 1) {
						this.refreshPage(this.param);
						this.$message({
							type: "success",
							message: `${confirmText}订单成功`
						});
					}
				});
			})
		},
		// 批量修改订单状态
		batchModifyOrderStatus(statu) {
			if (!this.selectOrderArr.length) {
				this.$message({
					type: "warning",
					message: `未选中订单`
				})
			} else {
				let confirmType = `warning`
				let confirmText;
				if (statu === 0) {
					confirmText = `取消`
				} else if (statu === 5) {
					confirmText = `完成`
				}
				if (this.selectOrderArr.some(i => i.orderStatus !== 1)) {
					this.$message({
						type: 'warning',
						message: `只能批量修改未发货订单的状态`
					})
					return false
				}
				const param = { orderStatus: statu }
				this.$confirm(`确认${confirmText}选中的订单？`, `${confirmText}订单`, {
					confirmButtonText: "确定",
					type: confirmType
				}).then(() => {
					param.orderIdList = this.selectOrderArr.map(i => i.orderId);
					this.editBatchOrderStatusAction(param).then(res => {
						this.refreshPage(this.param);
						this.selectOrderArr = []
						this.$message({
							type: "success",
							message: `${confirmText}订单成功`
						});
					});
				});
			}
		},
		// 批量出库提交
		submitBatchOutbound() {
			if (!this.curBatchOutbound) {
				this.$message({
					type: 'warning',
					message: '请选择发货仓库'
				})
				return false
			}
			const obj = {}
			obj.storehouseId = this.curBatchOutbound
			obj.orderIdList = this.selectOrderArr.map(i => i.orderId)
			if (this.curBatchOutboundWarehouse.storehouseType === 2) {
				Object.assign(obj, this.outboundParams)
			}
			this.showPageLoading()
			this.saveSalesStoreOutBatch(obj).then(res => {
				this.hidePageLoading()
				this.$alert(
					res,
					"批量出库",
					{
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning",
						customClass: "salesModuleList_customClass"
					}
				).then(() => {
					this.refreshPage(this.param);
					this.batchOutboundVisible = false;
				}).catch(() => {
					this.batchOutboundVisible = false;
				})
			});
		},
		// 可选控制
		selectable(row) {
			if (this.flag.split('-')[0] === '1') {
				if (
					Number(row.orderStatus) === 0 ||
					Number(row.orderStatus) === 5 ||
					Number(row.orderStatus) === 4 ||
					Number(row.orderStatus) === 2
				) {
					return 0;
				} else {
					return 1;
				}
			} else {
				return 1;
			}
		}
	},
	computed: {
		selectOrderLength() { return this.selectOrderArr.length }
	},
	props: { flag: String, operationId: Number },
	watch: {
		flag: {
			handler: function (nval) {
				this.param.pageSize = 10;
				this.param.pageNo = 1;
				const level1 = (this.level1 = nval.split("-")[0]);
				const level2 = (this.level2 = nval.split("-")[1]);
				this.timeLen = nval.split("-")[2] ? nval.split("-")[2] : "";
				this.param.errorType = 0;
				if (level1 === "1") {
					//自发订单
					this.param.orderType = "11,12,13";
					this.param.invType = 1;
					this.param.orderStatus = Number(level2);
				} else if (level1 === "2") {
					//代售订单类型
					this.param.orderType = "12";
					this.param.invType = 0;
					this.param.orderStatus = Number(level2);
				} else if (level1 === "3") {
					//代发订单类型
					this.param.orderType = "13";
					this.param.invType = 0;
					this.param.orderStatus = Number(level2);
				} else if (level1 === "4") {
					//异常订单类型
					this.$delete(this.param, "orderStatus");
					this.$delete(this.param, "invType");
					this.$delete(this.param, "orderType");
					if (level2 === undefined) {
						this.param.errorType = "2,3,5,1,6";
					} else {
						this.param.errorType = level2;
					}
				}
				this.selectOrderArr = [];
				// setTimeout(() => {
				// 	this.searchItemValueArray.splice(0, 10);
				// }, 0);
				this.param.channelType = '';
				this.param.searchContent = "";
				this.$refs.search.searchForm.searchValue = "";
				if (this.timeLen === '') {
					setTimeout(() => {
						this.searchItemValueArray.splice(0, 10);
					}, 0);
					this.param.startDate = '';
					this.param.endDate = '';
					this.$refs.searchDate.curDate = '';
				}
				this.setDefaultDate();
				this.getReset()
			},
		},
		operationId: {
			handler(val) {
				this.refreshPage(this.param);
			}
		},
		$route(to, from) {
			if (to.name === 'SalesOrder' && this.timeLen !== '') {
				const time = {
					24: [utils.getTime('oneDaysAgo'), utils.getTime('oneDaysAgo')],
					48: [utils.getTime('TwoDaysAgo'), utils.getTime('TwoDaysAgo')],
					72: [utils.getTime('year'), utils.getTime('ThreeDaysAgo')]
				}[this.timeLen];
				this.defaultDate = time;
			}
		}
	}
};
</script>


<style lang="scss">
.salesModuleList_customClass {
  width: 650px;
}
</style>

<style lang="scss">
.salesModuleList {
  .funcBtnReset {
    .el-button {
      border: 1px solid #bfd9fe;
      color: #3b8cff;
    }
  }
}
</style>
