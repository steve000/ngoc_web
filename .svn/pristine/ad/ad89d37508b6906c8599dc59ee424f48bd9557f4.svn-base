<template>
<div class="apply-transfer">
    <div style="width:100%; height: 10px; background-color: #E9EEF1"></div>
    <div class="content">
        <div class="title">
            <div>基本信息</div>
        </div>
        <div class="content-wrapper">
            <el-form :model="applyForm" label-width="80px">
                <el-form-item label="操作员: " style="width: 380px; display: inline-block; margin-right: 80px">
                    <el-input v-model="applyForm.operateMen"  size="small" disabled></el-input>
                </el-form-item>
                <el-form-item label="请货仓库: ">
                    <div class="first-select">
                        <el-select v-model="toStockType" placeholder="请选择" size="small" style="width: 100%" @change="toStockTypeChange">
                            <el-option v-for="item in stockTypeList" :key="item.type" :value="item.type" :label="item.label"></el-option>
                        </el-select>
                    </div>
                    <div class="second-select">
                        <el-select v-model="applyForm.toStock" placeholder="请选择请货仓库"  size="small" style="width: 100%" @change="isSameStock" :disabled="toStockType == ''">
                            <el-option v-for="one in storehouseListTo" :label="one.storehouseName" :value="one.storehouseId" :key="one.storehouseId"></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="发货仓库: ">
                    <div class="first-select">
                        <el-select v-model="fromStockType" placeholder="请选择" size="small" style="width: 100%" @change="fromStockTypeChange" >
                            <el-option v-for="tmp in stockTypeList" :key="tmp.label" :value="tmp.type" :label="tmp.label"></el-option>
                        </el-select>
                    </div>
                    <div class="second-select">
                        <el-select v-model="fromStock" placeholder="请选择发货仓库"  size="small" style="width: 100%" @change="isSameStock" :disabled="fromStockType == ''">
                            <el-option v-for="one in storehouseListFrom"  size="small" :label="one.storehouseName" :value="one.storehouseId" :key="one.storehouseId"></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="备注: " style="width: 685px">
                    <el-input v-model="applyForm.comment" type="textarea" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
    <div class="content pt20">
        <div class="title">
            <div>商品清单</div>
        </div>
        <div class="content-wrapper">
            <div class="search-btn mb20">
                <el-button size="mini" @click="addNewProduct">
                    <i class="el-icon-plus"></i>
                    <span>添加商品信息</span>
                </el-button>
            </div>
            <div class="productTable">
                <table class="native-table-show">
                    <thead>
                    <tr class="thead-tr-show">
                        <th>商品名称</th>
                        <th>sku编码</th>
                        <th>单位</th>
                        <th>发货仓库存</th>
                        <th width="100">请货数量</th>
                        <th>备注</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(one,index) in checkProductList" class="tbody-tr-show">
                        <td >
                            <el-select v-model="one.skuId"
                                       style="padding-left: 13px"
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
                                    :value="item.skuId"
                                >
                                </el-option>
                            </el-select>
                        </td>
                        <td><div class="row-show"><span v-if="one.skuId" :title="one.skuId">{{one.skuId}}</span><span v-else>--</span></div></td>
                        <td><div class="row-show"><span v-if="one.unitName">{{one.unitName}}</span><span v-else>--</span></div></td>
                        <td><span v-if="one.productNum">{{one.productNum}}</span><span v-else>--</span></td>
                        <td width="100">
                            <el-input size="small" :key="one.skuId" :min="1" :max="one.productNum" type="number"
                                      v-model="one.count" @keyup.native="one.count = setValue(one)"></el-input>
                        </td>
                        <td :title="one.comment">
                            <div class="table-operation">
                                <el-input v-model="one.comment" size="small" >{{one.comment}}</el-input>
                                <div class="iconfont1 icon-shanchuhang icon-delete" @click="doDeleteGood(index)"></div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="btn-section">
                <el-button type="primary" @click="submit" size="small">提交</el-button>
                <el-button type="reset" @click="quitApply" size="small" class="reset">取消</el-button>
            </div>
        </div>
    </div>

</div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import MessageMixins from '~/mixins/messages'
    import PlatformMixins from '~/mixins/platform'
    import QuitMixins from '~/mixins/quit'
    import {routesMapping} from '~/router'
