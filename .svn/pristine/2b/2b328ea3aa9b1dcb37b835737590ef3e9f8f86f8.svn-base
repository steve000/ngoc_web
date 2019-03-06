<!--商品清单的列表-->
<template>
    <div class="table-style-change">
        <el-table class="ProductListTable sale-list-table" :data="changeList" tooltip-effect="light">
            <el-table-column label="商品名称" prop="skuName" min-width="200px">
            </el-table-column>
            <el-table-column label="商品编码" prop="skuId" min-width="100px">
            </el-table-column>
            <el-table-column label="单位" prop="unitName" min-width="60px">
            </el-table-column>
            <el-table-column label="销售单价（元）" min-width="110px">
                <template slot-scope="scope">
                    {{scope.row.price/100|keepTwoNum}}
                </template>
            </el-table-column>
            <el-table-column label="本次换货" prop="changeCount">
            </el-table-column>
            <el-table-column label="总价（元）" width="90">
                <template slot-scope="scope">
                    {{scope.row.changeTotal/100|keepTwoNum}}
                </template>
            </el-table-column>
            <el-table-column label="备注" prop="remark" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.remark?scope.row.remark:"无"}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
                                                                                                                                                             
<script>
import filters from '~/mixins/filters';
export default {
    name: "change-product-list",
    props: ['changeList'],
    mixins: [filters],
}
</script>

<style scoped>
</style>
