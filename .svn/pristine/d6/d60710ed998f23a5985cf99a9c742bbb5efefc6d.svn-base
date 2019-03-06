<template>

    <div class="storage-management">
        <div class="left-section pull-left">
            <el-menu default-active="1">
                <el-menu-item index="1">
                    <i class="iconfont1 iconquanbu icon-quanbu"></i>
                    <div slot="title" @click="showStorage('全部list')" class="menu-btn-space">全部销售流水</div>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <bill-list :operationId="operationId" :flag="flagMsg"></bill-list>
            </div>
        </div>
    </div>
</template>

<script>
import PlatformMixins from "~/mixins/platform";
import BillList from "~/components/sales/bills/billList";

export default {
  name: "salesBills",
  mixins: [PlatformMixins],
  components: { BillList },
  data() {
    return {
      flashPage: "",
      operationId: 1, // 传入要搜索的ID，如果是同一个函数通过不同id调取数据的话
      flagMsg: "", // 传入要搜索的类型，如果是根据显示类型获取数据的话
      click: 1
    };
  },

  computed: {},
  methods: {
    onPageRefresh() {
      this.operationId = this.operationId + 1;
    },
    showStorage(code) {
      this.flagMsg = code;
    }
  }
};
</script>

<style lang="scss">
.storage-management {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .left-section {
    .add-section {
      padding: 20px 0;
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
      .el-menu-item {
        line-height: 44px;
        height: 44px;
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
