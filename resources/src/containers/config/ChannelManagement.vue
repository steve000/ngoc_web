<template>
    <div class="channel-management">
        <div class="left-section pull-left">
            <div class="add-section">
                <el-button type="primary" class="addButton" size="small" icon="iconfont1 icontianjia icon-tianjia"
                           @click="createChannel">新增渠道
                </el-button>
            </div>
            <el-menu default-active="1">
                <el-menu-item index="1">
                    <i class="iconfont1 iconquanbu icon-quanbu"></i>
                    <div slot="title" @click="showChannel(-1)" class="menu-btn-space">全部</div>
                </el-menu-item>
                <el-menu-item index="2">
                    <div class="menu-icon-place-holder"></div>
                    <div slot="title" @click="showChannel(1)" class="menu-btn-space">京东</div>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <channel-list v-if="flagMsg===-1"></channel-list>
                <channel-item-list v-if="flagMsg>0"></channel-item-list>
            </div>
        </div>
    </div>
</template>

<script>
    import PlatformMixins from '~/mixins/platform'
    import TableHeight from '~/mixins/tableheight';
    import channelList from '~/components/config/ChannelList'
    import channelItemList from '~/components/config/ChannelItemList'
    export default{
        name: "ChannelManagement",
        mixins: [PlatformMixins, TableHeight],
        data(){
            return {
                flashPage: '',
                operationId: 1,  // 传入要搜索的ID，如果是同一个函数通过不同id调取数据的话
                flagMsg: -1, // 传入要搜索的类型，如果是根据显示类型获取数据的话
                click: 1,
            }
        },
        components: {channelList, channelItemList},
        methods: {
            createChannel(){
                this.$router.push('/config/channel/createChannel');
            },
            showChannel(val){
                this.flagMsg = val;
            }
        }
    }
</script>

<style lang="scss">
    .channel-management {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        .left-section {
            .add-section {
                padding: 20px 0;
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
            .iconquanbu {
                margin-left: 10px;
                margin-right: 5px;
            }
            .el-menu {
                background-color: #E9EEF1;
                .el-menu-item {
                    line-height: 44px;
                    height: 44px;
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
                }
                .menu-icon-place-holder {
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
