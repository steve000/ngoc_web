// 订单导入
import supplyChain from './supplyChain'
// 采购订单
import purchaseOrder from './purchaseOrder'
// 退货单
import purchaseReturnBill from './purchaseReturnBill'
// 通用接口
import common from './common'
// 合同管理
import purchaseContract from './purchaseContract'

export default {
    ...supplyChain,
    ...purchaseOrder,
    ...purchaseReturnBill,
    ...common,
    ...purchaseContract,
}
