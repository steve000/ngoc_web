import * as C from "../../../constants/api";
import * as AC from "../../../constants/actions";
import Api, { createAction } from "../../../utils/api";
export default {

    //商品多条码 增加 删除 分页查询
    goodsMultiBarAdd: createAction(C.MULTIBAR_ADD, Api.multiBarAdd),
    goodsMultiBarDelete: createAction(C.MULTIBAR_DELETE, Api.multiBarDelete),
    queryGoodsMultiBarList: createAction(C.QUERY_MULTIBAR_LIST, Api.queryMultiBarList)
}