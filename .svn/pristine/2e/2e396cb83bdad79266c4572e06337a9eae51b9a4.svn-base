/**
 * Created by issuser on 2018/6/23.
 */
import * as C from "../../constants/api";
const state = {
    purchaseReturnBill: {
        list: [],
        totalCount: 0
    }
};
// 采购订单-新
const mutations = {
    [C.PURCHASE_RETURNBILL_LIST](state, { payload }) {
        state.purchaseReturnBill.list = payload.result;
        state.purchaseReturnBill.totalCount = payload.totalCount;
    },
    [C.PURCHASE_RETURNBILL_ADD](state, { payload }) {
    },
    [C.PURCHASE_RETURNBILL_EDIT](state, { payload }){
    },
    // 修改状态
    [C.PURCHASE_RETURNBILL_CHANGESTATUS](state, { payload }){
    },
    // 审批
    [C.PURCHASE_RETURNBILL_CHANGEAPPROVESTATUS](state, { payload }){
    },
    [C.PURCHASE_RETURNBILL_DELETE](state, { payload }){
    },
    [C.PURCHASE_RETURNBILL_QUERY](state, { payload }){
    },
    // 出库
    [C.PURCHASE_RETURNBILL_OUTSTOCK](state, { payload }) {
    },
};
export default {
    state,
    mutations
}
