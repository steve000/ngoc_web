import * as C from "../constants/api";
import utils from '../utils/misc'

const state = {
    roles: {
        pageNo:1,
        pageSize: 10,
        total: 0,
        result: []
    },
     userList:{
         pageNo:1,
         pageSize: 10,
         total: 0,
         result: []
    },
     noUserList:{
         pageNo:1,
         pageSize: 10,
         total: 0,
         result: []
    },
};

const mutations = {

    [C.ROLES_LIST](state, { payload }) {
        const {pageNo, total,pageSize, result} = payload
        state.roles.pageNo = pageNo
        state.roles.pageSize = pageSize
        state.roles.total = total
        state.roles.result = result
        // state.roles.result = result.map(item => {
        //     if(item.roleId == 3000){
                
        //     }
        // })
    },

     [C.ROLES_IDENTIFY](state, { payload }) {
        const {pageNo, total,pageSize, result} = payload
        state.userList.pageNo = pageNo
        state.userList.pageSize = pageSize
        state.userList.total = total
        state.userList.result = result
        // state.roles.result = result.map(item => {
        //     if(item.roleId == 3000){
                
        //     }
        // })
    },


     [C.ROLES_GETNOUSERLIST](state, { payload }) {
        const {pageNo, total,pageSize, result} = payload
        state.noUserList.pageNo = pageNo
        state.noUserList.pageSize = pageSize
        state.noUserList.total = total
        state.noUserList.result = result
        // state.roles.result = result.map(item => {
        //     if(item.roleId == 3000){
                
        //     }
        // })
    }

};

export default {
    state,
    mutations
}
