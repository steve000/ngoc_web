<!-- 标签新增 -->
<template>
    <div class="tagBox">
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper">
                <el-form label-width="110px" :model="createSplitRuleParams" ref="createSplitRuleParams">
                    <div class="displayStyle" style="width: 100%">
                        <el-form-item label="销售实体：" required>
                            <el-select
                                v-model="createSplitRuleParams.saleUserGroupName"
                                :filter-method="UserGroupNameFilter"
                                class="rowUI"
                                size="small"
                                clearable
                                filterable
                                placeholder="选择销售实体"
                                no-data-text="没有找到销售实体"
                                @change="selectedSaleUserGroup">
                                <el-option
                                v-for="(item, k) in userGroupList"
                                :key="item.groupName + k + item.userGroupId"
                                :label="item.groupName"
                                :value="item.userGroupId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="商品名称：" required>
                            <el-select
                                v-model="skuName"
                                :filter-method="skuNameFilter"
                                class="rowUI"
                                size="small"
                                clearable
                                filterable
                                placeholder="选择产品名称"
                                no-data-text="没有找到相关的产品"
                                @change="selectedSetGoods">
                                <el-option
                                v-for="(item, k) in skuList"
                                :key="item.skuName + k + item.skuId"
                                :label="item.skuName"
                                :value="item.skuId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="sku编码：">
                            <el-input v-model="createSplitRuleParams.skuId" placeholder="" disabled size="small" class="rowUI">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="仓库实体：" required>
                            <el-select
                                v-model="createSplitRuleParams.storehouseUserGroupName"
                                :filter-method="UserGroupNameFilter"
                                class="rowUI"
                                size="small"
                                clearable
                                filterable
                                placeholder="选择仓库实体"
                                no-data-text="没有找到仓库实体"
                                @change="selectedStoreUserGroup">
                                <el-option
                                v-for="(item, k) in userGroupList"
                                :key="item.groupName + k + item.userGroupId"
                                :label="item.groupName"
                                :value="item.userGroupId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <!-- <div class="displayStyle">
                        <el-form-item label="仓库：" required>
                            <el-select
                                v-model="storehouseName"
                                :filter-method="storeNameFilter"
                                class="rowUI"
                                size="small"
                                clearable
                                filterable
                                placeholder="选择仓库"
                                no-data-text="没有找到相关的仓库"
                                @change="selectedStore">
                                <el-option
                                v-for="(item, k) in storeList"
                                :key="item.storehouseName + k + item.storehouseId"
                                :label="item.storehouseName"
                                :value="item.storehouseId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div> -->
                </el-form>
            </div>
        </div>
        <div class="content" style="text-align: center;padding-top:20px;">
            <div class="pl20 pb20">
                <el-button type="primary" style="width:90px;" @click="submitCreateOrder">提交</el-button>
                <el-button plain style="width:90px;margin-left:40px;" @click="quit(routesMapping.insteadDelivery, true)">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import PlatformMixins from "~/mixins/platform";
