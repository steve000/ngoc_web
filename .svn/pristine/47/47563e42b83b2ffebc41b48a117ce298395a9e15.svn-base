<template>
    <div class="storagelist" @click="removeClickEffect('storageListTable')">
        <div class="top-scroll-section add-padding-20">
            <div class="table-container">
                <div class="nav-top">
                    <div class="nav-top-left">
                        <div class="orderStatus">
                            <label>单据状态：</label>
                            <el-select v-model="param.inStatus" size="small" placeholder="请选择" :popper-class="'reset-select-option-padding'" @change="getType">
                                <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" class="reset-option-font">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="select-date-container">
                            <select-date-interval @date="getDate" :isReset="isResetDate"></select-date-interval>
                        </div>
                    </div>
                    <div class="search">
                        <search @searchValue="getSearchValue" :isClear='isClear' :showPlaceholder="'请输入入库单号或关联业务单号搜索'"></search>
                    </div>
                </div>
                <div class="select-storehouse">
                    <label>收货仓库：</label>
                    <el-select v-model="param.storehouseId" size="small" clearable filterable :filter-method="storehouseFilter" @change="getStorehouseId" :popper-class="'prop_select_width_178 reset-select-option-padding'" placeholder="仓库名称或者编码">
                        <el-option v-for="item in storeList" :key="item.storehouseId" :label="item.storehouseName" :value="item.storehouseId" class="reset-option-font">
                        </el-option>
                    </el-select>
                </div>
                <div class="search_result_container" v-if="searchItemValueArray.length>0">
                    <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount" @deleteItem="getDeleteItem"></search-result>
                </div>
                <div class="table-wrapper table-empty-height" id="storageListTable">
                    <el-table :data="StorageList" border :row-class-name="tableRowClassName">
                        <el-table-column label="入库单号" prop="stockInId" min-width="170">
                            <template slot-scope="scope">
                                <div class="row-title-container">
                                    <div class="row-title-order" :title="scope.row.stockPerInId"
                                         @click="viewStorageDetail(scope.row.stockPerInId,scope.row.type,scope.row.relatedSheetId,scope.row.inStatus)">
                                        {{scope.row.stockPerInId}}
                                    </div>
                                    <div class="operate-container">
                                        <!--<div>-->
                                            <!--<div class="stock-in-button"-->
                                                 <!--v-if="scope.row.inStatus===-1">-->
                                                <!--重传入库单-->
                                            <!--</div>-->
                                        <!--</div>-->
                                        <div class="operate-container_div">
                                            <more-operating style="margin-top:2px;"
                                                            v-if="getButtonList(scope.row.inStatus,scope.row.type).length > 0"
                                                            :buttonList="getButtonList(scope.row.inStatus,scope.row.type)"
                                                            @onClick="onClickOperateButton"
                                                            @hide="getHide(scope.$index,'storageListTable')"
                                                            :isEnd="scope.$index===StorageList.length-1&& scope.$index!==0"
                                                            @show="setTableTrBg(scope.$index,'storageListTable')"
                                                            :row="scope.row"></more-operating>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="入库类型" prop="type" min-width="110">
                            <template slot-scope="scope">
                                <div class="row-show" :title="sheetTypeText[scope.row.type]">
                                    {{sheetTypeText[scope.row.type]}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="单据状态" prop="inStatus" min-width="110">
                            <template slot-scope="scope">
                                <div class="row-show" :title="inStatusText[scope.row.inStatus]">
                                    <span :class="returnClass(scope.row.inStatus)"></span>
                                    {{inStatusText[scope.row.inStatus]}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="关联单号" prop="relatedSheetId" min-width="110">
                            <template slot-scope="scope">
                                <div class="row-title-container">
                                    <div class="row-title-order" @click="viewRelatedSheetIdDetail(scope.row)"
                                         :title="scope.row.type !== 2 ?scope.row.relatedSheetId:''">
                                        {{scope.row.type !== 2 ? scope.row.relatedSheetId : "--"}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="收货仓库" prop="storehouseName" min-width="110">
                            <template slot-scope="scope">
                                <div class="row-show" :title="scope.row.storehouseName">{{scope.row.storehouseName}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="创建时间" prop="createTime" min-width="110">
                            <template slot-scope="scope">
                                <div class="row-show" :title="scope.row.createTime">
                                    {{scope.row.createTime}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作人" prop="username" min-width="110">
                            <template slot-scope="scope">
                                <div class="row-show" :title="scope.row.username">
                                    {{scope.row.username}}
                                    <!--{{scope.row.inStatus === 3 ? scope.row.username : "&#45;&#45;"}}-->
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" prop="comments" min-width="110">
                            <template slot-scope="scope">
                                <div class="row-show" :title="scope.row.comments">
                                    {{scope.row.comments !== "" && scope.row.comments !== null ? scope.row.comments : '无'}}
                                </div>
                            </template>
                        </el-table-column>
                        <div slot="empty" class="table_slot_empty_text">
                            <div><img src="../../../layouts/images/nodata.png"/></div>
                            <div>暂无数据</div>
                        </div>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="pagination-section">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="param.pageNo" background :page-size="param.pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
            </el-pagination>
        </div>
        <modal title="入库操作" v-model="isStockInDialogVisible" width="60%">
            <el-table :data="transferStock.skuList">
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
                <el-table-column label="请货数量" prop="count" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.count">{{scope.row.count}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="入库数量" prop="count" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.count">
                            {{scope.row.count}}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="allotCheck" :disabled="isDisabled">确认入库</el-button>
            </span>
        </modal>
        <modal :title="'取消入库'" v-model="isCancelStockInDialogVisible" @save="cancelStockInFunction"
               :showCancelButton="false" :width="'30%'">
            <div class="cancel-stockIn">
                <i class="iconfont1 icon-tishi"></i>请确认是否与中移物流线下沟通无误，取消后当前
                <span>{{this.clickRow.stockPerInId}}</span>入库单将作废，是否取消？
            </div>
        </modal>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import Api from '~/utils/api';
    import Search from '~/components/common/Search';
    import selectDateInterval from '~/components/common/selectDateInterval';
    import MoreOperating from '~/components/common/MoreOperating';
    import Modal from '~/components/common/Modal';
    import SearchResult from '~/components/common/SearchResult.vue';
    import moreOperateMixin from '~/mixins/moreOperate';
    import {SHEET_TYPE_TEXT,IN_STATUS_TEXT,IN_STATUS_LIST} from '~/constants/const'

    export default {
        name: "StorageList",
        data() {
            return {
                StorageList: [],
                param: {
                    pageSize: 10,
                    pageNo: 1,
                    type: "",
                    searchContent: '',
                    startTime: '',
                    endTime: '',
                    inStatus: '',
                    storehouseId: ''
                },
                sheetTypeText: SHEET_TYPE_TEXT,
                inStatusText: IN_STATUS_TEXT,
                productList: [],
                totalCount: 0,
                isStockInDialogVisible: false,
                isCancelStockInDialogVisible: false,
                typeList: IN_STATUS_LIST,
                transferStock: {},
                isDisabled: false,
                clickRow: {},
                isResetDate: false,
                storeList: [],
                addSuccessType: false,
                storehouseListTemp: [],
                isHide: false,
                searchItemValueArray: [],
                isClear: false,
            }
        },
        props: {operationId: Number, flag: String},
        components: {Search, selectDateInterval, MoreOperating, Modal, SearchResult},
        mixins: [moreOperateMixin],
        mounted() {
            this.queryStockInList(this.param);
            this.querySockList();
        },
        watch: {
            flag: function (nval) {
                this.param.pageSize = 10;
                this.param.pageNo = 1;
                this.param.type = nval;
                this.addSuccessType = false;
                this.initData();
            },
            operationId: function () {
                this.addSuccessType = true;
                this.initData();
            }
        },
        methods: {
            ...mapActions(["queryStockInListAction", "showPageLoading", "hidePageLoading", "allotCheckAction", 'viewTransfer', 'cancelStockIn', 'getStorehouseList','retryStockIn']),
            refreshPage(param = this.param) {
                this.queryStockInList(param);
            },
            initData() {
                this.getReset();
            },
            queryStockInList(param) {
                this.showPageLoading();
                this.queryStockInListAction(param).then((resp) => {
                    this.totalCount = resp.totalCount;
                    this.StorageList = resp.result;
                    this.hidePageLoading()
                }).catch(e => {
                    this.hidePageLoading()
                });
            },
            storageProductList(relatedSheetId) {
                this.isStockInDialogVisible = true;
                this.viewTransferData({allotId: relatedSheetId});
            },
            viewStorageDetail(stockPerInId, type, relatedSheetId, inStatus) {
                sessionStorage.setItem("stockPerInId", stockPerInId);
                if (type === 3) {
                    if (relatedSheetId) {
                        sessionStorage.setItem("inStatus", inStatus);
                        this.$router.push(`/stock/storage/ViewTransferStorage/${relatedSheetId}`)
                    }
                } else {
                    this.$router.push(`/stock/storage/viewStorageDetail/${stockPerInId}`)
                }
            },
            deleteStockIn(stockPerInId) {
                this.$confirm('此操作将删除该入库单，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Api.deleteStockIn({'stockPerInId': stockPerInId}).then((resp) => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.queryStockInList(this.param)
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            deleteStockIn(stockPerInId) {
                this.$confirm('此操作将删除该入库单，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Api.deleteStockIn({'stockPerInId': stockPerInId}).then((resp) => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.queryStockInList(this.param)
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSizeChange(nSize) {
                this.param.pageSize = nSize;
                this.refreshPage();
            },
            handleCurrentChange(nPage) {
                this.param.pageNo = nPage;
                this.refreshPage();
            },
            getSearchValue(searchValue) {
                this.param.pageSize = 10;
                this.param.pageNo = 1;
                this.param.searchContent = searchValue;
                this.addSuccessType = false;
                this.searchItemValueArray = [searchValue];
                this.isClear = false;
                this.refreshPage();
            },
            getReset() {
                this.refreshPage()
            },
            getDeleteItem(index) {
                this.searchItemValueArray.splice(index);
                this.isClear = true;
                this.param.searchContent = "";
                this.refreshPage()
            },
            getDate(time) {
                this.isResetDate = false;
                this.param.startTime = time.createStartTime;
                this.param.endTime = time.createEndTime;
                this.refreshPage();
            },
            getType() {
                this.refreshPage();
            },
            getStorehouseId() {
                this.refreshPage();
            },
            getButtonList(inStatus, type) {
                let buttonArray = [];
                if (inStatus === 1 ) {
                    buttonArray.push({type: 'cancel', text: '取消'});
                }
                return buttonArray
            },
            onClickOperateButton(type, row) {
                this.clickRow = row;
                if (type === 'cancel') {
                    this.isCancelStockInDialogVisible = true;
                }
            },
            cancelStockInFunction() {
                this.cancelStockIn({stockPerInId: this.clickRow.stockPerInId}).then((res) => {
                    this.$message({
                        type: 'success',
                        message: '取消成功!'
                    });
                    this.refreshPage();
                    this.isCancelStockInDialogVisible = false;
                }).catch((err)=>{
                    this.$message({
                        type: 'error',
                        message: '取消入库失败，请稍后再试!'
                    });
                    this.isCancelStockInDialogVisible = false;
                });
            },
            allotCheck() {
                this.isDisabled = true;
                this.allotCheckAction({stockPerInId: this.stockPerInId}).then((resp) => {
                    this.$message({
                        type: 'success',
                        message: '确认入库成功'
                    });
                    this.refreshPage();
                    this.isDisabled = false;
                    this.isStockInDialogVisible = false;
                }).catch((err) => {
                    this.isDisabled = false;
                });
            },
            viewTransferData(param) {
                this.viewTransfer(param).then((resp) => {
                    this.transferStock = resp;
                });

            },
            returnClass(inStatus) {
                switch (inStatus) {
                    case 1:
                        return ' circle circle-F66E6E';
                        break;
                    case 2:
                        return ' circle circle-FFA416';
                        break;
                    case 3:
                        return ' circle circle-8F9399';
                    case 4:
                        return ' circle circle-8F9399';
                        break
                }
            },
            querySockList() {
                this.getStorehouseList().then((resp) => {
                    this.storeList = resp;
                    this.storehouseListTemp = resp;
                });
            },
            tableRowClassName({row, rowIndex}) {
                //新增成功之后，高亮第一行
                if (rowIndex === 0 && this.addSuccessType === true) {
                    return 'success-row';
                }
            },
            storehouseFilter(string) {
                if (!string) {
                    return this.storeList = this.storehouseListTemp
                }
                this.storeList = this.storehouseListTemp.filter((item) => {
                    if ((item.storehouseId && item.storehouseId.toString().indexOf(string) >= 0) || (item.storehouseName && item.storehouseName.toString().indexOf(string)) >= 0) {
                        return item
                    }
                })
            },
            viewRelatedSheetIdDetail(row) {
                let type = row.type;
                let relatedSheetId = row.relatedSheetId;
                switch (type) {
                    case 1:
                        this.$router.push(`/purchase/ViewPurchaseOrder/${relatedSheetId}`);
                        break;
                    case 4:
                        this.$router.push(`/sales/return/checkList/${relatedSheetId}`);
                        break;
                    case 5:
                        break;
                    case 6:
                        this.$router.push(`/sales/change/checkList/${relatedSheetId}`);
                        break;
                    case 7:
                        this.$router.push(`/sales/proxy/checkOrder/${relatedSheetId}`);
                        break;
                }
            },
            retryStockInFunction(){
                this.retryStockIn({stockPerInId:'123'}).then((res)=>{
                    this.$message({
                        message: '重传入库单成功',
                        type: 'success'
                    });
                })
            }
        }
    }
</script>

<style lang="scss">
    .storagelist {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
        .table-container {
            padding-top: 20px;
            background-color: #fff;
            height: 100%;
            .cell {
                overflow: visible;
            }
            .el-table__body-wrapper tbody tr:hover {
                .more-operating {
                    display: block;
                }
            }
            .operate-container {
                min-width: 64px;
                .operate-container_div{
                    width: 48px;
                }
            }
            .nav-top {
                display: flex;
                justify-content: space-between;
                .nav-top-left {
                    display: flex;
                }
            }
            .orderStatus {
                height: 32px;
                line-height: 32px;
                font-size: 12px;
                color: #333333;
                margin-right: 20px;
                label {
                    margin-right: 10px;
                }
                .el-input__inner {
                    height: 32px;
                    font-size: 12px;
                    color: #666666;
                    border: 1px solid #e0e0e0;
                }
            }
        }
        .el-table__body-wrapper {
            min-height: 120px;
        }
        .select-storehouse {
            margin-bottom: 20px;
            text-align: left;
            height: 34px;
            line-height: 34px;
            font-size: 12px;
            color: #333333;
            label {
                margin-right: 10px;
            }
        }
    }
</style>
