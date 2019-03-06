/**
 * Created by issuser on 2018/3/19.
 */
import {routesMapping} from '~/router';
export default {
    data: function () {
        return {
            routesMapping:routesMapping
        }
    },
    methods:{
        quit(param,isRefrensh=true){
            const tab = this.getTabByKey(param);
            if(tab){
                this.closeCurrentTab(false);
                this.selectTab(tab);
                if(isRefrensh){
                    this.refreshTab(tab)
                }
            }else{
                this.closeCurrentTab();
            }
        },
        shiftPage(param,path=''){
            const tab = this.getTabByKey(param);
            this.closeCurrentTab(false);
            if(tab){
                this.selectTab(tab);
                this.refreshTab(tab);

            }else{
                this.$router.push(path);
            }
        }
    }
}
