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

    delete:{
        code: 0,
        msg: "",
        data: {}
    },

    queryListPage:{
        pageNo:1,
        pageSize: 10,
        totalCount: 41,
        result: []
    },

    query:{
        code: 0,
        msg: "",
        data: {}
    },

    addTag: {
        code: 0,
        msg: "",
        data: {}
    },

    deleteTag: {
        code: 0,
        msg: "",
        data: {}
    },

    deleteTagBatch: {
        code: 0,
        msg: "",
        data: {}
    },
    skuCommoditySkutagQueryall: {
        code: 0,
        msg: "",
        data: {}
    }

};

const mutations = {

    //SKU商品_新增
    [C.SKU_COMMODITY_MANAGEMENT_ADD](state, { payload }) {
        const {code, msg, data} = payload
        state.add.code = code
        state.add.msg = msg
        state.add.data = data
    },
    //SKU商品_编辑
    [C.SKU_COMMODITY_MANAGEMENT_EDIT](state, { payload }) {
        const {code, msg, data} = payload
        state.edit.code = code
        state.edit.msg = msg
        state.edit.data = data
    },
    //SKU商品_删除
    [C.SKU_COMMODITY_MANAGEMENT_DELETE](state, { payload }) {
        const {code, msg, data} = payload
        state.delete.code = code
        state.delete.msg = msg
        state.delete.data = data
    },
    //SKU商品_查询列表（分页）
    [C.SKU_COMMODITY_MANAGEMENT_QUERYLISTPAGE](state, { payload }) {
        const {pageNo, totalCount, pageSize, result} = payload
        state.queryListPage.pageNo = pageNo
        state.queryListPage.pageSize = pageSize
        state.queryListPage.totalCount = totalCount
        state.queryListPage.result = result
    },
    //SKU商品_查询详情
    [C.SKU_COMMODITY_MANAGEMENT_QUERY](state, { payload }) {
        const {code, msg, data} = payload
        state.query.code = code
        state.query.msg = msg
        state.query.data = data
    },
    //SKU商品_添加标签
    [C.SKU_COMMODITY_MANAGEMENT_ADDTAG](state, { payload }) {
        const {code, msg, data} = payload
        state.addTag.code = code
        state.addTag.msg = msg
        state.addTag.data = data
    },
    //SKU商品_删除标签
    [C.SKU_COMMODITY_MANAGEMENT_DELETETAG](state, { payload }) {
        const {code, msg, data} = payload
        state.deleteTag.code = code
        state.deleteTag.msg = msg
        state.deleteTag.data = data
    },
    //SKU商品_批量删除标签
    [C.SKU_COMMODITY_MANAGEMENT_DELETETAGBATCH](state, { payload }) {
        const {code, msg, data} = payload
        state.deleteTagBatch.code = code
        state.deleteTagBatch.msg = msg
        state.deleteTagBatch.data = data
    },
    //SKU商品_标签设置管理_查询列表（所有）
    [C.SKU_COMMODITY_SKUTAG_QUERYALL](state, { payload }) {
        const {code, msg, data} = payload
        state.skuCommoditySkutagQueryall.code = code
        state.skuCommoditySkutagQueryall.msg = msg
        state.skuCommoditySkutagQueryall.data = data
    }

};

export default {
    state,
    mutations
}
