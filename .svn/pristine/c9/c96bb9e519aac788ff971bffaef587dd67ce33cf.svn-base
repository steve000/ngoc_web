import * as C from "../../constants/api";
import utils from '../../utils/misc'

const state = {
    queryStockProductList:{
      pageNo:1,
      pageSize: 10,
      total: 0,
      result: []
    },
    StockManageLeftNave:{

    },
    queryStockIdList:{
      pageNo:1,
      pageSize: 10,
      total: 0,
      result: []
    },
    queryPandianList:{
      pageNo:1,
      pageSize: 10,
      total: 0,
      result: []
    },
    queryPandianIdDetailList:{
      pageNo:1,
      pageSize: 10,
      total: 0,
      result: []
    },
    updataPandian:{},
    getUninventoryNum:{},
    finshPandian:{},
    searchProductStock:{},
    searchProductEffectiveStock:{},
    queryProductInventoryLisy:{
      pageNo:1,
      pageSize: 10,
      total: 0,
      result: []
    },
    queryProductDistribution:{
      result:{}
    },
    queryDistributionProductList:{
      pageNo:1,
      pageSize: 10,
      total: 0,
      result: []
    },
    SynchroLogistics:{},
    QueryStockSnList:{
      pageNo:1,
      pageSize: 10,
      total: 0,
      result: []
    },
        // 库存--费用管理--物流费用录入
    stockLogisticscostQuerylistpage:{},
    stockLogisticscostAdd:{},
    stockLogisticscostEdit:{},
    stockLogisticscostDelete:{},
    stockLogisticscostChangeapprovestatus:{},
    stockLogisticscostDownload:{},
    stockLogisticscostImport:{},
    stockLogisticscostQuery:{},
    stockLogisticscostQueryusergroupfeelist:{},

    // 库存--仓位商品设置
    stockLocationskuQueryall: {},
    stockLocationskuQuerypagelist:{},
    stockLocationskuAdd:{},
    stockLocationskuDelete:{},
    // 库存--仓位管理
    stockStorehouselocationQuerypagelist:{},
    stockStorehouselocationAdd:{},
    stockStorehouselocationDelete:{},
    // 库存--费用结算
    stockFeecomputeQuerypagelist:{},
    stockFeecomputeAdd:{},
    stockFeecomputeEdit:{},
    stockFeecomputeDelete:{},
    stockFeecomputeChangestatus:{},
    stockFeecomputeChangestatus:{},
    stockFeecomputeQuery:{},
    // 库存--费用自动计算规则定义
    stockFeeruleQuerypagelist: {},
    stockFeeruleAdd: {},
    stockFeeruleEdit: {},
    stockFeeruleDelete: {},
    stockFeeruleQuery: {},
};

