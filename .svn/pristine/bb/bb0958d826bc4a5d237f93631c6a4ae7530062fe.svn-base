import * as C from "../../../constants/api";
const state = {
    // 普通促销
    normalPromotionList: {
        pageNo:1,
        pageSize: 10,
        totalCount: 41,
        result: []
    },
    normalPromotionAdd: {
        code: 0,
        msg: "",
        data: {}
    },
    normalPromotionEdit: {
        code: 0,
        msg: "",
        data: {}
    },
    normalPromotionChange: {
        code: 0,
        msg: "",
        data: {}
    },
    normalPromotionChangeApp: {
        code: 0,
        msg: "",
        data: {}
    },
    normalPromotionDelete: {
        code: 0,
        msg: "",
        data: {}
    },
    normalPromotionInfo: {
        code: 0,
        msg: "",
        data: {}
    },
    // 组合促销
    combPromotionList: {
        pageNo:1,
        pageSize: 10,
        totalCount: 41,
        result: []
    },
    combPromotionAdd: {
        code: 0,
        msg: "",
        data: {}
    },
    combPromotionEdit: {
        code: 0,
        msg: "",
        data: {}
    },
    combPromotionChange: {
        code: 0,
        msg: "",
        data: {}
    },
    combPromotionChangeApp: {
        code: 0,
        msg: "",
        data: {}
    },
    combPromotionDelete: {
        code: 0,
        msg: "",
        data: {}
    },
    combPromotionInfo: {
        code: 0,
        msg: "",
        data: {}
    },
    // 赠卷促销
    presentPromotionList: {
        pageNo:1,
        pageSize: 10,
        totalCount: 41,
        result: []
    },
    presentPromotionAdd: {
        code: 0,
        msg: "",
        data: {}
    },
    presentPromotionEdit: {
        code: 0,
        msg: "",
        data: {}
    },
    presentPromotionChange: {
        code: 0,
        msg: "",
        data: {}
    },
    presentPromotionChangeApp: {
        code: 0,
        msg: "",
        data: {}
    },
    presentPromotionDelete: {
        code: 0,
        msg: "",
        data: {}
    },
    presentPromotionInfo: {
        code: 0,
        msg: "",
        data: {}
    },
    // 条件组合促销
    conGroupPromotionList: {
        pageNo:1,
        pageSize: 10,
        totalCount: 41,
        result: []
    },
    conGroupPromotionAdd: {
        code: 0,
        msg: "",
        data: {}
    },
    conGroupPromotionEdit: {
        code: 0,
        msg: "",
        data: {}
    },
    conGroupPromotionChange: {
        code: 0,
        msg: "",
        data: {}
    },
    conGroupPromotionChangeApp: {
        code: 0,
        msg: "",
        data: {}
    },
    conGroupPromotionDelete: {
        code: 0,
        msg: "",
        data: {}
    },
    conGroupPromotionInfo: {
        code: 0,
        msg: "",
        data: {}
    },
};
const mutations = {
    // 普通促销
    [C.NORMAL_PROMOTION_LIST](state, { payload }) {
        const {pageNo, totalCount, pageSize, result} = payload
        state.normalPromotionList.pageNo = pageNo
        state.normalPromotionList.pageSize = pageSize
        state.normalPromotionList.totalCount = totalCount
        state.normalPromotionList.result = result
    },
    [C.NORMAL_PROMOTION_ADD](state, { payload }) {
        const {code, msg, data} = payload
        state.normalPromotionAdd.code = code
        state.normalPromotionAdd.msg = msg
        state.normalPromotionAdd.data = data
    },
    [C.NORMAL_PROMOTION_EDIT](state, { payload }) {
        const {code, msg, data} = payload
        state.normalPromotionEdit.code = code
        state.normalPromotionEdit.msg = msg
        state.normalPromotionEdit.data = data
    },
    [C.NORMAL_PROMOTION_CHANGE_STATU](state, { payload }) {
        const {code, msg, data} = payload
        state.normalPromotionChange.code = code
        state.normalPromotionChange.msg = msg
        state.normalPromotionChange.data = data
    },
    [C.NORMAL_PROMOTION_CHANGE_APPROVE](state, { payload }) {
        const {code, msg, data} = payload
        state.normalPromotionChangeApp.code = code
        state.normalPromotionChangeApp.msg = msg
        state.normalPromotionChangeApp.data = data
    },
    [C.NORMAL_PROMOTION_DELETE](state, { payload }) {
        const {code, msg, data} = payload
        state.normalPromotionDelete.code = code
        state.normalPromotionDelete.msg = msg
        state.normalPromotionDelete.data = data
    },
    [C.NORMAL_PROMOTION_QUERY](state,{payload}){
        const {code, msg, data} = payload
        state.normalPromotionInfo.code = code
        state.normalPromotionInfo.msg = msg
        state.normalPromotionInfo.data = data
    },
    // 组合促销
    [C.COMB_PROMOTION_LIST](state, { payload }) {
        const {pageNo, totalCount, pageSize, result} = payload
        state.combPromotionList.pageNo = pageNo
        state.combPromotionList.pageSize = pageSize
        state.combPromotionList.totalCount = totalCount
        state.combPromotionList.result = result
    },
    [C.COMB_PROMOTION_ADD](state, { payload }) {
        const {code, msg, data} = payload
        state.combPromotionAdd.code = code
        state.combPromotionAdd.msg = msg
        state.combPromotionAdd.data = data
    },
    [C.COMB_PROMOTION_EDIT](state, { payload }) {
        const {code, msg, data} = payload
        state.combPromotionEdit.code = code
        state.combPromotionEdit.msg = msg
        state.combPromotionEdit.data = data
    },
    [C.COMB_PROMOTION_CHANGE_STATU](state, { payload }) {
        const {code, msg, data} = payload
        state.combPromotionChange.code = code
        state.combPromotionChange.msg = msg
        state.combPromotionChange.data = data
    },
    [C.COMB_PROMOTION_CHANGE_APPROVE](state, { payload }) {
        const {code, msg, data} = payload
        state.combPromotionChangeApp.code = code
        state.combPromotionChangeApp.msg = msg
        state.combPromotionChangeApp.data = data
    },
    [C.COMB_PROMOTION_DELETE](state, { payload }) {
        const {code, msg, data} = payload
        state.combPromotionDelete.code = code
        state.combPromotionDelete.msg = msg
        state.combPromotionDelete.data = data
    },
    [C.COMB_PROMOTION_QUERY](state,{payload}){
        const {code, msg, data} = payload
        state.combPromotionInfo.code = code
        state.combPromotionInfo.msg = msg
        state.combPromotionInfo.data = data
    },
    // 赠卷促销
    [C.PRESENT_PROMOTION_LIST](state, { payload }) {
        const {pageNo, totalCount, pageSize, result} = payload
        state.presentPromotionList.pageNo = pageNo
        state.presentPromotionList.pageSize = pageSize
        state.presentPromotionList.totalCount = totalCount
        state.presentPromotionList.result = result
    },
    [C.PRESENT_PROMOTION_ADD](state, { payload }) {
        const {code, msg, data} = payload
        state.presentPromotionAdd.code = code
        state.presentPromotionAdd.msg = msg
        state.presentPromotionAdd.data = data
    },
    [C.PRESENT_PROMOTION_EDIT](state, { payload }) {
        const {code, msg, data} = payload
        state.presentPromotionEdit.code = code
        state.presentPromotionEdit.msg = msg
        state.presentPromotionEdit.data = data
    },
    [C.PRESENT_PROMOTION_CHANGE_STATU](state, { payload }) {
        const {code, msg, data} = payload
        state.presentPromotionChange.code = code
        state.presentPromotionChange.msg = msg
        state.presentPromotionChange.data = data
    },
    [C.PRESENT_PROMOTION_CHANGE_APPROVE](state, { payload }) {
        const {code, msg, data} = payload
        state.presentPromotionChangeApp.code = code
        state.presentPromotionChangeApp.msg = msg
        state.presentPromotionChangeApp.data = data
    },
    [C.PRESENT_PROMOTION_DELETE](state, { payload }) {
        const {code, msg, data} = payload
        state.presentPromotionDelete.code = code
        state.presentPromotionDelete.msg = msg
        state.presentPromotionDelete.data = data
    },
    [C.PRESENT_PROMOTION_QUERY](state,{payload}){
        const {code, msg, data} = payload
        state.presentPromotionInfo.code = code
        state.presentPromotionInfo.msg = msg
        state.presentPromotionInfo.data = data
    },
    // 条件组合促销
    [C.CONGROUP_PROMOTION_LIST](state, { payload }) {
        const {pageNo, totalCount, pageSize, result} = payload
        state.conGroupPromotionList.pageNo = pageNo
        state.conGroupPromotionList.pageSize = pageSize
        state.conGroupPromotionList.totalCount = totalCount
        state.conGroupPromotionList.result = result
    },
    [C.CONGROUP_PROMOTION_ADD](state, { payload }) {
        const {code, msg, data} = payload
        state.conGroupPromotionAdd.code = code
        state.conGroupPromotionAdd.msg = msg
        state.conGroupPromotionAdd.data = data
    },
    [C.CONGROUP_PROMOTION_EDIT](state, { payload }) {
        const {code, msg, data} = payload
        state.conGroupPromotionEdit.code = code
        state.conGroupPromotionEdit.msg = msg
        state.conGroupPromotionEdit.data = data
    },
    [C.CONGROUP_PROMOTION_CHANGE_STATU](state, { payload }) {
        const {code, msg, data} = payload
        state.conGroupPromotionChange.code = code
        state.conGroupPromotionChange.msg = msg
        state.conGroupPromotionChange.data = data
    },
    [C.CONGROUP_PROMOTION_CHANGE_APPROVE](state, { payload }) {
        const {code, msg, data} = payload
        state.conGroupPromotionChangeApp.code = code
        state.conGroupPromotionChangeApp.msg = msg
        state.conGroupPromotionChangeApp.data = data
    },
    [C.CONGROUP_PROMOTION_DELETE](state, { payload }) {
        const {code, msg, data} = payload
        state.conGroupPromotionDelete.code = code
        state.conGroupPromotionDelete.msg = msg
        state.conGroupPromotionDelete.data = data
    },
    [C.CONGROUP_PROMOTION_QUERY](state,{payload}){
        const {code, msg, data} = payload
        state.conGroupPromotionInfo.code = code
        state.conGroupPromotionInfo.msg = msg
        state.conGroupPromotionInfo.data = data
    },
};
export default {
    state,
    mutations
}

