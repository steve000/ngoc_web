import * as C from "../../constants/api";
import Api, {createAction} from "../../utils/api";
export default {
    //查询所有渠道
    queryChannelAllAction: createAction(C.QUERY_CHANNEL_ALLCHANNEL, Api.queryChannelAll),
    querySearchmer:createAction(C.SEARCHMERCHANDISE,Api.searchmer),
    //按条件查询商品列表
    querySkuListByConditionSearch:createAction(C.QUERY_SKU_LIST_BY_CONDITION,Api.querySkuListByConditionSearch),
    //开启或禁用渠道状态
    startOrStopChannelGoodsAction:createAction(C.START_OR_STOP_CHANNEL_GOODS,Api.startOrStopChannelGoods),
    //查询操作日志
    queryOrderLogAction:createAction(C.QUERY_ORDER_LOG,Api.queryOrderLog),
    //编辑渠道
    updateChannelAction:createAction(C.UPDATE_CHANNEL,Api.updateChannel),
    //按条件查询渠道
    queryAddressByChannelIdAction:createAction(C.QUERY_CHANNEL_ADDRESSBYID,Api.queryAddressByChannelId),
    //根据channelId查询channel信息
    queryChannelByIdAction:createAction(C.QUERY_CHANNEL_BYID,Api.queryChannelById),
    //新增渠道收貨地址
    createChannelAddressAction:createAction(C.CREATE_CHANNEL_ADDRESS,Api.createChannelAddress),
    //导入渠道商品
    postImportChannelGoodsAction:createAction(C.POST_IMPORT_CHANNEL_GOODS,Api.postImportChannelGoods),
    //新增渠道
    addStatusAction:createAction(C.ADDCHANNE,Api.addStatus),
    //编辑渠道商品
    updateChannelGood:createAction(C.UPDATE_CHANNEL_GOOD,Api.updateChannelGood),
    //查询所有发货方
    queryAllVendor:createAction(C.QUERY_SALE_ALLVENDOR,Api.queryAllVendor),
    // 通过渠道商品ID查询商品信息
    queryGoodsByChannelSkuIdAction:createAction(C.QUERY_GOODMSG_BYCHANNELSKUID,Api.queryGoodsByChannelSkuId),
    // 导入数据生成渠道商品
    postDataConfirmImportAction:createAction(C.POST_DATA_CONFIRM_IMPORT,Api.postDataConfirmImport),
    // 根据搜索获取渠道
    queryChannelBySearchAction:createAction(C.QUERY_CHANNEL_BYSEARCH,Api.queryChannelBySearch),
    // 修改渠道的状态
    updataStatusAction:createAction(C.UPDATACHANNE_STATUS,Api.updataStatus),
}
