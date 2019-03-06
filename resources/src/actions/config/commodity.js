import * as C from "../../constants/api";
import Api, {createAction} from "../../utils/api";
export default{
    //查询业务实体下的商品列表
    queryUserRelationProduct: createAction(C.QUERY_USER_RELATION_PRODUCT, Api.queryUserRelationProduct),
    //修改业务实体关联商品状态
    changeDownUserRelationProduct: createAction(C.CHANGE_DOWM_USER_RELARION_PRODUCT, Api.changeDownUserRelationProduct),
    //查询未添加到业务实体的商品
    queryUserUnRelationProduct: createAction(C.QUERY_USER_UNRELATION_PRODUCT, Api.queryUserUnRelationProduct),
    //业务实体关联商品
    userRelationProduct: createAction(C.USER_RELATION_PRODUCT, Api.userRelationProduct),
}
