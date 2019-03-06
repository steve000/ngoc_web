<template>
    <div class='goods-rule'>
        <div class="goodsRuleAdd">
        	<router-link to="rules/create">
                <el-button icon="el-icon-plus" size="small" type="primary">新增</el-button>
            </router-link>
        </div>
        <div class="goodsRuleTableContainer">
            <el-table class="goodsRuleTable">
                <el-table-column label='规格ID' prop='eventid' ></el-table-column>
                <el-table-column label='规格名称' prop='eventtype' ></el-table-column>
                <el-table-column label='所属规格' prop='opttime'></el-table-column>
                <el-table-column label='商品操作'>
                    <template slot-scope="props">
                        <div class="handleButtonContainer">
                            <el-tooltip class="item" effect="light" content="编辑" placement="bottom" visible-arrow="false" size="mini">
                                <i class="el-icon-edit-outline"></i>
                                <!-- <el-button type="text" icon="el-icon-edit-outline"></el-button> -->
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'GoodsRules'
}
</script>

<style lang='scss' scoped>
.goods-rule{
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
