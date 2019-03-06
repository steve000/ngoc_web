import * as C from "../../../constants/api";

const state = {
    queryStockSkuPrice: '',
    queryUserGroupStoreHouse: '',
    inventoryPageList: '',
    inventoryAdd:'',
    inventoryEdit:'',
    inventoryDelete:'',
    inventoryInfo:'',
    inventoryChangeStatus: '',
    inventoryChangeAppstatus:''
};

const mutations = {
    //查询商品库存单价
    [C.QUERY_STOCK_SKU_PRICE](state, { payload }) {},
    //查询用户实体下仓库信息
    [C.QUERY_USER_GROUP_STORE_HOUSE](state, { payload }) {},
    //盘点清单list
    [C.INVENTORY_LIST](state, { payload }) {},
    //新增盘点
    [C.INVENTORY_ADD](state, { payload }) {},
    //修改盘点
    [C.INVENTORY_EDIT](state, { payload }) {},
    //删除盘点
    [C.INVENTORY_DELETE](state, { payload }) {},
    //盘点详情
    [C.INVENTORY_INFO](state, { payload }) {},
    //盘点状态修改
    [C.INVENTORY_CHANGE_STATUS](state, { payload }) {},
    //盘点状态修改
    [C.INVENTORY_CHANGE_APPSTATUS](state, { payload }) {},
};
export default {
    state,
    mutations
}
