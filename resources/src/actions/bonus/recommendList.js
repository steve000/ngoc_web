import * as C from "../../constants/api";
import Api, {createAction} from "../../utils/api";
export default{
    //获取推荐列表
    queryRecommendList: createAction(C.QUERY_RECOMMEND_LIST, Api.queryRecommendList),
    //地区下拉列表信息
    queryRegionList: createAction(C.QUERY_REGION_LIST, Api.queryRegionList),
    //平台下拉列表信息
    queryPlatfromList: createAction(C.QUERY_PLATFORM_LIST, Api.queryPlatfromList)
}
