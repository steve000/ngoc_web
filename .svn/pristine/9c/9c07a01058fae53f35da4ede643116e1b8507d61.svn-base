<template>
    <div class="channel-list">
        <el-button @click="isEditChannelModalVisible=true">显示</el-button>
        <div class="table-wrapper">
            <el-table :data="channelList" border :height="tableHeight" width="100%">
                <el-table-column label="渠道名" prop="purchaseId" min-width="170">
                    <template slot-scope="scope">
                        <div class="row-btn-show ">
                            <div class="row-show" :title="scope.row.purchaseId"
                                 @click="">{{scope.row.purchaseId}}
                            </div>
                            <div class="operate-container">
                                <el-button type="text" class="mr15">启用
                                </el-button>
                                <el-button type="text" class="mr15">停用
                                </el-button>
                                <more-operating
                                    :buttonList="getButtonList"
                                    @onClick="onClickOperateButton"
                                    :row="scope.row"></more-operating>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="渠道状态" prop="storehouseName" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.storehouseName">{{scope.row.storehouseName}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="创始人" prop="supplier" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.supplier">{{scope.row.supplier}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="totalAmount" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.totalAmount">{{scope.row.totalAmount}}</div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-section">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page.sync="pageNo" background
                               :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                               :total="totalCount">
                </el-pagination>
            </div>
        </div>
        <div class="channel-modal-container">
            <modal title="编辑渠道"
                   width="80%"
                   :value="isEditChannelModalVisible"
                   @close="isEditChannelModalVisible=false">
                <el-form label-position="left"
                         label-width="110px"
                         :model="editChannelForm"
                         :rules="rules"
                         ref="editChannelForm">
                    <div class="flex-container">
                        <div class="flex-item">
                            <el-form-item label="渠道名：">
                                <el-input v-model="editChannelForm.channelName" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="flex-container">
                        <div class="flex-item">
                            <el-form-item label="备注：">
                                <el-input v-model="editChannelForm.channelName" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="flex-container">
                        <div class="flex-item">
                            <el-form-item label="渠道售卖商品：">
                                <el-button size="small">导入Excel</el-button>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="channel-table-wrapper">
                        <table width="100%" >
                            <thead>
                            <th width="260" style="padding-left:20px">NGOC商品名称</th>
                            <th>NGOC商品编码</th>
                            <th>渠道商品名称</th>
                            <th>渠道商品编码</th>
                            <th>销售方式</th>
                            <th>销售单价/元</th>
                            <th>备注</th>
                            </thead >
                            <tr v-for="(one,index) in channelProductList">
                                <td width="260">
                                    <!--<el-select v-model="one.skuId"-->
                                               <!--style="width: 250px"-->
                                               <!--:filter-method="skuNameFilter"-->
                                               <!--filterable-->
                                               <!--clearable-->
                                               <!--size="small"-->
                                               <!--popper-class="max-length"-->
                                               <!--placeholder="请选择或输入商品的名字"-->
                                               <!--@clear="clearSkuId(index)"-->
                                               <!--@change="queryProductDetail(one.skuId,index)"-->
                                               <!--class="text-dash-show"-->
                                    <!--&gt;-->
                                        <!--<el-option-->
                                            <!--v-for="(item,n) in productList"-->
                                            <!--:key="item.skuId"-->
                                            <!--:label="item.skuName"-->
                                            <!--:value="item.skuId">-->
                                        <!--</el-option>-->
                                    <!--</el-select>-->
                                </td>
                                <td :title="one.skuId" v-if="one.skuId">{{one.skuId}}</td>
                                <td v-else>--</td>
                                <td :title="one.unitName" v-if="one.unitName">{{one.unitName}}</td>
                                <td v-else>--</td>
                                <td :title="one.purchasePrice">
                                    <el-input class="table-input" size="small" type="number" v-model="one.purchasePrice" :min="0" @keyup.native="setValue1(one,index)"></el-input>
                                </td>
                                <td :title="one.purchaseCount">
                                    <el-input class="table-input" size="small" type="number" v-model="one.purchaseCount" :min="0" @keyup.native="setValue(one,index)"placeholder="0"></el-input>
                                </td>
                                <td v-if="one.purchasePrice && one.purchaseCount">
                                    <el-input class="table-input" size="small" type="number" :value="getTotalMoney(one)" :disabled="true"></el-input>
                                </td>
                                <td v-else>--</td>
                                <td :title="one.comment">
                                    <div style="position: relative;">
                                        <el-input class="table-input" type="text" v-model="one.comment" size="small"></el-input>
                                        <div class="iconfont1 icon-shanchuhang" @click="deleteProduct(index)"></div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <!--<el-table :data="channelProductList" border width="100%">-->
                            <!--<el-table-column label="NGOC商品名称" prop="purchaseId" min-width="170">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<div class="row-show" :title="scope.row.purchaseId"-->
                                         <!--@click="">{{scope.row.purchaseId}}-->
                                    <!--</div>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column label="NGOC商品编码" prop="storehouseName" min-width="110">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<div class="row-show" :title="scope.row.storehouseName">-->
                                        <!--{{scope.row.storehouseName}}-->
                                    <!--</div>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column label="渠道商商品名称" prop="supplier" min-width="110">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<div class="row-show" :title="scope.row.supplier">{{scope.row.supplier}}</div>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column label="渠道商品编码" prop="totalAmount" min-width="110">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<div class="row-show" :title="scope.row.totalAmount">{{scope.row.totalAmount}}</div>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column label="销售方式" prop="totalAmount" min-width="110">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<div class="row-show" :title="scope.row.totalAmount">{{scope.row.totalAmount}}</div>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column label="销售单价/元" prop="totalAmount" min-width="110">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<div class="row-show" :title="scope.row.totalAmount">{{scope.row.totalAmount}}</div>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column label="备注" prop="totalAmount" min-width="110">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<div class="row-show" :title="scope.row.totalAmount">{{scope.row.totalAmount}}</div>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                        <!--</el-table>-->
                    </div>
                </el-form>
            </modal>
            <modal title="渠道修改历史"
                   :footerVisible="false"
                   :value="isEditChannelHistoryModalVisible"
                   @close="isEditChannelHistoryModalVisible=false" >
                <el-form label-position="left"
                         label-width="110px"
                         :model="editChannelForm"
                         :rules="rules"
                         ref="editChannelForm">
                    <div class="flex-container">
                        <div class="flex-item">
                            <el-form-item label="渠道名称：">
                                <el-input v-model="editChannelForm.channelName" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="flex-container">
                        <div class="flex-item">
                            <el-form-item label="备注：">
                                <el-input v-model="editChannelForm.channelName" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="channel-table-wrapper">
                        <el-table :data="channelProductList" border width="100%">
                            <el-table-column label="操作内容" prop="purchaseId" min-width="110">
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.purchaseId"
                                         @click="">{{scope.row.purchaseId}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作人" prop="storehouseName" min-width="110">
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.storehouseName">
                                        {{scope.row.storehouseName}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作时间" prop="supplier" min-width="110">
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.supplier">{{scope.row.supplier}}</div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-form>
            </modal>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TableHeight from "~/mixins/tableheight";
import Modal from "~/components/common/Modal";
export default {
  name: "ChannelList",
  props: { operationId: String, flag: String },
  mixins: [TableHeight],
  data() {
    return {
      pageSize: 10,
      pageNo: 1,
      totalCount: 0,
      isClick: false,
      channelList: [],
      isEditChannelModalVisible: false,
      isEditChannelHistoryModalVisible: false,
      editChannelForm: {},
      channelProductList: [
        { storehouseName: "仓库1" },
        { storehouseName: "仓库2" }
      ],
      rules: {}
    };
  },
  watch: {
    flag: function(nval, oval) {
      this.refreshPage();
    },
    operationId: function(nval, oval) {
      this.refreshPage();
    }
  },
  components: {
    Modal
  },
  mounted() {
    this.setTableHeight(245);
    this.refreshPage();
  },
  methods: {
    ...mapActions(["showPageLoading", "hidePageLoading"]),
    refreshPage() {},
    getSearchValue(searchValue) {
      this.searchContent = searchValue;
      this.isClick = true;
      this.refreshPage();
    },
    getReset() {
      this.showResetButton = false;
      this.isShowSearchResult = false;
      this.searchContent = "";
      this.isClick = false;
      this.refreshPage();
    },
    handleSizeChange(nSize) {
      this.pageSize = nSize;
      this.refreshPage();
    },
    handleCurrentChange(nPage) {
      this.pageNo = nPage;
      this.refreshPage();
    },
    getButtonList() {}
  }
};
</script>

<style lang="scss">
.channel-list {
  padding-top: 20px;
  .channel-modal-container {
    .flex-container {
      display: flex;
      .flex-item {
        min-width: 390px;
        /*padding-left: 25px;*/
      }
    }
  }
  .channel-table-wrapper {
    table thead th {
      background: #f6f7fb;
      width: 100px;
      height: 44px;
    }
    table {
      border: 1px solid #eee;
      border-collapse: collapse;
      margin: 0 auto;
      text-align: left;
      font-size: 12px;
      tr {
        border-bottom: 1px solid #eee;
        background: #ffffff;
        height: 44px;
        overflow: hidden;
        box-shadow: 0 1px 0 0 #f2f6fd;
        border: 1px solid #f0f3fa;
        transition: 1s;
        .iconfont1 {
          width: 16px;
          height: 16px;
          top: -6px;
          right: -1px;
          position: absolute;
          display: none;
          background-color: white;
          color: red;
          transition: 1s;
        }
        &:hover {
          //    border: 1px dashed #539EFF;
          outline: 1px dashed #539eff;
          outline-offset: 0px;
          transition: 1s;
          .iconfont1 {
            display: block;
            cursor: pointer;
            transition: 1s;
          }
        }
        td {
          padding-left: 5px;
          .table-input {
            width: 120px;
          }
        }
      }
    }
  }
}
</style>
