// const getApi = (url) => `${window.config.context}/${url}.jhtml`;
const getApi = (url) => `${window.config.context}/${url}`;

export const HOST_BASE = `${location.protocol}//${location.host}`;

export const CODE_STATUS_OK = 0;
export const CODE_SESSION_TIME_OUT = 1008;
export const RESPONSE_TYPE_FILE = "arraybuffer";

// 获取登录验证码
export const CODE_IMG = 'http://t.cn/R8MNl4Z'

// 事件类型映射
export const EVENTS_TYPES_MAPPING = {
    user_login: '用户登录',
    user_switch: '帐号切换',
    user_quit: '用户退出',
    user_read: '用户阅读',
    user_play: '点击视频',
    user_search: '用户搜索',
    user_follow: '用户关注',
    user_uFollow: '用户取消关注',
    user_listen_to_music: '用户试听',
    user_download_music: '下载音乐',
    // user_provili_usermana:'用户管理',//权限下的用户管理

}


export const RSA_MODULUS = [
    '0099f1afd474c7436186',
    '9ce7b29c512c67bcddb5',
    '31e769a0ca0927736b27',
    '334fdff79e490846314e',
    'a9e8c78f2eaeb7102277',
    'cff98271117af0ed7166',
    '74a69f592e0506b66f80',
    'f5d65e7a2088ff4cf49a',
    '2d6119f8803a74db7b16',
    '6d6e59afd135d65687b5',
    '170aa8e6d6e28c9f02cb',
    '98a080371ab8a4103266',
    '7190818a0f9ef5cdcb'
].join('');

export const RSA_COMPONENT = '010001';

export const RSA_KEY_LENGTH = 1024;

/** 用户登入登出*/
//登录
export const USER_LOGIN = getApi('portal/login');
//登出
export const USER_LOGOUT = getApi('portal/logout');
//查询用户下所有业务实体列表
export const GET_USER_ENTITY_LIST = getApi('portal/sys/user/queryUserGroup');

/** 旧的用户模块  */
// 获取用户列表
export const USER_LIST = getApi('portal/user/list');
//新增用户
export const USER_ADDED = getApi('portal/user/add');
//修改用户
export const USER_MODIFY = getApi('portal/user/modify');
//删除用户
export const USER_DEL = getApi('portal/user/del');
//重置密码
export const USER_MODIFY_PWD = getApi('portal/user/modifyPwd');

//查询用户列表
export const PROCUREMENTS_LIST = getApi('');

/** 系统设置-----------------------新-----------------------------*/
//查询所有业务实体列表
export const QUERY_USER_GROUP = getApi('portal/sys/user_group/list');
// 查询用户列表
export const QUERY_ENTITY_USER_LIST = getApi('portal/sys/user/list');
// 编辑用户
export const EDIT_ENTITY_USER = getApi('portal/sys/user/modify');
// 创建用户
export const ADD_ENTITY_USER = getApi('portal/sys/user/createNew');
// 重置密码
export const MODIFYPWD_ENTITY_USER = getApi('portal/sys/user/modifyPwd');
//更新状态
export const USER_UPDATE_STATUS = getApi('portal/sys/user/updateUserStatus'); 
// 解绑用户
export const REMOVE_ENTITY_USER = getApi('portal/sys/user_group/remove_user');
// 查询公司列表
export const REQURY_COMPANY_LIST = getApi('portal/sys/company/list');
// 创建业务实体
export const CREATE_ENTITY = getApi('portal/sys/user_group/create');
// 关联用户
export const ASSOCIATE_USER = getApi('portal/sys/user_group/add_user');
// 查询oa账号信息
export const SEARCH_OA_COUNT = getApi('portal/sys/user/query_oa_user');

/** 旧的角色模块 */
//获取角色列表
export const ROLES_LIST = getApi('portal/role/list')
//新增角色
export const ROLES_ADDED = getApi('portal/role/save')
//修改角色
export const ROLES_EDIT = getApi('portal/role/save')
//删除角色
export const ROLES_DELETE = getApi('portal/role/delete')
//角色管理 - 指定用户
export const ROLES_IDENTIFY = getApi('portal/role/getUserList')
//角色管理 - 设置权限 - 根据角色id获取该角色的菜单
export const ROLES_GETMENULIST = getApi('portal/role/getMenuList')
//角色管理 - 设置权限 - 为角色授权菜单权限
export const ROLES_GRANTMENU = getApi('portal/role/grant')
//角色管理 - 设置权限 - 为角色添加用户
export const ROLES_ADDUSER = getApi('portal/role/addUserByRoleId')

/**  旧的权限模块  */
//获取系统配置信息
export const ROLES_SETTINGINFO = getApi('portal/sys/getInfo')
//保存系统配置信息
export const SETTING_SAVE = getApi('portal/sys/saveInfo')
//根据角色id获取该角色下没有的uerList
export const ROLES_GETNOUSERLIST = getApi('portal/role/getUserListByRid')
//获取权限系列表
export const PRIVILEGE_LIST = getApi('portal/menu/list')
//新增/保存权限系列表
export const PRIVILEGE_ADD = getApi('portal/menu/save')
//批量删除权限系列表
export const PRIVILEGE_DELETE = getApi('portal/menu/delete')
//上下移
export const PRIVILEGE_MOVEUPDOWN = getApi('portal/menu/orderNum')

/**  旧的实体商品模块 */
//实体商品配置 - 品牌管理
export const GOODS_CONFIG_BRAND = getApi('portal/user/list');
//实体商品配置 - 计量单位管理
export const GOODS_CONFIG_UNIT_QUERY = getApi('portal/unit/query');
//获取商品实例列表
export const GOODS_LIST = getApi('portal/product/pro/query')


/**  商品模块  */
//查询全部sku列表
export const SKU_LIST = getApi('portal/product/pro/queryAllSkuList')
//根据skuId查询sku详情
export const SKU_DETAIL = getApi('portal/product/pro/querySkuBySkuId')
//获取商品实例列表
export const GOODS_LIST_NEW = getApi('portal/product/newquery')
//根据商品Id查询sku列表
export const GOODS_LIST_SKU = getApi('portal/product/pro/querySkuListByProductId');
//获取一个商品实例子列表
export const ONE_GOODS_LIST = getApi('portal/oneproduct/newquery')
//根据商品编码查询商品信息
export const QUERY_GOODS_INFO_MODIFY = getApi('portal/product/pro/queryByProductId')
//查询所有品牌
export const QUERY_ALL_BRANDS = getApi('portal/product/brand/query')
//查询类目
export const QUERY_CATE = getApi('protal/product/cate/query')
//查询全部类目
export const QUERY_CATE_ALL = getApi('portal/product/cate/queryAll')

//通过用户名查询所有用户列表
export const SYS_USER_QUERYALL = getApi('portal/sys/user/queryAll')
//采购--通用--查询用户实体下的供应商列表
export const VENDOR_QUERYLISTBYUSERGROUPID = getApi('portal/purchase/vendor/queryListByUserGroupId')
//通过用户名查询用户、用户实体列表
export const USER_QUERYUSERANDUSERGROUPLIST = getApi('portal/sys/user/queryUserAndUserGroupList')
//用户实体--查询所有
export const USER_GROUP_ALL = getApi('portal/sys/userGroup/queryALL')
//用户实体--根据用户实体名称查询用户实体ID列表
export const USER_GROUP_QUERYUSERGROUPIDLIST = getApi('portal/sys/userGroup/queryUserGroupIdList')
//用户实体--根据用户实体ID和状态查询用户实体
export const USER_GROUP_QUERYUSERBYUSERGROUPID = getApi('portal/sys/userGroup/queryUserByUserGroupId')
//用户实体--查询当前用户下实体
export const USER_GROUP_QUERY = getApi('portal/sys/user/queryUserGroup')

/** 入库*/
//分页获取入库单列表
export const QUERY_STOCK_IN_LIST = getApi('portal/stock/in/queryList');
//创建入库单
export const CREATE_STOCK_IN = getApi('portal/stock/in/create');
//查看入库单
export const QUERY_STOCK_IN_DETAIL = getApi('portal/stock/in/queryDetail');
//根据条件查询商品列表
export const QUERY_SKU_LIST_BY_CONDITION = getApi('portal/product/pro/querySkuListByCondition');
//删除入库单
export const DELETE_STOCK_IN = getApi('portal/stock/in/delete');
//确认单次调拨入库
export const AllOTCHECK = getApi('portal/stock/in/allotCheck');
//根据关联单号查询入库通知单商品列表
export const QUERY_WAIT_STOCK_PRODUCT = getApi('portal/stock/in/queryStockInProductListByReleatedId');
//查询待入库的关联单号列表
export const QUERY_RELATEDSHEET_LIST = getApi('portal/stock/in/queryRelatedSheetList');
//查看采购订单信息
export const QUERY_PURCHASE_ORDER_DETAIL = getApi('portal/purchase/order/query');
//查询入库通知单基本信息
export const QUERY_STOCK_IN_BASIC_DETAIL = getApi('portal/stock/in/queryInNoticDetail');
//查询入库通知单入库详情
export const QUERY_STOCK_IN_LIST_DETAIL = getApi('portal/stock/in/queryStockPerInList');
//查询入库单商品的串码信息
export const QUERY_SN_lIST = getApi('portal/stock/in/querySnList');
//查询入库通知单商品列表
export const QUERT_STOCK_IN_PRODUCT_LIST = getApi('portal/stock/in/queryStockInProductList');
//消单次入库单号
export const CANCEL_STOCK_IN = getApi('portal/stock/in/per/revoke');
//重传入库单
export const RETRY_STOCK_IN = getApi('portal/stock/in/retry');


