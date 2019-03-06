import * as C from "../constants/api";
import Api, {createAction} from "../utils/api";

export default {
    //地址选择组件
    // 查询省列表
    queryProvinceList: createAction(C.QUERY_PROVINCE_LIST, Api.queryProvinceList),
    // 查询市列表
    queryCityList: createAction(C.QUERY_CITY_LIST, Api.queryCityList),
    // 查询地区列表
    queryAreaList: createAction(C.QUERY_AREA_LIST, Api.queryAreaList)
}




