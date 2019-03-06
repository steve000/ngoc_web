import * as C from "../../../constants/api";
import utils from '../../../utils/misc'

const state = {
    list: {
        totalCount: 0,
        result: []
    },
    all: [],
    isChangeUnitList: 0,

};
// 计量管理
const mutations = {
    // 新增
    [C.MANAGE_UNIT_ADD](state, { payload }) {
    },
    //修改状态
    [C.MANAGE_UNIT_CHANGESTATUS](state, { payload }) {
    },
    // 查询品牌列表
    [C.MANAGE_UNIT_LIST](state, { payload }) {
        state.list.totalCount = payload.totalCount;
        state.list.result = payload.result;
    },
    // 查询所有
    [C.MANAGE_UNIT_ALL](state, { payload }) {
        state.all = payload.result;
    },
    changeUnitlist(state, change) {
        state.isChangeUnitList = change;
    }
};

export default {
    state,
    mutations
}