/** 库存管理改版 新 */
//[v1.0.2，修改]分页查询商品维度查询商品库存情况
export const QUERY_PRODUCT_INVENTORY_LIST = getApi('portal/stock/manager/product/stock');
//[v1.0.2]查询商品库存分布
export const QUERY_PRODUCT_DISTRIBUTION = getApi('portal/stock/manager/product/totalStock');
//[v1.0.2]分页查询代发仓库的商品列表
export const QUERY_DISTRIBUTION_PRODUCT_LIST = getApi('portal/stock/manager/product/proxy/stock')
//[v1.0.2.1]同步中移物流库存数据
export const SYNCHRO_LOGISTICS = getApi('portal/stock/manager/syn_logistics');
//[v1.0.2.2]根据仓库id分页查询串码列表
export const QUERY_STOCK_SN_LIST = getApi('portal/stock/manager/product/query_imei');
//[v1.0.2.2]搜索指定仓库的商品
export const QUERY_PRODUCT_SEARCH = getApi('portal/stock/manager/product/search');
//[v1.0.2.2]查询指定仓库中商品的可用库存
export const QUERY_PRODUCT_EFFECTIVESTOCK = getApi('portal/stock/manager/product/effectiveStock');
//库存管理的左边导航
export const STOCK_MANAGE_LEFT_NAVE = getApi('portal/stock/manager/storehouse/list');

// 库存--费用管理--物流费用录入
// 查询列表（分页）
export const STOCK_LOGISTICSCOST_QUERYLISTPAGE = getApi('portal/stock/logisticsCost/queryListPage');
// 新增物流费用
export const STOCK_LOGISTICSCOST_ADD = getApi('portal/stock/logisticsCost/add');
// 编辑物流费用
export const STOCK_LOGISTICSCOST_EDIT = getApi('portal/stock/logisticsCost/edit');
// 删除物流费用
export const STOCK_LOGISTICSCOST_DELETE = getApi('portal/stock/logisticsCost/delete');
// 修改审批状态
export const STOCK_LOGISTICSCOST_CHANGEAPPROVESTATUS = getApi('portal/stock/logisticsCost/changeApproveStatus');
// 下载模板
export const STOCK_LOGISTICSCOST_DOWNLOAD = getApi('portal/stock/logisticsCost/download');
// 导入物流费用
export const STOCK_LOGISTICSCOST_IMPORT = getApi('portal/stock/logisticsCost/import');
// 查看物流费用
export const STOCK_LOGISTICSCOST_QUERY = getApi('portal/stock/logisticsCost/query');
// 通过支付、收款实体查询费用明细
export const STOCK_LOGISTICSCOST_QUERYUSERGROUPFEELIST = getApi('portal/stock/logisticsCost/queryUserGroupFeeList');

// 库存--仓位商品设置
// 查询列表（所有）
export const STOCK_LOCATIONSKU_QUERYALL = getApi('portal/stock/storehouseLocation/queryAll');
// 查询列表（分页）
export const STOCK_LOCATIONSKU_QUERYPAGELIST = getApi('portal/stock/locationSku/queryListPage');
// 新增仓位商品
export const STOCK_LOCATIONSKU_ADD = getApi('portal/stock/locationSku/add');
// 删除仓位商品
export const STOCK_LOCATIONSKU_DELETE = getApi('portal/stock/locationSku/delete');
// 库存--仓位管理
// 查询列表（分页）
export const STOCK_STOREHOUSELOCATION_QUERYPAGELIST = getApi('portal/stock/storehouseLocation/queryListPage');
// 新增仓位信息
export const STOCK_STOREHOUSELOCATION_ADD = getApi('portal/stock/storehouseLocation/add');
// 删除仓位信息
export const STOCK_STOREHOUSELOCATION_DELETE = getApi('portal/stock/storehouseLocation/delete');
// 库存--费用结算
// 查询费用结算列表（分页）
export const STOCK_FEECOMPUTE_QUERYPAGELIST = getApi('portal/stock/feeCompute/queryListPage');
// 新增费用结算
export const STOCK_FEECOMPUTE_ADD = getApi('portal/stock/feeCompute/add');
// 编辑费用结算
export const STOCK_FEECOMPUTE_EDIT = getApi('portal/stock/feeCompute/edit');
// 删除物流费用
export const STOCK_FEECOMPUTE_DELETE = getApi('portal/stock/feeCompute/delete');
// 修改费用结算状态
export const STOCK_FEECOMPUTE_CHANGESTATUS = getApi('portal/stock/feeCompute/changeStatus');
// 修改费用结算审核状态
export const STOCK_FEECOMPUTE_CHANGEAPPROVESTATUS = getApi('portal/stock/feeCompute/changeApproveStatus');
// 查看费用结算
export const STOCK_FEECOMPUTE_QUERY = getApi('portal/stock/feeCompute/query');
// 库存--费用自动计算规则定义
// 查询列表（分页）
export const STOCK_FEERULE_QUERYPAGELIST = getApi('portal/stock/feeRule/queryListPage');
// 新增费用自动结算定义
export const STOCK_FEERULE_ADD = getApi('portal/stock/feeRule/add');
// 编辑费用自动结算定义
export const STOCK_FEERULE_EDIT = getApi('portal/stock/feeRule/edit');
// 删除费用自动结算定义
export const STOCK_FEERULE_DELETE = getApi('portal/stock/feeRule/delete');
// 查看费用自动结算定义
export const STOCK_FEERULE_QUERY = getApi('portal/stock/feeRule/query');

/** 库存管理改版 新 */


/** 库存管理*/
//以商品维度查询商品库存情况
export const QUERY_STOCK_PRODUCT_LIST = getApi('portal/stock/manager/listByProduct')
//以仓库维度分页查询商品库存
export const QUERY_STOCKID_LIST = getApi('portal/stock/manager/listByStock')
//查看盘点记录列表
export const QUERY_PANDIAN_LIST = getApi('portal/stock/inventory/queryList')
//根据盘点Id查询盘点详情
export const QUERY_PANDIANID_DETAIL_LIST = getApi('portal/stock/inventory/queryDetail')
//创建盘点
export const CREAT_PANDIAN = getApi('portal/stock/inventory/create')
//更新盘点
export const UPDATA_PANDIAN = getApi('portal/stock/inventory/update')
//结束盘点
export const FINSH_PANDIAN = getApi('portal/stock/inventory/finish')
//根据条件查询库存商品
export const QUERY_STOCK_PRODUCT_BY_CONDITION = getApi('portal/stock/manager/listProduct')
//获取未盘点的商品数量
export const GET_UNINVENTORY_NUM = getApi('portal/stock/inventory/uninventory')
/** 库存管理*/


/** 查看采购订单详情 **/
//查看采购订单详情
export const QUERY_PURCHASE_DETAILS = getApi('portal/purchase/order/queryDetail')
//获取采购订单操作日志列表
export const QUERY_PURCHASE_LOG = getApi('portal/purchase/order/queryLogList')
//根据采购操作日志id获取修改
export const QUERY_PURCHASE_ID_MODIFY = getApi('portal/purchase/order/logRecord')
//根据采购操作日志id获取修改2
export const QUERY_PURCHASE_ID_MODIFY_TWO = getApi('portal/purchase/order/logRecord/two')
//根据采购操作日志id获取修改3
export const QUERY_PURCHASE_ID_MODIFY_THREE = getApi('portal/purchase/order/logRecord/three')
//根据关联单号查询单次入库列
export const QUERY_SINGLE_PUTSTORAGE = getApi('portal/stock/in/queryDetailByRelatedId')
//[v1.0.2.1]获取采购订单审批记录
export const QUERY_PURCHASE_APPROVE_lOG = getApi('portal/purchase/order/approve/log')
/** 查看采购订单详情 **/


/** 采购--通用接口***start **/
export const PURCHASE_VENDOR_LISTBYUSERGROUP = getApi('portal/purchase/vendor/queryListByUserGroupId')
/** 采购--通用接口***end **/

/** 采购--合同管理***start **/
//所有合同
// export const PURCHASE_CONTRACT_QUERYALL = getApi('portal/purchase/contract/queryAll')
/** 采购--合同管理***end **/

