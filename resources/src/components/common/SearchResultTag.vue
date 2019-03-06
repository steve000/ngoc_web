<template>
    <div class="search_result">
        <div>
            <i class="iconfont1 icon-shaixuanxiang "></i>共{{count}}条结果，搜索项：<span :key="index" v-for="(item,index) in searchItemValueArray" v-if="item">{{item.value}}<i class="iconfont1 icon-guanbi" @click="deleteItem(item)"></i></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SearchResult',
        data () {
            return {

            }
        },
        props:{
            count:{
                type: Number,
            },
            searchItemValueArray:{
                type: Array,
                default: function () {
                    return []
                },
            }
        },
        methods:{
            deleteItem(item){
                this.$emit('deleteItem',item)
            }
        }
    }
</script>

<style lang="scss">
.search_result{
    text-align: left;
    font-size: 12px;
    color: #999999;
    /*height: 22px;*/
    line-height: 22px;
    padding-bottom: 16px;
    .icon-shaixuanxiang{
        color: #999999;
        font-size: 10px;
        margin-right: 8px;
    }
    span{
        display: inline-block;
        border: 1px solid #E5E5E5;
        background: #EFF0EF;
        border-radius: 2px;
        width: auto;
        height: 22px;
        padding: 0px 6.4px 0px 8px;
        font-size: 12px;
        color: #666666;
        line-height: 22px;
        margin-right: 8px;
        i{
            color: #666666;
            font-size: 11px;
            margin-left: 19.3px;

        }
    }
}
</style>
