/**
 * Created by issuser on 2018/4/4.
 */
import * as C from "../../constants/api";
import Api, {createAction} from "../../utils/api";
export default{
    // 保存入库单
    saveInStore: createAction(C.POST_STORE_IN_SAVE, Api.storeInSave),
    // 保存出库单
    saveOutStore: createAction(C.SAVE_SALES_STOREOUT, Api.saveSalesStoreout),
    // 据订单id模糊查询订单列表
    querySaleOrderBlurry: createAction(C.QUERY_ORDER_BLURRY, Api.getSalesListBlurry),
    // 查询仓库列表
    queryStoreList: createAction(C.QUERY_STORE_STORELIST, Api.queryStoreList),
    // 根据仓库ID查询仓库详情
    queryStoreById: createAction(C.QUERY_STOREHOUSE_BY_ID, Api.queryStoreById),
    // 根据渠道id获取渠道地址
    queryChannelAddress: createAction(C.QUERY_SALES_RECEIVING_ADDRESS, Api.queryReceivingAddress),
    // 新增渠道收貨地址
    createNewChannelAddress: createAction(C.CREATE_CHANNEL_ADDRESS, Api.createChannelAddress),
    // 编辑渠道收貨地址
    editChannelAddress: createAction(C.UPDATE_CHANNEL_ADDRESS, Api.updateChannelAddress),
    // 编辑渠道地址状态
    editChannelAddressStatus: createAction(C.UPDATE_CHANNEL_ADDRESSSTATUS, Api.updateChannelAddressStatus),
    // 设置默认地址
    setDefaultChannelAddress: createAction(C.UPDATE_CHANNEL_DEFALUTADDRESS, Api.updateChannelDefalutAddress),
    // 获取出库记录
    queryChangeOutStoreRecord: createAction(C.GET_OUT_STORE_RECORD, Api.getOutStoreList),
    // 获取入库记录
    queryChangeInStoreRecord: createAction(C.QUERY_CHANGE_ORDER_IN_STORE, Api.queryChangeOrderInStore),
    // 销售订单-模糊查询商品列表
    querySalesGoodslistAction: createAction(C.QUERY_SALES_GOODSLIST, Api.querySalesGoodslist),
    // 查询菜单订单数量
    querySalesMenuOrderNumAction: createAction(C.QUERY_SALE_MENUORDERNUM, Api.querySalesMenuOrderNum),
    // 批量编辑订单状态
    editBatchOrderStatusAction: createAction(C.EDIT_ORDER_BATCH_UPDATESTATUS, Api.editBatchOrderStatus),
    // 批量出库保存
    saveSalesStoreOutBatch: createAction(C.SAVE_SALES_STOREOUTBATCH, Api.saveSalesStoreOutBatch),
}
