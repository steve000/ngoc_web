import * as C from "../constants/api";
import utils from '../utils/misc'

const state = {
    brands: {
        pageNo:1,
        pageSize: 10,
        total: 0,
        result: []
    }
};

const mutations = {

    [C.GOODS_CONFIG_BRAND](state, { payload }) {
        const {pageNo, total, result} = payload
        state.brands.pageNo = pageNo
        state.brands.total = total
        state.brands.result = result
    }
};

export default {
    state,
    mutations
}
