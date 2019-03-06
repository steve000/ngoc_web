<template>
    <div class='goods-addUnit'>
    	<div class="addUnit-btn">
    		<el-button @click="onReturnBtn()">返回</el-button>
    		<el-button @click="onSaveaddUnit()">保存</el-button>
    	</div>
        <div class='addUnit-box'>
        	<el-form :model="addUnit"  ref="addUnit" label-width="100px" >
				<el-form-item label="单位ID" prop="brandId">
				   <el-input placeholder="不填系统自动分配：" v-model="addUnit.brandId" ></el-input>
				</el-form-item>

				<el-form-item label="计量单位名称:" prop="bandName">
				   <el-input v-model="addUnit.bandName" ></el-input>
				</el-form-item>
                <el-form-item label="基本单位:" prop="basicUnit">
                   <el-input v-model="addUnit.basicUnit" ></el-input>
                </el-form-item>
			</el-form>
        	
        </div>
        <div class="addAuxiliaryUnit" @click="onAddAuxiliaryUnit()" v-if="isVisibleAuxiliaryBtn" >
            <el-button ><i class="el-icon-plus"></i> 添加辅助单位</el-button>
        </div>
        <div v-if="isVisibleAuxiliaryTab" class="Tab-Box">
            <div class="addAuxiliaryUnitTab">
               <dynamic-table
                    :data='addAuxiliaryUnit' style="width:100%;">
                    <el-table-column prop="AuxiliaryUnit" label="辅助单位">
                    </el-table-column>
                    <el-table-column prop="symbol" label="=">
                    </el-table-column>
                    <el-table-column prop="value" label="值">
                    </el-table-column>
                    <el-table-column prop="basicUnit" label="基本单位">
                    </el-table-column>
                </dynamic-table> 
            </div>
            <div class="againAddAuxiliaryUnit" @click="onAgainAdd()">添加辅助单位</div>
            
        </div>




    </div>
</template>


<script>
    import DynamicTable from '~/components/DynamicTable'
    export default {
        name: 'GoodaddUnit',
        components: {
            DynamicTable
        },
        data() {
        	return {
        		addUnit:{
        			brandId:'',
        			bandName:'重量',
                    basicUnit:'克'

        		},
                //是否显示辅助计量单位的表格
                isVisibleAuxiliaryBtn:true,
                isVisibleAuxiliaryTab:false,
                
                //新增的辅助计量单位
                addAuxiliaryUnit: [
                {AuxiliaryUnit:"千克",symbol:"=",value:"11.00",basicUnit:'克'},
                    
                ]
              
        	}
        },
        methods: {
        	//返回上一页
        	onReturnBtn(){
        		this.$router.go(-1)
        	},
        	//保存新增单位数据
        	onSaveaddUnit(){
        		console.log(this.addUnit,'新增单位的数据')
        	},
            onAddAuxiliaryUnit(){
                 this.isVisibleAuxiliaryBtn = false;
                 this.isVisibleAuxiliaryTab = true;
            },
            onAgainAdd(){
                //console.log(this.addAuxiliaryUnit.push())
                let newAddUnitObj = {};
                newAddUnitObj.AuxiliaryUnit = "毫克",
                newAddUnitObj.symbol = "=",
                newAddUnitObj.value = "0.02",
                newAddUnitObj.basicUnit = "克",
                this.addAuxiliaryUnit.push(newAddUnitObj)
                console.log(this.addAuxiliaryUnit)



            }

        }
        
    }
</script>

<style lang='scss'>
.goods-addUnit{
	.addUnit-btn{
		text-align:right;
        margin-bottom:1%;
		.el-button{
			padding-left: 3%;
			padding-right: 3%;
		}
		
	}
    .el-table{
        th{
            background-color:#F2F8FF;
        }
        .cell{
            text-align:center;
        }
    } 
	.addUnit-box, .addAuxiliaryUnit{
		background-color: #fff;
    	overflow: hidden;
		.el-form-item{
			margin:2% 0;
			width:33%;
			float:left;
			.el-input{
				width:80%;
			}
		}

	}
    .addAuxiliaryUnit{
        background-color: #fff;
        overflow: hidden;
        margin:1% 0;
        padding:2% 0;
    }
    .addAuxiliaryUnitTab{
        width:80%;


    }
    .againAddAuxiliaryUnit{
        width:15%;
        color:blue;
        cursor: pointer;

    }
    .againAddAuxiliaryUnit, .addAuxiliaryUnitTab{
        float:left;
        margin:2% 0;
    }
}
	
</style>
