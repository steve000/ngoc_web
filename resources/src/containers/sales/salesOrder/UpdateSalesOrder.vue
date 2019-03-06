<template>
    <div class="create-sales-order saleModuleCreate">
        <div class="content">
            <!-- 新增订单 -->
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper">
                <el-form label-width="110px" :model="createOrderParams" ref="createOrderParams" label-position="left">
                    <div class="displayStyle">
                        <el-form-item label="操作人：" required>
                            <el-input v-model="userName" disabled class="row_width">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="销售单号：" required>
                                <el-input v-model="createOrderParams.orderId" disabled class="row_width">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle displayStyle1">
                            <el-form-item label="创建时间：" required>
                                <el-date-picker v-model="createOrderParams.createTime" disabled format="yyyy/MM/dd" class="row_width" type="date">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="订单类型：" required>
                                <el-select v-model="createOrderParams.orderType" disabled class="row_width">
                                    <el-option v-for="item in orderTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="displayStyle displayStyle1">
                            <el-form-item label="客户：" required>
                                <el-select v-model="createOrderParams.channelId" filterable placeholder="请选择客户" class="row_width" disabled>
                                    <el-option v-for="(item, index) in channelTypeOptions" :key="index" :label="item.channelName" :value="item.channelId" size='small'>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <el-form-item label="备注：">
                            <el-input type="textarea" :rows="4" :maxlength="200" v-model="createOrderParams.remark" resize="none" style="width: 1100px;">
                            </el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="content">
            <div class="title">
                <div>收货信息</div>
            </div>
            <div class="content-wrapper">
                <ReceivingInformation @submit="submitCollectAddressParams" ref="ReceivingInformation" buttonName="确认"></ReceivingInformation>
            </div>
            <div class="content-wrapper">
                <el-table :data="receivingInformation" :height="receivingInformation.length ? '' : '100'" style="border: 1px solid #f5f5f5;border-top: 0;">
                    <el-table-column label="" width="48" v-if="!(createOrderParams.custAddressId === -1 || createOrderParams.channelId === '-1')">
                        <template slot-scope="scope">
                            <el-radio v-model="curReceivingAdd" size="medium" :label="scope.$index" @change="selectedAddress" style="width: 16px;overflow:hidden;vertical-align: middle;">
                            </el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column prop="linkMan" label="收货人" width="250" show-overflow-tooltip></el-table-column>
                    <el-table-column label="发货地址" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ `${scope.row.province}-${scope.row.city}-${scope.row.area} ${scope.row.address}` }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="phone" label="联系电话" width="350" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" align="left" width="300">
                        <template slot-scope="scope">
                            <a @click="editorAddress(scope.row, scope.$index)" class="createAddress_func">编辑</a>
                            <a @click="deleteAddress(scope.row, scope.$index)" class="createAddress_func">删除</a>
                            <span v-if="scope.row.isDefault === '1'" class="createAddress_func defalut_address">默认地址</span>
                            <span v-else class="createAddress_func set_defalutAddress" @click="setDefaultAddress(scope.row, scope.$index)">设为默认</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="content pt20">
                <div class="title">
                    <div>商品清单</div>
                </div>
            </div>
            <div class="content-wrapper">
                <div class="addProduct">
                    <el-button plain size="mini" @click="addGoodsMsg">
                        <i class="el-icon-plus"></i>添加商品信息</el-button>
                </div>
                <table width="100%">
                    <thead>
                        <th width="260" style="padding-left:20px">商品名称</th>
                        <th>商品编码</th>
                        <th>单位</th>
                        <th>销售单价（元）</th>
                        <th>销售数量</th>
                        <th>总价（元）</th>
                        <th>备注</th>
                    </thead>
                    <tr v-for="(one, index) in commodityInformationList" :key="index">
                        <td width="260">
                            <el-select v-model="one.$goodMsg" value-key="skuId" filterable placeholder="输入商品名称" no-data-text="没有找到相关的商品" @change="selectedSetGoods(one.$goodMsg, index)" size="small">
                                <el-option v-for="(item, k) in productList" :key="k" :label="item.skuName" :value="item">
                                </el-option>
                            </el-select>
                        </td>
                        <td :title="one.skuId" v-if="one.skuId">{{one.skuId}}</td>
                        <td v-else>--</td>
                        <td :title="one.unitName" v-if="one.unitName">{{one.unitName}}</td>
                        <td v-else>--</td>
                        <td :title="one.price">
                            <el-input class="table-input" type="number" size="small" v-model="one.price" @keyup.native="priceChange(one)" @blur="priceChange(one)"></el-input>
                        </td>
                        <td :title="one.saleCount">
                            <el-input class="table-input" type="number" size="small" v-model="one.saleCount" @keyup.native="saleTotalChange(one)" @blur="saleTotalChange(one)"></el-input>
                        </td>
                        <td :title="one.saleTotal" v-if="one.saleTotal">
                            {{ one.saleTotal }}
                        </td>
                        <td v-else>--</td>
                        <td :title="one.remark">
                            <div style="position: relative;">
                                <el-input class="table-input" type="text" v-model="one.remark" size="small" :maxlength="100"></el-input>
                                <div class="iconfont1 icon-shanchuhang" @click="deleteProduct(index)"></div>
                            </div>
                        </td>
                    </tr>
                </table>

            </div>
            <div class="orderContainer">
                <div class="orderCount">
                    <p style="display: inline-block"> 订单合计金额:</p>
                    <span>￥{{columnTotal.toFixed(2)}}</span>
                </div>
            </div>
            <div class="pl20 pb20">
                <el-button type="primary" style="width:90px;" @click="submitCreateOrder">提交</el-button>
                <el-button plain style="width:90px;" @click="quit(routesMapping.SalesOrder, true)">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import PlatformMixins from '~/mixins/platform';
