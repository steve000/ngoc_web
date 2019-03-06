import * as C from "../../../constants/api";
import * as AC from "../../../constants/actions";
import Api, { createAction } from "../../../utils/api";
export default {
    //商品管理_品牌管理
    // 增加
    manageBrandAdd: createAction(C.MANAGE_BRAND_ADD, Api.manageBrandAdd),
    // 编辑
    manageBrandEdit: createAction(C.MANAGE_BRAND_EDIT, Api.manageBrandEdit),
    // 删除
    manageBrandDelete: createAction(C.MANAGE_BRAND_DELETE, Api.manageBrandDelete),
    // 分页
    manageBrandList: createAction(C.MANAGE_BRAND_LIST, Api.manageBrandList),
    // 所有
    manageBrandAll: createAction(C.MANAGE_BRAND_ALL, Api.manageBrandAll),
}