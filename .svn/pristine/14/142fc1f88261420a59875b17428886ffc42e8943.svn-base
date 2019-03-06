<template>
    <div class="inventory_management">
        <div class="left-section pull-left" style="display: flex;flex-direction: column">
            <ul style="overflow: auto">
                <li class="allStockStyle" @click="clickId = '';clickIndex='-1';storehouseType = 0;storehouseChildType = 0" :class="{active: clickId == ''}" icon="el-icon-plus" style="color: #424e67">
                        <i class="iconfont1 iconquanbu icon-quanbu fs14"></i>
                        全部仓库
                    </li>
                <div v-for="(item,index) in storehouseListQuery" :key="index" >
                    <li @click="clickStock(index);storehouseType = '';storehouseChildType = ''" :title="item.name"
                        class="stock-item item-title-row">
                        <div class="positionIcon" :class="{ 'isOpenPositionIcon': !indexStatus[index]}"></div>
                        <span style="display: inline-block">{{item.name}}</span>
                    </li>
                    <div v-if="indexStatus[index]" class="item-row">
                        <div v-for="(one,oneIndex) in item.stockList" >
                            <li v-if="one.storehouseType !== 3" :title="one.storehouseName" :key="one.storehouseId"  class="stock-item row-show paddingRight5"
                            @click="clickIndex=index;clickId = one.storehouseId;storehouseType = one.storehouseType;storehouseChildType = one.storehouseChildType"
                            :class="{active: clickId == one.storehouseId}">{{one.storehouseName}}</li>
                            <li v-if="one.storehouseType === 3" :title="one.storehouseName" :key="one.storehouseId"  class="stock-item row-show paddingRight5"
                            @click="clickIndex=index;clickId = one.proxyStorehouseId;storehouseType = one.storehouseType;storehouseChildType = one.storehouseChildType"
                            :class="{active: clickId == one.proxyStorehouseId}">{{one.storehouseName}}</li>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
        <div class="main-section">
            <template>
                <inventory-list :flag="'' + clickId" :stockType="''+clickIndex" :storehouseType="''+storehouseType" :storehouseChildType ="''+storehouseChildType"></inventory-list>
            </template>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import PlatformMixins from '~/mixins/platform'
    import TableHeight from '~/mixins/tableheight';
    import InventoryList from '~/components/stocks/manage/InventoryList'
    export default{
        components: {InventoryList},
        name: "InventoryManagement",
        mixins: [PlatformMixins, TableHeight],
        data(){
            return {
                clickIndex: 0,
                indexStatus: [],
                clickId: '',
                storehouseListQuery: [],
                id: '',
                mycomponent: '',
                storehouseType:'',
                storehouseChildType:'',
            }
        },
        mounted(){
            this.StockManageLeftNave().then(resp =>{
                resp.typeList.forEach(one => {
                    let typeName = ''
                    let id = ''
                    if (one.typeValue == 1) {
                        typeName = "本地"
                        id = 'a'
                    } else {
                        typeName = "中移物流"
                        id = 'c'
                    }
                    one.childTypeList.forEach(item => {
                        let childTypeName = ''
                        if (item.childTypeValue == 1) {
                            childTypeName = "普通仓"
                         } else {
                            childTypeName = "不良品仓"
                            id = (id == 'a' ? 'b' : 'd');
                        }
                        let name = typeName + childTypeName;
                        this.storehouseListQuery.push({name: name, id: id, stockList: item.storehouseList})
                    })
                })
                this.storehouseListQuery.push({
                    name: "代发仓", id: 'e', stockList: resp.proxy
                })
                let length = this.storehouseListQuery.length
                for (let num = 0; num < length; num++) {
                    this.indexStatus.push(0)
                }
            })
        },
        methods: {
            ...mapActions(["getStorehouseList", "getStorehouseListQuery","StockManageLeftNave"]),
            clickStock(index){
                this.$set(this.indexStatus, index, !this.indexStatus[index])
            },
        }
    }
</script>

<style lang="scss">
    .inventory_management {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        .paddingRight5{
            padding-right:5px;
        }
        .allStockStyle{
            text-align: left; padding-left: 20px;font-size: 14px;line-height:44px;margin-top:10px;
        }
        .left-section {
            .top-section {
                width: 100%;
                padding: 20px;
                text-align: center;
                .icontianjia {
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
        }
        .table-wrapper {
            padding: 20px 20px 0 20px;
            width: 100%;
            overflow-y: hidden;
            .pagination-section {
                padding: 20px 0;
                text-align: right;
                right: 20px;
            }
        }

        @mixin text-overflow-show {
            word-break: keep-all;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .stock-item {
            padding-left: 40px;
            font-size: 12px;
            @include text-overflow-show;
            height: 36px;
            line-height: 36px;
            cursor: pointer;
            color: #757f91;
        }
        .text-center {
            text-align: center;
            cursor: pointer;
            font-size: 12px;
            padding: 0px;
        }
        .item-title-row {
            position: relative;
            padding-left: 30px;
            @include text-overflow-show;
            cursor: pointer;
            height: 36px;
            line-height: 36px;
            font-size: 12px;
            color: #424e67;
            .positionIcon {
                position: absolute;
                left: 12px;
                color: #B3BBCD;
                top: 14px;
                width: 0px;
                height: 0px;
                border-width: 0px 0px 8px 8px;
                border-style: solid;
                border-color: #B3BBCD transparent #B3BBCD transparent;
            }
            .isOpenPositionIcon {
                transform: rotate(-45deg);
                -ms-transform: rotate(-45deg); /* IE 9 */
                -moz-transform: rotate(-45deg); /* Firefox */
                -webkit-transform: rotate(-45deg); /* Safari 和 Chrome */
                -o-transform: rotate(-45deg); /* Opera */
            }
        }
        ul li:hover{
            background-color: #DDE2E5;
        }
        .item-row {
            text-align: left;
        }
        .allStockStyle.active,  .stock-item.active {
            background-color: #DDE2E5;
            color:#3B8CFF !important;
        }
    }
</style>
