<template>
    <div class="outbound-management">
        <div class="left-section pull-left">
            <div class="add-section">
                <el-button size="small" type="primary" @click="addStorage" class="addstorage" icon="iconfont1 icontianjia icon-tianjia">创建出库单</el-button>
            </div>
            <ul class="menu">
                <li class="menu-item" :class="{'isactive': click == 1}" @click="showStorage(''); click = 1">
                    <div class="all set-border">
                        <i class="iconfont1 iconquanbu icon-quanbu"></i>
                        全部
                    </div>
                </li>
                <li class="menu-item" :class="{'isactive': click == 2}" @click="showStorage('1'); click = 2">
                    <div class="set-border">销售出库</div>
                </li>
                <!--<li class="menu-item" :class="{'isactive': click == 4}" @click="showStorage('3'); click = 4">-->
                <!--<div class="set-border">调拨出库</div>-->
                <!--</li>-->
                <li class="menu-item" :class="{'isactive': click == 5}" @click="showStorage('3'); click = 5">
                    <div class="set-border">后台出库</div>
                </li>
                <li class="menu-item" :class="{'isactive': click == 3}" @click="showStorage('4'); click = 3">
                    <div class="set-border">销售换货</div>
                </li>
            </ul>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <outbound-list :operationId="operationId" :flag="flagMsg" ref="childMethod"></outbound-list>
            </div>
        </div>
    </div>
</template>
<script>
    import PlatformMixins from '~/mixins/platform'
    import OutboundList from '~/components/stocks/outbound/OutboundList'
    export default{
        name: "OutboundManagement",
        mixins: [PlatformMixins],
        components: {OutboundList},
        data(){
            return {
                flashPage: '',
                operationId: 1,  // 传入要搜索的ID，如果是同一个函数通过不同id调取数据的话
                flagMsg: '', // 传入要搜索的类型，如果是根据显示类型获取数据的话
                click: 1,
            }
        },
        methods: {
            onPageRefresh(){
                this.operationId=this.operationId+1;
            },
            addStorage(){
                this.$router.push('/stock/CreateOutbound')
            },
            showStorage(code){
                this.flagMsg = code;
                // this.$refs.childMethod.refreshPage()
            },
        }
    }
</script>

<style lang="scss">
    .outbound-management{
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        .left-section {
            .add-section{
                padding: 20px 0;
                text-align:center;
                .icontianjia{
                    margin-right: 8px;
                    margin-left: -6px;
                    margin-top: 1px;
                    font-size: 10px;
                    width: 10px;
                    height: 10px;
                }
                .addstorage{
                    display: flex;
                    margin: auto;
                    font-size: 14px;
                }
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
