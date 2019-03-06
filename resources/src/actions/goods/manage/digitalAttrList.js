import * as C from "../../../constants/api";
import * as AC from "../../../constants/actions";
import Api, { createAction } from "../../../utils/api";
export default {

    //商品属性 增加 编辑 分页查询
    goodsDigitalAttrAdd: createAction(C.DIGITALATTR_ADD, Api.digitalAttrAdd),
    goodsDigitalAttrEdit: createAction(C.DIGITALATTR_EDIT, Api.digitalAttrEdit),
    queryGoodsDigitalAttrList: createAction(C.QUERY_DIGITALATTR_LIST, Api.queryDigitalAttrList),
    digitalAttrEditSpuIfExist: createAction(C.DIGITALATTR_SPU_IFEXIST, Api.digitalAttrEditSpuIfExist)
}