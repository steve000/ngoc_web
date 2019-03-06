<template>
  <div class="edit">
    <div class="content">
        <div class="title">
            <div>基本信息</div>
        </div>
        <div class="content-wrapper">
            <el-form label-width="110px" :model="addForm" ref="addFormParams" :rules="rules">
              <div>
                <div class="displayStyle">
                  <el-form-item label="引入组织：" prop="importUserGroupName">
                    <el-input
                      v-model="addForm.importUserGroupName"
                      placeholder="请输入登陆组织"
                      :disabled="true"
                      class="row_width"
                      size="small">
                    </el-input>
                  </el-form-item>
                </div>
              </div>
              <div>
                <div class="displayStyle">
                  <el-form-item label="产品编码：">
                    <el-input
                      v-model="addForm.productId"
                      placeholder="请输入产品编码"
                      :disabled="true"
                      class="row_width"
                      size="small">
                    </el-input>
                  </el-form-item> 
                </div>
                <div class="displayStyle">
                  <el-form-item label="产品名称：" prop="productName">
                    <el-input
                      v-model="addForm.productName"
                      placeholder="请输入产品名称"
                      :disabled="true"
                      class="row_width"
                      size="small">
                    </el-input>
                  </el-form-item>
                </div>
              </div>
              <div>  
                <div class="displayStyle">
                  <el-form-item label="商品编码：">
                    <el-input
                      v-model="addForm.skuId"
                      placeholder="请输入商品编码"
                      :disabled="true"
                      class="row_width"
                      size="small">
                    </el-input>
                  </el-form-item> 
                </div>
                <div class="displayStyle">
                  <el-form-item label="商品名称：" prop="skuName">
                    <el-input
                      v-model="addForm.skuName"
                      placeholder="请输入商品名称"
                      class="row_width"
                      size="small">
                    </el-input>
                  </el-form-item> 
                </div>
              </div>
              <div>
                <div class="displayStyle">
                  <el-form-item label="定价方式：" prop="priceFixType">
                    <el-select
                      class="row_width"
                      size="small"
                      placeholder="请选择定价方式"
                      v-model="addForm.priceFixType">
                        <el-option :value="0" label="统一"></el-option>
                        <el-option :value="1" label="分别"></el-option>
                        <el-option :value="2" label="单独"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="displayStyle">
                  <el-form-item label="建议零售价：" prop="skuPrice">
                    <el-input
                      v-model="addForm.skuPrice"
                      placeholder="请输入建议零售价"
                      type="number"
                      :min="0"
                      class="row_width"
                      size="small">
                    </el-input>
                  </el-form-item> 
                </div>
              </div>
              <div>
                <div class="displayStyle">
                  <el-form-item label="成本价：" prop="skuCost">
                    <el-input
                      v-model="addForm.skuCost"
                      placeholder="请输入成本价"
                      type="number"
                      :min="0"
                      class="row_width"
                      size="small">
                    </el-input>
                  </el-form-item> 
                </div>
                <div class="displayStyle">
                  <el-form-item label="税率：" prop="taxRate">
                    <el-input
                      v-model="addForm.taxRate"
                      placeholder="请输入税率"
                      type="number"
                      :min="0"
                      class="row_width"
                      size="small">
                    </el-input>
                    <el-tooltip effect="light" content="税率输入范围为0-100，计算会采用百分比" placement="right">
                      <i class="iconfont1 icon-wenhao fs16 ml5"></i>
                    </el-tooltip>
                  </el-form-item>
                </div>
              </div>
              <div>
                <div class="displayStyle">
                  <el-form-item label="条码：" prop="skuBarCode">
                    <el-input
                      v-model="addForm.skuBarCode"
                      placeholder="请输入条码"
                      class="row_width"
                      size="small">
                    </el-input>
                  </el-form-item>
                </div>
                <div class="displayStyle">
                  <el-form-item label="单位：" prop="unitName">
                    <el-select
                      class="row_width"
                      size="small"
                      v-model="addForm.unitName"
                      value-key="unitId"
                      filterable
                      placeholder="选择单位名称"
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
              </div>
              <div>
                <div class="displayStyle">
                  <el-form-item>
                    <el-button type="primary" size="small" @click="editFunction('addFormParams')">提交</el-button>
                    <el-button type="primary" plain size="small" @click="OnBackLatePage">取消</el-button>
                  </el-form-item>
                </div>
              </div>
            </el-form>
        </div>
    </div>
    
  </div>
  
</template>

<script>
import { mapActions, mapState } from "vuex";
import QuitMixins from '~/mixins/quit';
import { directives } from '~/utils/directives/index'
import {routesMapping} from '~/router';
import PlatformMixins from "~/mixins/platform";

