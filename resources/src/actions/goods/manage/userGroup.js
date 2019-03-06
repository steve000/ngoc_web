import * as C from "../../../constants/api";
import * as AC from "../../../constants/actions";
import Api, { createAction } from "../../../utils/api";
export default {

    //实体可用商品管理_查询列表
    userGroupQueryList: createAction(C.USERGROUPSKU_QUERYLIST, Api.userGroupQueryList),
    // 批量修改状态
    userGroupChangeStatus: createAction(C.USERGROUPSKU_CHANGESTATUS, Api.userGroupChangeStatus),
    // 批量添加
    userGroupAdd: createAction(C.USERGROUPSKU_ADD, Api.userGroupAdd),
    // 批量删除
    userGroupDelete: createAction(C.USERGROUPSKU_DELETE, Api.userGroupDelete),
    // 查询可添加的SKU列表 -> 未关联商品
    userGroupUnRelationProduct: createAction(C.USERGROUPSKU_QUERYSKULIST, Api.userGroupUnRelationProduct)
}