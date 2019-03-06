<template>
    <div class="table-style-change">
        <el-table class="ProductListTable sale-list-table" :data="tableData">
            <el-table-column label="退货单号" prop="returnId" min-width="140px">
            </el-table-column>
            <el-table-column label="订单类型" prop="returnId" min-width="90px">
                <!--21-普通退货;22-代售退货;23-代发退货;24-代发出库退货-->
                <template slot-scope="scope">
                    <span v-if="scope.row.returnType === 21">
                        普通退货
                    </span>
                    <span v-else-if="scope.row.returnType === 22">
                        代售退货
                    </span>
                    <span v-else-if="scope.row.returnType === 23">
                        代发退货
                    </span>
                    <span v-else-if="scope.row.returnType === 24">
                        代发出库退货
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="收货仓库" prop="stockName">
            </el-table-column>
            <el-table-column label="单据状态" prop="returnStatus" min-width="100px">
                <!--0-已取消；1-未入库；2-待入库；3-已入库；4-已完成.-->
                <template slot-scope="scope">
                    <span v-if="scope.row.returnStatus === 0">
                        已取消
                    </span>
                    <span v-else-if="scope.row.returnStatus === 1">
                        未收货
                    </span>
                    <span v-else-if="scope.row.returnStatus === 2">
                        待入库
                    </span>
                    <span v-else-if="scope.row.returnStatus === 3">
                        已完成
                    </span>
                    <span v-else>
                        已完成
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="退货金额（元）" prop="returnTotal" width="110px">
                <template slot-scope="scope">
                    {{scope.row.returnTotal/100 |keepTwoNum}}
                </template>
            </el-table-column>
            <el-table-column label="操作人" prop="createUserName" width="100px">
            </el-table-column>
            <el-table-column label="更新时间" min-width="120px">
                <template slot-scope="scope">
                    {{formatFullDateAnother(scope.row.createTime)}}
                </template>
            </el-table-column>
            <el-table-column label="备注" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.remark?scope.row.remark:'无'}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import utils from '~/utils/commonMethod';
import filters from '~/mixins/filters';
export default {
    name: "CheckSalesOrder",
    props: {
        tableData: Array,
    },
    mixins: [filters],
    data() {
        return {
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
