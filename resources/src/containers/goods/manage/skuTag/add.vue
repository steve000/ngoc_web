<!-- 品牌新增 -->
<template>
    <div class="brandBox">
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper">

            <el-form label-width="110px" :model="addForm" ref="addFormParams" style="width:735px;">
              <div class="displayStyle">
                <el-form-item label="商品名称：">
                  <el-select
                    v-model="searchKey"
                    filterable
                    clearable
                    @clear="clearSearchKey"
                    placeholder="选择商品名称"
                    no-data-text="没有找到相关的商品"
                    @change="selectedSetGoods">
                    <el-option
                      v-for="(item, k) in productList"
                      :key="k"
                      :label="item.skuName"
                      :value="item.skuId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="displayStyle">
                <el-form-item label="商品编码：">
                  <el-input
                    v-model="addForm.skuId"
                    disabled>
                  </el-input>
                </el-form-item> 
              </div>
              <div class="displayStyle">
                <el-form-item label="标签名：">
                  <el-select
                    v-model="addForm.tagName"
                    :multiple="false"
                    filterable
                    clearable
                    placeholder="输入标签名"
                    no-data-text="没有找到相关的标签名"
                    @change="selectedSetUnitId">
                    <el-option
                      v-for="(item, k) in unitIdAllList"
                      :key="k"
                      :label="item.tagName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-form>



            </div>
        </div>
        <div class="content" style="text-align: center;padding-top:20px;">
            <div class="pl20 pb20">
                <el-button type="primary" style="width:90px;" prop="channelId" @click="submitCreateOrder">提交</el-button>
                <el-button plain type="primary" style="width:90px;margin-left:40px;" @click="quit(routesMapping.insteadDelivery, true)">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import PlatformMixins from "~/mixins/platform";
