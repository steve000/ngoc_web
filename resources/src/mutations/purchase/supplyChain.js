import * as C from "../../constants/api";
import utils from '../../utils/misc'

const state = {
    /** 采购--供应链 **/
    // 供应商注册
    purchaseVendorregisterRegister: {},
    // 供应商审批
    // 查询列表（分页）
    purchaseVendorregisterQuerylistpage: {},
    // 删除
    purchaseVendorregisterDelete: {},
    // 修改审批状态
    purchaseVendorregisterChangeapprovestatus: {},
    // 修改引进状态
    purchaseVendorregisterChangeimportstatus: {},
    // 查询详情
    purchaseVendorregisterQuery: {},
    // 供应商引进
    purchaseVendorImport: {},
    // 供应商管理
    // 查询列表（分页）
    purchaseVendorQuerylistpage: {},
    // 编辑供应商
    purchaseVendorEdit: {},
    // 修改合作状态
    purchaseVendorChangestatus: {},
    // 查看供应商
    purchaseVendorQuery: {},
    // 供应商新品引进，推荐
    // 新增供应商新品推荐
    purchaseVendorspuAdd: {},
    // 查看供应商新品推荐
    purchaseVendorspuQuery: {},
    // 分页查询供应商新品推荐
    purchaseVendorspuQuerypagelist: {},
    // 删除供应商新品推荐
    purchaseVendorspuDelete: {},
    // 审批供应商新品推荐
    purchaseVendorspuChangeapprovestatus: {},
    // 引进供应商新品推荐
    purchaseVendorspuImport: {},
    // 上传图片
    purchaseVendorspuPictureupload: {},

    // 实体供应商
    // 分页查询列表
    purchaseUsergroupvendorQuerylistpage: {},
    // 查询未绑定用户实体供应商列表
    purchaseUsergroupvendorQuerynotbindlist: {},
    // 添加实体供应商
    purchaseUsergroupvendorAdd: {},
    // 删除实体供应商
    purchaseUsergroupvendorDelete: {},

    /** 采购--供应链 **/


};
const mutations = {
    /** 采购--供应链 **/
    // 供应商注册
    [C.PURCHASE_VENDORREGISTER_REGISTER](state, { payload }) {
      const {purchaseVendorregisterRegister} = payload
      state.purchaseVendorregisterRegister = payload
    },
    // 供应商审批
    // 查询列表（分页）
    [C.PURCHASE_VENDORREGISTER_QUERYLISTPAGE](state, { payload }) {
      const {purchaseVendorregisterQuerylistpage} = payload
      state.purchaseVendorregisterQuerylistpage = payload
    },
    // 删除
    [C.PURCHASE_VENDORREGISTER_DELETE](state, { payload }) {
      const {purchaseVendorregisterDelete} = payload
      state.purchaseVendorregisterDelete = payload
    },
    // 修改审批状态
    [C.PURCHASE_VENDORREGISTER_CHANGEAPPROVESTATUS](state, { payload }) {
      const {purchaseVendorregisterChangeapprovestatus} = payload
      state.purchaseVendorregisterChangeapprovestatus = payload
    },
    // 修改引进状态
    [C.PURCHASE_VENDORREGISTER_CHANGEIMPORTSTATUS](state, { payload }) {
      const {purchaseVendorregisterChangeimportstatus} = payload
      state.purchaseVendorregisterChangeimportstatus = payload
    },
    // 查询详情
    [C.PURCHASE_VENDORREGISTER_QUERY](state, { payload }) {
      const {purchaseVendorregisterQuery} = payload
      state.purchaseVendorregisterQuery = payload
    },
    // 供应商引进
    [C.PURCHASE_VENDOR_IMPORT](state, { payload }) {
      const {purchaseVendorImport} = payload
      state.purchaseVendorImport = payload
    },

    // 供应商管理
    // 查询列表（分页）
    [C.PURCHASE_VENDOR_QUERYLISTPAGE](state, { payload }) {
      const {purchaseVendorQuerylistpage} = payload
      state.purchaseVendorQuerylistpage = payload
    },
    // 编辑供应商
    [C.PURCHASE_VENDOR_EDIT](state, { payload }) {
      const {purchaseVendorEdit} = payload
      state.purchaseVendorEdit = payload
    },
    // 修改合作状态
    [C.PURCHASE_VENDOR_CHANGESTATUS](state, { payload }) {
      const {purchaseVendorChangestatus} = payload
      state.purchaseVendorChangestatus = payload
    },
    // 查看供应商
    [C.PURCHASE_VENDOR_QUERY](state, { payload }) {
      const {purchaseVendorQuery} = payload
      state.purchaseVendorQuery = payload
    },

    // 供应商新品引进，推荐
    // 新增供应商新品推荐
    [C.PURCHASE_VENDORSPU_ADD](state, { payload }) {
      const {purchaseVendorspuAdd} = payload
      state.purchaseVendorspuAdd = payload
    },
    // 查看供应商新品推荐
    [C.PURCHASE_VENDORSPU_QUERY](state, { payload }) {
      const {purchaseVendorspuQuery} = payload
      state.purchaseVendorspuQuery = payload
    },
    // 分页查询供应商新品推荐
    [C.PURCHASE_VENDORSPU_QUERYPAGELIST](state, { payload }) {
      const {purchaseVendorspuQuerypagelist} = payload
      state.purchaseVendorspuQuerypagelist = payload
    },
    // 删除供应商新品推荐
    [C.PURCHASE_VENDORSPU_DELETE](state, { payload }) {
      const {purchaseVendorspuDelete} = payload
      state.purchaseVendorspuDelete = payload
    },
    // 审批供应商新品推荐
    [C.PURCHASE_VENDORSPU_CHANGEAPPROVESTATUS](state, { payload }) {
      const {purchaseVendorspuChangeapprovestatus} = payload
      state.purchaseVendorspuChangeapprovestatus = payload
    },
    // 引进供应商新品推荐
    [C.PURCHASE_VENDORSPU_IMPORT](state, { payload }) {
      const {purchaseVendorspuImport} = payload
      state.purchaseVendorspuImport = payload
    },
    // 上传图片
    [C.PURCHASE_VENDORSPU_PICTUREUPLOAD](state, { payload }) {
      const {purchaseVendorspuPictureupload} = payload
      state.purchaseVendorspuPictureupload = payload
    },

    // 实体供应商
    // 分页查询列表
    [C.PURCHASE_USERGROUPVENDOR_QUERYLISTPAGE](state, { payload }) {
      const {purchaseUsergroupvendorQuerylistpage} = payload
      state.purchaseUsergroupvendorQuerylistpage = payload
    },
    // 查询未绑定用户实体供应商列表
    [C.PURCHASE_USERGROUPVENDOR_QUERYNOTBINDLIST](state, { payload }) {
      const {purchaseUsergroupvendorQuerynotbindlist} = payload
      state.purchaseUsergroupvendorQuerynotbindlist = payload
    },
    // 添加实体供应商
    [C.PURCHASE_USERGROUPVENDOR_ADD](state, { payload }) {
      const {purchaseUsergroupvendorAdd} = payload
      state.purchaseUsergroupvendorAdd = payload
    },
    // 删除实体供应商
    [C.PURCHASE_USERGROUPVENDOR_DELETE](state, { payload }) {
      const {purchaseUsergroupvendorDelete} = payload
      state.purchaseUsergroupvendorDelete = payload
    },


    /** 采购--供应链 **/



};

export default {
    state,
    mutations
}
