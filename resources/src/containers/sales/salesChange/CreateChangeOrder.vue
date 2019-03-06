<template>
    <div class='createPurchase-view'>
        <!-- 基本信息 -->
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper">
                <el-form label-position="left" label-width="110px" :model="createChangeForm" :rules="rules" ref="createChangeForm">
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="操作人：" label-width="110px" prop="operator">
                                <el-input v-model="createChangeForm.operator" :disabled="true" class="row_width" size="small">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle posRelative">
                            <el-form-item label="关联销售单：" label-width="110px" prop="orderId">
                                <!--<el-input v-model="createChangeForm.orderId" :disabled="false" class="row_width" @keyup.native="getSalseOrderByBlurry" ></el-input>-->
                                <el-autocomplete class="row_width" v-model.trim="createChangeForm.orderId" :fetch-suggestions="getSalseOrderByBlurry" placeholder="请输入内容" @select="handleSelect" size="small"></el-autocomplete>
                            </el-form-item>
                            <div class="searchView pull-right change-order-query-detail" @click="toQueryDetail(createChangeForm.orderId)" v-if="hasCompleteOrderId">查看</div>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle1">
                            <el-form-item label="订单类型：" prop="orderType" label-width="110px">
                                <el-input class="row_width" v-model="createChangeForm.orderType" :disabled="true" size="small"></el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle1" v-if="createChangeForm.invType === 1">
                            <el-form-item label="收货仓库：" prop="stockName">
                                <el-select @change="choosestorehouse(createChangeForm.stockName)" v-model="createChangeForm.stockName" placeholder="选择收货仓库" class="row_width" size="small">
                                    <el-option v-for="item in storeList" :key="item.storehouseId" :label="item.storehouseName" :value="String(item.storehouseId)">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle1">
                            <el-form-item label="渠道：" prop="channelName" label-width="110px">
                                <el-input class="row_width" v-model="createChangeForm.channelName" :disabled="true" size="small"></el-input>
                            </el-form-item>
                        </div>
                        <!-- 客户暂时去掉 -->
                        <!-- <div class="displayStyle1" v-if="Number(createChangeForm.channelId) === -1">
                            <el-form-item label="客户：" prop=" customerName" label-width="110px">
                                <el-input class="row_width" v-model="createChangeForm.customerName" :disabled="true" size="small"></el-input>
                            </el-form-item>
                        </div> -->
                    </div>

                    <div style="margin-left: 25px;padding-top:4px;">
                        <el-form-item class="baseInfo-remark" label="备注:" prop="remark" label-width="110px">
                            <el-input class="remark_width" type="textarea" v-model="createChangeForm.remark"></el-input>
                            <div class="limittext">200字以内</div>
                        </el-form-item>
                    </div>

                    <!-- <div style="margin-left: 25px;">
                        <el-form-item label="备注:" prop="remark" label-width="110px">
                            <el-input class="remark_width" type="textarea" v-model="createChangeForm.remark" style="width: 1100px;" maxLength="200" resize="none"></el-input>
                        </el-form-item>
                    </div> -->
                    <div class="title" v-if="createChangeForm.invType === 1">
                        <div>收货仓信息</div>
                    </div>
                    <div class="content-wrapper store-link-info" v-if="createChangeForm.invType === 1">
                        <div>
                            <div class="displayStyle">
                                <el-form-item label="收货人：" label-width="110px" prop="storeLinkMan">
                                    <el-input v-model="createChangeForm.storeLinkMan" :disabled="true" class="row_width" size="small">
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="displayStyle">
                                <el-form-item label="联系电话：" label-width="110px" prop="storeLinkTel">
                                    <el-input v-model="createChangeForm.storeLinkTel" :disabled="true" class="row_width" size="small">
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div>
                            <div class="displayStyle1">
                                <el-form-item label="收货地址：" prop="storeArea">
                                    <el-input v-model="storeArea" :disabled="true" class="row_width" size="small">
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="displayStyle">
                                <el-form-item label="详细地址：" label-width="110px" prop="storeAddress">
                                    <el-input v-model="createChangeForm.storeAddress" :disabled="true" class="row_width" size="small">
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
        <!--订单非excel导入订单 start-->
        <div v-if="createChangeForm.custAddressId !== -1">
            <div class="content">
                <div class="title">
                    <div>收货信息</div>
                </div>
                <div class="content-wrapper">
                    <ReceivingInformation @submit="submitCollectAddressParams" ref="ReceivingInformation"></ReceivingInformation>
                </div>
            </div>
            <div class="content">
                <div class="content-wrapper content-table-wrapper ">
                    <el-table :data="customerInStoreInfo" highlight-current-row @row-click="handleCurrentChange" class="customer-address-box" style="width: 100%">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-radio v-model="radio" :label="scope.row.channelAddressId" class="address-radio-label"></el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column property="linkMan" label="收货人">
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
        <!--订单非excel导入订单 end-->

        <!--订单为excel导入订单 start-->
        <div v-else>
            <div class="content">
                <div class="title">
                    <div>收货信息</div>
                </div>
            </div>
            <div class="content">
                <div class="content-wrapper pb20">
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
                                    <el-input v-model="addCollectAddressParams.phone" :length='11' type="number" placeholder="请输入联系电话" class="row_width" size="small">
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div>
                            <div class="displayStyle">
                                <el-form-item label="收货地址：" prop="cascade">
                                    <region @region="regionChange" ref="regionParams" class="row_width" :defaultItems="addCollectAddressParams.cascade"></region>
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

        <!--订单为excel导入订单 end-->
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
                    <tr v-for="(one,index) in checkProductList" :key="index">
                        <td :title="one.skuName" v-if="one.skuName" class="create-change-order-skuname">{{one.skuName}}</td>
                        <td v-else>--</td>
                        <td :title="one.skuId" v-if="one.skuId">{{one.skuId}}</td>
                        <td v-else>--</td>
                        <td :title="one.unitName" v-if="one.unitName">{{one.unitName}}</td>
                        <td v-else>--</td>
                        <td :title="one.price">{{one.price/100}}</td>
                        <!-- <td v-else>--</td> -->
                        <td :title="one.changeCount">
                            <el-input class="table-input" size="small" type="tel" v-model="one.changeCount" :min="0" @keyup.native="setValue(one,index)" @onfocus.native="clearDefult(one.changeCount)"></el-input>
                        </td>
                        <td>
                            <!--<p>{{getTotalMoney(one)}}</p>-->
                            <p>{{one.changeTotal/100 | keepTwoNum}}</p>

                            <!--<el-input class="table-input" size="small" type="number" :value="getTotalMoney(one)"-->
                            <!--:disabled="true"></el-input>-->
                        </td>
                        <!-- <td v-else>--</td> -->
                        <td :title="one.remark">
                            <div style="position: relative;">
                                <el-input class="table-input" type="text" v-model="one.remark" size="small"></el-input>
                            </div>
                        </td>
                    </tr>
                </table>
                <div class="table-no-data" v-if="checkProductList.toString() === ''">暂无数据</div>
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
            <el-button type="primary" @click="createChange('createChangeForm')" size="small">提交</el-button>
            <el-button size="small" @click="OnBackLatePage" plain>取消</el-button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import MessageMixins from '~/mixins/messages';
