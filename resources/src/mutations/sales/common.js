/**
 * Created by issuser on 2018/4/4.
 */
import * as C from "../../constants/api";
const state = {
};
const mutations = {
    [C.POST_STORE_IN_SAVE](state, { payload }) {

    },
    [C.SAVE_SALES_STOREOUT](state, { payload }) {

    },
    [C.QUERY_ORDER_BLURRY](state, { payload }) {

    },

    [C.QUERY_STORE_STORELIST](state, { payload }) {

    },
    [C.QUERY_SALES_RECEIVING_ADDRESS](state, { payload }) {

    },
    [C.CREATE_CHANNEL_ADDRESS](state, { payload }) {

    },
    [C.UPDATE_CHANNEL_ADDRESS](state, { payload }) {

    },
    [C.UPDATE_CHANNEL_ADDRESSSTATUS](state, { payload }) {

    },
    [C.UPDATE_CHANNEL_DEFALUTADDRESS](state, { payload }) {

    },
    [C.QUERY_STOREHOUSE_BY_ID](state, { payload }) {

    },
    [C.GET_OUT_STORE_RECORD](state, { payload }) {

    },
    [C.QUERY_CHANGE_ORDER_IN_STORE](state, { payload }) {

    },
    //销售订单-模糊查询商品列表
    [C.QUERY_SALES_GOODSLIST](state, { payload }) {

    },
    //查询菜单订单数量
    [C.QUERY_SALE_MENUORDERNUM](state, { payload }) {

    },
    //批量编辑订单状态
    [C.EDIT_ORDER_BATCH_UPDATESTATUS](state, { payload }) {

    },
    // 批量出库
    [C.SAVE_SALES_STOREOUTBATCH](state, { payload }) {

    },
        // 修改备注
        [C.EDIT_REFUND](state, { payload }) {

        },
};
export default {
    state,
    mutations
}
