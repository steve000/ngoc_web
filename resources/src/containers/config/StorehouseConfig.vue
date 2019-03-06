<template>
    <div class="storehouseconfig">
        <div class="left-section" style="display: flex;flex-direction: column">
            <div class="add-section">
                <el-dropdown placement="bottom-start" size="small" @command="handleCommand">
                    <el-button type="primary" size="small" class="add-button"
                               icon="iconfont1 icontianjia icon-tianjia">新增仓库
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <!-- <el-dropdown-item class="reset-drop-show" command="2">中移物流仓</el-dropdown-item> -->
                        <el-dropdown-item class="reset-drop-show" command="1">本地仓</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <ul style="overflow-y: auto">
                <li style="text-align: left; padding-left: 20px;font-size: 14px; color:#424e67;" class="stock-item" @click="clickId = ''" :class="{active: clickId == ''}">
                    <i class="iconfont1 iconquanbu icon-quanbu fs14"></i>
                    全部仓库
                </li>
                <div v-for="(item,index) in storehouseListQuery" :key="index">
                    <li @click="clickStock(index);clickId = item.id" :title="item.name"
                        class="stock-item item-title-row"
                        :class="{active: clickId == item.id}">
                        <div class="positionIcon" :class="{ 'isOpenPositionIcon': !indexStatus[index]}"></div>
                        <span style="display: inline-block">{{item.name}}</span>
                    </li>
                    <div v-if="indexStatus[index]" class="item-row">
                        <li v-for="one in item.stockList" :title="one.storehouseName" :key="one.storehouseId"
                            class="stock-item"
                            @click="clickId = one.storehouseId"
                            :class="{active: clickId == one.storehouseId}">
                            {{one.storehouseName}}
                        </li>
                    </div>
                </div>
            </ul>
        </div>
        <div class="main-section">
            <template v-if="!clickId || clickId == 'a' || clickId == 'b' || clickId == 'c' || clickId == 'd'">
                <storehouse-list :flag="clickId" :operationId="id" @freshPage="onPageRefresh"></storehouse-list>
            </template>
            <template v-if="clickId && clickId != 'a' && clickId != 'b' && clickId != 'c' && clickId != 'd'">
                <view-storehouse :flag="'' + clickId"></view-storehouse>
            </template>
        </div>

    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import PlatformMixins from '~/mixins/platform'
    import TableHeight from '~/mixins/tableheight';
    import MoreOperating from '~/components/common/MoreOperating';
    import StorehouseList from '~/components/config/StorehouseList';
    import ViewStorehouse from '~/components/config/viewStorehouse';
    export default{
        components: {MoreOperating, StorehouseList, ViewStorehouse},
        name: "StorehouseConfig",
        mixins: [PlatformMixins, TableHeight],
        data(){
            return {
                clickIndex: 0,
                indexStatus: [],
                clickId: '',
                storehouseListQuery: [],
                id: '',
            }
        },
        component: {MoreOperating},
        mounted(){
            this.refreshPage()
        },
        methods: {
            ...mapActions(["getStorehouseList", "getStorehouseListQuery"]),
            onPageRefresh(){
                this.refreshPage();
                this.id = (new Date()).toString()
            },
            clickStock(index){
                this.clickIndex = index;
                this.$set(this.indexStatus, index, !this.indexStatus[index])
            },
            refreshPage(){
                this.getStorehouseListQuery().then(resp => {
                    this.storehouseListQuery.splice(0,this.storehouseListQuery.length)
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
                        let res = []
                        one.childTypeList.forEach(item => {
                            let childTypeName = ''
                            if (item.childTypeValue == 1) {
                                childTypeName = "普通仓"
                            } else {
                                childTypeName = "不良品仓"
                                id = (id == 'a' ? 'b' : 'd');
                            }
                            let name = typeName + childTypeName;
                            res.push({name: name, id: id, stockList: item.storehouseList})
                        })
                        if(id < 'c'){ // res里是本地，storehouseListQuery是空或中移物流，
                            this.storehouseListQuery = this.storehouseListQuery.concat(res)
                        }else{        // res里是中移物流，storehouseListQuery是空或本地，
                            this.storehouseListQuery = res.concat(this.storehouseListQuery)
                        }
                    })
                    let length = this.storehouseListQuery.length
                    for (let num = 0; num < length; num++) {
                        this.indexStatus.push(0)
                    }
                })
            },
            handleCommand(command) {
                if (command == 1) {
                    this.$router.push({name: 'CreateStorehouse', params: {type: 1}})
                } else if (command == 2) {
                    this.$router.push({name: 'CreateStorehouse', params: {type: 2}})
                }
            }
        }
    }
</script>

<style lang="scss">
    .storehouseconfig {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;

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
            color: #757f91;
            cursor: pointer;
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
        .stock-item.active {
            background-color: #DDE2E5;
            color: #3b8cff !important;
        }
    }
    .iconquanbu {
         margin-left: 10px;
         margin-right: 5px;
        font-size: 14px;
     }
</style>
