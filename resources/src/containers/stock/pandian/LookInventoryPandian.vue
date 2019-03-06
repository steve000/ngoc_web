<template>
    <div class="inventory-pandianBox">
        <div class="inventory-pandian">
            <el-row style="font-size:17px;">
                <span class="pandianStockName"><i class="el-icon-mobile-phone"></i> {{storehouseName}}</span>
            </el-row>
            <el-row class="pandianTimeAndPeo" style="font-size:14px;">
                <el-col :span="5" v-if="isShowFinshTime"> 结束盘点时间：<span>{{finishTime}}</span></el-col>
                <el-col :span="4"> 盘 点 人 ：<span>{{currentUser}}</span></el-col>
                <el-col :span="4"> 盘点状态 ：<span>{{pandianName}}</span></el-col>
                <div class="pull-right">
                    <el-button type="reset" @click="quitCreate" size="small">&nbsp;返&nbsp;&nbsp;回&nbsp;</el-button>
                    <el-button type="reset" size="small" v-if="!isShowFinshTime" @click="goPandian()">继续盘点
                    </el-button>
                </div>
            </el-row>
            <div class="skuListingTab">
                <el-table :data="pandianDetailList" header-row-class-name="header-style">
                    <el-table-column label="条码" prop="skuBarCode" width="150">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.skuBarCode">{{scope.row.skuBarCode}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品名称" prop="skuName" min-width="100px">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.skuName">{{scope.row.skuName}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="规格编码">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.skuId">{{scope.row.skuId}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="规格" prop="attrInfo">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.attrInfo_a">{{scope.row.attrInfo_a}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="应有库存" prop="dueCount" width="150">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.dueCount">{{scope.row.dueCount}}</div>
                        </template>
                    </el-table-column>


                    <el-table-column label="实际库存" prop="actualCount" width="150">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.actualCount">{{scope.row.actualCount}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="盘点结果" prop="resultType">
                        <template slot-scope="scope">
                            <div v-if="scope.row.resultType == 0">--</div>
                            <div v-if="scope.row.resultType == 1">正常</div>
                            <div v-if="scope.row.resultType == 2">盘盈</div>
                            <div v-if="scope.row.resultType == 3">盘亏</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注说明" prop="comments" width="150">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.comments">{{scope.row.comments}}</div>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="pagination-section">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" background layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import PlatformMixins from '~/mixins/platform'
    import {mapActions, mapState} from 'vuex'
    import QuitMixins from '~/mixins/quit'
    import {routesMapping} from '~/router'
    export default{
        name: "lookinventorypandian",
        mixins: [PlatformMixins, QuitMixins],
        data(){
            return {
                storehouseName: '',
                inventoryId: "",//盘点id
                storehouse_id: "",//仓库id
                pandianDetailList: [],
                totalCount: 0,
                pageSize: 10,
                pageNo: 1,
                finishTime: '',
                nPage: 1,
                pandianStatus: 2,
                pandianName: '',
                isShowFinshTime: false
            }
        },
        mounted(){
            const userName = sessionStorage.getItem('userName');
            userName && this.changeCurrentUser(userName);
            this.refreshPage();
        },
        watch: {
            $route(to, from) {
                this.whatType = to.params.whatType;
                this.pandianStatus = to.params.status;
                this.watchRoiter()
            }
        },
        beforeMount() {
            this.storehouse_id = this.$route.params.storehouse_id;//仓库id
            this.inventoryId = this.$route.params.inventoryId;//盘点iid
            this.pandianStatus = this.$route.params.status
            this.watchRoiter()
        },
        activated() {
            this.refreshPage()

        },
        created() {
            this.storehouseName = sessionStorage.getItem('storehouseName');  //仓库名称
        },
        computed: {
            ...mapState({
                currentUser: ({root}) => root.currentUser,
            }),
        },
        methods: {
            ...mapActions(["queryPandianIdDetailList", "showPageLoading", "hidePageLoading", 'changeCurrentUser']),
            refreshPage(){
                this.showPageLoading();
                let resData = { pageSize: this.pageSize,pageNo: this.pageNo,inventoryId: this.inventoryId  }
                this.queryPandianIdDetailList(resData).then(resp => {
                    this.hidePageLoading();
                    if (resp.result == null || resp.result == "" || resp.result == undefined) {
                        this.pandianDetailList = []
                    } else {
                        let result = resp.result;
                        result.forEach(item => {
                            item.attrInfo_a = ''
                            let attrInfo1 = JSON.parse(item.attrInfo)
                            attrInfo1.forEach(one => {
                                item.attrInfo_a += one.attrValue + ','
                            })
                            item.attrInfo_a = item.attrInfo_a.substring(0, item.attrInfo_a.length - 1)
                        })
                        this.pandianDetailList = result;
                        this.totalCount = resp.totalCount;
                    }
                })
            },
            //监控路由
            watchRoiter(){
                if (this.pandianStatus == 2) {
                    this.pandianName = '已完成'
                    this.isShowFinshTime = true;
                    this.finishTime = sessionStorage.getItem('finishTime')
                } else if (this.pandianStatus == 1) {
                    this.pandianName = '盘点中'
                    this.isShowFinshTime = false;
                }
            },
            quitCreate(){
                this.quit(routesMapping.InventoryPandianLog)
            },
            goPandian(){
                sessionStorage.setItem('storehouseName', this.storehouseName);
                //去下个页面关闭这个页面，但需要携带参数
                this.shiftPage(routesMapping.InventoryPandian,`/stock/management/inventorypandian/${this.inventoryId}/${this.storehouse_id}/${this.pandianStatus}`)
            },
            handleSizeChange(nSize){
                this.pageSize = nSize;
                this.refreshPage();
            },
            handleCurrentChange(nPage){
                this.pageNo = nPage;
                this.refreshPage();
            },
        }
    }
</script>
<style lang="scss">
    .inventory-pandian {
        width: 100%;
        position: relative;
        padding: 20px;
        background: #fff;
        .pandianTimeAndPeo {
            margin-top: 20px;
            font-size: 16px;
            height: 30px;
            line-height: 30px;
        }
        .pandianStockName {
            font-size: 16px;
        }
        .skuListingTab {
            margin-top: 20px;
        }
        .pagination-section {
            padding-top: 20px;
            text-align: right;
            right: 20px;
        }
    }
</style>
