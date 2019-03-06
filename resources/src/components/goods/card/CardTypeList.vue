   <template>
    <div class="purchase-list">
        <div class="table-container">
            <div class="nav-top">
                <div>
                    <search @searchValue="getSearchValue"
                            :isClear='isClear'
                            :showPlaceholder="'输入卡券类型名称或者编码'"></search>
                </div>
            </div>
            <div class="search_result_container" v-if="searchItemValueArray.length>0">
                <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount"
                               @deleteItem="getDeleteItem"></search-result>
            </div>
            <div class="table-wrapper" id="cardtypeListTable">
                <el-table :data="purchaseList" border
                          :height="tableHeight"
                          ref="purchaseList"    
                          :row-class-name="tableRowClassName">
                    <el-table-column label="类型名称" prop="typeName" min-width="170">
                        <template slot-scope="scope">
                            <div class="row-btn-show">
                                <div class="row-show">{{scope.row.typeName}}</div>
                                <!--判断是否有删除-->
                                <!-- <div v-if="scope.row.status===0">删除</div> -->
                                <div class="operate-container">
                                    <more-operating
                                        v-if="scope.row.status===0"
                                        :buttonList="getButtonList()"
                                        @onClick="onClickOperateButton"
                                        :row="scope.row"></more-operating>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column  label="状态" prop="status" min-width="110" >
                        <template slot-scope="scope">
                             <el-select @change="changeCardTypeStatus(scope.row)"
                             placeholder="请选择"
                             ref="select1"
                             style="width: 100px" size="small" v-model="scope.row.status" 
                             >
                                <el-option :value="0" label="停用"></el-option>
                                <el-option :value="1" label="启用"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="类型编码" prop="typeCode" min-width="110"></el-table-column>
                    <el-table-column label="发行实体" prop="userGroupName" min-width="110"></el-table-column>
                    <el-table-column label="描述" prop="remark" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.remark">{{scope.row.remark ? scope.row.remark : '--'}}</div>
                        </template>
                    </el-table-column>
                    <div slot="empty" class="table_slot_empty_text">
                        <div><img src="../../../layouts/images/nodata.png"/></div>
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
import MessageMixins from "~/mixins/messages";
import PlatformMixins from "~/mixins/platform";
import misc from "~/utils/misc";
import ConfirmStockInModal from "~/components/common/ConfirmStockInModal.vue";
import SearchResult from "~/components/common/SearchResult.vue";

