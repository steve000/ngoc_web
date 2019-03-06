import * as C from "../../../constants/api";
import Api, { createAction } from "../../../utils/api";

export default {

    // 新增
    skuCommodityManagementAdd: createAction(C.SKU_COMMODITY_MANAGEMENT_ADD, Api.skuCommodityManagementAdd),
    // 编辑
    skuCommodityManagementEdit: createAction(C.SKU_COMMODITY_MANAGEMENT_EDIT, Api.skuCommodityManagementEdit),
    // 删除
    skuCommodityManagementDelete: createAction(C.SKU_COMMODITY_MANAGEMENT_DELETE, Api.skuCommodityManagementDelete),
    // 查询列表（分页）
    skuCommodityManagementQuerylistpage: createAction(C.SKU_COMMODITY_MANAGEMENT_QUERYLISTPAGE, Api.skuCommodityManagementQuerylistpage),
    // 查询详情
    skuCommodityManagementQuery: createAction(C.SKU_COMMODITY_MANAGEMENT_QUERY, Api.skuCommodityManagementQuery),
    // 添加标签
    skuCommodityManagementAddtag: createAction(C.SKU_COMMODITY_MANAGEMENT_ADDTAG, Api.skuCommodityManagementAddtag),
    // 删除标签
    skuCommodityManagementDeletetag: createAction(C.SKU_COMMODITY_MANAGEMENT_DELETETAG, Api.skuCommodityManagementDeletetag),
    // 查询列表（分页）标签
    skuCommodityManagementDeletetagbatch: createAction(C.SKU_COMMODITY_MANAGEMENT_DELETETAGBATCH, Api.skuCommodityManagementDeletetagbatch),
    //SKU商品_标签设置管理_查询列表（所有）
    skuCommoditySkutagQueryall: createAction(C.SKU_COMMODITY_SKUTAG_QUERYALL, Api.skuCommoditySkutagQueryall),

}