<template>
    <div class="purchase-list">
        <div class="table-container">
            <div class="nav-top">
                <div class="search-container">
                    <search @searchValue="getSearchValue"
                            :isClear='isClear'
                            :showPlaceholder="'输入供应商名称'"></search>
                </div>
            </div>
            <div class="search_result_container" v-if="searchItemValueArray.length>0">
                <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount"
                               @deleteItem="getDeleteItem"></search-result>
            </div>
            <div class="table-wrapper" id="purchaseListTable">
                <el-table :data="vendorSpuList" border
                          :height="tableHeight"
                          ref="vendorSpuList"
                          :row-class-name="tableRowClassName">
                    <el-table-column label="商品名称" prop="productName" min-width="170">
                        <template slot-scope="scope">
                            <div class="row-btn-show">
                                <div class="row-show" :title="scope.row.productName"
                                     @click="viewPurchaseDetail(scope.row)">{{scope.row.productName}}
                                </div>
                                <div class="operate-container">
                                    <div class="operate-container_div">
                                        <more-operating
                                            v-if="scope.row.approveStatus == 0"
                                            :buttonList="getButtonList()"
                                            @onClick="onClickOperateButton"
                                            :row="scope.row"></more-operating>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="审批状态" prop="approveStatus" min-width="110">
                        <template slot-scope='scope'>
                            <el-select @change="changeApproveStatus(scope.row)" v-model="scope.row.approveStatus" :disabled="scope.row.approveStatus == 1">
                                <el-option  :value='0' label='草稿'></el-option>
                                <el-option  :value='1' label='审批通过'></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="引进状态" prop="importStatus" min-width="110">
                        <template slot-scope='scope'>
                            <el-select @change="changeImportStatus(scope.row)" v-model="scope.row.importStatus" v-if="scope.row.importStatus == 0">
                                <el-option :value='0' label='未引进'></el-option>
                                <el-option :value='1' label='引进' :disabled="scope.row.approveStatus == 0"></el-option>
                            </el-select>
                            <span v-if="scope.row.importStatus == 1" style="padding-left: 15px;">已引进</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" prop="unitId" min-width="110"></el-table-column>
                    <el-table-column label="采购价" prop="price" min-width="110"></el-table-column>
                    <el-table-column label="供应商" prop="vendorName" min-width="130"></el-table-column>
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

    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex'
    import TableHeightMixins from '~/mixins/tableheight';
    import Search from '~/components/common/Search';
    import MoreOperating from '~/components/common/MoreOperating';
    import Modal from '~/components/common/Modal.vue';
    import PlatformMixins from '~/mixins/platform';
    import misc from '~/utils/misc';
    import SearchResult from '~/components/common/SearchResult.vue'

    export default {
        name: 'vendorSpuList',
        data() {
            return {
                param: {
                    pageSize: 10,
                    pageNo: 1,
                    importStatus: '',
                    approveStatus: '',
                    vendorName: ''
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
                },
                isStockInDialogVisible: false,
                isRemarkDialogVisible: false,
                remark: "",
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7
                    },
                },
                vendorSpuList: [],
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
            SearchResult
        },
        props: {operationId: Number, flag: String, type: String},
        watch: {
            flag: function (nval) {
                this.param.pageSize = 10;
                this.param.pageNo = 1;
                if (this.flag === '-1') {
                    this.param.importStatus = '';
                    this.param.approveStatus = '';
                    this.param.vendorName = ''
                    this.refreshPage();
                } else if (this.flag === '1') {
                    this.param.importStatus = 0;
                    this.param.approveStatus = '';
                    this.param.vendorName = ''
                    this.refreshPage();
                } else if (this.flag === '2') {
                    this.param.importStatus = 1;
                    this.param.approveStatus = '';
                    this.param.vendorName = ''
                    this.refreshPage();
                } else if (this.flag === '3') {
                    this.param.importStatus = '';
                    this.param.approveStatus = 0;
                    this.param.vendorName = ''
                    this.refreshPage();
                } else if (this.flag === '4') {
                    this.param.importStatus = '';
                    this.param.approveStatus = 1;
                    this.param.vendorName = ''
                    this.refreshPage();
                }
                this.addSuccessType = false;
                
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
            ...mapActions([
                "purchaseVendorspuQuerypagelist", 
                'purchaseVendorspuDelete', 
                'purchaseVendorspuChangeapprovestatus', 
                'purchaseVendorspuImport', 
                "showPageLoading", 
                "hidePageLoading"
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
                this.queryPurchaseOrderListFunction(param);
            },
            initData() {
                this.getReset();
            },
            getSearchValue(searchValue) {
                this.param.pageSize = 10;
                this.param.pageNo = 1;
                this.isClear = false;
                this.param.vendorName = searchValue;
                this.searchItemValueArray = [searchValue];
                this.refreshPage();
            },
            queryPurchaseOrderListFunction(param) {
                this.purchaseVendorspuQuerypagelist(param).then((resp) => {
                    this.hidePageLoading();
                    this.vendorSpuList = resp.result;
                    this.totalCount = resp.totalCount;
                }).catch((err) => {
                    this.vendorSpuList = [];
                    this.totalCount = 0;
                    this.hidePageLoading();
                });
            },
            getReset() {
                this.param.vendorName = "";
                this.param.createEndTime = '';
                this.param.createStartTime = '';
                this.isResetDate = true;
                this.refreshPage()
            },
            getDeleteItem(index){
                this.searchItemValueArray.splice(index);
                this.isClear = true;
                this.param.vendorName = "";
                this.refreshPage()
            },
            viewPurchaseDetail(row) {
                this.$router.push({path: `/purchase/vendorSpuDetails`,  query:{id: row.id}})
            },
            editPurchaseOrderFunction(row) {
                this.$router.push(`/purchase/EditPurchase/${purchaseId}`)
            },
            deletePurchaseOrderFunction(row) {
                this.deletePurchaseOrderParam.id = row.id;
                this.$confirm('确认删除此条供应商新品推荐信息', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.purchaseVendorspuDelete(this.deletePurchaseOrderParam).then((resp) => {
                        this.refreshPage();
                    });
                }).catch(() => {
                });
            },
            getButtonList() {
                let buttonArray = [{type: 'delete', text: '删除'}];
                return buttonArray
            },
            onClickOperateButton(type, row) {
                if (type === 'delete') {
                    this.deletePurchaseOrderFunction(row)
                }
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 0 && this.addSuccessType === true) {
                    return 'success-row';
                }
            },
            changeApproveStatus(row){
                let params={approveStatus:row.approveStatus,id:row.id}
                this.purchaseVendorspuChangeapprovestatus(params).then(res=>{
                    this.refreshPage();
                })
            },
            changeImportStatus(row){
                this.$router.push({name: 'vendorSpuAdd', params: {type: 'listAdd', id: row.id, productName: row.productName, introduce: row.introduce, importStatus: row.importStatus}})
                // let params = {importStatus: row.importStatus,id: row.id}
                // this.purchaseVendorregisterChangeimportstatus(params).then(res=>{
                //     this.$message({
                //         message: '引进成功',
                //         type: 'success'
                //     });
                //     this.refreshPage();
                // }).catch((err) => {
                //     this.$message({
                //         message: '引进失败',
                //         type: 'warning'
                //     });
                // });
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
