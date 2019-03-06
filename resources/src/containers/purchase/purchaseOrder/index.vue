<template>
    <div class="PurchaseOrder">
        <div class="left-section pull-left">
            <div class="add-section">
                <el-button type="primary" @click="createPurchaseOrder" class="addButton"><i class="el-icon-plus"></i>新增采购订单</el-button>
            </div>
            <el-menu default-active="1">
                <el-menu-item index="1">
                    <i class="iconfont1 iconquanbu icon-quanbu"></i>
                    <div slot="title" @click="showPurchaseOrder('')" class="menu-btn-space">全部</div>
                </el-menu-item>
                <el-menu-item index="2">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showPurchaseOrder('1')" class="menu-btn-space">待收货<span class="colorRed">（{{pendingDelivery}}）</span></div>
                </el-menu-item>
                <el-menu-item index="3">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showPurchaseOrder('2')" class="menu-btn-space">部分收货<span class="colorRed">（{{partCompleted}}）</span></div>
                </el-menu-item>
                <el-menu-item index="4">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showPurchaseOrder('3')" class="menu-btn-space">入库收货<span class="colorRed">（{{completed}}）</span></div>
                </el-menu-item>
                <el-menu-item index="5">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showPurchaseOrder('4')" class="menu-btn-space">草稿<span class="colorRed">（{{draft}}）</span></div>
                </el-menu-item>
                <el-menu-item index="6">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showPurchaseOrder('5')" class="menu-btn-space">审批通过<span class="colorRed">（{{approval}}）</span></div>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <purchaseOrder-list :operationId="operationId" :flag="flagMsg" @closeEdit="closeEdit" @closeView="closeView"
                               v-on:getStatisticsData="getStatisticsData"></purchaseOrder-list>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import PlatformMixins from "~/mixins/platform";
import { routesMapping } from "~/router";
import purchaseOrderList from "~/components/purchase/purchaseOrder/purchaseOrderList";

export default {
  name: "purchaseOrderIndex",
  mixins: [PlatformMixins],
  data() {
    return {
      flashPage: "",
      operationId: 0, // 传入要搜索的ID，如果是同一个函数通过不同id调取数据的话
      flagMsg: "", // status String  1-2   approveStatus Number  0-1
      click: 1,
      pendingDelivery: 0,
      partCompleted: 0,
      completed: 0,
      draft: 0,
      approval: 0
    };
  },
  components: { purchaseOrderList },
   mounted() {
    this.loadCount();
  },
  methods: {
    ...mapActions([
      "purchaseOrderCount", //采购单统计数据
      "showPageLoading",
      "hidePageLoading"
    ]),
    loadCount() {
      // 待收货
      this.purchaseOrderCount({
        status: 1
      }).then(resp => {
        this.pendingDelivery = resp.count
      });
      // 部分收货
      this.purchaseOrderCount({
        status: 2
      }).then(resp => {
        this.partCompleted = resp.count
      });
      // 入库收货
      this.purchaseOrderCount({
        status: 3
      }).then(resp => {
        this.completed = resp.count
      });
      // 未审批
      this.purchaseOrderCount({
        approveStatus: 0
      }).then(resp => {
        this.draft = resp.count
      });
      // 审批通过
      this.purchaseOrderCount({
        approveStatus: 1
      }).then(resp => {
        this.approval = resp.count
      });
    },
    getStatisticsData(data){
      if (data == "change") {
        this.loadCount();
      }
      // this.pendingDelivery = data[0];
      // this.partCompleted = data[1];
      // this.completed = data[2];
      // this.draft = data[3];
      // this.approval = data[4];
    },
    createPurchaseOrder() {
      this.$router.push(`/purchase/purchaseorder/add`);
    },
    showPurchaseOrder(val) {
      this.flagMsg = val;  //两个状态
    },
    onPageRefresh() {
      this.operationId = this.operationId + 1;
    },
    closeView() {
      const tabView = this.getTabByKey(routesMapping.purchaseOrderInfo);
      if (tabView) {
        this.closeTabByKey(routesMapping.purchaseOrderInfo);
      }
    },
    closeEdit() {
      const tabEdit = this.getTabByKey(routesMapping.purchaseOrderEdit);
      if (tabEdit) {
        this.closeTabByKey(routesMapping.purchaseOrderEdit);
      }
    }
  }
};
</script>

<style lang="scss">
.PurchaseOrder {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .left-section {
    .add-section {
      padding: 10px 0;
      text-align: center;
      .addButton {
        display: flex;
        margin: auto;
        font-size: 14px;
        padding: 9px 12px;
      }
    }
    .iconquanbu {
      margin-left: 10px;
      margin-right: 5px;
    }
    .el-menu {
      background-color: #e9eef1;
      .divide-line {
        margin-left: 20px;
        width: 120px;
        border-bottom: 1px solid #dde2e5;
      }
      .el-menu-item {
        line-height: 44px;
        height: 44px;
        color: #424e67;
        .colorRed {
          color: red;
        }
      }
      .el-menu-item.is-active {
        color: #3b8cff;
        background-color: #dde2e5;
      }
      .el-menu-item:hover {
        background-color: #dde2e5;
      }
      .menu-btn-space {
        display: inline-block;
        width: 100px;
        font-size: 12px;
      }
      .menu-icon-place-holder {
        margin-right: 5px;
        width: 24px;
        text-align: center;
        font-size: 18px;
        vertical-align: middle;
        display: inline-block;
      }
      .el-menu-item:nth-child(1) {
        .menu-btn-space {
          font-size: 14px;
        }
      }
    }
  }
  .main-section {
    .main-wrapper {
      .block-color {
        width: 100%;
        height: 100%;
        background-color: #fff;
        position: relative;
      }
    }
  }
}
</style>
