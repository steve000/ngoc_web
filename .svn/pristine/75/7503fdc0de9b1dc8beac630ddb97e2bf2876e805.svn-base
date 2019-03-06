<template>
	<div class="salesModuleList returnList">
		<div class="table-container">
			<div class="top-scroll-section top-scroll-sectionSpe">
				<div class="filterControl">
					<div class="filterDate">
						<search-date ref="searchDate" :isClearDate=isClearDate @onHandleDate="handleDate({type:1,value:Object.values($event).join('~')})"></search-date>
					</div>
					<search @searchValue="getSearchValue({type:0,value:$event})" ref="search" :isClear='isClear' :showPlaceholder="'请输入渠道，销售订单号，退货单号查询'"></search>
				</div>
				<div class="search_result_container" v-if="searchItemValueArray.length>0">
					<search-result :searchItemValueArray="searchItemValueArray" :count="totalCount" @deleteItem="getDeleteItem"></search-result>
				</div>
				<div class="table-wrapper table-list-special-common-style" id="return-list-table-wrapper">
					<el-table class="table1 noneborder" :data="returnOrderList" border :default-expand-all="true">
						<el-table-column type="expand" width="0">
							<template slot-scope="scope">
								<!-- 编辑备注 -->
								<div class="remark-box remarkShow">
									<span @click="funEditRemark(scope.$index,scope.row)" class="salesEditRemark">备注：{{scope.row.remark?scope.row.remark:'无'}}
										<i class="iconfont1 icon-bianji other_hook"></i>
									</span>

									<!-- <edit-remark class="editRemark" v-on:onEdit="changeCurrentOrderRemark($event,scope.$index,scope.row)" :remarkDetail="scope.row.remark" :returnId="scope.row.returnId"></edit-remark> -->
								</div>
							</template>
						</el-table-column>
						<el-table-column label="编号" prop="returnId" width="220">
							<template slot-scope="scope">
								<div class="order-number change-order-number" @click="toReturnList(scope.row.returnId)">
									<div>退货编号：
										<span>{{scope.row.returnId}}</span>
									</div>
								</div>
								<div class=" order-number">
									<div :title="scope.row.orderId"> 销售编号：{{scope.row.orderId}}
									</div>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="returnId" min-width="60">
							<template slot-scope="scope">
								<div class="row-btn-show ">
									<div>
										<el-button type="text" class="mr15" v-if="(scope.row.returnStatus===1)&&Number(scope.row.errorType!==8) && Number(param.returnType)!=22 && Number(param.returnType)!=23" @click="queryOrderDetailsFcuntion(scope.row.returnId)">入库
										</el-button>
										<el-button type="text" class="mr15" v-if="Number(scope.row.errorType===8)" @click="inStoreAgain(scope.row.returnId)">重新入库
										</el-button>
										<more-operating :returnType="param.returnType" @onFinish="finishReturnOrderFunction(scope.row.returnId)" @onEdit="editReturnOrderFunction(scope.row.returnId,scope.row.orderId)" v-if="scope.row.returnStatus===1&&Number(scope.row.errorType!==8)" @onCancel="cancelReturnOrderFunction(scope.row.returnId)"></more-operating>
									</div>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="状态" prop="returnStatus" min-width="110">
							<template slot-scope="scope">
								<div class="row-show" :title="statusText[scope.row.returnStatus]">
									<span :class="returnClass(scope.row.returnStatus)"></span>
									{{statusText[scope.row.returnStatus]}}
								</div>
							</template>
						</el-table-column>
						<el-table-column label="渠道" prop="channel_type" min-width="80">
							<template slot-scope="scope">
								<div class="row-show" :title="scope.row.channelName">
									{{ Number(scope.row.channelId) !== -1 ? scope.row.channelName : '其他' }}
								</div>

							</template>
						</el-table-column>
						<el-table-column label="退货金额(元)" prop="returnTotal" min-width="110">
							<template slot-scope="scope">
								<div class="row-show" :title="scope.row.returnTotal/100">{{scope.row.returnTotal/100}}</div>
							</template>
						</el-table-column>
						<el-table-column label="客户" min-width="110">
							<template slot-scope="scope">
								<div class="row-show salesInfo">
									<div class="linkMan">
										<!-- {{scope.row.storeLinkMan}} -->
										{{scope.row.custLinkMan}}
									</div>
									<div class="linkTel" v-if="scope.row.custLinkTel">
										<!-- {{scope.row.storeLinkTel}} -->
										{{`${scope.row.custLinkTel.substr(0, 3)} ${scope.row.custLinkTel.substr(3, 4)} ${scope.row.custLinkTel.substr(7, 4)}`}}
									</div>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="退货时间" min-width="80">
							<template slot-scope="scope">
								<div class="row-show" :title="formatFullDateAnother(scope.row.createTime)">{{formatFullDateAnother(scope.row.createTime)}}</div>
							</template>
						</el-table-column>
						<div slot="empty" class="table_slot_empty_text">
							<div><img src="../../../layouts/images/nodata.png" /></div>
							<div>暂无数据</div>
						</div>

					</el-table>
				</div>
			</div>
			<div class="pagination-section">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="param.pageNo" background :page-size="param.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
				</el-pagination>
			</div>
		</div>
		<div class="model-container">
			<el-dialog title="入库操作" :visible.sync="isStockInDialogVisible" width="60%">
				<el-table :data="refusedOrderDetails.saleReturnSkuList" :height="200">
					<el-table-column label="商品名称" prop="skuName" min-width="110">
						<template slot-scope="scope">
							<div class="row-show" :title="scope.row.skuName">{{scope.row.skuName}}</div>
						</template>
					</el-table-column>
					<el-table-column label="商品编码" prop="skuId" min-width="110">
						<template slot-scope="scope">
							<div class="row-show" :title="scope.row.skuId">{{scope.row.skuId}}</div>
						</template>
					</el-table-column>
					<el-table-column label="单位" prop="unitName" min-width="110">
						<template slot-scope="scope">
							<div class="row-show" :title="scope.row.unitName">{{scope.row.unitName}}</div>
						</template>
					</el-table-column>
					<el-table-column label="退货数量" prop="purchaseCount" min-width="110">
						<template slot-scope="scope">
							<div class="row-show" :title="scope.row.returnCount">{{scope.row.returnCount}}</div>
						</template>
					</el-table-column>
					<el-table-column label="入库数量" prop="inCount" min-width="110">
						<template slot-scope="scope">
							<div class="row-show" :title="scope.row.returnCount">{{scope.row.returnCount}}</div>
						</template>
					</el-table-column>
				</el-table>
				<span slot="footer" class="dialog-footer">
					<!--<el-button @click="isStockInDialogVisible = false">取 消</el-button>-->
					<el-button :disabled="disableStockIn" type="primary" @click="createStockInOrder">确认入库</el-button>
				</span>
			</el-dialog>
		</div>
		<!-- 编辑备注 -->
		<edit-remark v-if="dialogVisible" :dialogVisible="dialogVisible" class="editRemark" v-on:onCancel="hideDialog" v-on:onEdit="changeCurrentOrderRemark($event)" :remarkDetail="remarkRow?remarkRow.remark:''" :returnId="remarkRow?remarkRow.returnId:''"></edit-remark>
	</div>
