<template>
    <div class="supplier-management">
        <div class="main-wrapper">
            <supplier-list :operationId="id" :flag="flagMsg"></supplier-list>
        </div>
    </div>
</template>

<script>
    import PlatformMixins from '~/mixins/platform'
    import SupplierList from '~/components/config/SupplierList'
    export default{
        name: "SupplierManagement",
        mixins: [PlatformMixins],
        components: { SupplierList },
        data(){
            return{
                click: 1,
                id: '',
                flagMsg: ''
            }
        },
        methods: {
            onPageRefresh(){
                this.id = (new Date()).toString()
            },
        }
    }
</script>

<style lang="scss">
.supplier-management{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;

    .main-wrapper{
        padding: 10px 30px 0;
        height: 100%;
        overflow: auto;
        .block-color{
            width: 100%;
            height: 100%;
            background-color: #fff;
            position: relative;
        }
    }
}
</style>
