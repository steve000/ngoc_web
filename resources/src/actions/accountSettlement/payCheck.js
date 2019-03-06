import * as C from "../../constants/api";
import * as AC from "../../constants/actions";
import Api, { createAction } from "../../utils/api";
export default {

    //经销对账单 增加 删除 分页查询 编辑 修改状态 查看 ...
    payCheckList: createAction(C.PAYCHECK_LIST, Api.payCheckList),
    payCheckAdd: createAction(C.PAYCHECK_ADD, Api.payCheckAdd),
    payCheckEdit: createAction(C.PAYCHECK_EDIT, Api.payCheckEdit),
    payCheckDelete: createAction(C.PAYCHECK_DELETE, Api.payCheckDelete),
    payCheckChangeStatus: createAction(C.PAYCHECK_CHANGESTATUS, Api.payCheckChangeStatus),
    payCheckInfo: createAction(C.PAYCHECK_INFO, Api.payCheckInfo),
    payCheckQueryOutSettle: createAction(C.PAYCHECK_QUERYOUTSETTLE, Api.payCheckQueryOutSettle),

}