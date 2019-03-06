<template>
    <table class="native-table-show">
        <thead>
            <tr class="thead-tr-show">
                <th width="200" style="padding-left:15px">商品名称</th>
                <th width="100">商品编码</th>
                <th width="100">数量</th>
                <th width="120">优惠类型</th>
                <th width="200">价格</th>
                <th width="130">折扣</th>
            </tr>
        </thead >
        <tbody>
            <tr v-for="(one,index) in checkProductList" :key="index" class="tbody-tr-show">
                <!--sku名称-->
                <td>
                    <el-select v-model="one.skuName"
                        style="width: 150px;padding-left: 13px"
                        :multiple="false"
                        filterable
                        clearable
                        size="small"
                        popper-class="max-length"
                        placeholder="请选择或输入商品的名字"
                        @clear="clearSkuId(index)"
                        @change="getContractInfo"
                        @blur="getBlur(index)"
                        class="text-dash-show"
                        >
                        <el-option
                            v-for="(item, index) in contractList"
                            :key="index"
                            :label="item.skuName"
                            :value="item.skuId">
                        </el-option>
                    </el-select>
                </td>
                <!--sku编码-->
                <td :title="one.skuId" >
                    <el-input class="table-input" size="small" type="number" v-model="one.skuId" disabled></el-input>
                </td>
                <!--数量-->
                <td :title="one.descCount">
                    <el-input class="table-input" size="small" type="number" v-number-decimal-only v-model="one.descCount" :min="0" placeholder="0"></el-input>
                </td>
                <!--优惠类型-->
                <td :title="one.descType">
                    <el-select v-model="one.descType" size="small" placeholder="请选择" @change="changeDescTypeFun" @blur="blurDescTypeFun(index)">
                        <el-option :value="0" label="按优惠价"></el-option>
                        <el-option :value="1" label="按优惠折扣"></el-option>
                    </el-select>
                </td>
                <!--价格-->
                <td :title="one.descPrice">
                    <el-input class="table-input" size="small" type="number" v-number-decimal-only v-model="one.descPrice" v-if="one.descType === 0"></el-input>
                    <el-input class="table-input" size="small" type="number" v-model="one.descPrice" v-else placeholder="0" disabled></el-input>
                </td>
                <!--折扣-->
                <td :title="one.descRate">
                    <el-input class="table-input" size="small" type="number" v-number-decimal-only v-model="one.descRate" v-if="one.descType === 1"></el-input>
                    <el-input class="table-input" size="small" type="number" v-model="one.descRate" v-else placeholder="0" disabled></el-input>
                </td>
                <td>
                    <div class="table-operation" min-width="100">
                        <div class="iconfont1 icon-shanchuhang" @click="deleteProduct(index)"></div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import {mapActions, mapState} from 'vuex';
 import MessageMixins from '~/mixins/messages';
 import { directives } from '~/utils/directives/index'
 import {routesMapping} from '~/router';
    export default {
        name: "PromotionProductList",
        mixins: [MessageMixins],
        props:{
        	relatedContract:{
        		type: Boolean,
                required: true,
                default: false
        	},
            contractData:{
                type: Object,
                required: false,
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
                contractList: [],
                currentIndex: ''
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
            getBlur(index) {
                this.currentIndex = index
            },
            getContractInfo(val){
                let outIndex = this.currentIndex
                this.contractList.forEach((item, index) => {
                    if (item.skuId == val) {
                        this.checkProductList[outIndex].skuId = item.skuId
                        this.checkProductList[outIndex].skuName = item.skuName
                    }
                })
            },
            clearSkuId(index){
                this.$set(this.checkProductList,index,{})
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
            changeDescTypeFun (val) {
                let outIndex = this.currentIndex
                if (val == 0) {
                    this.checkProductList[outIndex].descRate = '0'
                } else if (val == 1) {
                    this.checkProductList[outIndex].descPrice = '0'
                }
            },
            blurDescTypeFun (index) {
                this.currentIndex = index
            }
        }
    }
</script>

<style scoped>

</style>
