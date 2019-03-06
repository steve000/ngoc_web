/**
 * 系统整体配置相关mixins
 */

export default {

    beforeRouteEnter (to, from, next) {
        next(vm => {
            const {name, path, meta:{label}} = vm.$route
            const obj = {
                label,
                name,
                path,
                vm,
            }
            vm.$store.dispatch("addTabCache", obj);
        })
    },

    methods: {

        /**
         * 关闭当前标签页，没传参数的默认情况下 默认选中前一个标签页
         * @canSelectPreTab  true 默认选中前一个标签页，false
         */
        closeCurrentTab(canSelectPrevTab = true) {
            const vm = this.$parent.$children.filter(vm => vm.$options.name === 'RouterTab')[0]
            vm && vm.closeCurrentTab(canSelectPrevTab)
        },
        /**
         * 关闭指定打开的标签页
         * @param key
         */
        closeTabByKey(key){
            const vm = this.$parent.$children.filter(vm => vm.$options.name === 'RouterTab')[0]
            return vm && vm.closeTabByKey(key)
        },
        /**
         * 根据key来选择标签页
         * @key 路由中组件的名字（name属性）
         */
        getTabByKey(key) {
            const vm = this.$parent.$children.filter(vm => vm.$options.name === 'RouterTab')[0]
            return vm && vm.getTabByKey(key)
        },

        /**
         * 刷新指定标签页
         */
        refreshTab(tab) {
            const vm = this.$parent.$children.filter(vm => vm.$options.name === 'RouterTab')[0]
            vm && vm.refreshTab(tab)
        },

        /**
         * 选中标签页
         */
        selectTab(tab) {
            const vm = this.$parent.$children.filter(vm => vm.$options.name === 'RouterTab')[0]
            vm && vm.selectTab(tab)
        },

        // 组件内覆盖
        onPageRefresh(){},

        isAllowClose(){
            return true;
        }
    }
}
