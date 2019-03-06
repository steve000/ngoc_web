<template>
   <div class='bread-crumb'>
        <el-select v-model="skuId"
                   :filter-method="skuNameFilter"
                   filterable
                   clearable
                   placeholder="请选择或输入商品的名字"
                   @clear="clearSkuId()"
                   @change="queryProductDetail(skuId)"
                   >
            <el-option
                v-for="(item,n) in productListFilter"
                :key="n"
                :label="item.skuName"
                :value="item.skuId">
            </el-option>
        </el-select>
   </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import utils from '~/utils/misc';
    export default {
        name: 'GoodsProductTable',
        props: {
            productList: Array,index:Number
        },
        data(){
            return {
                skuId : "",
                goodsNameAndId:"",
                productListFilter : []
            }
        },
        watch:{
            productList : function(){
                this.productListFilter = this.productList
            }
        },
        created(){
            this.productListFilter = this.productList
        },
        methods:{
            ...mapActions(["querySkuDetail"]),
            skuNameFilter(string){
                let length = utils.getLength(string);
                if(!string){
                    return this.productListFilter = JSON.parse(JSON.stringify(this.productList))
                }
                if (length >0 && length < 4) {
                    this.productListFilter = []
                }else{
                    this.productListFilter = this.productList.filter((item) =>{
                        if (item.skuName.indexOf(string)>=0 || item.productName.indexOf(string)>=0) {
                            return item
                        }
                    })
                }
            },
            clearSkuId(){
                this.skuId = ""
                this.$emit('clearSkuId',this.index);
            },
            queryProductDetail(){
                if(!this.skuId) return
                 this.querySkuDetail({skuId:this.skuId}).then((resp) => {
                        this.$emit('goodsSelect',resp,this.index);
                    }
                 )
            },
        },
        computed: {
        }
    }
</script>


<style lang='scss'>

</style>