/** 采购--供应链 重写***start **/
// 供应商注册
export const PURCHASE_VENDORREGISTER_REGISTER = getApi('portal/purchase/vendorRegister/register')
// 供应商审批
// 查询列表（分页）
export const PURCHASE_VENDORREGISTER_QUERYLISTPAGE = getApi('portal/purchase/vendorRegister/queryListPage')
// 删除
export const PURCHASE_VENDORREGISTER_DELETE = getApi('portal/purchase/vendorRegister/delete')
// 修改审批状态
export const PURCHASE_VENDORREGISTER_CHANGEAPPROVESTATUS = getApi('portal/purchase/vendorRegister/changeApproveStatus')
// 修改引进状态
export const PURCHASE_VENDORREGISTER_CHANGEIMPORTSTATUS = getApi('portal/purchase/vendorRegister/changeImportStatus')
// 查询详情
export const PURCHASE_VENDORREGISTER_QUERY = getApi('portal/purchase/vendorRegister/query')
// 供应商引进
export const PURCHASE_VENDOR_IMPORT = getApi('portal/purchase/vendor/import')
// 供应商管理
// 查询列表（分页）
export const PURCHASE_VENDOR_QUERYLISTPAGE = getApi('portal/purchase/vendor/queryListPage')
// 编辑供应商
export const PURCHASE_VENDOR_EDIT = getApi('portal/purchase/vendor/edit')
// 修改合作状态
export const PURCHASE_VENDOR_CHANGESTATUS = getApi('portal/purchase/vendor/changeStatus')
// 查看供应商
export const PURCHASE_VENDOR_QUERY = getApi('portal/purchase/vendor/query')
// 供应商新品引进，推荐
// 新增供应商新品推荐
export const PURCHASE_VENDORSPU_ADD = getApi('portal/purchase/vendorSpu/add')
// 查看供应商新品推荐
export const PURCHASE_VENDORSPU_QUERY = getApi('portal/purchase/vendorSpu/query')
// 分页查询供应商新品推荐
export const PURCHASE_VENDORSPU_QUERYPAGELIST = getApi('portal/purchase/vendorSpu/queryListPage')
// 删除供应商新品推荐
export const PURCHASE_VENDORSPU_DELETE = getApi('portal/purchase/vendorSpu/delete')
// 审批供应商新品推荐
export const PURCHASE_VENDORSPU_CHANGEAPPROVESTATUS = getApi('portal/purchase/vendorSpu/changeApproveStatus')
// 引进供应商新品推荐
export const PURCHASE_VENDORSPU_IMPORT = getApi('portal/purchase/vendorSpu/import')
// 上传图片
export const PURCHASE_VENDORSPU_PICTUREUPLOAD = getApi('portal/purchase/vendorSpu/pictureUpload')

// 实体供应商
// 分页查询列表
export const PURCHASE_USERGROUPVENDOR_QUERYLISTPAGE = getApi('portal/purchase/userGroupVendor/queryListPage')
// 查询未绑定用户实体供应商列表
export const PURCHASE_USERGROUPVENDOR_QUERYNOTBINDLIST = getApi('portal/purchase/userGroupVendor/queryNotBindList')
// 添加实体供应商
export const PURCHASE_USERGROUPVENDOR_ADD = getApi('portal/purchase/userGroupVendor/add')
// 删除实体供应商
export const PURCHASE_USERGROUPVENDOR_DELETE = getApi('portal/purchase/userGroupVendor/delete')

/** 采购--供应链 重写***end **/


/** 出库管理接口*/
//分页获取出库单列表  ('获取出库单')
export const QUERY_STOCKOUTSHEET = getApi('portal/stock/out/list')
//查询出库单详情
export const QUERY_STOCKOUTSHEETDETAIL = getApi('portal/stock/out/queryDetail')
//删除出库单
export const STOCKOUTSHEET_DELETE = getApi('portal/stock/out/delete');
//取消出库单
export const STOCKOUTSHEET_CANCEL = getApi('portal/stock/out/per/revoke');
//创建出库单
export const STOCKOUTSHEET_CREATE = getApi('portal/stock/out/create');
//确认单次调拨出库
export const ALLOT_CHECK = getApi('portal/stock/out/allotCheck');
//查询待出库商品列表
export const QUERY_WAITSTOCKOUT_PRODUCT = getApi('portal/stock/out/queryWaitStockOutProduct');
//初始化待出库商品列表
export const QUERY_INNIT_PRODUCT = getApi('portal/stock/out/createTotal');
//查询出库单商品的串码信息
export const QUERY_OUTSN_lIST = getApi('portal/stock/out/querySnList');
//重新入库【入库超时后调用】
export const STOCKOUT_RETRY = getApi('portal/stock/out/retry');


/** 调拨管理 */
//查询调拨列表
export const GET_TRANSFER_LIST = getApi('portal/stock/allot/queryList');
//删除调拨记录
export const DELETE_TRANSFER = getApi('portal/stock/allot/updateStatus');
//新增调拨单
export const CREATE_TRANSFER = getApi('portal/stock/allot/add');
//查看调拨单
export const VIEW_TRANSFER = getApi('portal/stock/allot/queryDetail');


/** 设置 */
/** 仓库设置*/
//[v1.0.2]获取用户实体下的仓库列表       (左边导航部分，分成‘本地仓’、‘中移物流仓’，及‘普通仓’、‘不良品仓’,和待发仓)
export const QUERY_STOREHOUSE_LIST = getApi('portal/stock/storehouse/list');
//[v1.0.2.1]查询用户实体下的全部仓库列表 （主页列表部分，信息比较全）
export const QUERY_ALL_STOREHOUSE_LIST = getApi('portal/stock/storehouse/usergroup/queryAll');
//[v1.0.2.1]修改仓库状态
export const CHANGE_STOREHOUSE_STATUS = getApi('portal/stock/storehouse/change_status');
//[v1.0.2.1]根据仓库id获取仓库信息
export const QUERY_STOREHOUSE_BY_ID = getApi('portal/stock/storehouse/queryStoreHouse');
//[v1.0.2.1]校验外部仓库信息           （校验中移物流仓的仓库编码和地址编码正确否）
export const CHECK_EXT_STOREHOUSE = getApi(' ');
//[v1.0.2.1]修改仓库
export const MODIfY_STOREHOUSE = getApi('portal/stock/storehouse/modify');
//[v1.0.2.1]创建仓库
export const CREATE_STOREHOUSE = getApi('portal/stock/storehouse/add');
//[v1.0.2]查询用户实体下仓库列表        (下拉框部分，包含仓库id，仓库名，仓库类型)
export const GET_STOREHOUSE_LIST = getApi('portal/stock/storehouse/query');
//修改仓库联系人
export const MODIFY_STOREHOUSE_LINK = getApi('portal/stock/storehouse/link/modify');
//删除仓库联系人
export const DELETE_STOREHOUSE_LINK = getApi('portal/stock/storehouse/link/delete');
//新增仓库联系人
export const ADD_STOREHOUSE_LINK = getApi('portal/stock/storehouse/link/add');


/** 供应商*/
//获取业务实体供应商列表      （主页列表部分，信息比较全）
export const QUERY_VENDOR_LIST = getApi('portal/purchase/vendor/usergroup/queryList');
//获取所有供应商列表         （下拉列表部分，接口内容是供应商id和名称列表）
export const QUERY_ALL_SUPPLIER_LIST = getApi('portal/purchase/vendor/search');
//新增供货商
export const ADD_SUPPLIER = getApi('portal/purchase/vendor/add');
//查看供货商
export const QUERY_SUPPLIER_DETAIL = getApi('portal/purchase/supplier/queryDetail');
//查看业务实体下供应商详情
export const QUERY_GROUP_SUPPLIER_DETAIL = getApi('portal/purchase/vendor/usergroup/queryDetail');
//修改业务实体的供应商地址
export const MODIFY_SUPPLIER_ADDRESS = getApi('portal/purchase/vendor/usergroup/modifyAddress');
//新增业务实体的供应商地址信息
export const ADD_SUPPLIER_ADDRESS = getApi('portal/purchase/vendor/usergroup/addAddress');
//[v1.0.2.1]修改业务实体的供应商信息
export const MODIFY_SUPPLIER_INFO = getApi('portal/purchase/vendor/usergroup/modify');
//[v1.0.2.1]修改业务实体的供应商状态
export const MODIFY_SUPPLIER_STATUS = getApi('portal/purchase/vendor/usergroup/modify_status');
//查看供应商基础详情
export const QUERY_SUPPLIER_BASE_DETAIL = getApi('portal/purchase/vendor/queryBaseDetail');


