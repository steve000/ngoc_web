<template>
    <div class="view-storage">
        <div class="DetailsLeftBox detailsBigBox">
            <div class="viewLeftTop">
                <el-row>
                    <el-col :span="8">
                        <h4 class="order">
                            <span>要货单号：:</span>
                            <span >{{billDetail.requireNo}}</span>
                        </h4>
                    </el-col>
                    <el-col :span="6">
                        <h4 class="order">
                            <span>单据状态:</span>
                            <span>{{billDetail.status==1?'待转配送':'已转配送'}}</span>
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
                                    <el-table-column label="要货数量" prop="requireCount" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.requireCount">
                                                {{scope.row.requireCount!==null ? scope.row.requireCount:0}}
                                            </div>
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
                <!-- <el-form-item label="订单类型：">
                    <span>{{billDetail.billType ? billDetail.billType : '--'}}</span>
                </el-form-item> -->
                <el-form-item label="客户实体：">
                    <span>{{billDetail.custUserGroupName ? billDetail.custUserGroupName : '--'}}</span>
                </el-form-item>
                <el-form-item label="配送实体：">
                    <span>{{billDetail.disUserGroupName ? billDetail.disUserGroupName : '--'}}</span>
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
    import moment from 'moment';
    import QuitMixins from '~/mixins/quit'

    export default {
        name: 'requireOrderInfo',
        data () {
            return {
                id: 0,  //接收id
                userEntity: "",
                requireNo: 0,
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
            this.id = this.$route.params.id;
            this.requireNo = this.$route.params.requireNo;
            this.userEntity = sessionStorage.getItem("entityName");
            this.queryData()
        },
        methods: {
            ...mapActions(["showPageLoading", "hidePageLoading", 'requireOrderInfo']),
            getRadioValue(value){
            },
            queryData(){
                this.showPageLoading();
                this.requireOrderInfoFunction({id: this.id, requireNo: this.requireNo});
            },
            formatMomentData(date){
                return utils.formatMomentData(date)
            },
            requireOrderInfoFunction(param){
                this.requireOrderInfo(param).then((resp) => {
                    this.hidePageLoading();
                    // console.log(resp,"3214214123412312312");
                    this.billDetail = resp;
                    this.skuList = resp.skuList;
                    console.log(this.billDetail,"详情");
                    console.log(this.skuList,"详情商品列表");
                });
            }
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
