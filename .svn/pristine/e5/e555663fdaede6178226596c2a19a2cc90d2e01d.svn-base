<template>
    <div class="view-storage">
        <div class="DetailsLeftBox detailsBigBox">
            <div class="viewLeftTop">
                <el-row>
                    <el-col :span="8">
                        <h4 class="order">
                            <span>配送退回单号：:</span>
                            <span >{{billDetail.distributionReturnNo}}</span>
                        </h4>
                    </el-col>
                    <el-col :span="6">
                        <h4 class="order">
                            <span>单据状态:</span>
                            <span>{{billDetail.status==1?'待发货':'已完成'}}</span>
                        </h4>
                    </el-col>
                    <el-col :span="6">
                        <h4 class="order">
                            <span>审批状态:</span>
                            <span>{{billDetail.approveStatus==0?'草稿':'审核通过'}}</span>
                        </h4>
                    </el-col>
                </el-row>
            </div>
            <div class="tab-container">
                <el-tabs v-model="activeTabName" type="card">
                    <el-tab-pane label="商品清单" name="first">
                        <div class="stockPerInList">
                                <el-table :data="skuList">
                                    <el-table-column label="商品名称" prop="skuName" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.skuName">{{scope.row.skuName}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="sku编码" prop="skuId" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.skuId">{{scope.row.skuId}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="单位" prop="unitName" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.unitName">{{scope.row.unitName}}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="退货价(元)" prop="returnPrice" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.returnPrice">{{scope.row.returnPrice}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="退货数量" prop="returnCount" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.returnCount">{{scope.row.returnCount}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="备注" prop="remark" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.remark">
                                                {{scope.row.remark !== "" && scope.row.remark !== null ? scope.row.remark : '--'}}
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="DetailsRightBox">
            <h3>基本信息</h3>
            <el-form :modle="billDetail" label-position="left" class="TotalBasic">
                <el-form-item label="配送实体：">
                    <span>{{billDetail.disUserGroupNmae ? billDetail.disUserGroupNmae : '--'}}</span>
                </el-form-item>
                <el-form-item label="客户实体：">
                    <span>{{billDetail.custUserGroupName ? billDetail.custUserGroupName : '--'}}</span>
                </el-form-item>
                <el-form-item label="收货仓库：">
                    <span>{{billDetail.inStorehouseName ? billDetail.inStorehouseName : '--'}}</span>
                </el-form-item>
                <el-form-item label="收货仓信息：">
                    <span>{{billDetail.inStorehouseLinkMan ? billDetail.inStorehouseLinkMan : '--'}}</span>
                    <span>{{billDetail.inStorehouseLinkTel ? billDetail.inStorehouseLinkTel : '--'}}</span>
                    <span>{{billDetail.inStorehouseAddress ? billDetail.inStorehouseAddress : '--'}}</span>
                </el-form-item>
                <el-form-item label="发货仓库：">
                    <span>{{billDetail.outStorehouseName ? billDetail.outStorehouseName : '--'}}</span>
                </el-form-item>
                <el-form-item label="发货仓信息：">
                    <span>{{billDetail.outStorehouseLinkMan ? billDetail.outStorehouseLinkMan : '--'}}</span>
                    <span>{{billDetail.outStorehouseLinkTel ? billDetail.outStorehouseLinkTel : '--'}}</span>
                    <span>{{billDetail.outStorehouseAddress ? billDetail.outStorehouseAddress : '--'}}</span>
                </el-form-item>
                <el-form-item label="操作人：">
                    <span>{{billDetail.operateUserName ? billDetail.operateUserName : '--'}}</span>
                </el-form-item>
                <el-form-item label="审批人：">
                    <span>{{billDetail.approveUserName ? billDetail.approveUserName : '--'}}</span>
                </el-form-item>
                <el-form-item label="创建时间：">
                    <span>{{billDetail.createTime ? billDetail.createTime : '--'}}</span>
                </el-form-item>
                <el-form-item label="更新时间：">
                    <span>{{billDetail.updateDate ? billDetail.updateDate : '--'}}</span>
                </el-form-item>
                <el-form-item label="备注：">
                    <span class="remarkStyle">{{billDetail.remark ? billDetail.remark : '--'}}</span>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import PlatformMixins from '~/mixins/platform'
    import utils from '~/utils/misc';
    import Modal from '~/components/common/Modal';
    import DownloadExcel from '~/components/common/DownloadExcel.vue';
    import moment from 'moment';
    import QuitMixins from '~/mixins/quit'

    export default {
        name: 'returnOrderInfo',
        data () {
            return {
                id: 0,  //接收id
                distributionReturnNo: 0,
                billDetail: {}, //详情
                skuList: [],  //商品清单
                supplier: "",
                stockNameList: [],
                activeTabName: 'first',
                header: [],
                isSnDialogVisible: false,
                isCancelStockInDialogVisible: false,
                snList: [],
                excelName: '',
                totalAmount: 0
            }
        },
        mixins: [PlatformMixins, QuitMixins],
        components: {
            Modal, DownloadExcel
        },
        mounted(){
            console.log(this.$route.params)
            this.id = Number(this.$route.params.id);
            this.distributionReturnNo = this.$route.params.distributionReturnNo;
            this.queryData()
        },
        methods: {
            ...mapActions(["showPageLoading", "hidePageLoading", 'returnOrderInfo']),
            getRadioValue(value){
            },
            queryData(){
                this.showPageLoading();
                this.returnOrderInfoFunction({id: this.id, distributionReturnNo: this.distributionReturnNo});
            },
            formatMomentData(date){
                return utils.formatMomentData(date)
            },
            returnOrderInfoFunction(param){
                this.returnOrderInfo(param).then((resp) => {
                    this.hidePageLoading();
                    // console.log(resp,"3214214123412312312");
                    this.billDetail = resp;
                    resp.skuList.forEach(function (i, k) {
                        i.returnPrice = i.returnPrice / 100
                        return i
                    })
                    this.skuList = resp.skuList;
                    console.log(this.billDetail);
                    console.log(this.skuList);
                });
            },
            cancelStockInFunction(){
                this.cancelStockIn({id: this.id}).then((res) => {
                    this.$message({
                        type: 'success',
                        message: '取消成功!'
                    });
                    this.isCancelStockInDialogVisible = false;
                    this.queryData();
                });
            },
        }
    }
</script>

<style lang="scss">
    .view-storage {
        height: 100%;
        padding: 20px 20px 0 20px;
        .el-form .el-form-item .remarkStyle {
            word-wrap: break-word;
            white-space: normal;
        }
    }
</style>
