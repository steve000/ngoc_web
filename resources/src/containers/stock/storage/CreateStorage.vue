<template>
    <div class="create-storage">
        <div class="create-storage-container">
            <div class="content">
                <div class="title">
                    <div>基本信息</div>
                </div>
                <div class="content-wrapper">
                    <el-form label-position="left" label-width="110px" :model="createStockIn" :rules="rules"
                             ref="createStockIn">
                        <el-form-item label="操作员：">
                            <el-input v-model="operator" size="small" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="入库原因：" prop="reasonType">
                            <el-select v-model="createStockIn.reasonType"
                                       size="small"
                                       clearable
                                       placeholder="请选择"
                                       :popper-class="'max-length'"
                            >
                                <el-option
                                    v-for="item in reasonType"
                                    :key="item.reason"
                                    :label="item.type"
                                    :value="item.reason">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <supplier-select
                            @SelectVavue="selectValue"
                        >
                        </supplier-select>
                        <el-form-item label="收货仓库：" prop="storehouseId">
                            <el-select v-model="createStockIn.storehouseId"
                                       size="small"
                                       :filter-method="storehouseFilter"
                                       filterable
                                       clearable
                                       placeholder="请输入仓库名称或编号搜索"
                                       :popper-class="'max-length'"
                            >
                                <el-option
                                    v-for="item in storeList"
                                    :key="item.storehouseId"
                                    :label="item.storehouseName"
                                    :value="item.storehouseId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="备注：">
                            <el-input type="textarea"
                                      v-model="createStockIn.comments"></el-input>
                        </el-form-item>
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
                                <th width="18%" style="padding-left:20px">商品名称</th>
                                <th width="10%">商品编码</th>
                                <th width="8%">单位</th>
                                <th width="10%">商品单价（元）</th>
                                <th width="8%">入库数量</th>
                                <th width="10%">入库总价（元）</th>
                                <th width="10%">备注</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(one,index) in checkProductList" class="tbody-tr-show">
                                <!--sku名称-->
                                <td>
                                    <div class="product-select">
                                        <el-select v-model="one.skuId"
                                                   style="padding-left: 13px"
                                                   :filter-method="skuNameFilter"
                                                   filterable
                                                   clearable
                                                   size="small"
                                                   :popper-class="'prop_select_width_178'"
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
                                    </div>
                                </td>
                                <!--sku编码-->
                                <td :title="one.skuId"><span>{{one.skuId ? one.skuId : '--'}}</span>
                                </td>
                                <td :title="one.unitName"><span>{{one.unitName ? one.unitName : '--'}}</span></td>
                                <td :title="one.skuPrice">
                                    <div class="product-input">
                                        <el-input placeholder="0" class="table-input" size="small" type="number"
                                                  v-model="one.skuPrice" :min="0"
                                                  @keyup.native="getTotalAmount"></el-input>
                                    </div>
                                </td>
                                <!--入库数量-->
                                <td :title="one.inCount">
                                    <div class="product-input">
                                        <el-input placeholder="0" class="table-input" size="small" type="number"
                                                  v-model="one.inCount" :min="0"
                                                  @keyup.native="validateInCount(one)"
                                        ></el-input>
                                    </div>
                                </td>
                                <!--入库总价-->
                                <td :title="one.totalAmount">
                                    {{isNaN(one.skuPrice * one.inCount) ? '--' : Number(one.skuPrice * one.inCount).toFixed(2)}}
                                </td>
                                <td :title="one.comments">
                                    <div class="table-operation">
                                        <div class="product-input">
                                            <el-input class="table-input" type="text" v-model="one.comments"
                                                      size="small"></el-input>
                                        </div>
                                        <div class="iconfont1 icon-shanchuhang" @click="deleteProduct(index)"></div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="orderContainer">
                            <div class="orderCount">
                                订单合计含税金额 : <span>￥{{Number(totalAmount).toFixed(2)}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn-section pt20">
                <el-button type="primary" size="small" @click="createStockInFrom('createStockIn')">提交</el-button>
                <el-button class="reset" size="small" @click="quit(routesMapping.StorageManagement)">取消
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import PlatformMixins from '~/mixins/platform';
    import QuitMixins from '~/mixins/quit';
    import SupplierSelect from '~/components/common/SupplierSelect'
    import misc from '~/utils/misc';
    import {REASON_TYPE} from '~/constants/const';

    export default {
        name: 'CreateStorage',
        components: {SupplierSelect},
        data () {
            return {
                createStockIn: {
                    type: "2",
                    storehouseId: "",
                    comments: "",
                    skuList: [],
                    vendorSeqNo: "",
                    storehouseType: 1,
                    reasonType:''
                },
                supplierList: [],
                supplierListTemp: [],
                operator: "",
                productList: [],
                productListTemp: [],
                storeList: [],
                storehouseListTemp: [],
                checkProductList: [{}],
                rules: {
                    storehouseId: {required: true, message: '请选择入库仓库', trigger: 'change'},
                    reasonType: {required: true, message: '请选择入库原因', trigger: 'change'},
                },
                reasonType:REASON_TYPE,
                totalAmount: 0.00,
            }
        },
        mixins: [PlatformMixins, QuitMixins],
        mounted(){
            this.getStorehouseListFunction();
            const userName = sessionStorage.getItem('userName');
            this.operator = userName;
            this.getProductList()
        },
        methods: {
            ...mapActions(['SearchGoodsList', 'getStorehouseList', 'createStockInAction', "showPageLoading", "hidePageLoading",]),
            getStorehouseListFunction(){
                this.getStorehouseList().then((resp) => {
                    this.storeList = resp;
                    this.storehouseListTemp = resp;
                });
            },
            createStockInFrom(formName){
                this.createStockIn.skuList = [];
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.checkProductList.length <= 0 || !this.checkProductList[0].skuId) {
                            this.$message({
                                message: '请添加商品',
                                type: 'error'
                            });
                            return;
                        }
                        let _this = this;
                        for (let i = 0; i < this.checkProductList.length; i++) {
                            let checkProductListItem = this.checkProductList[i];
                            if (!checkProductListItem.inCount) {
                                this.$message({
                                    message: '请填写入库数量',
                                    type: 'error'
                                });
                                return
                            }
                            let validatePriceResult = misc.validatePrice(checkProductListItem.skuPrice, _this);
                            if (!validatePriceResult || checkProductListItem.skuPrice === undefined || checkProductListItem.skuPrice === '') {
                                this.$message.error('请输入正确价格');
                                return
                            }
                            let skuListItem = {
                                productId: checkProductListItem.productId,
                                skuId: checkProductListItem.skuId,
                                inCount: checkProductListItem.inCount,
                                comments: checkProductListItem.comments,
                                skuPrice: Number(checkProductListItem.skuPrice) * 100,
                            };
                            this.createStockIn.skuList.push(skuListItem);
                        }
                        this.showPageLoading();
                        this.createStockInAction(this.createStockIn).then((resp) => {
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                            this.quit(this.routesMapping.StorageManagement);
                            this.hidePageLoading();
                        }).catch((err) => {
                            this.hidePageLoading();
                        })
                    } else {
                        return false;
                    }
                });
            },
            addNewProduct(){
                this.checkProductList.push({});
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
                    this.getTotalAmount();
                })
            },
            setSelectTipsDataNone(){
                setTimeout(() => {
                    let aa = document.getElementsByClassName("el-select-dropdown__empty")[0]
                    if (aa && aa.textContent) {
                        aa.textContent = "无数据"
                    }
                }, 50);
            },
            selectValue(value){
                this.createStockIn.vendorSeqNo = value
            },
            skuNameFilter(string){
                if (!string) {
                    return this.productList = this.productListTemp
                }
                this.productList = this.productListTemp.filter((item) => {
                    if ((item.skuName && item.skuName.toString().indexOf(string) >= 0) || (item.productName && item.productName.toString().indexOf(string) >= 0) || (item.skuId && item.skuId.toString().indexOf(string) >= 0)) {
                        return item
                    }
                });
                if (this.productList.length) {
                    this.setSelectTipsDataNone();
                }
            },
            //获取商品名称
            getProductList(){
                this.SearchGoodsList({status: 1}).then((res) => {
                    this.productList = res.result;
                    this.productListTemp = res.result;
                })
            },
            queryProductDetail(skuId, index){
                this.productList = this.productListTemp;
                if (!skuId) return;
                let pro = this.productList.find(item => {
                    if (item.skuId === skuId) {
                        return item
                    }
                });
                let product = Object.assign({}, pro);
                this.$set(this.checkProductList, index, product);
                this.getTotalAmount();
            },
            clearSkuId(index){
                this.$set(this.checkProductList, index, {});
                this.getTotalAmount();
            },
            validateInCount(row){
                let {inCount} = row;
                let reg = /^[1-9]\d*$/;
                if (inCount && inCount.length > 0 && !reg.test(inCount)) {
                    this.$message({
                        type: 'error',
                        message: `请输入正确的入库数量`
                    });
                    row.inCount = '';
                    this.getTotalAmount();
                } else {
                    if (Number(inCount) > 9999999 || inCount.length>7) {
                        this.$message({
                            type: 'error',
                            message: `您输入的入库数量超过最大值，请重新输入`
                        });
                    }
                    this.getTotalAmount();
                }
            },
            getTotalAmount(){
                this.totalAmount = 0;
                let _this = this;
                for (let i = 0; i < this.checkProductList.length; i++) {
                    let item = this.checkProductList[i];
                    misc.validatePrice(item.skuPrice, _this);
                    let total = item.skuPrice && item.inCount ? Number(item.skuPrice) * Number(item.inCount) : 0;
                    this.totalAmount += total;
                }
            },
            storehouseFilter(string){
                if (!string) {
                    return this.storeList = this.storehouseListTemp;
                }
                this.storeList = this.storehouseListTemp.filter((item) => {
                    if ((item.storehouseId && item.storehouseId.toString().indexOf(string) >= 0) || (item.storehouseName && item.storehouseName.toString().indexOf(string)) >= 0) {
                        return item
                    }
                });
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
            .el-input__inner {
                border-radius: 0px;
                border-color:#E0E0E0;
                color: #666666;
                font-size: 12px;
            }
            .el-form-item__content {
                line-height: 35px;
                top: -1.5px;
            }
            .el-form-item__label {
                padding-right: 20px;
                color: #151515;
                height: 32px;
                line-height: 32px;
            }
            .el-form-item {
                margin-bottom: 20px;
                .el-input {
                    width: 300px;
                    height: 32px;
                    input {
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
            .product-input {
                .el-input {
                    width: 90px;
                    .el-input__inner {
                        height: 26px;
                        &:focus {
                            border-color: #3B8CFF;
                        }
                    }
                }
            }
            .btn-section {
                .el-button {
                    padding: 8px 0px;
                    font-size: 14px;
                }
            }
        }
    }
</style>