</template>
<script>
import TableHeightMixins from "~/mixins/tableheight";
import Search from "~/components/common/Search";
import MoreOperating from "~/components/common/MoreOperatingReturnOrder";
import EditRemark from "~/components/common/EditRemark";
import Modal from "~/components/Modal";
import { mapActions, mapState } from "vuex";
import QuitMixins from "~/mixins/quit";
import PlatformMixins from "~/mixins/platform";
import misc from "~/utils/misc";
import utils from "~/utils/commonMethod";
import SearchDate from "~/components/common/SearchDate";
import SearchResult from "~/components/common/SearchResultTag.vue";

export default {
	name: "returnOrderList",
	data() {
		return {
			param: {
				pageSize: 10,
				pageNo: 1,
				searchContent: "",
				returnStatus: "",
				returnType: "21,22,23",
				errorType: '',
				invType: 1,
			},
			queryPurchaseDetailsParam: {
				returnId: ""
			},
			updatePurchaseOrderArrivedTimeParam: {
				purchaseId: "",
				planArrivalTime: ""
			},
			updatePurchaseOrderCommentParam: {
				purchaseId: "",
				comment: ""
			},
			statusText: {
				0: "已取消",
				1: "未收货",
				2: "待入库",
				3: "已完成"
			},
			createStockIn: {
				inSkuList: [],
				relatedSheetId: "",
				storehouseId: "",
				type: 4,
				channelId: "",
				bizType: 1
			},
			cancelReturnOrderParam: {
				returnId: "",
				returnStatus: 0
			},
			isStockInDialogVisible: false,
			isRemarkDialogVisible: false,
			remark: "",
			showResetButton: false,
			isSearch: false,
			isShowSearchResult: false,
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() < Date.now() - 8.64e7;
				}
			},
			returnOrderList: [],
			totalCount: 0,
			searchItemValueArray: [],
			isClear: false,
			isClearDate: false,
			dialogVisible: false,
			// 编辑备注
			remarkData: null,
			remarkIndex: null,
			remarkRow: null,
			disableStockIn: false,
		};
	},
	mixins: [TableHeightMixins, QuitMixins, PlatformMixins],
	components: {
		Search,
		MoreOperating,
		Modal,
		EditRemark,
		SearchDate,
		SearchResult
	},
	props: { operationId: Number, flag: String },
	watch: {
		flag: function (nval) {
			this.param.pageSize = 10;
			this.param.pageNo = 1;
			this.$set(this.param, 'returnStatus', nval.split("-") ? parseInt(nval.split("-")[1]) : "")
			// this.param.returnStatus = nval.split("-")
			//   ? parseInt(nval.split("-")[1])
			//   : "";
			this.$set(this.param, 'returnType', nval.split("-") ? parseInt(nval.split("-")[0]) : nval)
			// this.param.returnType = nval.split("-")
			//   ? parseInt(nval.split("-")[0])
			//   : nval;
			this.param.errorType = '';
			if (this.param.returnType === 24) {
				this.param.errorType = 8;
				this.param.returnType = '';
				this.$delete(this.param, 'returnStatus');
				// this.$delete(this.param,'returnType');
			}
			let _returnType = this.param.returnType;
			if (_returnType == 21) {
				this.$set(this.param, 'invType', 1);
				this.param.returnType = "21,22,23";
			} else if (_returnType == 22 || _returnType == 23) {
				this.param.returnType = String(_returnType);
				this.$set(this.param, 'invType', 0);
			} else {
				this.$delete(this.param, 'invType');
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
		operationId: function (nval) {
			this.initData();
		}
	},
	computed: {
		...mapState({
			refusedOrderDetails: ({ returnList }) =>
				returnList.queryRefusedOrderDetails
		})
	},
	mounted() {
		this.refreshPage(this.param);
		this.setTableHeight(240);
	},
	methods: {
		...mapActions([
			"showPageLoading",
			"hidePageLoading",
			"queryRefundInfo",
			"returnList",
			"saveInStore",
			"returnStatusUpdate",
			"editRefundRemark",
			"inStockAgain",
		]),
		// 编辑备注
		funEditRemark(_index, _one) {
			this.dialogVisible = true;
			this.remarkIndex = _index;
			this.remarkRow = _one;
		},
		finishReturnOrderFunction(returnId) {
			this.cancelReturnOrderParam.returnId = returnId;
			this.cancelReturnOrderParam.returnStatus = 3;
			this.$confirm("确认完成退货单", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					this.showPageLoading();
					this.returnStatusUpdate(this.cancelReturnOrderParam).then(resp => {
						this.refreshPage(this.param);
						this.hidePageLoading();
						this.$emit("refreshOrderCount");
					});
				})
				.catch(() => { });
		},
		hideDialog(data) {
			this.dialogVisible = data;
		},
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
		handleSizeChange(nSize) {
			this.param.pageSize = nSize;
			this.refreshPage(this.param);
		},
		handleCurrentChange(nPage) {
			this.param.pageNo = nPage;
			this.refreshPage(this.param);
		},
		refreshPage(nval) {
			this.queryReturnListFunction(nval);
		},
		initData() {
			this.getReset();
		},
		getSearchValue(data) {
			this.param.pageSize = 10;
			this.param.pageNo = 1;
			this.param.searchContent = data.value;
			let i = this.searchItemValueArray.findIndex(val => val.type === 0);
			if (i === -1) {
				this.searchItemValueArray.push({ type: 0, value: data.value });
			} else {
				this.searchItemValueArray.splice(i, 1, { type: 0, value: data.value });
			}
			this.isSearch = true;
			this.isClear = false;
			this.refreshPage(this.param);
		},
		queryReturnListFunction(param) {
			this.showPageLoading();
			this.returnList(param)
				.then(resp => {
					this.hidePageLoading();
					this.returnOrderList = resp.result;
					this.totalCount = resp.totalCount;
					if (this.isSearch) {
						this.showResetButton = true;
						this.isShowSearchResult = true;
					}
				})
				.catch(err => {
					this.returnOrderList = [];
					this.totalCount = 0;
				});
		},
		queryOrderDetailsFcuntion(purchaseId) {
			this.showPageLoading();
			this.isStockInDialogVisible = true;
			this.queryPurchaseDetailsParam.returnId = purchaseId;
			this.queryRefundInfo(this.queryPurchaseDetailsParam).then(() => { this.hidePageLoading() });
		},
		getReset() {
			this.showResetButton = false;
			this.isShowSearchResult = false;
			this.param.searchContent = "";
			this.isSearch = false;
			this.refreshPage(this.param);
		},
		createStockInOrder() {
			this.disableStockIn = true;
			this.showPageLoading();
			this.createStockIn.bizType = { 21: 1, 22: 2, 23: 4 }[this.refusedOrderDetails.returnType]
			this.createStockIn.relatedSheetId = this.refusedOrderDetails.returnId;
			this.createStockIn.storehouseId = this.refusedOrderDetails.stockId;
			this.createStockIn.channelId = this.refusedOrderDetails.channelId;
			let skuList = this.refusedOrderDetails.saleReturnSkuList;
			this.createStockIn.inSkuList = [];
			for (let i = 0; i < skuList.length; i++) {
				let skuListItem = {
					skuId: skuList[i].skuId,
					skuPrice: skuList[i].price,
					totalCount: skuList[i].returnCount,
					inCount: skuList[i].returnCount,
					relatedSeqNo: skuList[i].serialNo,
					productId: skuList[i].productId
				};
				this.createStockIn.inSkuList.push(skuListItem);
			}

			this.saveInStore(this.createStockIn).then(resp => {
				this.$message({
					message: "入库成功",
					type: "success"
				});
				this.$emit("refreshOrderCount");
				this.refreshPage(this.param);
				this.disableStockIn = false;
				this.hidePageLoading();
				this.isStockInDialogVisible = false;
			}).catch(error => {
				this.disableStockIn = false;
				this.hidePageLoading();
			});
		},
		returnClass(status) {
			if (status === 1) {
				return " circle circle-F66E6E";
			} else if (status === 2) {
				return " circle circle-FFA416";
			} else if (status === 3 || status === 0) {
				return " circle circle-8F9399";
			}
		},
		compareDate(planArrivalTime) {
			let nowDate = misc.formatDate(new Date(), "yyyy-MM-dd");
			if (nowDate > planArrivalTime) {
				return true;
			}
			return false;
		},
		// 查看退票列表
		toReturnList(returnId) {
			this.$router.push(`/sales/return/checkList/${returnId}`);
		},
		editReturnOrderFunction(returnId, orderId) {
			this.$router.push({
				name: "EditReturnOrder",
				params: { returnId: returnId, orderId: orderId }
			});
		},
		cancelReturnOrderFunction(returnId) {
			this.cancelReturnOrderParam.returnId = returnId;
			this.$confirm("确认取消退货单", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					this.showPageLoading();
					this.returnStatusUpdate(this.cancelReturnOrderParam).then(resp => {
						if (resp) {
							this.$message({
								message: "取消成功",
								type: "success"
							});
						}
						this.refreshPage(this.param);
						this.hidePageLoading();
						this.$emit("refreshOrderCount");
					});
				})
				.catch(() => { });
		},
		// 编辑备注
		changeCurrentOrderRemark(data) {
			this.dialogVisible = false;
			this.editRefundRemark({ returnId: data[1], remark: data[0] }).then(
				resp => {
					this.$message({
						message: "备注修改成功",
						type: "success"
					});
					// this.$set(this.returnOrderList[data2],'remark',data2[0]);
					this.remarkRow.remark = data[0];
				}
			);
		},
		handleDate(data) {
			this.param = Object.assign({}, this.param, {
				startDate: data.value.split("~")[0],
				endDate: data.value.split("~")[1]
			});
			this.refreshPage(this.param);
			if (this.param.startDate === "") {
				return;
			}
			let i = this.searchItemValueArray.findIndex(val => val.type === 1);
			if (i === -1) {
				this.searchItemValueArray.push({ type: 1, value: data.value.split("~")[2] ? '时间：' + data.value.split("~")[2] : '时间：' + data.value });
			} else {
				this.searchItemValueArray.splice(i, 1, { type: 1, value: data.value.split("~")[2] ? '时间：' + data.value.split("~")[2] : '时间：' + data.value });
			}
			this.isClearDate = false;
		},
		// 日期格式化
		formatFullDateAnother(data) {
			return utils.formatFullDateAnother(data);
		},
		// 重新入库
		inStoreAgain(changeId) {
			//  orderType （订单类型 1-销售订单 2-退货订单 3-换货订单）
			//  type  (入库单类型   4：退货入库,  5：出库拒收入库  6：销售换货入库 7-销售代发入库 8-出库撤销入口)
			this.showPageLoading();
			const datas = {
				relatedSheetId: changeId,
				orderType: 2,
				type: 4,
			};
			this.inStockAgain(datas).then((res) => {
				this.hidePageLoading();
				this.$message(res.success);
				this.refreshPage(this.param);
				this.$emit("refreshOrderCount");
			}).catch(err => this.hidePageLoading());
		},
	}
};
</script>

<style lang="scss">
.salesModuleList {
  .ml40 {
    margin-left: 40px;
  }

  .el-table__row {
    td {
      &:last-child {
        .other_hook {
          display: none;
          vertical-align: middle;
        }
      }
      &:last-child {
        &:hover {
          .other_hook {
            display: inline-block;
            color: #20a0ff;
          }
        }
      }
    }
  }
  .salesInfo {
    & > div {
      line-height: 24px;
    }
  }
}

.remarkShow {
  cursor: pointer;
  font-size: 12px;
  padding-left: 4px;
  span {
    max-width: 100rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    vertical-align: bottom;
    word-break: break-all;
  }
  &:hover .icon-bianji {
    color: #3b8cff;
  }
}

.returnList {
  .table1 .el-table__row {
    .popover222 {
      visibility: hidden;
      cursor: pointer;
    }
    &:hover {
      .popover222 {
        visibility: visible;
      }
    }
  }
  .noneborder thead tr {
    tr {
      &:nth-child(3) {
        border-left: none;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.table-wrapper {
  height: calc(100% - 72px);
}
</style>

