/**
 * Created by issuser on 2018/4/4.
 */
import * as C from "../../constants/api";
const state = {
    skuList: [],
    skuDetail:[],
    userQueryuserandusergrouplist: [],
    userGroupAll: [],
    userGroupQueryusergroupidlist:[],
    userGroupQueryuserbyusergroupid: [],
    userGroupQuery:[],
    vendorQuerylistbyusergroupid: [],
    sysUserQueryall: [],
};
const mutations = {
    [C.SKU_LIST](state, { payload }) {
        state.skuList = payload.data;
    },
    [C.SKU_DETAIL](state, { payload }) {
        state.skuDetail = payload.data;
    },
    [C.SAVE_PURCHASE_ORDER](state, { payload }){
    },
    [C.CREATE_PURCHASE_ORDER](state, { payload }){
    },
    [C.SAVE_PURCHASE_ORDERS](state, { payload }){
    },
    [C.APPROVE_PURCHASE_ORDER](state, { payload }){
    },


    //通过用户名查询所有用户列表
    [C.SYS_USER_QUERYALL](state, { payload }) {
        state.sysUserQueryall = payload.data;
    },
    //采购--通用--查询用户实体下的供应商列表
    [C.VENDOR_QUERYLISTBYUSERGROUPID](state, { payload }) {
        state.vendorQuerylistbyusergroupid = payload.data;
    },
    //通过用户名查询用户、用户实体列表
    [C.USER_QUERYUSERANDUSERGROUPLIST](state, { payload }) {
        state.userQueryuserandusergrouplist = payload.data;
    },
    [C.USER_GROUP_ALL](state, { payload }) {
        state.userGroupAll = payload.data;
    },
    //用户实体--根据用户实体名称查询用户实体ID列表
    [C.USER_GROUP_QUERYUSERGROUPIDLIST](state, { payload }) {
        state.userGroupQueryusergroupidlist = payload.data;
    },
    //用户实体--根据用户实体ID和状态查询用户实体
    [C.USER_GROUP_QUERYUSERBYUSERGROUPID](state, { payload }) {
        state.userGroupQueryuserbyusergroupid = payload.data;
    },
    [C.USER_GROUP_QUERY](state, { payload }) {
        state.userGroupQuery = payload.data;
    },
};
export default {
    state,
    mutations
}
