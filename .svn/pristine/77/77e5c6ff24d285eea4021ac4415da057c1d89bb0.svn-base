<template>

<el-tabs v-model="tabName" type="border-card">
	<el-tab-pane label="赠劵信息" name="first">
		<div class="addProduct" style="margin-bottom:10px">
			<el-button plain size="mini" @click="addMsgOne"><i class="el-icon-plus"></i>新增赠劵信息</el-button>
		</div>
		<table class="native-table-show">
				<thead>
						<tr class="thead-tr-show">
							<th width="200" style="padding-left:15px">满足金额</th>
							<th width="100">赠劵金额</th>
							<th width="100">有效期开始时间</th>
							<th width="120">有效期结束时间</th>
						</tr>
				</thead >
				<tbody>
						<tr v-for="(one,index) in checkProductList" :key="index" class="tbody-tr-show">
								<!--满足金额-->
								<td>
									<el-input class="table-input" size="small" type="number" v-number-decimal-only v-model="one.needTotal" :min="0" placeholder="请输入金额"></el-input>
								</td>
								<!--赠劵金额-->
								<td>
									<el-input class="table-input" size="small" type="number" v-number-decimal-only v-model="one.descTotal" :min="0" placeholder="请输入金额"></el-input>
								</td>
								<!--有效期开始时间-->
								<td>
									<el-date-picker
											size="small"
											:editable="false"
											value-format="yyyy-MM-dd HH:mm:ss"
											class="row_width"
											v-model="one.beginTime"
											type="datetime"
											placeholder="选择开始时间">
									</el-date-picker>
								</td>
								<!--有效期结束时间-->
								<td>
									<el-date-picker
											value-format="yyyy-MM-dd HH:mm:ss"
											type="datetime"
											size="small"
											:editable="false"
											class="row_width"
											v-model="one.endTime"
											placeholder="选择结束时间">
									</el-date-picker>
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
	<el-tab-pane label="使用范围" name="second" v-if="isCtrlUseArea">
		<div class="addProduct" style="margin-bottom:10px">
			<el-button plain size="mini" @click="addMsgTwo"><i class="el-icon-plus"></i>新增使用范围</el-button>
		</div>
		<table class="native-table-show">
				<thead>
						<tr class="thead-tr-show">
							<th width="200" style="padding-left:15px">商品名称</th>
							<th width="100">SKU编码</th>
						</tr>
				</thead >
				<tbody>
						<tr v-for="(one,index) in checkProductList2" :key="index" class="tbody-tr-show">
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
									{{one.skuId}}
								</td>
								<td>
									<div class="table-operation" min-width="100">
										<div class="iconfont1 icon-shanchuhang" @click="deleteProduct(index, 'sec')"></div>
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
			name: "presentPromotionProductList",
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
				isCtrlUseArea: {
				}
			},
			data(){
				return {
					tabName: 'first',
					contractList: [],
					bgTime: '',
					edTime: '',
					currentIndex: ''
				}
			},
			mounted(){
				this.contractFilter()
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				if (month < 10) {
						month = "0" + month;
				}
				if (day < 10) {
						day = "0" + day;
				}
				var nowDate = year + "-" + month + "-" + day;
				this.bgTime = nowDate + ' 00:00:00';
				this.edTime = nowDate + ' 23:59:59';
			},
			methods:{
					...mapActions(["SearchGoodsList","querySkuCodeByProductName"]),
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
					addMsgOne(){
						this.checkProductList.push({needTotal:null,descTotal:null,beginTime:this.bgTime,endTime:this.edTime});
					},
					addMsgTwo(){
						this.checkProductList2.push({skuId:null,skuName:null});
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
				'isCtrlUseArea': function () {
					if( this.isCtrlUseArea == false || (this.isCtrlUseArea == true && this.tabName == "second")) {
						this.tabName = "first"
					}
				}
			}
	}
</script>

<style scoped>

</style>
