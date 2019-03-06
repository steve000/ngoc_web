import * as C from "../../../constants/api";
import utils from '../../../utils/misc'

const state = {
    add: {
        code: 0,
        msg: "",
        data: {}
    },

    edit: {
        code: 0,
        msg: "",
        data: {}
    },

    list: {
        pageNo:1,
        pageSize: 10,
        totalCount: 41,
        result: []
    }

};

const mutations = {

    [C.DIGITALATTR_ADD](state, {payload}){
        const {code, msg, data} = payload
        state.add.code = code
        state.add.msg = msg
        state.add.data = data
    },

    [C.DIGITALATTR_EDIT](state, {payload}){
        const {code, msg, data} = payload
        state.edit.code = code
        state.edit.msg = msg
        state.edit.data = data
    },

    [C.QUERY_DIGITALATTR_LIST](state, { payload }) {
        const {pageNo, totalCount, pageSize, result} = payload
        state.list.pageNo = pageNo
        state.list.pageSize = pageSize
        state.list.totalCount = totalCount
        state.list.result = result
    },

    [C.DIGITALATTR_SPU_IFEXIST](state, { payload }) {
    }

};

export default {
    state,
    mutations
}
