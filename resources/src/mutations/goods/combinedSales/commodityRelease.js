import * as C from "../../../constants/api";

const state = {

    list: {
        totalCount: 0,
        result: []
    }

};

const mutations = {

    [C.GROUPSKU_LIST](state, { payload }) {
        const {totalCount, result} = payload
        state.list.totalCount = totalCount
        state.list.result = result
    },

    [C.GROUPSKU_ADD](state, {payload}){
    },

    [C.GROUPSKU_EDIT](state, {payload}){
    },

    [C.GROUPSKU_DELETE](state, {payload}){
    },

    [C.GROUPSKU_QUERY](state, { payload }) {
    }

};

export default {
    state,
    mutations
}
