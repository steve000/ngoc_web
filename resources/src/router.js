import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './containers/index';
import 'babel-polyfill'

Vue.use(VueRouter);

const routes = [
    /**  商品模块    */
    {
        path: '/goods/view/:id',
        component: () => import('./containers/goods/viewGoods'),
        name: 'ViewGoods',
        meta: {
            label: '查看商品'
        }
    },
    {
        path: '/goods/list',
        component: () => import('./containers/goods/newIndex'),
        name: 'GoodsListIndex',
        meta: {
            label: '商品列表'
        }
    },

    {
        path: '/goods/manage/multiBarManage',
        component: () => import('./containers/goods/manage/multiBarManage/index'),
        name: 'GoodsMultiBarManage',
        meta: {
            label: '商品多条码管理'
        }
    },
    {
        path: '/goods/manage/multiBarAdd',
        component: () => import('./containers/goods/manage/multiBarManage/addMultiBar'),
        name: 'GoodsMultiBarAdd',
        meta: {
            label: '新增商品条形码'
        }
    },
    {
        path: '/goods/manage/digitalAttrManage',
        component: () => import('./containers/goods/manage/digitalAttrManage/index'),
        name: 'GoodsDigitalAttrManage',
        meta: {
            label: '商品数字属性管理'
        }
    },
    {
        path: '/goods/manage/digitalAttrAdd',
        component: () => import('./containers/goods/manage/digitalAttrManage/addDigitalAttr'),
        name: 'GoodsDigitalAttrAdd',
        meta: {
            label: '商品数字属性新增'
        }
    },
    {
        path: '/goods/manage/digitalAttrEdit',
        component: () => import('./containers/goods/manage/digitalAttrManage/editDigitalAttr'),
        name: 'GoodsDigitalAttrEdit',
        meta: {
            label: '商品数字属性编辑'
        }
    },

    {
        path: '/goods/manage/userGroupProduct',
        component: () => import('./containers/goods/manage/userGroupProduct/index'),
        name: 'userGroupProduct',
        meta: {
            label: '实体可用商品列表'
        }
    },
    {
        path: '/goods/manage/addProduct',
        component: () => import('./containers/goods/manage/userGroupProduct/addProduct'),
        name: 'UserGroupProductAdd',
        meta: {
            label: '实体可用商品新增'
        }
    },

    {
        path: '/goods/manage/generalPricePolicy',
        component: () => import('./containers/goods/manage/generalPricePolicy/index'),
        name: 'GoodsGeneralPricePolicy',
        meta: {
            label: '商品普通价格政策'
        }
    },
    {
        path: '/goods/manage/addGeneralPrice',
        component: () => import('./containers/goods/manage/generalPricePolicy/addEdit'),
        name: 'addGeneralPrice',
        meta: {
            label: '新增商品普通价格'
        }
    },
    {
        path: '/goods/manage/editGeneralPrice/:id/:billNo',
        component: () => import('./containers/goods/manage/generalPricePolicy/edit'),
        name: 'editGeneralPrice',
        meta: {
            label: '编辑商品普通价格'
        }
    },
    {
        path: '/goods/manage/viewInfo/:id/:billNo/:approveStatus',
        component: () => import('./containers/goods/manage/generalPricePolicy/viewInfo'),
        name: 'viewInfo',
        meta: {
            label: '查看商品普通价格'
        }
    },
    {
        path: '/goods/manage/specialPricePolicy',
        component: () => import('./containers/goods/manage/specialPricePolicy/index'),
        name: 'SpecialPricePolicy',
        meta: {
            label: '商品特殊价格政策'
        }
    },
    {
        path: '/goods/manage/addSpecialPrice',
        component: () => import('./containers/goods/manage/specialPricePolicy/addEdit'),
        name: 'addGeneralSpecialPrice',
        meta: {
            label: '新增商品特殊价格'
        }
    },
    {
        path: '/goods/manage/editSpecialPrice/:id/:billNo',
        component: () => import('./containers/goods/manage/specialPricePolicy/edit'),
        name: 'editGeneralSpecialPrice',
        meta: {
            label: '编辑商品特殊价格'
        }
    },
    {
        path: '/goods/manage/specialPricePolicy/:id/:billNo/:approveStatus',
        component: () => import('./containers/goods/manage/specialPricePolicy/viewSpecialInfo'),
        name: 'specialgoodsviewInfo',
        meta: {
            label: '查看商品特价政策'
        }
    },
    {
        path: '/goods/manage/skuCommodityManagement',
        component: () => import('./containers/goods/manage/skuCommodityManagement/index'),
        name: 'skuCommodityManagement',
        meta: {
            label: '商品管理'
        }
    },
    {
        path: '/goods/manage/addSkuCommodityManagement',
        component: () => import('./containers/goods/manage/skuCommodityManagement/add'),
        name: 'addSkuCommodityManagement',
        meta: {
            label: '添加商品'
        }
    },
    {
        path: '/goods/manage/editSkuCommodityManagement',
        component: () => import('./containers/goods/manage/skuCommodityManagement/edit'),
        name: 'editSkuCommodityManagement',
        meta: {
            label: '编辑商品'
        }
    },
    {
        path: '/goods/manage/detailsSkuCommodityManagement',
        component: () => import('./containers/goods/manage/skuCommodityManagement/details'),
        name: 'detailsSkuCommodityManagement',
        meta: {
            label: '商品详情'
        }
    },
    {
        path: '/goods/manage/skuTag',
        component: () => import('./containers/goods/manage/skuTag/index'),
        name: 'skuTag',
        meta: {
            label: '商品标签设置'
        }
    },
    {
        path: '/goods/manage/addSkuTag',
        component: () => import('./containers/goods/manage/skuTag/add'),
        name: 'addSkuTag',
        meta: {
            label: '新增商品标签'
        }
    },
    // {
    //     path: '/goods/manage/editSkuTag',
    //     component: () => import('./containers/goods/manage/skuTag/edit'),
    //     name: 'editSkuTag',
    //     meta: {
    //         label: '编辑商品标签'
    //     }
    // },


    {
        path: '/authority/index',
        name: 'AuthorityIndex',
        component: () => import('./containers/authority/index'),
        meta: {
            label: '用户管理homePage'
        }
    },
    {
        path: '/authority/users',
        name: 'UserManagement',
        component: () => import('./containers/authority/users'),
        meta: {
            label: '用户管理'
        }
    },
    {
        path: '/authority/roles',
        name: 'RolesManagement',
        component: () => import('./containers/authority/roles'),
        meta: {
            label: '角色管理'
        }
    },
    {
        path: '/authority/privilege',
        name: 'PrivilegeManagement',
        component: () => import('./containers/authority/privilege'),
        meta: {
            label: '授权管理'
        }
    },
    {
        path: '/authority/settings',
        name: 'SystemConfig',
        component: () => import('./containers/authority/settings'),
        meta: {
            label: '系统设置'
        }
    },
   
    /**         库存模块      */
    /**  入库管理 */
    {
        path: '/stock/storage',
        component: () => import('./containers/stock/storage/StorageManagement'),
        name: 'StorageManagement',
        meta: {
            label: '入库管理'
        }
    },
    {
        path: '/stock/storage/createStorage',
        component: () => import('./containers/stock/storage/CreateStorage'),
        name: 'CreateStorage',
        meta: {
            label: '创建入库单'
        }
    },
    {
        path: '/stock/storage/transferStorage/:relatedSheetId',
        component: () => import('./containers/stock/storage/transferStorage'),
        name: 'transferStorage',
        meta: {
            label: '调拨入库'
        }
    },
    {
        path: '/stock/storage/ViewTransferStorage/:relatedSheetId',
        component: () => import('./containers/stock/storage/transferStorage'),
        name: 'ViewTransferStorage',
        meta: {
            label: '查看调拨入库单'
        }
    },
    {
        path: '/stock/storage/viewStorageDetail/:stockPerInId',
        component: () => import('./containers/stock/storage/ViewStorageDetail'),
        name: 'viewStorageDetail',
        meta: {
            label: '查看入库单'
        }
    },
    /** 出库管理  */
    {
        path: '/stock/outbound',
        component: () => import('./containers/stock/outbound/OutboundManagement'),
        name: 'OutboundManagement',
        meta: {
            label: '出库管理'
        }
    },
    {
        path: '/stock/CreateOutbound',
        component: () => import('./containers/stock/outbound/CreateOutbound'),
        name: 'CreateOutbound',
        meta: {
            label: '创建出库单'
        }
    },
    {
        path: '/stock/viewOutbound/:stockPerOutId',
        component: () => import('./containers/stock/outbound/ViewOutbound'),
        name: 'viewOutbound',
        meta: {
            label: '查看出库单'
        }
    },
    {
        path: '/stock/SetOutboundPage/:stockPerOutId/:relatedSheetId/:type',
        component: () => import('./containers/stock/outbound/SetOutboundPage'),
        name: 'setOutboundPage',
        meta: {
            label: '调拨出库'
        }
    },
    {
        path: '/stock/OutboundPageDetail/:stockPerOutId/:relatedSheetId/:type',
        component: () => import('./containers/stock/outbound/OutboundPageDetail'),
        name: 'outboundPageDetail',
        meta: {
            label: '查看调拨出库单'
        }
    },
    /** 调拨管理 */
    {
        path: '/stock/transfer',
        component: () => import('./containers/stock/transfer/StockTransfer'),
        name: 'StockTransfer',
        meta: {
            label: '调拨管理'
        }
    },
    {
        path: '/stock/transfer/apply',
        component: () => import('./containers/stock/transfer/ApplyTransfer'),
        name: 'ApplyTransfer',
        meta: {
            label: '申请调拨'
        }
    },
    {
        path: '/stock/transfer/view/:id',
        component: () => import('./containers/stock/transfer/ViewTransfer'),
        name: 'ViewTransfer',
        meta: {
            label: '查看调拨'
        }
    },
    /**  库存管理 */
    {
        path: '/stock/management',
        component: () => import('./containers/stock/manage/InventoryManagement'),
        name: 'InventoryManagement',
        meta: {
            label: '库存管理'
        }
    },
    {
        path: '/stock/pandian/inventorypandian/:inventoryId/:storehouse_id/:status',
        component: () => import('./containers/stock/pandian/InventoryPandian'),
        name: 'inventorypandian',
        meta: {
            label: '库存盘点'
        }
    },
    {
        path: '/stock/pandian/inventorycheck',
        component: () => import('./containers/stock/pandian/InventoryCheck'),
        name: "InventoryCheck",
        meta: {
            label: "库存盘点(新)"
        }
    },

    {
        path: '/stock/pandian/lookinventorypandian/:inventoryId/:storehouse_id/:status',
        component: () => import('./containers/stock/pandian/LookInventoryPandian'),
        name: 'lookinventorypandian',
        meta: {
            label: '查看盘点'
        }
    },
    {
        path: '/stock/pandian/InventoryPandianLog/:storehouseId',
        component: () => import('./containers/stock/pandian/InventoryPandianLog'),
        name: 'InventoryPandianLog',
        meta: {
            label: '盘点列表'
        }
    },
    /**  库存--费用管理--物流费用录入 **/
    {
        path: '/stock/costManagement/logisticsCostEntry',
        component: () => import('./containers/stock/costManagement/index'),
        name: 'logisticsCostEntry',
        meta: {
            label: '物流费用录入'
        }
    },
    {
        path: '/stock/costManagement/logisticsCostEntryAdd',
        component: () => import('./containers/stock/costManagement/add'),
        name: 'logisticsCostEntryAdd',
        meta: {
            label: '物流费用录入新增'
        }
    },
    {
        path: '/stock/costManagement/logisticsCostEntryEdit/:id',
        component: () => import('./containers/stock/costManagement/edit'),
        name: "logisticsCostEntryEdit",
        meta: {
            label: "物流费用录入编辑"
        }
    },
    {
        path: '/stock/costManagement/logisticsCostEntryDetails/:id',
        component: () => import('./containers/stock/costManagement/details'),
        name: "logisticsCostEntryDetails",
        meta: {
            label: "物流费用录入查看"
        }
    },
    {
        path: '/stock/costManagement/logisticsCostEntryImport',
        component: () => import('./containers/stock/costManagement/import'),
        name: 'logisticsCostEntryImport',
        meta: {
            label: '物流费用录入导入'
        }
    },
    /**  库存--仓位商品设置 **/
    {
        path: '/stock/locationSku',
        component: () => import('./containers/stock/locationSku/index'),
        name: 'locationSku',
        meta: {
            label: '仓位商品设置'
        }
    },
    {
        path: '/stock/locationSkuAdd',
        component: () => import('./containers/stock/locationSku/add'),
        name: 'locationSkuAdd',
        meta: {
            label: '新增仓位商品信息'
        }
    },
    /**  库存--仓位管理 **/
    {
        path: '/stock/storehouseLocation',
        component: () => import('./containers/stock/storehouseLocation/index'),
        name: 'storehouseLocation',
        meta: {
            label: '仓位设置'
        }
    },
    {
        path: '/stock/storehouseLocationAdd',
        component: () => import('./containers/stock/storehouseLocation/add'),
        name: 'storehouseLocationAdd',
        meta: {
            label: '新增仓位设置'
        }
    },
    /**  库存--费用结算 **/
    {
        path: '/stock/feeCompute',
        component: () => import('./containers/stock/feeCompute/index'),
        name: 'feeCompute',
        meta: {
            label: '费用结算'
        }
    },
    {
        path: '/stock/feeComputeAdd',
        component: () => import('./containers/stock/feeCompute/add'),
        name: 'feeComputeAdd',
        meta: {
            label: '费用结算新增'
        }
    },
    {
        path: '/stock/feeComputeEdit/:id',
        component: () => import('./containers/stock/feeCompute/edit'),
        name: 'feeComputeEdit',
        meta: {
            label: '费用结算编辑'
        }
    },
    {
        path: '/stock/feeComputeDetails/:id',
        component: () => import('./containers/stock/feeCompute/details'),
        name: 'feeComputeDetails',
        meta: {
            label: '费用结算查看'
        }
    },
    /**  库存--费用自动计算规则定义 **/
    {
        path: '/stock/feeRule',
        component: () => import('./containers/stock/feeRule/index'),
        name: 'feeRule',
        meta: {
            label: '费用自动计算规则定义'
        }
    },
    {
        path: '/stock/feeRuleAdd',
        component: () => import('./containers/stock/feeRule/add'),
        name: 'feeRuleAdd',
        meta: {
            label: '费用自动计算规则定义新增'
        }
    },
    {
        path: '/stock/feeRuleEdit/:id',
        component: () => import('./containers/stock/feeRule/edit'),
        name: 'feeRuleEdit',
        meta: {
            label: '费用自动计算规则定义编辑'
        }
    },

    /**     采购模块             */
    {
        path: '/purchase/purchaseorder',
        component: () => import('./containers/purchase/PurchaseOrder'),
        name: 'PurchaseOrder',
        meta: {
            label: '采购订单'
        }
    },
    {
        path: '/purchase/ViewPurchaseOrder/:purchaseId',
        component: () => import('./containers/purchase/ViewPurchaseOrder'),
        name: 'ViewPurchaseOrder',
        meta: {
            label: '查看采购订单'
        }
    },
    {
        path: '/purchase/CreatePurchase',
        component: () => import('./containers/purchase/CreatePurchase'),
        name: 'CreatePurchase',
        meta: {
            label: '新增采购订单'
        }
    },
    {
        path: '/purchase/EditPurchase/:purchaseId',
        component: () => import('./containers/purchase/EditPurchase'),
        name: 'EditPurchase',
        meta: {
            label: '编辑采购订单'
        }
    },
    {
        path: '/purchase/purchasereturn',
        component: () => import('./containers/purchase/PurchaseReturn'),
        name: 'PurchaseReturn',
        meta: {
            label: '采购退货'
        }
    },
    // 供应链
    {
        path: '/purchase/vendorRegisterRegister',
        component: () => import('./containers/purchase/vendorRegister/register'),
        name: 'vendorRegisterRegister',
        meta: {
            label: '供应商注册'
        }
    },
    {
        path: '/purchase/vendorRegisterIndex',
        component: () => import('./containers/purchase/vendorRegister/index'),
        name: 'vendorRegisterIndex',
        meta: {
            label: '供应商审批'
        }
    },
    {
        path: '/purchase/vendorRegisterAdd',
        component: () => import('./containers/purchase/vendorRegister/add'),
        name: 'vendorRegisterAdd',
        meta: {
            label: '供应商审批新增'
        }
    },
    {
        path: '/purchase/vendorRegisterDetails/:id',
        component: () => import('./containers/purchase/vendorRegister/details'),
        name: 'vendorRegisterDetails',
        meta: {
            label: '供应商审批查看'
        }
    },
    {
        path: '/purchase/vendorIndex',
        component: () => import('./containers/purchase/vendor/index'),
        name: 'vendorIndex',
        meta: {
            label: '供应商管理'
        }
    },
    {
        path: '/purchase/vendorEdit',
        component: () => import('./containers/purchase/vendor/edit'),
        name: 'vendorEdit',
        meta: {
            label: '供应商管理编辑'
        }
    },
    {
        path: '/purchase/vendorDetails',
        component: () => import('./containers/purchase/vendor/details'),
        name: 'vendorDetails',
        meta: {
            label: '供应商管理查看'
        }
    },
    {
        path: '/purchase/vendorSpuIndex',
        component: () => import('./containers/purchase/vendorSpu/index'),
        name: 'vendorSpuIndex',
        meta: {
            label: '供应商新品引进，推荐'
        }
    },
    {
        path: '/purchase/vendorSpuAdd',
        component: () => import('./containers/purchase/vendorSpu/add'),
        name: 'vendorSpuAdd',
        meta: {
            label: '新增供应商引进产品信息'
        }
    },
    {
        path: '/purchase/vendorSpuDetails',
        component: () => import('./containers/purchase/vendorSpu/details'),
        name: 'vendorSpuDetails',
        meta: {
            label: '查看新品推荐信息'
        }
    },
    {
        path: '/purchase/userGroupVendorIndex',
        component: () => import('./containers/purchase/userGroupVendor/index'),
        name: 'userGroupVendorIndex',
        meta: {
            label: '添加实体供应商'
        }
    },
    {
        path: '/purchase/userGroupVendorAdd',
        component: () => import('./containers/purchase/userGroupVendor/add'),
        name: 'userGroupVendorAdd',
        meta: {
            label: '新增供应商'
        }
    },
    /* ********************采购-采购单-新**start************** */
    {
        path: '/purchase/purchaseorder/index',
        component: () => import('./containers/purchase/purchaseOrder/index'),
        name: 'purchaseOrderIndex',
        meta: {
            label: '采购订单'
        }
    },
    {
        path: '/purchase/purchaseorder/add',
        component: () => import('./containers/purchase/purchaseOrder/add'),
        name: 'purchaseOrderAdd',
        meta: {
            label: '新增采购订单'
        }
    },
    {
        path: '/purchase/purchaseorder/edit',
        component: () => import('./containers/purchase/purchaseOrder/edit'),
        name: 'purchaseOrderEdit',
        meta: {
            label: '编辑采购订单'
        }
    },
    {
        path: '/purchase/purchaseorder/details/:seqNo',
        component: () => import('./containers/purchase/purchaseOrder/details'),
        name: 'purchaseOrderInfo',
        meta: {
            label: '查看采购订单'
        }
    },
    /* ********************采购-采购单-新**end************** */

    /* ********************采购-退货单-新**start************** */
    {
        path: '/purchase/purchaseReturnBill/index',
        component:()=> import('./containers/purchase/purchaseReturnBill/index'),
        name: 'purchaseReturnBillIndex',
        meta:{
            label:'退货单'
        }
    },
    {
        path: '/purchase/purchaseReturnBill/add',
        component:()=> import('./containers/purchase/purchaseReturnBill/add'),
        name:'purchaseReturnBillAdd',
        meta:{
            label:'新增退货单'
        }
    },
    {
        path: '/purchase/purchaseReturnBill/edit',
        component:()=> import('./containers/purchase/purchaseReturnBill/edit'),
        name:'purchaseReturnBillEdit',
        meta:{
            label:'编辑退货单'
        }
    },
    {
        path: '/purchase/purchaseReturnBill/details/:seqNo',
        component:()=> import('./containers/purchase/purchaseReturnBill/details'),
        name:'purchaseReturnBillInfo',
        meta:{
            label:'查看退货单'
        }
    },
    /* ********************采购-退货单-新**end************** */




    /**     合同模块         */
    {
        path: '/contract',
        component: () => import('./containers/contract/ContractManagement'),
        name: 'ContractManagement',
        meta: {
            label: '合同管理'
        }
    },
    {
        path: '/contract/PurchaseContractView/:contractSeqNo',
        component: () => import('./containers/contract/PurchaseContractView'),
        name: 'PurchaseContractView',
        meta: {
            label: '采购合同详情'
        }
    },
    {
        path: '/contract/EditPurchaseContract/:contractSeqNo',
        component: () => import('./containers/contract/EditPurchaseContract'),
        name: 'EditPurchaseContract',
        meta: {
            label: '编辑采购合同'
        }
    },
    {
        path: '/contract/AddPurchaseContract',
        component: () => import('./containers/contract/AddPurchaseContract'),
        name: 'AddPurchaseContract',
        meta: {
            label: '新增采购合同'
        }
    },


    /**        设置模块         */
    /**  仓库设置  */
    {
        path: '/config/storehouse',
        component: () => import('./containers/config/StorehouseConfig'),
        name: 'StorehouseConfig',
        meta: {
            label: '设置仓库'
        }
    },
    {
        path: '/config/storehouse/create/:type',
        component: () => import('./containers/config/CreateStorehouse'),
        name: 'CreateStorehouse',
        meta: {
            label: '创建仓库'
        }
    },
    {
        path: '/config/storehouse/edit/:storehouseId',
        component: () => import('./containers/config/EditStorehouse'),
        name: 'EditStorehouse',
        meta: {
            label: '编辑仓库'
        }
    },
    /**  供应商管理  */
    {
        path: '/config/supplier',
        component: () => import('./containers/config/SupplierManagement'),
        name: 'SupplierManagement',
        meta: {
            label: '供应商管理'
        }
    },
    {
        path: '/config/supplier/add',
        component: () => import('./containers/config/AddSupplier'),
        name: 'AddSupplier',
        meta: {
            label: "新增供应商"
        }
    },
    {
        path: '/config/supplier/view/:id',
        component: () => import('./containers/config/ViewSupplier'),
        name: 'ViewSupplier',
        meta: {
            label: '查看供应商'
        }
    },
    {
        path: '/config/supplier/edit/:id',
        component: () => import('./containers/config/EditSupplier'),
        name: 'EditSupplier',
        meta: {
            label: '编辑供应商'
        }
    },

    /**  客户设置  */
    {
        path: '/config/client',
        component: () => import('./containers/config/ClientConfig'),
        name: 'ClientConfig',
        meta: {
            label: '客户设置'
        }
    },
    /**  商品设置  */
    {
        path: '/config/commodity',
        component: () => import('./containers/config/CommodityConfig'),
        name: 'CommodityConfig',
        meta: {
            label: '商品设置'
        }
    },
    {
        path: '/config/commodity/CreateCommodity',
        component: () => import('./containers/config/CreateCommodity'),
        name: 'CreateCommodity',
        meta: {
            label: '添加商品'
        }
    },
    //  {
    //     path: '/config/addconfiggoods',
    //         component: () => import('./containers/config/AddConfigGoods'),
    //     name: 'AddConfigGoods',
    //     meta: {
    //         label: '添加商品'
    //     }
    // },


    /**    系统设置模块           */
    {
        path: '/system/entity',
        component: () => import('./containers/system/EntityConfig'),
        name: 'EntityConfig',
        meta: {
            label: '业务实体设置'
        }
    },





    /* ----------华丽的分割线------- */

    /**  销售模块路由  */
    // 销售订单
    {
        path: '/sales/order',
        component: () => import('./containers/sales/salesOrder/SalesOrder'),
        name: 'SalesOrder',
        meta: {
            label: '销售订单'
        }
    },
    {
        path: '/sales/order/createOrder',
        component: () => import('./containers/sales/salesOrder/CreateSalesOrder'),
        name: 'CreateSalesOrder',
        meta: {
            label: '新增销售订单'
        }
    },
    {
        path: '/sales/order/updateOrder',
        component: () => import('./containers/sales/salesOrder/UpdateSalesOrder'),
        name: 'UpdateSalesOrder',
        meta: {
            label: '编辑销售订单'
        }
    },
    {
        path: '/sales/check/salesOrder/:saleOrderId',
        component: () => import('./containers/sales/salesOrder/CheckSalesOrder'),
        name: 'CheckSalesOrder',
        meta: {
            label: '查看销售订单'
        }
    },
    {
        path: '/sales/import/salesOrders',
        component: () => import('./containers/sales/salesOrder/ImportSalesOrders'),
        name: 'ImportSalesOrders',
        meta: {
            label: '导入销售订单'
        }
    },

    /**  销售退货  */

    // 退货订单
    {
        path: '/sales/return',
        component: () => import('./containers/sales/salesReturn/SalesReturn'),
        name: 'SalesReturn',
        meta: {
            label: '销售退货'
        }
    },
    {
        path: '/sales/return/editOrder/:returnId/:orderId',
        component: () => import('./containers/sales/salesReturn/EditReturnOrder'),
        name: 'EditReturnOrder',
        meta: {
            label: '编辑退货单'
        }
    },
    {
        path: '/sales/return/createOrder',
        component: () => import('./containers/sales/salesReturn/CreateReturnOrder'),
        name: 'CreateReturnOrder',
        meta: {
            label: '新增退货单'
        }
    },
    { // 查看退票订单商品列表
        path: '/sales/return/checkList/:returnId',
        component: () => import('./containers/sales/salesReturn/CheckReturnList'),
        name: 'CheckReturnList',
        meta: {
            label: '查看退货单'
        }
    },

    /**  销售换货 */
    // 换货订单
    { // 查看换货订单商品列表
        path: '/sales/change/checkList/:changeId',
        component: () => import('./containers/sales/salesChange/CheckChangeList'),
        name: 'CheckChangeList',
        meta: {
            label: '查看换货单'
        }
    },
    { // 分页获取查看换货列表
        path: '/sales/change',
        component: () => import('./containers/sales/salesChange/SalesChange'),
        name: 'SalesChange',
        meta: {
            label: '销售换货'
        }
    },
    { // 新增换货单页面
        path: '/sales/change/createOrder',
        component: () => import('./containers/sales/salesChange/CreateChangeOrder'),
        name: 'CreateChangeOrder',
        meta: {
            label: '新增换货单'
        }
    },
    { // 编辑换货单页面
        path: '/sales/change/editOrder/:changeId',
        component: () => import('./containers/sales/salesChange/EditChangeOrder'),
        name: 'EditChangeOrder',
        meta: {
            label: '编辑换货单'
        }
    },

    /**  销售代发 */
    // 代发订单
    { // 分页获取查看代发订单列表
        path: '/sales/proxy',
        component: () => import('./containers/sales/salesProxy/InsteadDelivery'),
        name: 'InsteadDelivery',
        meta: {
            label: '销售代发'
        }
    },
    { // 新增代发订单
        path: '/sales/proxy/createOrder',
        component: () => import('./containers/sales/salesProxy/CreateInsteadDelivery'),
        name: 'CreateInsteadDelivery',
        meta: {
            label: '新增代发订单'
        }
    },
    { // 编辑代发订单
        path: '/sales/proxy/updateOrder/:orderId',
        component: () => import('./containers/sales/salesProxy/UpdateInsteadDelivery'),
        name: 'UpdateInsteadDelivery',
        meta: {
            label: '编辑代发订单'
        }
    },

    { // 查看代发详情
        path: '/sales/proxy/checkOrder/:saleOrderId',
        component: () => import('./containers/sales/salesProxy/CheckRepresentOrder'),
        name: 'CheckRepresentOrder',
        meta: {
            label: '查看代发订单'
        }
    },

    /** 渠道管理 */
    // 渠道
    {
        path: '/config/channel/management',
        component: () => import('./containers/config/channelSet/ChannelManagement'),
        name: 'ChannelManagement',
        meta: {
            label: '渠道设置'
        }
        // children: [
        //     {
        //         path: '/config/channelmanagement',
        //         component: () => import('./containers/config/channel/Allchannel'),
        //         name: 'all-channel',
        //         meta: {
        //             label: '全部渠道'
        //         }
        //     },
        //     {
        //         path: '/config/channel/filterTable/:id',
        //         component: () => import('./containers/config/channel/FilterTable'),
        //         name: 'filter-table',
        //         meta: {
        //             label: '湖南移动'
        //         }
        //     },
        // ]
    },
    {
        path: '/config/channel/create',
        component: () => import('./containers/config/channelSet/CreateChannel'),
        name: 'CreateChannel',
        meta: {
            label: '新增渠道'
        }
    },
    {
        path: '/config/channel/importGoods',
        component: () => import('./containers/config/channelSet/importChannelGoods'),
        name: 'ImportChannelGoods',
        meta: {
            label: '导入渠道商品'
        }
    },
    {
        path: '/config/channel/edit/:channelName/:channelId/:channelType',
        component: () => import('./containers/config/channelSet/editChannel'),
        name: 'EditChannel',
        meta: {
            label: '编辑渠道'
        }
    },
    {
        path: '/config/channel/createGood',
        component: () => import('./containers/config/channelSet/createChannelGood'),
        name: 'CreateChannelGood',
        meta: {
            label: '新增渠道商品'
        }
    },
    {
        path: '/config/channel/updatelGood',
        component: () => import('./containers/config/channelSet/updateChannelGood'),
        name: 'UpdateChannelGood',
        meta: {
            label: '编辑渠道商品'
        }
    },

    /**   消息  */
    // 消息中心
    {
        path: '/notification/Index',
        component: () => import('./containers/notification/Index'),
        name: 'notificationIndex',
        meta: {
            label: '消息中心'
        }
    },

    /**   首页图表  */
    { // 首页图表
        path: '/index/Home',
        component: () => import('./containers/index/home'),
        name: 'Home',
        meta: {
            label: '系统首页'
        }
    },

    //卡券类别管理
    {
        path: '/goods/card/cardTypeM',
        component: () => import('./containers/goods/card/cardTypeM'),
        name: 'CardTypeM',
        meta: {
            label: '卡券类别管理'
        }
    },
    {
        path: '/goods/cardType/addCardType',
        component: () => import('./containers/goods/card/addCardType'),
        name: 'addCardType',
        meta: {
            label: '新增卡券类别'
        }
    },

    {
        path: '/goods/card/information',
        component: () => import('./containers/goods/card/cardInformation'),
        name: 'cardInformation',
        meta: {
        label: '卡券信息管理'
        }
    },
    
    {
        path: '/goods/spu/spuAdd',
        component: () => import('./containers/goods/manage/spu/spuAdd'),
        name: 'SpuAdd',
        meta: {
            label: '添加产品'
        }
    },
    {
        path: '/goods/spu/spuEdit/:productID',
        component: () => import('./containers/goods/manage/spu/spuEdit'),
        name: 'SpuEdit',
        meta: {
            label: '编辑产品'
        }
    },
    {
        path: '/goods/spu/index',
        component: () => import('./containers/goods/manage/spu/index'),
        name: 'SpuIndex',
        meta: {
            label: '产品管理'
        }
    },
    {
        path: '/goods/spu/infoSpu/:productId',
        component: () => import('./containers/goods/manage/spu/spuInfo'),
        name: 'SpuInfo',
        meta: {
            label: '产品详情'
        }
    },

    // 商品设置模块
    // 品牌管理
    {
        path: '/goods/setting/brand',
        component: () => import('./containers/goods/setting/brandSetting/index'),
        name: 'brand',
        meta: {
            label: '品牌管理'
        }
    },
    {
        path: '/goods/setting/brandAdd',
        component: () => import('./containers/goods/setting/brandSetting/add'),
        name: 'brandAdd',
        meta: {
            label: '新增品牌'
        }
    },
    {
        path: '/goods/setting/brandEdit',
        component: () => import('./containers/goods/setting/brandSetting/edit'),
        name: 'brandEdit',
        meta: {
            label: '编辑品牌'
        }
    },
    // 类目管理
    {
        path: '/goods/setting/category',
        component: () => import('./containers/goods/setting/categorySetting/index'),
        name: 'category',
        meta: {
            label: '类目管理'
        }
    },
    {
        path: '/goods/setting/categoryAdd',
        component: () => import('./containers/goods/setting/categorySetting/add'),
        name: 'categoryAdd',
        meta: {
            label: '新增类目'
        }
    },
    {
        path: '/goods/setting/categoryEdit',
        component: () => import('./containers/goods/setting/categorySetting/edit'),
        name: 'categoryEdit',
        meta: {
            label: '编辑类目'
        }
    },
    // 计量管理
    {
        path: '/goods/setting/unit',
        component: () => import('./containers/goods/setting/unitSetting/index'),
        name: 'unit',
        meta: {
            label: '计量管理'
        }
    },
    {
        path: '/goods/setting/unitAdd',
        component: () => import('./containers/goods/setting/unitSetting/add'),
        name: 'unitAdd',
        meta: {
            label: '新增计量'
        }
    },
    // 标签管理
    {
        path: '/goods/setting/tag',
        component: () => import('./containers/goods/setting/tagSetting/index'),
        name: 'tag',
        meta: {
            label: '标签管理'
        }
    },
    {
        path: '/goods/setting/tagAdd',
        component: () => import('./containers/goods/setting/tagSetting/add'),
        name: 'tagAdd',
        meta: {
            label: '新增标签'
        }
    },
    /* -----------商品-组合销售模块  分割线------------ */
    // 商品发布
    {
        path: '/goods/combinedSales/commodityRelease',
        component: () => import('./containers/goods/combinedSales/commodityRelease/index'),
        name: 'commodityRelease',
        meta: {
            label: '可组合商品发布'
        }
    },
    {
        path: '/goods/combinedSales/commodityRelease/add',
        component: () => import('./containers/goods/combinedSales/commodityRelease/add'),
        name: 'commodityReleaseAdd',
        meta: {
            label: '新增可组合商品'
        }
    },
    {
        path: '/goods/combinedSales/commodityRelease/edit/:id',
        component: () => import('./containers/goods/combinedSales/commodityRelease/edit'),
        name: 'commodityReleaseEdit',
        meta: {
            label: '编辑可组合商品'
        }
    },
    // 商品打包
    {
        path: '/goods/combinedSales/commodityPacking',
        component: () => import('./containers/goods/combinedSales/commodityPacking/index'),
        name: 'commodityPacking',
        meta: {
            label: '商品打包'
        }
    },
    {
        path: '/goods/combinedSales/commodityPacking/add',
        component: () => import('./containers/goods/combinedSales/commodityPacking/add'),
        name: 'commodityPackingAdd',
        meta: {
            label: '新增组合商品包'
        }
    },
    {
        path: '/goods/combinedSales/commodityPacking/edit',
        component: () => import('./containers/goods/combinedSales/commodityPacking/edit'),
        name: 'commodityPackingEdit',
        meta: {
            label: '编辑组合商品包'
        }
    },
    {
        path: '/goods/combinedSales/commodityPacking/details',
        component: () => import('./containers/goods/combinedSales/commodityPacking/details'),
        name: 'commodityPackingDetails',
        meta: {
            label: '查看组合商品包'
        }
    },
    /* -----------销售模块  分割线------------ */
    //拆单规则设置
    {
        path:'/sales/splitRule',
        component:()=> import('./containers/sales/splitRule/index'),
        name: 'splitRule',
        meta:{
            label:'拆单规则设置'
        }
    },
    {
        path:'/sales/splitRule/add',
        component:()=> import('./containers/sales/splitRule/add'),
        name: 'splitRuleAdd',
        meta:{
            label:'新增拆单规则'
        }
    },
    //普通促销
    {
        path:'/sales/promotion/normalPromotion',
        component:()=> import('./containers/sales/promotion/normalPromotion/index'),
        name: 'normalPromotion',
        meta:{
            label:'普通促销'
        }
    },
    {
        path:'/sales/promotion/normalPromotionEdit/:id',
        component:()=> import('./containers/sales/promotion/normalPromotion/edit'),
        name:'normalPromotionEdit',
        meta:{
            label:'普通促销编辑'
        }
    },
    {
        path:'/sales/promotion/normalPromotionDetails/:id',
        component:()=> import('./containers/sales/promotion/normalPromotion/details'),
        name:'normalPromotionDetails',
        meta:{
            label:'普通促销查看'
        }
    },
    {
        path:'/sales/promotion/normalPromotionAdd',
        component:()=> import('./containers/sales/promotion/normalPromotion/add'),
        name:'normalPromotionAdd',
        meta:{
            label:'普通促销新增'
        }
    },
    //组合促销
    {
        path:'/sales/promotion/combIndex',
        component:()=> import('./containers/sales/promotion/combPromotion/index'),
        name: 'combIndex',
        meta:{
            label:'组合促销'
        }
    },
    {
        path:'/sales/promotion/combEdit/:id',
        component:()=> import('./containers/sales/promotion/combPromotion/edit'),
        name:'combEdit',
        meta:{
            label:'组合促销编辑'
        }
    },
    {
        path:'/sales/promotion/combInfo/:id',
        component:()=> import('./containers/sales/promotion/combPromotion/infoView'),
        name:'combInfo',
        meta:{
            label:'组合促销查看'
        }
    },
    {
        path:'/sales/promotion/combAdd',
        component:()=> import('./containers/sales/promotion/combPromotion/add'),
        name:'combAdd',
        meta:{
            label:'组合促销新增'
        }
    },
    //赠劵促销
    {
        path:'/sales/promotion/presentPromotion',
        component:()=> import('./containers/sales/promotion/presentPromotion/index'),
        name: 'presentPromotion',
        meta:{
            label:'赠劵促销'
        }
    },
    {
        path:'/sales/promotion/presentPromotionEdit/:id',
        component:()=> import('./containers/sales/promotion/presentPromotion/edit'),
        name:'presentPromotionEdit',
        meta:{
            label:'赠劵促销编辑'
        }
    },
    {
        path:'/sales/promotion/presentPromotionDetails/:id',
        component:()=> import('./containers/sales/promotion/presentPromotion/details'),
        name:'presentPromotionDetails',
        meta:{
            label:'赠劵促销查看'
        }
    },
    {
        path:'/sales/promotion/presentPromotionAdd',
        component:()=> import('./containers/sales/promotion/presentPromotion/add'),
        name:'presentPromotionAdd',
        meta:{
            label:'赠劵促销新增'
        }
    },
    //条件组合促销
    {
        path:'/sales/promotion/conGroupPromotion',
        component:()=> import('./containers/sales/promotion/conGroupPromotion/index'),
        name: 'conGroupPromotion',
        meta:{
            label:'条件组合促销'
        }
    },
    {
        path:'/sales/promotion/conGroupPromotionEdit',
        component:()=> import('./containers/sales/promotion/conGroupPromotion/edit'),
        name:'conGroupPromotionEdit',
        meta:{
            label:'条件组合促销编辑'
        }
    },
    {
        path:'/sales/promotion/conGroupPromotionDetails',
        component:()=> import('./containers/sales/promotion/conGroupPromotion/details'),
        name:'conGroupPromotionDetails',
        meta:{
            label:'条件组合促销查看'
        }
    },
    {
        path:'/sales/promotion/conGroupPromotionAdd',
        component:()=> import('./containers/sales/promotion/conGroupPromotion/add'),
        name:'conGroupPromotionAdd',
        meta:{
            label:'条件组合促销新增'
        }
    },
    
    //满减促销
    {
        path:'/sales/promotion/reducePromotion',
        component:()=> import('./containers/sales/promotion/reducePromotion/index'),
        name: 'reducePromotion',
        meta:{
            label:'满减促销'
        }
    },
    {
        path:'/sales/promotion/reducePromotionEdit/:id',
        component:()=> import('./containers/sales/promotion/reducePromotion/edit'),
        name:'reducePromotionEdit',
        meta:{
            label:'满减促销编辑'
        }
    },
    {
        path:'/sales/promotion/reducePromotionDetails/:id',
        component:()=> import('./containers/sales/promotion/reducePromotion/details'),
        name:'reducePromotionDetails',
        meta:{
            label:'满减促销查看'
        }
    },
    {
        path:'/sales/promotion/reducePromotionAdd',
        component:()=> import('./containers/sales/promotion/reducePromotion/add'),
        name:'reducePromotionAdd',
        meta:{
            label:'满减促销新增'
        }
    },
    // 销售流水单
    {
        path:'/sales/bills',
        component:()=> import('./containers/sales/bills/billQuery/index'),
        name:'salesBills',
        meta:{
            label:'销售流水查询'
        }
    },
    {
        path:'/sales/bills/details/:id',
        component:()=> import('./containers/sales/bills/billQuery/details'),
        name:'salesBillsDetails',
        meta:{
            label:'查看销售流水'
        }
    },
    // 渠道计划及考核
    {
        path:'/sales/channel/channelPlan',
        component:()=> import('./containers/sales/channel/channelPlan/index'),
        name:'channelPlan',
        meta:{
            label:'渠道计划及考核'
        }
    },
    {
        path:'/sales/channel/channelPlanAdd',
        component:()=> import('./containers/sales/channel/channelPlan/add'),
        name:'channelPlanAdd',
        meta:{
            label:'渠道计划及考核新增'
        }
    },
    {
        path:'/sales/channel/channelPlanEdit',
        component:()=> import('./containers/sales/channel/channelPlan/edit'),
        name:'channelPlanEdit',
        meta:{
            label:'渠道计划及考核编辑'
        }
    },
    {
        path:'/sales/channel/channelPlanDetails',
        component:()=> import('./containers/sales/channel/channelPlan/details'),
        name:'channelPlanDetails',
        meta:{
            label:'渠道计划及考核编辑查看'
        }
    },
    // 渠道价格和存量定义
    {
        path:'/sales/channel/channelPrice',
        component:()=> import('./containers/sales/channel/channelPrice/index'),
        name:'channelPrice',
        meta:{
            label:'渠道价格和存量定义'
        }
    },
    {
        path:'/sales/channel/channelPriceAdd',
        component:()=> import('./containers/sales/channel/channelPrice/add'),
        name:'channelPriceAdd',
        meta:{
            label:'渠道价格和存量定义新增'
        }
    },
    {
        path:'/sales/channel/channelPriceEdit',
        component:()=> import('./containers/sales/channel/channelPrice/edit'),
        name:'channelPriceEdit',
        meta:{
            label:'渠道价格和存量定义编辑'
        }
    },




    //----------配送模块 分割线----------//
    //配送单List
    {
        path:'/distribution/distributionOrder/index',
        component:()=> import('./containers/distribution/distributionOrder/index'),
        name:'distributionIndex',
        meta:{
            label:'配送单'
        }
    },
    //配送单新增
    {
        path:'/distribution/distributionOrder/orderAdd',
        component:()=> import('./containers/distribution/distributionOrder/orderAdd'),
        name:'distributionAdd',
        meta:{
            label:'新增配送单'
        }
    },
    //配送单编辑
    {
        path:'/distribution/distributionOrder/orderEdit',
        component:()=> import('./containers/distribution/distributionOrder/orderEdit'),
        name:'distributionEdit',
        meta:{
            label:'编辑配送单'
        }
    },
    //配送单详情
    {
        path:'/distribution/distributionOrder/orderInfo/:id/:distributionNo',
        component:()=> import('./containers/distribution/distributionOrder/orderInfo'),
        name:'distributionInfo',
        meta:{
            label:'查看配送单'
        }
    },
    //要货单List
    {
        path:'/distribution/requireOrder/index',
        component:()=> import('./containers/distribution/requireOrder/index'),
        name:'requireOrderIndex',
        meta:{
            label:'要货单'
        }
    },
    //要货单新增
    {
        path:'/distribution/requireOrder/orderAdd',
        component:()=> import('./containers/distribution/requireOrder/orderAdd'),
        name:'requireOrderAdd',
        meta:{
            label:'新增要货单'
        }
    },
    //要货单编辑
    {
        path:'/distribution/requireOrder/orderEdit',
        component:()=> import('./containers/distribution/requireOrder/orderEdit'),
        name:'requireOrderEdit',
        meta:{
            label:'编辑要货单'
        }
    },
    //要货单详情
    {
        path:'/distribution/requireOrder/orderInfo/:id/:requireNo',
        component:()=> import('./containers/distribution/requireOrder/orderInfo'),
        name:'requireOrderInfo',
        meta:{
            label:'查看要货单'
        }
    },
    //配送退回单List
    {
        path:'/distribution/returnOrder/index',
        component:()=> import('./containers/distribution/returnOrder/index'),
        name:'returnOrderIndex',
        meta:{
            label:'配送退回单'
        }
    },
    //配送退回单新增
    {
        path:'/distribution/returnOrder/orderAdd',
        component:()=> import('./containers/distribution/returnOrder/orderAdd'),
        name:'returnOrderAdd',
        meta:{
            label:'新增配送退回单'
        }
    },
    //配送退回单编辑
    {
        path:'/distribution/returnOrder/orderEdit',
        component:()=> import('./containers/distribution/returnOrder/orderEdit'),
        name:'returnOrderEdit',
        meta:{
            label:'编辑配送退回单'
        }
    },
    //配送退回单详情
    {
        path:'/distribution/returnOrder/orderInfo/:id/:distributionReturnNo',
        component:()=> import('./containers/distribution/returnOrder/orderInfo'),
        name:'returnOrderInfo',
        meta:{
            label:'查看配送退回单'
        }
    },
    //推荐信息接收及生成要货单
    {
        path:'/distribution/recommend/createRequireOrder',
        component:()=> import('./containers/distribution/CreateRequireOrder/index'),
        name:'recommendCreateRequireOrder',
        meta:{
            label:'推荐及生成要货单'
        }
    },

    /** 对账结算 */
    {
        path:'/accountSettlement/payCheck',
        component:()=> import('./containers/accountSettlement/payCheck/index'),
        name:'payCheckIndex',
        meta:{
            label:'经销对账单'
        }
    },
    {
        path:'/accountSettlement/payCheck/add',
        component:()=> import('./containers/accountSettlement/payCheck/add'),
        name:'payCheckAdd',
        meta:{
            label:'新增经销对账单'
        }
    },
    {
        path:'/accountSettlement/payCheck/edit',
        component:()=> import('./containers/accountSettlement/payCheck/edit'),
        name:'payCheckEdit',
        meta:{
            label:'编辑经销对账单'
        }
    },
    {
        path:'/accountSettlement/payCheck/details/:id/:payCheckNo',
        component:()=> import('./containers/accountSettlement/payCheck/details'),
        name:'payCheckDetails',
        meta:{
            label:'查看经销对账单'
        }
    },
    {
        path:'/accountSettlement/receiveCheck',
        component:()=> import('./containers/accountSettlement/receiveCheck/index'),
        name:'receiveCheckIndex',
        meta:{
            label:'应收对账单'
        }
    },
    {
        path:'/accountSettlement/receiveCheck/add',
        component:()=> import('./containers/accountSettlement/receiveCheck/add'),
        name:'receiveCheckAdd',
        meta:{
            label:'新增应收对账单'
        }
    },
    {
        path:'/accountSettlement/receiveCheck/edit',
        component:()=> import('./containers/accountSettlement/receiveCheck/edit'),
        name:'receiveCheckEdit',
        meta:{
            label:'编辑应收对账单'
        }
    },
    {
        path:'/accountSettlement/receiveCheck/details/:id/:payCheckNo',
        component:()=> import('./containers/accountSettlement/receiveCheck/details'),
        name:'receiveCheckDetails',
        meta:{
            label:'查看应收对账单'
        }
    },
    
    /** 酬金 */
    // 酬金中心
    {
        path: '/bonus/settlement',
        component: () => import('./containers/bonus/settlement'),
        name: 'settlement',
        meta: {
            label: '酬金结算单'
        }
    },
    {
        path: '/bonus/recommend',
        component: () => import('./containers/bonus/recommend'),
        name: 'recommend',
        meta: {
            label: '推荐管理'
        }
    },

    /**盘点清单**/
    //盘点list
    {
        path:'/stock/inventory',
        component: () => import('./containers/stock/inventory/index'),
        name:'inventoryIndex',
        meta:{
            label:"库存盘点清单"
        }
    },    
    
    //盘点查看
    {
        path:'/stock/inventory/info/:id/:billNo',
        component:() => import('./containers/stock/inventory/info'),
        name:'inventoryInfo',
        meta:{
            label:"查看盘点单"
        }
    },    
    //盘点新增
    {
        path:'/stock/inventory/Add',
        component : () => import('./containers/stock/inventory/add'),
        name:'inventoryAdd',
        meta:{
            label:"新增盘点单"
        }
    },    
    //盘点编辑
    {
        path:'/stock/inventory/Edit',
        component:()=>import('./containers/stock/inventory/edit'),
        name:'inventoryEdit',
        meta:{
            label:"编辑盘点单"
        }
    },

    /** 服务模块 **/
    //售后服务查询跟踪-首页
    {
        path:'/service/afterSale',
        component : () => import('./containers/service/afterSale/index'),
        name:'afterSale',
        meta:{
            label:"售后服务查询跟踪"
        }
    },    
    //售后服务查询跟踪-查看
    {
        path:'/service/afterSale/details/:id',
        component:()=>import('./containers/service/afterSale/details'),
        name:'afterSaleDetails',
        meta:{
            label:"查看售后服务跟踪"
        }
    }

]

export const routesMapping = {}

routes.forEach(router => {
    routesMapping[router.name] = router.name
})



const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: () => import('./containers/newLogin') },
        {
            path: '',
            component: Index,
            redirect: '/goods/manage/skuCommodityManagement',
            children: routes
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.length == 0) {
        next('/goods/manage/skuCommodityManagement')
    } else {
        next();
    }
});

export default router;
