<template>
    <div class="purchasecontractlist">
        <div class="table-container">    
            <div class="nav-top">
                <div class="search-container">
                    <search @searchValue="getSearchValue" :isClear='isClear' :showPlaceholder="'输入合同编号/名称'"></search>
                </div>
            </div>
            <div class="search_result_container" v-if="searchItemValueArray.length>0">
                <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount"
                            @deleteItem="getDeleteItem"></search-result>
            </div>
            <div class="table-wrapper">
                <el-table :data="purchaseList" border :height="tableHeight" :row-class-name="tableRowClassName">
                    <el-table-column label="合同编号" >
                        <template slot-scope="scope">
                            <div class="row-btn-show">
                                <div class="row-show" :title="scope.row.conNo"
                                        @click="onContractDetails(scope.row)">
                                        {{scope.row.conNo ? scope.row.conNo : '--'}}
                                </div>
                                <div class="operate-container">
                                    <div class="operate-container_div">
                                        <more-operating
                                            v-if="scope.row.contractStatus == 2"
                                            :buttonList="getButtonList()"
                                            @onClick="goEditPurchContract"
                                            :row="scope.row"></more-operating>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="合同名称" >
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.conName" >
                                {{scope.row.conName ? scope.row.conName : '--'}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="合同状态" >
                        <template slot-scope="scope">
                            <div class="row-btn-show ">
                                <div class="row-show noneEnable modifyStatusSelectStyle" v-if="scope.row.contractStatus == 1">
                                    <el-select v-model="scope.row.contractStatus" placeholder="请选择" size="small" @change="onFailure(scope.row, scope.$index, scope.row.contractStatus)" >
                                        <el-option :value='1' label='启用中' disabled></el-option>
                                        <el-option :value='3' label='作废'></el-option>
                                    </el-select>
                                </div>
                                <div class="row-show noneEnable modifyStatusSelectStyle" v-if="scope.row.contractStatus == 2" >
                                    <el-select v-model="scope.row.contractStatus" placeholder="请选择" size="small" @change="onEnable(scope.row, scope.$index, scope.row.contractStatus)" >
                                        <el-option :value='2' label='未启用' disabled></el-option>
                                        <el-option :value='1' label='启用'></el-option>
                                    </el-select>
                                </div>
                                <div class="row-show failureTxet" v-if="scope.row.contractStatus == 3"  >
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作废
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="合同开始时间" >
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.contractStartTime" >
                            {{scope.row.contractStartTime ? scope.row.contractStartTime : '--'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="合同结束时间" >
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.contractEndTime" >
                                {{scope.row.contractEndTime ? scope.row.contractEndTime : '--'}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" >
                        <template slot-scope="scope">
                            <div class="row-show " :title="scope.row.remark" >
                                {{scope.row.remark ? scope.row.remark : '--'}}
                            </div>
                        </template>
                    </el-table-column>
                    <div slot="empty" class="table_slot_empty_text">
                        <div><img src="../../layouts/images/nodata.png"/></div>
                        <div>暂无数据</div>
                    </div>
                </el-table>
                <div class="pagination-section">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="param.pageNo" background :page-size="param.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                    </el-pagination>
                </div>
            </div>
            <el-dialog title="启用合同" :visible.sync="isEnableContract" width="50%" @close="closeThis('2')">
                <div>确认将合同<span class="contractNoStyle">{{conNo}}-{{conName}}</span>设置为启用中？</div>
                <div class="bottonDialog">启用后，<span class="contractNoStyle1">合同将不允许编辑和删除。</span></div>
            <span slot="footer" class="dialog-footer">
                <button class="QuEnable" @click="CloseFailureContract('2')">取 消</button>
                <button class="QuEnable" @click="GoEnableContract">确 认</button>
            </span>
            </el-dialog>

            <el-dialog title="失效合同" :visible.sync="isFailureContract" width="50%" @close="closeThis('1')">
                <div>确认将合同<span class="contractNoStyle">{{conNo}}-{{conName}}</span>状态设置为作废？</div>
                <div class="bottonDialog">作废后，<span class="contractNoStyle1">合同将不再允许使用</span>，请确认合同是否已经使用完毕。</div>
            <span slot="footer" class="dialog-footer">
                <button class="QuEnable" @click="CloseFailureContract('1')">取 消</button>
                <button class="QuEnable" @click="GoFailureContract">确 认</button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TableHeight from "~/mixins/tableheight";
import Search from "~/components/common/Search";
import MoreOperating from "~/components/common/MoreOperating";
import SearchResult from "~/components/common/SearchResult.vue";
export default {
  name: "PurchaseContractList",
  props: { operationId: Number, flag: String },
  mixins: [TableHeight],
  components: {
    Search,
    MoreOperating,
    SearchResult
  },
  data() {
    return {
      param: {
        pageSize: 10,
        pageNo: 1,
        contractStatus: null, //合同状态1-启用中2-未启用3-失效，默认2
        searchKey: ""
      },
      totalCount: 0,
      buttonList: [],
      purchaseList: [],
      isEnableContract: false, //是否显示启用合同的弹窗
      isFailureContract: false, //是否显示失效的弹窗
      message: "成功启用",
      messageType: "success",
      contractSeqNo: "",
      conNo: "",
      conName: "",
      currentIndex: '',
      currentStatus: '',
      addSuccessType: false,
      searchItemValueArray: [],
      isClear: false,
    };
  },
  created() {
    // this.refreshPage();
  },
  watch: {
    flag: function(nval, oval) {
      this.param.pageSize = 10;
      this.param.pageNo = 1;
      if (this.flag === "-1") {
        this.param.contractStatus = '';
      } else if (this.flag === "1") {
        this.param.contractStatus = 1;
      } else if (this.flag === "2") {
        this.param.contractStatus = 2;
      } else if (this.flag === "3") {
        this.param.contractStatus = 3;
      }
      this.addSuccessType = false;
      this.refreshPage();
    },
    operationId: function(nval, oval) {
      this.addSuccessType = true;
      this.refreshPage();
    }
  },
  mounted() {
    this.setTableHeight(240);
    this.refreshPage();
  },
  activated() {
    this.refreshPage();
  },
  methods: {
    ...mapActions([
      "showPageLoading",
      "hidePageLoading",
      "purchaseContractChangecontractstatus",
      "purchaseContractQuerypagelist",
      "purchaseContractDelete"
    ]),
    getReset() {
      this.param.contractStatus = 2;
      this.param.searchKey = "";
      this.refreshPage();
    },
    refreshPage(param = this.param) {
      this.showPageLoading();
      this.queryPurchaseOrderListFunction(param);
    },
    queryPurchaseOrderListFunction(param) {
      this.purchaseContractQuerypagelist(param)
        .then(resp => {
          this.hidePageLoading();
          this.purchaseList = resp.result;
          this.totalCount = resp.totalCount;
        })
        .catch(err => {
          this.purchaseList = [];
          this.totalCount = 0;
          this.hidePageLoading();
        });
    },
    onContractDetails(row) {
      this.$router.push(`/contract/PurchaseContractView/${row.contractSeqNo}`);
    },
    getSearchValue(searchValue) {
      this.param.pageSize = 10;
      this.param.pageNo = 1;
      this.isClear = false;
      this.param.searchKey = searchValue;
      this.searchItemValueArray = [searchValue];
      this.refreshPage();
    },
    getDeleteItem(index) {
      this.searchItemValueArray.splice(index);
      this.isClear = true;
      this.param.searchKey = "";
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

    GoEnableContract() {
      this.showPageLoading();
      this.purchaseContractChangecontractstatus({
        contractSeqNo: this.contractSeqNo,
        contractStatus: 1
      }).then(resp => {
        this.hidePageLoading();
        this.message = "成功启用";
        this.messageType = "success";
        this.isEnableContract = false;
        this.messageFun();
      });
    },
    //去失效合同
    GoFailureContract() {
      this.showPageLoading();
      this.purchaseContractChangecontractstatus({
        contractSeqNo: this.contractSeqNo,
        contractStatus: 3
      }).then(resp => {
        this.hidePageLoading();
        this.message = "失效完成";
        this.messageType = "success";
        this.isFailureContract = false;
        this.messageFun();
      });
    },
    closeThis (val) {
        this.CloseFailureContract(val)
    },
    CloseFailureContract (val) {
        let index = this.currentIndex
        let status = -1
        if (this.currentStatus == 3) {
            status = 1
        } else if (this.currentStatus == 1) {
            status = 2
        }
        this.purchaseList[index].contractStatus = status
        if (val == '1') {
            this.isFailureContract = false;
        } else if (val == '2') {
            this.isEnableContract = false;
        }
        
    }, 
    messageFun() {
      this.$message({
        message: this.message,
        type: this.messageType
      });
      this.refreshPage();
    },
    onEnable(row, currentIndex, status) {
        this.currentStatus = status
      this.currentIndex = currentIndex
      this.contractSeqNo = row.contractSeqNo;
      this.conNo = row.conNo;
      this.conName = row.conName;
      this.isEnableContract = true;
    },
    onFailure(row, currentIndex, status) {
      this.currentStatus = status
      this.currentIndex = currentIndex
      this.contractSeqNo = row.contractSeqNo;
      this.conNo = row.conNo;
      this.conName = row.conName;
      this.isFailureContract = true;
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0 && this.addSuccessType === true) {
        return "success-row";
      }
    },
    editPurchaseOrderFunction(row) {
      this.$router.push(`/contract/EditPurchaseContract/${row.contractSeqNo}`);
    },
    deletePurchaseOrderFunction(row) {
      let obj = {
        contractSeqNo: row.contractSeqNo
      };
      this.$confirm("确认删除此条合同", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.purchaseContractDelete(obj).then(resp => {
            this.refreshPage();
          });
        })
        .catch(() => {});
    },
    getButtonList() {
      let buttonArray = [
        { type: "edit", text: "编辑" },
        { type: "delete", text: "删除" }
      ];
      return buttonArray;
    },
    goEditPurchContract(type, row) {
      if (type === "delete") {
        this.deletePurchaseOrderFunction(row);
      } else if (type === "edit") {
        this.editPurchaseOrderFunction(row);
      }
    }
  }
};
</script>

<style lang="scss">
.purchasecontractlist {
  .search-component {
    right: 0;
  }
  .headerStatus {
    width: 21.5%;
    margin-right: 20px;
  }
  &:hover {
    .failureTxet {
      color: #666666;
    }
  }
  .searchMarginLeft {
    margin-left: 14.26%;
  }
  .search {
    .search-component {
      .el-form.el-form--inline {
        text-align: right !important;
        .el-form-item {
          margin-right: 0px;
        }
      }
      .search-result-tips {
        text-align: right !important;
      }
    }
    .search-result-tips {
      margin-left: 2.5%;
    }
  }
  .el-select-dropdown__item.selected {
    color: #c0c4cc !important;
  }
  .QuEnable {
    width: 80px;
    height: 34px;
    line-height: 34px;
    background: #fa5555;
    text-align: center;
    border: none;
    color: #fff;
    border-radius: 5px;
    font-size: 13px;
  }
  .noneEnable {
    width: 100px;
  }
  .contractNoStyle1,
  .contractNoStyle {
    color: #c8284f;
    display: inline-block;
    padding: 0px 10px;
    margin: 0 5px;
  }
  .contractNoStyle {
    background: #f9f2f4;
  }
  .bottonDialog {
    margin-top: 10px;
  }
  padding-top: 20px;
  .el-text-right {
    text-align: right;
  }
  .supplier-select {
    margin: 20px 0;
  }
  .contractId {
    &:hover {
      color: #3b8cff;
      cursor: pointer;
    }
  }
  .el-dialog__header {
    margin: 20px 30px 0px;
    padding: 20px 0 10px;
    border-bottom: 1px solid #f3f3f3;
    .el-dialog__headerbtn .el-dialog__close {
      font-size: 20px;
      font-weight: bold;
      color: #dddddd;
    }
    .el-dialog__title {
      font-size: 16px;
    }
  }
  .el-dialog__footer {
    padding: 0px 20px 30px;
  }
  .el-dialog__body {
    padding: 24px 30px 0px;
    .fontSize16 {
      margin: 20px 0;
      font-size: 16px;
      font-weight: normal;
      color: #666;
    }
  }
}
</style>
