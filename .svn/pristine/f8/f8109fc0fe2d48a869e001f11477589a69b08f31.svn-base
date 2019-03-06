<template>
    <div id="settlement-list">
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
            <el-button type="primary" @click="doSearch()">搜索</el-button><el-button type="warning" @click="loadFile()">导出</el-button>
        </div>
        <div class="table-container">
            <div class="table-wrapper">
                <el-table :data="settlementList" :height="tableHeight">
                    <el-table-column type="index" label="序号" width="80"></el-table-column>
                    <el-table-column prop="productName" label="购买商品" min-width="130"></el-table-column>
                    <el-table-column prop="consumerName" label="消费者"></el-table-column>
                    <el-table-column prop="introConsumerName" label="推荐人"></el-table-column>
                    <el-table-column prop="region" label="归属区域" width="100"></el-table-column>
                    <el-table-column prop="platform" label="所属平台"></el-table-column>
                    <el-table-column prop="directBonus" label="直接酬金"></el-table-column>
                    <el-table-column prop="introBonus" label="推荐酬金"></el-table-column>
                    <el-table-column prop="date" label="结算时间" width="180"></el-table-column>
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
        name: "settlementList",
        data() {
            return {
                //搜索地区值
                regionSearch: "",
                //地区下拉列表选中项
                regionSelect: "全国",
                //搜索平台值
                platformSearch: "",
                platformSelect: "",
                //地区列表
                regionInfo: [],
                //平台下拉列表选中项
                platformSelect: "全部",
                //平台列表
                platformInfo: [],
                //结算单信息列表
                settlementList: [],
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
            // 获取地区信息
            this.getRegionList();
            //获取平台信息
            this.getPlatfromList();
            this.doSearch();
        },
        methods: {
            ...mapActions(["querySettlementList","queryRegionList","queryPlatformList","exportSettlementList","showPageLoading","hidePageLoading"]),
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
                this.getSettlementList();
            },
            //获取结算单列表
            getSettlementList() {
                var param = {
                    region: encodeURIComponent(this.regionSelect),
                    platform: encodeURIComponent(this.platformSelect),
                    pageSize: this.pageSize,
                    pageNo: this.pageNo
                };
                this.querySettlementList(param).then(resp => {
                    this.hidePageLoading();
                    this.settlementList = resp.result;
                    this.totalCount = resp.totalCount;
                }).catch((err) => {
                    this.settlementList = [];
                    this.totalCount = 0;
                    this.hidePageLoading();
                });
            },
            //获取地区列表
            getRegionList() {
                this.queryRegionList().then(resp => {
                    this.regionInfo = resp;
                });
            },
            //获取平台列表
            getPlatfromList() {
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
                    this.getSettlementList();                   
                }
            },
            //导出酬金结算单
            loadFile: function() {
                var param = {
                    region: encodeURIComponent(this.regionSelect),
                    platform: encodeURIComponent(this.platformSelect),
                };
                this.exportSettlementList(param).then(resp => {
                    if (!document.getElementById('windowIframe')) {
                        const iframe  = document.createElement("iframe");
                        iframe.src = resp.fileUrl;
                        iframe.id = 'windowIframe';
                        iframe.style.display = "none";
                        document.body.appendChild(iframe);
                    } else {
                        document.getElementById('windowIframe').src = resp.fileUrl;
                    }
                });
            }
        }
    };
</script>


<style lang="scss" scoped>
    #settlement-list {
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
        .el-button--warning{
            padding: 10px 20px;
            font-size:12px;
            margin-right: 10px;
            background-color: #ffae3d;
            border-color: #ffae3d;
        }
    }
</style>