/** 商品设置模块 */
//查询业务实体下的商品列表
export const QUERY_USER_RELATION_PRODUCT = getApi('portal/product/pro/usergroup/query');
//修改业务实体关联商品状态
export const CHANGE_DOWM_USER_RELARION_PRODUCT = getApi('portal/product/pro/usergroup/modifyStatus');
//查询未添加到业务实体的商品
export const QUERY_USER_UNRELATION_PRODUCT = getApi('portal/product/pro/usergroup/unRelationSkuList');
//业务实体关联商品
export const USER_RELATION_PRODUCT = getApi('portal/product/pro/usergroup/relation');


// 新增采购订单
export const CREATE_PURCHASE_ORDER = getApi('portal/purchase/order/add');
//修改采购订单
export const SAVE_PURCHASE_ORDER = getApi('portal/purchase/order/modify');
//修改或者新增采购订单
export const SAVE_PURCHASE_ORDERS = getApi('portal/purchase/order/save');
//提交采购订单审批
export const APPROVE_PURCHASE_ORDER = getApi('portal/purchase/order/approve');

/** 采购列表 */
//分页获取采购订单列表
export const QUERY_PURCHASE_ORDER_LIST = getApi('portal/purchase/order/queryList');
//删除采购订单
export const DELETE_PURCHASE_ORDER = getApi('portal/purchase/order/delete');
// 修改时间
export const UPDATE_MODIFYARRIVEDTIME = getApi('portal/purchase/order/modifyArrivedTime');
//修改备注
export const UPDATE_MODIFYCOMMENT = getApi('portal/purchase/order/modifyComment');

/* ********************采购--采购订单重写***start************** */
//采购订单-分页-新
export const PURCHASE_ORDER_LIST = getApi('portal/purchase/order/queryListPage');
//采购订单新增-新
export const PURCHASE_ORDER_ADD = getApi('portal/purchase/order/add');
//采购订单编辑-新
export const PURCHASE_ORDER_EDIT = getApi('portal/purchase/order/edit');
//采购订单审批-新
export const PURCHASE_ORDER_CHANGESTATUS = getApi('portal/purchase/order/changeApproveStatus');
//删除采购订单-新
export const PURCHASE_ORDER_DELETE = getApi('portal/purchase/order/delete');
//查看采购订单信息-新
export const PURCHASE_ORDER_QUERY = getApi('portal/purchase/order/query');
//采购订单入库-新
export const PURCHASE_ORDER_INSTOCK = getApi('portal/purchase/order/inStock');
/* ********************采购--采购订单重写***end************** */

/* ********************采购--退货单重写***start************** */
//退货单-分页-新
export const PURCHASE_RETURNBILL_LIST = getApi('portal/purchase/returnBill/queryListPage');
//退货单新增-新
export const PURCHASE_RETURNBILL_ADD = getApi('portal/purchase/returnBill/add');
//退货单编辑-新
export const PURCHASE_RETURNBILL_EDIT = getApi('portal/purchase/returnBill/edit');
//退货单修改-新
export const PURCHASE_RETURNBILL_CHANGESTATUS = getApi('portal/purchase/returnBill/changeStatus');
//退货单审批-新
export const PURCHASE_RETURNBILL_CHANGEAPPROVESTATUS = getApi('portal/purchase/returnBill/changeApproveStatus');
//删除退货单-新
export const PURCHASE_RETURNBILL_DELETE = getApi('portal/purchase/returnBill/delete');
//查看退货单信息-新
export const PURCHASE_RETURNBILL_QUERY = getApi('portal/purchase/returnBill/query');
//退货单出库-新
export const PURCHASE_RETURNBILL_OUTSTOCK = getApi('portal/purchase/returnBill/outStock');
/* ********************采购--退货单重写***end************** */


/** 合同管理 */
//查询列表（分页）
export const PURCHASE_CONTRACT_QUERYPAGELIST = getApi('portal/purchase/contract/queryListPage');
//查询列表（所有）
export const PURCHASE_CONTRACT_QUERYALL = getApi('portal/purchase/contract/queryAll');
//新增合同
export const PURCHASE_CONTRACT_ADD = getApi('portal/purchase/contract/add');
//编辑合同
export const PURCHASE_CONTRACT_EDIT = getApi('portal/purchase/contract/edit');
//修改合同状态(启用、作废)
export const PURCHASE_CONTRACT_CHANGECONTRACTSTATUS = getApi('portal/purchase/contract/changeContractStatus');
//删除合同
export const PURCHASE_CONTRACT_DELETE = getApi('portal/purchase/contract/delete');
//合同管理查看
export const PURCHASE_CONTRACT_QUERY = getApi('portal/purchase/contract/query');



//搜索业务实体的所有采购合同列表
export const QUERY_ENTITY_CONTRACT_LIST = getApi('portal/purchase/contract/usergroup/search');
//查询业务实体的采购合同列表
export const QUERY_CONTRACT_LIST = getApi('portal/purchase/contract/usergroup/queryList');
//修改业务实体的采购合同状态
export const ENABLE_EFFECTIVE_CONTRACT = getApi('portal/purchase/contract/usergroup/updateStatus');
//查询采购合同详情
export const QUERY_PURCHASE_ORDER_DETAILS_LIST = getApi('portal/purchase/contract/queryByContractNo');
//保存采购合同
export const SAVE_PURCHASE_CONTRACT = getApi('portal/purchase/contract/add');
//搜索业务实体下的商品列表
export const SEARCH_GOODS_LIST = getApi('portal/product/pro/usergroup/search');
//搜索采购 合同
export const SEARCH_PURCHASE_CONTRACT = getApi('portal/purchase/contract/search');
//新增业务实体的采购合同
export const ADD_PURCHASE_CONTRACT = getApi('portal/purchase/contract/usergroup/add');
//修改业务实体的采购合同
export const MODIFY_PURCHASE_CONTRACT = getApi('portal/purchase/contract/usergroup/modify');
//[v1.0.2]根据条件查询合同的商品列表
export const QUERY_CONTRACT_PRODUCT_LIST = getApi('portal/purchase/contract/usergroup/querySkuListByCondition');
//[v1.0.2]根据合同序号获取采购订单列表
export const CONTRACT_SEQ_PURCHASE_LIST = getApi('portal/purchase/order/contract/list');
//[v1.0.2]根据合同序号查询还允许采购商品列表
export const CONTRACT_PURCHASE_SKU_LIST = getApi('portal/purchase/contract/query/allow_purchase_skus');

//地址组件接口
//[v1.0.2]获取全国省列表
export const QUERY_PROVINCE_LIST = getApi('portal/ms/area/province/query');
//[v1.0.2]获取省里市列表
export const QUERY_CITY_LIST = getApi('portal/ms/area/province/city/query');
//[v1.0.2]获取市里区列表
export const QUERY_AREA_LIST = getApi('portal/ms/area/province/city/area/query');




/**-----------销售业务 分割线-----------------**/

/*  销售模块 */
//查询菜单订单数量
export const QUERY_SALE_MENUORDERNUM = getApi('portal/sale/order/statisticsOrder');
//修改订单收货地址
export const UPDATE_ORDER_ADDRESS = getApi('portal/sale/order/updateOrderAddress');
//下载导入数据解析结果
export const GET_RESULT_DOWNLOAD = getApi('portal/sale/import/resultDownload');
// 根据上级行政区获取下级行政区列表
export const QUERY_PROVINCECITYAREA = getApi('portal/ms/area/queryDistrict');

/*  销售订单  */
//分页获取销售订单列表
export const QUERY_SALES_ORDER_LIST = getApi('portal/sale/order/orderList');
// 新增销售订单
export const CREATE_SALES_ORDER_ORDERADD = getApi('portal/sale/order/orderAdd');
// 编辑销售订单
export const UPDATE_SALES_ORDER = getApi('portal/sale/order/orderUpdate');
// 销售订单-根据订单ID获取订单信息
export const QUERY_SALES_ORDER = getApi('portal/sale/order/orderQuery');
//销售订单-根据订单ID编辑备注
export const UPDATE_SALES_ORDER_REMARK = getApi('portal/sale/order/updateOrderRemark');
// 销售订单-模糊查询商品列表
export const QUERY_SALES_GOODSLIST = getApi('portal/product/pro/usergroup/search');
// 导出订单列表
export const EXPORT_SALES_ORDER = getApi('portal/sale/order/export');
//导入订单
export const IMPORT_SALES_ORDERS = getApi('portal/sale/import/dataImport');
//导入数据查询
export const IMPORT_ORDERS_DATA_QUERY = getApi('portal/sale/import/dataquery');
// 查询销售订单属性
export const QUERY_ORDER_ATTR = getApi('portal/sale/order/orderAttributeQuery');
//导入数据生成销售订单
export const GET_DATA_CONFIRM_IMPORT = getApi('portal/sale/import/dataConfirmImport');
// 获取出库的物流单记录
export const QUERTY_OUTBOUND_ROUTER_LIST = getApi('portal/stock/out/queryRouterByStockPerOutId');
// 只显示渠道设置中选择了导入模板的渠道
export const QUERTY_CHANNEL_TEMPLATE = getApi('portal/sale/channel/channelQueryWithTemplate');
// 获取物流记录
export const QUERTY_ROUTER_LIST = getApi('portal/sale/order/queryRouter');
//  异常订单已拒收确认拒收
export const UPDATA_SALES_ERROEREFUSE = getApi('portal/sale/order/confirmRefuse');

