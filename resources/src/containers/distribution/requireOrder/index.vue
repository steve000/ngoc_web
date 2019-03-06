<template>
    <div class="RequireOrder">
        <div class="left-section pull-left">
            <div class="add-section">
                <el-button type="primary" size="small" @click="createRequireOrder" class="addButton"><i class="el-icon-plus"></i>新增要货单</el-button>
            </div>
            <el-menu default-active="1">
                <el-menu-item index="1">
                    <i class="iconfont1 iconquanbu icon-quanbu"></i>
                    <div slot="title" @click="showRequireOrder('')" class="menu-btn-space">全部</div>
                </el-menu-item>
                <el-menu-item index="2">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showRequireOrder('1')" class="menu-btn-space">待转配送<span class="colorRed">（{{pendingDelivery}}）</span></div>
                </el-menu-item>
                <el-menu-item index="3">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showRequireOrder('2')" class="menu-btn-space">已转配送<span class="colorRed">（{{completed}}）</span></div>
                </el-menu-item>
                <el-menu-item index="4">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showRequireOrder('3')" class="menu-btn-space">草稿<span class="colorRed">（{{draft}}）</span></div>
                </el-menu-item>
                <el-menu-item index="5">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showRequireOrder('4')" class="menu-btn-space">审批通过<span class="colorRed">（{{approval}}）</span></div>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <require-list :operationId="operationId" :flag="flagMsg" @closeEdit="closeEdit" @closeView="closeView"
                               v-on:getStatisticsData="getStatisticsData"></require-list>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import PlatformMixins from "~/mixins/platform";
import { routesMapping } from "~/router";
import requireList from "~/components/distribution/requireOrderList";

export default {
  name: "requireOrderIndex",
  mixins: [PlatformMixins],
  data() {
    return {
      flashPage: "",
      operationId: 1, // 传入要搜索的ID，如果是同一个函数通过不同id调取数据的话
      flagMsg: "", // 传入要搜索的类型，如果是根据显示类型获取数据的话
      click: 1,
      pendingDelivery: 0,
      completed: 0,
      draft: 0,
      approval: 0
    };
  },
  components: { requireList },
  mounted() {
    this.loadCount();
  },
  methods: {
    ...mapActions([
      "requireCount", //统计数据
      "showPageLoading",
      "hidePageLoading"
    ]),
    loadCount() {
      // 待转配送
      this.requireCount({
        status: 1
      }).then(resp => {
        this.pendingDelivery = resp.count
      });
      // 已转配送
      this.requireCount({
        status: 2
      }).then(resp => {
        this.completed = resp.count
      });
      // 未审批
      this.requireCount({
        approveStatus: 0
      }).then(resp => {
        this.draft = resp.count
      });
      // 审批通过
      this.requireCount({
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
      // this.completed = data[1];
      // this.draft = data[2];
      // this.approval = data[3];
    },
    createRequireOrder() {
      this.$router.push(`/distribution/requireOrder/orderAdd`);
    },
    showRequireOrder(val) {
      this.flagMsg = val;
    },
    onPageRefresh() {
      this.operationId = this.operationId + 1;
    },
    closeView() {
      const tabView = this.getTabByKey(routesMapping.requireOrderInfo);
      if (tabView) {
        this.closeTabByKey(routesMapping.requireOrderInfo);
      }
    },
    closeEdit() {
      const tabEdit = this.getTabByKey(routesMapping.requireOrderEdit);
      if (tabEdit) {
        this.closeTabByKey(routesMapping.requireOrderEdit);
      }
    }
  }
};
</script>

<style lang="scss">
.RequireOrder {
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
