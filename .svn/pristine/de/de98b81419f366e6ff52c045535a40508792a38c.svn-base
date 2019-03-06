<template>
    <div class="create-storage">
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper">
                <el-form label-position="right" label-width="110px" :model="createPacking" :rules="rules"
                         ref="createPacking">
                    <div class="displayStyle" style="width: 100%;">
                        <el-form-item label="组合名称：" prop="packageName">
                            <el-input v-model="createPacking.packageName" size="small" class="rowUI"></el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="开始时间：" prop="beginTime">
                            <el-date-picker
                              v-model="createPacking.beginTime"
                              type="date"
                              size="small"
                              value-format="yyyy-MM-dd"
                              format="yyyy-MM-dd"
                              placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="结束时间：" prop="endTime">
                            <el-date-picker
                              v-model="createPacking.endTime"
                              type="date"
                              size="small"
                              value-format="yyyy-MM-dd"
                              format="yyyy-MM-dd"
                              placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="content">
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
                                <th width="150">sku编码</th>
                                <th width="110">开始时间</th>
                                <th width="150">结束时间</th>
                                <th width="150">最低价</th>
                                <th width="150">最高价</th>
                                <th width="150">商品价格</th>
                                <th width="150">发布实体</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(one,index) in checkskuList" class="tbody-tr-show">
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
                                           placeholder="请选择商品名称"
                                           @clear="clearSkuId(index)"
                                           @change="queryProductDetail(one.skuId,index)"
                                           class="text-dash-show"
                                >
                                    <el-option
                                        v-for="(item,n) in skuList"
                                        :key="item.skuId + n + item.skuName"
                                        :label="item.skuName"
                                        :value="item.skuId">
                                    </el-option>
                                </el-select>
                            </td>
                            <!--sku编码-->
                            <td :title="one.skuId"><span>{{one.skuId ? one.skuId : '--'}}</span></td>
                            <!-- 开始结束时间 -->
                            <td :title="one.beginTime"><span>{{one.beginTime ? one.beginTime : '--'}}</span></td>
                            <td :title="one.endTime"><span>{{one.endTime ? one.endTime : '--'}}</span></td>
                            <!-- 三个价格 -->
                            <td :title="one.minPrice"><span>{{one.minPrice ? one.minPrice : '--'}}</span></td>
                            <td :title="one.maxPrice"><span>{{one.maxPrice ? one.maxPrice : '--'}}</span></td>
                            <td :title="one.skuPrice">
                                <el-input v-model="one.skuPrice" placeholder="请填写商品价格" class="row_width" type="number" size="small" :min="0" @keyup.native="priceChange(one)" @blur="priceChange(one)">
                                </el-input>
                            </td>
                            <td :title="one.userGroupName">
                                <div class="table-operation">
                                    <span>{{one.userGroupName ? one.userGroupName : '--'}}</span>
                                    <div class="iconfont1 icon-shanchuhang" @click="deleteProduct(index)"></div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="orderContainer">
                        <div class="orderCount">
                            组合价 : <span>￥{{totalAmount}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-section pt20">
            <el-button type="primary" size="small" @click="createPackingFrom('createPacking')">提交</el-button>
            <el-button  size="small" class="cancel-button" @click="quit(routesMapping.commodityPacking)">取消</el-button>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import MessageMixins from '~/mixins/messages';
    import PlatformMixins from '~/mixins/platform';
    import QuitMixins from '~/mixins/quit';
    export default {
        name: 'commodityPackingAdd',
        mixins: [MessageMixins, PlatformMixins,QuitMixins],
        components: {},
        data () {
            let packageNameFail = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入组合名称'))
                }else {
                    return callback();
                }
            };
            let beginTimeFail = (rule, value, callback) => {
                let now = new Date();
                let time = new Date(value);
                let endTime = new Date(this.createPacking.endTime);
                if (!value) {
                    return callback(new Error("请选择开始时间!"));
                } else {
                    return callback();
                }
            };
            let endTimeFail = (rule, value, callback) => {
                let now = new Date();
                let time = new Date(value);
                let beginTime = new Date(this.createPacking.beginTime);
                if (!value) {
                    return callback(new Error("请选择结束时间!"));
                } else if (time.getTime() < beginTime.getTime()) {
                    return callback(new Error("请选择晚于开始时间"));
                } else {
                    return callback();
                }
            };
            return {
                createPacking: {
                    packageName: "",
                    beginTime:"",
                    endTime: "",
                    skuPackageList: [],
                    packagePrice: 0
                },
                skuList: [],
                skuListTemp: [],
                checkskuList: [{}],
                rules: {
                    packageName:[{ required: true, validator: packageNameFail, trigger: 'blur' }],
                    beginTime: [{required: true, validator: beginTimeFail, trigger: 'change,blur', type: 'date'}],
                    endTime:[{required: true, validator: endTimeFail, trigger: 'change,blur', type: 'date'}],
                },
            }
        },
        computed:{
            totalAmount: function () {
                if(this.checkskuList.length>0){
                    let resNumType = 0;
                    this.checkskuList.forEach(item=>{
                        let skuPrices = Number(item.skuPrice) || 0;
                        resNumType += skuPrices
                    });
                    resNumType = Number(resNumType).toFixed(2)
                    return resNumType
                }
            },
        },
        mounted(){
            this.getgroupSkuList("");
        },
        methods: {
            ...mapActions(['skuPackageAdd','groupSkuList',"showPageLoading", "hidePageLoading"]),    
            chooseGoods(){
                console.log("选择商品");
            },
            // 填写单价
            priceChange(item) {
                console.log(item,"输入单价");
                console.log(this.checkskuList, "32111");
                if (!item.skuPrice) {
                    this.showWarning('请输入商品价格')
                    return false
                }
                if (item.skuPrice > item.maxPrice) {
                    this.showWarning('请输入小于最高价的商品价格')
                    return false
                } else if (item.skuPrice < item.minPrice) {
                    this.showWarning('请输入大于最低价的商品价格')
                    return false
                }
            },

            clearProductInfo(){
                this.skuList = [];
                this.skuListTemp = [];
                this.checkskuList = [{}]
            },
            createPackingFrom(formName){
                console.log(this.totalAmount,"金额");
                this.createPacking.skuPackageList = this.checkskuList;
                this.createPacking.skuPackageList.forEach(function (i, k) {
                    i.maxPrice = Number(i.maxPrice) * 100
                    i.minPrice = Number(i.minPrice) * 100
                    i.skuPrice = Number(i.skuPrice) * 100
                    return i
                });
                this.createPacking.packagePrice = Number(this.totalAmount) * 100;
                this.submitForm();

            },
            submitForm(){
                if (this.checkskuList.length <= 0) {
                    this.showWarning('请添加商品清单')
                    return false
                }
                if(this.createPacking.packageName == ""){
                    this.showWarning('请输入组合名称')
                    return false
                }
                if(this.createPacking.beginTime == "" || this.createPacking.endTime == ""){
                    this.showWarning('开始结束时间不能为空')
                    return false
                }
                
                this.showPageLoading();
                this.skuPackageAdd(this.createPacking).then((resp) => {
                    this.hidePageLoading();
                    this.showSuccess('操作成功')
                    this.quit(this.routesMapping.commodityPacking, true);
                }).catch((error)=>{
                    this.showWarning('操作失败')
                    this.hidePageLoading();
                })
            },
            addNewProduct(){
                this.checkskuList.push({});
            },
            deleteProduct(index){
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.checkskuList.splice(index, 1);
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                })
            },
            setSelectTips(){
                setTimeout(() => {
                    let aa = document.getElementsByClassName("el-select-dropdown__empty")[0];
                    if (aa && aa.textContent) {
                        aa.textContent = "请输入不少于4个字符查询条件"
                    }

                }, 50);
            },
            skuNameFilter(string){
                if (!string) {
                    return this.skuList = this.skuListTemp
                }
                this.skuList = this.skuListTemp.filter((item) => {
                    if (item.skuName.toString().indexOf(string) >= 0 || item.productName.toString().indexOf(string) >= 0 || item.skuId.toString().indexOf(string) >= 0) {
                        return item
                    }
                });
            },
            //获取发布商品列表
            getgroupSkuList(val){
                this.groupSkuList({searchKey: val,pageNo: 1,pageSize: 1000}).then((res) => {
                    if(res.result && res.result.length>0){
                        res.result.forEach(function (i, k) {
                            i.maxPrice = i.maxPrice / 100
                            i.minPrice = i.minPrice / 100
                            return i
                        });
                        this.skuList = res.result;
                        this.skuListTemp = res.result;

                    }else{
                        this.showWarning("暂无已发布商品信息");
                        return false
                    }
                })
            },
            queryProductDetail(skuId, index){
                if (!skuId) return;
                console.log(skuId,index,"123456");
                this.checkskuList[index] = this.skuList.find(item => {  
                    return item.skuId === skuId;  
                })
                console.log(this.checkskuList,"选择数据")
            },
            
            clearSkuId(index){
                this.$set(this.checkskuList, index, {})
            },
        }
    }
