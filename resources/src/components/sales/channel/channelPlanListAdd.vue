<template>
    <table class="native-table-show">
        <thead>
            <tr class="thead-tr-show">
                <th width="100" style="padding-left:15px">年</th>
                <th width="100">月</th>
                <th width="100">计划金额</th>
                <th width="120">备注</th>
								<th width="100" v-show="false">编号</th>
            </tr>
        </thead >
        <tbody>
            <tr v-for="(one,index) in checkProductList" :key="index" class="tbody-tr-show">
                <td :title="one.yearNo">
                  <el-date-picker
                    @blur="changeYearNo(one.yearNo)"
                    v-model="one.yearNo"
                    format="yyyy"
                    value-format="yyyy"
                    class="table-input"
                    size="small"
                    type="year"
                    style="margin-left: 13px"
                    placeholder="选择年">
                  </el-date-picker>
                </td>
                <td :title="one.monthNo">
                  <el-date-picker
                    format="MM"
                    value-format="M"
                    @blur="changeMonthNo(one.monthNo, index)"
                    v-model="one.monthNo"
                    class="table-input"
                    size="small"
                    type="month"
                    placeholder="选择月"
										:disabled="choseYearNo">
                </el-date-picker>
                </td>
                <td :title="one.planTotal">
                    <el-input class="table-input" size="small" v-number-decimal-only type="number" v-model="one.planTotal" @blur="changePlanTotal(one.planTotal)"></el-input>
                </td>
                <td :title="one.comments">
                    <el-input class="table-input" size="small" type="text" v-model="one.comments"></el-input>
                </td>
                <td>
                    <div class="table-operation" min-width="100">
                        <div class="iconfont1 icon-shanchuhang" @click="deleteProduct(index)"></div>
                    </div>
                </td>
								<td v-show="false">
									<div class="table-operation">
											<el-input class="table-input" size="small" type="number" v-model="one.serialNo = index" disabled></el-input>
									</div>
								</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapActions, mapState } from "vuex";
import MessageMixins from "~/mixins/messages";
import { directives } from '~/utils/directives/index'
import { routesMapping } from "~/router";
export default {
  name: "channelPlanListAdd",
  mixins: [MessageMixins],
  props: {
    contractData: {
      type: Object,
      required: false,
      default: {}
    },
    checkProductList: {
      type: Array,
      required: false,
      default: [{}]
    }
  },
  watch: {
    "contractData.planType": function(nval) {
      console.log(nval, 888);
      if (nval == 0) {
        this.choseYearNo = true;
        this.checkProductList.forEach(item => (item.monthNo = ""));
      } else if (nval == 1) {
        this.choseYearNo = false;
      }
    }
  },
  data() {
    return {
      contractList: [],
      validateEmit: false,
      choseYearNo: false
    };
  },
  mounted() {},
  methods: {
    ...mapActions([""]),
    deleteProduct(index) {
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
    },
    changeYearNo(val) {
      let myDate = new Date();
      let year = myDate.getFullYear();
      console.log(val, year, 111);
      if (!val) {
        this.$message({
          type: "warning",
          message: "请选择年份"
        });
        this.validateEmit = false;
      } else if (val < year) {
        this.$message({
          type: "warning",
          message: "请选择正确年份"
        });
        this.validateEmit = false;
      } else {
        this.validateEmit = true;
      }
      this.$emit("validateEmit", this.validateEmit);
    },
    changeMonthNo(val, index) {
      let myDate = new Date();
      let year = myDate.getFullYear();
      let month = myDate.getMonth();
      let mon = month + 1;
      // console.log(this.checkProductList[index].yearNo, year, val, mon, 222)
      if (!val) {
        this.$message({
          type: "warning",
          message: "请选择月份"
        });
        this.validateEmit = false;
      } else if (
        this.checkProductList[index].yearNo &&
        this.checkProductList[index].yearNo == year &&
        val < mon
      ) {
        this.$message({
          type: "warning",
          message: "请选择正确月份"
        });
        this.validateEmit = false;
      } else if (
        this.checkProductList[index].yearNo &&
        this.checkProductList[index].yearNo < year
      ) {
        this.$message({
          type: "warning",
          message: "请选择正确年份"
        });
        this.validateEmit = false;
      } else {
        this.validateEmit = true;
      }
      this.$emit("validateEmit", this.validateEmit);
      this.isRepeat(this.checkProductList);
    },
    changePlanTotal(val) {
      if (!val) {
        this.$message({
          type: "warning",
          message: "请填写金额"
        });
        this.validateEmit = false;
      } else if (val == 0) {
        this.$message({
          type: "warning",
          message: "金额不能为0"
        });
        this.validateEmit = false;
      } else {
        this.validateEmit = true;
      }
      this.$emit("validateEmit", this.validateEmit);
    },
    isRepeat(a) {
      var map = a.reduce((all, m) => {
        let list = all.get(m.yearNo);
        if (!list) {
          list = [];
          all.set(m.yearNo, list);
        }
        list.push(m);
        return all;
      }, new Map());
      var z = [];
      Array.from(map.entries())
        // 这里过滤掉 list 只有一个元素的，剩下的就是有重复的
        .filter(([yearNo, list]) => list.length > 1)
        .forEach(([yearNo, list]) => {
          let values = list.map(m => m.monthNo);
          console.log(yearNo, values);
          z = values;
        });
      console.log(z, 222);
      var nary = z.sort();
      for (var i = 0; i < z.length; i++) {
        if (nary[i] == nary[i + 1]) {
          // console.log("数组重复内容："+nary[i]);
          this.$message({
            type: "warning",
            message: "请选择不重复月份"
          });
          this.validateEmit = false;
        } else {
          // this.validateEmit = true
        }
      }
      this.$emit("validateEmit", this.validateEmit);
    }
  }
};
</script>

<style scoped>
</style>
