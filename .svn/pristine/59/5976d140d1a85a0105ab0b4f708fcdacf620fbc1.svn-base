import "es6-promise";
import Axios from 'axios'
import * as C from "../constants/api"
import cookies from './cookies'
import { Message } from 'element-ui'
import utils from './misc'

const METHODS = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
};

Axios.interceptors.request.use(config => {
    // let sessionId = cookies.getCookie('ng');
    // if (sessionId) {
    // 	config.headers['ng'] = sessionId
    // }else{
    //     setTimeout(()=>{
    //        window.location.href = '#/login'
    //    }, 1000)
    //     return Promise.reject("请重新登录")
    // }

    // var url = config.url.replace('/api', '');
    var tmp = `${window.config.context}`

    var url = config.url.replace(tmp, '');
    // var url = ''
    const bb = JSON.stringify(config.data) + url;
    const hexDigest = utils.md5(bb);
    config.headers['reqDigest'] = hexDigest;
    // config.headers['nature'] = bb
    return config;
}, error => {
    console.log(error,"请求错误信息");
    return Promise.reject(error)
});

Axios.interceptors.response.use(response => {
    let { data: resp } = response;
    let { responseType: resType } = response.config;
    return new Promise((resolve, reject) => {
        const { code } = resp;
        if (code == C.CODE_STATUS_OK || resType == C.RESPONSE_TYPE_FILE) {
            resolve(resp.data ? resp.data : resp);
        } else if (code == C.CODE_SESSION_TIME_OUT) {
            console.log("响应正确111");
            cookies.delCookie('ng');
            reject(resp);
            Message.warning({ message: '尚未登录或登录超时，请重新登录', showClose: true });
            window.location.href = '#/login'
        } else if (code == 1020) { // 退出登录成功
            resolve(resp);
            resp.msg && Message.success({ message: resp.msg, showClose: true });
        } else if (code == 1000 || code == 1204 || code == 1015) { // 1000用户名或密码错误， 1024验证码错误, 1015 oa验证用户名或密码错误
            reject(resp);
        } else {
            reject(resp);
            resp.msg && Message.warning({ message: resp.msg, showClose: true });
        }
    });
}, error => {
    // 响应异常 进来拿cookie -> ng
    let cookie = cookies.getCookie('ng');
    console.log(cookie,"响应异常拦截");
    if (cookie) {
        let res = error.response;
        if (res && res.data && res.data.code == 1008) {
            res.data.msg && Message.warning({ message: res.data.msg, showClose: true });
        } else {
            Message.warning({ message: '网络错误，请检测网络是否正常!', showClose: true });
        }
        setTimeout(() => {
            return Promise.reject(error);
        }, 1000)
    } else {
        console.log("响应错误333");
        Message.warning({ message: '尚未登录或登录已超时，请重新登录', showClose: true });
        setTimeout(() => {
            window.location.href = '#/login'
            return Promise.reject(error);
        }, 2000)
    }
});

const request = (url, params = {}, headers = {}, method = METHODS.GET) => {
    let _dataType = params.dataType ? params.dataType : "";
    if (_dataType) delete params.dataType;
    let ng = cookies.getCookie('ng')
    let options = {
        headers: {
            'Content-Type': 'application/json',
            "ng": ng ? ng : sessionStorage.getItem('ng'),
            "ltype": "moaa",
            ...headers,
            'params': utils.md5(params)
        },
        method: method,
    };
    if (_dataType) options = Object.assign({}, options, { responseType: "arraybuffer" });
    if (method === METHODS.POST || method == METHODS.PUT) {
        options.data = params;
    } else if (method === METHODS.GET || method == METHODS.DELETE) {
        options.params = params;
    }
    return Axios({ url, ...options });
};

const post = (url, params, headers) => request(url, params, headers, METHODS.POST);

export const createAction = (type, payloadCreator, metaCreator) => {
    const identity = (...args) => args[0];
    const isFunc = (fn) => typeof (fn) === 'function';
    const isPromise = obj => typeof (obj) === 'object' && isFunc(obj.then);
    const finalPayloadCreator = isFunc(payloadCreator) ? payloadCreator : identity;
    return ({ commit, dispatch }, ...args) => {
        const payload = finalPayloadCreator(...args);
        const action = { type, payload };
        if (isFunc(metaCreator)) {
            action.meta = metaCreator(...args);
        }
        if (isPromise(payload)) {
            return payload.then(result => {
                commit(type, Object.assign(action, { payload: result }));
                return result;
            }).catch(error => {
                dispatch('hidePageLoading');
                console.error(`请求 ${type}异常，请求结果为: ${JSON.stringify(error)}`);
                return Promise.reject(error);
            });
        }

        return commit(type, Object.assign(action, { payload }));
    };
};

