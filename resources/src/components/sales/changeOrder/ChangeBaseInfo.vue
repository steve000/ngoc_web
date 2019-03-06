<template>
    <div class="sales-order-base-info changeBaseInfo">
        <p>基本信息</p>
        <ul class="detail-wrapper">
            <li>
                <div>操作人：</div>
                <div>{{changeDetail.createUserName}}</div>
            </li>
            <li v-if="changeDetail.invType===1">
                <div>收货仓库：</div>
                <div>{{changeDetail.stockName}}</div>

            </li>
            <li>
                <div>换货金额：</div>
                <div>
                    ￥{{changeDetail.changeTotal/100 | keepTwoNum}}
                </div>
            </li>
            <li>
                <div>换货时间：</div>
                <div>{{formatFullDateAnother(changeDetail.createTime)}}</div>
            </li>
            <li>
                <div>
                    <label class="customer-name">渠道：</label>
                </div>
                <div>
                    <span class="customer">{{changeDetail.channelName?changeDetail.channelName:'其他'}}</span>
                </div>
            </li>
            <li class="address-info" v-if="changeDetail.invType===1">
                <div class="address-info-title-store">
                    <p>收货仓信息：</p>
                </div>
                <div>
                    <p>{{changeDetail.storeLinkMan?changeDetail.storeLinkMan:'--'}}</p>
                    <p>{{changeDetail.storeLinkTel?changeDetail.storeLinkTel:'--'}}</p>
                    <p>{{changeDetail.storeArea?changeDetail.storeArea:''}} {{changeDetail.storeAddress?changeDetail.storeAddress:''}}</p>
                </div>
            </li>
            <li class="address-info">
                <div class="custormer-info-title">
                    <p>客户收货信息：</p>
                </div>
                <div>
                    <p>{{changeDetail.custLinkMan?changeDetail.custLinkMan:'无'}}</p>
                    <p>{{changeDetail.custLinkTel?changeDetail.custLinkTel:'无'}}</p>
                    <p>{{changeDetail.province?changeDetail.province:''}}-{{changeDetail.city?changeDetail.city:''}}-{{changeDetail.area?changeDetail.area:''}} {{changeDetail.customerAddress?changeDetail.customerAddress:'无'}}</p>
                </div>
            </li>
            <li>
                <div class="base-info-remark">
                    <p>备注：</p>
                </div>
                <div>{{changeDetail.remark?changeDetail.remark:'无'}}</div>

            </li>
        </ul>
    </div>
</template>

<script>
import utils from '~/utils/commonMethod';
import FiltersFun from '~/mixins/filters';
export default {
    name: "change-base-info",
    props: ['changeDetail'],
    mixins: [FiltersFun],
    methods: {
        // 日期格式化
        formatFullDateAnother(data) {
            return utils.formatFullDateAnother(data)
        },
    },
}
</script>

<style lang="scss">
.changeBaseInfo {
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


<style scoped>
</style>
