<template>
    <div class="table-style-change">
        <el-table class="ProductListTable sale-list-table" :data="logList">
            <el-table-column label="操作内容" min-width="100">
                <template slot-scope="scope">
                    <p class="column-name" @click="getLog(scope.row.logType, scope.row.saleOpLogId)" v-if="scope.row.logType !== 14">
                        <!--0-数据暂存；1--编辑备注；2--出库操作；3--创建退货单；4--编辑详情；5--取消订单， 6--入库单号 7-新增-->
                        {{scope.row.title}}
                    </p>
                    <p v-else>{{scope.row.title}}</p>
                    <p class="column-detail" @click="getLog(scope.row.logType, scope.row.saleOpLogId)" v-if="scope.row.logType !== 14">详情</p>

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
            <template v-if="curLogType&&(curLogType===2||curLogType===16)">
                <LogOutboundDetail :isLog="true" :outStoreList="afterContent"></LogOutboundDetail>
            </template>
            <template v-if="curLogType&&(curLogType===6||curLogType===17)">
                <LogInboundDetail :isLog="true" :inStoreList="afterContent"></LogInboundDetail>
            </template>
            <template v-else-if="curLogType&&curLogType===4">
                <div class="edit-log-wrapper" v-if="isJson(preContent) || isJson(afterContent)">

                    <p class="title">编辑前：</p>
                    <p class="sale-number">销售换货单号：{{preContent&&preContent.changeId}}</p>
                    <div class="edit-before">
                        <!--左边表格-->
                        <div class="left">
                            <div class="table-style-change">
                                <el-table class="ProductListTable sale-list-table" :data="preContent.saleChangeSkusModels?preContent.saleChangeSkusModels:null" empty-text="暂无数据">
                                    <el-table-column label="商品名称" prop="skuName" width="200" show-overflow-tooltip>
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
                                            <p>{{scope.row.price?scope.row.price/100:0}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="本次换货" prop="changeCount">
                                        <template slot-scope="scope">
                                            <p>{{scope.row.changeCount}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="总价（元）" prop="changeTotal" width="90">
                                        <template slot-scope="scope">
                                            <p>{{scope.row.changeTotal?scope.row.changeTotal/100:0}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="备注" prop="remark" show-overflow-tooltip>
                                        <template slot-scope="scope">
                                            <p>{{scope.row.remark?scope.row.remark:'--'}}</p>
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
                                        <div>{{preContent.preOperator}}</div>

                                    </li>
                                    <li>
                                        <div>收货仓库：</div>
                                        <div>{{preContent.stockName}}</div>

                                    </li>
                                    <li>
                                        <div>换货金额：</div>
                                        <div>
                                            ￥{{preContent.changeTotal/100 | keepTwoNum}}
                                        </div>

                                    </li>
                                    <li>
                                        <div>换货时间：</div>
                                        <div>{{formatFullDateAnother(preContent.createTime)}}</div>
                                    </li>
                                    <li>
                                        <div>渠道：</div>
                                        <div>
                                            <span class="customer">
                                                {{Number(preContent.channelId) !== -1 ? preContent.channelName:'其他'}}
                                            </span>
                                        </div>
                                    </li>
                                    <li class="change-address-info">
                                        <div class="address-info-title-store">
                                            <p>收货仓信息：</p>
                                        </div>
                                        <div>
                                            <p>{{preContent.storeLinkMan?preContent.storeLinkMan:'--'}}</p>
                                            <p>{{preContent.storeLinkTel?preContent.storeLinkTel:'--'}}</p>
                                            <p>{{preContent.storeArea}} {{preContent.storeAddress}}</p>
                                        </div>
                                    </li>
                                    <li class="change-address-info">
                                        <div class="custormer-info-title">
                                            <p>客户收货信息：</p>
                                        </div>
                                        <div>
                                            <p>{{preContent.custLinkMan}}</p>
                                            <p>{{preContent.custLinkTel}}</p>
                                            <p>{{preContent.province}}-{{preContent.city }}-{{preContent.area}} {{preContent.customerAddress}}</p>
                                        </div>
                                    </li>
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
                    <p class="sale-number">销售换货单号：{{afterContent.changeId}}</p>
                    <div class="edit-after">
                        <div class="left">
                            <el-table class="ProductListTable sale-list-table" :data="afterContent.saleChangeSkusModels?afterContent.saleChangeSkusModels:null">
                                <el-table-column label="商品名称" prop="skuName" width="200" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <p :class="{'has-update': comparePreAfter(scope.row, preContent.saleChangeSkusModels, 'skuName', scope.row.skuName)}">{{scope.row.skuName}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="商品编码" prop="skuId" width="100">
                                    <template slot-scope="scope">
                                        <p :class="{'has-update': comparePreAfter(scope.row, preContent.saleChangeSkusModels, 'skuId', scope.row.skuId)}">{{scope.row.skuId}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="单位" prop="unitName" width="60">
                                    <template slot-scope="scope">
                                        <p :class="{'has-update': comparePreAfter(scope.row, preContent.saleChangeSkusModels, 'unitName', scope.row.unitName)}">{{scope.row.unitName}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="销售单价（元）" prop="price" width="110">
                                    <template slot-scope="scope">
                                        <p :class="{'has-update': comparePreAfter(scope.row, preContent.saleChangeSkusModels, 'price', scope.row.price)}">{{scope.row.price?scope.row.price/100:0}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="本次换货" prop="changeCount">
                                    <template slot-scope="scope">
                                        <p :class="{'has-update': comparePreAfter(scope.row, preContent.saleChangeSkusModels, 'changeCount', scope.row.changeCount)}">{{scope.row.changeCount}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="总价（元）" prop="changeTotal" width="90">
                                    <template slot-scope="scope">
                                        <p :class="{'has-update': comparePreAfter(scope.row, preContent.saleChangeSkusModels, 'changeTotal', scope.row.changeTotal)}">{{scope.row.changeTotal?scope.row.changeTotal/100:0}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="备注" prop="remark" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <p :class="{'has-update': comparePreAfter(scope.row, preContent.saleChangeSkusModels, 'remark', scope.row.remark)}">{{scope.row.remark?scope.row.remark:'--'}}</p>
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
                                        <div :class="{'has-update':afterContent.preOperator !== preContent.afterOperator}">{{afterContent.afterOperator}}</div>

                                    </li>
                                    <li>
                                        <div>收货仓库：</div>
                                        <div :class="{'has-update':afterContent.stockName !== preContent.stockName}">{{afterContent.stockName}}</div>

                                    </li>
                                    <li>
                                        <div>换货金额：</div>
                                        <div :class="{'has-update':afterContent.changeTotal !== preContent.changeTotal}">
                                            ￥{{afterContent.changeTotal/100 | keepTwoNum}}
                                        </div>

                                    </li>
                                    <li>
                                        <div>换货时间：</div>
                                        <div>{{formatFullDateAnother(afterContent.createTime)}}</div>
                                    </li>
                                    <li>
                                        <div>渠道：</div>
                                        <div>
                                            <span class="customer">{{Number(afterContent.channelId) !== -1?afterContent.channelName:'其他'}}</span>
                                        </div>
                                    </li>
                                    <li class="address-info">
                                        <div class="address-info-title-store">
                                            <p>收货仓信息：</p>
                                        </div>
                                        <div>
                                            <p :class="{'has-update':afterContent.storeLinkMan !== preContent.storeLinkMan}">{{afterContent.storeLinkMan?afterContent.storeLinkMan:'--'}}</p>
                                            <p :class="{'has-update':afterContent.storeLinkTel !== preContent.storeLinkTel}">{{afterContent.storeLinkTel?afterContent.storeLinkTel:'--'}}</p>
                                            <p :class="{'has-update':afterContent.storeAddress !== preContent.storeAddress}">{{afterContent.storeArea}} {{afterContent.storeAddress}}</p>
                                        </div>
                                    </li>
                                    <li class="address-info">
                                        <div class="custormer-info-title">
                                            <p>客户收货信息：</p>
                                        </div>
                                        <div>
                                            <p :class="{'has-update':afterContent.custLinkMan !== preContent.custLinkMan}">{{afterContent.custLinkMan}}</p>
                                            <p :class="{'has-update':afterContent.custLinkTel !== preContent.custLinkTel}">{{afterContent.custLinkTel}}</p>
                                            <p :class="{'has-update':afterContent.customerAddress !== preContent.customerAddress}">{{afterContent.province}}-{{afterContent.city }}-{{afterContent.area}} {{afterContent.customerAddress}}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="base-info-remark">
                                            <p>备注：</p>
                                        </div>
                                        <div :class="{'has-update':afterContent.remark !== preContent.remark}">{{afterContent.remark?afterContent.remark:'--'}}</div>

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
import LogOutboundDetail from './LogOutboundDetail'; // 出库记录详情
import LogInboundDetail from './LogInboundDetail';  // 入库记录详情

export default {
    name: "goods-list-table",
    props: {
        logList: Array,
    },
    mixins: [FiltersFun],
    components: {
        RemarkLog,
        LogOutboundDetail,
        LogInboundDetail,
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
            // 0-数据暂存；1--编辑备注；2--出库操作；3--创建退货单；4--编辑详情 5-取消订单，6--入库记录
            this.showPageLoading();
            switch (type) {
                case 1: this.dialogTitle = '编辑备注'; this.dialogWidth = '660px'; break;
                case 2: this.dialogTitle = '出库记录'; this.dialogWidth = '660px'; break;
                case 16: this.dialogTitle = '撤销出库'; this.dialogWidth = '660px'; break;
                case 6: this.dialogTitle = '入库记录'; this.dialogWidth = '660px'; break;
                case 17: this.dialogTitle = '撤销入库'; this.dialogWidth = '660px'; break;
                case 4: this.dialogTitle = '编辑详情'; this.dialogWidth = '1060px'; break;
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
/*订单基本信息*/
.base-info ul {
  .address-info {
    .address-info-title-store {
      width: 80px;
    }
    .address-info-title p {
      width: 88px;
    }
  }
}
</style>
