<template>
   <div class="content-section">
        <div class="left-section pull-left">
            <div class="add-section">
                <el-button type="primary" @click="addGoods" class="addgoods" icon="el-icon-plus">新增商品</el-button>
            </div>
            <ul class="menu" v-for="(cate, index) in cate">
                <li>{{cate.cateName}}</li>
               <ul class="submenu" v-for="(model, index) in cate.child">
                   <li class="menu-item" :class="{'isactive': click == 1}" @click="showGoods('all'); click = 1"><div class="set-border">{{model.cateName}}</div></li>
               </ul>
            </ul>
            <!--<ul class="menu">-->
                <!--<li class="menu-item" :class="{'isactive': click == 1}" @click="showGoods('all'); click = 1"><div class="set-border">全部类目</div></li>-->
                <!--<li class="menu-item" :class="{'isactive': click == 2}" @click="showGoods('card'); click = 2"><div class="set-border">卡类</div></li>-->
                <!--<li class="menu-item" :class="{'isactive': click == 3}" @click="showGoods('hard'); click = 3"><div class="set-border">智能硬件</div></li>-->
                <!--<li class="menu-item" :class="{'isactive': click == 4}" @click="showGoods('yanshen'); click = 4"><div class="set-border">衍生品</div></li>-->
                <!--<ul class="submenu" :class="{'isopen': click > 3}">-->
                    <!--<li class="menu-item" :class="{'isactive': click == 5}" @click="showGoods('three'); click = 5"><div class="set-border">3C</div></li>-->
                    <!--<li class="menu-item" :class="{'isactive': click == 6}" @click="showGoods('dayuse'); click = 6"><div class="set-border">日用品</div></li>-->
                    <!--<li class="menu-item" :class="{'isactive': click == 7}" @click="showGoods('play'); click = 7"><div class="set-border">模玩类</div></li>-->
                    <!--<li class="menu-item" :class="{'isactive': click == 8}" @click="showGoods('clothes'); click = 8"><div class="set-border">衣物类</div></li>-->
                <!--</ul>-->
            <!--</ul>-->
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <!-- <goods-list :operationId="data" :flag="flagMsg"></goods-list> -->
                <list :operationId="data" :flag="flagMsg"></list>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex'
    import GoodsList from './goodslist'
    import List from './allCategory'
    export default{
        name: "index",
        components: { GoodsList, List},
        data(){
            return{
                flashPage: '',
                data: '',  // 传入要搜索的ID，如果是同一个函数通过不同id调取数据的话
                flagMsg: '', // 传入要搜索的类型，如果是根据显示类型获取数据的话
                click: 1,
            }
        },
        computed: {
            ...mapState({
                cate: ({ cate }) => {
                    console.log(cate.cateAll.result.result);
                    return cate.cateAll.result.result
                },
            }),
        },
        mounted(){
            this.queryCateAll().then((resp)=>{
//                console.log(res)
            });
        },
        methods:{
            ...mapActions(['queryCateAll']),
            addGoods(){
                this.$message({
                    type: 'info',
                    message: '添加商品'
                })
            },
            showGoods(code){
                this.flagMsg = code;
            },
            yanShenClick(){
                this.isclick = true;

            }
        }
    }
</script>

<style lang="scss">
    .content-section {
        width: 100%;
        height: 100%;
        position: relative;
        padding: 20px;
         padding: 50px 20px 20px;
        .left-section {
            width: 150px;
            height: 100%;
            background-color: #fefefe;
            font-size: 16px;
            position: absolute;
            z-index: 100;

            .add-section{
                padding: 20px;
                .addgoods{
                    display: flex;
                    margin: auto;
                }
            }

            .menu{
                .menu-item{
                    display: block;
                    box-sizing: border-box;
                    padding: 6px 0;
                    border-bottom: 1px solid #eee;
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
        }
        .main-section {
            height: 100%;
            padding-left: 150px;
            background-origin: content-box;
            -webkit-background-origin: content-box;
            overflow: hidden;
            position: relative;

            .main-wrapper{
                height: inherit;
                padding-left: 15px;
                width: 100%;
                .block-color{
                    width: 100%;
                    height: 100%;
                    background-color: #fff;
                    position: relative;
                }
            }
        }

        .el-button{
             padding: 10px;
        }
    }
</style>
