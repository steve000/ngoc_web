import * as C from "../../../constants/api";
import utils from '../../../utils/misc'

const state = {
    list: {
        totalCount: 0,
        result: []
    },
    all: [],
    isChangeBrandList: 0,

};
// 品牌管理
const mutations = {
    // 新增
    [C.MANAGE_BRAND_ADD](state, { payload }) {
    },
    // 编辑
    [C.MANAGE_BRAND_EDIT](state, { payload }) {
    },
    // 删除
    [C.MANAGE_BRAND_DELETE](state, { payload }) {
    },
    // 查询品牌列表
    [C.MANAGE_BRAND_LIST](state, { payload }) {
        state.list.totalCount = payload.totalCount;
        state.list.result = payload.result;
    },
    // 查询所有
    [C.MANAGE_BRAND_ALL](state, { payload }) {
        state.all = payload.result;
    },

    changeBrandlist(state, change) {
        state.isChangeBrandList = change;
    }

};
export default {
    state,
    mutations,
}
