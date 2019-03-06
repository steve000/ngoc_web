<template>
    <div class="purchase-list">
        <div class="table-container">
            <div class="nav-top">
                <div class="search-container">
                    <search @searchValue="getSearchValue"
                            :isClear='isClear'
                            :showPlaceholder="'输入规则名称'"></search>
                </div>
            </div>
            <div class="search_result_container" v-if="searchItemValueArray.length>0">
                <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount"
                               @deleteItem="getDeleteItem"></search-result>
            </div>
            <div class="table-wrapper" id="purchaseListTable">
                <el-table :data="feeRuleList" border
                          :height="tableHeight"
                          ref="feeRuleList"
                          :row-class-name="tableRowClassName">
                    <el-table-column label="规则名称" prop="ruleName">
                        <template slot-scope="scope">
                            <div class="row-btn-show">
                                <div class="row-show" :title="scope.row.ruleName">{{scope.row.ruleName}}
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
                    <el-table-column label="规则计算方法名" prop="ruleCalcMethod"></el-table-column>
                    <el-table-column label="费用名称" prop="feeName"></el-table-column>
                    <el-table-column label="支付实体" prop="payGroupName"></el-table-column>
                    <el-table-column label="收款实体" prop="recGroupName"></el-table-column>
                    <el-table-column label="创建人" prop="createUserName"></el-table-column>
                    <el-table-column label="创建时间" prop="createTime"></el-table-column>
                    <el-table-column label="最后操作人" prop="operateUserName"></el-table-column>
                    <el-table-column label="最后操作时间" prop="updateTime"></el-table-column>
                    <el-table-column label="规则计划时间" prop="ruleCalcTime"></el-table-column>
                    <el-table-column label="规则最后一次计算时间" prop="ruleLastCalcTime"></el-table-column>
                    <el-table-column label="计算结果" prop="ruleLastCalcResult"></el-table-column>
                    <el-table-column label="备注" prop="remark"></el-table-column>
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
    import PlatformMixins from '~/mixins/platform';
    import misc from '~/utils/misc';
    import SearchResult from '~/components/common/SearchResult.vue'

    export default {
        name: 'feeRuleList',
        data() {
            return {
                param: {
                    pageSize: 10,
                    pageNo: 1,
                    ruleName: '',
                },
                deletePurchaseOrderParam: {
                    id: "",
                },
                feeRuleList: [],
                totalCount: 0,
                buttonList: [],
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
        props: {operationId: Number, flag: String},
        watch: {
            flag: function (nval) {
                this.param.pageSize = 10;
                this.param.pageNo = 1;
                if (this.flag === '-1') {
                    this.param.ruleName = ''
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
            ...mapActions(["stockFeeruleQuerypagelist", 'stockFeeruleDelete', "showPageLoading", "hidePageLoading"]),
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
                this.param.ruleName = searchValue;
                this.searchItemValueArray = [searchValue];
                this.refreshPage();
            },
            queryPurchaseOrderListFunction(param) {
                this.stockFeeruleQuerypagelist(param).then((resp) => {
                    this.hidePageLoading();
                    this.feeRuleList = resp.result;
                    this.totalCount = resp.totalCount;
                }).catch((err) => {
                    this.feeRuleList = [];
                    this.totalCount = 0;
                    this.hidePageLoading();
                });
            },
            getReset() {
                this.param.ruleName = "";
                this.refreshPage()
            },
            getDeleteItem(index){
                this.searchItemValueArray.splice(index);
                this.isClear = true;
                this.param.ruleName = "";
                this.refreshPage()
            },
            viewPurchaseDetail(row) {
                this.$router.push({path: `/stock/feeRuleDetails`,  query:{id: row.id}})
            },
            editPurchaseOrderFunction(row) {
                this.$router.push({path: `/stock/feeRuleEdit/${row.id}`})
            },
            deletePurchaseOrderFunction(row) {
                this.deletePurchaseOrderParam.id = row.id;
                this.$confirm('确认删除此条费用计算规则', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.stockFeeruleDelete(this.deletePurchaseOrderParam).then((resp) => {
                        this.refreshPage();
                        // this.$emit("closeEdit");
                        // this.$emit("closeView");
                    });
                }).catch(() => {
                });
            },
            getButtonList() {
                let buttonArray = [{
                     type: 'edit', 
                    text: '编辑'
                },
                {
                    type: 'delete', 
                    text: '删除'
                }];
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
                    // min-width: 72px;
                    min-width: 50px;
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
