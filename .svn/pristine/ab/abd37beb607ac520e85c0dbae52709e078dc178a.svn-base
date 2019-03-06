<template>
    <div class="table-style-change">
        <ul class="outbound-inStock-recode" v-if="outStoreList">
            <li>
                <div class="left">
                    <span class="name">出库单号：</span>
                    <span class="outbound-order-info">{{outStoreList.stockOutId}}</span>
                </div>
                <div class="right">
                    <!-- <span>备注：{{outStoreList.remark?outStoreList.remark:'无'}}</span> -->
                    <span class="name">状态：</span>{{getStatus}}
                </div>

            </li>
            <li>
                <div class="left">
                    <span class="name">操作人：</span>
                    <span class="outbound-order-info">{{outStoreList.operateUserName}}</span>
                </div>
                <div class="right">
                    <span class="name">操作日期：</span>{{formatFullDateAnother(outStoreList.createTime)}}
                </div>
            </li>
            <!-- <li v-if="!isLog">备注：{{outStoreList.remark?outStoreList.remark:'无'}}</li> -->
        </ul>
        <el-table class="ProductListTable sale-list-table" :data="outStoreList?outStoreList.stockProductModelList:null" tooltip-effect="light">
            <el-table-column label="商品名称" prop="skuName" width="236" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="商品编码" prop="skuId">
            </el-table-column>
            <el-table-column label="单位" prop="unitName" width="60">
            </el-table-column>
            <el-table-column label="换货数量" prop="stockOutCount">
            </el-table-column>
            <el-table-column label="出库数量" prop="stockOutCount">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import utils from '~/utils/commonMethod';
export default {
    name: "goods-list-table",
    props: ['isLog', 'outStoreList'],
    data() {
        return {
        };
    },
    computed: {
        // '出库单状态, 0-未出库；1:出库中, 2:已出库, 3:已收货,4-已完成'
        getStatus() {
            switch (this.outStoreList.outStatus) {
                case 1: return '待出库'; break;
                case 2: return '已出库'; break;
                case 3: return '已完成'; break;
                case 4: return '待出库撤销'; break;
                case 5: return '已出库撤销'; break;
                case -1: return '请求中移超时'; break;
            }
        },
    },
    methods: {
        // 日期格式化
        formatFullDateAnother(data) {
            return utils.formatFullDateAnother(data)
        },
    },
}
</script>

<style scoped lang="scss">
</style>
