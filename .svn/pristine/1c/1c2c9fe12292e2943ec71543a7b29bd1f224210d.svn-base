<template>
    <div class="purchase-list">
        <div class="table-container">
            <el-row>
                <el-col :span="6">
                    <search @searchValue="getSearchValue" :showResetButton="showResetButton" @reset="getReset" :isShowSearchResult="isShowSearchResult" :count="totalCount"></search>
                </el-col>
                <el-col :span="18">
                    <el-form label-width="80px" class="el-form-container" size="small">
                        <el-form-item label="创建时间">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="渠道">
                            <el-select placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="客户">
                            <el-select placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <div class="order-ctrl">
                <span class="el-span__choice">已选择0条：</span>
                <el-button type="primary" size="small" plain>导出</el-button>
                <el-button type="primary" size="small" plain>取消订单</el-button>
                <el-button type="primary" size="small" plain>完成订单</el-button>
            </div>
            <div class="table-wrapper">
                <el-table :data="purchaseList" border :height="tableHeight">
                    <el-table-column type="selection" label="销售单编号" prop="purchaseId" min-width="170">
                        <template slot-scope="scope">
                            <div class="row-btn-show ">
                                <div class="row-show" :title="scope.row.purchaseId" @click="viewPurchaseDetail(scope.row.purchaseId)">{{scope.row.purchaseId}}
                                </div>
                                <div>
                                    <el-button type="text" class="mr15" v-if="scope.row.status!==3" @click="queryPurchaseDetailsFcuntion(scope.row.purchaseId)">入库
                                    </el-button>
                                    <more-operating @onEdit="editPurchaseOrderFunction(scope.row.purchaseId)" v-if="scope.row.status===1" @onDelete="deletePurchaseOrderFunction(scope.row.purchaseId)"></more-operating>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="单据状态" prop="storehouseName" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.storehouseName">{{scope.row.storehouseName}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="外部订单编号" prop="status" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="statusText[scope.row.status]">
                                <span :class="returnClass(scope.row.status)"></span>
                                {{statusText[scope.row.status]}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="客户" prop="supplier" min-width="80">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.supplier">{{scope.row.supplier}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="渠道" prop="totalAmount" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.totalAmount">{{scope.row.totalAmount}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="订单金额(万元)" prop="operateUserName" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.operateUserName">{{scope.row.operateUserName}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" prop="comment" min-width="130">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.operateUserName">{{scope.row.operateUserName}}</div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination-section">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="param.pageNo" background :page-size="param.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div class="model-container">
            <el-dialog title="入库操作" :visible.sync="isStockInDialogVisible" width="60%">
                <el-table :data="queryPurchaseDetailsData.skuList" :height="200">
                    <el-table-column label="商品名称" prop="skuName" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.skuName">{{scope.row.skuName}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品编码" prop="skuId" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.skuId">{{scope.row.skuId}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" prop="unitName" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.unitName">{{scope.row.unitName}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="采购数量" prop="purchaseCount" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.purchaseCount">{{scope.row.purchaseCount}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="已入库" prop="inTotalCount" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.inTotalCount">{{scope.row.inTotalCount}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="本次入库" prop="InCount" min-width="110">
                        <template slot-scope="scope">
                            <div class="incont-input">
                                <el-input v-model="scope.row.InCount" type="number" @keyup.native="validateInCount(scope.row)"></el-input>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
                    <!--<el-button @click="isStockInDialogVisible = false">取 消</el-button>-->
                    <el-button type="primary" @click="createStockInOrder">确认入库</el-button>
                </span>
            </el-dialog>
            <el-dialog title="修改备注" :visible.sync="isRemarkDialogVisible" width="30%">
                <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 6}" placeholder="请输入内容" v-model="remark">
                </el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="isRemarkDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updatePurchaseOrderFunction(3,remark)">确 定</el-button>
                </span>
            </el-dialog>

        </div>
    </div>
</template>
<script>
import TableHeightMixins from '~/mixins/tableheight';
import Search from '~/components/common/Search';
import MoreOperating from '~/components/common/MoreOperating';
import Modal from '~/components/Modal';
import { mapActions, mapState } from 'vuex'
import QuitMixins from '~/mixins/quit';
import PlatformMixins from '~/mixins/platform';
import misc from '~/utils/misc';
export default {
    name: 'orderForSaleList',
    data() {
        return {
            param: {
                pageSize: 10,
                pageNo: 1,
                status: -1,
                searchContent: ""
            },
            queryPurchaseDetailsParam: {
                purchaseId: ""
            },
            updatePurchaseOrderArrivedTimeParam: {
                purchaseId: "",
                planArrivalTime: "",
            },
            updatePurchaseOrderCommentParam: {
                purchaseId: "",
                comment: "",
            },
            statusText: {
                0: '初始化',
                1: '待入库',
                2: '部分入库',
                3: '入库完成'
            },
            createStockIn: {
                type: '1',
                relatedSheetId: "",
                storehouseId: "",
                skuList: []
            },
            deletePurchaseOrderParam: {
                purchaseId: "",
                dataStatus: 2
            },
            isStockInDialogVisible: false,
            isRemarkDialogVisible: false,
            remark: "",
            showResetButton: false,
            isSearch: false,
            isShowSearchResult: false,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7
                },
            },
            purchaseList: [],
            totalCount: 0,
        }
    },
    mixins: [TableHeightMixins, QuitMixins, PlatformMixins],
    components: {
        Search, MoreOperating, Modal
    },
    props: { operationId: Number, flag: String },
    watch: {
        flag: function (nval) {
            this.param.pageSize = 10;
            this.param.pageNo = 1;
            this.param.status = nval;
            //                this.refreshPage(this.param);
            this.initData();
        },
        operationId: function (nval) {
            //                this.refreshPage(this.param);
            this.initData();
        }
    },
    computed: {
        ...mapState({
            //                purchaseList: ({purchaseList}) => purchaseList.purchaseList,
            //                totalCount: ({purchaseList}) => purchaseList.basePage.totalCount,
            queryPurchaseDetailsData: ({ viewPurchaseOrder }) => viewPurchaseOrder.queryPurchaseDetails,
        }),
    },
    mounted() {
        this.refreshPage(this.param);
        this.setTableHeight(245)
    },
    methods: {
        ...mapActions(["queryPurchaseOrderList", 'queryPurchaseDetails', 'createStockInAction', 'deletePurchaseOrder', 'updatePurchaseOrderArrivedTime', 'updatePurchaseOrderComment', "showPageLoading", "hidePageLoading"]),
        handleSizeChange(nSize) {
            this.param.pageSize = nSize;
            this.refreshPage(this.param);
        },
        handleCurrentChange(nPage) {
            this.param.pageNo = nPage;
            this.refreshPage(this.param);
        },
        refreshPage(nval) {
            this.showPageLoading();
            this.queryPurchaseOrderListFunction(nval);
        },
        initData() {
            this.getReset();
        },
        getSearchValue(searchValue) {
            this.param.pageSize = 10;
            this.param.pageNo = 1;
            this.param.searchContent = searchValue;
            this.isSearch = true;
            this.refreshPage(this.param);
        },
        queryPurchaseOrderListFunction(param) {
            this.queryPurchaseOrderList(param).then((resp) => {
                this.hidePageLoading();
                this.purchaseList = resp.orderList;
                this.totalCount = resp.totalCount;
                if (this.isSearch) {
                    this.showResetButton = true;
                    this.isShowSearchResult = true;
                }
            }).catch((err) => {
                this.purchaseList = [];
                this.totalCount = 0;
            });
        },
        queryPurchaseDetailsFcuntion(purchaseId) {
            this.isStockInDialogVisible = true;
            this.queryPurchaseDetailsParam.purchaseId = purchaseId;
            this.queryPurchaseDetails(this.queryPurchaseDetailsParam);
        },
        getReset() {
            this.showResetButton = false;
            this.isShowSearchResult = false;
            this.param.searchContent = "";
            this.isSearch = false;
            this.refreshPage(this.param)
        },
        viewPurchaseDetail(purchaseId) {
            this.$router.push(`/purchase/ViewPurchaseOrder/${purchaseId}`)
        },
        editPurchaseOrderFunction(purchaseId) {
            this.$router.push(`/purchase/EditPurchase/${purchaseId}`)
        },
        createStockInOrder() {
            this.createStockIn.skuList = [];
            this.createStockIn.relatedSheetId = this.queryPurchaseDetailsData.purchaseId;
            this.createStockIn.storehouseId = this.queryPurchaseDetailsData.storehouseId;
            let skuList = this.queryPurchaseDetailsData.skuList;
            for (let i = 0; i < skuList.length; i++) {
                if (skuList[i].InCount) {
                    let skuListItem = {
                        productId: skuList[i].productId,
                        skuId: skuList[i].skuId,
                        inCount: skuList[i].InCount,
                    };
                    this.createStockIn.skuList.push(skuListItem);
                }
            }
            if (this.createStockIn.skuList.length <= 0) {
                this.$message({
                    message: '请填写输入入库数量',
                    type: 'error'
                });
                return
            }
            this.createStockInAction(this.createStockIn).then((resp) => {
                this.$message({
                    message: '入库成功',
                    type: 'success'
                });
                this.isStockInDialogVisible = false;
                this.refreshPage(this.param);
            });
        },
        validateInCount(row) {
            let { purchaseCount, inTotalCount, InCount } = row;
            let MaxCount = Number(purchaseCount) - Number(inTotalCount);
            let reg = /^[1-9]\d*$/;
            if (InCount && InCount.length > 0 && !reg.test(InCount)) {
                this.$message({
                    type: 'error',
                    message: `请输入正确的入库数量`
                });
                row.InCount = '';
                return
            }
            if (MaxCount < Number(InCount)) {
                this.$message({
                    type: 'error',
                    message: `本次入库最多只能入库${MaxCount}`
                });
                row.InCount = '';
            }
        },
        deletePurchaseOrderFunction(purchaseId) {
            this.deletePurchaseOrderParam.purchaseId = purchaseId;
            this.$confirm('确认删除此条销售订单', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deletePurchaseOrder(this.deletePurchaseOrderParam).then((resp) => {
                    this.refreshPage(this.param);
                });
                //                    return
            }).catch(() => {
            });
        },
        updatePurchaseOrderFunction(type, val, purchaseId) {
            if (type === 2) {
                this.updatePurchaseOrderArrivedTimeParam.planArrivalTime = val;
                this.updatePurchaseOrderArrivedTimeParam.purchaseId = purchaseId;
                this.updatePurchaseOrderArrivedTime(this.updatePurchaseOrderArrivedTimeParam).then((res) => {
                    this.isRemarkDialogVisible = false;
                    this.$message({
                        message: '计划到货时间更新成功',
                        type: 'success'
                    });
                    this.refreshPage(this.param);
                });
            } else if (type === 3) {
                this.updatePurchaseOrderCommentParam.comment = val;
                this.updatePurchaseOrderComment(this.updatePurchaseOrderCommentParam).then((res) => {
                    this.isRemarkDialogVisible = false;
                    this.$message({
                        message: '备注更新成功',
                        type: 'success'
                    });
                    this.refreshPage(this.param);
                });
            }

        },
        showRemarkDialogVisible(comment, purchaseId) {
            this.remark = comment;
            this.isRemarkDialogVisible = true;
            this.updatePurchaseOrderCommentParam.purchaseId = purchaseId
        },
        returnClass(status) {
            if (status === 1) {
                return ' circle circle-F66E6E'
            } else if (status === 2) {
                return ' circle circle-FFA416'
            } else if (status === 3) {
                return ' circle circle-8F9399'
            }

        },
        compareDate(planArrivalTime) {
            let nowDate = misc.formatDate(new Date(), 'yyyy-MM-dd');
            if (nowDate > planArrivalTime) {
                return true
            }
            return false
        }
    }
}
</script>

