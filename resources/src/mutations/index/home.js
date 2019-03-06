import * as C from "../../constants/api";

const state = {
    homeToStatus:'',
    homeToErrorStatus:{
        _error:{
            errorType:null,
            isErrorType:null
        }
    },
};

const mutations = {
    //首页-滞留订单
    [C.QUERY_RETENTIONORDERCOUNT](state, { payload }) {
    
    },
    //渠道订单量分布
    [C.QUERY_SALES_ORDER_ECHARTS](state, { payload }) {

    }, 
    //链路各环节订单分布状态
    HOME_TO_ORDERSALES_STATUS(state,payload){
        state.homeToStatus=payload;
    }, 
    //异常订单状态传递
    HOME_TO_ORDERSALES_ERRORSTATUS(state,payload){
        state.homeToErrorStatus=payload;
    },
    //异常订单
    [C.QUERY_ORDER_AND_ERROR_COUNT](state, { payload }) {
    
    },
};
export default {
    state,
    mutations
}
