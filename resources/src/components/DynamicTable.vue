<template>
    <div class='table-wrapper' id="table-wrapper">
        <el-table :data="data" style='width:100%;' @selection-change='onSelectionChange'
        ref='table'>
            <slot></slot>
        </el-table>
        <el-row class="pagination-section">
	        <el-pagination
	        		@size-change="handleSizeChange"
	                ref="pagination"
	                @current-change="onPagination"
	                :current-page="pageNo"
	                :page-sizes="[10, 20, 30, 40]"
	                :page-size="pageSize"
	                layout=" sizes, prev, pager, next, jumper"
	                :total="total" v-if="total > pageSize">
	        </el-pagination>
        </el-row>
    </div>
</template>
<script>
	export default {
		name: 'DynamicTable',

		computed: {
			tableHeight(){
				return document.documentElement.clientHeight - this.tableTop;
			}
		},
		props: {
			data: {
				required: true,
				type: Array
			},

			pageNo: {
				type: Number,
				default: 1
			},

			pageSize: {
				type: Number,
				default: 10
			},
			total: {
				type: Number,
				default: 0
			}
		},

		methods: {
			onPagination(pageNo){
				this.$emit("pagination", pageNo);
            },
            onSelectionChange(val){
                this.$emit('selection', val)
            },
            handleSizeChange(size){
            	this.$emit('SizeChange', size)
            }
		},
	}


</script>

<style lang='scss'>
.pagination-section{
     text-align: right;
     right: 200px;
     .el-pagination {
     width:100%;
     .el-pager li.active{
     	background-color:#409EFF;
     	color:white;
     }
	.btn-prev, .btn-next{
		i{
			visibility:hidden
		}
	}
	.btn-prev{
		&:before{
			content:"上一页"
		}
	}
	.btn-next{
		&:before{
			content:"下一页"
		}
	}
}
}

 .el-table th{
        background-color:#F2F8FF;
    }

 .el-table--border{
    border:none;
}
</style>
