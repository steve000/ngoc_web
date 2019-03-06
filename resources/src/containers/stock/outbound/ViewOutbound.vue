<template>
    <div class="create-outbound">
        <div class="DetailsLeftBox detailsBigBox">
            <div class="viewLeftTop">
                <div>
                    <h4 class="order">出库单号：{{ stockPerOutId}}</h4>
                    <h4 class="status">状态：{{sheetStatusText[outboundDetail.commonInfo.outStatus]}}</h4>
                    <h4 class="status">出库类型：{{sheetTypeText[outboundDetail.commonInfo.type]}}</h4>
                </div>
                <div>
                    <el-button type="primary" size="small" v-if="outboundDetail.commonInfo.outStatus === -1 " @click="outboundRetryAction(stockPerOutId)">重传出库单</el-button>
                    <el-button type="primary" plain size="small"  v-if="(outboundDetail.commonInfo.outStatus === 1 || outboundDetail.commonInfo.outStatus === 2) && (outboundDetail.commonInfo.type !== 5) "
                               @click="isCancelStockOutDialogVisible=true">取消
                    </el-button>
                </div>
            </div>
            <div class="tab-container">
                <el-tabs v-model="activeTabName" type="card">
                    <el-tab-pane label="商品清单" name="first">
                        <div class="sku-list">
                            <div class="view-sn-type" v-if="snList.length>0">
                                <span @click="isSnDialogVisible = true"><i class="iconfont1 icon-chakan"></i>查看串码</span>
                            </div>
                            <el-table :data="productDetail">
                                <el-table-column label="商品名称" prop="skuName" min-width="110">
                                    <template slot-scope="scope">
                                        <div class="row-show" :title="scope.row.skuName">{{scope.row.skuName}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="商品编码" prop="skuBarCode" min-width="110">
                                    <template slot-scope="scope">
                                        <div class="row-show" :title="scope.row.skuId">{{scope.row.skuId}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="单位" prop="unitName" min-width="110">
                                    <template slot-scope="scope">
                                        <div class="row-show" :title="scope.row.unitName">{{scope.row.unitName}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column v-for="item,index in header" :key="index" :label="item.label"
                                                 :prop="item.prop" min-width="110">
                                    <template slot-scope="scope">
                                        <div class="row-show" :title="scope.row[item.prop]">{{scope.row[item.prop]}}</div>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="orderContainer">
                                <div class="orderCount">
                                    出库单合计金额 : <span>￥{{totalAmount.toFixed(2)}}</span>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="物流信息" name="second" v-if="logisticsRecords.length>0">
                        <div class="logistics-wapper">
                            <ul class="top" v-if="logisticsRecords.length>0">
                                <li :class="{'active': index === curIndex}" v-for="(item, index) in logisticsRecords"
                                    :key="index" @click="changeHandle(index)">单号：{{item.waybillNo}}
                                </li>
                            </ul>
                            <template v-if="logisticsRecords.length>0">
                                <div class="logistics-content" v-for="(one, index) in logisticsRecords[curIndex].waybillMeg" :key="index">
                                    <div class="logistics-date">
                                        <p class="time">{{formatFullDate(one.time).substring(11,16)}}</p>
                                        <p>{{formatYearOne(one.time)}}</p>
                                    </div>
                                    <!--<div class="logistics-status">-->
                                        <!--<p>{{index === 0 ?'运输中':'已完成'}}</p>-->
                                        <!--&lt;!&ndash;<p>{{item.type==='路由' ? '运输中' :item.type}}</p>&ndash;&gt;-->
                                        <!--<p>{{one.address}}</p>-->
                                    <!--</div>-->
                                    <div class="logistics-station-wrapper">
                                        <p class="logistics-station">
                                            <label for="" class="logistics-title">{{one.operator}}</label>{{one.phone}}
                                        </p>
                                        <p class="logistics-station">
                                            <label for="" class="logistics-title">{{one.type}}{{one.address?'：': ''}}</label>
                                            <label for="" class="logistics-station-address">{{one.address}}</label>
                                        </p>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="DetailsRightBox">
            <h3>基本信息</h3>
            <el-form :modle="outboundDetail" label-position="left" class="TotalBasic">
                <el-form-item label="操作人：">
                    <span>{{outboundDetail.commonInfo.operator ? outboundDetail.commonInfo.operator : "--"}}</span>
                </el-form-item>
                <el-form-item label="创建时间：">
                    <span>{{outboundDetail.commonInfo.createtime ? outboundDetail.commonInfo.createtime : "--"}}</span>
                </el-form-item>
                <el-form-item label="更新时间：" v-if="outboundDetail.commonInfo.type!= 3">
                    <span>{{outboundDetail.commonInfo.updateTime ? outboundDetail.commonInfo.updateTime : "--"}}</span>
                </el-form-item>
                <div v-if="outboundDetail.commonInfo.type === 1 || outboundDetail.commonInfo.type === 4"><!-- 只有销售出库销售换货才需要显示渠道 -->
                    <el-form-item label="渠道：">
                        <div style="word-wrap:break-word">
                            {{outboundDetail.commonInfo.channelName ? outboundDetail.commonInfo.channelName : "--"}}
                        </div>
                    </el-form-item>
                </div>

                <el-form-item label="发货仓库：">
                    <span>{{outboundDetail.commonInfo.storehouseName ? outboundDetail.commonInfo.storehouseName : "--"}}</span>
                </el-form-item>
                <el-form-item label="关联业务单：" v-if="outboundDetail.commonInfo.type!= 3">
                    <span>{{outboundDetail.commonInfo.relatedSheetId ? outboundDetail.commonInfo.relatedSheetId : "--"}}</span>
                </el-form-item>
                <el-form-item label="快递：" v-if="outboundDetail.commonInfo.type!= 3">
                    <span>{{outboundDetail.commonInfo.extraIotInfo && outboundDetail.commonInfo.extraIotInfo.express ? outboundDetail.commonInfo.extraIotInfo.express : "--"}}</span>
                </el-form-item>
                <el-form-item label="销售类别：" v-if="outboundDetail.commonInfo.type!= 3">
                    <span v-if="outboundDetail.commonInfo.extraIotInfo && outboundDetail.commonInfo.extraIotInfo.salesCategory">{{salesCategory(outboundDetail.commonInfo.extraIotInfo.salesCategory)}}</span><span v-else>--</span>
                </el-form-item>
                <el-form-item label="配送方式：" v-if="outboundDetail.commonInfo.type!= 3">
                    <span v-if="outboundDetail.commonInfo.extraIotInfo && outboundDetail.commonInfo.extraIotInfo.deliveryType">{{deliveryType(outboundDetail.commonInfo.extraIotInfo.deliveryType)}}</span><span v-else>--</span>
                </el-form-item>
                <el-form-item label="订单加急：" v-if="outboundDetail.commonInfo.type!= 3">
                    <span v-if="outboundDetail.commonInfo.extraIotInfo && outboundDetail.commonInfo.extraIotInfo.urgentSign">{{urgentSign(outboundDetail.commonInfo.extraIotInfo.urgentSign)}}</span><span v-else>--</span>
                </el-form-item>
                 <div v-if="outboundDetail.commonInfo.type === 3"><!-- 只有后台出库才显示出库原因 -->
                    <el-form-item label="出库原因：">
                        <div style="word-wrap:break-word">
                            {{outboundDetail.commonInfo.reason ? chooseReason(outboundDetail.commonInfo.reason) : "--"}}
                        </div>
                    </el-form-item>
                </div>
                <el-form-item label="收货信息：">
                    <div style="padding-left: 30%;">
                        <div>{{outboundDetail.commonInfo.linkman}}</div>
                        <div style="word-wrap:break-word">{{outboundDetail.commonInfo.receiveAddress}}</div>
                        <div>{{outboundDetail.commonInfo.phone}}</div>
                    </div>
                </el-form-item>
                <el-form-item label="备注：">
                    <div style="word-wrap:break-word">
                        {{outboundDetail.commonInfo.comments ? outboundDetail.commonInfo.comments : "--"}}
                    </div>

                </el-form-item>
            </el-form>
        </div>
        <modal v-model="isSnDialogVisible"
               title="查看串码"
               width="60%">
            <div>
                <download-excel
                    :downloadText="'下载串码'"
                    :excelName="excelName"
                    :data="snList"
                    :label="['串码']">
                </download-excel>
                <div class="snListContainer">
                    <span v-if="snList.length<=0">该出库单无串码数据！</span>
                    <span v-for="item in snList">{{item}}</span>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button v-if="false" >取 消</el-button>
                <el-button v-if="false" >确 定</el-button>
            </span>
        </modal>
        <modal :title="'取消出库'"
               v-model="isCancelStockOutDialogVisible"
               @save="cancelStockOutFunction"
               :showCancelButton="false"
               :width="'50%'">
            <div class="cancel-stockOut">
                <i class="iconfont1 icon-tishi"></i>请确认是否与中移物流线下沟通无误，取消后当前<span>{{stockPerOutId}}</span>出库单将作废，是否取消？
            </div>
        </modal>
    </div>
</template>
<script>
    import {mapActions} from 'vuex'
    import utils from '~/utils/commonMethod'
    import PlatformMixins from '~/mixins/platform'
    import Modal from '~/components/common/Modal'
    import DownloadExcel from '~/components/common/DownloadExcel.vue'
    import moment from 'moment'
    import QuitMixins from '~/mixins/quit'
    import MessageMixins from '~/mixins/messages'

    export default {
        name: 'viewStockDetail',
        data () {
            return {
                logisticsRecords: [], // 物流信息
                stockPerOutId: '',
                isCancelStockOutDialogVisible: false, // 取消出库的弹窗
                isSnDialogVisible: false, // 显示串码的弹窗
                snList: [],
                curIndex: 0, // 当前的物流单号index
                excelName: '',
                outboundDetail: { // 组装回显出库详情
                    commonInfo: {
                        operateUserName: '',
                        storehouseName: '',
                        updateTime: '',
                        type: '',
                        outStatus: '',
                        comments: '',
                        clientName: '',
                        relatedSheetId: '',
                        receiveAddress: '',
                        createtime: '',
                        storehouseType: '',
                        reason: '',
                        extraIotInfo: {
                            express: '',
                            salesCategory: '',
                            deliveryType: '',
                            urgentSign: ''
                        }
                    },
                    productDetail: {
                        productId: '',
                        productName: '',
                        skuBarCode: '',
                        skuName: '',
                        unitName: '',
                        stockOutCount: ''
                    }
                },
                productDetail: [], // 商品详情
                sheetStatusText: {
                    // '-1':"出库超时",
                    1: '待出库',
                    2: '已出库',
                    3: '已完成',
                    4: '待出库撤销',
                    5: '已出库撤销'
                },
                sheetTypeText: {
                    1: '销售出库',
                    2: '退货出库',
                    3: '后台出库',
                    4: '销售换货',
                    5: '调拨出库',
                    6: "采购退货出库",
                    7: "配送出库",
                    8: "配送退单出库"
                },
                activeTabName: 'first',
                header: '', // 表头
                totalAmount: 0
            }
        },
        mixins: [PlatformMixins, QuitMixins,MessageMixins] ,
        components: {Modal, DownloadExcel} ,
        mounted () {
            this.stockPerOutId = this.$route.params.stockPerOutId
            this.querySheetDetail()
            this.showSnModal(this.stockPerOutId)
            // this.getRouter()
        },
        methods: {
            ...mapActions(['queryStockOutSheetDetail', 'cancelStockOutSheet', 'queryOutsnList', 'showPageLoading', 'hidePageLoading', 'getOutboundRouterList', 'outboundRetry']),
            changeHandle (index) { // 点击物流单号显示对应的物流信息
                this.curIndex = index
            },
            formatMomentData (date) { // 格式化物流信息的时间
                return utils.formatMomentData(date)
            },
            chooseReason (reason) { // 出库原因
                switch (reason) {
                    case 1:
                        return '报损'
                    case 2:
                        return '领用'
                    case 3:
                        return '盘亏'
                }
            },
            salesCategory (type) {
                switch (type) {
                    case "A":
                        return '零售'
                    case "B":
                        return '分销'
                }
            },
            urgentSign (type) {
                switch (type) {
                    case "0":
                        return '不加急';
                    case "1":
                        return '加急';
                }
            },
            deliveryType (type) {
                switch (type) {
                    case 20:
                        return '物流';
                    case 30:
                        return '自提';
                }
            },
            querySheetDetail() {
                this.showPageLoading();
                let stockOutSheetId = this.$route.params.stockPerOutId
                let reqData = {
                    stockPerOutId: stockOutSheetId,
                }
                this.queryStockOutSheetDetail(reqData).then(resp => {
                    this.hidePageLoading();
                    this.outboundDetail = resp;
                    this.productDetail = resp.productDetail;
                    for (let i = 0; i < resp.productDetail.length; i++) {
                        let item = resp.productDetail[i];
                        item.price = (Number(item.price) / 100).toFixed(2);
                        let total = Number(item.price) * Number(item.finishCount) || 0;
                        item.stockOutTotalCount = total.toFixed(2);
                        this.totalAmount += total;
                    }
                    switch (resp.commonInfo.type) { // 根据type获取不同类型的表头名称
                        case 1:
                            this.header = [
                                {prop: "totalCount", label: "销售数量"},
                                // {prop: "finishTotalOutCount",label: "已出库数量"},
                                {prop: "price", label: "销售单价(元)"},
                                {prop: "stockOutTotalCount", label: "出库总价(元)"},
                                {prop: "stockOutCount",label: "计划出库"},
                                {prop: "finishCount", label: "实际出库"},
                                // {prop: "comments", label: "备注"}
                            ]
                            break;
                        case 3:
                            this.header = [
                                {prop: "price", label: "商品单价(元)"},
                                {prop: "stockOutTotalCount", label: "出库总价(元)"},
                                {prop: "stockOutCount",label: "出库数量"},
                                {prop: "finishCount", label: "实际出库"},
                                {prop: "comments", label: "备注"}
                            ];
                            break;
                        case 4:
                            this.header = [
                                {prop: "totalCount", label: "换货数量"},
                                { prop: "price", label: "销售单价(元)"},
                                {prop: "stockOutTotalCount", label: "出库总价(元)"},
                                {prop: "stockOutCount", label: "出库数量"},
                                {prop: "finishCount",label: "实际出库"},
                                // {prop: "comments", label: "备注"}
                            ];
                            break;
                    }
                })
            },
            showSnModal (stockPerOutId) { // 显示串码
                this.querySnListFunction({stockPerOutId: stockPerOutId});
            },
            // 获取物流记录
            getRouter () {
                this.getOutboundRouterList({stockPerOutId: this.stockPerOutId}).then((res) => {
                    this.logisticsRecords = res;
                })
            },
            querySnListFunction (param) { // 显示串码
                this.queryOutsnList(param).then((res) => {
                    if (res && res.length > 0) {
                        for (let i = 0; i < res.length; i++) {
                            if (res[i] !== null && res[i] !== "") {
                                this.snList.push(res[i])
                            }
                        }
                        // this.snList = res;
                        let now = moment().format('YYYY-MM-DD');
                        this.excelName = `${param.stockPerOutId} ${now}`
                    }
                })
            },
            cancelStockOutFunction () {  // 取消出库
                this.cancelStockOutSheet({stockPerOutId: this.stockPerOutId}).then((res) => {
                    this.$message({
                        type: 'success',
                        message: '取消成功!'
                    })
                    this.isCancelStockOutDialogVisible = false;
                    this.querySheetDetail();
                }).catch((error)=>{
                    this.showWarning('取消出库失败，请稍后再试！');
                    this.hidePageLoading();
                    this.isCancelStockOutDialogVisible = false;
                });
            },
            // 日期格式转换
            formatYearOne (date) {
                return utils.formatYearOne(date);
            },
            formatFullDate (date) {
                return utils.formatFullDate(date);
            },
            outboundRetryAction (stockPerOutId) { // 重传出库
                this.showPageLoading();
                this.outboundRetry(stockPerOutId).then((resp) => {
                    this.hidePageLoading()
                    this.showSuccess("操作成功");
                    this.querySheetDetail();
                }).catch(error=>{
                    this.hidePageLoading()
                });
            }
        }
    }
</script>

<style lang="scss">
    @import '../../../layouts/css/themes/default';
    .create-outbound {
        height: 100%;
        padding: 10px 20px 0 30px;
        .viewLeftTop {
            div:nth-child(2) {
                padding-top: 16px;
            }
            div {
                overflow: hidden;
            }
        }
        .logistics-wapper {
            .top {
                height: 44px;
                background: #eceef5;
                margin-bottom: 8px;
                padding-left: 10px;
                box-sizing: border-box;
                li {
                    display: inline-block;
                    padding: 5px 12px;
                    font-size: 12px;
                    color: $grey-color;
                    margin: 10px 10px 0 0;
                    cursor: pointer;
                }
                li.active {
                    background: #e7e8ed;
                }
            }
            .logistics-content {
                font-size: 12px;
                color: $text-color;
                padding: 14px 20px 0 20px;
                display: flex;
                .logistics-date {
                    min-width: 70px;

                    text-align: center;
                    margin-right: 30px;
                }
                .logistics-date .time {
                    color: $grey-color;
                    font-size: 14px;
                }
                .logistics-status {
                    line-height: 22px;
                    margin: 0;
                    padding: 0;
                    p {
                        margin-top: -2px;
                    }
                }
                .logistics-station-wrapper {
                    width: 100%;
                }
                .logistics-station {
                    width: 100%;
                    min-width: 850px;
                    margin-bottom: 4px;
                }
                .logistics-title {
                    max-width: 160px;
                    min-width: 30px;
                    display: inline-block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    vertical-align: middle;
                    margin-right: 10px;
                    margin-top: -4px;
                }
            }
            .logistics-content:not(:last-child) {
                .logistics-date::after {
                    content: "";
                    display: block;
                    width: 1px;
                    height: 30px;
                    background: #eceef5;
                    margin: 14px 0 0 34px;
                }
            }
            .no-data {
                text-align: center;
                margin-top: 10px;
                color: rgb(102, 102, 102);
                font-size: 14px;
            }
            //   地址
            .logistics-station-address {
                white-space: normal;
                word-break: break-all;
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
            overflow-y: auto;
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
        .cancel-stockOut {
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
