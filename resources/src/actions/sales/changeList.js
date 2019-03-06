/**
 * Created by issuser on 2018/4/4.
 */
import * as C from "../../constants/api";
import Api, {createAction} from "../../utils/api";
export default{
    //分页获取换货订单列表
    changeList: createAction(C.QEURY_CHANGE_LIST, Api.queryChangeOrderList),
    //改变订单状态
    changeStatusUpdate: createAction(C.EDIT_CHANGE_STATUS, Api.editChangeStatus),
    //根据主键ID查询换货单详情
    queryChangeOrderInfoById: createAction(C.QUERY_CHANGE_DETAIL, Api.queryChangeInfo),
    // 根据换货订单ID查询换货商品清单列表
    queryChangeGoodsById: createAction(C.QUERY_CHANGE_LIST, Api.queryChangeList),
    // 新增换货订单
    createNewChangeOrder: createAction(C.CREATE_CHANGE_ORDER, Api.createChangeOrder),
    // 编辑换货单
    editChangeOrderInfo: createAction(C.EDIT_CHANGE_ORDER, Api.editChangeOrder),
    // 修改换货单收货地址
    editChangeOrderAddress: createAction(C.EDIT_CHANGE_ADDRESS, Api.editChangeAddress),
    // 编辑换货订单备注
    editChangeOrderremark: createAction(C.UPDATE_CHANGE_REMARK, Api.updateChangeRemark),
    // 根据销售订单id获取详情，带可换货数量
    querySaleOrderHasCount: createAction(C.QUERY_SALE_ORDER_WITH_COUNT, Api.querySaleOrderWithCount),
    // 根据换货订单id获取详情，带可换货数量
    queryChangeOrderHasCount: createAction(C.QUERY_CHANGE_ORDER_WITH_COUNT, Api.queryChangeOrderWithCount),
    // 换货各状态订单数量
    queryChangeTypeCount: createAction(C.QUERY_CHANGE_ORDER_COUNT, Api.getChangeStatusCount),

    //通过退货订单ID查询退货商品
    queryRefundGoods: createAction(C.QUERY_FEFUND_GOODS, Api.queryRefundGoods),
    //根据主键ID查询退货单详细信
    queryRefundInfo: createAction(C.QUERY_REFUND_DETAIL, Api.queryRefundInfo),
    //获取订单商品列表
    querySalesOrder: createAction(C.QUERY_SALE_ORDER, Api.querySalesOrder),
    //新增退货订单
    addNewRefuseOrder: createAction(C.POST_NEW_REFUSE_ORDER, Api.addNewRefuseOrder),
}
