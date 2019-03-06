<template>
    <div class="AllStorageList">
        <div class="top-scroll-section">
            <div class="search">
                <search @searchValue="getSearchValue" :isClear='isClear' :propsSearchValue="goodsSkuId" :propsSearchValueChange = 'goodsSkuIdNum' :showPlaceholder="'请输入商品名称或编码搜索商品'"></search>
            </div>
            <div class="search_result_container" v-if="searchItemValueArray.length>0">
                <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount"
                               @deleteItem="getDeleteItem"></search-result>
            </div>
            <div class="table-empty-height">
                <el-table :data="skuTotalStockList" border>
                    <el-table-column label="商品名称" prop="skuName" min-width="180">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.skuName">{{scope.row.skuName ? scope.row.skuName : '--'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品编码" prop="skuId" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.skuId">{{scope.row.skuId ? scope.row.skuId : '--'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" prop="unitName" min-width="50">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.unitName"> {{scope.row.unitName ? scope.row.unitName : '--'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="库存总量" prop="productTotalNum" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-btn-show ">
                                <div class="row-show" :title="scope.row.productTotalNum" @click="LookStockTotal(scope.row.skuId,1)">
                                    {{scope.row.productTotalNum !== '' ? scope.row.productTotalNum : '--'}}
                            </div>
                                <el-button type="text" class="tabEditMarginRight" @click="LookStockTotal(scope.row.skuId,1)">详情</el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="可售库存" prop="effectiveTotalNum" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-btn-show ">
                                <div class="row-show" :title="scope.row.effectiveTotalNum" @click="LookEffectiveStock(scope.row.skuId,2)">{{scope.row.effectiveTotalNum !== '' ? scope.row.effectiveTotalNum : '--'}}
                            </div>
                                <el-button type="text" class="tabEditMarginRight" @click="LookEffectiveStock(scope.row.skuId,2)">详情</el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="代发库存" prop="proxyTotalNum" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-btn-show ">
                                <div class="row-show" :title="scope.row.proxyTotalNum" @click="LookProxyStock(scope.row.skuId,3)">
                                    {{scope.row.proxyTotalNum !== '' ? scope.row.proxyTotalNum : '--'}}
                            </div>
                                <el-button type="text" class="tabEditMarginRight" @click="LookProxyStock(scope.row.skuId,3)">详情</el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="待验库存" prop="skuName" min-width="100">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.waitCheckTotalNum">{{scope.row.waitCheckTotalNum !== '' ? scope.row.waitCheckTotalNum : '--'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="锁定库存" prop="lockTotalNum" min-width="100">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.lockTotalNum">{{scope.row.lockTotalNum !== '' ? scope.row.lockTotalNum : '--'}}</div>
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
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" background :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
            </el-pagination>
        </div>

        <modal :title="stockDetailsParms.stockDetailsDescribe+'详情'" v-model="isStockTotalDetail" width="60%" class="modelStock">
            <div class="detailsModel">商品名称：<span class="skuNameStyle">{{stockDetailsParms.stockDetailsSkuName}}</span>
                <span v-if="stockDetailsParms.stockType == 1">库存</span><span v-if="stockDetailsParms.stockType == 2">可售库存</span><span v-if="stockDetailsParms.stockType == 3">代发库存</span>总数：
                <span class="skuNameStyle">{{stockDetailsParms.stockDetailsTotal}}</span></div>
            <el-table :data="stockDetails">
                <el-table-column v-for="col,index in cols" :prop="col.prop" :label="col.label" :key="index">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row[col.prop]">
                        {{ (scope.row[col.prop] === null || scope.row[col.prop] === '' || scope.row[col.prop] === undefined)  ? '--' : scope.row[col.prop]}}
                    </div>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer"></span>
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
            <span slot="footer" class="dialog-footer"></span>
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
        name: "AllStorageList",
        components: { Search, Modal, DownloadExcel,SearchResult },
        mixins: [TableHeight],
        data(){
            return {
                storehouseId:'',//查询仓库列表的默认值
                pageSize: 10,
                pageNo: 1,
                totalCount: 0,
                searchContent:"",
                showResetButton: false,
                isShowSearchResult: false,
                skuTotalStockList:[],//全部下的库存数组
                cols:[],//库存总量和可售库存以及代发库存三种情况下的列组
                isStockTotalDetail:false,//是否显示弹窗
                stockDetails:[],//弹窗商品库存分布的列表
                stockDetailsParms:{
                    skuId:'',
                    LookstorehouseId:'',
                    stockType:'',
                    stockDetailsSkuName:'',
                    stockDetailsDescribe:'',
                    stockDetailsTotal:0,
                    modelTitile:''
                },
                snList: [],
                isSnDialogVisible: false,
                excelName: '',
                snSkuName:'',
                snTotal:"",
                searchItemValueArray: [],
                isClear: false,
                goodsSkuId:'',
                goodsSkuIdNum:'',
            }
       	},
        beforeMount(){
            this.goodsSkuIdNum=this.goodsSkuIdNum+'1';
            this.goodsSkuId = sessionStorage.getItem('goodsSkuId');
            if(this.goodsSkuId){//有值传进来就先去 搜索
                this.searchContent = this.goodsSkuId;
                this.searchItemValueArray = [this.goodsSkuId];
                this.refreshPage()
            }
            this.refreshPage()
        },
        watch: {
            flag: function(nval, oval){
                this.refreshPage()
            },
            $route(to,from){
                if(from.path==='/stock/management'){
                    this.goodsSkuId = sessionStorage.getItem('goodsSkuId');
                    if(this.goodsSkuId){
                        this.goodsSkuIdNum=this.goodsSkuIdNum+'1';
                        this.searchContent = this.goodsSkuId;
                        this.searchItemValueArray = [this.goodsSkuId];
                        this.refreshPage();
                    }
                }
            }
        },
        methods:{
            ...mapActions(["queryProductInventoryLisy","queryProductDistribution","showPageLoading","QueryStockSnList","hidePageLoading"]),
            //查询全部的
            refreshPage(){
            	let params = { pageNo:this.pageNo, pageSize:this.pageSize, storehouseId:'', searchContent:this.searchContent }
                this.showPageLoading();
                this.queryProductInventoryLisy(params).then((resp) => {
                    this.hidePageLoading()
                    this.skuTotalStockList = resp.result
                    this.totalCount = resp.totalCount;
                }).catch(error =>{
                    this.hidePageLoading()
                })
            },
            //查看库存总量
            LookStockTotal(skuId,stockType){
                this.stockDetailsParms.skuId = skuId;
                this.stockDetailsParms.stockType = stockType;
                this.getStockProxy()
            },
            //查看可售库存
            LookEffectiveStock(skuId,stockType){
                this.stockDetailsParms.skuId = skuId;
                this.stockDetailsParms.stockType = stockType;
                this.getStockProxy()
            },
            //查看代发仓库存
            LookProxyStock(skuId,stockType){
                this.stockDetailsParms.skuId = skuId;
                this.stockDetailsParms.stockType = stockType;
                this.getStockProxy()
            },
            //查询商品库存分布
            getStockProxy(){
                let param = {
                    skuId : this.stockDetailsParms.skuId,
                    stockType:this.stockDetailsParms.stockType,
                    storehouseId:this.stockDetailsParms.LookstorehouseId
                }
                this.showPageLoading()
                this.queryProductDistribution(param).then((resp) =>{
                    this.isStockTotalDetail = true
                    this.hidePageLoading()
                    this.stockDetails = []
                    this.cols = []
                    this.stockDetailsParms.stockDetailsSkuName = ''
                    this.stockDetailsParms.stockDetailsDescribe = ''
                    this.stockDetailsParms.stockDetailsTotal = 0
                    this.stockDetailsParms.stockDetailsSkuName = resp.skuName
                    if(this.stockDetailsParms.stockType == 1){
                       this.stockDetailsParms.stockDetailsDescribe = "库存总量"
                       this.cols.push({prop:"storehouseName",label:"仓库名"},{prop:"productNum",label:"库存数量"})
                    }else if(this.stockDetailsParms.stockType == 2){
                        this.stockDetailsParms.stockDetailsDescribe = "可售库存"
                        this.cols.push({prop:"storehouseName",label:"仓库名"},{prop:"productNum",label:"可售库存数量"})
                    }else if(this.stockDetailsParms.stockType == 3){
                        this.stockDetailsParms.stockDetailsDescribe = "代发库存"
                        this.cols.push({prop:"channelName",label:"渠道名"},{prop:"storehouseName",label:"仓库名"},{prop:"productNum",label:"代发库存数量"},)
                    }
                    this.stockDetails = resp.totalList;
                    if(JSON.stringify(resp) === "{}"){
                    }else{
                        this.stockDetails.forEach(item=>{
                            this.stockDetailsParms.stockDetailsTotal += item.productNum;
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
                sessionStorage.removeItem('goodsSkuId');
                this.refreshPage()
            },
            getDeleteItem(index){
                sessionStorage.removeItem('goodsSkuId');
                this.searchItemValueArray.splice(index);
                this.isClear = true;
                this.searchContent = "";
                this.refreshPage()
            },
            handleSizeChange(nSize){
                this.pageSize = nSize;
                this.refreshPage()
            },
            handleCurrentChange(nPage){
                this.pageNo = nPage;
                this.refreshPage()
            },
            showSnModal(skuId,skuName){
               this.querySnListFunction(skuId,skuName);
            },
            querySnListFunction(skuId,skuName){
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
                        this.$message({  message: '该商品无串码数据！',  type: 'warning'  });
                    }
                }).catch(error =>{
                    this.hidePageLoading()
                })
            },
            queryAllSnList(skuId,skuName,total){//把上次请求回来的所有串码传进去，再显示出来
                let AllSnParams = {
                    skuId : skuId,
                    storehouseId:'',
                    pageNo:1,
                    pageSize:total
                }
                this.QueryStockSnList(AllSnParams).then((resp) => {
                    this.snList = [];
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
            },
        }
    }
</script>
<style lang="scss">
    .AllStorageList{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .search-component{
            right:0
        }
        color:#666666;
    	.search-component{
    		margin-top:20px;
    	}
        .detailsModel{
            font-size:12px;
            margin-bottom:20px;
            .skuNameStyle{
                color:#333333;
                font-size:12px;
                margin-right:80px;
            }
        }
        .row-btn-show button{
            padding-right:10px;
        }
        .modelStock{
            .el-table {
                font-size: 12px;
                color: #888;
                border: 1px solid #eceef5;
                border-bottom: none;
            }
            .el-table__empty-block {
                border-bottom: 1px solid #eceef5;
            }
        }
        .el-dialog__footer{display:none;}
        .el-dialog__body{ padding: 0px 30px 30px 30px!important;}
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
