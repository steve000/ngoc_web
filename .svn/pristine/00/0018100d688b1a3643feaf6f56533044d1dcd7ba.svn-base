<template>
    <div class="purchase">
        <div class="left-section pull-left">
            <div class="add-section">
                <el-button type="primary" @click="getAddSpu" class="addButton"><i class="el-icon-plus"></i>添加产品</el-button>
            </div>

            <ul class="menu-product">
                <li class="all">
                    <div class="set-border" @click="showGoods(''); click = '1'" :class="{'isactive': click == '1'}">
                        <i class="iconfont1 icon-quanbu"></i>
                        <span>全部产品</span>
                    </div>
                </li>
                <menu-item :model='model' v-for='model,index in cate' :click="click" :key="index"></menu-item>
            </ul>

        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <SpuListPage :operationId="operationId" :flag="flagMsg" :level="level"></SpuListPage>
            </div>
        </div>
    </div>
</template>

<script>
import PlatformMixins from "~/mixins/platform";
import CategoryList from '~/components/goods/setting/categoryList'
import List from '../../allCategory'
import { routesMapping } from "~/router";
import { mapActions,mapState } from "vuex";
import MenuItem from '~/components/common/MenuItem'
import Bus from '~/utils/bus'
import SpuListPage from "~/components/goods/manage/spu/spuListPage"; //table列表组件
//import SpuList from '~/components/goods/manage/spu/spuList'
export default {
  name: "SpuIndex",
  mixins: [PlatformMixins],
  data() {
    return {
      operationId: 0,
      flagMsg: "",
      level: 0,
      click: "1"
    };
  },
  components: { SpuListPage,CategoryList,List,MenuItem },
  created() {
      Bus.$on('cateId', cateId => {
          this.level = Number(cateId.level);
          this.flagMsg = String(cateId.cateId);
          this.click = String(cateId.cateId);
      });
  },
  computed: {
      ...mapState({
          cate: ({ category }) => {
              return category.all
          }
      }),
  },
  mounted() {
    this.showGoods();
    this.manageCategoryAll().then((resp) => { });
  },
  methods: {
    ...mapActions(["spuListPage", "manageCategoryAll"]),
    showGoods(cateId,cateName){
      console.log(cateId,cateName,"点击123");
      this.flagMsg = cateId;
      this.cateId = cateId;
    },
    onPageRefresh() {
      this.operationId = this.operationId + 1;
    },
    getAddSpu() {
      this.$router.push(`/goods/spu/spuAdd`);
    }
  }
};
</script>

<style lang="scss">
.purchase {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .pull-left {
        overflow: hidden;
        .el-menu-item-group>ul {
            overflow: hidden;
        }
    }
  .left-section {
    .add-section {
      padding: 10px 0px;
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
