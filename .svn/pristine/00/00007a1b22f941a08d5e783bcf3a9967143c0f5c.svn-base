
/**
 * Created by issuser on 2018/4/4.
 */
import * as C from "../../../constants/api";
import Api, {createAction} from "../../../utils/api";
export default{
    //查询商品库存单价
    queryStockSkuPrice: createAction(C.QUERY_STOCK_SKU_PRICE, Api.queryStockSkuPrice),
    //查询用户实体下仓库信息
    queryUserGroupStoreHouse: createAction(C.QUERY_USER_GROUP_STORE_HOUSE, Api.queryUserGroupStoreHouse),
    //库存清单list
    inventoryPageList: createAction(C.INVENTORY_LIST, Api.inventoryPageList),
    //新增库存清单
    inventoryAdd: createAction(C.INVENTORY_ADD,Api.inventoryAdd),
    //删除库存盘点清单
    inventoryDeelite:createAction(C.INVENTORY_DELETE, Api.inventoryDelete),
    //编辑库存盘点清单
    inventoryEdit:createAction(C.INVENTORY_EDIT, Api.inventoryEdit),
    //查看库存盘点清单
    inventoryInfo:createAction(C.INVENTORY_INFO, Api.inventoryInfo),
    //修改状态
    inventoryChangeStatus: createAction(C.INVENTORY_CHANGE_STATUS, Api.inventoryChangeStatus),
    //修改审批状态
    inventoryChangeAppStatus: createAction(C.INVENTORY_CHANGE_APPSTATUS, Api.inventoryChangeAppStatus),
}
