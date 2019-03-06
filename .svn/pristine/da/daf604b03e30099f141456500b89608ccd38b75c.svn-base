<template>
<div class="priceList" >
  <div class='tables'>
    <div v-if="stats.pdz==0">
      <div prop='priceList'></div>
      <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="商品清单" name="first">
          <el-table :data="priceList" 
            :height="tableHeight">
            <el-table-column
                prop="skuName"
                label="商品名称"
                width="180">
                <template  slot-scope="scope">
                    {{scope.row.skuName}}
                </template>
            </el-table-column>
            <el-table-column
                prop="skuId"
                label="sku编码"
                width="180">
            </el-table-column>
            <el-table-column
                prop="unitName"
                label="计量名称">
            </el-table-column>
            <el-table-column
                prop="salePrice"
                label="零售价">
            </el-table-column>
            <el-table-column
                prop="vipPrice"
                label="会员价">
            </el-table-column>
            <el-table-column
                prop="groupPrice"
                label="团购价">
            </el-table-column>
            <el-table-column
                prop="remark"
                label="备注">
            </el-table-column>
          </el-table>
          <div slot="empty" class="table_slot_empty_text">
              <div><img src="../../../layouts/images/nodata.png"/></div>
              <div>暂无数据</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="业务实体" name="second" v-if="stats.priceFixType != 0">
          <el-table :data="userGroupList" style="width: 100%">
                <el-table-column
                    prop="userGroupName"
                    label="业务实体用户组">
                </el-table-column>
            </el-table>
            <div slot="empty" class="table_slot_empty_text">
                <div><img src="../../../layouts/images/nodata.png"/></div>
                <div>暂无数据</div>
            </div>
        </el-tab-pane>
      </el-tabs>
  </div>
  <div v-else-if="stats.pdz!==0">
    <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="商品清单" name="first">
          <div class="addProduct">
            <el-button plain size="mini" @click="addGoodsMsg"><i class="el-icon-plus"></i>添加商品信息</el-button>
          </div>
          <table width="100%" style="vertical-align: middle;text-align: center; " class="currentTableClass">
            <thead>
              <th width="80" style="padding-left:20px">操作</th>
              <th width="140" >商品名称</th>
              <th>sku编码</th>
              <th>计量名称</th>
              <th>零售价</th>
              <th>会员价</th>
              <th>团购价</th>
              <th>备注</th>
            </thead>
            <tr v-for="(one, index) in priceList" :key="index">
              <td @click="deleteProduct(index)" style="text-align: center;"><i class="el-icon-remove-outline"></i>
              </td>
              <td width="140">
                  <el-select
                      v-model="one.skuName"
                      value-key="skuName"
                      placeholder="输入商品名称"
                      no-data-text="没有找到相关的商品"
                      :multiple="false"
                      filterable
                      @change="selectedSetGoods(one.skuName, index)"
                      size="small"> 
                      <el-option
                          v-for="(item, k) in productAllList"
                          :key="k"
                          :label="item.skuName"
                          :value="item">
                      </el-option>
                  </el-select>
              </td>
              <td><el-input :disabled='true' v-model="one.skuId" size="small"></el-input></td>
              <td width='80' ><el-input :disabled='true' v-model="one.unitName" size="small"></el-input></td>
              <td><el-input type='number' v-number-decimal-only @focus='nonEditable' v-model="one.salePrice" :disabled="stats.isSalePrice ? false : true" size="small"></el-input></td>
              <td><el-input type='number' v-number-decimal-only @focus='nonEditable' v-model="one.vipPrice" :disabled="stats.isVipPrice ? false : true" size="small"></el-input></td>
              <td><el-input type='number' v-number-decimal-only @focus='nonEditable' v-model="one.groupPrice" :disabled="stats.isGroupPrice ? false : true" size="small"></el-input></td>
              <td><el-input v-model="one.remark" size="small"></el-input></td>
            </tr>
          </table>
      </el-tab-pane>
      <el-tab-pane label="业务实体" name="second" v-if="stats.priceFixType !== 0">
          <div class="addProduct">
            <el-button plain size="mini" @click="addUserGroup"><i class="el-icon-plus"></i>添加业务实体</el-button>
          </div>
          <table class="currentTableClass">
            <thead>
              <th width="80" style="padding-left:20px">操作</th>
              <th width="140" >业务实体用户组</th>
            </thead >
              <tr v-for="(one, index) in userGroupList" :key="index">
                <td @click="deleteuserGroupList(index)" style="text-align: center;"><i class="el-icon-remove-outline"></i>
                </td>
                <td>
                  <el-select v-model="one.userGroupName"
                      value-key="userName"
                      filterable
                      placeholder="输入业务实体名称"
                      no-data-text="没有找到相关的实体"
                      @change="selectedUserEntity(one.userGroupName, index)"
                      size="small">
                      <el-option
                          v-for="(item, k) in groupAllList"
                          :key="k"
                          :label="item.userGroupName"
                          :value="item">
                      </el-option>
                  </el-select>
                </td>
              </tr>
          </table>
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
    
