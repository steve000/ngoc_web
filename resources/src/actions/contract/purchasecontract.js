import * as C from "../../constants/api";
import Api, {createAction} from "../../utils/api";
export default{
    //[v1.0.2]搜索业务实体的所有采购合同列表
    queryEntityContractList:createAction(C.QUERY_CONTRACT_LIST, Api.queryEntityContractList),
    //查询采购合同列表
    queryContractList: createAction(C.QUERY_CONTRACT_LIST, Api.queryContractList),
    //启用采购合同
    EnableEffectiveContract: createAction(C.ENABLE_EFFECTIVE_CONTRACT, Api.EnableEffectiveContract),
    //查询采购合同详情
    QueryPurchaseOrderDetailList: createAction(C.QUERY_PURCHASE_ORDER_DETAILS_LIST, Api.QueryPurchaseOrderDetailList),
    //保存采购合同
    SavePurchseContract: createAction(C.SAVE_PURCHASE_CONTRACT, Api.SavePurchseContract),
    //搜索业务实体下的商品列表
    SearchGoodsList: createAction(C.SEARCH_GOODS_LIST, Api.SearchGoodsList),
    //搜索采购合同
    SearchPurchaseContract: createAction(C.SEARCH_PURCHASE_CONTRACT, Api.SearchPurchaseContract),
    //新增业务实体的采购合同
    AddPurchaseContract: createAction(C.ADD_PURCHASE_CONTRACT, Api.AddPurchaseContract),
    //获取业务实体的供应商列表
    QueryVendorList: createAction(C.QUERY_VENDOR_LIST, Api.QueryVendorList),
    //修改业务实体的采购合同
    ModifyPurchaseContract: createAction(C.MODIFY_PURCHASE_CONTRACT, Api.ModifyPurchaseContract),
    //[v1.0.2]根据条件查询合同的商品列表
    QueryContractProductList: createAction(C.QUERY_CONTRACT_PRODUCT_LIST, Api.QueryContractProductList),
    //[v1.0.2]根据合同序号获取采购订单列表
    ContractSeqPurchaseList: createAction(C.CONTRACT_SEQ_PURCHASE_LIST, Api.ContractSeqPurchaseList),
    //[v1.0.2.1]根据合同序号查询采购商品列表
    ContractPurchaseSkuList: createAction(C.CONTRACT_PURCHASE_SKU_LIST, Api.ContractPurchaseSkuList),

    /** 合同管理 */
    //查询列表（分页）
    purchaseContractQuerypagelist: createAction(C.PURCHASE_CONTRACT_QUERYPAGELIST, Api.purchaseContractQuerypagelist),
    //查询列表（所有）
    purchaseContractQueryall: createAction(C.PURCHASE_CONTRACT_QUERYALL, Api.purchaseContractQueryall),
    //新增合同
    purchaseContractAdd: createAction(C.PURCHASE_CONTRACT_ADD, Api.purchaseContractAdd),
    //编辑合同
    purchaseContractEdit: createAction(C.PURCHASE_CONTRACT_EDIT, Api.purchaseContractEdit),
    //修改合同状态(启用、作废)
    purchaseContractChangecontractstatus: createAction(C.PURCHASE_CONTRACT_CHANGECONTRACTSTATUS, Api.purchaseContractChangecontractstatus),
    //删除合同
    purchaseContractDelete: createAction(C.PURCHASE_CONTRACT_DELETE, Api.purchaseContractDelete),
    //合同管理查看
    purchaseContractQuery: createAction(C.PURCHASE_CONTRACT_QUERY, Api.purchaseContractQuery),

}
