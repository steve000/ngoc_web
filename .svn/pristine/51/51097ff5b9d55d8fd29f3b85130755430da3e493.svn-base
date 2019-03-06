/**
 * Created by issuser on 2018/4/4.
 */
import * as C from "../../constants/api";
import Api, {createAction} from "../../utils/api";
export default{
    //查询消息列表
    queryMessage: createAction(C.QUERY_MESSAGE_LIST, Api.queryMessageList),
    // 查询消息操作类型
    queryMessageOperateType: createAction(C.QUERY_MESSAGE_OPERATE_TYPE, Api.queryMessageOperateType),
    // 查询消息操作类型
    queryMessageNotRead: createAction(C.QUERY_MESSAGE_NOT_READ, Api.queryMessageNotRead),
    // 设置消息已读
    setMessageReaded: createAction(C.SET_MESSAGE_READED, Api.setMessageReaded),
    // 消息操作人
    queryOperatorsAction: createAction(C.QUERY_OPERATORS, Api.queryOperators),
    // 消息中心获取下载文件流
    getDownloadFile: createAction(C.GET_DOENLOAD_FILE, Api.getDownloadFile),
}
