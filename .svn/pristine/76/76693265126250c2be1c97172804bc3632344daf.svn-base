<template>
    <div class="return-order-log">
        <p class="title">退货详情-商品清单：</p>
        <el-table class="ProductListTable sale-list-table" :data="logDetail.afterContent.saleReturnSkuList">
            <el-table-column label="商品名称" prop="skuName" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="商品编码" prop="skuId" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="单位" prop="unitName" width="50">
            </el-table-column>
            <el-table-column label="销售单价（元）" width="116">
                <template slot-scope="scope">
                    {{scope.row.price/100 |keepTwoNum}}
                </template>
            </el-table-column>
            <!-- <el-table-column label="已出库" prop="sendCount">
            </el-table-column> -->
            <el-table-column label="本次退货" prop="returnCount">
            </el-table-column>
            <el-table-column label="已入库" prop="inCount">
            </el-table-column>
            <el-table-column label="总价（元）" width="90">
                <template slot-scope="scope">
                    {{scope.row.returnTotal/100 | keepTwoNum}}
                </template>
            </el-table-column>
            <el-table-column label="备注" prop="remark" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{scope.row.remark?scope.row.remark:'无'}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { mapState} from 'vuex';
    import filters from '~/mixins/filters';
    export default {
    name: "return-log",
    mixins: [filters],
      data() {
        return {
        };
      },
      computed: {
          ...mapState({
              logDetail: ({ logRecord }) => logRecord.logDetail,
          }),
      },
  }
</script>

<style scoped lang="scss">
    .return-order-log{
        p.title{
           line-height: 50px;
            font-size: 14px;
            color: #666;
        }
    }
</style>
