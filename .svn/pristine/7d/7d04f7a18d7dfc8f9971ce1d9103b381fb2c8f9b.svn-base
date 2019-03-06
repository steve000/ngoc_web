<template>
	<div class="salesModuleList" @click="removeClickEffect('channel-goods-list')">
		<div class="table-container">
			<div class="top-scroll-section">
				<!-- 筛选 -->
				<div class="top-search-wrapper">
					<div class="filterControl">
						<div class="filterDate">
							<div style="display: flex;">
								<div>
									<span>商品状态：</span>
									<el-select size="small" placeholder="全部" v-model="param.status" @change="handleFilterGoodsStatus" style="height: 34px;">
										<el-option label="售卖中" value="0"></el-option>
										<el-option label="停售中" value="1"></el-option>
									</el-select>
								</div>
								<div class="ml20">
									<span>销售方式：</span>
									<el-select size="small" placeholder="全部" v-model="param.saleType" @change="handleFilterSalesWays" style="height: 34px;">
										<el-option label="自营" value="0"></el-option>
										<el-option label="代售" value="1"></el-option>
										<el-option label="代发" value="2"></el-option>
									</el-select>
								</div>
							</div>
						</div>
						<div class="filterSearch">
							<search showPlaceholder="请输入商品名称或编码搜索商品" ref="search" @searchValue="getSearchValue" :showResetButton="showResetButton" @reset="getReset" :isShowSearchResult="isShowSearchResult" :count="totalCount"></search>
						</div>
					</div>
				</div>
				<div class="search_result_container" v-if="searchItemValueArray.length>0">
					<search-result :searchItemValueArray="searchItemValueArray" :count="totalCount" @deleteItem="getDeleteItem"></search-result>
				</div>
				<div class="channelGoodsWrap">
					<div class="status-show">
						<el-button size="small" type="primary" icon="el-icon-plus" @click="$router.push({name: 'CreateChannelGood', params: {channelId}})">新增渠道商品</el-button>
						<span class="label" @click="startSale" style="margin-left: 12px;">售卖</span>
						<span class="label" @click="stopSale">停售</span>
					</div>
					<div class="goods1">
						<span class="import" @click="importChannelGoods(channelName,channelId)">
							<i class="el-icon-download"></i>导入渠道商品</span>
					</div>
				</div>
				<div class="GoodsChoiceNum" v-show="totalNum!=0">已选择{{totalNum}}条：</div>
				<!--表格-->
				<div style="margin-top: 15px;" id="channel-goods-list">
					<el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :cell-class-name="cellStyle">
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column prop="skuName" label="NGOC商品名称" min-width="200">
							<template slot-scope="scope">
								<div class="row-title-container">
									<el-tooltip class="item" effect="dark" placement="top" :enterable="false">
										<div class="row-title-order" :title="scope.row.stockPerInId" slot="content">
											{{scope.row.skuName}}
										</div>
										<div class="row-title-order" :title="scope.row.stockPerInId">
											{{scope.row.skuName}}
										</div>
									</el-tooltip>
									<div class="operate-container">
										<div></div>
										<div class="operate-container_div">
											<more-operat :buttonList="getButtonList(scope.row.status)" style="margin-top:2px;" @onClick="onClickOperateButton" @hide="getHide(scope.$index,'channel-goods-list')" :isEnd="scope.$index===tableData.length-1" @show="setTableTrBg(scope.$index,'channel-goods-list')" :row="scope.row"></more-operat>
										</div>
									</div>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="skuId" label="NGOC商品编码" show-overflow-tooltip></el-table-column>
						<el-table-column prop="channelSkuName" label="渠道商品名称" show-overflow-tooltip></el-table-column>
						<el-table-column prop="channelSkuId" label="渠道商品编码" show-overflow-tooltip></el-table-column>
						<el-table-column style="margin-left:10px;" prop="saleType" label="销售方式" show-overflow-tooltip>
							<template slot-scope="scope">
								<div>{{scope.row.saleType==0?'自营':scope.row.saleType==1?'代售':'代发'}}</div>
							</template>
						</el-table-column>
						<el-table-column prop="vendorName" label="发货方" show-overflow-tooltip>
							<template slot-scope="scope">
								<div>{{scope.row.vendorName ? scope.row.vendorName:'--'}}</div>
							</template>
						</el-table-column>
						<el-table-column prop="status" label="状态" show-overflow-tooltip>
							<template slot-scope="scope">
								<span v-show="scope.row.status === 0">
									<i class="iconfont1 status-icon-sale"></i>售卖中</span>
								<span v-show="scope.row.status === 1">
									<i class="status-icon-stop"></i>停售中</span>
							</template>
						</el-table-column>
						<el-table-column prop="maxPrice" label="最高价" show-overflow-tooltip></el-table-column>
						<el-table-column prop="minPrice" label="最低价" show-overflow-tooltip></el-table-column>
						<el-table-column prop="createUserName" label="创建人" show-overflow-tooltip>
							<template slot-scope="scope">
								<div>{{scope.row.createUserName?scope.row.createUserName:'--'}}</div>
							</template>
						</el-table-column>
						<el-table-column prop="createTime" label="创建时间" show-overflow-tooltip>
							<template slot-scope="scope">
								{{ scope.row.createTime | dateFormat('yyyy-MM-dd HH:mm:ss') }}
							</template>
						</el-table-column>
						<el-table-column prop="remark" label="备注" show-overflow-tooltip>
							<template slot-scope="scope">
								{{scope.row.remark ? scope.row.remark:'--'}}
							</template>
						</el-table-column>
						<div slot="empty" class="table_slot_empty_text">
							<div><img src="../../layouts/images/nodata.png" /></div>
							<div>暂无数据</div>
						</div>
					</el-table>
				</div>
			</div>
			<div class="pagination-section" v-if="tableData.length">
				<el-pagination background ref="pagination" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" :total="totalCount">
				</el-pagination>
				<!-- <el-pagination background v-show="tableData.length!=0" @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-sizes="pageSizesList" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change='handleSizeChange'>
				</el-pagination> -->
			</div>
		</div>

		<!--查看编辑历史-->
		<el-dialog title="商品修改历史" :visible.sync="dialogTableVisible" class="remark-log-dialog edit-product-history" width="800px">
			<div class="table-style-change">
				<!-- <ul class="outbound-recode" v-if="logList">
					<li class="left">
						<span class="name">NGOC商品名称：</span>
						<span class="outbound-order-info">{{editRowData.skuName}}</span>
					</li>
					<li>
						<span class="name">NGOC sku编码：</span>
						<label class="outbound-order-info">{{editRowData.skuId}}</label>
					</li>
					<li class="left">
						<span class="name">渠道商品名称：</span>
						<label class="outbound-order-info">{{editRowData.channelSkuName}}</label>
					</li>
					<li>
						<span class="name">渠道 sku编码：</span>
						<label class="outbound-order-info">{{editRowData.channelSkuId}}</label>
					</li>
				</ul> -->
				<div class="outbound-recode" v-if="logList">
					<div class="outbound-recode-item-wrapper">
						<div class="left">
							<p class="title">NGOC商品名称：</p>
							<p class="name" :title="editRowData.skuName">{{editRowData.skuName}}</p>
						</div>
						<div class="right">
							<p class="title">NGOC sku编码：</p>
							<p class="name" :title="editRowData.skuId">{{editRowData.skuId}}</p>
						</div>
					</div>
					<div class="outbound-recode-item-wrapper">
						<div class="left">
							<p class="title">渠道商品名称：</p>
							<p class="name" :title="editRowData.channelSkuName">{{editRowData.channelSkuName}}</p>
						</div>
						<div class="right">
							<p class="title">渠道 sku编码：</p>
							<p class="name" :title="editRowData.channelSkuId">{{editRowData.channelSkuId}}</p>
						</div>
					</div>
				</div>
				<el-table class="ProductListTable sale-list-table" :data="logList" tooltip-effect="light">
					<el-table-column label="操作内容" width="236" show-overflow-tooltip>
						<template slot-scope="scope">
							<p v-if="Number(scope.row.logType) === 10">售卖</p>
							<p v-else-if="Number(scope.row.logType) === 11">停售</p>
							<p v-else-if="Number(scope.row.logType) === 12">编辑</p>
							<p v-else-if="Number(scope.row.logType) === 8">创建</p>
						</template>
					</el-table-column>
					<el-table-column label="操作人" prop="createUserName">
					</el-table-column>
					<el-table-column label="操作时间">
						<template slot-scope="scope">
							<p>{{calDate(scope.row.createTime)}}</p>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import Search from "~/components/common/Search";
