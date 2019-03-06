<template>
    <div class='createPurchase-view'>
        <!-- 基本信息 -->
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper" >
                <el-form label-width="110px" :model="normalPromotionForm" ref="normalPromotionForm" :rules="rules">
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="促销标题：">
                                <el-input v-model="normalPromotionForm.promotionTitle" placeholder="请填写促销标题" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                          <el-form-item label="促销类型：">
                            <el-select
                              placeholder="请选择促销类型"
                              size="small"
                               class="row_width"
                              disabled
                              v-model="normalPromotionForm.promotionType">
                                <el-option :value="0" label="限时促销"></el-option>
                                <el-option :value="1" label="批量促销"></el-option>
                                <el-option :value="2" label="偶数促销"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                          <el-form-item label="开始时间：" prop="beginTime">
                            <el-date-picker
                            v-model="normalPromotionForm.beginTime"
                            type="datetime"
                            :editable="false"
                            class="row_width" size="small"
                            placeholder="选择日期时间"
                            :default-time="['00:00:00']"
                            value-format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>
                          </el-form-item>
                        </div>  
                        <div class="displayStyle">       
                          <el-form-item label="结束时间：" prop="endTime">
                            <el-date-picker
                            v-model="normalPromotionForm.endTime"
                            type="datetime" 
                            size="small"   
                            :editable="false"         
                            placeholder="选择日期时间"
                            :default-time="['23:59:59']"
                            value-format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>        
                          </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="业务实体：">
                                <el-select v-model="normalPromotionForm.groupName"
                                    :multiple="false"
                                    filterable
                                    clearable
                                    size="small"
                                    popper-class="max-length"
                                    placeholder="请选择或输入业务实体"
                                    @clear="clearSkuId()"
                                    @change="getGroupInfo(normalPromotionForm.userGroupId)"
                                    class="text-dash-show row_width"
                                    >
                                    <el-option
                                        v-for="(item) in groupList"
                                        :key="item.userGroupId"
                                        :label="item.groupName"
                                        :value="item.userGroupId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                            <el-form-item label="促销详情描述：">
                                <el-input v-model="normalPromotionForm.descriptions" placeholder="请填写促销详情描述" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                          <el-form-item label="备注：">
                            <el-input type="textarea" :rows="6"
                                      v-model="normalPromotionForm.remark" :maxlength="200" placeholder="请输入备注，最多200个字" size="small" style="width:735px;"></el-input>
                            <span style="display:block">{{normalPromotionForm.remark.length}}/200</span>
                          </el-form-item>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="content">
            <div class="title">
                <div>商品清单</div>
            </div>
            <div class="addProduct">
                    <el-button plain size="mini" @click="addGoodsMsg"><i class="el-icon-plus"></i>添加商品信息</el-button>
                </div>
            <div class="content-wrapper" style="padding-left: 20px">
                <product-list :relatedContract = "relatedContract" :contractData="contractData" :checkProductList="checkProductList ">
                </product-list>
            </div>
        </div>
        <div class="btn-section pt20">
            <el-button  class="cancel-button" @click="savePurchase('normalPromotionForm')" size="small">保存</el-button>
            <el-button size="small"  class="cancel-button" @click="cancelFunction('normalPromotionForm')">取消</el-button>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex';
    import MessageMixins from '~/mixins/messages';
    import PlatformMixins from '~/mixins/platform';
    import AddressSelect from '~/components/common/AddressSelect';
    import QuitMixins from '~/mixins/quit';
    import {routesMapping} from '~/router';
    import ProductList from '~/containers/sales/promotion/promotionProductList';
    export default {
        name: 'normalPromotionEdit',
        mixins: [MessageMixins, PlatformMixins,QuitMixins],
        components :{AddressSelect,ProductList},
        data() {
            // 正则校验
            let beginTime = (rule, value, callback) => {
                let now = new Date()
                let time = new Date(value)
                if (!value) {
                    return callback(new Error('请选择开始时间!'));
                } else if (time.getTime() < now.getTime()) {
                    return callback(new Error('请选择晚于当前时间'));
                } else {
                    return callback();
                }
            }
            let endTime = (rule, value, callback) => {
                let now = new Date()
                let time = new Date(value)
                let beginTime = new Date(this.normalPromotionForm.beginTime)
                if (!value) {
                    return callback(new Error('请选择结束时间!'));
                } else if (time.getTime() < now.getTime()) {
                    return callback(new Error('请选择晚于当前时间'));
                } else if (time.getTime() < beginTime.getTime()) {
                    return callback(new Error('请选择晚于开始时间'));
                } else {
                    return callback();
                }
            }
            return{
                // 需要提交的表单数据
                normalPromotionForm: {
                  accountTime: '',  
                  promotionNo: '',
                  promotionTitle: '',
                  promotionType: '',
                  beginTime: '',
                  endTime: '',
                  userGroupId: '',
                  groupName: '',
                  descriptions: '',
                  remark: '',
                  skuList: [
                    {
                    skuId: 0,
                    skuName: '',
                    descType: 0,
                    descPrice: 0,
                    descRate: 0,
                    descCount: 0
                    }
                  ]
                },
                operator:'',
                checkProductList:[],
                storeList:[],
                supplierList:[],
                supplierListTemp:[],
                contractList:[],
                contractListTemp:[],
                relatedContract:false,  //关联合同
                createPurchaseForm:{
                    purchaseDepartment:'',
                    planArrivalTime:'',
                    vendorName:'',
                    vendorSeqNo:'',
                    comments:'',
                    purchaseTitle:'',
                    contractSeqNo:'',
                    contractSearchKey:''
                },
                isOpen:false,
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
                contractData:{
                    contractName:'',
                    contractType:'',
                    vendorName:'',
                    vendorSeqNo:'',
                    contractCurrencyAmount:'',
                    useableMoney:''
                },
                contractTypeText: {
                    1: '订单采购',
                    2: '框架合同',
                },
                purchaseId:'',
                pickerOptions:{
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    },
                },
                isFirst:1,
                groupList: [],
                rules: {
                    beginTime: [{required: true, validator: beginTime, trigger: 'change'}],
                    endTime:[{required: true, validator: endTime, trigger: 'change'}],
                },
            }
        },
        mounted(){
          this.getNormalPromotionInfo()
          this.groupFilter()
        },
        computed: {
        },
        methods:{
            ...mapActions(["userGroupAll","normalPromotionEdit","normalPromotionInfo","showPageLoading","hidePageLoading"]),
            // 表格初始化
            addGoodsMsg(){
                this.checkProductList.push({skuId: 0,skuName: '',descType: 0,descPrice: 0,descRate: 0,descCount: 0});
            },
            // 带ID查看请求
            getNormalPromotionInfo () {
                let datas = {
                    id: this.$route.params.id
                }
              this.normalPromotionInfo(datas).then((res) =>{
                  for (var x in res) {
                      for (var y in this.normalPromotionForm) {
                          if ( x == y ) {
                              this.normalPromotionForm[y] = res[x]
                          }
                      }
                  }
                if(res.skuList.length<1){
                    this.addGoodsMsg()
                }else{
                    res.skuList.forEach(item => {
                        item.descType = +item.descType
                        item.descPrice = item.descPrice / 100

                    })
                    this.checkProductList = res.skuList

                }
              })
            },

            savePurchase(normalPromotionForm){
                this.$refs[normalPromotionForm].validate((valid) => {
                    if (valid) {
                        let goArr = true
                        this.normalPromotionForm.skuList = this.checkProductList  

                        if (this.normalPromotionForm.skuList.length > 0) {
                            let newArr = []
                            this.normalPromotionForm.skuList.forEach(item => {
                                if (!item.skuName) {
                                    this.$message({
                                        type: 'warning',
                                        message: '商品名称不能为空'
                                    }); 
                                    goArr = false
                                } else if (item.descCount < 0 || item.descPrice < 0 || item.descRate < 0) {
                                    this.$message({
                                        type: 'warning',
                                        message: '数量，价格，折扣不能小于0'
                                    }); 
                                    goArr = false
                                } else if (item.skuName) {
                                    newArr.push(item.skuName)
                                }
                            })
                            if (newArr.length) {
                                var nary=newArr.sort(); 
                                for(var i=0;i<this.normalPromotionForm.skuList.length;i++){
                                    if (nary[i]==nary[i+1]){
                                        // console.log("数组重复内容："+nary[i]);
                                        this.$message({
                                            type: 'warning',
                                            message: '请选择不重复商品'
                                        });
                                        goArr = false
                                    }
                                }
                            }
                        } else if (this.normalPromotionForm.skuList.length == 0) {
                            this.$message({
                                type: 'warning',
                                message: '商品清单不能为空'
                            }); 
                            goArr = false
                        } 
                        if (this.normalPromotionForm.promotionType === 0) {
                            this.normalPromotionForm.skuList.forEach(item => {
                                if (item.descCount != 0) {
                                    this.$message({
                                        type: 'warning',
                                        message: '限时促销时数量不能必须为0'
                                    }); 
                                    goArr = false
                                }
                            })
                        }
                        if (this.normalPromotionForm.promotionType == 1 || this.normalPromotionForm.promotionType == 2) {
                            this.normalPromotionForm.skuList.forEach(item => {
                                if (item.descCount <= 0) {
                                    this.$message({
                                        type: 'warning',
                                        message: '批量或者偶数促销时数量必须大于0'
                                    }); 
                                    goArr = false
                                }
                            })
                        }

                        if (goArr) {


                            this.normalPromotionForm.skuList.forEach(item => {
                                item.descPrice = item.descPrice * 100
                            })

                            let datas = {}
                            datas = this.normalPromotionForm
                            this.normalPromotionEdit(datas).then((purchaseId) =>{
                                this.OnBackLatePage();
                            })
                        }
                    
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '请填写必填项'
                        });
                    return false;
                    }
                });
            },
            // 取消提交表单
            cancelFunction (normalPromotionForm) {
                this.$refs[normalPromotionForm].resetFields();
                this.OnBackLatePage()
            },
            //点击取消
            OnBackLatePage(){
                this.$message({
                    type: 'success',
                    message: `操作成功`
                })
                this.quit(routesMapping.normalPromotion,true)
            },
            // 搜索业务实体
            groupFilter(){
                let par = {status: 1}
                this.userGroupAll(par).then(res => {
                    this.groupList = res.result;
                });
                
            },
            getGroupInfo(val){
                this.groupList.forEach((item, index) => {
                    if (item.userGroupId == val) {
                        this.normalPromotionForm.userGroupId = item.userGroupId
                        this.normalPromotionForm.groupName = item.groupName
                    }
                })
            },
        }
    }