/* 退货订单 */
//新增退货订单
export const POST_NEW_REFUSE_ORDER = getApi('portal/sale/order/returnOrderAdd');
//退货列表
export const RETURN_LIST = getApi('portal/sale/order/returnOrderList');
// 通过退货订单ID查询退货商品清
export const QUERY_FEFUND_GOODS = getApi('portal/sale/order/returnSkuList');
// 退货订单不同状态的数量
export const QUERY_RETURN_ORDER_COUNT = getApi('portal/sale/order/returnOrderCount');
// 根据退货订单ID编辑备注信息
export const EDIT_REFUND = getApi('portal/sale/order/returnRemarkUpdate');
// 根据退货订单ID编辑状态
export const CHANGE_REFUND_STATUS = getApi('portal/sale/order/returnStatusUpdate');
// 查询销售订单的退货列表
export const GET_ORDER_RETURN = getApi('portal/sale/order/returnByOrderId');
// 编辑订单状态
export const EDIT_ORDER_STATUS = getApi('portal/sale/order/updateOrderStatus');
// 批量编辑订单状态
export const EDIT_ORDER_BATCH_UPDATESTATUS = getApi('portal/sale/order/updateOrderStatusBatch');
// 根据主键ID查询退货单详细信息
export const QUERY_REFUND_DETAIL = getApi('portal/sale/order/returnOrderQuery');
// 编辑退货订单
export const UPADTE_RETURN_ORDER = getApi('portal/sale/order/returnOrderUpdate');
// 根据销售订单id获取退货商品
export const QUERY_RETURN_PROLIST_ORDER_ID = getApi('portal/sale/order/queryReturnProListByOrderId');
//根据退货订单ID编辑状态
export const POST_RETURN_STATUS_UPDATE = getApi('portal/sale/order/returnStatusUpdate');
// 查看查看订单-商品清单
export const QUERY_SALE_ORDER = getApi('portal/sale/order/orderPluList');

/* 换货订单  */
// 获取换货列表数量
export const QUERY_CHANGE_ORDER_COUNT = getApi('portal/sale/order/changeOrderCount');
// 分页获取换货订单列表
export const QEURY_CHANGE_LIST = getApi('portal/sale/order/changeOrderList');
// 根据主键ID查询换货订单详情
export const QUERY_CHANGE_DETAIL = getApi('portal/sale/order/changeOrderQuery');
// 根据换货订单ID查询换货商品清单列表
export const QUERY_CHANGE_LIST = getApi('portal/sale/order/changeSkuList');
// 根据换货订单ID编辑状态
export const EDIT_CHANGE_STATUS = getApi('portal/sale/order/changeStatusUpdate');
// 根据销售订单id查询换货列表
export const QUERY_SALES_CHANGE_LIST = getApi('portal/sale/order/getChangesByOrderId');
// 新增换货订单
export const CREATE_CHANGE_ORDER = getApi('portal/sale/order/changeOrderAdd');
// 编辑换货单
export const EDIT_CHANGE_ORDER = getApi('portal/sale/order/changeOrderEdit');
// 更改换货收货地址
export const EDIT_CHANGE_ADDRESS = getApi('portal/sale/order/updateChangeAddress');
// 入库单保存
export const POST_STORE_IN_SAVE = getApi('portal/sale/order/stockInSave');
// 更改换货订单备注
export const UPDATE_CHANGE_REMARK = getApi('portal/sale/order/changeRemarkUpdate');
// 根据ID获取商品信息有换货数量的
export const QUERY_SALE_ORDER_WITH_COUNT = getApi('portal/sale/order/queryReturnChangeListByOrderId');
// 获取换货订单详情，有可换货数量
export const QUERY_CHANGE_ORDER_WITH_COUNT = getApi('portal/sale/order/changeOrderQueryForEdit');
// 查询换货订单入库记录
export const QUERY_CHANGE_ORDER_IN_STORE = getApi('portal/stock/in/queryDetailByRelatedSheetId');
//据订单id模糊查询订单列表
export const QUERY_ORDER_BLURRY = getApi('portal/sale/order/queryOrderListByOrderId');

/*   出库  */
// 出库单保存
export const SAVE_SALES_STOREOUT = getApi('portal/sale/order/stockOutSave');
//查询仓库列表
export const QUERY_STORE_STORELIST = getApi('portal/stock/storehouse/storeList');
//按条件查询渠道
export const QUERY_CHANNEL_ADDRESSBYID = getApi('portal/sale/channel/getAddressBychannelId');
// 批量出库单保存
export const SAVE_SALES_STOREOUTBATCH = getApi('portal/sale/order/storeOutBatch');
// 根据销售订单商品生成出货单信息
export const QUERY_SALES_OUTSTORELIST = getApi('portal/sale/storeOut/storeOutList');
// 根据仓库id获取仓库信息详情
export const QEURY_STORE_BY_ID = getApi('portal/stock/storehouse/queryStoreHouse');
// 换货出库接口
export const CHANGE_OUT_STORE = getApi('portal/sale/order/stockOutSave');
// 获取订单详情出库记录
// export const GET_OUT_STORE_RECORD = getApi('portal/store/storeOutQuery');
export const GET_OUT_STORE_RECORD = getApi('portal/stock/out/storeOutQuery');

/*  渠道   */
//查询所有渠道
export const QUERY_CHANNEL_ALLCHANNEL = getApi('portal/sale/channel/channelQueryAll');
//根据搜索获取渠道
export const QUERY_CHANNEL_BYSEARCH = getApi('portal/sale/channel/channelQuery');
//根据channelId查询channel信息
export const QUERY_CHANNEL_BYID = getApi('portal/sale/channel/queryChannelById');
//获取分类渠道数据
export const GETSTATUSCHANNEL = getApi('portal/sale/channel/channelQuery');
//改变渠道状态
export const UPDATACHANNE_STATUS = getApi('portal/sale/channel/startOrStopChannel');
//编辑渠道
export const UPDATE_CHANNEL = getApi('portal/sale/channel/channelUpdate');
// 新增渠道
export const ADDCHANNE = getApi('portal/sale/channel/channelAdd');

/* 渠道地址  */
//新增渠道收貨地址
export const CREATE_CHANNEL_ADDRESS = getApi('portal/sale/channel/channelAddressAdd');
//设置渠道默认地址
export const UPDATE_CHANNEL_DEFALUTADDRESS = getApi('portal/sale/channel/setDefaultAddress');
//编辑渠道地址
export const UPDATE_CHANNEL_ADDRESS = getApi('portal/sale/channel/channelAddressUpdate');
//更改渠道收货地址状态
export const UPDATE_CHANNEL_ADDRESSSTATUS = getApi('portal/sale/channel/updateChannelAddressStatus');
//查询渠道收货地址
export const QUERY_SALES_RECEIVING_ADDRESS = getApi('portal/sale/channel/getAddressBychannelId');

/* 渠道商品  */
//导入渠道商品
export const POST_IMPORT_CHANNEL_GOODS = getApi('portal/sale/channel/dataImport');
//导入数据生成渠道商品
export const POST_DATA_CONFIRM_IMPORT = getApi('portal/sale/channel/dataConfirmImport');
// 根据ID获取商品信息
export const QUERY_SALE_ORDER_WITHID = getApi('portal/sale/order/orderQuery');
// 通过渠道ID查商品
export const SEARCHMERCHANDISE = getApi('portal/sale/channel/channelSkuList');
// 新增渠道商品
export const CREATE_CHANNEL_GOOD = getApi('portal/sale/channel/channelSkuAdd');
// 编辑渠道商品
export const UPDATE_CHANNEL_GOOD = getApi('portal/sale/channel/channelSkuUpdate');
// 查询所有实体
export const QUERY_USERGROUP_ALL = getApi('portal/userGroup/queryList');
// 通过渠道商品ID查询商品信息
export const QUERY_GOODMSG_BYCHANNELSKUID = getApi('portal/sale/channel/selectChannelSkuById');
// 售卖/停售商品
export const START_OR_STOP_CHANNEL_GOODS = getApi('portal/sale/channel/startOrStopChannelSku');
//查询所有发货方
export const QUERY_SALE_ALLVENDOR = getApi('portal/sale/channel/queryVendorList');
//导入渠道商品-下载模板
export const QUERY_IMPORT_CHANNEL_GOODS_TEMPLATE = getApi('portal/sale/channel/downloadTemplate');
// 根据渠道id查询渠道下商品
// export const QUERY_CHANNELGOOD_BYCHANNELID = getApi('portal/sale/channel/queryAllSkusByChannelId');
export const QUERY_CHANNELGOOD_BYCHANNELID = getApi('portal/sale/channel/queryAllByChannelId');
// 删除渠道商品
export const DELETE_CHANNELSKU = getApi('portal/sale/channel/channelSkuDelete');

