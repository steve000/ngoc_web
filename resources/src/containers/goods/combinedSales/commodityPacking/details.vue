<template>
    <div class="view-storage">
        <div class="DetailsLeftBox detailsBigBox">
            <div class="viewLeftTop">
                <el-row>
                    <el-col :span="24">
                        <h4 class="order">
                            <span>组合名称：</span>
                            <span >{{packingDetail.packageName}}</span>
                        </h4>
                    </el-col>
                    <el-col :span="24">
                        <el-button type="primary" size="small" @click="$router.push({name: `commodityPackingEdit`, params:{id: id,packageId: packageId}})" icon="el-icon-plus" :disabled="false">编辑</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="tab-container">
                <el-tabs v-model="activeTabName" type="card">
                    <el-tab-pane label="组合商品明细" name="first">
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
                                    <el-table-column label="开始时间" prop="beginTime" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.beginTime">{{scope.row.beginTime}}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="结束时间" prop="endTime" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.endTime">{{scope.row.endTime}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="最低价" prop="minPrice" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="(Number(scope.row.maxPrice)/100).toFixed(2)">{{scope.row.maxPrice}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="最高价" prop="minPrice" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="(Number(scope.row.minPrice)/100).toFixed(2)">{{scope.row.minPrice}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="商品价格" prop="skuPrice" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="(Number(scope.row.skuPrice)/100).toFixed(2)">{{scope.row.skuPrice}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="发布实体" prop="userGroupName" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.userGroupName">{{scope.row.userGroupName}}</div>
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
            <el-form :modle="packingDetail" label-position="left" class="TotalBasic">
                <el-form-item label="组合编码：">
                    <span>{{packingDetail.packageId ? packingDetail.packageId : '--'}}</span>
                </el-form-item>
                <el-form-item label="开始时间：">
                    <span>{{packingDetail.beginTime ? packingDetail.beginTime : '--'}}</span>
                </el-form-item>
                <el-form-item label="结束时间：">
                    <span>{{packingDetail.endTime ? packingDetail.endTime : '--'}}</span>
                </el-form-item>
                <el-form-item label="组合价：">
                    <span>{{packingDetail.packagePrice!=null ? (Number(packingDetail.packagePrice)/100).toFixed(2) : '--'}}</span>
                </el-form-item>
                <el-form-item label="创建时间：">
                    <span>{{packingDetail.createTime ? packingDetail.createTime : '--'}}</span>
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
        name: 'commodityPackingDetails',
        data () {
            return {
                id: 0,  //接收id
                packageId: 0, //接收id
                packingDetail: {}, //详情
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
            console.log(this.$route.params,"带的参数");
            this.id = this.$route.params.id;
            this.packageId = this.$route.params.packageId;
            this.getEditInfo(this.id, this.packageId);
        },
        methods: {
            ...mapActions(["showPageLoading", "hidePageLoading", 'skuPackageQuery']),
            getEditInfo(id, packageId) {
                console.log(id,packageId,"w2321321");
                this.skuPackageQuery({id: id,packageId: packageId}).then((resp) => {
                            this.hidePageLoading();
                            console.log(resp,"3213")
                            this.packingDetail = resp;
                            this.skuList = resp.skuPackageList;
                            this.skuList.forEach(function (i, k) {
                                i.maxPrice = (Number(i.maxPrice) / 100).toFixed(2)
                                i.minPrice = (Number(i.minPrice) / 100).toFixed(2)
                                i.skuPrice = (Number(i.skuPrice) / 100).toFixed(2)
                                return i
                            });
                            console.log(this.skuList,"e23123")
                        }).catch((error)=>{})
            },
            formatMomentData(date){
                return utils.formatMomentData(date)
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
        .DetailsRightBox .el-form {
            .el-form-item {
                margin-top: 30px;
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
