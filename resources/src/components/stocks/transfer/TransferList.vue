<template>
    <div class="transfer-list">
        <div class="select-wrapper">
            <div class="pull-right">
                <select-date-interval @date="setDateRange"></select-date-interval>
            </div>
            <div class="status-list">
                <span>单据状态 : </span>
                <el-select v-model="status" placeholder="请选择" size="small">
                    <el-option v-for="item in statusList" :key="item.label"
                               :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="table-wrapper">
            <el-table :data="transferList" border width="100%">j
                <el-table-column label="调拨单号" width="130px">
                    <template slot-scope="scope">
                        <div class="row-btn-show">
                            <div class="row-show" :title="scope.row.allotId" @click="showTransfer(scope.row.allotId)">{{scope.row.allotId}}</div>
                            <el-button type="text" @click="delTransfer(scope.row.allotId)" v-if="!scope.row.allotStatus">删除</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="请货仓库">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.inStorehouseName">{{scope.row.inStorehouseName}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="发货仓库">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.outStorehouseName">{{scope.row.outStorehouseName}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="订单状态">
                    <template slot-scope="scope">
                        <div class="row-show" :title="getStatus(scope.row.allotStatus)">{{getStatus(scope.row.allotStatus)}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作人">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.userName">{{scope.row.userName}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作时间" width="150">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.updateTime">{{scope.row.updateTime}}</div>
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
    import SelectDateInterval from '~/components/common/selectDateInterval'
    export default{
        props: { operationId: String, flag: String },
        name: "GoodsList",
        components: { SelectDateInterval},
        data(){
            return {
                transferList: [],
                pageSize: 10,
                pageNo: 1,
                totalCount: 0,
                storehouseList: [],
                pageDisabled: false,
                timeRange: {},
                statusList: [
                    {label: "全部", value: ''},
                    {label: "待出库", value: '0'},
                    {label: "待入库", value: '1'},
                    {label: "已入库", value: '2'}
                ],
                status: ''
            }
        },
        watch: {
            flag: function(nval, oval){
                this.refreshPage()
            },
            operationId: function (nval, oval) {
                this.refreshPage()
            },
            status: function(nval, oval){
                this.refreshPage()
            },
        },
        mounted(){
            this.getStorehouseList({pageType: 2, storehouseStatus: [0,3]}).then( resp => {
                this.storehouseList = resp.result
                this.refreshPage();
            })
        },
        methods:{
            ...mapActions(["getTransferList","showPageLoading", "hidePageLoading","deleteTransfer","getStorehouseList",]),
            refreshPage(){
                this.showPageLoading();
                var resData ={
                    pageSize: this.pageSize,
                    pageNo: this.pageNo,
                    storehouseId : this.flag,
                    allotStatus: this.status,
                    startCreateTime: this.timeRange.createStartTime,
                    endCreateTime: this.timeRange.createEndTime
                }
                this.getTransferList(resData).then( resp => {
                    this.hidePageLoading();
                    this.transferList = resp.result;
                    this.totalCount = resp.totalCount;
                    this.getStorehouseName()
                }).catch(() => {
                    this.hidePageLoading();
                })
            },
            setDateRange(time){
                this.timeRange = time
                this.refreshPage()
            },
            getStorehouseName(){
                this.transferList.forEach(transfer => {
                    this.storehouseList.forEach( storehouse => {
                        if(transfer.inStorehouseId == storehouse.storehouseId){
                            transfer.inStorehouseName = storehouse.storehouseName
                        }
                        if(transfer.outStorehouseId == storehouse.storehouseId){
                            transfer.outStorehouseName = storehouse.storehouseName
                        }
                    })
                })
            },
            getStatus(param){
                if(param == 0){
                    return '待出库'
                }else if(param == 1){
                    return '已出库(待入库)'
                }else if(param == 2){
                    return '调拨完成'
                }else{
                    return '返回错误'
                }
            },
            showTransfer(id){
                this.$router.push(`/stock/transfer/view/${id}`);
            },
            delTransfer(id){
                this.$confirm('此操作将删除该调拨记录，是否继续', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( () => {
                    this.doDeleteTransfer(id);
                }).catch( () => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
            },
            doDeleteTransfer(id){
                this.deleteTransfer({allotId: id}).then( resp => {
                    this.refreshPage();
                    this.$emit('freshTransfer');
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
        },
    }
</script>

<style lang="scss">
    .transfer-list{
        padding-top: 20px;
        .select-wrapper{
            position: relative;
            overflow: hidden;
            margin-bottom: 20px;
        }
        .pagination-section {
            padding: 20px 0;
            text-align: right;
            right: 20px;
        }
    }

    .el-input-group__prepend{
        background-color: #fff;
    }
    .el-input-group--prepend .el-input__inner, .el-input-group__append {
        border-left: 0px;
        padding-left: 0;
    }
    .el-button+.el-button{
        margin-left: 10px;
    }
    .el-table table{
        width: 100% !important;
    }

</style>
