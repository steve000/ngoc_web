<template>
    <div class="purchase-list">
        <div class="table-container">
            <div class="nav-top">
                <div class="select-date-container" style="padding-left:15px;">
                    <!-- <select-date-interval @date="getDate" :isReset="isResetDate"></select-date-interval> -->
                    <SelectDate @date="getDate" :isReset="isResetDate"></SelectDate>
                </div>
                <div class="search-container">
                    <!-- <search @searchValue="getSearchValue"
                            :isClear='isClear'
                            :showPlaceholder="'输入盘点单号/仓储名称'"></search> -->
                    <el-select v-model="channelObj.channelId" @change="changeChannelQuery()"  placeholder="请选择渠道" size="small" style="margin-bottom: 11px;">
                        <el-option
                        v-for="(item, index) in channelQuery"
                        :key="index"
                        :label="item.channelName"
                        :value="item.channelId">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <!-- <div class="search_result_container" v-if="searchItemValueArray.length>0">
                <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount"
                               @deleteItem="getDeleteItem"></search-result>
            </div> -->
            <div class="table-wrapper" id="purchaseListTable">
                <el-table :data="channelPlanListData" border
                          :height="tableHeight"
                          ref="channelPlanListData"
                          :row-class-name="tableRowClassName">
                    <el-table-column label="渠道名称" prop="channelName" min-width="170">
                        <template slot-scope="scope">
                            <div class="row-btn-show">
                                <div class="row-show" :title="scope.row.channelName"
                                     @click="viewPurchaseDetail(scope.row)">{{scope.row.channelName}}
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
                    <el-table-column label="计划类型" prop="planType" min-width="110">
                        <template slot-scope='scope'>
                            <span v-if="scope.row.planType == 0">年度计划</span>
                            <span v-else-if="scope.row.planType == 1">月度计划</span>
                            <span v-else>--</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" prop="createTime" min-width="110"></el-table-column>
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
    // import selectDateInterval from '~/components/common/selectDateChannelPlanAdd';
    import SelectDate from '~/components/common/SelectDate';
    import PlatformMixins from '~/mixins/platform';
    import misc from '~/utils/misc';
    import SearchResult from '~/components/common/SearchResult.vue'

    export default {
        name: 'channelPlanList',
        data() {
            return {
                channelQuery: [],
                channelObj: {
                    channelId: '',
                    channelName: '',
                },
                channelPlanListData: [],
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
                    planType: -1
                },
                totalCount: 0,
                row: {},
                buttonList: [],
                isResetDate: false,
                addSuccessType: false,
                // searchItemValueArray: [],
                isClear: false,
            }
        },
        mixins: [TableHeightMixins, PlatformMixins],
        components: {
            // Search, 
            MoreOperating, 
            Modal, 
            // selectDateInterval,
            SelectDate,
            // SearchResult
        },
        props: {operationId: Number, flag: String},
        watch: {
            flag: function (nval) {
                this.param.pageSize = 10;
                this.param.pageNo = 1;
                if (this.flag == '-1') {
                    this.param.status = -1;
                    this.param.approveStatus = -1;
                    this.param.planType = -1
                    this.param.paramsearchKey = ""
                    this.param.paramdateKey = ''
                    this.param.parambeginTime = ''
                    this.param.paramendTime = ''
                } else if (this.flag === '1') {
                    this.param.planType = 0

                } else if (this.flag === '2') {
                    this.param.planType = 1
                    
                }
                this.addSuccessType = false;
                this.refreshPage();
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
            this.getchannelQuery()
            this.refreshPage();
            this.setTableHeight(280);
        },
        methods: {
            ...mapActions(["channelplanCompute","channelChannelquery","channelplanQuerylistpage", 'channelplanDelete', "showPageLoading", "hidePageLoading"]),
            getchannelQuery() {
                let datas = {
                    searchContent: ''
                }
                this.channelChannelquery(datas).then((resp) => {
                    this.channelQuery = resp.result;
                }).catch((err) => {
                });
            },
            changeChannelQuery(){
                this.param.pageSize = 10;
                this.param.pageNo = 1;
                this.param.channelId = this.channelObj.channelId
                this.refreshPage();
            },
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
            // getSearchValue(searchValue) {
            //     this.param.pageSize = 10;
            //     this.param.pageNo = 1;
            //     this.isClear = false;
            //     this.param.searchContent = searchValue;
            //     this.searchItemValueArray = [searchValue];
            //     this.refreshPage();
            // },
            queryPurchaseOrderListFunction(param) {
                this.channelplanQuerylistpage(param).then((resp) => {
                    this.hidePageLoading();
                    this.channelPlanListData = resp.result;
                    this.totalCount = resp.totalCount;
                }).catch((err) => {
                    this.channelPlanListData = [];
                    this.totalCount = 0;
                    this.hidePageLoading();
                });
            },
            getReset() {
                this.param.searchKey = "";
                this.param.beginTime = '';
                this.param.dateKey = '';
                this.param.endTime = '';
                this.isResetDate = true;
                this.refreshPage()
            },
            // getDeleteItem(index){
            //     this.searchItemValueArray.splice(index);
            //     this.isClear = true;
            //     this.param.searchContent = "";
            //     this.refreshPage()
            // },
            viewPurchaseDetail(row) {
                this.$router.push({path: `/sales/channel/channelPlanDetails`,  query:{id: row.id}})
            },
            editPurchaseOrderFunction(row) {
                this.$router.push({path: `/sales/channel/channelPlanEdit`, query:{id: row.id}})
            },
            deletePurchaseOrderFunction(row) {
                let datas = {
                    id: row.id,
                }
                this.$confirm('确认删除此条渠道计划与考核记录', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.channelplanDelete(datas).then((resp) => {
                        this.refreshPage();
                        // this.$emit("closeEdit");
                        // this.$emit("closeView");
                    });
                }).catch(() => {
                });
            },
            Calculation(row) {
                let datas = {
                    id: row.id,
                    channelId: row.channelId,
                    planType: row.planType
                }
                this.channelplanCompute(datas).then((resp) => {
                    this.refreshPage();
                });
            },
            getButtonList() {
                let buttonArray = [{type: 'Calculation', text: '计算'},{type: 'edit', text: '编辑'},{type: 'delete', text: '删除'}];
                return buttonArray
            },
            onClickOperateButton(type, row) {
                if (type === 'edit') {
                    this.editPurchaseOrderFunction(row)
                }else if(type === 'delete'){
                    this.deletePurchaseOrderFunction(row)
                }else if(type === 'Calculation'){
                    this.Calculation(row)
                }
            },
            // getDate(time, dateStatus) {
            //     this.param.startDate = time.createStartTime;
            //     this.param.endDate = time.createEndTime;
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

            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 0 && this.addSuccessType === true) {
                    return 'success-row';
                }
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
