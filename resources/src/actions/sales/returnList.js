/**
 * Created by issuser on 2018/4/4.
 */
import * as C from "../../constants/api";
import Api, {createAction} from "../../utils/api";
export default{
    //分页获取采购订单列表
    returnList: createAction(C.RETURN_LIST, Api.returnList),
    //改变订单状态
    returnStatusUpdate: createAction(C.POST_RETURN_STATUS_UPDATE, Api.returnStatusUpdate),
    //通过退货订单ID查询退货商品
    queryRefundGoods: createAction(C.QUERY_FEFUND_GOODS, Api.queryRefundGoods),
    //根据主键ID查询退货单详细信
    queryRefundInfo: createAction(C.QUERY_REFUND_DETAIL, Api.queryRefundInfo),
    //获取订单商品列表
    querySalesOrder: createAction(C.QUERY_SALE_ORDER, Api.querySalesOrder),
    //新增退货订单
    addNewRefuseOrder: createAction(C.POST_NEW_REFUSE_ORDER, Api.addNewRefuseOrder),
    //新增退货订单
    queryStoreById: createAction(C.QEURY_STORE_BY_ID, Api.queryStoreById),
    //编辑退货订单
    returnOrderUpdate: createAction(C.UPADTE_RETURN_ORDER, Api.returnOrderUpdate),
    // //入库单保存
    // storeInSave: createAction(C.POST_STORE_IN_SAVE, Api.storeInSave),
    //根据销售订单id获取退货商品
    queryReturnProListByOrderId: createAction(C.QUERY_RETURN_PROLIST_ORDER_ID, Api.queryReturnProListByOrderId),
    //修改备注
    editRefundRemark: createAction(C.EDIT_REFUND, Api.editRefundRemark),
    //退货订单不同状态的数量
    queryReturnOrderCountAction: createAction(C.QUERY_RETURN_ORDER_COUNT, Api.queryReturnOrderCount),
}
