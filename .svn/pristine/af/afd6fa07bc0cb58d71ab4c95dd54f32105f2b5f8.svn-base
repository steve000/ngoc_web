import * as C from "../../constants/api";
const state = {
    distributionOrder: {
        list: [],
        totalCount: 0
    },
    requireOrder: {
        list: [],
        totalCount: 0
    },
    returnOrder: {
        list: [],
        totalCount: 0
    },
    recommendOrder: {
        list: [],
        totalCount: 0
    },
};
const mutations = {
    //配送单
    [C.DISTRIBUTIONORDER_LIST](state, { payload }) {
        state.distributionOrder.list = payload.result;
        state.distributionOrder.totalCount = payload.totalCount;
    },
    [C.DISTRIBUTIONORDER_ADD](state, { payload }) {

    },
    [C.DISTRIBUTIONORDER_EDIT](state, { payload }) {

    },
    [C.DISTRIBUTIONORDER_DELETE](state, { payload }) {

    },
    [C.DISTRIBUTIONORDER_CHANGESTATUS](state, { payload }) {

    },
    [C.DISTRIBUTIONORDER_INFO](state, { payload }) {

    },
    [C.DISTRIBUTIONORDER_OUTSTOCK](state, { payload }) {

    },
    // 要货单
    [C.REQUIREORDER_LIST](state, { payload }) {
        state.requireOrder.list = payload.result;
        state.requireOrder.totalCount = payload.totalCount;
    },
    [C.REQUIREORDER_ADD](state, { payload }) {

    },
    [C.REQUIREORDER_EDIT](state, { payload }) {

    },
    [C.REQUIREORDER_DELETE](state, { payload }) {

    },
    [C.REQUIREORDER_CHANGESTATUS](state, { payload }) {

    },
    [C.REQUIREORDER_INFO](state, { payload }) {
        
    },
    //配送退回单
    [C.RETURNORDER_LIST](state, { payload }) {
        state.returnOrder.list = payload.result;
        state.returnOrder.totalCount = payload.totalCount;
    },
    [C.RETURNORDER_ADD](state, { payload }) {

    },
    [C.RETURNORDER_EDIT](state, { payload }) {

    },
    [C.RETURNORDER_DELETE](state, { payload }) {

    },
    [C.RETURNORDER_CHANGESTATUS](state, { payload }) {

    },
    [C.RETURNORDER_INFO](state, { payload }) {
        
    },
    [C.RETURNORDER_INSTOCK](state, { payload }) {

    },
    //推荐信息接收及生成要货单
    [C.RETCOMMEND_LIST](state, { payload }) {
        state.recommendOrder.list = payload.result;
        state.recommendOrder.totalCount = payload.totalCount;
    },
    [C.RETCOMMEND_ORDER_ADD](state, { payload }) {

    },

};
export default {
    state,
    mutations
}
