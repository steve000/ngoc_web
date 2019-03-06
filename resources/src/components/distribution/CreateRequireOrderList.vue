<template>
    <div class="commodity-list">
        <search @searchValue="getSearchValue" :isClear='isClear' :showPlaceholder="'输入商品名称/配送实体/要货实体'"></search>
        <div class="selectedUpOrDown">
            <label>已选{{selectedNum}}条：</label>
            <!-- <button v-if="param.status!==1" @click="changeDownUserRelationProductFunction(1)">上架</button> -->
            <!-- <button v-if="param.status!==2" @click="changeDownUserRelationProductFunction(2)">下架</button> -->
            <button v-if="param.status!==3" @click="changeDownUserRelationProductFunction(3)">生成要货单</button>
        </div>
        <div class="search_result_container" v-if="searchItemValueArray.length>0">
            <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount" @deleteItem="getDeleteItem"></search-result>
        </div>
        <div class="table-wrapper">
            <el-table ref="multipleTable" :data="recommendOrderList" border :height="tableHeight" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" :selectable="selectable">
                </el-table-column>
                <el-table-column label="推荐商品名称">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.skuName">{{scope.row.skuName}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="推荐要货数量">
                    <template slot-scope="scope">
                        <div class="row-show color-676767" :title="scope.row.recommendCount">{{scope.row.recommendCount}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="推荐类型">
                    <template slot-scope="scope">
                        <div class="row-show color-676767" :title="recommendTypeText[scope.row.recommendType]">
                            <span :class="returnClass(scope.row.recommendType)"></span>
                            {{recommendTypeText[scope.row.recommendType]}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <div class="row-show color-676767" :title="statusText[scope.row.status]">
                            <span :class="returnClass(scope.row.status)"></span>
                            {{statusText[scope.row.status]}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="配送实体">
                    <template slot-scope="scope">
                        <div class="row-show color-676767" :title="scope.row.disUserGroupName">{{scope.row.disUserGroupName}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="要货实体">
                    <template slot-scope="scope">
                        <div class="row-show color-676767" :title="scope.row.custUserGroupName">{{scope.row.custUserGroupName}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="备注">
                    <template slot-scope="scope">
                        <div class="row-show color-676767" :title="scope.row.comments">{{scope.row.comments}}</div>
                    </template>
                </el-table-column>
                <div slot="empty" class="table_slot_empty_text">
                    <div><img src="../../layouts/images/nodata.png" /></div>
                    <div>暂无数据</div>
                </div>
            </el-table>
            <div class="pagination-section">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="param.pageNo" background :page-size="param.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import TableHeight from '~/mixins/tableheight';
import Search from '~/components/common/Search';
import SearchResult from '~/components/common/SearchResult.vue'

export default {
    name: 'CommodityList',
    props: { operationId: Number, flag: String },
    mixins: [TableHeight],
    components: {
        Search,
        SearchResult
    },
    data() {
        return {
            recommendOrderList: [],
            totalCount: 0,
            isClick: false,
            productName: '',
            oneGoodsList: [],
            skuArray: [],
            selectedNum: 0,
            param: {
                pageSize: 10,
                pageNo: 1,
                searchKey: '',
                status: null,
                recommendType: null
            },
            recommendTypeText: {
                0: '新启用',
                1: '新到季',
                2: '智能',
            },
            statusText: {
                0: '未处理',
                1: '已处理',
                3: '生成要货单'
            },
            selectTableArray: [],
            searchItemValueArray: [],
            isClear: false,
            // 分类计数
            untreated: 0,
            completed: 0,
            newArrive: 0,
            newOpen: 0,
            intelligence: 0
        }
    },
    watch: {
        flag: function(nval) {
            console.log(nval,"status+recommendType");
            this.param.pageSize = 10;
            this.param.pageNo = 1;
            if (nval === '') {
                this.param.status = null;
                this.param.recommendType = null;
            } else if (nval === '1') {
                this.param.status = 0;
                this.param.recommendType = null;
            } else if (nval === '2') {
                this.param.status = 1;
                this.param.recommendType = null;
            } else if (nval === '3') {
                this.param.status = null;
                this.param.recommendType = 1;
            } else if (nval === '4') {
                this.param.status = null;
                this.param.recommendType = 0;
            } else if (nval === '5') {
                this.param.status = null;
                this.param.recommendType = 2;
            }
            this.refreshPage();
        },
        operationId: function(val1,val2) {
            console.log(val1,val2,"123");
            this.refreshPage()
        }
    },
    mounted() {
        this.setTableHeight(325);
        this.refreshPage();
    },
    methods: {
        ...mapActions(["recommendList", "recommendOrderAdd", "showPageLoading", "hidePageLoading"]),
        refreshPage(param = this.param) {
            this.showPageLoading();
            this.recommendOrderListFunction(param);
        },
        getSearchValue(searchValue) {
            this.param.searchKey = searchValue;
            this.searchItemValueArray = [searchValue];
            this.isClear = false;
            this.isClick = true;
            this.refreshPage();
        },
        getReset() {
            this.param.searchKey = "";
            this.param.status = "";
            this.isClick = false;
            this.refreshPage();
        },
        getDeleteItem(index) {
            this.searchItemValueArray.splice(index);
            this.isClear = true;
            this.param.searchKey = "";
            this.refreshPage()
        },
        // 是否可选
        selectable(row,index) {
            if(row.status === 1) { //已处理
                return 0;
            } else {
                return 1;
            }
        },
        // 勾选事件
        handleSelectionChange(val) {
            console.log(val,"选中数组");
            this.selectTableArray = val;
            this.selectedNum = val.length;
        },
        handleSizeChange(nSize) {
            this.param.pageSize = nSize;
            this.refreshPage();
        },
        handleCurrentChange(nPage) {
            this.param.pageNo = nPage;
            this.refreshPage();
        },
        recommendOrderListFunction(param) {
            this.recommendList(param).then((resp) => {
                console.log(resp);
                this.recommendOrderList = resp.result;
                this.totalCount = resp.totalCount;
                // 传参父组件
                // var i=0,j=0,m=0,n=0,p=0;
                //     for (let iii = 0; iii < resp.result.length; iii++) {
                //         if (resp.result[iii].status === 0) {
                //             i++;
                //         }
                //         if (resp.result[iii].status === 1) {
                //             j++;
                //         }
                //         if (resp.result[iii].recommendType === 0) {
                //             m++;
                //         }
                //         if (resp.result[iii].recommendType === 1) {
                //             n++;
                //         }
                //         if (resp.result[iii].recommendType === 2) {
                //             p++;
                //         }
                //     }
                //     this.untreated = i;
                //     this.completed = j;
                //     this.newOpen = m;
                //     this.newArrive = n;
                //     this.intelligence = p;
                //     this.$emit("getStatisticsData",[this.untreated,this.completed,this.newArrive,this.newOpen,this.intelligence]);
                this.hidePageLoading();
            })
        },
        changeDownUserRelationProductFunction(type) {
            if (this.selectTableArray.length <= 0) {
                this.$message({
                    message: '请选择商品',
                    type: 'error'
                });
                return
            }
            //  操作类型为3   选中即可操作
            let ids = [];
            for (let i = 0; i < this.selectTableArray.length; i++) {
                let item = this.selectTableArray[i];
                ids.push({"id": this.selectTableArray[i].id});
            }
            this.recommendOrderAdd({ids: ids}).then((resp) => {
                this.$message({
                    message: `${this.statusText[type]}成功`,
                    type: 'success'
                });
                // 数字变化
                this.$emit("getStatisticsData", 'change');
                this.refreshPage();
            })
        },
        returnClass(status) {
            if (status === 0) {
                return ' circle circle-FF6369'
            } else if (status === 1) {
                return ' circle circle-67C23A'
            } else if (status === 2) {
                return ' circle circle-CCCCCC'
            }

        },
    },

}
</script>

<style lang="scss">
.commodity-list {
    padding-top: 20px;
    position: relative;
    .search-component {
        right: 0;
    }
    .color-676767 {
        color: #676767;
    }
    .nav-title {
        display: flex;
        justify-content: space-between;
        margin: 0px 0px 16px;
        .search {
            margin-right: -11px;
        }
    }
    .productStatus {
        height: 34px;
        line-height: 34px;
        font-size: 12px;
        color: #333333;
        /*position: absolute;*/
        /*right:0px;*/
        /*top:20px;*/
        label {
            margin-right: 10px;
        }
        .el-input__inner {
            height: 34px;
            font-size: 12px;
            color: #666666;
            border: 1px solid #E0E0E0;
        }
    }
    .selectedUpOrDown {
        margin: 0px 0px 16px;
        label {
            font-size: 12px;
            color: #999999;
        }
        button {
            border: 1px solid #BFD9FE;
            border-radius: 3px;
            height: 34px;
            width: auto;
            font-size: 13px;
            line-height: 34px;
            color: #3B8CFF;
            background-color: #fff;
            outline: none;
            margin-right: 7px;
            padding: 0 10px;
        }
    }
}
</style>;
