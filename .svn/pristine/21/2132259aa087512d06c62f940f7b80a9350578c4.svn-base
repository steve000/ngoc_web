<template>
    <div class="purchase-list">
        <div class="table-container">
            <div class="nav-top">
                <div class="select-date-container" style="display:flex;align-items: center;">
                  时间类型：
									<el-select v-model="param.dateType" @change="changeChannelQuery" size="small" placeholder="请选择时间类型" style="margin-left:10px;margin-right:10px;">
											<el-option :value="0" label="创建时间"></el-option>
											<el-option :value="1" label="重置时间"></el-option>
									</el-select>
									<!-- <select-date-interval @date="getDate" :isReset="isResetDate"></select-date-interval> -->
                  <SelectDate @date="getDate" :isReset="isResetDate" :textNone="textNoneFun"></SelectDate>
                </div>
                <div class="search-container">
                    <search @searchValue="getSearchValue"
                            :isClear='isClear'
                            :showPlaceholder="'输入商品名称/渠道名称'"></search>
                </div>
            </div>
            <div class="search_result_container" v-if="searchItemValueArray.length>0">
                <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount"
                               @deleteItem="getDeleteItem"></search-result>
            </div>
            <div class="table-wrapper" id="purchaseListTable">
                <el-table :data="channelPriceListData" border
                          :height="tableHeight"
                          ref="channelPriceListData"
                          :row-class-name="tableRowClassName">
                    <el-table-column label="商品名称" prop="skuName" min-width="170">
                        <template slot-scope="scope">
                            <div class="row-btn-show">
                                <!-- <div class="row-show" :title="scope.row.skuName" @click="viewPurchaseDetail(scope.row)"> -->
																<div class="row-show" :title="scope.row.skuName">
																	{{scope.row.skuName}}
                                </div>
                                <div class="operate-container">
                                    <div class="operate-container_div">
                                        <more-operating
                                            @onEdit="$router.push({ name:'channelPriceEdit', query: {id: scope.row.id}})"
                                            @onDelete="deleteDistribution(scope.row)"
																						@resetButton="resetButton(scope.row)"
                                            :row="scope.row">
                                        </more-operating>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="渠道名称" prop="channelName" min-width="110">
                        <template slot-scope='scope'>
                            <span v-if="scope.row.channelName">{{scope.row.channelName}}</span>
                            <span v-else>--</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="渠道价" prop="channelPrice" min-width="110">
											<template slot-scope='scope'>
													<span v-if="scope.row.channelPrice">{{scope.row.channelPrice}}</span>
													<span v-else>--</span>
											</template>
										</el-table-column>
										<el-table-column label="分配数量" prop="totalCount" min-width="110">
											<template slot-scope='scope'>
													<span v-if="scope.row.totalCount">{{scope.row.totalCount}}</span>
													<span v-else>--</span>
											</template>
										</el-table-column>
										<el-table-column label="已用数量" prop="usedCount" min-width="110">
											<template slot-scope='scope'>
													<span>{{scope.row.usedCount}}</span>
											</template>
										</el-table-column>
										<el-table-column label="剩余数量" prop="remainingCount" min-width="110">
											<template slot-scope='scope'>
													<span v-if="scope.row.remainingCount">{{scope.row.remainingCount}}</span>
													<span v-else>--</span>
											</template>
										</el-table-column>
										<el-table-column label="创建时间" prop="createTime" min-width="110">
											<template slot-scope='scope'>
													<span v-if="scope.row.createTime">{{scope.row.createTime}}</span>
													<span v-else>--</span>
											</template>
										</el-table-column>
										<el-table-column label="更新时间" prop="updateTime" min-width="110">
											<template slot-scope='scope'>
													<span v-if="scope.row.updateTime">{{scope.row.updateTime}}</span>
													<span v-else>--</span>
											</template>
										</el-table-column>
										<el-table-column label="重置时间" prop="resetTime" min-width="110">
											<template slot-scope='scope'>
													<span v-if="scope.row.resetTime">{{scope.row.resetTime}}</span>
													<span v-else>--</span>
											</template>
										</el-table-column>
										<el-table-column label="操作人" prop="operateUserName" min-width="110">
											<template slot-scope='scope'>
													<span v-if="scope.row.operateUserName">{{scope.row.operateUserName}}</span>
													<span v-else>--</span>
											</template>
										</el-table-column>
                    <el-table-column label="备注" prop="comments" min-width="110">
											<template slot-scope='scope'>
													<span v-if="scope.row.comments">{{scope.row.comments}}</span>
													<span v-else>--</span>
											</template>
										</el-table-column>
                    <div slot="empty" class="table_slot_empty_text">
                        <div><img src="../../../layouts/images/nodata.png"/></div>
                        <div>暂无数据</div>
                    </div>
                </el-table>
                <div class="pagination-section">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                   :current-page="param.pageNo" background
                                   :page-size="param.pageSize" layout="total, sizes, prev, pager, next, jumper"
                                   :total="totalCount">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import TableHeightMixins from "~/mixins/tableheight";
