<template>
    <div class='procurements-category'>
  <!--   	<div class="left">
    		<el-tree :data="data" :label="data.text" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    	</div>
    	<div class="right" style="width:70%;height:500px"> -->
    		<dynamic-table
			    :data='users1.result'
			    :pageNo='users1.pageNo'
			    :total='users1.total'
                @pagination='onPagiation'
			    style="width: 100%">
			    <el-table-column prop="username" label="姓名" width="180">
			    </el-table-column>
			    <el-table-column
			        prop="utype"
			        label="用户类型"
			        width="180">
			        <template slot-scope="scope">
			        	<span v-if="scope.row.utype == 0">超级管理员</span>
			        	<span v-if="scope.row.utype == 1">系统管理员</span>
			        	<span v-if="scope.row.utype == 2">管理员</span>
			        	<span v-if="scope.row.utype == 3">普通用户</span>
			        </template>
			    </el-table-column>
			    <el-table-column
			        prop="status"
			        label="地址"
			        width="180">
			        <template slot-scope="scope">
			        	<span v-if="scope.row.status == 0">未启用</span>
			        	<span v-if="scope.row.status == 1">启用</span>
			        	<span v-if="scope.row.status == 2">禁用</span>
			        	<span v-if="scope.row.status == 3">锁定</span>
			        	<span v-if="scope.row.status == 4">删除</span>
			        </template>
			    </el-table-column>
			</dynamic-table>
		<!-- </div> -->
    </div>
</template>


<script>
 	import {mapActions, mapState} from 'vuex'
	import DynamicTable from '~/components/DynamicTable'

export default {
    name: 'ProcurementsCategory',
    components: {
        DynamicTable,
    },
    data() {
        return {
	        tableData: [{
	            date: '2016-05-02',
	            name: '王小虎',
	            address: '上海市普陀区金沙江路 1518 弄'
	          }, {
	            date: '2016-05-04',
	            name: '王小虎',
	            address: '上海市普陀区金沙江路 1517 弄'
	          }, {
	            date: '2016-05-01',
	            name: '王小虎',
	            address: '上海市普陀区金沙江路 1519 弄'
	          }, {
	            date: '2016-05-03',
	            name: '王小虎',
	            address: '上海市普陀区金沙江路 1516 弄'
	        }],
	        data: [
	        	{
		          label: '一级 1',
		          children: [{
		            label: '二级 1-1',
		            children: [{
		              label: '三级 1-1-1'
		            }]
		          }]
		        }, {
		          label: '一级 2',
		          children: [{
		            label: '二级 2-1',
		            children: [{
		              label: '三级 2-1-1'
		            }]
		          }, {
		            label: '二级 2-2',
		            children: [{
		              label: '三级 2-2-1'
		            }]
		          }]
		        }, {
		          label: '一级 3',
		          children: [{
		            label: '二级 3-1',
		            children: [{
		              label: '三级 3-1-1'
		            }]
		          }, {
		            label: '二级 3-2',
		            children: [{
		              label: '三级 3-2-1'
		            }]
		          }]
		        }
	        ],
	        defaultProps: {
	          children: 'children',
	          label: 'label'
	        }
        }
    },
    beforeMount(){
        this.refreshPage();
    },
    methods: {
    	...mapActions(['procurementsList','showPageLoading', 'hidePageLoading']),
	    handleNodeClick(data) {
	        console.log(data);
	    },
	    refreshPage(otherParams = {}){
	        const params = {...otherParams}
	        this.showPageLoading()
	        this.procurementsList(params).then(this.hidePageLoading)
	    },
	    onPagiation(pageNo) {
	    	console.log(pageNo)
                // this.userIds = []
                // this.refreshPage({pageNo})
        },
    },
    computed: {
        ...mapState({
            users1: ({procurementsIndex}) => procurementsIndex.procurementsList
        }),

        
    },
}
</script>

<style lang='scss'>
	.procurements-category{
		.left, .right{
			float:left;

		}
		.left{
			width:20%;
			margin-right:50px;
		}

	}
</style>