<template>
    <div class="inventorychecklist">
        <div class="table-wrapper">
            <div class="searchInput">
                <el-row  v-if="isShowStock" class="stockBtn">
                    <el-row style="margin-top:20px;font-size:17px;">
                       <span class="stockNameSpan"><i class="el-icon-mobile-phone"></i> {{stockName}}</span>
                    </el-row>
                    <el-row class="pandianOrLog">
                         <el-button type="primary" size="small" @click="isCreatPandian = true">库存盘点</el-button>
                        <el-button type="primary" size="small" @click="onPandianLog()">盘点列表</el-button>
                    </el-row>
                </el-row>
                <el-row >
                    <div class="search">
                        <el-input size="small"
                            @keyup.enter.native="onSearchGoods" placeholder="输入商品条码/规格编码/商品名称"  style="width: 255px;" v-model="searchContent">
                            <i slot="prefix" class="el-input__icon el-icon-search" @click="onSearchGoods"></i>
                        </el-input>
                    </div>
                </el-row>
            </div>
            <el-table :data="skuTotalStockList" :height="tableHeight" border>
                <el-table-column v-for="col,index in cols" :prop="col.prop" :label="col.label" :key="index">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row[col.prop]">{{scope.row[col.prop]}}</div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-section">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount" prev-text="上一页" next-text="下一页">
                </el-pagination>
            </div>
        </div>
        <el-dialog :visible.sync="isCreatPandian" width="30%" center>
          <span>开始盘点后库存将被冻结，无法进行出入库操作，且盘点结果将直接影响商品库存，是否进行盘点？</span>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="isCreatPandian = false">取 消</el-button>
            <el-button size="small" type="primary" @click="onCreatPandian()">确认</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex';
    import Api from '~/utils/api';
    import TableHeight from '~/mixins/tableheight';
    import PlatformMixins from '~/mixins/platform';

    export default{
        name: "InventoryCheckList",
        props: { operationId: String, houseName: String, flag: String },
        mixins: [PlatformMixins,TableHeight],
        data(){
            return {
                nvaFag:1,//1，既以商品维度查询商品库存情况;2,以仓库维度分页查询商品库存
                storehouseId:'',//查询仓库列表的默认值
                stockName:"",//仓库名
                skuTotalStockList:[],
                pageSize: 10,
                pageNo: 1,
                totalCount: 0,
                searchContent:"",
                isShowStock:false,//是否显示仓库
                isCreatPandian:false,
                cols:[],
                selectedName: '',
                whatType:1,//从库存管理里进入详情是1
                searchType:2,
            }
        },
        watch: {
            flag: function(nval, oval){
                this.getStorehouseId(nval)
            },
            houseName:function(houseName){
                this.getHouseName(houseName)
            }
        },
        activated() {
            this.refreshPage()
        },
        mounted(){
            if(this.nvaFag == 1){
                this.refreshPage()
            }
            const userName = sessionStorage.getItem('userName');
            userName && this.changeCurrentUser(userName);
            this.setTableHeight(265)
        },
        methods:{
            ...mapActions(["queryStockProductList","queryStockIdList","storehouseList","showPageLoading","hidePageLoading",'changeCurrentUser']),
            //获得仓库id
            getStorehouseId(nval){
                this.storehouseId = Number(nval);
            },
            //获得仓库名
            getHouseName(houseName){
                if(houseName == "all"){
                    this.isShowStock = false;
                    this.stockName = "";
                    this.nvaFag = 1;
                    this.refreshPage()
                    this.setTableHeight(255)
                }else {
                    this.isShowStock = true;
                    this.stockName = houseName;
                    this.selectedName = this.storehouseId;
                    this.nvaFag = 2;
                    this.queryStockIdList_id();
                    this.setTableHeight(325)
                }
            },
            //以仓库维度分页查询商品库存
            queryStockIdList_id(){
                this.cols = [];
                this.showPageLoading();
                let reqData ={ pageSize: this.pageSize, pageNo: this.pageNo, searchContent:this.searchContent,storehouseId:this.storehouseId,searchType: this.searchType}
                this.queryStockIdList(reqData).then( resp => {
                    this.hidePageLoading();
                    if(resp.result == null || resp.result == "" || resp.result ==undefined){
                        this.skuTotalStockList = []
                        this.cols = [];
                        this.cols.push({prop:"skuBarCode",label:"条码"},{prop:"skuName",label:"商品名称"},{prop:"skuId",label:"规格编码"},{prop:"skuAttrsNew",label:"规格"},{prop:"productTotalNum",label:"库存总量"},{prop:"productNum",label:"库存量"})
                        this.totalCount = 0;
                    }else{
                         this.queryStockProduct(resp.result,resp.totalCount)
                    }
                })
            },
            queryStockProduct(result,total){
                console.log(total)
                this.cols = [];
                 this.cols.push({prop:"skuBarCode",label:"条码"},{prop:"skuName",label:"商品名称"},{prop:"skuId",label:"规格编码"},{prop:"skuAttrsNew",label:"规格"},{prop:"productTotalNum",label:"库存总量"},{prop:"productNum",label:"库存量"})
                    result.forEach(item=>{
                        item.skuAttrsNew = ''
                        item.skuAttrs.forEach(one=>{
                           item.skuAttrsNew += one.attrValue + ','
                        })
                        item.skuAttrsNew = item.skuAttrsNew.substring(0,item.skuAttrsNew.length - 1 )
                    })
                    this.skuTotalStockList = result;
                    this.totalCount = total;
            },
            refreshPage(){
                this.cols = [];
                this.showPageLoading();
                let reqData ={ pageSize: this.pageSize, pageNo: this.pageNo,  searchContent:this.searchContent }
                this.queryStockProductList(reqData).then( resp => {
                    this.hidePageLoading();
                    if(resp.result == null || resp.result == "" || resp.result ==undefined){
                        this.skuTotalStockList = []
                    }else{
                        this.queryAllProduct(resp.result,resp.totalCount)
                    }
                })
            },
            queryAllProduct(result,total){
                this.cols=[];
                 this.cols.push({prop:"skuBarCode",label:"条码"},{prop:"skuName",label:"商品名称"},{prop:"skuId",label:"规格编码"},{prop:"skuAttrsNew",label:"规格"},{prop:"productTotalNum",label:"库存总量"})
                    for(let z in result){
                        let storeList=result[z].storeList;
                        for(let index in storeList){
                            result[z][storeList[index].storehouseName] = storeList[index].productNum;
                           let findProp=this.cols.find((item)=>{
                                return item.label == storeList[index].storehouseName;
                            });
                            if(!findProp){
                                this.cols.push({prop:storeList[index].storehouseName,label:storeList[index].storehouseName})
                            }
                        }
                    }
                    result.forEach(item=>{
                        item.skuAttrsNew = ''
                        item.skuAttrs.forEach(one=>{
                           item.skuAttrsNew += one.attrValue + ','
                        })
                        item.skuAttrsNew = item.skuAttrsNew.substring(0,item.skuAttrsNew.length - 1 )
                    })
                    this.skuTotalStockList = result;
                    this.totalCount = total;
            },
            //创建盘点
            onCreatPandian(){
                // let storehouseName;
                // for(let i in this.resStorehouseList){
                //     if(this.selectedName == this.resStorehouseList[i].storehouseId){
                //         storehouseName = this.resStorehouseList[i].storehouseName
                //     }
                // }
                // let inventoryId;
                // this.isCreatPandian = false;
                let parms = {
                    storehouseId:this.selectedName
                }
                Api.creatPandian(parms).then((resp) => {
                    sessionStorage.setItem('storehouseName',this.stockName);

                   this.$router.push(`/stock/pandian/inventorypandian/${resp.inventoryId}/${this.selectedName}/${1}`)
                })
                this.isCreatPandian = false
            },
            //盘点日志
            onPandianLog(){
                sessionStorage.setItem('stockName',this.stockName);
                this.$router.push(`/stock/pandian/InventoryPandianLog/${this.storehouseId}`)
            },
            handleSizeChange(nSize){
                this.pageSize = nSize;
                if(this.nvaFag == 1){
                    this.refreshPage();
                }else if(this.nvaFag == 2){
                    this.queryStockIdList_id()
                }
            },
            handleCurrentChange(nPage){
                this.pageNo = nPage;
                 if(this.nvaFag == 1){
                    this.refreshPage();
                }else if(this.nvaFag == 2){
                    this.queryStockIdList_id()
                }
            },
            //搜索商品
            onSearchGoods(){
                if(this.nvaFag == 1){
                    this.refreshPage()
                }else if(this.nvaFag == 2){
                    this.queryStockIdList_id()
                }
            }
        },
        computed: {
            ...mapState({
                currentUser: ({ root }) => root.currentUser,
                resStorehouseList:({storehouseConfig})=>storehouseConfig.storehouseList.result,
            }),
        },
    }
</script>
<style lang="scss">
    .inventorychecklist{
        .dialogBox{
            .el-input, .el-select{
                width:75%;
            }
            .el-select .el-input{
                width:100%;
            }
            .creatPandianDialogTop{
                margin-top:40px;
            }
        }
        .pandianOrLog{
            margin-top:10px;
        }
        .stockNameSpan{
            font-size:18px;
        }
        .search{
            z-index: 10;
            height: 70px;
            width: 100%;
            line-height: 70px;
            background-color: #fff;
        }
        .pagination-section {
            padding: 20px 0;
            text-align: right;
            right: 20px;
            .btn-next:before, .btn-prev:before{
                content: "";
            }
        }
    }
</style>


















