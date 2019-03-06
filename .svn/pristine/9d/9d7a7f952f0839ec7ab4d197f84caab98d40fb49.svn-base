<template>
<div class="main-wrapper">
  <div class="unit-list">
        <div class="topBox">
            <search @searchValue="onSearchGood" :showResetButton="showResetButton" @reset="getReset" :isShowSearchResult="isShowSearchResult" :count="totalCount" :showPlaceholder="'搜索结果'"></search>
            <el-button type="primary" size="small" style="width:90px;" @click="submitCreateUnit">添加计量</el-button>
        </div>
        <div class="search_result_container" v-if="searchItemValueArray.length>0">
                <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount"
                               @deleteItem="getDeleteItem"></search-result>
            </div>
        <div class="table-wrapper">
            <el-table :data="unitList" border :height="tableHeight">
                <!-- <el-table-column width="30">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isSubContent">
                            <div class="showMoreColor">
                                <i class="row-show" :class="scope.row['has_show_more'] ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
                            </div>
                        </div>
                    </template>
                </el-table-column> -->

                <el-table-column label="计量名称" min-width="200">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.unitName">{{scope.row.unitName ? scope.row.unitName : '--'}}</div>
                    </template>
                </el-table-column>

                <el-table-column label="计量单位" min-width="200">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.unitEntity">{{scope.row.unitEntity ? scope.row.unitEntity :'--'}}</div>
                    </template>
                </el-table-column>

                <el-table-column label="计量值" min-width="200">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.unitValue">{{scope.row.unitValue ? scope.row.unitValue :'--'}}</div>
                    </template>
                </el-table-column>

                <el-table-column label="基本计量值" min-width="200">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.unitBasicValue">{{scope.row.unitBasicValue ? scope.row.unitBasicValue :'--'}}</div>
                    </template>
                </el-table-column>

                <el-table-column label="基本计量单位" min-width="200">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.unitBasicEntity">{{scope.row.unitBasicEntity ? scope.row.unitBasicEntity :'--'}}</div>
                    </template>
                </el-table-column>

                <el-table-column label="状态" min-width="300">
                    <template slot-scope="scope">
                        <!-- <div class="row-show" :title="scope.row.status" @change="changeStatus(scope.row)">{{scope.row.status ? scope.row.status :'0'}}</div> -->
                        <el-select v-model="scope.row.status" size="small" @change="progressTypeFun(scope.row)">
                            <el-option v-for="(item,n) in contractStatusOpt" :key="item.status" :label="item.name" :value="item.status">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <div slot="empty" class="table_slot_empty_text">
                    <div><img src="../../../../layouts/images/nodata.png" /></div>
                    <div>暂无数据</div>
                </div>
            </el-table>
            <div class="pagination-section">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" background :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
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
import MoreOperating from "~/components/common/MoreOperatingChannelPrice";
import Modal from "~/components/Modal";
import PlatformMixins from "~/mixins/platform";
import { mapActions, mapState } from "vuex";

export default {
  name: "unit",
  components: {
    Search,
    SearchResult,
    MoreOperating,
    Modal
  },
  mixins: [TableHeight, PlatformMixins],
  data() {
    return {
      searchKey: "",
      oneGoodsList: [],
      pageSize: 10,
      pageNo: 1,
      totalCount: 0,
      status: -1,
      contractStatusOpt: [
        { status: 0, name: "启用" },
        { status: 1, name: "禁用" },
        { status: 2, name: "删除" }
      ],
      showResetButton: false,
      isShowSearchResult: false,
      isClick: false,
      unitList: [],
      searchItemValueArray: [],
      isClear: false
    };
  },
  watch: {
    // changeUnitlist: function(a, b) {
    //   console.log(a, b);
    //   if (a != b) {
    //     this.refreshPage({
    //       pageSize: this.pageSize,
    //       pageNo: this.pageNo,
    //       status: this.status,
    //       unitName: this.searchKey
    //     });
    //   }
    // },
    operationId: function (a, b) {
      console.log(a, b);
      if (a != b) {
        this.refreshPage();
      }
    }
  },
  computed: {
    ...mapState({
      changeUnitlist: ({ unit }) => {
        return unit.isChangeUnitList;
      }
    })
  },
  mounted() {
    console.log(222);
    this.setTableHeight(275);
    this.refreshPage();
  },
  methods: {
    ...mapActions([
      "manageUnitChangeStatus",
      "manageUnitList",
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
      this.showPageLoading();
      this.manageUnitList({
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        status: this.status,
        unitName: this.searchKey
      }).then(resp => {
        this.unitList = resp.result;
        this.totalCount = resp.totalCount;
        this.hidePageLoading();
      });
    },
    //模糊查询
    onSearchGood(searchValue) {
      console.log(444);
      this.searchKey = searchValue;
      this.isClick = true;
      this.isClear = false;
      this.searchItemValueArray = [searchValue];
      this.refreshPage();
    },
    searchEnterFun(e) {
      console.log(555);
      var keyCode = window.event ? e.keyCode : e.which;
      //  console.log('回车搜索',keyCode,e);
      if (keyCode == 13 && this.searchKey) {
        this.refreshPage();
      } else {
        this.refreshPage();
      }
    },
    // 修改pagesize
    handleSizeChange(nSize) {
      console.log(666);
      this.pageSize = nSize;
      this.refreshPage();
    },
    // 修改页码
    handleCurrentChange(nPage) {
      console.log(777);
      console.log("修改page");
      this.pageNo = nPage;
      this.refreshPage();
    },
    // 新增计量
    submitCreateUnit() {
      this.$router.push(`/goods/setting/unitAdd`);
    },
    // change 状态
    //修改状态
    progressTypeFun(data) {
      console.log(data);
      this.manageUnitChangeStatus({
        unitId: data.unitId,
        status: data.status
      }).then(res => {
        console.log(res);
        if (res) {
          this.$message({
            type: "success",
            message: `修改计量状态` + res.msg
          });
          this.refreshPage();
        } else {
          this.$message({
            type: "warning",
            message: `修改计量状态失败`
          });
        }
      }).catch((err) => {
        this.$message({
            type: "warning",
            message: `修改计量状态` + err.msg
          });
      });;
    },
    onPageRefresh() {
      this.operationId = this.operationId + 1;
    }
  }
};
</script>
<style lang="scss">
.main-wrapper {
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: relative;
} 
.unit-list {
  padding: 20px 40px;
  .topBox {
    .search-component {
      right: 0px;
      top: -10px;
      display: inline-flex;
    }
  }
  .table-wrapper {
    overflow-y: hidden;
    .row-btn-show div {
      color: black;
      cursor: default;
    }
  }
  .handleButtonContainer {
    width: 26px;
    height: 26px;
    line-height: 26px;
    border-radius: 50%;
    background-color: #eceff1;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    margin-right: 10px;
  }
  .el-table th:first-child {
    border-right: none;
  }
}

.el-tooltip__popper.is-light {
  background: #fff;
  border: 1px solid #eee;
}

.el-tooltip__popper.is-light[x-placement^="bottom"] .popper__arrow {
  border-bottom-color: #eee;
}

.el-input-group__prepend {
  background-color: #fff;
}

.el-input-group--prepend .el-input__inner,
.el-input-group__append {
  border-left: 0px;
  padding-left: 0;
}

.el-button + .el-button {
  margin-left: 10px;
}

.iconColor {
  color: black;
}

.showMoreColor {
  cursor: pointer;
  &:hover {
    color: #3b8cff;
  }
}
</style>
