<template>
    <div class="require-list">
        <div class="table-container">
            <div class="nav-top">
                <div class="nav-top-left">
                    <select-date @date="getDate" :isReset="isResetDate"></select-date>
                </div>
                <div class="search">
                    <search @searchValue="getSearchValue"
                            :isClear='isClear'
                            :showPlaceholder="'输入要货单号'"></search>
                </div>
            </div>
            <div class="search_result_container" v-if="searchItemValueArray.length>0">
                <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount"
                               @deleteItem="getDeleteItem"></search-result>
            </div>
            <div class="table-wrapper" id="requireListTable">
                <el-table :data="requireList" border
                          :height="tableHeight"
                          ref="requireList"
                          :row-class-name="tableRowClassName">
                    <el-table-column label="要货单号" prop="requireNo" min-width="170">
                        <template slot-scope="scope">
                            <div class="row-btn-show">
                                <div class="row-show" :title="scope.row.requireNo"
                                     @click="viewrequireDetail(scope.row)">{{scope.row.requireNo}}
                                </div>
                                <div class="operate-container">
                                    <div class="operate-container_div">
                                        <more-operating
                                            v-if="scope.row.status===1 && scope.row.approveStatus===0"
                                            @hide="getHide(scope.$index)"
                                            @onEdit="$router.push({ name:'requireOrderEdit', params: scope.row})"
                                            @onDelete="deleterequire(scope.row)"
                                            :row="scope.row">
                                        </more-operating>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="单据状态" prop="status" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.status">{{getStatus(scope.row.status)}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="审批状态" prop="approveStatus" min-width="110">
                        <template slot-scope='scope'>
                            <el-select @change="changeAppStatus(scope.row)" v-model="scope.row.approveStatus" :disabled="scope.row.approveStatus === 1||scope.row.status===2">
                                <el-option  :value='0' label='草稿'></el-option>
                                <el-option  :value='1' label='审批通过'></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="配送实体" prop="disUserGroupName" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.disUserGroupName">{{scope.row.disUserGroupName}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作人" prop="operateUserName" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.operateUserName">{{scope.row.operateUserName?scope.row.operateUserName:'--'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="审批人" prop="approveUserName" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.approveUserName">{{scope.row.approveUserName?scope.row.approveUserName:'--'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" prop="createTime" min-width="140">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.createTime">{{scope.row.createTime}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="更新时间" prop="updateDate" min-width="140">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.updateDate">{{scope.row.updateDate}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" prop="remark" min-width="130">
                        <template slot-scope="scope">
                            <div class="show-more"
                                 @click="showRemarkDialogVisible(scope.row.remark,scope.row.requireNo)">
                                <div class="show-more-content">
                                    {{scope.row.remark !== "" && scope.row.remark !== null ? scope.row.remark : '--'}}
                                </div>
                                <!-- <div class="show-more-icon">
                                    <el-button type="text">
                                        <i class="iconfont1 icon-bianji"></i>
                                    </el-button>
                                </div> -->
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
                    <el-button type="primary" @click="updaterequireOrderFunction(3,remark)">确 定</el-button>
                </span>
            </modal>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex';
    import TableHeightMixins from '~/mixins/tableheight';
    import Search from '~/components/common/Search';
    import MoreOperating from '~/components/common/MoreOperatingChannelPrice';
    import Modal from '~/components/common/Modal.vue';
    import SelectDate from '~/components/common/SelectDate.vue';
    import PlatformMixins from '~/mixins/platform';
    import misc from '~/utils/misc';
    import ConfirmStockInModal from '~/components/common/ConfirmStockInModal.vue';
    import SearchResult from '~/components/common/SearchResult.vue';

    export default {
        name: 'requireList',
        mixins: [TableHeightMixins, PlatformMixins],
        components: {
            Search, MoreOperating, Modal, SelectDate, ConfirmStockInModal, SearchResult
        },
        props: {operationId: Number, flag: String},
        data() {
            return {
                pendingDelivery: 0,
                completed: 0,
                draft: 0,
                approval: 0,
                param: {
                    pageSize: 10,
                    pageNo: 1,
                    status: null,
                    approveStatus: null,
                    searchKey: "",
                    startTime: '',
                    endTime: ''
                },
                queryrequireDetailsParam: {
                    requireNo: ""
                },
                updaterequireOrderArrivedTimeParam: {
                    requireNo: "",
                    planArrivalTime: "",
                },
                updaterequireOrderCommentParam: {
                    requireNo: "",
                    comment: "",
                },
                statusText: {
                    1: '待转配送',
                    2: '已转配送'
                },
                approveStatusText: {
                    0: '草稿',
                    1: '审批通过',
                },
                billTypeText: {
                    1: "主动配送",
                    2: "要货配送"
                },
                deleterequireOrderParam: {
                    requireNo: "",
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
                requireList: [],
                totalCount: 0,
                buttonList: [],
                isResetDate: false,
                addSuccessType: false,
                row: {},
                searchItemValueArray: [],
                isClear: false
            }
        },
        watch: {
            flag: function (nval) {
                console.log(nval,"status+approveStatus");
                this.param.pageSize = 10;
                this.param.pageNo = 1;
                if (nval === '') {
                    this.param.status = null;
                    this.param.approveStatus = null;
                } else if (nval === '1') {
                    this.param.status = 1;
                    this.param.approveStatus = null;
                } else if (nval === '2') {
                    this.param.status = 2;
                    this.param.approveStatus = null;
                } else if (nval === '3') {
                    this.param.status = null;
                    this.param.approveStatus = 0;
                } else if (nval === '4') {
                    this.param.status = null;
                    this.param.approveStatus = 1;
                }
                this.addSuccessType = false;
                this.refreshPage();
            },
            operationId: function (val1,val2) {
                console.log(val1,val2,"123");
                this.addSuccessType = true;
                this.refreshPage();
            }
        },
        computed: {
            ...mapState({}),
        },
        mounted() {
            this.refreshPage();
            this.setTableHeight(320);
        },
        methods: {
            ...mapActions([
                "requireOrderList", 
                "requireOrderChangeStatus",
                "requireOrderDelete", 
                "showPageLoading", 
                "hidePageLoading",
            ]),
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
                this.requireOrderListFunction(param);
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
            requireOrderListFunction(param) {
                this.requireOrderList(param).then((resp) => {
                    this.hidePageLoading();
                    this.requireList = resp.result;
                    this.totalCount = resp.totalCount;
                    // var i=0,j=0,m=0,n=0;
                    // for (let iii = 0; iii < resp.result.length; iii++) {
                    //     if (resp.result[iii].status === 1) {
                    //         i++;
                    //     }
                    //     if (resp.result[iii].status === 2) {
                    //         j++;
                    //     }
                    //     if (resp.result[iii].approveStatus === 0) {
                    //         m++;
                    //     }
                    //     if (resp.result[iii].approveStatus === 1) {
                    //         n++;
                    //     }
                    // }
                    // this.pendingDelivery = i;
                    // this.completed = j;
                    // this.draft = m;
                    // this.approval = n;
                    // this.$emit("getStatisticsData",[this.pendingDelivery,this.completed,this.draft,this.approval]);
                    // console.log([this.pendingDelivery,this.completed,this.draft,this.approval],"69675785")
                }).catch((err) => {
                    this.requireList = [];
                    this.totalCount = 0;
                    this.hidePageLoading();
                });
            },
            getReset() {
                this.param.searchKey = "";
                this.param.createEndTime = '';
                this.param.createStartTime = '';
                this.isResetDate = true;
                this.refreshPage()
            },
            getDeleteItem(index){
                this.searchItemValueArray.splice(index);
                this.isClear = true;
                this.param.searchKey = "";
                this.refreshPage();
            },
            viewrequireDetail(row) {
                this.$router.push(`/distribution/requireOrder/orderInfo/${row.id}/${row.requireNo}`)
            },
            // update remark
            updaterequireOrderFunction(type, val, requireNo) {
                if (type === 2) {
                    this.updaterequireOrderArrivedTimeParam.planArrivalTime = val;
                    this.updaterequireOrderArrivedTimeParam.requireNo = requireNo;
                    this.updaterequireOrderArrivedTime(this.updaterequireOrderArrivedTimeParam).then((res) => {
                        this.isRemarkDialogVisible = false;
                        this.$message({
                            message: '计划到货时间更新成功',
                            type: 'success'
                        });
                        this.refreshPage();
                    });
                } else if (type === 3) {
                    this.updaterequireOrderCommentParam.comment = val;
                    this.updaterequireOrderComment(this.updaterequireOrderCommentParam).then((res) => {
                        this.isRemarkDialogVisible = false;
                        this.$message({
                            message: '备注更新成功',
                            type: 'success'
                        });
                        this.refreshPage();
                    });
                }
            },
            showRemarkDialogVisible(comment, requireNo) {
                // this.remark = comment;
                // this.isRemarkDialogVisible = true;
                // this.updaterequireOrderCommentParam.requireNo = requireNo
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
            // 时间组件 拿到startTime & endTime 筛选查询
            getDate(time){
                this.isResetDate = false;
                this.param.startTime = time.createStartTime;
                this.param.endTime = time.createEndTime;
                this.refreshPage();
            },
            getStatus(status) {
                return this.statusText[status]
            },
            // 弃
            getApproveStatus(approveStatus) {
                return this.approveStatusText[approveStatus]
            },
            getBillType(billType) {
                return this.billTypeText[billType]
            },
            // change审批状态
            changeAppStatus(row){
                let params = {approveStatus:row.approveStatus,id:row.id}
                console.log('变更审核状态',row.approveStatus)
                this.requireOrderChangeStatus(params).then(res=>{
                    this.$message({
                        message: '审批状态修改成功',
                        type: 'success'
                    });
                    // 审批状态 数字变化
                    this.$emit("getStatisticsData", 'change');
                    this.refreshPage();
                })
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
            // 更多操作
            getHide(index){
                let eleClassList = document.getElementById('requireListTable').getElementsByClassName('el-table')[0].getElementsByClassName('el-table__row')[index].classList;
                eleClassList.remove('success-row');
                let moreOperateClassList = document.getElementById('requireListTable').getElementsByClassName('el-table')[0].getElementsByClassName('el-table__row')[index].getElementsByClassName('operate-container_div')[0].classList;
                moreOperateClassList.remove('display-block');
            },
            // 删除要货单
            deleterequire(row) {
                let confirmType = `warning`
                let confirmText = `删除`
                this.$confirm(`确认${confirmText}选中的要货单？`, `${confirmText}要货单`, {
                    confirmButtonText: '确定',
                    type: confirmType
                }).then(() => {
                    this.requireOrderDelete({id: row.id, requireNo: row.requireNo}).then(res => {
                        console.log(res)
                        this.$message({
                            type: "success",
                            message: `${confirmText}要货单成功`
                        })
                        // 删除 数字变化
                        this.$emit("getStatisticsData", 'change');
                        this.refreshPage()    
                    })
                }).catch(() => {
                })
            },
        }
    }
</script>

<style lang="scss">
    .require-list {
        .table-container {
            padding-top: 20px;
            background-color: #fff;
            height: 100%;
            .nav-top {
                display: flex;
                justify-content: space-between;
                .nav-top-left {
                    display: flex;
                }
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
