<template>
	<div class='createChannelGood saleModuleCreate'>
		<!-- 基本信息 -->
		<div class="content">
			<div class="title">
				<div>基本信息</div>
			</div>
			<div class="content-wrapper">
				<el-form label-width="110px" :model="createChannelGoodParams" ref="createChannelGoodParams">
					<div>
						<div class="displayStyle">
							<el-form-item label="渠道名：" required>
								<el-input prefix-icon="el-icon-search" disabled class="row_width" v-model="createChannelGoodParams.channelName">
								</el-input>
							</el-form-item>
						</div>
					</div>
				</el-form>
			</div>
		</div>
		<div class="content">
			<div class="title">
				<div>渠道售卖商品</div>
			</div>
			<div class="content-wrapper">
				<div>
					<el-button plain size="mini" @click="addGoodsMsg" class="mb20">
						<i class="el-icon-plus"></i>新增商品
					</el-button>
				</div>
				<table width="100%">
					<thead>
						<th style="padding-left:20px">NGOC商品名称</th>
						<th>NGOC商品编码</th>
						<th>渠道商品名称</th>
						<th>渠道商品编码</th>
						<th>销售方式</th>
						<th>发货方</th>
						<th>最低价／元</th>
						<th>最高价／元</th>
						<th>备注</th>
					</thead>
					<tr v-for="(one, index) in channelGoodList" :key="index">
						<td width="260">
							<el-select v-model="one.$goodMsg" value-key="skuName" filterable placeholder="输入商品名称" no-data-text="没有找到相关的商品" @change="selectedSetGoods(one.$goodMsg, index)" style="width: 220px;" size="small">
								<el-option v-for="(item, k) in productList" :key="k" :label="item.skuName" :value="item">
								</el-option>
							</el-select>
						</td>
						<td :title="one.skuId" v-if="one.skuId" style="width: 180px;">{{one.skuId}}</td>
						<td v-else style="width: 180px;">--</td>
						<td style="width: 180px;">
							<el-input v-model="one.channelSkuName" placeholder="输入渠道商品名称" size="small" style="width: 90%;" :maxlength="128"></el-input>
						</td>
						<td style="width: 180px;">
							<el-input v-model="one.channelSkuId" placeholder="输入渠道sku編碼" size="small" style="width: 90%;" :maxlength="128"></el-input>
						</td>
						<td style="width: 100px;">
							<el-select v-model="one.saleType" placeholder="请选择" style="width: 90%;" size="small">
								<el-option v-for="item in saleTypeOptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</td>
						<td style="width: 130px;">
							<el-select v-model="one.vendorNumber" placeholder="请选择" style="width: 90%;" size="small" @change="selectedVendor(one)">
								<el-option v-for="item in vendorOptions" :key="item.vendorNumber" :label="item.vendorName" :value="item.vendorNumber">
								</el-option>
							</el-select>
						</td>
						<td style="width: 140px;">
							<el-input size="small" type="number" v-model.number="one.minPrice" style="width: 90%;" @blur="minPriceChange(one)"></el-input>
						</td>
						<td style="width: 140px;">
							<el-input size="small" type="number" v-model.number="one.maxPrice" style="width: 90%;" @blur="maxPriceChange(one)"></el-input>
						</td>
						<td>
							<div style="position: relative;">
								<el-input class="table-input" type="text" v-model="one.remark" size="small" :maxlength="100"></el-input>
								<div class="iconfont1 icon-shanchuhang" @click="deleteProduct(index)"></div>
							</div>
						</td>
					</tr>
				</table>
			</div>
			<div class="pl20 pb20 pt20">
				<el-button type="primary" style="width:90px;" @click="submitCreateChannelGood">确认</el-button>
				<el-button plain style="width:90px;" @click="quit(routesMapping.Channelmanagement, true)">取消</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import PlatformMixins from "~/mixins/platform";
import QuitMixins from "~/mixins/quit";
import { routesMapping } from "~/router";
import { mapActions } from "vuex";
import utils from "~/utils/commonMethod";

