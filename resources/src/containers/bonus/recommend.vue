<template>
    <div id="recommend-list">
        <div class="search-tab">
            <span>归属区域：</span>
            <el-select size="medium" v-model="regionSelect" placeholder="请选择">
                <el-option v-for="item in regionInfo" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
            <span>所属平台：</span>
            <el-select size="medium" v-model="platformSelect" placeholder="请选择">
                <el-option v-for="item in platformInfo" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
            <el-button type="primary" @click="doSearch()">搜索</el-button>
        </div>
        <div class="table-container">
            <div class="table-wrapper">
                <el-table :data="recommendList" :height="tableHeight">
                    <el-table-column type="index" label="编号" width="80"></el-table-column>
                    <el-table-column prop="consumerName" label="消费者"></el-table-column>
                    <el-table-column prop="platform" label="来源"></el-table-column>
                    <el-table-column prop="introConsumerName" label="被推荐人"></el-table-column>
                    <el-table-column prop="region" label="归属地"></el-table-column>
                    <el-table-column prop="introChannel" label="推荐途径"></el-table-column>
                    <el-table-column prop="date" label="推荐时间" width="180"></el-table-column>
                </el-table>
                <div class="pagination-section">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                   :current-page="pageNo" background
                                   :page-sizes="pageSizes"
                                   :page-size="pageSize"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="totalCount">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import TableHeightMixins from "~/mixins/tableheight";
    import {routesMapping} from '~/router';
    import {mapActions, mapState} from 'vuex';
    import QuitMixins from "~/mixins/quit";
    import PlatformMixins from "~/mixins/platform";
    export default {
        name: "RecommendList",
        data() {
            return {
                //搜索地区值
                regionSearch: "",
                //地区下拉列表选中项
                regionSelect: "全国",
                //地区列表
                regionInfo: [],
                //搜索平台值
                platformSearch: "",                
                //平台下拉列表选中项
                platformSelect: "全部",
                //平台列表
                platformInfo: [],
                //推荐信息列表
                recommendList: [],
                //分页初始化
                pageNo: 1,
                totalCount: 0,
                pageSize: 10,
                pageSizes: [10, 20, 30, 40, 50, 100]
            };
        },
        mixins: [TableHeightMixins, QuitMixins, PlatformMixins],
        mounted() {
            this.setTableHeight(245);
            this.getRegionList();
            this.getPlatformList();
            this.doSearch();
        },
        methods: {
            ...mapActions(["queryRecommendList","queryRegionList","queryPlatformList","showPageLoading","hidePageLoading"]),
            handleSizeChange(nSize) {
                this.pageSize = nSize;
                this.refreshPage();
            },
            handleCurrentChange(nPage) {
                this.pageNo = nPage;
                this.refreshPage();
            },
            refreshPage() {
                this.showPageLoading();
                this.getRecommendList();
            },
            //获取推荐信息
            getRecommendList() {
                var param = {
                    region: encodeURIComponent(this.regionSelect),
                    platform: encodeURIComponent(this.platformSelect),
                    pageSize: this.pageSize,
                    pageNo: this.pageNo
                };
                this.queryRecommendList(param).then(resp => {
                    this.hidePageLoading();
                    this.recommendList = resp.result;
                    this.totalCount = resp.totalCount;
                }).catch((err) => {
                    this.recommendList = [];
                    this.totalCount = 0;
                    this.hidePageLoading();
                });
            },
            //获取地区信息
            getRegionList() {
                this.queryRegionList().then(resp => {
                    this.regionInfo = resp;
                });
            },
            //获取平台信息
            getPlatformList() {
                this.queryPlatformList().then(resp => {
                    this.platformInfo = resp;
                });
            },
            //搜索
            doSearch() {
                if (this.regionSelect != "" && this.platformSelect != "") {
                    this.showPageLoading();
                    this.regionSearch = this.regionSelect;
                    this.platformSearch = this.platformSelect;                   
                    this.getRecommendList();
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    #recommend-list {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        .search-tab{
            width: 100%;
            position: absolute;
            z-index: 10;
            padding: 20px;
            background-color: #fefefe; 
        }
        .table-container {
            background-color: #fff;
            height: 100%;
            width: 100%;
            padding: 78px 20px 0 20px;
            overflow-y: hidden;
            .table-wrapper {
                .cell {
                    font-size: 12px;
                }
            }
            .el-table__body-wrapper {
                overflow-x: hidden;
            }
            .pagination-section {
                padding: 20px 0;
                text-align: right;
                right: 20px;
            }
        }
        .el-select--medium{
            margin-right:40px;
        }
        /* reset button */
        .el-button--primary{
            padding: 10px 20px;
            font-size:12px;
            margin-right: 10px;
        }
    }
</style>
