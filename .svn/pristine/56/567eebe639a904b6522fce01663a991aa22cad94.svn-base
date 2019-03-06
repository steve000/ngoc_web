<template>
    <div class='section-unit'>

    	<div class="unitTab">
    		<div class="addUnit" >
        		<router-link to='units/addUnit'><el-button ><i class="el-icon-plus"></i> 新增单位</el-button></router-link>
        	</div>
        	<dynamic-table
                :data='unitList.result'
                :pageNo='unitList.pageNo'
                :total='unitList.total'
                @pagination='onPagiation'
			    >
			    <el-table-column prop="unitId" label="单位ID">
			    </el-table-column>
			    <el-table-column prop="basicUnitName"  label="单位名称">
			    </el-table-column>
			    <el-table-column prop="basicUnitValue"  label="基本单位">
			    </el-table-column>
			    <el-table-column label="操作" >
				    <template slot-scope="scope">
				        <span class="handleIcon" @click="oNEdit(scope.row)">
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
    </div>
</template>




<script>
	import {mapActions, mapState} from 'vuex'
    import MessageMixins from '~/mixins/messages'
    import Api from '~/utils/api';
    import DynamicTable from '~/components/DynamicTable'
    import Modal from '~/components/Modal'
	export default {
	    name: 'GoodsUnit',
	    mixins: [MessageMixins],
        components: {
            DynamicTable,
            Modal
        },
        beforeMount(){
            this.refreshPage();
        },
	    methods: {
            ...mapActions(['goodsConfigUnitQuery', 'showPageLoading', 'hidePageLoading']),
            onPagiation(pageNo) {
                this.refreshPage({pageNo})
            },
            refreshPage(otherParams = {}){
                const params = {...otherParams}
                this.showPageLoading()
                this.goodsConfigUnitQuery(params).then(this.hidePageLoading)
		    },
		    //编辑
		    oNEdit(val){
            	console.log(val,'这是编辑')
            },
            //单个删除信息
            onDeleteSingle(val){
            	console.log(val,'删除')
            },
            isLock(val){
            	console.log(val,'禁用')
            }
        },
        computed: {

            ...mapState({
                unitList: ({goodsConfigUnit}) => goodsConfigUnit.unitList
            }),

        },

	}
</script>




<style lang='scss'>
.section-unit{
	.addUnit{
		margin:2% 0;
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
