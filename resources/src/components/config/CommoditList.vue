<template>
    <div class="commodity-list">
       <div class="top-scroll-section">
           <div class="nav-title">
               <div class="productStatus">
                   <label>商品状态：</label>
                   <el-select v-model="queryUserRelationProductParam.status"
                              placeholder="请选择" size="small"
                              :popper-class="'reset-select-option-padding'"
                              @change="getType">
                       <el-option v-for="item in typeList"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                                  class="reset-option-font">
                       </el-option>
                   </el-select>
               </div>
               <div class="search">
                   <search @searchValue="getSearchValue"
                           :isClear='isClear'
                           :showPlaceholder="'请输入商品名称或编码搜索商品'"></search>
               </div>
           </div>
           <div class="selectedUpOrDown">
               <label>已选{{selectedNum}}条：</label>
               <button v-if="queryUserRelationProductParam.status!==1"
                       @click="changeDownUserRelationProductFunction(1)">上架</button>
               <button v-if="queryUserRelationProductParam.status!==2"
                       @click="changeDownUserRelationProductFunction(2)">下架</button>
           </div>
           <div class="search_result_container" v-if="searchItemValueArray.length>0">
               <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount" @deleteItem="getDeleteItem"></search-result>
           </div>
           <div class="table-wrapper table-empty-height">
               <el-table :data="commodityList" border  @selection-change="handleSelectionChange">
                   <el-table-column
                       type="selection"
                       width="55">
                   </el-table-column>
                   <el-table-column label="商品名称">
                       <template slot-scope="scope">
                           <div class="row-show" :title="scope.row.skuName">{{scope.row.skuName}}</div>
                       </template>
                   </el-table-column>
                   <el-table-column label="商品编码">
                       <template slot-scope="scope">
                           <div class="row-show" :title="scope.row.skuId">{{scope.row.skuId}}</div>
                       </template>
                   </el-table-column>
                   <el-table-column label="商品状态">
                       <template slot-scope="scope">
                           <div class="row-show" :title="statusText[scope.row.status]">
                               <span :class="returnClass(scope.row.status)"></span>
                               {{statusText[scope.row.status]}}
                           </div>
                       </template>
                   </el-table-column>
                   <div slot="empty" class="table_slot_empty_text">
                       <div><img src="../../layouts/images/nodata.png"/></div>
                       <div>暂无数据</div>
                   </div>
               </el-table>
           </div>
       </div>
        <div class="pagination-section" >
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="queryUserRelationProductParam.pageNo" background
                           :page-size="queryUserRelationProductParam.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="totalCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import Search from '~/components/common/Search';
    import SearchResult from '~/components/common/SearchResult.vue'

    export default{
        name: 'CommodityList',
        props: {operationId: Number, flag: String},
        mixins: [],
        components: {
            Search,
            SearchResult
        },
        data(){
            return {
                isClick: false,
                productName: '',
                oneGoodsList: [],
                skuArray: [],
                selectedNum: 0,
                queryUserRelationProductParam: {
                    pageSize: 10,
                    pageNo: 1,
                    searchContent: '',
                    cateId: '',
                    status: ''
                },
                typeList:[{label:'全部类型',value:''},{label:'上架中',value:1},{label:'下架中',value:2}],
                statusText: {
                    1: '上架',
                    2: '下架'
                },
                selectTableArray: [],
                searchItemValueArray:[],
                isClear:false,
            }
        },
        watch: {
            flag: function (nval, oval) {
                this.queryUserRelationProductParam.cateId = nval;
                this.refreshPage();
            },
            operationId: function (nval, oval) {
                this.refreshPage()
            }
        },
        computed: {
            ...mapState({
                commodityList: ({commodity}) => commodity.commodity.commodityListRelation.commodityList,
                totalCount: ({commodity}) => commodity.commodity.commodityListRelation.totalCount,
            }),
        },
        mounted(){
        },
        methods: {
            ...mapActions(["queryUserRelationProduct", "changeDownUserRelationProduct", "showPageLoading", "hidePageLoading"]),
            refreshPage(param = this.queryUserRelationProductParam){
                this.showPageLoading();
                this.queryUserRelationProductFunction(param)
            },
            getSearchValue(searchValue){
                this.queryUserRelationProductParam.searchContent = searchValue;
                this.searchItemValueArray=[searchValue];
                this.isClear=false;
                this.isClick = true;
                this.refreshPage();
            },
            getReset(){
//                this.queryUserRelationProductParam.searchContent = "";
//                this.queryUserRelationProductParam.status = "";
                this.isClick = false;
                this.refreshPage();
            },
            getDeleteItem(index){
                this.searchItemValueArray.splice(index);
                this.isClear=true;
                this.queryUserRelationProductParam.searchContent = "";
                this.refreshPage()
            },
            handleSelectionChange(val) {
                this.selectTableArray = val;
                this.selectedNum = val.length;
            },
            handleSizeChange(nSize){
                this.queryUserRelationProductParam.pageSize = nSize;
                this.refreshPage();
            },
            handleCurrentChange(nPage){
                this.queryUserRelationProductParam.pageNo = nPage;
                this.refreshPage();
            },
            getType(type){
                this.queryUserRelationProductParam.status = type;
                this.refreshPage();
            },
            queryUserRelationProductFunction(param){
                this.queryUserRelationProduct(param).then((reps) => {
                    this.hidePageLoading();
                })
            },
            changeDownUserRelationProductFunction(type){
                let skuIds = [];
                if (this.selectTableArray.length <= 0) {
                    this.$message({
                        message: '请选择商品',
                        type: 'error'
                    });
                    return
                }
                for (let i = 0; i < this.selectTableArray.length; i++) {
                    let item = this.selectTableArray[i];
                    if (item.status !== type) {
                        skuIds.push(item.skuId);
                    }
                }
                if (skuIds.length <= 0) {
                    this.$message({
                        message: '当前选中项无符合操作条件的选项,请重新选择',
                        type: 'error'
                    });
                    return
                }
                this.changeDownUserRelationProduct({skuIds:skuIds,status:type}).then((reps) => {
                    this.$message({
                        message: `商品${this.statusText[type]}成功`,
                        type: 'success'
                    });
                    this.refreshPage();
                })
            },
            returnClass(status){
                if (status === 1) {
                    return ' circle circle-67C23A'
                } else if (status === 2) {
                    return ' circle circle-FF6369'
                }

            },
        },

    }
</script>

<style lang="scss">
    .commodity-list {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
        .nav-title{
            padding-top: 20px;
            display: flex;
            justify-content:space-between;
        }
        .productStatus{
            height: 32px;
            line-height: 32px;
            font-size: 12px;
            color: #333333;
            label{
                display: inline-block;
                width: 70px;
            }
            .el-input__inner{
                height: 32px;
                font-size: 12px;
                color: #666666;
                border: 1px solid #E0E0E0;
            }
        }
       .selectedUpOrDown {
            margin: 0px 0px 16px;
            label {
                display: inline-block;
                width: 70px;
                font-size: 12px;
                color: #999999;
            }
            button{
                border: 1px solid #BFD9FE;
                border-radius: 3px;
                height: 32px;
                width: 70px;
                font-size: 13px;
                line-height: 32px;
                color: #3B8CFF;
                background-color: #fff;
                outline: none;
            }
           button:nth-child(2){
               margin-right: 7px;
           }
        }
    }
</style>;
