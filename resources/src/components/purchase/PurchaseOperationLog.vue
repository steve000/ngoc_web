<template>
    <div class="purchase-operation-log">
    	<el-table :data="LogList">
            <el-table-column label="操作内容" prop="content" min-width="100">
                <template slot-scope="scope">
                    <div class="row-show workContent" :title="scope.row.content" @click="onWorkContent(scope.$index, scope.row)">
                        {{scope.row.content ? scope.row.content : '--'}}
                        <el-button style="float:right;line-height: 24px;" type="text" size="small" >详情</el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作人" min-width="110" prop="operateUsername">
                <template slot-scope="scope">
                    <div class="row-show" :title="scope.row.operateUsername">
                        {{scope.row.operateUsername ? scope.row.operateUsername : '--'}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作时间"  min-width="130" prop="createTime">
                <template slot-scope="scope">
                    <div class="row-show" :title="scope.row.createTime">
                        {{scope.row.createTime ? scope.row.createTime : '--'}}
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <modal title="入库记录" class="putStorageModal" v-model="isShowPutStorage" width="65%">
            <div>
                <label style="display:inline-block;width:30%">入库单号：<span>{{editPutStorage.stockPerInId1}}</span></label>
                <label>备注：<span>{{editPutStorage.comments}}</span></label>
            </div>
            <div style="margin:18px 0;">
                <label style="display:inline-block;width:30%">操作人：<span>{{editPutStorage.username}}</span></label>
                <label>操作日期：<span>{{editPutStorage.createTime}}</span></label>
            </div>
            <el-table :data="editPutStorage.skuList" border >
                <el-table-column label="商品名称" min-width="130">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.skuName">
                            {{scope.row.skuName ? scope.row.skuName : '--'}}

                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="sku编码" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.skuId">
                            {{scope.row.skuId ? scope.row.skuId : '--'}}

                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="采购数量" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.totalCount">
                            {{scope.row.totalCount ? scope.row.totalCount : '--'}}

                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="单位" prop="updateTime" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.unitName">
                            {{scope.row.unitName ? scope.row.unitName : '--'}}

                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="本次入库" prop="InCount" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.InCount">
                            {{scope.row.InCount ? scope.row.InCount : '--'}}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button v-if="false">取 消</el-button>
                <el-button v-if="false">确 定</el-button>
            </span>
        </modal>
        <modal title="编辑订单详情" v-model="isShowOrderDetails" width="80%" class="edieOrderDetails">
            <h5 class="fontSize16">编辑前：</h5>
            <div class="editDetailsBackColor">
                <h5>采购单号：{{editDetails.editBefore.purchaseId}}</h5>
                <div >
                    <div class="edieOrderDetailsLeft edieOrderDetailsLeftBefore">
                        <el-table :data="editDetails.editBefore.skuList" class="editDetailsDialogTab">
                            <el-table-column label="商品名称" prop="skuName">
                                <template slot-scope="scope">
                                    <div class="row-show beforeSkuName" :title="scope.row.skuName">
                                        {{scope.row.skuName ? scope.row.skuName : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="sku编码" prop="skuId">
                                <template slot-scope="scope">
                                    <div class="row-show beforeSkuId" :title="scope.row.skuId">
                                        {{scope.row.skuId ? scope.row.skuId : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="单位" prop="unitName">
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.unitName">
                                        {{scope.row.unitName ? scope.row.unitName : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="采购单价（元）" prop="purchasePrice">
                                <template slot-scope="scope">
                                    <div class="row-show beforePurchasePrice" :title="scope.row.purchasePrice">
                                        aaa{{Number(scope.row.purchasePrice)/100}}
                                       
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="采购数量" prop="purchaseCount">
                                <template slot-scope="scope">
                                    <div class="row-show beforePurchaseCount" :title="scope.row.purchaseCount">
                                        {{scope.row.purchaseCount ? scope.row.purchaseCount : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                             <el-table-column label="总价（元）">
                                <template slot-scope="scope">
                                    <div class="row-show" :title="Number(scope.row.purchaseCount)*scope.row.purchasePrice">
                                        {{(Number(scope.row.purchaseCount)/100)*(Number(scope.row.purchasePrice))/100}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="备注" prop="comment">
                                <template slot-scope="scope">
                                    <div class="row-show beforeComment" :title="scope.row.comment">
                                        {{scope.row.comment ? scope.row.comment : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="edieOrderDetailsRight" style="margin-top:20px">
                        <h3>基本信息</h3>
                        <el-form :modle="editDetails.editBefore"  label-position="left">
                            <el-form-item label="操作人：">
                                    <span :class="modifyedShowRed(editDetails.editBefore.operateUserName,editDetails.editAfter.operateUserName) ? '' : 'red-font' ">
                                        {{editDetails.editBefore.operateUserName ? editDetails.editBefore.operateUserName : '--'}}
                                    </span>
                            </el-form-item>
                            <el-form-item label="收货仓库：">
                                <span :class="modifyedShowRed(editDetails.editBefore.storehouseName,editDetails.editAfter.storehouseName) ? '' : 'red-font' ">
                                    {{editDetails.editBefore.storehouseName ? editDetails.editBefore.storehouseName : '--'}}
                                </span>
                            </el-form-item>
                            <el-form-item label="订单金额：">
                                <label class="IndexNum"><i>￥</i> <span :class="modifyedShowRed(editBeforeTotalPrice,editAfterTotalPrice) ? '' : 'red-font' ">
                                    {{Number(editBeforeTotalPrice)/100 ? Number(editBeforeTotalPrice)/100 : '--'}}
                                </span></label>
                            </el-form-item>
                            <el-form-item label="计划到货时间：">
                                <span :class="modifyedShowRed(editDetails.editBefore.planArrivalTime,editDetails.editAfter.planArrivalTime) ? '' : 'red-font' ">
                                    {{editDetails.editBefore.planArrivalTime ? editDetails.editBefore.planArrivalTime : '--'}}
                                </span>
                            </el-form-item>
                            <el-form-item label="供应商：">
                                <span :class="modifyedShowRed(editDetails.editBefore.supplier,editDetails.editAfter.supplier) ? '' : 'red-font' ">
                                    {{editDetails.editBefore.supplier ? editDetails.editBefore.supplier : '--'}}
                                </span>
                            </el-form-item>
                            <el-form-item label="备注：">
                                <span style="word-wrap:break-word" :class="modifyedShowRed(editDetails.editBefore.comment,editDetails.editAfter.comment) ? '' : 'red-font' ">
                                    {{editDetails.editBefore.comment ? editDetails.editBefore.comment : '--'}}
                                </span>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <h5 class="fontSize16">编辑后：</h5>
            <div class="editDetailsBackColor">
                <h5>采购单号：{{editDetails.editAfter.purchaseId}}</h5>
                <div >
                    <div class="edieOrderDetailsLeft edieOrderDetailsLeftAfter">
                        <el-table :data="editDetails.editAfter.skuList" class="editDetailsDialogTab">
                            <el-table-column label="商品名称" prop="skuName">
                                <template slot-scope="scope">
                                    <div class="row-show skuName" :title="scope.row.skuName">
                                        {{scope.row.skuName ? scope.row.skuName : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="sku编码" prop="skuId">
                                <template slot-scope="scope">
                                    <div class="row-show skuId" :title="scope.row.skuId">
                                        {{scope.row.skuId ? scope.row.skuId : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="单位" prop="unitName">
                                <template slot-scope="scope ">
                                    <div class="row-show unitName" :title="scope.row.unitName">
                                        {{scope.row.unitName ? scope.row.unitName : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="采购单价（元）" prop="purchasePrice">
                                <template slot-scope="scope">
                                    <div class="row-show purchasePrice" :title="scope.row.purchasePrice">
                                        {{scope.row.purchasePrice ? Number(scope.row.purchasePrice)/100 : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="采购数量" prop="purchaseCount">
                                <template slot-scope="scope">
                                    <div class="row-show purchaseCount" :title="scope.row.purchaseCount">
                                        {{scope.row.purchaseCount ? scope.row.purchaseCount : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                             <el-table-column label="总价（元）">
                                <template slot-scope="scope">
                                    <div class="row-show totalCount" :title="Number(scope.row.purchaseCount)*Number(scope.row.purchasePrice)/100">
                                        {{Number(scope.row.purchaseCount)*Number(scope.row.purchasePrice)/100}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="备注" prop="comment">
                                <template slot-scope="scope">
                                    <div class="row-show comment" :title="scope.row.comment">
                                        {{scope.row.comment ? scope.row.comment : '--'}}
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="edieOrderDetailsRight" style="margin-top:20px">
                        <h3>基本信息</h3>
                        <el-form :modle="editDetails.editAfter" label-position="left">
                            <el-form-item label="操作人：">
                                <span :class="modifyedShowRed(editDetails.editBefore.operateUserName,editDetails.editAfter.operateUserName) ? '' : 'red-font' ">
                                    {{editDetails.editAfter.operateUserName ? editDetails.editAfter.operateUserName : '--'}}
                                </span>
                            </el-form-item>
                            <el-form-item label="收货仓库：">
                                <span :class="modifyedShowRed(editDetails.editBefore.storehouseName,editDetails.editAfter.storehouseName) ? '' : 'red-font' ">
                                    {{editDetails.editAfter.storehouseName ? editDetails.editAfter.storehouseName : '--'}}
                                </span>
                            </el-form-item>
                            <el-form-item label="订单金额：">
                                <label class="IndexNum"><i>￥</i> <span :class="modifyedShowRed(editBeforeTotalPrice,editAfterTotalPrice) ? '' : 'red-font' ">
                                    {{editAfterTotalPrice ? editAfterTotalPrice : '--'}}
                                </span></label>
                            </el-form-item>
                            <el-form-item label="计划到货时间：">
                                <span :class="modifyedShowRed(editDetails.editBefore.planArrivalTime,editDetails.editAfter.planArrivalTime) ? '' : 'red-font' ">
                                    {{editDetails.editAfter.planArrivalTime ? editDetails.editAfter.planArrivalTime : '--'}}
                                </span>
                            </el-form-item>
                            <el-form-item label="供应商：">
                                <span :class="modifyedShowRed(editDetails.editBefore.supplier,editDetails.editAfter.supplier) ? '' : 'red-font' ">
                                    {{editDetails.editAfter.supplier ? editDetails.editAfter.supplier : '--'}}
                                </span>
                            </el-form-item>
                            <el-form-item label="备注：">
                                <span style="word-wrap:break-word" :class="modifyedShowRed(editDetails.editBefore.comment,editDetails.editAfter.comment) ? '' : 'red-font' ">
                                    {{editDetails.editAfter.comment ? editDetails.editAfter.comment : '--'}}
                                </span>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button v-if="false">取 消</el-button>
                <el-button v-if="false">确 定</el-button>
            </span>
        </modal>
        <modal title="编辑备注" v-model="isShowEditComments" width="65%">
            <h5 class="fontSize16">编辑前：</h5>
            <div class="editContent">{{edieComment.editBefore ? edieComment.editBefore : '--'}}</div>
            <h5 class="fontSize16">编辑后：</h5>
            <div class="editContent">{{edieComment.editAfter}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button v-if="false">取 消</el-button>
                <el-button v-if="false">确 定</el-button>
            </span>
        </modal>
        <modal title="编辑计划到货时间" class="elditTimeBefAft" v-model="isShowPlanGoodsTime" width="65%">
            <el-form :model="editPlanArriveTime" class="editPlanArriveTimeDiaalogForm">
                <h5 class="fontSize16">编辑前：</h5>
                <el-form-item label="计划到货时间">
                  <span class="goodArriveBefor">{{editPlanArriveTime.editBefore ? editPlanArriveTime.editBefore : '--'}}</span>
                </el-form-item>
                <h5 class="fontSize16">编辑后：</h5>
                <el-form-item label="计划到货时间">
                    <span class="goodArriveAfter">{{editPlanArriveTime.editAfter}}</span>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button v-if="false">取 消</el-button>
                <el-button v-if="false">确 定</el-button>
            </span>
        </modal>
    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex'
    import Modal from '~/components/common/Modal.vue';
    export default {
        name: "PurchaseOperationLog",
        components: { Modal},
        props: {purchaseId: String },
        data(){
            return {
                purchaseIdnew:'',//采购ID最新传进来的
                LogList:[],
                isShowPutStorage:false,//点击入库记录，弹出入库的弹框
                editPutStorage:{},//弹框里的入库记录
                isShowOrderDetails:false,//显示详情
                editDetails:{
                    logId:"",
                    editBefore:{},
                    editAfter:{}
                },
                editBeforeTotalPrice:0,
                editAfterTotalPrice:0,
                isShowEditComments:false,//编辑备注
                isShowPlanGoodsTime:false,//计划到货时间
                edieComment:{},
                editPlanArriveTime:{},
            }
        },
        watch: {
            purchaseId(newPurchaseId ,oldPurchaseId){
                this.purchaseIdnew = newPurchaseId;
                this.refreshPage();
            }
        },
        computed: {
        },
        mounted(){
            this.refreshPage();
        },
        methods: {
            ...mapActions(["queryPurchaseLog","queryPurchaseIdModify","queryStockInDetailAction","showPageLoading", "hidePageLoading"]),
            //请求操作日志列表
            refreshPage(){
                let params = {purchaseId:this.purchaseIdnew,isPage:false}
                this.queryPurchaseLog(params).then((res)=>{
                    this.LogList = res.logList;
                })
            },
            //操作日志弹出事件
            onWorkContent(index,row){
                //修改类型:1:编辑,2:修改到货时间,3:修改备注, 4:入库操作
                let _this = this;
                let params = {logId:row.logId}
                _this.logId = row.logId;
                if(row.modifyType == 4){
                    let stockPerInIdParms = {stockPerInId : row.content.substring(5)}
                    _this.queryStockInDetailAction(stockPerInIdParms).then((res)=>{
                        _this.editPutStorage = res
                        _this.editPutStorage.stockPerInId1 = row.content.substring(5)
                        _this.isShowPutStorage = true;
                    })
                }else if(row.modifyType == 2){
                    _this.getEditBeforeAndAfter(params,row.modifyType)
                }else if(row.modifyType == 3){
                    _this.getEditBeforeAndAfter(params,row.modifyType)
                }else if(row.modifyType == 1){
                    _this.getEditBeforeAndAfter(params,row.modifyType)
                }
            },
            getEditBeforeAndAfter(params,modifyType){
                let _this = this;
                 _this.queryPurchaseIdModify(params).then((res) => {
                    if(modifyType==1){
                        _this.editDetails.logId = res.logId
                        _this.editDetails.editBefore = res.editBefore;
                        _this.editDetails.editAfter = res.editAfter
                        let skuList = _this.editDetails.editBefore.skuList
                        let skuListAfter = _this.editDetails.editAfter.skuList
                        skuList.forEach(item => {
                            this.editBeforeTotalPrice += item.purchasePrice*item.purchaseCount
                        })
                        skuListAfter.forEach(item => {
                            this.editAfterTotalPrice += Number(item.purchasePrice)/100*item.purchaseCount
                        })
                        _this.isShowOrderDetails  = true;
                        setTimeout(function(){
                            _this.modifyedTabRed()
                        },100)
                    }else if(modifyType==2){
                        _this.editPlanArriveTime = res
                        _this.isShowPlanGoodsTime = true;

                    }else if(modifyType==3){
                        _this.edieComment = res
                        _this.isShowEditComments = true;
                    }
                })
            },
            //前后两种只比较值相不相等
            modifyedShowRed(before,after){
                if(before && after){
                    return before== after
                }
            },
            //操作日志的详情弹出框的前后比较，弹出的颜色区分
            modifyedTabRed(){
                let before =  this.editDetails.editBefore.skuList
                let after = this.editDetails.editAfter.skuList
                let keyArray=['skuName','skuId','unitName','purchasePrice','purchaseCount','comment'];//在编辑后的每个值的父级元素里加上一个类。
                let keyArrayBefore=['beforeSkuName','beforeSkuId','beforeUnitName','beforePurchasePrice','beforePurchaseCount','beforeComment'];//在编辑前的每个值的父级元素里加上一个类。
                for(let i=0;i<before.length;i++){//循环编辑前的表数组
                    let skuId =  before[i].skuId;//根据skuId去判断这条数据
                    let skuItemBefore=before[i]
                    let findItem = after.find((n) => n.skuId===skuId);
                    let findItemIndex = after.findIndex((n) => n.skuId===skuId);
                    if(findItem){
                        for( let j=0;j<keyArray.length;j++){
                            let key = keyArray[j];
                            if(skuItemBefore[keyArray[j]]!==findItem[keyArray[j]]){
                                document.getElementsByClassName(keyArray[j])[findItemIndex].className+=' red-font';
                                if(keyArray[j]==='purchaseCount'|| keyArray[j]==='purchasePrice'){
                                    document.getElementsByClassName('totalCount')[findItemIndex].className+=' red-font';
                                }
                            }
                        };
                    }else{
                        let elementArray1 = document.getElementsByClassName("edieOrderDetailsLeftBefore")[0].getElementsByClassName("el-table__body-wrapper")[0].getElementsByTagName('tbody')[0].getElementsByClassName('el-table__row')[i].getElementsByClassName('row-show');
                            for(let w=0;w<elementArray1.length;w++){
                                elementArray1[w].className+=' red-font'
                            }
                    }
                }
                for(let z=0;z<after.length;z++){
                    let skuId =  after[z].skuId;
                    let skuItemBefore=after[z]
                    let findItem = before.find((n) => n.skuId===skuId);
                    let findItemIndex = before.findIndex((n) => n.skuId===skuId);
                    if(!findItem){
                        let elementArray = document.getElementsByClassName("edieOrderDetailsLeftAfter")[0].getElementsByClassName("el-table__body-wrapper")[0].getElementsByTagName('tbody')[0].
                             getElementsByClassName('el-table__row')[z].getElementsByClassName('row-show');
                        for(let q=0;q<elementArray.length;q++){
                            elementArray[q].className+=' red-font'
                        }
                    }
                }
            },
        }
    }
</script>
<style lang='scss'>
	.purchase-operation-log{
		.editPlanArriveTimeDiaalogForm {
            .el-form-item{
                width: 100%;
                background: #F8F9FB;
                padding: 12px;
                .el-form-item__label{
                    line-height: 30px!important;
                }
                .el-form-item__content{
                    line-height: 30px!important;
                }
            }
        }
        .editDetailsBackColor{
            background-color:#F8F9FB;
            padding:20px;
            h5{
                font-size:14px;
            }
        }
        .workContent{
            &:hover{
                color:#3B8CFF;
                cursor:pointer;
            }
        }
        .editContent{
            padding: 11px;
            margin: 10px 20px;
            background-color:#F8F9FB;
            word-wrap:break-word;
        }
        .elditTimeBefAft{
            .goodArriveBefor, .goodArriveAfter{
                display:inline-block;
                border:1px solid #eaeefb;
                width: 80%;
                text-align: left;
                background-color: #fff;
                padding-left: 10px;
            }
        }
	}
</style>
<style lang='scss' scoped>
    .red-font{
        color:red!important;
    }
</style>

