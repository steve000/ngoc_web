<template>
    <div class="create-storage">
        <div class="create-storage-container">
            <div class="content">
                <div class="title">
                    <div>基本信息</div>
                </div>
                <div class="content-wrapper">
                    <el-form label-position="left" label-width="105px" :model="createStockOut" :rules="rules"
                             ref="createStockOut">
                        <el-form-item label="操作员：" required>
                            <el-input class="form-input-width"  v-model="operator" size="small" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="出库原因：" prop="reason">
                            <el-select v-model="createStockOut.reason"
                                       class="form-input-width"
                                       clearable
                                       size="small"
                                       placeholder="请选择"
                            >
                                <el-option
                                    v-for="(item,index) in reasonType"
                                    :key="item.reason + index + item.type"
                                    :label="item.type"
                                    :value="item.reason">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <div>
                            <el-form-item label="发货仓库： " prop="storehouseId">
                                <el-select v-model="createStockOut.storehouseId"
                                           class="form-input-width"
                                           placeholder="输入仓库名称/编码搜索"
                                           size="small"
                                           clearable
                                           filterable
                                           @clear="clearProductInfo()"
                                           @change="storehoseChoosed(createStockOut.storehouseId)"
                                           :filter-method="storehouseFilter"
                                           :popper-class="'max-length'"
                                >
                                    <el-option v-for="(item,index) in storehouseList"
                                               :key="item.storehouseName + index + item.storehouseId"
                                               :label="item.storehouseName"
                                               :value="item.storehouseId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <el-form-item label="备注：" prop="comments" class="reset-form-label">
                            <el-input type="textarea"
                                      v-model="createStockOut.comments" placeholder="请输入备注，200字以内"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="content">
                <div class="title">
                    <div>收货信息</div>
                </div>
                <div class="content-wrapper">
                    <el-form label-position="left" label-width="100px" :model="arriveInfo" :rules="addressValidate"  ref="address" style="margin-left: 15px">
                        <div>
                            <div style="display: inline-block;margin-right:30px;">
                                <el-form-item label="联系人：" prop="linkman" >
                                    <el-input v-model="arriveInfo.linkman" size="small"
                                              class="form-input-width" placeholder="请输入联系人" :maxlength="20"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div style="display: inline-block">
                                <el-form-item label="联系电话：" prop="phone" >
                                    <el-input v-model="arriveInfo.phone" size="small" type="number" style="width: 300px"
                                              placeholder="请输入联系电话" v-number-only></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div style="display: inline-block;margin-right:30px;">
                            <el-form-item label="邮箱：" prop="email">
                                <el-input v-model="arriveInfo.email" size="small"
                                          class="form-input-width" placeholder="请输入邮箱"></el-input>
                            </el-form-item>
                        </div>
                        <div style="display: inline-block">
                            <el-form-item label="收货地址：">
                                <address-select @selectAddress="selectAddress"></address-select>
                            </el-form-item>
                        </div>
                        <el-form-item label="详细地址：" prop="address">
                            <el-input v-model="arriveInfo.address" size="small" placeholder="请输入详细地址"
                                      :maxlength="90"
                                      style="width: 736px"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <outbound-productList :checkProductList="checkProductList" :storehouseId="createStockOut.storehouseId" ref="outboundProductList">
            </outbound-productList>
            <div class="btn-section pt20">
                <el-button type="primary" size="small" @click="createStockOutFrom('createStockOut')">提交</el-button>
                <el-button  size="small" class="cancel-button" @click="quit(routesMapping.OutboundManagement)">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex';
    import MessageMixins from '~/mixins/messages';
    import PlatformMixins from '~/mixins/platform';
    import { directives } from '~/utils/directives/index'
    import QuitMixins from '~/mixins/quit';
    import misc from '~/utils/misc'
    import AddressSelect from '~/components/common/AddressSelect';
    import OutboundProductList from '~/components/stocks/outbound/OutboundProductList';
    export default {
        name: 'CreateOutbound',
        mixins: [MessageMixins, PlatformMixins,QuitMixins],
        components: {AddressSelect,OutboundProductList},
        data () {
            let validatorComments = (rule, value, callback) => {
                if(value.length>200){
                    return callback(new Error('请输入200以内的汉字'));
                }else{
                    return callback();
                }
            }
            let validatePhone = (rule, value, callback) => {
                if (!value) {
                    return callback()
                } else {
                    if (value.length>11) {
                        callback(new Error('请输入11位数字以内的电话号码'))
                    } else {
                        return callback()
                    }
                }
            }
            return {
                storehouseType:'',
                createStockOut: {
                    type: "3",
                    reason:"",
                    storehouseId: "",
                    storehouseType:1,
                    comments: "",
                    productList: [],
                },
                arriveInfo:{
                    linkman:'',
                    address:'',
                    phone:'',
                    email:'',
                    provinceCode:'',
                    cityCode:'',
                    areaCode:'',
                    province:'',
                    city:'',
                    area:''
                },
                operator: "",
                reasonType:[{type:"报损",reason:1},{type:"领用",reason:2},{type:"盘亏",reason:3}],
                storehouseTypeList: [{label: '本地仓', value: '1'}, {label: '中移物流仓', value: '2'}],
                productList: [],
                productListTemp: [],
                storehouseList: [],
                storehouseListTemp: [],
                checkProductList: [{}],
                rules: {
                    reason: {required: true, message: '请选择出库原因', trigger: 'change'},
                    storehouseId: {required: true, message: '请选择发货仓库', trigger: 'change'},
                    comments:{required: false, validator: validatorComments, trigger: 'change'},
                },
                addressValidate:{
                    phone: [{required: false, validator: validatePhone, trigger: 'change'}],
                    email: [{required: false, type: 'email', message: '请输入正确的邮箱地址!', trigger: 'change'}],
                }
            }
        },
        computed:{
            totalAmount: function () {
                if(this.checkProductList.length>0){
                    let resNumType = 0;
                    this.checkProductList.forEach(item=>{
                        let StockOutTotalPrice = item.skuPrice * item.stockOutCount  || 0;
                        resNumType += StockOutTotalPrice
                    });
                    resNumType = Number(resNumType).toFixed(2)
                    return resNumType
                }
            },
        },
        mounted(){
            const userName = sessionStorage.getItem('userName');
            this.operator = userName;
            this.getStorehouseType();
        },
        methods: {
            ...mapActions(['getStorehouseList','createStockOutSheet','QueryProductSearch','QueryProductEffectiveStock',"showPageLoading", "hidePageLoading"]),
            getStorehouseType(){   //获取仓库
                this.getStorehouseList({storehouseType:1}).then((resp) => {
                    var storehouseTypeList = resp.filter(item=>{
                        if(item.storehouseChildType === 1){
                            return item;
                        }
                    })
                    this.storehouseList = storehouseTypeList;
                    this.storehouseListTemp = storehouseTypeList;
                });
            },
            storehoseChoosed(storehouseId){
                // debugger
            //获取仓库的类型和点击仓库id获取仓库对应的商品
                this.checkProductList = [{}];
                this.$refs.outboundProductList.getProductList(storehouseId)  
                // let choosenItem = this.storehouseList.filter(item => item.storehouseId === storehouseId)[0];
                // this.storehouseType = choosenItem.storehouseType
            },
            storehouseFilter(string){   //仓库的帅选
                if(!string){
                    return this.storehouseList = this.storehouseListTemp
                }
                this.storehouseList = this.storehouseListTemp.filter((item) =>{
                    if ((item.storehouseId && item.storehouseId.toString().indexOf(string)>=0) || (item.storehouseId && item.storehouseName.toString().indexOf(string))>=0) {
                        return item
                    }
                })
            },
            selectAddress(addressCode,addressName){  //组装省市区
                this.arriveInfo.provinceCode = addressCode[0];
                this.arriveInfo.cityCode = addressCode[1];
                this.arriveInfo.areaCode = addressCode[2];
                this.arriveInfo.province = addressName[0];
                this.arriveInfo.city = addressName[1];
                this.arriveInfo.area = addressName[2];
            },
            clearProductInfo(){
                this.productList = [];
                this.productListTemp = [];
                // this.productList = this.productListTemp
                this.checkProductList = [{}]
            },
            createStockOutFrom(formName){  //提交
                this.createStockOut.productList = [];
                this.$refs["createStockOut"].validate((valid) => {
                    if (valid) {
                        this.$refs["address"].validate((valid) => {
                            if (valid) {
                                this.submitForm();
                            }else{
                                this.showWarning('请完善地址信息')
                            }
                        })
                    }else{
                        this.showWarning('请完善表单信息')
                    }
                })
            },
            validataProductList(){  //商品清单的校验
                let effectiveConutNum = 0;
                if (this.checkProductList.length <= 0) {
                    this.showWarning('请添加商品清单')
                    return false
                }
                for (let i = 0; i < this.checkProductList.length; i++) {
                    let checkProductListItem = this.checkProductList[i];
                    effectiveConutNum = checkProductListItem. effectiveTotalNum
                    if(!Number(checkProductListItem.stockOutCount) ){
                        this.showWarning('出库数量不能为空或者0')
                        return false
                    }else if (!this.$refs.outboundProductList.setOutStockCountValue(i,checkProductListItem)) {
                        this.showWarning('可用库存不足，请重新输入出库数量 ')
                        return false
                    }
                    let validatePriceResult = misc.validatePrice(checkProductListItem.skuPrice, this);
                    if (!validatePriceResult) {
                        return false
                    }
                    if(checkProductListItem.comments && checkProductListItem.comments.length>100){
                        this.showWarning('商品清单备注长度不能超过100个汉字');
                        return false;
                    }
                    if(checkProductListItem.skuPrice === "" || checkProductListItem.skuPrice === undefined || checkProductListItem.skuPrice === null ){
                        this.showWarning('请正确填写商品单价')
                        return false
                    }
                    if (checkProductListItem.stockOutCount) {  //组装参数
                        let skuListItem = {
                            productId: checkProductListItem.productId,
                            skuId: checkProductListItem.skuId,
                            stockOutCount: checkProductListItem.stockOutCount,
                            skuPrice:(checkProductListItem.skuPrice)*100,
                            comments:checkProductListItem.comments
                        };
                        var arriveInfo = {
                            linkman:this.arriveInfo.linkman,
                            address:this.arriveInfo.address,
                            phone:this.arriveInfo.phone,
                            email:this.arriveInfo.email,
                            provinceCode:this.arriveInfo.provinceCode,
                            cityCode:this.arriveInfo.cityCode,
                            areaCode:this.arriveInfo.areaCode,
                            province:this.arriveInfo.province,
                            city:this.arriveInfo.city,
                            area:this.arriveInfo.area
                        }
                        this.createStockOut.comments = this.createStockOut.comments.trim();
                        this.createStockOut.productList.push(skuListItem);
                        this.createStockOut.arriveInfo = arriveInfo;
                    }
                }
                return true
            },
            submitForm(){
                var validateResult = this.validataProductList();
                if(!validateResult) return
                this.showPageLoading();
                this.createStockOutSheet(this.createStockOut).then((resp) => {
                    this.hidePageLoading();
                    this.showSuccess('操作成功')
                    this.quit(this.routesMapping.OutboundManagement);
                })
            },
        }
    }
</script>
<style lang="scss">
    .create-storage {
        height: 100%;
        padding: 10px 30px 0 30px;
        .create-storage-container {
            background-color: #fff;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        .content {
            .title {
                color: #333;
                font-weight: 700;
            }
        }
        .btn-section {
            .el-button {
                padding: 8px 0px;
                font-size: 14px;
            }
        }
        .unvalid{
            border-radius:5px;
            .el-input__inner{
                border-color: red !important;
            }
        }
        .el-form-item__label {
            padding-right: 20px;
            border-radius: 0px;
        }
        .form-input-width {
            width: 300px;
            font-size: 12px;
            color: #666;
        }

        .el-form-item__content{
            line-height: 35px;
        }
        .el-form-item__label {
            padding-right: 20px;
            color: #151515;
            height: 32px;
        }
        .el-form-item {
            margin-bottom: 20px;
            .el-input {
                /*width: 300px;*/
                height: 32px;
                input {
                    border: 1px solid #E0E0E0;
                    height: 32px;
                    line-height: 32px;
                }
            }
            .el-textarea {
                textarea {
                    border: 1px solid #E0E0E0;
                    height: 80px;
                }
            }
        }
        .el-select-dropdown>el-popper{
            width: 296px;
        }
    }
</style>