</script>
<style lang='scss' scoped>
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
                .displayStyle ,.displayStyle1{
                    display: inline-block;
                    padding-left: 25px;
                    .row_width{
                        width: 300px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        height: 36px;
                        color: #666666;
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
                .supplierNo{
                    margin-left: 195px;
                }
                .text-dash-show{
                    font-size: 14px;
                }
            }
            .addProduct{
                // margin-bottom: 16px;
                margin-top: 15px;
                margin-left: 20px;
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
        .cancel-button{
             color: #3B8CFF;
             border: 1px solid #BFD9FE;
        }
        .unvalid{
            border-radius:5px;
        }
        .el-table__body-wrapper {
            overflow: inherit;
        }

    }

</style>
<style lang='scss'>
    .createPurchase-view {
        .procurements-config-wrapper {
            overflow: inherit;
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
            width:300px;
            margin-left: 0px;
            font-size: 14px;
        }
        .el-form-item__label{
            color: #333;
        }
        .el-form-item{
            margin-bottom: 13px;
        }
        .el-textarea__inner{
            margin-top: 5px;
            height:80px;
            margin-left: 2px;
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
        .el-input.is-disabled .el-input__inner{
            background-color: #f0f0f0;
            font-size: 14px;
        }
        .unvalid .el-input__inner{
            border-color: red !important;
        }
    }
</style>
