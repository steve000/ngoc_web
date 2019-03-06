import * as C from "../../../constants/api";

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

    editType:{
        code: 0,
        msg: "",
        data: {}
    },

    editApproveType:{
        code: 0,
        msg: "",
        data: {}
    },

    delete:{
        code: 0,
        msg: "",
        data: {}
    },

    check:{
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

    //普通商品价格管理_新增
    [C.NORMAL_PRICE_GOODS_ADD](state, { payload }) {
        const {code, msg, data} = payload
        state.add.code = code
        state.add.msg = msg
        state.add.data = data
    },
    //普通商品价格管理_编辑
    [C.NORMAL_PRICE_GOODS_EDIT](state, { payload }) {
        const {code, msg, data} = payload
        state.edit.code = code
        state.edit.msg = msg
        state.edit.data = data
    },
    //普通商品价格管理_修改状态
    [C.NORMAL_PRICE_GOODS_EDIT_TYPE](state, { payload }) {
        const {code, msg, data} = payload
        state.editType.code = code
        state.editType.msg = msg
        state.editType.data = data
    },
    //普通商品价格管理_修改审批状态
    [C.NORMAL_PRICE_GOODS_EDIT_APPROVE](state, { payload }) {
        const {code, msg, data} = payload
        state.editApproveType.code = code
        state.editApproveType.msg = msg
        state.editApproveType.data = data
    },
    //普通商品价格管理_删除
    [C.NORMAL_PRICE_GOODS_DELETE](state, { payload }) {
        const {code, msg, data} = payload
        state.delete.code = code
        state.delete.msg = msg
        state.delete.data = data
    },
    //普通商品价格管理_查看
    [C.NORMAL_PRICE_GOODS_CHECK](state, { payload }) {
        const {code, msg, data} = payload
        state.check.code = code
        state.check.msg = msg
        state.check.data = data
    },
    //普通商品价格管理_查询列表(分页)
    [C.NORMAL_PRICE_GOODS_QUERY](state, { payload }) {
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
