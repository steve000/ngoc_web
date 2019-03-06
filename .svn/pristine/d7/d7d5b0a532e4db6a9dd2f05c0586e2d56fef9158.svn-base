<template>
    <div class="goods-list">
        <!--
        <div class="search">
            <el-input size="small"
                @keyup.enter.native="searchEnterFun"
                placeholder="搜索商品" style="width: 200px;"
                v-model="productName">
                <i slot="prefix" class="el-input__icon el-icon-search cursor" @click="onSearchGood"></i>
            </el-input>
        </div>
-->
        <div class="search">
            <search @searchValue="onSearchGood" :showResetButton="showResetButton" @reset="getReset"
                    :isShowSearchResult="isShowSearchResult" :count="totalCount"
                    :showPlaceholder="'搜索商品'"></search>
        </div>
        <div class="table-wrapper">
            <el-table :data="goodsList" border :height="tableHeight">
                <el-table-column width="30px">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isSubContent">
                            <div @click="showMore(scope.$index,scope.row)" class="showMoreColor">
                                <i class="row-show"
                                   :class="scope.row['has_show_more'] ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="商品编码" width="130px">
                    <template slot-scope="scope">
                        <div class="row-btn-show ">
                            <div class="row-show" :title="scope.row.productId" @click="viewGoods(scope.row.productId)"
                            >{{scope.row.productId ? scope.row.productId : '--'}}
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="商品名称" min-width="100px">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.skuId">{{scope.row.skuId ? scope.row.skuId :'--'}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="总库存" min-width="100px">
                    <template slot-scope="scope">
                        <div class="row-btn-show ">
                            <div class="row-show" :title="scope.row.barCode">{{scope.row.barCode ? scope.row.barCode : '--'}}</div>
                            <el-button class="tabEditMarginRight" type="text" @click="goStockManage(scope.row.productId)">详情</el-button>
                        </div>

                    </template>
                </el-table-column>
                <el-table-column label="30天销量">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.productName">{{scope.row.productName ? scope.row.productName : '--'}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="单位" width="150">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.skuAttrsNew">{{scope.row.skuAttrsNew ? scope.row.skuAttrsNew : '--'}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="品牌">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.brandCnName">{{scope.row.brandCnName ? scope.row.brandCnName : '--'}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="零售价">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.price">{{scope.row.price ? scope.row.price : " --"}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="成本价">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.cost">{{scope.row.cost ? scope.row.cost : '--'}}</div>
                    </template>
                </el-table-column>
                <div slot="empty" class="table_slot_empty_text">
                    <div><img src="../../layouts/images/nodata.png"/></div>
                    <div>暂无数据</div>
                </div>
            </el-table>
            <div class="pagination-section">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="pageNo" background
                               :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                               :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex';
    import TableHeight from '~/mixins/tableheight';
    import Search from '~/components/common/Search';
    export default{
        props: {operationId: String, flag: String},
        name: "GoodsList",
        mixins: [TableHeight],
        components: {
            Search
        },
        data(){
            return {
                productName: '',
                goodsList: [],
                oneGoodsList: [],
                pageSize: 10,
                pageNo: 1,
                totalCount: 0,
                skuArray: [],
                showResetButton: false,
                isShowSearchResult: false,
                isClick: false
            }
        },
        watch: {
            flag: function (nval, oval) {
                this.pageNo = 1
                this.refreshPage(nval)
            }
        },
        mounted(){
            // this.refreshPage(nval);
            this.setTableHeight(235)
        },
        methods: {
            ...mapActions(["queryGoodsList", "queryGoodsListSku", "showPageLoading", "hidePageLoading"]),
            getReset() {
                this.showResetButton = false;
                this.isShowSearchResult = false;
                this.isClick = false;
                this.productName = '';
                this.refreshPage(this.flag)
            },
            refreshPage(nval){
                this.showPageLoading();
                var resData = {
                    pageSize: this.pageSize,
                    pageNo: this.pageNo,
                    searchContent: this.productName.trim(),
                    cateId: nval
                }
                this.queryGoodsList(resData).then(resp => {
                    this.hidePageLoading();
                    resp.result.forEach(one => {
                        one.has_show_more = false;
                        // 给记录添加是否已展开标记，true的话表示已经展开，false表示没有展开
                    });
                    if (this.isClick) {
                        this.showResetButton = true;
                        this.isShowSearchResult = true;
                    }
                    this.goodsList = resp.result;
                    this.totalCount = resp.totalCount;
                })
            },
            //模糊查询
            onSearchGood(searchValue){
                this.productName = searchValue;
                this.isClick = true;
                this.refreshPage(this.flag)
            },
            searchEnterFun(e){
                var keyCode = window.event ? e.keyCode : e.which;
                //  console.log('回车搜索',keyCode,e);
                if (keyCode == 13 && this.productName) {
                    this.refreshPage(this.flag)
                } else {
                    this.refreshPage(this.flag)
                }
            },
            viewGoods(id){
                this.$router.push(`/goods/view/${id}`)
                sessionStorage.setItem('goodsSkuId',id);
                sessionStorage.setItem('cateId', this.flag);
            },
            showMore(index, row){
                var id = row.productId
                if (!row['has_show_more']) {
                    if (this.isLoading) {
                        return false
                    }
                    var reqData = {
                        productId: id
                    }
                    this.showPageLoading();
                    this.queryGoodsListSku(reqData).then((resp) => {
                        resp.forEach(one => {
                            one.isSubContent = true;
                            one.productId = " ";
                            one.productName = one.skuName;
                            // one.sub_show = true          //给返回的子列表添加字段作为标记，true的时候表示是展开的内容，没有该字段表示不是展开的内容
                        })
                        resp.forEach(item => {
                            item.skuAttrsNew = ''
                            if (item.skuAttrs && item.skuAttrs.length > 0) {
                                item.skuAttrs.forEach(one => {
                                    item.skuAttrsNew += one.attrValue + ','
                                })
                                item.skuAttrsNew = item.skuAttrsNew.substring(0, item.skuAttrsNew.length - 1)
                            }
                        })
                        this.oneGoodsList = resp;
                        this.goodsList[index].sub_show_length = resp.length; //给展开的记录添加展开的内容长度标记
                        this.goodsList.splice(index + 1, 0, ...this.oneGoodsList);
                        this.goodsList[index].has_show_more = true;         //设置标记已展开
                        this.hidePageLoading();
                    }).catch(() => {
                        this.hidePageLoading();
                    })

                } else {
                    let length = this.goodsList[index].sub_show_length;     //获取要删除的长度
                    this.goodsList.splice(index + 1, length);                //删除展开的内容
                    this.goodsList[index].has_show_more = false;            //设置标记未展开
                    this.goodsList[index].sub_show_length = 0;

                }
            },
            packUp(index, id){
            },
            handleSizeChange(nSize){
                this.pageSize = nSize;
                this.refreshPage(this.flag);
            },
            handleCurrentChange(nPage){
                this.pageNo = nPage;
                this.refreshPage(this.flag);
            },
            goStockManage(skuId){
                // this.$router.push(`/stock/management`)
                // sessionStorage.setItem('goodsSkuId',skuId);
            }
        },
    }
</script>
<style lang="scss">
    .goods-list {
        .search-component{
            right: 0px;
        }
        .search{
            margin-top:20px;
        }
        .table-wrapper {
            overflow-y: hidden;
            .row-btn-show div{
                color: black;
                cursor: default;
            }
        }
        .handleButtonContainer {
            width: 26px;
            height: 26px;
            line-height: 26px;
            border-radius: 50%;
            background-color: #eceff1;
            display: inline-block;
            text-align: center;
            vertical-align: middle;
            margin-right: 10px;
        }
        .el-table th:first-child {
            border-right: none;
        }
        .el-table th:nth-child(2) {
            border-left: none;
        }
    }

    .el-tooltip__popper.is-light {
        background: #fff;
        border: 1px solid #eee;
    }

    .el-tooltip__popper.is-light[x-placement^=bottom]  .popper__arrow {
        border-bottom-color: #eee;
    }

    .el-input-group__prepend {
        background-color: #fff;
    }

    .el-input-group--prepend .el-input__inner, .el-input-group__append {
        border-left: 0px;
        padding-left: 0;
    }

    .el-button + .el-button {
        margin-left: 10px;
    }

    .iconColor {
        color: black;
    }

    .showMoreColor {
        cursor: pointer;
        &:hover {
            color: #3B8CFF;
        }
    }

    /*.el-pagination {*/
    /*.btn-prev, .btn-next{*/
    /*i{*/
    /*visibility: hidden;*/
    /*}*/
    /*}*/
    /*.btn-prev{*/
    /*&:before{*/
    /*content:"上一页"*/
    /*}*/
    /*}*/
    /*.btn-next{*/
    /*&:before{*/
    /*content:"下一页"*/
    /*}*/
    /*}*/
    /*}*/

</style>
