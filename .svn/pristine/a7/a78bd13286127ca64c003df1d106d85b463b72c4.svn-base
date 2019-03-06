<template>
    <div>
        <el-dialog title="出库操作" :visible.sync="outStoreDialog" width="1060px" class="remark-log-dialog out-store-operating">
            <div class="ship-store">
                <span style="font-size:14px;color: #666666; width:80px;" class="ml20">发货仓库：</span>
                <el-select v-model="shipStockName" filterable placeholder="选择发货仓库" class="row_width" @change="handleHouse">
                    <el-option v-for="item in storeList" :key="item.storehouseId" :label="item.storehouseName" :value="item.storehouseId">
                    </el-option>
                </el-select>
                <template v-if="storehouseType && storehouseType === 2">
                    <span style="font-size:14px;color: #666666; width:80px;" class="ml20">运输方式：</span>
                    <el-select v-model="outboundParams.deliveryType" placeholder="请选择" style="width:130px;">
                        <el-option v-for="(item, index) in deliveryTypeOptions" :key="index" :label="item.label" :value="item.value" size='small'>
                        </el-option>
                    </el-select>
                    <el-input v-model="outboundParams.expressCompany" placeholder="请输入承运商" style="width:130px;" class="ml10"></el-input>
                    <el-checkbox class="ml10" v-model="outboundParams.isUrgent" size="medium" border :true-label="'X'" :false-label="''" style="border: none;padding-left: 0;">加急标识
                    </el-checkbox>
                </template>
            </div>
            <div class="ship-store sale-type-wapper" v-if="storehouseType && storehouseType === 2">
                <span style="font-size:14px;color: #666666; width:80px;" class="ml20">销售类别：</span>
                <el-select v-model="outboundParams.saleCategory" placeholder="请选择" style="width:200px;">
                    <el-option v-for="item in saleCategoryOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>

            <!--</div>-->
            <div class="product-list-table-common outStock-and-inStock">
                <el-table class="ProductListTable sale-list-table" :data="outboundGoodsList?outboundGoodsList:saleChangeSkus" tooltip-effect="light" show-overflow-tooltip>
                    <el-table-column label="商品名称" prop="skuName" width="200">
                    </el-table-column>
                    <el-table-column width="78">
                        <template slot-scope="scope">
                            <div v-show="shipStockName && (scope.row.unableCount<scope.row.changeCount)" class="inventory">库存不足</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品编码" prop="skuId">
                    </el-table-column>
                    <el-table-column label="单位" prop="unitName" width="60">
                    </el-table-column>
                    <el-table-column label="换货数量" prop="changeCount">
                    </el-table-column>
                    <el-table-column label="出库数量" prop="changeCount">
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmOutStoreFun" :disabled="outStoreDisabled">确认出库</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: "outstore-dialog",
    props: {
        outStoreDialogVisible: {
            type: Boolean,
        },
        saleChangeSkus: {
            type: Array,
        },
        outStoreDisabled: {
            type: Boolean,
        },
        orderType: {
            type: Number,
        },
        orderId: {
            type: String,
        },
        channelId: {
            type: String,
        },
        // currentChangeList: {
        //     type: Object,
        // },
    },
    data() {
        return {
            outStoreDialog: false,
            // 出库参数
            outboundParams: {
                expressCompany: '',
                deliveryType: '20',
                isUrgent: '',
                saleCategory: 'A',
            },
            storeList: null,  // 仓库列表
            shipStockName: null,
            storehouseType: null,
            // 销售类别Options
            saleCategoryOptions: [
                { label: '零售', value: "A" },
                { label: '分销', value: "B" },
            ],
            // 配送方式Options
            deliveryTypeOptions: [
                { label: "物流配送", value: '20' },
                { label: "客户自提", value: '30' }
            ],
            outboundGoodsList: null, // 出库商品列表
        };
    },
    methods: {
        ...mapActions(["queryStoreList", "querySalesOutStoreList"]),
        // 确认出库
        confirmOutStoreFun() {
            if (this.outboundGoodsList) {
                const canCount = this.outboundGoodsList.find(i => {
                    return !(i.changeCount <= i.unableCount);
                });
                console.log(canCount, 'ccc');
                if (canCount) {
                    this.$message({ message: '库存不足，请选择其他仓库', type: 'warning' });
                    return;
                }
            }
            const obj = this.storeList.find(i => i.storehouseId === this.shipStockName) || {}
            const outboundParams = this.storehouseType === 2 ? this.outboundParams : {}
            this.$emit('confirmOutStore', outboundParams, this.shipStockName, obj.storehouseType);
        },
        querySockList() { // 获取发货仓库
            const datas = { bizType: 1, channelId: this.channelId };
            if (this.orderType === 33) {
                datas.bizType = 4;
            }
            this.queryStoreList(datas).then((resp) => {
                this.storeList = resp;
            });
        },
        // 选择仓库触发
        handleHouse(item) {
            this.storehouseType = this.storeList.find(i => i.storehouseId === this.shipStockName).storehouseType;
            this.updataSelectedWarehouse(item);
        },
        // 出库-选中仓库更新商品列表
        updataSelectedWarehouse(val) {
            const data = {
                orderId: this.orderId,
                storehouseId: val,
                type: 4,
            };
            this.querySalesOutStoreList(data).then(res => {
                if (res && res.list) {
                    // res.list.forEach(i => {
                    //     if (i.unableCount && i.unableCount > 0 && i.changeCount > i.unableCount) {
                    //         i.changeCount = i.unableCount;
                    //     }
                    // });
                    this.outboundGoodsList = res.list;
                }
            });
        },
    },
    watch: {
        outStoreDialogVisible() {
            if (this.outStoreDialogVisible) {
                this.outStoreDialog = true;
                this.querySockList();
                return;
            }
            this.outStoreDialog = false;
        },
        outStoreDialog() { // 弹窗关闭时，提交父组件
            if (!this.outStoreDialog) {
                this.shipStockName = '';
                this.outboundParams.expressCompany = '';
                this.outboundParams.deliveryType = '20';
                this.outboundParams.isUrgent = '';
                this.outboundParams.saleCategory = 'A';
                this.$emit('closeDiaolog');
            }
        },
    },
}
</script>

<style scoped lang="scss">
.out-store-operating {
  .el-dialog__body {
    padding-bottom: 10px;
  }
  .el-dialog__footer {
    padding-right: 30px;
  }
  .ship-store {
    margin: 20px 0 22px 0;
  }
  .sale-type-wapper {
    margin-bottom: 20px;
  }
}
</style>