import Search from "~/components/common/Search";
import MoreOperating from "~/components/common/MoreOperatingChannel";
import Modal from "~/components/common/Modal.vue";
// import selectDateInterval from "~/components/common/selectDatePrice";
import SelectDate from '~/components/common/SelectDate';
import PlatformMixins from "~/mixins/platform";
import misc from "~/utils/misc";
import SearchResult from "~/components/common/SearchResult.vue";

export default {
  name: "channelPlanList",
  data() {
    return {
      channelPriceListData: [],
      param: {
        pageSize: 10,
				pageNo: 1,
				dateType: '',
				searchDate: '',
				dateKey: "",
        searchKey: "",
        startTime: '',
        endTime: '',
      },
      totalCount: 0,
      row: {},
      buttonList: [],
      isResetDate: false,
      addSuccessType: false,
      searchItemValueArray: [],
      isClear: false,
      textNoneFun: false
    };
  },
  mixins: [TableHeightMixins, PlatformMixins],
  components: {
    Search,
    MoreOperating,
    Modal,
    // selectDateInterval,
    SelectDate,
    SearchResult
  },
  props: { operationId: Number, flag: String },
  watch: {
    flag: function(nval) {
      this.param.pageSize = 10;
      this.param.pageNo = 1;
      if (this.flag == "-1") {
        this.param.dateType = "";
        this.param.searchDate = "";
        this.param.dateKey = "";
        this.param.searchKey = "";
      }
      this.addSuccessType = false;
      this.refreshPage();
    },
    operationId: function(nval) {
      this.initData();
      this.addSuccessType = true;
    }
  },
  computed: {
    ...mapState({})
  },
  mounted() {
    this.refreshPage();
    this.setTableHeight(280);
  },
  methods: {
    ...mapActions([
      "channelpriceReset",
      "channelpriceQuerylistpage",
      "channelpriceDelete",
      "showPageLoading",
      "hidePageLoading"
    ]),

    changeChannelQuery(val) {
      this.param.pageSize = 10;
      this.param.pageNo = 1;
      this.param.dateType = val;
      this.refreshPage();
    },
    handleSizeChange(nSize) {
      this.param.pageSize = nSize;
      this.refreshPage();
    },
    handleCurrentChange(nPage) {
      this.param.pageNo = nPage;
      this.refreshPage();
    },
    refreshPage(param = this.param) {
      this.showPageLoading();
      this.queryPurchaseOrderListFunction(param);
    },
    initData() {
      this.getReset();
    },
    getSearchValue(searchValue) {
      this.param.pageSize = 10;
      this.param.pageNo = 1;
      this.isClear = false;
      this.param.searchKey = searchValue;
      this.searchItemValueArray = [searchValue];
      this.refreshPage();
    },
    queryPurchaseOrderListFunction(param) {
      this.channelpriceQuerylistpage(param)
        .then(resp => {
          this.hidePageLoading();
          this.channelPriceListData = resp.result;
          this.totalCount = resp.totalCount;
        })
        .catch(err => {
          this.channelPriceListData = [];
          this.totalCount = 0;
          this.hidePageLoading();
        });
    },
    getReset() {
      this.param.dateType = "";
			this.param.searchDate = "";
			this.param.dateKey = "";
      this.param.searchKey = "";
      this.param.startTime = ''
      this.param.endTime = ''
      this.isResetDate = true;
      this.refreshPage();
    },
    getDeleteItem(index) {
      this.searchItemValueArray.splice(index);
      this.isClear = true;
      this.param.searchKey = "";
      this.refreshPage();
    },
    viewPurchaseDetail(row) {
      this.$router.push({
        path: `/sales/channel/channelPlanDetails`,
        query: { id: row.id }
      });
    },
    // editPurchaseOrderFunction(row) {
    //   this.$router.push({
    //     path: `/sales/channel/channelPlanEdit`,
    //     query: { id: row.id }
    //   });
    // },
    deleteDistribution(row) {
      let datas = {
        id: row.id
      };
      this.$confirm("确认删除此条渠道价与存量定义记录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.channelpriceDelete(datas).then(resp => {
            this.refreshPage();
          });
        })
        .catch(() => {});
    },
    resetButton(row) {
      let datas = {
        id: row.id,
      };
      this.channelpriceReset(datas).then(resp => {
        this.refreshPage();
      });
    },
    getButtonList(row) {
			console.log(row, 998)
      let buttonArray = [
				{ type: "edit", text: "编辑" },
        { type: "resetButton", text: "重置" },
        { type: "delete", text: "删除" }
      ];
      return buttonArray;
    },
    onClickOperateButton(type, row) {
      if (type === "edit") {
        this.editPurchaseOrderFunction(row);
      } else if (type === "delete") {
        this.deletePurchaseOrderFunction(row);
      } else if (type === "resetButton") {
        this.resetButton(row);
      }
    },
    // getDate(time) {
    //   this.param.searchDate = time.dateRange;
    //   this.param.dateKey = +time.dateStatus;
    //   this.isResetDate = false;
    //   this.refreshPage();
    // },
    // 时间组件 拿到startTime & endTime 筛选查询
    getDate(time){
        this.isResetDate = false;
        this.param.startTime = time.createStartTime;
        this.param.endTime = time.createEndTime;
        this.refreshPage();
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0 && this.addSuccessType === true) {
        return "success-row";
      }
    },
  }
};
</script>