import MoreOperatingChannelGoods from "~/components/common/MoreOperatingChannelGoods";
import { mapActions, mapState } from "vuex";
import misc from "~/utils/misc";
import utils from "~/utils/commonMethod";
import SearchResult from "~/components/common/SearchResult.vue";
import filters from "~/mixins/filters";
import MoreOperat from '~/components/common/MoreOperating';
import moreOperateMixin from '~/mixins/moreOperate';
import paginationSet from '~/mixins/paginationSet';
import * as C from "../../constants/api";

export default {
	name: "filter-table",
	data() {
		return {
			totalNum: 0,
			tableData: [], // 表单数据
			tableDataTemp: [],
			tableDataTempSec: [],
			total: 0, // 总数
			selectionGoods: [],
			dialogTableVisible: false,
			logList: null,
			editRowData: null, // 编辑行商品信息
			isDisablePagination: false,
			param: {
				searchContent: "",
				channelId: this.channelId,
				saleType: null,
				status: null,
			},
			showResetButton: false,
			isSearch: false,
			isShowSearchResult: false,
			totalCount: 0,
			searchCondition: [],
			conditionData: "",
			searchItemValueArray: [],
			pageSize: 10,
			pageNo: 1,
		};
	},
	computed: {
		...mapState({
			querySearchmerList: ({ channel }) => {
				return channel.querySearchmerList;
			},
		})
	},
	mixins: [filters, moreOperateMixin, paginationSet],
	methods: {
		...mapActions([
			"changeList",
			"showPageLoading",
			"hidePageLoading",
			"changeStatusUpdate",
			"querySearchmer",
			"startOrStopChannelGoodsAction",
			"queryOrderLogAction",
			"deleteChannelGood",
		]),
		cellStyle({ row, column, rowIndex, columnIndex }) {
			if (columnIndex === 1) {
				return 'col-first';
			}
		},
		getButtonList(inStatus) {
			let buttonArray = [];
			if (inStatus === 0) {
				buttonArray = [{ type: 'history', text: '修改历史' }, { type: 'edit', text: '编辑' }]
			} else {
				buttonArray = [{ type: 'history', text: '修改历史' }, { type: 'edit', text: '编辑' }, { type: 'del', text: '删除' }]
			}
			return buttonArray
		},
		// 点击更多触发相应操作
		onClickOperateButton(type, row) {
			if (type === 'del') {
				this.deleteGoods(row.saleChannelSkuId)
			} else if (type === 'edit') {
				this.$router.push({ name: 'UpdateChannelGood', params: { saleChannelSkuId: row.saleChannelSkuId } })
			} else if (type === 'history') {
				this.historyRecord(row)
			}
		},
		handleSelectionChange(arr) {
			this.selectionGoods = arr;
			this.totalNum = arr.length;
		},
		importChannelGoods(channelName, channelId) {
			this.$router.push({ name: 'ImportChannelGoods', params: { channelName: channelName, channelId: channelId } });
			console.log("+++++++++++++++++++++");
			this.$store.commit(C.POST_IMPORT_CHANNEL_GOODS, "");
		},
		handleFilterGoodsStatus(data) {
			this.searchCondition[0] = data;
			let name;
			switch (data) {
				case "0":
					name = "售卖中";
					break;
				case "1":
					name = "停售中";
					break;
			}
			if (utils.matchStrOfArr(this.searchItemValueArray, "商品状态：") === -1) {
				this.searchItemValueArray.push(`商品状态：${name}`);
			} else {
				this.$set(
					this.searchItemValueArray,
					utils.matchStrOfArr(this.searchItemValueArray, "商品状态："),
					`商品状态：${name}`
				);
			}
			this.param.status = data;
			this.refreshPage(this.param);
			// this.handleFilterGoods();
		},
		// 删除搜索条件
		getDeleteItem(index) {
			const str = this.searchItemValueArray[index].split("：")[0];
			switch (str) {
				case "商品状态":
					this.searchCondition.splice(0, 1)
					this.param.status = ""
					// this.handleFilterGoods();
					break
				case "销售方式":
					this.searchCondition.splice(1, 1)
					this.param.saleType = ""
					break
				default:
					this.param.searchContent = ""
					this.$refs.search.searchForm.searchValue = ""
					break
			}
			this.refreshPage(this.param);
			setTimeout(() => {
				this.searchItemValueArray.splice(index, 1);
			}, 0);
		},
		handleFilterSalesWays(data) {
			this.searchCondition[1] = data;
			let name;
			switch (data) {
				case "0":
					name = "自营";
					break;
				case "1":
					name = "代售";
					break;
				case "2":
					name = "代发";
					break;
			}
			if (utils.matchStrOfArr(this.searchItemValueArray, "销售方式：") === -1) {
				this.searchItemValueArray.push(`销售方式：${name}`);
			} else {
				this.$set(
					this.searchItemValueArray,
					utils.matchStrOfArr(this.searchItemValueArray, "销售方式："),
					`销售方式：${name}`
				);
			}
			this.param.saleType = data;
			this.refreshPage(this.param);
		},
		handleFilterGoods() {
			let condition = this.searchCondition;
			let _data = this.conditionData;
			let _dataTemp = [];
			if (condition[0]) {
				_dataTemp = _data.filter(item => {
					if (item.status == condition[0]) return item;
				});
				this.tableData = _dataTemp;
			}

			if (condition[1]) {
				this.tableData = _dataTemp.filter(item => {
					if (item.saleType == condition[1]) return item;
				});
			}
		},
		getdata() {
			this.showPageLoading();
			const param = Object.assign({}, this.param, { pageSize: this.pageSize, pageNo: this.pageNo })
			this.querySearchmer(param).then(res => {
				this.totalCount = res.totalCount;
				this.tableData = res.result.map(i => {
					i.minPrice = i.minPrice / 100;
					i.maxPrice = i.maxPrice / 100;
					return i;
				});
				this.conditionData = this.querySearchmerList.result;
				this.hidePageLoading();
			});
		},
		calDate: function (createTime) {
			return misc.formatDate(new Date(createTime), "yyyy-MM-dd HH:mm:ss");
		},
		getSearchValue(searchValue) {
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
		refreshPage(nval) {
			this.showPageLoading();
			this.getdata(nval);
		},
		getReset() {
			this.showResetButton = false;
			this.isShowSearchResult = false;
			this.param.searchContent = "";
			this.isSearch = false;
			this.getdata();
		},
		// 售卖
		startSale() {
			if (!this.selectionGoods.length) {
				this.$message({
					type: "warning",
					message: "请至少选择一条商品"
				});
				return;
			}
			const startArr = this.selectionGoods.map(val => {
				return { saleChannelSkuId: val.saleChannelSkuId };
			});
			const datas = {
				status: 0,
				data: startArr
			};
			this.startOrStopChannelGoodsAction(datas).then(res => {
				this.$message({
					type: 'success',
					message: "操作成功"
				});
				this.getdata();
				this.selectionGoods = [];
			});
		},
		// 停售
		stopSale() {
			if (!this.selectionGoods.length) {
				this.$message({
					type: "warning",
					message: "请至少选择一条商品"
				});
				return;
			}
			const stopArr = this.selectionGoods.map(val => {
				return { saleChannelSkuId: val.saleChannelSkuId };
			});
			const datas = {
				status: 1,
				data: stopArr
			};
			this.startOrStopChannelGoodsAction(datas).then(res => {
				this.$message({
					type: 'success',
					message: "操作成功"
				});
				this.getdata();
				this.selectionGoods = [];
			});
		},
		// 删除
		deleteGoods(id) {
			this.$alert("此操作将删除该条信息, 是否继续?", "提示", {
				confirmButtonText: "确定",
				type: "warning"
			}).then(() => {
				this.deleteChannelGood({ channelSkuId: id }).then(res => {
					this.$message({
						type: 'success',
						message: "操作成功"
					});
					this.getdata();
				});
			})
				.catch(err => { });
		},
		updateGoods(val) {
			this.$router.push({
				name: "updateChannelGood",
				params: { saleChannelSkuId: val }
			});
		},
		// 编辑历史
		historyRecord(row) {
			this.editRowData = row;
			this.getLog(row.saleChannelSkuId).then(res => {
				this.logList = res.result;
				this.dialogTableVisible = true;
			});
		},
		getLog(channelGoodsId) {
			// 查询日志列表
			this.showPageLoading();
			return new Promise((resolve, reject) => {
				const params = {
					billType: 4,
					billId: channelGoodsId
				};
				this.queryOrderLogAction(params)
					.then(res => {
						this.hidePageLoading();
						resolve(res);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		calDate: function (createTime) {
			return misc.formatDate(new Date(createTime), "yyyy-MM-dd HH:mm:ss");
		},
	},
	watch: {
		channelId(val) {
			this.$set(this.param, 'channelId', val)
			this.getdata()
		},
		operationId: function () {
			this.getdata()
		}
	},
	mounted() {
		console.log(this.pageSize)
		this.getdata()
	},
	props: ["channelId", "channelName", "operationId"],
	components: {
		Search,
		MoreOperatingChannelGoods,
		SearchResult,
		MoreOperat
	}
};
</script>

<style lang="scss">
.edit-product-history {
  .el-dialog__header {
    height: 56px;
  }
  .el-dialog__title {
    height: 16px;
    line-height: 16px;
    font-size: 16px;
  }
  .el-dialog__body {
    margin-top: 0;
  }
  .el-table__header tr th:nth-of-type(2) {
    border-left: none;
  }
  .el-table__header tr th:nth-of-type(3) {
    border-left: none;
  }
}
</style>


<style scoped lang="scss">
@import "../../layouts/css/themes/default.scss";
.showInline {
  display: inline-block;
}

.channel-wrapper .table-style-change {
  .el-table thead tr th {
    border: none;
  }
  .sale-list-table {
    border: 1px solid #eceef5;
    /*border-bottom: none;*/
  }
  .has-gutter {
    background: #f6f7fb;
  }
  .el-table .cell {
    padding-left: 16px;
  }
}
.search-input {
  display: flex;
  justify-content: space-between;
}
.label {
  padding: 7px 16px;
  color: #3b8cff;
  border-radius: 4px;
  border: 1px solid #bfd9fe;
  margin-left: 8px;
  line-height: 1;
}
/*查看看多*/
.ngoc-goods-name {
  display: flex;
  .goods-title {
    width: 100px;
  }
}
.channel-wrapper .table-style-change {
  margin-top: 20px;
}
.outbound-recode {
  margin: 18px 0;
  color: #333;
  font-size: 12px;
  .outbound-recode-item-wrapper {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 12px;
    p {
      display: inline-block;
    }
    .left {
      width: 380px;
    }
    .title {
      width: 100px;
    }
    .name {
      max-width: 240px;
      overflow: hidden;
      vertical-align: top;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
/*停售或者开始售卖商品*/
.status-show .label {
  cursor: pointer;
}
/*停售和售卖icon*/
.status-icon-sale,
.status-icon-stop {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  margin-right: 6px;
}
.status-icon-stop {
  background: #fa5555;
}
.status-icon-sale {
  background: #67c23a;
}
.channelGoodsWrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .goods1 {
    display: inline-block;
    .import {
      color: #3b8cff;
      cursor: pointer;
    }
  }
}
.GoodsChoiceNum {
  line-height: 31px;
  font-size: 13px;
  color: #888888;
}
</style>
