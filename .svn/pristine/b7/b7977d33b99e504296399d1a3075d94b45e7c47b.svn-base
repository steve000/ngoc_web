<template>
    <div class="conGroup-promotion-list">
        <div class="table-container">
            <div class="nav-top">
                <div class="search-container">
                    <search ref="searchParent" @searchValue="getSearchValue" :showResetButton="showResetButton" @reset="getReset" :isShowSearchResult="isShowSearchResult" :count="totalCount" :showPlaceholder="'输入促销单号'"></search>
                </div>
                <div class="search_result_container" v-if="searchItemValueArray.length>0">
                    <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount" @deleteItem="getDeleteItem"></search-result>
                </div>
            </div>
            <div class="table-wrapper" id="purchaseListTable">
                <el-table :data="purchaseList" border
                          :height="tableHeight"
                          ref="purchaseList"
                          :row-class-name="tableRowClassName">
                    <el-table-column label="促销单号" prop="promotionNo" min-width="170">
                        <template slot-scope="scope">
                            <div class="row-btn-show">
                                <div class="row-show" :title="scope.row.promotionNo"
                                     @click="viewPurchaseDetail(scope.row)">{{scope.row.promotionNo}}
                                </div>
                                <div class="operate-container">
                                    <div class="operate-container_div">
                                        <more-operating
                                            v-if="scope.row.approveStatus==0"
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
                    <el-table-column label="单据状态" prop="status" min-width="110">
                        <template slot-scope='scope'>
                            <el-select @change="changeStatus(scope.row)" v-model="scope.row.status"
                            :disabled="scope.row.approveStatus == 0 || scope.row.status== 1">
                                <el-option  :value='0' label='已保存'></el-option>
                                <el-option  :value='1' label='已记账'></el-option>
                            </el-select>
                            
                        </template>
                    </el-table-column>
                    <el-table-column label="审批状态" prop="approveStatus" min-width="110">
                        <template slot-scope='scope'>
                            <el-select @change="changeAppStatus(scope.row)" v-model="scope.row.approveStatus" :disabled="scope.row.approveStatus == 1">
                                <el-option  :value='0' label='草稿'></el-option>
                                <el-option  :value='1' label='已审批'></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="促销标题" prop="promotionTitle" min-width="110">
                    
                    </el-table-column>
                    <el-table-column label="开始时间" prop="beginTime" min-width="110">
                    
                    </el-table-column>
                    <el-table-column label="结束时间" prop="endTime" min-width="130">
                        
                    </el-table-column>
                    <el-table-column label="创建时间" prop="createTime" min-width="110">
                        
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
        name: 'conGroupPromotionList',
        data() {
            return {
                param: {
                    pageSize: 10,
                    pageNo: 1,
                    status: -1,
                    approveStatus: -1,
                    promotionNo: "",
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
                deletePurchaseOrderParam: {
                    id: "",
                    promotionNo: 2
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
                showResetButton: false,
                isShowSearchResult: false,
                searchItemValueArray: [],
                isClear: false,
                approveStatus:0,
                approveStatusText:'',
                changeappStatus:'',
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
                    console.log('status',this.param)
                } else if (this.type === 'approveStatus') {
                    this.param.status = -1;
                    this.param.approveStatus = nval -2;
                    console.log('app',this.param)
                }
                this.addSuccessType = false;
                // this.initData();
                this.getDeleteItem()
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
            this.setTableHeight(275);
        },
        methods: {
            ...mapActions(["conGroupPromotionList",'conGroupPromotionDelete','conGroupPromotionChangeApp','conGroupPromotionChange', 'updatePurchaseOrderComment', "showPageLoading", "hidePageLoading"]),
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
                this.conGroupPromotionListFunction(param);
            },
            initData() {
                this.getReset();
            },
            getSearchValue(searchValue) {
                this.param.pageSize = 10;
                this.param.pageNo = 1;
                this.isClear = false;
                this.param.promotionNo = searchValue;
                this.searchItemValueArray = [searchValue];
                this.refreshPage();
            },
            conGroupPromotionListFunction(param) {
                this.conGroupPromotionList(param).then((resp) => {
                    this.hidePageLoading();
                    //console.log(resp)
                    this.approveStatus = resp.result.approveStatus
                   // this.approveStatusText = 
                    this.purchaseList = resp.result;
                    console.log(this.purchaseList, 998)
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
                this.param.promotionNo = "";
                this.param.createEndTime = '';
                this.param.createStartTime = '';
                this.showResetButton = false,
                this.isShowSearchResult = false,
                this.isResetDate = true;
                this.refreshPage()
            },
            getDeleteItem(index){
                this.$refs.searchParent.searchForm.searchValue = ''
                this.searchItemValueArray.splice(index);
                this.isClear = true;
                this.param.promotionNo = "";
                this.refreshPage()
            },
            viewPurchaseDetail(row) {
                this.$router.push({path: `/sales/promotion/conGroupPromotionDetails/`, query:{id: row.id}})
            },
            editPurchaseOrderFunction(row) {
                this.$router.push({path: `/sales/promotion/conGroupPromotionEdit/`, query:{id: row.id}})
            },
            deletePurchaseOrderFunction(row) {
                this.deletePurchaseOrderParam.id = row.id;
                this.deletePurchaseOrderParam.promotionNo = row.promotionNo;
                this.$confirm('确认删除此条条件组合促销记录', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.conGroupPromotionDelete(this.deletePurchaseOrderParam).then((resp) => {
                        this.refreshPage();
                        this.$emit("closeEdit");
                        this.$emit("closeView");
                    });
                }).catch(() => {
                });
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
            },
            changeAppStatus(row){
                let params = {approveStatus:row.approveStatus,id:row.id}
                console.log('变更审核状态',row.approveStatus)
                this.conGroupPromotionChangeApp(params).then(res=>{})
            },
            changeStatus(row){
                let params={status:row.status,id:row.id}
                this.conGroupPromotionChange(params).then(res=>{})
            }
        }
    }
</script>

<style lang="scss">
    .conGroup-promotion-list {
        .table-container {
            padding-top: 20px;
            background-color: #fff;
            height: 100%;
            .nav-top {
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