import QuitMixins from "~/mixins/quit";
import { routesMapping } from "~/router";
import { mapActions } from "vuex";
export default {
  name: "brandEdit",
  mixins: [PlatformMixins, QuitMixins],
  data() {
    return {
      // 模糊查询商品名称
      searchKey: "",
      addForm: {
        tagId: "",
        skuId: ""
      },
      productList: [],
      // 所有的list
      filterProductList: [],
      unitIdAllList: [],
      allArr: [],
      isSend: false 
    };
  },
  mounted() {
    this.skuNameAll("")
    this.unitIdFilter()
  },
  methods: {
    ...mapActions([
      "skuCommodityManagementAddtag",
      "skuListPage",
      "querySkuCodeByProductName",
      "manageTagAll",
      "skuCommoditySkutagQueryall"
    ]),
    //根据输入获取产品名称下拉列表   根据商品名称查询到sku
    skuNameAll(val) {
        this.querySkuCodeByProductName({ searchKey: val }).then(res => {
            console.log(res);
            this.filterProductList = res.result;
            this.productList = res.result;
        });
    },
    // 选择
    // skuNameFilter(string) {
    //   if (!string) {
    //     return (this.productList = this.filterProductList);
    //   }
    //   this.productList = this.filterProductList.filter(item => {
    //     if (
    //       (item.productId && item.productId.toString().indexOf(string) >= 0) ||
    //       (item.productName && item.productName.toString().indexOf(string)) >= 0
    //     ) {
    //       return item;
    //     }
    //   });
    // },
    // 选择商品名称后带出产品编码
    selectedSetGoods(val) {
      // console.log(val, 111)
      this.productList.forEach((item, index) => {
        if (item.skuId == val) {
          this.addForm.skuId = item.skuId;
        }
      })
    },
    //根据输入获取ID
    unitIdFilter() {
        let par = {
          tagName: ''
        };
        this.manageTagAll(par).then(res => {
          this.unitIdAllList = res.result;
        });
    },
    // 选择单位后赋值
    selectedSetUnitId(val) {
      if (!this.addForm.skuId) {
        this.$message({
          type: "warning",
          message: `请先选择商品名称`
        });
        this.addForm.tagName = ''
        this.isSend = false
      } else {
        if (!this.allArr.length) {
          this.skuCommoditySkutagQueryall({skuId: this.addForm.skuId}).then(res => {
            if (res.result.length) {
              this.allArr = res.result;
              this.allArr.forEach((item, index) => {
                if (item.tagId == val) {
                  this.$message({
                    type: "warning",
                    message: `不能选择相同标签`
                  });
                  this.addForm.tagName = ''
                  this.isSend = false
                } else {
                  this.addForm.tagId = val;
                  this.isSend = true
                }
              });
            } else {
              this.addForm.tagId = val;
              this.isSend = true
            }
          });
        } else {
          this.allArr.forEach((item, index) => {
            if (item.tagId == val) {
              this.$message({
                type: "warning",
                message: `不能选择相同标签`
              });
              this.addForm.tagName = ''
              this.isSend = false
            } else {
              this.addForm.tagId = val;
              this.isSend = true
            }
          });
        }
      }
    },

    // 提交编辑商品属性
    submitCreateOrder() {
      if (this.addForm.tagId == "") {
        this.$message({
          type: "warning",
          message: `标签不能为空`
        });
      } else if (this.addForm.skuId == "") {
        this.$message({
          type: "warning",
          message: `商品名称不能为空`
        });
      } else {
        let datas = this.addForm
        delete datas.tagName
        // console.log(this.isSend, 111);
        // return false
        if (this.isSend) {
          this.skuCommodityManagementAddtag(datas).then(res => {
            if (res) {
              this.$message({
                type: "success",
                message: `新增商品标签成功`
              });
              this.quit(this.routesMapping.skuTag, true);
            } else {
              this.$message({
                type: "warning",
                message: `新增标签失败`
              });
            }
          });
        } else {
          this.$message({
            type: "warning",
            message: `请填写完整表单`
          });
        }
      }
    },
    clearSearchKey () {
      this.addForm.skuId = ''
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.brandBox {
  height: 100%;
  padding: 20px;
  .content {
    background-color: #fff;
    .el-select {
      display: block;
    }
    .title {
      font-size: 14px;
      color: #333333;
      line-height: 44px;
      height: 44px;
      background-color: #fff;
      border-bottom: 1px solid #e5e5e5;
    }
    .content-wrapper {
      padding: 20px 20px 1px 20px;
      .displayStyle {
        display: inline-block;
        width: 90%;
        padding-left: 25px;
        .row_width {
          width: 300px;
          height: 36px;
        }
      }
    }
    .addProduct {
      margin-bottom: 20px;
    }
    table thead th {
      background: #f6f7fb;
      width: 100px;
      height: 44px;
    }
    table {
      border: 1px solid #eee;
      border-collapse: collapse;
      margin: 0 auto;
      text-align: left;
      font-size: 12px;
      tr {
        border-bottom: 1px solid #eee;
        background: #ffffff;
        height: 44px;
        overflow: hidden;
        box-shadow: 0 1px 0 0 #f2f6fd;
        border: 1px solid #f0f3fa;
        transition: 1s;
        .iconfont1 {
          width: 16px;
          height: 16px;
          top: -6px;
          right: -1px;
          position: absolute;
          display: none;
          background-color: white;
          color: red;
          transition: 1s;
        }
        &:hover {
          //    border: 1px dashed #539EFF;
          outline: 1px dashed #539eff;
          outline-offset: 0px;
          transition: 1s;
          .iconfont1 {
            display: block;
            cursor: pointer;
            transition: 1s;
          }
        }
        td {
          padding-left: 5px;
          .table-input {
            width: 120px;
          }
        }
      }
    }
  }
  .orderContainer {
    margin: 20px;
    background-color: #fbfbfb;
    border: 1px solid #f1f1f1;
    text-align: right;
    font-size: 14px;
    color: #333333;
    .orderCount {
      height: 50px;
      line-height: 50px;
      margin-right: 15px;
      span {
        color: red;
        font-size: 18px;
      }
    }
  }
  .submitBtn {
    clear: both;
    padding: 20px;
    background-color: white;
  }
  .el-table__body-wrapper {
    overflow: inherit;
  }
  .createAddress_func {
    margin: 0 10px;
    padding: 3px;
    width: 58px;
    height: 20px;
    cursor: pointer;
    &.defalut_address {
      background-color: #ffeddd;
      color: #ff9624;
      border: 1px solid #ff9624;
    }
    &.set_defalutAddress {
      display: none;
      background-color: #ff9624;
      color: #fff;
      border: 1px solid #ff9624;
    }
  }
  .el-table__row:hover {
    .createAddress_func {
      &.set_defalutAddress {
        display: inline;
      }
    }
  }
  .inventory {
    background-color: #fa5555;
    color: #fff;
    font-size: 12px;
    width: 58px;
    height: 20px;
    line-height: 20px;
    text-align: center;
  }
}
</style>
