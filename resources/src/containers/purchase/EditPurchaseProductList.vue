<template>
    <table v-if="JSON.stringify(contractData) != '{}'"  class="native-table-show" >
                    <thead>
                        <tr class="thead-tr-show">
                            <th width="200" style="padding-left:15px">商品名称</th>
                            <th width="100">sku编码</th>
                            <th width="100">单位</th>
                            <th width="120">定价方式</th>
                            <th width="200">含税采购单价(元)</th>
                            <th width="130">含税总额(元)</th>
                            <th width="80">税率</th>
                            <th width="220">不含税采购单价(元)</th>
                            <th width="160">不含税总额(元)</th>
                            <th width="150">采购数量</th>
                            <th width="170">备注</th>
                        </tr>
                    </thead >
                    <tbody>
                        <tr v-for="(one,index) in checkProductList" class="tbody-tr-show">
                            <!--sku名称-->
                            <td :title="one.skuName" style="padding-left: 15px"><span v-if="one.skuName">{{one.skuName}}</span> <span v-else>--</span></td>
                            <!--sku编码-->
                            <td :title="one.skuId" ><span v-if="one.skuId">{{one.skuId}}</span><span v-else>--</span></td>
                            <td :title="one.unitName" ><span v-if="one.unitName">{{one.unitName}}</span> <span v-else>--</span></td>
                            <!--定价方式-->
                            <td :title="priceTypeText[one.priceType]"><span v-if="one.priceType">{{priceTypeText[one.priceType]}}</span><span v-else>--</span></td>
                            <!--含税采购单价-->
                            <td >
                                <span>{{isNaN((one.purchasePrice*(1+(one.taxRate)*0.01)).toFixed(2)) ? '--' : (one.purchasePrice*(1+(one.taxRate)*0.01)).toFixed(2)}}</span>
                            </td>
                            <!--含税总额-->
                            <td>
                                <span>{{isNaN(((one.purchasePrice*(1+(one.taxRate)*0.01))*(one.purchaseCount)).toFixed(2)) ? '--' :((one.purchasePrice*(1+(one.taxRate)*0.01))*(one.purchaseCount)).toFixed(2)}}</span>
                            </td>
                            <!--税率-->
                            <td :title="one.taxRate"> <span>{{one.taxRate!=="" ? one.taxRate : '--'}}%</span></td>
                            <!--不含税采购单价-->
                            <td :title="one.purchasePrice">
                                <el-input class="table-input"  size="small" type="number" v-model="one.purchasePrice" :min="0" placeholder="0" v-if="one.priceType === 1" :disabled="true"></el-input>
                                <el-input class="table-input" :class="one.isValidate == false?'unvalid':''"  v-else size="small"  type="number" :placeholder="getPriceRange(one.minPrice,one.maxPrice)" v-model="one.purchasePrice" @keyup.native="setFixPriceValue(index,one)"></el-input>
                            </td>
                            <!--不含税总额-->
                            <td :title="one.purchaseTotalPrice">
                                <span >{{isNaN(one.purchasePrice * one.inputPurchaseCount) ? '--' : (one.purchasePrice * one.inputPurchaseCount).toFixed(2)}}</span>
                            </td>
                            <!--采购数量-->
                            <td :title="one.inputPurchaseCount">
                                <el-input  v-if="contractData.contractType == 1" class="table-input" :class="one.isCountValidate == false?'unvalid':''" size="small" type="number" v-model="one.inputPurchaseCount" :min="0"
                                        :placeholder="getCountRange(one.contractPurchaseCount,one.purchasedCount,one.purchaseCount) ? '0~'+getCountRange(one.contractPurchaseCount,one.purchasedCount,one.purchaseCount) : ''"
                                        @keyup.native="setPurchaseCountValue(index,one)"></el-input>
                                <el-input type="number" size="small" v-else v-model="one.inputPurchaseCount" @keyup.native="setFramPurchaseCountValue(one,index)"></el-input>
                            </td>
                            <td :title="one.comment">
                                <div class="table-operation">
                                    <el-input class="table-input" type="text" v-model="one.comment" size="small"></el-input>
                                    <div class="iconfont1 icon-shanchuhang" @click="deleteProduct(index)"></div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-else>
                    <div class="addProduct">
                        <el-button size="mini" @click="addNewProduct">
                            <i class="el-icon-plus"></i>
                            <span>添加商品行</span>
                        </el-button>
                    </div>
                    <table class="native-table-show" >
                        <thead>
                            <tr class="thead-tr-show">
                                <th width="200" style="padding-left:15px">商品名称</th>
                                <th width="100">商品编码</th>
                                <th width="100">单位</th>
                                <th width="120">定价方式</th>
                                <th width="200">含税采购单价(元)</th>
                                <th width="130">含税总额(元)</th>
                                <th width="80">税率</th>
                                <th width="200">不含税采购单价(元)</th>
                                <th width="150">不含税总额(元)</th>
                                <th width="100">采购数量</th>
                                <th width="170">备注</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(one,index) in checkProductList" class="tbody-tr-show">
                                <!--sku名称-->
                                <td>
                                    <el-select v-model="one.skuId"
                                               style="width: 150px;padding-left: 13px"
                                               :filter-method="skuNameFilter"
                                               filterable
                                               clearable
                                               size="small"
                                               popper-class="max-length"
                                               placeholder="请选择或输入商品的名字"
                                               @clear="clearSkuId(index)"
                                               @change="queryProductDetail(one.skuId,index)"
                                               class="text-dash-show"
                                    >
                                        <el-option
                                            v-for="(item,n) in productList"
                                            :key="item.skuId"
                                            :label="item.skuName"
                                            :value="item.skuId">
                                        </el-option>
                                    </el-select>
                                </td>
                                <!--sku编码-->
                                <td :title="one.skuId" ><span v-if="one.skuId">{{one.skuId}}</span> <span v-else>--</span></td>
                                <td :title="one.unitName" ><span v-if="one.unitName">{{one.unitName}}</span> <span v-else>--</span></td>
                                <!--定价方式-->
                                <td>--</td>
                                <!--含税采购单价-->
                                <td :title="one.purchasePrice">
                                    <el-input class="table-input" size="small" type="number" v-model="one.purchasePrice" :min="0" placeholder="0" @keyup.native="setPriceValue(one)"></el-input>
                                </td>
                                <!--含税总额-->
                                <td :title="one.purchaseTotalPrice">
                                    <span v-if="one.purchasePrice && one.purchaseCount">{{one.purchasePrice*one.purchaseCount}}</span><span v-else>--</span>
                                </td>
                                <!--税率-->
                                <td :title="one.taxRate">
                                    <el-select v-model="one.taxRate" size="small"  placeholder="请选择">
                                        <el-option
                                            v-for="item in taxRateOpt"
                                            :key="item.taxRate"
                                            :label="item.label"
                                            :value="item.taxRate">
                                        </el-option>
                                    </el-select>
                                </td>
                                <!--不含税采购单价-->
                                <td >
                                    <span v-if="one.purchasePrice && one.taxRate">{{(one.purchasePrice/(1+(one.taxRate)*0.01)).toFixed(2)}}</span>
                                    <span v-else>--</span>
                                </td>
                                <!--不含税总额-->
                                <td>
                                    <span v-if="one.purchasePrice && one.taxRate && one.purchaseCount">{{((one.purchasePrice/(1+(one.taxRate)*0.01))*(one.purchaseCount)).toFixed(2)}}</span>
                                    <span v-else>--</span>
                                </td>
                                <!--采购数量-->
                                <td :title="one.purchaseCount">
                                    <el-input placeholder="0" class="table-input" size="small" type="number" v-model="one.purchaseCount" :min="0" @keyup.native="setValue(one)"></el-input>
                                </td>
                                <td :title="one.comment">
                                    <div class="table-operation">
                                        <el-input class="table-input" type="text" v-model="one.comment" size="small"></el-input>
                                        <div class="iconfont1 icon-shanchuhang" @click="deleteProduct(index)"></div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
 import MessageMixins from '~/mixins/messages';
 import {routesMapping} from '~/router';
    export default {
        name: "PurchaseProductList",
        mixins: [MessageMixins],
        props:{
        	contractData:{
        		type: Object,
                required: true,
                default: {}
        	},
        	checkProductList:{
        		type: Array,
                required: false,
                default: [{}]
        	}
        },
        data(){
        	return {
        		productListTemp:[],
        		productList:[],
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
        	}
        },
        mounted(){
            this.getProductList();
            this.initTableData();
        },
        methods:{
             ...mapActions(["SearchGoodsList"]),
            getPriceRange(minPrice=0,maxPrice=0){
                if (!minPrice && !maxPrice) {
                    return ""
                }
                return `${minPrice}~${maxPrice}`
            },
            initTableData(){
                this.checkProductList.unshift({purchaseCount:null,productId:'',skuId:'',purchasePrice:"",priceType:'',taxRate:'',comment:null,inputPurchaseCount:""})
            },
            //设置框架合同的数量限制
            setFramPurchaseCountValue(row,index){
                if(Number(row.inputPurchaseCount) < 0){
                    row.inputPurchaseCount ="0"
                }else if(row.inputPurchaseCount.length>1 && row.inputPurchaseCount.indexOf(0)===0){
                    row.inputPurchaseCount = " "
                }
            },
            //设置采购数量,含税采购单价(元), 含税总额(元)
            setValue(row) {
                if( parseInt(row.purchaseCount) < 0){
                    row.purchaseCount = 0
//                    this.$set(this.checkProductList[index],"purchaseTotalPrice",0);
                }else if(row.purchaseCount.length>10){
                    this.$message({
                        message: '采购数量长度不能大于10位,若大于只取前10位，后面无效',
                        type: 'error',
                        duration:2000});
                    row.purchaseCount = (row.purchaseCount).substring(0,10)
                }else if(row.purchaseCount.length>1 && row.purchaseCount.indexOf(0)===0){
                    row.purchaseCount = " "
                }
            },
            setPriceValue(row){
                if( parseInt(row.purchasePrice) < 0){
                    row.purchasePrice = 0
                }else if(row.purchasePrice.length>10){
                    this.$message({
                        message: '含税采购单价长度不能大于10位,若大于只取前10位，后面无效',
                        type: 'error',
                        duration:2000});
                    row.purchasePrice = (row.purchasePrice).substring(0,10)
                }else if(row.purchasePrice.length>1 && row.purchasePrice.indexOf(0)===0){
                    row.purchasePrice = " "
                }
            },
            setFixPriceValue(index,row){
                let validate = true;
                let pattern =/^[0-9]+([.]\d{1,2})?$/;
                if (!pattern.test(row.purchasePrice)) {
                    row.purchasePrice = parseFloat(row.purchasePrice).toFixed(2)
                    // this.showWarning('请在小数点后保留两位小数')
                }
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
            deleteProduct(index){
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.checkProductList.splice(index, 1);
                    this.showSuccess();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
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
            addNewProduct(){
                this.initTableData();
            },
            skuNameFilter(string){
                if(!string){
                    return this.productList = this.productListTemp
                }
                this.productList = this.productListTemp.filter((item) =>{
                    if (item.skuName.toString().indexOf(string)>=0 || item.productName.toString().indexOf(string)>=0 || item.skuId.toString().indexOf(string) >=0) {
                        return item
                    }
                })
            },
            //获取商品名称
            getProductList(){
                this.SearchGoodsList({status:1,searchContent:this.searchContent}).then((res) =>{
                    this.productList = res.result;
                    this.productListTemp = res.result;
                })
            },
            clearSkuId(index){
                this.$set(this.checkProductList,index,{})
            },
            queryProductDetail(skuId,index){
                if(!skuId) return
                // this.querySkuDetail({skuId:skuId}).then((resp) => {
                //         resp[0].purchasePrice = resp[0].cost;
                //         resp[0].purchaseTotalPrice = 0;
                //         resp[0].comment = "";
                //         var product = Object.assign({},this.checkProductList[index],resp[0])
                //         this.$set(this.checkProductList,index,product)
                //     }
                // )
                var pro = this.productList.find(item=>{
                    if (item.skuId == skuId) {
                        return item
                    }
                })
                var product = Object.assign({},pro)
                this.$set(this.checkProductList,index,product)
            },
            getCountRange(totalCount=0,purchasedCount=0,purchaseCount=0){
                // let total = totalCount || 0;
                // let purchase = purchasedCount || 0;
                // let currentPurchaseCount  = purchaseCount || 0;
                let allowedCount = Number(totalCount) - Number(purchasedCount) + Number(purchaseCount);
                console.log(allowedCount)
                return allowedCount
            },
        }
    }
</script>

<style scoped>

</style>
