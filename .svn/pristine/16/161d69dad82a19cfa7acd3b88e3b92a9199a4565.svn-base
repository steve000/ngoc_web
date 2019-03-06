<template>
  <div id="informationList">
    <!-- 商品 > 卡券管理 > 卡券信息管理 -->
    <div class="filterSearch">
      <search class="showInline" @searchValue="getSearchValue" :showResetButton="showResetButton" @reset="getReset" :isShowSearchResult="isShowSearchResult" :count="totalCount" :showPlaceholder="'请输入卡号'"></search>
      <!-- <el-button class="down-load-temp" plain size="small" @click="downLoadTemp">下载模板</el-button> -->
      <a :href="fileUrl" :download="dowanloadFileName" class="down-load-temp iconfont icon-xiazai" style="margin-left:20px;">下载模板</a>
    </div>
    <div class="search_result_container" v-if="searchItemValueArray.length>0">
            <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount" @deleteItem="getDeleteItem"></search-result>
        </div>
    <!--表格-->
    <div style="margin-top: 15px;">
      <el-table ref="multipleTable" :data="tableData" :height="tableHeight" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column prop="cardNo" label="卡号" min-width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.status == 1 && userEntityId == scope.row.userGroupId" class="ngoc-card-infor-id">
              <span class="goods-title">{{scope.row.cardNo}}</span>
              <MoreOperatingChannelCardInfor @onDelete="deleteCardInfor(scope.row.id)"></MoreOperatingChannelCardInfor>
            </div>
            <div v-else class="ngoc-card-infor-id">
              <span class="goods-title">{{scope.row.cardNo}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center" min-width="80">
          <template slot-scope="scope">
            <div>{{scope.row.status==0?'不可用':'可用'}}</div>
          </template>
        </el-table-column>
        <el-table-column min-width="120" prop="typeName" label="卡券类别名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column min-width="100" prop="typeCode" label="卡券类别编码" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="price" label="面额" min-width="50" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="userGroupId" label="所属实体" min-width="80" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="beginTime" label="生效时间" min-width="100" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="endTime" label="失效时间" min-width="100" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="remark" label="描述" show-overflow-tooltip>
          <template slot-scope="scope">
              <div class="row-show" :title="scope.row.remark">{{scope.row.remark ? scope.row.remark : '--'}}</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination v-if="paginationShow" v-show="tableData.length!=0" @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-sizes="pageSizesList" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PlatformMixins from "~/mixins/platform";
import TableHeightMixins from "~/mixins/tableheight";
import SearchResult from "~/components/common/SearchResult.vue";
import Search from "~/components/common/Search";
import MoreOperatingChannelCardInfor from "~/components/common/MoreOperatingChannelCardInfor";

export default {
  name: "information-list",
  mixins: [PlatformMixins, TableHeightMixins],
  components: {
    Search,
    SearchResult,
    MoreOperatingChannelCardInfor
  },
  data() {
    return {
      userentityId: '',
      tableData: [], // 表单数据
      conditionData: [], // 查询表格数据
      dowanloadFileName: "", //下载模板名
      fileUrl: null, //下载路径
      showResetButton: false,
      isShowSearchResult: false,
      isClear: false, //搜索清空（重置条件）
      searchItemValueArray: [], //搜索结果数组
      totalCount: 0,
      paginationShow: false,
      cardNumber: "",
      pageNo: 1, // 当前页
      pageSizesList: [10, 20, 30, 40, 50, 100],
      pageSize: 10,
      total: 0, // 总数
      param: {
        cardNo: "",
        pageNo: 1,
        pageSize: 10
      },
    };
  },
  created() {
		this.downLoadTempAction({ dataType: "file" }).then(
			resp => {
				this.dowanloadFileName = "卡券信息模板下载.xls";
				let blob = new Blob([resp], {
					type:
						"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				});
				let objectUrl = URL.createObjectURL(blob);
				this.fileUrl = objectUrl;
			}
		);
	},
  mounted() {
    this.userEntityId = sessionStorage.getItem('entityid')
    this.checkTableInfor();
    this.setTableHeight(275);
    console.log(this.userEntityId, '登陆所属实体id')
  },
  computed: {
    
  },
  props: ["cardInfoList"],
  watch: {
    cardInfoList: function(nval) {
      console.log(nval,"123");
      // this.tableData = this.tableData.concat(nval);
      this.tableData.push.apply(this.tableData, nval);
    }
  },
  methods: {
    ...mapActions([
      "changeList",
      "downLoadTempAction",
      "deleteCardInforAction",
      "checkCardInforAction",
      "showPageLoading",
      "hidePageLoading",
      "changeStatusUpdate",
      "querySearchmer",
    ]),
    getSearchValue(searchValue) {
      this.param.cardNo = searchValue;
      this.isSearch = true;
      this.isClear = false;
      this.searchItemValueArray = [searchValue];
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
    queryReturnListFunction(param) {
      this.paginationShow = false;
      this.checkCardInforAction(param)
        .then(resp => {
          this.hidePageLoading();
          this.tableData = resp.result;
          this.totalCount = resp.totalCount;
          console.log(this.tableData)
          // this.conditionData = this.querySkuListByConditionSearchDetail.result;
          this.$nextTick(function() {
            this.paginationShow = true;
          });
          if (this.isSearch) {
            this.showResetButton = true;
            this.isShowSearchResult = true;
          }
        })
        .catch(err => {
          this.tableData = [];
          this.totalCount = 0;
        });
    },
    getReset() {
      this.showResetButton = false;
      this.isShowSearchResult = false;
      this.param.cardNo = "";
      this.isSearch = false;
      this.checkTableInfor();
      this.manner = this.status = "";
    },
    getDeleteItem(index) {
      this.searchItemValueArray.splice(index);
      this.isClear = true;
      this.param.cardNo = "";
      this.refreshPage();
    },
    refreshPage(nval) {
      this.showPageLoading();
      this.queryReturnListFunction(nval);
    },
    handleSelectionChange(arr) {
      this.selectionGoods = arr;
      this.totalNum = arr.length;
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.checkTableInfor();
      this.manner = this.status = "";
    },
    checkTableInfor() {
      // 查询表格数据
      this.showPageLoading();
      this.paginationShow = false;
      const data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        cardNo: this.cardNumber
      };
      this.checkCardInforAction(data).then(res => {
        this.totalCount = res.totalCount;
        this.tableData = res.result.map(i => {
          return i;
        });
      });
      // this.conditionData = this.querySearchmerList.result;
      this.$nextTick(function() {
        this.paginationShow = true;
      });
      this.hidePageLoading();
    },
    deleteCardInfor(id) {
      // 删除该行表格数据
      this.$confirm("此操作将删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const lists = { id: id };
          this.deleteCardInforAction(lists).then(res => {
            console.log(res);
            this.$message("删除成功");
            this.checkTableInfor();
          });
        })
        .catch(err => { });
    }
  }
};
</script>

<style lang="scss" scoped >
@import "../../../layouts/css/themes/default.scss";
#informationList {
  padding: 20px 20px 0 20px;
  .search-component {
    top: 0;
    left: 0;
  }
  .down-load-temp {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .ngoc-card-infor-id {
    position: relative;
    padding-right: 50px;
    .operate-div {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  .pagination {
    float: right;
    margin-top: 30px;
  }
}
</style>
