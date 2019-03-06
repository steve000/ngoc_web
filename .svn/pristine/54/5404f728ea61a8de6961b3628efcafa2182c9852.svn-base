import * as C from "../../constants/api";
const state = {
    uploadOrdersResult: '',
    importOrdersDataQueryResult:'',
    dataConfirmImport:[],
    resultDownload:[],
};
const mutations = {
    [C.IMPORT_SALES_ORDERS](state, { payload }) {
        state.uploadOrdersResult = payload.data;
    },
    [C.IMPORT_ORDERS_DATA_QUERY](state, { payload }) {
        state.importOrdersDataQueryResult = payload.data;
    },
    [C.GET_DATA_CONFIRM_IMPORT](state, { payload }) {
        state.dataConfirmImport = payload.data;
    },
    [C.GET_RESULT_DOWNLOAD](state, { payload }) {
        state.resultDownload = payload.data;
    }
};
export default {
    state,
    mutations
}
