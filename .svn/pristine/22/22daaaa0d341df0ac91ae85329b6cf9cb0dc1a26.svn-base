<template>
    <div class="purchase">
        <div class="left-section pull-left">
            <div class="add-section">
                <el-button type="primary" class="addButton" icon="el-icon-plus" @click="createPurchase">新增销售单</el-button>
            </div>
            <!--
            <ul class="menu">
                <li class="menu-item" :class="{'isactive': click == 1}" @click="showPurchase('-1'); click = 1">
                    <div class="set-border">全部</div>
                </li>
                <li class="menu-item" :class="{'isactive': click == 2}" @click="showPurchase('1'); click = 2">
                    <div class="set-border">待入库</div>
                </li>
                <li class="menu-item" :class="{'isactive': click == 3}" @click="showPurchase('2'); click = 3">
                    <div class="set-border">部分入库</div>createInsteadDelivery.vue
                </li>
                <li class="menu-item" :class="{'isactive': click == 4}" @click="showPurchase('3'); click = 4">
                    <div class="set-border">已入库</div>
                </li>
            </ul>
            -->
            <el-menu default-active="1">
                <el-menu-item index="1">
                    <i class="el-icon-menu"></i>
                    <div slot="title" @click="showPurchase('-1')" class="menu-btn-space">待售订单</div>
                </el-menu-item>
                <el-menu-item index="2">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showPurchase('1')" class="menu-btn-space">未发货(4)</div>
                </el-menu-item>
                <el-menu-item index="3">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showPurchase('2')" class="menu-btn-space">已完成(4)</div>
                </el-menu-item>
                <el-menu-item index="4">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showPurchase('3')" class="menu-btn-space">已取消(4)</div>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <order-for-sale-list :operationId="operationId" :flag="flagMsg"></order-for-sale-list>
            </div>
        </div>
        <!--暂无数据-->
        <!--<el-button @click="createPurchase">新增采购</el-button>-->
        <!--<el-button @click='viewPurchaseOrder'>查看详情</el-button>-->
    </div>
</template>

<script>
import PlatformMixins from '~/mixins/platform'
import { routesMapping } from '~/router'
import OrderForSaleList from '~/components/sales/salesOrder/orderForSaleList'

export default {
    name: "PurchaseOrder",
    mixins: [PlatformMixins],
    data() {
        return {
            flashPage: '',
            operationId: 1,  // 传入要搜索的ID，如果是同一个函数通过不同id调取数据的话
            flagMsg: '', // 传入要搜索的类型，如果是根据显示类型获取数据的话
            click: 1,
        }
    },
    components: { OrderForSaleList },
    methods: {
        viewPurchaseOrder() {
            this.$router.push(`/purchase/ViewPurchaseOrder`)
        },
        createPurchase() {
            this.$router.push(`/purchase/createPurchase`)
        },
        showPurchase(val) {
            this.flagMsg = val;
        },
        onPageRefresh() {
            this.operationId = this.operationId + 1;
        },
    }
}
</script>

<style lang="scss">
.purchase {
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
      }
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
      .menu-btn-space {
        display: inline-block;
        width: 100px;
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
.menu-icon-place-holder {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
  display: inline-block;
}
</style>

