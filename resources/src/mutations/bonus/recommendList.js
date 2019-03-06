import * as C from "../../constants/api";
const state = {
    recommendList:{
        pageNo:1,
        pageSize: 10,
        totalCount: 0,
        result: []
    }
};
const mutations = {
    [C.QUERY_RECOMMEND_LIST](state, { payload }) {
        const {pageNo, totalCount, pageSize,result} = payload
        state.recommendList.pageNo = pageNo
        state.recommendList.pageSize = pageSize
        state.recommendList.totalCount = totalCount
        state.recommendList.result = result
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