<style lang="scss">
.purchase-list {
  .table-container {
    padding-top: 20px;
    background-color: #fff;
    height: 100%;
    .table-wrapper {
      margin-top: 15px;
      .cell {
        font-size: 12px;
      }
    }
    .el-table__body-wrapper {
      overflow-x: hidden;
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
    .el-dialog__header {
      .el-dialog__title {
        font-size: 16px;
        color: #333333;
      }
    }
    .incont-input {
      .el-input {
        width: 76px;
        .el-input__inner {
          border: 1px solid #dbdfe6;
          border-radius: 0px;
          color: #666666;
          height: 26px;
          font-size: 12px;
          &:focus {
            border: 1px solid #666666;
          }
        }
      }
    }
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
        left: -44px;
        z-index: 10;
        width: 20px;
        display: none;
        .el-input--small .el-input__inner {
          cursor: pointer;
        }
        .el-input {
          width: 20px;
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
      max-width: 108px;
      text-overflow: ellipsis;
    }
    .show-more-icon {
      font-size: 12px;
      position: absolute;
      right: 0px;
      display: none;
      z-index: 10;
    }
  }
  .circle {
    display: inline-block;
    width: 6px;
    height: 6px;
    margin-right: 6px;
    border-radius: 100%;
  }
  .circle-FFA416 {
    background-color: #ffa416;
  }
  .circle-F66E6E {
    background-color: #f66e6e;
  }
  .circle-8F9399 {
    background-color: #8f9399;
  }
  .font-color-F56C6C {
    color: #f56c6c;
  }
}
.el-form-container {
  .el-form-item {
    display: inline-block;
    vertical-align: middle;
  }
}
.el-span__choice {
  color: #999;
  font-size: 12px;
}
</style>