/*  日志  */
// 查询某个订单的操作日志
export const QUERY_ORDER_LOG = getApi('portal/sale/log/logList');
// 查询销售订单-日志详情
export const QUERY_ORDER_LOG_DETAIL = getApi('portal/sale/log/logQuery');
// 消息操作人
export const QUERY_OPERATORS = getApi('portal/sys/user/currentUserGroupUser');

/*  首页  */
//首页--统计滞留订单
export const QUERY_RETENTIONORDERCOUNT = getApi('portal/sale/order/retentionOrderCount');
//渠道订单量分布
export const QUERY_SALES_ORDER_ECHARTS = getApi('portal/sale/order/querySaleOrderEcharts');
//异常订单
export const QUERY_ORDER_AND_ERROR_COUNT = getApi('portal/sale/order/queryOrderAndErrorCount');

/* 消息中心  */
// 消息列表
export const QUERY_MESSAGE_LIST = getApi('portal/message/messageList');
// 获取消息操作类型
export const QUERY_MESSAGE_OPERATE_TYPE = getApi('portal/message/operateTypeList');
// 消息中心，获取未读数量
export const QUERY_MESSAGE_NOT_READ = getApi('portal/message/queryNotReaded');
//  设置已读
export const SET_MESSAGE_READED = getApi('portal/message/setIsReaded');
// 获取下载文件流
export const GET_DOENLOAD_FILE = getApi('portal/message/download');

/* 商品管理 */
// 通用接口-用户实体下商品列表
export const QUERY_SKULIST_BYUSERGROUP = getApi('portal/product/userGroupSKU/queryUserGroupSkuList');
// 通用接口-根据商品名称查询SKU编码
export const QUERY_SKUCODE_BYPRODUCTNAME = getApi('portal/product/sku/querySKUList');
// 通用接口-根据商品名称查询SPU编码
export const QUERY_SPUCODE_BYPRODUCTNAME = getApi('portal/product/spu/querySPUList');

// 多条码管理_新增
export const MULTIBAR_ADD = getApi('portal/product/multiBar/add');
// 多条码管理_删除
export const MULTIBAR_DELETE = getApi('portal/product/multiBar/delete');
// 多条码管理_分页list
export const QUERY_MULTIBAR_LIST = getApi('portal/product/multiBar/queryListPage');

// 商品数字属性管理_新增
export const DIGITALATTR_ADD = getApi('portal/product/digitalAttr/add');
// 商品数字属性管理_编辑
export const DIGITALATTR_EDIT = getApi('portal/product/digitalAttr/edit');
// 商品数字属性管理_分页list
export const QUERY_DIGITALATTR_LIST = getApi('portal/product/digitalAttr/queryListPage');
// 判断商品数字属性_产品是否存在
export const DIGITALATTR_SPU_IFEXIST = getApi('portal/product/spu/ifExist');


//实体可用商品管理_查询列表（分页）
export const USERGROUPSKU_QUERYLIST = getApi('portal/product/userGroupSKU/queryListPage');
//实体可用商品管理_批量修改状态
export const USERGROUPSKU_CHANGESTATUS = getApi('portal/product/userGroupSKU/changeStatusBatch');
//实体可用商品管理_实体可用商品管理_批量删除
export const USERGROUPSKU_DELETE = getApi('portal/product/userGroupSKU/deleteBatch');
//实体可用商品管理_批量添加
export const USERGROUPSKU_ADD = getApi('portal/product/userGroupSKU/addBatch');
//实体可用商品管理_查询可添加的SKU列表（分页）
export const USERGROUPSKU_QUERYSKULIST = getApi('portal/product/userGroupSKU/querySKUToUserGroupListPage');


//普通商品价格管理_新增
export const NORMAL_PRICE_GOODS_ADD = getApi('portal/product/priceNormal/add');
//普通商品价格管理_编辑
export const NORMAL_PRICE_GOODS_EDIT = getApi('portal/product/priceNormal/edit');
//普通商品价格管理_修改状态
export const NORMAL_PRICE_GOODS_EDIT_TYPE = getApi('portal/product/priceNormal/changeStatus');
//普通商品价格管理_修改审批状态
export const NORMAL_PRICE_GOODS_EDIT_APPROVE = getApi('portal/product/priceNormal/changeApproveStatus');
//普通商品价格管理_删除
export const NORMAL_PRICE_GOODS_DELETE = getApi('portal/product/priceNormal/delete');
//普通商品价格管理_查询
export const NORMAL_PRICE_GOODS_CHECK = getApi('/portal/product/priceNormal/query');
//普通商品价格管理_查询列表(分页)
export const NORMAL_PRICE_GOODS_QUERY = getApi('portal/product/priceNormal/queryListPage');

//特殊商品价格管理_新增
export const SPECIAL_PRICE_GOODS_ADD = getApi('portal/product/priceSpecial/add');
//特殊商品价格管理_编辑
export const SPECIAL_PRICE_GOODS_EDIT = getApi('portal/product/priceSpecial/edit');
//特殊商品价格管理_修改状态
export const SPECIAL_PRICE_GOODS_EDIT_TYPE = getApi('portal/product/priceSpecial/changeStatus');
//特殊商品价格管理_修改审批状态
export const SPECIAL_PRICE_GOODS_EDIT_APPROVE = getApi('portal/product/priceSpecial/changeApproveStatus');
//特殊商品价格管理_删除
export const SPECIAL_PRICE_GOODS_DELETE = getApi('portal/product/priceSpecial/delete');
//特殊商品价格管理_查询
export const SPECIAL_PRICE_GOODS_CHECK = getApi('portal/product/priceSpecial/query');
//特殊商品价格管理_查询列表(分页)
export const SPECIAL_PRICE_GOODS_QUERY = getApi('portal/product/priceSpecial/queryListPage');

//SKU商品_新增
export const SKU_COMMODITY_MANAGEMENT_ADD = getApi('/portal/product/sku/add');
//SKU商品_编辑
export const SKU_COMMODITY_MANAGEMENT_EDIT = getApi('/portal/product/sku/edit');
//SKU商品_删除
export const SKU_COMMODITY_MANAGEMENT_DELETE = getApi('/portal/product/sku/delete');
//SKU商品_查询列表（分页）
export const SKU_COMMODITY_MANAGEMENT_QUERYLISTPAGE = getApi('/portal/product/sku/queryListPage');
//SKU商品_查询详情
export const SKU_COMMODITY_MANAGEMENT_QUERY = getApi('/portal/product/sku/query');
//SKU商品_添加标签
export const SKU_COMMODITY_MANAGEMENT_ADDTAG = getApi('/portal/product/skuTag/add');
//SKU商品_删除标签
export const SKU_COMMODITY_MANAGEMENT_DELETETAG = getApi('/portal/product/skuTag/delete');
//SKU商品_标签设置管理_查询列表（分页）
export const SKU_COMMODITY_MANAGEMENT_DELETETAGBATCH = getApi('/portal/product/skuTag/queryListPage');
//SKU商品_标签设置管理_查询列表（所有）
export const SKU_COMMODITY_SKUTAG_QUERYALL = getApi('portal/product/skuTag/queryAll');

/**  卡券管理  */
//卡券类别查询
export const LOOKUO_CARDTYPE_ALL = getApi('portal/product/cardType/queryListPage')
//卡券类别状态修改
export const CHANGE_CARDTYPE_STATUS = getApi('portal/product/cardType/changeStatus')
//卡券类别编辑
export const EDIT_CARDTYPE = getApi('portal/product/cardType/edit')
//卡券类别删除
export const DELETE_CARDTYPE = getApi('portal/product/cardType/delete')
//卡券类别新增
export const ADD_CARDTYPE = getApi('portal/product/cardType/add')


//---卡券信息管理
//导入卡券信息
export const IMPORT_CARD_INFOR = getApi('portal/product/card/import')
//下载模板
export const DOWN_LOAD_TEMP = getApi('portal/product/card/download')
//删除卡券信息
export const DELETE_CARD_INFOR = getApi('portal/product/card/delete')
//查询列表（分页）
export const CHECK_CARDINFOR = getApi('portal/product/card/queryListPage')

//---SPU产品管理
//SPU新增
export const ADD_SPU = getApi('portal/product/spu/add')
//SPU删除
export const DELETE_SPU = getApi('portal/product/spu/delete')
//SPU修改
export const EDIT_SPU = getApi('portal/product/spu/edit')
//SPU分页查询
export const SPU_LIST_PAGE = getApi('portal/product/spu/queryListPage')
//SPU详情查看
export const QUERY_SPU = getApi('portal/product/spu/query')

