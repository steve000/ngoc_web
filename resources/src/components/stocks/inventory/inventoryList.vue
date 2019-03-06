<template>
    <div class="purchase-list">
        <div class="table-container">
            <div class="nav-top">
                <div class="select-date-container">
                    <!-- <select-date-interval @date="getDate" :isReset="isResetDate"></select-date-interval> -->
                    <SelectDate @date="getDate" :isReset="isResetDate"></SelectDate>
                </div>
                <div class="search-container">
                    <search @searchValue="getSearchValue"
                            :isClear='isClear'
                            :showPlaceholder="'输入盘点单号/仓库名称'"></search>
                </div>
            </div>
            <div class="search_result_container" v-if="searchItemValueArray.length>0">
                <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount"
                               @deleteItem="getDeleteItem"></search-result>
            </div>
            <div class="table-wrapper" id="purchaseListTable">
                <el-table :data="inventoryList" border
                          :height="tableHeight"
                          ref="inventoryList"
                          :row-class-name="tableRowClassName">
                    <el-table-column label="盘点单号" prop="billNo" min-width="170">
                        <template slot-scope="scope">
                            <div class="row-btn-show">
                                <div class="row-show" :title="scope.row.billNo"
                                     @click="viewPurchaseDetail(scope.row)">{{scope.row.billNo}}
                                </div>
                                <div class="operate-container">
                                    <div class="operate-container_div">
                                        <more-operating
                                            v-if="scope.row.status!=1 && scope.row.approveStatus!=1"
                                            :buttonList="getButtonList()"
                                            @onClick="onClickOperateButton"
                                            :row="scope.row"></more-operating>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="单据状态" prop="status" min-width="110">
                        <template slot-scope='scope'>
                            <el-select @change="changeStatus(scope.row)" v-model="scope.row.status" :disabled="scope.row.approveStatus == 0 || scope.row.status == 1">
                                <el-option  :value='0' label='正在盘点'></el-option>
                                <el-option  :value='1' label='盘点完成'></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="审批状态" prop="approveStatus" min-width="110">
                        <template slot-scope='scope'>
                            <el-select @change="changeAppStatus(scope.row)" v-model="scope.row.approveStatus" v-if="scope.row.approveStatus == 0" :disabled="scope.row.approveStatus == 1">
                                <el-option  :value='0' label='草稿'></el-option>
                                <el-option  :value='1' label='审批'></el-option>
                            </el-select>
                            <el-select @change="changeAppStatus(scope.row)" v-model="scope.row.approveStatus" v-else :disabled="scope.row.approveStatus == 1">
                                <el-option  :value='0' label='草稿'></el-option>
                                <el-option  :value='1' label='审批通过'></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="仓库名称" prop="storehouseName" min-width="110"></el-table-column>
                    <el-table-column label="创建时间" prop="createTime" min-width="130"></el-table-column>
                    <el-table-column label="备注" prop="comments" min-width="110"></el-table-column>
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
    import {mapActions, mapState} from 'vuex'
    import TableHeightMixins from '~/mixins/tableheight';
    import Search from '~/components/common/Search';
    import MoreOperating from '~/components/common/MoreOperating';
    import Modal from '~/components/common/Modal.vue';
    // import selectDateInterval from '~/components/common/selectDateIntervalAdd';
    import SelectDate from '~/components/common/SelectDate';
    import PlatformMixins from '~/mixins/platform';
    import misc from '~/utils/misc';
    import ConfirmStockInModal from '~/components/common/ConfirmStockInModal.vue'
    import SearchResult from '~/components/common/SearchResult.vue'

    export default {
        name: 'inventoryList',
        data() {
            return {
                param: {
                    pageSize: 10,
                    pageNo: 1,
                    status: -1,
                    approveStatus: -1,
                    searchKey: "",
                    dateKey: '',
                    // beginTime: '',
                    startTime: '',
                    endTime: '',
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
                    id: "",
                    billNo: ''
                },
                isStockInDialogVisible: false,
                isRemarkDialogVisible: false,
                remark: "",
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7
                    },
                },
                inventoryList: [],
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
            Search, 
            MoreOperating, 
            Modal, 
            // selectDateInterval,
            SelectDate,
            ConfirmStockInModal,
            SearchResult
        },
        props: {operationId: Number, flag: String},
        watch: {
            flag: function (nval) {
                this.param.pageSize = 10;
                this.param.pageNo = 1;
                if (this.flag == '-1') {
                    this.param.status = -1;
                    this.param.approveStatus = -1;
                } else if (this.flag == '1') {
                    this.param.status = 0;
                    this.param.approveStatus = ''
                } else if (this.flag == '2') {
                    this.param.status = 1;
                    this.param.approveStatus = ''
                } else if (this.flag == '3') {
                    this.param.status = '';
                    this.param.approveStatus = 0;
                } else if (this.flag == '4') {
                    this.param.status = '';
                    this.param.approveStatus = 1;
                }
                this.addSuccessType = false;
                this.refreshPage();
            },
            operationId: function (nval) {
                this.refreshPage();
                this.addSuccessType = true;
            }
        },
        computed: {
            ...mapState({}),
        },
        mounted() {
            console.log(1)
            this.refreshPage();
            this.setTableHeight(280);
        },
        methods: {
            ...mapActions(["inventoryChangeStatus","inventoryChangeAppStatus","inventoryPageList", 'inventoryDeelite', 'updatePurchaseOrderArrivedTime', 'updatePurchaseOrderComment', "showPageLoading", "hidePageLoading"]),
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
                this.param.searchKey = searchValue;
                this.searchItemValueArray = [searchValue];
                this.refreshPage();
            },
            queryPurchaseOrderListFunction(param) {
                this.inventoryPageList(param).then((resp) => {
                    this.hidePageLoading();
                    this.inventoryList = resp.result;
                    this.totalCount = resp.totalCount;
                }).catch((err) => {
                    this.inventoryList = [];
                    this.totalCount = 0;
                    this.hidePageLoading();
                });
            },
            queryWaitStockInProductFunction(row) {
                this.isStockInDialogVisible = true;
                this.row = row;
            },
            getReset() {
                this.param.searchKey = "";
                // this.param.createEndTime = '';
                // this.param.createStartTime = '';
                this.param.startTime = ''
                this.param.endTime = ''
                this.isResetDate = true;
                this.refreshPage()
            },
            getDeleteItem(index){
                this.searchItemValueArray.splice(index);
                this.isClear = true;
                this.param.searchKey = "";
                this.refreshPage()
            },
            viewPurchaseDetail(row) {
                // this.$router.push({path: `/stock/inventory/info`,  query:{id: row.id,billNo: row.billNo}})
                this.$router.push(`/stock/inventory/info/${row.id}/${row.billNo}`)
            },
            editPurchaseOrderFunction(row) {
                this.$router.push({path: `/stock/inventory/Edit`, query:{id: row.id,billNo: row.billNo}})
            },
            deletePurchaseOrderFunction(row) {
                this.deletePurchaseOrderParam.id = row.id;
                this.deletePurchaseOrderParam.billNo = row.billNo;
                this.$confirm('确认删除此条盘点单', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.inventoryDeelite(this.deletePurchaseOrderParam).then((resp) => {
                        this.refreshPage();
                        // this.$emit("closeEdit");
                        // this.$emit("closeView");
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
                let buttonArray = [{type: 'edit', text: '编辑'},{type: 'delete', text: '删除'}];
                return buttonArray
            },
            onClickOperateButton(type, row) {
                if (type === 'edit') {
                    this.editPurchaseOrderFunction(row)
                }else if(type === 'delete'){
                    this.deletePurchaseOrderFunction(row)
                }
            },
            // getDate(time, dateStatus) {
            //     this.param.createStartTime = time.createStartTime;
            //     this.param.createEndTime = time.createEndTime;
            //     this.param.dateKey = +dateStatus
            //     this.isResetDate = false;
            //     this.refreshPage();
            // },
            // 时间组件 拿到startTime & endTime 筛选查询
            getDate(time){
                this.isResetDate = false;
                this.param.startTime = time.createStartTime;
                this.param.endTime = time.createEndTime;
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
            changeStatus(row){
                let params={status:row.status,id:row.id}
                this.inventoryChangeStatus(params).then(res=>{})
            },
            changeAppStatus(row){
                console.log(row, 887)
                let params = {approveStatus:row.approveStatus,id:row.id}
                this.inventoryChangeAppStatus(params).then(res=>{})
            },
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
                        // display: block;
                    }
                }
                .operate-container {
                    padding-right: 16px;
                    min-width: 72px;
                    font-size: 12px;
                    .operate-container_div {
                        // display: none;
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
