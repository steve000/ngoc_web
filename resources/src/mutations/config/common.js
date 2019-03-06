import * as C from "../../constants/api";

const state = {
    queryChannelAll: '',
    querySearchmerList:'',
    querySkuListByConditionSearchDetail:'',
};

const mutations = {
    //编辑渠道商品
    [C.UPDATE_CHANNEL_GOOD](state, { payload }) {

    },
    //通过渠道商品ID查询商品信息
    [C.QUERY_GOODMSG_BYCHANNELSKUID](state, { payload }) {

    },
    //导入数据生成渠道商品
    [C.POST_DATA_CONFIRM_IMPORT](state, { payload }) {

    },
    //根据搜索获取渠道
    [C.QUERY_CHANNEL_BYSEARCH](state, { payload }) {

    },
    //修改渠道的状态
    [C.UPDATACHANNE_STATUS](state, { payload }) {

    },
    //查询菜单订单数量
    [C.QUERY_SALE_MENUORDERNUM](state,{payload}){

    }
};
export default {
    state,
    mutations
}
