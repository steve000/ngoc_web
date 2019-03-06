import * as C from "../../constants/api";
import * as AC from "../../constants/actions";
import Api, {createAction} from "../../utils/api";
export default {
	/* 库存管理 */
	//以商品维度查询商品库存情况
	queryStockProductList: createAction(C.QUERY_STOCK_PRODUCT_LIST, Api.queryStockProductList),
	//以仓库维度分页查询商品库存
	queryStockIdList: createAction(C.QUERY_STOCKID_LIST, Api.queryStockIdList),
	//查看盘点记录列表
	queryPandianList: createAction(C.QUERY_PANDIAN_LIST, Api.queryPandianList),
	//根据盘点Id查询盘点详情
	queryPandianIdDetailList: createAction(C.QUERY_PANDIANID_DETAIL_LIST, Api.queryPandianIdDetailList),
	//更新盘点
	updataPandian: createAction(C.UPDATA_PANDIAN, Api.updataPandian),
	//获取未盘点的商品数量
	getUninventoryNum: createAction(C.GET_UNINVENTORY_NUM, Api.getUninventoryNum),
	//结束盘点
    finshPandian: createAction(C.FINSH_PANDIAN, Api.finshPandian),

     /** 库存管理改版 新 */
    //[v1.0.2，修改]分页查询商品维度查询商品库存情况
    queryProductInventoryLisy: createAction(C.QUERY_PRODUCT_INVENTORY_LIST, Api.queryProductInventoryLisy),
    //[v1.0.2]查询商品库存分布
    queryProductDistribution: createAction(C.QUERY_PRODUCT_DISTRIBUTION, Api.queryProductDistribution),
    //[v1.0.2]分页查询代发仓库的商品列表
    queryDistributionProductList: createAction(C.QUERY_DISTRIBUTION_PRODUCT_LIST, Api.queryDistributionProductList),
    //[v1.0.2.1]同步中移物流库存数据
    SynchroLogistics: createAction(C.SYNCHRO_LOGISTICS, Api.SynchroLogistics),
    //[v1.0.2.2]根据仓库id分页查询串码列表
    QueryStockSnList: createAction(C.QUERY_STOCK_SN_LIST, Api.QueryStockSnList),
    //[v1.0.2.2]搜索指定仓库的商品
    QueryProductSearch: createAction(C.QUERY_PRODUCT_SEARCH, Api.QueryProductSearch),
    //[v1.0.2.2]查询指定仓库中商品的可用库存
    QueryProductEffectiveStock: createAction(C.QUERY_PRODUCT_EFFECTIVESTOCK, Api.QueryProductEffectiveStock),
    //库存管理的左边导航
    StockManageLeftNave: createAction(C.STOCK_MANAGE_LEFT_NAVE, Api.StockManageLeftNave),

   // 库存--费用管理--物流费用录入
    // 查询列表（分页）
    stockLogisticscostQuerylistpage: createAction(C.STOCK_LOGISTICSCOST_QUERYLISTPAGE, Api.stockLogisticscostQuerylistpage),
    // 新增物流费用
    stockLogisticscostAdd: createAction(C.STOCK_LOGISTICSCOST_ADD, Api.stockLogisticscostAdd),
    // 编辑物流费用
    stockLogisticscostEdit: createAction(C.STOCK_LOGISTICSCOST_EDIT, Api.stockLogisticscostEdit),
    // 删除物流费用
    stockLogisticscostDelete: createAction(C.STOCK_LOGISTICSCOST_DELETE, Api.stockLogisticscostDelete),
    // 修改审批状态
    stockLogisticscostChangeapprovestatus: createAction(C.STOCK_LOGISTICSCOST_CHANGEAPPROVESTATUS, Api.stockLogisticscostChangeapprovestatus),
    // 下载模板
    stockLogisticscostDownload: createAction(C.STOCK_LOGISTICSCOST_DOWNLOAD, Api.stockLogisticscostDownload),
    // 导入物流费用
    stockLogisticscostImport: createAction(C.STOCK_LOGISTICSCOST_IMPORT, Api.stockLogisticscostImport),
    // 查看物流费用
    stockLogisticscostQuery: createAction(C.STOCK_LOGISTICSCOST_QUERY, Api.stockLogisticscostQuery),
    // 通过支付、收款实体查询费用明细
    stockLogisticscostQueryusergroupfeelist: createAction(C.STOCK_LOGISTICSCOST_QUERYUSERGROUPFEELIST, Api.stockLogisticscostQueryusergroupfeelist),

    // 库存--仓位商品设置
    // 查询列表（所有）
    stockLocationskuQueryall: createAction(C.STOCK_LOCATIONSKU_QUERYALL, Api.stockLocationskuQueryall),
    // 查询列表（分页）
    stockLocationskuQuerypagelist: createAction(C.STOCK_LOCATIONSKU_QUERYPAGELIST, Api.stockLocationskuQuerypagelist),
    // 新增仓位商品
    stockLocationskuAdd: createAction(C.STOCK_LOCATIONSKU_ADD, Api.stockLocationskuAdd),
    // 删除仓位商品
    stockLocationskuDelete: createAction(C.STOCK_LOCATIONSKU_DELETE, Api.stockLocationskuDelete),
    // 库存仓位管理
    // 查询列表（分页）
    stockStorehouselocationQuerypagelist: createAction(C.STOCK_STOREHOUSELOCATION_QUERYPAGELIST, Api.stockStorehouselocationQuerypagelist),
    // 新增仓位信息
    stockStorehouselocationAdd: createAction(C.STOCK_STOREHOUSELOCATION_ADD, Api.stockStorehouselocationAdd),
    // 删除仓位信息
    stockStorehouselocationDelete: createAction(C.STOCK_STOREHOUSELOCATION_DELETE, Api.stockStorehouselocationDelete),
    // 库存--费用结算
    // 查询费用结算列表（分页）
    stockFeecomputeQuerypagelist: createAction(C.STOCK_FEECOMPUTE_QUERYPAGELIST, Api.stockFeecomputeQuerypagelist),
    // 新增费用结算
    stockFeecomputeAdd: createAction(C.STOCK_FEECOMPUTE_ADD, Api.stockFeecomputeAdd),
    // 编辑费用结算
    stockFeecomputeEdit: createAction(C.STOCK_FEECOMPUTE_EDIT, Api.stockFeecomputeEdit),
    // 删除物流费用
    stockFeecomputeDelete: createAction(C.STOCK_FEECOMPUTE_DELETE, Api.stockFeecomputeDelete),
    // 修改费用结算状态
    stockFeecomputeChangestatus: createAction(C.STOCK_FEECOMPUTE_CHANGESTATUS, Api.stockFeecomputeChangestatus),
    // 修改费用结算审核状态
    stockFeecomputeChangeapprovestatus: createAction(C.STOCK_FEECOMPUTE_CHANGEAPPROVESTATUS, Api.stockFeecomputeChangeapprovestatus),
    // 查看费用结算
    stockFeecomputeQuery: createAction(C.STOCK_FEECOMPUTE_QUERY, Api.stockFeecomputeQuery),
    // 库存--费用自动计算规则定义
    // 查询列表（分页）
    stockFeeruleQuerypagelist: createAction(C.STOCK_FEERULE_QUERYPAGELIST, Api.stockFeeruleQuerypagelist),
    // 新增费用自动结算定义
    stockFeeruleAdd: createAction(C.STOCK_FEERULE_ADD, Api.stockFeeruleAdd),
    // 编辑费用自动结算定义
    stockFeeruleEdit: createAction(C.STOCK_FEERULE_EDIT, Api.stockFeeruleEdit),
    // 删除费用自动结算定义
    stockFeeruleDelete: createAction(C.STOCK_FEERULE_DELETE, Api.stockFeeruleDelete),
    // 查看费用自动结算定义
    stockFeeruleQuery: createAction(C.STOCK_FEERULE_QUERY, Api.stockFeeruleQuery),
    

    /** 库存管理改版 新 */
}
