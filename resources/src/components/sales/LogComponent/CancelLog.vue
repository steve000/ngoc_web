<template>
    <div class="cancel-wrapper">
        <div class="title">
            <span>销售单号：{{logDetail.afterContent.orderId}}</span>
            <span>状态：已取消</span>
        </div>
        <div class="cancel-order-log">
            <div class="left">
                <GoodsListTable :saleList="logDetail.afterContent.pluList" :isLog="true"></GoodsListTable>
            </div>
            <div class="right">
                <GoodsBaseInfo></GoodsBaseInfo>
            </div>
        </div>
    </div>

</template>

<script>
    import GoodsListTable from '../salesOrder/GoodsListTable';
    import GoodsBaseInfo from '../salesOrder/GoodsBaseInfo';
    import { mapState} from 'vuex';
    export default {
        name: "cancel-log",
        components: {
            GoodsListTable,
            GoodsBaseInfo
        },
        data() {
            return {
            };
        },
        computed: {
            ...mapState({
                logDetail: ({ logRecord }) => logRecord.logDetail,
            }),
        },
    }
</script>

<style scoped lang="scss">
    .cancel-wrapper{
        background: #F8F9FB;
        padding: 20px;
        margin-top: 20px;
        .title{
            color: #333;
            font-size: 12px;
            margin-bottom: 16px;
        }
        .title span:nth-of-type(1){
            font-size: 14px;
            margin-right: 30px;
            display: inline-block;
        }
    }
    .cancel-order-log{
        display: flex;
        .left{
            width: 740px;
        }
        .right{
            width: 260px;
            margin-left: 14px;
        }
    }
</style>
