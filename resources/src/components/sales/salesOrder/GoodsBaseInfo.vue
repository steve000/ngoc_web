<template>
    <div class="sales-order-base-info goodsBaseInfo">
        <p>基本信息</p>
        <ul class="detail-wrapper">
            <template v-if="!isLog && orderDetail">
                <li>
                    <div>
                        操作人：
                    </div>
                    <div>
                        {{orderDetail.createUserName}}
                    </div>
                </li>
                <li>
                    <div>
                        订单金额：
                    </div>
                    <div>
                        <!--{{orderDetail.saleTotal !== null?`&yen;${orderDetail.saleTotal}.00`:''}}-->
                        <template v-if="orderDetail.saleTotal !== null">
                            ￥{{orderDetail.saleTotal/100 | keepTwoNum}}
                        </template>
                        <template v-else>
                            ￥0.00
                        </template>
                    </div>
                </li>
                <li>
                    <div>
                        已出库金额：
                    </div>
                    <div>
                        <!--{{orderDetail.sendTotal !== null?`&yen;${orderDetail.sendTotal}.00`:''}}-->
                        <template v-if="orderDetail.sendTotal !== null">
                            ￥{{orderDetail.sendTotal/100 | keepTwoNum}}
                        </template>
                        <template v-else>
                            ￥0.00
                        </template>
                    </div>
                </li>
                <li>
                    <div>
                        下单时间：
                    </div>
                    <div>
                        {{formatFullDateAnother(orderDetail.createTime)}}
                    </div>
                </li>
                <li>
                    <div>
                        订单类型：
                    </div>
                    <div>
                        {{orderTypeList[orderDetail.orderType]}}
                    </div>
                </li>
                <li>
                    <div class="out-order-id">
                        <p class="name">外部订单编号：</p>
                    </div>
                    <div>
                        {{orderDetail.oriOrderNo?orderDetail.oriOrderNo:'--'}}
                    </div>
                </li>
                <li>
                    <div>
                        渠道：
                    </div>
                    <div>
                        <span class="customer">{{orderDetail.channelName?orderDetail.channelName:'其他'}}</span>
                    </div>
                </li>
                <!-- <li>
                    <div>
                        客户：
                    </div>
                    <div>
                        <span class="customer">{{orderDetail.customerName?orderDetail.customerName:'其他'}}</span>
                    </div>
                </li> -->

                <li class="address-info">
                    <div class="address-info-title">
                        <p class="name">收货信息：</p>
                    </div>
                    <div>
                        <div>
                            <p>{{orderDetail.custLinkMan?orderDetail.custLinkMan:'--'}}</p>
                            <p>{{orderDetail.custLinkTel?orderDetail.custLinkTel:'--'}}</p>
                            <p>{{`${orderDetail.province?orderDetail.province:''}-${orderDetail.city?orderDetail.city:''}-${orderDetail.area?orderDetail.area:''} ${orderDetail.custAddress?orderDetail.custAddress:'--'}`}}</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="base-info-remark">
                        <p>备注：</p>
                    </div>
                    <div>
                        <p>{{orderDetail.remark?orderDetail.remark:'--'}}</p>
                    </div>
                </li>
            </template>
            <template v-else>
                <template v-if="orderLogDetail">
                    <li>
                        <div>
                            操作人：
                        </div>
                        <div>
                            {{orderLogDetail.createUserName}}
                        </div>
                    </li>
                    <li>
                        <div>
                            订单金额：
                        </div>
                        <div>
                            <!--{{orderLogDetail.saleTotal !== null?`&yen;${orderLogDetail.saleTotal}.00`:''}}-->
                            <template v-if="orderLogDetail.saleTotal !== null">
                                ￥{{lorderLogDetail.saleTotal/100 | keepTwoNum}}
                            </template>
                            <template v-else>
                                ￥0.00
                            </template>
                        </div>
                    </li>
                    <li>
                        <div>
                            已出库金额：
                        </div>
                        <div>
                            <!--{{orderLogDetail.sendTotal !== null?`&yen;${orderLogDetail.sendTotal}.00`:''}}-->
                            <template v-if="orderLogDetail.sendTotal !== null">
                                ￥{{lorderLogDetail.sendTotal/100 | keepTwoNum}}
                            </template>
                            <template v-else>
                                ￥0.00
                            </template>
                        </div>
                    </li>
                    <li>
                        <div>
                            下单时间：
                        </div>
                        <div>
                            {{formatFullDateAnother(orderDetail.createTime)}}
                        </div>
                    </li>
                    <li>
                        <div>
                            订单类型：
                        </div>
                        <div>
                            {{orderTypeList[orderDetail.orderType]}}
                        </div>
                    </li>
                    <!-- <li>
                        <div>
                            客户：
                        </div>
                        <div>
                            <span class="customer">{{orderLogDetail.channelName?orderLogDetail.channelName:'其他'}}</span>
                        </div>
                    </li> -->
                    <li>
                        <div class="out-order-id">
                            <p class="name">外部订单编号：</p>
                        </div>
                        <div>
                            {{orderLogDetail.oriOrderNo?orderLogDetail.oriOrderNo:'--'}}
                        </div>
                    </li>
                    <li class="address-info">
                        <div class="address-info-title">
                            <p class="name">收货信息：</p>
                        </div>
                        <div>
                            <p>{{orderLogDetail.custLinkMan?orderLogDetail.custLinkMan:'--'}}</p>
                            <p>{{orderLogDetail.custLinkTel?orderLogDetail.custLinkTel:'--'}}</p>
                            <p>{{`${orderLogDetail.province?orderLogDetail.province:''}-${orderLogDetail.city?orderLogDetail.city:''}-${orderLogDetail.area?orderLogDetail.area:''} ${orderLogDetail.custAddress?orderLogDetail.custAddress:'--'}`}}</p>
                        </div>
                    </li>
                    <li>
                        <div class="base-info-remark">
                            <p>备注：</p>
                        </div>
                        <div>
                            <p>{{orderLogDetail.remark?orderLogDetail.remark:'--'}}</p>
                        </div>
                    </li>
                </template>

            </template>
        </ul>
    </div>
</template>

<script>
import FiltersFun from '~/mixins/filters';
import utils from '~/utils/commonMethod';
import { mapState } from 'vuex';
export default {
    name: "CheckSalesOrder",
    props: ['orderLogDetail', 'isLog'],
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
            orderDetail: ({ goodsDetail }) => goodsDetail.goodsDetailItem,
        }),
    },
    methods: {
        // 日期格式化
        formatFullDateAnother(data) {
            return utils.formatFullDateAnother(data)
        },
    },

}
</script>

<style lang="scss">
.goodsBaseInfo {
  .detail-wrapper {
    li {
      div:nth-of-type(1) {
        color: #666;
      }
      div:nth-of-type(2) {
        color: #333;
      }
    }
  }
}
</style>

<style scoped lang="scss">
</style>
