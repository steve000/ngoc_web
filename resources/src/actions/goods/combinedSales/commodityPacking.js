import * as C from "../../../constants/api";
import * as AC from "../../../constants/actions";
import Api, { createAction } from "../../../utils/api";
export default {

    //商品可组合打包  增加 编辑 分页查询
    skuPackageList: createAction(C.SKUPACKAGE_LIST, Api.skuPackageList),
    skuPackageAdd: createAction(C.SKUPACKAGE_ADD, Api.skuPackageAdd),
    skuPackageEdit: createAction(C.SKUPACKAGE_EDIT, Api.skuPackageEdit),
    skuPackageDelete: createAction(C.SKUPACKAGE_DELETE, Api.skuPackageDelete),
    skuPackageQuery: createAction(C.SKUPACKAGE_QUERY, Api.skuPackageQuery)
}