import * as C from "../../constants/api";
import utils from '../../utils/misc'

const state = {
    queryContractList: {
        pageNo:1,
        pageSize: 10,
        total: 0,
        result: []
    },
    queryEntityContractList: {
        result: []
    },
    EnableEffectiveContract:{},
    QueryPurchaseOrderDetailList:{},
    SavePurchseContract:{},
    SearchGoodsList:{
        result:[]
    },
    SearchPurchaseContract:{},
    AddPurchaseContract:{},
    QueryVendorList:{},
    ModifyPurchaseContract:{},
    QueryContractProductList:{},
    ContractSeqPurchaseList:{},
    ContractPurchaseSkuList:{},

    /** 合同管理 */
    //查询列表（分页）
    purchaseContractQuerypagelist: {},
    //查询列表（所有）
    purchaseContractQueryall: {},
    //新增合同
    purchaseContractAdd: {},
    //编辑合同
    purchaseContractEdit: {},
    //修改合同状态(启用、作废)
    purchaseContractChangecontractstatus: {},
    //删除合同
    purchaseContractDelete: {},
    //合同管理查看
    purchaseContractQuery: {},

};
const mutations = {
    [C.QUERY_CONTRACT_LIST](state, { payload }) {
        const {pageNo, total, pageSize,result} = payload
        state.queryContractList.pageNo = pageNo
        state.queryContractList.pageSize = pageSize
        state.queryContractList.total = total
        state.queryContractList.result = result
    },
    [C.QUERY_ENTITY_CONTRACT_LIST](state, { payload }) {
        const {result} = payload
        state.queryEntityContractList.result = result
    },
    [C.ENABLE_EFFECTIVE_CONTRACT](state, { payload }) {
        const {EnableEffectiveContract} = payload
        state.EnableEffectiveContract = payload
    },
    [C.QUERY_PURCHASE_ORDER_DETAILS_LIST](state, { payload }) {
        const {QueryPurchaseOrderDetailList} = payload
        state.QueryPurchaseOrderDetailList = payload
    },
    [C.SAVE_PURCHASE_CONTRACT](state, { payload }) {
        const {SavePurchseContract} = payload
        state.SavePurchseContract = payload
    },
    [C.SEARCH_GOODS_LIST](state, { payload }) {
        const {result} = payload
        state.SearchGoodsList.result = result
    },
    [C.SEARCH_PURCHASE_CONTRACT](state, { payload }) {
        const {SearchPurchaseContract} = payload
        state.SearchPurchaseContract = payload
    },
    [C.ADD_PURCHASE_CONTRACT](state, { payload }) {
        const {AddPurchaseContract} = payload
        state.AddPurchaseContract = payload
    },
    [C.QUERY_VENDOR_LIST](state, { payload }) {
        const {QueryVendorList} = payload
        state.QueryVendorList = payload
    },
    [C.MODIFY_PURCHASE_CONTRACT](state, { payload }) {
        const {ModifyPurchaseContract} = payload
        state.ModifyPurchaseContract = payload
    },
    [C.QUERY_CONTRACT_PRODUCT_LIST](state, { payload }) {
        const {QueryContractProductList} = payload
        state.QueryContractProductList = payload
    },
    [C.CONTRACT_SEQ_PURCHASE_LIST](state, { payload }) {
        const {ContractSeqPurchaseList} = payload
        state.ContractSeqPurchaseList = payload
    },
    [C.CONTRACT_PURCHASE_SKU_LIST](state, { payload }) {
        const {ContractPurchaseSkuList} = payload
        state.ContractPurchaseSkuList = payload
    },

    /** 合同管理 */
    //查询列表（分页）
    [C.PURCHASE_CONTRACT_QUERYPAGELIST](state, { payload }) {
        const {purchaseContractQuerypagelist} = payload
        state.purchaseContractQuerypagelist = payload
    },
    //查询列表（所有）
    [C.PURCHASE_CONTRACT_QUERYALL](state, { payload }) {
        const {purchaseContractQueryall} = payload
        state.purchaseContractQueryall = payload
    },
    //新增合同
    [C.PURCHASE_CONTRACT_ADD](state, { payload }) {
        const {purchaseContractAdd} = payload
        state.purchaseContractAdd = payload
    },
    //编辑合同
    [C.PURCHASE_CONTRACT_EDIT](state, { payload }) {
        const {purchaseContractEdit} = payload
        state.purchaseContractEdit = payload
    },
    //修改合同状态(启用、作废)
    [C.PURCHASE_CONTRACT_CHANGECONTRACTSTATUS](state, { payload }) {
        const {purchaseContractChangecontractstatus} = payload
        state.purchaseContractChangecontractstatus = payload
    },
    //删除合同
    [C.PURCHASE_CONTRACT_DELETE](state, { payload }) {
        const {purchaseContractDelete} = payload
        state.purchaseContractDelete = payload
    },
    //合同管理查看
    [C.PURCHASE_CONTRACT_QUERY](state, { payload }) {
        const {purchaseContractQuery} = payload
        state.purchaseContractQuery = payload
    },

};

export default {
    state,
    mutations
}
