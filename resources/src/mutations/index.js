import root from "./root";
import authorityUsers from './authorityUsers'
import authorityRoles from './authorityRoles'
import procurementsIndex from './procurementsIndex'
import goodsConfigBrand from './goodsConfigBrand'
import goodsConfigUnit from './goodsConfigUnit'
import goodsList from './goods/goodsList'
import cate from './goods/cate'
import viewGoods from './goods/viewGoods'
import storehouseConfig from './config/storehouseConfig'
import transferManage from './stock/transferManage'
import inventoryManagement from './stock/inventoryManagement'
import outboundWarehouseList from './stock/outboundWarehouseList'
import stockIn from './stock/stockIn'
import purchaseList from './purchase/purchaseList'
import viewPurchaseOrder from './purchase/viewPurchaseOrder'
import supplierManagement from './config/supplierManagement'
import commodity from './config/commodity'
import createPurchase from './purchase/createPurchase'
import entityConfig from './system/entityConfig'
import purchasecontract from './contract/purchasecontract'
import commonAction from './common'


// 配置
import config from './config/index'
// 公共
import commmon_sales from './common/index'
// 首页
import home from './index/home'
// 消息
import notification from './notification/index'
// 销售模块
import salesModule from './sales/index'
// 采购模块
import purchaseModule from './purchase/index'
//商品
import goodsModule from './goods/index'
// 酬金
import bonusModule from './bonus/index'
//仓库盘点清单
import inventory from './stock/inventory/inventory'
//配送
import distribution from "./distribution/index"
//对账结算
import accountSettlement from "./accountSettlement/index"
// 服务-跟踪服务查询
import afterSale from './service/afterSale'

export default {
    root,
    authorityUsers,
    authorityRoles,
    procurementsIndex,
    goodsConfigBrand,
    goodsConfigUnit,
    goodsList,
    cate,
    viewGoods,
    storehouseConfig,
    transferManage,
    inventoryManagement,
    outboundWarehouseList,
    stockIn,
    purchaseList,
    viewPurchaseOrder,
    supplierManagement,
    commodity,
    createPurchase,
    entityConfig,
    purchasecontract,
    commonAction,
    inventory,

    ...config,
    ...commmon_sales,
    home,
    notification,
    ...salesModule,
    ...purchaseModule,
    ...goodsModule,
    ...bonusModule,
    inventory,
    ...distribution,
    ...accountSettlement,
    afterSale
}
