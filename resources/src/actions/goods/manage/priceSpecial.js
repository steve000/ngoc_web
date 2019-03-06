import * as C from "../../../constants/api";
import Api, { createAction } from "../../../utils/api";

export default {

    // 新增
    priceSpecialGoodsAdd: createAction(C.SPECIAL_PRICE_GOODS_ADD, Api.goodsPriceSpecialAdd),
    // 编辑
    priceSpecialGoodsEdit: createAction(C.SPECIAL_PRICE_GOODS_EDIT, Api.goodsPriceSpecialEdit),
    // 修改状态
    priceSpecialGoodsEditType: createAction(C.SPECIAL_PRICE_GOODS_EDIT_TYPE, Api.goodsPriceSpecialEditType),
    // 修改审批状态
    priceSpecialGoodsEditApproveType: createAction(C.SPECIAL_PRICE_GOODS_EDIT_APPROVE, Api.priceSpecialGoodsEditApproveType),
    // 删除
    priceSpecialGoodsDelete: createAction(C.SPECIAL_PRICE_GOODS_DELETE, Api.goodsPriceSpecialDelete),
    // 查询
    priceSpecialGoodsCheck: createAction(C.SPECIAL_PRICE_GOODS_CHECK, Api.goodsPriceSpecialCheck),
    // 查询列表(分页)
    priceSpecialGoodsQuery: createAction(C.SPECIAL_PRICE_GOODS_QUERY, Api.goodsPriceSpecialQuery),

}