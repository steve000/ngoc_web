<template>
    <div class="view-storage">
        <div class="DetailsLeftBox detailsBigBox">
            <div class="viewLeftTop">
                <el-row>
                    <el-col :span="8">
                        <h4 class="order">
                            <span>配送单号：</span>
                            <span >{{billDetail.distributionNo}}</span>
                        </h4>
                    </el-col>
                    <el-col :span="6">
                        <h4 class="order">
                            <span>单据状态：</span>
                            <span>{{billDetail.status==1?'待发货':'已完成'}}</span>
                        </h4>
                    </el-col>
                    <el-col :span="6">
                        <h4 class="order">
                            <span>审批状态：</span>
                            <span>{{billDetail.approveStatus==0?'草稿':'审核通过'}}</span>
                        </h4>
                    </el-col>
                    <el-col :span="24" v-if="billDetail.approveStatus == 0">
                        <el-button type="text" class="mr15"
                                    @click="$router.push({ name:'distributionEdit', params: {id: billDetail.id, distributionNo: billDetail.distributionNo}})">编辑
                        </el-button>
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
                                <el-table-column label="配送价(元)" prop="distributionPrice" min-width="110">
                                    <template slot-scope="scope">
                                        <div class="row-show" :title="scope.row.distributionPrice">{{scope.row.distributionPrice}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="要货数量" prop="requireCount" min-width="110" v-if="billDetail.billType=='2'">
                                    <template slot-scope="scope">
                                        <div class="row-show" :title="scope.row.requireCount">
                                            {{scope.row.requireCount!==null ? scope.row.requireCount:0}}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="配送数量" prop="distributionCount" min-width="110">
                                    <template slot-scope="scope">
                                        <div class="row-show" :title="scope.row.distributionCount">{{scope.row.distributionCount}}</div>
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
                            <div class="orderContainer">
                                <div class="orderCount">
                                    配送单合计金额 : <span>￥{{totalAmount}}</span>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="DetailsRightBox">
            <h3>基本信息</h3>
            <el-form :modle="billDetail" label-position="left" class="TotalBasic">
                <el-form-item label="订单类型：">
                    <span>{{getBilltypeText(billDetail.billType) ? getBilltypeText(billDetail.billType) : '--'}}</span>
                </el-form-item>
                <el-form-item label="要货单号：" v-show="billDetail.billType=='2'">
                    <span>{{billDetail.requireNo ? billDetail.requireNo : '--'}}</span>
                </el-form-item>
                <el-form-item label="客户实体：">
                    <span>{{billDetail.custUserGroupName ? billDetail.custUserGroupName : '--'}}</span>
                </el-form-item>
                <el-form-item label="发货仓库：">
                    <span>{{billDetail.outStorehouseName ? billDetail.outStorehouseName : '--'}}</span>
                </el-form-item>
                <el-form-item label="发货仓信息：">
                    <span>{{billDetail.outStorehouseLinkMan ? billDetail.outStorehouseLinkMan : '--'}}</span>
                    <span>{{billDetail.outStorehouseLinkTel ? billDetail.outStorehouseLinkTel : '--'}}</span>
                    <span>{{billDetail.outStorehouseAddress ? billDetail.outStorehouseAddress : '--'}}</span>
                </el-form-item>
                <el-form-item label="收货仓库：">
                    <span>{{billDetail.inStorehouseName ? billDetail.inStorehouseName : '--'}}</span>
                </el-form-item>
                <el-form-item label="收货仓信息：">
                    <span>{{billDetail.inStorehouseLinkMan ? billDetail.inStorehouseLinkMan : '--'}}</span>
                    <span>{{billDetail.inStorehouseLinkTel ? billDetail.inStorehouseLinkTel : '--'}}</span>
                    <span>{{billDetail.inStorehouseAddress ? billDetail.inStorehouseAddress : '--'}}</span>
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
    import QuitMixins from '~/mixins/quit'
    import utils2 from "~/utils/commonMethod";

    export default {
        name: 'distributionInfo',
        data () {
            return {
                id: 0,  //接收id
                distributionNo: 0,
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
                billTypeText: [
                    "主动配送",
                    "要货配送"
                ],
            }
        },
        mixins: [PlatformMixins, QuitMixins],
        components: {
            Modal, DownloadExcel
        },
        computed: {
            totalAmount: function() {
                console.log(this.skuList,"计算总额")
                if (this.skuList.length > 0) {
                    let resNumType = 0;
                    this.skuList.forEach(item => {
                    let StockOutTotalPrice = utils2.mul(item.distributionPrice, item.distributionCount) || 0;
                    resNumType += StockOutTotalPrice;
                    });
                    resNumType = Number(resNumType).toFixed(2);
                    return resNumType;
                }
            }
        },
        mounted(){
            console.log(this.$route.params)
            this.id = this.$route.params.id;
            this.distributionNo = this.$route.params.distributionNo;
            this.queryData()
        },
        methods: {
            ...mapActions(["showPageLoading", "hidePageLoading", 'distributionOrderInfo']),
            getRadioValue(value){
            },
            queryData(){
                this.showPageLoading();
                this.distributionOrderInfoFunction({id: this.id, distributionNo: this.distributionNo});
            },
            formatMomentData(date){
                return utils.formatMomentData(date)
            },
            distributionOrderInfoFunction(param){
                this.distributionOrderInfo(param).then((resp) => {
                    this.hidePageLoading();
                    // console.log(resp,"3214214123412312312");
                    this.billDetail = resp;
                    resp.skuList.forEach(function (i, k) {
                        i.distributionPrice = i.distributionPrice / 100
                        return i
                    });
                    this.skuList = resp.skuList;
                    console.log(this.billDetail);
                    console.log(this.skuList);
                });
            },
            getBilltypeText(val) {
                return this.billTypeText[val-1]
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
