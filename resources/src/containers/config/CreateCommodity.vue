<template>
    <div class="create-commodity">
        <div class="create-commodity-container">
            <div class="content-wrapper">
                <div class="nav-top">
                    <div class="productStatus">
                        <label>商品分类：</label>
                        <div class="cate-select-container">
                            <div class="cate-item-container" v-if="cateIdOne.isShow">
                                <el-select v-model="cateIdOneCateId" placeholder="请选择"
                                           clearable
                                           :popper-class="'reset-select-option-padding'"
                                           @change="getCateIdOne">
                                    <el-option
                                        v-for="item in cateIdOne.cateList"
                                        :key="item.cateId"
                                        :label="item.cateName"
                                        class="reset-option-font"
                                        :value="item.cateId">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="cate-item-container" v-if="cateIdTwo.isShow">
                                <el-select v-model="cateIdTwoCateId" placeholder="请选择"
                                           clearable
                                           @change="getCateIdTwo">
                                    <el-option
                                        v-for="item in cateIdTwo.cateList"
                                        :key="item.cateId"
                                        :label="item.cateName"
                                        :value="item.cateId">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="cate-item-container" v-if="cateIdThree.isShow">
                                <el-select v-model="cateIdThreeCateId" placeholder="请选择" clearable
                                           @change="getCateIdThree">
                                    <el-option
                                        v-for="item in cateIdThree.cateList"
                                        :key="item.cateId"
                                        :label="item.cateName"
                                        :value="item.cateId">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <search @searchValue="getSearchValue"
                                :isClear='isClear'
                                :showPlaceholder="'输入商品名称或是编码进行查询'"></search>
                    </div>
                </div>
                <div class="search_result_container" v-if="searchItemValueArray.length>0">
                    <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount"
                                   @deleteItem="getDeleteItem"></search-result>
                </div>
                <p class="selectNum">已选中{{selectedNum}}条：
                    <button @click="userRelationProductFunction">添加</button>
                </p>
                <div class="table-wrapper-container table-empty-height">
                    <el-table
                        ref="commodityTable"
                        :data="commodityList"
                        border
                        @select="handSelect"
                        @select-all="handSelect"
                    >
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
                        <el-table-column label="单位">
                            <template slot-scope="scope">
                                <div class="row-show" :title="scope.row.unitName">{{scope.row.unitName}}
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
                                   :current-page.sync="queryUserUnRelationProductParam.pageNo" background
                                   :page-size="queryUserUnRelationProductParam.pageSize"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="totalCount"
                    >
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import PlatformMixins from '~/mixins/platform';
    import Search from '~/components/common/Search';
    import QuitMixins from '~/mixins/quit';
    import SearchResult from '~/components/common/SearchResult.vue';
    export default {
        name: 'CreateCommodity',
        data () {
            return {
                isClick: false,
                selectedNum: 0,
                cateId: '',
                cateIdLength: [],
                cateIdOneCateId: '',
                cateIdTwoCateId: '',
                cateIdThreeCateId: '',
                cateIdOne: {
                    isShow: true,
                    cateList: []
                },
                cateIdTwo: {
                    isShow: false,
                    cateList: []
                },
                cateIdThree: {
                    isShow: false,
                    cateList: []
                },
                selectArray: [],
                queryUserUnRelationProductParam: {
                    pageSize: 10,
                    pageNo: 1,
                    cateId: '',
                    searchContent: ''
                },
                selectAllObject: {},
                prePageSub: 1,
                isChange: false,
                searchItemValueArray: [],
                isClear: false
            };
        },
        computed: {
            ...mapState({
                cate: ({cate}) => cate.cateAll,
                commodityList: ({commodity}) => commodity.commodity.commodityListUnRelation.commodityList,
                totalCount: ({commodity}) => commodity.commodity.commodityListUnRelation.totalCount
            })
        },
        mixins: [PlatformMixins, QuitMixins],
        components: {
            Search,
            SearchResult
        },
        mounted () {
            this.refreshPage();
            this.queryCateAll().then((resp) => {
                this.cateIdOne.cateList = [{'level': '', 'cateId': '', 'cateName': '全部分类', 'childs': []}, ...this.cate];
            });
        },
        methods: {
            ...mapActions(['queryUserUnRelationProduct', 'queryCateAll', 'userRelationProduct', 'showPageLoading', 'hidePageLoading']),
            refreshPage (param = this.queryUserUnRelationProductParam) {
                this.showPageLoading();
                this.queryUserUnRelationProductFunction(param);
            },
            getSearchValue (searchValue) {
                this.queryUserUnRelationProductParam.searchContent = searchValue;
                this.isClick = true;
                this.searchItemValueArray = [searchValue];
                this.isClear = false;
                this.refreshPage();
            },
            getReset () {
                this.queryUserUnRelationProductParam.searchContent = '';
                this.isClick = false;
                this.cateIdOneCateId = '';
                this.cateIdTwoCateId = '';
                this.cateIdThreeCateId = '';
                this.cateIdTwo.isShow = false;
                this.cateIdTwo.cateList = [];
                this.cateIdThree.isShow = false;
                this.queryUserUnRelationProductParam.pageNo = 1;
                this.resetSelectData();
                this.refreshPage();
            },
            getDeleteItem (index) {
                this.searchItemValueArray.splice(index);
                this.isClear = true;
                this.queryUserUnRelationProductParam.searchContent = '';
                this.refreshPage();
            },
            handleSizeChange (nSize) {
                this.queryUserUnRelationProductParam.pageSize = nSize;
                this.resetSelectData();
                this.refreshPage();
            },
            handleCurrentChange (nPage) {
                const page = this.prePageSub;
                // 判断当前页是否有选中的数据，如果有就保留，没有就赋值
                typeof (this.selectAllObject[page]) === 'undefined' ? this.selectAllObject[page] = {} : this.selectAllObject[page];
                typeof (this.selectAllObject[page].commodityList) === 'undefined' ? this.selectAllObject[page].commodityList = [] : this.selectAllObject[page].commodityList;
                // 判断当前选中是否有改变
                this.isChange === true ? this.selectAllObject[page].commodityList = this.selectArray : this.selectAllObject[page].commodityList;
                this.queryUserUnRelationProductParam.pageNo = nPage;
                this.prePageSub = nPage;
                this.refreshPage();
                this.selectArray = [];
                this.isChange = false;
            },
            handSelect (selection) {
                this.selectArray = selection;
                this.isChange = true;
                let num = 0;
                // 计算选中的条数
                for (let item in this.selectAllObject) {
                    if (Number(item) !== Number(this.queryUserUnRelationProductParam.pageNo)) {
                        if (this.selectAllObject[item].commodityList && this.selectAllObject[item].commodityList.length > 0) {
                            num += this.selectAllObject[item].commodityList.length;
                        }
                    }
                };
                this.selectedNum = num + selection.length;
            },
            resetSelectData () {
                this.prePageSub = 1;
                this.isChange = false;
                this.selectAllObject = {};
                this.selectedNum = 0;
            },
            initSelect () {
                this.cateIdTwo.isShow = false;
                this.cateIdThree.isShow = false;
            },
            getCateIdOne (val) {
                this.queryUserUnRelationProductParam.cateId = val;
                let findiItem = this.cateIdOne.cateList.find((item) => {
                    return item.cateId === val;
                });
                if (findiItem && findiItem.childs && findiItem.childs.length > 0) {
                    this.cateIdTwoCateId = '';
                    this.cateIdThreeCateId = '';
                    this.cateIdTwo.isShow = true;
                    this.cateIdTwo.cateList = findiItem.childs;
                    this.cateIdThree.isShow = false;
                } else {
                    this.initSelect();
                }
                this.queryUserUnRelationProductParam.pageNo = 1;
                this.resetSelectData();
                this.refreshPage();
            },
            getCateIdTwo (val) {
                if (val && val !== null) {
                    this.queryUserUnRelationProductParam.cateId = val;
                } else {
                    this.queryUserUnRelationProductParam.cateId = this.cateIdOneCateId;
                }
                let findiItem = this.cateIdTwo.cateList.find((item) => {
                    return item.cateId === val;
                });
                this.cateIdThreeCateId = '';
                if (findiItem && findiItem.childs && findiItem.childs.length > 0) {
                    this.cateIdThree.isShow = true;
                    this.cateIdThree.cateList = findiItem.childs;
                } else {
                    this.cateIdThree.isShow = false;
                }
                this.queryUserUnRelationProductParam.pageNo = 1;
                this.resetSelectData();
                this.refreshPage();
            },
            getCateIdThree (val) {
                if (val && val !== null) {
                    this.queryUserUnRelationProductParam.cateId = val;
                } else {
                    this.queryUserUnRelationProductParam.cateId = this.cateIdTwoCateId;
                }
                this.queryUserUnRelationProductParam.pageNo = 1;
                this.resetSelectData();
                this.refreshPage()
            },
            queryUserUnRelationProductFunction (param) {
                this.queryUserUnRelationProduct(param).then((resp) => {
                    this.hidePageLoading();
                    const page = this.prePageSub;
                    if (this.selectAllObject[page] && this.selectAllObject[page].commodityList && this.selectAllObject[page].commodityList.length > 0) {
                        for (let i = 0; i < this.selectAllObject[page].commodityList.length; i++) {
                            let commodityListItem = this.selectAllObject[page].commodityList[i];
                            // 判断当前页是否需要选中的行
                            let index = this.commodityList.findIndex((item) => {
                                return item.skuId === commodityListItem.skuId;
                            });
                            if (index >= 0) {
                                this.$refs.commodityTable.toggleRowSelection(this.commodityList[index], true);
                            }
                        }
                    }
                });
            },
            userRelationProductFunction () {
                if (Number(this.selectedNum) <= 0) {
                    this.$message({
                        message: '请选择商品',
                        type: 'error'
                    });
                    return;
                }
                let skuIds = [];
                const page = this.prePageSub;
                typeof (this.selectAllObject[page]) === 'undefined' ? this.selectAllObject[page] = {} : this.selectAllObject[page];
                this.isChange === true ? this.selectAllObject[page].commodityList = this.selectArray : this.selectAllObject[page].commodityList;
                //push选中数据到数组里面
                for (let item in this.selectAllObject) {
                    if (this.selectAllObject[item].commodityList && this.selectAllObject[item].commodityList.length > 0) {
                        for (let j = 0; j < this.selectAllObject[item].commodityList.length; j++) {
                            let commodityListItem = this.selectAllObject[item].commodityList[j];
                            skuIds.push(commodityListItem.skuId);
                        }
                    }
                }
                this.userRelationProduct({skuIds: skuIds}).then((resp) => {
                    this.$message({
                        message: `添加商品成功`,
                        type: 'success'
                    });
                    this.quit(this.routesMapping.CommodityConfig);
                });
            }
        }
    }
</script>

<style lang="scss">
    .create-commodity {
        height: 100%;
        padding: 10px 30px 0px 30px;
        .create-commodity-container{
            height: 100%;
            background-color: #ffffff;
        }
        .content-wrapper {
            padding: 20px 20px 0px 20px;
            background-color: #ffffff;
            /*height: inherit;*/
            .nav-top {
                display: flex;
                justify-content: space-between;
            }
            .productStatus {
                height: 34px;
                line-height: 34px;
                font-size: 12px;
                color: #333333;
                width: auto;
                label {
                    margin-right: 10px;
                }
                .el-input__inner {
                    height: 34px;
                    font-size: 12px;
                    color: #666666;
                    border: 1px solid #E0E0E0;
                }
                .cate-select-container {
                    display: inline-block;
                    .cate-item-container {
                        display: inline-block;
                        .el-input__inner{
                            height: 32px;
                        }
                    }
                    .cate-item-container:not(:last-child) {
                        margin-right: 10px;
                    }
                }
            }
            .selectNum {
                font-size: 12px;
                color: #999999;
                line-height: 12px;
                margin-bottom: 16px;
                button{
                    margin-left: 2px;
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
            }
            .pagination-section{
                padding-right: 0px;
            }
        }
    }
</style>
