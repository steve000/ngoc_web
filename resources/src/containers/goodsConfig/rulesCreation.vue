<template>
    <div class='goodsRulesCreation'>
    	<div>
    		<el-button type="primary" size="small" @click="back">返回</el-button>
    		<el-button type="primary" size="small">保存</el-button>
    	</div>
        <div class="addPropertiesContainer">
        	<el-form ref="form" :model="addPropertiesForm" label-width="80px" :inline="true" class="addPropertiesFormBorder">
    			 <el-form-item label="规格id">
    			 	<el-col :span="20">
    			 		<el-input v-model="addPropertiesForm.attributeId" size="small" placeholder="不填系统自动分配"></el-input>
    			 	</el-col>
				 </el-form-item>
			    <el-form-item label="规格名称">
			    	<el-col :span="20">
			   			 <el-input v-model="addPropertiesForm.standardName" size="small"></el-input>
		   			</el-col>
			 	</el-form-item>
        	</el-form>
        	<div class="propertyName" v-for="(item,index) in PropertyFormArray" :key="index">
	        		<el-form ref="form" :model="PropertyForm" label-width="80px" class="propertyNameForm">
	        			<el-form-item label="属性名:">
	        				<el-col :span="23">
			        			  <el-select v-model="PropertyForm.propertyName" placeholder="请选择" size="small">
									    <el-option
									      v-for="val in options"
									      :key="val.value"
									      :label="val.label"
									      :value="val.value">
									    </el-option>
								  </el-select>
							</el-col>
							<el-col :span="1" >
								<el-button class="el-icon-delete" type="text" @click="deleteProperty()"></el-button>
							</el-col>
					  </el-form-item>
	        		<div class="addPropertiesValue" v-if="!PropertiesValue">
	        			<el-button icon="el-icon-plus" size="small" type="primary" class="addPropertiesValueBtn" @click="doAddPropertiesValue">添加属性值
	        			</el-button>
	        		</div>
	        		<div v-if="PropertiesValue">
	        			<el-form-item label="属性值:">
        					<el-col :span="2" class="PropertiesValueBox" v-if="!FirstProperty">
	        					<el-input size="mini"></el-input>
	        					<el-button type="text"class="delete-btn" @click="deleteFirstPropertyValue()"></el-button>
	        				</el-col>
	        				<el-col :span="2" class="PropertiesValueBox PropertiesValueItem" v-for="(item,index) in PropertyForm.PropertyValueList" :key="index">
	        					<el-input size="mini"></el-input>
	        					<el-button type="text"class="delete-btn" @click="deletePropertyValue(index)"></el-button>
	        				</el-col>
	        				<el-col :span="2" style="margin-left:10px">
	        					<el-button type="text" @click="doAddValue()">添加属性值</el-button>
	        				</el-col>
	        			</el-form-item>
	        		</div>
    			</el-form>
       		 </div>
        	<div class="addProperty">
        		<el-button icon="el-icon-plus" size="small" type="primary" @click="doAddProperties()">添加属性
        		</el-button>
        		
        	</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'GoodRulesCreation',
    data(){
    	return {
    		addPropertiesForm:{
    			attributeId:'',
    			standardName:''
    		},
    		PropertyFormArray:[],
    		PropertyForm:{
    			propertyName:'',
    			PropertyValueList: [],
    		},
    		options:[{
    			value:1,
    			lable:'颜色',
	    		}],
	    	PropertiesValue:false,  //添加属性值(大)
	    	FirstProperty:false,
    	}
    },
    methods:{
    	//返回
		back(){
	      this.$router.back();
		},
		//添加属性
		doAddProperties(){
			const item = {}
			this.PropertyFormArray.push(item)
            // this.$set()
		},
		//添加属性值(大按钮)
		doAddPropertiesValue(){
			this.PropertiesValue = true;
           
		},
		//添加属性值(小字)
		doAddValue(){
			const item = {};
		    this.PropertyForm.PropertyValueList.push(item)
            // this.$set(item)
		},
		//删除属性
		deleteProperty(index){
			this.PropertyFormArray.splice(index,1)
		},
		//删除属性值(小)
		deletePropertyValue(index){
			this.PropertyForm.PropertyValueList.splice(index,1)
		},
		// 删除第一个属性值(小)
		deleteFirstPropertyValue(){
			this.FirstProperty = true;
		}

	}
}
</script>
<style lang='scss'>
.goodsRulesCreation{
	.addPropertiesContainer{
		margin-top:20px;
		padding:20px 0px 20px 0px;
		background-color:white;
		.addPropertiesFormBorder{
			border-bottom:1px solid lightgrey;
		}
		.propertyName{
			padding:15px;
			.propertyNameForm :hover .el-icon-delete{
					display:block
				}
			.propertyNameForm {
				height: 100%;
				background-color:rgba(245, 245, 245, 0.65);
				padding:20px 0px 20px 0px;
			
				.addPropertiesValue{
					padding-left:20px;
					.addPropertiesValueBtn{
						width:100px;
						text-align:center;
					}
				}
				.PropertiesValueBox:hover .delete-btn{
					display:block;
				}
				.PropertiesValueBox{
					position:relative;
					.delete-btn{
						display:none;
				        height: 10px;
				        width: 10px;
				        background: url(../../layouts/images/close-red.png) no-repeat;
				        background-size: contain;
				        border: none;
				        outline: none;
				        position: absolute;
			            right: -4px;
    					top: 5px;
					}
				}
				.PropertiesValueItem{
					margin-left:10px;
				}
				.PropertiesValueMargin{
						margin-left:10px;
					}
				.el-icon-delete{
					color:lightgrey;
					display:none;
				}
			}
	
		}
		.addProperty{
			padding-left: 34px;
			padding-top:10px;
		}
	}
}
</style>
