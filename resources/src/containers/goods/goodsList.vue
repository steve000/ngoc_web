<template>
    <div class="goods-list">
        <div class="search">
            <el-input @keyup.enter.native="onSearchGoods" style="width: 200px;" placeholder="搜索商品" v-model="productName">
                <el-button slot="prepend" icon="el-icon-search" @click="onSearchGoods"></el-button>
            </el-input>
        </div>
        <div class="table-wrapper">
            <el-table :data="goodsList" header-row-class-name="header-style" >
                <el-table-column label="商品操作" width="150px" >
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isSubContent">
                            <el-button type="text" @click="showMore(scope.$index,scope.row.id)" v-if="!scope.row['has_show_more']" class="iconColor">
                                <i class="el-icon-arrow-right"></i>
                            </el-button>
                            <el-button type="text" @click="packUp(scope.$index,scope.row.id)" v-if="scope.row['has_show_more']" class="iconColor">
                                <i class="el-icon-arrow-down"></i>
                            </el-button>
                            <el-button type="text" @click="viewGoods(scope.row.productId)">查看</el-button>
                            <el-button type="text" :disabled="true">编辑</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="SPU编码" prop="productId">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.productId">{{scope.row.productId}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="SKU编码" prop="skuId">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.skuId">{{scope.row.skuId}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="商品名称">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.productName">{{scope.row.productName}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="品牌" prop="brandCnName">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.brandCnName">{{scope.row.brandCnName}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="规格" prop="skuAttrsNew">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.skuAttrsNew">{{scope.row.skuAttrsNew}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="库存" prop="skuStock"></el-table-column>
                <el-table-column label="零售价" prop="skuPrice"></el-table-column>
                <el-table-column label="成本价" prop="skuCost"></el-table-column>
            </el-table>
            <div class="pagination-section">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="pageNo"
                               :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                               :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex'
    import * as C from '~/constants/api';
    import Api from '~/utils/api';
    export default{
        props: { operationId: String, flag: String },
        name: "GoodsList",
        data(){
            return {
                productName: '',
                goodsList: [],
                oneGoodsList: [],
                pageSize: 10,
                pageNo: 1,
                totalCount: 0,
                skuArray:[]
            }
        },
        computed: {

        },
        watch: {
            flag: function(nval, oval){
                this.refreshPage(nval)
            }
        },
        mounted(){
            this.refreshPage();
        },
        methods:{
            ...mapActions(["queryGoodsList","queryGoodsListSku","showPageLoading", "hidePageLoading"]),
            refreshPage(nval){
                this.showPageLoading();
                var resData ={
                    pageSize: this.pageSize,
                    pageNo: this.pageNo,
                    productName: this.productName,
                    cateId : nval
                }
                this.queryGoodsList(resData).then( resp => {
                    this.hidePageLoading();
                    resp.result.forEach(one => {
                        one.has_show_more = false;
                                 // 给记录添加是否已展开标记，true的话表示已经展开，false表示没有展开
                    });

                    this.goodsList = resp.result;
                    this.totalCount = resp.totalCount;
                })
            },
            onSearchGoods(){
                this.refreshPage();
                this.$message({
                    type: 'info',
                    message: '搜索商品'
                })
            },
            viewGoods(id){
                let res = this.flag;
                console.log(res);
                console.log(666)
                return
                this.$message({
                    type: 'info',
                    message: '查看商品'
                })
                window.sessionStorage.setItem('flag',res);
                window.sessionStorage.setItem('productId',id);
                let t = Math.random();
                this.$router.push("/goods/view?_t=" + t)
            },
            showMore(index,id){
                this.$message({
                    type: 'info',
                    message: '展开'
                })
                Api.queryGoodsListSku().then( (resp) => {
                    resp.result.forEach( one => {
                        one.isSubContent = true
                        // one.sub_show = true          //给返回的子列表添加字段作为标记，true的时候表示是展开的内容，没有该字段表示不是展开的内容
                    })
                    // this.oneGoodsList.splice(0,this.oneGoodsList.length);
                    // this.oneGoodsList.splice(0,0,...resp.result);
                    resp.result.forEach(item=>{
                        item.skuAttrsNew = ''
                        item.skuAttrs.forEach(one=>{
                            item.skuAttrsNew += one.attrValue + ','
                        })

                        item.skuAttrsNew = item.skuAttrsNew.substring(0,item.skuAttrsNew.length - 1 )
                    })
                    this.oneGoodsList = resp.result;
                    this.goodsList[index].sub_show_length = resp.result.length; //给展开的记录添加展开的内容长度标记
                    this.goodsList.splice(index + 1, 0, ...this.oneGoodsList);
                    this.goodsList[index].has_show_more = true;         //设置标记已展开
                })
            },
            packUp(index,id){
                this.$message({
                    type: 'info',
                    message: '收起'
                })
                let length = this.goodsList[index].sub_show_length;     //获取要删除的长度
                this.goodsList.splice(index + 1,length);                //删除展开的内容
                this.goodsList[index].has_show_more = false;            //设置标记未展开
                this.goodsList[index].sub_show_length = 0;
            },
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
    .goods-list{
        height: 100%;
        position: relative;
        padding: 0 15px;
        background-color: #fff;
        .search{
            position: absolute;
            z-index: 100;
            height: 70px;
            line-height: 70px;
            background-color: #fff;
            width: 100%;
        }
        .table-wrapper{
            height: 100%;
            overflow-y: scroll;
            padding-top: 70px;
            background-color: #fff;
            overflow-y: scroll;
            .row-show{
                word-break: keep-all;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .pagination-section {
                padding: 20px 0;
                text-align: right;
                right: 20px;
            }
        }
        .handleButtonContainer{
            width:26px;
            height:26px;
            line-height:26px;
            border-radius:50%;
            background-color:#eceff1;
            display:inline-block;
            text-align:center;
            vertical-align:middle;
            margin-right: 10px;
        }
    }
    .el-tooltip__popper.is-light {
        background: #fff;
        border: 1px solid #eee;
    }
    .el-tooltip__popper.is-light[x-placement^=bottom]  .popper__arrow {
        border-bottom-color: #eee;
    }
    .el-input-group__prepend{
        background-color: #fff;
    }
    .el-input-group--prepend .el-input__inner, .el-input-group__append {
        border-left: 0px;
        padding-left: 0;
    }
    .el-button+.el-button{
        margin-left: 5px;
    }
    .iconColor{
        color: black;
    }
    .el-pagination {
        .btn-prev, .btn-next{
            i{
                visibility: hidden;
            }
        }
        .btn-prev{
            &:before{
                content:"上一页"
            }
        }
        .btn-next{
            &:before{
                content:"下一页"
            }
        }
    }
</style>
