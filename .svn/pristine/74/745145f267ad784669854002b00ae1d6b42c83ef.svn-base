<template>
    <div class="commodity-config">
        <div class="left-section pull-left">
            <div class="add-section">
                <el-button type="primary" size="small" @click="addCommodity" class="addButton" icon="el-icon-plus" :disabled="false">添加商品</el-button>
            </div>
            <ul class="menu-product">
                <li class="all" >
                    <div class="set-border"
                         @click="showGoods(''); click = '1'"
                         :class="{'isactive': click == '1'}"
                    ><i class="iconfont1 icon-quanbu"></i><span >全部类目</span></div>
                </li>
                <menu-item :model='model' v-for='model,index in cate' :click="click" :key="index"></menu-item>
            </ul>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <userGroupProduct-list :operationId="operationId" :flag="flagMsg" :level="level"></userGroupProduct-list>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import userGroupProductList from "~/components/goods/manage/userGroupProductList";
import List from "../../allCategory";
import PlatformMixins from "~/mixins/platform";
import MenuItem from "~/components/common/MenuItem";
import Bus from "~/utils/bus";
export default {
  name: "userGroupProduct",
  components: {
    userGroupProductList,
    List,
    MenuItem
  },
  mixins: [PlatformMixins],
  data() {
    return {
      operationId: 0,
      flagMsg: "",
      level: 0,
      click: "1"
    };
  },
  created() {
    Bus.$on("cateId", cateId => {
      this.level = Number(cateId.level);
      this.flagMsg = String(cateId.cateId);
      this.click = String(cateId.cateId);
    });
  },
  computed: {
    ...mapState({
      cate: ({ category }) => {
        return category.all;
      }
    })
  },
  mounted() {
    this.showGoods("");
    this.manageCategoryAll().then(resp => {});
  },
  methods: {
    ...mapActions(["queryCateAll", "manageCategoryAll"]),
    addCommodity() {
      this.$router.push(`/goods/manage/addProduct`);
    },
    showGoods(cateId, cateName) {
      console.log(cateId, cateName, "点击123");
      this.flagMsg = cateId;
      this.cateId = cateId;
    },
    onPageRefresh() {
      this.operationId = this.operationId + 1;
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

.commodity-config {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .left-section {
    .add-section {
      padding: 10px 0px;
      text-align: center;
      .addButton {
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
