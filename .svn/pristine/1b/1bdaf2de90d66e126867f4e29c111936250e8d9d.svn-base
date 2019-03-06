import * as C from "../../constants/api";
import utils from '../../utils/misc'

const state = {
    list: {
        pageNo:1,
        pageSize: 10,
        total: 0,
        result: []
    },

};

const mutations = {

    [C.QUERY_STOCKOUTSHEET](state, { payload }) {
        const {pageNo, total, pageSize,result} = payload
        state.list.pageNo = pageNo
        state.list.pageSize = pageSize
        state.list.total = total
        state.list.result = result
    },
    [C.CREATE_STOREHOUSE](state, { payload }) {
    },
    [C.QUERTY_OUTBOUND_ROUTER_LIST](state, { payload }) {
    },
    [C.QUERY_STOCKOUTSHEETDETAIL](state, { payload }) {
    },
    [C.ALLOT_CHECK](state, { payload }) {
    },
    [C.QUERY_OUTSN_lIST](state, { payload }) {
    },
    [C.STOCKOUTSHEET_CANCEL](state, { payload }) {
    },
    [C.STOCKOUT_RETRY](state, { payload }) {
    }
};

export default {
    state,
    mutations
}
