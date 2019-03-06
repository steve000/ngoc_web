<template>
    <div class="salesModule">
        <div class="left-section pull-left">
            <div class="add-section">
                <el-button type="primary" class="addButton" icon="el-icon-plus" @click="createPurchase">新增退货单</el-button>
            </div>
            <el-menu unique-opened @open="openMenu" @close="closeMenu" @select="change" :default-openeds="defaultIndex" :active-text-color="activeColor" :class="{'control-submenu-item': isActiveNavmenu}">
                <el-submenu index="21" :class="{'menu-specail-wrapper': isActiveCur === 21}">
                    <template slot="title">
                        <div class="is-active-submenu">
                            <i class="iconfont1 icon-quanbu"></i>
                            <div slot="title" class="menu-btn-space menu-btn-title">普通退货
                                <!-- <span v-if="isActiveCur===21">{{calTotalReturnOrderCount!=0&&calTotalReturnOrderCount!=undefined?`(${calTotalReturnOrderCount})`:''}}</span> -->
                            </div>
                        </div>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="item.id" v-for="(item, index) in menuLevel1" class="change-order-menu" :key="index">
                            <div slot="title" @click="showPurchase(item.id)" class="menu-btn-space">{{item.val}}
                                <!-- <span v-if="typeof menuItem1[index] === 'number'">({{ menuItem1[index] ? menuItem1[index] : 0 }})</span> -->
                                <span v-for="(countItem, i) in returnOrderCount" :key="i">
                                    <template v-if="countItem.returnStatus === Number(item.state) && [0,3].indexOf(item.state)==-1">
                                        {{countItem.count?`(${countItem.count})`:''}}
                                    </template>
                                </span>
                            </div>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="22" :class="{'menu-specail-wrapper': isActiveCur === 22}">
                    <template slot="title">
                        <div class="is-active-submenu">
                            <i class="iconfont1 icon-daishoudingdan"></i>
                            <div slot="title" class="menu-btn-space menu-btn-title">代售退货
                                <!-- <span v-if="isActiveCur===22">{{calTotalReturnOrderCount!=0&&calTotalReturnOrderCount!=undefined?`(${calTotalReturnOrderCount})`:''}}</span> -->
                            </div>
                        </div>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="item.id" v-for="(item, index) in menuLevel2" class="change-order-menu" :key="index">
                            <div slot="title" @click="showPurchase(item.id)" class="menu-btn-space">{{item.val}}
                                <!-- <span v-if="typeof menuItem2[index] === 'number'">({{ menuItem2[index] ? menuItem2[index] : 0 }})</span> -->
                                <span v-for="(countItem, i) in returnOrderCount" :key="i">
                                    <template v-if="countItem.returnStatus === Number(item.state) && [0,3].indexOf(item.state)==-1">
                                        {{countItem.count?`(${countItem.count})`:''}}
                                    </template>
                                </span>
                            </div>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="23" :class="{'menu-specail-wrapper': isActiveCur === 23}">
                    <template slot="title">
                        <div class="is-active-submenu">
                            <i class="iconfont1 icon-daifadingdan"></i>
                            <div slot="title" class="menu-btn-space menu-btn-title">代发退货
                                <!-- <span v-if="isActiveCur===23">{{calTotalReturnOrderCount!=0&&calTotalReturnOrderCount!=undefined?`(${calTotalReturnOrderCount})`:''}}</span> -->
                            </div>
                        </div>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="item.id" v-for="(item, index) in menuLevel3" class="change-order-menu" :key="index">
                            <div slot="title" @click="showPurchase(item.id)" class="menu-btn-space">{{item.val}}
                                <!-- <span v-if="typeof menuItem3[index] === 'number'">({{ menuItem3[index] ? menuItem3[index] : 0 }})</span> -->
                                <span v-for="(countItem, i) in returnOrderCount" :key="i">
                                    <template v-if="countItem.returnStatus === Number(item.state) && [0,3].indexOf(item.state)==-1">
                                        {{countItem.count?`(${countItem.count})`:''}}
                                    </template>
                                </span>
                            </div>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <!-- 异常订单 -->
                <el-submenu index="24" :class="{'menu-specail-wrapper': isActiveCur === 24}">
                    <template slot="title">
                        <div class="is-active-submenu">
                            <i class="iconfont1 icon-yichangdingdan"></i>
                            <div slot="title" class="menu-btn-space menu-btn-title">异常订单
                            </div>
                        </div>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="item.id" v-for="(item, index) in menuLevel4" class="change-order-menu" :key="index">
                            <div slot="title" @click="showPurchase(item.id)" class="menu-btn-space">
                                <label>{{item.val}}</label>
                                <label>
                                    <!-- <label v-if="countItem.errorType === Number(item.state)"> -->
                                    {{returnOrderCount?`(${returnOrderCount[0].count})`:''}}
                                    <!-- </label> -->
                                </label>
                            </div>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <return-list @refreshOrderCount="refreshOrderCount" :operationId="operationId" :flag="flagMsg"></return-list>
            </div>
        </div>
    </div>
