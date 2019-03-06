<template>
    <div class="commodity-list">
      <div class="nav-top">
          <div class="nav-top-left">
            <div class="productStatus">
                <label>商品状态：</label>
                <el-select v-model="userGroupQueryListParam.status" placeholder="请选择" @change="getType">
                    <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
          </div>
          <div class="search">
              <search @searchValue="getSearchValue" :isClear='isClear' :showPlaceholder="'输入商品名称或是编码进行查询'"></search>
          </div>
      </div>
        <div class="selectedUpOrDown">
            <label>已选{{selectedNum}}条：</label>
            <button v-if="userGroupQueryListParam.status!==1" @click="changeDownUserRelationProductFunction(1)">上架</button>
            <button v-if="userGroupQueryListParam.status!==2" @click="changeDownUserRelationProductFunction(2)">下架</button>
            <!-- <button v-if="userGroupQueryListParam.status!==3" @click="changeDownUserRelationProductFunction(3)">删除</button> -->
        </div>
        <div class="search_result_container" v-if="searchItemValueArray.length>0">
            <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount" @deleteItem="getDeleteItem"></search-result>
        </div>
        <div class="table-wrapper">
            <el-table :data="commodityList" border :height="tableHeight" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="NGOC 商品名称">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.skuName">{{scope.row.skuName}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="NGOC sku编码">
                    <template slot-scope="scope">
                        <div class="row-show color-676767" :title="scope.row.skuId">{{scope.row.skuId}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="商品状态">
                    <template slot-scope="scope">
                        <div class="row-show color-676767" :title="statusText[scope.row.status]">
                            <span :class="returnClass(scope.row.status)"></span>
                            {{statusText[scope.row.status]}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="批发价(元)">
                    <template slot-scope="scope">
                        <div class="row-show color-676767" :title="scope.row.vipPrice/100">{{scope.row.salePrice/100?scope.row.salePrice/100:'--'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="团购价(元)">
                    <template slot-scope="scope">
                        <div class="row-show color-676767" :title="scope.row.groupPrice/100">{{scope.row.groupPrice/100?scope.row.groupPrice/100:'--'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="会员价(元)">
                    <template slot-scope="scope">
                        <div class="row-show color-676767" :title="scope.row.salePrice/100">{{scope.row.vipPrice/100?scope.row.vipPrice/100:'--'}}
                        </div>
                    </template>
                </el-table-column>
                <div slot="empty" class="table_slot_empty_text">
                    <div><img src="../../../layouts/images/nodata.png" /></div>
                    <div>暂无数据</div>
                </div>
            </el-table>
            <div class="pagination-section">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="userGroupQueryListParam.pageNo" background :page-size="userGroupQueryListParam.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TableHeight from "~/mixins/tableheight";
import Search from "~/components/common/Search";
import SearchResult from "~/components/common/SearchResult.vue";

export default {
  name: "CommodityList",
  props: { operationId: Number, flag: String, level: Number },
  mixins: [TableHeight],
  components: {
    Search,
    SearchResult
  },
  data() {
    return {
      isClick: false,
      productName: "",
      oneGoodsList: [],
      skuArray: [],
      selectedNum: 0,
      userGroupQueryListParam: {
        pageSize: 10,
        pageNo: 1,
        cateIdFirst: "",
        cateIdSecond: "",
        cateIdThird: "",
        status: "",
        searchKey: ""
      },
      typeList: [
        { label: "全部类型", value: "" },
        { label: "上架中", value: 1 },
        { label: "下架中", value: 2 }
      ],
      statusText: {
        1: "上架中",
        2: "下架中",
        3: "已删除"
      },
      selectTableArray: [],
      searchItemValueArray: [],
      isClear: false
    };
  },
  watch: {
    level: function(cateLevel) {
      console.log(cateLevel, "level");
      this.level = cateLevel;
    },
    flag: function(nval, oval) {
      console.log(nval, oval, "flag");
      this.userGroupQueryListParam.pageSize = 10;
      this.userGroupQueryListParam.pageNo = 1;
      if (this.level == 1) {
        console.log(111111111);
        this.userGroupQueryListParam.cateIdFirst = nval;
        this.userGroupQueryListParam.cateIdSecond = "";
        this.userGroupQueryListParam.cateIdThird = "";
      } else if (this.level == 2) {
        console.log(222222222);
        this.userGroupQueryListParam.cateIdFirst = "";
        this.userGroupQueryListParam.cateIdSecond = nval;
        this.userGroupQueryListParam.cateIdThird = "";
      } else if (this.level == 3) {
        console.log(333333333);
        this.userGroupQueryListParam.cateIdFirst = "";
        this.userGroupQueryListParam.cateIdSecond = "";
        this.userGroupQueryListParam.cateIdThird = nval;
      }
      this.refreshPage();
    },
    operationId: function(nval) {
      console.log(nval, "operationId");
      this.refreshPage();
    }
  },
  computed: {
    ...mapState({
      commodityList: ({ userGroup }) =>
        userGroup.commodity.commodityListRelation.commodityList,
      totalCount: ({ userGroup }) =>
        userGroup.commodity.commodityListRelation.totalCount
    })
  },
  mounted() {
    this.setTableHeight(325);
    this.refreshPage();
  },
  methods: {
    ...mapActions([
      "userGroupQueryList",
      "userGroupChangeStatus",
      "userGroupDelete",
      "showPageLoading",
      "hidePageLoading"
    ]),
    refreshPage(param = this.userGroupQueryListParam) {
      this.showPageLoading();
      this.userGroupQueryListFunction(param);
    },
    getSearchValue(searchValue) {
      this.userGroupQueryListParam.searchKey = searchValue;
      this.searchItemValueArray = [searchValue];
      this.isClear = false;
      this.isClick = true;
      this.refreshPage();
    },
    getReset() {
      this.userGroupQueryListParam.searchKey = "";
      this.userGroupQueryListParam.status = "";
      this.isClick = false;
      this.refreshPage();
    },
    getDeleteItem(index) {
      this.searchItemValueArray.splice(index);
      this.isClear = true;
      this.userGroupQueryListParam.searchKey = "";
      this.refreshPage();
    },
    handleSelectionChange(val) {
      this.selectTableArray = val;
      this.selectedNum = val.length;
    },
    handleSizeChange(nSize) {
      this.userGroupQueryListParam.pageSize = nSize;
      this.refreshPage();
    },
    handleCurrentChange(nPage) {
      this.userGroupQueryListParam.pageNo = nPage;
      this.refreshPage();
    },
    getType(type) {
      this.userGroupQueryListParam.status = type;
      this.refreshPage();
    },
    userGroupQueryListFunction(param) {
      this.userGroupQueryList(param).then(reps => {
        console.log(reps);
        this.hidePageLoading();
      });
    },
    changeDownUserRelationProductFunction(type) {
      this.showPageLoading();
      let ids = [];
      if (this.selectTableArray.length <= 0) {
        this.$message({
          message: "请选择商品",
          type: "error"
        });
        return;
      }
      if (type === 3) {
        // 删除
        //  商品状态为1、2   选中即可删除不用判断长度
        for (let i = 0; i < this.selectTableArray.length; i++) {
          let item = this.selectTableArray[i];
          ids.push({ seqNo: this.selectTableArray[i].seqNo });
        }
        this.userGroupDelete({ ids: ids }).then(reps => {
          this.$message({
            message: `商品${this.statusText[type]}成功`,
            type: "success"
          });
          this.refreshPage();
        });
      } else {
        // 修改状态
        for (let i = 0; i < this.selectTableArray.length; i++) {
          let item = this.selectTableArray[i];
          if (item.status !== type) {
            ids.push({ seqNo: item.seqNo, status: type });
          }
        }
        if (ids.length <= 0) {
          this.$message({
            message: "当前选中项无符合操作条件的选项,请重新选择",
            type: "error"
          });
          return;
        }
        this.userGroupChangeStatus({ ids: ids }).then(reps => {
          this.$message({
            message: `商品${this.statusText[type]}成功`,
            type: "success"
          });
          this.refreshPage();
        }).catch(() => {
          this.hidePageLoading();
        })
      }
    },
    returnClass(status) {
      if (status === 1) {
        return " circle circle-67C23A";
      } else if (status === 2) {
        return " circle circle-FF6369";
      }
    }
  }
};
</script>

<style lang="scss">
.commodity-list {
  padding-top: 20px;
  position: relative;
  .nav-top {
      display: flex;
      justify-content: space-between;
      .nav-top-left {
          display: flex;
      }
  }
  .color-676767 {
    color: #676767;
  }
  .nav-title {
    display: flex;
    justify-content: space-between;
    margin: 0px 0px 16px;
    .search {
      margin-right: -11px;
    }
  }
  .productStatus {
    height: 34px;
    line-height: 34px;
    font-size: 12px;
    color: #333333;
    label {
      margin-right: 10px;
    }
    .el-input__inner {
      height: 34px;
      font-size: 12px;
      color: #666666;
      border: 1px solid #e0e0e0;
    }
  }
  .selectedUpOrDown {
    margin: 0px 0px 16px;
    label {
      font-size: 12px;
      color: #999999;
    }
    button {
      border: 1px solid #bfd9fe;
      border-radius: 3px;
      height: 34px;
      width: 70px;
      font-size: 13px;
      line-height: 34px;
      color: #3b8cff;
      background-color: #fff;
      outline: none;
      margin-right: 7px;
    }
  }
}
</style>;
