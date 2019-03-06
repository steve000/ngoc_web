<template>
    <div class="content-section">
        <div class="left-section pull-left">
            <div class="add-section" style="margin: 0px">
                <el-button type="primary" @click="$router.push({name:'splitRuleAdd'})" class="addcategory" icon="el-icon-plus" :disabled="false">新增拆单规则</el-button>
            </div>
            <ul class="menu-product">
                <li class="all">
                    <div class="set-border" @click="showAll(); click = '1'" :class="{'isactive': click == '1'}">
                        <i class="iconfont1 icon-quanbu"></i>
                        <span>全部拆单规则</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <splitRule-list :operationId="operationId" :flag="flagMsg" @closeEdit="closeEdit" @closeView="closeView"></splitRule-list>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import splitRuleList from "~/components/sales/splitRule/splitRuleList";
import PlatformMixins from "~/mixins/platform";
export default {
  name: "splitRule",
  components: {
    splitRuleList
  },
  mixins: [PlatformMixins],
  data() {
    return {
      flashPage: "",
      operationId: 1, // 传入要搜索的ID，如果是同一个函数通过不同id调取数据的话
      flagMsg: "", // 传入要搜索的类型，如果是根据显示类型获取数据的话
      click: "1"
    };
  },
  created() {},
  computed: {},
  mounted() {},
  methods: {
    ...mapActions([]),
    showAll() {
      this.operationId = this.operationId + 1;
    },
    yanShenClick() {
      this.isclick = true;
    },
    onPageRefresh() {
      this.flagMsg = "修改拆单规则list";
    },
    closeView() {
      const tabView = this.getTabByKey(routesMapping.ViewCardType);
      if (tabView) {
        this.closeTabByKey(routesMapping.ViewCardType);
      }
    },
    closeEdit() {
      const tabEdit = this.getTabByKey(routesMapping.EditPurchase);
      if (tabEdit) {
        this.closeTabByKey(routesMapping.EditPurchase);
      }
    }
  }
};
</script>

<style lang="scss">
.list-menu {
  height: 36px;
  border-bottom: 1px solid #eee;
  .isactive {
    border-left: 4px solid #40b6fa;
    color: #40b6fa;
  }
}

.content-section {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .left-section {
    .add-section {
      padding: 10px 0px;
      text-align: center;
      .addcategory {
        display: flex;
        margin: auto;
        min-width: 100px;
        padding: 9px 12px;
      }
    }
  }
  .pull-left {
    overflow: hidden;
    .el-menu-item-group > ul {
      overflow: hidden;
    }
  }
  .el-submenu__title {
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
  }
  .el-menu-item.is-active {
    border-left: 4px solid;
  }
  .el-menu-item {
    border-bottom: 1px solid lightgray;
    :hover {
      background-color: red !important;
    }
  }
  .el-menu-item-group__title {
    padding: 0;
  }
  .main-section {
    .main-wrapper {
      padding: 0 20px;
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
