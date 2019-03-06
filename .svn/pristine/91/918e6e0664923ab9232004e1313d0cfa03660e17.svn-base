<template>
    <div class="logisticsCostEntry">
        <div class="left-section pull-left">
            <div class="add-section">
                <el-dropdown placement="bottom-start" size="small" @command="handleCommand">
                    <el-button class="addButton" style="width: 125px;"><i class="el-icon-plus"></i>新增物流费用
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item class="reset-drop-show" command="2" style="width:120px;">新增物流费用</el-dropdown-item>
                        <el-dropdown-item class="reset-drop-show" command="1" style="width:120px;">导入物流费用</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <!-- <el-menu default-active="1">
                <el-menu-item index="1">
                    <i class="iconfont1 iconquanbu icon-quanbu"></i>
                    <div slot="title" @click="showPurchase('-1','all')" class="menu-btn-space">全部</div>
                </el-menu-item>
                <el-menu-item index="5">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showPurchase('2','approveStatus')" class="menu-btn-space">已保存</div>
                </el-menu-item>
                <div class="divide-line"></div>
                <el-menu-item index="6">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showPurchase('3','approveStatus')" class="menu-btn-space">已记账</div>
                </el-menu-item>
                <div class="divide-line"></div>
                <el-menu-item index="2">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showPurchase('1','status')" class="menu-btn-space">草稿</div>
                </el-menu-item>
                <div class="divide-line"></div>
                <el-menu-item index="3">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showPurchase('2','status')" class="menu-btn-space">审批通过</div>
                </el-menu-item>
            </el-menu> -->
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <logistics-costEntry-list :operationId="operationId" :flag="flagMsg"></logistics-costEntry-list>
            </div>
        </div>
    </div>
</template>

<script>
    import PlatformMixins from '~/mixins/platform'
    import {routesMapping} from '~/router'
    import LogisticsCostEntryList from '~/components/stocks/costManagement/logisticsCostEntryList.vue'
    export default {
        name: 'logisticsCostEntry',
        data(){
            return {
                operationId: 1,  // 传入要搜索的ID，如果是同一个函数通过不同id调取数据的话
                flagMsg: '', // 传入要搜索的类型，如果是根据显示类型获取数据的话
            }
        },
        mixins: [PlatformMixins],
        components: {LogisticsCostEntryList},
        methods: {
            showPurchase(val, type){
                this.type = type;
                this.flagMsg = val;
            },
            onPageRefresh(){
                this.operationId = this.operationId + 1;
            },
            handleCommand(command) {
                if (command == 1) {
                    this.$router.push({name: 'logisticsCostEntryImport'})
                } else if (command == 2) {
                    this.$router.push({name: 'logisticsCostEntryAdd'})
                }
            }
        }
    }
</script>

<style lang="scss">
    .logisticsCostEntry {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        .left-section {
            .add-section {
                text-align: center;
                padding: 20px 0;
                .addButton {
                    padding: 9px 0px;
                    width: 100px;
                    background: #3B8CFF;
                    line-height: 18px;
                    border-radius: 2px;
                    font-size: 12px;
                    color: #FFFFFF;
                    display: flex;
                    border: none;
                    margin: auto;
                    align-items:center;
                    justify-content:center;
                    cursor: pointer;
                    i{
                        margin-right: 4px;
                    }
                }
            }
            .iconquanbu {
                margin-left: 10px;
                margin-right: 5px;
            }
            .el-menu {
                background-color: #E9EEF1;
                .divide-line {
                    margin-left: 20px;
                    width: 120px;
                    border-bottom: 1px solid #DDE2E5;
                }
                .el-menu-item {
                    line-height: 44px;
                    height: 44px;
                    color: #424E67;
                }
                .el-menu-item.is-active {
                    color: #3B8CFF;
                    background-color: #dde2e5;
                }
                .el-menu-item:hover {
                    background-color: #dde2e5;
                }
                .menu-btn-space {
                    display: inline-block;
                    width: 100px;
                    font-size: 12px;
                }
                .menu-icon-place-holder {
                    margin-right: 5px;
                    width: 24px;
                    text-align: center;
                    font-size: 18px;
                    vertical-align: middle;
                    display: inline-block;
                }
                .el-menu-item:nth-child(1) {
                    .menu-btn-space {
                        font-size: 14px;
                    }
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
</style>
