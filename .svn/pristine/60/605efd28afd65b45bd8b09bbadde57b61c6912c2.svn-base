<template>
    <div class="inventorylist">
        <div v-if="nvaFag==-1" style="height: 100%">
            <all-storage></all-storage>
        </div>
        <div v-if="nvaFag==0" style="height: 100%">
            <!-- 去中移物流普通仓 -->
            <zhyi-logistics-ordinary :flag="storehouseId"></zhyi-logistics-ordinary>
        </div>
        <div v-if="nvaFag==1" style="height: 100%">
            <!-- 去中移物流不良品仓 -->
            <zhyi-logistics-bad-stock :flag="storehouseId"></zhyi-logistics-bad-stock>
        </div>
        <div v-if="nvaFag==2" style="height: 100%">
            <!-- 本地普通 -->
            <local-storage :flag="storehouseId"></local-storage>
        </div>
        <div v-if="nvaFag==3" style="height: 100%">
            <!-- 本地不良品 -->
             <local-bad-storage :flag="storehouseId"></local-bad-storage>
        </div>
        <div v-if="nvaFag==4" style="height: 100%">
            <!-- 代发 -->
            <proxy-stock :flag="storehouseId"></proxy-stock>
        </div>
    </div>
</template>
<script>
import TableHeight from '~/mixins/tableheight';
import PlatformMixins from '~/mixins/platform';
import Search from '~/components/common/Search';
import AllStorage from '~/components/stocks/manage/AllStorage.vue';
import LocalStorage from '~/components/stocks/manage/LocalStorage.vue';
import LocalBadStorage from '~/components/stocks/manage/LocalBadStorage.vue';
import ZhyiLogisticsOrdinary from '~/components/stocks/manage/ZhyiLogisticsOrdinary.vue';
import ZhyiLogisticsBadStock from '~/components/stocks/manage/ZhyiLogisticsBadStock.vue';
import ProxyStock from '~/components/stocks/manage/ProxyStock.vue';

    export default{
        name: "InventoryList",
        props: {
            flag: String,stockType:String, operationId: String, storehouseType:String, storehouseChildType:String
        },
        components: { Search , AllStorage,LocalStorage, LocalBadStorage,ZhyiLogisticsOrdinary,ZhyiLogisticsBadStock,ProxyStock},
        mixins: [PlatformMixins,TableHeight],
        data(){
            return {
                nvaFag:-1,//1，既以商品维度查询商品库存情况;2,以仓库维度分页查询商品库存
               storehouseId:-1,
                pageSize: 10,
                pageNo: 1,
                totalCount: 0,
                searchContent:"",
                showResetButton: false,
                isShowSearchResult: false,
                skuTotalStockList:[],
                cols:[],
            }
        },
        watch: {
            flag: function(nval, oval){
                this.refreshPage()
            },
            operationId: function (nval, oval) {
               this.refreshPage()
            },
        },
        activated() {
            this.refreshPage()
        },
        mounted(){
           this.refreshPage()
        },
        methods:{
            refreshPage(){
                if(this.storehouseType && this.storehouseChildType){
                    this.storehouseId = this.flag;
                    console.log(this.storehouseType,"this.storehouseType")
                    if(this.storehouseType == 0){//全部
                        this.nvaFag = -1
                    }
                    if(this.storehouseType == 1){//本地
                        if(this.storehouseChildType == 1){
                            this.nvaFag = 2
                        }else if(this.storehouseChildType == 2){
                            this.nvaFag = 3
                        }
                    }else if(this.storehouseType == 2){//中移
                        if(this.storehouseChildType == 1){
                            this.nvaFag = 0
                        }else if(this.storehouseChildType == 2){
                            this.nvaFag = 1
                        }
                    }else if(this.storehouseType == 3){//代发
                            this.nvaFag = 4
                    }
                }
            },
        },
    }
</script>
<style lang="scss">
    .inventorylist{
        height: 100%;
        .dialogBox{
            .el-input, .el-select{ width:75%;}
            .el-select .el-input{ width:100%; }
            .creatPandianDialogTop{margin-top:40px;}
        }
        .pandianOrLog{ margin-top:10px;}
        .stockNameSpan{font-size:18px; }
        .search{
            margin-top:20px;
            .search-component .search-box{
                text-align: left;
            }
        }
    }
</style>
