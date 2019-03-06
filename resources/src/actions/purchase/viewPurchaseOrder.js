import * as C from "../../constants/api";
import * as AC from "../../constants/actions";
import Api, {createAction} from "../../utils/api";
export default {
	//[v1.0.2.1]获取采购订单审批记录
    queryPurchaseApproveLog: createAction(C.QUERY_PURCHASE_APPROVE_lOG, Api.queryPurchaseApproveLog),
	//查看采购订单详情
	queryPurchaseDetails: createAction(C.QUERY_PURCHASE_DETAILS, Api.queryPurchaseDetails),
	//获取采购订单操作日志列表
    queryPurchaseLog: createAction(C.QUERY_PURCHASE_LOG, Api.queryPurchaseLog),
    //根据采购操作日志id获取修改
    queryPurchaseIdModify: createAction(C.QUERY_PURCHASE_ID_MODIFY, Api.queryPurchaseIdModify),
    //根据关联单号查询单次入库列
    querySinglePutstorage: createAction(C.QUERY_SINGLE_PUTSTORAGE, Api.querySinglePutstorage),
}