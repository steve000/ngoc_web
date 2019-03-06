<template>
    <div class="procurements-config-wrapper">
    <bread-crumb></bread-crumb>
        <div class='procurements-config-sidebar'>
            <el-menu router
                :default-active="activeIndex" class="nav-vertical-menu">
            <el-menu-item index="/procurements/config/category">类目管理</el-menu-item>
            <el-menu-item index="/procurements/config/rules">规格管理</el-menu-item>

        </el-menu>
        </div>
        <div class='procurements-config-content'>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import BreadCrumb from '~/components/BreadCrumb'

export default {
    name: 'procurementsConfigIndex',
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
    .procurements-config-wrapper {
        height: 100%;
        overflow: hidden;
        margin: -15px;
        .procurements-config-sidebar {
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

        .procurements-config-content {
            overflow: hidden;
            padding: 50px 20px 20px 125px;
        }
    }
</style>
