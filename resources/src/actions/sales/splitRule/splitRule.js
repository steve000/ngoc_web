
/**
 * Created by issuser on 2018/4/4.
 */
import * as C from "../../../constants/api";
import Api, {createAction} from "../../../utils/api";
export default{
    //拆单规则list
    saleSplitRuleList: createAction(C.SALE_SPLITRULE_LIST, Api.saleSplitRuleList),
    //拆单规则新增
    saleSplitRuleAdd: createAction(C.SALE_SPLITRULE_ADD, Api.saleSplitRuleAdd),
    //拆单规则删除
    saleSplitRuleDelete: createAction(C.SALE_SPLITRULE_DELETE, Api.saleSplitRuleDelete),
}
