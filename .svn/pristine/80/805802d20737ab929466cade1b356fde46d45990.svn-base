<template>
    <div class="purchase-put-storage-record">
       <div v-if="InStoreRecord " v-for="(item,index) in InStoreRecord" class="putStorageOnly" style="margin:0 20px;padding:20px 0 0" >
        <div>
            <el-row>
                <el-col :span="8">入库单号：<span class="color3">{{item.stockPerInId}}</span></el-col>
                <el-col :span="8">单据状态：<span v-if="item.inStatus == 1" class="color3">待入库</span>
                    <span v-if="item.inStatus == 2" class="color3">部分入库</span>
                    <span v-if="item.inStatus == 3" class="color3">已入库</span>
                </el-col>
                <el-col :span="8">收货仓库：<span class="color3">{{item.storehouseName}}</span></el-col>
            </el-row>
        </div>
        <div style="margin:18px 0">
            <el-row>
                <el-col :span="8">操作人：<span class="color3">{{item.operateUserName}}</span></el-col>
                <el-col :span="8">操作日期：<span class="color3">{{item.createTime}}</span></el-col>
            </el-row>
        </div>
        <el-table :data="item.skuList" border :class="{'quit-border-bottom': item.skuList.length}">
            <el-table-column label="商品名称"   >
                <template slot-scope="scope">
                    <div class="row-show" :title="scope.row.skuName">
                        {{scope.row.skuName ? scope.row.skuName : '--'}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="sku编码">
                <template slot-scope="scope">
                    <div class="row-show" :title="scope.row.skuId">
                        {{scope.row.skuId ? scope.row.skuId : '--'}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="单位" prop="unitName">
                <template slot-scope="scope">
                    <div class="row-show"  :title="scope.row.unitName">
                        {{scope.row.unitName ? scope.row.unitName : '--'}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="本次入库" prop="actualInTotalCount" >
                <template slot-scope="scope">
                    <div class="row-show" :title="scope.row.actualInTotalCount" >
                    {{scope.row.actualInTotalCount ? scope.row.actualInTotalCount : '--'}}</div>
                </template>
            </el-table-column>
            <el-table-column label="备注" prop="comments">
                <template slot-scope="scope">
                    <div class="row-show"  :title="scope.row.comments">
                        {{scope.row.comments ? scope.row.comments : '--'}}
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="putStorageCrossLine" v-if="index+1 !== InStoreRecord.length"></div>
    </div>
    <div v-if="InStoreRecord == ''" style="text-align:center;margin-top:10px;color:#666666">暂无数据</div>
    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex'
    export default {
        name: "PurchasePutStorageRecord",
        props: {purchaseId: String },
        data(){
            return {
                purchaseIdnew:'',
                InStoreRecord:[],
            }
        },
        watch: {
            purchaseId(newPurchaseId ,oldPurchaseId){
                this.purchaseIdnew = newPurchaseId;
                this.refreshPage(); //newPurchaseId 更新前 //oldPurchaseId 更新后
            }
        },
        computed: {},
        mounted(){
            this.refreshPage();
        },
        methods: {
            ...mapActions(["querySinglePutstorage","showPageLoading", "hidePageLoading"]),
            refreshPage(){
                this.getRelatedSheetId()
            },
            //入库记录
            getRelatedSheetId(){
                let relatedSheetIdParms = {relatedSheetId:this.purchaseIdnew,type:1}
                this.querySinglePutstorage(relatedSheetIdParms).then((res)=>{
                    this.InStoreRecord = res.stockPerInList;
                })
            },
        }
    }
</script>
<style lang='scss'>
    .purchase-put-storage-record{
        .putStorageOnly{
            color:#666666;
            .color3{
                color:#333333;
            }
            .putStorageCrossLine{
                width:100%;
                height:1px;
                background-color:#EDEFF6;
                margin-top:20px;
            }
        }
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
</style>

