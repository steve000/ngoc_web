import * as C from "../../../constants/api";

const state = {
    addSpu: '',
    deleteSpu:'',
    editSpu:'',
    spuListPage: '',
    querySpu:''
};

const mutations = {
    //新增SPU
    [C.ADD_SPU](state, { payload }) {},
    //删除
    [C.DELETE_SPU](state, { payload }) {},
    //修改状态
    [C.EDIT_SPU](state, { payload }) {},
    //查询列表（分页）
    [C.SPU_LIST_PAGE](state, { payload }) {},
    //详情
    [C.QUERY_SPU](state, { payload }) {}
};
export default {
    state,
    mutations
}
