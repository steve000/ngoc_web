/** 
* 退货单更多操作
* importParams:{status:退货单状态}
*                status: {
*                    0: '已取消',
*                    1: '未收货',
*                   2: '待入库',
*                    3: '已入库',
*                    4: '待出库',
*                    5: '已出库',
*                    6: '已完成',
*                    7: '转退货',
*                }
* exports:null
**/
<template>
    <div class="operate-div" title="更多">
        <el-tooltip placement="bottom" effect="light"
        :visible-arrow="false"
        :popper-class='paddingClass'>
            <div slot="content">
                <template v-if="status === 1">
                    <div>
                        <el-button type="text" class="operating-button change-order-operating-button"  @click="editFunction">编辑</el-button>
                    </div>
                    <div>
                        <el-button type="text" class="operating-button change-order-operating-button"   @click="cancelFunction">取消</el-button>
                    </div>
                    <!--<div>-->
                        <!--<el-button type="text" class="operating-button change-order-operating-button"   @click="completeFunction">完成订单</el-button>-->
                    <!--</div>-->
                    <div>
                        <el-button type="text" class="operating-button change-order-operating-button"   @click="changeFunction">更改收货信息</el-button>
                    </div>
                </template>
                <template v-else-if="status === 3">
                    <div>
                        <el-button type="text" class="operating-button change-order-operating-button"   @click="changeFunction">更改收货信息</el-button>
                    </div>
                    <div>
                        <el-button type="text" class="operating-button change-order-operating-button"  @click="toReturnFunction">转退货</el-button>
                    </div>
                </template>
                <template v-else>
                    <div>
                        <el-button type="text" class="operating-button change-order-operating-button"   @click="changeFunction">更改收货信息</el-button>
                    </div>
                </template>
            </div>
            <el-button type="text" class="more-operating"><i class="el-icon-more"></i></el-button>
        </el-tooltip>
    </div>
</template>

<script>
    export default {
        name: '',
        props:{ status:Number },
        data () {
            return {
                paddingClass:'padding-0'
            }
        },
        methods:{
            editFunction(){ // 编辑
                this.$emit('onEdit')
            },
            cancelFunction(){  // 取消订单
                this.$emit('onCancel')
            },
            changeFunction() { // 更改收货地址
                this.$emit('onChange')
            },
            toReturnFunction() { // 转退货
                this.$emit('onToReturn')
            },
            // completeFunction() {
            //     this.$emit('onComplete');
            // }
        }
    }
</script>

<style lang="scss" >
   .padding-0{
    padding:0;
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
    .change-order-operating-button{
        width: 100px;
    }
    .more-operating{
        /*transform:rotate(90deg);*/
    }
</style>
