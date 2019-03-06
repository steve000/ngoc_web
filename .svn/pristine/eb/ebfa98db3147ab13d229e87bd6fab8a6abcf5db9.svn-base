<template>
    <div class="edit-log-wrapper">

        <p class="title">编辑前：</p>
        <p class="sale-number">销售单号：{{logDetail.preContent.orderId}}</p>
        <div class="edit-before">
            <div class="left">
                <!--<GoodsListTable :saleList="logDetail&&logDetail.preContent.pluList" :isLog="true"></GoodsListTable>-->
                <div class="table-style-change">
                    <el-table class="ProductListTable sale-list-table" :data="isJson(logDetail.preContent)?logDetail.preContent.pluList:null">
                        <el-table-column label="商品名称" prop="skuName" width="180" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <p :class="{'has-update':comparePreAfter(scope.row, logDetail.afterContent.pluList, 'skuName', scope.row.skuName, true)}">{{scope.row.skuName}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="商品编码" prop="skuId" width="100">
                            <template slot-scope="scope">
                                <p :class="{'has-update':comparePreAfter(scope.row, logDetail.afterContent.pluList, 'skuId', scope.row.skuId, true)}">{{scope.row.skuId}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="单位" prop="unitName" width="60">
                            <template slot-scope="scope">
                                <p :class="{'has-update':comparePreAfter(scope.row, logDetail.afterContent.pluList, 'unitName', scope.row.unitName, true)}">{{scope.row.unitName}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="销售单价（元）" prop="price" width="110">
                            <template slot-scope="scope">
                                <p :class="{'has-update':comparePreAfter(scope.row, logDetail.afterContent.pluList, 'price', scope.row.price, true)}">{{scope.row.price?scope.row.price/100:0}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="销售数量" prop="saleCount">
                            <template slot-scope="scope">
                                <p :class="{'has-update':comparePreAfter(scope.row, logDetail.afterContent.pluList, 'saleCount', scope.row.saleCount, true)}">{{scope.row.saleCount}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="总价（元）" prop="saleTotal">
                            <template slot-scope="scope">
                                <p :class="{'has-update':comparePreAfter(scope.row, logDetail.afterContent.pluList, 'saleTotal', scope.row.saleTotal, true)}">{{scope.row.saleTotal?scope.row.saleTotal/100:0}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" show-overflow-tooltip width="80px">
                            <template slot-scope="scope">
                                <p class="log-remark" :class="{'has-update':comparePreAfter(scope.row, logDetail.afterContent.pluList, 'remark', scope.row.remark, true)}">{{scope.row.remark?scope.row.remark:'--'}}</p>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="right">
                <!--<GoodsBaseInfo :orderLogDetail="logDetail.preContent" :isLog="true"></GoodsBaseInfo>-->
                <div class="sales-order-base-info" v-if="isJson(logDetail.preContent)">
                    <p>基本信息</p>
                    <ul class="detail-wrapper">
                        <li>
                            <div>
                                操作人：
                            </div>
                            <div>
                                {{logDetail.preContent.preOperator}}
                            </div>
                        </li>
                        <li>
                            <div>
                                订单金额：
                            </div>
                            <div>
                                <!--{{logDetail.preContent.saleTotal !== null? logDetail.preContent.saleTotal/100 | currency'$''2':''}}-->
                                <template v-if="logDetail.preContent.saleTotal !== null">
                                    ￥{{logDetail.preContent.saleTotal/100 | keepTwoNum}}
                                </template>
                                <template v-else>
                                    0.00
                                </template>
                            </div>
                        </li>
                        <li>
                            <div>
                                已出库金额：
                            </div>
                            <div>
                                <!--{{// logDetail.preContent.sendTotal !== null?`&yen;${logDetail.preContent.sendTotal/100}`:''}}-->
                                <template v-if="logDetail.preContent.sendTotal">
                                    ￥{{logDetail.preContent.sendTotal/100 | keepTwoNum}}
                                </template>
                                <template v-else>
                                    0.00
                                </template>
                            </div>
                        </li>
                        <li>
                            <div>
                                创建时间：
                            </div>
                            <div>
                                {{formatFullDateAnother(logDetail.preContent.createTime)}}
                            </div>
                        </li>
                        <li>
                            <div>
                                订单类型：
                            </div>
                            <div>
                                {{orderTypeList[logDetail.preContent.orderType]}}
                            </div>
                        </li>
                        <li>
                            <div class="out-order-id">
                                <p class="name">外部订单编号：</p>
                            </div>
                            <div>
                                {{logDetail.preContent.oriOrderNo?logDetail.preContent.oriOrderNo:'--'}}
                            </div>
                        </li>
                        <li>
                            <div class="base-info-remark">
                                <p>渠道：</p>
                            </div>
                            <div>
                                <span class="customer">{{Number(logDetail.preContent.channelId) !== -1?logDetail.preContent.channelName:'其他'}}</span>
                            </div>
                        </li>
                        <li class="address-info">
                            <div class="address-info-title">
                                <p class="name">收货信息：</p>
                            </div>
                            <div>
                                <p>
                                    {{logDetail.preContent.custLinkMan?logDetail.preContent.custLinkMan:'--'}}
                                </p>
                                <p>
                                    {{logDetail.preContent.custLinkTel?logDetail.preContent.custLinkTel:'--'}}
                                </p>
                                <p>
                                    {{` ${logDetail.preContent.province?logDetail.preContent.province:''}-${logDetail.preContent.city?logDetail.preContent.city:''}-${logDetail.preContent.area?logDetail.preContent.area:''} ${logDetail.preContent.custAddress?logDetail.preContent.custAddress:'--'}`}}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div class="base-info-remark">
                                <p>备注：</p>
                            </div>
                            <div>
                                <p>{{logDetail.preContent.remark?logDetail.preContent.remark:'--'}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <p class="title">编辑后</p>
        <p class="sale-number">销售单号：{{logDetail.afterContent.orderId}}</p>
        <div class="edit-after">
            <div class="left">
                <!--<GoodsListTable :saleList="logDetail&&logDetail.afterContent.pluList" :isLog="true"></GoodsListTable>-->
                <div class="table-style-change">
                    <el-table class="ProductListTable sale-list-table" :data="isJson(logDetail.afterContent)?logDetail.afterContent.pluList:null">
                        <el-table-column label="商品名称" prop="skuName" width="180" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <p :class="{'has-update':comparePreAfter(scope.row, logDetail.preContent.pluList, 'skuName', scope.row.skuName)}">{{scope.row.skuName}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="商品编码" prop="skuId" width="100">
                            <template slot-scope="scope">
                                <p :class="{'has-update':comparePreAfter(scope.row, logDetail.preContent.pluList, 'skuId', scope.row.skuId)}">{{scope.row.skuId}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="单位" prop="unitName" width="60">
                            <template slot-scope="scope">
                                <p :class="{'has-update':comparePreAfter(scope.row, logDetail.preContent.pluList, 'unitName', scope.row.unitName)}">{{scope.row.unitName}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="销售单价（元）" prop="price" width="110">
                            <template slot-scope="scope">
                                <p :class="{'has-update':comparePreAfter(scope.row, logDetail.preContent.pluList, 'price', scope.row.price)}">{{scope.row.price?scope.row.price/100:0}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="销售数量" prop="saleCount">
                            <template slot-scope="scope">
                                <p :class="{'has-update':comparePreAfter(scope.row, logDetail.preContent.pluList, 'saleCount', scope.row.saleCount)}">{{scope.row.saleCount}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="总价（元）" prop="saleTotal" width="90">
                            <template slot-scope="scope">
                                <p :class="{'has-update':comparePreAfter(scope.row, logDetail.preContent.pluList, 'saleTotal', scope.row.saleTotal)}">{{scope.row.saleTotal?scope.row.saleTotal/100:0}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <p :class="{'has-update':comparePreAfter(scope.row, logDetail.preContent.pluList, 'remark', scope.row.remark)}" class="log-remark">{{scope.row.remark?scope.row.remark:'--'}}</p>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="right">
                <!--<GoodsBaseInfo :orderLogDetail="logDetail.afterContent" :isLog="true"></GoodsBaseInfo>-->
                <div class="sales-order-base-info" v-if="isJson(logDetail.afterContent)">
                    <p>基本信息</p>
                    <ul class="detail-wrapper">
                        <li>
                            <div>
                                操作人：
                            </div>
                            <div :class="{'has-update':logDetail.preContent.preOperator !== logDetail.afterContent.afterOperator}">
                                {{logDetail.afterContent.afterOperator}}
                            </div>
                        </li>
                        <li>
                            <div>
                                订单金额：
                            </div>
                            <div v-if="logDetail.afterContent.saleTotal === null">
                                ￥0.00
                            </div>
                            <div v-else :class="{'has-update':logDetail.afterContent.saleTotal !== logDetail.preContent.saleTotal}">
                                ￥{{logDetail.afterContent.saleTotal/100 | keepTwoNum}}
                            </div>
                        </li>
                        <li>
                            <div>
                                已出库金额：
                            </div>
                            <div :class="{'has-update':logDetail.preContent.sendTotal !== logDetail.afterContent.sendTotal}">
                                <!--{{logDetail.afterContent.sendTotal !== null?`&yen;${logDetail.afterContent.sendTotal/100}.00`:''}}-->
                                <template v-if="logDetail.afterContent.sendTotal">
                                    ￥{{logDetail.afterContent.sendTotal/100 | keepTwoNum}}
                                </template>
                                <template v-else>
                                    ￥0.00
                                </template>
                            </div>
                        </li>
                        <li>
                            <div>
                                创建时间：
                            </div>
                            <div :class="{'has-update':logDetail.preContent.createTime !== logDetail.afterContent.createTime}">
                                {{formatFullDateAnother(logDetail.afterContent.createTime)}}
                            </div>
                        </li>
                        <li>
                            <div>
                                订单类型：
                            </div>
                            <div :class="{'has-update':logDetail.preContent.orderType !== logDetail.afterContent.orderType}">
                                {{orderTypeList[logDetail.afterContent.orderType]}}
                            </div>
                        </li>
                        <li>
                            <div class="out-order-id">
                                <p class="name">外部订单编号：</p>
                            </div>
                            <div :class="{'has-update':logDetail.preContent.oriOrderNo !== logDetail.afterContent.oriOrderNo}">
                                {{logDetail.afterContent.oriOrderNo?logDetail.afterContent.oriOrderNo:'--'}}
                            </div>
                        </li>
                        <li>
                            <div class="base-info-remark">
                                <p>渠道：</p>
                            </div>
                            <div>
                                <span class="customer">{{Number(logDetail.afterContent.channelId) !== -1?logDetail.afterContent.channelName:'其他'}}</span>
                            </div>
                        </li>
                        <li class="address-info">
                            <div class="address-info-title">
                                <p class="name">收货信息：</p>
                            </div>
                            <div>
                                <p :class="{'has-update':logDetail.preContent.custLinkMan !== logDetail.afterContent.custLinkMan}">
                                    {{logDetail.afterContent.custLinkMan?logDetail.afterContent.custLinkMan:'--'}}
                                </p>
                                <p :class="{'has-update':logDetail.preContent.custLinkTel !== logDetail.afterContent.custLinkTel}">
                                    {{logDetail.afterContent.custLinkTel?logDetail.afterContent.custLinkTel:'--'}}
                                </p>
                                <p :class="{'has-update':logDetail.preContent.custAddress !== logDetail.afterContent.custAddress}">
                                    {{`${logDetail.afterContent.province?logDetail.afterContent.province:''}-${logDetail.afterContent.city?logDetail.afterContent.city:''}-${logDetail.afterContent.area?logDetail.afterContent.area:''} ${logDetail.afterContent.custAddress?logDetail.afterContent.custAddress:'--'}` }}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div class="base-info-remark">
                                <p>备注：</p>
                            </div>
                            <div>
                                <p :class="{'has-update':logDetail.preContent.remark !== logDetail.afterContent.remark}">
                                    {{logDetail.afterContent.remark?logDetail.afterContent.remark:'--'}}
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <p class="little-tips">* 提示：标红部分即为本次编辑前后内容对比</p>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import GoodsListTable from '../salesOrder/GoodsListTable';
import GoodsBaseInfo from '../salesOrder/GoodsBaseInfo';
import FiltersFun from '~/mixins/filters';
import utils from '~/utils/commonMethod';

export default {
    name: "remark-log",
    components: {
        GoodsListTable,
        GoodsBaseInfo,
    },
    mixins: [FiltersFun],
    data() {
        return {
            orderTypeList: {
                11: '普通订单',
                12: '代售订单',
                13: '代发订单',
            },
        };
    },
    computed: {
        ...mapState({
            logDetail: ({ logRecord }) => logRecord.logDetail,
        }),
    },
    methods: {
        // 日期格式化
        formatFullDateAnother(data) {
            return utils.formatFullDateAnother(data)
        },
        // 日志对比函数
        comparePreAfter(row, content, propName, value, isPre) {
            return utils.comparePreAfter(row, content, propName, value, isPre)
        },
        // 判断是不是json对象
        isJson(obj) {
            return utils.isJson(obj)
        },
    },
}
</script>

<style scoped lang="scss">
</style>
