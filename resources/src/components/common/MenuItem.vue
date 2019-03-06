

    // 菜单子项组件
    // 传入参数：1.model：菜单子项数组
    //           2.click：判断是否点击的当前项
    //  emit:1.cateId:点击菜单子项，返回cateId和cateName

<template>
    <li class="menu-item-li">
        <div :class="{'isactive':click==model.cateId}"
             :title="model.cateName"
             @click="showGoods(model.cateId, model.level)" class="set-border">
            <div v-if="isFolder" class="positionIcon" :class="{ 'isOpenPositionIcon': !isopen}"></div>
            <span>{{ model.cateName }}</span></div>
        <ul v-if="isFolder" class="submenu" :class="{ 'isopen': isopen}">
            <menu-item v-for="item in model.childs" :key="item.cateId" :model="item" :click="click"></menu-item>
        </ul>
</li>
</template>

<script>
    import Bus from '~/utils/bus'
    export default {
        name: 'menuItem',
        data () {
            return {
                open: false,
                cateId: "",
                isopen: false,
                isactive: false,
            }
        },
        props: {
            model: Object,
            click: String
        },
        computed: {
            isFolder: function () {
                return this.model.childs &&
                    this.model.childs.length
            }
        },
        methods: {
            showGoods(cateId, level){
                this.cateId = cateId;
                let Object = {cateId: cateId, cateName: this.model.cateName, level: level};
                Bus.$emit('cateId', Object);
                if (this.isFolder) {
                    this.isopen = !this.isopen
                }
            },
        }
    }
</script>

<style>
    .isOpenPositionIcon{
        transform:rotate(-45deg);
        -ms-transform:rotate(-45deg); 	/* IE 9 */
        -moz-transform:rotate(-45deg); 	/* Firefox */
        -webkit-transform:rotate(-45deg); /* Safari 和 Chrome */
        -o-transform:rotate(-45deg); 	/* Opera */
    }
</style>
