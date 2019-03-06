/** 
* 管理卡券信息更多操作
* importParams:null
* exports:null
**/
<template>
    <div class="operate-div" title="更多">
        <el-tooltip placement="bottom" effect="light"
        :visible-arrow="false"
        :popper-class='paddingClass'>
            <div slot="content">
                <div>
                    <el-button type="text" class="operating-button"  @click="editFunction">编辑</el-button>
                </div>
                <div>
                    <el-button type="text" class="operating-button"  @click="resetButton" v-if="resetButtonShow">重置</el-button>
                </div>
               <div>
                   <el-button type="text" class="operating-button"   @click="deleteFunction" v-if="deleteFunctionShow">删除</el-button>
               </div>
            </div>
            <el-button type="text" class="more-operating"><i class="el-icon-more"></i></el-button>
        </el-tooltip>
    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
                paddingClass:'padding-0',
                deleteFunctionShow: false,
                resetButtonShow: false,
            }
        },
        props: {
            row: Object
        },
        mounted () {
            console.log(this.row, 444)
            if (this.row.usedCount > 0) {
                this.resetButtonShow = true
                this.deleteFunctionShow = false
            } else if (this.row.usedCount == 0) {
                this.resetButtonShow = false
                this.deleteFunctionShow = true
            }
        },
        methods:{
            editFunction(){
                //callback 编辑
                this.$emit('onEdit');
            },
            deleteFunction(){
                //callback 删除
                this.$emit('onDelete');
            },
            resetButton() {
                //重置
                this.$emit('resetButton');
            },
        }
    }
</script>

<style lang="scss" >
   .padding-0{
    padding:0px;
   }
    .el-tooltip__popper.is-light{
        border:none;
        box-shadow: 0 0 6px 0 rgba(0,0,0,0.20);
    }
    .operating-button{
        width: 80px;
        height: 28px;
        color: #666666;
        font-size: 12px;
        padding: 0px;
        line-height: 28px;
        &:hover{
            color: #333333;
            background-color: #F6FAFE;
        }
    }
</style>
