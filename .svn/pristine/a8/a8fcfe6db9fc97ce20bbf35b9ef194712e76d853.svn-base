<template>
    <div class="operate-message-wrapper">
        <el-table class="ProductListTable sale-list-table" :data="messageList" :height="tableHeight" tooltip-effect="light" border empty-text="没有通知哟" key="sale-message-list" show-overflow-tooltip>
            <el-table-column width="30px">
                <template slot-scope="scope">
                    <p class="read-tag" v-if="!scope.row.isRead"></p>
                </template>
            </el-table-column>
            <el-table-column label="操作人" prop="operateUsername">
                <template slot-scope="scope">
                    <p :class="{'is-read-message':scope.row.isRead}">
                        {{scope.row.operateUsername}}
                    </p>
                </template>
            </el-table-column>
            <el-table-column label="操作时间">
                <template slot-scope="scope">
                    <p :class="{'is-read-message':scope.row.isRead}">
                        {{formatFullDateAnother(scope.row.createTime)}}
                    </p>
                </template>
            </el-table-column>
            <el-table-column label="操作类型" min-width="140px">
                <template slot-scope="scope">
                    <p :class="{'is-read-message':scope.row.isRead}">
                        {{scope.row.operateTypeName != null ? scope.row.operateTypeName : scope.row.operateType}}
                    </p>
                </template>
            </el-table-column>
            <el-table-column label="操作内容" show-overflow-tooltip>
                <template slot-scope="scope">
                    <p :class="{'is-read-message':scope.row.isRead}">
                        <span>{{scope.row.operateContent}}</span>
                        <span class="operate-order-id cursor" @click="toQueryBillDetail(scope.row.billId,scope.row.operateType,scope.row.id)" v-if="Number(scope.row.isAnnex !== 1)">{{scope.row.billId}}</span>
                        <span v-else>
                            <!-- <a :href="scope.row.annex" download @click="setReaded(scope.row.id)">下载</a> -->
                            <!-- <a href="javascript:;" :download="scope.row.operateContent" ref="download" @click="downloadFile">&nbsp;&nbsp;</a> -->
                            <a href="javascript:;">
                                <label @click="getFile(scope.row.id, scope.row.operateContent)" class="cursor">下载</label>
                            </a>
                        </span>
                    </p>
                </template>
            </el-table-column>
            <div slot="empty" class="table_slot_empty_text">
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
    data() {
        return {
            fileUrl: null,
        };
    },
    mounted() {
        this.setTableHeight(264);
    },
    methods: {
        ...mapActions([
            "setMessageReaded",
            "queryMessageNotRead",
            "getDownloadFile",
            "hidePageLoading",
            "showPageLoading",
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
            // 1001 签收信息，1003 出入库过账， 2001 新增采购订单，3001 新增销售订单，3004 导入订单， 3002 创建换货单， 3003 创建退货单，4001 出库，4002 入库
            switch (type) {
                case 1001: this.detailSrc = ''; break;
                case 1003: this.detailSrc = ''; break;
                case 1004: this.detailSrc = ''; break;
                case 2001: this.detailSrc = ''; break;
                case 3001: this.detailSrc = `/sales/check/salesOrder/${billId}`; break;
                case 3002: this.detailSrc = `/sales/change/checkList/${billId}`; break;
                case 3003: this.detailSrc = `/sales/return/checkList/${billId}`; break;
                case 3004: this.detailSrc = ''; break;
                case 4001: this.detailSrc = `/stock/viewOutbound/${billId}`; break;
                case 4002: this.detailSrc = `/stock/storage/viewStorageDetail/${billId}`; break;
            }
            this.$router.push(this.detailSrc);
            // 设置已读消息
            this.setMessageReaded({ id: messageId }).then((res) => {
                this.getNotReadMessage(); // 重新获取未读消息数量
                this.$emit('childRefreshPage');
            });
        },
        // 点击下载，设置已读
        setReaded(messageId) {
            // 设置已读消息
            this.setMessageReaded({ id: messageId }).then((res) => {
                this.getNotReadMessage(); // 重新获取未读消息数量
                this.$emit('childRefreshPage');
            });
        },
        // 获取下载文件
        getFile(messageId, name) {
            this.showPageLoading();
            this.fileUrl = null;
            const that = this;
            this.getDownloadFile({ id: messageId, dataType: "file" }).then((res) => {
                let nameArr = name.split('.');
                let fileType = nameArr[nameArr.length - 1];
                let _fileType = fileType == "csv" ? "text/csv;charset=utf-8;" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                let blob = new Blob([res], { type: _fileType });
                let objectUrl = URL.createObjectURL(blob);
                that.fileUrl = objectUrl;
                this.hidePageLoading();
                // 下载
                let a = document.createElement('a');
                a.style.display = 'none';
                a.href = objectUrl;
                a.download = name;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                // 设置已读
                that.setReaded(messageId);
            }).catch((err) => {
                console.log(err)
            });
        },
    },
}
</script>
<style scope lang='scss'>
.operate-message-wrapper {
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