import PlatformMixins from '~/mixins/platform';
import FiltersFun from '~/mixins/filters';
import * as C from '~/constants/api';
import utils from '~/utils/commonMethod';
import QuitMixins from '~/mixins/quit';
import { routesMapping } from '~/router';
import ReceivingInformation from '~/components/common/ReceivingInformation' // 收货信息
import region from '~/components/common/RegionSelect' // 省市区三级

export default {
    name: 'CreateChangeOrder',
    mixins: [MessageMixins, PlatformMixins, QuitMixins, FiltersFun],
    data() {
        //正则校验
        let validatorStorehouseId = (rule, value, callback) => {
            if (!this.createChangeForm.stockName) {
                return callback(new Error('请选择收货仓库!'));
            } else {
                return callback();
            }
        };
        // let validatorPlanArrivalTime = (rule, value, callback) => {
        //     if (!this.createChangeForm.planArrivalTime) {
        //         return callback(new Error('请选择到货时间!'));
        //     } else {
        //         return callback();
        //     }
        // };
        let validatororderId = (rule, value, callback) => {
            if (!this.createChangeForm.orderId) {
                // 重置数据
                this.checkProductList = [];
                this.createChangeForm.invType = 0;
                this.orderType = '';
                this.createChangeForm.channelName = '';
                this.createChangeForm.orderType = '';
                this.customerInStoreInfo = [];
                this.createChangeForm.custAddressId = '';
                this.addCollectAddressParams = {
                    linkMan: '',
                    phone: '',
                    cascade: [],
                    address: '',
                    regionName: [],
                    isDefault: '0'
                };
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
            checkProductList: [],
            storeList: [],
            // 表单信息
            storeArea: '',
            createChangeForm: {
                operator: '',
                orderId: '',
                stockId: '',
                remark: '',
                storeLinkMan: '',
                storeLinkTel: '',
                storeAddress: '',
                channelName: '',
                channelId: '',
                stockName: '',
                changeType: '',
                orderType: '',
                custAddressId: '',
                area: '',
                areaCode: '',
                city: '',
                cityCode: '',
                province: '',
                provinceCode: '',
                invType: 0,
                customerId: '',
                customerName: '',
            },
            radio: null,
            rules: {
                // storehouseId: [{ required: true, validator: validatorStorehouseId, trigger: 'change,blur' }],
                // planArrivalTime: [{ required: true, validator: validatorPlanArrivalTime, trigger: 'change,blur' }],
                operator: [{ required: true, message: '操作人不能为空', trigger: 'blur' }],
                orderType: [{ required: true, message: '订单类型不能为空', trigger: 'blur' }],
                channelName: [{ required: true, message: '渠道不能为空', trigger: 'blur' }],
                orderId: [{ required: true, validator: validatororderId, trigger: 'blur' }],
                stockName: [{ required: true, validator: validatorStorehouseId, trigger: 'change' }],
                // storeLinkMan:[{required:true,validator:validatorStoreLinkMan,trigger:'change,blur'}],
                // storeLinkTel:[{required:true,validator:validatorStoreLinkTel,trigger:'change,blur'}],
                // storeArea:[{required:true,validator:validatorstoreArea,trigger:'change'}],
                // storeAddress:[{required:true,validator:validatorstoreAddress,trigger:'change,blur'}],
            },
            customerInStoreInfo: [],
            saleOrderSomeAttr: {},
            // 新增收货地址参数
            addCollectAddressParams: {
                linkMan: '',
                phone: '',
                cascade: [],
                address: '',
                regionName: [],
                isDefault: '0'
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
            hasCompleteOrderId: false, // 是否可以显示查看按钮
        }
    },
    mounted() {
        // this.querySockList();
        const userName = sessionStorage.getItem('userName');
        let aa = this.$route;
        this.createChangeForm.operator = userName;
        if (this.$route.params.orderIdChange && this.$route.params.orderIdChange !== '0') {
            this.createChangeForm.orderId = String(this.$route.params.orderIdChange);
            this.queryProductDetail();
        }
    },
    watch: {
        $route(to) {
            if (this.$route.params.orderIdChange && this.$route.params.orderIdChange !== '0') {
                this.createChangeForm.orderId = String(this.$route.params.orderIdChange);
                this.queryProductDetail();
            }
        },
        checkProductList: {
            handler(nval, oval) {
                if (nval.length) {
                    nval.forEach((item, index) => {
                        if (String(item.remark).length > 100) {
                            this.$message({
                                type: "warning",
                                message: `备注长度不能大于100字符，默认取前100个字符！`
                            });
                            this.$nextTick(() => {
                                item.remark = String(item.remark).substring(0, 100);
                            });
                        }
                    });
                }
            },
            deep: true
        },
    },
    computed: {
        ...mapState({
            getSkuListByCondition: ({ outboundWarehouseList }) => outboundWarehouseList.productList,
        }),
        totalAmount: function () {
            if (this.checkProductList && this.checkProductList.length > 0) {
                let res = 0;
                this.checkProductList.forEach(item => {
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
            "queryStoreList",
            "querySaleOrderHasCount",
            "queryChannelAddress",
            "queryStoreById",
            "createNewChangeOrder",
            "createChannelAddressAction",
            "updateChannelAddress",
            "editChannelAddressStatus",
            "setDefaultChannelAddress",
            "querySaleOrderBlurry",
        ]),
        // 省市区三级设置
        regionChange(region, regionName) {
            this.addCollectAddressParams.cascade = region;
            this.addCollectAddressParams.regionName = regionName;
        },
        querySockList(datas) {
            this.queryStoreList(datas).then((resp) => {
                this.storeList = resp;
            });
        },
        // 清除表单校验
        resetForm(formName) {
            this.$nextTick(function () {
                this.$refs[formName].resetFields();
            })
        },
        queryProductDetail() {
            if (!this.createChangeForm.orderId && this.createChangeForm.orderId.length < 5) {
                return;
            } else {
                this.showPageLoading();
                this.querySaleOrderHasCount({ orderId: this.createChangeForm.orderId }).then((resp) => {
                    this.hidePageLoading();
                    if (resp.data === null) {
                        this.$message('数据有误');
                        return;
                    }
                    if (resp.orderId === null) {
                        return;
                    }
                    this.hasCompleteOrderId = true;
                    // if (resp.orderStatus !== 3 && resp.orderStatus !== 5 && resp.orderStatus !== 4) {
                    //     this.$message({
                    //         type: 'warning',
                    //         message: '只有已完成或者部分出库订单可操作换货！',
                    //     });
                    //     return;
                    // }
                    if (resp.pluList && resp.pluList.length > 0) {
                        this.checkProductList = resp.pluList;
                        this.checkProductList = resp.pluList.map(val => Object.assign({}, val, { changeCount: val.exChangeCount, changeTotal: val.exChangeCount * val.price }));
                    }
                    // 查询仓库
                    const datas = { bizType: 1, channelId: resp.channelId };
                    if (resp.orderType === 13) {
                        datas.bizType = 4;
                    }
                    this.querySockList(datas);
                    this.getaddress(resp.channelId);
                    this.createChangeForm.channelId = resp.channelId;
                    this.createChangeForm.invType = resp.invType;
                    this.createChangeForm.custAddressId = resp.custAddressId;
                    // 客户
                    this.createChangeForm.customerId = resp.customerId;
                    this.createChangeForm.customerName = resp.customerName;
                    this.radio = resp.custAddressId; // 选中地址
                    if (Number(this.createChangeForm.channelId) === -1) {
                        this.createChangeForm.channelName = '其他';
                    } else {
                        this.createChangeForm.channelName = resp.channelName;
                    }
                    if (resp.custAddressId === -1) {
                        // 清除校验表单验证
                        if (this.$refs['addCollectAddressParams']) {
                            this.resetForm('addCollectAddressParams');
                        }
                        this.addCollectAddressParams.linkMan = resp.custLinkMan;
                        this.addCollectAddressParams.phone = resp.custLinkTel;
                        this.addCollectAddressParams.address = resp.custAddress;
                        this.addCollectAddressParams.isDefault = '0';
                        this.saleOrderSomeAttr = this.getPartAttr(resp, ['createUserId', 'createUserName', 'channelId', 'createTime', 'channelName', 'userGroupId', 'provinceCode', 'cityCode', 'areaCode', 'province', 'city', 'areaCode']);
                        let i = 0
                        const time = setInterval(() => {
                            if (this.$refs.regionParams && this.$refs.regionParams.datas.length) {
                                this.$refs.regionParams.checkedItems = [resp.provinceCode, resp.cityCode, resp.areaCode];
                                clearInterval(time)
                            }
                            if (i === 6) {
                                clearInterval(time)
                            }
                            ++i
                        }, 500)
                    } else {
                        this.saleOrderSomeAttr = this.getPartAttr(resp, ['createUserId', 'createUserName', 'channelId', 'createTime', 'channelName', 'userGroupId']);
                    }
                    if (resp.orderType === 11) {
                        this.createChangeForm.changeType = 31;
                        this.createChangeForm.orderType = '普通换货';
                    } else if (resp.orderType === 12) {
                        this.createChangeForm.changeType = 32;
                        this.createChangeForm.orderType = '代售换货';
                    } else if (resp.orderType === 13) {
                        this.createChangeForm.changeType = 33;
                        this.createChangeForm.orderType = '代发换货';
                    } else {
                        this.$message('销售订单号有误，请重新输入');
                    }
                    // setTimeout(() => {

                    // }, 1000)
                });
            }
        },
        // 根据客户id获取客户地址
        getaddress(custId) {
            this.queryChannelAddress({ channelId: custId }).then((res) => {
                this.customerInStoreInfo = res.result;
            });
        },
        // 还原仓库信息
        clearCreateChangeForm() {
            this.storeArea = '';
            this.createChangeForm.storeLinkMan = '';
            this.createChangeForm.storeLinkTel = '';
            this.createChangeForm.storeAddress = '';
        },
        choosestorehouse(value) {
            this.clearCreateChangeForm();
            this.queryStoreById({ storehouseId: value }).then((res) => {
                // 仓库信息
                const linkMsg = res.links[0] || {}
                this.createChangeForm.storeLinkMan = linkMsg.linkman;
                this.createChangeForm.storeLinkTel = linkMsg.phone;
                this.storeArea = `${res.province}-${res.city}-${res.area}`;
                this.createChangeForm.storeAddress = res.storehouseAddress;

                this.createChangeForm.stockId = res.storehouseId;
                this.createChangeForm.stockName = res.storehouseName;
                this.createChangeForm.area = res.area;
                this.createChangeForm.areaCode = res.areaCode;
                this.createChangeForm.city = res.city;
                this.createChangeForm.cityCode = res.cityCode;
                this.createChangeForm.province = res.province;
                this.createChangeForm.provinceCode = res.provinceCode;
            });
        },
        //设置换数量
        setValue(row, index) {
            row.changeCount = Number(String(row.changeCount).replace(/[^\d]$/g, ""));
            const reg = /^[1-9]\d{0,6}$/;
            if (Number(row.changeCount) !== 0 && !reg.test(row.changeCount)) {
                row.changeCount = ' ';
                this.$message({
                    type: 'warning',
                    message: '请输入正确的换货数量',
                });
                return;
            }
            if (parseInt(row.changeCount) <= 0) {
                row.changeCount = '0';
                row.changeTotal = '0';
            } else if (row.changeCount > row.exChangeCount) {
                this.$message({
                    type: 'warning',
                    message: `可换货数量为${row.exChangeCount}`,
                });
                row.changeCount = 0;
            } else if (row.price && row.changeCount) {
                row.changeTotal = String(row.price * row.changeCount);
            } else {
                this.checkProductList[index].changeTotal = '0';
            }
        },
        clearDefult(count) {
            count = " ";
        },
        //创建
        createChange(formName) {
            const that = this;
            // if (that.createChangeForm.changeType !== 31 && that.createChangeForm.changeType !== 33 && that.createChangeForm.changeType !== 32) {
            //     that.$message('销售订单号有误');
            //     return;
            // }
            if (!this.hasCompleteOrderId) {
                that.$message({ message: '请先关联正确的销售单号', type: 'warning' });
                return;
            }
            if (that.checkProductList.length === 0) {
                that.$message('无可换订单信息');
                return;
            }
            that.createChangeForm.stockId = that.createChangeForm.invType === 1 ? that.createChangeForm.stockId : -1;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (that.createChangeForm.custAddressId === -1) {
                        if (this.addCollectAddressParams.cascade.includes(null)) {
                            that.$message({
                                message: '请选择正确的省市区',
                                type: 'warning',
                            });
                            return;
                        }
                        this.$refs['addCollectAddressParams'].validate((valid) => {
                            if (valid) {
                                const custAddressInfo = {
                                    custLinkMan: that.addCollectAddressParams.linkMan,
                                    custLinkTel: that.addCollectAddressParams.phone,
                                    custAddress: that.addCollectAddressParams.address,
                                    provinceCode: this.addCollectAddressParams.cascade[0],
                                    cityCode: this.addCollectAddressParams.cascade[1],
                                    areaCode: this.addCollectAddressParams.cascade[2],
                                    province: this.addCollectAddressParams.regionName[0],
                                    city: this.addCollectAddressParams.regionName[1],
                                    area: this.addCollectAddressParams.regionName[2],
                                };
                                that.createChangeForm = Object.assign({}, that.createChangeForm, custAddressInfo);
                                this.submitCreateFunction();
                            }
                        });
                    } else {
                        const curCustomer = that.customerInStoreInfo.filter(val => val.channelAddressId === this.radio)[0];
                        if (!curCustomer) {
                            this.$message({
                                type: 'warning',
                                message: '请选择收货地址',
                            });
                            return;
                        }
                        const newCurCustomer = {
                            customerAddressId: curCustomer.channelAddressId,
                            custLinkMan: curCustomer.linkMan,
                            custLinkTel: curCustomer.phone,
                            custAddress: curCustomer.address,
                            provinceCode: curCustomer.provinceCode,
                            cityCode: curCustomer.cityCode,
                            areaCode: curCustomer.areaCode,
                            province: curCustomer.province,
                            city: curCustomer.city,
                            area: curCustomer.area,
                        };
                        that.createChangeForm = Object.assign({}, this.createChangeForm, newCurCustomer);
                        this.submitCreateFunction();
                    }

                } else {
                    that.showWarning('请先正确填写表单信息!');
                    return false
                }
            })
        },
        // 提交创建换货单的函数
        submitCreateFunction() {
            const haschangeCount = this.checkProductList.some(i => Number(i.changeCount) !== 0);
            if (!haschangeCount) {
                this.$message({
                    type: 'error',
                    message: `换货数量不能全部为0，请重新输入`
                });
                return;
            }
            this.showPageLoading();
            this.createChangeForm.saleChangeSkusModels = this.checkProductList;
            this.createChangeForm = Object.assign({}, this.createChangeForm, { storeArea: this.storeArea, ...this.saleOrderSomeAttr });
            this.createNewChangeOrder(this.createChangeForm).then((resp) => {
                this.hidePageLoading();
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
            this.quit(routesMapping.SalesChange)
        },
        handleCurrentChange(val) {
            // this.radio = this.customerInStoreInfo.findIndex(item => Number(item.channelAddressId) === Number(val.channelAddressId));
            this.radio = val.channelAddressId;
        },
        // 查看销售订单详情
        toQueryDetail(orderId) {
            if (!orderId) {
                this.$message('请输入销售订单号!');
                return;
            }
            this.$router.push(`/sales/check/salesOrder/${orderId}`);
        },
        // 提交新增或者编辑的收貨地址
        submitCollectAddressParams(params) {
            if (this.createChangeForm.channelId) {
                Object.assign(this.addCollectAddressParams,
                    { province: params.regionName[0] },
                    { city: params.regionName[1] },
                    { area: params.regionName[2] },
                    { provinceCode: params.region[0] },
                    { cityCode: params.region[1] },
                    { areaCode: params.region[2] },
                    params
                )
                this.addCollectAddressParams.channelId = this.createChangeForm.channelId;
                if (!this.addCollectAddressParams.channelAddressId) {
                    this.createChannelAddressAction(this.addCollectAddressParams).then(res => {
                        if (res.code === 0) {
                            this.getaddress(this.createChangeForm.channelId);
                            this.$message({
                                message: '保存地址成功',
                            })
                            this.$refs.ReceivingInformation.resetForm('ReceivingInformationParams')
                        } else {
                            this.$message({
                                message: '保存地址失败',
                                type: 'error'
                            })
                        }
                    })
                } else {
                    this.updateChannelAddress(this.addCollectAddressParams).then(res => {
                        if (res.code === 0) {
                            this.getaddress(this.createChangeForm.channelId);
                            this.$message({
                                message: '编辑地址成功',
                            })
                            this.this.addCollectAddressParams.channelAddressId = null
                            this.$refs.ReceivingInformation.resetForm('ReceivingInformationParams')
                        } else {
                            this.$message({
                                message: '编辑地址失败',
                                type: 'error'
                            })
                        }
                    })
                }
            } else {
                this.$message({
                    message: '请先关联销售订单号，再新增地址！',
                    type: 'warning'
                })
            }
        },
        // 编辑地址
        editorAddress(item, index) {
            this.$refs.ReceivingInformation.ReceivingInformationParams = Object.assign({}, item, { region: [item.provinceCode, item.cityCode, item.areaCode] }, { regionName: [] })
            this.$refs.ReceivingInformation.clearForm('ReceivingInformationParams')
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
                this.editChannelAddressStatus({ channelAddressId: item.channelAddressId, status: 2 }).then(res => {
                    if (res.code === 0) {
                        this.getaddress(this.createChangeForm.channelId);
                    }
                })
                this.$message('删除成功');
            }).catch(() => {
            });
        },
        // 设置默认收货地址
        setDefaultAddress(item, index) {
            this.setDefaultChannelAddress({ channelAddressId: item.channelAddressId }).then(res => {
                if (res.code === 0) {
                    this.getaddress(this.createChangeForm.channelId);
                    this.$message({
                        message: '设置成功'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '设置失败'
                    })
                }
            })
        },
        // 关联销售单号时，通过模糊查询获取可换货订单号
        getSalseOrderByBlurry(str, cb) {
            this.hasCompleteOrderId = false;
            const val = this.trim(str);
            const reg = /\w*$/;
            if (val.length === 0) {
                cb([]);
                return;
            }
            if (!reg.test(val)) {
                this.$message({
                    type: 'warning',
                    message: '请输入正确的销售单号',
                });
                return;
            }
            const datas = {
                orderId: val,
            };
            this.querySaleOrderBlurry(datas).then((res) => {
                const results = res.result.filter(val => val.orderType <= 13
                    && val.orderType >= 11
                    && (val.orderStatus === 3 || val.orderStatus === 5 || val.orderStatus === 4));
                for (let i of results) {
                    i.value = i.orderId;  //将CUSTOMER_NAME作为value
                }
                cb(results);
            });
        },
        // 选择订单后
        handleSelect(val) {
            this.hasCompleteOrderId = true;
            this.queryProductDetail();
        },
        // 获取对象的部分属性
        getPartAttr(obj, arr) {
            return utils.getPartAttr(obj, arr)
        },
        // 日志对比函数
        trim(str) {
            return utils.trim(str)
        },
    },
    components: {
        ReceivingInformation, region
    }
}
</script>
<style lang='scss' scope>
.createPurchase-view {
  height: 100%;
  position: relative;
  padding: 10px 30px 0 30px;
  .remark_width {
    width: calc(100% - 20px);
    .el-textarea__inner {
      min-height: 80px !important;
      border-color: #e0e0e0;
    }
  }
  .content {
    .content-wrapper {
      padding: 18px 0 1px;
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
      padding: 20px 20px 20px;
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
    .customer-address-box {
      border: 1px solid #f2f6fd;
      .el-table__empty-block {
        min-height: 44px !important;
      }
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
    // clear: both;
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
  font-size: 14px;
}
.createPurchase-view {
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
    &:hover {
      border: 2px dashed #539eff;
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
// 无数据展示
.table-no-data {
  text-align: center;
  height: 44px;
  line-height: 44px;
  border: 1px solid #f1f1f1;
  border-top: none;
  font-size: 12px;
  color: #909399;
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
