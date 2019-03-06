<template>
    <div class='createPurchase-view'>
        <!-- 基本信息 -->
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper">
                <el-form label-position="left" label-width="110px" :model="changeDetail" :rules="rules" ref="createChangeForm">
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="操作人：" label-width="110px" prop="createUserName">
                                <el-input v-model="changeDetail.createUserName" :disabled="true" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle posRelative">
                            <el-form-item label="关联销售单：" label-width="110px" prop="orderId">
                                <el-input v-model="changeDetail.orderId" :disabled="true" class="row_width" size="small"></el-input>
                            </el-form-item>
                            <div class="searchView pull-right change-order-query-detail" @click="toQueryDetail(changeDetail.orderId)">查看</div>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="换货单号：" label-width="110px" prop="changeId">
                                <el-input v-model="changeDetail.changeId" :disabled="true" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle">
                            <el-form-item label="创建时间：" label-width="110px" prop="createTime">
                                <el-input :value="formatYearOne(changeDetail.createTime)" :disabled="true" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle1">
                            <el-form-item label="订单类型：" prop="changeType" label-width="110px">
                                <el-input class="row_width" v-model="changeTypeName[changeDetail.changeType]" :disabled="true" size="small"></el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle1" v-if="changeDetail.invType === 1">
                            <el-form-item label="收货仓库：" prop="stockName">
                                <el-select @change="choosestorehouse(changeDetail.stockName)" v-model="changeDetail.stockName" filterable placeholder="选择收货仓库" class="row_width" size="small">
                                    <el-option v-for="item in storeList" :key="item.storehouseId" :label="item.storehouseName" :value="item.storehouseId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle1">
                            <el-form-item label="渠道：" prop="channelName" label-width="110px">
                                <el-input class="row_width" v-model="changeDetail.channelName" :disabled="true" size="small"></el-input>
                            </el-form-item>
                        </div>
                        <!-- 客户暂时去掉 -->
                        <!-- <div class="displayStyle1" v-if="Number(changeDetail.channelId) === -1">
                            <el-form-item label="客户：" prop="customerName" label-width="110px">
                                <el-input class="row_width" v-model="changeDetail.customerName" :disabled="true" size="small"></el-input>
                            </el-form-item>
                        </div> -->
                    </div>
                    <div style="margin-left: 25px;padding-top:4px;">
                        <el-form-item class="baseInfo-remark" label="备注:" prop="remark" label-width="110px">
                            <el-input class="remark_width" type="textarea" v-model="changeDetail.remark" maxLength="200"></el-input>
                            <div class="limittext">200字以内</div>
                        </el-form-item>
                    </div>
                    <div class="title" v-if="changeDetail.invType === 1">
                        <div>收货仓信息</div>
                    </div>
                    <div class="content-wrapper store-link-info" v-if="changeDetail.invType === 1">
                        <div>
                            <div class="displayStyle">
                                <el-form-item label="收货人：" label-width="110px" prop="storeLinkMan">
                                    <el-input v-model="changeDetail.storeLinkMan" :disabled="true" class="row_width" size="small">
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="displayStyle">
                                <el-form-item label="联系电话：" label-width="110px" prop="storeLinkTel">
                                    <el-input v-model="changeDetail.storeLinkTel" type="number" :disabled="true" class="row_width" size="small">
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div>
                            <div class="displayStyle">
                                <el-form-item label="收货地址：" prop="storeArea">
                                    <el-input v-model="changeDetail.storeArea" :disabled="true" class="row_width" size="small">
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="displayStyle">
                                <el-form-item label="详细地址：" prop="storeAddress">
                                    <el-input v-model="changeDetail.storeAddress" :disabled="true" class="row_width" size="small">
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
        <!--客户收货信息-->
        <!--非excel导入的订单 start-->
        <div v-if="changeDetail.customerAddressId !== -1">
            <div class="content">
                <div class="title">
                    <div>收货信息</div>
                </div>
                <div class="content-wrapper">
                    <ReceivingInformation @submit="submitCollectAddressParams" ref="ReceivingInformation"></ReceivingInformation>
                </div>
            </div>
            <div class="content">
                <div class="title">
                    <div>客户收货信息</div>
                </div>
                <div class="content-wrapper content-table-wrapper">
                    <el-table ref="singleTable" :data="customerInStoreInfo" highlight-current-row @row-click="handleCurrentChange" style="width: 100%">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-radio v-model="changeDetail.customerAddressId" :label="scope.row.channelAddressId" class="address-radio-label"></el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column property="custLinkMan" label="收货人">
                            <template slot-scope="scope">
                                <!--<el-radio v-model="radio" :label="scope.$index"></el-radio>-->
                                <span>{{scope.row.linkMan}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="收货地址">
                            <template slot-scope="scope">
                                {{ `${scope.row.province}-${scope.row.city}-${scope.row.area} ${scope.row.address}` }}
                            </template>
                        </el-table-column>
                        <el-table-column label="联系电话">
                            <template slot-scope="scope">
                                <span>{{scope.row.phone}}</span>
                                <!--<span v-if="Number(scope.row.isDefault)" class="default-contact-btn">默认联系人</span>-->
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="left" width="300">
                            <template slot-scope="scope">
                                <a @click.stop.prevent="editorAddress(scope.row, scope.$index)" class="createAddress_func">编辑</a>
                                <a class="createAddress_func" @click.stop.prevent="deleteAddress(scope.row, scope.$index)">删除</a>
                                <span v-if="scope.row.isDefault === '1'" class="createAddress_func defalut_address">默认地址</span>
                                <span v-else class="createAddress_func set_defalutAddress" @click.stop.prevent="setDefaultAddress(scope.row, scope.$index)">设为默认</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <!--非excel导入的订单 end-->
        <!--客户收货信息-->

        <!--excel导入的订单 start-->
        <div v-else>
            <div class="content">
                <div class="title">
                    <div>收货信息</div>
                </div>
                <div class="content-wrapper">
                    <el-form :model="addCollectAddressParams" :rules="addCollectAddressRules" label-width="110px" ref="addCollectAddressParams">
                        <div>
                            <div class="displayStyle">
                                <el-form-item label="顾客：" prop="linkMan">
                                    <el-input v-model="addCollectAddressParams.linkMan" placeholder="请输入联系人" class="row_width" size="small">
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="displayStyle">
                                <el-form-item label="联系电话：" prop="phone">
                                    <el-input v-model="addCollectAddressParams.phone" placeholder="请输入联系电话" class="row_width" size="small">
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div>
                            <div class="displayStyle area-form-special">
                                <el-form-item label="收货地址：" prop="cascade">
                                    <region @region="regionChange" ref="regionParams" class="row_width"></region>
                                </el-form-item>
                            </div>
                        </div>
                        <div>
                            <div class="displayStyle">
                                <el-form-item label="详细地址：" prop="address">
                                    <el-input v-model="addCollectAddressParams.address" placeholder="请输入详细地址" style="width: 740px;" size="small">
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
        <!--excel导入的订单 end-->

        <div class="content">
            <div class="title">
                <div>商品清单</div>
            </div>
            <div class="content-wrapper content-table-wrapper can-del-table-row specail-table-list-wrapper">
                <table width="100%">
                    <thead>
                        <th width="260" style="padding-left:20px">商品名称</th>
                        <th>商品编码</th>
                        <th>单位</th>
                        <th>销售单价(元)</th>
                        <th>本次换货</th>
                        <th>总价（元）</th>
                        <th>备注</th>
                    </thead>
                    <tr v-for="(one,index) in changeDetail.saleChangeSkusModels" :key="index">
                        <td :title="one.skuName" v-if="one.skuName" class="create-change-order-skuname">{{one.skuName}}</td>
                        <td v-else>--</td>
                        <td :title="one.skuId" v-if="one.skuId">{{one.skuId}}</td>
                        <td v-else>--</td>
                        <td :title="one.unitName" v-if="one.unitName">{{one.unitName}}</td>
                        <td v-else>--</td>
                        <td :title="one.price">{{one.price/100|keepTwoNum}}</td>
                        <!-- <td v-else>--</td> -->
                        <td :title="one.changeCount">

                            <el-input class="table-input" type="tel" size="small" v-model.number="one.changeCount" @keyup.native="setValue(one,index)" :min="0" maxLength="11" key="changeCount" @onfocus.native="clearDefult(one.changeCount)"></el-input>
                        </td>
                        <td>
                            <!--<p>{{getTotalMoney(one)}}</p>-->
                            <p>{{one.changeTotal/100|keepTwoNum}}</p>
                            <!--<el-input class="table-input" size="small" type="number" :value="getTotalMoney(one)"-->
                            <!--:disabled="true"></el-input>-->
                        </td>
                        <td :title="one.remark">
                            <div style="position: relative;">
                                <el-input class="table-input" key="changeRemark" type="text" v-model="one.remark" size="small" maxLength="100"></el-input>
                                <!--<div class="iconfont1 icon-shanchuhang" @click="deleteProduct(index)"></div>-->
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="orderContainer">
            <div class="innner-wrapper">
                <div class="orderCount">
                    <p style="display: inline-block"> 订单合计金额:</p>
                    <span>
                        ￥{{totalAmount/100 | keepTwoNum}}
                    </span>
                </div>
            </div>
        </div>
        <div class="submitBtn created-change-order">
            <el-button type="primary" @click="submitEditChange('createChangeForm')" size="small">提交</el-button>
            <el-button size="small" @click="OnBackLatePage" plain>取消</el-button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import MessageMixins from '~/mixins/messages';
import PlatformMixins from '~/mixins/platform';
import FiltersFun from '~/mixins/filters';
import QuitMixins from '~/mixins/quit';
import { routesMapping } from '~/router';
import utils from '~/utils/commonMethod';
import ReceivingInformation from '~/components/common/ReceivingInformation.vue' // 收货信息
import region from '~/components/common/RegionSelect.vue' // 省市区三级

export default {
    name: 'CreateOutbound',
    mixins: [MessageMixins, PlatformMixins, QuitMixins, FiltersFun],
    data() {
        //正则校验
        let validatorStorehouseId = (rule, value, callback) => {
            if (!this.createChangeForm.storehouseId) {
                return callback(new Error('请选择收货仓库!'));
            } else {
                return callback();
            }
        };
        let validatorOrderNo = (rule, value, callback) => {
            if (!this.changeDetail.orderId) {
                return callback(new Error('请输入关联销售单!'));
            } else {
                return callback();
            }
        };
        const validatorLinkTel = (rule, value, callback) => {
            var reg = /^(\d)\d{0,10}$/;
            if (!value) {
                return callback(new Error("输入联系电话"));
            } else if (!value || !reg.test(value)) {
                return callback(new Error("请正确输入联系电话"));
            } else {
                return callback();
            }
        };
        return {
            storeList: [],
            radio: 0,
            rules: {
                storehouseId: [{ required: true, validator: validatorStorehouseId, trigger: 'change' }],
                orderNo: [{ required: true, validator: validatorOrderNo, trigger: 'blur' }],
                changeId: [{ required: true, message: '换货单号不能为空', trigger: 'blur' }],
                orderId: [{ required: true, message: '销售单号不能为空', trigger: 'blur' }],
                createTime: [{ required: true, message: '创建时间不能为空', trigger: 'blur' }],
                stockName: [{ required: true, message: '收货仓库不能为空', trigger: 'change' }],
                remark: [{ max: 100, message: '备注请在100字以内', trigger: 'blur' }],
                changeType: [{ required: true, message: '订单类型不能为空', trigger: 'blur' }],
                createUserName: [{ required: true, message: '操作人不能为空', trigger: 'blur' }],
                channelName: [{ required: true, message: '渠道不能为空', trigger: 'blur' }],
            },
            customerInStoreInfo: [],
            changeDetail: {}, // 换货商品详情
            // 新增收货地址参数
            addCollectAddressParams: {
                linkMan: '',
                phone: '',
                cascade: [],
                address: '',
                isDefault: '0',
                channelAddressId: null
            },
            // 新增收货地址校验
            addCollectAddressRules: {
                linkMan: [
                    { required: true, message: '请输入联系人', trigger: 'blur' },
                    { max: 20, message: '输入内容长度请在20个字符内', trigger: 'blur' },
                ],
                phone: [
                    { required: true, validator: validatorLinkTel, trigger: 'blur' },
                ],
                cascade: [
                    { required: true, message: '请选择收货地址', trigger: 'blur', type: 'array' },
                ],
                address: [
                    { required: true, message: '请输入详细地址', trigger: 'blur' },
                    { max: 200, message: '输入内容长度请在200个字符内', trigger: 'blur' },
                ]
            },
            // 换货订单类型
            changeTypeName: {
                31: '普通换货',
                32: '代售换货',
                33: '代发换货',
            },
        }
    },
    created() {
        this.getChangeInfo();
        // this.querySockList();
    },
    computed: {
        totalAmount: function () {
            if (this.changeDetail.saleChangeSkusModels && this.changeDetail.saleChangeSkusModels.length > 0) {
                let res = 0;
                this.changeDetail.saleChangeSkusModels.forEach(item => {
                    res += (parseInt(item.changeTotal) || 0)
                })
                return res
            }
        }
    },
    methods: {
        ...mapActions([
            "showPageLoading",
            "hidePageLoading",
            "createNewChannelAddress",
            "editChannelAddress",
            "editChannelAddressStatus",
            "setDefaultChannelAddress",
            "querySaleOrderBlurry",
            "queryChannelAddress",
            "queryStoreById",
            "queryStoreList",
            "editChangeOrderInfo",
            "queryChangeOrderHasCount",
            "createChannelAddressAction",
            "updateChannelAddress",
        ]),
        // 日期格式化
        formatYearOne(date) {
            return utils.formatYearOne(date);
        },
        // 查看销售订单详情
        toQueryDetail(orderId) {
            if (!orderId) {
                this.$message('请输入销售订单号!');
                return;
            }
            this.$router.push(`/sales/check/salesOrder/${orderId}`);
        },
        // 省市区三级设置
        regionChange(region, regionName) {
            this.addCollectAddressParams.cascade = region
            this.addCollectAddressParams.regionName = regionName;
        },
        querySockList(datas) {
            this.queryStoreList(datas).then((resp) => {
                this.storeList = resp;
            });
        },
        // 根据客户id获取客户地址
        getCustomerAddress(custId) {
            this.queryChannelAddress({ channelId: custId }).then((res) => {
                this.customerInStoreInfo = res.result;
            });
        },
        // 还原仓库信息
        clearCreateChangeForm() {
            this.changeDetail.storeArea = '';
            this.changeDetail.storeLinkMan = '';
            this.changeDetail.storeLinkTel = '';
            this.changeDetail.storeAddress = '';
        },
        // 选择仓库
        choosestorehouse(value) {
            this.clearCreateChangeForm();
            this.queryStoreById({ storehouseId: value }).then((res) => {
                this.changeDetail.storeLinkMan = res.links[0].linkman;
                this.changeDetail.storeLinkTel = res.links[0].phone;
                this.changeDetail.storeArea = `${res.province}-${res.city}-${res.area}`;
                this.changeDetail.storeAddress = res.storehouseAddress;
                this.changeDetail.stockId = res.storehouseId;
                this.changeDetail.stockName = res.storehouseName;
            });
        },
        //设置换数量
        setValue(row, index) {
            row.changeCount = Number(String(row.changeCount).replace(/[^\d]$/g, ""));
            const reg = /^[1-9]\d{0,6}$/;
            if (Number(row.changeCount) !== 0 && !reg.test(row.changeCount)) {
                row.changeCount = 0;
                this.$message({
                    type: 'warning',
                    message: '请输入正确的换货数量',
                });
                return;
            }
            if (parseInt(row.changeCount) <= 0) {
                row.changeCount = 0;
                row.changeTotal = 0;
            } else if (row.changeCount > row.exChangeCount) {
                this.$message({
                    type: 'warning',
                    message: `可换货数量为${row.exChangeCount}`,
                });
                row.changeCount = 0;
            } else if (row.price && row.changeCount) {
                row.changeTotal = row.price * row.changeCount;
            } else {
                row.changeTotal = 0;
                // this.changeDetail.saleChangeSkusModels[index].changeTotal = 0;
            }
        },
        clearDefult(count) {

            // debugger
            count = 0;
        },
        //提交编辑
        submitEditChange(formName) {
            const that = this;
            if (that.changeDetail.saleChangeSkusModels.length === 0) {
                that.$message('无可换订单信息');
                return;
            }
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    this.showWarning('请先正确填写表单信息!');
                    return;
                }
                if (this.changeDetail.customerAddressId === -1) {
                    this.$refs['addCollectAddressParams'].validate((valid) => {
                        if (valid) {
                            if (this.addCollectAddressParams.cascade.includes(null)) {
                                this.addCollectAddressParams.cascade = []
                                this.$refs.regionParams.checkedItems = []
                                that.$message({
                                    message: '请选择正确的省市区',
                                    type: 'warning',
                                });
                                return;
                            }
                            const addressInfo = {};
                            addressInfo.custLinkMan = this.addCollectAddressParams.linkMan;
                            addressInfo.custLinkTel = this.addCollectAddressParams.phone;
                            addressInfo.custAddress = this.addCollectAddressParams.address;
                            addressInfo.customerAddressId = -1;
                            addressInfo.provinceCode = this.addCollectAddressParams.cascade[0];
                            addressInfo.cityCode = this.addCollectAddressParams.cascade[1];
                            addressInfo.areaCode = this.addCollectAddressParams.cascade[2];
                            addressInfo.province = this.addCollectAddressParams.regionName[0];
                            addressInfo.city = this.addCollectAddressParams.regionName[1];
                            addressInfo.area = this.addCollectAddressParams.regionName[2];
                            that.changeDetail = Object.assign({}, that.changeDetail, addressInfo);
                            that.submitEditChangeOrder();
                        }
                    });
                } else {
                    const curCustomer = that.customerInStoreInfo.filter(val => Number(that.changeDetail.customerAddressId) === Number(val.channelAddressId))[0];
                    if (!curCustomer) {
                        this.$message({
                            type: 'warning',
                            message: '请选择收货地址！',
                        });
                        return;
                    }
                    const newCurCustomer = {};
                    newCurCustomer.custLinkMan = curCustomer.linkMan;
                    newCurCustomer.custLinkTel = curCustomer.phone;
                    newCurCustomer.custAddress = curCustomer.address;
                    newCurCustomer.provinceCode = curCustomer.provinceCode;
                    newCurCustomer.cityCode = curCustomer.cityCode;
                    newCurCustomer.areaCode = curCustomer.areaCode;
                    newCurCustomer.province = curCustomer.province;
                    newCurCustomer.city = curCustomer.city;
                    newCurCustomer.area = curCustomer.area;
                    newCurCustomer.customerAddressId = curCustomer.channelAddressId;
                    that.changeDetail = Object.assign({}, that.changeDetail, newCurCustomer);
                    that.submitEditChangeOrder();
                }
            })
        },
        // 提交编辑换货单函数
        submitEditChangeOrder() {
            const hasChangeCount = this.changeDetail.saleChangeSkusModels.some(i => Number(i.changeCount) !== 0);
            if (!hasChangeCount) {
                this.$message({
                    type: 'error',
                    message: `换货数量不能全部为0，请重新输入`
                });
                return;
            }
            this.editChangeOrderInfo(this.changeDetail).then((resp) => {
                this.$message({
                    message: '操作成功',
                    type: 'success',
                });
                this.OnBackLatePage();
            }).catch((err) => {
                this.hidePageLoading();
            })
        },
        //点击取消
        OnBackLatePage() {
            this.quit(routesMapping.SalesChange, true)
        },
        handleCurrentChange(val) {
            this.changeDetail.customerAddressId = val.channelAddressId;
        },
        // 获取换货商品信息
        getChangeInfo() {
            this.showPageLoading();
            const datas = {
                changeId: this.$route.params.changeId,
            };
            this.queryChangeOrderHasCount(datas).then((res) => {
                this.hidePageLoading();
                this.changeDetail = res;
                if (Number(this.changeDetail.channelId) === -1) {
                    this.changeDetail.channelName = '其他';
                }
                // 查询仓库
                const param = { bizType: 1, channelId: this.changeDetail.channelId };
                if (res.changeType === 33) {
                    param.bizType = 4;
                }
                this.querySockList(param);
                if (res.customerAddressId === -1) {
                    const region = [res.provinceCode, res.cityCode, res.areaCode]
                    const regionName = [res.province, res.city, res.area]
                    this.addCollectAddressParams.linkMan = res.custLinkMan;
                    this.addCollectAddressParams.phone = res.custLinkTel;
                    this.addCollectAddressParams.cascade = region;
                    this.addCollectAddressParams.regionName = regionName;
                    this.addCollectAddressParams.address = res.customerAddress;
                    let i = 0
                    const time = setInterval(() => {
                        if (this.$refs.regionParams.datas && this.$refs.regionParams.datas.length) {
                            this.$refs.regionParams.checkedItems = region
                            clearInterval(time)
                        }
                        if (i === 10) {
                            clearInterval(time)
                        }
                        ++i
                    }, 500)
                    return;
                }
                this.getCustomerAddress(res.channelId);
            }).catch(() => {
                this.hidePageLoading();
            });
        },
        // 编辑地址
        editorAddress(item, index) {
            this.addReceiverAddress = true
            const obj = Object.assign({}, {
                linkMan: item.linkMan,
                region: [item.provinceCode, item.cityCode, item.areaCode],
                regionName: [],
                phone: item.phone,
                address: item.address,
                isDefault: item.isDefault,
                channelId: item.channelId,
                channelAddressId: item.channelAddressId
            })
            let i = 0
            const time = setInterval(() => {
                if (this.$refs.ReceivingInformation.datas && this.$refs.ReceivingInformation.datas.length) {
                    this.$refs.ReceivingInformation.ReceivingInformationParams = obj
                    this.curReceivingAdd = 0
                    this.$refs.ReceivingInformation.clearForm('ReceivingInformationParams')
                    clearInterval(time)
                }
                if (i === 10) {
                    clearInterval(time)
                }
                ++i
            }, 500)
        },
        // 删除地址
        deleteAddress(item, index) {
            if (this.radio === item.channelAddressId) {
                this.$message({
                    type: 'warning',
                    message: '不能删除选中地址'
                });
                return;
            }
            this.$confirm('确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.showPageLoading();
                this.editChannelAddressStatus({ channelAddressId: item.channelAddressId, status: 2 }).then(res => {
                    this.hidePageLoading();
                    if (res.code === 0) {
                        this.$message({
                            message: '删除成功'
                        });
                        this.getCustomerAddress(this.changeDetail.channelId);
                    }
                }).catch(() => {
                    this.hidePageLoading();
                });
            }).catch(() => {
            });
        },
        // 设置默认收货地址
        setDefaultAddress(item, index) {
            this.showPageLoading();
            this.setDefaultChannelAddress({ channelAddressId: item.channelAddressId }).then(res => {
                this.hidePageLoading();
                if (res.code === 0) {
                    this.getCustomerAddress(this.changeDetail.channelId);
                    this.$message({
                        message: '设置成功',
                        type: 'success',
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '设置失败'
                    })
                }
            }).catch(() => {
                this.hidePageLoading();
            })
        },
        // 提交新增或者编辑的收貨地址
        submitCollectAddressParams(params) {
            Object.assign(this.addCollectAddressParams,
                { province: params.regionName[0] },
                { city: params.regionName[1] },
                { area: params.regionName[2] },
                { provinceCode: params.region[0] },
                { cityCode: params.region[1] },
                { areaCode: params.region[2] },
                params
            )
            this.addCollectAddressParams.channelId = this.changeDetail.channelId;
            if (!this.addCollectAddressParams.channelAddressId) {
                this.createChannelAddressAction(this.addCollectAddressParams).then(res => {
                    if (res.code === 0) {
                        this.getCustomerAddress(this.changeDetail.channelId);
                        this.$message({
                            message: '新增地址成功',
                            type: 'success',
                        })
                        this.$refs.ReceivingInformation.resetForm('ReceivingInformationParams')
                    } else {
                        this.$message({
                            message: '新增地址失败',
                            type: 'error'
                        })
                    }
                })
            } else {
                this.updateChannelAddress(this.addCollectAddressParams).then(res => {
                    if (res.code === 0) {
                        this.getCustomerAddress(this.changeDetail.channelId);
                        this.$message({
                            message: '编辑地址成功',
                            type: 'success'
                        })
                        this.$refs.ReceivingInformation.ReceivingInformationParams.channelAddressId = null
                        this.$refs.ReceivingInformation.ReceivingInformationParams.isDefault = '0'
                        this.$refs.ReceivingInformation.resetForm('ReceivingInformationParams')
                    } else {
                        this.$message({
                            message: '编辑地址失败',
                            type: 'error'
                        })
                    }
                })
            }
        },
    },
    components: {
        ReceivingInformation, region
    }
}
</script>
<style lang='scss'>
.createPurchase-view {
  height: 100%;
  position: relative;
  padding: 10px 30px 0 30px;
  .content {
    .content-wrapper {
      padding: 18px 0 1px;
      .el-form > div {
        // margin-bottom: 10px;
      }
      .displayStyle,
      .displayStyle1 {
        display: inline-block;
        padding-left: 25px;
        .row_width {
          width: 300px;
          height: 36px;
        }
      }
      .address-radio-label .el-radio__label {
        display: none;
      }
    }
    .content-table-wrapper {
      padding: 20px 20px;
      .el-table thead tr th {
        border: none;
      }
      .sale-list-table {
        border: 1px solid #eceef5;
        /*border-bottom: none;*/
      }
      /*默认联系人*/
      .default-contact-btn {
        line-height: 20px;
        font-size: 12px;
        border-radius: 1px;
        background: #ff9b44;
        color: #fff;
        display: inline-block;
        margin-left: 34px;
        text-align: center;
        padding: 0 2px 0 3px;
      }
    }
    .addProduct {
      margin-bottom: 20px;
    }
    table thead th {
      background: #f6f7fb;
      width: 100px;
      height: 36px;
    }
    .can-del-table-row table {
      border: 1px solid #eee;
      border-collapse: collapse;
      margin: 0 auto;
      text-align: left;
      font-size: 12px;
      tr {
        border-bottom: 1px solid #eee;
        background: #ffffff;
        height: 36px;
        overflow: hidden;
        box-shadow: 0 1px 0 0 #f2f6fd;
        border: 1px solid #f0f3fa;
        transition: 1s;
        .iconfont1 {
          width: 16px;
          height: 16px;
          top: -6px;
          right: -1px;
          position: absolute;
          display: none;
          background-color: white;
          color: red;
          transition: 1s;
        }
        &:hover {
          //    border: 1px dashed #539EFF;
          outline: 1px dashed #539eff;
          outline-offset: 0px;
          transition: 1s;
          .iconfont1 {
            display: block;
            cursor: pointer;
            transition: 1s;
          }
        }
        td {
          padding-left: 5px;
          .table-input {
            width: 120px;
          }
        }
      }
    }
  }
  .orderContainer {
    border: none;
    background: #fff;
    height: 50px;
    padding: 0 20px 20px 20px;
    margin-top: 0;
    .innner-wrapper {
      border: 1px solid #f1f1f1;
      height: 50px;
      background: #fbfbfb;
    }
    .orderCount {
      height: 50px;
      line-height: 50px;
      float: right;
      margin-right: 15px;
      span {
        color: red;
        font-size: 18px;
      }
    }
  }
  .submitBtn {
    padding: 20px;
    background-color: white;
  }
  .el-table__body-wrapper {
    overflow: inherit;
  }
}
/*提交，取消按钮*/
.created-change-order .el-button--primary.is-plain {
  background-color: #fff;
  &:hover {
    color: #409eff;
  }
}
.created-change-order .el-button--default.is-plain {
  border-color: #bfd9fe;
  color: #3b8cff;
}
.created-change-order .el-button {
  height: 34px !important;
  line-height: 34px;
  padding: 0;
  width: 90px;
}
</style>
<style lang='scss'>
.createPurchase-view {
  .remark_width {
    width: calc(100% - 20px);
    .el-textarea__inner {
      min-height: 80px !important;
      border-color: #e0e0e0;
    }
  }
  .procurements-config-wrapper {
    overflow: inherit;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 200px;
  }
  table {
    border-collapse: collapse;
  }
  .can-del-table-row .el-table tr {
    position: relative;
    /*.close-img-btn {*/
    /*position: absolute;*/
    /*top: 0;*/
    /*right: 0;*/
    /*z-index: 1000;*/
    /*display: none;*/
    /*width: 16px;*/
    /*height: 16px;*/
    /*background: transparent url('../../../layouts/images/close-red.png') no-repeat;*/
    /*background-size: contain;*/
    /*}*/
    &:hover {
      border: 2px dashed #539eff;
      /*.close-img-btn {*/
      /*display: block;*/
      /*cursor: pointer;*/
      /*}*/
    }
  }
  /*表格样式调整*/
  .specail-table-list-wrapper {
    table tr td {
      padding-left: 0 !important;
    }
    /*商品清单，skuName*/
    .create-change-order-skuname {
      padding-left: 20px !important;
    }
  }
}
.searchView {
  color: #3b8cff;
  font-size: 14px;
  display: inline-block;
  position: absolute;
  right: -45px;
  top: 9px;
}
.posRelative {
  position: relative;
}
</style>
<style scoped lang="scss">
.content-wrapper .change-order-query-detail {
  cursor: pointer;
}
.createAddress_func {
  margin: 0 10px;
  padding: 3px;
  width: 58px;
  height: 20px;
  cursor: pointer;
  &.defalut_address {
    background-color: #ffeddd;
    color: #ff9624;
    border: 1px solid #ff9624;
  }
  &.set_defalutAddress {
    display: none;
    background-color: #ff9624;
    color: #fff;
    border: 1px solid #ff9624;
  }
}
.el-table__row:hover {
  .createAddress_func {
    &.set_defalutAddress {
      display: inline;
    }
  }
}
.save-address-btn {
  width: 90px;
  line-height: 34px;
  height: 34px;
  border: 1px solid #d4e6ff;
  border-radius: 3px;
  text-align: center;
  padding: 0;
  margin: 0;
  color: #3b8cff;
  font-size: 14px;
}
.save-address-btn.el-button.is-plain:focus,
.save-address-btn.el-button.is-plain:hover {
  border-color: #d4e6ff;
  color: #3b8cff;
}
.area-form-special .el-cascader {
  width: 300px !important;
}
// 表单间距
.store-link-info > div {
  //   margin-bottom: 10px;
}
// 备注
.baseInfo-remark {
  position: relative;
  .limittext {
    position: absolute;
    bottom: 0;
    right: 40px;
    font-size: 12px;
    color: #dddddd;
  }
}
</style>
