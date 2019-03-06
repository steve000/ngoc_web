<template>
    <div class="InventoryCheck">
        <div class="left-section pull-left">
             <div class="top-section">
                <div class="menu-item" :class="{'isactive': click == 1}" @click="showStorage('all','all'); click = 1"><div class="set-border">全部</div></div>
            </div>
            <div class="menu">
                <div  v-for="(one, index) in storehouseList" class="menu-item" :class="{'isactive': click == index + 2}" @click="showStorage(one.storehouseId,one.storehouseName); click = index + 2" >
                    <div class="set-border row-show" :title="one.storehouseName">{{ one.storehouseName }}</div>
                </div>
            </div>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <inventory-check-list :operationId="data" :flag="flagMsg" :houseName="storehouseName" ></inventory-check-list>
            </div>
        </div>
    </div>
</template>
<script>
import PlatformMixins from '~/mixins/platform'
import InventoryCheckList from '~/components/stocks/pandian/InventoryCheckList'
import {mapActions, mapState} from 'vuex'
export default{
    name: "InventoryCheck",
    mixins: [PlatformMixins],
    components: {InventoryCheckList},
    data(){
        return {
            flashPage: '',
            data: '',  // 传入要搜索的ID，如果是同一个函数通过不同id调取数据的话
            flagMsg: '', // 传入要搜索的类型，如果是根据显示类型获取数据的话
            click: 1,
            pageType:2,
            storehouseList: [],
            storehouseName:'',
        }
    },
    mounted(){
        this.getStorehouseListFun()
    },
    methods: {
        ...mapActions(["getStorehouseList", "showPageLoading","hidePageLoading"]),
        showStorage(storehouseId,storehouseName){
            this.flagMsg = storehouseId + '';
            console.log(this.flagMsg)
            this.storehouseName = storehouseName
        },
        getStorehouseListFun(){
            let parms = {
                pageType:this.pageType,
                storehouseStatus:[0,1,3]
            }
            this.getStorehouseList(parms).then((resp)=>{
              this.storehouseList = resp.result;
            })
        },
    }
}
</script>
<style lang="scss">
.InventoryCheck{
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
        }
        .menu{
            height: 100%;
            width: 100%;
            overflow: scroll;
        }
        .menu-item{
            display: block;
            box-sizing: border-box;
            padding: 6px 0;
            border-bottom: 1px solid #eee;
            height: 45px;
            cursor: pointer;
        }
        .isactive .set-border{
            border-left: 4px solid #409eff;
            color: #409eff;
        }
        .menu-item:hover{
            background-color: #ecf5ff;
        }
        .set-border{
            width: 100%;
            height: 100%;
            padding-left: 20px;
            padding-top: 6px;
            padding-bottom: 6px;
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

