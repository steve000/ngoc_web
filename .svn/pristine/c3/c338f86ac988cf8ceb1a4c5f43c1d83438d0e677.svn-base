import * as C from "../../../constants/api";
import utils from '../../../utils/misc'

const state = {
    add: {
        code: 0,
        msg: "",
        data: {}
    },

    delete: {
        code: 0,
        msg: "",
        data: {}
    },

    list: {
        pageNo:1,
        pageSize: 10,
        totalCount: 52,
        result: []
    }

};

const mutations = {

    [C.MULTIBAR_ADD](state, {payload}){
        const {code, msg, data} = payload
        state.add.code = code
        state.add.msg = msg
        state.add.data = data
    },

    [C.MULTIBAR_DELETE](state, {payload}){
        const {code, msg, data} = payload
        state.delete.code = code
        state.delete.msg = msg
        state.delete.data = data
    },

    [C.QUERY_MULTIBAR_LIST](state, { payload }) {
        const {pageNo, totalCount, pageSize, result} = payload
        state.list.pageNo = pageNo
        state.list.pageSize = pageSize
        state.list.totalCount = totalCount
        state.list.result = result
    }

};

export default {
    state,
    mutations
}
