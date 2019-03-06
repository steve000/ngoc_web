<template>
    <div class="content-section">
        <div class="left-section pull-left">
            <div class="add-section" style="margin: 0px">
                <el-button type="primary" size="small" @click="createCardType" class="addButton" icon="el-icon-plus" :disabled="false">新增卡券类别</el-button>
            </div>
            <ul class="menu-product">
                <li class="all">
                    <div class="set-border" @click="showPurchase(''); click = '1'" :class="{'isactive': click == '1'}">
                        <i class="iconfont1 icon-quanbu"></i>
                        <span>全部卡券类型</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <CardType-list :operationId="operationId" :flag="flagMsg" @closeEdit="closeEdit" @closeView="closeView"
                               :type="type">
                </CardType-list>
            </div>
        </div>
    </div>
</template>

<script>
    import PlatformMixins from '~/mixins/platform'
    import {routesMapping} from '~/router'
    import CardTypeList from '~/components/goods/card/CardTypeList'//table列表组件
    export default{
        name: "CardType",
        mixins: [PlatformMixins],
        data(){
            return {
                flashPage: '',
                operationId: 1,  // 传入要搜索的ID，如果是同一个函数通过不同id调取数据的话
                flagMsg: '', // 传入要搜索的类型，如果是根据显示类型获取数据的话
                click: 1,
                type: 'all',
            }
        },
        components: {CardTypeList},
        mounted() {
            console.log("cwedcwefwedfwefdwe")
        },
        methods: {
            // viewCardType(){
            //     this.$router.push(`/goods/CardType/ViewCardType`)
            // },
            // 点击新增提示删除 暂时先注释
            // createCardType(){
            //     this.$confirm("确认删除此条卡券类型", "提示", {
            //         confirmButtonText: "确定",
            //         cancelButtonText: "取消",
            //         type: "warning"
            //     }).then(()=>{
            //         this.$router.push(`/goods/cardType/addCardType`)    
            //     })
            //     //console.log('进路由')
            // },
            createCardType(){
                this.$router.push(`/goods/cardType/addCardType`)  
            },
            showPurchase(val, type){
                this.type = type;
                this.flagMsg = val;
            },
            onPageRefresh(){
                this.operationId = this.operationId + 1;
            },
            closeView(){
                const tabView = this.getTabByKey(routesMapping.ViewCardType);
                if (tabView) {
                    this.closeTabByKey(routesMapping.ViewCardType)
                }
            },
            closeEdit(){
                const tabEdit = this.getTabByKey(routesMapping.EditPurchase);
                if (tabEdit) {
                    this.closeTabByKey(routesMapping.EditPurchase)
                }
            }
        }
    }
</script>

<style lang="scss">

.content-section {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .left-section {
        .add-section {
            padding: 10px;
            margin: -80px 0 0;
            .addButton {
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
