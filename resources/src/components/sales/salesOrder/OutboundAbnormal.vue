<template>
    <div class="table-style-change">
        <ul class="outbound-inStock-recode" v-if="inStoreList">
            <li>
                <div class="left">
                    <span class="name">出库单号：</span>
                    <span class="outbound-order-info" v-if="inStoreList.stockPerInId" :title="inStoreList.stockPerInId">{{inStoreList.stockPerInId}}</span>
                </div>
                <div class="center">
                    <span class="name">状态：</span>{{getStatus}}
                </div>
                <div class="right">
                    <span class="name">收货仓库：</span>
                    <label for="" :title="inStoreList.storehouseName">{{inStoreList.storehouseName?inStoreList.storehouseName:'--'}}</label>
                </div>
            </li>
            <li>
                <div class="left">
                    <span class="name">操作人：</span>
                    <span class="outbound-order-info">{{inStoreList.operateUserName}}</span>
                </div>
                <div class="right">
                    <span class="name">操作日期：</span>{{formatFullDateAnother(inStoreList.createTime)}}
                </div>
            </li>
            <!-- <li v-if="!isLog">备注：{{inStoreList.remark?inStoreList.remark:'无'}}</li> -->
        </ul>
        <el-table class="ProductListTable sale-list-table" :data="inStoreList?inStoreList.skuList:null" tooltip-effect="light">
            <el-table-column label="商品名称" prop="skuName" min-width="180" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="商品编码" prop="skuId">
            </el-table-column>
            <el-table-column label="单位" prop="unitName" min-width="60">
            </el-table-column>
            <el-table-column label="拒收数量" prop="inCount">
            </el-table-column>
            <el-table-column label="入库数量" prop="actualInTotalCount">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import utils from '~/utils/commonMethod';
export default {
    name: "goods-list-table",
    props: ['inStoreList'],
    data() {
        return {
        };
    },
    computed: {
        // n_status 入库状态，1：待入库，2：部分入库，3：已入库完成
        getStatus() {
            switch (this.inStoreList.inStatus) {
                case 1: return '待入库'; break;
                case 2: return '部分入库'; break;
                case 3: return '已完成'; break;
                case 4: return '已撤销'; break;
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
