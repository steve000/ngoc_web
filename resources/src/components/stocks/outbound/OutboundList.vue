<template>
    <div class="outboundlist" @click="removeClickEffect('storageListTable')">
        <div class="table-container top-scroll-section">
            <div class="nav-top">
                <div class="nav-top-left">
                    <div class="orderStatus">
                        <label>单据状态：</label>
                        <el-select v-model="param.outStatus"
                                   placeholder="请选择" size="small"
                                   :popper-class="'reset-select-option-padding'"
                                   @change="getType">
                            <el-option v-for="item in typeList"
                                       :key="item.value"
                                       :label="item.label"
                                       class="reset-option-font"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="select-date-container">
                        <select-date-interval @date="getDate" :isReset="isResetDate"></select-date-interval>
                    </div>
                </div>
                <div class="search">
                    <search @searchValue="getSearchValue"
                            :showPlaceholder="'输入出库单号或关联单号搜索'"
                            :isClear='isClear'
                    ></search>
                </div>
            </div>
            <div class="select-storehouse">
                <label>发货仓库：</label>
                <el-select v-model="param.storehouseId"
                           filterable
                           clearable
                           size="small"
                           :popper-class="'prop_select_width_178 reset-select-option-padding'"
                           @change="getStorehouseId"
                           placeholder="请选择">
                    <el-option
                        v-for="item in storehouseList"
                        :key="item.storehouseId"
                        :label="item.storehouseName"
                        class="reset-option-font"
                        :value="item.storehouseId">
                    </el-option>
                </el-select>
            </div>
            <div class="search_result_container" v-if="searchItemValueArray.length>0">
                <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount" @deleteItem="getDeleteItem"></search-result>
            </div>
            <div class="table-wrapper table-empty-height" id="storageListTable">
                <el-table :data="StorageList" border
                          :row-class-name="tableRowClassName" ref="StorageList">
                    <el-table-column label="出库单号" prop="stockPerOutId" min-width="170">
                        <template slot-scope="scope">
                            <div class="row-title-container">
                                <div class="row-title-order" :title="scope.row.stockPerOutId"
                                     @click="viewStorageDetail(scope.row.stockPerOutId)">
                                     {{scope.row.stockPerOutId}}
                                </div>
                                <div class="operate-container">
                                    <div>
                                        <div class="stock-in-button"
                                             v-if=" scope.row.outStatus=== -1"
                                             @click="refreshOutboundOrder(scope.row)">
                                            重传出库单
                                        </div>
                                    </div>
                                    <div class="operate-container_div">
                                        <more-operating
                                            v-if="(scope.row.outStatus===1 || scope.row.outStatus===2) && (scope.row.type!==5)"
                                            :buttonList="getButtonList()"
                                            @onClick="onClickOperateButton"
                                            @hide="getHide(scope.$index,'storageListTable')"
                                            :isEnd="scope.$index===StorageList.length-1 && scope.$index!==0"
                                            @show="setTableTrBg(scope.$index,'storageListTable')"
                                            :row="scope.row"></more-operating>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="出库类型" prop="type" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="sheetTypeText[scope.row.type]">{{sheetTypeText[scope.row.type]}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="单据状态" prop="inStatus" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="outStatusText[scope.row.outStatus]">
                                <span :class="returnClass(scope.row.outStatus)"></span>
                                {{outStatusText[scope.row.outStatus]}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="关联单号">
                        <template slot-scope="scope">
                            <div class="row-title-container" >
                                <div class="row-title-order"
                                     @click="viewRelatedSheetIdDetail(scope.row)"
                                     :title="scope.row.type !==3 ?scope.row.relatedSheetId:''">
                                    {{scope.row.type !== 3 ? scope.row.relatedSheetId : "--"}}
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="发货仓库" prop="storehouseName" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.storehouseName">{{scope.row.storehouseName}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" prop="createTime" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.createTime">
                                {{scope.row.createTime}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作人" prop="operator" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.operserName">
                                {{scope.row.operserName}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" prop="comments" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.comments">{{scope.row.comments ? scope.row.comments : '无'}}</div>
                        </template>
                    </el-table-column>
                    <div slot="empty" class="table_slot_empty_text">
                        <div><img src="../../../layouts/images/nodata.png"/></div>
                        <div>暂无数据</div>
                    </div>
                </el-table>
            </div>
        </div>
        <div class="pagination-section">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="param.pageNo"
                           background
                           :page-size="param.pageSize" layout="total, sizes, prev, pager, next, jumper"
                           :total="totalCount">
            </el-pagination>
        </div>
        <modal :title="'取消出库'"
               v-model="isCancelStockOutDialogVisible"
               @save="cancelStockOutFunction"
               :showCancelButton="false"
               :width="'50%'">
            <div class="cancel-stockOut">
                <i class="iconfont1 icon-tishi"></i>请确认是否与中移物流线下沟通无误，取消后当前<span>{{clickRow.stockPerOutId}}</span>出库单将作废，是否取消？
            </div>
        </modal>
    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex'
    import TableHeight from '~/mixins/tableheight';
    import SearchResult from '~/components/common/SearchResult.vue'
    import Search from '~/components/common/Search';
    import selectDateInterval from '~/components/common/selectDateInterval';
    import MoreOperating from '~/components/common/MoreOperating';
    import Modal from '~/components/common/Modal';
    import moreOperateMixin from '~/mixins/moreOperate';
    import MessageMixins from '~/mixins/messages';
    export default{
        name: "OutboundList",
        data(){
            return {
                StorageList: [],
                storehouseList:[],
                isHide:false,
                searchItemValueArray:[],
                isClear:false,
                isCancelStockOutDialogVisible:false,
                param: {
                    pageSize: 10,
                    pageNo: 0,
                    type: '',
                    storehouseId: '',
                    searchContent: '',
                    startTime: '',
                    endTime: '',
                    outStatus: '',
                },
                isSearch: false,
                isShowSearchResult: false,
                addSuccessType: false,
                sheetTypeText: {
                    1: "销售出库",
                    2: "退货出库",
                    3: "后台出库",
                    4: "销售换货",
                    5: "调拨出库",
                    6: "采购退货出库",
                    7: "配送出库",
                    8: "配送退单出库"
                },
                outStatusText: {
                    // '-1':"出库超时",
                    1:'待出库',
                    2:'已出库',
                    3:"已完成",
                    4:'待出库撤销',
                    5:'已出库撤销'
                },
                productList: [],
                stockPerOutId:"",
                totalCount: 0,
                isStockInDialogVisible: false,
                typeList: [
                    {label: '全部类型', value: 0},
                    // {label: '出库超时', value: -1},
                    {label: '待出库', value: 1},
                    {label: '已出库',value: 2},
                    {label: '已完成', value: 3},
                    {label: '待出库撤销', value: 4},
                    {label: '已出库撤销', value: 5}
                ],
                transferStock: {},
                isDisabled: false,
                clickRow:{},
                isResetDate: false,
            }
        },
        props: {operationId: Number, flag: String},
        components: {Search, selectDateInterval, MoreOperating, Modal,SearchResult},
        mixins: [TableHeight,moreOperateMixin,MessageMixins],
        mounted(){
            this.queryStorehouseList();
            this.queryStockOutList(this.param);
        },
        watch: {
            flag: function (nval) {
                this.param.pageSize = 10;
                this.param.pageNo = 1;
                this.param.type = nval;
                this.addSuccessType = false;
                this.refreshPage()
            },
            operationId: function () {
                this.addSuccessType = true;
                this.refreshPage();
            }
        },
        methods: {
            ...mapActions(["queryStockOutSheet", "getStorehouseList","cancelStockOutSheet","allotOutCheck", 'outboundRetry',"showPageLoading", "hidePageLoading"]),
            refreshPage(param = this.param){
                this.queryStockOutList(param);
            },
            queryStockOutList(param){   //获取出库列表
                this.showPageLoading();
                this.queryStockOutSheet(param).then((resp) => {
                    this.hidePageLoading();
                    this.totalCount = resp.totalCount;
                    this.StorageList = resp.result;

                }).catch(e => {
                    this.hidePageLoading()
                });
            },
            queryStorehouseList(){
                this.getStorehouseList().then((resp) => {
                    this.storehouseList = resp;
                });
            },
            viewStorageDetail(stockPerOutId){
                this.$router.push(`/stock/ViewOutbound/${stockPerOutId}`)
            },
            handleSizeChange(nSize){
                this.param.pageSize = nSize;
                this.refreshPage();
            },
            handleCurrentChange(nPage){
                this.param.pageNo = nPage;
                this.refreshPage();
            },
            getSearchValue(searchValue){  //搜索
                // debugger
                this.param.pageSize = 10;
                this.param.pageNo = 1;
                this.param.searchContent = searchValue;
                this.addSuccessType = false;
                this.isSearch = false;
                this.refreshPage();
                this.searchItemValueArray=[searchValue];
            },
            getStorehouseId(){
                this.refreshPage();
            },
            getReset(){
                this.param.searchContent = "";
                this.param.endTime = '';
                this.param.startTime = '';
                this.param.outStatus = '';
                this.param.storehouseId = '';
                this.isResetDate = true;
                this.refreshPage()
            },
            getDeleteItem(index){
                this.searchItemValueArray.splice(index);
                this.isClear=true;
                this.param.searchContent = "";
                this.refreshPage()
            },
            getDate(time){
                this.isResetDate = false;
                this.param.startTime = time.createStartTime;
                this.param.endTime = time.createEndTime;
                this.refreshPage();
            },
            getType(){
                this.refreshPage();
            },
            getButtonList(outStatus, type){
                let buttonArray = [];
                    buttonArray.push({type: 'cancel', text: '取消'});
                    return buttonArray
            },
            onClickOperateButton(type, row){
                this.clickRow = row;
                if (type === 'cancel') {
                    this.isCancelStockOutDialogVisible = true;
                }
            },
            cancelStockOutFunction(){   //取消出库
                this.showPageLoading()
                this.cancelStockOutSheet({stockPerOutId: this.clickRow.stockPerOutId}).then((res) => {
                    this.$message({
                        type: 'success',
                        message: '取消成功!'
                    });
                    this.hidePageLoading()
                    this.isCancelStockOutDialogVisible = false;
                    this.refreshPage();
                }).catch((error)=>{
                    this.showWarning('取消出库失败，请稍后再试！');
                    this.hidePageLoading();
                    this.isCancelStockOutDialogVisible = false;
                });
            },
            returnClass(status){  //状态的颜色
                if (status === 2 || status === 3 || status == 4 || status == 5) {
                    return ' circle circle-8F9399'
                } else if (status === 1) {
                    return ' circle circle-FFA416'
                }
            },
            tableRowClassName({row, rowIndex}){  //高亮新建的第一条数据
                if (rowIndex === 0 && this.addSuccessType === true) {
                    return 'success-row';
                }
            },
            viewTransferData(param){
                this.viewTransfer(param).then((resp) => {
                    this.transferStock = resp;
                });
            },
            viewRelatedSheetIdDetail(row){   //根据关联单号跳转到销售查看详情
                let type= row.type;
                let relatedSheetId = row.relatedSheetId;
                switch (type) {
                    case 1:
                        // this.$router.push(`/sales/check/salesOrder/${relatedSheetId}`);
                        break;
                    case 2:
                        this.$router.push(`/sales/return/checkList/${relatedSheetId}`);
                        break;
                    case 3:
                        break;
                    case 4:
                        this.$router.push(`/sales/change/checkList/${relatedSheetId}`);
                        break;
                    case 5:
                        break;
                }
            },
            //重传出库单
            refreshOutboundOrder(row){
                this.showPageLoading();
                this.outboundRetry(row.stockPerOutId).then((resp) => {
                    this.hidePageLoading()
                    this.showSuccess("操作成功");
                    this.refreshPage();
                }).catch(error=>{
                    this.hidePageLoading()
                });
            },
        }
    }
</script>
<style lang="scss">
    .outboundlist {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
        .add-padding-20 {
            padding: 0px 20px;
        }
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
        .el-table__body-wrapper{
            min-height: 120px;
        }
        .cancel-stockOut {
            height: auto;
            font-size: 14px;
            color: #666666;
            line-height: 25px;
            i {
                font-size: 24px;
                color: #E6A23B;
                vertical-align: middle;
            }
            span {
                display: inline-block;
                background: #F9F2F4;
                border-radius: 2px;
                height: 20px;
                padding: 0px 10px;
                color: #C8284F;
            }
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

