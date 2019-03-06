<template>
    <div class="inventory-pandianBox">
        <div class="inventory-pandian">
            <el-row style="font-size:17px;">
                <span class="pandianStockName"><i class="el-icon-mobile-phone"></i> {{storehouseName}}</span>
            </el-row>
            <el-row  class="pandianTimeAndPeo" style="font-size:14px;">
                <el-col :span="5" > 盘 点 人 : <span>{{currentUser}}</span></el-col>
                <el-col :span="4" > 盘点状态 ：<span>{{pandianName}}</span> </el-col>
                <div class="pull-right">
                    <el-button type="reset" @click="updataPandian1(1)" size="small">保存</el-button>
                    <el-button type="reset" @click="finshPandian1()" size="small">结束盘点</el-button>
                </div>
            </el-row>
            <div class="skuListingTab" >
                <el-table :data="pandianDetailList" header-row-class-name="header-style" border >
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
                    <el-table-column label="实际库存" prop="actualCount" width="150" >
                        <template slot-scope="scope">
                            <el-input size="small" type="number" :min="0" v-model="scope.row.actualCount" @blur="getActualCount(scope.$index, scope.row)"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="resultType" label="盘点" width="160" :render-header="renderTips">
                        <template slot-scope="scope">
                            <span v-if="scope.row.resultType == 0">--</span>
                            <span v-else="">{{type[scope.row.resultType]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注说明" prop="comments" width="150">
                        <template slot-scope="scope">
                            <el-input  size="small" v-model="scope.row.comments" placeholder="请输入内容" @keyup.native="validateComments(scope.row)"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pageDiv">
                    <div></div>
                    <div class="pageLable">
                        <span v-if="totalCount != 0">第 {{pageNo}} / {{Math.ceil(totalCount/pageSize) }}</span>
                        <span v-if="totalCount == 0">第 1 / 1</span>
                        <el-button size="small" class="pageBtn" :disabled="showPrev" @click="goPrePage()">上一页</el-button>
                        <el-button size="small" class="pageBtn" :disabled="showNext" @click='goNextPage()'>下一页</el-button>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="isShowInventoryUnsaveData" width="30%" center>
          <span>尚有数据未保存，结束盘点默认实际库存为0，结果为盘亏，是否结束盘点</span>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="isShowInventoryUnsaveData = false">否</el-button>
            <el-button size="small" type="primary" @click="goFinshInventory()">是</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
import PlatformMixins from '~/mixins/platform'
import {mapActions, mapState} from 'vuex'
import InventoryHeaderTips from "~/components/stocks/pandian/InventoryHeaderTips"
import {routesMapping} from '~/router'
export default{
    name: "InventoryPandian",
    components: {InventoryHeaderTips},
    mixins: [PlatformMixins,QuitMixins],
    data(){
        return {
            type:{ 0:"--",  1:"正常",  2:"盘盈", 3:"盘亏" },
            storehouseName:'',
            inventoryId:"",//盘点id
            storehouse_id:"",//仓库id
            pandianDetailList: [],
            totalCount: 0,
            pageSize: 10,
            pageNo: 1,
            nPage:1,
            showPrev:true,
            showNext:false,
            pandianStatus:1,
            pandianName:'',
            isShowInventoryUnsaveData:false,
            resultType:'',
            autoSelectType:"",
            autoGoPageType:'',
            allowClose: false,
            showUpdataType:1,//1去分页，2去保存
            iscloseSelectDialog:1,
            selectValueProps:1,
            isShowError:false,
            dialogErrorMsg:'',
        }
    },
    mounted(){
        const userName = sessionStorage.getItem('userName');
        userName && this.changeCurrentUser(userName);
        this.refreshPage();
    },
    watch: {
        $route(to, from) {
            this.pandianStatus = to.params.status;
            this.pandianName = '盘点中'
        }
    },
    created() {
        this.storehouseName =  sessionStorage.getItem('storehouseName'); //仓库名称
    },
    beforeMount() {
        this.storehouse_id = this.$route.params.storehouse_id;//仓库id
        this.inventoryId = this.$route.params.inventoryId ;//盘点iid
        this.pandianStatus = this.$route.params.status
        this.pandianName = '盘点中'
    },
    computed: {
        ...mapState({currentUser: ({ root }) => root.currentUser,}),
    },
    methods: {
        ...mapActions(["queryPandianIdDetailList","showPageLoading", "hidePageLoading",'changeCurrentUser','updataPandian','getUninventoryNum','finshPandian']),
        refreshPage(){
            this.showPageLoading();
            let resData = { pageSize: this.pageSize, pageNo:this.pageNo, inventoryId:this.inventoryId,resultType:this.resultType }
            this.queryPandianIdDetailList(resData).then( resp => {
                this.hidePageLoading();
                if(resp.result == null || resp.result == "" || resp.result ==undefined){
                    this.pandianDetailList = []
                    this.totalCount = 0;
                    this.pageSize = 10;
                    this.resultType ='';
                }else{
                    let result = resp.result;
                    result.forEach(item=>{
                        item.attrInfo_a = ''
                        let attrInfo1 = JSON.parse(item.attrInfo)
                        attrInfo1.forEach(one=>{
                           item.attrInfo_a += one.attrValue + ','
                        })
                        item.attrInfo_a = item.attrInfo_a.substring(0,item.attrInfo_a.length - 1 );
                        item.actualCount=String(item.actualCount)
                    })
                    this.pandianDetailList = result;
                    this.totalCount = resp.totalCount;
                    //默认下一页可点击，如果只有一页，则下一页也要禁用掉
                    if(Math.ceil(this.totalCount/this.pageSize) == this.pageNo){
                        this.showNext = true;
                    }else{
                        this.showNext = false;
                    }
                }
            }).catch(e => {
                this.hidePageLoading();
            })
        },
        isAllowClose(){
            if(!this.allowClose){
                this.validateClose();
            }
            return this.allowClose;
        },
        validateComments(row){
            if(row.comments.length>5){
                this.dialogErrorMsg="备注的长度只能大于200位，超过两百位后面无效"
                row.comments = row.comments.substring(0,200)
                this.dialogError();
            }
        },
        validateClose(){
            setTimeout(() => {
                this.$confirm("是否确认离开当前盘点页面？如有修改请先保存！","提示",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.allowClose = true
                    this.closeCurrentTab()
                }).catch(() => {
                    this.allowClose = false
                })
            }, 0)
        },
        goPrePage(){
            this.handleCurrentChange(1)
        },
        goNextPage(){
            this.handleCurrentChange(2)
        },
        goSaveCurrenData(){
           this.goFinshInventory()
        },
        updataPandian1(goType){
            let _this = this,savePandianData = {},skuList =[],resultType0 = 0,NoneComments = [];
            _this.pandianDetailList.forEach(item=>{
                if(item.resultType != 0){
                    resultType0++;
                    let savePandianObj ={};
                    savePandianObj.seqNo = item.seqNo;
                    savePandianObj.skuId = item.skuId;
                    savePandianObj.resultType= item.resultType;
                    savePandianObj.actualCount = item.actualCount;
                    savePandianObj.comments = item.comments;
                    savePandianObj.dueCount = item.dueCount
                    skuList.push(savePandianObj)
                }else{
                    if(item.comments){
                        NoneComments.push(item.comments)
                    }
                }
            })
            savePandianData.storehouseId = _this.storehouse_id;
            savePandianData.inventoryId = _this.inventoryId;
            savePandianData.skuList = skuList;
            if(savePandianData.skuList.length == 0){
                if(NoneComments.length != 0){//代表没有输入实际库存，但输入了备注
                    _this.$message.error('请至少输入一条及以上的实际库存才能保存，备注不能单独保存');
                }else{
                    _this.$message.error('请至少输入一条及以上的实际库存才能保存');
                }
            }else{
                if(NoneComments != 0){
                    this.$message({
                          message:'还有'+NoneComments.length+'条没有输入实际库存，只保存输入了实际库存的',
                          type: 'error',
                          duration:4000
                    });
                }
                _this.updataPandian(savePandianData).then((resp) => {
                    setTimeout(function(){
                        _this.$message({
                          showClose: true,
                          message: '保存成功',
                          type: 'success'
                        });
                        _this.iscloseSelectDialog = 1;
                        _this.refreshPage()
                    },4100)

                })
            }
        },
        finshPandian1(){
            this.getUnInventoryNumFun();
        },
        getUnInventoryNumFun(){
            this.getUninventoryNum({inventoryId:this.inventoryId }).then((resp) => {
                if(resp.count == 0){
                    this.goFinshInventory()
                }else{
                    this.isShowInventoryUnsaveData = true;
                }
            })
        },
        getSelectValue(val){
            if(this.iscloseSelectDialog == 2){
                this.dialogErrorMsg = "尚有数据未保存，请先去保存，再进行筛选选"
                this.dialogError()
               this.selectValueProps++
            }else{
                let _this = this ;
                _this.queryNewPandianDetails(2,val,1)
            }
        },
        handleCurrentChange(page){
            let _this = this ;
            _this.queryNewPandianDetails(1,0,page);
        },
        queryNewPandianDetails(updataType,val,page){
            let _this = this; //updataType = 1去分页,2筛选判断结果
            let resData = { pageSize: _this.pageSize, pageNo:_this.pageNo,  inventoryId:_this.inventoryId,resultType:_this.resultType }
            _this.queryPandianIdDetailList(resData).then( resp => {
                let newDetailsData = resp.result;
                for(let o =0;o<newDetailsData.length;o++){
                    if(updataType == 1){
                        if(newDetailsData[o].resultType == _this.pandianDetailList[o].resultType && newDetailsData[o].actualCount == _this.pandianDetailList[o].actualCount && newDetailsData[o].comments == _this.pandianDetailList[o].comments ){
                        }else{
                            _this.showUpdataType = 1;
                            _this.autoGoPageType = page;
                            _this.isShowError = true;
                            _this.dialogErrorMsg = "尚有数据未保存，请先去保存，再进行分页"
                            _this.dialogError()
                            return
                        }
                    }else if(updataType == 2){
                        if(_this.pandianDetailList.length > 0){
                            if(newDetailsData[o].resultType == _this.pandianDetailList[o].resultType && newDetailsData[o].actualCount == _this.pandianDetailList[o].actualCount && newDetailsData[o].comments == _this.pandianDetailList[o].comments ){
                            }else{
                                _this.showUpdataType = 2;
                                _this.autoSelectType = val;
                                _this.iscloseSelectDialog = 2
                                _this.isShowError = true;
                                _this.dialogErrorMsg = "尚有数据未保存，请先去保存，再进行筛选选"
                                _this.dialogError()
                                _this.unGoSave()
                                return
                            }
                        }else{
                            _this.showPrev = true;
                            _this.showNext = true;
                        }
                    }
                }
                if(updataType == 1){
                   _this.onPageFun(page)
                }else if(updataType == 2){
                    _this.resultType = val
                    _this.refreshPage()
                }
            })
        },
        dialogError(){
            this.$message({
              message: this.dialogErrorMsg,
              type: 'error'
            });
        },
        goFinshInventory(){
            this.finshPandian({ inventoryId : this.inventoryId}).then((resp) =>{ this.allowClose = true; this.closeCurrentTab()})
        },
        onPageFun(page){
            let total = Math.ceil(this.totalCount/this.pageSize)
            switch(page){
                case 1:
                    this.nPage--;
                    if(this.nPage < 1){
                        this.showPrev = true;
                        this.showNext = false;
                    }else if(this.nPage == 1){
                        this.showPrev = true;
                        this.showNext = false;
                        this.pageNo = this.nPage;
                        this.refreshPage()
                    }else{
                        this.showPrev =false;
                        this.showNext = false;
                        this.pageNo = this.nPage;
                        this.refreshPage()
                    }
                break;
                case 2:
                    this.nPage++;
                    if(this.nPage > total){
                        this.showNext = true;
                        this.showPrev = false;
                    }else if(this.nPage === total){
                        this.showNext = true;
                        this.showPrev = false;
                        this.pageNo = this.nPage;
                        this.refreshPage()
                    }else if(this.nPage < total){
                        this.showNext = false;
                        this.showPrev = false;
                        this.pageNo = this.nPage;
                        this.refreshPage()
                    }
                break;
            }
        },
        unGoSave(){
            this.getSelectValue(this.autoSelectType)
        },
        renderTips(h, obj){
            return h(InventoryHeaderTips,{props:{
                handChange:this.getSelectValue,
                value:this.selectValueProps
            }})
        },
        getActualCount(index,row){
            let actualCount = row.actualCount //实际库存
            let dueCount = Number(row.dueCount) //应有库存
            let regAct = /^[0-9]+$/.test(actualCount)
            let actualCountLenLessTen;
            if(regAct){//输入的是大于等于0的正整数
                if(actualCount.substring(0,1) == 0){
                    if(row.dueCount == 0){
                        row.actualCount = "0";
                        row.resultType = "1"
                    }else{
                        if(row.actualCount == 0){
                            row.actualCount = "0";
                            row.resultType = "3"
                        }else{
                            this.$message.warning('输入'+row.actualCount+'不合乎规范默认为0,状态为盘亏');
                            row.actualCount = "0";
                            row.resultType = "3"
                        }
                    }
                }else{
                    if(actualCount.length>10){
                        this.$message({
                            message: '实际库存长度不能大于10位,若大于只取前10位，后面无效',
                            type: 'error',
                            duration:2000});
                        actualCountLenLessTen = actualCount.substring(0,10)
                        row.actualCount = actualCountLenLessTen
                        if(Number(actualCountLenLessTen)>dueCount){//实际库存大于 应有库存
                            row.resultType = "2"
                        }else if(Number(actualCountLenLessTen) === dueCount){
                            row.resultType = "1"
                        }else if(Number(actualCountLenLessTen) < dueCount){
                            row.resultType = "3"
                        }
                    }else{
                        if(Number(actualCount)>dueCount){//实际库存大于 应有库存
                            row.resultType = "2"
                        }else if(Number(actualCount) === dueCount){
                            row.resultType = "1"
                        }else if(Number(actualCount) < dueCount){
                            row.resultType = "3"
                        }
                    }
                }
            }else{
                this.$message.error('输入不合乎规范默认为0，盘点结果根据实际情况来定');
                row.actualCount = "0";
                if(Number(actualCount)>dueCount){//实际库存大于 应有库存
                    row.resultType = "2"
                }else if(Number(actualCount) === dueCount){
                    row.resultType = "1"
                }else if(Number(actualCount) < dueCount){
                    row.resultType = "3"
                }
            }
        },
    }
}
</script>
<style lang="scss">
    .inventory-pandian{
        width: 100%;
        position: relative;
        padding:20px;
        background:#fff;
        .pandianTimeAndPeo{
            margin:20px 0 20px;
            font-size:18px;
            height: 30px;
            line-height: 30px;
        }
        .pandianStockName{
           font-size:18px;
        }
        .pageDiv{
            margin-botton:15px;
            margin-top:15px;
            overflow:hidden;
        }
        .pageDiv div:first-child{
            float:left;
            line-height:40px;
        }
        .pageDiv div:last-child{
            float:right;
        }
    }
</style>
