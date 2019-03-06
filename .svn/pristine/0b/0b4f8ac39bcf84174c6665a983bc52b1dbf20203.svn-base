/**
* 渠道->更多->修改历史->渠道修改历史dialog
* importPrams:{data:{channelName：渠道名,channelType:渠道类型,channelId:渠道id,remark:备注,logType:修改历史操作类型}}
* exports:null
**/
<template>
    <div class="operate-div more-infomation onePhaseModify channelOperating" title="更多">
        <el-dialog title="渠道修改历史" :visible.sync="dialogTableVisible" :append-to-body="true" class="remark-log-dialog channel-history" width="800px">
            <div class="table-style-change">
                <ul class="outbound-recode" v-if="logList">
                    <li>
                        <span class="name">渠道名称：</span>
                        <span class="outbound-order-info">{{data.channelName}}</span>

                    </li>
                    <li>
                        <span class="name">渠道类型：</span>
                        <span class="outbound-order-info">{{Number(data.channelType)?'非自营渠道':'自营渠道'}}</span>
                    </li>
                    <li>
                        <p class="name">备注：</p>
                        <p class="outbound-order-info">{{data.remark?data.remark:'无'}}</p>
                    </li>
                </ul>
                <el-table class="channel-history-list" :data="logList" tooltip-effect="light" border>
                    <el-table-column label="操作内容" prop="skuName" width="236" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <p v-if="Number(scope.row.logType) === 7">创建</p>
                            <p v-else-if="Number(scope.row.logType) === 8">新增商品</p>
                            <p v-else-if="Number(scope.row.logType) === 9">删除商品</p>
                            <p v-else-if="Number(scope.row.logType) === 10">启用</p>
                            <p v-else-if="Number(scope.row.logType) === 11">停用</p>
                            <p v-else-if="Number(scope.row.logType) === 12">编辑</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作人" prop="createUserName">
                    </el-table-column>
                    <el-table-column label="操作时间">
                        <template slot-scope="scope">
                            {{formatFullDate(scope.row.createTime)}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>

        <!-- <el-tooltip placement="bottom" effect="light"  :visible-arrow="false" :popper-class='paddingClass'>
            <div slot="content">
                <div>
                    <el-button type="text" class="operating-button" @click="$router.push({name:'EditChannel',params:{channelName:data.channelName,channelId:data.channelId,channelType:data.channelType}})">编辑</el-button>
                </div>
                <div>
                    <el-button type="text" class="operating-button" @click="$router.push({path:'/config/channel/importGoods',query:{channelName:data.channelName,channelId:data.channelId}})">导入渠道商品</el-button>
                </div>
                <div>
                    <el-button type="text" class="operating-button" @click="del" v-if="data.status==1">删除</el-button>
                </div>
                <div>
                    <el-button type="text" class="operating-button" @click="editHistory">修改历史</el-button>
                </div>
            </div>
            <el-button type="text" @click="isVisible=!isVisible" class="more-operating">
                <i class="el-icon-more"></i>
            </el-button>
        </el-tooltip> -->

        <el-popover class="popover222" placement="bottom" :visible-arrow="false" :popper-class="paddingClass">
            <div>
                <div>
                    <el-button type="text" class="operating-button" @click="$router.push({name:'EditChannel',params:{channelName:data.channelName,channelId:data.channelId,channelType:data.channelType}})">编辑</el-button>
                </div>
                <div>
                    <el-button type="text" class="operating-button" @click="importChannelGoods">导入渠道商品</el-button>
                </div>
                <div>
                    <el-button type="text" class="operating-button" @click="del" v-if="data.status==1">删除</el-button>
                </div>
                <div>
                    <el-button type="text" class="operating-button" @click="editHistory">修改历史</el-button>
                </div>
            </div>
            <el-button type="text" slot="reference" class="more-operating">
                <i class="el-icon-more"></i>
            </el-button>
        </el-popover>

    </div>
</template>

<script>
import utils from '~/utils/commonMethod';
import { mapActions } from 'vuex';
import * as C from "../../constants/api";
export default {
    name: '',
    data() {
        return {
            paddingClass: 'padding-0',
            dialogTableVisible: false,
            logList: null, // 渠道编辑历史
            isVisible: false,
        }
    },
    methods: {
        ...mapActions(["showPageLoading", "hidePageLoading", "queryOrderLogAction", "updataStatusAction"]),
        edit() {
            this.$emit('onEdit')
        },
        edit() {
            this.$emit('onEdit')
        },
        editHistory() {
            this.getLog().then((res) => {
                this.logList = res.result;
                this.dialogTableVisible = true;
            });
        },
        importChannelGoods(channelName,channelId){
			this.$router.push({name:'ImportChannelGoods',params:{channelName:this.data.channelName, channelId:this.data.channelId}});
			this.$store.commit(C.POST_IMPORT_CHANNEL_GOODS,"");
		},
        getLog() { // 查询日志列表
            this.showPageLoading();
            return new Promise((resolve, reject) => {
                const params = {
                    billType: 3,
                    billId: this.data.channelId,
                };
                this.queryOrderLogAction(params).then((res) => {
                    this.hidePageLoading();
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });

        },
        del() {
            this.$confirm('此操作将删除该条信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.updataStatusAction({ channelId: this.data.channelId, status: 2 }).then((res) => {
                    this.$message({
                        type:"success",
                        message:"删除成功!",
                    });
                    this.$emit('onDelSuccess');
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 日期格式化
        formatFullDate(data) {
            return utils.formatFullDate(data)
        },
    },
    props: ['data'],
}
</script>

<style lang="scss">
.operate-div .table-style-change {
  .el-table thead tr th {
    border: none;
  }
  .sale-list-table {
    border: 1px solid #eceef5;
    /*border-bottom: none;*/
  }
  .has-gutter {
    background: #f6f7fb;
  }
  .el-table .cell {
    padding-left: 16px;
  }
}
.padding-0 {
  padding: 0px;
}
.el-tooltip__popper.is-light {
  border: none;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
}
// 一期样式修改
.onePhaseModify {
  .remark-log-dialog {
    .el-dialog__header {
      line-height: normal;
      .el-dialog__title {
        line-height: normal;
      }
    }
    //     .outbound-recode li {
    //       p.name,
    //       p.outbound-order-info {
    //         line-height: normal;
    //         display: inline-block;
    //       }
    //       p.name {
    //         width: 40px;
    //       }
    //       p.outbound-order-info {
    //         width: 200px;
    //         white-space: normal;
    //         word-break: break-all;
    //       }
    //     }
    .el-table__header thead tr th .cell {
      line-height: 34px;
      color: #888;
    }
  }
}
.channel-history .el-dialog__body {
  margin-top: 13px;
}
// 表格样式
.channel-history-list {
  // border: 1px solid #f1f1f1;
  .el-table__row td:nth-of-type(1) .cell {
    border-left: 1px solid #f1f1f1 !important;
  }
  .el-table__row td:nth-of-type(3) .cell {
    border-right: 1px solid #f1f1f1 !important;
  }
  .el-table__header tr th:nth-of-type(2) {
    border-left: none;
  }
  .el-table__header tr th:nth-of-type(3) {
    border-left: none;
    border-right: 1px solid #f1f1f1;
  }
}
</style>
<style lang="scss" scoped>
.operate-div .table-style-change {
  margin-top: 20px;
}
.outbound-recode {
  margin-bottom: 16px;
  color: #333;
  li {
    margin-bottom: 10px;
    display: flex;
    font-size: 12px;
  }
  .name {
    width: 60px;
    color: #666;
  }
  .left {
    width: 200px;
  }
  .outbound-order-info {
    display: inline-block;
    white-space: normal;
    word-break: break-all;
    width: 680px;
  }
}
</style>