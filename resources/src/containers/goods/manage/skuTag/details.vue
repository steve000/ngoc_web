<template>
  <div class="details">
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
                    :disabled="true"
                    v-model="addForm.skuName"
                    placeholder="请输入商品名称"
                    class="row_width">
                  </el-input>
                </el-form-item> 
              </div>
              <div class="displayStyle">
                <el-form-item label="定价方式：">
                  <el-select
                    :disabled="true"
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
                    :disabled="true"
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
                    :disabled="true"
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
                    :disabled="true"
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
                    :disabled="true"
                    v-model="addForm.skuBarCode"
                    placeholder="请输入条码"
                    class="row_width">
                  </el-input>
                </el-form-item>
              </div>
              <div class="displayStyle">
                <el-form-item label="单位">
                  <el-input
                    :disabled="true"
                    v-model="addForm.unitName"
                    placeholder="请输单位"
                    class="row_width">
                  </el-input>
                </el-form-item>
              </div>
              <div class="displayStyle">
                <el-form-item>
                  <el-button type="primary" plain size="small" @click="goback">返回</el-button>
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
  name: "detailsSkuCommodityManagement",
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
        importUserGroupId: 0,
        tagList: []
      },
      //所有产品名称列表
      productAllList: [],
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
      "skuCommodityManagementQuery"
    ]),
    queryPricepolicy(){
      this.$nextTick(() => {
        this.skuCommodityManagementQuery({skuId: this.$route.query.skuId}).then(res=>{
          this.addForm = this.repeatFormData
          this.addForm.productId = res.productId
          this.addForm.productName = res.productName
          this.addForm.importUserGroupId = res.importUserGroupId
          this.addForm.priceFixType = res.priceFixType
          this.addForm.unitId = res.unitId
          this.addForm.unitName = res.unitName
          this.addForm.tagList = res.tagList
          console.log(res, 998)
          console.log(this.addForm, 999)
        })
      })
    },    
    // 提交表单
    editFunction (addFormParams) {
      let datas = {}
      datas = this.addForm
      this.skuCommodityManagementEdit(datas).then(res => {
        // console.log(res, 998);
      });
      // this.$refs[addFormParams].validate((valid) => {
      //   if (valid) {
      //     alert('submit!');
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
    },
    // 取消提交表单
    cancelFunction (addFormParams) {
      this.$refs[addFormParams].resetFields();
      this.$message({
        type: 'success',
        message: `操作成功`
      })
      this.$router.push({path: `/goods/manage/skuCommodityManagement`});
    },
    // 返回
    goback () {
      this.$message({
        type: 'success',
        message: `操作成功`
      })
      this.$router.push({path: `/goods/manage/skuCommodityManagement`});
    },
  },
  watch: {
  }
};
</script>

<style lang="scss" scoped>
</style>