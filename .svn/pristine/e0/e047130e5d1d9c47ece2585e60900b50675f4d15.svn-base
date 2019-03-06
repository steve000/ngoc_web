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
    //查询所有发货地方
    queryAllVendor:createAction(C.QUERY_SALE_ALLVENDOR,Api.queryAllVendor),
    //新增渠道商品
    createChannelGoodAction:createAction(C.CREATE_CHANNEL_GOOD,Api.createChannelGood),
    //新增渠道商品-模板下载
    queryDownloadChannelGoodsTemplateAction: createAction(C.QUERY_IMPORT_CHANNEL_GOODS_TEMPLATE, Api.queryImportChannelGoodsTemplate),
    //根据渠道id查询渠道下商品
    queryChannelGoodByChannelId: createAction(C.QUERY_CHANNELGOOD_BYCHANNELID, Api.queryChannelGoodByChannelId),
    //删除渠道商品
    deleteChannelGood: createAction(C.DELETE_CHANNELSKU, Api.deleteChannelGood),
}
