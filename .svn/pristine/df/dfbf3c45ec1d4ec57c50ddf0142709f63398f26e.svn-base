<template>
    <div class="purchase-list">
        <div class="table-container">
            <div class="nav-top">
                <div class="select-date-container" style="display:flex;align-items: center;">
                    <SelectDate @date="getDate" :isReset="isResetDate"></SelectDate>
                </div>
                <div class="search-container">
                    <search @searchValue="getSearchValue"
                            :isClear='isClear'
                            :showPlaceholder="'输入供应商名称/编码/操作人'"></search>
                </div>
            </div>
            <div class="search_result_container" v-if="searchItemValueArray.length>0">
                <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount"
                               @deleteItem="getDeleteItem"></search-result>
            </div>
            <div class="table-wrapper" id="purchaseListTable">
                <el-table :data="userGroupVendorList" border
                          :height="tableHeight"
                          ref="userGroupVendorList"
                          :row-class-name="tableRowClassName">
                    <el-table-column label="供应商名称" prop="vendorName" min-width="170">
                        <template slot-scope="scope">
                            <div class="row-btn-show">
                                <div class="row-show" :title="scope.row.vendorName">
                                    {{scope.row.vendorName}}
                                </div>
                                <div class="operate-container">
                                    <div class="operate-container_div">
                                        <more-operating
                                            :buttonList="getButtonList()"
                                            @onClick="onClickOperateButton"
                                            :row="scope.row"></more-operating>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="供应商编码" prop="vendorNumber" min-width="110"></el-table-column>
                    <el-table-column label="添加时间" prop="createTime" min-width="110"></el-table-column>
                    <el-table-column label="操作人" prop="operateUserName" min-width="110"></el-table-column>
                    <el-table-column label="备注" prop="comment" min-width="110"></el-table-column>
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
    import SelectDate from '~/components/common/SelectDate';
    import MoreOperating from '~/components/common/MoreOperating';
    import Modal from '~/components/common/Modal.vue';
    import PlatformMixins from '~/mixins/platform';
    import misc from '~/utils/misc';
    import SearchResult from '~/components/common/SearchResult.vue'

    export default {
        name: 'userGroupVendorList',
        data() {
            return {
                param: {
                    pageSize: 10,
                    pageNo: 1,
                    startTime: '',
                    endTime: '',
                    searchKey: ''
                },
      
                deletePurchaseOrderParam: {
                    id: "",
                },
                userGroupVendorList: [],
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
            SelectDate,
            SearchResult
        },
        props: {operationId: Number, flag: String, type: String},
        watch: {
            flag: function (nval) {
                this.param.pageSize = 10;
                this.param.pageNo = 1;
                if (this.flag === '-1') {
                    this.param.searchKey = ''
                    this.refreshPage();
                }
                this.addSuccessType = false;
                
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
            this.refreshPage();
            this.setTableHeight(280);
        },
        methods: {
            ...mapActions([
                "purchaseUsergroupvendorQuerylistpage", 
                'purchaseUsergroupvendorDelete', 
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
                this.param.searchKey = searchValue;
                this.searchItemValueArray = [searchValue];
                this.refreshPage();
            },
            queryPurchaseOrderListFunction(param) {
                this.purchaseUsergroupvendorQuerylistpage(param).then((resp) => {
                    this.hidePageLoading();
                    this.userGroupVendorList = resp.result;
                    this.totalCount = resp.countTotal;
                }).catch((err) => {
                    this.userGroupVendorList = [];
                    this.totalCount = 0;
                    this.hidePageLoading();
                });
            },
            getReset() {
                this.param.searchKey = "";
                this.param.endTime = '';
                this.param.startTime = '';
                this.isResetDate = true;
                this.refreshPage()
            },
            getDeleteItem(index){
                this.searchItemValueArray.splice(index);
                this.isClear = true;
                this.param.searchKey = "";
                this.refreshPage()
            },
            deletePurchaseOrderFunction(row) {
                this.deletePurchaseOrderParam.id = row.id;
                this.$confirm('确认删除此条实体供应商', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.purchaseUsergroupvendorDelete(this.deletePurchaseOrderParam).then((resp) => {
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
            getDate(time){
                this.isResetDate = false;
                this.param.startTime = time.createStartTime;
                this.param.endTime = time.createEndTime;
                this.refreshPage();
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
