import * as C from "../../../constants/api";
import utils from '../../../utils/misc'

const state = {
    list: {
        totalCount: 0,
        result: []
    },
    all: []

};
// 类目管理
const mutations = {
    // 新增
    [C.MANAGE_CATEGORY_ADD](state, { payload }) {
    },
    // 编辑
    [C.MANAGE_CATEGORY_EDIT](state, { payload }) {
    },
    // 删除
    [C.MANAGE_CATEGORY_DELETE](state, { payload }) {
    },
    // 查询品牌列表
    [C.MANAGE_CATEGORY_LIST](state, { payload }) {
        state.list.totalCount = payload.totalCount;
        state.list.result = payload.result;
    },
    // 查询所有
    [C.MANAGE_CATEGORY_ALL](state, { payload }) {
        let navList = payload.result;
        let firstCateId;
        let firstArr = [];
        for (let i in navList) {
            let firstChild = [];
            if (navList[i].level === 1) {
                // debugger
                // 一级的cateid就是二级的父id
                firstCateId = navList[i].cateId
                let secondIdCateId;
                for (let y in navList) {
                    let secondChild = [];
                    if (navList[y].level === 2 && navList[y].parentCateId === firstCateId) {
                        // 二级的cateid就是三级的父id
                        secondIdCateId = navList[y].cateId
                        for(let k in navList) {
                            if (navList[y].level === 3 && navList[k].parentCateId === secondIdCateId) {
                                secondChild.push({ cateName: navList[k].cateName, cateId: navList[k].cateId, childs: [], level: navList[k].level, parentCateId: navList[k].parentCateId })
                            }
                        }
                        firstChild.push({ cateName: navList[y].cateName, cateId: navList[y].cateId, childs: secondChild, level: navList[y].level, parentCateId: navList[y].parentCateId })
                    }
                }
                firstArr.push({ cateName: navList[i].cateName, cateId: firstCateId, childs: firstChild, level: navList[i].level, parentCateId: navList[i].parentCateId })
            }
        }
        console.log(navList)
        console.log(firstArr)
        state.all = firstArr;
    },

};

export default {
    state,
    mutations
}
