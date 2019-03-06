<template>

    <div class="storage-management">
        <div class="left-section pull-left left-menu">
            <div class="add-section">
                <button @click="addStorage" class="add-button"><i class="iconfont1 icon-tianjia"></i>创建入库单</button>
                <!--<el-button type="primary"  icon="el-icon-plus"></el-button>-->
            </div>
            <el-menu default-active="1">
                <el-menu-item index="1">
                    <i class="iconfont1 iconquanbu icon-quanbu"></i>
                    <div slot="title" @click="showStorage('')" class="menu-btn-space">全部</div>
                </el-menu-item>
                <el-menu-item index="2">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showStorage('1')" class="menu-btn-space">采购入库</div>
                </el-menu-item>
                <el-menu-item index="3">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showStorage('2')" class="menu-btn-space">后台入库</div>
                </el-menu-item>
                <!--<el-menu-item index="5">-->
                    <!--<div class="menu-icon-place-holder"></div>-->
                    <!--<div slot="title" @click="showStorage('3')" class="menu-btn-space">调拨入库</div>-->
                <!--</el-menu-item>-->
                <el-menu-item index="4">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showStorage('4')" class="menu-btn-space">销售退货</div>
                </el-menu-item>
                <el-menu-item index="6">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showStorage('6')" class="menu-btn-space">销售换货</div>
                </el-menu-item>
                <el-menu-item index="7">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showStorage('5')" class="menu-btn-space">拒收入库</div>
                </el-menu-item>
                <el-menu-item index="8">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showStorage('7')" class="menu-btn-space">销售代发入库</div>
                </el-menu-item>
                <el-menu-item index="9">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showStorage('8')" class="menu-btn-space">出库撤销入库</div>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <storage-list :operationId="operationId" :flag="flagMsg"></storage-list>
            </div>
        </div>
    </div>
</template>

<script>
    import PlatformMixins from '~/mixins/platform'
    import StorageList from '~/components/stocks/storage/StorageList'

    export default{
        name: "StorageManagement",
        mixins: [PlatformMixins],
        components: {StorageList},
        data(){
            return {
                flashPage: '',
                operationId: 1,  // 传入要搜索的ID，如果是同一个函数通过不同id调取数据的话
                flagMsg: '', // 传入要搜索的类型，如果是根据显示类型获取数据的话
                click: 1,
            }
        },

        computed: {
        },
        methods: {
            addStorage(){
                this.$router.push('/stock/storage/createStorage')
            },
            onPageRefresh(){
                this.operationId=this.operationId+1;
            },
            showStorage(code){
                this.flagMsg = code;
            },
        }
    }
</script>

<style lang="scss">
    .storage-management {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }
</style>
