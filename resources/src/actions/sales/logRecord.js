/**
 * Created by issuser on 2018/4/4.
 */
import * as C from "../../constants/api";
import Api, {createAction} from "../../utils/api";
export default{
    //查询全部sku列表
    queryLog: createAction(C.QUERY_ORDER_LOG_DETAIL, Api.queryOrderLogDetail),
    //查询日志列表
    queryLogList: createAction(C.QUERY_ORDER_LOG, Api.queryOrderLog),
}
