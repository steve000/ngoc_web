<template>
    <div class="table-style-change">
        <el-table class="ProductListTable sale-list-table" :data="changeList">
            <el-table-column label="换货单号" prop="changeId" min-width="140px">
            </el-table-column>
            <el-table-column label="订单类型" min-width="90px">
                <template slot-scope="scope">
                    <span v-if="scope.row.changeType === 31">
                        普通换货
                    </span>
                    <span v-else-if="scope.row.changeType === 32">
                        代售换货
                    </span>
                    <span v-else-if="scope.row.changeType === 33">
                        代发换货
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="收货仓库" prop="stockName">
            </el-table-column>
            <el-table-column label="单据状态" min-width="100px">
                <template slot-scope="scope">
                    <span>{{getStatus[scope.row.changeStatus]}}</span>
                </template>
            </el-table-column>
            <el-table-column label="换货金额（元）" prop="changeTotal" min-width="120px">
                <template slot-scope="scope">
                    {{scope.row.changeTotal/100 |keepTwoNum}}
                </template>
            </el-table-column>
            <el-table-column label="操作人" prop="createUserName">
            </el-table-column>
            <el-table-column label="更新时间" min-width="120px">
                <template slot-scope="scope">
                    {{formatFullDateAnother(scope.row.createTime)}}
                </template>
            </el-table-column>
            <el-table-column label="备注" prop="remark">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import utils from '~/utils/commonMethod';
import filters from '~/mixins/filters';
export default {
    name: "CheckSalesOrder",
    mixins: [filters],
    props: {
        changeList: Array,
    },
    data() {
        return {
            getStatus: {
                0: '已取消',
                1: '未收货',
                2: '待入库',
                3: '已入库',
                4: '待出库',
                5: '已出库',
                6: '已完成',
                7: '转退货',
            },
        };
    },
    methods: {
        // 日期格式化
        formatFullDateAnother(data) {
            return utils.formatFullDateAnother(data)
        },
    },
}
</script>

<style scoped>
</style>
