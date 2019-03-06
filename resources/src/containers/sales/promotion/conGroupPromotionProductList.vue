<template>

<el-tabs v-model="tabName" type="border-card">
	<el-tab-pane label="促销条件" name="first">
		<div class="addProduct" style="margin-bottom:10px">
			<el-button plain size="mini" @click="addMsgOne"><i class="el-icon-plus"></i>新增促销条件</el-button>
		</div>
		<table class="native-table-show">
				<thead>
						<tr class="thead-tr-show">
							<th width="200" style="padding-left:15px">商品名称</th>
							<th width="100">SKU编码</th>
							<th width="100">数量</th>
							<th width="100">金额</th>
							<th width="10"></th>
						</tr>
				</thead >
				<tbody>
						<tr v-for="(one,index) in checkProductList2" :key="index" class="tbody-tr-show">
								<!--商品名称-->
								<td>
										<el-select v-model="one.skuName"
												style="width: 200px;padding-left: 13px"
												:multiple="false"
												filterable
												clearable
												size="small"
												popper-class="max-length"
												placeholder="请选择或输入商品的名字"
												@clear="clearSkuId(index)"
												@change="getContractInfo"
												@blur="getBlur(index)"
												class="text-dash-show"
												>
												<el-option
														v-for="(item) in contractList"
														:key="item.skuId"
														:label="item.skuName"
														:value="item.skuId">
												</el-option>
										</el-select>
								</td>
								<!--SKU编码-->
								<td>
									<el-input class="table-input" size="small" type="number" v-model="one.skuId" placeholder="SKU编码" disabled></el-input>
								</td>
								<!--数量-->
								<td>
									<el-input class="table-input" size="small" type="number" v-number-decimal-only v-model="one.buyCount" :min="0" placeholder="请输入数量" v-if="promotionType == 0"></el-input>
									<el-input class="table-input" size="small" type="number" placeholder="--" v-else disabled></el-input>
								</td>
								<!--金额-->
								<td>
									<el-input class="table-input" size="small" type="number" v-number-decimal-only v-model="one.buyTotal" :min="0" placeholder="请输入金额" v-if="promotionType == 1"></el-input>
									<el-input class="table-input" size="small" type="number" placeholder="--" v-else disabled></el-input>
								</td>
								<td>
									<div class="table-operation">
										<div class="iconfont1 icon-shanchuhang" @click="deleteProduct(index, 'sec')"></div>
									</div>
								</td>
						</tr>
				</tbody>
		</table>
	</el-tab-pane>
	<el-tab-pane label="促销结果" name="second" v-if="!isBillPro">
		<div class="addProduct" style="margin-bottom:10px">
			<el-button plain size="mini" @click="addMsgTwo"><i class="el-icon-plus"></i>新增促销结果</el-button>
		</div>
		<table class="native-table-show">
				<thead>
						<tr class="thead-tr-show">
							<th width="200" style="padding-left:15px">商品名称</th>
							<th width="100">SKU编码</th>
							<th width="100">优惠类型</th>
							<th width="100">价格</th>
							<th width="100">折扣</th>
						</tr>
				</thead >
				<tbody>
						<tr v-for="(one,index) in checkProductList" :key="index" class="tbody-tr-show">
								<!--商品名称-->
								<td>
									<el-select v-model="one.skuName"
											style="width: 150px;padding-left: 13px"
											:multiple="false"
											filterable
											clearable
											size="small"
											popper-class="max-length"
											placeholder="请选择或输入商品的名字"
											@clear="clearSkuId2(index)"
											@change="getContractInfo2"
											@blur="getBlur2(index)"
											class="text-dash-show"
											>
											<el-option
													v-for="(item) in contractList2"
													:key="item.skuId"
													:label="item.skuName"
													:value="item.skuId">
											</el-option>
									</el-select>
								</td>
								<!--SKU编码-->
								<td>
									{{one.skuId}}
								</td>
								<!--优惠类型-->
								<td>
									<el-select v-model="one.descType" size="small" placeholder="请选择" @change="clearValue(index)">
											<el-option :value="0" label="按优惠价"></el-option>
											<el-option :value="1" label="按优惠折扣"></el-option>
									</el-select>
								</td>
								<!--价格-->
								<td>
									<el-input class="table-input" size="small" type="number" v-number-decimal-only v-model="one.descPrice" v-if="one.descType === 0"></el-input>
									<span v-else>--</span>
								</td>
								<!--折扣-->
								<td>
									<el-input class="table-input" size="small" type="number" v-number-decimal-only v-model="one.descRate" v-if="one.descType === 1"></el-input>
									<span v-else>--</span>
								</td>
								<td>
										<div class="table-operation" min-width="100">
												<div class="iconfont1 icon-shanchuhang" @click="deleteProduct(index, 'first')"></div>
										</div>
								</td>
						</tr>
				</tbody>
		</table>
	</el-tab-pane>
