import * as C from "../../../constants/api";
import utils from '../../../utils/misc'

const state = {

    skuListQueryByUserGroup: {

    },

    skuQuery: {
        skuId: 1000,
        productId: 11,
        productName: "",
        skuName: ""
    },

    spuQuery: {
        productId: 11,
        productName: ""
    },

};

const mutations = {

    [C.QUERY_SKULIST_BYUSERGROUP](state, { payload }) {
    },

    [C.QUERY_SKUCODE_BYPRODUCTNAME](state, { payload }) {
        const {skuId, productId, productName, skuName} = payload
        state.skuQuery.skuId = skuId
        state.skuQuery.productId = productId
        state.skuQuery.productName = productName
        state.skuQuery.skuName = skuName
    },

    [C.QUERY_SPUCODE_BYPRODUCTNAME](state, { payload }) {
        const {productId, productName} = payload
        state.spuQuery.productId = productId
        state.spuQuery.productName = productName
    }

};

export default {
    state,
    mutations
}