// 商品管理
// 品牌管理_新增
export const MANAGE_BRAND_ADD = getApi('portal/product/brand/add');
// 品牌管理_编辑
export const MANAGE_BRAND_EDIT = getApi('portal/product/brand/edit');
// 品牌管理_删除
export const MANAGE_BRAND_DELETE = getApi('portal/product/brand/delete');
// 品牌管理_分页list
export const MANAGE_BRAND_LIST = getApi('portal/product/brand/queryListPage');
// 品牌管理_所有list
export const MANAGE_BRAND_ALL = getApi('portal/product/brand/queryListAll');

// 类目管理_新增
export const MANAGE_CATEGORY_ADD = getApi('portal/product/category/add');
// 类目管理_编辑
export const MANAGE_CATEGORY_EDIT = getApi('portal/product/category/edit');
// 类目管理_删除
export const MANAGE_CATEGORY_DELETE = getApi('portal/product/category/delete')
// 类目管理_分页list
export const MANAGE_CATEGORY_LIST = getApi('portal/product/category/queryListPage');
// 类目管理_所有list
export const MANAGE_CATEGORY_ALL = getApi('portal/product/category/queryListAll');

// 计量管理_新增
export const MANAGE_UNIT_ADD = getApi('portal/product/unit/add');
// 计量管理_修改状态
export const MANAGE_UNIT_CHANGESTATUS = getApi('portal/product/unit/changeStatus')
// 计量管理_分页list
export const MANAGE_UNIT_LIST = getApi('portal/product/unit/queryListPage');
// 计量管理_所有list
export const MANAGE_UNIT_ALL = getApi('portal/product/unit/queryListAll');

// 标签管理_新增
export const MANAGE_TAG_ADD = getApi('portal/product/tag/add');
// 标签管理_删除
export const MANAGE_TAG_DELETE = getApi('portal/product/tag/delete')
// 标签管理_分页list
export const MANAGE_TAG_LIST = getApi('portal/product/tag/queryListPage');
// 标签管理_查询所有
export const MANAGE_TAG_ALL = getApi('portal/product/tag/queryAll');

// 可组合商品发布_分页list
export const GROUPSKU_LIST = getApi('portal/product/groupSku/queryListPage');
// 可组合商品发布_新增
export const GROUPSKU_ADD = getApi('portal/product/groupSku/add');
// 可组合商品发布_编辑
export const GROUPSKU_EDIT = getApi('portal/product/groupSku/edit')
// 可组合商品发布_删除
export const GROUPSKU_DELETE = getApi('portal/product/groupSku/delete');
// 可组合商品发布_查看
export const GROUPSKU_QUERY = getApi('portal/product/groupSku/query')

// 可组合商品打包_分页list
export const SKUPACKAGE_LIST = getApi('portal/product/skupackage/queryListPage');
// 可组合商品打包_新增
export const SKUPACKAGE_ADD = getApi('portal/product/skupackage/add');
// 可组合商品打包_编辑
export const SKUPACKAGE_EDIT = getApi('portal/product/skupackage/edit')
// 可组合商品打包_删除
export const SKUPACKAGE_DELETE = getApi('portal/product/skupackage/delete');
// 可组合商品打包_查看
export const SKUPACKAGE_QUERY = getApi('portal/product/skupackage/query')

/* --------------促销管理 分割线-------------- */
//拆单规则设置
//拆单规则list
export const SALE_SPLITRULE_LIST = getApi('portal/sale/splitRule/queryListPage')
//拆单规则新增
export const SALE_SPLITRULE_ADD = getApi('portal/sale/splitRule/add')
//拆单规则删除
export const SALE_SPLITRULE_DELETE = getApi('portal/sale/splitRule/delete')


//--普通促销
//普通促销分页查询
export const NORMAL_PROMOTION_LIST = getApi('portal/promotion/normal/queryListPage')
//普通促销新增
export const NORMAL_PROMOTION_ADD = getApi('portal/promotion/normal/add')
//普通促销编辑
export const NORMAL_PROMOTION_EDIT = getApi('portal/promotion/normal/edit')
//普通促销删除
export const NORMAL_PROMOTION_DELETE = getApi('portal/promotion/normal/delete')
//普通促销状态修改
export const NORMAL_PROMOTION_CHANGE_STATU = getApi('portal/promotion/normal/changeStatus')
//普通促销审批状态修改
export const NORMAL_PROMOTION_CHANGE_APPROVE = getApi('portal/promotion/normal/changeApproveStatus')
//普通促销查看  
export const NORMAL_PROMOTION_QUERY = getApi('portal/promotion/normal/query')
//--组合促销
//组合促销分页查询
export const COMB_PROMOTION_LIST = getApi('portal/promotion/group/queryListPage')
//组合促销新增
export const COMB_PROMOTION_ADD = getApi('portal/promotion/group/add')
//组合促销编辑
export const COMB_PROMOTION_EDIT = getApi('portal/promotion/group/edit')
//组合促销删除
export const COMB_PROMOTION_DELETE = getApi('portal/promotion/group/delete')
//组合促销状态修改
export const COMB_PROMOTION_CHANGE_STATU = getApi('portal/promotion/group/changeStatus')
//组合促销审批状态修改
export const COMB_PROMOTION_CHANGE_APPROVE = getApi('portal/promotion/group/changeApproveStatus')
//组合促销查看  
export const COMB_PROMOTION_QUERY = getApi('portal/promotion/group/query')
//--赠券促销
//赠券促销分页查询
export const PRESENT_PROMOTION_LIST = getApi('portal/promotion/present/queryListPage')
//赠券促销新增
export const PRESENT_PROMOTION_ADD = getApi('portal/promotion/present/add')
//赠券促销编辑
export const PRESENT_PROMOTION_EDIT = getApi('portal/promotion/present/edit')
//赠券促销删除
export const PRESENT_PROMOTION_DELETE = getApi('portal/promotion/present/delete')
//赠券促销状态修改
export const PRESENT_PROMOTION_CHANGE_STATU = getApi('portal/promotion/present/changeStatus')
//赠券促销审批状态修改
export const PRESENT_PROMOTION_CHANGE_APPROVE = getApi('portal/promotion/present/changeApproveStatus')
//赠券促销查看  
export const PRESENT_PROMOTION_QUERY = getApi('portal/promotion/present/query')
//--满减促销
//满减促销分页查询
export const REDUCE_PROMOTION_LIST = getApi('portal/promotion/reduce/queryListPage')
//满减促销新增
export const REDUCE_PROMOTION_ADD = getApi('portal/promotion/reduce/add')
//满减促销编辑
export const REDUCE_PROMOTION_EDIT = getApi('portal/promotion/reduce/edit')
//满减促销删除
export const REDUCE_PROMOTION_DELETE = getApi('portal/promotion/reduce/delete')
//满减促销状态修改
export const REDUCE_PROMOTION_CHANGE_STATU = getApi('portal/promotion/reduce/changeStatus')
//满减促销审批状态修改
export const REDUCE_PROMOTION_CHANGE_APPROVE = getApi('portal/promotion/reduce/changeApproveStatus')
//满减促销查看  
export const REDUCE_PROMOTION_QUERY = getApi('portal/promotion/reduce/query')
//--条件组合促销
//条件组合促销分页查询
export const CONGROUP_PROMOTION_LIST = getApi('portal/promotion/conGroup/queryListPage')
//条件组合促销新增
export const CONGROUP_PROMOTION_ADD = getApi('portal/promotion/conGroup/add')
//条件组合促销编辑
export const CONGROUP_PROMOTION_EDIT = getApi('portal/promotion/conGroup/edit')
//条件组合促销删除
export const CONGROUP_PROMOTION_DELETE = getApi('portal/promotion/conGroup/delete')
//条件组合促销状态修改
export const CONGROUP_PROMOTION_CHANGE_STATU = getApi('portal/promotion/conGroup/changeStatus')
//条件组合促销审批状态修改
export const CONGROUP_PROMOTION_CHANGE_APPROVE = getApi('portal/promotion/conGroup/changeApproveStatus')
//条件组合促销查看  
export const CONGROUP_PROMOTION_QUERY = getApi('portal/promotion/conGroup/query')
//支付方式查询
export const PAY_TYPE_LIST = getApi('portal/promotion/reduce/queryPayTypeList')


