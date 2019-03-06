* 更多操作_编辑
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
                paddingClass:'padding-0'
            }
        },
        methods:{
            editFunction(){
                this.$emit('onEdit')
            }
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
    .more-operating{
        /*transform:rotate(90deg);*/
    }
</style>
