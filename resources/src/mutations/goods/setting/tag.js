import * as C from "../../../constants/api";
import utils from '../../../utils/misc'

const state = {
    list: {
        totalCount: 0,
        result: []
    }
};
// 标签管理
const mutations = {
    // 新增
    [C.MANAGE_TAG_ADD](state, { payload }) {
    },
    // 删除
    [C.MANAGE_TAG_DELETE](state, { payload }) {
    },
    // 查询标签列表
    [C.MANAGE_TAG_LIST](state, { payload }) {
        state.list.totalCount = payload.totalCount;
        state.list.result = payload.result;
    },
    // 所有
    [C.MANAGE_TAG_ALL](state, { payload }) {
        state.list.totalCount = payload.totalCount;
        state.list.result = payload.result;
    },

};

export default {
    state,
    mutations
}