import QuitMixins from "~/mixins/quit";
import { routesMapping } from "~/router";
import { mapActions, mapState } from "vuex";
export default {
  name: "splitRuleAdd",
  mixins: [PlatformMixins, QuitMixins],
  data() {
    return {
      // 输入商品的list
      skuList: [],
      // 所有的list
      filterSkuList: [],
      // 新增拆单规则参数对象
      createSplitRuleParams: {
        saleUserGroupId: 0,
        skuId: 0,
        storehouseUserGroupId: 0,
        saleUserGroupName: "",
        storehouseUserGroupName: ""
      },
      skuName: "",
      storehouseName: "",
      // 用户实体
      userGroupName: "",
      uid: sessionStorage.getItem("userId"),
      // 仓库的list
      storeList: [],
      // 所有的仓库
      filterStoreList: [],
      //用户实体list
      userGroupList: [],
      // 所有的用户实体
      filterUserGroupList: [],
      // 模糊查询商品名称
      searchKey: "",
      ifAddtag: 0
    };
  },
  mounted() {
    this.createSplitRuleParams.saleUserGroupId = Number(sessionStorage.getItem("entityId"));
    this.userGroupName = sessionStorage.getItem("entityName");
    this.getSkuListByUserGroup();
    // this.getStoreListByUserGroup();
    this.getUserGroup();
  },
  methods: {
    ...mapActions(["userGroupAll","saleSplitRuleAdd","querySkuListByUserGroup","queryUserGroupStoreHouse"]),
    //拿到用户实体下商品列表
    getSkuListByUserGroup() {
      this.querySkuListByUserGroup({status: 1,userGroupId: this.createSplitRuleParams.saleUserGroupId}).then(resp => {
        console.log(resp,"32321")
        this.skuList = resp.result,
        this.filterSkuList = resp.result
      });
    },
    // 选择商品 match
    skuNameFilter(string) {
      if (!string) {
        return (this.skuList = this.filterSkuList);
      }
      this.skuList = this.filterSkuList.filter(item => {
        if (
          (item.skuId && item.skuId.toString().indexOf(string) >= 0) ||
          (item.skuName && item.skuName.toString().indexOf(string)) >= 0
        ) {
          return item;
        }
      });
    },
    // 选择商品名称
    selectedSetGoods(val) {
      console.log(val, "选中商品ID");
      this.createSplitRuleParams.skuId = val;
      this.skuName = this.skuList.find(item => {
        return item.skuId === val;
      }).skuName;
    },

    /* 新增不传仓库 steve 2018-07-11 */
    // // 拿到用户实体下仓库列表
    // getStoreListByUserGroup() {
    //   this.queryUserGroupStoreHouse({status: 0,userGroupId: this.createSplitRuleParams.saleUserGroupId,storehouseChildType: 1}).then(resp => {
    //     this.storeList = resp.result,
    //     this.filterStoreList = resp.result
    //   });
    // },
    // // 仓库match
    // storeNameFilter(string) {
    //   if (!string) {
    //     return (this.storeList = this.filterStoreList);
    //   }
    //   this.storeList = this.filterStoreList.filter(item => {
    //     if (
    //       (item.storehouseId && item.storehouseId.toString().indexOf(string) >= 0) ||
    //       (item.storehouseName && item.storehouseName.toString().indexOf(string)) >= 0
    //     ) {
    //       return item;
    //     }
    //   });
    // },
    // // 选择仓库
    // selectedStore(val) {
    //   console.log(val, "选中仓库ID");
    //   this.createSplitRuleParams.storehouseId = val;
    //   this.storehouseName = this.storeList.find(item => {
    //     return item.storehouseId === val;
    //   }).storehouseName;
    // },

    // 拿到所有用户实体(不用uid或者usergroupId查询) 选择 作为仓库实体
    getUserGroup() {
      this.userGroupAll({status: 1}).then(resp => {
        this.userGroupList = resp.result,
        this.filterUserGroupList = resp.result
      });
    },
    // 仓库实体&销售实体  match
    UserGroupNameFilter(string) {
      if (!string) {
        return (this.userGroupList = this.filterUserGroupList);
      }
      this.userGroupList = this.filterUserGroupList.filter(item => {
        if (
          (item.userGroupId && item.userGroupId.toString().indexOf(string) >= 0) ||
          (item.groupName && item.groupName.toString().indexOf(string)) >= 0
        ) {
          return item;
        }
      });
    },
    // 选择销售实体
    selectedSaleUserGroup(val) {
      console.log(val, "选中销售实体ID");
      this.createSplitRuleParams.saleUserGroupId = val;
      this.createSplitRuleParams.saleUserGroupName = this.userGroupList.find(item => {
        return item.userGroupId === val;
      }).groupName;
    },
    // 选择仓库实体
    selectedStoreUserGroup(val) {
      console.log(val, "选中仓库实体ID");
      this.createSplitRuleParams.storehouseUserGroupId = val;
      this.createSplitRuleParams.storehouseUserGroupName = this.userGroupList.find(item => {
        return item.userGroupId === val;
      }).groupName;
    },

    // 提交编辑商品属性
    submitCreateOrder() {
      if (this.skuName == "") {
        this.$message({
          type: "warning",
          message: `商品名称不能为空`
        });
      // } else if (this.storehouseName == "") {
      //   this.$message({
      //     type: "warning",
      //     message: `仓库不能为空`
      //   });
      } else if (this.storehouseUserGroupName == "") {
        this.$message({
          type: "warning",
          message: `仓库实体不能为空`
        });
      }  else {
        console.log(this.createSplitRuleParams,"提交参数");
        this.saleSplitRuleAdd(this.createSplitRuleParams).then(res => {
          if (res) {
            this.$message({
              type: "success",
              message: `新增拆单规则成功`
            });
            this.quit(routesMapping.splitRule, true);
          } else {
            this.$message({
              type: "warning",
              message: `新增拆单规则失败`
            });
          }
        });
      }
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.tagBox {
  height: 100%;
  padding: 20px;
  .content {
    background-color: #fff;
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
        width: 40%;
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