const mutations = {
    [C.STOCK_MANAGE_LEFT_NAVE](state, { payload }) {
    },
    [C.QUERY_STOCK_SN_LIST](state, { payload }) {
        const {pageNo, total,pageSize, result} = payload
        state.QueryStockSnList.pageNo = pageNo
        state.QueryStockSnList.pageSize = pageSize
        state.QueryStockSnList.total = total
        state.QueryStockSnList.result = result
    },
    [C.SYNCHRO_LOGISTICS](state, { payload }) {
        const {SynchroLogistics} = payload
        state.SynchroLogistics= payload
    },
    [C.QUERY_PRODUCT_INVENTORY_LIST](state, { payload }) {
        const {pageNo, total,pageSize, result} = payload
        state.queryProductInventoryLisy.pageNo = pageNo
        state.queryProductInventoryLisy.pageSize = pageSize
        state.queryProductInventoryLisy.total = total
        state.queryProductInventoryLisy.result = result
    },
    [C.QUERY_PRODUCT_DISTRIBUTION](state, { payload }) {
        const {result} = payload
        state.queryProductDistribution.result = result;
    },
    [C.QUERY_DISTRIBUTION_PRODUCT_LIST](state, { payload }) {
        const {pageNo, total,pageSize, result} = payload
        state.queryDistributionProductList.pageNo = pageNo
        state.queryDistributionProductList.pageSize = pageSize
        state.queryDistributionProductList.total = total
        state.queryDistributionProductList.result = result
    },


    [C.QUERY_STOCK_PRODUCT_LIST](state, { payload }) {
        const {pageNo, total,pageSize, result} = payload
        state.queryStockProductList.pageNo = pageNo
        state.queryStockProductList.pageSize = pageSize
        state.queryStockProductList.total = total
        state.queryStockProductList.result = result
    },
    [C.QUERY_STOCKID_LIST](state, { payload }) {
        const {pageNo, total,pageSize, result} = payload
        state.queryStockIdList.pageNo = pageNo
        state.queryStockIdList.pageSize = pageSize
        state.queryStockIdList.total = total
        state.queryStockIdList.result = result
    },
    [C.QUERY_PANDIAN_LIST](state, { payload }) {
        const {pageNo, total,pageSize, result} = payload
        state.queryPandianList.pageNo = pageNo
        state.queryPandianList.pageSize = pageSize
        state.queryPandianList.total = total
        state.queryPandianList.result = result
    },
    [C.QUERY_PANDIANID_DETAIL_LIST](state, { payload }) {
        const {pageNo, total,pageSize, result} = payload
        state.queryPandianIdDetailList.pageNo = pageNo
        state.queryPandianIdDetailList.pageSize = pageSize
        state.queryPandianIdDetailList.total = total
        state.queryPandianIdDetailList.result = result
    },
    [C.UPDATA_PANDIAN](state, { payload }) {
        const {updataPandian} = payload
        state.updataPandian = payload
    },
    [C.GET_UNINVENTORY_NUM](state, { payload }) {
      const {getUninventoryNum} = payload
      state.getUninventoryNum = payload
    },
    [C.FINSH_PANDIAN](state, { payload }) {
      const {finshPandian} = payload
      state.finshPandian = payload
    },
    [C.QUERY_PRODUCT_SEARCH](state, { payload }) {
        const {searchProductStock} = payload
        state.searchProductStock = payload
    },
    [C.QUERY_PRODUCT_EFFECTIVESTOCK](state, { payload }) {
        const {searchProductEffectiveStock} = payload
        state.searchProductEffectiveStock= payload
    },

        // 库存--费用管理--物流费用录入
    [C.STOCK_LOGISTICSCOST_QUERYLISTPAGE](state, { payload }) {
        const {stockLogisticscostQuerylistpage} = payload
        state.stockLogisticscostQuerylistpage = payload
    },
    [C.STOCK_LOGISTICSCOST_ADD](state, { payload }) {
        const {stockLogisticscostAdd} = payload
        state.stockLogisticscostAdd = payload
    },
    [C.STOCK_LOGISTICSCOST_EDIT](state, { payload }) {
        const {stockLogisticscostEdit} = payload
        state.stockLogisticscostEdit = payload
    },
    [C.STOCK_LOGISTICSCOST_DELETE](state, { payload }) {
        const {stockLogisticscostDelete} = payload
        state.stockLogisticscostDelete = payload
    },
    [C.STOCK_LOGISTICSCOST_CHANGEAPPROVESTATUS](state, { payload }) {
        const {stockLogisticscostChangeapprovestatus} = payload
        state.stockLogisticscostChangeapprovestatus = payload
    },
    [C.STOCK_LOGISTICSCOST_DOWNLOAD](state, { payload }) {
        const {stockLogisticscostDownload} = payload
        state.stockLogisticscostDownload = payload
    },
    [C.STOCK_LOGISTICSCOST_IMPORT](state, { payload }) {
        const {stockLogisticscostImport} = payload
        state.stockLogisticscostImport = payload
    },
    [C.STOCK_LOGISTICSCOST_QUERY](state, { payload }) {
        const {stockLogisticscostQuery} = payload
        state.stockLogisticscostQuery = payload
    },
    [C.STOCK_LOGISTICSCOST_QUERYUSERGROUPFEELIST](state, { payload }) {
        const {stockLogisticscostQueryusergroupfeelist} = payload
        state.stockLogisticscostQueryusergroupfeelist = payload
    },
 
    // 库存--仓位商品设置
    // 查询列表（所有）
    [C.STOCK_LOCATIONSKU_QUERYALL](state, { payload }) {
        const {stockLocationskuQueryall} = payload
        state.stockLocationskuQueryall = payload
    },
    // 查询列表（分页）
    [C.STOCK_LOCATIONSKU_QUERYPAGELIST](state, { payload }) {
        const {stockLocationskuQuerypagelist} = payload
        state.stockLocationskuQuerypagelist = payload
    },
    // 新增仓位商品
    [C.STOCK_LOCATIONSKU_ADD](state, { payload }) {
        const {stockLocationskuAdd} = payload
        state.stockLocationskuAdd = payload
    },
    // 删除仓位商品
    [C.STOCK_LOCATIONSKU_DELETE](state, { payload }) {
        const {stockLocationskuDelete} = payload
        state.stockLocationskuDelete = payload
    },
    // 库存--仓位管理
    // 查询列表（分页）
    [C.STOCK_STOREHOUSELOCATION_QUERYPAGELIST](state, { payload }) {
        const {stockStorehouselocationQuerypagelist} = payload
        state.stockStorehouselocationQuerypagelist = payload
    },
    // 新增仓位信息
    [C.STOCK_STOREHOUSELOCATION_ADD](state, { payload }) {
        const {stockStorehouselocationAdd} = payload
        state.stockStorehouselocationAdd = payload
    },
    // 删除仓位信息
    [C.STOCK_STOREHOUSELOCATION_DELETE](state, { payload }) {
        const {stockStorehouselocationDelete} = payload
        state.stockStorehouselocationDelete = payload
    },
    // 库存--费用结算
    // 查询费用结算列表（分页）
    [C.STOCK_FEECOMPUTE_QUERYPAGELIST](state, { payload }) {
        const {stockFeecomputeQuerypagelist} = payload
        state.stockFeecomputeQuerypagelist = payload
    },
    // 新增费用结算
    [C.STOCK_FEECOMPUTE_ADD](state, { payload }) {
        const {stockFeecomputeAdd} = payload
        state.stockFeecomputeAdd = payload
    },
    // 编辑费用结算
    [C.STOCK_FEECOMPUTE_EDIT](state, { payload }) {
        const {stockFeecomputeEdit} = payload
        state.stockFeecomputeEdit = payload
    },
    // 删除物流费用
    [C.STOCK_FEECOMPUTE_DELETE](state, { payload }) {
        const {stockFeecomputeDelete} = payload
        state.stockFeecomputeDelete = payload
    },
    // 修改费用结算状态
    [C.STOCK_FEECOMPUTE_CHANGESTATUS](state, { payload }) {
        const {stockFeecomputeChangestatus} = payload
        state.stockFeecomputeChangestatus = payload
    },
    // 修改费用结算审核状态
    [C.STOCK_FEECOMPUTE_CHANGEAPPROVESTATUS](state, { payload }) {
        const {stockFeecomputeChangeapprovestatus} = payload
        state.stockFeecomputeChangeapprovestatus = payload
    },
    // 查看费用结算
    [C.STOCK_FEECOMPUTE_QUERY](state, { payload }) {
        const {stockFeecomputeQuery} = payload
        state.stockFeecomputeQuery = payload
    },
    // 库存--费用自动计算规则定义
    // 查询列表（分页）
    [C.STOCK_FEERULE_QUERYPAGELIST](state, { payload }) {
        const {stockFeeruleQuerypagelist} = payload
        state.stockFeeruleQuerypagelist = payload
    },
    // 新增费用自动结算定义
    [C.STOCK_FEERULE_ADD](state, { payload }) {
        const {stockFeeruleAdd} = payload
        state.stockFeeruleAdd = payload
    },
    // 编辑费用自动结算定义
    [C.STOCK_FEERULE_EDIT](state, { payload }) {
        const {stockFeeruleEdit} = payload
        state.stockFeeruleEdit = payload
    },
    // 删除费用自动结算定义
    [C.STOCK_FEERULE_DELETE](state, { payload }) {
        const {stockFeeruleDelete} = payload
        state.stockFeeruleDelete = payload
    },
    // 查看费用自动结算定义
    [C.STOCK_FEERULE_QUERY](state, { payload }) {
        const {stockFeeruleQuery} = payload
        state.stockFeeruleQuery = payload
    },


};

export default {
    state,
    mutations
}