</script>

<style lang="scss">
    .create-storage {
        height: auto;
        margin: 20px 20px 0 20px;
        .content {
            .title {
                color: #333;
                font-weight: 700;
            }
            .displayStyle {
                display: inline-block;
                width: 45%;
            }
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
        .receiveAddress{
            display:inline-block;
        }
        .btn-section {
            padding-bottom: 20px;
            background-color: #fff;
            width: 100%;
            .el-button{
                padding: 10px 0px;
                font-size: 14px;
            }
            .cancel-button{
                color: #3B8CFF;
                border: 1px solid #BFD9FE;
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
        .el-table {
            .row-show {
                color: #333;
                text-align: left;
            }
            .title {
                display: flex;
                justify-content: space-between;
            }
        }
        .el-form-item {
            span {
                color: #333;
            }
            .el-textarea {
                width: 1158px;
            }
            .el-form-item__label {
                color: #333;
            }
        }
        .order-form-item {
            position: relative;
            .order-tips {
                position: absolute;
                left: 0px;
                top: 34px;
                font-size: 12px;
            }
        }
        .search_div {
            margin: 0px 0px 20px;
            .el-form-item {
                margin-bottom: 0px;
            }
            .el-select {
                width: 250px;
            }
        }
        .float_button {
            text-align: right;
        }
        .operator_button {
            color: #409EFF;
            font-size: 14px;
            cursor: pointer;
        }
        .flex {
            display: flex;
            flex-wrap: nowrap;
            .flex-item {
                max-height: 50%;
                min-width: 400px;
            }
        }

    }
</style>
<style lang='scss'>
    .el-select-dropdown>el-popper{
        width: 296px;
    }
</style>
