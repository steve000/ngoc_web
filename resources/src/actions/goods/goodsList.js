import * as C from "../../constants/api";
import * as AC from "../../constants/actions";
import Api, {createAction} from "../../utils/api";
export default {

	//查询实例商品列表
	queryGoodsList: createAction(C.GOODS_LIST, Api.queryGoodsList),
    queryGoodsListNew: createAction(C.GOODS_LIST_NEW, Api.queryGoodsListNew),
    queryGoodsListSku: createAction(C.GOODS_LIST_SKU, Api.queryGoodsListSku)
}
