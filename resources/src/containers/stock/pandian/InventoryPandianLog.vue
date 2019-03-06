<template>
    <div class="pandian-log">
        <div class="warehouseName">
            <i class="el-icon-tickets"></i>{{storehouseName}}
            <div class="onReturn">
                <el-button type="reset" @click="quitCreate" size="small">&nbsp;返&nbsp;&nbsp;回&nbsp;</el-button>
            </div>
        </div>
        <el-table :data="pandianLogList" header-row-class-name="header-style" >
            <el-table-column label="盘点单号" prop="inventoryId">
                <template slot-scope="scope">
                     <el-button type="text" size="small" @click="onDetail(scope.$index, scope.row)" class="row-show" :title="scope.row.inventoryId">
                        {{ scope.row.inventoryId }}
                     </el-button>
                </template>
            </el-table-column>
            <el-table-column label="盘点状态" prop="finishTime">
                <template slot-scope="scope">
                    <div>
                        <span v-if="scope.row.status == 1">盘点中</span>
                        <span v-if="scope.row.status == 2">盘点完成</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作人" prop="username">
                <template slot-scope="scope">
                    <div class="row-show" :title="scope.row.username">{{scope.row.username}}</div>
                </template>
            </el-table-column>
            <el-table-column label="最近更新时间" prop="finishTime">
                <template slot-scope="scope">
                     <!-- <span v-if="scope.row.status == 1" type="text" size="small"   class="row-show" :title="scope.row.createTime">
                        {{ scope.row.createTime }}
                     </span> -->
                     <span type="text" size="small"   class="row-show" :title="scope.row.finishTime">
                        {{ scope.row.finishTime }}
                     </span>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-section">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" background :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import PlatformMixins from '~/mixins/platform'
import {mapActions, mapState} from 'vuex'
import QuitMixins from '~/mixins/quit'
import {routesMapping} from '~/router'
export default{
    name: "InventoryPandianLog",
    mixins: [PlatformMixins,QuitMixins],
    data(){
        return {
            storehouseName:'',
            pandianLogList: [],
            pageSize: 10,
            pageNo: 1,
            totalCount: 0,
            storehouseId:''
        }
    },
    mounted(){
        this.refreshPage();
    },
     created() {
        this.storehouseName = sessionStorage.getItem('stockName'); //仓库名称
        this.storehouseId = this.$route.params.storehouseId//仓库id
    },
    activated() {
        this.refreshPage();
    },
    methods: {
         ...mapActions(["queryPandianList","showPageLoading", "hidePageLoading"]),
        refreshPage(nval){
            this.showPageLoading();
            let resData = {storehouseId:this.storehouseId,pageNo:this.pageNo,pageSize:this.pageSize}
            this.queryPandianList(resData).then( resp => {
                this.hidePageLoading();
                let result = resp.result;
                // for(let i in resp.result){
                //     let resObj = {};
                //     resObj.finishTime = misc.formatDate(new Date(resp.result[i].finishTime),'yyyy-MM-dd hh:mm')
                //     resObj.username = resp.result[i].username;
                //     resObj.storehouseId = resp.result[i].storehouseId;
                //     resObj.storehouseName = resp.result[i].storehouseName;
                //     resObj.inventoryId= resp.result[i].inventoryId;
                //     resObj.status = resp.result[i].status;
                //     resObj.createTime = misc.formatDate(new Date(resp.result[i].createTime),'yyyy-MM-dd hh:mm')
                //     result.push(resObj)
                // }
                this.pandianLogList = result;
                this.totalCount = resp.totalCount;
            })
        },
        handleSizeChange(nSize){
            this.pageSize = nSize;
            this.refreshPage();
        },
        handleCurrentChange(nPage){
            this.pageNo = nPage;
            this.refreshPage();
        },
        onDetail(index,row){
            sessionStorage.setItem('finishTime',row.finishTime);
            sessionStorage.setItem('storehouseName',row.storehouseName);
            this.$router.push(`/stock/pandian/lookinventorypandian/${row.inventoryId}/${row.storehouseId}/${row.status}`)
        },
        //关闭当前的页面
        quitCreate(){
            this.quit(routesMapping.InventoryManagement)
        },
    }
}
</script>
<style lang="scss">
.pandian-log{
    width: 100%;
    position: relative;
    padding:20px;
    background:#fff;
    .warehouseName{
        font-size:16px;
        margin-bottom:20px;
    }
    .onReturn{
        display: inline-block;
        float: right;
        font-size: 14px;
    }
    .el-table .cell button{
        text-decoration: underline
    }
   .pagination-section {
        padding-top: 20px;
        text-align: right;
        right: 20px;
        .btn-next:before, .btn-prev:before{
            content: "";
        }
    }
    .el-table-filter .el-table-filter__list>li:first-child{
        display: none;
    }
}
</style>
