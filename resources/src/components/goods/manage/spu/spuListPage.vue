   <template>
    <div class="purchase-list">
        <div class="table-container">
            <div class="nav-top">
                <!-- <div class="select-date-container">
                    <select-date-interval @date="getDate" :isReset="isResetDate"></select-date-interval>
                </div> -->
                <div class="search-container">
                    <search @searchValue="getSearchValue"
                            :isClear='isClear'
                            :showPlaceholder="'输入产品名称或者编码'"></search>
                </div>
            </div>
            <div class="search_result_container" v-if="searchItemValueArray.length>0">
                <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount"
                               @deleteItem="getDeleteItem"></search-result>
            </div>
            <div class="table-wrapper">
                <el-table :data="purchaseList" border
                          class="setFixedHeight"
                          ref="purchaseList">
                          
                    <el-table-column label="产品名称">
                      <template slot-scope="scope">
                          <div class="row-btn-show">
                              <div class="row-show" :title="scope.row.productName">{{scope.row.productName}}</div>
                              <div class="operate-container">
                                  <more-operating
                                      :buttonList="getButtonList()"
                                      @onClick="onClickOperateButton"
                                      :row="scope.row"></more-operating>
                              </div>
                          </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="产品编码" prop="productId"></el-table-column>
                    <el-table-column label="品牌" prop="brandCnName"></el-table-column>
                    <el-table-column label="一级品类" prop="cateIdFirstName"></el-table-column>
                    <el-table-column label="二级品类" prop="cateIdSecondName"></el-table-column>
                    <el-table-column label="产品简介" prop="productInfo" ></el-table-column>
                    
                    <div slot="empty" class="table_slot_empty_text">
                        <div><img src="../../../../layouts/images/nodata.png"/></div>
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
import MoreOperating from "~/components/common/MoreOperating";
import PlatformMixins from "~/mixins/platform";
import misc from "~/utils/misc";
import ConfirmStockInModal from "~/components/common/ConfirmStockInModal.vue";
import SearchResult from "~/components/common/SearchResult.vue";

export default {
  name: "SpuListPage",
  data() {
    return {
      param: {
        pageSize: 10,
        pageNo: 1,
        searchKey: "",
        cateIdFirst: "",
        cateIdSecond: "",
        cateIdThird: ""
      },
      levelNum: 0,
      selected: [],
      isStockInDialogVisible: false,
      isRemarkDialogVisible: false,
      remark: "",
      // pickerOptions: {
      //   disabledDate(time) {
      //     return time.getTime() < Date.now() - 8.64e7;
      //  }
      //},
      purchaseList: [],
      totalCount: 0,
      buttonList: [],
      //isResetDate: false,
      addSuccessType: false,
      row: {},
      searchItemValueArray: [],
      isClear: false
    };
  },
  mixins: [TableHeightMixins, PlatformMixins], //判断高度，
  components: {
    Search,
    MoreOperating, //Modal, selectDateInterval,
    ConfirmStockInModal,
    SearchResult
  },
  props: { operationId: Number, flag: String, level: Number },
  watch: {
    level: function(cateLevel) {
      console.log(cateLevel, "level");
      this.levelNum = cateLevel;
    },
    flag: function(nval, oval) {
      console.log(nval, oval, "flag");
      this.param.pageSize = 10;
      this.param.pageNo = 1;
      if (this.levelNum == 1) {
        console.log(111111111);
        this.param.cateIdFirst = nval;
        this.param.cateIdSecond = "";
        this.param.cateIdThird = "";
      } else if (this.levelNum == 2) {
        console.log(222222222);
        this.param.cateIdFirst = "";
        this.param.cateIdSecond = nval;
        this.param.cateIdThird = "";
      } else if (this.levelNum == 3) {
        console.log(333333333);
        this.param.cateIdFirst = "";
        this.param.cateIdSecond = "";
        this.param.cateIdThird = nval;
      }
      this.refreshPage();
    },
    operationId: function(nval) {
      console.log(nval, "operationId");
      this.refreshPage();
      this.addSuccessType = true;
    }
  },
  computed: {
    ...mapState({})
  },
  mounted() {
    // this.refreshPage();
    // this.setTableHeight(275);
  },
  methods: {
    ...mapActions([
      "spuListPage",
      "deleteSpu",
      "showPageLoading",
      "hidePageLoading"
    ]),
    handleSizeChange(nSize) {
      console.log(nSize, "1111111");
      this.param.pageSize = nSize;
      this.refreshPage();
    },
    handleCurrentChange(nPage) {
      console.log(nPage, "2222222");
      this.param.pageNo = nPage;
      this.refreshPage();
    },
    refreshPage(param = this.param) {
      this.showPageLoading();
      this.spuListPageFunction(param);
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
    spuListPageFunction(param) {
      this.spuListPage(param)
        .then(resp => {
          this.hidePageLoading();
          this.purchaseList = resp.result;
          console.log(this.purchaseList);
          // this.allList = resp.result
          this.totalCount = resp.totalCount;
          this.$emit("getCardTypeAllList", resp.result);
        })
        .catch(err => {
          this.purchaseList = [];
          this.totalCount = 0;
          this.hidePageLoading();
        });
    },
    queryWaitStockInProductFunction(row) {
      this.isStockInDialogVisible = true;
      this.row = row;
    },
    //重置页面
    getReset() {
      this.param.searchKey = "";
      //this.isResetDate = true;
      this.refreshPage();
    },
    getDeleteItem(index) {
      this.searchItemValueArray.splice(index);
      this.isClear = true;
      this.param.searchKey = "";
      this.refreshPage();
    },

    deleteSpuFunction(productId) {
      this.$confirm("确认删除此条SPU产品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = { productId: productId };
          //console.log()
          this.deleteSpu(params).then(resp => {
            this.$message("删除spu产品成功");
            this.refreshPage();
          });
        })
        .catch(() => {});
    },

    getButtonList() {
      let buttonArray = [
        { type: "delete", text: "删除" },
        { type: "edit", text: "编辑" },
        { type: "details", text: "详情" }
      ];
      return buttonArray;
    },
    onClickOperateButton(type, row) {
      let productId = row.productId;
      if (type === "delete") {
        this.deleteSpuFunction(productId);
      } else if (type === "edit") {
        this.$router.push(`/goods/spu/spuEdit/${productId}`);
      } else if (type === "details") {
        this.$router.push(`/goods/spu/infoSpu/${productId}`);
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.purchase-list {
  height: 100%;
  padding: 20px 0 0 0;
  .table-wrapper {
    height: 100%;
    .el-table__header,
    .el-table__body {
      width: 100%;
    }
  }
}
</style>