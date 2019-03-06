<template>

    <div class="InventoryHeaderTips">

            <el-select v-model="selectValue" popper-class="fs12" @change="getValue" class="select-position">
                <el-option
                size="small"
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" >
                </el-option>
            </el-select>
    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
                selectValue:"",
                options: [{value: '',label: '盘点结果'},{value: '1',label: '正常'},{value: '2',label: '盘盈'},{value: '3',label: '盘亏'},{value: '0',label: '--'}],
            }
        },
        props: {
            handChange: Function,
            value:{
                default:""
            }
        },
        watch:{
            value(curVal,oldVal){
　　　　　　　　　 this.selectValue="";
　　　　　　　　},
        },
        methods:{
            getValue(){
                this.handChange(this.selectValue)
            }
        }
    }
</script>

<style lang="scss">
.InventoryHeaderTips{
    position: relative;
    padding-left: 0px !important;
    margin-left: -31px !important;
    font-size: 12px;
    .select-position{
        position: absolute;
        top: -25px;
        width: 181px;
        font-size: 12px;
        .el-input{
            font-size: 12px;
        }
    }
}

</style>
