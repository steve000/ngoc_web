<template>
    <div class='goods-brand'>

        <div class="brandTab">
        	<div class="addBrand" >
        		<router-link to='bands/addbrand'><el-button ><i class="el-icon-plus"></i> 新增品牌</el-button></router-link>
        	</div>
        	<dynamic-table
                :data='goodList.result'
                :pageNo='goodList.pageNo'
                :total='goodList.total'
                @pagination='onPagiation'
			    >
			    <el-table-column prop="username" label="品牌ID">
			    </el-table-column>
			    <el-table-column prop="username"  label="品牌名称">
			    </el-table-column>
			    <el-table-column label="操作" >
				    <template slot-scope="scope">
				        <span class="handleIcon" @click="oNEdit(scope.row)" >
							<el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
						      <i class="el-icon-edit-outline"></i>
						    </el-tooltip>
					    </span>
				        <span class="handleIcon" @click="onDeleteSingle(scope.row)">
				        	<el-tooltip class="item" effect="dark" content="删除" placement="top-start">
						      <i class="el-icon-delete"></i>
						    </el-tooltip>
				        </span>
				        <span class="handleIcon" @click="isLock(scope.row)">
				        	<el-tooltip class="item" effect="dark" content="禁用" placement="top-start">
						      <i class="el-icon-goods"></i>
						    </el-tooltip>
				        </span>
				        







				    </template>
				</el-table-column> 
			</dynamic-table>
        </div>

        
        <el-dialog title="编辑品牌" :visible.sync="isPlayBrandEdit">
			<el-form :model="EditBrand">
			    <el-form-item label="品牌中文名" :label-width="EditBrandLabelWidth">
			      <el-input v-model="EditBrand.brandCnName" auto-complete="off"></el-input>
			    </el-form-item>
			     <el-form-item label="品牌英文名" :label-width="EditBrandLabelWidth">
			      <el-input v-model="EditBrand.brandEnName" auto-complete="off"></el-input>
			    </el-form-item>
			   
			</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="isPlayBrandEdit = false">取 消</el-button>
			    <el-button type="primary" @click="isPlayBrandEdit= false">保 存</el-button>
			</div>
		</el-dialog>
    </div>
</template>


<script>
	import {mapActions, mapState} from 'vuex'
    import MessageMixins from '~/mixins/messages'
    import Api from '~/utils/api';
    import DynamicTable from '~/components/DynamicTable'
    import Modal from '~/components/Modal'
	export default {
	    name: 'GoodBands',
	    mixins: [MessageMixins],
        components: {
            DynamicTable,
            Modal
        },
        data(){
        	return {
        		isPlayBrandEdit:false,
        		EditBrandLabelWidth:"120px",
        		EditBrand:{
        			brandCnName:'',
        			brandEnName:'',
        			brandId:''

        		}

        	}
        },
        beforeMount(){
            this.refreshPage();
        },
	    methods: {
            ...mapActions(['goodsConfigBrand', 'showPageLoading', 'hidePageLoading']),
            onPagiation(pageNo) {
                this.refreshPage({pageNo})
            },
            refreshPage(otherParams = {}){
                const params = {...otherParams}
                this.showPageLoading()
                this.goodsConfigBrand(params).then(this.hidePageLoading)
		    },
		    //编辑
		    oNEdit(val){
            	console.log(val,'这是编辑')
            	//@click="dialogFormVisible = true"
            	this.isPlayBrandEdit = true;
            },
            //单个删除信息
            onDeleteSingle(val){
            	this.$confirm('此操作将会删除该条数据, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	console.log('删除成功')
            		
		        }).catch(() => {
		            console.log('取消删除')
		        });
            },
            isLock(val){
            	console.log(val,'禁用')
            }
        },
        computed: {

            ...mapState({
                goodList: ({goodsConfigBrand}) => goodsConfigBrand.brands
            }),

        },

	}
</script>

<style lang='scss'>

	.goods-brand {
		.brandTab{
			background-color:#fff;
			.addBrand{
				.el-button{
					margin:2% 0;
				}
				
			}

		}
		
		.el-table{
			th{
				background-color:#F2F8FF;
			}
		} 

		.cell{
			text-align:center;
			.handleIcon{
				width: 30px;
			    border: 1px solid #dcdcdc;
			    line-height: 30px;
			    text-align: center;
			    height: 30px;
			    display: inline-block;
			    border-radius: 50%;
			    font-size: 16px;
			}

		}

	}


	
	





</style>
