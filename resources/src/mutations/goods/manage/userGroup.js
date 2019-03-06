import * as C from "../../../constants/api";
import utils from '../../../utils/misc'

const state = {
    commodity: {
        commodityListRelation: {
            commodityList: [],
            totalCount: 0,
        },
        commodityListUnRelation: {
            commodityList: [],
            totalCount: 0,
        },
        add: {
            code: 0,
            msg: "",
            data: {}
        },

        delete: {
            code: 0,
            msg: "",
            data: {}
        },
    },
};
const mutations = {
    // 查询业务实体下的商品列表
    [C.USERGROUPSKU_QUERYLIST](state, { payload }) {
        state.commodity.commodityListRelation.commodityList = payload.result;
        state.commodity.commodityListRelation.totalCount = payload.totalCount;
    },
    //修改业务实体关联商品状态
    [C.USERGROUPSKU_CHANGESTATUS](state, { payload }) {
    },
    //查询未添加到业务实体的商品  (可添加的SKU列表)
    [C.USERGROUPSKU_QUERYSKULIST](state, { payload }) {
        state.commodity.commodityListUnRelation.commodityList = payload.result;
        state.commodity.commodityListUnRelation.totalCount = payload.totalCount;
    },
    //业务实体关联商品  即为添加商品到实体
    [C.USERGROUPSKU_ADD](state, { payload }) {
    },

    [C.USERGROUPSKU_DELETE](state, {payload}){
    },

};
export default {
    state,
    mutations
}
