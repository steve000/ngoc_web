<!---
    入库操作组件
    传入参数：1.row：选中行的数据，必传purchaseI和vendorNumber字段
    emit：1.save:入库成功
--->
<template>
    <div class="confirm-stock-in-modal">
        <modal title="入库操作"
               v-model="isStockInDialogVisibleModal"
               @close="clearStorehouse"
               :showCancelButton="false"
               :okText="'确认入库'"
               width="60%">
            <div class="select-storehouse-container">
                <el-form :inline="true" :model="createStockIn" ref='createStockIn' :rules="storehouseRules"
                         class="demo-form-inline">
                    <el-form-item prop="storehouseId">
                        <el-select v-model="createStockIn.storehouseId"
                                   placeholder="请选择仓库名称"
                                   :filter-method="storehouseFilter"
                                   filterable
                                   clearable
                                   :popper-class="'prop_select_width_178'"
                                   @visible-change="validatorStorehouseType">
                            <el-option v-for="item in storehouseList"
                                       :key="item.storehouseId"
                                       :label="item.storehouseName"
                                       :value="item.storehouseId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="queryWaitStockInProductData"
            >
                <el-table-column label="商品名称" prop="skuName" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.skuName">{{scope.row.skuName}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="SKU编码" prop="skuId" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.skuId">{{scope.row.skuId}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="单位" prop="unitName" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.unitName">{{scope.row.unitName}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="采购数量" prop="totalCount" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.totalCount">{{scope.row.totalCount}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="已入库数量" prop="actualInTotalCount" min-width="110">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.actualInTotalCount">
                            {{scope.row.actualInTotalCount !== null ? scope.row.actualInTotalCount : 0}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="本次入库" prop="inCount" min-width="110">
                    <template slot-scope="scope">
                        <div class="incont-input">
                            <el-input v-model="scope.row.inCount"
                                      type="number"
                                      @keyup.native="validateInCount(scope.row)"></el-input>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="createStockInOrder('createStockIn')"
                               :disabled="isDisabled">确认入库</el-button>
                </span>
        </modal>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import Modal from '~/components/common/Modal.vue';
    export default {
        name: 'ConfirmStockInModal',
        data () {
            return {
                createStockIn: {
                    type: '1',
                    relatedSheetId: "",
                    storehouseType: '',
                    storehouseId: '',
                    vendorSeqNo: '',
                    skuList: []
                },
                storehouseList: [],
                isDisabled: false,
                queryWaitStockInProductData: [],
                isStockInDialogVisibleModal: true,
                storehouseRules: {
                    storehouseType: {required: true, message: '请选择仓库类型', trigger: 'change'},
                    storehouseId: {required: true, message: '请选择仓库名称', trigger: 'change'}
                },
            }
        },
        components: {
            Modal
        },
        props: {
            row: {
                type: Object,
                default: function () {
                    return {
                        purchaseI: "",
                        vendorNumber: ""
                    }
                }
            }
        },
        mounted(){
            this.getStorehouseType();
            this.createStockIn.relatedSheetId = this.row.purchaseId;
            this.createStockIn.vendorSeqNo = this.row.vendorNumber;
            this.queryWaitStockInProductAction({type: '1', relatedSheetId: this.row.purchaseId}).then((resp) => {
                this.queryWaitStockInProductData = resp;
            });
        },
        methods: {
            ...mapActions(['createStockInAction', 'getStorehouseList', 'queryWaitStockInProductAction']),
            clearStorehouse(){
                this.createStockIn.storehouseId = '';
                this.$emit("close");
            },
            storehouseFilter(string){
                if (!string) {
                    return this.storehouseList = this.storehouseListTemp;
                }
                this.storehouseList = this.storehouseListTemp.filter((item) => {
                    if ((item.storehouseId && item.storehouseId.toString().indexOf(string) >= 0) || (item.storehouseName && item.storehouseName.toString().indexOf(string)) >= 0) {
                        return item
                    }
                });
            },
            validatorStorehouseType(type){
                let findItem = this.storehouseList.find((item) => {
                    return this.createStockIn.storehouseId === item.storehouseId
                });
                if (findItem) {
                    this.createStockIn.storehouseType = findItem.storehouseType;
                }
            },
            getStorehouseType(){
                this.getStorehouseList({'storehouseType': this.createStockIn.storehouseType}).then((resp) => {
                    this.storehouseList = resp;
                    this.storehouseListTemp = resp;
                });
                this.createStockIn.storehouseId = '';
            },
            createStockInOrder(formName){
                this.createStockIn.skuList = [];
                let skuList = this.queryWaitStockInProductData;
                for (let i = 0; i < skuList.length; i++) {
                    if (skuList[i].inCount) {
                        let skuListItem = {
                            productId: skuList[i].productId,
                            skuId: skuList[i].skuId,
                            inCount: skuList[i].inCount,
                            originProductSerialNo:skuList[i].originProductSerialNo
                        };
                        this.createStockIn.skuList.push(skuListItem);
                    }
                }
                if (this.createStockIn.skuList.length <= 0) {
                    this.$message({
                        message: '请填写入库数量',
                        type: 'error'
                    });
                    return
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.isDisabled = true;
                        this.createStockInAction(this.createStockIn).then((resp) => {
                            this.isDisabled = false;
                            this.$message({
                                message: '入库成功',
                                type: 'success'
                            });
                            this.$emit('save');
                        }).catch((err) => {
                            this.isDisabled = false;
                        });
                    } else {
                        this.isDisabled = false;
                    }
                });
            },
            validateInCount(row){
                let {totalCount, actualInTotalCount, inCount} = row;
                let MaxCount = Number(totalCount) - Number(actualInTotalCount);
                let reg = /^[1-9]\d*$/;
                if (inCount && inCount.length > 0 && !reg.test(inCount)) {
                    this.$message({
                        type: 'error',
                        message: `请输入正确的入库数量`
                    });
                    row.inCount = '';
                    return
                }
                if (MaxCount < Number(inCount)) {
                    this.$message({
                        type: 'error',
                        message: `本次入库最多只能入库${MaxCount}`
                    });
                    row.inCount = '';
                }
            },
        }
    }
</script>

<style lang="scss">
    .confirm-stock-in-modal {
        .el-table__empty-block {
            border-bottom: 1px solid #eceef5;
        }
        .el-dialog__body {
            padding: 0px 30px 0px 30px;
            .el-table thead tr th:nth-child(1) {
                border-left: none;
            }
        }
        .incont-input {
            .el-input {
                width: 76px;
                .el-input__inner {
                    border: 1px solid #DBDFE6;
                    border-radius: 0px;
                    color: #666666;
                    height: 26px;
                    font-size: 12px;
                    &:focus {
                        border: 1px solid #3B8CFF;
                    }
                }
            }
        }
        .el-table {
            font-size: 12px;
            color: #888;
            border: 1px solid #eceef5;
            border-bottom: none;
        }
        .el-dialog__header {
            padding: 20px 23.7px 20px 30px;
            .el-dialog__title {
                font-size: 16px;
                color: #333333;
            }
            .el-dialog__headerbtn {
                right: 30px;
                font-size: 23px;
            }
        }
        .el-dialog__footer {
            padding: 20px 30px 30px;
        }
    }

</style>
