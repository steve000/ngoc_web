import * as C from "../../constants/api";
import * as AC from "../../constants/actions";
import Api, {createAction} from "../../utils/api";
export default {

	//根据商品编码查询商品信息
	queryGoodsInfoModify: createAction(C.QUERY_GOODS_INFO_MODIFY, Api.queryGoodsInfoModify),
	//查询所有的品牌
	queryAllBrands: createAction(C.QUERY_ALL_BRANDS, Api.queryAllBrands),
	//查询类目
	queryCate: createAction(C.QUERY_CATE, Api.queryCate),

}
