<template>
    <div class="notification-wrapper">
        <ul class="top-filter">
            <li :class="{'active': index === curIndex}" v-for="(item,index) in topFilter" :key="index" @click="handleChange(index)">{{item.title}}</li>
        </ul>
        <div class="content">
            <ul class="search-by-date">
                <li>
                    <NotifySearchDate @onHandleDate="handleDate"></NotifySearchDate>
                </li>
                <li v-if="notifyType !== 0">
                    操作人：
                    <el-select v-model="searchParams.operateUid" placeholder="请选择" style="width:130px;" size='small' @change="getReset" popper-class="select-menu-specail">
                        <el-option v-for="(item, index) in operateMen" :key="index" :label="item.fullname" :value="item.uid">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <template v-if="notifyType === 0">
                        通信类型：
                    </template>
                    <template v-else>
                        操作类型：
                    </template>
                    <el-select v-model="searchParams.operateType" placeholder="请选择" style="width:130px;" size='small' @change="getReset" popper-class="select-menu-specail">
                        <el-option v-for="(item, index) in communicationType" :key="index" :label="item.name" :value="item.value">
                        </el-option>
                    </el-select>
                </li>
            </ul>
            <div class="message-info-list-table" v-if="notifyType === 0">
                <LisMessageList :messageList="messageList" @childRefreshPage="childRefreshPage"></LisMessageList>
            </div>
            <div class="message-info-list-table" v-else>
                <OperateMessageList :messageList="messageList" @childRefreshPage="childRefreshPage"></OperateMessageList>
            </div>
            <div class="pagination-section" v-if="totalCount > 10">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchParams.pageNo" background :page-size="searchParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import PlatformMixins from '~/mixins/platform'; // 添加label到顶部
