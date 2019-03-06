import * as C from "../../constants/api";
import Api, {createAction} from "../../utils/api";
export default {
	//设置模块
    //[v1.0.2]获取用户实体下的仓库列表
    getStorehouseListQuery: createAction(C.QUERY_STOREHOUSE_LIST, Api.getStorehouseListQuery),
	//[v1.0.2.1]查询用户实体下的全部仓库列表
    queryAllStorehouseList: createAction(C.QUERY_ALL_STOREHOUSE_LIST, Api.queryAllStorehouseList),
    //[v1.0.2.1]修改仓库状态
    changeStorehouseStatus: createAction(C.CHANGE_STOREHOUSE_STATUS, Api.changeStorehouseStatus),
    //[v1.0.2.1]根据仓库id获取仓库信息
    queryStorehouseById: createAction(C.QUERY_STOREHOUSE_BY_ID, Api.queryStorehouseById),
    //[v1.0.2.1]校验外部仓库信息
    checkExtStorehouse: createAction(C.CHECK_EXT_STOREHOUSE, Api.checkExtStorehouse),
    //获取仓库列表
	getStorehouseList: createAction(C.GET_STOREHOUSE_LIST, Api.getStorehouseList),
	//创建仓库
	createStorehouse: createAction(C.CREATE_STOREHOUSE, Api.createStorehouse),
    //修改仓库联系人
    modifyStorehouseLink: createAction(C.MODIFY_STOREHOUSE_LINK, Api.modifyStorehouseLink),
    //删除仓库联系人
    deleteStorehouseLink: createAction(C.DELETE_STOREHOUSE_LINK, Api.deleteStorehouseLink),
    //新增仓库联系人
    addStorehouseLink: createAction(C.ADD_STOREHOUSE_LINK, Api.addStorehouseLink),
    //修改仓库
    modifyStorehouse: createAction(C.MODIfY_STOREHOUSE, Api.modifyStorehouse)
}
