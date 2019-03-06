import * as C from "../../constants/api";
const state = {
    payCheck: {
        list: [],
        totalCount: 0
    },
};
const mutations = {
    //经销对账
    [C.PAYCHECK_LIST](state, { payload }) {
        state.payCheck.list = payload.result;
        state.payCheck.totalCount = payload.totalCount;
    },
    [C.PAYCHECK_ADD](state, { payload }) {

    },
    [C.PAYCHECK_EDIT](state, { payload }) {

    },
    [C.PAYCHECK_DELETE](state, { payload }) {

    },
    [C.PAYCHECK_CHANGESTATUS](state, { payload }) {

    },
    [C.PAYCHECK_INFO](state, { payload }) {

    },
    [C.PAYCHECK_QUERYOUTSETTLE](state, { payload }) {

    },

};
export default {
    state,
    mutations
}
