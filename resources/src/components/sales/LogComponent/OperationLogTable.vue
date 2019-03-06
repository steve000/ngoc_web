<template>
    <div class="table-style-change">
        <el-table class="ProductListTable sale-list-table" :data="logList">
            <el-table-column label="操作内容" min-width="100">
                <template slot-scope="scope">
                    <p class="column-name" @click="getLog(scope.row.logType, scope.row.saleOpLogId)" v-if="Number(scope.row.logType) !==13">
                        <!--0-数据暂存；1--编辑备注；2--出库操作；3--创建退货单；4--编辑详情；-->
                        {{scope.row.title}}
                    </p>
                    <p v-else>{{scope.row.title}}</p>
                    <p class="column-detail" @click="getLog(scope.row.logType, scope.row.saleOpLogId)" v-if="Number(scope.row.logType) !==13">详情</p>
                </template>
            </el-table-column>
            <el-table-column label="操作人" prop="createUserName">
            </el-table-column>
            <el-table-column label="操作时间">
                <template slot-scope="scope">
                    {{formatFullDateAnother(scope.row.createTime)}}
                </template>
            </el-table-column>
            <el-table-column label="备注" prop="remark">
            </el-table-column>
        </el-table>
        <!--查看编辑日志弹窗-->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :width="dialogWidth" class="remark-log-dialog">
            <template v-if="curLogType&&curLogType===1">
                <RemarkLog></RemarkLog>
            </template>
            <template v-else-if="curLogType&&curLogType===4">
                <template v-if="!isRepresent">
                    <OrderDetailLog></OrderDetailLog>
                </template>
                <template v-else>
                    <div class="edit-log-wrapper">
                        <p class="title">编辑前：</p>
                        <p class="sale-number">销售单号：{{logDetail && logDetail.preContent.orderId}}</p>
                        <div class="edit-before" v-if="logDetail">
                            <div class="left">
                                <!-- <GoodsListTable :saleList="isJson(logDetail.preContent)?logDetail.preContent.pluList:null" :isLog="true" :proxy="true"></GoodsListTable> -->
                                <div class="table-style-change">
                                    <el-table class="ProductListTable sale-list-table" :data="isJson(logDetail.preContent)?logDetail.preContent.pluList:null">
                                        <el-table-column label="商品名称" prop="skuName" min-width="150" show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <label for="" :class="{'has-update':comparePreAfter(scope.row, logDetail.afterContent.pluList, 'skuName', scope.row.skuName,true)}">{{scope.row.skuName}}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="商品编码" prop="skuId" min-width="90" show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <label for="" :class="{'has-update':comparePreAfter(scope.row, logDetail.afterContent.pluList, 'skuId', scope.row.skuId,true)}">{{scope.row.skuId}}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="单位" prop="unitName" min-width="60">
                                            <template slot-scope="scope">
                                                <label for="" :class="{'has-update':comparePreAfter(scope.row, logDetail.afterContent.pluList, 'unitName', scope.row.unitName,true)}">{{scope.row.unitName}}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="销售单价（元）" min-width="110">
                                            <template slot-scope="scope">
                                                <label for="" :class="{'has-update':comparePreAfter(scope.row, logDetail.afterContent.pluList, 'price', scope.row.price,true)}">{{scope.row.price/100 |keepTwoNum}}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="销售数量" prop="saleCount">
                                            <template slot-scope="scope">
                                                <label for="" :class="{'has-update':comparePreAfter(scope.row, logDetail.afterContent.pluList, 'saleCount', scope.row.saleCount,true)}">{{scope.row.saleCount}}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="出库数量" prop="sendCount">
                                            <template slot-scope="scope">
                                                <label for="" :class="{'has-update':comparePreAfter(scope.row, logDetail.afterContent.pluList, 'sendCount', scope.row.sendCount,true)}">{{scope.row.sendCount}}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="总价（元）" min-width="90">
                                            <template slot-scope="scope">
                                                <label for="" :class="{'has-update':comparePreAfter(scope.row, logDetail.afterContent.pluList, 'saleTotal', scope.row.saleTotal,true)}">{{scope.row.saleTotal/100 |keepTwoNum}}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="备注" show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <label for="" :class="{'has-update':comparePreAfter(scope.row, logDetail.afterContent.pluList, 'remark', scope.row.remark,true)}">{{scope.row.remark?scope.row.remark:'--'}}</label>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                            <div class="right">
                                <!--<GoodsBaseInfo :orderLogDetail="logDetail.preContent" :isLog="true"></GoodsBaseInfo>-->
                                <div class="base-info-represent" v-if="isJson(logDetail.preContent)">
                                    <p>基本信息</p>
                                    <ul>
                                        <li>
                                            <div>操作人：</div>
                                            <div>{{logDetail.preContent.preOperator}}</div>

                                        </li>
                                        <li>
                                            <div>订单金额：</div>
                                            <div>
                                                <!--{{logDetail.preContent.saleTotal !== null?`&yen;${logDetail.preContent.saleTotal/100}.00`:''}}-->
                                                <template v-if="logDetail.preContent.saleTotal !== null">
                                                    ￥{{logDetail.preContent.saleTotal/100 | keepTwoNum}}
                                                </template>
                                                <template v-else>
                                                    ￥0.00
                                                </template>
                                            </div>

                                        </li>
                                        <li>
                                            <div>创建时间：</div>
                                            <div>{{formatFullDateAnother(logDetail.preContent.createTime)}}</div>
                                        </li>
                                        <li>
                                            <div class="base-info-remark">
                                                <p>渠道：</p>
                                            </div>
                                            <div>
                                                <span class="customer">{{Number(logDetail.preContent.channelId) !== -1?logDetail.preContent.channelName:'其他'}}</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="base-info-remark">
                                                <p>备注：</p>
                                            </div>
                                            <div>{{logDetail.preContent.remark?logDetail.preContent.remark:'--'}}</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <p class="title">编辑后</p>
                        <p class="sale-number">销售单号：{{logDetail && logDetail.afterContent.orderId}}</p>
                        <div class="edit-after" v-if="logDetail">
                            <div class="left">
                                <div class="table-style-change">
                                    <el-table class="ProductListTable sale-list-table" :data="isJson(logDetail.afterContent)?logDetail.afterContent.pluList:null">
                                        <el-table-column label="商品名称" prop="skuName" min-width="150" show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <label for="" :class="{'has-update':comparePreAfter(scope.row, logDetail.preContent.pluList, 'skuName', scope.row.skuName)}">{{scope.row.skuName}}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="商品编码" prop="skuId" min-width="90" show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <label for="" :class="{'has-update':comparePreAfter(scope.row, logDetail.preContent.pluList, 'skuId', scope.row.skuId)}">{{scope.row.skuId}}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="单位" prop="unitName" min-width="60">
                                            <template slot-scope="scope">
                                                <label for="" :class="{'has-update':comparePreAfter(scope.row, logDetail.preContent.pluList, 'unitName', scope.row.unitName)}">{{scope.row.unitName}}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="销售单价（元）" min-width="110">
                                            <template slot-scope="scope">
                                                <label for="" :class="{'has-update':comparePreAfter(scope.row, logDetail.preContent.pluList, 'price', scope.row.price)}">{{scope.row.price/100 |keepTwoNum}}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="销售数量" prop="saleCount">
                                            <template slot-scope="scope">
                                                <label for="" :class="{'has-update':comparePreAfter(scope.row, logDetail.preContent.pluList, 'saleCount', scope.row.saleCount)}">{{scope.row.saleCount}}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="出库数量" prop="sendCount">
                                            <template slot-scope="scope">
                                                <label for="" :class="{'has-update':comparePreAfter(scope.row, logDetail.preContent.pluList, 'sendCount', scope.row.sendCount)}">{{scope.row.sendCount}}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="总价（元）" min-width="90">
                                            <template slot-scope="scope">
                                                <label for="" :class="{'has-update':comparePreAfter(scope.row, logDetail.preContent.pluList, 'saleTotal', scope.row.saleTotal)}">{{scope.row.saleTotal/100 |keepTwoNum}}</label>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="备注" show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <label for="" :class="{'has-update':comparePreAfter(scope.row, logDetail.preContent.pluList, 'remark', scope.row.remark)}">{{scope.row.remark?scope.row.remark:'--'}}</label>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <!-- <GoodsListTable :saleList="isJson(logDetail.afterContent)?logDetail.afterContent.pluList:null" :isLog="true" :preContent="isJson(logDetail.preContent)?logDetail.preContent.pluList:null"></GoodsListTable> -->
                            </div>
                            <div class="right">
                                <!--<GoodsBaseInfo :orderLogDetail="logDetail.afterContent" :isLog="true"></GoodsBaseInfo>-->
                                <div class="base-info-represent" v-if="isJson(logDetail.afterContent)">
                                    <p>基本信息</p>
                                    <ul>
                                        <li>
                                            <div>操作人：</div>
                                            <div :class="{'has-update':logDetail.preContent.preOperator !== logDetail.afterContent.afterOperator}">{{logDetail.afterContent.afterOperator&&logDetail.afterContent.afterOperator}}</div>

                                        </li>
                                        <li>
                                            <div>订单金额：</div>
                                            <div>
                                                <label v-if="logDetail.afterContent.saleTotal !== null" :class="{'has-update':logDetail.preContent.saleTotal !== logDetail.afterContent.saleTotal}">
                                                    ￥{{logDetail.afterContent.saleTotal/100 | keepTwoNum}}
                                                </label>
                                                <template v-else>
                                                    ￥0.00
                                                </template>
                                            </div>

                                        </li>
                                        <li>
                                            <div>创建时间：</div>
                                            <div :class="{'has-update':logDetail.preContent.createTime !== logDetail.afterContent.createTime}">{{formatFullDateAnother(logDetail.afterContent.createTime)}}</div>
                                        </li>
                                        <li>
                                            <div class="base-info-remark">
                                                <p>渠道：</p>
                                            </div>
                                            <div>
                                                <span class="customer" :class="{'has-update':logDetail.preContent.channelName !== logDetail.afterContent.channelName}">{{Number(logDetail.afterContent.channelId) !== -1?logDetail.afterContent.channelName:'其他'}}</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="base-info-remark">
                                                <p>备注：</p>
                                            </div>
                                            <div :class="{'has-update':logDetail.preContent.remark !== logDetail.afterContent.remark}">{{logDetail.afterContent.remark?logDetail.afterContent.remark:'--'}}</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <p class="little-tips">* 提示：标红部分即为本次编辑前后内容对比</p>
                    </div>
                </template>
            </template>
            <template v-else-if="curLogType&&curLogType===3">
                <ReturnLog></ReturnLog>
            </template>
            <div v-else-if="curLogType&&curLogType===14 && String(logData) !== 'null'">
                <ChangeLog></ChangeLog>
            </div>
            <template v-else-if="curLogType&& curLogType===5">
                <template v-if="!isRepresent">
                    <CancelLog></CancelLog>
                </template>
                <template else>
                    <div class="cancel-wrapper" v-if="logDetail && logDetail.afterContent?logDetail.afterContent:null">
                        <div class="title">
                            <span>销售单号：{{logDetail.afterContent.orderId}}</span>
                            <span>状态：已取消</span>
                        </div>
                        <div class="cancel-order-log">
                            <div class="left">
                                <GoodsListTable :saleList="logDetail.afterContent.pluList" :isLog="true"></GoodsListTable>
                            </div>
                            <div class="right">
                                <div class="base-info-represent" v-if="isJson(logDetail.afterContent)">
                                    <p>基本信息</p>
                                    <ul>
                                        <li>
                                            <div>操作人：</div>
                                            <div>{{logDetail.afterContent.afterOperator&&logDetail.afterContent.afterOperator}}</div>

                                        </li>
                                        <li>
                                            <div>订单金额：</div>
                                            <div>
                                                <label v-if="logDetail.afterContent.saleTotal !== null">
                                                    ￥{{logDetail.afterContent.saleTotal/100 | keepTwoNum}}
                                                </label>
                                                <template v-else>
                                                    ￥0.00
                                                </template>
                                            </div>

                                        </li>
                                        <li>
                                            <div>创建时间：</div>
                                            <div>{{formatFullDateAnother(logDetail.afterContent.createTime)}}</div>
                                        </li>
                                        <li>
                                            <div class="base-info-remark">
                                                <p>渠道：</p>
                                            </div>
                                            <div>
                                                <span class="customer">{{Number(logDetail.afterContent.channelId) !== -1?logDetail.afterContent.channelName:'其他'}}</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="base-info-remark">
                                                <p>备注：</p>
                                            </div>
                                            <div>{{logDetail.afterContent.remark?logDetail.afterContent.remark:'--'}}</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </template>
            <template v-else-if="curLogType&& (curLogType===2 || curLogType===16)">
                <div class="table-style-change">
                    <ul class="outbound-inStock-recode" v-if="logData">
                        <li>
                            <div class="left">
                                <span class="name">出库单号：</span>
                                <span class="outbound-order-info">{{logData.afterContent.stockOutId}}</span>
                            </div>
                            <div class="right">
                                <span class="name">备注：</span>
                                <span>{{logData.afterContent.remark?logData.afterContent.remark:'无'}}</span>
                            </div>

                        </li>
                        <li>
                            <div class="left">
                                <span class="name">操作人：</span>
                                <span class="outbound-order-info">{{logData.afterContent.operateUserName}}</span>
                            </div>
                            <div class="right">
                                <span class="name">操作日期：</span>{{formatFullDateAnother(logData.afterContent.createTime)}}
                            </div>
                        </li>
                    </ul>
                    <el-table class="ProductListTable sale-list-table" :data="logData&&logData.afterContent.stockProductModelList" tooltip-effect="light">
                        <el-table-column label="商品名称" prop="skuName" width="236" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="商品编码" prop="skuId">
                        </el-table-column>
                        <el-table-column label="销售数量" prop="stockOutTotalCount">
                        </el-table-column>
                        <el-table-column label="单位" prop="unitName" width="60">
                        </el-table-column>
                        <el-table-column label="出库数量" prop="stockOutCount">s
                        </el-table-column>
                    </el-table>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import RemarkLog from './RemarkLog';