export default {
  name: "CardTypeList",
  data() {
    return {
      param: {
        pageSize: 10,
        pageNo: 1,
        status: -1,
        approveStatus: -1,
        searchKey: "",
        createStartTime: "",
        createEndTime: ""
      },
      queryPurchaseDetailsParam: {
        cardtypeId: ""
      },
      updatePurchaseOrderArrivedTimeParam: {
        cardtypeId: "",
        planArrivalTime: ""
      },
      updatePurchaseOrderCommentParam: {
        cardtypeId: "",
        comment: ""
      },
      selected: [],
      selectList: {
        0: "停用",
        1: "启用"
      },
      statusText: {
        0: "初始化",
        1: "待收货",
        2: "部分收货",
        3: "已收货"
      },
      approveStatusText: {
        1: "草稿",
        2: "审批中",
        3: "已驳回",
        4: "已撤销",
        5: "审批通过"
      },
      isStockInDialogVisible: false,
      isRemarkDialogVisible: false,
      remark: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      purchaseList: [],
      totalCount: 0,
      buttonList: [],
      //isResetDate: false,
      addSuccessType: false,
      row: {},
      searchItemValueArray: [],
      isClear: false,
      //判断change是否提交
      //原数组
      //allList:[]

      
    };
  },
  mixins: [TableHeightMixins,MessageMixins, PlatformMixins], //判断高度，
  components: {
    Search,
    MoreOperating, //Modal, selectDateInterval,
    ConfirmStockInModal,
    SearchResult
  },
  props: { operationId: Number, flag: String, type: String },
  watch: {
    flag: function(nval) {
      this.param.pageSize = 10;
      this.param.pageNo = 1;
      if (this.type === "all") {
        this.param.status = -1;
        this.param.approveStatus = -1;
      } else if (this.type === "status") {
        this.param.status = nval;
        this.param.approveStatus = -1;
      } else if (this.type === "approveStatus") {
        this.param.status = -1;
        this.param.approveStatus = nval;
      }
      this.addSuccessType = false;
      this.initData();
    },
    operationId: function(nval) {
      this.initData();
      this.addSuccessType = true;
    }
    // operationStatus: function (val,nval){
    //     if(this.changeCtStaus == true){
    //         console.log(nval)
    //        this.operationStatus=nval
    //     }else{
    //         console.log(val)
    //        this.operationStatus=val
    //         }
    // }
  },
  computed: {
    ...mapState({})
  },
  mounted() {
    this.refreshPage();
    this.setTableHeight(275);
  },
  methods: {
    ...mapActions([
      "queryCardType",
      "deleteCardType",
      "changeCardType",
      "showPageLoading",
      "hidePageLoading"
    ]),
    handleSizeChange(nSize) {
      this.param.pageSize = nSize;
      this.refreshPage();
    },
    handleCurrentChange(nPage) {
      this.param.pageNo = nPage;
      //console.log(this.param.pageNo)
      this.refreshPage();
    },
    refreshPage(param = this.param) {
      this.showPageLoading();
      this.queryCardTypeFunction(param);
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
      this.refreshPage(this.param );
    },
    queryCardTypeFunction(param) {
      console.log(param)
      this.queryCardType(param)
        .then(resp => {
          this.hidePageLoading();
          this.purchaseList = resp.result;
         // this.allList = resp.result
          this.totalCount = resp.totalCount;
          this.$emit('getCardTypeAllList',resp.result)
         // console.log("原始状态值:",this.allList  .status)
        })
        .catch(err => {
          this.purchaseList = [];
          this.totalCount = 0;
          this.hidePageLoading();
        });
      // console.log("List:",this.purchaseList)
    },
    queryWaitStockInProductFunction(row) {
      this.isStockInDialogVisible = true;

      // console.log("row:",this.row)
      this.row = row;
    },
    //重置页面
    getReset() {
      this.param.searchKey = "";
      this.param.createEndTime = "";
      this.param.createStartTime = "";
      //this.isResetDate = true;
      this.refreshPage();
    },
    getDeleteItem(index) {
      this.searchItemValueArray.splice(index);
      this.isClear = true;
      this.param.searchKey = "";
      this.refreshPage();
    },
    // viewPurchaseDetail(cardtypeId) {
    //     this.$router.push(`/purchase/ViewPurchaseOrder/${cardtypeId}`)
    // },
    // editPurchaseOrderFunction(cardtypeId) {
    //     this.$router.push(`/purchase/EditPurchase/${cardtypeId}`)
    // // },
    // clickCtStatus(value){
    //   console.log(value)
    //     },


    changeCardTypeStatus(row) {
          let params = {id:row.id,status:row.status}
          this.changeCardType(params).then(resp => {
            this.refreshPage();
            // this.$emit("closeEdit");
            // this.$emit("closeView");
          });
    },
    deleteCardTypeFunction(row) {
     // this.deleteCardType.cardtypeId = cardtypeId;
      this.$confirm("确认删除此条卡券类型", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteCardType({id:row.id}).then(resp => {
            this.$message({
              type:'warning',
              message:'删除成功'
            })
            this.refreshPage();
            // this.$emit("closeEdit");
            // this.$emit("closeView");
          });
        })
        .catch(() => {
          //console.log("取消");
        });
    },
    // updatePurchaseOrderFunction(type, val, cardtypeId) {
    //     if (type === 2) {
    //         this.updatePurchaseOrderArrivedTimeParam.planArrivalTime = val;
    //         this.updatePurchaseOrderArrivedTimeParam.cardtypeId = cardtypeId;
    //         this.updatePurchaseOrderArrivedTime(this.updatePurchaseOrderArrivedTimeParam).then((res) => {
    //             this.isRemarkDialogVisible = false;
    //             this.$message({
    //                 message: '计划到货时间更新成功',
    //                 type: 'success'
    //             });
    //             this.refreshPage();
    //         });
    //     } else if (type === 3) {
    //         this.updatePurchaseOrderCommentParam.comment = val;
    //         this.updatePurchaseOrderComment(this.updatePurchaseOrderCommentParam).then((res) => {
    //             this.isRemarkDialogVisible = false;
    //             this.$message({
    //                 message: '备注更新成功',
    //                 type: 'success'
    //             });
    //             this.refreshPage();
    //         });
    //     }

    // },
    showRemarkDialogVisible(comment, cardtypeId) {
      this.remark = comment;
      this.isRemarkDialogVisible = true;
      this.updatePurchaseOrderCommentParam.cardtypeId = cardtypeId;
    },
    // returnClass(status, approveStatus) {
    //     if (status === 1 || status === 2) {//待收货和部分收货
    //         return ' circle circle-FFA416'
    //     } else if (status === 3) {
    //         return ' circle circle-8F9399'
    //     }
    //     if (approveStatus === 2) {
    //         return ' circle circle-FFA416'
    //     } else if (approveStatus === 3 || approveStatus === 1) {
    //         return ' circle circle-F66E6E'
    //     } else if (approveStatus === 4) {
    //         return ' circle circle-8F9399'
    //     }
    // },
    // compareDate(planArrivalTime, status) {
    //     let nowDate = misc.formatDate(new Date(), 'yyyy-MM-dd');
    //     if (nowDate > planArrivalTime && status !== 3) {
    //         return true
    //     }
    //     return false
    // },
    countRemark(value) {
      if (this.remark.length > 200) {
        this.remark = this.remark.slice(0, 200);
      }
    },
    getButtonList() {
      let buttonArray = [{ type: "delete", text: "删除" }];
      return buttonArray;
    },
    onClickOperateButton(type, row) {
      if (type === "delete") {
        console.log(row);
        this.deleteCardTypeFunction(row);
      }
    },
    // getDate(time) {
    //     this.param.createStartTime = time.createStartTime;
    //     this.param.createEndTime = time.createEndTime;
    //     //this.isResetDate = false;
    //     this.refreshPage();
    // },
    getStatus(status, approveStatus) {
      if (approveStatus === 5) {
        return this.statusText[status];
      }
      return this.approveStatusText[approveStatus];
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0 && this.addSuccessType === true) {
        return "success-row";
      }
    },
    confirmStockInSuccess() {
      this.isStockInDialogVisible = false;
      this.refreshPage();
    },
    getHide(index) {
      let eleClassList = document
        .getElementById("cardtypeListTable")
        .getElementsByClassName("el-table")[0]
        .getElementsByClassName("el-table__row")[index].classList;
      eleClassList.remove("success-row");
      let moreOperateClassList = document
        .getElementById("cardtypeListTable")
        .getElementsByClassName("el-table")[0]
        .getElementsByClassName("el-table__row")
        [index].getElementsByClassName("operate-container_div")[0].classList;
      moreOperateClassList.remove("display-block");
    },
    setTableTrBg(index) {
      let eleClassList = document
        .getElementById("cardtypeListTable")
        .getElementsByClassName("el-table")[0]
        .getElementsByClassName("el-table__row")[index].classList;
      let moreOperateClassList = document
        .getElementById("cardtypeListTable")
        .getElementsByClassName("el-table")[0]
        .getElementsByClassName("el-table__row")
        [index].getElementsByClassName("operate-container_div")[0].classList;
      moreOperateClassList.add("display-block");
      eleClassList.add("success-row");
    }
  }
};
</script>

