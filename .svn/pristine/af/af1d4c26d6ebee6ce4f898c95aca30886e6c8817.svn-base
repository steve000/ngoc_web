<template>
<!-- 商品普通价格政策 - 列表 -->
    <div class="content-section">
        <div class="left-section pull-left">
            <div class="add-section" style="margin: 0px">
                <el-button type="primary" @click="addNormalPrice" class="addmutibar" icon="el-icon-plus" :disabled="false">新增普价政策</el-button>
            </div>
            <ul class="menu-product">
                <li class="all">
                    <div class="set-border" @click="showGoods(''); click = '1'" :class="{'isactive': click == '1'}">
                        <i class="iconfont1 icon-quanbu"></i>
                        <span>全部普价政策</span>
                    </div>
                </li>
                <!-- <menu-item :model='model' v-for='(model,index) in cate' :click="click" :key="index"></menu-item> -->
            </ul>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <general-pricepolicy-list :operationId="operationId"></general-pricepolicy-list>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import GeneralPricepolicyList from "~/components/goods/manage/GeneralPricepolicyList";
import List from "../../allCategory";
import PlatformMixins from "~/mixins/platform";
// import MenuItem from "~/components/common/MenuItem";
import Bus from "~/utils/bus";
export default {
  name: "GoodsGeneralPricePolicy",
  components: {
    GeneralPricepolicyList,
    List,
    // MenuItem
  },
  mixins: [PlatformMixins],
  data() {
    return {
      operationId: 1,
      flashPage: "",
      data: "", // 传入要搜索的ID，如果是同一个函数通过不同id调取数据的话
      flagMsg: "-", // 传入要搜索的类型，如果是根据显示类型获取数据的话
      click: "1"
    };
  },
  created() {
    Bus.$on("cateId", cateId => {
      // this.flagMsg = String(cateId.cateId);
      // this.click = String(cateId.cateId);
    });
  },
  computed: {
    // ...mapState({
    //   cate: ({ cate }) => {
    //     return cate.cateAll;
    //   }
    // })
  },
  mounted() {
    this.showGoods("");
    // this.queryCateAll().then(resp => {});
  },
  methods: {
    ...mapActions(["queryCateAll"]),
    addNormalPrice() {
      this.$router.push({path: `/goods/manage/addGeneralPrice`});
    },
    onPageRefresh(){
      this.operationId = this.operationId + 1;
    },
    showGoods(cateId, cateName) {
      this.flagMsg = cateId;
      this.cateId = cateId;
    },
    yanShenClick() {
      this.isclick = true;
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
      padding: 10px;
      margin: -80px 0 0;
      .addmutibar {
        display: flex;
        margin: auto;
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
