<template>
    <!--第一个版本的确认调拨出库单-->
    <el-row class='outbound-view'>
        <!-- 基本信息 -->
        <el-row class="basicInfor">
            <el-form label-width="100px" class="outboundForm" :model="outboundDetail" >
                <h2>基本信息</h2>
                <el-col :span="7">
                     <el-form-item label="出库单号 :">
                        <el-col :span="22" >
                            <span class="row_width">{{stockPerOutId}}</span>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="15">
                    <el-form-item label="关联单号 :">
                        <el-col :span="22" >
                            <span class="row_width">{{outboundDetail.commonInfo.relatedSheetId}}</span>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="7" >
                    <el-form-item label="操作员 :">
                        <el-col :span="22" >
                            <!--<span class="row_width">{{outboundDetail.commonInfo.operator}}</span>-->
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="15" >
                    <el-form-item label="操作日期 :">
                        <el-col :span="10" >
                            <span class="row_width"></span>
                        </el-col>
                    </el-form-item>
                </el-col>
               <el-col :span="7" >
                    <el-form-item label="发货仓库 :">
                        <el-col :span="22" >
                            <span class="row_width">{{outboundDetail.commonInfo.storehouseName}}</span>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="10" >
                    <!--<el-form-item label="收货仓库 :">-->
                        <!--<el-col :span="10" >-->
                            <!--<span class="row_width">{{outboundDetail.deliverystorehouseName}}</span>-->
                        <!--</el-col>-->
                    <!--</el-form-item>-->
                </el-col>
                <el-col :span="20">
                     <el-form-item label="备注 :" >
                        <el-col :span="12">
                           <span  :rows="6" style="width:590px">{{outboundDetail.commonInfo.comments}}</span>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
        <el-row class="productListContainer">
            <el-col class="productList"><h2>商品清单</h2></el-col>
            <el-table class="ProductListTable" :data="productDetail">
                <el-table-column label="商品名称" prop="productName">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.productName">{{scope.row.productName}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="条码" prop="skuBarCode">
                     <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.skuBarCode">{{scope.row.skuBarCode}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="规格编码" prop="skuId">
                     <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.skuId">{{scope.row.skuId}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="规格" prop="skuName">
                     <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.skuName">{{scope.row.skuName}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="单位" prop="unitName"></el-table-column>
                <el-table-column label="出货数量" prop="stockOutCount"></el-table-column>
            </el-table>
        </el-row>
        <el-row class="submitBtn" style="text-align: center">
            <el-button type="info" @click="OnBackLatePage"  size="small">返回</el-button>
            <el-button type="primary" @click="onAllotCheck(stockPerOutId)" size="small">确认出库</el-button>
        </el-row>
    </el-row>
</template>
<script>
    import {mapActions, mapState} from 'vuex';
    import utils from '~/utils/misc';
    import platform from '~/mixins/platform';
    import MessageMixins from '~/mixins/messages';
    import {routesMapping} from '~/router';
    import QuitMixins from '~/mixins/quit'
    export default {
        name: 'ssetOutboundPage',
        mixins: [platform,MessageMixins,QuitMixins],
        data() {
            return {
                stockPerOutId:'',  //单次出库单号
                outboundDetail:{
                        commonInfo:{
                              operator:'',
                              storehouseName:'',
                              updateTime:'',
                              type:'',
                              outStatus:'',
                              usage:'',
                              comments:'',
                              relatedSheetId:'',
                              SheetType:''
                        },
                        productDetail:{
                            productId : '',
                            productName : '',
                            skuBarCode : '',
                            skuName : '',
                            unitName : '',
                        },
                        extraInfo : '',
                        deliverystorehouseName:''   //收货仓库
                },
                productDetail:[],  //商品详情
                viewAllotSheet:true, //确认调拨还是查看调拨
                isView : false
            }
        },
         mounted(){
            this.querySheetDetail();
        },
        // watch:{
        //     '$route':function (to, from) {
        //         this.querySheetDetail();
        //     }
        // },
        beforeMount(){
            this.$route.path.indexOf('outboundPage') >= 0 ? this.viewAllotSheet = true:this.viewAllotSheet = false;
        },
        methods: {
            ...mapActions(["queryStockOutSheetDetail","allotOutCheck","showPageLoading", "hidePageLoading"]),
            //点击返回
            OnBackLatePage(){
                this.quit(routesMapping.OutboundManagement, true)
            },
            //获取查看详情
            querySheetDetail(){
                this.showPageLoading();
                this.stockPerOutId = this.$route.params.stockPerOutId;
                let stockOutSheetId = this.$route.params.stockPerOutId;
                let relatedSheetId = this.$route.params.relatedSheetId;
                let type = this.$route.params.type;
                let reqData ={
                    stockPerOutId : stockOutSheetId,
                    relatedSheetId : relatedSheetId,
                    type:type
                }
                  this.queryStockOutSheetDetail(reqData).then( resp => {
                    this.hidePageLoading();
                    this.outboundDetail = resp;
                    this.productDetail = resp.productDetail
                })
            },
            //出库单类型
             formatSheetType(sheetType){
                   switch (sheetType) {
                case 1:
                    return '销售出库';
                case 2:
                    return '退货出库';
                case 3:
                    return '调拨出库';
                default:
                    return ''
                }
            },
            //确认出库
            onAllotCheck(stockPerOutId){
                var reqData = {
                    stockPerOutId : stockPerOutId
                }
                 this.allotOutCheck(reqData).then( resp => {
                     this.OnBackLatePage();
                     //刷新调拨管理列表
                     const tab = this.getTabByKey(routesMapping.StockTransfer);
                     if(tab){
                         this.refreshTab(tab)
                     }
                    this.showSuccess();
                }).catch(error => {
                     if (error.code == 16018) {
                         let meg = JSON.parse(error.msg);
                         let keys = Object.keys(meg);
                         let values = Object.values(meg);
                         this.$message({
                             message: `skuId为${keys[0]}的库存不足，库存为${values[0]}`,
                             type: 'error'
                         });
                     }
                 })
            },
            formatMomentData(data){
                return utils.formatMomentData(data)
            },
        }
    }
</script>
<style lang='scss'>
    .outbound-view{
        .productListContainer{
            margin-top:20px;
            background-color:white;
            h2{
            padding-left:20px;
            font:18px/60px normal;
            background-color:#F2F6FC;
            font-size:16px;
            line-height:50px;
                }
            .ProductListTable{
                padding:20px;
            }
        }
        .basicInfor{
            background:#FFF;
            .outboundForm{
                height:100%;
                 h2{
                    padding-left:20px;
                    font:18px/60px normal;
                    background-color:#F2F6FC;
                    margin-bottom:20px;
                    font-size:16px;
                    line-height:50px;
                }
                .row_width{
                    width:209px;
                }
            }
        }
        .submitBtn{
            text-align:center;
            padding:20px 0px;
        }
         .el-table__body-wrapper{
            overflow: inherit;
        }
    }

</style>
<style lang='scss' scope>
    .procurements-config-wrapper{
        overflow:inherit;
    }
</style>
