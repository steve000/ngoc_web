<!-- 新增销售代发 -->
<template>
    <div class="createInsteadDelivery saleModuleCreate">
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper">
                <el-form label-width="110px" :model="createInsteadDeliveryParams" :rules="createOrderRules" ref="createInsteadDeliveryParams" label-position="left">
                    <div class="displayStyle">
                        <el-form-item label="操作人：" required>
                            <el-input v-model="userName" placeholder="请输入操作人" disabled class="row_width">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="displayStyle displayStyle1">
                        <el-form-item label="客户：" prop="channelId">
                            <el-select v-model="createInsteadDeliveryParams.channelId" disabled class="row_width">
                                <el-option v-for="item in channelTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div style="text-indent: 8px;">
                        <el-form-item label="备注：" label-width="110px">
                            <el-input type="textarea" :rows="4" :maxlength="200" v-model="createInsteadDeliveryParams.remark" resize="none" style="width: 1100px;">
                            </el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="content">
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
                            <el-select v-model="one.$goodMsg" value-key="skuName" filterable placeholder="输入商品名称" no-data-text="没有找到相关的商品" @change="selectedSetGoods(one.$goodMsg, index)" :filter-method="filterGood" size="small">
                                <el-option v-for="(item, k) in filterGoodsArr" :key="k" :label="item.skuName" :value="item">
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
                <el-button plain style="width:90px;" @click="quit(routesMapping.insteadDelivery, true)">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import PlatformMixins from '~/mixins/platform';
import QuitMixins from '~/mixins/quit';
import { routesMapping } from '~/router';
import { mapActions } from 'vuex';
import utils from "~/utils/commonMethod";

export default {
    name: 'UpdateInsteadDelivery',
    mixins: [PlatformMixins, QuitMixins],
    data() {
        return {
            // 商品清单
            commodityInformationList: [],
            // 商品搜索结果数组
            goodsResultArr: [],
            //渠道类型Option
            channelTypeOptions: [],
            userName: sessionStorage.getItem('userName'),
            // 创建销售订单
            createInsteadDeliveryParams: {
                channelId: '',
                remark: '',
                orderType: 14
            },
            //创建订单校验
            createOrderRules: {
                channelId: [
                    { required: true, message: '请输入搜索收货客户', trigger: 'change' }
                ]
            },
            // 模糊查询商品名称
            queryGoodsName: '',
            filterGoodsArr: []
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        ...mapActions(["queryOrderMsg", "queryChannelGoodByChannelId", "updataOrder"]),
        init() {
            if (this.$route.params.orderId) {
                this.queryOrderMsg({ orderId: this.$route.params.orderId }).then((res) => {
                    if (res && Object.keys(res).length) {
                        this.$set(this.channelTypeOptions, 0, { label: res.channelName, value: res.channelId })
                        this.queryChannelGoodByChannelId({ channelId: res.channelId, isPage: false, status: '0' }).then((res1) => {
                            if (res1.result && res1.result.length) {
                                this.filterGoodsArr = res1.result.concat()
                                this.productList = res1.result.concat()
                                res.pluList.forEach(function (i, k) {
                                    i = res.pluList[k]
                                    i.$goodMsg = Object.assign({}, res.pluList[k])
                                    res.pluList[k].price = res.pluList[k].price / 100
                                    res.pluList[k].saleTotal = res.pluList[k].saleTotal / 100
                                })
                                this.commodityInformationList = res.pluList
                            }
                        })
                        this.createInsteadDeliveryParams = res

                    } else {
                        this.$message({
                            type: 'error',
                            message: `订单查询异常`
                        })
                        this.closeCurrentTab()
                    }
                })
            }
        },
        filterGood(val) {
            val = utils.trim(val)
            if (val) {
                this.filterGoodsArr = this.productList.filter((item) => {
                    if (item.skuName.includes(val) || ('' + item.skuId).includes(val)) return true
                })
            } else {
                this.filterGoodsArr = this.productList.concat()
            }
        },
        // 设置商品信息
        selectedSetGoods(val, index) {
            const good = Object.assign({}, val, { $goodMsg: val }, { saleTotal: 0 }, { price: 0 })
            this.$set(this.commodityInformationList, index, good)
        },
        // 添加商品
        addGoodsMsg(index) {
            this.commodityInformationList.push({ skuId: null, unitName: null, remark: null })
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
            }).catch(() => {
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
        // 查询所有商品
        queryProductList(val) {
            this.filterGoodsArr = this.productList = []
            this.queryChannelGoodByChannelId({ channelId: val, isPage: false, status: '0' }).then((res) => {
                if (res.result && res.result.length) {
                    this.filterGoodsArr = this.productList = res.result
                } else {
                    this.$message('此渠道没有渠道商品')
                }
            })
        },
        // 提交创建订单
        submitCreateOrder() {
            this.$refs['createInsteadDeliveryParams'].validate((valid) => {
                if (valid && this.commodityInformationList.length) {
                    if (!this.commodityInformationList.some(i => i.saleCount === undefined || i.price === undefined || i.skuName === undefined)) {
                        this.createInsteadDeliveryParams.pluList = JSON.parse(JSON.stringify(this.commodityInformationList))
                        this.createInsteadDeliveryParams.pluList.forEach(i => {
                            i.price = Number((i.price * 100).toFixed(0))
                            i.saleTotal = Number((i.saleTotal * 100).toFixed(0))
                        })
                        this.updataOrder(this.createInsteadDeliveryParams).then(res => {
                            this.$message({
                                type: 'success',
                                message: `编辑成功`
                            })
                            this.quit(routesMapping.InsteadDelivery, true)
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
        // 重置表单
        clearForm(name) {
            this.$refs[name].resetFields()
        },
    },
    computed: {
        columnTotal() {
            if (this.commodityInformationList.length) {
                return this.commodityInformationList.map((row) => row.saleTotal || 0).reduce((x, y) => (Number(x) + Number(y)))
            } else {
                return 0
            }
        }
    }
}
</script>

