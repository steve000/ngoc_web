<template>
   <div class='bread-crumb'>
    <el-col :span="22">
       <el-breadcrumb separator=">">
            <el-breadcrumb-item>商品</el-breadcrumb-item>
            <el-breadcrumb-item  v-for='(item,index) in crumbs' :key='index'
                :to="{ path: item.path }">
                {{item.name}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </el-col>
    <el-col :span="2">
            <div type="text" class="conditionSelect">
                <slot name="filter"></slot>
            </div>
    </el-col>
   </div>
</template>

<script>
    export default {
        name: 'BreadCrumb',
        computed: {
            crumbs() {
                const route = this.$route
                const routeMatched =  route.matched
                const meta = route.meta
                const array  = []
                routeMatched.forEach( (item, index) => {
                    let {name, path} = item
                    if(path){
                        index === routeMatched.length && (path == '')
                        path && array.push({name, path})
                    }
                })
                if (meta && meta.prePath) {
                    const {prePath: path, preName: name} = meta
                    const length = array.length
                    array.splice(length - 1, 0, {name, path})
                }
                return array
            }
        }
    }
</script>


<style lang='scss'>
.bread-crumb {
    padding: 15px;
    background-color: #fff;
    overflow: hidden;
    position:fixed;
    z-index:98;
    width:100%;
    .btns-section {
        float: right;
    }
    .conditionSelect{
        cursor:pointer;
    }
}
</style>
