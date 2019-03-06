<template>
    <div class="sales-order-base-info returnBaseInfo">
        <p>基本信息</p>
        <ul class="detail-wrapper">
            <li>
                <div>操作人：</div>
                <div>{{returnDetail.createUserName}}</div>

            </li>
            <li>
                <div>收货仓库：</div>
                <div>{{returnDetail.stockName?returnDetail.stockName:'--'}}</div>
            </li>
            <li>
                <div>退货金额：</div>
                <div>
                    <!--{{returnDetail.returnTotal?`&yen;${returnDetail.returnTotal/100}`:''}}-->
                    <template v-if="returnDetail.returnTotal !== null">
                        ￥{{returnDetail.returnTotal/100 | keepTwoNum}}
                    </template>
                    <template v-else>
                        ￥0.00
                    </template>
                </div>
            </li>
            <li>
                <div>退货时间： </div>
                <div>{{formatFullDateAnother(returnDetail.createTime)}}</div>
            </li>
            <li>
                <div>渠道：</div>
                <div>
                    <span class="customer">{{returnDetail.channelName?returnDetail.channelName:'其他'}}</span>
                </div>

            </li>
            <li>
                <div class="address-info-title">
                    收货仓信息：
                </div>
                <div>
                    <p>{{returnDetail.storeLinkMan?returnDetail.storeLinkMan:'--'}}</p>
                    <p>{{returnDetail.storeLinkTel?returnDetail.storeLinkTel:'--'}}</p>
                    <p>{{returnDetail.storeArea?returnDetail.storeArea:'--'}}</p>
                </div>
            </li>
            <li>
                <div class="base-info-remark">
                    <p>备注：</p>
                </div>
                <div>{{returnDetail.remark?returnDetail.remark:'--'}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
import FiltersFun from '~/mixins/filters';
import utils from '~/utils/commonMethod';
export default {
    name: "return-base-info",
    mixins: [FiltersFun],
    props: ['returnDetail'],
    methods: {
        // 日期格式化
        formatFullDateAnother(data) {
            return utils.formatFullDateAnother(data)
        },
    },
}
</script>

<style lang="scss">
.returnBaseInfo {
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
.base-info-remark p {
  width: 40px;
}
</style>
