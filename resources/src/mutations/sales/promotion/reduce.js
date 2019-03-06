import * as C from "../../../constants/api";
//满减
const state = {
    // 赠卷促销
    reducePromotionList: {
    },
    reducePromotionAdd: {
    },
    reducePromotionEdit: {
    },
    reducePromotionChange: {
    },
    reducePromotionChangeApp: {
    },
    reducePromotionDelete: {
    },
    reducePromotionInfo: {
    },
    payTypeList:{
    },
};

const mutations = {
//满减
    [C.REDUCE_PROMOTION_LIST](state, { payload }) {
    },
    [C.REDUCE_PROMOTION_ADD](state, { payload }) {
    },
    [C.REDUCE_PROMOTION_EDIT](state, { payload }) {
    },
    [C.REDUCE_PROMOTION_CHANGE_STATU](state, { payload }) {
    },
    [C.REDUCE_PROMOTION_CHANGE_APPROVE](state, { payload }) {
    },
    [C.REDUCE_PROMOTION_DELETE](state, { payload }) {
    },
    [C.REDUCE_PROMOTION_QUERY](state,{payload}){
    },
    [C.PAY_TYPE_LIST](state,{payload}){},
};
export default {
    state,
    mutations
}