import QuitMixins from '~/mixins/quit';
import ReceivingInformation from '~/components/common/ReceivingInformation.vue'; // 收货信息
import { routesMapping } from '~/router';
import utils from "~/utils/commonMethod";

export default {
    name: 'UpdateSalesOrder',
    mixins: [PlatformMixins, QuitMixins],
    data() {
        return {
            // 订单类型Option
            orderTypeOptions: [
                { label: '普通订单', value: 11 },
                { label: '代售订单', value: 12 },
                { label: '代发订单', value: 13 },
                { label: '暂存销售', value: 14 }
            ],
            //渠道类型Option
            channelTypeOptions: [],
            // 商品清单
            commodityInformationList: [],
            // 商品搜索结果数组
            productList: [],
            userName: sessionStorage.getItem('userName'),
            // 创建订单
            createOrderParams: {
                remark: '',
            },
            //收货信息
            receivingInformation: [],
            // 当前收货
            curReceivingAdd: null,
            // 收货信息
            receivingMsg: {},
            // 选中的渠道
            curChannel: {},
        }
    },
    methods: {
        ...mapActions([
            'queryAddressByChannelId',
            'updateChannelAddress',
            'createChannelAddress',
            'updateChannelAddressStatus',
            'updateChannelDefalutAddress',
            'queryChannelBySearch',
            'querySalesGoodslist',
            'queryOrderMsg',
            'updataOrder'
        ]),
        init() {
            this.queryOrderMsg({ orderId: this.$route.params.orderId }).then((res) => {
                if (res && Object.keys(res).length) {
                    this.createOrderParams = res
                    res.pluList.forEach(function (i, k) {
                        i.price = i.price / 100
                        i.saleTotal = i.saleTotal / 100
                        i.$goodMsg = Object.assign({}, i)
                        return i
                    })
                    this.commodityInformationList = res.pluList
                    if (res.custAddressId === -1 || res.channelId === '-1') {
                        const address = Object.assign({}, {
                            linkMan: res.custLinkMan,
                            address: res.custAddress,
                            phone: res.custLinkTel,
                            isDefault: '1',
                            provinceCode: res.provinceCode,
                            cityCode: res.cityCode,
                            areaCode: res.areaCode,
                            province: res.province,
                            city: res.city,
                            area: res.area,
                        })
                        this.$set(this.receivingInformation, 0, address)
                        this.curReceivingAdd = 0
                    } else {
                        this.queryAddressByChannelId({ channelId: res.channelId }).then(res => {
                            this.receivingInformation = res.result
                            this.curReceivingAdd = this.receivingInformation.findIndex(i => i.channelAddressId === this.createOrderParams.custAddressId)
                        })
                    }
                    this.queryChannelBySearch({ searchContent: '' }).then(res1 => {
                        res1.result.unshift({ channelId: '-1', channelName: '其他' })
                        this.channelTypeOptions = res1.result
                        this.selectedChannel(res.channelId)
                    })
                    this.queryProductList()
                } else {
                    this.$message({
                        type: 'error',
                        message: `订单查询异常`
                    })
                    this.closeCurrentTab()
                }
            })
        },
        // 根据渠道搜索收货地址
        selectedChannel(val) {
            if (val) {
                this.curChannel = this.channelTypeOptions.find(i => i.channelId === val)
                this.createOrderParams.channelId = val
                this.createOrderParams.channelName = this.curChannel.channelName
                if (val !== '-1') this.getChannelAdd(val);
            }
        },
        // 获取渠道地址
        getChannelAdd(val) {
            this.queryAddressByChannelId({ channelId: val }).then(res => {
                this.curReceivingAdd = null
                this.receivingInformation = res.result
                const curReceivingAdd = this.receivingInformation.findIndex(i => i.isDefault === '1')
                if (curReceivingAdd >= 0) this.curReceivingAdd = curReceivingAdd
            })
        },
        // 提交收貨地址
        submitCollectAddressParams(params) {
            if (!(params.region[0] && params.region[1] && params.region[2])) {
                this.$message({
                    type: 'warning',
                    message: '请选择省市区'
                })
                return false
            }
            if (!(this.createOrderParams.channelId || this.createOrderParams.channelId === 0)) {
                this.$message({
                    type: 'warning',
                    message: '请先选择客户'
                })
                return false
            }
            Object.assign(this.receivingMsg, {
                province: params.regionName[0],
                city: params.regionName[1],
                area: params.regionName[2],
                provinceCode: params.region[0],
                cityCode: params.region[1],
                areaCode: params.region[2],
            }, params)
            if (!(this.createOrderParams.channelId === '-1' || this.createOrderParams.custAddressId === -1)) {
                this.receivingMsg.channelId = this.createOrderParams.channelId;
                if (this.receivingMsg.channelAddressId || this.receivingMsg.channelAddressId === 0) {
                    this.updateChannelAddress(this.receivingMsg).then(res => {
                        this.$message({
                            message: '保存地址成功',
                            type: 'success'
                        })
                        this.curReceivingAdd = null
                        this.getChannelAdd(this.curChannel.channelId)
                        this.$refs.ReceivingInformation.resetForm('ReceivingInformationParams')
                        this.$refs.ReceivingInformation.ReceivingInformationParams.channelAddressId = null
                        this.receivingMsg = {}
                        this.addReceiverAddress = false
                    }).catch(err => {
                        this.$message({
                            message: '保存地址失败',
                            type: 'error'
                        });
                    })
                } else {
                    this.receivingMsg.isDefault = '0';
                    this.createChannelAddress(this.receivingMsg).then(res => {
                        this.$message({
                            message: '保存地址成功',
                            type: 'success'
                        });
                        this.getChannelAdd(this.curChannel.channelId);
                        this.$refs.ReceivingInformation.resetForm('ReceivingInformationParams')
                        this.addReceiverAddress = false
                    }).catch(err => {
                        this.$message({
                            message: '保存地址失败',
                            type: 'error'
                        });
                    })
                }
            } else {
                this.$set(this.receivingInformation, 0, Object.assign({}, this.receivingMsg, { isDefault: '1' }))
                this.curReceivingAdd = 0
                this.$refs.ReceivingInformation.resetForm('ReceivingInformationParams')
                this.addReceiverAddress = false
                this.$message({
                    message: '保存地址成功',
                    type: 'success'
                })
            }
        },
        // 设置商品信息
        selectedSetGoods(val, index) {
            const good = Object.assign({}, val, { $goodMsg: val }, { saleTotal: 0 });
            this.$set(this.commodityInformationList, index, good);
        },
        // 删除商品
        deleteProduct(index) {
            this.$confirm('确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.commodityInformationList.splice(index, 1);
                this.$message({
                    type: 'success',
                    message: '删除成功'
                });
            })
        },
        // 单价改变设置总价
        priceChange(item, index) {
            if (!item.price) {
                if (item.price === '') {
                    this.$set(item, "saleTotal", utils.mul(item.price, item.saleCount))
                }
                this.$set(item, "price", undefined)
                return false
            }
            if (utils.ifNoNum(item.price)) {
                this.$set(item, "price", item.price)
                this.$set(item, "oldPrice", item.price)
                this.$set(item, "saleTotal", utils.mul(item.price, item.saleCount))
            } else {
                this.$set(item, "price", item.oldPrice)
            }
        },
        // 数量改变设置总价
        saleTotalChange(item) {
            if (!item.saleCount) {
                if (item.saleCount === '') {
                    this.$set(item, "saleTotal", utils.mul(item.price, item.saleCount))
                }
                this.$set(item, "saleCount", undefined)
                return false
            }
            if (utils.isDigit(item.saleCount)) {
                this.$set(item, "saleCount", Number(item.saleCount))
                this.$set(item, "oldSaleCount", Number(item.saleCount))
                this.$set(item, "saleTotal", utils.mul(item.price, item.saleCount))
            } else {
                this.$set(item, "saleCount", item.oldSaleCount);
            }
        },
        // 编辑地址
        editorAddress(item, index) {
            const obj = Object.assign({}, {
                region: [item.provinceCode, item.cityCode, item.areaCode],
                regionName: [],
                linkMan: item.linkMan,
                phone: item.phone,
                address: item.address,
                isDefault: item.isDefault,
                channelId: item.channelId,
                channelAddressId: item.channelAddressId
            })
            this.$refs.ReceivingInformation.ReceivingInformationParams = obj
            this.$refs.ReceivingInformation.clearForm('ReceivingInformationParams')
        },
        // 删除地址
        deleteAddress(item, index) {
            this.$confirm('确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (item.channelAddressId || item.channelAddressId === 0 || this.createOrderParams.channelId !== '-1') {
                    this.updateChannelAddressStatus({ channelAddressId: item.channelAddressId, status: 2 }).then(res => {
                        if (res.code === 0) {
                            this.getChannelAdd(this.createOrderParams.channelId)
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                        }
                    })
                } else {
                    this.receivingInformation.splice(index, 1);
                    this.curReceivingAdd = null
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                }
            })
        },
        // 设置默认收货地址
        setDefaultAddress(item, index) {
            this.updateChannelDefalutAddress({ channelAddressId: item.channelAddressId }).then(res => {
                if (res.code === 0) {
                    this.getChannelAdd(this.createOrderParams.channelId)
                    this.$message({
                        type: 'success',
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
        // 提交编辑订单
        submitCreateOrder() {
            this.$refs['createOrderParams'].validate((valid) => {
                if (valid && this.commodityInformationList.length) {
                    if (!this.receivingInformation.length) {
                        this.$message({
                            type: 'warning',
                            message: `请添加收货地址`
                        })
                        return false
                    }
                    if (!(this.curReceivingAdd >= 0)) {
                        this.$message({
                            type: 'warning',
                            message: `请选择收货地址`
                        })
                        return false
                    }
                    if (!this.commodityInformationList.some(i => i.saleCount === undefined || i.price === undefined || i.skuName === undefined)) {
                        this.selectedAddress(this.curReceivingAdd)
                        this.createOrderParams.pluList = JSON.parse(JSON.stringify(this.commodityInformationList))
                        this.createOrderParams.pluList.forEach(i => {
                            i.price = Number((i.price * 100).toFixed(0))
                            i.saleTotal = Number((i.saleTotal * 100).toFixed(0))
                        })
                        this.updataOrder(this.createOrderParams).then(res => {
                            if (res.code === 0) {
                                this.$message({
                                    type: 'success',
                                    message: `编辑成功`
                                })
                                this.quit(routesMapping.SalesOrder, true)
                            }
                        })
                    } else {
                        this.$message({
                            type: 'warning',
                            message: `请输入完整商品清单`
                        })
                        return false;
                    }
                } else {
                    this.$message({
                        type: 'warning',
                        message: `请填写完整信息提交`
                    })
                    return false;
                }
            })
        },
        // 选择地址设置
        selectedAddress(val) {
            this.curReceivingAdd = val
            const cur = this.receivingInformation[val]
            if (cur.channelAddressId) {
                Object.assign(this.createOrderParams, cur, { custAddressId: cur.channelAddressId })
            } else {
                Object.assign(this.createOrderParams, cur)
            }
        },
        // 表格初始化
        addGoodsMsg() {
            this.commodityInformationList.push({ skuId: null, unitName: null, price: null, remark: null });
        },
        // 查询所有商品
        queryProductList() {
            this.querySalesGoodslist({ searchContent: '', status: 1 }).then((res) => {
                if (res.result) {
                    this.productList = res.result
                } else {
                    this.productList = []
                }
            })
        },
        // 重置校验表单
        clearForm(name) {
            this.$refs[name].resetFields()
        },
        // 重置表单
        resetForm(name) {
            this.$refs[name].resetFields();
        }
    },
    mounted() {
        if (this.$route.params.orderId) {
            this.init()
        }
    },
    computed: {
        columnTotal() {
            if (this.commodityInformationList.length) {
                return this.commodityInformationList.map((row) => row.saleTotal || 0).reduce((x, y) => (Number(x) + Number(y)))
            } else {
                return 0
            }
        }
    },
    components: {
        ReceivingInformation
    },
}
</script>

