<template>
    <div class="salescontractlist">
        <div class="search">
            <search @searchValue="getSearchValue" :showResetButton="showResetButton" @reset="getReset"
                    :isShowSearchResult="isShowSearchResult" :count="totalCount"></search>
        </div>

        <div class="table-wrapper">
            <el-table :data="" border :height="tableHeight" width="100%">
            </el-table>
            <div class="pagination-section">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page.sync="pageNo" background
                               :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                               :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import TableHeight from '~/mixins/tableheight';
    import Search from '~/components/common/Search'
    export default{
        name: 'SalesContractList',
        props: { operationId: String, flag: String },
        mixins: [TableHeight],
        components: {
            Search
        },
        data(){
            return {
                pageSize: 10,
                pageNo: 1,
                totalCount: 0,
                searchContent: '',
                showResetButton: false,
                isShowSearchResult: false,
                isClick: false,
            }
        },
        watch: {
            flag: function(nval, oval){
                this.refreshPage()
            },
            operationId: function (nval, oval) {
                this.refreshPage()
            }
        },
        mounted(){
            this.setTableHeight(245)
            this.refreshPage();
        },
        methods:{
            ...mapActions(["showPageLoading","hidePageLoading"]),
            refreshPage(){
//                this.showPageLoading();
//                this.xxxxxx(params).then( resp => {
//                    this.hidePageLoading();
//                    if(this.isClick){
//                        this.showResetButton = true;
//                        this.isShowSearchResult = true;
//                    }
//                })
            },
            getSearchValue(searchValue){
                this.searchContent = searchValue;
                this.isClick = true;
                this.refreshPage();
            },
            getReset(){
                this.showResetButton = false;
                this.isShowSearchResult = false;
                this.searchContent = "";
                this.isClick = false;
                this.refreshPage()
            },

//            delxxxxxx(id){
//                this.$confirm('此操作将删除xxxx，是否继续', '提示', {
//                    confirmButtonText: '确定',
//                    cancelButtonText: '取消',
//                    type: 'warning'
//                }).then( () => {
//                    this.doDeletexxxx(id);
//                }).catch( () => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消'
//                    })
//                })
//            },
//            doDeletexxxxx(id){
//                this.changeSupplierStatus({supplierId: id, dataStatus: 2}).then( resp => {
//                    this.refreshPage();
//                }).catch( error => {
//                    this.refreshPage();
//                })
//            },
            handleSizeChange(nSize){
                this.pageSize = nSize;
                this.refreshPage();
            },
            handleCurrentChange(nPage){
                this.pageNo = nPage;
                this.refreshPage();
            },
        },

    }
</script>

<style lang="scss">
    .salescontractlist{
        padding-top: 20px;
        .search{
            margin-top:20px;
            .search-component .search-box{
                text-align: left;
            }
        }
    }
</style>
