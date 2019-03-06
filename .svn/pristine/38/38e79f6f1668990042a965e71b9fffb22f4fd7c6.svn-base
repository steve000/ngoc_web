<template>
    <div class="view-storage">
        <div class="DetailsLeftBox detailsBigBox">
            <div class="viewLeftTop">
                <div>
                    <h4 class="order">流水号：{{id}}</h4>
                </div>
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
                                    <el-table-column label="税率" prop="tax" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.tax">{{scope.row.tax}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="销售单价/元" prop="price" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.price">{{scope.row.price}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="销售数量" prop="saleCount" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.saleCount">
                                                {{scope.row.saleCount!==null ? scope.row.saleCount:0}}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="实收金额/元" prop="saleTotal" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.saleTotal">{{scope.row.saleTotal}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="需要发货" prop="isNeedSend" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.isNeedSend">{{scope.row.isNeedSend}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="备注" prop="remark" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.remark">
                                                {{scope.row.remark !== "" && scope.row.remark !== null ? scope.row.remark : '无'}}
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                        </div>
                    </el-tab-pane>
                
                    <el-tab-pane label="支付信息" name="second">
                        <div class="sku-list">
                            <el-table :data="payInfo">
                                <el-table-column label="支付名称" prop="payName" min-width="110">
                                    <template slot-scope="scope">
                                        <div class="row-show" :title="scope.row.payName">{{scope.row.payName}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="支付金额" prop="payTotal" min-width="110">
                                    <template slot-scope="scope">
                                        <div class="row-show" :title="scope.row.payTotal">{{scope.row.payTotal}}</div>
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
                <el-form-item label="外部流水号：">
                    <span>{{billDetail.saleNo ? billDetail.saleNo : '--'}}</span>
                </el-form-item>
                <el-form-item label="销售实体：">
                    <span>{{billDetail.userGroupName ? billDetail.userGroupName : '--'}}</span>
                </el-form-item>
                <el-form-item label="销售日期：">
                    <span>{{billDetail.saleDate ? billDetail.saleDate : '--'}}</span>
                </el-form-item>
                <el-form-item label="接收时间：">
                    <span>{{billDetail.receiveDate ? billDetail.receiveDate : '--'}}</span>
                </el-form-item>
                <el-form-item label="联系人：">
                    <span>{{billDetail.linkman ? billDetail.linkman : '--'}}</span>
                </el-form-item>
                <el-form-item label="联系电话：">
                    <span>{{billDetail.phone ? billDetail.phone : '--'}}</span>
                </el-form-item>
                <el-form-item label="收获地址：">
                    <span>{{billDetail.arriveAddress ? billDetail.arriveAddress : '--'}}</span>
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
        name: 'salesBillsDetails',
        data () {
            return {
                billDetail: {
                    "saleNo": "",
                    "userGroupName": "",
                    "saleDate": "",
                    "receiveDate": "",
                    "linkman": "",
                    "phone": "",
                    "arriveAddress": "",
                    "remark": ""
                },
                id: "",
                supplier: "",
                stockNameList: [],
                activeTabName: 'first',
                header: [],
                payInfo: [],
                skuList: [],
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
            this.id = this.$route.params.id;
            this.queryData()
        },
        methods: {
            ...mapActions(['saleBillDetails']),
            getRadioValue(value){
            },
            queryData(){
                this.saleBillDetailsFunction({id: this.id});

            },
            formatMomentData(date){
                return utils.formatMomentData(date)
            },
            saleBillDetailsFunction(param){
                this.saleBillDetails(param).then((resp) => {
                    this.billDetail.saleNo = resp.saleNo;
                    this.billDetail.userGroupName = resp.userGroupName;
                    this.billDetail.saleDate = resp.saleDate;
                    this.billDetail.receiveDate = resp.receiveDate;
                    this.billDetail.linkman = resp.linkman;
                    this.billDetail.phone = resp.phone;
                    this.billDetail.arriveAddress = resp.arriveAddress;
                    this.billDetail.remark = resp.remark;
                    this.skuList = resp.skuList
                    this.payInfo.push(resp.payInfo)
                    console.log(this.billDetail);
                    console.log(this.skuList);
                    console.log(this.payInfo);
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
        .sku-list {
            .view-sn-type {
                padding: 0px 0px 20px;
                text-align: right;
                cursor: pointer;
                i {
                    margin-right: 6px;
                }
                font-size: 13px;
                color: #3B8CFF;
            }
        }
        .orderContainer {
            background-color: #FBFBFB;
            padding: 0px 20px;
            border: 1px solid #F1F1F1;
            height: 50px;
            line-height: 50px;
            margin: 20px 0px;
            .orderCount {
                text-align: right;
                span {
                    color: red;
                    font-size: 18px;
                }
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
        .snListContainer {
            width: 100%;
            max-height: 200px;
            overflow-y: scroll;
            span {
                display: inline-block;
                width: auto;
                padding: 0px 15px;
                font-size: 12px;
                line-height: 44px;
                color: #666666;
            }
        }
        .cancel-button {
            color: #3B8CFF;
            border: 1px solid #BFD9FE;
            padding: 10px 0px;
            font-size: 14px;
            width: 90px;
        }
        .cancel-stockIn {
            height: auto;
            font-size: 14px;
            color: #666666;
            line-height: 25px;
            i {
                font-size: 24px;
                color: #E6A23B;
                vertical-align: middle;
            }
            span {
                display: inline-block;
                background: #F9F2F4;
                border-radius: 2px;
                height: 20px;
                padding: 0px 10px;
                color: #C8284F;
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
