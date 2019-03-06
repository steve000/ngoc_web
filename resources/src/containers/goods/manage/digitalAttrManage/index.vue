<template>
    <div class="content-section">
        <div class="left-section pull-left">
            <div class="add-section" style="margin: 0px">
                <el-button type="primary" size="small" @click="$router.push({path: `/goods/manage/digitalAttrAdd`})" class="adddigitalAttr" icon="el-icon-plus" :disabled="false">新增数字属性</el-button>
            </div>
            <ul class="menu-product">
                <li class="all">
                    <div class="set-border" @click="showGoods(''); click = '1'" :class="{'isactive': click == '1'}">
                        <i class="iconfont1 icon-quanbu"></i>
                        <span>全部数字属性</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <digitalAttr-list :operationId="operationId" :flag="flagMsg" @closeEdit="closeEdit"></digitalAttr-list>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import digitalAttrList from '~/components/goods/manage/DigitalAttrList'
import PlatformMixins from '~/mixins/platform'
import Bus from '~/utils/bus'
export default {
    name: "GoodsDigitalAttrManage",
    components: {
        digitalAttrList
    },
    mixins: [PlatformMixins],
    data() {
        return {
            flashPage: '',
            operationId: 1,  // 传入要搜索的ID，如果是同一个函数通过不同id调取数据的话
            flagMsg: '', // 传入要搜索的类型，如果是根据显示类型获取数据的话
            click: "1"
        }
    },
    computed: {

    },
    mounted() {
        this.showGoods('');
    },
    methods: {
        showGoods() {
            this.operationId = this.operationId + 1;
        },
        yanShenClick() {
            this.isclick = true;
        },
        onPageRefresh() {
            // this.operationId = this.operationId + 1;
            this.operationId = this.operationId + 1;
            // this.flagMsg = "商品数字属性list修改"
        },
        closeEdit() {
            const tabEdit = this.getTabByKey(routesMapping.GoodsDigitalAttrEdit);
            if (tabEdit) {
                this.closeTabByKey(routesMapping.GoodsDigitalAttrEdit)
            }
        }
    }
}
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
        .el-menu-item-group>ul {
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
