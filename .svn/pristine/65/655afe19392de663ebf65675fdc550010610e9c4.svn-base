<template>
    <div class='goods-addbrand'>
    	<div class="addBrand-btn">
    		<el-button @click="onReturnBtn()">返回</el-button>
    		<el-button @click="onSaveAddBrand()">保存</el-button>
    	</div>
        <div class='addBrand-box'>
        	<el-form :model="addBrand"  ref="addBrand" label-width="100px" >
				<el-form-item label="品牌ID" prop="brandId">
				   <el-input placeholder="不填系统自动分配" v-model="addBrand.brandId" ></el-input>
				</el-form-item>

				<el-form-item label="品牌名称:" prop="bandName">
				   <el-input v-model="addBrand.bandName" ></el-input>
				</el-form-item>
			</el-form>
        	
        </div>
    </div>
</template>


<script>
export default {
    name: 'GoodAddBrand',
    data() {
    	return {
    		addBrand:{
    			brandId:'',
    			bandName:''

    		}
    	}
    },
    methods: {
    	//返回上一页
    	onReturnBtn(){
    		this.$router.go(-1)
    	},
    	//保存新增的品牌数据
    	onSaveAddBrand(){
    		console.log(this.addBrand,'新增品牌的数据')
    	}
    }
    
}
</script>

<style lang='scss'>
.goods-addbrand{
	.addBrand-btn{
		text-align:right;
		margin-bottom:1%;
		.el-button{
			padding-left: 3%;
			padding-right: 3%;
		}
		
	}
	.addBrand-box{
		background-color: #fff;
    	overflow: hidden;
		.el-form-item{
			margin:2% 0;
			width:50%;
			float:left;
			.el-input{
				width:80%;
			}
		}

	}

}
	
</style>
