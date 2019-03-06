<template>
    <div v-if="user" @click="getIndex()">
        <div class="left">
            <span>{{fullName}}</span>
            <span v-if="nickName">
                ({{nickName}})
            </span>    
        </div>
    </div>
</template>
<script>
    export default{
        name:'UserList',
        props:{
            user:Object,
        },
        data(){
            return{
                click:0
            }
        },
        computed:{
            fullName(){
                return this.user.fullName
            },
            nickName(){
                return this.user.nickname
            }
        },
        methods:{
            getIndex(user){
                console.log(user)
                this.$emit("shiftData",this.user)
                // this.click = index
            }
        }

    }
</script>

<style scoped lang="scss">
    .left{
        float: left;
        padding-right:10px;
        font-size: 12px;
        color: #666666
    }
    .right{
        float: right; 
        padding-left:10px;
    }
    .description{
        color: rgb(132, 146, 166); 
        font-size: 12px;
    }
    .isactive{
        color: #333333;
    }
</style>