</el-tabs>


</template>

<script>
	import {mapActions, mapState} from 'vuex';
	import MessageMixins from '~/mixins/messages';
	import { directives } from '~/utils/directives/index'
	import {routesMapping} from '~/router';
	export default {
			name: "conGroupPromotionProductList",
			mixins: [MessageMixins],
			props:{
				checkProductList:{
					type: Array,
							required: false,
							default: [{}]
				},
				checkProductList2:{
					type: Array,
							required: false,
							default: [{}]
				},
				isBillPro: {
				},
				promotionType: {
				}
			},
			data(){
				return {
					tabName: 'first',
					contractList: [],
					contractList2: [],
					currentIndex: '',
					currentIndex2: ''
				}
			},
			mounted(){
					this.contractFilter2()
					this.contractFilter()
			},
			methods:{
					...mapActions(["SearchGoodsList","querySkuCodeByProductName"]),
					contractFilter2(){
						this.querySkuCodeByProductName().then(res => {
							this.contractList2 = res.result;
						});
						
					},
					getBlur2(index) {
						this.currentIndex2 = index
          },
					getContractInfo2(val){
						let outIndex2 = this.currentIndex2
						this.contractList2.forEach((item, index) => {
							if (item.skuId == val) {
								this.checkProductList[outIndex2].skuId = item.skuId
								this.checkProductList[outIndex2].skuName = item.skuName
							}
						})
					},

					contractFilter(){
							this.querySkuCodeByProductName().then(res => {
								this.contractList = res.result;
							});
						
					},
					getBlur(index) {
						this.currentIndex = index
          },
					getContractInfo(val){
						let outIndex = this.currentIndex
						this.contractList.forEach((item, index) => {
							if (item.skuId == val) {
								this.checkProductList2[outIndex].skuId = item.skuId
								this.checkProductList2[outIndex].skuName = item.skuName
							}
						})
					},

					clearValue (outIndex) {
						this.checkProductList[outIndex].descPrice = 0
						this.checkProductList[outIndex].descRate = 0
					},

					addMsgOne(){
						this.checkProductList2.push({skuId:null,skuName:null});
					},
					addMsgTwo(){
						this.checkProductList.push({skuId:null,skuName:null});
					},

					clearSkuId2(index){
							this.$set(this.checkProductList,index,{})
					},
					clearSkuId(index){
							this.$set(this.checkProductList2,index,{})
					},
					
					deleteProduct(index, type){
							this.$confirm('确认删除?', '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									type: 'warning'
							}).then(() => {
								if (type == 'first') {
									this.checkProductList.splice(index, 1);
								} else if (type == 'sec') {
									this.checkProductList2.splice(index, 1);
								}
									this.showSuccess();
							}).catch(() => {
									this.$message({
											type: 'info',
											message: '已取消删除'
									});
							});
					},
			},
			watch: {
				'isBillPro': function () {
					if( this.isBillPro == false || (this.isBillPro == true && this.tabName == "second")) {
						this.tabName = "first"
					}
				}
			}
	}
</script>

<style scoped>

</style>
