import * as C from "../constants/api";
import utils from '../utils/misc'

const state = {
    users: {
        pageNo:1,
        pageSize: 10,
        total: 0,
        result: []
    }
};

const mutations = {

    [C.QUERY_ENTITY_USER_LIST](state, { payload }) {
        const {pageNo,pageSize, total, result} = payload
        state.users.pageNo = pageNo
        state.users.pageSize = pageSize
        state.users.total = total
        state.users.result = result

        // state.users.result = result.map(item => {
        //     item.sex = item.sex ? '男': '女'
        //     return item
        // })
        state.users.result = result.map(item => {
            item.sex = item.sex ? '男': '女'
            return item
        })
    }
};

export default {
    state,
    mutations
}
