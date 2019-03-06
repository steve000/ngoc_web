import * as AC from "../constants/actions";
import * as C from "../constants/api";
import Api, {createAction} from "../utils/api";
import { create } from "domain";

export default {
    //登录登出
    //登录
    login: createAction(C.USER_LOGIN, Api.loginin),
    //登出
    logout: createAction(C.USER_LOGOUT, Api.logout),
    //查询用户下所有业务实体列表
    getUserEntityListDo: createAction(C.GET_USER_ENTITY_LIST, Api.getUserEntityList),
    changeCurrentEntity: createAction(AC.CHANGE_CURRENT_ENTITY, curEntity => Promise.resolve(curEntity)),
    changeCurrentEntityId: createAction(AC.CHANGE_CURRENT_ENTITY_ID, curEntityId => Promise.resolve(curEntityId)),

    showPageLoading: createAction(AC.SHOW_PAGE_LOADING),
    hidePageLoading: createAction(AC.HIDE_PAGE_LOADING),
    changeCurrentUser: createAction(AC.CHANGE_CURRENT_USER, user => Promise.resolve(user)),
    changeCurrentUserId: createAction(AC.CHANGE_CURRENT_USER_ID, userId => Promise.resolve(userId)),

    addTabCache: createAction(AC.TAB_CACHE_ADDED, params => Promise.resolve(params)),
    removeTabCache: createAction(AC.TAB_CACHE_REMOVED, params => Promise.resolve(params))
}
