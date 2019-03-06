<template>
    <div class="storehouse-list">
        <div class="top-scroll-section">
            <div class="table-wrapper table-empty-height">
                <el-table :data="storehouseList" border :row-class-name="tableRowClassName">
                    <el-table-column label="仓库名称">
                        <template slot-scope="scope">
                            <div class="row-btn-show">
                                <div class="row-show" :title="scope.row.storehouseName" style="color: #424e67">
                                    {{scope.row.storehouseName}}</div>
                                <div class="operate-container_div mr20" title="更多">
                                    <el-popover placement="bottom" trigger="click"
                                                :popper-class='paddingClass'>

                                            <div >
                                                <el-button type="text" class="operating-button"  @click="btnClick(1,scope.row)">编辑</el-button>
                                            </div>
                                            <div>
                                                <el-button type="text" class="operating-button"  @click="btnClick(2,scope.row)" v-if="status[scope.$index] == 1">删除</el-button>
                                            </div>

                                        <el-button type="text" slot="reference"><i class="el-icon-more"></i></el-button>
                                    </el-popover>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="仓库编号" width="200">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.storehouseId">
                                {{scope.row.storehouseId ? scope.row.storehouseId : '--'}}
                        </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="仓库类型" width="150">
                        <template slot-scope="scope">
                            <div class="row-show" >
                                {{getType(scope.row.storehouseType,scope.row.storehouseChildType) ? getType(scope.row.storehouseType,scope.row.storehouseChildType) : '--'}}
                    </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建人" width="120">
                        <template slot-scope="scope">
                            <div class="row-show">
                                {{scope.row.operaterUserName ? scope.row.operaterUserName : '--'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间"  width="150">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.createTime">
                                {{scope.row.createTime ? scope.row.createTime : '--'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" width="200">
                        <template slot-scope="scope">
                            <el-select v-model="status[scope.$index]" size="small" @change="changeStatus(scope.row.storehouseId,status[scope.$index])"
                                       style="font-size: 12px; width: 120px">
                                <el-option v-for="item in statusList" :key="item.value" style="font-size: 12px"
                                           :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <div slot="empty" class="table_slot_empty_text">
                        <div><img src="../../layouts/images/nodata.png"/></div>
                        <div>暂无数据</div>
                    </div>
                </el-table>
            </div>
        </div>

        <div class="pagination-section">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="pageNo" background
                           :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="totalCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import MoreOperating from '~/components/common/MoreOperating';
    import MessageMixins from '~/mixins/messages';
    export default{
        name: "StorehouseList",
        components: {MoreOperating},
        props: { operationId: String, flag: String },
        mixins: [MessageMixins],
        data(){
            return {
                storehouseList: [],
                pageNo: 1,
                pageSize: 10,
                totalCount: 0,
                addSuccessType: false,
                paddingClass:'padding-0',
                buttonList: [{type: 1, text: "编辑"},{type: 2, text: "删除"}],
                status: [],
                statusList: [{value: 0, label: "启用"},{value: 1, label: "禁用"}],
            }
        },
        component: {MoreOperating},
        watch: {
            flag: function(nval, oval){
                this.addSuccessType = false
                this.refreshPage()
            },
            operationId: function (nval, oval) {
                this.addSuccessType = true
                this.refreshPage()
            }
        },
        mounted(){
            this.refreshPage();
        },
        methods: {

            ...mapActions(["queryAllStorehouseList","changeStorehouseStatus","showPageLoading","hidePageLoading"]),
            onPageRefresh(){
                this.refreshPage();
            },
            getType(type1,type2){
                if(type1 == 1){
                    if(type2 == 1){
                        return "本地普通仓"
                    }else{
                        return "本地不良品仓"
                    }
                }
                if(type1 == 2){
                    if(type2 == 1){
                        return "物流普通仓"
                    }else{
                        return "物流不良品仓"
                    }

                }
            },
            getStockInfo(id){
                this.refreshPage()
            },
            changeStatus(id,status){
                let params = {
                    storehouseId: id,
                    status: status,
                }
                let _this = this
                this.changeStorehouseStatus(params).then(resp => {
                    _this.showSuccess('操作成功')
                    _this.$emit('freshPage')
                }).catch(res => {
                    this.refreshPage()
                })
            },
            btnClick(type,data){
                if(type == 1){
                    this.$router.push(`/config/storehouse/edit/${data.storehouseId}`);
                }else if(type == 2){
                    this.delStorehouse(data.storehouseId)
                }
            },
            tableRowClassName({row, rowIndex}){
                if (rowIndex === 0 && this.addSuccessType === true) {
                    return 'success-row';
                }
            },
            refreshPage(){
                this.showPageLoading()
                let storehouseType = '', storehouseChildType = '';
                if(this.flag == 'a'){
                    storehouseType = '1';
                    storehouseChildType = '1';
                }else if(this.flag == 'b'){
                    storehouseType = '1';
                    storehouseChildType = '2';
                }else if(this.flag == 'c'){
                    storehouseType = '2';
                    storehouseChildType = '1';
                }else if(this.flag == 'd'){
                    storehouseType = '2';
                    storehouseChildType = '2';
                }
                const params = {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    pageType: 1,
                    storehouseType: storehouseType,
                    storehouseChildType: storehouseChildType
                }
                this.showPageLoading()
                this.queryAllStorehouseList(params).then( resp => {
                    this.hidePageLoading();

                    this.totalCount = resp.totalCount;
                    this.storehouseList = resp.result;
                    this.status.splice(0,this.status.length)
                    resp.result.forEach(one => {
                        this.status.push(one.status)
                    })
                }).catch(res => {
                    this.hidePageLoading();
                })
            },
            delStorehouse(id){
                this.$confirm('此操作将删除该仓库，是否继续', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( () => {
                    this.changeStatus(id, 2);
                }).catch( () => {
                    this.showSuccess('已取消')
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
        }
    }
</script>

<style lang="scss" >
    .padding-0{
        padding: 0px;
        width: 80px;
        min-width: 80px;
        text-align: center;
        .el-button--text{
            display: block;
        }
    }
    .el-tooltip__popper.is-light{
        border:none;
        box-shadow: 0 0 6px 0 rgba(0,0,0,0.20);
    }
    .operating-button{
        width: 80px;
        //    height: 28px;
        color: #666666;
        font-size: 12px;
        padding: 0px;
        line-height: 28px;
        display: block;
        &:hover{
            color: #333333;
            background-color: #F6FAFE;
        }
    }
.storehouse-list{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .table-wrapper{
        padding-top: 20px;
        .el-table th, .el-table tr:hover{
            .operate-container_div{
                display: block;
            }
        }
    }
    .operate-container_div{
        display: none;
    }
    .row-show{
        cursor: default;
        line-height: 2;
        &:hover{
            color: #333;
        }
    }
}
</style>
