<template>
    <div class='goods-view detailsBigBox'>
    	<el-row  class="DetailsLeftBox">
            <div class="viewLeftTop">
                <el-row >
                    <div>
                        <h4 class="order">采购单号：12345678</h4>
                    </div>
                </el-row>
                <el-row class="headerProductName">
                	<p>商品名称：kindle白色名称有点长kindle白色名称有点长</p>
                	<p>
                		<span>总库存：100 <el-button type="text" @click="goManage">详情</el-button></span>
                	<span>30天销量：100</span>
                	</p>
            	</el-row>
            </div>
                <el-tabs v-model="activeTabName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="商品规格" name="first">
                    	<div>
                    		<ul class="ul">
                    			<li style="width:25%;line-height:28px;" v-for="item in goodsSpeice">{{item.name}}：<span class="color3">{{item.value}}</span></li>
                    		</ul>
                    	</div>
                    </el-tab-pane>
                    <el-tab-pane label="中移物流属性" name="second">
                      <el-row class="zhongyiTab">
                      		<el-col :span="5">是否需要中移物流仓库管理：<span class="color3">是</span></el-col>
                      		<el-col :span="5" :offset="3">中移物流商品编码：<span class="color3">12345678</span></el-col>
                      </el-row>
                      <el-row class="zhongyiTab">
                      		<el-col :span="5">是否需要串码管理：<span class="color3">是</span></el-col>
                      		<el-col :span="5" :offset="3">物料计费类型：<span class="color3"> 有价卡券</span></el-col>
                      </el-row>
                      <el-row class="zhongyiTab">
                      		<el-col :span="5">毛重：<span class="color3">300g</span></el-col>
                      		<el-col :span="5" :offset="3">体积：<span class="color3">38cm3</span></el-col>
                      </el-row>
                    </el-tab-pane>
                </el-tabs>
        </el-row>
         <el-row class="DetailsRightBox" >
            <h3>基本信息</h3>
            <el-form :modle="goodsBasicData" label-position="left" class="TotalBasic">
                    <el-form-item label="单位：">
                        <span>部</span>
                    </el-form-item>
                    <el-form-item label="零售价（元）：">
                       <span>1000</span>
                    </el-form-item>
                    <el-form-item label="成本价（元）：">
                       <span>700</span>
                    </el-form-item>
                    <el-form-item label="类型：">
                       <span>智能硬件  智能电子类</span>
                    </el-form-item>
                    <el-form-item label="品牌：">
                       <span>咪咕</span>
                    </el-form-item>
                    <el-form-item label="商品描述：">
                       <span>商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述</span>
                    </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>
<script>
 	import {mapActions, mapState} from 'vuex'
    import PlatformMixins from '~/mixins/platform'
    import QuitMixins from '~/mixins/quit'
	import {routesMapping} from '~/router'
	export default {
		name: 'ViewGoods',
	    mixins: [PlatformMixins,QuitMixins],
	    data() {
	      	return {
	      		activeTabName: 'first',
	      		goodsBasicData:'',
	      		goodsSpeice:[{name:"规格名称",value:'规格值'},{name:"规格名称",value:'规格值'},{name:"规格名称",value:'规格值'},{name:"规格名称",value:'规格值'},{name:"规格名称",value:'规格值'},{name:"规格名称",value:'规格值'}],
	      		skuId:123456,
	        }
	    },
		activated() {
		},
        mounted(){
	    },
		computed: {
            ...mapState({
                cataList:({cate})=>cate.cateAll,
            }),
        },
	    methods: {
	    	...mapActions(["queryGoodsInfoModify","queryAllBrands","queryCateAll","showPageLoading","hidePageLoading","queryGoodsListSku"]),
	    	refreshPage(){;
	        },
	        handleClick(tab, event) {},
	        goManage(){
	        	console.log("去库存管理")
	         	//this.$router.push(`/stock/management${this.skuId}`)
	        }
	    }
    }
</script>
<style lang='scss'>
	.goods-view{
		padding:20px 20px 0 20px;
		.headerProductName{
			padding-top:10px;
		}
		.ul li{
			float:left;
			color:#666666;
		}
		.zhongyiTab{
			color:#666666;
			margin-top:18px;
		}
		.color3{
			color:#333333;
		}
	}
</style>
<style lang='scss' scope>
	.procurements-config-wrapper{
		overflow:inherit;
	}
</style>
