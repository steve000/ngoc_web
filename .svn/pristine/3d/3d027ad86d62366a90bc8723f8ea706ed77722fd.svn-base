<template>
    <div class='createPurchase-view'>
        <!-- 基本信息 -->
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper">
                <el-form label-width="100px" :model="createPurchaseForm" :rules="rules" ref="createPurchaseForm">
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="操作员：" required>
                                <el-input v-model="operator" :disabled="true" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                            <el-form-item label="部门：" prop="purchaseDepartment" label-width="110px">
                                <el-input v-model="createPurchaseForm.purchaseDepartment" class="row_width" size="small" :disabled="true">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle3">
                            <el-form-item label="创建时间：" label-width="100px">
                                <el-input v-model="createPurchaseForm.createTime" class="row_width" :disabled="true" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle3">
                            <el-form-item label="采购单号：" prop="purchaseId" label-width="110px">
                                <el-input v-model="createPurchaseForm.purchaseId" class="row_width" :disabled="true" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div style="padding-left: 25px">
                        <div>
                            <el-form-item label="需求标题：" prop="purchaseTitle">
                                <el-input v-model="createPurchaseForm.purchaseTitle" size="small" :disabled="true" style="width:740px">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="supplierNo" >
                            <el-form-item v-if="JSON.stringify(contractData) != '{}'"  label="合同编号：" prop="contractSeqNo" label-width="126px">
                                <el-select v-model="createPurchaseForm.contractSeqNo"
                                           class="row_width"
                                           :filter-method="contractFilter"
                                           @change="getContractInfo(createPurchaseForm.contractSeqNo)"
                                           filterable
                                           clearable
                                           :disabled="true"
                                           size="small"
                                           @clear="clearContractInfo()"
                                           popper-class="max-length"
                                           placeholder="请输入合同编号(支持搜索)"
                                >
                                    <el-option
                                        v-for="(item,n) in contractList"
                                        :key="item.contractSeqNo"
                                        :label="item.contractNo"
                                        :value="item.contractSeqNo">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <!--<el-form-item v-else label="供货商：" prop="vendorName" label-width="110px" style="margin-left: 14px;">-->
                                <!--<el-select v-model="createPurchaseForm.vendorName"-->
                                           <!--style="width:300px"-->
                                           <!--class="row_select_width"-->
                                           <!--:filter-method="supplierFilter"-->
                                           <!--filterable-->
                                           <!--clearable-->
                                           <!--:disabled="true"-->
                                           <!--size="small"-->
                                           <!--@clear="clearNoContractINfo()"-->
                                           <!--@change="chooseSupplier(createPurchaseForm.vendorName)"-->
                                           <!--popper-class="max-length"-->
                                           <!--placeholder="供应商编号或者名称"-->
                                <!--&gt;-->
                                    <!--<el-option-->
                                        <!--v-for="(item,n) in supplierList"-->
                                        <!--:key="item.vendorSeqNo"-->
                                        <!--:label="item.vendorName"-->
                                        <!--:value="item.vendorName">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                            <!--</el-form-item>-->

                        </div>
                    </div>
                    <div class="contarctInformation" v-if="JSON.stringify(contractData) != '{}'">
                        <el-form label-width="96px" :model="contractData" class="contarctInformation_form">
                            <div>
                                <div class="contractInfo1">
                                    <el-form-item label="合同名称：">
                                        <el-input placeholder="通过搜索结果同步" :disabled="true"  class="contract_row_width" v-model="contractData.contractName" size="small" >
                                        </el-input>
                                    </el-form-item>
                                </div>
                                <div class="contractInfo1">
                                    <el-form-item label="合同类型：" >
                                        <el-input placeholder="通过搜索结果同步" :disabled="true"  class="contract_row_width" :value="contractTypeText[contractData.contractType]"  size="small" >
                                        </el-input>
                                    </el-form-item>
                                </div>
                                <div class="contractInfo1">
                                    <el-form-item label="供应商：">
                                        <el-input placeholder="通过搜索结果同步" :disabled="true"  class="contract_row_width" v-model="createPurchaseForm.vendorName" size="small" >
                                        </el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div>
                                <div class="contractInfo2">
                                    <el-form-item label="合同金额：">
                                        <el-input placeholder="通过搜索结果同步" :disabled="true"  class="contract_row_width" v-model="contractData.contractCurrencyAmount" size="small" >
                                        </el-input>
                                    </el-form-item>
                                </div>
                                <div class="contractInfo2">
                                    <el-form-item label="可用金额：" >
                                        <el-input class="contract_row_width" placeholder="通过搜索结果同步" :disabled="true"v-model="contractData.useableMoney" size="small" >
                                        </el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </el-form>
                    </div>
                    <div>
                        <el-form-item label="计划到货时间：" prop="planArrivalTime" label-width="130px">
                            <el-date-picker
                                size="small"
                                value-format="yyyy-MM-dd"
                                format="yyyy 年 MM 月 dd 日"
                                class="row_width"
                                v-model="createPurchaseForm.planArrivalTime"
                                type="date"
                                :editable="false"
                                :picker-options="pickerOptions"
                                placeholder="选择到货时间">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div style="margin-left: 25px;">
                        <el-form-item label="备注：">
                            <el-input type="textarea" :rows="6"
                                      v-model="createPurchaseForm.comments" :maxlength="200" placeholder="请输入备注，最多200个字"></el-input>
                            <span style="display:block">{{createPurchaseForm.comments.length}}/200</span>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="content">
            <div class="title">
                <div class="receiveTitle">收货信息</div>
                <i class=" downIcon el-icon-arrow-down" :class="{ 'el-icon-arrow-up': isOpen}" @click="chooseAddress"></i>
            </div>
            <div class="content-wrapper" v-show="isOpen">
                <el-form label-width="100px" :model="addressInfo" :rules="addressValidate"  ref="addressInfo">
                    <div>
                        <div style="display: inline-block;margin-right:30px;">
                            <el-form-item label="联系人：" prop="linkman" >
                                <el-input v-model="addressInfo.linkman" size="small" style="width: 300px"
                                          placeholder="请输入联系人" :maxlength="20"
                                ></el-input>
                            </el-form-item>
                        </div>
                        <div style="display: inline-block">
                            <el-form-item label="联系电话：" prop="phone" >
                                <el-input v-model="addressInfo.phone" size="small" type="number" style="width: 308px"
                                          placeholder="请输入联系电话"></el-input>
                            </el-form-item>
                        </div>
                    </div>

                    <div style="display: inline-block;margin-right:30px;">
                        <el-form-item label="邮箱：" prop="email">
                            <el-input v-model="addressInfo.email" size="small" style="width: 300px"
                                      placeholder="请输入邮箱"></el-input>
                        </el-form-item>
                    </div>
                    <div style="display: inline-block" v-if="curAddress.length == 3">
                        <el-form-item label="收货地址：">
                            <address-select @selectAddress="selectAddress" :curAddress="curAddress" ></address-select>
                        </el-form-item>
                    </div>
                    <el-form-item label="详细地址：" prop="address">
                        <el-input v-model="addressInfo.address" size="small" placeholder="请输入详细地址"
                                  :maxlength="90"
                                  style="width: 745px"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="content">
            <div class="title">
                <div>商品清单</div>
            </div>
            <div class="content-wrapper" style="padding-left: 20px">
                <edit-purchase-product-list
                :contractData="contractData"
                :checkProductList="checkProductList">
                </edit-purchase-product-list>
            </div>
        </div>
        <div style="height:20px;background-color:white"></div>
        <div class="orderBox">
            <div class="orderContainer">
                <div class="orderCount">
                    <p style="display: inline-block"> 订单合计不含税金额 : </p>
                    <span>￥{{totalAmount}}</span>
                </div>
            </div>
        </div>
        <div class="btn-section pt20">
            <el-button  type="primary" @click="approvePurchase('createPurchaseForm','addressInfo')" size="small">提交审批</el-button>
            <el-button  class="cancel-button" @click="savePurchase('createPurchaseForm','addressInfo')" size="small">保存</el-button>
            <el-button size="small" class="cancel-button" @click="OnBackLatePage">取消</el-button>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex';
    import MessageMixins from '~/mixins/messages';
    import PlatformMixins from '~/mixins/platform';
    import GoodsSelect from '~/components/common/GoodsSelect';
    import Api from '~/utils/api';
    import utils from '~/utils/misc';
    import QuitMixins from '~/mixins/quit';
    import {routesMapping} from '~/router';
    import {regionData, CodeToText} from 'element-china-area-data';
    import EditPurchaseProductList from '~/containers/purchase/EditPurchaseProductList';
    import AddressSelect from '~/components/common/AddressSelect';
    export default {
        name: 'EditPurchase',
        mixins: [MessageMixins, PlatformMixins,QuitMixins],
        components :{
            AddressSelect,EditPurchaseProductList
        },
        data() {
            //正则校验
            let validatorPlanArrivalTime = (rule, value, callback) => {
                if (!this.createPurchaseForm.planArrivalTime) {
                    return callback(new Error('请选择到货时间!'));
                } else {
                    return callback();
                }
            }
            let validatorComment = (rule, value, callback) => {
                if(value.length>200){
                    return callback(new Error('请输入200字以内'));
                }else{
                    return callback();
                }
            }
            let validatePhone = (rule, value, callback) => {
                if (!value) {
                    callback()
                } else {
                    const phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
                    let res = phoneReg.test(value)
                    if (res) {
                        callback()
                    } else {
                        callback(new Error('输入的电话有误!'))
                    }
                }
            }
            return{
                initReqData:{},
                curAddress:[],
                operator:'',
                productList:[],
                productListTemp:[],
                checkProductList:[],
                storeList:[],
                supplierList:[],
                supplierListTemp:[],
                contractList:[],
                contractListTemp:[],
                createPurchaseForm:{
                    purchaseDepartment:'',
                    planArrivalTime:'',
                    vendorName:'',
                    vendorSeqNo:'',
                    comment:'',
                    purchaseTitle:'',
                    contractSeqNo:'',
                    contractNo:'',
                    contractSeapurchaseIdrchKey:'',
                    createTime:'',
                    purchaseId:'',
                    contractId:''
                },
                contractInfo:"",
                isOpen:false,
                isRelateContract:"",
                addressInfo:{
                    provinceCode:'',
                    cityCode:'',
                    areaCode:'',
                    linkman: '',
                    phone: '',
                    province: '',
                    city: '',
                    area: '',
                    email: '',
                    address: '',
                },
                priceTypeText: {
                    1: '固定价',
                    2: '自由价',
                },
                taxRateOpt:[
                    {taxRate:0,label:"0%"},
                    {taxRate:3,label:"3%"},
                    {taxRate:5,label:"5%"},
                    {taxRate:6,label:"6%"},
                    {taxRate:7,label:"7%"},
                    {taxRate:10,label:"10%"},
                    {taxRate:11,label:"11%"},
                    {taxRate:16,label:"16%"},
                    {taxRate:13,label:"13%"},
                    {taxRate:17,label:"17%"}
                ],
                contractData:{
                    contractName:'',
                    contractType:'',
                    vendorName:'',
                    vendorSeqNo:'',
                    contractCurrencyAmount:'',
                    useableMoney:null
                },
                contractTypeText: {
                    1: '订单采购',
                    2: '框架合同',
                },
                pickerOptions:{
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    },
                },
                rules: {
                    planArrivalTime: [{required: true, validator: validatorPlanArrivalTime, trigger: 'change'}],
                    comment:[{required: false, validator: validatorComment, trigger: 'change'}],
                },
                addressValidate:{
                    linkman: [{required: false,message: '请输入联系人!', trigger: 'change'}],
                    phone: [{required: false, validator: validatePhone, trigger: 'change'}],
                    address: [{required: false, message: '请输入地址!', trigger: 'change'}],
                    email: [{required: false, type: 'email', message: '请输入正确的邮箱地址!', trigger: ['change']}],
                }
            }
        },
        mounted(){
            this.getSupplierList();
            this.getContractList();
            this.queryPurchaseDetail();
            const userName = sessionStorage.getItem('userName');
            this.operator = userName;

        },
        computed: {
            ...mapState({
                getSkuListByCondition: ({outboundWarehouseList}) => outboundWarehouseList.productList,
            }),
            totalAmount: function () {
                if(this.checkProductList.length>0){
                    let resNumType = 0;
                    if (this.isRelateContract == true) {
                        this.checkProductList.forEach(item=>{
                            let purchaseTotalPrice = item.purchasePrice*item.inputPurchaseCount  || 0;
                            resNumType += purchaseTotalPrice
                        });
                    }else{
                        this.checkProductList.forEach(item=>{
                            let purchaseTotalPrice = item.purchasePrice * item.purchaseCount || 0;
                            resNumType += purchaseTotalPrice
                        });
                    }
                    resNumType = Number(resNumType).toFixed(2)
                    return resNumType
                }
            },
        },
        methods:{
            ...mapActions(["queryPurchaseDetails","ContractPurchaseSkuList","SearchGoodsList","vendorQuerylistbyusergroupid","queryEntityContractList","QueryPurchaseOrderDetailList","showPageLoading","createProcureOrder","savePurchaseOrder","approvePurchaseOrder","hidePageLoading"]),

            beforeMount(){
                this.lastId = this.$route.params.purchaseId
            },
            setFixPriceValue(index,row){
                 let validate = true
                if(row.priceType === 2){
                    if(Number(row.purchasePrice) < Number(row.minPrice)){
                        row.isValidate = false
                        validate = false;
                    }else if(Number(row.purchasePrice) > Number(row.maxPrice)){
                        row.isValidate = false
                        validate = false;
                    }else{
                        row.isValidate = true
                    }
                    this.$set(this.checkProductList,index,row)
                }
                return validate
            },
            setPurchaseCountValue(index,row){
                let validatePruchaseCount = true;
                if(this.contractData.contractType === 1){
                    if(!row.inputPurchaseCount || Number(row.inputPurchaseCount) < 1){
                        row.isCountValidate = false;
                        validatePruchaseCount = false;
                    }else if(Number(row.inputPurchaseCount) > Number(row.contractPurchaseCount) - Number(row.purchasedCount) + Number(row.purchaseCount)){
                        row.isCountValidate = false
                        validatePruchaseCount = false;
                    }else{
                        row.isCountValidate = true
                    }
                    this.$set(this.checkProductList,index,row)
                }
                return validatePruchaseCount
            },
            // 页面刷新
            activated() {
                if( this.lastId !== this.$route.params.purchaseId) {
                    this.lastId = this.$route.params.purchaseId;
                    this.productId = this.$route.params.purchaseId;
                    this.queryPurchaseDetail();
                }
            },
            selectAddress(addressCode,addressName){
                this.addressInfo.provinceCode = addressCode[0];
                this.addressInfo.cityCode = addressCode[1];
                this.addressInfo.areaCode = addressCode[2];
                this.addressInfo.province = addressName[0];
                this.addressInfo.city = addressName[1];
                this.addressInfo.area = addressName[2];
            },
            //获取详情列表
            queryPurchaseDetail(){
                this.showPageLoading();
                let purchaseId = this.$route.params.purchaseId;
                this.queryPurchaseDetails({purchaseId: purchaseId,isPage:false}).then((resp) => {
                    this.hidePageLoading();
                    this.createPurchaseForm = resp;
                    this.contractData = resp.contractInfo;
                    if(JSON.stringify(resp.contractInfo) == "{}"){
                        this.isRelateContract = false;
                    }else{
                        this.isRelateContract = true;
                    }
                    this.addressInfo = resp.addressInfo;
                    this.createPurchaseForm.contractSeqNo = resp.contractInfo.contractSeqNo;
                    if(resp.contractInfo && resp.contractInfo.contractCurrencyAmount && resp.contractInfo.contractUsedAmount){
                        this.contractData.useableMoney = Number(resp.contractInfo.contractCurrencyAmount) - Number(resp.contractInfo.contractUsedAmount);
                    }
                    resp.skuList.sku.forEach(item=>{
                        // item.inputPurchaseCount = item.purchaseCount;
                        this.$set(item,'inputPurchaseCount',item.purchaseCount);
                        item.taxRate = parseInt(item.taxRate);
                        item.purchasePrice = (item.purchasePrice/100);
                        item.minPrice = (item.minPrice)/100;
                        item.maxPrice = (item.maxPrice)/100;
                        item.fixPrice = (item.fixPrice)/100;
                    })
                    this.checkProductList = resp.skuList.sku;
                    let res = [];
                    this.curAddress.splice(0,this.curAddress.length);
                    res.push(resp.addressInfo.province);
                    res.push(resp.addressInfo.city);
                    res.push(resp.addressInfo.area);
                    this.curAddress = res;
                    this.initReqData = JSON.parse(JSON.stringify(this.getReqData() ));
                })
            },


            supplierFilter(string){
                if(!string){
                    return this.supplierList = this.supplierListTemp
                }
                this.supplierList = this.supplierListTemp.filter((item) =>{
                    if (item.vendorSeqNo.toString().indexOf(string)>=0 || item.vendorName.toString().indexOf(string)>=0) {
                        return item
                    }
                })
            },
            contractFilter(string){
                if(!string){
                    return this.contractList = this.contractListTemp
                }
                this.contractList = this.contractListTemp.filter((item) =>{
                    if (item.contractNo.toString().indexOf(string)>=0 || item.contractName.toString().indexOf(string)>=0) {
                        return item
                    }
                })
            },
            getSupplierList(){
                // var reqData = {
                //     searchContent: this.createPurchaseForm.vendorName,
                //     isPage: false
                // }
                let datas = {
                    userGroupId: sessionStorage.getItem("entityId")
                }
                this.vendorQuerylistbyusergroupid(datas).then((resp) => {
                    if (resp.result && resp.result.length>0) {
                        this.supplierList = resp.result;
                        this.supplierListTemp = resp.result
                    }
                })
            },
            getContractList(){
                this.queryEntityContractList({progressType:1}).then((res) =>{
                    this.contractList = res.result;
                    this.contractListTemp = res.result
                })
            },

            chooseSupplier(value){
                if (!value) return
                let choosenItem = this.supplierList.find(item => item.vendorName === value);
                this.createPurchaseForm.vendorSeqNo = choosenItem.vendorSeqNo;
                this.createPurchaseForm.vendorName = choosenItem.vendorName
            },
            getContractInfo(contractSeqNo){
                if (!contractSeqNo) return
                this.QueryPurchaseOrderDetailList({contractSeqNo:contractSeqNo}).then((res) =>{
                    this.contractData = res;
                    this.contractData.useableMoney = Number(res.contractCurrencyAmount) - Number(res.usedAmount);
                })
                this.ContractPurchaseSkuList({contractSeqNo:contractSeqNo}).then((res) =>{
                    res.skuIds.forEach(item=>{

                        item.purchasePrice = item.fixPrice
                    });
                    this.checkProductList = res.skuIds;
                })
            },


            setTotalPriceValue(row){
                if( parseInt(row.purchaseTotalPrice) < 0){
                    row.purchaseTotalPrice = 0
                }else if(row.purchaseTotalPrice.length>10){
                    this.$message({
                        message: '含税总额长度不能大于10位,若大于只取前10位，后面无效',
                        type: 'error',
                        duration:2000});
                    row.purchaseTotalPrice = (row.purchaseTotalPrice).substring(0,10)
                }else if(row.purchaseTotalPrice.length>1 && row.purchaseTotalPrice.indexOf(0)===0){
                    row.purchaseTotalPrice = " "
                }
            },



             //清空合同信息
            clearContractInfo(){
                // let type=this.contractData.type;
                this.contractData = {
                     contractName:'',
                     contractType:'',
                     vendorName:'',
                     contractCurrencyAmount:'',
                     useableMoney:'',
                    // type:type
                }
                this.checkProductList = [{}]
            },
            clearNoContractINfo(){
                this.checkProductList = [{}]
            },
            getReqData(){
                var _this = this;
                if (_this.isRelateContract == true) {
                    let productDetailListArray = [];
                    let checkData = []
                    _this.checkProductList.forEach(item => {
                        productDetailListArray.push({
                            productId: item.productId,
                            skuId: item.skuId,
                            purchasePrice: (item.purchasePrice)*100,
                            maxPrice: (item.maxPrice)*100,
                            minPrice: (item.minPrice)*100,
                            purchaseCount: item.inputPurchaseCount,
                            comments: item.comment.trim(),
                            priceType: item.priceType,
                            taxRate: item.taxRate
                        })
                    })
                    var reqData = {
                        comments: _this.createPurchaseForm.comment.trim(),
                        purchaseDepartment: _this.createPurchaseForm.purchaseDepartment.trim(),
                        purchaseTitle: _this.createPurchaseForm.purchaseTitle.trim(),
                        contractSeqNo: _this.createPurchaseForm.contractSeqNo,
                        planArrivalTime: _this.createPurchaseForm.planArrivalTime,
                        vendorSeqNo: _this.createPurchaseForm.vendorSeqNo,
                        vendorName: _this.createPurchaseForm.vendorName,
                        purchaseId:_this.createPurchaseForm.purchaseId,
                    };
                    reqData.skuList = productDetailListArray;
                    reqData.addressInfo = _this.addressInfo;
                } else {
                    let productDetailListArray = [];
                    _this.checkProductList.forEach(item => {
                        productDetailListArray.push({
                            productId: item.productId,
                            skuId: item.skuId,
                            purchasePrice: (item.purchasePrice)*100,
                            purchaseCount: item.purchaseCount,
                            comments: item.comment.trim(),
                            taxRate: item.taxRate
                        })
                    })
                    var reqData = {
                        comments: _this.createPurchaseForm.comment.trim(),
                        purchaseDepartment: _this.createPurchaseForm.purchaseDepartment.trim(),
                        purchaseTitle: _this.createPurchaseForm.purchaseTitle.trim(),
                        vendorSeqNo: _this.createPurchaseForm.vendorSeqNo,
                        vendorName: _this.createPurchaseForm.vendorName,
                        planArrivalTime: _this.createPurchaseForm.planArrivalTime,
                        purchaseId:_this.createPurchaseForm.purchaseId,
                    };
                    reqData.skuList = productDetailListArray;
                    reqData.addressInfo = _this.addressInfo;
                }
                return reqData
            },
            //保存
            createPurchase(formName1,formName2){
                var _this = this;
                return new Promise(function(resolve,reject){
                    _this.$refs[formName1].validate((valid) => {
                        if(valid){
                            _this.$refs[formName2].validate((valid) => {
                                if(valid){
                                    let NoContractPurchaseCount = true;
                                    let NoContractTaxRate = true;
                                    let NoContractProductList = true;
                                    let NoContractPurchasePrice = true;
                                    let contractPurchasePrice = true;
                                    let validatePurchaseBlackCount = true;
                                    let sComment = true;
                                    if (_this.checkProductList.length < 1) {
                                        _this.showWarning('请添加商品清单')
                                        return false
                                    }
                                    _this.checkProductList.map((item, index) => {
                                        if (!item.productId|| !item.skuId) {
                                            NoContractProductList = false;
                                        }
                                        if (item.taxRate === '' || item.taxRate === undefined || item.taxRate === null) {
                                            NoContractTaxRate = false;
                                        }
                                        if(!item.purchaseCount || item.purchaseCount == 0 ){
                                            NoContractPurchaseCount = false;
                                        }
                                        if(!item.purchasePrice){
                                            NoContractPurchasePrice = false;
                                        }
                                        if (item.comment && item.comment.length > 100) {
                                            sComment = false
                                        }
                                         if (!_this.setFixPriceValue(index, item)) {
                                            contractPurchasePrice = false;
                                        }
                                        if (!_this.setPurchaseCountValue(index,item)) {
                                            validatePurchaseBlackCount = false;
                                        }
                                    });
                                    if(Number(_this.contractData.useableMoney)< Number(_this.totalAmount)){
                                        _this.showWarning('订单合计不含税金额不能大于合同可用金额');
                                        return;
                                    }
                                    if (!NoContractPurchasePrice &&  _this.contractData == "{}") {
                                        _this.showWarning('采购单价不能为空')
                                        return false
                                    }else if (!contractPurchasePrice &&  _this.contractData != "{}") {
                                        _this.showWarning('请正确填写含税采购单价')
                                        return false
                                    }
                                    if (sComment === false) {
                                        _this.showWarning('商品清单备注长度100个字以内')
                                        return false
                                    }
                                    if (NoContractProductList === false) {
                                        _this.showWarning('请完善商品信息')
                                        return false
                                    }
                                    if (!validatePurchaseBlackCount && _this.isRelateContract == true) {
                                        _this.showWarning('请正确填写采购数量')
                                        return false
                                    }else if (!NoContractPurchaseCount && _this.isRelateContract == false) {
                                        _this.showWarning('采购数量不能为0和空')
                                        return false
                                    }
                                    if (NoContractTaxRate === false) {
                                        _this.showWarning('税率不能为空')
                                        return false
                                    }
                                    var reqData = _this.getReqData();
                                    _this.showPageLoading();
                                    _this.savePurchaseOrder(reqData).then((resp) => {
                                        _this.purchaseId = resp.purchaseId;
                                        _this.hidePageLoading()
                                        resolve(_this.purchaseId)
                                    }).catch( ()=>{
                                        _this.hidePageLoading()
                                    })
                                }else{
                                    _this.showWarning('请先正确填写地址信息!')
                                    reject();
                                }
                            })
                        }else{
                            _this.showWarning('请先正确填写表单信息!')
                            reject();
                        }
                    })
                })
            },
              savePurchase(formName1,formName2){
                this.createPurchase(formName1,formName2).then((purchaseId) =>{
                    this.hidePageLoading()
                    this.showSuccess("保存成功");
                    this.OnBackLatePage();
                }).then(()=>{

                })
            },
            //提交审批
            approvePurchase(formName1,formName2){
                var checkFormData = this.getReqData();
                if(JSON.stringify(this.initReqData) === JSON.stringify(checkFormData)){
                    this.approvePurchaseOrder({purchaseId:this.createPurchaseForm.purchaseId}).then((res) =>{
                        this.showSuccess("提交审批成功");
                        this.OnBackLatePage();
                    })
                }else{
                    this.createPurchase(formName1,formName2).then( (purchaseId) =>{
                    this.approvePurchaseOrder({purchaseId:this.createPurchaseForm.purchaseId}).then((res) =>{
                        this.showSuccess("提交审批成功");
                        this.OnBackLatePage();
                    })
                }).then(()=>{

                    })
                }
            },
            //点击取消
            OnBackLatePage(){
                this.quit(routesMapping.PurchaseOrder, true)
            },
            chooseAddress(){
                this.isOpen = !this.isOpen
            },
        }
    }
