<template>
    <div class='goods-category'>
    	<div class="grade">
    		 <h4>一级类目</h4>
	         <ul>
	            <li class="active">
	            	<el-row>
	            		<el-col :span="13">
	            			<el-input size="mini" class="categoryName" :disabled="!isEdit" @blur="focusState = false" v-focus="focusState">
	            			</el-input>
	            		</el-col>
	            		<el-col :span="10" style="text-align: right">
	            			<el-button type="text" @click="editCategory" v-if="!isEdit"><i class="el-icon-edit" ></i></el-button>
	            			<el-button type="text" @click="doSaveCategory" v-else><i class="el-icon-success"></i></el-button>
	            			<el-button type="text" @click="doDeleteCategory"><i class="el-icon-delete"></i></el-button>
	            			<el-button type="text"><i class="el-icon-share"></i></el-button>
	            		</el-col>
	            	</el-row>
	            </li>
	            <li>
	            	<el-row>
	            		<el-col :span="13">电子产品</el-col>
	            		<el-col :span="10" style="text-align: right">
	            			<el-button type="text"><i class="el-icon-edit"></i></el-button>
	            			<el-button type="text"><i class="el-icon-delete"></i></el-button>
	            			<el-button type="text"><i class="el-icon-share"></i></el-button>
	            		</el-col>
	            	</el-row>
	            </li>
	            <div v-if="isAddCategoryModule">
	            	<el-col :span="16" class="addCateNameInput">
	            		<el-input v-model="cateName" size="mini" placeholder="请输入新增类目名称"></el-input>
	            	</el-col>
	            	<el-col :span="8" class="CateNameContainer"> 
	            		<el-button type="text" class="handleCfmText">确认</el-button>
	            		<el-button type="text" class="handleCancelText" @click="doCancelAddCateName">取消</el-button>
	            	</el-col>
	            </div>
	            <div class="addCategory" >
	            	<el-button class="addCategoryButton" type="primary"  size="mini" @click="doAddCategory" :disabled="doingAddCateName">新增
	            	</el-button>
	            </div> 	
	        </ul>
    	</div>
    	<div class="grade">
    		 <h4>二级类目</h4>
	         <ul>
	            <li class="active">
	            	<el-row>
	            		<el-col :span="13">化妆品</el-col>
	            		<el-col :span="10" style="text-align: right">
	            			<el-button type="text"><i class="el-icon-edit" @click="editCategory"></i></el-button>
	            			<el-button type="text"><i class="el-icon-delete"></i></el-button>
	            			<el-button type="text"><i class="el-icon-share"></i></el-button>
	            		</el-col>
	            	</el-row>
	            </li>
	             <li>
	            	<el-row>
	            		<el-col :span="13">电子产品</el-col>
	            		<el-col :span="10" style="text-align: right">
	            			<el-button type="text"><i class="el-icon-edit"></i></el-button>
	            			<el-button type="text"><i class="el-icon-delete"></i></el-button>
	            			<el-button type="text"><i class="el-icon-share"></i></el-button>
	            		</el-col>
	            	</el-row>
	            </li>
	            <div>
	            	<el-col :span="16" class="addCateNameInput">
	            		<el-input v-model="cateName" size="mini" placeholder="请输入新增类目名称"></el-input>
	            	</el-col>
	            	<el-col :span="8" class="CateNameContainer"> 
	            		<el-button type="text" class="handleCfmText">确认</el-button>
	            		<el-button type="text" class="handleCancelText">取消</el-button>
	            	</el-col>
	            </div>
	            <div class="addCategory">
	            	<el-button class="addCategoryButton" type="primary"  size="mini" @click="doAddCategory" >新增
	            	</el-button>
	            </div> 	
	        </ul>
    	</div>
    	<div class="grade">
    		 <h4>三级类目</h4>
	         <ul>
	            <li class="active">
	            	<el-row>
	            		<el-col :span="13">化妆品</el-col>
	            		<el-col :span="10" style="text-align: right">
	            			<el-button type="text"><i class="el-icon-edit"></i></el-button>
	            			<el-button type="text"><i class="el-icon-delete"></i></el-button>
	            			<el-button type="text"><i class="el-icon-share"></i></el-button>
	            		</el-col>
	            	</el-row>
	            </li>
	             <li>
	            	<el-row>
	            		<el-col :span="13">电子产品</el-col>
	            		<el-col :span="10" style="text-align: right">
	            			<el-button type="text"><i class="el-icon-edit"></i></el-button>
	            			<el-button type="text"><i class="el-icon-delete"></i></el-button>
	            			<el-button type="text"><i class="el-icon-share"></i></el-button>
	            		</el-col>
	            	</el-row>
	            </li>
	            <div>
	            	<el-col :span="16" class="addCateNameInput">
	            		<el-input v-model="cateName" size="mini" placeholder="请输入新增类目名称"></el-input>
	            	</el-col>
	            	<el-col :span="8" class="CateNameContainer"> 
	            		<el-button type="text" class="handleCfmText">确认</el-button>
	            		<el-button type="text" class="handleCancelText">取消</el-button>
	            	</el-col>
	            </div>
	            <div class="addCategory">
	            	<el-button class="addCategoryButton" type="primary"  size="mini" @click="doAddCategory" >新增
	            	</el-button>
	            </div> 	
	        </ul>
    	</div>
    </div>
