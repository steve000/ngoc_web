import * as C from "../../../constants/api";
import * as AC from "../../../constants/actions";
import Api, { createAction } from "../../../utils/api";
export default {
    //商品管理_类目管理
    // 增加
    manageCategoryAdd: createAction(C.MANAGE_CATEGORY_ADD, Api.manageCategoryAdd),
    // 编辑
    manageCategoryEdit: createAction(C.MANAGE_CATEGORY_EDIT, Api.manageCategoryEdit),
    // 删除
    manageCategoryDelete: createAction(C.MANAGE_CATEGORY_DELETE, Api.manageCategoryDelete),
    // 分页
    manageCategoryList: createAction(C.MANAGE_CATEGORY_LIST, Api.manageCategoryList),
    // 所有
    manageCategoryAll: createAction(C.MANAGE_CATEGORY_ALL, Api.manageCategoryAll),
}