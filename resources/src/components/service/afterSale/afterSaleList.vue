<template>
    <div class="storagelist">
        <div class="table-container">
            <div class="nav-top">
                <div class="nav-top-left">
                    <div class="orderStatus">
                        <label>时间类型：</label>
                        <el-select v-model="param.dateType"
                                   placeholder="请选择"
                                   @change="getType">
                            <el-option v-for="(item,k) in typeList"
                                       :key="k"
                                       :label="item.label"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="select-date-container">
                        <SelectDate @date="getDate" :isReset="isResetDate"></SelectDate>
                    </div>
                </div>
                <div class="search">
                    <search @searchValue="getSearchValue"
                            :isClear='isClear'
                            :showPlaceholder="'输入客户姓名'"></search>
                </div>
            </div>
            <div class="search_result_container" v-if="searchItemValueArray.length>0">
                <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount" @deleteItem="getDeleteItem"></search-result>
            </div>
            <div class="table-wrapper" id="afterSaleListTable">
                <el-table :data="afterSaleData" border
                          :height="tableHeight"
                          :row-class-name="tableRowClassName">
                    <el-table-column label="客户姓名" prop="customerName" min-width="170">
                        <template slot-scope="scope">
                            <div class="row-btn-show">
                                <div class="row-show" :title="scope.row.customerName"
                                     @click="viewStorageDetail(scope.$index)">
                                    {{scope.row.customerName}}
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="客户手机号码" prop="customerCellphoneNo" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.customerCellphoneNo">{{scope.row.customerCellphoneNo}}</div>
                        </template>
                    </el-table-column>
                </el-select>
                    </el-table-column>
                    <el-table-column label="创建时间" prop="createTime" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.createTime">{{scope.row.createTime}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="更新时间" prop="updateTime" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.updateTime">{{scope.row.updateTime}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="最后服务时间" prop="lastServiceTime" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.lastServiceTime">{{scope.row.lastServiceTime}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" prop="customerComments" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.customerComments">{{scope.row.customerComments}}</div>
                        </template>
                    </el-table-column>
                    <div slot="empty" class="table_slot_empty_text">
                        <div><img src="../../../layouts/images/nodata.png"/></div>
                        <div>暂无数据</div>
                    </div>
                </el-table>
                <div class="pagination-section" >
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                   :current-page="param.pageNo"
                                   background
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
    import Api from '~/utils/api';
    import TableHeight from '~/mixins/tableheight';
    import Search from '~/components/common/Search';
    import SelectDate from '~/components/common/SelectDate';
    import MoreOperating from '~/components/common/MoreOperating';
    import Modal from '~/components/common/Modal';
    import SearchResult from '~/components/common/SearchResult.vue'

    export default{
        name: "afterSaleList",
        data(){
            return {
                afterSaleData: [],
                param: {
                    pageSize: 10,
                    pageNo: 1,
                    customerName: '',
                    startTime: '',
                    endTime: '',
                    dateType: -1
                },
                productList: [],
                totalCount: 0,
                isStockInDialogVisible: false,
                isCancelStockInDialogVisible: false,
                typeList: [{label: '全部类型', value: -1}, {label: '创建时间', value: 0},
                    {label: '更新时间', value: 1}, {label: '最后服务时间', value: 2}],
                transferStock: {},
                isDisabled: false,
                clickRow: {},
                isResetDate: false,
                storeList: [],
                addSuccessType: false,
                isHide:false,
                searchItemValueArray:[],
                isClear:false,
            }
        },
        props: {operationId: Number, flag: String},
        components: {Search, SelectDate, MoreOperating, Modal,SearchResult},
        mixins: [TableHeight],
        mounted(){
            this.setTableHeight(325);
            this.queryStockInList(this.param);
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
            ...mapActions(["showPageLoading", "hidePageLoading", "afterSaleList"]),
            refreshPage(param = this.param){
                this.queryStockInList(param);
            },
            initData(){
                this.getReset();
            },
            queryStockInList(param){
                this.showPageLoading();
                this.afterSaleList(param).then((resp) => {
                    this.totalCount = resp.totalCount;
                    this.afterSaleData = resp.result;
                    this.hidePageLoading()
                }).catch(e => {
                    this.hidePageLoading()
                });
            },
            viewStorageDetail(id){
                this.$router.push(`/service/afterSale/details/${id}`)
            },
            handleSizeChange(nSize){
                this.param.pageSize = nSize;
                this.refreshPage();
            },
            handleCurrentChange(nPage){
                this.param.pageNo = nPage;
                this.refreshPage();
            },
            getSearchValue(searchValue){
                this.param.pageSize = 10;
                this.param.pageNo = 1;
                this.param.customerName = searchValue;
                this.addSuccessType = false;
                this.searchItemValueArray=[searchValue];
                this.isClear=false;
                this.refreshPage();
            },
            getReset(){
                this.param.customerName = "";
                this.param.endTime = '';
                this.param.startTime = '';
                this.param.dateType = '';
                this.param.userGroupId = '';
                this.isResetDate = true;
                this.refreshPage()
            },
            getDeleteItem(index){
                this.searchItemValueArray.splice(index);
                this.isClear=true;
                this.param.customerName = "";
                this.refreshPage()
            },
            getType(val) {
                console.log(val,"123");
                this.param.userGroupId = val;
                this.refreshPage();
            },
            getuserGroupId(){
                this.refreshPage();
            },
            // 时间组件 拿到startTime & endTime 筛选查询
            getDate(time){
                this.isResetDate = false;
                this.param.startTime = time.createStartTime;
                this.param.endTime = time.createEndTime;
                this.refreshPage();
            },
            tableRowClassName({row, rowIndex}){
                //新增成功之后，高亮第一行
                if (rowIndex === 0 && this.addSuccessType === true) {
                    return 'success-row';
                }
            },
            getHide(index){
                let eleClassList=document.getElementById('afterSaleListTable').getElementsByClassName('el-table')[0].getElementsByClassName('el-table__row')[index].classList;
                eleClassList.remove('success-row');
                let moreOperateClassList=document.getElementById('afterSaleListTable').getElementsByClassName('el-table')[0].getElementsByClassName('el-table__row')[index].getElementsByClassName('operate-container')[0].classList;
                moreOperateClassList.remove('display-block');
            },
            setTableTrBg(index){
                let eleClassList=document.getElementById('afterSaleListTable').getElementsByClassName('el-table')[0].getElementsByClassName('el-table__row')[index].classList;
                let moreOperateClassList=document.getElementById('afterSaleListTable').getElementsByClassName('el-table')[0].getElementsByClassName('el-table__row')[index].getElementsByClassName('operate-container')[0].classList;
                moreOperateClassList.add('display-block');
                eleClassList.add('success-row');
            }
        }
    }
</script>

<style lang="scss">
    .storagelist {
        .table-container {
            padding-top: 20px;
            background-color: #fff;
            height: 100%;
            .el-table__body-wrapper tbody tr:hover{
                .operate-container{
                    display: block;
                }
            }
            .operate-container {
                padding-right: 16px;
                min-width: 71px;
                display: none;
                div {
                    float: right;
                }
            }
            .nav-top {
                display: flex;
                justify-content: space-between;
                .nav-top-left {
                    display: flex;
                }
            }

            .table-wrapper {
                display: inline-block;
                width: 100%;
            }    
            .orderStatus {
                height: 34px;
                line-height: 34px;
                font-size: 12px;
                color: #333333;
                margin-right: 20px;
                label {
                    margin-right: 10px;
                }
                .el-input__inner {
                    height: 34px;
                    font-size: 12px;
                    color: #666666;
                    border: 1px solid #E0E0E0;
                }
            }
        }
        .cancel-stockIn {
            height: auto;
            font-size: 14px;
            color: #666666;
            line-height: 23px;
            display: table-cell;
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