</template>


<script>
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import * as C from '~/constants/api';
import MessageMixins from '~/mixins/messages'
import utils from '~/utils/misc';
import Api from '~/utils/api';
export default {
    name: 'GoodCategory',
    mixins: [MessageMixins],
    data() {
    	return {
    		cateName:'', //类目名称
    		isAddCategoryModule:false, //新增类目弹框
    		doingAddCateName:false, //是否新增类目
    		isEdit:false, 
    		focusState:false, //是否聚焦
    	}
    },
    methods:{
    	//新增
    	doAddCategory(){
    		this.isAddCategoryModule = true;
    		this.doingAddCateName = true;
    	},
    	doCancelAddCateName(){
    		this.cateName = "";
    		this.isAddCategoryModule = false;
    		this.doingAddCateName = false;
    	},
    	//编辑
    	editCategory(){
    		this.isEdit = true;
    		this.focusState = true
    	},
    	//保存
    	doSaveCategory(){
    		this.isEdit = false;
    		this.showSuccess();
    	},
    	//删除
    	doDeleteCategory(){
			  this.$confirm('此操作将永久删除, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
		        }).then(() => {
		        var roleIds = []
		        // Api.deleteRole(roleIds).then(()=>{
	         	//       this.showSuccess();
	         	//       this.refreshPage();
	         	//   })
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
	    	},
    	
    },

    //自定义指令
    directives: {
	    focus: {
	      update: function (el, {value}) {
	        if (value) {
	          el.focus()
	        }
	      }
	    }
  },
}
</script>

<style lang='scss' scoped>
  .goods-category{
  	 background-color:white;
  	 padding:20px;
  	 .grade{
  	 	width:21%;
  	 	display:inline-block;
  	 ul{
  	 	list-style:none;
  	 	border:1px solid #f5f0f0;
  	 	margin-top:20px;
  	 	height:450px;
  	 	overflow-y:scroll;
  	 	position:relative;
  	 	li{
  	 		font-size:12px;
  	 		font-weight:bold;
  	 		height:40px;
  	 		line-height:40px;
  	 		border-bottom:1px solid #f5f0f0;
  	 		padding-left: 15px;
  	 		
  	 		i{
  	 			color:lightgrey;
  	 		}
  	 	}
  	 	.addCategory{
  	 		position:absolute;
  	 		bottom:20px;
  	 		left:56px;
  	 		.addCategoryButton{
  	 			width:120px;
  	 		}
  	 	}
  	 	.CateNameContainer{
  	 		padding:5px 0px 0px 15px;
  	 	}
  	 	.addCateNameInput{
  	 		padding:10px 0px 0px 10px;
  	 	}
  	 	.handleCfmText{
  	 		font-size:12px;
  	 	}
  	 	.handleCancelText{
  	 		font-size:12px;
  	 		color:grey;
  	 	}
  	 }
  }
}
	.el-input--mini .el-input__inner {
	    height: 28px;
	    border: none;
    }
    .el-input.is-disabled .el-input__inner{
    	border: none;
    }
	.active{
		background-color:rgba(211, 211, 211, 0.19);
		border-left:3px solid #2db7f5;
	}
	.el-button+.el-button{
		margin-left:0px;
	}
</style>
