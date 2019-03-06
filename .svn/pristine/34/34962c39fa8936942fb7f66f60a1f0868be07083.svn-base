<template>
  <div class="base-info-represent proxyBaseInfo">
    <p>基本信息</p>
    <ul v-if="orderDetail">
      <li>
        <div>操作人：</div>
        <div>{{orderDetail.createUserName}}</div>

      </li>
      <li>
        <div>订单金额：</div>
        <div>
          ￥{{orderDetail.saleTotal/100 | keepTwoNum}}
        </div>

      </li>
      <li>
        <div>创建时间：</div>
        <div>{{formatFullDateAnother(orderDetail.createTime)}}</div>
      </li>
      <li>
        <div style="min-width: 40px;">渠道：</div>
        <div>
          <p class="customer">{{orderDetail.channelName?orderDetail.channelName:'其他'}}</p>
        </div>
      </li>
      <li>
        <div class="base-info-remark">
          <P>备注：</P>
        </div>
        <div>{{orderDetail.remark?orderDetail.remark:'无'}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import utils from '~/utils/commonMethod';
import FiltersFun from '~/mixins/filters';

export default {
  name: "proxy-base-info",
  props: ['orderDetail'],
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
.proxyBaseInfo {
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
/*订单基本信息*/
.base-info-represent {
  width: 100%;
  background: #fff;
  padding: 20px 20px 2px 20px;
  box-sizing: border-box;
  p {
    color: #333;
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 20px;
  }
}
/*订单基本信息*/
.base-info-represent ul {
  li {
    color: #151515;
    font-size: 12px;
    margin-bottom: 20px;
    line-height: 16px;
    word-break: break-word;
    display: flex;
  }
  li > div:nth-of-type(2) {
    color: #666;
  }
  li p {
    margin: 0;
    font-size: 12px;
    // color: #151515;
  }
  .address-info-title-store {
    width: 80px;
  }
  .address-info-title {
    width: 88px;
  }
  .address-info-title p {
    width: 38px;
  }
  .customer {
    color: #666;
  }
  .out-order-id {
    width: 120px;
  }
  .address-info p {
    margin-bottom: 4px;
  }
  .base-info-remark p {
    width: 40px;
  }
}
</style>
