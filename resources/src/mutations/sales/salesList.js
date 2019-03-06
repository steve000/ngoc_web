/**
 * Created by issuser on 2018/4/4.  update 6.29
 */
import * as C from "../../constants/api";
const state = {
    salesList: [],
    basePage:{
        totalCount:0,
    },

};
const getters = {
    importSalesOrderStatus: state => state.importSalesOrderStatus
}
const mutations = {
    [C.UPDATE_SALES_ORDER](state, { payload }) {

    },
    [C.UPDATE_MODIFYARRIVEDTIME](state, { payload }) {

    },
    [C.UPDATE_MODIFYCOMMENT](state, { payload }) {

    },
    [C.GET_ORDER_RETURN](state, { payload }) {

    },
    [C.QUERY_SALE_ORDER_WITHID](state, { payload }) {

    },
    [C.QUERY_ORDER_ATTR](state, { payload }) {

    },
    [C.QUERY_SALES_CHANGE_LIST](state, { payload }) {

    },
    [C.QUERY_SALE_ORDER](state, { payload }) {

    },
    [C.QUERY_SALE_MENUORDERNUM](state, { payload }) {

    },
    [C.QUERY_SALES_ORDER_LIST](state, { payload }) {

    },
    [C.QUERY_CHANNEL_ADDRESSBYID](state, { payload }) {

    },
    [C.UPDATE_CHANNEL_ADDRESS](state, { payload }) {

    },
    [C.CREATE_CHANNEL_ADDRESS](state, { payload }) {

    },
    [C.UPDATE_CHANNEL_ADDRESSSTATUS](state, { payload }) {

    },
    [C.UPDATE_CHANNEL_DEFALUTADDRESS](state, { payload }) {

    },
    [C.QUERY_CHANNEL_BYSEARCH](state, { payload }) {

    },
    [C.QUERY_SALES_GOODSLIST](state, { payload }) {

    },
    [C.UPDATE_SALES_ORDER](state, { payload }) {

    },
    [C.CREATE_SALES_ORDER_ORDERADD](state, { payload }) {

    },
    [C.QUERY_SALES_CHANGE_LIST](state, { payload }) {

    },
    [C.QUERY_SALES_OUTSTORELIST](state, { payload }) {

    },
    [C.EDIT_ORDER_STATUS](state, { payload }) {

    },
    [C.QUERTY_CHANNEL_TEMPLATE](state, { payload }) {

    },
    [C.QUERTY_ROUTER_LIST](state, { payload }) {

    },
    [C.UPDATE_ORDER_ADDRESS](state, { payload }) {

    },
    [C.UPDATA_SALES_ERROEREFUSE](state, { payload }) {

    },
    IMPORT_SALES_ORDER_SUCESS(state, payload) {
        state.importSalesOrderStatus = payload;
    },

    
    //----渠道管理
    //--渠道通用查询
    //通过渠道名称查询所有渠道
    [C.CHANNEL_CHANNELQUERY](state, { payload }) {

    },
    //--渠道计划及考核
    //查询列表（分页）
    [C.CHANNELPLAN_QUERYLISTPAGE](state, { payload }) {

    },
    //新增渠道计划
    [C.CHANNELPLAN_ADD](state, { payload }) {

    },
    //编辑渠道计划
    [C.CHANNELPLAN_EDIT](state, { payload }) {

    },
    //删除渠道计划
    [C.CHANNELPLAN_DELETE](state, { payload }) {

    },
    //计算
    [C.CHANNELPLAN_COMPUTE](state, { payload }) {

    },
    //查询详情 
    [C.CHANNELPLAN_QUERY](state, { payload }) {

    },
    //--渠道价格和存量定义
    //通过渠道ID查询所有渠道商品
    [C.CHANNEL_QUERYALLBYCHANNELID](state, { payload }) {

    },
    //查询列表（分页）
    [C.CHANNELPRICE_QUERYLISTPAGE](state, { payload }) {

    },
    //新增渠道计划
    [C.CHANNELPRICE_ADD](state, { payload }) {

    },
    //编辑渠道计划
    [C.CHANNELPRICE_EDIT](state, { payload }) {

    },
    //删除渠道计划
    [C.CHANNELPRICE_DELETE](state, { payload }) {

    },
    //重置
    [C.CHANNELPRICE_RESET](state, { payload }) {

    },
    //查询详情 
    [C.CHANNELPRICE_QUERY](state, { payload }) {

    },


};
export default {
    state,
    mutations,
    getters
}
