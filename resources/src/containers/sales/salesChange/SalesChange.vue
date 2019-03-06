<template>
    <div class="salesModule">
        <div class="left-section pull-left change-order-specail-wrapper">
            <div class="add-section">
                <el-button type="primary" class="addButton" icon="el-icon-plus" @click="createChangeOrder">新增换货单</el-button>
            </div>
            <el-menu unique-opened @open="activeCurrentMenu" @close="activeCurrentMenu" @select="change" :default-openeds="defaultIndex" :active-text-color="activeColor" :class="{'control-submenu-item': isActiveNavmenu}" default-active="1">
                <el-submenu index="31" :class="{'menu-specail-wrapper': isActiveCur === 31}">
                    <template slot="title">
                        <div class="is-active-submenu">
                            <i class="iconfont1 icon-quanbu"></i>
                            <div slot="title" class="menu-btn-space menu-btn-title">普通换货
                            </div>

                        </div>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="`1-${String(item.id + 10)}`" v-for="(item, index) in menuItemData" class="change-order-menu" :key="index">
                            <div slot="title" @click="showPurchase(item.id)" class="menu-btn-space">
                                <label for="">{{item.val}}</label>
                                <label v-for="(countItem, i) in changeOrderCount" :key="i">
                                    <template v-if="countItem.changeStatus === Number(item.id)&&countItem.changeStatus !== 0&&countItem.changeStatus !== 6">
                                        {{countItem.count?`(${countItem.count})`:''}}
                                    </template>
                                </label>
                            </div>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="32" :class="{'menu-specail-wrapper': isActiveCur === 32}">
                    <template slot="title">
                        <div class="is-active-submenu">
                            <i class="iconfont1 icon-daishoudingdan"></i>
                            <div slot="title" class="menu-btn-space menu-btn-title">代售换货
                            </div>
                        </div>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="`3-${String(Number(item.id)+30)}`" v-for="(item, index) in menuItemData2" class="change-order-menu" :key="index">
                            <div slot="title" @click="showPurchase(item.id)" class="menu-btn-space">
                                <label>{{item.val}}</label>
                                <label v-for="(countItem, i) in changeOrderCount" :key="i">
                                    <template v-if="countItem.changeStatus === Number(item.id)&&countItem.changeStatus !== 0&&countItem.changeStatus !== 6">
                                        {{countItem.count?`(${countItem.count})`:''}}
                                    </template>
                                </label>
                            </div>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="33" :class="{'menu-specail-wrapper': isActiveCur === 33}">
                    <template slot="title">
                        <div class="is-active-submenu">
                            <i class="iconfont1 icon-daifadingdan"></i>
                            <div slot="title" class="menu-btn-space menu-btn-title">代发换货
                            </div>
                        </div>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="`2-${String(Number(item.id)+20)}`" v-for="(item, index) in menuItemData2" class="change-order-menu" :key="index">
                            <div slot="title" @click="showPurchase(item.id)" class="menu-btn-space">
                                <label for="">{{item.val}}</label>
                                <label v-for="(countItem, i) in changeOrderCount" :key="i">
                                    <template v-if="countItem.changeStatus === Number(item.id)&&countItem.changeStatus !== 0&&countItem.changeStatus !== 6">
                                        {{countItem.count?`(${countItem.count})`:''}}
                                    </template>
                                </label>
                            </div>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <!-- 异常订单 -->
                <el-submenu index="34" :class="{'menu-specail-wrapper': isActiveCur === 34}">
                    <template slot="title">
                        <div class="is-active-submenu">
                            <i class="iconfont1 icon-yichangdingdan"></i>
                            <div slot="title" class="menu-btn-space menu-btn-title">异常订单
                            </div>
                        </div>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="`4-${String(Number(item.id)+30)}`" v-for="(item, index) in errorOrder" class="change-order-menu" :key="index">
                            <div slot="title" @click="showPurchase(item.id)" class="menu-btn-space">
                                <label>{{item.val}}</label>
                                <label v-for="(countItem, i) in changeOrderCount" :key="i">
                                    <template v-if="countItem.errorType === Number(item.state)">
                                        {{countItem.count?`(${countItem.count})`:''}}
                                    </template>
                                </label>
                            </div>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <ChangeList :flag="flagMsg" :curClickMenu="curClickMenu" @refreshCount="refreshCount"></ChangeList>
            </div>
        </div>

        <!--暂无数据-->
        <!--<el-button @click="createPurchase">新增采购</el-button>-->
        <!--<el-button @click='viewPurchaseOrder'>查看详情</el-button>-->
    </div>
