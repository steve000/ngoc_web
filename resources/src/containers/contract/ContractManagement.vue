<template>
    <div class="contractmanagement">
        <div class="left-section pull-left">
            <div class="add-section">
                <el-button type="primary" class="addButton" size="small" icon="iconfont1 icontianjia icon-tianjia"
                           @click="createContract">新增合同
                </el-button>
            </div>
            <el-menu default-active="1">
                <el-menu-item index="1">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showPurchase('-1')"  class="menu-btn-space">全部</div>
                </el-menu-item>
                <el-menu-item index="2">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showPurchase('2')" class="menu-btn-space">未启用</div>
                </el-menu-item>
                <el-menu-item index="3">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showPurchase('1')" class="menu-btn-space">启用中</div>
                </el-menu-item>
                <el-menu-item index="4">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showPurchase('3')" class="menu-btn-space">作废</div>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <purchase-contract-list :operationId="data" :flag="flagMsg"></purchase-contract-list>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import PlatformMixins from '~/mixins/platform'
    import TableHeight from '~/mixins/tableheight';
    import PurchaseContractList from '~/components/contract/PurchaseContractList'
    export default {
        name: "ContractManagement",
        mixins: [PlatformMixins,TableHeight],
        components:{PurchaseContractList},
        data(){
            return {
                flashPage: '',
                flagMsg: '', // 传入要搜索的类型，如果是根据显示类型获取数据的话
                click: 1,
                data:1,
            }
        },
        mounted(){
            this.setTableHeight(200)
        },
        methods: {
            ...mapActions([""]),
            onPageRefresh(){
                 this.data=this.data+1;
            },
            showPurchase(val){
                this.flagMsg=val;
            },
            // handleCommand(command) {
            //     if(command == 1){
            //         this.$router.push(`/contract/AddPurchaseContract`)
            //     }else if(command == 2){
            //         this.$message('暂时不能新增销售合同');
            //     }
            // },
            createContract(){
                this.$router.push(`/contract/AddPurchaseContract`)
            }
        }
    }
</script>

<style lang="scss">
    .contractmanagement{
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        .left-section{
            .add-section {
                text-align:center;
                padding: 20px 0;
                .icontianjia{
                    margin-right: 8px;
                    margin-left: -6px;
                    margin-top: 1px;
                    font-size: 10px;
                    width: 10px;
                    height: 10px;
                }
                .addButton {
                    display: flex;
                    margin: auto;
                    font-size: 14px;
                }
            }
            .iconquanbu{
                margin-left: 10px;
                margin-right: 5px;
            }
            .el-menu{
                background-color: #E9EEF1;
                .el-menu-item{
                    line-height: 44px;
                    height: 44px;
                }
                .el-menu-item.is-active {
                    color:  #3B8CFF;
                    background-color: #dde2e5;
                }
                .el-menu-item:hover{
                    background-color: #dde2e5;
                }
                .menu-btn-space{
                    display: inline-block;
                    width: 100px;
                }
                .menu-icon-place-holder{
                    margin-right: 5px;
                    width: 24px;
                    text-align: center;
                    font-size: 18px;
                    vertical-align: middle;
                    display: inline-block;
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
