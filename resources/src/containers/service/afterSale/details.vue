<template>
    <div class="view-storage">
        <div class="detailsBigBox">
            <div class="viewLeftTop">

            </div>
            <div class="tab-container">
                <el-tabs type="card" v-model="activeTabName">
                    <el-tab-pane label="客户信息" name="first">
                        <el-form label-position="right" label-width="110px" :modal="afterSaleDetail">
                                <div class="divBox">
                                    <el-form-item label="客户姓名：" prop="customerName" >
                                        <el-input v-model="afterSaleDetail.customerName" size="small"
                                                class="form-input-width" placeholder="客户姓名" :maxlength="20" disabled></el-input>
                                    </el-form-item>
                                </div>
                                <div class="divBox">
                                    <el-form-item label="客户身份证号：" prop="customerIdentityCardNo" >
                                        <el-input v-model="afterSaleDetail.customerIdentityCardNo" size="small"
                                                class="form-input-width" placeholder="客户身份证号" :maxlength="20" disabled></el-input>
                                    </el-form-item>
                                </div>
                                <div class="divBox">
                                    <el-form-item label="客户手机号码：" prop="customerCellphoneNo" >
                                        <el-input v-model="afterSaleDetail.customerCellphoneNo" size="small" type="number"
                                                placeholder="客户手机号码" disabled></el-input>
                                    </el-form-item>
                                </div>
                                <div class="divBox">
                                    <el-form-item label="客户电话号码：" prop="customerPhoneNo" >
                                        <el-input v-model="afterSaleDetail.customerPhoneNo" size="small" type="number"
                                                placeholder="客户电话号码" disabled></el-input>
                                    </el-form-item>
                                </div>
                                <div class="divBox" style="width: 100%;">
                                    <el-form-item label="客户联系地址：" prop="customerAddress" >
                                            <el-input v-model="afterSaleDetail.customerAddress" size="small"
                                                    placeholder="客户联系地址" disabled></el-input>
                                        </el-form-item>
                                </div>
                                <div class="divBox">
                                    <el-form-item label="客户电子邮箱：" prop="customerEmail">
                                        <el-input v-model="afterSaleDetail.customerEmail" size="small" placeholder="客户电子邮箱"
                                            :maxlength="90" disabled></el-input>
                                    </el-form-item>
                                </div>
                                <div class="divBox">
                                    <el-form-item label="创建时间：" prop="createTime">
                                        <el-input v-model="afterSaleDetail.createTime" size="small" placeholder="创建时间"
                                            :maxlength="90" disabled></el-input>
                                    </el-form-item>
                                </div>
                                <div class="divBox">
                                    <el-form-item label="更新时间：" prop="updateTime">
                                        <el-input v-model="afterSaleDetail.updateTime" size="small" placeholder="更新时间"
                                            :maxlength="90" disabled></el-input>
                                    </el-form-item>
                                </div>
                                <div class="divBox" style="width: 100%;">
                                    <el-form-item label="备注：" prop="customerComments">
                                        <el-input v-model="afterSaleDetail.customerComments" size="small" placeholder="备注"
                                            :maxlength="90" disabled></el-input>
                                    </el-form-item>
                                </div>
                        </el-form>
                    </el-tab-pane>
                
                    <el-tab-pane label="服务详情" name="second">
                        <div class="sku-list">
                            <el-table :data="afterSaleDetail.serviceList">
                                <el-table-column label="服务时间" prop="serviceTime" min-width="110">
                                    <template slot-scope="scope">
                                        <div class="row-show" :title="scope.row.serviceTime">{{scope.row.serviceTime}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="服务内容" prop="serviceContent" min-width="110">
                                    <template slot-scope="scope">
                                        <div class="row-show" :title="scope.row.serviceContent">{{scope.row.serviceContent}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="处理人" prop="operateUserName" min-width="110">
                                    <template slot-scope="scope">
                                        <div class="row-show" :title="scope.row.operateUserName">{{scope.row.operateUserName}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="备注" prop="serviceComments" min-width="110">
                                    <template slot-scope="scope">
                                        <div class="row-show" :title="scope.row.serviceComments">{{scope.row.serviceComments}}</div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
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
        name: 'afterSaleDetails',
        data () {
            return {
                afterSaleDetail: {},
                id: "",
                supplier: "",
                stockNameList: [],
                activeTabName: 'first',
                serviceList: [],
                isSnDialogVisible: false,
                isCancelStockInDialogVisible: false
            }
        },
        mixins: [PlatformMixins, QuitMixins],
        components: {
            Modal, DownloadExcel
        },
        mounted(){
            console.log(this.$route.params,"dedwed");
            this.id = Number(this.$route.params.id);
            this.queryData()
        },
        methods: {
            ...mapActions(['afterSaleInfo']),
            queryData(){
                this.afterSaleInfoFunction({id: this.id});

            },
            formatMomentData(date){
                return utils.formatMomentData(date)
            },
            afterSaleInfoFunction(param){
                this.afterSaleInfo(param).then((resp) => {
                    this.afterSaleDetail = resp;
                    // this.serviceList = resp.serviceList
                    console.log(this.afterSaleDetail,"hehuxinxi");
                    // console.log(this.serviceList,"fuwuxiangqing");
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
        .divBox {
            width: 45%;
            float: left;
        }
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
