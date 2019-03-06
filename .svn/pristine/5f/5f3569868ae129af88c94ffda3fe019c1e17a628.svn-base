import * as C from "../../../constants/api";
const state = {
    //销售流水
    saleBillData:{
        list: [],
        totalCount: 0
    },
    saleBillInfo: {
    },
};

const mutations = {
    //销售流水
    [C.SALE_BILL_LIST](state, { payload }) {
        state.saleBillData.list = payload.result
        state.saleBillData.totalCount = payload.totalCount
    },
    [C.SALE_BILL_DETAILS](state,{payload}){
    },
};
export default {
    state,
    mutations
}
