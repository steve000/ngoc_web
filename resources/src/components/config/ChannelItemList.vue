<template>
    <div class="channel-item-list">
        <search @searchValue="getSearchValue" :showResetButton="showResetButton" @reset="getReset"
                :isShowSearchResult="isShowSearchResult" :count="totalCount"></search>
        <div class="add-container">
            <el-button type="primary" class="addButton" size="small" icon="iconfont1 icontianjia icon-tianjia"
                       @click="createChannelProduct">新增渠道商品
            </el-button>
        </div>
        <div class="filter-container">
            <div class="productStatus filter-item">
                <label>商品状态</label>
                <el-radio v-model="productStatus" label="1">全部类型</el-radio>
                <el-radio v-model="productStatus" label="2">售卖中</el-radio>
                <el-radio v-model="productStatus" label="3">停售中</el-radio>
            </div>
            <div class="filter-item">
                <label>销售方式</label>
                <el-select v-model="saleMethod" placeholder="请选择">
                    <el-option
                        v-for="item in saleMethodList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="selectedUpOrDown">
            <label>已选{{selectedNum}}条</label>
            <el-button size="small">售卖</el-button>
            <el-button size="small">停售</el-button>
        </div>
        <div class="table-wrapper">
            <el-table :data="channelList" border :height="tableHeight" width="100%">
                <el-table-column
                    type="selection"
                    width="55"></el-table-column>
                <el-table-column label="NGOC商品名称" prop="purchaseId" min-width="170">
                    <template slot-scope="scope">
                        <div class="row-btn-show ">
                            <div class="row-show" :title="scope.row.purchaseId"
                                 @click="">{{scope.row.purchaseId}}
                            </div>
                            <div class="operate-container">
                                <el-button type="text" class="mr15">启用
                                </el-button>
                                <el-button type="text" class="mr15">停用
                                </el-button>
                                <more-operating
                                    :buttonList="getButtonList"
                                    @onClick="onClickOperateButton"
                                    :row="scope.row"></more-operating>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="商品编码" prop="storehouseName" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.storehouseName">{{scope.row.storehouseName}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="渠道商商品名称" prop="supplier" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.supplier">{{scope.row.supplier}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="销售方式" prop="totalAmount" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.totalAmount">{{scope.row.totalAmount}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="状态" prop="totalAmount" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.totalAmount">{{scope.row.totalAmount}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="销售单价/元" prop="totalAmount" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.totalAmount">{{scope.row.totalAmount}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="创建人" prop="totalAmount" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.totalAmount">{{scope.row.totalAmount}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="totalAmount" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.totalAmount">{{scope.row.totalAmount}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="备注" prop="totalAmount" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.totalAmount">{{scope.row.totalAmount}}</div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-section">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page.sync="pageNo" background
                               :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                               :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import TableHeight from '~/mixins/tableheight';
    import Search from '~/components/common/Search'
    export default{
        name: 'ChannelList',
        props: {operationId: String, flag: String},
        mixins: [TableHeight],
        components: {
            Search
        },
        data(){
            return {
                pageSize: 10,
                pageNo: 1,
                totalCount: 0,
                searchContent: '',
                showResetButton: false,
                isShowSearchResult: false,
                isClick: false,
                channelList: [],
                productStatus: 1,
                saleMethodList: [{label: '全部', value: 'all'}, {label: '自发', value: 'all1'}, {
                    label: '代发',
                    value: '1'
                }, {label: '代销', value: '2'}],
                saleMethod: '',
                selectedNum: 0,
            }
        },
        watch: {
            flag: function (nval, oval) {
                this.refreshPage()
            },
            operationId: function (nval, oval) {
                this.refreshPage()
            }
        },
        mounted(){
            this.setTableHeight(350);
            this.refreshPage();
        },
        methods: {
            ...mapActions(["showPageLoading", "hidePageLoading"]),
            refreshPage(){
            },
            getSearchValue(searchValue){
                this.searchContent = searchValue;
                this.isClick = true;
                this.refreshPage();
            },
            getReset(){
                this.showResetButton = false;
                this.isShowSearchResult = false;
                this.searchContent = "";
                this.isClick = false;
                this.refreshPage()
            },
            handleSizeChange(nSize){
                this.pageSize = nSize;
                this.refreshPage();
            },
            handleCurrentChange(nPage){
                this.pageNo = nPage;
                this.refreshPage();
            },
            getButtonList(){

            },
            createChannelProduct(){

            }
        },

    }
</script>

<style lang="scss">
    .channel-item-list {
        padding-top: 20px;
        position: relative;
        .add-container {
            position: absolute;
            right: 0px;
            top: 20px;
            .icontianjia {
                margin-right: 8px;
                margin-left: -6px;
                margin-top: 1px;
                font-size: 10px;
                width: 10px;
                height: 10px;
            }
            .addButton {
                display: flex;
                margin: auto;
                font-size: 14px;
            }
        }
        .filter-container {
            display: flex;
            margin: 0 0 20px;
            .filter-item {
                min-width: 400px;
                height: 30px;
                line-height: 30px;
                label {
                    margin-right: 15px;
                }
                .el-select {
                    height: 30px;
                    .el-input {
                        height: 30px;
                        .el-input__inner {
                            height: 30px;
                        }
                    }
                }
            }
        }
        .selectedUpOrDown {
            margin: 0 0 20px;
            label {
                margin-right: 15px;
            }
        }
    }
</style>
