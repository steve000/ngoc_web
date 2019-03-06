import * as C from "../constants/api";
import utils from '../utils/misc'

const state = {
    procurementsList: {
        pageNo:1,
        pageSize: 10,
        total: 0,
        result: []
    }
};

const mutations = {
    //这里的payload相当于回调
    [C.PROCUREMENTS_LIST](state, { payload }) {
        const {pageNo, total,result} = payload
        state.procurementsList.pageNo = pageNo
        state.procurementsList.total = total
        state.procurementsList.result = result
    }
};

export default {
    state,
    mutations
}
