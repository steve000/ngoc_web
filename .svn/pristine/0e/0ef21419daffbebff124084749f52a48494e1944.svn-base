<template>
    <table class="native-table-show">
        <thead>
            <tr class="thead-tr-show">
                <th style="padding-left:20px;width:15%">商品名称</th>
                <th style="width:10%">sku编码</th>
                <th style="width:5%">单位</th>
                <th style="width:8%">定价方式</th>
                <th style="width:10%">含税采购单价(元)</th>
                <th style="width:10%">税率</th>
                <th style="width:20%">不含税采购单价(元)</th>
                <th style="width:5%">采购总量</th>
                <th style="width:15%">备注</th>
            </tr>
        </thead >
        <tbody>
            <tr v-for="(one,index) in checkProductList" :key="index" class="tbody-tr-show">
                <!--sku名称-->
                <td>
                    <el-select v-model="one.skuId"
                        style="width: 150px;padding-left: 13px"
                        :multiple="false"
                        filterable
                        clearable
                        size="small"
                        popper-class="max-length"
                        placeholder="请选择或输入商品的名字"
                        @change="getContractInfo(one.skuId,index)"
                        class="text-dash-show"
                        >
                        <el-option
                            v-for="(item) in contractList"
                            :key="item.skuId"
                            :label="item.skuName"
                            :value="item.skuId">
                        </el-option>
                    </el-select>
                </td>
                <!--sku编码-->
                <td :title="one.skuId" >
                    <el-input class="table-input" size="small" type="number" v-model="one.skuId" disabled style="width:95%"></el-input>
                </td>
                <!-- 单位 -->
                <td :title="one.unitName">
                    <el-input class="table-input" size="small" type="number" v-model="one.unitName" disabled style="width:95%"></el-input>
                </td>
                <!-- 定价方式  1.固定价 2.区间价 -->
                <td>
                    <el-select v-model="one.priceType" placeholder="请选择" size="small">
                        <el-option :value='1' label='固定价'></el-option>
                        <el-option :value='2' label='区间价'></el-option>
                    </el-select>
                </td>
                <!-- 含税采购单价(元) -->
                <td>
                    <el-input placeholder="0" class="table-input" size="small" type="number" v-model="one.taxIncludePrice" :min="0" @keyup.native="changeTaxIncludePrice(one)" @blur="changeTaxIncludePrice(one)" style="width:95%"></el-input>
                </td>
                <!-- 税率 -->
                <td :title="one.taxRate">
                    <el-input placeholder="0" class="table-input" size="small" type="number" v-model="one.taxRate" :min="0" @keyup.native="changeTaxRate(one)" @blur="changeTaxRate(one)" style="width:95%"></el-input>
                </td>
                <!-- 不含税采购单价(元) -->
                <td>
                    <el-input placeholder="0" class="table-input" size="small" type="number" v-model="one.taxExcludedPrice" :min="0" @keyup.native="changeTaxExcludedPrice(one)" @blur="changeTaxExcludedPrice(one)" style="width:95%"></el-input>
                </td>
                <!-- 采购总量 -->
                <td :title="one.purchaseCount">
                    <el-input class="table-input" size="small" type="number" v-model="one.purchaseCount" :min="0" @keyup.native="changePurchaseCount(one)" @blur="changePurchaseCount(one)"></el-input>
                </td>
                <td :title="one.comments">
                    <div style="position: relative;">
                        <el-input class="table-input" style="width:95%" type="text" v-model="one.comments" size="small"></el-input>
                        <div class="iconfont1 icon-shanchuhang" @click="deleteProduct(index)"></div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import { directives } from '~/utils/directives/index'
