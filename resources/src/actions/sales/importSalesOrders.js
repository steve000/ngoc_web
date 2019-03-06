import * as C from "../../constants/api";
import * as AC from "../../constants/actions";
import Api, {createAction} from "../../utils/api";
export default {
	//导入销售订单
	importSalesOrders: createAction(C.IMPORT_SALES_ORDERS, Api.importSalesOrders),
    importOrdersDataQuery:createAction(C.IMPORT_ORDERS_DATA_QUERY,Api.importOrdersDataQuery),
    dataConfirmImport:createAction(C.GET_DATA_CONFIRM_IMPORT,Api.dataConfirmImport),
    resultDownload:createAction(C.GET_RESULT_DOWNLOAD,Api.resultDownload),
}
