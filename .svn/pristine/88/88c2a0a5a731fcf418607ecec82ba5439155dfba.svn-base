<template>
    <div class="create-storage">
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper">
                <el-form label-position="right" label-width="100px" :model="transferStock">
                    <div class="form-item-contaniner">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="入库单号：">
                                    <span>{{stockPerInId}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="关联单号：">
                                    <span>{{relatedSheetId}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row v-if="inStatus===3">
                            <el-col :span="8">
                                <el-form-item label="操作员：">
                                    <span>{{transferStock.username}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="操作日期：">
                                    <span>{{transferStock.updateTime}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="请货仓库：">
                                    <span>{{transferStock.inStorehouseIdName}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="发货仓库：">
                                    <span>{{transferStock.outStorehouseIdName}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="入库类型：">
                                    <span>调拨入库</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="16">
                                <el-form-item label="备注：">
                                    <span>{{transferStock.comments}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="content">
            <div class="title">
                <div>商品清单</div>
            </div>
            <div class="form-item-contaniner">
                <el-table :data="transferStock.skuList">
                    <el-table-column label="商品名称" prop="productName" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.productName">{{scope.row.productName}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="规格编码" prop="skuId" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.skuId">{{scope.row.skuId}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="条码" prop="skuBarCode" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.skuBarCode">{{scope.row.skuBarCode}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="规格" prop="attrValue" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.attrValue">{{scope.row.attrValue}}</div>
                        </template>
                    </el-table-column>
                    <!--<el-table-column label="发货仓库库存" prop="outTotalCount" min-width="110">-->
                    <!--<template slot-scope="scope">-->
                    <!--<div class="row-show" :title="scope.row.outTotalCount">{{scope.row.outTotalCount}}</div>-->
                    <!--</template>-->
                    <!--</el-table-column>-->
                    <el-table-column label="请货数量" prop="count" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.count">{{scope.row.count}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" prop="unitName" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.unitName">{{scope.row.unitName}}</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="btn-section pt20">
            <el-button type="info" size="small" @click="quit(routesMapping.StorageManagement)">返回</el-button>
            <el-button type="primary" size="small" @click="allotCheck" v-if="isViewStorage">确认入库</el-button>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import PlatformMixins from '~/mixins/platform';
    import QuitMixins from '~/mixins/quit'
    import utils from '~/utils/misc';

    export default {
        name: 'transferStock',
        data () {
            return {
                transferStock: {},
                relatedSheetId: "",
                stockPerInId: "",
                stockNameList: [],
                sheetTypeText: {
                    1: "采购入库",
                    2: "后台入库",
                    3: "调拨入库",
                    4: "销售退货"
                },
                inStatusText: {
                    1: '待入库',
                    3: '已入库'
                },
                inStatus: "",
                isViewStorage: true,
            }
        },
        mixins: [PlatformMixins, QuitMixins],
        mounted(){
            this.$route.path.indexOf('transferStorage') >= 0 ? this.isViewStorage = true : this.isViewStorage = false;
            this.relatedSheetId = this.$route.params.relatedSheetId;
            this.stockPerInId = sessionStorage.getItem("stockPerInId");
            this.inStatus = Number(sessionStorage.getItem("inStatus"));
            console.log(this.inStatus);
            this.viewTransferData({allotId: this.$route.params.relatedSheetId});
        },
        methods: {
            ...mapActions(["allotCheckAction", 'viewTransfer', 'getStorehouseList']),
            getRadioValue(value){
            },
            formatMomentData(date){
                return utils.formatMomentData(date)
            },
            allotCheck(){
                this.allotCheckAction({stockPerInId: this.stockPerInId}).then((resp) => {
                    this.$message({
                        type: 'success',
                        message: '确认入库成功'
                    });
                    this.quit(this.routesMapping.StorageManagement);
                    const tab = this.getTabByKey(this.routesMapping.StockTransfer);
                    if (tab) {
                        this.refreshTab(tab);
                    }
                });
            },
            viewTransferData(param){
                this.viewTransfer(param).then((resp) => {
                    resp.skuList = resp.skuList && resp.skuList.map((item) => {
                            let attr = item.attrInfo;
                            let str = "";
                            for (let i = 0; i < attr.length; i++) {
                                i !== attr.length - 1 ? str += attr[i].attrValue + "," : str += attr[i].attrValue;
                            }
                            item.attrValue = str;
                            return item
                        });
                    this.transferStock = resp;
                    this.getStorehouseList({'pageType': 2}).then((resp) => {
                        let storeHouseList = resp.result;
                        let findItem = storeHouseList.find((item) => {
                            return item.storehouseId === this.transferStock.outStorehouseId;
                        });
                        let findItem1 = storeHouseList.find((item) => {
                            return item.storehouseId === this.transferStock.inStorehouseId;
                        });
                        let outStorehouseIdName = findItem ? findItem.storehouseName : "";
                        let inStorehouseIdName = findItem1 ? findItem1.storehouseName : "";
                        this.$set(this.transferStock, 'outStorehouseIdName', outStorehouseIdName);
                        this.$set(this.transferStock, 'inStorehouseIdName', inStorehouseIdName);
                    })
                });

            }
        }
    }
</script>

<style lang="scss">
    .create-storage {
        height: auto;
        margin: 20px 20px 0 20px ;
        .row-show {
            color: #333;
            text-align: center;
        }
        .el-form-item {
            span {
                color: #333;
            }
            .el-form-item__label {
                color: #333;
            }
        }

        .order-form-item {
            position: relative;
            .order-tips {
                position: absolute;
                left: 0px;
                top: 34px;
                font-size: 12px;
            }
        }
        .supplier {
            margin-top: 50px;
        }
        .btn-section {
            text-align: center;
            padding-bottom: 20px;
            background-color: #fff;
            width: 100%;
        }
    }
</style>