import OrderDetailLog from './OrderDetailLog';
import GoodsListTable from '../salesOrder/GoodsListTable';
import ChangeLog from "./ChangeLog"; // 换货记录
import ReturnLog from './ReturnLog';
import CancelLog from './CancelLog';
import FiltersFun from '~/mixins/filters';
import utils from '~/utils/commonMethod';
export default {
    name: "CheckSalesOrder",
    props: {
        logList: Array,
        isRepresent: Boolean,
    },
    mixins: [FiltersFun],
    components: {
        RemarkLog,
        OrderDetailLog,
        ReturnLog,
        CancelLog,
        GoodsListTable,
        ChangeLog,
    },
    data() {
        return {
            dialogVisible: false, // 编辑日志弹框
            logData: null,
            dialogTitle: '',
            dialogWidth: '660px', // 弹框宽度
            curLogType: null,
        };
    },
    methods: {
        ...mapActions(["showPageLoading", "hidePageLoading", "queryLog"]),
        getLog(type, logId) { // 查询日志详情
            // 0-数据暂存；1--编辑备注；2--出库操作；3--创建退货单；4--编辑详情 5-取消订单
            this.showPageLoading();
            switch (type) {
                case 1: this.dialogTitle = '编辑备注'; this.dialogWidth = '660px'; break;
                case 2: this.dialogTitle = '出库记录'; this.dialogWidth = '800px'; break;
                case 3: this.dialogTitle = '创建退货单'; this.dialogWidth = '800px'; break;
                case 4: this.dialogTitle = '编辑详情'; this.dialogWidth = '1060px'; break;
                case 5: this.dialogTitle = '取消订单'; this.dialogWidth = '1060px'; break;
                case 14: this.dialogTitle = '创建换货单'; this.dialogWidth = '1060px'; break;
                case 16: this.dialogTitle = '撤销出库操作'; this.dialogWidth = '800px'; break;
                default: this.dialogTitle = '数据暂存';
            }
            this.curLogType = Number(type);
            this.queryLog({ logId: logId }).then((res) => {
                this.logData = res;
                this.hidePageLoading();
                this.dialogVisible = true;
            });
        },
        // 日期格式化
        formatFullDateAnother(data) {
            return utils.formatFullDateAnother(data)
        },
        // 判断是不是json对象
        isJson(obj) {
            return utils.isJson(obj)
        },
        // 日志对比函数
        comparePreAfter(row, content, propName, value, isPre) {
            return utils.comparePreAfter(row, content, propName, value, isPre)
        },
    },
    computed: {
        ...mapState({
            logDetail: ({ logRecord }) => logRecord.logDetail,
        }),
    },
}
</script>