export default {
	name: "CreateChannelGood",
	mixins: [PlatformMixins, QuitMixins],
	data() {
		return {
			// 查询渠道
			// 创建渠道商品参数
			createChannelGoodParams: {
				channelId: ""
			},
			// 渠道Option
			channelOptions: [],
			// 渠道商品列表
			channelGoodList: [],
			// 商品搜索结果数组
			productList: [],
			// 銷售方式Options
			saleTypeOptions: [
				{ label: "自营", value: 0 },
				{ label: "代售", value: 1 },
				{ label: "代发", value: 2 }
			],
			// 发货方Options
			vendorOptions: []
		};
	},
	mounted() {
		this.addGoodsMsg();
		this.init();
	},
	methods: {
		...mapActions([
			"queryChannelByIdAction",
			"querySalesGoodslist",
			"queryAllVendor",
			"createChannelGoodAction"
		]),
		init() {
			if (this.$route.params.channelId) {
				this.queryChannelByIdAction({
					channelId: this.$route.params.channelId
				}).then(res => {
					this.createChannelGoodParams = res;
				})
				this.querySalesGoodslist({ searchContent: "", status: 1 }).then(res => {
					if (res.result) {
						res.result.forEach(i => {
							i.channelSkuName = i.skuName;
							i.channelSkuId = String(i.skuId);
						});
						this.productList = res.result;
					}
				})
				this.queryAllVendor({}).then(res => {
					if (res && Object.keys(res).length) {
						this.vendorOptions = res;
					}
				})
			}
		},
		// 设置最低价
		minPriceChange(item) {
			if (item.minPrice < 0) {
				item.minPrice = Math.abs(item.minPrice);
			}
			if (item.maxPrice < item.minPrice) {
				item.maxPrice = item.minPrice;
			}
		},
		// 设置最高价
		maxPriceChange(item) {
			this.minPriceChange(item);
		},
		selectedVendor(item) {
			const obj = this.vendorOptions.find(
				i => i.vendorNumber === item.vendorNumber
			);
			item.originId = obj.originId
			item.vendorName = obj.vendorName
			item.originType = obj.originType
		},
		// 添加商品
		addGoodsMsg() {
			this.channelGoodList.push({
				remark: null,
				minPrice: 0,
				maxPrice: 0,
				skuId: null,
				channelSkuId: null
			});
		},
		// 设置商品信息
		selectedSetGoods(val, index) {
			const good = Object.assign(
				{},
				val,
				{ $goodMsg: val },
				{ channelId: this.createChannelGoodParams.channelId },
				{ status: 0 },
				{ minPrice: 0 },
				{ maxPrice: 0 }
			);
			this.$set(this.channelGoodList, index, good);
		},
		// 删除商品
		deleteProduct(index) {
			this.$confirm("确认删除?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			}).then(() => {
				this.channelGoodList.splice(index, 1);
				this.$message({
					type: "success",
					message: "删除成功"
				});
			}).catch(() => { });
		},
		// 提交创建订单
		submitCreateChannelGood() {
			if (this.channelGoodList.every(i => i.skuName && i.channelSkuName && i.channelSkuId && (typeof i.saleType === 'number'))) {
				for (let i = 0; i < this.channelGoodList.length; i++) {
					if (this.channelGoodList[i].saleType > 0) {
						if (this.channelGoodList[i].vendorNumber === undefined) {
							this.$message({
								type: "warning",
								message: `请选择发货方`
							})
							return false
						}
					}
				}
				const obj = {}
				obj.data = JSON.parse(
					JSON.stringify(
						this.channelGoodList
					)
				).map(i => {
					i.minPrice = i.minPrice * 100
					i.maxPrice = i.maxPrice * 100
					return i
				})
				this.createChannelGoodAction(obj).then(res => {
					if (res.code === 0) {
						this.$message({
							type: "success",
							message: `添加成功`
						})
						this.quit(routesMapping.ChannelManagement, true);
					}
				})
			} else {
				this.$message({
					type: "warning",
					message: `请填写完整信息提交`
				});
				return false;
			}

		},
		// 重置表单
		clearForm(name) {
			this.$refs[name].resetFields();
		}
	},
	watch: {
		channelGoodList: {
			handler(val) {
				if (val.length > 1) {
					outer: for (let i = 0; i < val.length - 1; i++) {
						for (let j = i; j < val.length; j++) {
							if (j === i) continue;
							if (val[j].channelSkuId && val[j].skuId && `${val[i].channelSkuId}--${val[i].skuId}` === `${val[j].channelSkuId}--${val[j].skuId}`) {
								this.$message({
									type: "error",
									message:
										"同一渠道下不能存在ngoc商品编码、渠道商品编码相同的渠道商品"
								});
								val[j].channelSkuId = undefined;
								break outer;
							}
						}
					}
				}
			},
			deep: true
		}
	}
};
</script>

