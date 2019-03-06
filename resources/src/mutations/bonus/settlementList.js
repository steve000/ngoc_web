import * as C from "../../constants/api";
const state = {
    settlementList:{
        pageNo:1,
        pageSize: 10,
        totalCount: 0,
        result: []
    }
};
const mutations = {
    [C.QUERY_SETTLEMENT_LIST](state, { payload }) {
        const {pageNo, totalCount, pageSize,result} = payload
        state.settlementList.pageNo = pageNo
        state.settlementList.pageSize = pageSize
        state.settlementList.totalCount = totalCount
        state.settlementList.result = result
    },
    [C.EXPORT_SETTLEMENT_LIST](state, { payload }) {

    },  
    [C.QUERY_REGION_LIST](state, { payload }) {

    },
    [C.QUERY_PLATFORM_LIST](state, { payload }) {

    }

};
export default {
    state,
    mutations
}