</script>
<style lang='scss'>
    .createPurchase-view {
        height: 100%;
        position: relative;
        padding: 10px 30px 0px 30px;
        .content {
            .title{
                color: #333;
                font-weight: 700;
                background-color: #ffffff;
                border-bottom: 1px solid #E5E5E5;
                .receiveTitle{
                    display: inline-block;
                }
                .downIcon{
                    cursor: pointer;
                    transition: 1s;
                }
            }
            .content-wrapper{
                padding: 20px 20px 1px 10px;
                .displayStyle ,.displayStyle1,.displayStyle3{
                    display: inline-block;
                    padding-left: 25px;
                    .row_width{
                        width: 300px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        height: 36px;
                        color: #666666;
                    }
                    .row_select_width{
                        width: 300px;
                    }
                    .sousuoIcon {
                        width: 14px;
                        height: 14px;
                        color: #bebebe;
                    }
                }
                .contarctInformation{
                    margin-left: 126px;
                    margin-bottom: 15px;
                    .contarctInformation_form{
                        background-color: #F8F9FB;
                        padding-bottom: 6px;
                        padding-top: 18px;
                        .contractInfo1,.contractInfo2{
                            display: inline-block;
                            .contract_row_width{
                                width: 240px;
                            }
                        }
                    }
                }
                .text-dash-show{
                    font-size: 14px;
                }
            }
            .addProduct{
                margin-bottom: 16px;
            }
        }
        .orderBox{
            background-color: white;
            padding: 0px 20px;
            .orderContainer{
                background-color: #FBFBFB;
                padding: 0px 20px;
                border: 1px solid #F1F1F1;
                height: 50px;
                line-height: 50px;
                .orderCount{
                    float: right;
                    span{
                        color: red;
                        font-size: 18px;
                    }
                }
            }
        }
        .unvalid{
            border-radius:5px;
        }
        .submitBtn{
            padding: 20px;
            background-color:white;
        }
        .el-table__body-wrapper {
            overflow: inherit;
        }
        .el-input__inner{
            border: 1px solid #E0E0E0;
            color: #666666;
            &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                font-size:14px!important;
            }
            &::-moz-placeholder { /* Mozilla Firefox 19+ */
                font-size:14px!important;
            }
            &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                font-size:14px!important;
            }
        }
        .el-date-editor input{
            border: 1px solid #E0E0E0;
            color: #666666;
            &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                font-size:14px!important;
            }
            &::-moz-placeholder { /* Mozilla Firefox 19+ */
                font-size:14px!important;
            }
            &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                font-size:14px!important;
            }
        }
        .el-select .el-input input{
            border: 1px solid #E0E0E0;
            color: #666666;
            &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                font-size:14px!important;
            }
            &::-moz-placeholder { /* Mozilla Firefox 19+ */
                font-size:14px!important;
            }
            &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                font-size:14px!important;
            }
        }

    }

</style>
<style lang='scss'>
    .createPurchase-view {
        .procurements-config-wrapper {
            overflow: inherit;
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
            width:295px
        }
        .el-form-item__label{
            color: #333;
        }
        .el-form-item{
            margin-bottom: 13px;
        }
        .el-textarea__inner{
            margin-top: 5px;
            height:80px ;
        }
        .el-input.is-disabled .el-input__inner{
            background-color: #f0f0f0;
        }
         .unvalid .el-input__inner{
            border-color: red !important;
        }
        .cancel-button{
            color: #3B8CFF;
            border: 1px solid #BFD9FE;
        }
    }
</style>
