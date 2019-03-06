<template>
    <div class="goods-list">
        <div class="search">
            <search @searchValue="onSearchGood" :showResetButton="showResetButton" @reset="getReset" :isShowSearchResult="isShowSearchResult" :count="totalCount" :showPlaceholder="'输入商品名称/SKU编码'"></search>
        </div>
        <div class="search_result_container" v-if="searchItemValueArray.length>0">
            <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount" @deleteItem="getDeleteItem"></search-result>
        </div>
        <div class="table-wrapper">
            <el-table :data="commodityReleaseList" border :height="tableHeight">

                <el-table-column label="商品名称" min-width="150">
                    <template slot-scope="scope">
                        <div class="row-btn-show">
                          <div class="row-show" :title="scope.row.skuName">{{scope.row.skuName ? scope.row.skuName : '--'}}</div>
                          <div class="operate-container">
                              <more-operating 
                                @onEdit="$router.push({name: `commodityReleaseEdit`,params: scope.row})" 
                                @onDelete="clickDelete(scope.row)">
                              </more-operating>
                              <span style="padding: 0 7px;float:right;height:1px;"></span>
                          </div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="sku编码" min-width="150">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.skuId">{{scope.row.skuId ? scope.row.skuId :'--'}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="开始时间" min-width="60">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.beginTime">{{scope.row.beginTime ? scope.row.beginTime :'--'}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="结束时间" min-width="60">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.endTime">{{scope.row.endTime ? scope.row.endTime :'--'}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="最低价" min-width="60">
                    <template slot-scope="scope">
                        <div class="row-show" :title="(Number(scope.row.minPrice)/100).toFixed(2)">{{scope.row.minPrice!=null ? (Number(scope.row.minPrice)/100).toFixed(2) :'--'}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="最高价" min-width="60">
                    <template slot-scope="scope">
                        <div class="row-show" :title="(Number(scope.row.maxPrice)/100).toFixed(2)">{{scope.row.maxPrice!=null ? (Number(scope.row.maxPrice)/100).toFixed(2) :'--'}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="发布实体" min-width="60">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.userGroupName">{{scope.row.userGroupName ? scope.row.userGroupName :'--'}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" min-width="60">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.createTime">{{scope.row.createTime ? scope.row.createTime :'--'}}</div>
                    </template>
                </el-table-column>

                <div slot="empty" class="table_slot_empty_text">
                    <div><img src="../../../layouts/images/nodata.png" /></div>
                    <div>暂无数据</div>
                </div>
            </el-table>
            <div class="pagination-section">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" background :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import TableHeight from "~/mixins/tableheight";
import Search from "~/components/common/Search";
import SearchResult from "~/components/common/SearchResult.vue";
import MoreOperating from "~/components/common/MoreOperatingChannelPrice";
import Modal from "~/components/Modal";
import { mapActions, mapState } from "vuex";

export default {
  props: { operationId: Number, flag: String },
  name: "commodityReleaseList",
  mixins: [TableHeight],
  components: {
    Search,
    SearchResult,
    MoreOperating,
    Modal
  },
  data() {
    return {
      searchKey: "",
      commodityReleaseList: [],
      pageSize: 10,
      pageNo: 1,
      totalCount: 0,
      showResetButton: false,
      isShowSearchResult: false,
      isClick: false,
      searchItemValueArray: [],
      isClear: false
    };
  },
  watch: {
    flag: function(nval, oval) {
      console.log(111);
      this.pageNo = 1;
      this.pageSize = 10;
      this.refreshPage();
    }
  },
  mounted() {
    console.log(222);
    this.refreshPage();
    this.setTableHeight(275);
  },
  methods: {
    ...mapActions([
      "groupSkuList",
      "groupSkuDelete",
      "showPageLoading",
      "hidePageLoading"
    ]),
    getReset() {
      console.log(333);
      this.showResetButton = false;
      this.isShowSearchResult = false;
      this.isClick = false;
      this.searchKey = "";
      this.refreshPage();
    },
    getDeleteItem(index) {
      this.searchItemValueArray.splice(index);
      this.isClear = true;
      this.searchKey = "";
      this.refreshPage();
    },
    refreshPage() {
      let that = this;
      this.showPageLoading();
      var resData = {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        searchKey: this.searchKey.trim()
      };
      this.groupSkuList(resData)
        .then(resp => {
          that.hidePageLoading();
          resp.result.forEach(one => {
            one.has_show_more = false;
            // 给记录添加是否已展开标记，true的话表示已经展开，false表示没有展开
          });
          that.commodityReleaseList = resp.result;
          that.totalCount = resp.totalCount;
        })
        .catch({});
    },
    //模糊查询
    onSearchGood(searchValue) {
      this.searchKey = searchValue;
      this.isClick = true;
      this.isClear = false;
      this.searchItemValueArray = [searchValue];
      this.refreshPage();
    },
    searchEnterFun(e) {
      var keyCode = window.event ? e.keyCode : e.which;
      //  console.log('回车搜索',keyCode,e);
      if (keyCode == 13 && this.searchKey) {
        this.refreshPage();
      } else {
        this.refreshPage();
      }
    },
    //点击删除
    clickDelete(row) {
      console.log(row, "删除项");
      this.$confirm(`确定删除选中的组合商品？`, `删除组合商品`, {
        confirmButtonText: "确定",
        type: "warning"
      }).then(() => {
        this.groupSkuDelete({ id: row.id })
          .then(resp => {
            this.hidePageLoading();
            this.refreshPage();
          })
          .catch({});
      });
    },
    handleSizeChange(nSize) {
      this.pageSize = nSize;
      this.refreshPage();
    },
    handleCurrentChange(nPage) {
      this.pageNo = nPage;
      this.refreshPage();
    }
  }
};
</script>
<style lang="scss">
.goods-list {
  .search-component {
    right: 0px;
  }
  .search {
    margin-top: 20px;
  }
}
</style>
