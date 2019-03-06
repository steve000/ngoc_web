/**
 * Created by issuser on 2018/4/4.
 */
import * as C from "../../../constants/api";
import Api, {createAction} from "../../../utils/api";
export default{
    //新增产品
    addSpu: createAction(C.ADD_SPU,Api.addSpu),
    //删除产品
    deleteSpu: createAction(C.DELETE_SPU,Api.deleteSpu),
    //修改产品
    editSpu: createAction(C.EDIT_SPU,Api.editSpu),
    //产品分页查询
    spuListPage: createAction(C.SPU_LIST_PAGE,Api.spuListPage),
    //产品详情查询
    querySpu: createAction(C.QUERY_SPU,Api.querySpu)
}
