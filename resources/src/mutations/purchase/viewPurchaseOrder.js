import * as C from "../../constants/api";
import utils from '../../utils/misc'

const state = {
    queryPurchaseDetails: {},
    queryPurchaseLog:{},
    queryPurchaseIdModify:{},
    querySinglePutstorage:{},
    queryPurchaseApproveLog:{},

};
const mutations = {
    [C.QUERY_PURCHASE_APPROVE_lOG](state, { payload }) {
        const {queryPurchaseApproveLog} = payload
        state.queryPurchaseApproveLog = payload
    },
    [C.QUERY_PURCHASE_DETAILS](state, { payload }) {
        const {queryPurchaseLog} = payload
        state.queryPurchaseDetails = payload
    },
    [C.QUERY_PURCHASE_LOG](state, { payload }) {
        const {queryPurchaseLog} = payload
        state.queryPurchaseLog = payload
    },
    [C.QUERY_PURCHASE_ID_MODIFY](state, { payload }) {
        const {queryPurchaseIdModify} = payload
        state.queryPurchaseIdModify = payload
    },
    [C.QUERY_SINGLE_PUTSTORAGE](state, { payload }) {
        const {querySinglePutstorage} = payload
        state.querySinglePutstorage = payload
    },
};

export default {
    state,
    mutations
}
