<template>
    <div class="goods-list">
      <div class="table-container">
        <div class="nav-top">
            <div class="nav-top-left">
                <div class="orderStatus">
                    <label>销售实体：</label>
                    <el-select v-model="params.saleUserGroupId"
                                placeholder="请选择"
                                clearable
                                @change="getType">
                        <el-option v-for="item in typeList"
                                    :key="item.userGroupId"
                                    :label="item.groupName"
                                    :value="item.userGroupId">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="search">
                <search @searchValue="onSearchGood" :showResetButton="showResetButton" @reset="getReset" :isShowSearchResult="isShowSearchResult" :count="totalCount" :showPlaceholder="'请输入商品名称/编码'"></search>
            </div>
        </div>
        <div class="search_result_container" v-if="searchItemValueArray.length>0">
            <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount" @deleteItem="getDeleteItem"></search-result>
        </div>
        <div class="table-wrapper">
            <el-table :data="tagList" border :height="tableHeight">
                <el-table-column label="销售实体" min-width="100">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.saleUserGroupName">{{scope.row.saleUserGroupName ? scope.row.saleUserGroupName : '--'}}</div>
                    </template>
                </el-table-column>
                <el-table-column min-width="50">
                    <template slot-scope="scope">
                        <div class="row-btn-show">
                            <div>
                                <more-operating @onDelete="deletetag(scope.row, 0)">
                                </more-operating>
                                <span style="padding: 0 7px;float:right;height:1px;"></span>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="商品名称" min-width="100">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.skuName">{{scope.row.skuName ? scope.row.skuName : '--'}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="sku编码" min-width="100">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.skuId">{{scope.row.skuId ? scope.row.skuId : '--'}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="仓库实体" min-width="100">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.storehouseUserGroupName">{{scope.row.storehouseUserGroupName ? scope.row.storehouseUserGroupName : '--'}}</div>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="仓库" min-width="100">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.storehouseName">{{scope.row.storehouseName ? scope.row.storehouseName : '--'}}</div>
                    </template>
                </el-table-column> -->

                <div slot="empty" class="table_slot_empty_text">
                    <div><img src="../../../layouts/images/nodata.png" /></div>
                    <div>暂无数据</div>
                </div>
            </el-table>
            <div class="pagination-section">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.pageNo" background :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                </el-pagination>
            </div>
        </div>
      </div>
    </div>
</template>
<script>
import TableHeight from "~/mixins/tableheight";
import Search from "~/components/common/Search";
import SearchResult from "~/components/common/SearchResult.vue";
import MoreOperating from "~/components/common/MoreOperatingDelete";
import Modal from "~/components/Modal";
import { mapActions, mapState } from "vuex";

export default {
  props: { operationId: Number, flag: String },
  name: "TagList",
  mixins: [TableHeight],
  components: {
    Search,
    SearchResult,
    MoreOperating,
    Modal
  },
  data() {
    return {
      tagList: [],
      totalCount: 0,
      showResetButton: false,
      isShowSearchResult: false,
      isClick: false,
      params: {
        pageSize: 10,
        pageNo: 1,
        searchKey: "",
        saleUserGroupId: ""
      },
      searchItemValueArray: [],
      isClear: false,
      typeList: []   //实体list
    };
  },
  watch: {
      flag: function(nval) {
            console.log(nval,"222")
            this.params.pageSize = 10;
            this.params.pageNo = 1;
            this.getReset();
        },
  },
  mounted() {
    console.log(222);
    this.refreshPage(this.params);
    this.setTableHeight(275);
    this.queryUserList();
  },
  methods: {
    ...mapActions([
      "saleSplitRuleDelete",
      "saleSplitRuleList",
      "userGroupAll",
      "showPageLoading",
      "hidePageLoading"
    ]),
    // 实体list
    queryUserList(){
        let groupName = sessionStorage.getItem("entityName");
        this.userGroupAll({"status": 1}).then((resp) => {
            this.typeList = resp.result;
        });
    },
    getReset() {
      console.log(333);
      this.showResetButton = false;
      this.isShowSearchResult = false;
      this.isClick = false;
      this.params.searchKey = "";
      this.params.saleUserGroupId = "";
      this.refreshPage(this.params);
    },
    getDeleteItem(index) {
      this.searchItemValueArray.splice(index);
      this.isClear = true;
      this.params.searchKey = "";
      this.params.saleUserGroupId = "";
      this.refreshPage(this.params);
    },
    // 实体查询
    getType(val) {
      console.log(val,"实体查询");
      if (val) {
          this.params.saleUserGroupId = Number(val);
      } else {
          this.params.saleUserGroupId = "";
      }
      let saleName = this.typeList.find(item => {
        return item.userGroupId === val;
      }).groupName;
      this.searchItemValueArray = [saleName];
      this.refreshPage(this.params);
    },
    //模糊查询
    onSearchGood(searchValue) {
      console.log(444);
      this.params.searchKey = searchValue;
      this.isSearch = true;
      this.isClear = false;
      this.searchItemValueArray = [searchValue];
      this.refreshPage(this.params);
    },
    refreshPage(nval) {
      this.showPageLoading();
      this.saleSplitRuleList(nval).then(resp => {
        this.tagList = resp.result;
        this.totalCount = resp.totalCount;
        this.hidePageLoading();
      });
    },
    searchEnterFun(e) {
      console.log(555);
      var keyCode = window.event ? e.keyCode : e.which;
      if (keyCode == 13 && this.params.searchKey) {
        this.refreshPage(this.params);
      } else {
        this.refreshPage(this.params);
      }
    },
    // 修改pagesize
    handleSizeChange(nSize) {
      console.log(666);
      this.params.pageSize = nSize;
      this.refreshPage(this.params);
    },
    // 修改页码
    handleCurrentChange(nPage) {
      console.log(777);
      console.log(nPage);
      this.params.pageNo = nPage;
      this.refreshPage(this.params);
    },
    // 删除标签
    deletetag(item, statu) {
      let confirmType = `warning`;
      let confirmText;
      if (statu === 0) {
        confirmText = `删除`;
      }
      this.$confirm(`确认${confirmText}选中的拆单规则？`, `${confirmText}拆单规则`, {
        confirmButtonText: "确定",
        type: confirmType
      })
        .then(() => {
          // console.log(item.id)
          this.saleSplitRuleDelete({ id: item.id }).then(res => {
            console.log(res);
            this.$message({
              type: "success",
              message: `${confirmText}拆单规则成功`
            });
            this.refreshPage(this.params);
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss">
.goods-list {
  .table-container {
    margin-top: 20px;
    .nav-top {
      display: flex;
      justify-content: space-between;
      .nav-top-left {
          display: flex;
          .el-input__inner {
            height: 34px;
            font-size: 12px;
            color: #666666;
            border: 1px solid #e0e0e0;
          }
      }
    }
    .table-wrapper {
      overflow-y: hidden;
      .row-btn-show div {
        color: black;
        cursor: default;
      }
    }
  }
  
}
</style>
