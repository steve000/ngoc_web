/**
 * Created by issuser on 2018/3/19.
 */
import * as C from "../../constants/api";
import Api, {createAction} from "../../utils/api";
export default{
    //入库
    queryStockInListAction: createAction(C.QUERY_STOCK_IN_LIST, Api.queryStockInList),
    //创建入库单
    createStockInAction: createAction(C.CREATE_STOCK_IN, Api.createStockIn),
    //查看入库单详情
    queryStockInDetailAction: createAction(C.QUERY_STOCK_IN_DETAIL, Api.queryStockInDetail),
    //确认入库
    allotCheckAction: createAction(C.AllOTCHECK, Api.allotCheck),
    //查询入库商品列表
    queryWaitStockInProductAction: createAction(C.QUERY_WAIT_STOCK_PRODUCT, Api.queryWaitStockInProduct),
    //查询待入库的关联单号列表
    queryRelatedSheetList: createAction(C.QUERY_RELATEDSHEET_LIST, Api.queryRelatedSheetList),
    //查看采购订单信息
    queryPurchaseOrderDetail: createAction(C.QUERY_PURCHASE_ORDER_DETAIL, Api.queryPurchaseOrderDetail),
    //查询入库通知单基本信息
    queryStockInBasicDetail: createAction(C.QUERY_STOCK_IN_BASIC_DETAIL, Api.queryStockInBasicDetail),
    //查询入库通知单入库详情
    queryStockInListDetail: createAction(C.QUERY_STOCK_IN_LIST_DETAIL, Api.queryStockInListDetail),
    //查询入库单商品的串码信息
    querySnList: createAction(C.QUERY_SN_lIST, Api.querySnList),
    //查询入库通知单商品列表
    queryStockInProductList: createAction(C.QUERY_SN_lIST, Api.queryStockInProductList),
    //消单次入库单号
    cancelStockIn: createAction(C.CANCEL_STOCK_IN, Api.cancelStockIn),
    //重传入库单
    retryStockIn: createAction(C.CANCEL_STOCK_IN, Api.retryStockIn),
}
