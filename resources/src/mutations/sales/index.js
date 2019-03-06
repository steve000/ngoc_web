// 订单导入
import importSalesOrders from './importSalesOrders'
// 退货
import returnList from './returnList'
// 换货
import changeList from './changeList'
// 销售
import sales from './salesList'
// 销售模块公共
import saleCommon from './common'
// 商品模块状态管理
import goodsDetail from './goodsDetail'
// 查询日志详情
import logRecord from './logRecord'
//组合促销
import combPromotion from './promotion/combPromotion'
//满减促销
import reduce from './promotion/reduce'
// 销售流水账单
import bill from './bill/bill'
// 销售拆单规则
import splitRule from './splitRule/splitRule'

export default {
    importSalesOrders,
    logRecord,
    returnList,
    changeList,
    sales,
    saleCommon,
    goodsDetail,
    combPromotion,
    reduce,
    bill,
    splitRule
}
