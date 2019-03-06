<template>
    <div class="logisticsCostEntryList">
        <div class="table-container">
            <div class="nav-top">
                <div class="search-container">
                    <search @searchValue="getSearchValue" :showResetButton="showResetButton" @reset="getReset" :isShowSearchResult="isShowSearchResult" :count="totalCount" :showPlaceholder="'输入费用名称'"></search>
                </div>
                <div class="search_result_container" v-if="searchItemValueArray.length>0">
                    <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount" @deleteItem="getDeleteItem"></search-result>
                </div>
            </div>
            <div class="table-wrapper" id="purchaseListTable">
                <el-table :data="logisticsCostEntryList" border
                          :height="tableHeight"
                          ref="logisticsCostEntryList"
                          :row-class-name="tableRowClassName">
                    <el-table-column label="费用名称" prop="feeName" min-width="170">
                        <template slot-scope="scope">
                            <div class="row-btn-show">
                                <div class="row-show" :title="scope.row.feeName"
                                     @click="viewPurchaseDetail(scope.row)">{{scope.row.feeName}}
                                </div>
                                <div class="operate-container">
                                    <div class="operate-container_div">
                                        <more-operating
                                            v-if="scope.row.approveStatus==0"
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
                            <span v-if="scope.row.status == 0">未结算</span>
                            <span v-if="scope.row.status == 1">已结算</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="审批状态" prop="approveStatus" min-width="110">
                        <template slot-scope='scope'>
                            <el-select @change="changeAppStatus(scope.row)" v-model="scope.row.approveStatus" :disabled="scope.row.approveStatus == 1">
                                <el-option  :value='0' label='草稿'></el-option>
                                <el-option  :value='1' label='审批通过'></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="费用金额" prop="feeTotal" min-width="110">
                    
                    </el-table-column>
                    <el-table-column label="支付实体" prop="payGroupName" min-width="110">
                    
                    </el-table-column>
                    <el-table-column label="收款实体" prop="recGroupName" min-width="130">
                        
                    </el-table-column>
                    <el-table-column label="备注" prop="remark" min-width="110">
                        
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
        name: 'logisticsCostEntryList',
        data() {
            return {
                param: {
                    pageSize: 10,
                    pageNo: 1,
                    status: -1,
                    approveStatus: -1,
                    feeName: "",
                },
                deletePurchaseOrderParam: {
                    id: "",
                    feeName: 2
                },
                logisticsCostEntryList: [],
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
            Search, 
            MoreOperating, 
            Modal, 
            selectDateInterval,
            ConfirmStockInModal,
            SearchResult
        },
        props: {
          operationId: Number, 
          flag: String
        },
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
                    this.param.approveStatus = nval;
                    console.log('app',this.param)
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
            this.setTableHeight(275);
        },
        methods: {
            ...mapActions(["stockLogisticscostQuerylistpage",'stockLogisticscostDelete','stockLogisticscostChangeapprovestatus', "showPageLoading", "hidePageLoading"]),
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
                this.param.feeName = searchValue;
                this.searchItemValueArray = [searchValue];
                this.refreshPage();
            },
            conGroupPromotionListFunction(param) {
                this.stockLogisticscostQuerylistpage(param).then((resp) => {
                    this.hidePageLoading();
                    //console.log(resp)
                    this.approveStatus = resp.result.approveStatus
                   // this.approveStatusText = 
                    this.logisticsCostEntryList = resp.result;
                    console.log(this.logisticsCostEntryList, 998)
                    this.totalCount = resp.totalCount;
                }).catch((err) => {
                    this.logisticsCostEntryList = [];
                    this.totalCount = 0;
                    this.hidePageLoading();
                });
            },
            getReset() {
                this.param.feeName = "";
                this.showResetButton = false,
                this.isShowSearchResult = false,
                this.isResetDate = true;
                this.refreshPage()
            },
            getDeleteItem(index){
                this.searchItemValueArray.splice(index);
                this.isClear = true;
                this.param.feeName = "";
                this.refreshPage()
            },
            viewPurchaseDetail(row) {
                this.$router.push(`/stock/costManagement/logisticsCostEntryDetails/${row.id}`)
            },
            editPurchaseOrderFunction(row) {
                this.$router.push(`/stock/costManagement/logisticsCostEntryEdit/${row.id}`)
            },
            deletePurchaseOrderFunction(row) {
                this.deletePurchaseOrderParam.id = row.id;
                this.deletePurchaseOrderParam.feeName = row.feeName;
                this.$confirm('确认删除此条费用录入记录', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.stockLogisticscostDelete(this.deletePurchaseOrderParam).then((resp) => {
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
            setTableTrBg(index){
                let eleClassList = document.getElementById('purchaseListTable').getElementsByClassName('el-table')[0].getElementsByClassName('el-table__row')[index].classList;
                let moreOperateClassList = document.getElementById('purchaseListTable').getElementsByClassName('el-table')[0].getElementsByClassName('el-table__row')[index].getElementsByClassName('operate-container_div')[0].classList;
                moreOperateClassList.add('display-block');
                eleClassList.add('success-row');
            },
            changeAppStatus(row){
                let params = {approveStatus:row.approveStatus,id:row.id}
                console.log('变更审核状态',row.approveStatus)
                this.stockLogisticscostChangeapprovestatus(params).then(res=>{})
            },
        }
    }
</script>

<style lang="scss">
    .logisticsCostEntryList {
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