//----渠道管理
//--渠道通用查询
//通过渠道名称查询所有渠道
export const CHANNEL_CHANNELQUERY = getApi('portal/sale/channel/channelQuery')
//--渠道计划及考核
//查询列表（分页）
export const CHANNELPLAN_QUERYLISTPAGE = getApi('portal/sale/channelPlan/queryListPage')
//新增渠道计划
export const CHANNELPLAN_ADD = getApi('portal/sale/channelPlan/add')
//编辑渠道计划
export const CHANNELPLAN_EDIT = getApi('portal/sale/channelPlan/edit')
//删除渠道计划
export const CHANNELPLAN_DELETE = getApi('portal/sale/channelPlan/delete')
//计算
export const CHANNELPLAN_COMPUTE = getApi('portal/sale/channelPlan/compute')
//查询详情 
export const CHANNELPLAN_QUERY = getApi('portal/sale/channelPlan/query')
//--渠道价格和存量定义
//通过渠道ID查询所有渠道商品
export const CHANNEL_QUERYALLBYCHANNELID = getApi('portal/sale/channel/queryAllByChannelId')
//查询列表（分页）
export const CHANNELPRICE_QUERYLISTPAGE = getApi('portal/sale/channelPrice/queryListPage')
//新增渠道计划
export const CHANNELPRICE_ADD = getApi('portal/sale/channelPrice/add')
//编辑渠道计划
export const CHANNELPRICE_EDIT = getApi('portal/sale/channelPrice/edit')
//删除渠道计划
export const CHANNELPRICE_DELETE = getApi('portal/sale/channelPrice/delete')
//重置
export const CHANNELPRICE_RESET = getApi('portal/sale/channelPrice/reset')
//查询详情 
export const CHANNELPRICE_QUERY = getApi('portal/sale/channelPrice/query')

// 销售流水
//销售流水list
export const SALE_BILL_LIST = getApi('portal/sale/flowingWater/queryListPage')
//销售流水详情
export const SALE_BILL_DETAILS = getApi('portal/sale/flowingWater/query')

/* 酬金 */
// 酬金信息列表
export const QUERY_SETTLEMENT_LIST = getApi('portal/bonus/settlement/queryList');
// 导出酬金列表
export const EXPORT_SETTLEMENT_LIST = getApi('portal/bonus/settlement/export');
// 推荐信息列表
export const QUERY_RECOMMEND_LIST = getApi('portal/bonus/recommend/queryList');
// 地区下拉列表信息
export const QUERY_REGION_LIST = getApi('portal/bonus/selector/region');
// 平台下拉列表信息
export const QUERY_PLATFORM_LIST = getApi('portal/bonus/selector/platform');


/*****库存*****/
/**仓库通用查询**/
//查询商品库存单价
export const QUERY_STOCK_SKU_PRICE = getApi('portal/stock/manager/queryStockSkuPrice')
//查询用户实体下仓库信息
export const QUERY_USER_GROUP_STORE_HOUSE = getApi('portal/stock/storehouse/queryUserGroupStoreHouse')
/**盘点单**/
//盘点清单
export const INVENTORY_LIST = getApi('portal/stock/inventory/queryListPage')
//盘点新增
export const INVENTORY_ADD = getApi('portal/stock/inventory/add')
//盘点编辑
export const INVENTORY_EDIT = getApi('portal/stock/inventory/edit')
//盘点删除
export const INVENTORY_DELETE = getApi('portal/stock/inventory/delete')
//盘点状态修改
export const INVENTORY_CHANGE_STATUS = getApi('portal/stock/inventory/changeStatus')    
//盘点审批状态修改
export const INVENTORY_CHANGE_APPSTATUS = getApi('portal/stock/inventory/approveStatus')    
//盘点状态修改
export const INVENTORY_INFO = getApi('portal/stock/inventory/query')    

/*****配送*****/
/**配送单**/
//配送单list
export const DISTRIBUTIONORDER_LIST = getApi('portal/distribution/distributionOrder/queryListPage')
//配送单新增
export const DISTRIBUTIONORDER_ADD = getApi('portal/distribution/distributionOrder/add')
//配送单编辑
export const DISTRIBUTIONORDER_EDIT = getApi('portal/distribution/distributionOrder/edit')
//配送单删除
export const DISTRIBUTIONORDER_DELETE = getApi('portal/distribution/distributionOrder/delete')
//配送单审批状态修改
export const DISTRIBUTIONORDER_CHANGESTATUS = getApi('portal/distribution/distributionOrder/changeApproveStatus')    
//配送单查看
export const DISTRIBUTIONORDER_INFO = getApi('portal/distribution/distributionOrder/query')
//配送出库
export const DISTRIBUTIONORDER_OUTSTOCK = getApi('/portal/distribution/distributionOrder/outStock')


/**要货单**/
//要货单list
export const REQUIREORDER_LIST = getApi('portal/distribution/require/queryListPage')
//要货单新增
export const REQUIREORDER_ADD = getApi('portal/distribution/require/add')
//要货单编辑
export const REQUIREORDER_EDIT = getApi('portal/distribution/require/edit')
//要货单删除
export const REQUIREORDER_DELETE = getApi('portal/distribution/require/delete')
//要货单审批状态修改
export const REQUIREORDER_CHANGESTATUS = getApi('portal/distribution/require/changeApproveStatus')    
//要货单查看
export const REQUIREORDER_INFO = getApi('portal/distribution/require/query')

/**配送退回单**/
//配送退回单list
export const RETURNORDER_LIST = getApi('portal/distribution/return/queryListPage')
//配送退回单新增
export const RETURNORDER_ADD = getApi('portal/distribution/return/add')
//配送退回单编辑
export const RETURNORDER_EDIT = getApi('portal/distribution/return/edit')
//配送退回单删除
export const RETURNORDER_DELETE = getApi('portal/distribution/return/delete')
//配送退回单审批状态修改
export const RETURNORDER_CHANGESTATUS = getApi('portal/distribution/return/changeApproveStatus')    
//配送退回单查看
export const RETURNORDER_INFO = getApi('portal/distribution/return/query') 
//配送退回入库
export const RETURNORDER_INSTOCK = getApi('portal/distribution/return/inStock')

//推荐信息接收及生成要货单 list
export const RETCOMMEND_LIST = getApi('portal/distribution/recommend/queryListPage')
//生成要货单
export const RETCOMMEND_ORDER_ADD = getApi('portal/distribution/recommend/generateOrder')

/* 对账结算 */
// 经销对账单list
export const PAYCHECK_LIST = getApi('portal/account/payCheck/queryListPage')
// 经销对账单新增
export const PAYCHECK_ADD = getApi('portal/account/payCheck/add')
// 经销对账单编辑
export const PAYCHECK_EDIT = getApi('portal/account/payCheck/edit')
// 经销对账单删除
export const PAYCHECK_DELETE = getApi('portal/account/payCheck/delete')
// 经销对账单-审批状态修改
export const PAYCHECK_CHANGESTATUS = getApi('portal/account/payCheck/changeApproveStatus')    
// 经销对账单查看
export const PAYCHECK_INFO = getApi('portal/account/payCheck/query') 
// 经销对账单-查询应付待结算单据列表
export const PAYCHECK_QUERYOUTSETTLE = getApi('portal/account/payCheck/queryOutSettle')

// 应收对账单list
export const RECEIVECHECK_LIST = getApi('portal/account/receiveCheck/queryListPage')
// 应收对账单新增
export const RECEIVECHECK_ADD = getApi('portal/account/receiveCheck/add')
// 应收对账单编辑
export const RECEIVECHECK_EDIT = getApi('portal/account/receiveCheck/edit')
// 应收对账单删除
export const RECEIVECHECK_DELETE = getApi('portal/account/receiveCheck/delete')
// 应收对账单-审批状态修改
export const RECEIVECHECK_CHANGESTATUS = getApi('portal/account/receiveCheck/changeApproveStatus')    
// 应收对账单查看
export const RECEIVECHECK_INFO = getApi('portal/account/receiveCheck/query') 
// 应收对账单-查询应付待结算单据列表
export const RECEIVECHECK_QUERYINSETTLE = getApi('portal/account/receiveCheck/queryInSettle') 

/** -------------服务模块-------------- **/
//售后服务查询跟踪-首页
export const SERVICE_AFTERSALE_LIST = getApi('portal/service/saleAfter/queryListPage') 
//售后服务查询跟踪-查看
export const SERVICE_AFTERSALE_INFO = getApi('portal/service/saleAfter/query')

/** -------------统计模块-------------- **/
// 配送单统计数量
export const DISTRIBUTION_ORDER_COUNT = getApi('portal/distribution/distributionOrder/statisticalCount') 
// 要货单统计数量
export const REQUIRE_ORDER_COUNT = getApi('portal/distribution/require/statisticalCount')
// 配送退回单统计数量
export const RETURN_ORDER_COUNT = getApi('portal/distribution/return/statisticalCount') 
// 推荐及生成要货单统计数量
export const RECOMMEND_ORDER_COUNT = getApi('portal/distribution/recommend/statisticalCount')
// 采购单统计数量
export const PURCHASE_ORDER_COUNT = getApi('portal/purchase/order/statisticalCount') 
// 采购退货单统计数量
export const PURCHASE_RETURNBILL_COUNT = getApi('portal/purchase/returnBill/statisticalCount')
// 经销对账单统计数量
export const ACCOUNT_PAYCHECK_COUNT = getApi('portal/account/payCheck/statisticalCount') 
// 应收对账单统计数量
export const ACCOUNT_RECEIVECHECK_COUNT = getApi('portal/account/receiveCheck/statisticalCount')