export default{
    name: "ApplyTransfer",
    mixins: [MessageMixins, PlatformMixins, QuitMixins],
    data(){
        return{
            applyForm: {
                applyId: '',
                operateMen: '',
                fromStock: '',
                toStock: '',
                comment: ''
            },
            fromStock: '',
            loading: false,
            storehouseList: [],
            storehouseListTo: [],
            storehouseListFrom: [],
            searchContent: '',
            tmpGoodsList: [],
            productsList: [],
            goodsList: [],
            toStockType: "",
            fromStockType: "",
            stockTypeList: [
                {label: "本地仓", type: 1},
                {label: "中移物流仓", type: 2},
            ],

            productList: [],
            productListTemp: [],
            checkProductList: [],
        }
    },
    computed: {
        ...mapState({
            currentUser: ({ root }) => root.currentUser,
        }),
    },

    watch: {
        fromStock(nval, oval){
            this.loading=true;
            this.goodsList = [];
            this.searchContent = ''
            this.loading=false;
            this.clearProduct();
        }
    },
    mounted(){
        this.getStorehouseList({pageType: 2, storehouseStatus: [0]}).then( resp => {
            this.storehouseList = resp.result;
         })
        this.applyForm.operateMen = this.currentUser;
        this.getProductList();
        this.addNewProduct();
    },
    methods:{
        ...mapActions(["createTransfer", "getStorehouseList",
            "queryGoodsListSmall","queryStockIdList"]),
        quitApply(){
            this.quit(routesMapping.StockTransfer, true)
        },
        setValue(data) {
            let res = data.count
            if(data.skuId){
                if(!res || parseInt(res) < 1){
                    res = 1
                }
                if(parseInt(res) > parseInt(data.productNum)){
                    res = data.productNum
                }
            }else{
                res = ''
            }
            return res
        },
        isSameStock(){
            if(this.applyForm.toStock == this.fromStock){
                this.showError("请货仓库与发货仓库不能相同！请重新选择")
                this.applyForm.toStock = ""
                this.fromStock = ""
                this.clearProduct()
                this.goodsList = [];
            }
        },
        clearProduct(){
            this.productList=[];
            this.checkProductList = [];
            this.productListTemp = [];
        },
        toStockTypeChange(){
            this.getStorehouseList({storehouseType: 1}).then(resp => {
                this.storehouseListTo = resp;
            })
        },
        fromStockTypeChange(){
            this.getStorehouseList({storehouseType: 2}).then(resp => {
                this.storehouseListFrom = resp;
            })
        },
        verificationSubmit(){
            if(!this.fromStock || !this.applyForm.toStock){
                this.showError('请选择仓库！!')
                return false
            }
            if(this.fromStock == this.applyForm.toStock){
                this.showError('请货仓库与发货仓库不能相同!')
                return false
            }
            if(this.goodsList.length < 1){
                this.showWarning('请选择商品!')
                return false
            }
            let res = true
            this.goodsList.forEach( one => {
                if(one.count < 1){
                    res = false
                    return
                }
            })
            if(!res){
                this.showWarning('调拨商品数量不能小于1!')
                return false
            }
            return true
        },
        submit(){
            if(!this.verificationSubmit()){
                return
            }
            let request = {
                supplierStorehouseId: this.applyForm.toStock,
                contractStorehouseId: this.applyForm.fromStock,
                commons: this.applyForm.comment,
                skuList: []
            }
            let res = [];
            this.goodsList && this.goodsList.forEach( one => {
                res.push({productId: one.productId, skuId: one.skuId, count: one.count})
            })
            request.skuList = res;
            this.createTransfer(request).then( res => {
                this.quitApply();

                //刷新入库管理和出库管理列表页面
                const tabIn = this.getTabByKey(routesMapping.StorageManagement);
                if(tabIn){
                     this.refreshTab(tabIn)
                }
                const tabOut = this.getTabByKey(routesMapping.OutboundManagement);
                if(tabOut){
                    this.refreshTab(tabOut)
                }
            });
        },
        doDeleteGood(index){
            this.checkProductList.splice(index,1)
        },

        /**  */
        initTableData(){
            this.checkProductList.push({productName:null,skuId:null,skuBarCode:'',skuAttrsNew:"",productNum:'',count:'',unitName:null,comment:''})
        },
        addNewProduct(){
            this.initTableData();
        },
        getProductList(){
            this.queryStockIdList({storehouseId: this.applyForm.fromStock, searchType: '1'}).then(resp => {
                this.productList = resp.result;
                this.productListTemp = resp.result;
            })
        },
        clearSkuId(index){
            this.$set(this.checkProductList,index,{})
        },
        queryProductDetail(skuId,index){
            if(!skuId) return
            var pro = this.productList.find(item=>{
                if (item.skuId == skuId) {
                    return item
                }
            })
            var product = Object.assign({},pro)
            this.$set(this.checkProductList,index,product)
        },
        skuNameFilter(string){
            let length = string.length;
            if(!string){
                return this.productList = this.productListTemp
            }
            if (length >0 && length < 4) {
                this.productList = []
                setTimeout(() => {
                    let aa = document.getElementsByClassName("el-select-dropdown__empty")[0]
                    if(aa && aa.textContent){
                        aa.textContent = "请输入不少于4个字符查询条件"
                    }
                }, 50)
            }else{
                setTimeout(() => {
                    let aa = document.getElementsByClassName("el-select-dropdown__empty")[0]
                    if(aa && aa.textContent){
                        aa.textContent = "无数据"
                    }
                },50)
                this.productList = this.productListTemp.filter((item) =>{
                    if (item.skuName.toString().indexOf(string)>=0 || item.productName.toString().indexOf(string)>=0 || item.skuId.toString().indexOf(string) >=0) {
                        return item
                    }
                })
            }
        },
    }
}
</script>

<style lang="scss">
.apply-transfer{
    height: 100%;
    position: relative;
    margin: 0px 30px  ;
    .first-select{
        display: inline-block;
        width: 300px;
    }
    .second-select{
        display: inline-block;
        width: 300px;
    }
    .el-input__inner{
        font-size: 12px;
        color: #666;
    }
    .icon-delete{
        position: absolute;
        z-index: 100;
    }
    th{
        padding-left: 5px;
    }
}
</style>
