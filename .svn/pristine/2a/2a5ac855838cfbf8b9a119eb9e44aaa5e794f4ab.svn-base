<template>
    <div class="view-storage">
        <div class="DetailsLeftBox detailsBigBox">
            <div class="viewLeftTop">
                <el-row>
                    <el-col :span="9">
                        <h4 class="order">
                            <span>应收对账单号：</span>
                            <span >{{billDetail.receiveCheckNo}}</span>
                        </h4>
                    </el-col>
                    <el-col :span="9">
                        <h4 class="order">
                            <span>审批状态：</span>
                            <span>{{billDetail.approveStatus==0?'草稿':'审核通过'}}</span>
                        </h4>
                    </el-col>
                </el-row>
            </div>
            <div class="tab-container">
                <el-tabs v-model="activeTabName" type="card">
                    <el-tab-pane label="待结算单据列表" name="first">
                        <div class="stockPerInList">
                                <el-table :data="billList">
                                    <el-table-column label="出入库单号" prop="billNo" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.billNo">{{scope.row.billNo}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="创建时间" prop="createTime" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.createTime">{{scope.row.createTime}}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="业务类型" prop="billType" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.billType">{{scope.row.billType==1?'配送出库':'配送退回入库'}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="含税金额（分）" prop="settleTotal" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.settleTotal">
                                                {{scope.row.settleTotal!==null ? scope.row.settleTotal:0}}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="税额（分）" prop="taxTotal" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.taxTotal">{{scope.row.taxTotal}}</div>
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

                    <el-tab-pane label="待结算商品清单" name="second">
                        <div class="stockPerInList">
                                <el-table :data="detailList">
                                    <el-table-column label="出入库单号" prop="billNo" min-width="80">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.billNo">{{scope.row.billNo}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="来源序号" prop="originProductSerialNo" min-width="80">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.originProductSerialNo">{{scope.row.originProductSerialNo}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="商品名称" prop="skuName" min-width="80">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.skuName">{{scope.row.skuName}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="sku编码" prop="skuId" min-width="80">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.skuId">{{scope.row.skuId}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="单位" prop="unitName" min-width="50">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.unitName">{{scope.row.unitName}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="含税单价" prop="inTaxPrice" min-width="50">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.inTaxPrice">{{scope.row.inTaxPrice}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="数量" prop="count" min-width="50">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.count">{{scope.row.count}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="税率" prop="taxRate" min-width="50">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.taxRate">{{scope.row.taxRate}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="含税金额（分）" prop="settleTotal" min-width="50">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.settleTotal">
                                                {{scope.row.settleTotal!==null ? scope.row.settleTotal:0}}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="税额（分）" prop="taxTotal" min-width="50">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.taxTotal">{{scope.row.taxTotal}}</div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="待结算单据列表" name="third">
                        <div class="stockPerInList">
                                <el-table :data="taxList">
                                    <el-table-column label="税率" prop="taxRate" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.taxRate">{{scope.row.taxRate}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="含税金额（分）" prop="settleTotal" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.settleTotal">
                                                {{scope.row.settleTotal!==null ? scope.row.settleTotal:0}}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="税额（分）" prop="taxTotal" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.taxTotal">{{scope.row.taxTotal}}</div>
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
                <el-form-item label="收款实体：">
                    <span>{{billDetail.receiveGroupName ? billDetail.receiveGroupName : '--'}}</span>
                </el-form-item>
                <el-form-item label="对账截止日期：">
                    <span>{{billDetail.endTime ? billDetail.endTime : '--'}}</span>
                </el-form-item>
                <el-form-item label="调整金额（分）：">
                    <span>{{billDetail.adjustTotal ? billDetail.adjustTotal : '--'}}</span>
                </el-form-item>
                <el-form-item label="创建人：">
                    <span>{{billDetail.createUserName ? billDetail.createUserName : '--'}}</span>
                </el-form-item>
                <el-form-item label="创建时间：">
                    <span>{{billDetail.createTime ? billDetail.createTime : '--'}}</span>
                </el-form-item>
                <el-form-item label="操作人：">
                    <span>{{billDetail.operateUserName ? billDetail.operateUserName : '--'}}</span>
                </el-form-item>
                <el-form-item label="操作时间：">
                    <span>{{billDetail.updateTime ? billDetail.updateTime : '--'}}</span>
                </el-form-item>
                <el-form-item label="审批人：">
                    <span>{{billDetail.approveUserName ? billDetail.approveUserName : '--'}}</span>
                </el-form-item>
                <el-form-item label="审批时间：">
                    <span>{{billDetail.approveTime ? billDetail.approveTime : '--'}}</span>
                </el-form-item>
                <el-form-item label="备注：">
                    <span>{{billDetail.remark ? billDetail.remark : '--'}}</span>
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
        name: 'receiveCheckDetails',
        data () {
            return {
                id: 0,  //接收id
                receiveCheckNo: 0,
                billDetail: {}, //详情
                billList: [],  //结算单据
                detailList: [], //商品清单
                taxList: [],  //税率
                supplier: "",
                activeTabName: 'first',
                isSnDialogVisible: false,
                isCancelStockInDialogVisible: false
            }
        },
        mixins: [PlatformMixins, QuitMixins],
        components: {
            Modal, DownloadExcel
        },
        mounted(){
            console.log(this.$route.params)
            this.id = this.$route.params.id;
            this.receiveCheckNo = this.$route.params.receiveCheckNo;
            this.queryData()
        },
        methods: {
            ...mapActions(["showPageLoading", "hidePageLoading", 'receiveCheckInfo']),
            getRadioValue(value){
            },
            queryData(){
                this.showPageLoading();
                this.receiveCheckInfoFunction({id: this.id});
            },
            formatMomentData(date){
                return utils.formatMomentData(date)
            },
            receiveCheckInfoFunction(param){
                this.receiveCheckInfo(param).then((resp) => {
                    this.hidePageLoading();
                    console.log(resp,"3214214123412312312");
                    this.billDetail = resp;
                    this.billList = resp.billList;
                    this.detailList = resp.detailList;
                    this.taxList = resp.taxList;
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
        .viewLeftTop {
            div:nth-child(1) {
                padding-bottom: 16px;
            }
            div:nth-child(2) {
                padding-bottom: 16px;
            }
            div {
                overflow: hidden;
            }
        }
        .stockPerInList {
            .stockPerInItem {
                padding-bottom: 20px;
                /*border-bottom: 1px solid #EDEFF6;;*/
                .stockIn-item-container {
                    line-height: 40px;
                    font-size: 12px;
                    color: #333333;
                    label {
                        display: inline-block;
                        width: 25%;
                        span:nth-child(1) {
                            display: inline-block;
                            width: 72px;
                            font-size: 12px;
                            color: #666666
                        }
                        span:nth-child(2) {
                            color: #333333;
                            font-size: 12px;
                        }
                    }
                }
                .view-sn {
                    float: right;
                    cursor: pointer;
                    i {
                        margin-right: 6px;
                    }
                    font-size: 13px;
                    color: #3B8CFF;
                }
            }

        }
        .el-table {
            border: 1px solid #eceef5;
            border-bottom: none;
        }
        .el-table thead tr th:nth-child(1) {
            border-left: none;
        }
        .el-table__empty-block {
            border-bottom: 1px solid #eceef5;
        }
    }
</style>
