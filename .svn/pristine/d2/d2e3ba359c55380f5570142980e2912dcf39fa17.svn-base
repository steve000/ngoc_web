<template>
    <div class="supplier-list">
            <div class="top-wrapper">
                <div class="add-section1">
                    <el-button type="primary" @click="addSupplier" class="apply" size="small"
                               icon="iconfont1 icontianjia icon-tianjia">新增供应商</el-button>
                </div>
                <search @searchValue="getSearchValue" :isClear="isClear" :showPlaceholder="'请输入供应商编号或名称进行搜索'"></search>
            </div>
            <div class="search_result_container" v-if="searchItemValueArray.length>0">
                <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount"
                               @deleteItem="getDeleteItem"></search-result>
            </div>

            <div class="table-wrapper table-empty-height">
                <el-table :data="supplierList" border width="100%"
                          :row-class-name="tableRowClassName">
                    <el-table-column label="供应商名称">
                        <template slot-scope="scope">
                            <div class="row-btn-show">
                                <div class="row-show" :title="scope.row.vendorName"
                                     @click="showSupplier(scope.row.vendorSeqNo)">
                                    {{scope.row.vendorName ? scope.row.vendorName : '--'}}
                                </div>
                                <!--<el-button type="text" @click="delSupplier(scope.row.vendorSeqNo)">删除</el-button>-->
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="供应商编号">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.vendorSeqNo">
                                {{scope.row.vendorNumber ? scope.row.vendorNumber : '--'}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建人">
                        <template slot-scope="scope">
                            <div class="row-show">
                                {{scope.row.operaterUserName ? scope.row.operaterUserName : '--'}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.createTime">
                                {{scope.row.createTime ? scope.row.createTime : '--'}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <div v-if="status[scope.$index]">
                                <el-select v-model="status[scope.$index]" size="mini"
                                           @change="changeStatus(scope.row,status[scope.$index])"
                                           style="font-size: 12px;border-radius: 0">
                                    <el-option v-for="item in statusList" :key="item.value" style="font-size: 12px"
                                               :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </div>
                            <div v-else>--</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.comments">
                                {{scope.row.comments ? scope.row.comments : '无'}}
                            </div>
                        </template>
                    </el-table-column>
                    <div slot="empty" class="table_slot_empty_text">
                        <div><img src="../../layouts/images/nodata.png"/></div>
                        <div>暂无数据</div>
                    </div>
                </el-table>
            </div>
            <div class="pagination-section">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page.sync="pageNo" background
                               :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                               :total="totalCount">
                </el-pagination>
            </div>

    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import Search from '~/components/common/Search'
    import SearchResult from '~/components/common/SearchResult.vue'
    export default{
        name: 'SupplieList',
        props: {operationId: String, flag: String},
        components: {
            Search, SearchResult
        },
        data(){
            return {
                supplierList: [],
                pageSize: 10,
                pageNo: 1,
                status: [],
                statusList: [{value: 2, label: "启用中"}, {value: 1, label: "未启用"}],
                totalCount: 0,
                addSuccessType: false,
                searchContent: '',
                isPage: true,
                reseted: false,
                isClear: false,
                searchItemValueArray: [],
            }
        },
        watch: {
            flag: function (nval, oval) {
                this.addSuccessType = false
                this.refreshPage()
            },
            operationId: function (nval, oval) {
                this.addSuccessType = true
                this.refreshPage()
            }
        },
        mounted(){
            this.refreshPage();
        },
        methods: {
            ...mapActions(["vendorQuerylistbyusergroupid", "showPageLoading", "hidePageLoading", "modifySupplierInfo", "modifySupplierStatus"]),
            refreshPage(){
                this.showPageLoading();
                // let params = {
                //     pageNo: this.pageNo,
                //     pageSize: this.pageSize,
                //     searchContent: this.searchContent,
                //     isPage: this.isPage
                // }
                let datas = {
                    userGroupId: sessionStorage.getItem("entityId")
                }
                this.vendorQuerylistbyusergroupid(datas).then(resp => {
                    this.hidePageLoading();
                    this.supplierList = resp.result
                    this.status.splice(0, this.status.length)
                    this.supplierList.forEach(one => {
                        this.status.push(one.dataStatus)
                    })
                    this.totalCount = resp.totalCount
                }).catch(res => {
                    this.hidePageLoading()
                })
            },
            getSearchValue(searchValue){
                this.searchContent = searchValue;
                this.refreshPage();
                this.isClear = false;
                this.searchItemValueArray = [searchValue];
            },
            getDeleteItem(index){
                this.searchItemValueArray.splice(index);
                this.isClear = true;
                this.searchContent = "";
                this.refreshPage()
            },
            showSupplier(id){
                this.$router.push({name: 'ViewSupplier', params: {id: id}});
            },
            getVendorStatus(data){
                if (data == 1) {
                    return "未启用"
                } else if (data == 2) {
                    return "启用"
                } else if (data == 3) {
                    return "删除"
                }
            },
            tableRowClassName({row, rowIndex}){
                if (rowIndex === 0 && this.addSuccessType == true) {
                    return 'success-row';
                }
            },
            changeStatus(data, status){
                let params = {
                    vendorSeqNo: data.vendorSeqNo,
                    dataStatus: status,
                }
                this.modifySupplierStatus(params).then(resp => {
                    this.refreshPage()
                }).catch(res => {
                    this.refreshPage()
                })
            },
            handleSizeChange(nSize){
                this.pageSize = nSize;
                this.refreshPage();
            },
            handleCurrentChange(nPage){
                this.pageNo = nPage;
                this.refreshPage();
            },
            addSupplier(){
                this.$router.push({name: 'AddSupplier'})
            },
        },
    }
</script>

<style lang="scss">
    .supplier-list {
        height: 100%;
        background-color: #fff;
        .top-wrapper{
            position: relative;
            padding: 20px 20px 0 20px;
            background-color: #fff;
        }
        .table-wrapper{
            padding: 0 20px;
            height: auto;
        }
        .search_result_container{
            background-color: #fff;
            padding: 0 20px;
        }
        .pagination-section{
            background-color: #fff;
        }
        .add-section1{
            position:absolute;
            display: inline-block;
            z-index:10;
            .apply{
                margin: auto;
                display: flex;
            }
            .icontianjia{
                margin-right: 5px;
                margin-left: -6px;
                margin-top: 1px;
                font-size: 10px;
                width: 10px;
                height: 10px;
            }
        }
        .search-component{
            text-align: right;
        }
    }
</style>