export default {
    // 登录
    loginin: params => post(C.USER_LOGIN, params),
    // 登出 (没用，没用后台接口，前台登出)
    logout: params => post(C.USER_LOGOUT, params),	// 查询事件
    // 获取业务实体列表
    getUserEntityList: params => post(C.GET_USER_ENTITY_LIST, params),

    /**    旧权限模块，有面包屑导航    */
    //权限管理 - 查询角色列表
    queryRolesList: params => post(C.ROLES_LIST, params),
    // 权限管理 - 新增用户
    addUser: params => post(C.USER_ADDED, params),
    // 权限管理 - 删除用户
    userDel: params => post(C.USER_DEL, params),
    // 权限管理 - 修改用户
    userModify: params => post(C.USER_MODIFY, params),
    // 权限管理 - 重置密码
    userModifyPwd: params => post(C.USER_MODIFY_PWD, params),
    
    // 权限管理 - 查询用户列表
    queryUserList: params => post(C.USER_LIST, params),
    // 权限管理 - 新增角色
    addRole: params => post(C.ROLES_ADDED, params),
    // 权限管理 - 修改角色
    editRole: params => post(C.ROLES_EDIT, params),
    // 权限管理 - 删除角色
    deleteRole: params => post(C.ROLES_DELETE, params),
    // 权限管理 - 指定用户
    QueryUserRoleList: params => post(C.ROLES_IDENTIFY, params),
    // 权限管理 - 设置权限
    setMenu: params => post(C.ROLES_GETMENULIST, params),
    // 权限管理 - 添加用户
    addUser: params => post(C.ROLES_ADDUSER, params),
    //权限管理 - 获取系统配置信息
    getSettingInfo: params => post(C.ROLES_SETTINGINFO, params),
    //权限管理 - 添加用户
    addRolesUser: params => post(C.ROLES_ADDUSER, params),
    //权限管理 - 获取用户列表
    queryNoUserList: params => post(C.ROLES_GETNOUSERLIST, params),
    //权限管理 - 保存系统配置信息
    getSettingSave: params => post(C.SETTING_SAVE, params),
    //权限管理 - 获取权限列表
    queryPrivilegeList: params => post(C.PRIVILEGE_LIST, params),
    //权限管理 - 获取权限列表
    saveRivilege: params => post(C.PRIVILEGE_ADD, params),
    //权限管理 - 为角色授权菜单权限
    grantRivilege: params => post(C.ROLES_GRANTMENU, params),
    //权限管理 - 为角色授权菜单权限
    deletePrivilege: params => post(C.PRIVILEGE_DELETE, params),
    //权限管理 - 角色的上下移
    movePrivilege: params => post(C.PRIVILEGE_MOVEUPDOWN, params),

    /** 系统设置-----------------新---------------------*/
    queryConfigGroup: params => post(C.QUERY_USER_GROUP, params),
    // 查询用户列表
    queryEntityUserList: params => post(C.QUERY_ENTITY_USER_LIST, params),
    // 编辑用户
    editEntity: params => post(C.EDIT_ENTITY_USER, params),
    // 新增用户
    addEntity: params => post(C.ADD_ENTITY_USER, params),
    // 修改用户密码
    modifyPwdEntity: params => post(C.MODIFYPWD_ENTITY_USER, params),
    // 权限管理 - 修改状态
    updateUserStatus: params => post(C.USER_UPDATE_STATUS, params),
    // 解绑用户
    removeEntity: params => post(C.REMOVE_ENTITY_USER, params),
    // 查询公司列表
    queryCompanyList: params => post(C.REQURY_COMPANY_LIST, params),
    // 创建业务实体
    createEntity: params => post(C.CREATE_ENTITY, params),
    // 关联用户
    associateUser: params => post(C.ASSOCIATE_USER, params),
    // 查询oa账号信息
    searchOaCount: params => post(C.SEARCH_OA_COUNT, params),

    /**  旧实体商品，有面包屑导航  */
    //实体商品配置 - 品牌管理
    goodsConfigBrand: params => post(C.GOODS_CONFIG_BRAND, params),
    //实体商品配置 - 计量单位管理
    goodsConfigUnitQuery: params => post(C.GOODS_CONFIG_UNIT_QUERY, params),
    // 获取商品实例列表
    queryGoodsList: params => post(C.GOODS_LIST, params),
    // 获取商品实例列表
    queryGoodsListNew: params => post(C.GOODS_LIST_NEW, params),

    /**   旧采购，有面包屑导航     */
    // 采购 - 模拟获取列表
    procurementsList: params => post(C.PROCUREMENTS_LIST, params),
    //新增采购订单
    createProcureOrder: params => post(C.CREATE_PURCHASE_ORDER, params),


    //通过用户名查询所有用户列表
    sysUserQueryall: params => post(C.SYS_USER_QUERYALL, params),
    //采购--通用--查询用户实体下的供应商列表
    vendorQuerylistbyusergroupid: params => post(C.VENDOR_QUERYLISTBYUSERGROUPID, params),
    //通过用户名查询用户、用户实体列表
    userQueryuserandusergrouplist: params => post(C.USER_QUERYUSERANDUSERGROUPLIST, params),
    //用户实体--查询所有
    userGroupAll: params => post(C.USER_GROUP_ALL, params),
    //用户实体--根据用户实体名称查询用户实体ID列表
    userGroupQueryusergroupidlist: params => post(C.USER_GROUP_QUERYUSERGROUPIDLIST, params),
    //用户实体--根据用户实体ID和状态查询用户实体
    userGroupQueryuserbyusergroupid: params => post(C.USER_GROUP_QUERYUSERBYUSERGROUPID, params),
    //用户实体--查询所有
    //当前用户下用户实体--查询所有
    userGroupQuery: params => post(C.USER_GROUP_QUERY, params),

    /**   商品模块  */
    //查询全部sku列表
    querySkuList: params => post(C.SKU_LIST, params),
    //根据skuId查询sku详情
    querySkuDetail: params => post(C.SKU_DETAIL, params),
    // 根据商品Id查询sku列表
    queryGoodsListSku: params => post(C.GOODS_LIST_SKU, params),
    //根据条件查询商品列表
    querySkuListByConditionSearch: params => post(C.QUERY_SKU_LIST_BY_CONDITION, params),
    //根据商品编码查询商品信息
    queryGoodsInfoModify: params => post(C.QUERY_GOODS_INFO_MODIFY, params),
    //查询所有的品牌
    queryAllBrands: params => post(C.QUERY_ALL_BRANDS, params),
    //查询类目
    queryCate: params => post(C.QUERY_CATE, params),
    //查询全部类目
    queryCateAll: params => post(C.QUERY_CATE_ALL, params),

    /**  出库管理接口 */
    //获取出库单列表
    queryStockOutSheet: params => post(C.QUERY_STOCKOUTSHEET, params),
    //查询出库单详情
    queryStockOutSheetDetail: params => post(C.QUERY_STOCKOUTSHEETDETAIL, params),
    //删除出库单
    deleteStockOutSheet: params => post(C.STOCKOUTSHEET_DELETE, params),
    //取消出库单
    cancelStockOutSheet: params => post(C.STOCKOUTSHEET_CANCEL, params),
    //创建出库单
    createStockOutSheet: params => post(C.STOCKOUTSHEET_CREATE, params),
    //确认单次调拨出库
    allotOutCheck: params => post(C.ALLOT_CHECK, params),
    //查询待出库商品列表
    queryWaitStockOutProduct: params => post(C.QUERY_WAITSTOCKOUT_PRODUCT, params),
    //获取初始化待出库商品列表
    queryInnitProduct: params => post(C.QUERY_INNIT_PRODUCT, params),
    //查询出库单商品的串码信息
    queryOutsnList: params => post(C.QUERY_OUTSN_lIST, params),
    //重新入库【入库超时后调用】
    outboundRetry: params => post(C.STOCKOUT_RETRY, params),

    /** 设置 */
    /** 仓库设置*/
    //[v1.0.2]获取用户实体下的仓库列表       (左边导航部分，分成‘本地仓’、‘中移物流仓’，及‘普通仓’、‘不良品仓’,和待发仓)
    getStorehouseListQuery: params => post(C.QUERY_STOREHOUSE_LIST, params),
    //[v1.0.2.1]查询用户实体下的全部仓库列表 （主页列表部分，信息比较全）
    queryAllStorehouseList: params => post(C.QUERY_ALL_STOREHOUSE_LIST, params),
    //[v1.0.2.1]修改仓库状态
    changeStorehouseStatus: params => post(C.CHANGE_STOREHOUSE_STATUS, params),
    //[v1.0.2.1]根据仓库id获取仓库信息
    queryStorehouseById: params => post(C.QUERY_STOREHOUSE_BY_ID, params),
    //[v1.0.2.1]校验外部仓库信息           （校验中移物流仓的仓库编码和地址编码正确否）
    checkExtStorehouse: params => post(C.CHECK_EXT_STOREHOUSE, params),
    //[v1.0.2.1]修改仓库
    modifyStorehouse: params => post(C.MODIfY_STOREHOUSE, params),
    //[v1.0.2]查询用户实体下仓库列表        (下拉框部分，包含仓库id，仓库名，仓库类型)
    getStorehouseList: params => post(C.GET_STOREHOUSE_LIST, params),
    //创建仓库
    createStorehouse: params => post(C.CREATE_STOREHOUSE, params),
    //修改仓库联系人
    modifyStorehouseLink: params => post(C.MODIFY_STOREHOUSE_LINK, params),
    //删除仓库联系人
    deleteStorehouseLink: params => post(C.DELETE_STOREHOUSE_LINK, params),
    //新增仓库联系人
    addStorehouseLink: params => post(C.ADD_STOREHOUSE_LINK, params),


    /** 供应商*/
    //获取所有供应商列表         （下拉列表部分，接口内容是供应商id和名称列表）
    queryAllSupplierList: params => post(C.QUERY_ALL_SUPPLIER_LIST, params),
    //新增供货商
    addSupplier: params => post(C.ADD_SUPPLIER, params),
    //查看供货商信息
    querySupplierDetail: params => post(C.QUERY_SUPPLIER_DETAIL, params),
    //查看业务实体下供应商详情
    queryGroupSupplierDetail: params => post(C.QUERY_GROUP_SUPPLIER_DETAIL, params),
    //修改业务实体的供应商地址
    modifySupplierAddress: params => post(C.MODIFY_SUPPLIER_ADDRESS, params),
    //新增业务实体的供应商地址信息
    addSupplierAddress: params => post(C.ADD_SUPPLIER_ADDRESS, params),
    //[v1.0.2.1]修改业务实体的供应商信息
    modifySupplierInfo: params => post(C.MODIFY_SUPPLIER_INFO, params),
    //[v1.0.2.1]修改业务实体的供应商状态
    modifySupplierStatus: params => post(C.MODIFY_SUPPLIER_STATUS, params),
    //查看供应商基础详情
    querySupplierBaseDetail: params => post(C.QUERY_SUPPLIER_BASE_DETAIL, params),


    /** 商品设置模块 */
    //查询业务实体下的商品列表
    queryUserRelationProduct: params => post(C.QUERY_USER_RELATION_PRODUCT, params),
    //修改业务实体关联商品状态
    changeDownUserRelationProduct: params => post(C.CHANGE_DOWM_USER_RELARION_PRODUCT, params),
    //查询未添加到业务实体的商品
    queryUserUnRelationProduct: params => post(C.QUERY_USER_UNRELATION_PRODUCT, params),
    //业务实体关联商品
    userRelationProduct: params => post(C.USER_RELATION_PRODUCT, params),


    /** 库存调拨 */
    //获取仓库调拨列表
    getTransferList: params => post(C.GET_TRANSFER_LIST, params),
    //删除调拨记录
    deleteTransfer: params => post(C.DELETE_TRANSFER, params),
    //查看调拨记录
    viewTransfer: params => post(C.VIEW_TRANSFER, params),
    //新增调拨单
    createTransfer: params => post(C.CREATE_TRANSFER, params),

    /** 入库 */
    //分页获取入库单列表
    queryStockInList: params => post(C.QUERY_STOCK_IN_LIST, params),
    //创建入库单
    createStockIn: params => post(C.CREATE_STOCK_IN, params),
    //查看入库单详情
    queryStockInDetail: params => post(C.QUERY_STOCK_IN_DETAIL, params),
    //确认入库
    allotCheck: params => post(C.AllOTCHECK, params),
    //查询入库商品列表
    queryWaitStockInProduct: params => post(C.QUERY_WAIT_STOCK_PRODUCT, params),

    //查询待入库的关联单号列表
    queryRelatedSheetList: params => post(C.QUERY_RELATEDSHEET_LIST, params),
    //查看采购订单信息
    queryPurchaseOrderDetail: params => post(C.QUERY_PURCHASE_ORDER_DETAIL, params),
    //查询入库通知单基本信息
    queryStockInBasicDetail: params => post(C.QUERY_STOCK_IN_BASIC_DETAIL, params),
    //查询入库通知单入库详情
    queryStockInListDetail: params => post(C.QUERY_STOCK_IN_LIST_DETAIL, params),
    //查询入库单商品的串码信息
    querySnList: params => post(C.QUERY_SN_lIST, params),
    //查询入库通知单商品列表
    queryStockInProductList: params => post(C.QUERT_STOCK_IN_PRODUCT_LIST, params),
    //消单次入库单号
    cancelStockIn: params => post(C.CANCEL_STOCK_IN, params),
    //重传入库单
    retryStockIn: params => post(C.RETRY_STOCK_IN, params),


    /** 库存管理改版 新 */
    //[v1.0.2，修改]分页查询商品维度查询商品库存情况
    queryProductInventoryLisy: params => post(C.QUERY_PRODUCT_INVENTORY_LIST, params),
    //[v1.0.2]查询商品库存分布
    queryProductDistribution: params => post(C.QUERY_PRODUCT_DISTRIBUTION, params),
    //[v1.0.2]分页查询代发仓库的商品列表
    queryDistributionProductList: params => post(C.QUERY_DISTRIBUTION_PRODUCT_LIST, params),
    //[v1.0.2.1]同步中移物流库存数据
    SynchroLogistics: params => post(C.SYNCHRO_LOGISTICS, params),
    //[v1.0.2.2]根据仓库id分页查询串码列表
    QueryStockSnList: params => post(C.QUERY_STOCK_SN_LIST, params),
    //[v1.0.2.2]搜索指定仓库的商品
    QueryProductSearch: params => post(C.QUERY_PRODUCT_SEARCH, params),
    //[v1.0.2.2]查询指定仓库中商品的可用库存
    QueryProductEffectiveStock: params => post(C.QUERY_PRODUCT_EFFECTIVESTOCK, params),
    //库存管理的左边导航
    StockManageLeftNave: params => post(C.STOCK_MANAGE_LEFT_NAVE, params),

    // 库存--费用管理--物流费用录入
    //查询列表（分页）
    stockLogisticscostQuerylistpage: params => post(C.STOCK_LOGISTICSCOST_QUERYLISTPAGE, params),
    //新增物流费用
    stockLogisticscostAdd: params => post(C.STOCK_LOGISTICSCOST_ADD, params),
    //编辑物流费用
    stockLogisticscostEdit: params => post(C.STOCK_LOGISTICSCOST_EDIT, params),
    //删除物流费用
    stockLogisticscostDelete: params => post(C.STOCK_LOGISTICSCOST_DELETE, params),
    //修改审批状态
    stockLogisticscostChangeapprovestatus: params => post(C.STOCK_LOGISTICSCOST_CHANGEAPPROVESTATUS, params),
    //下载模板
    stockLogisticscostDownload: params => post(C.STOCK_LOGISTICSCOST_DOWNLOAD, params),
    //导入物流费用
    stockLogisticscostImport: params => post(C.STOCK_LOGISTICSCOST_IMPORT, params),
    //查看物流费用
    stockLogisticscostQuery: params => post(C.STOCK_LOGISTICSCOST_QUERY, params),
    //通过支付、收款实体查询费用明细
    stockLogisticscostQueryusergroupfeelist: params => post(C.STOCK_LOGISTICSCOST_QUERYUSERGROUPFEELIST, params),

    // 库存--仓位商品设置
    // 查询列表（所有）
    stockLocationskuQueryall: params => post(C.STOCK_LOCATIONSKU_QUERYALL, params),
    // 查询列表（分页）
    stockLocationskuQuerypagelist: params => post(C.STOCK_LOCATIONSKU_QUERYPAGELIST, params),
    // 新增仓位商品
    stockLocationskuAdd: params => post(C.STOCK_LOCATIONSKU_ADD, params),
    // 删除仓位商品
    stockLocationskuDelete: params => post(C.STOCK_LOCATIONSKU_DELETE, params),
    // 库存--仓位管理
    // 查询列表（分页）
    stockStorehouselocationQuerypagelist: params => post(C.STOCK_STOREHOUSELOCATION_QUERYPAGELIST, params),
    // 新增仓位信息
    stockStorehouselocationAdd: params => post(C.STOCK_STOREHOUSELOCATION_ADD, params),
    // 删除仓位信息
    stockStorehouselocationDelete: params => post(C.STOCK_STOREHOUSELOCATION_DELETE, params),
    // 库存--费用结算
    // 查询费用结算列表（分页）
    stockFeecomputeQuerypagelist: params => post(C.STOCK_FEECOMPUTE_QUERYPAGELIST, params),
    // 新增费用结算
    stockFeecomputeAdd: params => post(C.STOCK_FEECOMPUTE_ADD, params),
    // 编辑费用结算
    stockFeecomputeEdit: params => post(C.STOCK_FEECOMPUTE_EDIT, params),
    // 删除物流费用
    stockFeecomputeDelete: params => post(C.STOCK_FEECOMPUTE_DELETE, params),
    // 修改费用结算状态
    stockFeecomputeChangestatus: params => post(C.STOCK_FEECOMPUTE_CHANGESTATUS, params),
    // 修改费用结算审核状态
    stockFeecomputeChangeapprovestatus: params => post(C.STOCK_FEECOMPUTE_CHANGEAPPROVESTATUS, params),
    // 查看费用结算
    stockFeecomputeQuery: params => post(C.STOCK_FEECOMPUTE_QUERY, params),
    // 库存--费用自动计算规则定义
    // 查询列表（分页）
    stockFeeruleQuerypagelist: params => post(C.STOCK_FEERULE_QUERYPAGELIST, params),
    // 新增费用自动结算定义
    stockFeeruleAdd: params => post(C.STOCK_FEERULE_ADD, params),
    // 编辑费用自动结算定义
    stockFeeruleEdit: params => post(C.STOCK_FEERULE_EDIT, params),
    // 删除费用自动结算定义
    stockFeeruleDelete: params => post(C.STOCK_FEERULE_DELETE, params),
    // 查看费用自动结算定义
    stockFeeruleQuery: params => post(C.STOCK_FEERULE_QUERY, params),
    /** 库存管理改版 新 */


    /** 库存管理 */
    //以商品维度查询商品库存情况
    queryStockProductList: params => post(C.QUERY_STOCK_PRODUCT_LIST, params),
    //以仓库维度分页查询商品库存
    queryStockIdList: params => post(C.QUERY_STOCKID_LIST, params),
    //查看盘点记录列表
    queryPandianList: params => post(C.QUERY_PANDIAN_LIST, params),
    //根据盘点Id查询盘点详情
    queryPandianIdDetailList: params => post(C.QUERY_PANDIANID_DETAIL_LIST, params),
    //创建盘点
    creatPandian: params => post(C.CREAT_PANDIAN, params),
    //更新盘点
    updataPandian: params => post(C.UPDATA_PANDIAN, params),
    //结束盘点
    finshPandian: params => post(C.FINSH_PANDIAN, params),
    //根据条件查询库存商品
    queryStockProductByCondition: params => post(C.QUERY_STOCK_PRODUCT_BY_CONDITION, params),
    //获取未盘点的商品数量
    getUninventoryNum: params => post(C.GET_UNINVENTORY_NUM, params),

    /** 采购模块 */
    //分页获取采购订单列表
    queryPurchaseOrderList: params => post(C.QUERY_PURCHASE_ORDER_LIST, params),
    //删除采购订单
    deletePurchaseOrder: params => post(C.DELETE_PURCHASE_ORDER, params),
    // 修改时间
    updatePurchaseOrderArrivedTime: params => post(C.UPDATE_MODIFYARRIVEDTIME, params),
    //修改备注
    updatePurchaseOrderComment: params => post(C.UPDATE_MODIFYCOMMENT, params),
    /** 查看采购订单详情 **/
    //[v1.0.2.1]获取采购订单审批记录
    queryPurchaseApproveLog: params => post(C.QUERY_PURCHASE_APPROVE_lOG, params),
    //查看采购订单详情
    queryPurchaseDetails: params => post(C.QUERY_PURCHASE_DETAILS, params),
    //获取采购订单操作日志列表
    queryPurchaseLog: params => post(C.QUERY_PURCHASE_LOG, params),
    //根据采购操作日志id获取修改
    queryPurchaseIdModify: params => post(C.QUERY_PURCHASE_ID_MODIFY, params),
    //根据采购操作日志id获取修改2
    queryPurchaseIdModifyTwo: params => post(C.QUERY_PURCHASE_ID_MODIFY_TWO, params),
    //根据采购操作日志id获取修改3
    queryPurchaseIdModifyThree: params => post(C.QUERY_PURCHASE_ID_MODIFY_THREE, params),
    //根据关联单号查询单次入库列
    querySinglePutstorage: params => post(C.QUERY_SINGLE_PUTSTORAGE, params),
    //新增或修改采购订单
    savePurchaseOrder: params => post(C.SAVE_PURCHASE_ORDERS, params),
    //提交采购订单审批
    approvePurchaseOrder: params => post(C.APPROVE_PURCHASE_ORDER, params),
    //修改采购订单
    editPurchaseOrder: params => post(C.SAVE_PURCHASE_ORDER, params),

    // 采购通用接口-通过实体查询供应商列表
    purchaseVendorLIstByUserGroup: params => post(C.PURCHASE_VENDOR_LISTBYUSERGROUP, params),

    /* ********************采购--合同管理重写***start************** */
    //合同-所有-新
    // purchaseContractQueryAll: params => post(C.PURCHASE_CONTRACT_QUERYALL, params),
    /* ********************采购--合同管理重写***end************** */

    /** 采购--供应链 start **/
    // 供应商注册
    purchaseVendorregisterRegister: params => post(C.PURCHASE_VENDORREGISTER_REGISTER, params),
    // 供应商审批
    // 查询列表（分页）
    purchaseVendorregisterQuerylistpage: params => post(C.PURCHASE_VENDORREGISTER_QUERYLISTPAGE, params),
    // 删除
    purchaseVendorregisterDelete: params => post(C.PURCHASE_VENDORREGISTER_DELETE, params),
    // 修改审批状态
    purchaseVendorregisterChangeapprovestatus: params => post(C.PURCHASE_VENDORREGISTER_CHANGEAPPROVESTATUS, params),
    // 修改引进状态
    purchaseVendorregisterChangeimportstatus: params => post(C.PURCHASE_VENDORREGISTER_CHANGEIMPORTSTATUS, params),
    // 查询详情
    purchaseVendorregisterQuery: params => post(C.PURCHASE_VENDORREGISTER_QUERY, params),
    // 供应商引进
    purchaseVendorImport: params => post(C.PURCHASE_VENDOR_IMPORT, params),
    // 供应商管理
    // 查询列表（分页）
    purchaseVendorQuerylistpage: params => post(C.PURCHASE_VENDOR_QUERYLISTPAGE, params),
    // 编辑供应商
    purchaseVendorEdit: params => post(C.PURCHASE_VENDOR_EDIT, params),
    // 修改合作状态
    purchaseVendorChangestatus: params => post(C.PURCHASE_VENDOR_CHANGESTATUS, params),
    // 查看供应商
    purchaseVendorQuery: params => post(C.PURCHASE_VENDOR_QUERY, params),
    // 供应商新品引进，推荐
    // 新增供应商新品推荐
    purchaseVendorspuAdd: params => post(C.PURCHASE_VENDORSPU_ADD, params),
    // 查看供应商新品推荐
    purchaseVendorspuQuery: params => post(C.PURCHASE_VENDORSPU_QUERY, params),
    // 分页查询供应商新品推荐
    purchaseVendorspuQuerypagelist: params => post(C.PURCHASE_VENDORSPU_QUERYPAGELIST, params),
    // 删除供应商新品推荐
    purchaseVendorspuDelete: params => post(C.PURCHASE_VENDORSPU_DELETE, params),
    // 审批供应商新品推荐
    purchaseVendorspuChangeapprovestatus: params => post(C.PURCHASE_VENDORSPU_CHANGEAPPROVESTATUS, params),
    // 引进供应商新品推荐
    purchaseVendorspuImport: params => post(C.PURCHASE_VENDORSPU_IMPORT, params),
    // 上传图片
    purchaseVendorspuPictureupload: params => post(C.PURCHASE_VENDORSPU_PICTUREUPLOAD, params),

    // 实体供应商
    // 分页查询列表
    purchaseUsergroupvendorQuerylistpage: params => post(C.PURCHASE_USERGROUPVENDOR_QUERYLISTPAGE, params),
    // 查询未绑定用户实体供应商列表
    purchaseUsergroupvendorQuerynotbindlist: params => post(C.PURCHASE_USERGROUPVENDOR_QUERYNOTBINDLIST, params),
    // 添加实体供应商
    purchaseUsergroupvendorAdd: params => post(C.PURCHASE_USERGROUPVENDOR_ADD, params),
    // 删除实体供应商
    purchaseUsergroupvendorDelete: params => post(C.PURCHASE_USERGROUPVENDOR_DELETE, params),

    /** 采购--供应链 end **/


    /* ********************采购--采购订单重写***start************** */
    //采购订单-分页-新
    purchaseOrderList: params => post(C.PURCHASE_ORDER_LIST, params),
    //采购订单新增-新
    purchaseOrderAdd: params => post(C.PURCHASE_ORDER_ADD, params),
    //采购订单编辑-新
    purchaseOrderEdit: params => post(C.PURCHASE_ORDER_EDIT, params),
    //采购订单审批-新
    purchaseOrderChangeStatus: params => post(C.PURCHASE_ORDER_CHANGESTATUS, params),
    //删除采购订单-新
    purchaseOrderDelete: params => post(C.PURCHASE_ORDER_DELETE, params),
    //查看采购订单信息-新
    purchaseOrderQuery: params => post(C.PURCHASE_ORDER_QUERY, params),
    //采购订单入库-新
    purchaseOrderInStock: params => post(C.PURCHASE_ORDER_INSTOCK, params),
    /* ********************采购--采购订单重写***end************** */

    /* ********************采购--退货单重写***start************** */
    //退货单-分页-新
    purchaseReturnBillList: params => post(C.PURCHASE_RETURNBILL_LIST, params),
    //退货单新增-新
    purchaseReturnBillAdd: params => post(C.PURCHASE_RETURNBILL_ADD, params),
    //退货单编辑-新
    purchaseReturnBillEdit: params => post(C.PURCHASE_RETURNBILL_EDIT, params),
    //退货单修改状态-新
    purchaseReturnBillChangeStatus: params => post(C.PURCHASE_RETURNBILL_CHANGESTATUS, params),
    //退货单审批-新
    purchaseReturnBillChangeApproveStatus: params => post(C.PURCHASE_RETURNBILL_CHANGEAPPROVESTATUS, params),
    //删除退货单-新
    purchaseReturnBillDelete: params => post(C.PURCHASE_RETURNBILL_DELETE, params),
    //查看退货单信息-新
    purchaseReturnBillQuery: params => post(C.PURCHASE_RETURNBILL_QUERY, params),
    //退货单出库-新
    purchaseReturnBillOutStock: params => post(C.PURCHASE_RETURNBILL_OUTSTOCK, params),
    /* ********************采购--退货单重写***end************** */


    /** 合同管理 */

    /** 合同管理 */
    //[v1.0.2]搜索业务实体的所有采购合同列表
    queryEntityContractList: params => post(C.QUERY_ENTITY_CONTRACT_LIST, params),
    //查询采购合同列表
    queryContractList: params => post(C.QUERY_CONTRACT_LIST, params),
    //启用合同
    EnableEffectiveContract: params => post(C.ENABLE_EFFECTIVE_CONTRACT, params),
    //查询采购合同详情
    QueryPurchaseOrderDetailList: params => post(C.QUERY_PURCHASE_ORDER_DETAILS_LIST, params),
    //保存采购合同
    SavePurchseContract: params => post(C.SAVE_PURCHASE_CONTRACT, params),
    //搜索业务实体下的商品列表
    SearchGoodsList: params => post(C.SEARCH_GOODS_LIST, params),
    //搜索采购合同
    SearchPurchaseContract: params => post(C.SEARCH_PURCHASE_CONTRACT, params),
    //新增业务实体的采购合同
    AddPurchaseContract: params => post(C.ADD_PURCHASE_CONTRACT, params),
    //获取业务实体的供应商列表
    QueryVendorList: params => post(C.QUERY_VENDOR_LIST, params),
    //修改业务实体的采购合同
    ModifyPurchaseContract: params => post(C.MODIFY_PURCHASE_CONTRACT, params),
    //[v1.0.2]根据条件查询合同的商品列表
    QueryContractProductList: params => post(C.QUERY_CONTRACT_PRODUCT_LIST, params),
    //[v1.0.2]根据合同序号获取采购订单列表
    ContractSeqPurchaseList: params => post(C.CONTRACT_SEQ_PURCHASE_LIST, params),
    //根据合同序号查询采购商品列表
    ContractPurchaseSkuList: params => post(C.CONTRACT_PURCHASE_SKU_LIST, params),

    //查询列表（分页）
    purchaseContractQuerypagelist: params => post(C.PURCHASE_CONTRACT_QUERYPAGELIST, params),
    //查询列表（所有）
    purchaseContractQueryall: params => post(C.PURCHASE_CONTRACT_QUERYALL, params),
    //新增合同
    purchaseContractAdd: params => post(C.PURCHASE_CONTRACT_ADD, params),
    //编辑合同
    purchaseContractEdit: params => post(C.PURCHASE_CONTRACT_EDIT, params),
    //修改合同状态(启用、作废)
    purchaseContractChangecontractstatus: params => post(C.PURCHASE_CONTRACT_CHANGECONTRACTSTATUS, params),
    //删除合同
    purchaseContractDelete: params => post(C.PURCHASE_CONTRACT_DELETE, params),
    //合同管理查看
    purchaseContractQuery: params => post(C.PURCHASE_CONTRACT_QUERY, params),

    /**  地区接口 */
    //获取省列表
    queryProvinceList: params => post(C.QUERY_PROVINCE_LIST, params),
    //获取市列表
    queryCityList: params => post(C.QUERY_CITY_LIST, params),
    //获取地区列表
    queryAreaList: params => post(C.QUERY_AREA_LIST, params),




    /**-----------销售业务 分割线-----------------**/
    /*   销售模块   */
    //查询菜单订单数量
    querySalesMenuOrderNum: params => post(C.QUERY_SALE_MENUORDERNUM, params),
    //修改订单收货地址
    updateOrderAddress: params => post(C.UPDATE_ORDER_ADDRESS, params),
    //下载导入数据解析结果
    resultDownload: params => post(C.GET_RESULT_DOWNLOAD, params),
    // 根据上级行政区获取下级行政区列表
    queryProvinceCityArea: params => post(C.QUERY_PROVINCECITYAREA, params),

    /* 销售订单 */
    //分页获取销售订单列表
    querySalesOrderList: params => post(C.QUERY_SALES_ORDER_LIST, params),
    //新增销售订单
    createOrderAdd: params => post(C.CREATE_SALES_ORDER_ORDERADD, params),
    // 编辑销售订单
    updataOrder: params => post(C.UPDATE_SALES_ORDER, params),
    // 销售订单根据订单ID获取订单信息
    queryOrderMsg: params => post(C.QUERY_SALES_ORDER, params),
    //销售订单-根据订单ID编辑备注
    updateOrderMemark: params => post(C.UPDATE_SALES_ORDER_REMARK, params),
    //销售订单-模糊查询商品列表
    querySalesGoodslist: params => post(C.QUERY_SALES_GOODSLIST, params),
    // 导出订单列表
    exportSalesOrder: params => post(C.EXPORT_SALES_ORDER, params),
    // 查看查看销售订单-商品清单
    querySalesOrder: params => post(C.QUERY_SALE_ORDER, params),
    // 导入订单
    importSalesOrders: params => post(C.IMPORT_SALES_ORDERS, params),
    // 查询销售订单属性
    queryOrderAttr: params => post(C.QUERY_ORDER_ATTR, params),
    //导入数据查询
    importOrdersDataQuery: params => post(C.IMPORT_ORDERS_DATA_QUERY, params),
    //导入数据生成销售订单
    dataConfirmImport: params => post(C.GET_DATA_CONFIRM_IMPORT, params),
    // 批量编辑订单状态
    editBatchOrderStatus: params => post(C.EDIT_ORDER_BATCH_UPDATESTATUS, params),
    // 获取物流单记录
    getOutboundRouterList: params => post(C.QUERTY_OUTBOUND_ROUTER_LIST, params),
    // 只显示渠道设置中选择了导入模板的渠道
    channelQueryWithTemplate: params => post(C.QUERTY_CHANNEL_TEMPLATE, params),
    // 获取销售单的物流单记录
    getRouterList: params => post(C.QUERTY_ROUTER_LIST, params),
    //  异常订单已拒收确认拒收
    updataSalesErrorefuse: params => post(C.UPDATA_SALES_ERROEREFUSE, params),

    /* 退货订单 */
    //新增退货订单
    addNewRefuseOrder: params => post(C.POST_NEW_REFUSE_ORDER, params),
    //退货列表
    returnList: params => post(C.RETURN_LIST, params),
    // 通过退货订单ID查询退货商品清
    queryRefundGoods: params => post(C.QUERY_FEFUND_GOODS, params),
    // 退货订单不同状态的数量
    queryReturnOrderCount: params => post(C.QUERY_RETURN_ORDER_COUNT, params),
    // 根据退货订单ID编辑备注信息
    editRefundRemark: params => post(C.EDIT_REFUND, params),
    // 根据退货订单ID编辑状态
    editRefundStatus: params => post(C.CHANGE_REFUND_STATUS, params),
    // 查询销售订单的退货列表
    getRefund: params => post(C.GET_ORDER_RETURN, params),
    // 编辑订单状态
    editOrderStatus: params => post(C.EDIT_ORDER_STATUS, params),
    // 根据主键ID查询退货单详细信息
    queryRefundInfo: params => post(C.QUERY_REFUND_DETAIL, params),
    // 编辑退货订单
    returnOrderUpdate: params => post(C.UPADTE_RETURN_ORDER, params),
    //根据销售订单id获取退货商品
    queryReturnProListByOrderId: params => post(C.QUERY_RETURN_PROLIST_ORDER_ID, params),
    //根据退货订单ID编辑状态
    returnStatusUpdate: params => post(C.POST_RETURN_STATUS_UPDATE, params),

    /* 换货订单 */
    // 换货各状态订单数量
    getChangeStatusCount: params => post(C.QUERY_CHANGE_ORDER_COUNT, params),
    // 分页获取换货订单列表
    queryChangeOrderList: params => post(C.QEURY_CHANGE_LIST, params),
    // 根据主键ID查询换货订单详情
    queryChangeInfo: params => post(C.QUERY_CHANGE_DETAIL, params),
    // 根据换货订单ID查询换货商品清单列表
    queryChangeList: params => post(C.QUERY_CHANGE_LIST, params),
    // 根据换货订单ID编辑状态
    editChangeStatus: params => post(C.EDIT_CHANGE_STATUS, params),
    // 根据销售订单id查询换货列表
    querySalesChangeList: params => post(C.QUERY_SALES_CHANGE_LIST, params),
    // 新增换货订单
    createChangeOrder: params => post(C.CREATE_CHANGE_ORDER, params),
    // 更改换货单
    editChangeOrder: params => post(C.EDIT_CHANGE_ORDER, params),
    // 更改收货地址
    editChangeAddress: params => post(C.EDIT_CHANGE_ADDRESS, params),
    // 入库单保存
    storeInSave: params => post(C.POST_STORE_IN_SAVE, params),
    // 换货出库
    outStoreChangeOrder: params => post(C.CHANGE_OUT_STORE, params),
    // 更改换货的备注信息
    updateChangeRemark: params => post(C.UPDATE_CHANGE_REMARK, params),
    // 获取销售订单，有可换货数量
    querySaleOrderWithCount: params => post(C.QUERY_SALE_ORDER_WITH_COUNT, params),
    // 获取换货订单详情，有可换货数量
    queryChangeOrderWithCount: params => post(C.QUERY_CHANGE_ORDER_WITH_COUNT, params),
    // 查询换货订单入库记录
    queryChangeOrderInStore: params => post(C.QUERY_CHANGE_ORDER_IN_STORE, params),
    // 据订单id模糊查询订单列表（dev）
    getSalesListBlurry: params => post(C.QUERY_ORDER_BLURRY, params),

    /* 出库 */
    // 出库保存
    saveSalesStoreout: params => post(C.SAVE_SALES_STOREOUT, params),
    // 查询仓库列表
    queryStoreList: params => post(C.QUERY_STORE_STORELIST, params),
    //按条件查询渠道
    queryAddressByChannelId: params => post(C.QUERY_CHANNEL_ADDRESSBYID, params),
    // 批量出库保存
    saveSalesStoreOutBatch: params => post(C.SAVE_SALES_STOREOUTBATCH, params),
    //根据销售订单商品生成出货单信息
    querySalesOutStoreList: params => post(C.QUERY_SALES_OUTSTORELIST, params),
    // 根据仓库id获取仓库信息详情
    queryStoreById: params => post(C.QUERY_STOREHOUSE_BY_ID, params),
    // 获取订单详情出库记录
    getOutStoreList: params => post(C.GET_OUT_STORE_RECORD, params),

    /*  渠道  */
    //查詢所有渠道
    queryChannelAll: params => post(C.QUERY_CHANNEL_ALLCHANNEL, params),
    //根据搜索获取渠道
    queryChannelBySearch: params => post(C.QUERY_CHANNEL_BYSEARCH, params),
    //根据channelId查询channel信息
    queryChannelById: params => post(C.QUERY_CHANNEL_BYID, params),
    // 获取分类渠道数据
    getstatusChannel: params => post(C.GETSTATUSCHANNEL, params),
    // 修改渠道的状态
    updataStatus: params => post(C.UPDATACHANNE_STATUS, params),

    /*  渠道地址  */
    //新增渠道收貨地址
    createChannelAddress: params => post(C.CREATE_CHANNEL_ADDRESS, params),
    //设置渠道默认地址
    updateChannelDefalutAddress: params => post(C.UPDATE_CHANNEL_DEFALUTADDRESS, params),
    //编辑渠道地址
    updateChannelAddress: params => post(C.UPDATE_CHANNEL_ADDRESS, params),
    //更改渠道收货地址状态
    updateChannelAddressStatus: params => post(C.UPDATE_CHANNEL_ADDRESSSTATUS, params),
    //查询渠道收货地址
    queryReceivingAddress: params => post(C.QUERY_SALES_RECEIVING_ADDRESS, params),
    //编辑渠道
    updateChannel: params => post(C.UPDATE_CHANNEL, params),
    // 新增渠道
    addStatus: params => post(C.ADDCHANNE, params),

    /* 渠道商品 */
    //导入渠道商品
    postImportChannelGoods: params => post(C.POST_IMPORT_CHANNEL_GOODS, params),
    //导入数据生成渠道商品
    postDataConfirmImport: params => post(C.POST_DATA_CONFIRM_IMPORT, params),
    /** 根据id查询商品信息 **/
    querySalesOrderId: params => post(C.QUERY_SALE_ORDER_WITHID, params),
    // 通过渠道ID查商品
    searchmer: params => post(C.SEARCHMERCHANDISE, params),
    // 新增渠道商品
    createChannelGood: params => post(C.CREATE_CHANNEL_GOOD, params),
    // 编辑渠道商品
    updateChannelGood: params => post(C.UPDATE_CHANNEL_GOOD, params),
    // 新增渠道商品
    queryUserGroupAll: params => post(C.QUERY_USERGROUP_ALL, params),
    // 通过渠道商品ID查询商品信息
    queryGoodsByChannelSkuId: params => post(C.QUERY_GOODMSG_BYCHANNELSKUID, params),
    // 售卖/停售商品
    startOrStopChannelGoods: params => post(C.START_OR_STOP_CHANNEL_GOODS, params),
    //查询所有发货方
    queryAllVendor: params => post(C.QUERY_SALE_ALLVENDOR, params),
    //导入渠道商品-下载模板
    queryImportChannelGoodsTemplate: params => post(C.QUERY_IMPORT_CHANNEL_GOODS_TEMPLATE, params),
     // 根据渠道id查询渠道下商品
     queryChannelGoodByChannelId: params => post(C.QUERY_CHANNELGOOD_BYCHANNELID, params),
     // 删除渠道商品
     deleteChannelGood: params => post(C.DELETE_CHANNELSKU, params),

    /*  日志  */
    // 查询操作日志
    queryOrderLog: params => post(C.QUERY_ORDER_LOG, params),
    // 查看销售订单，日志详情
    queryOrderLogDetail: params => post(C.QUERY_ORDER_LOG_DETAIL, params),
    // 消息操作人
    queryOperators: params => post(C.QUERY_OPERATORS, params),

    /*  首页  */
    //首页--统计滞留订单
    queryRetentionOrderCount: params => post(C.QUERY_RETENTIONORDERCOUNT, params),
    //渠道订单量分布
    querySaleOrderEcharts: params => post(C.QUERY_SALES_ORDER_ECHARTS, params),
    //异常订单
    queryOrderAndErrorCount: params => post(C.QUERY_ORDER_AND_ERROR_COUNT, params),

    /* 消息中心  */
    // 消息列表
    queryMessageList: params => post(C.QUERY_MESSAGE_LIST, params),
    // 获取消息操作类型
    queryMessageOperateType: params => post(C.QUERY_MESSAGE_OPERATE_TYPE, params),
    // 消息中心，获取未读数量
    queryMessageNotRead: params => post(C.QUERY_MESSAGE_NOT_READ, params),
    // 消息中心，设置已读
    setMessageReaded: params => post(C.SET_MESSAGE_READED, params),
    // 获取下载文件流
    getDownloadFile: params => post(C.GET_DOENLOAD_FILE, params),

    /*----------- 商品管理 ---------*/
    // 通用接口——用户实体下商品列表
    querySkuListByUserGroup: params => post(C.QUERY_SKULIST_BYUSERGROUP, params),
    // 通用接口——商品名称搜索_sku
    querySkuByProductName: params => post(C.QUERY_SKUCODE_BYPRODUCTNAME, params),
    // 通用接口——商品名称搜索_spu
    querySpuByProductName: params => post(C.QUERY_SPUCODE_BYPRODUCTNAME, params),

    // 多条码管理_新增
    multiBarAdd: params => post(C.MULTIBAR_ADD, params),
    // 多条码管理_删除
    multiBarDelete: params => post(C.MULTIBAR_DELETE, params),
    // 多条码管理_分页list
    queryMultiBarList: params => post(C.QUERY_MULTIBAR_LIST, params),

    // 商品属性管理_新增
    digitalAttrAdd: params => post(C.DIGITALATTR_ADD, params),
    // 商品属性管理_编辑
    digitalAttrEdit: params => post(C.DIGITALATTR_EDIT, params),
    // 商品属性管理_分页list
    queryDigitalAttrList: params => post(C.QUERY_DIGITALATTR_LIST, params),
    // 判断商品数字属性_产品是否存在
    digitalAttrEditSpuIfExist: params => post(C.DIGITALATTR_SPU_IFEXIST, params),
    

    //实体可用商品管理_查询列表（分页）
    userGroupQueryList: params => post(C.USERGROUPSKU_QUERYLIST, params),
    //实体可用商品管理_批量修改状态
    userGroupChangeStatus: params => post(C.USERGROUPSKU_CHANGESTATUS, params),
    //实体可用商品管理_实体可用商品管理_批量删除
    userGroupDelete: params => post(C.USERGROUPSKU_DELETE, params),
    //实体可用商品管理_批量添加
    userGroupAdd: params => post(C.USERGROUPSKU_ADD, params),
    //实体可用商品管理_查询可添加的SKU列表（分页）
    userGroupUnRelationProduct: params => post(C.USERGROUPSKU_QUERYSKULIST, params),

    //普通商品价格管理_新增
    goodsPriceNormalAdd: params => post(C.NORMAL_PRICE_GOODS_ADD, params),
    //普通商品价格管理_编辑
    goodsPriceNormalEdit: params => post(C.NORMAL_PRICE_GOODS_EDIT, params),
    //普通商品价格管理_修改状态
    goodsPriceNormalEditType: params => post(C.NORMAL_PRICE_GOODS_EDIT_TYPE, params),
    //普通商品价格管理_修改审批状态
    goodsPriceNormalEditApproveType: params => post(C.NORMAL_PRICE_GOODS_EDIT_APPROVE, params),
    //普通商品价格管理_删除
    goodsPriceNormalDelete: params => post(C.NORMAL_PRICE_GOODS_DELETE, params),
    //普通商品价格管理_查询
    goodsPriceNormalCheck: params => post(C.NORMAL_PRICE_GOODS_CHECK, params),
    //普通商品价格管理_查询列表(分页)
    goodsPriceNormalQuery: params => post(C.NORMAL_PRICE_GOODS_QUERY, params),

    //特殊商品价格管理_新增
    goodsPriceSpecialAdd: params => post(C.SPECIAL_PRICE_GOODS_ADD, params),
    //特殊商品价格管理_编辑
    goodsPriceSpecialEdit: params => post(C.SPECIAL_PRICE_GOODS_EDIT, params),
    //特殊商品价格管理_修改状态
    goodsPriceSpecialEditType: params => post(C.SPECIAL_PRICE_GOODS_EDIT_TYPE, params),
    //特殊商品价格管理_修改审批状态
    priceSpecialGoodsEditApproveType: params => post(C.SPECIAL_PRICE_GOODS_EDIT_APPROVE, params),
    //特殊商品价格管理_删除
    goodsPriceSpecialDelete: params => post(C.SPECIAL_PRICE_GOODS_DELETE, params),
    //特殊商品价格管理_查询
    goodsPriceSpecialCheck: params => post(C.SPECIAL_PRICE_GOODS_CHECK, params),
    //特殊商品价格管理_查询列表(分页)
    goodsPriceSpecialQuery: params => post(C.SPECIAL_PRICE_GOODS_QUERY, params),

    //SKU商品_新增
    skuCommodityManagementAdd: params => post(C.SKU_COMMODITY_MANAGEMENT_ADD, params),
    //SKU商品_编辑
    skuCommodityManagementEdit: params => post(C.SKU_COMMODITY_MANAGEMENT_EDIT, params),
    //SKU商品_删除
    skuCommodityManagementDelete: params => post(C.SKU_COMMODITY_MANAGEMENT_DELETE, params),
    //SKU商品_查询列表（分页）
    skuCommodityManagementQuerylistpage: params => post(C.SKU_COMMODITY_MANAGEMENT_QUERYLISTPAGE, params),
    //SKU商品_查询详情
    skuCommodityManagementQuery: params => post(C.SKU_COMMODITY_MANAGEMENT_QUERY, params),
    //SKU商品_添加标签
    skuCommodityManagementAddtag: params => post(C.SKU_COMMODITY_MANAGEMENT_ADDTAG, params),
    //SKU商品_删除标签
    skuCommodityManagementDeletetag: params => post(C.SKU_COMMODITY_MANAGEMENT_DELETETAG, params),
    //SKU商品_查询列表（分页）标签
    skuCommodityManagementDeletetagbatch: params => post(C.SKU_COMMODITY_MANAGEMENT_DELETETAGBATCH, params),
    //SKU商品_标签设置管理_查询列表（所有）
    skuCommoditySkutagQueryall: params => post(C.SKU_COMMODITY_SKUTAG_QUERYALL, params),

    //---卡券信息管理
    //导入卡券信息
    importCardInfor: params => post(C.IMPORT_CARD_INFOR, params),
    //下载模板
    downLoadTemp: params => post(C.DOWN_LOAD_TEMP, params),
    //删除卡券信息
    deleteCardInfor: params => post(C.DELETE_CARD_INFOR, params),
    //查询列表（分页）
    checkCardInfor: params => post(C.CHECK_CARDINFOR, params),

    /** 卡券类别管理模块 **/
    //查询全部卡券类别
    queryCardType: params => post(C.LOOKUO_CARDTYPE_ALL, params),
    //新增卡券类别
    addCardType: params => post(C.ADD_CARDTYPE, params),
    //卡券类别编辑
    editCardType: params => post(C.EDIT_CARDTYPE, params),
    //卡券类别删除
    deleteCardType: params => post(C.DELETE_CARDTYPE, params),
    //卡券状态修改
    changeCardType: params => post(C.CHANGE_CARDTYPE_STATUS, params),

    //---SPU产品管理
    //新增产品
    addSpu: params => post(C.ADD_SPU, params),
    //删除商品
    deleteSpu: params => post(C.DELETE_SPU, params),
    //修改产品
    editSpu: params => post(C.EDIT_SPU, params),
    //产品分页查询
    spuListPage: params => post(C.SPU_LIST_PAGE, params),
    //产品详情查询
    querySpu: params => post(C.QUERY_SPU,params),

    // 商品管理
    // 品牌管理_新增
    manageBrandAdd: params => post(C.MANAGE_BRAND_ADD, params),
    // 品牌管理_编辑
    manageBrandEdit: params => post(C.MANAGE_BRAND_EDIT, params),
    // 品牌管理_删除
    manageBrandDelete: params => post(C.MANAGE_BRAND_DELETE, params),
    // 品牌管理_分页list
    manageBrandList: params => post(C.MANAGE_BRAND_LIST, params),
    // 品牌管理_所有list
    manageBrandAll: params => post(C.MANAGE_BRAND_ALL, params),

    // 类目管理_新增
    manageCategoryAdd: params => post(C.MANAGE_CATEGORY_ADD, params),
    // 类目管理_编辑
    manageCategoryEdit: params => post(C.MANAGE_CATEGORY_EDIT, params),
    // 类目管理_删除
    manageCategoryDelete: params => post(C.MANAGE_CATEGORY_DELETE, params),
    // 类目管理_分页list
    manageCategoryList: params => post(C.MANAGE_CATEGORY_LIST, params),
    // 类目管理_所有list
    manageCategoryAll: params => post(C.MANAGE_CATEGORY_ALL, params),

    // 计量管理_新增
    manageUnitAdd: params => post(C.MANAGE_UNIT_ADD, params),
    // 计量管理_修改状态
    manageUnitChangeStatus: params => post(C.MANAGE_UNIT_CHANGESTATUS, params),
    // 计量管理_分页list
    manageUnitList: params => post(C.MANAGE_UNIT_LIST, params),
    // 计量管理_所有list
    manageUnitAll: params => post(C.MANAGE_UNIT_ALL, params),

    // 标签管理_新增
    manageTagAdd: params => post(C.MANAGE_TAG_ADD, params),
    // 标签管理_删除
    manageTagDelete: params => post(C.MANAGE_TAG_DELETE, params),
    // 标签管理_分页list
    manageTagList: params => post(C.MANAGE_TAG_LIST, params),
    // 标签管理_所有
    manageTagAll: params => post(C.MANAGE_TAG_ALL, params),

    // 可组合商品发布_分页list
    groupSkuList: params => post(C.GROUPSKU_LIST, params),
    // 可组合商品发布_新增
    groupSkuAdd: params => post(C.GROUPSKU_ADD, params),
    // 可组合商品发布_编辑
    groupSkuEdit: params => post(C.GROUPSKU_EDIT, params),
    // 可组合商品发布_删除
    groupSkuDelete: params => post(C.GROUPSKU_DELETE, params),
    // 可组合商品发布_查看
    groupSkuQuery: params => post(C.GROUPSKU_QUERY, params),

    // 可组合商品打包_分页list
    skuPackageList: params => post(C.SKUPACKAGE_LIST, params),
    // 可组合商品打包_新增
    skuPackageAdd: params => post(C.SKUPACKAGE_ADD, params),
    // 可组合商品打包_编辑
    skuPackageEdit: params => post(C.SKUPACKAGE_EDIT, params),
    // 可组合商品打包_删除
    skuPackageDelete: params => post(C.SKUPACKAGE_DELETE, params),
    // 可组合商品打包_查看
    skuPackageQuery: params => post(C.SKUPACKAGE_QUERY, params),

    //销售-拆单规则设置
    // 拆单规则分页
    saleSplitRuleList: params => post(C.SALE_SPLITRULE_LIST, params),
    // 拆单规则新增
    saleSplitRuleAdd: params => post(C.SALE_SPLITRULE_ADD, params),
    // 拆单规则删除
    saleSplitRuleDelete: params => post(C.SALE_SPLITRULE_DELETE, params),

    // 普通促销分页
    normalPromotionList: params => post(C.NORMAL_PROMOTION_LIST, params),
    // 普通促销新增
    normalPromotionAdd: params => post(C.NORMAL_PROMOTION_ADD, params),
    // 普通促销编辑
    normalPromotionEdit: params => post(C.NORMAL_PROMOTION_EDIT, params),
    // 普通促销删除
    normalPromotionDelete: params => post(C.NORMAL_PROMOTION_DELETE, params),
    // 普通促销状态修改
    normalPromotionChange: params => post(C.NORMAL_PROMOTION_CHANGE_STATU, params),
    // 普通促销审批状态
    normalPromotionChangeApp: params => post(C.NORMAL_PROMOTION_CHANGE_APPROVE, params),
    // 普通促销查看
    normalPromotionInfo : params => post(C.NORMAL_PROMOTION_QUERY, params), 

    // 组合促销分页
    combPromotionList: params => post(C.COMB_PROMOTION_LIST, params),
    // 组合促销新增
    combPromotionAdd: params => post(C.COMB_PROMOTION_ADD, params),
    // 组合促销编辑
    combPromotionEdit: params => post(C.COMB_PROMOTION_EDIT, params),
    // 组合促销删除
    combPromotionDelete: params => post(C.COMB_PROMOTION_DELETE, params),
    // 组合促销状态修改
    combPromotionChange: params => post(C.COMB_PROMOTION_CHANGE_STATU, params),
    // 组合促销审批状态
    combPromotionChangeApp: params => post(C.COMB_PROMOTION_CHANGE_APPROVE, params),
    // 组合促销查看
    combPromotionInfo : params => post(C.COMB_PROMOTION_QUERY, params),

    // 赠券促销分页
    presentPromotionList: params => post(C.PRESENT_PROMOTION_LIST, params),
    // 赠券促销新增
    presentPromotionAdd: params => post(C.PRESENT_PROMOTION_ADD, params),
    // 赠券促销编辑
    presentPromotionEdit: params => post(C.PRESENT_PROMOTION_EDIT, params),
    // 赠券促销删除
    presentPromotionDelete: params => post(C.PRESENT_PROMOTION_DELETE, params),
    // 赠券促销状态修改
    presentPromotionChange: params => post(C.PRESENT_PROMOTION_CHANGE_STATU, params),
    // 赠券促销审批状态
    presentPromotionChangeApp: params => post(C.PRESENT_PROMOTION_CHANGE_APPROVE, params),
    // 赠券促销查看
    presentPromotionInfo : params => post(C.PRESENT_PROMOTION_QUERY, params),

    // 满减促销分页
    reducePromotionList: params => post(C.REDUCE_PROMOTION_LIST, params),
    // 满减促销新增
    reducePromotionAdd: params => post(C.REDUCE_PROMOTION_ADD, params),
    // 满减促销编辑
    reducePromotionEdit: params => post(C.REDUCE_PROMOTION_EDIT, params),
    // 满减促销删除
    reducePromotionDelete: params => post(C.REDUCE_PROMOTION_DELETE, params),
    // 满减促销状态修改
    reducePromotionChange: params => post(C.REDUCE_PROMOTION_CHANGE_STATU, params),
    // 满减促销审批状态
    reducePromotionChangeApp: params => post(C.REDUCE_PROMOTION_CHANGE_APPROVE, params),
    // 满减促销查看
    reducePromotionInfo : params => post(C.REDUCE_PROMOTION_QUERY, params),

    // 条件组合促销分页
    conGroupPromotionList: params => post(C.CONGROUP_PROMOTION_LIST, params),
    // 条件组合促销新增
    conGroupPromotionAdd: params => post(C.CONGROUP_PROMOTION_ADD, params),
    // 条件组合促销编辑
    conGroupPromotionEdit: params => post(C.CONGROUP_PROMOTION_EDIT, params),
    // 条件组合促销删除
    conGroupPromotionDelete: params => post(C.CONGROUP_PROMOTION_DELETE, params),
    // 条件组合促销状态修改
    conGroupPromotionChange: params => post(C.CONGROUP_PROMOTION_CHANGE_STATU, params),
    // 条件组合促销审批状态
    conGroupPromotionChangeApp: params => post(C.CONGROUP_PROMOTION_CHANGE_APPROVE, params),
    // 条件组合促销查看
    conGroupPromotionInfo : params => post(C.CONGROUP_PROMOTION_QUERY, params),
    //支付方式查询
    payTypeList : params => post(C.PAY_TYPE_LIST,params),

    //----渠道管理
    //--渠道通用查询
    //通过渠道名称查询所有渠道
    channelChannelquery : params => post(C.CHANNEL_CHANNELQUERY,params),
    //--渠道计划及考核
    //查询列表（分页）
    channelplanQuerylistpage : params => post(C.CHANNELPLAN_QUERYLISTPAGE,params),
    //新增渠道计划
    channelplanAdd : params => post(C.CHANNELPLAN_ADD,params),
    //编辑渠道计划
    channelplanEdit : params => post(C.CHANNELPLAN_EDIT,params),
    //删除渠道计划
    channelplanDelete : params => post(C.CHANNELPLAN_DELETE,params),
    //计算
    channelplanCompute : params => post(C.CHANNELPLAN_COMPUTE,params),
    //查询详情 
    channelplanQuery : params => post(C.CHANNELPLAN_QUERY,params),
    //--渠道价格和存量定义
    //通过渠道ID查询所有渠道商品
    channelQueryallbychannelid : params => post(C.CHANNEL_QUERYALLBYCHANNELID,params),
    //查询列表（分页）
    channelpriceQuerylistpage : params => post(C.CHANNELPRICE_QUERYLISTPAGE,params),
    //新增渠道计划
    channelpriceAdd : params => post(C.CHANNELPRICE_ADD,params),
    //编辑渠道计划
    channelpriceEdit : params => post(C.CHANNELPRICE_EDIT,params),
    //删除渠道计划
    channelpriceDelete : params => post(C.CHANNELPRICE_DELETE,params),
    //重置
    channelpriceReset : params => post(C.CHANNELPRICE_RESET,params),
    //查询详情 
    channelpriceQuery : params => post(C.CHANNELPRICE_QUERY,params),

    //销售流水list
    saleBillList : params => post(C.SALE_BILL_LIST, params),
    //销售流水详情
    saleBillDetails : params => post(C.SALE_BILL_DETAILS, params),

    /* 酬金 */
    // 酬金信息列表
    querySettlementList: params => post(C.QUERY_SETTLEMENT_LIST, params),
    // 导出酬金列表
    exportSettlementList: params => post(C.EXPORT_SETTLEMENT_LIST, params),
    // 推荐信息列表
    queryRecommendList: params => post(C.QUERY_RECOMMEND_LIST, params),
    // 地区下拉列表
    queryRegionList: params => post(C.QUERY_REGION_LIST, params),
    // 平台下拉列表
    queryPlatformList: params => post(C.QUERY_PLATFORM_LIST, params),

    /*库存*/
    // 查询商品库存单价
    queryStockSkuPrice: params => post(C.QUERY_STOCK_SKU_PRICE,params),
    // 查询用户实体下仓库信息
    queryUserGroupStoreHouse: params => post(C.QUERY_USER_GROUP_STORE_HOUSE,params),
    //盘点清单
    inventoryPageList: params => post(C.INVENTORY_LIST,params),
    //盘点新增
    inventoryAdd: params => post(C.INVENTORY_ADD,params),
    //盘点编辑
    inventoryEdit: params => post(C.INVENTORY_EDIT,params),
    //盘点删除
    inventoryDelete: params => post(C.INVENTORY_DELETE,params),
    //盘点详情
    inventoryInfo: params => post(C.INVENTORY_INFO,params),
    //盘点状态修改
    inventoryChangeStatus: params => post(C.INVENTORY_CHANGE_STATUS,params),
    //盘点审批状态修改
    inventoryChangeAppStatus: params => post(C.INVENTORY_CHANGE_APPSTATUS,params),

    /*****配送*****/
/**配送单**/
//配送单list
distributionOrderList: params => post(C.DISTRIBUTIONORDER_LIST,params),
//配送单新增
distributionOrderAdd: params => post(C.DISTRIBUTIONORDER_ADD,params),
//配送单编辑
distributionOrderEdit: params => post(C.DISTRIBUTIONORDER_EDIT,params),
//配送单删除
distributionOrderDelete: params => post(C.DISTRIBUTIONORDER_DELETE,params),
//配送单审批状态修改
distributionOrderChangeStatus: params => post(C.DISTRIBUTIONORDER_CHANGESTATUS,params),  
//配送单查看
distributionOrderInfo: params => post(C.DISTRIBUTIONORDER_INFO,params),
//配送出库
distributionOrderOutStock: params => post(C.DISTRIBUTIONORDER_OUTSTOCK,params),

/**要货单**/
//要货单list
requireOrderList: params => post(C.REQUIREORDER_LIST,params),
//要货单新增
requireOrderAdd: params => post(C.REQUIREORDER_ADD,params),
//要货单编辑
requireOrderEdit: params => post(C.REQUIREORDER_EDIT,params),
//要货单删除
requireOrderDelete: params => post(C.REQUIREORDER_DELETE,params),
//要货单审批状态修改
requireOrderChangeStatus: params => post(C.REQUIREORDER_CHANGESTATUS,params),    
//要货单查看
requireOrderInfo: params => post(C.REQUIREORDER_INFO,params),

/**配送退回单**/
//配送退回单list
returnOrderList: params => post(C.RETURNORDER_LIST,params),
//配送退回单新增
returnOrderAdd: params => post(C.RETURNORDER_ADD,params),
//配送退回单编辑
returnOrderEdit: params => post(C.RETURNORDER_EDIT,params),
//配送退回单删除
returnOrderDelete: params => post(C.RETURNORDER_DELETE,params),
//配送退回单审批状态修改
returnOrderChangeStatus: params => post(C.RETURNORDER_CHANGESTATUS,params),  
//配送退回单查看
returnOrderInfo: params => post(C.RETURNORDER_INFO,params),
//配送退回入库
returnOrderInStock: params => post(C.RETURNORDER_INSTOCK,params),

// 推荐信息接收及生成要货单-分页查询
recommendList: params => post(C.RETCOMMEND_LIST,params),
// 生成要货单
recommendOrderAdd: params => post(C.RETCOMMEND_ORDER_ADD,params),

/* 对账结算 */
//经销对账单-list
payCheckList: params => post(C.PAYCHECK_LIST,params),
//经销对账单-新增
payCheckAdd: params => post(C.PAYCHECK_ADD,params),
//经销对账单-编辑
payCheckEdit: params => post(C.PAYCHECK_EDIT,params),
//经销对账单-删除
payCheckDelete: params => post(C.PAYCHECK_DELETE,params),
//经销对账单-审批状态修改
payCheckChangeStatus: params => post(C.PAYCHECK_CHANGESTATUS,params),  
//经销对账单-查看
payCheckInfo: params => post(C.PAYCHECK_INFO,params),
//经销对账单-查询应付待结算单据列表
payCheckQueryOutSettle: params => post(C.PAYCHECK_QUERYOUTSETTLE,params),

//应收对账单-list
receiveCheckList: params => post(C.RECEIVECHECK_LIST,params),
//应收对账单-新增
receiveCheckAdd: params => post(C.RECEIVECHECK_ADD,params),
//应收对账单-编辑
receiveCheckEdit: params => post(C.RECEIVECHECK_EDIT,params),
//应收对账单-删除
receiveCheckDelete: params => post(C.RECEIVECHECK_DELETE,params),
//应收对账单-审批状态修改
receiveCheckChangeStatus: params => post(C.RECEIVECHECK_CHANGESTATUS,params),  
//应收对账单-查看
receiveCheckInfo: params => post(C.RECEIVECHECK_INFO,params),
//应收对账单-查询应付待结算单据列表
receiveCheckQueryInSettle: params => post(C.RECEIVECHECK_QUERYINSETTLE,params),

/** -------------服务模块-------------- **/
//售后服务查询跟踪-首页
afterSaleList: params => post(C.SERVICE_AFTERSALE_LIST,params),
//售后服务查询跟踪-查看
afterSaleInfo: params => post(C.SERVICE_AFTERSALE_INFO,params),

/** -------------统计模块-------------- **/
// 配送单统计数量
distributionCount: params => post(C.DISTRIBUTION_ORDER_COUNT, params),
// 要货单统计数量
requireCount: params => post(C.REQUIRE_ORDER_COUNT, params),
// 配送退回单统计数量
returnCount: params => post(C.RETURN_ORDER_COUNT, params),
// 推荐及生成要货单统计数量
recommendCount: params => post(C.RECOMMEND_ORDER_COUNT, params),
// 采购单统计数量
purchaseOrderCount: params => post(C.PURCHASE_ORDER_COUNT, params),
// 采购退货单统计数量
purchaseReturnBillCount: params => post(C.PURCHASE_RETURNBILL_COUNT, params),
// 经销对账单统计数量
accountPayCheckCount: params => post(C.ACCOUNT_PAYCHECK_COUNT, params),
// 应收对账单统计数量
accountReceiveCheckCount: params => post(C.ACCOUNT_RECEIVECHECK_COUNT, params),

};