export default {
  name: "editSkuCommodityManagement",
  mixins: [PlatformMixins,QuitMixins],
  components: { 
  },
  data() {
    //正则校验
    let importUserGroupName = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请填写登陆组织!'));
        } else {
            return callback();
        }
    }
    let productName = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请填写产品名称!'));
        } else {
            return callback();
        }
    }
    let createUsername = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请填写规格描述!'));
        } else {
            return callback();
        }
    }
    let priceFixType = (rule, value, callback) => {
        if (value === '' || value === undefined) {
            return callback(new Error('请填写定价方式!'));
        } else {
            return callback();
        }
    }
    let skuPrice = (rule, value, callback) => {
      var patrn = /(^[1-9](\d){0,6}(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d([\d])?$)/;
      if (!value) {
        return callback(new Error("请填写零售价!"));
      } else if (!patrn.test(value)) {
        return callback(new Error("请输入正确格式零售价，最多两位小数"));
      } else {
        return callback();
      }
    };
    let skuCost = (rule, value, callback) => {
      var patrn = /(^[1-9](\d){0,6}(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d([\d])?$)/;
      if (!value) {
        return callback(new Error("请填写成本价!"));
      } else if (!patrn.test(value)) {
        return callback(new Error("请输入正确格式成本价，最多两位小数"));
      } else {
        return callback();
      }
    };
    let taxRate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写税率!"));
      } else if (value > 100 || value < 0) {
        return callback(new Error("填写范围为0-100!"));
      } else {
        return callback();
      }
    };
    let skuBarCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写条码!"));
      } else {
        return callback();
      }
    };
    let unitName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写单位!"));
      } else {
        return callback();
      }
    };
    let skuName = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请填写供应商名称!'));
        } else {
            return callback();
        }
    }



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
        importUserGroupName: ''
      },
      //所有产品名称列表
      productAllList: [],
      //所有计量单位列表
      unitIdAllList: [],
      rules: {
          importUserGroupName: [{required: true, validator: importUserGroupName, trigger: 'change'}],
          productName: [{required: true, validator: productName, trigger: 'change'}],
          createUsername: [{required: true, validator: createUsername, trigger: 'change'}],
          priceFixType: [{required: true, validator: priceFixType, trigger: 'change'}],
          skuPrice: [{required: true, validator: skuPrice, trigger: 'change'}],
          skuCost: [{required: true, validator: skuCost, trigger: 'change'}],
          taxRate: [{required: true, validator: taxRate, trigger: 'change'}],
          skuBarCode: [{required: true, validator: skuBarCode, trigger: 'change'}],
          unitName: [{required: true, validator: unitName, trigger: 'change'}],
          skuName: [{required: true, validator: skuName, trigger: 'change'}],
      },
    };
  },
  mounted() {
    this.queryPricepolicy()
    this.unitIdFilter()
  },
  methods: {
    ...mapActions([
      "skuCommodityManagementEdit",
      "manageUnitAll",
      "skuCommodityManagementQuery",
      "showPageLoading",
      "hidePageLoading"
    ]),   
    //根据输入获取ID
    unitIdFilter () {
      this.manageUnitAll({status: 0,unitIdFilter: ''}).then(res => {
        this.unitIdAllList = res.result;
      });
    },
    // 选择单位后赋值
    selectedSetUnitId(val) {
      this.unitIdAllList.forEach((item, index) => {
        if (item.unitId == val) {
          this.addForm.unitId = item.unitId
        }
      })
    },
    queryPricepolicy(){
      this.$nextTick(() => {
        this.skuCommodityManagementQuery({skuId: this.$route.query.skuId}).then(res=>{
          this.addForm = res
          this.addForm.skuCost = (Number(this.addForm.skuCost) / 100).toFixed(2)
          this.addForm.skuPrice = (Number(this.addForm.skuPrice) / 100).toFixed(2)
          if (!this.addForm.unitName) {
            this.addForm.unitName = '--'
          }
        })
      })
    }, 
    // 提交表单
    editFunction (addFormParams) {
      this.$refs[addFormParams].validate((valid) => {
        if (valid) {
          this.showPageLoading()
          let datas = {}
          datas = this.addForm
          datas.skuPrice = Number(datas.skuPrice) * 100
          datas.skuCost = Number(datas.skuCost) * 100
          datas.taxRate = Number(datas.taxRate)
          this.skuCommodityManagementEdit(datas).then(res => {
            this.hidePageLoading();
            this.$message({
              type: 'success',
              message: `编辑商品成功`
            })
            this.quit(routesMapping.skuCommodityManagement, true)
          }).catch(error => {
            this.showWarning("编辑失败");
            this.hidePageLoading();
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 取消提交表单
    OnBackLatePage(){
      this.quit(routesMapping.skuCommodityManagement, true)
    },
  },
  watch: {
  }
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  padding: 20px 20px 1px 10px;
  .displayStyle{
    display: inline-block;
    padding-left: 25px;
    .row_width {
      width: 300px;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 36px;
      color: #666666;
    }
  }
}
</style>