import utils from '~/utils/commonMethod';
import NotifySearchDate from '~/components/common/NotifySearchDate';
import LisMessageList from '~/components/notification/LisMessageList';
import OperateMessageList from '~/components/notification/OperateMessageList';
import { mapActions } from 'vuex';
import store from '../../store';
export default {
    name: "notificationIndex",
    mixins: [PlatformMixins],
    components: {
        NotifySearchDate,
        LisMessageList,
        OperateMessageList,
    },
    data() {
        return {
            topFilter: [
                { title: 'LIS通讯' },
                { title: '|' },
                { title: '采购' },
                { title: '|' },
                { title: '销售' },
                { title: '|' },
                { title: '出入库' },
            ],
            curIndex: 0, // 当前激活分类
            communicationType: [ // 通讯分类
                // '出入库订单',
                // '出库信息',
                {
                    "name": "签收信息",
                    "value": "1001"
                },
                // '路由查询',
                // '库存查询',
                // '串码查询',
                {
                    "name": "出入库过账",
                    "value": "1003"
                },
                {
                    "name": "出库信息接口",
                    "value": "1004"
                },
                // '仓库查询',
                // '物料查询',
                // '订单撤销',
            ],
            operateMen: null, // 操作人
            searchParams: { // 查询参数
                pageSize: 10,
                pageNo: 1,
                type: 1, // 1:LIS通讯，2：采购，3：销售，4：出入库
                operateType: '',
                operateUid: '',
            },
            totalCount: null, // 总数
            notifyType: 0, // 消息模块
            messageList: null, // 消息列表
            detailSrc: null, // 跳转地址
        };
    },
    mounted() {
        this.getMessageList();
        // this.getOperateType();
        this.getOperateMen();
    },
    methods: {
        ...mapActions([
            "queryMessage",
            "showPageLoading",
            "hidePageLoading",
            "queryMessageOperateType",
            "setMessageReaded",
            "queryMessageNotRead",
            "queryOperatorsAction",
        ]),
        handleChange(i) { // 切换消息模块
            this.communicationType = null;
            if (i % 2 === 0) {
                switch (i) {
                    case 0:
                        this.communicationType = [
                            // '出入库订单',
                            // '出库信息',
                            {
                                "name": "签收信息",
                                "value": "1001"
                            },
                            // '路由查询',
                            // '库存查询',
                            // '串码查询',
                            {
                                "name": "出入库过账",
                                "value": "1003"
                            },
                            // '仓库查询',
                            // '物料查询',
                            // '订单撤销',
                        ];
                        break;
                    case 2:
                        this.communicationType = [
                            {
                                "name": "新增采购订单",
                                "value": "2001"
                            },
                            // '审批结果',
                        ];
                        break;
                    case 4:
                        this.communicationType = [
                            {
                                "name": "新增销售订单",
                                "value": "3001"
                            },
                            {
                                "name": "导入订单",
                                "value": "3004"
                            },
                            // '导入销售订单',
                            {
                                "name": "创建换货单",
                                "value": "3002"
                            }, {
                                "name": "创建退货单",
                                "value": "3003"
                            },
                        ];
                        break;
                    case 6:
                        this.communicationType = [
                            {
                                "name": "出库",
                                "value": "4001"
                            }, {
                                "name": "入库",
                                "value": "4002"
                            }
                        ];
                        break;
                }
                this.notifyType = Number(i);
                this.curIndex = i;
                // 分页数据重置
                this.searchParams.pageNo = 1;
                this.totalCount = null,

                    this.searchParams.operateType = '';
                this.searchParams.type = 1 + (Number(i) / 2);
                this.getReset();
            }
        },
        handleSizeChange(nSize) { // 分页查询
            this.searchParams.pageSize = nSize;
            this.getReset();
        },
        handleCurrentChange(nPage) { // 重置每页条数
            this.searchParams.pageNo = nPage;
            this.getReset();
        },
        // 按照时间来搜索
        handleDate(val) {
            this.searchParams = Object.assign({}, this.searchParams, val);
            this.getReset();
        },
        getReset() {
            this.messageList = null;
            this.refreshPage(this.searchParams);
        },
        // 重新获取数据
        refreshPage(nval) {
            this.getMessageList(nval);
        },
        // 请求消息列表
        getMessageList() {
            this.showPageLoading();
            this.queryMessage(this.searchParams).then((res) => {
                this.hidePageLoading();
                this.messageList = res.result;
                this.totalCount = res.totalCount;
            }).catch(() => {
                this.hidePageLoading();
            });
        },
        // 获取消息操作类型
        getOperateMen() {
            this.queryOperatorsAction().then((res) => {
                this.operateMen = res;
            });
        },

        childRefreshPage() {
            this.refreshPage();
        },
    },
}
</script>

<style lang="scss">
.message-info-list-table {
  .el-table thead tr {
    th:nth-of-type(1) {
      border-right: none !important;
    }
    th:nth-of-type(2) {
      border-left: none !important;
    }
    .el-table_1_column_5 {
      border-right: 1px solid #eceef5 !important;
    }
  }
  .sale-list-table {
    .el-table__body-wrapper tbody tr td:nth-of-type(1) {
      border-left: 1px solid #eceef5 !important;
    }
    .el-table__body-wrapper tbody tr td:nth-of-type(5) {
      border-right: 1px solid #eceef5 !important;
    }
  }
}
</style>
<style scoped lang="scss">
.notification-wrapper {
  height: 94%;
  padding: 10px 30px 0;
  .top-filter {
    height: 50px;
    line-height: 50px;
    background: #f1f1f2;
    font-size: 0;
    padding: 0 20px;
    li {
      display: inline-block;
      font-size: 12px;
      color: #888;
      height: 24px;
      line-height: 24px;
      vertical-align: middle;
      text-align: center;
      padding: 0 10px;
      border-radius: 2px;
    }
    li:nth-of-type(2n-1) {
      cursor: pointer;
    }
    li:nth-of-type(2n) {
      color: #dcdcdc;
    }
    li.active {
      background: #dededf;
      color: #373639;
    }
  }
  /*时间条件搜索*/
  .search-by-date {
    font-size: 0;
    margin-bottom: 20px;
    li {
      font-size: 12px;
      display: inline-block;
      margin-right: 20px;
    }
  }
  .content {
    height: 100%;
    background: #fff;
    padding: 20px 20px 0 20px;
  }
}
</style>
