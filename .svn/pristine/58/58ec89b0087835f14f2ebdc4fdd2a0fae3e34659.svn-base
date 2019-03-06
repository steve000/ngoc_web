import * as AC from "../constants/actions"
import * as C from "../constants/api"

const state = {
    pageLoading: false,
    currentUser:  '',
    currentUserId: '',
    tabCaches: [],
    userEntityList: [],
    currentEntity: '',
    currentEntityId: '',

};
const mutations = {
    [C.USER_LOGIN](state, {payload}){

    },
    [C.USER_LOGOUT](state, {payload}){

    },
	[AC.SHOW_PAGE_LOADING](state){
		state.pageLoading = true;
	},
	[AC.HIDE_PAGE_LOADING](state){
		state.pageLoading = false;
    },

    [AC.CHANGE_CURRENT_USER](state, {payload}){
		state.currentUser = payload;
    },
    [AC.CHANGE_CURRENT_USER_ID](state, {payload}){
        state.currentUserId = payload;
    },

    [AC.TAB_CACHE_ADDED](state, {payload}) {
        const tabCaches = state.tabCaches;
        const isExists = tabCaches.some( cache => {
            return cache.name === payload.name && cache.path === payload.path
        });
        if(isExists){
            for(let i=0;i<state.tabCaches.length;i++){
                if(state.tabCaches[i].name===payload.name&& state.tabCaches[i].path===payload.path){
                    state.tabCaches[i].vm=payload.vm;
                }
            }
        }
        !isExists && state.tabCaches.push(payload);
        let newTabCaches=[];
        for(let i=0;i<tabCaches.length;i++){
            let tab=tabCaches[i];
            let item=Object.assign({},tab);
            item.vm="";
            newTabCaches.push(item)
        }
        let tabCachesString=JSON.stringify(newTabCaches);
        sessionStorage.setItem('tabCaches',tabCachesString);
    },
    [AC.TAB_CACHE_REMOVED](state, {payload}) {
        state.tabCaches.splice(payload, 1);
        let tabCaches= state.tabCaches;
        let newTabCaches=[];
        for(let i=0;i<tabCaches.length;i++){
            let tab=tabCaches[i];
            let item=Object.assign({},tab);
            item.vm="";
            newTabCaches.push(item)
        }
        let tabCachesString=JSON.stringify(newTabCaches);
        sessionStorage.setItem('tabCaches',tabCachesString);
    },

    [C.GET_USER_ENTITY_LIST](state, {payload}){
        state.userEntityList = payload.result
    },

    [AC.CHANGE_CURRENT_ENTITY](state, {payload}){
        state.currentEntity = payload
    },

    [AC.CHANGE_CURRENT_ENTITY_ID](state, {payload}){
        state.currentEntityId = payload
    }
};

export default{
	state,
	mutations
}
