import * as C from "../../constants/api";
import Api, {createAction} from "../../utils/api";
export default {
    //渠道订单量分布
    querySaleOrderEchartsAction: createAction(C.QUERY_SALES_ORDER_ECHARTS, Api.querySaleOrderEcharts),
    //首页-滞留订单
    queryRetentionOrderCountAction: createAction(C.QUERY_RETENTIONORDERCOUNT, Api.queryRetentionOrderCount),
    //异常订单
    queryOrderAndErrorCountAction: createAction(C.QUERY_ORDER_AND_ERROR_COUNT, Api.queryOrderAndErrorCount),

}
