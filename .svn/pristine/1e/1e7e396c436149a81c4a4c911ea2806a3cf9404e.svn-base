<template>
    <table class="native-table-show">
        <thead>
            <tr class="thead-tr-show">
                <th width="200" style="padding-left:15px">商品名称</th>
                <th width="120">商品编码</th>
                <th width="120">账面数量</th>
                <th width="120">实盘数量</th>
                <th width="120">盈亏数量</th>
                <th width="120">类型</th>
                <th width="120">备注</th>
                <th width="100" v-show="false">编号</th>
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
                        @clear="clearSkuId(index)"
                        @change="getContractInfo"
                        @blur="getCurrentIndex(index)"
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
                    <el-input class="table-input" size="small" type="number" v-model="one.skuId" disabled></el-input>
                </td>
                <!--账面数量-->
                <td :title="one.totalCount">
                    <el-input class="table-input" size="small" type="number" v-model="one.totalCount" disabled></el-input>
                </td>
                <!--实盘数量-->
                <td :title="one.actualCount">
                    <el-input class="table-input" size="small" v-number-decimal-only type="number" v-model="one.actualCount" @change="changeActualCount(one.totalCount, one.actualCount, index)"></el-input>
                </td>
                <!--盈亏数量-->
                <td :title="one.adjustCount">
                    <el-input class="table-input" size="small" type="number" v-model="one.adjustCount" disabled></el-input>
                <!--类型-->
                <td :title="one.resultType">
                    <el-select v-model="one.resultType" size="small" placeholder="请选择" disabled>
                        <el-option :value="0" label="正常"></el-option>
                        <el-option :value="1" label="盘盈"></el-option>
                        <el-option :value="2" label="盘亏"></el-option>
                    </el-select>
                </td>
                <!--备注-->
                <td :title="one.comments">
                    <el-input class="table-input" size="small" type="text" v-model="one.comments" :maxlength="500"></el-input>
                </td>
                <td>
                    <div class="table-operation" min-width="100">
                        <div class="iconfont1 icon-shanchuhang" @click="deleteProduct(index)"></div>
                    </div>
                </td>
                <td v-show="false">
                    <div class="table-operation">
                            <el-input class="table-input" size="small" type="number" v-model="one.serialNo = index" disabled></el-input>
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
        name: "inventoryListAdd",
        mixins: [MessageMixins],
        props:{
        	relatedContract:{
        		type: Boolean,
                required: true,
                default: false
        	},
            contractData:{},
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
            console.log(1)
            this.contractFilter()
        },
        methods:{
             ...mapActions(["querySkuCodeByProductName","queryStockSkuPrice"]),
            contractFilter(){
                let par = {pageNo: 1,}
                this.querySkuCodeByProductName(par).then(res => {
                    this.contractList = res.result;
                });
            },
            getCurrentIndex (index) {
                this.currentIndex = index
            },
            getContractInfo(val){
                let outIndex = this.currentIndex
                if (this.contractData) {
                    this.contractList.forEach((item, index) => {
                        if (item.skuId == val) {
                            this.checkProductList[outIndex].skuId = item.skuId
                            this.checkProductList[outIndex].skuName = item.skuName
                            this.checkProductList[outIndex].productId = item.productId
                        }
                    })
                    let obj = {
                        skuId: val,
                        storehouseId: this.contractData
                    }
                    this.queryStockSkuPrice(obj).then(res => {
                        if (res.result.length) {
                            res.result.forEach(item => {
                                if (this.contractData == item.storehouseId) {
                                    this.checkProductList[outIndex].totalCount = item.totalCount
                                }
                            })
                            // this.checkProductList[outIndex].totalCount = res.result.totalCount;
                        } else {
                            this.checkProductList[outIndex].totalCount = 0
                        }
                    });
                } else {
                   this.$message({
                        type: 'warning',
                        message: '请先选择仓库'
                    });
                }
 
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
            changeActualCount (totalCount, actualCount, index) {
                console.log(totalCount, actualCount, index, 887)
                if (totalCount == actualCount) {
                    this.checkProductList[index].adjustCount = 0
                    this.checkProductList[index].resultType = 0
                } else if (totalCount < actualCount) {
                    this.checkProductList[index].adjustCount = actualCount - totalCount
                    this.checkProductList[index].resultType = 1
                } else if (totalCount > actualCount) {
                    this.checkProductList[index].adjustCount = totalCount - actualCount
                    this.checkProductList[index].resultType = 2
                }
            },
        }
    }
</script>

<style scoped>

</style>
