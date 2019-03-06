<template>
    <div class="create-storage">
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper">
                <el-form label-position="right" label-width="140px" :model="createPayCheck" class="topBox"
                         ref="createPayCheck">
                    <div class="displayStyle">
                        <el-form-item label="制单实体：" >
                            <el-input class="form-input-width"  v-model="packageName" size="small" disabled></el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="供应商名称：" required>
                            <el-select
                                v-model="vendorname"
                                :filter-method="vendorFilter"
                                size="small"
                                clearable
                                filterable
                                placeholder="选择供应商名称："
                                no-data-text="没有找到相关的供应商"
                                @change="selectedSetGoods(vendorname)">
                                <el-option
                                v-for="(item, k) in vendorList"
                                :key="item.vendorName + k + item.vendorNumber"
                                :label="item.vendorName"
                                :value="item.vendorNumber">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="对账截止时间：" >
                            <el-date-picker
                              v-model="createPayCheck.endTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              format="yyyy-MM-dd"
                              @change="chooseEndTime"
                              placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="displayStyle">
                        <el-form-item label="调整金额：" >
                            <el-input class="form-input-width"  v-model="createPayCheck.adjustTotal" size="small" type="number"></el-input>
                        </el-form-item>
                    </div>
                    <div class="" style="float: left;">
                        <el-form-item label="备注：">
                                <el-input type="textarea"
                                          :autosize="{ minRows: 5, maxRows: 5 }"
                                          :maxlength="200"
                                          v-model="createPayCheck.remark" placeholder="请输入备注，200字以内"></el-input>
                            </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="content">
            <div class="title">
                <div>待结算单据列表</div>
            </div>
            <div class="content-wrapper">
                <div class="form-item-contaniner">
                    <div class="addProduct">
                        <el-button size="mini" @click="addNewProduct">
                            <i class="el-icon-plus"></i>
                            <span>添加待结算单据</span>
                        </el-button>
                    </div>
                    <table class="productTable native-table-show">
                        <thead>
                            <tr class="thead-tr-show">
                                <th width="230" style="padding-left:20px">出入库单号</th>
                                <th width="110">创建时间</th>
                                <th width="150">业务类型</th>
                                <th width="150">含税金额</th>
                                <th width="150">税额</th>
                                <th width="150">备注</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(one,index) in checkskuList" class="tbody-tr-show">
                            <!--名称-->
                            <td>
                                <el-select v-model="one.billNo"
                                           style="padding-left: 13px"
                                           :filter-method="skuNameFilter"
                                           filterable
                                           clearable
                                           size="small"
                                           @focus="chooseGoods"
                                           popper-class="max-length"
                                           placeholder="请选择商品名称"
                                           @clear="clearSkuId(index)"
                                           @change="queryProductDetail(one.billNo,index)"
                                           class="text-dash-show"
                                >
                                    <el-option
                                        v-for="(item,n) in skuList"
                                        :key="n + item.id"
                                        :label="item.billNo"
                                        :value="item.billNo">
                                    </el-option>
                                </el-select>
                            </td>
                            <!-- 创建时间 -->
                            <td :title="one.createTime"><span>{{one.createTime ? one.createTime : '--'}}</span></td>
                            <!-- 业务类型 -->
                            <td :title="one.billType"><span>{{one.billType===1 ? '采购入库' : '采购退货出库'}}</span></td>
                            <!-- 两个价格 -->
                            <td :title="one.settleTotal"><span>{{one.settleTotal ? one.settleTotal : '0'}}</span></td>
                            <td :title="one.taxTotal"><span>{{one.taxTotal ? one.taxTotal : '0'}}</span></td>
                            <td :title="one.remark">
                                <div class="table-operation">
                                    <el-input class="table-input" type="text" v-model="one.remark"
                                              size="small"></el-input>
                                    <div class="iconfont1 icon-shanchuhang" @click="deleteProduct(index)"></div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="orderAmount">
                        <div class="orderPrice">
                            合计: <span>含税金额：￥{{settleTotalAmount}}</span><span>无税金额：￥{{disAmount}}</span><span>税额：￥{{taxTotalAmount}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-section pt20">
            <el-button type="primary" size="small" @click="createPayCheckFrom('createPayCheck')">提交</el-button>
            <el-button  size="small" class="cancel-button" @click="quit(routesMapping.payCheckIndex)">取消</el-button>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import MessageMixins from '~/mixins/messages';
    import PlatformMixins from '~/mixins/platform';
    import QuitMixins from '~/mixins/quit';
    export default {
        name: 'payCheckAdd',
        mixins: [MessageMixins, PlatformMixins,QuitMixins],
        components: {},
        data () {
            let validatorComments = (rule, value, callback) => {
                if(value.length>200){
                    return callback(new Error('请输入200以内的汉字'));
                }else{
                    return callback();
                }
            }
            return {
                packageName: sessionStorage.getItem("entityName"),
                vendorSeqNo: 0,  // 供应商序号
                vendorNumber: 0, // 供应商编号
                vendorname: "", // 供应商名称
                createPayCheck: {
                    payUserGroupId: null, //供应商对应实体
                    payUserGroupName: "", 
                    endTime: "",
                    billList: [],
                    adjustTotal: 0,
                    remark: ""
                },
                // 待结算清单
                skuList: [],
                skuListTemp: [],
                checkskuList: [{}],
                // 供应商列表
                vendorList: [],
                filterVendorList: []
            }
        },
        computed: {
            settleTotalAmount: function() {
                console.log(this.checkskuList,"计算含税总额")
                if (this.checkskuList.length > 0) {
                    let resNumType = 0;
                    this.checkskuList.forEach(item => {
                        resNumType += item.settleTotal || 0;
                    });
                    resNumType = Number(resNumType).toFixed(2);
                    return resNumType;
                }
            },
            taxTotalAmount: function() {
                console.log(this.checkskuList,"计算税额")
                if (this.checkskuList.length > 0) {
                    let resNumType = 0;
                    this.checkskuList.forEach(item => {
                    resNumType += item.taxTotal || 0;
                    });
                    resNumType = Number(resNumType).toFixed(2);
                    return resNumType;
                }
            },
            disAmount: function() {
                console.log(this.checkskuList,"计算无税额")
                if (this.checkskuList.length > 0) {
                    let resNumType = 0;
                    this.checkskuList.forEach(item => {
                        resNumType += Number(item.settleTotal) - Number(item.taxTotal) || 0;
                    });
                    resNumType = Number(resNumType).toFixed(2);
                    return resNumType;
                }
            },
        },
        mounted(){
            const userGroupId = Number(sessionStorage.getItem("entityId"));
            this.vendorNameAll(userGroupId);
        },
        methods: {
            ...mapActions(['purchaseVendorLIstByUserGroup','payCheckAdd','payCheckQueryOutSettle',"userGroupQueryuserbyusergroupid","showPageLoading", "hidePageLoading"]),   
            //拿到供应商列表
            vendorNameAll(val) {
                if (val) {
                    this.purchaseVendorLIstByUserGroup({ userGroupId: val,vendorEnableFlag: 1 }).then(res => {
                        console.log(res);
                        this.filterVendorList = res.result;
                        this.vendorList = res.result;
                    });
                } else {
                    this.$message("请重新登录");
                }
            },
            // 选择
            vendorFilter(string) {
                if (!string) {
                    return (this.vendorList = this.filterVendorList);
                }
                this.vendorList = this.filterVendorList.filter(item => {
                    if ( (item.vendorName && item.vendorName.toString().indexOf(string)) >= 0 ) {
                        return item;
                    }
                });
            },
            // 选择供应商名称后带出供应商编码
            selectedSetGoods(val) {
                console.log(val, "选中供应商ID");
                // this.vendorSeqNumber = val;
                // this.vendorSeqNo = this.vendorList.find((item,index) => {
                //     return item.vendorNumber === val;
                // }).vendorSeqNo;
                // this.vendorName = this.vendorList.find((item,index) => {
                //     return item.vendorNumber === val;
                // }).vendorName;
                this.createPayCheck.payUserGroupId = this.vendorList.find((item,index) => {
                    return item.vendorNumber === val;
                }).originId;
                this.userGroupQueryuserbyusergroupid({userGroupId: this.createPayCheck.payUserGroupId}).then((resp) => {
                    this.hidePageLoading();
                    console.log(resp,"选择供应商拿到付款组织id查name");
                    this.createPayCheck.payUserGroupName = resp.groupName;
                });
            },
            // 选择入库单号 
            chooseGoods() {
                console.log("选择出入库单号");
                if(this.createPayCheck.endTime == "") {
                    this.$message({
                        message: `请先选择对账截止时间`,
                        type: 'warning'
                    });
                }
            },
            clearProductInfo(){
                this.skuList = [];
                this.skuListTemp = [];
                this.checkskuList = [{}]
            },
            // 选择对账截止时间，拿到对账单列表
            chooseEndTime() {
                this.getpayCheckQueryOutSettle();
            },
            createPayCheckFrom(formName){
                console.log(this.settleTotalAmount,"含税金额");
                this.createPayCheck.billList = this.checkskuList;
                this.submitForm();
            },
            submitForm(){
                        if (this.checkskuList.length <= 0) {
                            this.showWarning('请添加待结算列表')
                            return
                        }
                        this.showPageLoading();
                        this.payCheckAdd(this.createPayCheck).then((resp) => {
                            this.hidePageLoading();
                            this.showSuccess('操作成功');
                            this.quit(this.routesMapping.payCheckIndex);
                        }).catch((error)=>{
                            this.showWarning('操作失败');
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
                    if (item.billNo.toString().indexOf(string) >= 0) {
                        return item
                    }
                });
            },
            //获取待结算清单
            getpayCheckQueryOutSettle(){
                this.payCheckQueryOutSettle({userGroupId: Number(sessionStorage.getItem("entityId")),endTime: this.createPayCheck.endTime}).then((resp) => {
                    this.skuList = resp.result;
                    this.skuListTemp = resp.result;
                })
            },
            queryProductDetail(billNo, index){
                if (!billNo) return;
                console.log(billNo,index,"123456");
                this.checkskuList[index] = this.skuList.find(item => {  
                    return item.billNo === billNo;  
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
            .addProduct {
                margin-bottom: 16px;
            }
            .form-item-contaniner{
                .orderAmount{
                    background-color: #FBFBFB;
                    padding: 0px 20px;
                    border: 1px solid #F1F1F1;
                    height: 50px;
                    line-height: 50px;
                    margin-top: 20px;
                    .orderPrice{
                        text-align: right;
                        span {
                            margin-left: 20px;
                            margin-right: 10px;
                        }
                    }
                }
            }
            .topBox {
                min-height: 230px;
                .displayStyle {
                    width: 40%;
                    float: left;
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
