<template>
    <div class="ProxyStock ">
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
                                {{scope.row.skuName ? scope.row.skuName : '--'}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品编码" prop="skuId" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.skuId">
                                {{scope.row.skuId ? scope.row.skuId : '--'}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" prop="unitName" min-width="50">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.unitName">
                                {{scope.row.unitName ? scope.row.unitName : '--'}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="代发库存" prop="proxyTotalNum" min-width="110">
                        <template slot-scope="scope" prop="proxyTotalNum" min-width="110">
                            <div class="row-show" :title="scope.row.proxyTotalNum">
                                {{scope.row.proxyTotalNum !== '' ? scope.row.proxyTotalNum : '--'}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="可售库存" prop="proxyTotalNum" min-width="110">
                        <template slot-scope="scope" prop="proxyTotalNum" min-width="110">
                            <div class="row-show" :title="scope.row.proxyTotalNum - scope.row.lockTotalNum">
                                {{scope.row.proxyTotalNum - scope.row.lockTotalNum }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="锁定库存" prop="skuName" min-width="100">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.lockTotalNum">
                                {{scope.row.lockTotalNum  !== '' ? scope.row.lockTotalNum : '--'}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="串码" min-width="50">
                        <template slot-scope="scope">
                            <div class="row-btn-show">
                                <el-button v-if="scope.row.hasImei === 0" type="text">--</el-button>
                                <el-button v-if="scope.row.hasImei === 1" type="text" @click="showSnModal(scope.row.skuId,scope.row.skuName)">查看</el-button>
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
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" background :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"  :total="totalCount">
            </el-pagination>
        </div>
        <modal title="代发库存详情" v-model="isShowStockDetail" width="60%" class="modelStock">
            <div class="detailsModel">商品名称：<span class="skuNameStyle">{{LocalStockDetailSkuName}}</span>  代发库存总数：<span class="skuNameStyle">{{stockDetailsTotal}}</span></div>
            <el-table :data="LocalStockDetail">
                <el-table-column label="渠道名">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.channelName">
                            {{scope.row.channelName ? scope.row.channelName : '--'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="可售库存数量">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.productNum">
                            {{scope.row.productNum  !== '' ? scope.row.productNum : '--'}}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button v-if="false">取 消</el-button>
                <el-button v-if="false">确 定</el-button>
            </span>
        </modal>

        <modal v-model="isSnDialogVisible" title="串码信息" width="60%">
            <div style="margin-bottom:10px;">{{snSkuName}}&nbsp;&nbsp;&nbsp;&nbsp;串码信息</div>
            <download-excel
                v-if="snList.length>0"
                :downloadText="'共'+snTotal+'条,查看全部信息请下载'"
                :excelName="excelName"
                :data="snList"
                :label="['串码']">
            </download-excel>
            <div class="snListContainer">
                <span v-if="snList.length<=0">该入库单无串码数据！</span>
                <span v-for="item in snList">{{item}}</span>
            </div>
            <span slot="footer" class="dialog-footer"> <el-button v-if="false" >取 消</el-button>  <el-button v-if="false" >确 定</el-button> </span>
        </modal>
    </div>
</template>
<script>
	import {mapActions, mapState} from 'vuex';
    import TableHeight from '~/mixins/tableheight';
    import PlatformMixins from '~/mixins/platform';
    import Search from '~/components/common/Search';
    import Modal from '~/components/common/Modal.vue';
    import moment from 'moment'
    import DownloadExcel from '~/components/common/DownloadExcel.vue';
    import SearchResult from '~/components/common/SearchResult.vue'
    export default{
        name: "ProxyStock",
        components: { Search,Modal, DownloadExcel, SearchResult },
        props: {flag: String },
        mixins: [TableHeight],
        data(){
            return {
                storehouseId:'',//查询仓库列表的默认值
                pageSize: 10,
                pageNo: 1,
                totalCount: 0,
                searchContent:"",
                skuTotalStockList:[],
                isShowStockDetail:false,
                LocalStockDetail:[],
                LocalStockDetailSkuName:'',
                stockDetailsTotal:0,
                snList: [],
                isSnDialogVisible: false,
                excelName: '',
                snSkuName:'',
                snTotal:"",
                searchItemValueArray: [],
                isClear: false,
            }
       	},
        mounted(){
            this.storehouseId = this.flag
            this.refreshPage()
        },
        watch: {
            flag: function(nval, oval){
                this.storehouseId = this.flag
                this.refreshPage()
            }
        },
        methods:{
            ...mapActions(["queryProductDistribution","queryDistributionProductList","QueryStockSnList","showPageLoading","hidePageLoading"]),
            refreshPage(){ //更新代发仓的仓库详情列表
            	let params = {
                    pageNo:this.pageNo,
                    pageSize:this.pageSize,
                    storehouseId:this.storehouseId,
                    searchContent:this.searchContent
                }
                this.showPageLoading();
                this.queryDistributionProductList(params).then((resp) => {
                    this.hidePageLoading()
                	this.skuTotalStockList = resp.result
                	this.totalCount = resp.totalCount;
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
            showSnModal(skuId,skuName){//点击串码
               this.querySnListFunction(skuId,skuName);
            },
            querySnListFunction(skuId,skuName){//根据条件查默认120条串码
                let dataParams = {
                    skuId : skuId,
                    storehouseId:'',
                    pageNo:1,
                    pageSize:120
                }
                this.showPageLoading()
                this.QueryStockSnList(dataParams).then((resp) => {
                    this.hidePageLoading()
                    if(resp.result.length > 0){
                        this.queryAllSnList(skuId,skuName,resp.totalCount)
                    }else {
                        this.$message({  message: '该商品无串码数据！', type: 'warning' });
                    }
                }).catch(error =>{
                    this.hidePageLoading()
                })
            },
            queryAllSnList(skuId,skuName,total){//把上次请求回来的所有串码传进去，再显示出来
                this.snList = [];
                let AllSnParams = {skuId : skuId, storehouseId:'', pageNo:1, pageSize:total }
                this.QueryStockSnList(AllSnParams).then((resp) => {
                    this.isSnDialogVisible = true;
                    for (let i = 0; i < resp.result.length; i++) {
                        if (resp.result[i] !== null && resp.result[i] !== "") {
                            this.snList.push(resp.result[i])
                            let now = moment().format('YYYY-MM-DD');
                            this.excelName = `${AllSnParams.skuId} ${now}`
                            this.snSkuName = skuName;
                            this.snTotal = resp.totalCount;
                        }
                    }
                })
            }
        }
    }
</script>
<style lang="scss">
    .ProxyStock {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .search-component{ right:0 }
        .el-dialog__footer{  display:none; }
        .el-dialog__body{ padding: 0px 30px 30px 30px!important;  }
    	.search-component{ margin-top:20px; }
        .detailsModel{
            font-size:12px;
            margin-bottom:20px;
            .skuNameStyle{
                color:#333333;
                font-size:12px;
                margin-right:80px;
            }
        }
        .row-btn-show button{ padding-right:10px; }
        .modelStock{
            .el-table {
                font-size: 12px;
                color: #888;
                border: 1px solid #eceef5;
                border-bottom: none;
            }
            .el-table__empty-block { border-bottom: 1px solid #eceef5; }
        }
        .snListContainer {
            width: 100%;
            max-height: 200px;
            overflow-y: auto;
            span {
                display: inline-block;
                width: auto;
                padding: 0px 15px;
                font-size: 12px;
                line-height: 44px;
                color: #666666;
            }
        }
    }
</style>