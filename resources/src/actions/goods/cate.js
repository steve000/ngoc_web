/**
 * Created by issuser on 2018/3/26.
 */
import * as C from "../../constants/api";
import Api, {createAction} from "../../utils/api";
export default{
    //查询全部类目
    queryCateAll: createAction(C.QUERY_CATE_ALL, Api.queryCateAll)
}
