<template>
    <div class="salesModule">
        <div class="left-section pull-left">
            <div class="add-section">
                <el-button type="primary" icon="el-icon-plus" class="addButton" @click="$router.push({path:'/sales/proxy/createOrder'})">新增代发订单</el-button>
            </div>
            <el-menu unique-opened @open="activeCurrentMenu" @close="activeCurrentMenu" @select="change" :default-openeds="defaultIndex" :active-text-color="activeColor" :class="{'control-submenu-item': isActiveNavmenu}" default-active="1">
                <el-submenu index="1" :class="{'menu-specail-wrapper': isActiveCur === 1}">
                    <template slot="title">
                        <div class="is-active-submenu">
                            <i class="iconfont1 icon-quanbu"></i>
                            <div slot="title" class="menu-btn-space menu-btn-title">全部订单</div>
                        </div>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="item.id" v-for="(item, index) in menuItemData" class="change-order-menu" :key="index">
                            <div slot="title" @click="showPurchase(item.id)" class="menu-btn-space">{{item.val}}
                                <span v-if="typeof menuItem1[index] === 'number'">({{ menuItem1[index] ? menuItem1[index] : 0 }})</span>
                            </div>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <sales-list :operationId="operationId" :flag="flagMsg" @loaded="queryMuneNum"></sales-list>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import salesList from '~/components/sales/salesProxy/InsteadDeliveryList.vue'
import PlatformMixins from '~/mixins/platform'
export default {
    name: "InsteadDelivery",
    mixins: [PlatformMixins],
    data() {
        return {
            operationId: 1,  // 传入要搜索的ID，如果是同一个函数通过不同id调取数据的话
            flagMsg: '-1', // 传入要搜索的类型，如果是根据显示类型获取数据的话
            curClickMenu: 31,
            menuItemData: [
                { id: '1-1', val: '未出库' },
                { id: '1-3', val: '部分出库' },
                { id: '1-5', val: '已完成' },
                { id: '1-0', val: '已取消' }
            ],
            // subMenuIndex: -1,
            defaultIndex: ['1'], // 默认打开菜单
            isActiveCur: 1, // 当前打开菜单
            activeColor: '#3B8CFF',//
            isActiveNavmenu: false, // 当点击主菜单时，为true
            menuItem1: []
        }
    },
    methods: {
        ...mapActions(["statisticsOrderNumAction"]),
        showPurchase(val) {
            this.flagMsg = val;
        },
        // 激活当前菜单
        activeCurrentMenu(index) {
            this.flagMsg = index;
            this.activeColor = '#737D8F'; // 点击主菜单时子菜单取消高亮
            this.isActiveNavmenu = true; // 清除子菜单选中背景
            this.isActiveCur = Number(index); // 点击主菜单时主菜单高亮
        },
        change(i) {
            this.activeColor = '#3B8CFF'; // 点击子菜单时菜单高亮
            this.isActiveNavmenu = false; // 恢复子菜单选中背景
            this.isActiveCur = -1;
        },
        queryMuneNum(level1) {
            this.statisticsOrderNumAction({ orderType: `14`, invType: 1, errorType: 0 }).then(res => {
                this.menuItem1 = []
                for (let i = 0; i < res.length; i++) {
                    this.menuItem1.push(res[i].count)
                }
            })
        },
        onPageRefresh() {
            this.operationId = this.operationId + 1;
        },
    },
    components: { salesList },
    computed: {
        ...mapState({
            tabCaches: ({ root }) => root.tabCaches
        })
    }
}
</script>
