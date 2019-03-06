<template>
    <div class="create-commodity-bigBox">
        <div class="create-commodity">
            <div class="content-wrapper">
                <div class="nav-top">
                    <div class="productStatus">
                        <label>商品分类：</label>
                        <div class="cate-select-container">
                            <div class="cate-item-container" v-if="cateIdOne.isShow">
                                <el-select v-model="userGroupQuerySkuListParam.cateIdFirst" placeholder="请选择"
                                           clearable
                                           @change="getCateIdOne">
                                    <el-option
                                        v-for="item in cateIdOne.cateList"
                                        :key="item.cateId"
                                        :label="item.cateName"
                                        :value="item.cateId">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="cate-item-container" v-if="cateIdTwo.isShow">
                                <el-select v-model="userGroupQuerySkuListParam.cateIdSecond" placeholder="请选择"
                                           clearable
                                           @change="getCateIdTwo">
                                    <el-option
                                        v-for="item in cateIdTwo.cateList"
                                        :key="item.cateId"
                                        :label="item.cateName"
                                        :value="item.cateId">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="cate-item-container" v-if="cateIdThree.isShow">
                                <el-select v-model="userGroupQuerySkuListParam.cateIdThird" placeholder="请选择" clearable
                                           @change="getCateIdThree">
                                    <el-option
                                        v-for="item in cateIdThree.cateList"
                                        :key="item.cateId"
                                        :label="item.cateName"
                                        :value="item.cateId">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="search">
                        <search @searchValue="getSearchValue"
                                :isClear='isClear'
                                :showPlaceholder="'输入商品名称或是编码进行查询'"></search>
                    </div>
                </div>
                <div class="search_result_container" v-if="searchItemValueArray.length>0">
                    <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount"
                                   @deleteItem="getDeleteItem"></search-result>
                </div>
                <p class="selectNum">已选中{{selectedNum}}条
                </p>
                <div class="table-wrapper">
                    <el-table
                        ref="commodityTable"
                        :data="commodityList"
                        border
                        @select="handSelect"
                        @select-all="handSelect"
                    >
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column label="商品名称">
                            <template slot-scope="scope">
                                <div class="row-show" :title="scope.row.skuName">{{scope.row.skuName?scope.row.skuName:'--'}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="sku编码">
                            <template slot-scope="scope">
                                <div class="row-show color-676767" :title="scope.row.skuId">{{scope.row.skuId?scope.row.skuId:'--'}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="单位">
                            <template slot-scope="scope">
                                <div class="row-show color-676767" :title="scope.row.unitName">{{scope.row.unitName?scope.row.unitName:'--'}}
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
                    </el-table>
                    <div class="pagination-section">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                       :current-page.sync="userGroupQuerySkuListParam.pageNo" background
                                       :page-size="userGroupQuerySkuListParam.pageSize"
                                       layout="total, sizes, prev, pager, next, jumper"
                                       :total="totalCount"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="submitBtn">
                <el-button type="primary" @click="userGroupAddFunction">添加</el-button>
                <el-button @click="quit(routesMapping.userGroupProduct)">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PlatformMixins from "~/mixins/platform";
import Search from "~/components/common/Search";
import QuitMixins from "~/mixins/quit";
import SearchResult from "~/components/common/SearchResult.vue";

export default {
  name: "UserGroupProductAdd",
  data() {
    return {
      isClick: false,
      selectedNum: 0,
      cateId: "",
      cateIdLength: [],
      cateIdFirst: "",
      cateIdSecond: "",
      cateIdThird: "",
      cateIdOne: {
        isShow: true,
        cateList: []
      },
      cateIdTwo: {
        isShow: false,
        cateList: []
      },
      cateIdThree: {
        isShow: false,
        cateList: []
      },
      selectArray: [],
      userGroupQuerySkuListParam: {
        pageSize: 10,
        pageNo: 1,
        cateId: "",
        cateIdFirst: "",
        cateIdSecond: "",
        cateIdThird: "",
        searchKey: ""
      },
      selectAllObject: {},
      prePageSub: 1,
      isChange: false,
      searchItemValueArray: [],
      isClear: false
    };
  },
  computed: {
    ...mapState({
      cate: ({category}) => {return category.all},
      commodityList: ({ userGroup }) =>
        userGroup.commodity.commodityListUnRelation.commodityList,
      totalCount: ({ userGroup }) =>
        userGroup.commodity.commodityListUnRelation.totalCount
    })
  },
  mixins: [PlatformMixins, QuitMixins],
  components: {
    Search,
    SearchResult
  },
  mounted() {
    this.refreshPage();
    this.manageCategoryAll().then(resp => {
      console.log(resp,"123321");
      this.cateIdOne.cateList = [
        { level: "", cateId: "", cateName: "全部分类", childs: [] },
        ...this.cate
      ];
    });
  },
  methods: {
    ...mapActions([
      "userGroupUnRelationProduct",
      "manageCategoryAll",
      "userGroupAdd",
      "showPageLoading",
      "hidePageLoading"
    ]),
    refreshPage(param = this.userGroupQuerySkuListParam) {
      this.showPageLoading();
      this.userGroupQuerySkuListFunction(param);
    },
    getSearchValue(searchValue) {
      this.userGroupQuerySkuListParam.searchKey = searchValue;
      this.isClick = true;
      this.searchItemValueArray = [searchValue];
      this.isClear = false;
      this.refreshPage();
    },
    getReset() {
      this.userGroupQuerySkuListParam.searchKey = "";
      this.isClick = false;
      this.userGroupQuerySkuListParam.cateIdFirst = "";
      this.userGroupQuerySkuListParam.cateIdSecond = "";
      this.userGroupQuerySkuListParam.cateIdThird = "";
      this.cateIdTwo.isShow = false;
      this.cateIdTwo.cateList = [];
      this.cateIdThree.isShow = false;
      this.userGroupQuerySkuListParam.pageNo = 1;
      this.resetSelectData();
      this.refreshPage();
    },
    getDeleteItem(index) {
      this.searchItemValueArray.splice(index);
      this.isClear = true;
      this.userGroupQuerySkuListParam.searchKey = "";
      this.refreshPage();
    },
    handleSizeChange(nSize) {
      this.userGroupQuerySkuListParam.pageSize = nSize;
      this.resetSelectData();
      this.refreshPage();
    },
    handleCurrentChange(nPage) {
      const page = this.prePageSub;
      //判断当前页是否有选中的数据，如果有就保留，没有就赋值
      typeof this.selectAllObject[page] === "undefined"
        ? (this.selectAllObject[page] = {})
        : this.selectAllObject[page];
      typeof this.selectAllObject[page].commodityList === "undefined"
        ? (this.selectAllObject[page].commodityList = [])
        : this.selectAllObject[page].commodityList;
      //判断当前选中是否有改变
      this.isChange === true
        ? (this.selectAllObject[page].commodityList = this.selectArray)
        : this.selectAllObject[page].commodityList;
      this.userGroupQuerySkuListParam.pageNo = nPage;
      this.prePageSub = nPage;
      this.refreshPage();
      this.selectArray = [];
      this.isChange = false;
    },
    handSelect(selection) {
      this.selectArray = selection;
      this.isChange = true;
      let num = 0;
      //计算选中的条数
      for (let item in this.selectAllObject) {
        if (Number(item) !== Number(this.userGroupQuerySkuListParam.pageNo)) {
          if (
            this.selectAllObject[item].commodityList &&
            this.selectAllObject[item].commodityList.length > 0
          ) {
            num += this.selectAllObject[item].commodityList.length;
          }
        }
      }
      this.selectedNum = num + selection.length;
    },
    resetSelectData() {
      this.prePageSub = 1;
      this.isChange = false;
      this.selectAllObject = {};
      this.selectedNum = 0;
    },
    initSelect() {
      this.cateIdTwo.isShow = false;
      this.cateIdThree.isShow = false;
    },
    getCateIdOne(val) {
      this.userGroupQuerySkuListParam.cateId = val;
      let findiItem = this.cateIdOne.cateList.find(item => {
        return item.cateId === val;
      });
      if (findiItem && findiItem.childs && findiItem.childs.length > 0) {
        this.userGroupQuerySkuListParam.cateIdSecond = ""
        this.userGroupQuerySkuListParam.cateIdThird = ""
        this.cateIdTwo.isShow = true;
        this.cateIdTwo.cateList = findiItem.childs;
        this.cateIdThree.isShow = false;
      } else {
        this.initSelect();
      }
      this.userGroupQuerySkuListParam.pageNo = 1;
      this.resetSelectData();
      this.refreshPage();
    },
    getCateIdTwo(val) {
      if (val && val !== null) {
        this.userGroupQuerySkuListParam.cateId = val;
      } else {
        this.userGroupQuerySkuListParam.cateId = this.cateIdFirst;
      }
      let findiItem = this.cateIdTwo.cateList.find(item => {
        return item.cateId === val;
      });
      this.userGroupQuerySkuListParam.cateIdThird = ""
      if (findiItem && findiItem.childs && findiItem.childs.length > 0) {
        this.cateIdThree.isShow = true;
        this.cateIdThree.cateList = findiItem.childs;
      } else {
        this.cateIdThree.isShow = false;
      }
      this.userGroupQuerySkuListParam.pageNo = 1;
      this.resetSelectData();
      this.refreshPage();
    },
    getCateIdThree(val) {
      if (val && val !== null) {
        this.userGroupQuerySkuListParam.cateId = val;
      } else {
        this.userGroupQuerySkuListParam.cateId = this.cateIdSecond;
      }
      this.userGroupQuerySkuListParam.pageNo = 1;
      this.resetSelectData();
      this.refreshPage();
    },
    userGroupQuerySkuListFunction(param) {
      this.userGroupUnRelationProduct(param).then(resp => {
        this.hidePageLoading();
        const page = this.prePageSub;
        if (
          this.selectAllObject[page] &&
          this.selectAllObject[page].commodityList &&
          this.selectAllObject[page].commodityList.length > 0
        ) {
          for (
            let i = 0;
            i < this.selectAllObject[page].commodityList.length;
            i++
          ) {
            let commodityListItem = this.selectAllObject[page].commodityList[i];
            //判断当前页是否需要选中的行
            let index = this.commodityList.findIndex(item => {
              return item.skuId === commodityListItem.skuId;
            });
            if (index >= 0) {
              this.$refs.commodityTable.toggleRowSelection(
                this.commodityList[index],
                true
              );
            }
          }
        }
      });
    },
    userGroupAddFunction() {
      if (Number(this.selectedNum) <= 0) {
        this.$message({
          message: "请选择商品",
          type: "error"
        });
        return;
      }
      let skuIds = [];
      const page = this.prePageSub;
      typeof this.selectAllObject[page] === "undefined"
        ? (this.selectAllObject[page] = {})
        : this.selectAllObject[page];
      this.isChange === true
        ? (this.selectAllObject[page].commodityList = this.selectArray)
        : this.selectAllObject[page].commodityList;
      //push选中数据到数组里面
      console.log(this.selectAllObject, 999);
      for (let item in this.selectAllObject) {
        if (
          this.selectAllObject[item].commodityList &&
          this.selectAllObject[item].commodityList.length > 0
        ) {
          for (
            let j = 0;
            j < this.selectAllObject[item].commodityList.length;
            j++
          ) {
            let commodityListItem = this.selectAllObject[item].commodityList[j];
            skuIds.push({
              skuId: commodityListItem.skuId,
              productId: commodityListItem.productId,
              vipPrice: commodityListItem.vipPrice,
              groupPrice: commodityListItem.groupPrice,
              salePrice: commodityListItem.salePrice
            });
          }
        }
      }
      this.userGroupAdd({ skuList: skuIds }).then(resp => {
        this.$message({
          message: `添加实体可用商品成功`,
          type: "success"
        });
        this.quit(this.routesMapping.userGroupProduct);
      });
    }
  }
};
</script>

<style lang="scss">
.create-commodity-bigBox {
  padding: 10px 30px 0px 30px;
  height: 100%;
}

.create-commodity {
  height: 100%;
  background-color: #fff;
  .color-676767 {
    color: #676767;
  }
  .content-wrapper {
    padding: 20px 20px 0px 20px;
    background-color: #ffffff;
    position: relative;
    .nav-top {
      display: flex;
      justify-content: space-between;
    }
    .search {
      margin-right: -11px;
    }
    .productStatus {
      height: 34px;
      line-height: 34px;
      font-size: 12px;
      color: #333333;
      /*position: absolute;*/
      /*right:20px;*/
      /*top:20px;*/
      width: auto;
      label {
        margin-right: 10px;
      }
      .el-input__inner {
        height: 34px;
        font-size: 12px;
        color: #666666;
        border: 1px solid #e0e0e0;
      }
      .cate-select-container {
        display: inline-block;
        .cate-item-container {
          display: inline-block;
        }
        .cate-item-container:not(:last-child) {
          margin-right: 10px;
        }
      }
    }
    .selectNum {
      font-size: 12px;
      color: #999999;
      line-height: 12px;
      margin-bottom: 16px;
    }
  }
  .submitBtn {
    text-align: center;
    padding: 20px;
    background-color: white;
    .el-button {
      font-size: 13px;
      width: 90px;
      padding: 10px 20px;
    }
    .el-button--default {
      border: 1px solid #bfd9fe;
      color: #3b8cff;
    }
  }
}
</style>
