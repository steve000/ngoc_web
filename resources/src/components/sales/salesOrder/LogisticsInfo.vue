<template>
    <div class="logistics-wapper">
        <ul class="top" v-if="logisticsRecords && Object.values(logisticsRecords)[curIndex]">
            <li :class="{'active': index === curIndex}" v-for="(item, key, index) in logisticsRecords" :key="index" @click="changeHandle(index)">单号：{{key}}</li>
        </ul>
        <template v-if="logisticsRecords && Object.values(logisticsRecords)[curIndex]">
            <div class="logistics-content" v-for="(item, index) in Object.values(logisticsRecords)[curIndex]" :key="index">
                <div class="logistics-date">
                    <p class="time">{{formatFullDate(item.time).substr(11,5)}}</p>
                    <p>{{formatYearOne(item.time)}}</p>
                </div>
                <div class="logistics-station-wrapper">
                    <p class="logistics-station">
                        <label for="" class="logistics-title">{{item.operator}}</label>{{item.phone}}
                    </p>
                    <p class="logistics-station">
                        <label for="" class="logistics-title">{{item.type}}{{item.address?'：': ''}}</label>
                        <label for="" class="logistics-station-address">{{item.address}}</label>
                    </p>
                </div>
            </div>
        </template>
        <p v-else class="no-data">暂无数据</p>
    </div>
</template>

<script>
import utils from '~/utils/commonMethod';
export default {
    name: "CheckSalesOrder",
    props: ['logisticsRecords'],
    data() {
        return {
            curIndex: 0,
        };
    },
    methods: {
        changeHandle(index) {
            this.curIndex = index;
        },
        // 日期格式转换
        formatYearOne(date) {
            return utils.formatYearOne(date);
        },
        formatFullDate(date) {
            return utils.formatFullDate(date);
        },
    },
}
</script>

<style scoped lang="scss">
@import "../../../layouts/css/themes/default";
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
</style>
