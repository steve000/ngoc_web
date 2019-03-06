import * as C from "../../constants/api";
import Api, {createAction} from "../../utils/api";
export default{
    //获取酬金列表
    querySettlementList: createAction(C.QUERY_SETTLEMENT_LIST, Api.querySettlementList),
    //导出酬金列表
    exportSettlementList: createAction(C.EXPORT_SETTLEMENT_LIST, Api.exportSettlementList),
    //地区下拉列表信息
    queryRegionList: createAction(C.QUERY_REGION_LIST, Api.queryRegionList),
    //平台下拉列表信息
    queryPlatformList: createAction(C.QUERY_PLATFORM_LIST, Api.queryPlatformList)
}
