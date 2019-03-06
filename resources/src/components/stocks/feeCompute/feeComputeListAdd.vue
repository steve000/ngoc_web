<template>
    <table class="native-table-show">
        <thead>
            <tr class="thead-tr-show">
                <th width="120" style="padding-left:15px">费用名称</th>
                <th width="120">费用金额</th>
                <th width="120">支付实体</th>
                <th width="120">收款实体</th>
            </tr>
        </thead >
        <tbody>
            <tr v-for="(one,index) in checkProductList" :key="index" class="tbody-tr-show">
                <!--费用名称-->
                <td :title="one.feeName" style="padding-left:15px"><span>{{one.feeName}}</span></td>
                <!--费用金额-->
                <td :title="one.feeTotal" ><span>{{one.feeTotal}}</span></td>
                <!--支付实体-->
                <td :title="one.payGroupName"><span>{{one.payGroupName}}</span></td>
                <!--收款实体-->
                <td :title="one.recGroupName"><span>{{one.recGroupName}}</span></td>
                <td>
                    <div class="table-operation" min-width="100">
                        <div class="iconfont1 icon-shanchuhang" @click="deleteProduct(index)"></div>
                    </div>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="4" align="center" height="30">费用总额：{{totalCost}}</td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import { mapActions, mapState } from "vuex";
import MessageMixins from "~/mixins/messages";
import { routesMapping } from "~/router";
export default {
  name: "feeComputeListAdd",
  mixins: [MessageMixins],
  props: {
    relatedContract: {
      type: Boolean,
      required: true,
      default: false
    },
    contractData: {},
    checkProductList: {
      type: Array,
      required: false,
      default: [{}]
    }
  },
  data() {
    return {
      totalCost: "",
      contractList: [],
    };
  },
  mounted() {
    // this.contractFilter()
  },
  watch: {
      checkProductList: function (navl, oval) {
          if (navl) {
            let empArr = []
            navl.forEach((item, index) => {
                empArr.push(item.feeTotal)
            })
            this.totalCost = eval(empArr.join('+')) 
          }
      }
  },
  methods: {
    ...mapActions(["querySkuCodeByProductName", "queryStockSkuPrice"]),

    clearSkuId(index) {
      this.$set(this.checkProductList, index, {});
    },
    deleteProduct(index) {
         if (this.checkProductList.length == 1) {
             this.$message({
                type: "warning",
                message: `最少保留一条费用明细`
            });
         } else {
            this.$confirm("确认删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                this.checkProductList.splice(index, 1);
                this.showSuccess();
            })
            .catch(() => {
            this.$message({
                type: "info",
                message: "已取消删除"
            });
            });
         }
    }
  }
};
</script>

<style scoped>
</style>
