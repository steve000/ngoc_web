<template>
<div class="stock-transfer">
     <div class="left-section pull-left">
        <div class="top-section">
            <el-button type="primary" @click="applyTransfer" class="apply" size="small">申请调拨</el-button>
            <div class="menu-item" :class="{'isactive': click == 1}" @click="showStorage(''); click = 1"><div class="set-border">全部</div></div>
        </div>
        <div class="menu">
            <div v-for="(one, index) in storehouseList" class="menu-item" :class="{'isactive': click == index + 2}" @click="showStorage(one.stockId);
             click = index + 2"><div class="set-border row-show" :title="one.stockName">{{one.stockName}}</div></div>
        </div>
    </div>
    <div class="main-section">
        <div class="main-wrapper">
           <transfer-list :operationId="id" :flag="flagMsg" @freshTransfer="freshTransferPage"></transfer-list>
        </div>
    </div>
</div>
</template>

<script>
import {mapActions} from 'vuex'
import TransferList from '~/components/stocks/transfer/TransferList'
import PlatformMixins from '~/mixins/platform'
import {routesMapping} from '~/router'
export default{
    name: "StockTransfer",
    mixins: [PlatformMixins],
    components: { TransferList },
    data(){
        return {
            click: 1,
            storehouseList: [],
            pageNo: 1,
            pageSize: 10,
            totalCount: 100,
            id: '',
            flagMsg: '',
        }
    },
    mounted(){
        this.refreshPage();
    },

    methods: {
        ...mapActions(["getStorehouseList","getTransferList"]),
        onPageRefresh(){
            this.refreshPage()
        },
        refreshPage(){
            this.getStorehouseList({pageType: 2, storehouseStatus: [0,3]}).then( resp => {
                this.storehouseList = resp.result
                this.flagMsg = '';
                this.id = (new Date()).toString()
            })
        },
        applyTransfer(){
            this.$router.push('/stock/transfer/apply')
        },
        showStorage(stockId){
            this.flagMsg = stockId + ''
        //    this.id = (new Date()).toString()
        },
        freshTransferPage(){
            //刷新入库管理和出库管理列表页面
            const tabIns = this.getTabByKey('StorageManagement');
            if(tabIns){
                this.refreshTab(tabIns)
            }
            const tabOuts = this.getTabByKey(routesMapping.OutboundManagement);
            if(tabOuts){
                this.refreshTab(tabOuts)
            }
        }
    }
}
</script>

<style lang="scss">
.stock-transfer{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    .left-section {
        position: absolute;
        z-index: 100;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .top-section{
            width: 100%;
            background-color: #E9EEF1;
            padding: 20px 0 0 0;
            .apply{
                display: flex;
                margin: auto;
                margin-bottom: 10px;
            }
        }

        .menu{
            height: 100%;
            overflow-x: hidden;
            overflow-y: scroll;
        }

        .menu-item{
            display: block;
            box-sizing: border-box;
            padding: 6px 0;
            border-bottom: 1px solid #eee;
            height: 45px;
            cursor: pointer;
            font-size: 14px;
        }
        .submenu{
            display: none;
        }
        .submenu .menu-item .set-border{
            padding-left: 40px;
        }
        .isopen{
            display: block;
        }
        .isactive .set-border{
            border-left: 4px solid #3B8CFF;
            color: #3B8CFF;
        }
        .menu-item:hover{
        //    background-color: #ecf5ff;
            background-color: #dde2e5;
        }
        .set-border{
            width: 100%;
            height: 100%;
            padding-left: 20px;
            line-height: 32px;
        }

    }
    .main-section {
        .main-wrapper{
            .block-color{
                width: 100%;
                height: 100%;
                background-color: #fff;
                position: relative;
            }
        }
    }
}
</style>
