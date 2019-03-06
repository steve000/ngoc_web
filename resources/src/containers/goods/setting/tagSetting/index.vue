<template>
    <div class="content-section">
        <div class="left-section pull-left">
            <div class="add-section" style="margin: 0px">
                <el-button type="primary" size="small" @click="$router.push({path:'/goods/setting/tagAdd'})" class="addcategory" icon="el-icon-plus" :disabled="false">新增标签</el-button>
            </div>
            <ul class="menu-product">
                <li class="all">
                    <div class="set-border" @click="showAll(); click = '1'" :class="{'isactive': click == '1'}">
                        <i class="iconfont1 icon-quanbu"></i>
                        <span>全部标签</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <tag-list :operationId="operationId" :flag="flagMsg" @closeEdit="closeEdit"></tag-list>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TagList from "~/components/goods/setting/tagList";
import List from "../../allCategory";
import PlatformMixins from "~/mixins/platform";
import MenuItem from "~/components/common/MenuItem";
import Bus from "~/utils/bus";
export default {
  name: "tag",
  components: {
    TagList,
    List,
    MenuItem
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
  created() {
    Bus.$on("cateId", cateId => {
      this.flagMsg = String(cateId.cateId);
      this.click = String(cateId.cateId);
    });
  },
  computed: {

  },
  mounted() {
    
  },
  methods: {
    ...mapActions([]),
    showAll() {
      this.operationId = this.operationId + 1
    },
    yanShenClick() {
      this.isclick = true;
    },
    onPageRefresh() {
        this.operationId = this.operationId + 1
    },
    closeEdit() {
        const tabEdit = this.getTabByKey(routesMapping.brandEdit);
        if (tabEdit) {
            this.closeTabByKey(routesMapping.brandEdit)
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
