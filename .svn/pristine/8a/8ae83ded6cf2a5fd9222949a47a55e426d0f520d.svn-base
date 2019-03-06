<template>
  <div class="edit">
    <div class="content">
        <div class="title">
            <div>基本信息</div>
        </div>
        <div class="content-wrapper">
            <el-form label-width="110px" :model="addForm" ref="addFormParams" style="width:300px;">
              <div class="displayStyle">
                <el-form-item label="引入组织：">
                  <el-input
                    v-model="addForm.importUserGroupId"
                    placeholder="请输入登陆组织"
                    :disabled="true"
                    class="row_width">
                  </el-input>
                </el-form-item>
              </div>
              <div class="displayStyle">
                <el-form-item label="产品名称：">
                  <el-input
                    v-model="addForm.productName"
                    placeholder="请输入产品名称"
                    :disabled="true"
                    class="row_width">
                  </el-input>
                </el-form-item>
              </div>
              <div class="displayStyle">
                <el-form-item label="产品编码">
                  {{addForm.productId}}
                </el-form-item> 
              </div>
              <div class="displayStyle">
                <el-form-item label="商品编码">
                  {{addForm.skuId}}
                </el-form-item> 
              </div>

              <div class="displayStyle">
                <el-form-item label="商品名称">
                  <el-input
                    v-model="addForm.skuName"
                    placeholder="请输入商品名称"
                    class="row_width">
                  </el-input>
                </el-form-item> 
              </div>
              <div class="displayStyle">
                <el-form-item label="定价方式：">
                  <el-select
                    placeholder="请选择定价方式"
                    v-model="addForm.priceFixType">
                      <el-option :value="0" label="统一"></el-option>
                      <el-option :value="1" label="分别"></el-option>
                      <el-option :value="2" label="单独"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="displayStyle">
                <el-form-item label="建议零售价">
                  <el-input
                    v-model="addForm.skuPrice"
                    placeholder="请输入建议零售价"
                    type="number"
                    class="row_width">
                  </el-input>
                </el-form-item> 
              </div>
              <div class="displayStyle">
                <el-form-item label="成本价">
                  <el-input
                    v-model="addForm.skuCost"
                    placeholder="请输入成本价"
                    type="number"
                    class="row_width">
                  </el-input>
                </el-form-item> 
              </div>
              <div class="displayStyle">
                <el-form-item label="税率">
                  <el-input
                    v-model="addForm.taxRate"
                    placeholder="请输入税率"
                    type="number"
                    class="row_width">
                  </el-input>
                </el-form-item>
              </div>
              <div class="displayStyle">
                <el-form-item label="条码">
                  <el-input
                    v-model="addForm.skuBarCode"
                    placeholder="请输入条码"
                    class="row_width">
                  </el-input>
                </el-form-item>
              </div>
              <div class="displayStyle">
                <el-form-item label="单位：">
                  <el-select
                    v-model="addForm.unitId"
                    :filter-method="unitIdFilter"
                    value-key="unitId"
                    filterable
                    placeholder="选择单位名称："
                    no-data-text="没有找到相关的单位"
                    @change="selectedSetUnitId">
                    <el-option
                      v-for="(item, k) in unitIdAllList"
                      :key="k"
                      :label="item.unitName"
                      :value="item.unitId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="displayStyle">
                <el-form-item>
                  <el-button type="primary" size="small" @click="editFunction('addFormParams')">提交</el-button>
                  <el-button type="primary" plain size="small" @click="cancelFunction('addFormParams')">取消</el-button>
                </el-form-item>
              </div>
            </el-form>
        </div>
    </div>
    
  </div>
  
</template>

<script>
import { mapActions, mapState } from "vuex";
import PlatformMixins from "~/mixins/platform";

export default {
  name: "edit",
  mixins: [PlatformMixins],
  components: { 
  },
  data() {
    return {
      // 需要提交的数据
      addForm: {
        skuId: 0,
        productId: 0,
        unitId: 0,
        cateIdFirst: 0,
        cateIdSecond: 0,
        cateIdThird: 0,
        skuName: "",
        skuPrice: 0,
        skuCost: 0,
        skuBarCode: "",
        brandId: 0,
        productName: "",
        priceFixType: 0,
        taxRate: 0,
        importUserGroupId: 0
      },
      //所有产品名称列表
      productAllList: [],
      //所有计量单位列表
      unitIdAllList: [],
      repeatFormData: {},
    };
  },
  mounted() {
    this.repeatFormData = JSON.parse(sessionStorage.getItem("skuCommodityManagementEditTaht"));
    sessionStorage.removeItem("skuCommodityManagementEditTaht");
    this.queryPricepolicy()
  },
  methods: {
    ...mapActions([
      "skuCommodityManagementEdit",
      "skuCommodityManagementQuery",
      "manageUnitAll"
    ]),
    queryPricepolicy(){
      this.$nextTick(() => {
        this.skuCommodityManagementQuery({skuId: this.$route.query.skuId}).then(res=>{
          this.addForm = this.repeatFormData
          this.addForm.productId = res.productId
          this.addForm.productName = res.productName
          this.addForm.importUserGroupId = res.importUserGroupId
          this.addForm.priceFixType = res.priceFixType
          console.log(res, 998)
          console.log(this.addForm, 999)
        })
      })
    },    
    //根据输入获取ID
    unitIdFilter (string) {
      if(string){
      this.manageUnitAll(string).then(res => {
        this.unitIdAllList = res.result;
      });
      }
    },
    // 选择单位后赋值
    selectedSetUnitId(val) {
      this.unitIdAllList.forEach((item, index) => {
        if (item.unitId == val) {
          this.addForm.unitId = item.unitId
        }
      })
    },
    // 提交表单
    editFunction (addFormParams) {
      let datas = {}
      datas = this.addForm
      this.skuCommodityManagementEdit(datas).then(res => {
        this.$message({
          type: 'success',
          message: `操作成功`
        })
        this.quit(this.routesMapping.skuTag, true);
      });
    },
    // 取消提交表单
    cancelFunction (addFormParams) {
      this.$message({
        type: 'success',
        message: `操作成功`
      })
      this.$router.push({path: `/goods/manage/skuCommodityManagement`});
      this.$refs[addFormParams].resetFields();
    },
  },
  watch: {
  }
};
</script>

<style lang="scss" scoped>
</style>