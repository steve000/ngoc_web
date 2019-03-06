<template>
    <div class="view-transfer">
        <div class="DetailsLeftBox">
            <div class="viewLeftTop mb20">
                <h4 class="order">调拨单号 : {{ allotId }}</h4>
                <h4 class="status">状态 : {{ transferDetail.allotStatus | getStatus }}</h4>
            </div>
            <el-tabs v-model="activeTabName" type="card">
                <el-tab-pane label="商品清单" name="first">
                    <el-table :data="goodsList">
                        <el-table-column label="商品名称">
                            <template slot-scope="scope">
                                <div class="row-show" :title="scope.row.productName">{{scope.row.productName}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="规格编码">
                            <template slot-scope="scope">
                                <div class="row-show" :title="scope.row.skuId">{{scope.row.skuId}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="条码">
                            <template slot-scope="scope">
                                <div class="row-show" :title="scope.row.skuBarCode">{{scope.row.skuBarCode}}</div>
                            </template>
                        </el-table-column>

                        <el-table-column label="规格">
                            <template slot-scope="scope">
                                <div class="row-show" :title="scope.row.skuName">{{scope.row.skuName}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="发货仓库库存">
                            <template slot-scope="scope">
                                <div class="row-show" :title="scope.row.outTotalCount">{{scope.row.outTotalCount}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="请货数量">
                            <template slot-scope="scope">
                                <div class="row-show" :title="scope.row.count">{{scope.row.count}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="单位">
                            <template slot-scope="scope">
                                <div class="row-show" :title="scope.row.unitName">{{scope.row.unitName}}</div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
            <div class="returnElRow" >
                <el-button type="reset" size="small" @click="goBack" class="ReturnBtn">返回</el-button>
            </div>
        </div>
        <div class="DetailsRightBox">
            <h3>基本信息</h3>
            <el-form :model="transferDetail" label-position="left">
                <el-form-item label="操作员: " >
                    <div>{{transferDetail.username || 'null'}}</div>
                </el-form-item>
                <el-form-item label="操作日期: ">
                    <div>{{transferDetail.updateTime}}</div>
                </el-form-item>
                <el-form-item label="请货仓库: ">
                    <div>{{inStorehouseName}}</div>
                </el-form-item>
                <el-form-item label="发货仓库: ">
                    <div>{{outStorehouseName}}</div>
                </el-form-item>
                <el-form-item label="订单状态: " class="mb5">
                    <div>{{transferDetail.allotStatus | getStatus}}</div>
                </el-form-item>
                <el-form-item label="备注: " class="mb5">
                    <span v-model="transferDetail.comments" type="textarea">{{transferDetail.comments || '暂无'}}</span>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import PlatformMixins from '~/mixins/platform'
    import QuitMixins from '~/mixins/quit'
    import {routesMapping} from '~/router'
    export default{
        name: "ViewTransfer",
        mixins: [PlatformMixins, QuitMixins],
        data(){
            return{
                storehouseList: [],
                goodsList: [],
                transferDetail: {},
                allotId: 'aa',
                activeTabName: 'first'
            }
        },
        computed: {
            inStorehouseName: function(){
                let res = '';
                let id = this.transferDetail.inStorehouseId
                this.storehouseList.forEach(one => {
                    if(one.storehouseId == id){
                        res = one.storehouseName
                        return
                    }
                })
                return res ? res : id
            },
            outStorehouseName: function(){
                let res = '';
                let id = this.transferDetail.outStorehouseId
                this.storehouseList.forEach(one => {
                    if(one.storehouseId == id){
                        res = one.storehouseName
                        return
                    }
                })
                return res ? res : id
            }
        },
        filters: {
            getStatus(str){
                if(str == '0'){
                    return '待出库'
                }else if(str == '1'){
                    return '已出库(待入库)'
                }else if(str == '2'){
                    return '调拨完成'
                }else{
                    return '返回错误'
                }
            },
        },
        activated() {
            this.allotId = this.$route.params.id
            this.getStorehouseList({pageType: 2, storehouseStatus: [0,3]}).then( resp => {
                this.storehouseList = resp.result;
            })
            this.viewTransfer({allotId: this.allotId}).then( resp => {
                this.transferDetail = resp;
                this.goodsList = resp.skuList;
            }).catch( error => {
                setTimeout( () => {
                    this.goBack()
                }, 2000)
            })
        },
        mounted(){
            this.allotId = this.$route.params.id
            this.getStorehouseList({pageType: 2, storehouseStatus: [0,3]}).then( resp => {
                this.storehouseList = resp.result;
            })
            this.viewTransfer({allotId: this.allotId}).then( resp => {
                this.transferDetail = resp;
                this.goodsList = resp.skuList;
            }).catch( error => {
                setTimeout( () => {
                    this.goBack()
                }, 2000)
            })
        },
        methods:{
            ...mapActions(["viewTransfer","getStorehouseList"]),
            goBack(){
                this.quit(routesMapping.TransferManagement)
            },
        }
    }
</script>

<style lang="scss">
    .view-transfer{
        height: 100%;
        position: relative;
        margin: 20px 20px 0 20px;
    }
</style>
