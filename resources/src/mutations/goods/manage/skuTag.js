import * as C from "../../../constants/api";
import utils from '../../../utils/misc'

const state = {
    isChangeSkuTagList: 0,

};
// 品牌管理
const mutations = {
    // 改变list
    changeSkuTaglist(state, change) {
        state.isChangeSkuTagList = change;
    }

};
export default {
    state,
    mutations,
}