</div>
</template>
 
<script>
import { mapActions, mapState } from "vuex";
import TableHeightMixins from "~/mixins/tableheight";
import PlatformMixins from "~/mixins/platform";
import { routesMapping } from "~/router";
import { directives } from '~/utils/directives/index'
//import PurchaseList from "~/components/goods/card/CardTypeList"; //table列表组件
export default {
  name: "PricepolicyTabs",
  mixins: [PlatformMixins, TableHeightMixins],
  props: ["priceList", "stats", "userGroupList"],
  data() {
    return {
      activeName2: "first",
      //所有商品列表
      productAllList: [],
      //用户所属实体列表 其中实体名是groupName
      groupAllList: []
    };
  },
  watch:{
    'stats.priceFixType':function(){
      if(this.stats.priceFixType==0){
        this.activeName2="first"
      }
      //console.log('变更后:',this.stats)
    }
  }
  ,
  mounted() {
    this.contractFilter2();
    this.setTableHeight(400);
    this.loadList();
  },

  methods: {
    ...mapActions(["querySkuCodeByProductName", "getUserEntityListDo"]),

    //商品列表查询
    contractFilter2(){
        this.querySkuCodeByProductName().then(res => {
          this.productAllList = res.result;
        });
    },

    //重置表单
    initTableData() {
      if (this.activeName2 == "first") {
        this.priceList.push({
          skuId: null,
          unitName: null,
          price: null,
          remark: null
        });
      } else {
        this.userGroupList.push({
          userGroupId: null,
          userGroupName: ""
        });
      }
    },
    // 设置商品信息
    selectedSetGoods(val,index) {
      console.log('OK')
      const good = Object.assign({}, val, { $goodMsg: val }, { saleTotal: 0 });
      this.$set(this.priceList, index, good);
      console.log(this.priceList);
    },
    // 设置用户实体信息
    selectedUserEntity(val, index) {
      const uEntity = Object.assign(
        {},
        val,
        { $goodMsg: val },
        { saleTotal: 0 }
      );
      this.$set(this.userGroupList, index, uEntity);
    },
    nonEditable(){
      let params=true
      console.log('触发')
      this.$emit('nonEditable', params)
    },

    //获取用户实体列表
    selectUserEntityListDo() {
      //通过用户id来获取实体列表
      let uid = sessionStorage.getItem("userId");
      console.log(uid);
      this.getUserEntityListDo({ uid }).then(res => {
        //debugger
        if (res && res.result && res.result.length > 0) {
          console.log(res.result);
          for (let i in res.result) {
            this.groupAllList.push({
              userGroupId: res.result[i].userGroupId,
              userGroupName: res.result[i].groupName
            });
          }
          console.log(this.groupAllList);
          //this.groupAllList=res.result
        } else {
          this.$message({
            type: "info",
            message: "业务实体返回错误!"
          });
          let THIS = this;
          // setTimeout(function () {
          //     THIS.logout()
          // }, 2000)
        }
      });
    },
    //添加实体
    addUserGroup(index) {
      this.initTableData();
    },
    // 添加商品
    addGoodsMsg(index) {
      this.initTableData();
      console.log(this.priceList);
    },
    // 删除实体
    deleteuserGroupList(index) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.userGroupList.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(() => {});
    },
    //加载事件
    loadList() {
      console.log(this.priceList);
      if (this.stats.pdz == 1) {
        this.selectUserEntityListDo();
      }
    },
    // 删除商品
    deleteProduct(index) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.priceList.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(() => {});
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  // watch: {
  //   'activeName2': function (val, oldVal) {
  //   console.log(val, 990)
  //   },
  // }
};
</script>

<style lang="scss">
  .currentTableClass{
    th{
      border: 1px solid #dcdfe6;
    }
  }
</style>
