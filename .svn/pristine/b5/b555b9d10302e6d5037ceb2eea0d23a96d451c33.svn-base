<template>
    <div class="config-goods-list">
        <div class="search">
           <search @searchValue="getSearchValue" :showResetButton="showResetButton" @reset="getReset"
                    :isShowSearchResult="isShowSearchResult" :count="totalCount"></search>
        </div>
        <div class="table-wrapper">
            <div class="productStatus">
                <span>商品状态</span>
                <el-button size="small" @click="allType">全部类型</el-button>
                <el-button size="small" @click="GoUpShelves">上架</el-button>
                <el-button size="small" @click="GoDownShelves">下架</el-button>
            </div>
            <div class="selectedUpOrDown">
                <span>已选{{selectedNum}}条</span>
                <el-button size="small" v-if="isShowUpShelves">上架</el-button>
                <el-button size="small" v-if="isShowDownShelve">下架</el-button>
            </div>
            <el-table :data="configGoodsList" border :height="tableHeight" @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column label="NGOC商品名称" >
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.skuName" >{{scope.row.skuName}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="商品编码" >
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.skuId" >{{scope.row.skuId}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="商品状态" >
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.status" >{{scope.row.status}}</div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import TableHeight from "~/mixins/tableheight";
import Search from "~/components/common/Search";
export default {
  props: { operationId: String, flag: String },
  name: "GoodsList",
  mixins: [TableHeight],
  components: {
    Search
  },
  data() {
    return {
      productName: "",
      configGoodsList: [
        { skuName: "2018年半年畅听卡", skuId: "20180420", status: "上架" },
        { skuName: "2019年半年畅听卡", skuId: "20190420", status: "下架" }
      ],
      oneGoodsList: [],
      isShowUpShelves: true,
      isShowDownShelve: true,
      pageSize: 10,
      pageNo: 1,
      totalCount: 0,
      skuArray: [],
      showResetButton: false,
      isShowSearchResult: false,
      selectedNum: 0
    };
  },
  watch: {
    flag: function(nval, oval) {
      this.refreshPage(nval);
    }
  },
  mounted() {
    this.setTableHeight(235);
  },
  methods: {
    ...mapActions([
      "queryGoodsList",
      "queryGoodsListSku",
      "showPageLoading",
      "hidePageLoading"
    ]),
    refreshPage(nval) {
      console.log(nval, "nval~~~~~~~~~");
      // this.showPageLoading();
      // var resData ={
      //     pageSize: this.pageSize,
      //     pageNo: this.pageNo,
      //     searchContent: this.productName.trim(),
      //     cateId : nval
      // }
      // this.queryGoodsList(resData).then( resp => {
      //     this.hidePageLoading();
      //     resp.result.forEach(one => {
      //         one.has_show_more = false;
      //      // 给记录添加是否已展开标记，true的话表示已经展开，false表示没有展开
      //     });
      //     this.goodsList = resp.result;
      //     this.totalCount = resp.totalCount;
      // })
    },
    handleSelectionChange(val) {
      this.selectedNum = val.length;
      console.log(val, "多选时触发");
      //this.multipleSelection = val;
    },
    viewGoods(id) {
      this.$router.push(`/goods/view/${id}`);
      sessionStorage.setItem("cateId", this.flag);
    },
    showMore(index, row) {
      var id = row.productId;
      var reqData = {
        productId: id
      };
      this.queryGoodsListSku(reqData).then(resp => {
        resp.forEach(one => {
          one.isSubContent = true;
          one.productId = " ";
          one.productName = one.skuName;
          // one.sub_show = true          //给返回的子列表添加字段作为标记，true的时候表示是展开的内容，没有该字段表示不是展开的内容
        });
        // this.oneGoodsList.splice(0,this.oneGoodsList.length);
        // this.oneGoodsList.splice(0,0,...resp.result);
        resp.forEach(item => {
          item.skuAttrsNew = "";
          if (item.skuAttrs && item.skuAttrs.length > 0) {
            item.skuAttrs.forEach(one => {
              item.skuAttrsNew += one.attrValue + ",";
            });
            item.skuAttrsNew = item.skuAttrsNew.substring(
              0,
              item.skuAttrsNew.length - 1
            );
          }
        });
        this.oneGoodsList = resp;
        this.goodsList[index].sub_show_length = resp.length; //给展开的记录添加展开的内容长度标记
        this.goodsList.splice(index + 1, 0, ...this.oneGoodsList);
        this.goodsList[index].has_show_more = true; //设置标记已展开
      });
    },
    packUp(index, id) {
      let length = this.goodsList[index].sub_show_length; //获取要删除的长度
      this.goodsList.splice(index + 1, length); //删除展开的内容
      this.goodsList[index].has_show_more = false; //设置标记未展开
      this.goodsList[index].sub_show_length = 0;
    },
    handleSizeChange(nSize) {
      this.pageSize = nSize;
      this.refreshPage(this.flag);
    },
    handleCurrentChange(nPage) {
      this.pageNo = nPage;
      this.refreshPage(this.flag);
    },
    getReset() {
      // this.showResetButton = false;
      // this.isShowSearchResult = false;
      // this.param.searchContent = "";
      // this.isSearch = false;
      // this.refreshPage(this.param)
    },
    getSearchValue(searchValue) {
      console.log(searchValue);
      // this.param.pageSize = 10;
      // this.param.pageNo = 1;
      // //this.param.searchContent = searchValue;
      // this.isSearch = true;
      // this.refreshPage(this.param);
    },
    allType() {
      this.isShowUpShelves = true;
      this.isShowDownShelve = true;
    },
    GoUpShelves() {
      this.isShowUpShelves = false;
      this.isShowDownShelve = true;
    },
    GoDownShelves() {
      this.isShowUpShelves = true;
      this.isShowDownShelve = false;
    }
  }
};
</script>
<style lang="scss">
.config-goods-list {
  .search {
    margin: 20px 20px 0;
  }
  .productStatus,
  .selectedUpOrDown {
    margin: 0 0 20px;
  }
  .backgBlue {
    background-color: red;
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
  .el-table th:nth-child(2) {
    border-left: none;
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
/*.el-pagination {*/
/*.btn-prev, .btn-next{*/
/*i{*/
/*visibility: hidden;*/
/*}*/
/*}*/
/*.btn-prev{*/
/*&:before{*/
/*content:"上一页"*/
/*}*/
/*}*/
/*.btn-next{*/
/*&:before{*/
/*content:"下一页"*/
/*}*/
/*}*/
/*}*/
</style>
