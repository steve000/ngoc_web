
/**
 * Created by issuser on 2018/4/4.
 */
import * as C from "../../../constants/api";
import Api, {createAction} from "../../../utils/api";
export default{
    //销售流水list
    saleBillList: createAction(C.SALE_BILL_LIST, Api.saleBillList),
    //销售流水详情
    saleBillDetails: createAction(C.SALE_BILL_DETAILS, Api.saleBillDetails),
    
}
