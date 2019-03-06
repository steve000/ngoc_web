import * as C from '../constants/api';
import utils from '../utils/misc'


const state = {
    unitList: {
        pageNo:1,
        pageSize: 10,
        total: 0,
        result: []
    }
};

const mutations = {

    [C.GOODS_CONFIG_UNIT_QUERY](state, { payload }) {
        const {pageNo, total, result} = payload
        state.unitList.pageNo = pageNo
        state.unitList.total = total
        state.unitList.result = result
    }
};

export default {
    state,
    mutations
}