<style lang="scss">
.purchase-list {
  .table-container {
    padding-top: 20px;
    background-color: #fff;
    height: 100%;
    .nav-top {
      display: flex;
      height: auto;
      justify-content: space-between;
      align-items: flex-start;
    }
    .table-wrapper {
      width: 100%;
      .el-table__body-wrapper tbody tr:hover {
        .operate-container_div {
          display: block;
        }
      }
      .operate-container {
        padding-right: 16px;
        min-width: 72px;
        font-size: 12px;
        .operate-container_div {
          display: none;
        }
        div {
          float: right;
        }
      }
    }
  }
  .display-flex {
    display: flex;
  }
  .icon-shijian {
    font-size: 12px;
  }
  .icon-bianji {
    font-size: 12px;
  }
  .model-container {
    height: auto;
  }
  .date-conatiner {
    &:hover {
      .date-edit-contaniner .date-picker-container {
        display: block;
      }
      .date-edit-contaniner .date-edit {
        display: block;
      }
    }
    .date-edit-contaniner {
      position: relative;
      text-align: right;
      .date-edit {
        cursor: pointer;
        position: absolute;
        z-index: 9;
        width: 20px;
        display: none;
      }
      .date-picker-container {
        opacity: 0;
        position: absolute;
        left: -88px;
        z-index: 10;
        width: 120px;
        display: none;
        .el-input--small .el-input__inner {
          cursor: pointer;
          border: none;
        }
        .el-input {
          width: 120px;
        }
        .el-input__prefix {
          display: none;
        }
      }
    }
  }
  .show-more {
    display: flex;
    width: 100%;
    height: 44px;
    justify-content: space-between;
    position: relative;
    &:hover {
      .show-more-icon {
        display: block;
      }
    }
    .show-more-content {
      white-space: nowrap;
      overflow: hidden;
      min-width: 108px;
      text-overflow: ellipsis;
    }
    .show-more-icon {
      min-width: 28px;
      font-size: 12px;
      position: absolute;
      right: 0px;
      display: none;
      z-index: 10;
    }
  }
  .font-color-F56C6C {
    color: #f56c6c;
  }
  .select-storehouse-container {
    margin-bottom: 12px;
    .el-input__inner {
      height: 34px;
      color: #666666;
      border: 1px solid #e0e0e0;
    }
    .el-form-item__label {
      font-size: 14px;
      color: #151515;
    }
  }
  .textarea-container {
    position: relative;
    .textarea-tips {
      color: #9c9c9c;
      position: absolute;
      top: 138px;
    }
  }
}
</style>
