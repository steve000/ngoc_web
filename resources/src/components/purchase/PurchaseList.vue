<template>
    <div class="purchase-list">
        <div class="table-container">
            <div class="nav-top">
                <div class="select-date-container">
                    <select-date-interval @date="getDate" :isReset="isResetDate"></select-date-interval>
                </div>
                <div class="search-container">
                    <search @searchValue="getSearchValue"
                            :isClear='isClear'
                            :showPlaceholder="'输入采购单号或需求标题搜索'"></search>
                </div>
            </div>
            <div class="search_result_container" v-if="searchItemValueArray.length>0">
                <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount"
                               @deleteItem="getDeleteItem"></search-result>
            </div>
            <div class="table-wrapper" id="purchaseListTable">
                <el-table :data="purchaseList" border
                          :height="tableHeight"
                          ref="purchaseList"
                          :row-class-name="tableRowClassName">
                    <el-table-column label="采购单编号" prop="purchaseId" min-width="170">
                        <template slot-scope="scope">
                            <div class="row-btn-show">
                                <div class="row-show" :title="scope.row.purchaseId"
                                     @click="viewPurchaseDetail(scope.row.purchaseId)">{{scope.row.purchaseId}}
                                </div>
                                <div class="operate-container">
                                    <el-button type="text" class="mr15"
                                               v-if="scope.row.status!==3 && scope.row.status!==-1 && scope.row.approveStatus===5"
                                               @click="queryWaitStockInProductFunction(scope.row)">入库
                                    </el-button>
                                    <div class="operate-container_div">
                                        <more-operating
                                            v-if="scope.row.approveStatus===1 || scope.row.approveStatus===3"
                                            :buttonList="getButtonList()"
                                            @onClick="onClickOperateButton"
                                            @hide="getHide(scope.$index)"
                                            @emitClick="setTableTrBg(scope.$index)"
                                            :row="scope.row"></more-operating>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="需求标题" prop="purchaseTitle" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.purchaseTitle">{{scope.row.purchaseTitle}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="单据状态" prop="status" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show">
                                <span :class="returnClass(scope.row.status, scope.row.approveStatus)"></span>
                                {{getStatus(scope.row.status, scope.row.approveStatus)}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="供应商" prop="vendorName" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.vendorName">{{scope.row.vendorName}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="订单金额（元）" prop="totalAmount" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="(Number(scope.row.totalAmount)/100).toFixed(2)">
                                {{(Number(scope.row.totalAmount) / 100).toFixed(2)}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="计划到货时间" prop="planArrivalTime" min-width="130">
                        <template slot-scope="scope">
                            <div class="display-flex date-conatiner">
                                <div
                                    :class="compareDate(scope.row.planArrivalTime,scope.row.status)? 'font-color-F56C6C':''">
                                    <i class="iconfont1 icon-shijian"></i>
                                    {{scope.row.planArrivalTime}}
                                </div>
                                <div class="date-edit-contaniner"
                                     v-if="scope.row.approveStatus!==4 && scope.row.status!==3">
                                    <div class="show-more-icon date-edit">
                                        <el-button
                                            type="text">
                                            <i class="iconfont1 icon-bianji"></i>
                                        </el-button>
                                    </div>
                                    <div class="date-picker-container">
                                        <el-date-picker
                                            v-model="scope.row.planArrivalTime"
                                            type="date"
                                            placeholder="选择日期"
                                            :picker-options="pickerOptions"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                            :clearable="false"
                                            :editable="false"
                                            size="small"
                                            @change="updatePurchaseOrderFunction(2,scope.row.planArrivalTime,scope.row.purchaseId)">
                                        </el-date-picker>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作人" prop="operateUserName" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.operateUserName">{{scope.row.operateUserName}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" prop="createTime" min-width="140">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.createTime">{{scope.row.createTime}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" prop="comment" min-width="130">
                        <template slot-scope="scope">
                            <div class="show-more"
                                 @click="showRemarkDialogVisible(scope.row.comment,scope.row.purchaseId)">
                                <div class="show-more-content">
                                    {{scope.row.comment !== "" && scope.row.comment !== null ? scope.row.comment : '无'}}
                                </div>
                                <div class="show-more-icon">
                                    <el-button
                                        type="text"
                                    >
                                        <i class="iconfont1 icon-bianji"></i>
                                    </el-button>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <div slot="empty" class="table_slot_empty_text">
                        <div><img src="../../layouts/images/nodata.png"/></div>
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
        <div class="model-container">
            <confirm-stock-in-modal
                v-if="isStockInDialogVisible"
                @save="confirmStockInSuccess"
                @close="isStockInDialogVisible=false"
                :row="row"></confirm-stock-in-modal>
            <modal title="修改备注"
                   v-model="isRemarkDialogVisible"
                   :showCancelButton="false"
                   width="660px">
                <div class="textarea-container">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 6, maxRows: 6}"
                        placeholder="请输入内容"
                        v-model="remark"
                        @keyup.native="countRemark">
                    </el-input>
                    <p class="textarea-tips">200字以内</p>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="isRemarkDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updatePurchaseOrderFunction(3,remark)">确 定</el-button>
                </span>
            </modal>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex'
    import TableHeightMixins from '~/mixins/tableheight';
    import Search from '~/components/common/Search';
    import MoreOperating from '~/components/common/MoreOperating';
    import Modal from '~/components/common/Modal.vue';
    import selectDateInterval from '~/components/common/selectDateInterval';
    import PlatformMixins from '~/mixins/platform';
    import misc from '~/utils/misc';
    import ConfirmStockInModal from '~/components/common/ConfirmStockInModal.vue'
    import SearchResult from '~/components/common/SearchResult.vue'

    export default {
        name: 'PurchaseList',
        data() {
            return {
                param: {
                    pageSize: 10,
                    pageNo: 1,
                    status: -1,
                    approveStatus: -1,
                    searchContent: "",
                    createStartTime: '',
                    createEndTime: '',
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
                    1: '待收货',
                    2: '部分收货',
                    3: '已收货'
                },
                approveStatusText: {
                    1: '草稿',
                    2: '审批中',
                    3: '已驳回',
                    4: '已撤销',
                    5: '审批通过',
                },
                deletePurchaseOrderParam: {
                    purchaseId: "",
                    dataStatus: 2
                },
                isStockInDialogVisible: false,
                isRemarkDialogVisible: false,
                remark: "",
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7
                    },
                },
                purchaseList: [],
                totalCount: 0,
                buttonList: [],
                isResetDate: false,
                addSuccessType: false,
                row: {},
                searchItemValueArray: [],
                isClear: false,
            }
        },
        mixins: [TableHeightMixins, PlatformMixins],
        components: {
            Search, MoreOperating, Modal, selectDateInterval,
            ConfirmStockInModal,
            SearchResult
        },
        props: {operationId: Number, flag: String, type: String},
        watch: {
            flag: function (nval) {
                this.param.pageSize = 10;
                this.param.pageNo = 1;
                if (this.type === 'all') {
                    this.param.status = -1;
                    this.param.approveStatus = -1;
                } else if (this.type === 'status') {
                    this.param.status = nval;
                    this.param.approveStatus = -1;
                } else if (this.type === 'approveStatus') {
                    this.param.status = -1;
                    this.param.approveStatus = nval;
                }
                this.addSuccessType = false;
                this.initData();
            },
            operationId: function (nval) {
                this.initData();
                this.addSuccessType = true;
            }
        },
        computed: {
            ...mapState({}),
        },
        mounted() {
            this.refreshPage();
            this.setTableHeight(280);
        },
        methods: {
            ...mapActions(["queryPurchaseOrderList", 'deletePurchaseOrder', 'updatePurchaseOrderArrivedTime', 'updatePurchaseOrderComment', "showPageLoading", "hidePageLoading"]),
            handleSizeChange(nSize) {
                this.param.pageSize = nSize;
                this.refreshPage();
            },
            handleCurrentChange(nPage) {
                this.param.pageNo = nPage;
                this.refreshPage();
            },
            refreshPage(param = this.param) {
                this.showPageLoading();
                this.queryPurchaseOrderListFunction(param);
            },
            initData() {
                this.getReset();
            },
            getSearchValue(searchValue) {
                this.param.pageSize = 10;
                this.param.pageNo = 1;
                this.isClear = false;
                this.param.searchContent = searchValue;
                this.searchItemValueArray = [searchValue];
                this.refreshPage();
            },
            queryPurchaseOrderListFunction(param) {
                this.queryPurchaseOrderList(param).then((resp) => {
                    this.hidePageLoading();
                    this.purchaseList = resp.orderList;
                    this.totalCount = resp.totalCount;
                }).catch((err) => {
                    this.purchaseList = [];
                    this.totalCount = 0;
                    this.hidePageLoading();
                });
            },
            queryWaitStockInProductFunction(row) {
                this.isStockInDialogVisible = true;
                this.row = row;
            },
            getReset() {
                this.param.searchContent = "";
                this.param.createEndTime = '';
                this.param.createStartTime = '';
                this.isResetDate = true;
                this.refreshPage()
            },
            getDeleteItem(index){
                this.searchItemValueArray.splice(index);
                this.isClear = true;
                this.param.searchContent = "";
                this.refreshPage()
            },
            viewPurchaseDetail(purchaseId) {
                this.$router.push(`/purchase/ViewPurchaseOrder/${purchaseId}`)
            },
            editPurchaseOrderFunction(purchaseId) {
                this.$router.push(`/purchase/EditPurchase/${purchaseId}`)
            },
            deletePurchaseOrderFunction(purchaseId) {
                this.deletePurchaseOrderParam.purchaseId = purchaseId;
                this.$confirm('确认删除此条采购单', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deletePurchaseOrder(this.deletePurchaseOrderParam).then((resp) => {
                        this.refreshPage();
                        this.$emit("closeEdit");
                        this.$emit("closeView");
                    });
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
                        this.refreshPage();
                    });
                } else if (type === 3) {
                    this.updatePurchaseOrderCommentParam.comment = val;
                    this.updatePurchaseOrderComment(this.updatePurchaseOrderCommentParam).then((res) => {
                        this.isRemarkDialogVisible = false;
                        this.$message({
                            message: '备注更新成功',
                            type: 'success'
                        });
                        this.refreshPage();
                    });
                }

            },
            showRemarkDialogVisible(comment, purchaseId) {
                this.remark = comment;
                this.isRemarkDialogVisible = true;
                this.updatePurchaseOrderCommentParam.purchaseId = purchaseId
            },
            returnClass(status, approveStatus) {
                if (status === 1 || status === 2) {//待收货和部分收货
                    return ' circle circle-FFA416'
                } else if (status === 3) {
                    return ' circle circle-8F9399'
                }
                if (approveStatus === 2) {
                    return ' circle circle-FFA416'
                } else if (approveStatus === 3 || approveStatus === 1) {
                    return ' circle circle-F66E6E'
                } else if (approveStatus === 4) {
                    return ' circle circle-8F9399'
                }
            },
            compareDate(planArrivalTime, status) {
                let nowDate = misc.formatDate(new Date(), 'yyyy-MM-dd');
                if (nowDate > planArrivalTime && status !== 3) {
                    return true
                }
                return false
            },
            countRemark(value) {
                if (this.remark.length > 200) {
                    this.remark = this.remark.slice(0, 200)
                }
            },
            getButtonList() {
                let buttonArray = [{type: 'edit', text: '编辑'}];
                return buttonArray
            },
            onClickOperateButton(type, row) {
                if (type === 'edit') {
                    this.editPurchaseOrderFunction(row.purchaseId)
                }
            },
            getDate(time) {
                this.param.createStartTime = time.createStartTime;
                this.param.createEndTime = time.createEndTime;
                this.isResetDate = false;
                this.refreshPage();
            },
            getStatus(status, approveStatus) {
                if (approveStatus === 5) {
                    return this.statusText[status]
                }
                return this.approveStatusText[approveStatus]
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 0 && this.addSuccessType === true) {
                    return 'success-row';
                }
            },
            confirmStockInSuccess() {
                this.isStockInDialogVisible = false;
                this.refreshPage();
            },
            getHide(index){
                let eleClassList = document.getElementById('purchaseListTable').getElementsByClassName('el-table')[0].getElementsByClassName('el-table__row')[index].classList;
                eleClassList.remove('success-row');
                let moreOperateClassList = document.getElementById('purchaseListTable').getElementsByClassName('el-table')[0].getElementsByClassName('el-table__row')[index].getElementsByClassName('operate-container_div')[0].classList;
                moreOperateClassList.remove('display-block');
            },
            setTableTrBg(index){
                let eleClassList = document.getElementById('purchaseListTable').getElementsByClassName('el-table')[0].getElementsByClassName('el-table__row')[index].classList;
                let moreOperateClassList = document.getElementById('purchaseListTable').getElementsByClassName('el-table')[0].getElementsByClassName('el-table__row')[index].getElementsByClassName('operate-container_div')[0].classList;
                moreOperateClassList.add('display-block');
                eleClassList.add('success-row');
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
            color: #F56C6C;
        }
        .select-storehouse-container {
            margin-bottom: 12px;
            .el-input__inner {
                height: 34px;
                color: #666666;
                border: 1px solid #E0E0E0;
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
