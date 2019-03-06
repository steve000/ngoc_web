<template>
    <div class="LocalBadStorage ">
        <div class="top-scroll-section">
            <div class="search">
                 <search @searchValue="getSearchValue" :isClear='isClear' :showPlaceholder="'请输入商品名称或编码搜索商品'"></search>
            </div>
            <div class="search_result_container" v-if="searchItemValueArray.length>0">
                <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount" @deleteItem="getDeleteItem"></search-result>
            </div>
            <div class="table-empty-height">
            	<el-table :data="skuTotalStockList" border>
            		<el-table-column label="商品名称" prop="skuName" min-width="180">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.skuName">
                            {{scope.row.skuName ? scope.row.skuName : '--'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品编码" prop="skuId" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.skuId">
                            {{scope.row.skuId ? scope.row.skuId : '--'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" prop="unitName" min-width="50">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.unitName">
                            {{scope.row.unitName ? scope.row.unitName : '--'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="待验库存总量" prop="productTotalNum" min-width="100">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.waitCheckTotalNum">
                                {{scope.row.waitCheckTotalNum !== '' ? scope.row.waitCheckTotalNum : '--'}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="代发待验库存" prop="effectiveTotalNum" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-btn-show ">
                                <div class="row-show" :title="scope.row.proxyWaitCheckTotalNum" @click="LookProxyStock(scope.row.skuId)">
                                    {{scope.row.proxyWaitCheckTotalNum !== '' ? scope.row.proxyWaitCheckTotalNum : '--'}}
                                </div>
                                <el-button type="text" class="tabEditMarginRight" @click="LookProxyStock(scope.row.skuId)">详情</el-button>
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
        <div class="pagination-section" >
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" background :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
            </el-pagination>
        </div>
        <modal title="代发待验库存详情" v-model="isShowStockDetail" width="60%" class="modelStock">
            <div class="detailsModel">商品名称：<span class="skuNameStyle">{{LocalStockDetailSkuName}}</span>  代发待验库存总数：<span class="skuNameStyle">{{stockDetailsTotal}}</span></div>
            <el-table :data="LocalStockDetail">
                <el-table-column label="渠道名">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.channelName">
                            {{scope.row.channelName ? scope.row.channelName : '--'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="代发待验库存数量">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.productNum">
                            {{scope.row.productNum ? scope.row.productNum : '--'}}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button v-if="false" @click="isShowStockDetail = false">取 消</el-button>
                <el-button v-if="false" type="primary" @click="isShowStockDetail = false">确 定</el-button>
            </span>
        </modal>
    </div>
</template>
<script>
	import {mapActions, mapState} from 'vuex';
    import PlatformMixins from '~/mixins/platform';
    import Search from '~/components/common/Search';
    import Modal from '~/components/common/Modal.vue';
    import SearchResult from '~/components/common/SearchResult.vue'
    export default{
        name: "LocalBadStorage",
        components: { Search, Modal, SearchResult },
        props: {flag: String },
        data(){
            return {
                storehouseId:'',//查询仓库列表的默认值
                pageSize: 10,
                pageNo: 1,
                totalCount: 0,
                searchContent:"",
                showResetButton: false,
                isShowSearchResult: false,
                skuTotalStockList:[],
                isShowStockDetail:false,
                LocalStockDetail:[],
                LocalStockDetailSkuName:'',
                stockDetailsTotal:0,
                searchItemValueArray: [],
                isClear: false,
                goodsSkuId:''
            }
       	},
        mounted(){
        	this.storehouseId = this.flag
        	this.refreshPage()
        },
        watch: {
            flag: function(nval, oval){
                this.storehouseId = nval
                this.refreshPage()
            },
        },
        methods:{
            ...mapActions(["queryProductInventoryLisy","queryProductDistribution","showPageLoading","hidePageLoading"]),
            refreshPage(){//更新本地不良品仓的仓库数据
            	let params = {
                    pageNo:this.pageNo,
                    pageSize:this.pageSize,
                    storehouseId:this.storehouseId,
                    searchContent:this.searchContent
                }
                this.showPageLoading();
                this.queryProductInventoryLisy(params).then((resp) => {
                    this.hidePageLoading()
                	this.skuTotalStockList = resp.result
                	this.totalCount = resp.totalCount;
                }).catch(error =>{
                    this.hidePageLoading()
                })
            },
            LookProxyStock(skuId){//查看代发仓详情
                let param = {
                    skuId : skuId,
                    stockType:3,
                    storehouseId:this.storehouseId
                }
                this.LocalStockDetail = []
                this.LocalStockDetailSkuName = ''
                this.stockDetailsTotal = 0;
                this.showPageLoading();
                this.queryProductDistribution(param).then((resp) =>{
                    this.isShowStockDetail = true
                    this.hidePageLoading()
                    this.LocalStockDetailSkuName = resp.skuName
                    this.LocalStockDetail = resp.totalList;
                    if(JSON.stringify(resp) === "{}"){
                    }else{
                       this.LocalStockDetail.forEach(item=>{
                            this.stockDetailsTotal += item.productNum;
                        })

                    }
                }).catch(error =>{
                    this.hidePageLoading()
                })
            },
            getSearchValue(searchValue){
                this.searchContent = searchValue;
                this.isClear = false;
                this.searchItemValueArray = [searchValue];
                this.refreshPage()
            },
            getDeleteItem(index){
                this.searchItemValueArray.splice(index);
                this.isClear = true;
                this.searchContent = "";
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
        }
    }
</script>
<style lang="scss">
    .LocalBadStorage {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .search-component{
            right:0
        }
        .el-dialog__footer{ display:none; }
        .el-dialog__body{ padding: 0px 30px 30px 30px!important; }
    	.search-component{ margin-top:20px; }
        .row-btn-show button{  padding-right:10px;   }
        .detailsModel{
            font-size:12px;
            margin-bottom:20px;
            .skuNameStyle{
                color:#333333;
                font-size:12px;
                margin-right:80px;
            }
        }
        .modelStock{
            .el-table {
                font-size: 12px;
                color: #888;
                border: 1px solid #eceef5;
                border-bottom: none;
            }
            .el-table__empty-block {  border-bottom: 1px solid #eceef5; }
        }
    }
</style>