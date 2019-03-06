<template>
    <div class="goods-config-wrapper">
    <bread-crumb></bread-crumb>
        <div class='good-config-sidebar'>
            <el-menu router
                :default-active="activeIndex" class="nav-vertical-menu">
            <el-menu-item index="/goods/config/category">类目管理</el-menu-item>
            <el-menu-item index="/goods/config/rules">规格管理</el-menu-item>
            <el-menu-item index="/goods/config/property">属性管理</el-menu-item>
            <el-menu-item index="/goods/config/bands">品牌管理</el-menu-item>
            <el-menu-item index="/goods/config/units">计量单位管理</el-menu-item>
        </el-menu>
        </div>
        <div class='goods-config-content'>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import BreadCrumb from '~/components/BreadCrumb'

export default {
    name: 'GoodsConfigIndex',
    components: {
        BreadCrumb
    },

    computed: {
        activeIndex() {
            const {meta} = this.$route
            if(meta.prePath) {
                return meta.prePath
            }
            return this.$route.path
        }
    }
}
</script>

<style lang='scss'>
    @import '../../layouts/css/index.scss';
    .goods-config-wrapper {
        height: 100%;
        margin: -15px;
        .good-config-sidebar {
            height: 100%;
            float: left;
            float: left;
            width:8%;
            position:fixed;
            z-index:99;
            margin-top: 43px;
            background-color: #fff;
            border-right: solid 1px #e6e6e6;
            .nav-vertical-menu{
                border-right: none;

                .el-menu-item{
                    &.is-active{
                        border-left: 2px solid $primary-color;
                    }
                }
            }
        }

        .goods-config-content {
            overflow: hidden;
            padding: 50px 20px 20px 125px;
        }
    }
</style>
