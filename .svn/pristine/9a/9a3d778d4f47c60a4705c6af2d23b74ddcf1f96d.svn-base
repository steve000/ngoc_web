// 销售订单
import * as C from "../../constants/api";
import Api, {createAction} from "../../utils/api";
export default{
    //分页获取采购订单列表
    querySalesOrderList: createAction(C.QUERY_SALES_ORDER_LIST, Api.querySalesOrderList),
    //查詢渠道
    queryChannelAll: createAction(C.QUERY_CHANNEL_ALLCHANNEL, Api.queryChannelAll),
    //根据订单ID编辑备注
    updateOrderMemark: createAction(C.CREATE_SALES_ORDER_ORDERADD, Api.updateOrderMemark),
    //模糊查询商品列表
    querySalesGoodslist: createAction(C.QUERY_SALES_GOODSLIST, Api.querySalesGoodslist),
    //根据销售订单商品生成出货单信息
    querySalesOutStoreList: createAction(C.QUERY_SALES_OUTSTORELIST, Api.querySalesOutStoreList),
    // 导出订单列表
    exportSalesOrder: createAction(C.EXPORT_SALES_ORDER, Api.exportSalesOrder),
    //新增收货地址
    createChannelAddress: createAction(C.CREATE_CHANNEL_ADDRESS, Api.createChannelAddress),
    //修改订单收货地址
    updateOrderAddress: createAction(C.UPDATE_ORDER_ADDRESS, Api.updateOrderAddress),
    // 编辑订单状态
    editOrderStatus: createAction(C.EDIT_ORDER_STATUS, Api.editOrderStatus),
    // 根据销售订单id获取退货记录
    getRefundBySaleId: createAction(C.GET_ORDER_RETURN, Api.getRefund),
    // 根据销售订单id查询商品详情
    querySalesOrderById: createAction(C.QUERY_SALE_ORDER_WITHID, Api.querySalesOrderId),
    // 根据销售订单id查询销售订单属性
    queryOrderAttr: createAction(C.QUERY_ORDER_ATTR, Api.queryOrderAttr),
    // 根据主键ID查询换货详情
    queryChangeListBySleId: createAction(C.QUERY_SALES_CHANGE_LIST, Api.querySalesChangeList),
    // 根据销售订单id查询商品清单列表
    querySalesOrderListById: createAction(C.QUERY_SALE_ORDER, Api.querySalesOrder),
    // 统计订单数量
    statisticsOrderNumAction: createAction(C.QUERY_SALE_MENUORDERNUM, Api.querySalesMenuOrderNum),
    //查询收货地址
    queryReceivingAddress: createAction(C.QUERY_SALES_RECEIVING_ADDRESS, Api.queryReceivingAddress),
    //新增订单
    createOrderAdd: createAction(C.CREATE_SALES_ORDER_ORDERADD, Api.createOrderAdd),
    //编辑销售订单
    updataOrder: createAction(C.UPDATE_SALES_ORDER, Api.updataOrder),
    // 根据订单id查询订单信息
    querySalesOrderId: createAction(C.QUERY_SALE_ORDER_WITHID, Api.querySalesOrderId),
    // 查看查看销售订单-商品清单
    querySalesOrder: createAction(C.QUERY_SALE_ORDER, Api.querySalesOrder),
    // 按条件查询渠道
    queryAddressByChannelId: createAction(C.QUERY_CHANNEL_ADDRESSBYID, Api.queryAddressByChannelId),
    //编辑渠道地址
    updateChannelAddress: createAction(C.UPDATE_CHANNEL_ADDRESS, Api.updateChannelAddress),
    //更改渠道收货地址状态
    updateChannelAddressStatus: createAction(C.UPDATE_CHANNEL_ADDRESSSTATUS, Api.updateChannelAddressStatus),
    //渠道设置默认地址
    updateChannelDefalutAddress: createAction(C.UPDATE_CHANNEL_DEFALUTADDRESS, Api.updateChannelDefalutAddress),
    //根据搜索获取渠道
    queryChannelBySearch: createAction(C.QUERY_CHANNEL_BYSEARCH, Api.queryChannelBySearch),
    //根据订单ID获取订单信息
    queryOrderMsg: createAction(C.QUERY_SALES_ORDER, Api.queryOrderMsg),
    //根据销售订单id查询换货列表
    querySalesChangeList: createAction(C.QUERY_SALES_CHANGE_LIST, Api.querySalesChangeList),
    // 查询销售单物流
    getRouterList: createAction(C.QUERTY_ROUTER_LIST, Api.getRouterList),
    // 查询销售单物流
    channelQueryWithTemplateAction: createAction(C.QUERTY_CHANNEL_TEMPLATE, Api.channelQueryWithTemplate),
    // 异常订单已拒收确认拒收
    updataSalesErrorefuse: createAction(C.UPDATA_SALES_ERROEREFUSE, Api.updataSalesErrorefuse),


    //----渠道管理
    //--渠道通用查询
    //通过渠道名称查询所有渠道
    channelChannelquery: createAction(C.CHANNEL_CHANNELQUERY, Api.channelChannelquery),
    //--渠道计划及考核
    //查询列表（分页）
    channelplanQuerylistpage: createAction(C.CHANNELPLAN_QUERYLISTPAGE, Api.channelplanQuerylistpage),
    //新增渠道计划
    channelplanAdd: createAction(C.CHANNELPLAN_ADD, Api.channelplanAdd),
    //编辑渠道计划
    channelplanEdit: createAction(C.CHANNELPLAN_EDIT, Api.channelplanEdit),
    //删除渠道计划
    channelplanDelete: createAction(C.CHANNELPLAN_DELETE, Api.channelplanDelete),
    //计算
    channelplanCompute: createAction(C.CHANNELPLAN_COMPUTE, Api.channelplanCompute),
    //查询详情 
    channelplanQuery: createAction(C.CHANNELPLAN_QUERY, Api.channelplanQuery),


    //--渠道价格和存量定义
    //通过渠道ID查询所有渠道商品
    channelQueryallbychannelid: createAction(C.CHANNEL_QUERYALLBYCHANNELID, Api.channelQueryallbychannelid),
    //查询列表（分页）
    channelpriceQuerylistpage: createAction(C.CHANNELPRICE_QUERYLISTPAGE, Api.channelpriceQuerylistpage),
    //新增渠道计划
    channelpriceAdd: createAction(C.CHANNELPRICE_ADD, Api.channelpriceAdd),
    //编辑渠道计划
    channelpriceEdit: createAction(C.CHANNELPRICE_EDIT, Api.channelpriceEdit),
    //删除渠道计划
    channelpriceDelete: createAction(C.CHANNELPRICE_DELETE, Api.channelpriceDelete),
    //重置
    channelpriceReset: createAction(C.CHANNELPRICE_RESET, Api.channelpriceReset),
    //查询详情 
    channelpriceQuery: createAction(C.CHANNELPRICE_QUERY, Api.channelpriceQuery),
}
