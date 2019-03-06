<template>
    <div class="clientconfig">
        暂无数据
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import PlatformMixins from '~/mixins/platform'
    import TableHeight from '~/mixins/tableheight';
    export default{
        name: "ClientConfig",
        mixins: [PlatformMixins,TableHeight],
        data(){
            return {
                pageNo: 1,
                pageSize: 10,
                totalCount: 0,
            }
        },
        mounted(){
            this.setTableHeight(240)
        },
        methods: {
            ...mapActions([""]),
            onPageRefresh(){

            },
        }
    }
</script>

<style lang="scss">
    .clientconfig{

    }
</style>

