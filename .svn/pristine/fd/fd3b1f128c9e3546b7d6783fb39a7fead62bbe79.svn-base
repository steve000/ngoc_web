<template>
    <div class="PayCheck">
        <div class="left-section pull-left">
            <div class="add-section">
                <el-button type="primary" size="small" @click="$router.push({name:'payCheckAdd'})" class="addButton"><i class="el-icon-plus"></i>新增经销对账单</el-button>
            </div>
            <el-menu default-active="1">
                <el-menu-item index="1">
                    <i class="iconfont1 iconquanbu icon-quanbu"></i>
                    <div slot="title" @click="showPayCheck()" class="menu-btn-space">全部经销对账单</div>
                </el-menu-item>
                <el-menu-item index="2">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showPayCheck(0)" class="menu-btn-space">草稿<span class="colorRed">（{{draft}}）</span></div>
                </el-menu-item>
                <el-menu-item index="3">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showPayCheck(1)" class="menu-btn-space">审批通过<span class="colorRed">（{{approval}}）</span></div>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <payCheck-list :operationId="operationId" :flag="flagMsg" @closeEdit="closeEdit" @closeView="closeView"
                            v-on:getStatisticsData="getStatisticsData"></payCheck-list>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import PlatformMixins from "~/mixins/platform";
import { routesMapping } from "~/router";
import payCheckList from "~/components/accountSettlement/payCheckList";

export default {
  name: "payCheckIndex",
  mixins: [PlatformMixins],
  data() {
    return {
      flashPage: "",
      operationId: 1, // 传入要搜索的ID，如果是同一个函数通过不同id调取数据的话
      flagMsg: 2, // 传入要搜索的类型，如果是根据显示类型获取数据的话
      click: 1,
      draft: 0, //审批
      approval: 0 //审批通过
    };
  },
  components: { payCheckList },
  mounted() {
    this.loadCount();
  },
  methods: {
    ...mapActions([
      "accountPayCheckCount", //经销对账单统计数据
      "showPageLoading",
      "hidePageLoading"
    ]),
    loadCount() {
      // 未审批
      this.accountPayCheckCount({
        approveStatus: 0
      }).then(resp => {
        this.draft = resp.count
      });
      // 审批通过
      this.accountPayCheckCount({
        approveStatus: 1
      }).then(resp => {
        this.approval = resp.count
      });
    },
    getStatisticsData(data){
      if (data == "change") {
        this.loadCount();
      }
      // this.draft = data[0];
      // this.approval = data[1];
    },
    showPayCheck(val) {
      this.flagMsg = Number(val);
    },
    onPageRefresh() {
    //   this.operationId = this.operationId + 1;
    },
    closeView() {
      const tabView = this.getTabByKey(routesMapping.ViewPayCheckOrder);
      if (tabView) {
        this.closeTabByKey(routesMapping.ViewPayCheckOrder);
      }
    },
    closeEdit() {
      const tabEdit = this.getTabByKey(routesMapping.EditPayCheck);
      if (tabEdit) {
        this.closeTabByKey(routesMapping.EditPayCheck);
      }
    }
  }
};
</script>

<style lang="scss">
.PayCheck {
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
