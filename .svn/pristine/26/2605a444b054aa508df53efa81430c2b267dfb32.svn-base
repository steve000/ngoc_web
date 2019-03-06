import * as C from "../constants/api";
import * as AC from "../constants/actions";
import Api, {createAction} from "../utils/api";

export default {

	//查询的角色列表
	queryRoles: createAction(C.ROLES_LIST, Api.queryRolesList),


	//根据角色id获取该角色用户列表
	queryRolesUerList: createAction(C.ROLES_IDENTIFY, Api.QueryUserRoleList),

	//根据角色id获取该角色id下没有的用户
	queryNoUserList: createAction(C.ROLES_GETNOUSERLIST, Api.queryNoUserList),

}




