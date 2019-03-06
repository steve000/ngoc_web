import * as C from "../../constants/api";

const state = {
    afterSale: {
        list: [],
        totalCount: 0
    }
};

const mutations = {
    //首页-跟踪查询订单
    [C.SERVICE_AFTERSALE_LIST](state, { payload }) {
        state.afterSale.list = payload.result
        state.afterSale.totalCount = payload.totalCount
    },
    //跟踪查询详情
    [C.SERVICE_AFTERSALE_INFO](state, { payload }) {

    }, 
};
export default {
    state,
    mutations
}
