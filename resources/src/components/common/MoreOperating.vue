<!--
/*
    列表里的 更多操作 组件，显示为 ...
    传入参数： buttonList: [{type, text}]; type 自定义按钮类型（供返回识别），text 按钮名称
             row; 组件所在的列表行里的 数据(供返回用)
    操作触发返回： onClick(type,row)，点击按钮触发提交onClick事件，返回点击的按钮类型type和所在行数据row，
*/
-->

<template>
    <div class="operate-div" title="更多">
        <el-popover
            placement="bottom"
            trigger="click"
            :popper-class='paddingClass'
            @hide="getHide"
        >
            <div>
                <div v-for="item in buttonList">
                    <el-button type="text" class="operating-button" @click="clickFunction(item.type)">{{item.text}}
                    </el-button>
                </div>
            </div>
            <el-button type="text" class="more-operating" slot="reference" @click="getOperate"><i class="el-icon-more"></i></el-button>
            <!--<el-button slot="reference">click 激活</el-button>-->
        </el-popover>
        <!--<el-tooltip placement="bottom" effect="light"-->
        <!--:visible-arrow="false"-->
        <!--:popper-class='paddingClass'>-->
        <!--<div slot="content">-->
        <!--<div v-for="item in buttonList">-->
        <!--<el-button type="text" class="operating-button"  @click="clickFunction(item.type)">{{item.text}}</el-button>-->
        <!--</div>-->
        <!--</div>-->
        <!--<el-button type="text" class="more-operating"><i class="el-icon-more"></i></el-button>-->
        <!--</el-tooltip>-->
    </div>
</template>

<script>
    export default {
        name: 'MoreOperating',
        data () {
            return {
                paddingClass: 'padding-0',
                clickNum:0,
                isHide:false
            }
        },
        props: {
            buttonList: {
                type: Array,
                default: function () {
                    return []
                }
            },
            row: {
                type: Object,
                default: function () {
                    return {}
                }
            }
        },
        methods: {
            clickFunction(type){
                this.$emit('onClick', type, this.row)
            },
            getHide(){
                this.$emit('hide');
                this.clickNum=0;
            },
            getOperate(){
               if(this.clickNum==0){
                   this.clickNum=1;
                   this.$emit('emitClick')
               }else{
                   this.clickNum=0;
               }
            }
        }
    }
</script>

<style lang="scss">
    .el-popover {
        border: none;
        min-width: 80px;
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.20);
    }

    .padding-0 {
        padding: 0px;
        width: 80px;
    }
    .operating-button {
        width: 80px;
        height: 28px;
        color: #666666;
        font-size: 12px;
        padding: 0px;
        line-height: 28px;
        &:hover {
            color: #333333;
            background-color: #F6FAFE;
        }
    }

    .more-operating {
        /*transform:rotate(90deg);*/
    }
</style>