import MessageMixins from '~/mixins/messages';
import {routesMapping} from '~/router';
import utils from "~/utils/commonMethod";

    export default {
        name: "AddPurchaseContractList",
        mixins: [MessageMixins],
        props:{
        	checkProductList:{
        		type: Array,
                required: false,
                default: [{}]
        	}
        },
        data(){
        	return {
                contractList: []
        	}
        },
        mounted(){
            this.contractFilter()
        },
        methods:{
             ...mapActions(["querySkuCodeByProductName"]),
            contractFilter(){
                let par = {pageNo: 1,}
                this.querySkuCodeByProductName(par).then(res => {
                    this.contractList = res.result;
                });
            },
            getContractInfo(val, outIndex){
                this.contractList.forEach((item, index) => {
                    if (item.skuId == val) {
                        this.checkProductList[outIndex].skuId = item.skuId
                        this.checkProductList[outIndex].skuName = item.skuName
                        this.checkProductList[outIndex].unitName = item.unitName
                        this.checkProductList[outIndex].unitId = item.unitId
                        this.checkProductList[outIndex].unitValue = item.unitValue
                    }
                })
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
            changeTaxIncludePrice (item) {
                console.log(item,"输入含税单价,计算");
                if (item.taxIncludePrice === '') {
                    console.log("计算11");
                    this.$set(item, "taxIncludePrice", undefined)
                    return false
                }
                if (utils.ifNoNum(item.taxIncludePrice)) {
                    console.log("计算22");
                    this.$set(item, "taxIncludePrice", Number(item.taxIncludePrice)) // 含税价
                    this.$set(item, "oldtaxIncludePrice", Number(item.taxIncludePrice))
                    this.$set(item, "taxExcludedPrice", (item.taxIncludePrice / (1 + item.taxRate / 100)).toFixed(2)) //不含税的价格
                } else {
                    console.log("计算33");
                    this.$set(item, "taxIncludePrice", item.oldtaxIncludePrice)
                }
            },
            changeTaxRate (item) {
                console.log(item,"输入税率,计算");
                if (item.taxRate === '') {
                    console.log("计算11");
                    this.$set(item, "taxRate", undefined)
                    return false
                }
                if (utils.ifNoNum(item.taxRate)) {
                    console.log("计算22");
                    this.$set(item, "taxRate", Number(item.taxRate))
                    this.$set(item, "oldtaxRate", Number(item.taxRate))
                    this.$set(item, "taxExcludedPrice", (item.taxIncludePrice / (1 + item.taxRate / 100)).toFixed(2))
                    this.$set(item, "taxIncludePrice", (item.taxExcludedPrice * (1 + item.taxRate / 100)).toFixed(2))
                } else {
                    console.log("计算33");
                    this.$set(item, "taxRate", item.oldtaxRate)
                }
            },
            changeTaxExcludedPrice (item) {
                console.log(item,"输入不含税单价,计算");
                if (item.taxExcludedPrice === '') {
                    console.log("计算11");
                    this.$set(item, "taxExcludedPrice", undefined)
                    return false
                }
                if (utils.ifNoNum(item.taxExcludedPrice)) {
                    console.log("计算22");
                    this.$set(item, "taxExcludedPrice", Number(item.taxExcludedPrice)) // 不含税价
                    this.$set(item, "oldtaxExcludedPrice", Number(item.taxExcludedPrice))
                    this.$set(item, "taxIncludePrice", (item.taxExcludedPrice * (1 + item.taxRate / 100)).toFixed(2)) //含税价
                } else {
                    console.log("计算33");
                    this.$set(item, "taxExcludedPrice", item.oldtaxExcludedPrice)
                }
            },
            changePurchaseCount (item) {
                console.log(item,"输入采购数量,计算");
                if (item.purchaseCount === '') {
                    console.log("计算11");
                    this.$set(item, "purchaseCount", undefined)
                    return false
                }
                if (utils.isDigit(item.purchaseCount)) {
                    console.log("计算22");
                    this.$set(item, "purchaseCount", Number(item.purchaseCount)) 
                    this.$set(item, "oldpurchaseCount", Number(item.purchaseCount))
                } else {
                    console.log("计算33");
                    this.$set(item, "purchaseCount", item.oldpurchaseCount)
                }
            },
        }
    }
</script>

<style scoped>

</style>
