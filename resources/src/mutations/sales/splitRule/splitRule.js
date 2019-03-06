import * as C from "../../../constants/api";
//拆单规则
const state = {
    // 分页查询
    splitRuleList: {
        totalCount: 0,
        result: []
    }
};

const mutations = {

    [C.SALE_SPLITRULE_LIST](state, { payload }) {
        state.splitRuleList.totalCount = payload.totalCount
        state.splitRuleList.result = payload.result
    },
    [C.SALE_SPLITRULE_ADD](state, { payload }) {
    },
    [C.SALE_SPLITRULE_DELETE](state, { payload }) {
    }
};
export default {
    state,
    mutations
}