</template>
<script>
import PlatformMixins from '~/mixins/platform'
import ChangeList from '~/components/sales/changeOrder/ChangeList'
import { mapActions } from 'vuex';

export default {
    name: "SalesChange",
    mixins: [PlatformMixins],
    data() {
        return {
            flashPage: '',
            flagMsg: -1, // 传入要搜索的类型，如果是根据显示类型获取数据的话
            menuItemData: [
                { id: '1', val: '未收货' },
                { id: '2', val: '待入库' },
                { id: '3', val: '已入库' },
                { id: '4', val: '待出库' },
                { id: '5', val: '已出库' },
                { id: '6', val: '已完成' },
                { id: '7', val: '转退货' },
                { id: '0', val: '已取消' },
            ],
            menuItemData2: [
                { id: '1', val: '未收货' },
                { id: '6', val: '已完成' },
                { id: '0', val: '已取消' },
            ],
            errorOrder: [
                { id: '21', val: '出库异常', state: 5 },
                { id: '22', val: '入库异常', state: 8 },
                { id: '23', val: '超时未出库', state: 2 },
                { id: '24', val: '超时未送达', state: 3 },
            ],
            // subMenuIndex: -1,
            defaultIndex: ['31'], // 默认打开菜单
            isActiveCur: 31, // 当前打开菜单
            activeColor: '#3B8CFF',//
            isActiveNavmenu: false, // 当点击主菜单时，为true
            changeOrderCount: null,
            curClickMenu: 31,
            isChange: false, // 是否重新获取数据
            // totalCount: null,

        }
    },
    components: { ChangeList },
    mounted() {
        this.getChangeCountWithStatus(31);
    },
    // computed: {
    //     calTotalChangeOrderCount: function () {
    //         let _obj = this.changeOrderCount ? Array.from(this.changeOrderCount) : '';
    //         if (_obj) {
    //             const obj = _obj.filter(val => val.changeStatus !== 0 && val.changeStatus !== 6);
    //             return obj.reduce((preVal, curVal) => { return preVal + curVal.count }, 0);
    //         }

    //     }
    // },
    methods: {
        ...mapActions([
            "queryChangeTypeCount",
        ]),
        createChangeOrder() {
            this.$router.push({ name: 'CreateChangeOrder', params: { orderIdChange: 0 } })
        },
        showPurchase(val) {
            this.flagMsg = Number(val);
        },
        // 激活当前菜单
        activeCurrentMenu(index) {
            this.changeOrderCount = null;
            this.flagMsg = -1;
            this.activeColor = '#737D8F'; // 点击主菜单时子菜单取消高亮
            this.isActiveNavmenu = true; // 清除子菜单选中背景
            this.isActiveCur = Number(index); // 点击主菜单时主菜单高亮
            this.curClickMenu = Number(index);
            this.isChange = !this.isChange;
            this.getChangeCountWithStatus(Number(index));
        },
        change(i) {
            this.isActiveCur = null;
            this.activeColor = '#3B8CFF'; // 点击子菜单时菜单高亮
            this.isActiveNavmenu = false; // 恢复子菜单选中背景
        },
        getChangeCountWithStatus(type) {
            const datas = {};
            switch (type) {
                case 31:
                    datas.changeTypeList = '31,32,33';
                    datas.invType = 1;
                    break;
                case 32:
                    datas.invType = 0;
                    datas.changeTypeList = type;
                    break;
                case 33:
                    datas.invType = 0;
                    datas.changeTypeList = type;
                    break;
                case 34:
                    datas.errorType = 1;
                    break;
            }
            this.queryChangeTypeCount(datas).then((res) => {
                this.changeOrderCount = res;
            });
        },
        refreshCount() {
            this.getChangeCountWithStatus(this.curClickMenu);
        },
    }
}
</script>