<style scoped lang="scss">
.column-name {
  max-width: 180px;
  display: inline-block;
  cursor: pointer;
}
.column-name:hover {
  color: #3b8cff;
}
.column-detail {
  margin-right: 20px;
  float: right;
  color: #3b8cff;
  cursor: pointer;
}
/*订单基本信息*/
.base-info-represent {
  width: 100%;
  background: #fff;
  padding: 20px 10px 2px 20px;
  box-sizing: border-box;
  p {
    color: #333;
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 14px;
  }
  .customer {
    color: #151515;
  }
}
/*订单基本信息*/
.base-info-represent ul {
  li {
    color: #151515;
    font-size: 12px;
    margin-bottom: 18px;
    line-height: 16px;
    word-break: break-word;
    display: flex;
  }
  li > div:nth-of-type(1) {
    color: #666;
  }
  p {
    margin: 0;
    font-size: 12px;
    color: #151515;
  }
  .address-info-title {
    width: 60px;
  }
  .address-info-title p {
    width: 38px;
  }
  .address-info p {
    margin-bottom: 4px;
  }
  .out-order-id {
    width: 120px;
  }
  .base-info-remark p {
    width: 40px !important;
    color: #666;
  }
}
// 取消订单
.cancel-wrapper {
  background: #f8f9fb;
  padding: 20px;
  margin-top: 20px;
  .title {
    color: #333;
    font-size: 12px;
    margin-bottom: 16px;
  }
  .title span:nth-of-type(1) {
    font-size: 14px;
    margin-right: 30px;
    display: inline-block;
  }
}
.cancel-order-log {
  display: flex;
  .left {
    width: 740px;
  }
  .right {
    width: 260px;
    margin-left: 14px;
  }
}
</style>
