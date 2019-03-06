<template>
    <div class="authority-config-wrapper">
    <bread-crumb></bread-crumb>
        <div class='authority-config-sidebar'>
            <el-menu router
                :default-active="activeIndex" class="nav-vertical-menu">
            <el-menu-item index="/authority/users">用户管理</el-menu-item>
            <el-menu-item index="/authority/roles">角色管理</el-menu-item>
            <el-menu-item index="/authority/privilege">权限管理</el-menu-item>
            <el-menu-item index="/authority/settings">系统配置</el-menu-item>
        </el-menu>
        </div>
        <div class='authority-config-content'>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import BreadCrumb from '~/components/BreadCrumb'

export default {
    name: 'AuthorityIndex',
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
    .authority-config-wrapper {

        overflow: hidden;
        margin: -15px;

        .authority-config-sidebar {
            height: 100%;
            float: left;
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

        .authority-config-content {
            overflow: hidden;
            padding: 50px 20px 20px 125px;
        }
    }
</style>
