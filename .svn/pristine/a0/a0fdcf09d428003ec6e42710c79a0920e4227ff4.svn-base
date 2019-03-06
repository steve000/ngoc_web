<template>
    <div class="commodity-config">
        <div class="left-section pull-left">
            <div class="add-section">
                <button @click="addCommodity" class="add-button"><i class="iconfont1 icon-tianjia"></i>添加商品</button>
            </div>
            <ul class="menu-product">
                <li class="all" >
                    <div class="set-border"
                         @click="showGoods(''); click = '1'"
                         :class="{'isactive': click == '1'}"
                    ><i class="iconfont1 icon-quanbu"></i><span >全部类目</span></div>
                </li>
                <menu-item :model='model' v-for='model,index in cate' :click="click" :key="index"
                           @cateId="getCateId"></menu-item>
            </ul>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <commodity-list :operationId="data" :flag="flagMsg"></commodity-list>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import CommodityList from '~/components/config/CommoditList';
    import PlatformMixins from '~/mixins/platform';
    import MenuItem from '~/components/common/MenuItem';
    import Bus from '~/utils/bus';
    export default{
        name: 'CommodityConfig',
        components: {
            CommodityList, MenuItem
        },
        mixins: [PlatformMixins],
        data () {
            return {
                flashPage: '',
                data: 1, // 传入要搜索的ID，如果是同一个函数通过不同id调取数据的话
                flagMsg: '-', // 传入要搜索的类型，如果是根据显示类型获取数据的话
                click: '1'
            };
        },
        created () {
            Bus.$on('cateId', cateId => {
                this.flagMsg = String(cateId.cateId);
                this.click = String(cateId.cateId);
            });
        },
        computed: {
            ...mapState({
                cate: ({cate}) => {
                    return cate.cateAll;
                }
            })
        },
        mounted () {
            this.showGoods('');
            this.queryCateAll().then((resp) => {
            });
        },
        methods: {
            ...mapActions(['queryCateAll']),
            addCommodity () {
                this.$router.push(`/config/commodity/CreateCommodity`);
            },
            showGoods (cateId, cateName) {
                this.flagMsg = cateId;
                this.cateId = cateId;
            },
            onPageRefresh () {
                this.data = this.data + 1;
            },
            getCateId (cate) {
                console.log(cate);
            }
        }
    };
</script>

<style lang="scss">
    .list-menu {
        height: 36px;
        border-bottom: 1px solid #eee;
        .isactive {
            border-left: 4px solid #40b6fa;
            color: #40b6fa;
        }
    }

    .commodity-config {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        .pull-left {
            overflow: hidden;
            .el-menu-item-group > ul {
                overflow: hidden;
            }
        }
        .el-submenu__title {
            border-top: 1px solid lightgray;
            border-bottom: 1px solid lightgray;
        }
        .el-menu-item.is-active {
            border-left: 4px solid;
        }
        .el-menu-item {
            border-bottom: 1px solid lightgray;
            :hover {
                background-color: red !important;
            }
        }
        .el-menu-item-group__title {
            padding: 0;
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
