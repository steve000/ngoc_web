<template>
    <div class="purchase">
        <div class="left-section pull-left">
            <div class="add-section">
                <button @click="createPurchase" class="addButton"><i class="el-icon-plus"></i>新增费用结算</button>
            </div>
            <el-menu default-active="1">
                <el-menu-item index="1">
                    <i class="iconfont1 iconquanbu icon-quanbu"></i>
                    <div slot="title" @click="showPurchase('-1')" class="menu-btn-space">全部费用结算</div>
                </el-menu-item>
                <el-menu-item index="2">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showPurchase('1')" class="menu-btn-space">已保存</div>
                </el-menu-item>
                <el-menu-item index="3">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showPurchase('2')" class="menu-btn-space">已记账</div>
                </el-menu-item>
                <!-- <div class="divide-line"></div> -->
                <el-menu-item index="4">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showPurchase('3')" class="menu-btn-space">草稿</div>
                </el-menu-item>
                <el-menu-item index="5">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showPurchase('4')" class="menu-btn-space">审批通过</div>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <purchase-list :operationId="operationId" :flag="flagMsg"></purchase-list>
            </div>
        </div>
    </div>
</template>

<script>
    import PlatformMixins from '~/mixins/platform'
    import {routesMapping} from '~/router'
    import PurchaseList from '~/components/stocks/feeCompute/feeComputeList'
    export default {
        name: "feeCompute",
        mixins: [PlatformMixins],
        data(){
            return {
                operationId: 1,  // 传入要搜索的ID，如果是同一个函数通过不同id调取数据的话
                flagMsg: '', // 传入要搜索的类型，如果是根据显示类型获取数据的话
            }
        },
        components: {PurchaseList},
        methods: {
            createPurchase(){
                this.$router.push(`/stock/feeComputeAdd`)
            },
            showPurchase(val, type){
                this.type = type;
                this.flagMsg = val;
            },
            onPageRefresh(){
                this.operationId = this.operationId + 1;
            },
        }
    }
</script>

<style lang="scss">
    .purchase {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        .left-section {
            .add-section {
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
