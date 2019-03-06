import * as C from "../../constants/api";
import utils from '../../utils/misc'

const state = {
    list: {
        pageNo:1,
        pageSize: 10,
        total: 0,
        result: []
    },

    newList: {
        pageNo:1,
        pageSize: 10,
        total: 0,
        result: []
    },

    oneList: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        result: []
    }
};

const mutations = {

    [C.GOODS_LIST](state, { payload }) {
        const {pageNo, total, pageSize,result} = payload
        state.list.pageNo = pageNo
        state.list.pageSize = pageSize
        state.list.total = total
        state.list.result = result
    },

    [C.GOODS_LIST_NEW](state, { payload }) {
        const {pageNo, total, pageSize,result} = payload
        state.list.pageNo = pageNo
        state.list.pageSize = pageSize
        state.list.total = total
        state.list.result = result
    },

    [C.ONE_GOODS_LIST](state, { payload }) {
        const {pageNo, total, pageSize,result} = payload
        state.oneList.pageNo = pageNo
        state.oneList.pageSize = pageSize
        state.oneList.total = total
        state.oneList.result = result
    },

    [C.GOODS_LIST_SKU](state, {payload}){

    }
};

export default {
    state,
    mutations
}
