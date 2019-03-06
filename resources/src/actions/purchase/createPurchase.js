/**
 * Created by issuser on 2018/4/4.
 */
import * as C from "../../constants/api";
import Api, {createAction} from "../../utils/api";
export default{

    //查询全部sku列表
    querySkuList: createAction(C.SKU_LIST, Api.querySkuList),
    //根据skuId查询sku详情
    querySkuDetail: createAction(C.SKU_DETAIL, Api.querySkuDetail),
    //修改采购订单
    editPurchaseOrder: createAction(C.SAVE_PURCHASE_ORDER, Api.editPurchaseOrder),
    //创建采购订单
    createProcureOrder: createAction(C.CREATE_PURCHASE_ORDER, Api.createProcureOrder),
    //新增或修改采购订单
    savePurchaseOrder:createAction(C.SAVE_PURCHASE_ORDERS, Api.savePurchaseOrder),
    //提交采购订单审批
    approvePurchaseOrder:createAction(C.APPROVE_PURCHASE_ORDER, Api.approvePurchaseOrder),


    //通过用户名查询所有用户列表
    sysUserQueryall: createAction(C.SYS_USER_QUERYALL, Api.sysUserQueryall),
    //采购--通用--查询用户实体下的供应商列表
    vendorQuerylistbyusergroupid: createAction(C.VENDOR_QUERYLISTBYUSERGROUPID, Api.vendorQuerylistbyusergroupid),
    //通过用户名查询用户、用户实体列表
    userQueryuserandusergrouplist: createAction(C.USER_QUERYUSERANDUSERGROUPLIST, Api.userQueryuserandusergrouplist),
    //用户实体--查询所有
    userGroupAll: createAction(C.USER_GROUP_ALL, Api.userGroupAll),
    //用户实体--根据用户实体名称查询用户实体ID列表
    userGroupQueryusergroupidlist: createAction(C.USER_GROUP_QUERYUSERGROUPIDLIST, Api.userGroupQueryusergroupidlist),
    //用户实体--根据用户实体ID和状态查询用户实体
    userGroupQueryuserbyusergroupid: createAction(C.USER_GROUP_QUERYUSERBYUSERGROUPID, Api.userGroupQueryuserbyusergroupid),
    //用户实体--查询当前用户下实体
    userGroupQuery: createAction(C.USER_GROUP_QUERY, Api.userGroupQuery),
}
