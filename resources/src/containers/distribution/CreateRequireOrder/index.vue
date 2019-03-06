<template>
    <div class="Distribution">
        <div class="left-section pull-left">
            <el-menu default-active="1">
                <el-menu-item index="1">
                    <i class="iconfont1 iconquanbu icon-quanbu"></i>
                    <div slot="title" @click="refreshRecommendList('')" class="menu-btn-space">全部</div>
                </el-menu-item>
                <el-menu-item index="2">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="refreshRecommendList('1')" class="menu-btn-space">未处理<span class="colorRed">（{{untreated}}）</span></div>
                </el-menu-item>
                <el-menu-item index="3">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="refreshRecommendList('2')" class="menu-btn-space">已处理<span class="colorRed">（{{completed}}）</span></div>
                </el-menu-item>
                <el-menu-item index="4">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="refreshRecommendList('3')" class="menu-btn-space">新到季<span class="colorRed">（{{newArrive}}）</span></div>
                </el-menu-item>
                <el-menu-item index="5">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="refreshRecommendList('4')" class="menu-btn-space">新启用<span class="colorRed">（{{newOpen}}）</span></div>
                </el-menu-item>
                <el-menu-item index="6">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="refreshRecommendList('5')" class="menu-btn-space">智能<span class="colorRed">（{{intelligence}}）</span></div>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <recommendCreateOrder-list :operationId="operationId" :flag="flagMsg" v-on:getStatisticsData="getStatisticsData"></recommendCreateOrder-list>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import PlatformMixins from "~/mixins/platform";
import { routesMapping } from "~/router";
import recommendCreateOrderList from "~/components/distribution/CreateRequireOrderList";

export default {
  name: "recommendCreateRequireOrder",
  mixins: [PlatformMixins],
  data() {
    return {
      flashPage: "",
      operationId: 1, // 传入要搜索的ID
      flagMsg: "",  // 传入要搜索的状态 & 类型
      click: 1,
      untreated: 0,
      completed: 0,
      newArrive: 0,
      newOpen: 0,
      intelligence: 0
    };
  },
  components: { recommendCreateOrderList },
  mounted() {
    this.loadCount();
  },
  methods: {
    ...mapActions([
      "recommendCount", //推荐信息接收统计数据
      "showPageLoading",
      "hidePageLoading"
    ]),
    loadCount() {
      // 未处理
      this.recommendCount({
        status: 0
      }).then(resp => {
        this.untreated = resp.count
      });
      // 已处理
      this.recommendCount({
        status: 1
      }).then(resp => {
        this.completed = resp.count
      });
      // 新启用
      this.recommendCount({
        recommendType: 0
      }).then(resp => {
        this.newOpen = resp.count
      });
      // 新到季
      this.recommendCount({
        recommendType: 1
      }).then(resp => {
        this.newArrive = resp.count
      });
      // 智能
      this.recommendCount({
        recommendType: 2
      }).then(resp => {
        this.intelligence = resp.count
      });
    },
    getStatisticsData(data){
      if (data == "change") {
        this.loadCount();
      }
      // console.log(data,"子组件传参");
      // this.untreated = data[0];
      // this.completed = data[1];
      // this.newArrive = data[2];
      // this.newOpen = data[3];
      // this.intelligence = data[4];
    },
    refreshRecommendList(val) {
      this.flagMsg = val;
    },
    onPageRefresh() {
      this.operationId = this.operationId + 1;
    }
  }
};
</script>

<style lang="scss">
.Distribution {
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