<style lang="scss">
.purchase-list {
  .table-container {
    padding-top: 20px;
    background-color: #fff;
    height: 100%;
    .nav-top {
      display: flex;
      height: auto;
      justify-content: space-between;
      align-items: flex-start;
    }
    .table-wrapper {
      width: 100%;
      .el-table__body-wrapper tbody tr:hover {
        .operate-container_div {
          display: block;
        }
      }
      .operate-container {
        padding-right: 16px;
        min-width: 72px;
        font-size: 12px;
        .operate-container_div {
          display: none;
        }
        div {
          float: right;
        }
      }
    }
  }
  .display-flex {
    display: flex;
  }
  .icon-shijian {
    font-size: 12px;
  }
  .icon-bianji {
    font-size: 12px;
  }
  .model-container {
    height: auto;
  }
  .date-conatiner {
    &:hover {
      .date-edit-contaniner .date-picker-container {
        display: block;
      }
      .date-edit-contaniner .date-edit {
        display: block;
      }
    }
    .date-edit-contaniner {
      position: relative;
      text-align: right;
      .date-edit {
        cursor: pointer;
        position: absolute;
        z-index: 9;
        width: 20px;
        display: none;
      }
      .date-picker-container {
        opacity: 0;
        position: absolute;
        left: -88px;
        z-index: 10;
        width: 120px;
        display: none;
        .el-input--small .el-input__inner {
          cursor: pointer;
          border: none;
        }
        .el-input {
          width: 120px;
        }
        .el-input__prefix {
          display: none;
        }
      }
    }
  }
  .show-more {
    display: flex;
    width: 100%;
    height: 44px;
    justify-content: space-between;
    position: relative;
    &:hover {
      .show-more-icon {
        display: block;
      }
    }
    .show-more-content {
      white-space: nowrap;
      overflow: hidden;
      min-width: 108px;
      text-overflow: ellipsis;
    }
    .show-more-icon {
      min-width: 28px;
      font-size: 12px;
      position: absolute;
      right: 0px;
      display: none;
      z-index: 10;
    }
  }
  .font-color-F56C6C {
    color: #f56c6c;
  }
  .select-storehouse-container {
    margin-bottom: 12px;
    .el-input__inner {
      height: 34px;
      color: #666666;
      border: 1px solid #e0e0e0;
    }
    .el-form-item__label {
      font-size: 14px;
      color: #151515;
    }
  }
  .textarea-container {
    position: relative;
    .textarea-tips {
      color: #9c9c9c;
      position: absolute;
      top: 138px;
    }
  }
}
</style>
