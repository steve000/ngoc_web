/**
 * Created by issuser on 2018/6/23.
 */
import * as C from "../../constants/api";
import Api, {createAction} from "../../utils/api";
export default{

    //退货单-list add edit approve delete info instock
    purchaseReturnBillList: createAction(C.PURCHASE_RETURNBILL_LIST, Api.purchaseReturnBillList),

    purchaseReturnBillAdd: createAction(C.PURCHASE_RETURNBILL_ADD, Api.purchaseReturnBillAdd),

    purchaseReturnBillEdit: createAction(C.PURCHASE_RETURNBILL_EDIT, Api.purchaseReturnBillEdit),

    purchaseReturnBillChangeStatus: createAction(C.PURCHASE_RETURNBILL_CHANGESTATUS, Api.purchaseReturnBillChangeStatus),

    purchaseReturnBillChangeApproveStatus: createAction(C.PURCHASE_RETURNBILL_CHANGEAPPROVESTATUS, Api.purchaseReturnBillChangeApproveStatus),

    purchaseReturnBillDelete: createAction(C.PURCHASE_RETURNBILL_DELETE, Api.purchaseReturnBillDelete),

    purchaseReturnBillQuery: createAction(C.PURCHASE_RETURNBILL_QUERY, Api.purchaseReturnBillQuery),

    purchaseReturnBillOutStock: createAction(C.PURCHASE_RETURNBILL_OUTSTOCK, Api.purchaseReturnBillOutStock),
}
