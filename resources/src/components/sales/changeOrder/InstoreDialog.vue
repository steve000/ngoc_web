<template>
    <div>
        <el-dialog title="入库操作" :visible.sync="inStoreDialog" width="800px" class="remark-log-dialog out-store-operating">
            <div class="product-list-table-common outStock-and-inStock">
                <el-table class="ProductListTable sale-list-table" :data="saleChangeSkus" tooltip-effect="light" show-overflow-tooltip>
                    <el-table-column label="商品名称" prop="skuName" width="200">
                    </el-table-column>
                    <el-table-column label="商品编码" prop="skuId">
                    </el-table-column>
                    <el-table-column label="单位" prop="unitName" width="60">
                    </el-table-column>
                    <el-table-column label="换货数量" prop="changeCount">
                    </el-table-column>
                    <el-table-column label="入库数量" prop="changeCount">
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmInStoreFun" :disabled="inStoreDisabled">确认入库</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "instore-dialog",
    props: {
        inStoreDialogVisible: {
            type: Boolean,
        },
        saleChangeSkus: {
            type: Array,
        },
        inStoreDisabled: {
            type: Boolean,
        },
    },
    data() {
        return {
            inStoreDialog: false,
        };
    },
    methods: {
        confirmInStoreFun() {
            this.$emit('confirmInStore');
        },
    },
    watch: {
        inStoreDialogVisible() {
            if (this.inStoreDialogVisible) {
                this.inStoreDialog = true;
                return;
            }
            this.inStoreDialog = false;
        },
        inStoreDialog() { // 弹窗关闭时，提交父组件
            if (!this.inStoreDialog) {
                this.$emit('closeDiaolog');
            }
        },
    },
}
</script>

<style scoped>
.outStock-and-inStock {
  margin-top: 20px;
}
</style>
