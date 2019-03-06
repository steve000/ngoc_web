import * as C from "../../../constants/api";
import * as AC from "../../../constants/actions";
import Api, { createAction } from "../../../utils/api";
export default {
    //商品管理_标签管理
    // 增加
    manageTagAdd: createAction(C.MANAGE_TAG_ADD, Api.manageTagAdd),
    // 删除
    manageTagDelete: createAction(C.MANAGE_TAG_DELETE, Api.manageTagDelete),
    // 分页
    manageTagList: createAction(C.MANAGE_TAG_LIST, Api.manageTagList),
    // 所有
    manageTagAll: createAction(C.MANAGE_TAG_ALL, Api.manageTagAll),
}