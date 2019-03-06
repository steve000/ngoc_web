<template>
    <div class="table-style-change">
        <el-table class="ProductListTable sale-list-table" :data="logList">
            <el-table-column label="操作内容" min-width="100">
                <template slot-scope="scope">
                    <p class="column-name" @click="getLog(scope.row.logType, scope.row.saleOpLogId)" v-if="scope.row.logType !== 3">
                        <!--0-数据暂存；1--编辑备注；2--出库操作；3--创建退货单；4--编辑详情；-->
                        <!--入库类型后续加入-->
                        <!--<template v-if="scope.row.logType === 1">-->
                        <!--编辑备注-->
                        <!--</template>-->
                        <!--<template v-else-if="scope.row.logType === 4">-->
                        <!--编辑详情-->
                        <!--</template>-->
                        <!--<template v-else-if="scope.row.logType === 6">-->
                        <!--入库单号：{{scope.row.content && scope.row.content.stockInId}}-->
                        <!--</template>-->
                        {{scope.row.title}}
                    </p>
                    <p v-else>{{scope.row.title}}</p>
                    <p class="column-detail" @click="getLog(scope.row.logType, scope.row.saleOpLogId)" v-if="scope.row.logType !== 3">详情</p>
                </template>
            </el-table-column>
            <el-table-column label="操作人" prop="createUserName">
            </el-table-column>
            <el-table-column label="操作时间">
                <template slot-scope="scope">
                    {{formatFullDateAnother(scope.row.createTime)}}
                </template>
            </el-table-column>
            <el-table-column label="备注">
                <template slot-scope="scope">
                    {{scope.row.remark?scope.row.remark:'无'}}
                </template>
            </el-table-column>
        </el-table>
        <!--查看编辑日志弹窗-->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :width="dialogWidth" class="remark-log-dialog">
            <template v-if="curLogType&&curLogType===1">
                <RemarkLog></RemarkLog>
            </template>
            <template v-else-if="curLogType&&(curLogType===6 ||curLogType===17)">
                <ReturnInboundLog :inStoreList="afterContent"></ReturnInboundLog>
            </template>
            <template v-else-if="curLogType&&curLogType===4">
                <div class="edit-log-wrapper">

                    <p class="title">编辑前：</p>
                    <p class="sale-number">销售退货单号：{{preContent.returnId}}</p>
                    <div class="edit-before">
                        <!--左边表格-->
                        <div class="left">
                            <div class="table-style-change">
                                <el-table class="ProductListTable sale-list-table" :data="isJson(preContent)?preContent.saleReturnSkuList:null">
                                    <el-table-column label="商品名称" prop="skuName" width="180">
                                        <template slot-scope="scope">
                                            <p>{{scope.row.skuName}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="商品编码" prop="skuId" width="100">
                                        <template slot-scope="scope">
                                            <p>{{scope.row.skuId}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="单位" prop="unitName" width="60">
                                        <template slot-scope="scope">
                                            <p>{{scope.row.unitName}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="销售单价（元）" prop="price" width="110">
                                        <template slot-scope="scope">
                                            <p>{{scope.row.price/100|keepTwoNum}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="本次退货" prop="returnCount">
                                        <template slot-scope="scope">
                                            <p>{{scope.row.returnCount}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="总价（元）" prop="returnTotal" width="90">
                                        <template slot-scope="scope">
                                            <p>{{scope.row.returnTotal/100|keepTwoNum}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="备注" show-overflow-tooltip>
                                        <template slot-scope="scope">
                                            <p class="log-remark">{{scope.row.remark?scope.row.remark:'--'}}</p>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <!--右边基本信息-->
                        <div class="right">
                            <div class="sales-order-base-info">
                                <p>基本信息</p>
                                <ul class="detail-wrapper">
                                    <li>
                                        <div>操作人：</div>
                                        <div>
                                            {{preContent.preOperator}}
                                        </div>
                                    </li>
                                    <li>
                                        <div>收货仓库：</div>
                                        <div>
                                            {{preContent.stockName}}
                                        </div>
                                    </li>
                                    <li>
                                        <div>退货金额：</div>
                                        <div>
                                            ￥{{preContent.returnTotal/100 | keepTwoNum}}
                                        </div>
                                    </li>
                                    <li>
                                        <div>退货时间：</div>
                                        <div>{{formatFullDateAnother(preContent.createTime)}}</div>
                                    </li>
                                    <li>
                                        <div>渠道：</div>
                                        <div>
                                            <span class="customer">{{Number(preContent.channelId) !== -1?preContent.channelName:'其他'}}</span>
                                        </div>

                                    </li>
                                    <!--<li class="address-info">-->
                                    <!--<div class="address-info-title">-->
                                    <!--收货仓信息：-->
                                    <!--</div>-->
                                    <!--<div>-->
                                    <!--<p>{{preContent.storeLinkMan}}</p>-->
                                    <!--<p>{{preContent.storeLinkTel}}</p>-->
                                    <!--<p>{{preContent.storeAddress}}</p>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <li>
                                        <div class="base-info-remark">
                                            <p>备注：</p>
                                        </div>
                                        <div>{{preContent.remark?preContent.remark:'--'}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <p class="title">编辑后</p>
                    <p class="sale-number">销售退货单号：{{afterContent.returnId}}</p>
                    <div class="edit-after">
                        <div class="left">
                            <el-table class="ProductListTable sale-list-table" :data="isJson(afterContent)?afterContent.saleReturnSkuList:null">
                                <el-table-column label="商品名称" prop="skuName" width="180">
                                    <template slot-scope="scope">
                                        <p :class="{'has-update': comparePreAfter(scope.row, preContent.saleReturnSkuList, 'skuName', scope.row.skuName)}">{{scope.row.skuName}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="商品编码" prop="skuId" width="100">
                                    <template slot-scope="scope">
                                        <p :class="{'has-update': comparePreAfter(scope.row, preContent.saleReturnSkuList, 'skuId', scope.row.skuId)}">{{scope.row.skuId}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="单位" prop="unitName" width="60">
                                    <template slot-scope="scope">
                                        <p :class="{'has-update': comparePreAfter(scope.row, preContent.saleReturnSkuList, 'unitName', scope.row.unitName)}">{{scope.row.unitName}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="销售单价（元）" prop="price" width="110">
                                    <template slot-scope="scope">
                                        <p :class="{'has-update': comparePreAfter(scope.row, preContent.saleReturnSkuList, 'price', scope.row.price)}">{{scope.row.price/100|keepTwoNum}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="本次退货" prop="returnCount">
                                    <template slot-scope="scope">
                                        <p :class="{'has-update': comparePreAfter(scope.row, preContent.saleReturnSkuList, 'returnCount', scope.row.returnCount)}">{{scope.row.returnCount}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="总价（元）" prop="returnTotal" width="90">
                                    <template slot-scope="scope">
                                        <p :class="{'has-update': comparePreAfter(scope.row, preContent.saleReturnSkuList, 'returnTotal', scope.row.returnTotal)}">{{scope.row.returnTotal/100|keepTwoNum}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="备注" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <p :class="{'has-update': comparePreAfter(scope.row, preContent.saleReturnSkuList, 'remark', scope.row.remark)}" class="log-remark">{{scope.row.remark?scope.row.remark:'--'}}</p>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="right">
                            <div class="sales-order-base-info">
                                <p>基本信息</p>
                                <ul class="detail-wrapper">
                                    <li>
                                        <div>操作人：</div>
                                        <div :class="{'has-update': afterContent.preOperator !== preContent.afterOperator}">
                                            {{afterContent.afterOperator}}
                                        </div>
                                    </li>
                                    <li>
                                        <div>收货仓库：</div>
                                        <div :class="{'has-update': afterContent.stockName !== preContent.stockName}">
                                            {{afterContent.stockName}}
                                        </div>
                                    </li>
                                    <li>
                                        <div>退货金额：</div>
                                        <div :class="{'has-update': afterContent.returnTotal !== preContent.returnTotal}">
                                            ￥{{afterContent.returnTotal/100 | keepTwoNum}}
                                        </div>
                                    </li>
                                    <li>
                                        <div>退货时间：</div>
                                        <div :class="{'has-update': afterContent.createTime !== preContent.createTime}">{{formatFullDateAnother(afterContent.createTime)}}</div>
                                    </li>
                                    <li>
                                        <div>渠道：</div>
                                        <div>
                                            <span class="customer">{{Number(afterContent.channelId) !== -1?afterContent.channelName:'其他'}}</span>
                                        </div>

                                    </li>
                                    <!--<li class="address-info">-->
                                    <!--<div class="address-info-title">-->
                                    <!--收货仓信息：-->
                                    <!--</div>-->
                                    <!--<div>-->
                                    <!--<p>{{preContent.storeLinkMan}}</p>-->
                                    <!--<p>{{preContent.storeLinkTel}}</p>-->
                                    <!--<p>{{preContent.storeAddress}}</p>-->
                                    <!--</div>-->
                                    <!--</li>-->
                                    <li>
                                        <div class="base-info-remark">
                                            <p>备注：</p>
                                        </div>
                                        <div :class="{'has-update': afterContent.remark !== preContent.remark}">{{afterContent.remark?afterContent.remark:'--'}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <p class="little-tips">* 提示：标红部分即为本次编辑前后内容对比</p>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import FiltersFun from '~/mixins/filters';
import utils from '~/utils/commonMethod';
import RemarkLog from '../LogComponent/RemarkLog';
import ReturnInboundLog from '~/components/sales/salesReturn/ReturnInboundLog'; // 入库记录
export default {
    name: "goods-list-table",
    props: {
        logList: Array,
    },
    mixins: [FiltersFun],
    components: {
        RemarkLog,
        ReturnInboundLog,
    },
    data() {
        return {
            dialogVisible: false, // 编辑日志弹框
            dialogTitle: '',
            dialogWidth: '660px', // 弹框宽度
            curLogType: null,
            preContent: {},
            afterContent: {},
        };
    },
    methods: {
        ...mapActions(["showPageLoading", "hidePageLoading", "queryLog"]),
        getLog(type, logId) { // 查询日志详情
            // 0-数据暂存；1--编辑备注；2--出库操作；3--创建退货单；4--编辑详情 5-取消订单
            this.showPageLoading();
            switch (type) {
                case 1: this.dialogTitle = '编辑备注'; this.dialogWidth = '660px'; break;
                case 4: this.dialogTitle = '编辑详情'; this.dialogWidth = '1060px'; break;
                case 6: this.dialogTitle = '入库记录'; this.dialogWidth = '660px'; break;
                case 17: this.dialogTitle = '撤销入库'; this.dialogWidth = '660px'; break;
            }
            this.curLogType = Number(type);
            this.queryLog({ logId: logId }).then((res) => {
                this.hidePageLoading();
                this.preContent = res.preContent;
                this.afterContent = res.afterContent;
                this.dialogVisible = true;
            });
        },
        // 日期格式化
        formatYearOne(data) {
            return utils.formatYearOne(data)
        },
        // 日期格式化
        formatFullDateAnother(data) {
            return utils.formatFullDateAnother(data)
        },
        // 日志对比函数
        comparePreAfter(row, content, propName, value) {
            return utils.comparePreAfter(row, content, propName, value)
        },
        // 判断是不是json对象
        isJson(obj) {
            return utils.isJson(obj)
        },
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
</style>
