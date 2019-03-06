<template>
    <div class="table-style-change">
        <el-table class="ProductListTable sale-list-table" :data="returnList" tooltip-effect="light">
            <el-table-column label="商品名称" prop="skuName" min-width="180">
            </el-table-column>
            <el-table-column label="商品编码" prop="skuId" min-width="100">
            </el-table-column>
            <el-table-column label="单位" prop="unitName" min-width="60">
            </el-table-column>
            <el-table-column label="销售单价（元）" min-width="110">
                <template slot-scope="scope">
                    {{ scope.row.price/100 }}
                </template>
            </el-table-column>
            <el-table-column label="本次退货" prop="returnCount">
            </el-table-column>
            <el-table-column label="总价（元）" min-width="90">
                <template slot-scope="scope">
                    {{ scope.row.returnTotal/100 }}
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
export default {
    name: "return-product-list",
    props: ['returnList'],
}
</script>

<style scoped>
</style>
