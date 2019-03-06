<template>
    <div class='goods-property'>
            <div class="goodsRuleAdd">
        	<router-link to="property/create">
                <el-button icon="el-icon-plus" size="small" type="primary">新增属性</el-button>
            </router-link>
        </div>
        <div class="goodsRuleTableContainer">
            <el-table class="goodsRuleTable">
                <el-table-column label='属性ID' prop='eventid' ></el-table-column>
                <el-table-column label='属性名称' prop='eventtype' ></el-table-column>
                <el-table-column label='属性值' prop='opttime'></el-table-column>
                <el-table-column label='操作'>
                    <template slot-scope="props">
                        <div class="handleButtonContainer">
                            <el-tooltip class="item" effect="light" content="编辑" placement="bottom" visible-arrow="false" size="mini">
                                <i class="el-icon-edit-outline"></i>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex'
    import MessageMixins from '~/mixins/messages'
    import Api from '~/utils/api';
    import DynamicTable from '~/components/DynamicTable'
	export default {
	    name: 'GoodCategory',
	    mixins: [MessageMixins],
	    components: {
	        DynamicTable,
	    },
	    data(){
	    	return{

	    	}
	    },
	    methods:{

	    }
}
</script>

<style lang='scss'scoped>
.goods-property{
    .goodsRuleAdd{
        margin-top:10px;
    }
    .goodsRuleTableContainer{
        background-color:white;
        margin-top:20px;
        padding:20px;
        .goodsRuleTable{
            .handleButtonContainer{
                width:30px;
                height:30px;
                border-radius:50%;
                background-color:#eceff1;
                display:inline-block;
                text-align:center;
                vertical-align:top;
            i{
                line-height: 24px;
                height: 20px;
                vertical-align: middle;
                color: #409eff;
                cursor: pointer;
                 }
             }
        }
    
    }
}
.el-table th{
    background-color:#F2F8FF;
}
</style>
