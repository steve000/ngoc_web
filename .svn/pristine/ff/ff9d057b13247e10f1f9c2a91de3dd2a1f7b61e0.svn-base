<template>
    <div class="sales-list">
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="channelShortName"
                label="渠道名"
                width="180">
            </el-table-column>
            <el-table-column
            width="50">
                <template slot-scope="scope">
                    <ChannelOperating :data="scope.row"></ChannelOperating>
                </template>
            </el-table-column>

            <el-table-column
                label="渠道状态">
                <template slot-scope="scope">
                    <el-select  placeholder="请选择" style="width: 100px" @change="valChange(scope.row.channelId,scope.row.status)" v-model="scope.row.status">
                        <el-option :value="0" label="启用"></el-option>
                        <el-option :value="1" label="禁用"></el-option>
                    </el-select>
                </template>
            </el-table-column>

            <el-table-column
                prop="createUserName"
                label="创建人">
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="创建时间">
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="pageNo"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>

    </div>
</template>
<script>
    import PlatformMixins from '~/mixins/platform';
    import ChannelOperating from '~/components/common/ChannelOperating';
    import {mapActions} from 'vuex'
    export default {
        data() {
           return {
               tableData: [],
               selected: '启用',
               pageNo: 1, // 当前页
               total: 0, // 总数
            }

        },
        created() {
            this.getdata(this.pageNo)
        },
        components: {
            ChannelOperating
        },
        methods: {
            ...mapActions(["queryChannelAllAction","updataStatusAction"]),
            getdata(page) {
                this.queryChannelAllAction({pageNo: page, pageSize: 10}).then((res) => {
                    this.tableData = res.result;
                    this.total = res.totalCount;
                })
            },
            valChange(id,status) {
                this.updataStatusAction( { channelId: id,status:status } ).then((res) => {
                    this.getdata(this.pageNo)
                })
            },
            handleCurrentChange(val) {
                this.pageNo = val
                this.getdata(this.pageNo)
            },
        }
    }
</script>

<style lang="scss" scoped>
.pagination {
    float: right;
    margin-top: 30px;
}
</style>
