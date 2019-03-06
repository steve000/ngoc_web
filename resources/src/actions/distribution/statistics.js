import * as C from "../../constants/api";
import Api, { createAction } from "../../utils/api";
export default {

    //统计模块
    distributionCount: createAction(C.DISTRIBUTION_ORDER_COUNT, Api.distributionCount),
    requireCount: createAction(C.REQUIRE_ORDER_COUNT, Api.requireCount),
    returnCount: createAction(C.RETURN_ORDER_COUNT, Api.returnCount),
    recommendCount: createAction(C.RECOMMEND_ORDER_COUNT, Api.recommendCount),

    purchaseOrderCount: createAction(C.PURCHASE_ORDER_COUNT, Api.purchaseOrderCount),
    purchaseReturnBillCount: createAction(C.PURCHASE_RETURNBILL_COUNT, Api.purchaseReturnBillCount),

    accountPayCheckCount: createAction(C.ACCOUNT_PAYCHECK_COUNT, Api.accountPayCheckCount),
    accountReceiveCheckCount: createAction(C.ACCOUNT_RECEIVECHECK_COUNT, Api.accountReceiveCheckCount),
}