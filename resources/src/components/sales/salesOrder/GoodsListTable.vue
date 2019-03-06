<template>
    <div class="table-style-change">
        <el-table class="ProductListTable sale-list-table" :data="saleList" tooltip-effect="light">
            <el-table-column label="商品名称" prop="skuName" min-width="150" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="商品编码" prop="skuId" min-width="90" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="单位" prop="unitName" min-width="60">
            </el-table-column>
            <el-table-column label="销售单价（元）" min-width="110">
                <template slot-scope="scope">
                    {{scope.row.price/100 |keepTwoNum}}
                </template>
            </el-table-column>
            <el-table-column label="销售数量" prop="saleCount">
            </el-table-column>
            <template v-if="!isLog && !proxy">
                <el-table-column label="退货数量" prop="returnCount">
                </el-table-column>
                <el-table-column label="拒收数量" prop="rejectCount">
                </el-table-column>
                <el-table-column label="出库数量" prop="sendCount">
                </el-table-column>
            </template>
            <template v-if="proxy">
                <el-table-column label="出库数量" prop="sendCount">
                </el-table-column>
            </template>

            <el-table-column label="总价（元）" min-width="90">
                <template slot-scope="scope">
                    {{scope.row.saleTotal/100 |keepTwoNum}}
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
import filters from '~/mixins/filters';
export default {
    name: "goods-list-table",
    mixins: [filters],
    props: {
        saleList: Array,
        isLog: Boolean,
        proxy: Boolean,
    },
    data() {
        return {
        };
    },
    methods: {
        handleCurrentChange(index) {
            console.log(index, 797);
        },
    },
}
</script>
<style scoped>
</style>