</template>
<script>
import PlatformMixins from "~/mixins/platform";
import { routesMapping } from "~/router";
import ReturnList from "~/components/sales/salesReturn/ReturnList";
import { mapActions } from "vuex";
export default {
    name: "SalesReturn",
    mixins: [PlatformMixins],
    data() {
        return {
            flashPage: "",
            operationId: 1, // 传入要搜索的ID，如果是同一个函数通过不同id调取数据的话
            flagMsg: "", // 传入要搜索的类型，如果是根据显示类型获取数据的话
            click: 1,
            defaultIndex: ["21"],
            isActiveCur: 21, // 当前打开菜单
            activeColor: "#3B8CFF", // #3B8CFF
            isActiveNavmenu: false, // 当点击主菜单时，为true
            // menuItem1: [],
            // menuItem2: [],
            // menuItem3: [],
            returnOrderCount: null, // 订单数量
            menuLevel1: [
                { val: "未收货", id: "21-1", state: 1 },
                { val: "待入库", id: "21-2", state: 2 },
                { val: "已完成", id: "21-3", state: 3 },
                { val: "已取消", id: "21-0", state: 0 }
            ],
            menuLevel2: [
                { val: "未收货", id: "22-1", state: 1 },
                // { val: "待入库", id: "22-2", state: 2 },
                { val: "已完成", id: "22-3", state: 3 },
                { val: "已取消", id: "22-0", state: 0 }
            ],
            menuLevel3: [
                { val: "未收货", id: "23-1", state: 1 },
                // { val: "待入库", id: "23-2", state: 2 },
                { val: "已完成", id: "23-3", state: 3 },
                { val: "已取消", id: "23-0", state: 0 }
            ],
            menuLevel4: [
                { val: "入库异常", id: "24-8", state: 8 },
            ]
        };
    },
    components: { ReturnList },
    methods: {
        ...mapActions(["queryReturnOrderCountAction"]),
        closeMenu(index, indexPath) {
            this.flagMsg = `${index}`;
            this.activeCurrentMenu(index);
        },
        openMenu(index, indexPath) {
            this.flagMsg = `${index}`;
            this.activeCurrentMenu(index);
        },
        viewPurchaseOrder() {
            this.$router.push(`/purchase/ViewPurchaseOrder`);
        },
        createPurchase() {
            this.$router.push({
                name: "CreateReturnOrder",
                params: { orderId: 0 }
            });
        },
        showPurchase(val) {
            this.flagMsg = val;
        },
        onPageRefresh() {
            this.operationId = this.operationId + 1;
            this.refreshOrderCount();
        },
        refreshOrderCount() {
            this.getReturnCountWithStatus(this.sunMenuIndex ? this.sunMenuIndex : [21, 22, 23]);
        },
        currentOpenMenu(key) {
            this.showPurchase(key);
        },
        change(i) {
            this.isActiveCur = null;
            this.activeColor = "#3B8CFF"; // 点击子菜单时菜单高亮
            this.isActiveNavmenu = false; // 恢复子菜单选中背景
        },
        activeCurrentMenu(index) {
            this.activeColor = "#737D8F"; // 点击主菜单时子菜单取消高亮
            this.isActiveNavmenu = true; // 清除子菜单选中背景
            this.isActiveCur = Number(index); // 点击主菜单时主菜单高亮
            let arrReturnType = [];
            switch (parseInt(index)) {
                case 21:
                    arrReturnType = [21, 22, 23]
                    break;
                case 22:
                    arrReturnType = [22]
                    break;
                case 23:
                    arrReturnType = [23]
                    break;
                default:
                    arrReturnType = [24]
                    break;
            }
            this.sunMenuIndex = arrReturnType;
            this.getReturnCountWithStatus(arrReturnType);
        },
        // 获取列表数量
        getReturnCountWithStatus(type) {
            this.returnOrderCount = null;
            const datas = {};
            if (type.indexOf(24) != 0) {
                datas.returnType = type;
                if (type.length > 1) {
                    datas.invType = 1
                } else {
                    datas.invType = 0
                }
            } else {
                datas.errorType = 8;
            }
            this.queryReturnOrderCountAction(datas).then(res => {
                this.returnOrderCount = res.length >= 1 ? res : 0;
            });
        }
    },
    mounted() {
        this.getReturnCountWithStatus([21, 22, 23]);
    },
};
</script>
