import * as C from "../../constants/api";

const state = {
    queryChannelAll: '',
    querySearchmerList:'',
    querySkuListByConditionSearchDetail:'',
    importChannelGoodsResult: "",
    channelManagementActiveIndex:'',
};

const mutations = {
    [C.QUERY_CHANNEL_ALLCHANNEL](state, { payload }) {
        
    },
    [C.SEARCHMERCHANDISE](state, { payload }) {
        state.querySearchmerList = payload ? payload : {};
    },
    [C.QUERY_SKU_LIST_BY_CONDITION](state, { payload }) {
        state.querySkuListByConditionSearchDetail = payload ? payload : {};
    },
    [C.START_OR_STOP_CHANNEL_GOODS](state, { payload }) {
    },
    //查询操作日志
    [C.QUERY_ORDER_LOG](state, { payload }) {
    },
    //编辑渠道
    [C.UPDATE_CHANNEL](state, { payload }) {
    },
    //按条件查询渠道
    [C.QUERY_CHANNEL_ADDRESSBYID](state, { payload }) {
    },
    //根据channelId查询channel信息
    [C.QUERY_CHANNEL_BYID](state, { payload }) {
    },
    //新增渠道收貨地址
    [C.CREATE_CHANNEL_ADDRESS](state, { payload }) {
    },
    //新增渠道收貨地址
    [C.POST_IMPORT_CHANNEL_GOODS](state, { payload }) {
    },
    //新增渠道
    [C.ADDCHANNE](state, { payload }) {
    },
    //查询所有发货地方
    [C.QUERY_SALE_ALLVENDOR](state, { payload }) {
    },
    //新增渠道商品
    [C.CREATE_CHANNEL_GOOD](state, { payload }) {
    },
    //新增渠道商品-模板下载
    [C.QUERY_IMPORT_CHANNEL_GOODS_TEMPLATE](state, { payload }) {
    },
    //根据渠道id查询渠道下商品
    [C.QUERY_CHANNELGOOD_BYCHANNELID](state, { payload }) {
    },
    //删除渠道商品
    [C.DELETE_CHANNELSKU](state, { payload }) { 
    },
    CHANNEL_MANAGEMENT_ACTIVE_INDEX(state,payload){
        console.log(payload);
        state.channelManagementActiveIndex=payload;
    }
};
export default {
    state,
    mutations
}
