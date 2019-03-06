<template>
    <div class="lis-message-wrapper">
        <el-table class="ProductListTable sale-list-table" :data="messageList" border :height="tableHeight" tooltip-effect="light" empty-text="没有通知哟" key="Logistics-message-list" show-overflow-tooltip>
            <el-table-column width="30px" v-if="messageList">
                <template slot-scope="scope">
                    <p class="read-tag" v-if="!scope.row.isRead"></p>
                </template>
            </el-table-column>
            <el-table-column label="通讯时间">
                <template slot-scope="scope">
                    <p :class="{'is-read-message':scope.row.isRead}">
                        {{formatFullDateAnother(scope.row.createTime)}}
                    </p>
                </template>
            </el-table-column>
            <el-table-column label="通讯类型">
                <template slot-scope="scope">
                    <p :class="{'is-read-message':scope.row.isRead}">
                        {{scope.row.operateTypeName}}
                    </p>
                </template>
            </el-table-column>
            <el-table-column label="通讯内容" min-width="140px" show-overflow-tooltip class="is-read-message">
                <template slot-scope="scope">
                    <p :class="{'is-read-message':scope.row.isRead}">
                        <span>{{scope.row.operateContent}}</span>
                        <span class="operate-order-id cursor" @click="toQueryBillDetail(scope.row.billId,scope.row.operateType,scope.row.id)" v-if="Number(scope.row.isAnnex !== 1)">{{scope.row.billId}}</span>
                        <span v-else>
                            <!-- <a :href="scope.row.annex" download>下载</a> -->
                            <!-- <a :href="fileUrl" :download="scope.row.operateContent" @click="getFile(scope.row.id)">下载</a> -->
                        </span>
                    </p>
                </template>
            </el-table-column>
            <el-table-column label="通讯结果" class="is-read-message">
                <template slot-scope="scope">
                    <p v-if="scope.row.commonResult" :class="{'is-read-message':scope.row.isRead}">成功</p>
                    <p v-else class="operate-fail" :class="{'is-read-message':scope.row.isRead}">失败</p>
                </template>
            </el-table-column>
            <div slot="empty" class="table_slot_empty_text notification-empty">
                <div><img src="../../layouts/images/nodata.png" /></div>
                <div>暂无数据</div>
            </div>
        </el-table>
    </div>
</template>

<script>
import TableHeightMixins from '~/mixins/tableheight'; // 设置表格高度
import utils from '~/utils/commonMethod';
import { mapActions } from 'vuex';
export default {
    mixins: [TableHeightMixins],
    props: {
        messageList: {
            type: Array,
        }
    },
    mounted() {
        this.setTableHeight(264);
    },
    methods: {
        ...mapActions([
            "setMessageReaded",
            "queryMessageNotRead",
            "getDownloadFile",
        ]),
        // 日期格式化
        formatFullDateAnother(data) {
            return utils.formatFullDateAnother(data)
        },
        // 查询未读消息
        getNotReadMessage() {
            this.queryMessageNotRead().then((res) => {
            });
        },
        // 查看消息详情
        toQueryBillDetail(billId, type, messageId) {
            switch (type) {
                case 1001: this.detailSrc = ''; break;
                case 1003: this.detailSrc = ''; break;
                case 1004: this.detailSrc = ''; break;
            }
            this.$router.push(this.detailSrc);
            // 设置已读消息
            this.setMessageReaded({ id: messageId }).then((res) => {
                this.getNotReadMessage(); // 重新获取未读消息数量
                this.$emit('childRefreshPage');
            });
        },
    },
}
</script>
<style scope lang='scss'>
.lis-message-wrapper {
  /*操作失败*/
  .operate-fail {
    color: #c8284f;
  }
  .el-select--small {
    height: 34px;
    line-height: 34px;
    border-radius: 1px;
  }
  .read-tag {
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background: #3b8cff;
  }
  .is-read-message {
    color: #999;
  }
  .operate-order-id {
    color: #110000;
  }
  .el-table__empty-block {
    height: 126px;
    margin-top: 70px;
  }
}
</style>

