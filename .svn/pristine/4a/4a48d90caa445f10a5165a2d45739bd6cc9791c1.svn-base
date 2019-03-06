<template>
    <div class="outbound_productlist content">
        <div class="title">
            <div>商品清单</div>
        </div>
        <div class="content-wrapper">
            <div class="form-item-contaniner">
                <div class="addProduct">
                    <el-button size="mini" @click="addNewProduct">
                        <i class="el-icon-plus"></i>
                        <span>添加商品行</span>
                    </el-button>
                </div>
                <table class="productTable native-table-show">
                    <thead>
                    <tr class="thead-tr-show">
                        <th width="230" style="padding-left:20px">商品名称</th>
                        <th width="150">商品编码</th>
                        <th width="110">单位</th>
                        <th width="150">商品单价（元）</th>
                        <th width="150">出库数量</th>
                        <th width="150">出库总价（元）</th>
                        <th >备注</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(one,index) in checkProductList" class="tbody-tr-show">
                        <!--sku名称-->
                        <td>
                            <el-select v-model="one.skuId"
                                       style="padding-left: 13px"
                                       :filter-method="skuNameFilter"
                                       filterable
                                       clearable
                                       size="small"
                                       @focus="chooseGoods"
                                       popper-class="max-length"
                                       placeholder="请选择或输入商品的名字"
                                       @clear="clearSkuId(index)"
                                       @change="queryProductDetail(one.skuId,index)"
                                       class="text-dash-show"
                            >
                                <el-option
                                    v-for="(item,n) in productList"
                                    :key="item.skuId + n + item.skuName"
                                    :label="item.skuName"
                                    :value="item.skuId">
                                </el-option>
                            </el-select>
                        </td>
                        <!--sku编码-->
                        <td :title="one.skuId"><span>{{one.skuId ? one.skuId : '--'}}</span>
                        </td>
                        <td :title="one.unitName"><span>{{one.unitName ? one.unitName : '--'}}</span></td>
                        <!--商品单价-->
                        <td :title="one.skuPrice">
                            <el-input placeholder="0" class="table-input" size="small" type="number"
                                      v-model="one.skuPrice" :min="0" @keyup.native="setStockOutProductPrice(one)"></el-input>
                        </td><!--出库数量-->
                        <td :title="one.stockOutCount">
                            <el-input :placeholder="one.effectiveTotalNum ? `0~${one.effectiveTotalNum}` : '0'" class="table-input" size="small" type="number"v-model="one.stockOutCount" :min="0"  :class="one.isCountValidate == false?'unvalid':''" @keyup.native="setOutStockCountValue(index,one)"
                                      onKeypress.native="disabledE"
                            ></el-input>
                        </td>
                        <!--出库总价-->
                        <td :title="one.Totalprice">
                            <span v-if="one.stockOutCount && one.skuPrice">{{(one.stockOutCount*one.skuPrice).toFixed(2)}}</span><span v-else>--</span>
                        </td>
                        <td :title="one.comments">
                            <div class="table-operation">
                                <el-input class="table-input" type="text" v-model="one.comments"
                                          size="small"></el-input>
                                <div class="iconfont1 icon-shanchuhang" @click="deleteProduct(index)"></div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="orderContainer">
                    <div class="orderCount">
                        出库合计金额 : <span>￥{{totalAmount}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import PlatformMixins from '~/mixins/platform';
    import MessageMixins from '~/mixins/messages';
    import misc from '~/utils/misc';
    export default {
        name: "OutboundProductList",
        mixins: [MessageMixins, PlatformMixins],
        props:{
            checkProductList:{
                type: Array,
                required: false,
                default: [{}]
            },
            storehouseId:''
        },
        data(){
            return{
                productList: [],
                productListTemp: [],
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
        methods:{
            ...mapActions(['getStorehouseList','createStockOutSheet','QueryProductSearch','QueryProductEffectiveStock',"showPageLoading", "hidePageLoading"]),
            //获取商品名称
            getProductList(storehouseId){
                if (!storehouseId) {
                    this.productList = [];
                    this.productListTemp = [];
                    return;
                }
                this.QueryProductSearch({storehouseId: storehouseId,isPage:false}).then((res) => {
                    if(res.result && res.result.length>0){
                        this.productList = res.result;
                        this.productListTemp = res.result;
                    }else{
                        this.productList = [];
                        this.productListTemp = [];
                        this.showWarning("该仓库下暂无相关商品信息");
                        return false
                    }
                })
            },
            addNewProduct(){
                this.checkProductList.unshift({});
            },
            skuNameFilter(string){
                if (!string) {
                    return this.productList = this.productListTemp
                }
                this.productList = this.productListTemp.filter((item) => {
                    if (item.skuName.toString().indexOf(string) >= 0 || item.productName.toString().indexOf(string) >= 0 || item.skuId.toString().indexOf(string) >= 0) {
                        return item
                    }
                });
            },
            clearSkuId(index){
                this.productList = this.productListTemp;
                this.$set(this.checkProductList, index, {})
            },
            queryProductDetail(skuId, index){
                if (!skuId) return;
                this.QueryProductEffectiveStock({skuId:skuId,storehouseId:this.storehouseId}).then((resp) => {
                        resp.price = "";
                        resp.comments = "";
                        resp.stockOutCount = "";
                        var product = Object.assign({},this.checkProductList[index],resp)
                        this.$set(this.checkProductList,index,product)
                    }
                )
                // let product = Object.assign({}, pro);
                // this.$set(this.checkProductList, index, product)
            },
            chooseGoods(){
                if(!this.storehouseId){
                    this.showWarning('请先选择发货仓库!')
                    return false
                }
            },
            setStockOutProductPrice(row){
                misc.validatePrice(row.skuPrice, this);
                // let priceString = String(row.skuPrice).split('.')[0];
                // //  判断小数后两位
                // let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
                // if (row.skuPrice && !reg.test(row.skuPrice)) {
                //     this.showWarning('商品单价仅保留两位小数点');
                // }
                // if( parseInt(row.skuPrice) <= 0){
                //     row.skuPrice = 0
                // }else if(Number(row.skuPrice) > 9999999.99 || priceString.length>7){
                //     this.showWarning('单价长度除小数点后不能大于7位数,若大于只取前7位，后面无效');
                //     row.purchasePrice = (row.purchasePrice).substr(0,7)
                //     return
                // }else if(row.skuPrice.length>1 && row.skuPrice.indexOf(0)===0){
                //     row.skuPrice = " "
                // }
            },
            setOutStockCountValue(index,row) {
                let validateOutStockCount = true;
                if(Number(row.stockOutCount) <= Number(row.effectiveTotalNum) && Number(row.stockOutCount) >0){
                    row.isCountValidate = true;
                    validateOutStockCount = true;
                }else if(parseInt(row.stockOutCount) < 0){
                    row.stockOutCount = "";
                    validateOutStockCount = false;
                }else{
                    row.isCountValidate = false
                    validateOutStockCount = false;
                }
                this.$set(this.checkProductList,index,row)
                return validateOutStockCount
            },
            deleteProduct(index){
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.checkProductList.splice(index, 1);
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .outbound_productlist{
        .addProduct {
            margin-bottom: 16px;
        }
        .form-item-contaniner{
            .orderContainer{
                background-color: #FBFBFB;
                padding: 0px 20px;
                border: 1px solid #F1F1F1;
                height: 50px;
                line-height: 50px;
                margin-top: 20px;
                .orderCount{
                    text-align: right;
                    span{
                        color: red;
                        font-size: 18px;
                    }
                }
            }
        }
    }
</style>
