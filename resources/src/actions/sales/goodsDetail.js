/**
 * Created by issuser on 2018/4/4.
 */
import * as C from "../../constants/api";
import Api, {createAction} from "../../utils/api";
export default{
    //查询全部sku列表
    queryGoodsDetail: createAction(C.QUERY_SALE_ORDER_WITHID, Api.querySalesOrderId),
}
