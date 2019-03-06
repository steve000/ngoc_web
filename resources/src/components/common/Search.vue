/**
    搜索框组件
    传入参数：1.showResetButton：是否显示重置按钮，默认false
              2.isShowSearchResult：是否显示搜索结果提示
              3.count：搜索结果数量
              4.showPlaceholder：input的showPlaceholder
     emit:1.searchValue：点击搜索时执行，返回searchValue
          2.reset：点击重置时执行
**/

<template>
    <div class="search-component">
        <el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" @submit.native.prevent>
            <el-form-item prop="searchValue" >
                <div class="search-box">
                    <el-input
                        prefix-icon="iconfont1 icon-sousuo"
                        :placeholder="showPlaceholder"
                        v-model.trim="searchForm.searchValue"
                        @keyup.enter.native="submitSearch('searchForm')"
                        clearable
                        @focus="isFocus=true"
                        @blur="isFocus=false"
                        size="small">
                    </el-input>
                    <el-button type="primary" @click="submitSearch('searchForm')" size="small" class="border-left-none" :class="{'isFocus':isFocus}">搜索</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'search',
        data () {
            let validatorSearchValue = (rule, value, callback) => {
                let searchValue = this.searchForm.searchValue.trim();
                if (searchValue.length < 1) {
                    callback(new Error('请输入搜索内容'));
                    return
                }
                callback()
            };
            return {
                searchForm: {
                    searchValue: ""
                },
                isFocus:false,
                rules: {
                    searchValue: {required: true, trigger: 'input', validator: validatorSearchValue}
                }
            }
        },
        props: {
            showPlaceholder: {
                type: String,
                default: '请输入内容'
            },
            isClear:{
                type: Boolean,
                default:false
            }
        },
        computed: {
            dataChange: function () {
                return this.searchForm.searchValue
            }
        },
        watch:{
            isClear(nval){
                console.log(nval);
                console.log('nval');

                if(nval){
                    this.searchForm.searchValue="";
                }
            }
        },
        methods: {
            submitSearch(formName){
                this.checkForm(formName)
            },
            checkForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let searchValue = this.searchForm.searchValue.trim();
                        this.$emit('searchValue', searchValue);
                    } else {
                        return false;
                    }
                });
            },
        }
    }
</script>

<style lang="scss">
    .search-component {
        position: relative;
        top:-4px;
        right: -13px;
        .search-box {
            width: auto;
            position: relative;
            text-align: right;
            .el-input{
                width: auto;
            }
            .el-input--small {
                display: inline-block;
                input {
                    color: #333333;
                    &:focus{
                        border-color:#3B8CFF;
                    }
                }
            }
            .el-button {
                position: relative;
                left: -4px;
                top: 1px;
                width: 60px;
                background: #F7F7F7;
                border: 1px solid #E0E0E0;
                padding: 0px;
                text-align: center;
                line-height: 32px;
                border-radius: 2px;
                color: #333333;
                height: 32px;
            }
            .isFocus{
                background-color: #3B8CFF;
                color: #ffffff;
                border-color: #3B8CFF;
            }
            .border-left-none {
                border-left: none;
                border-top-left-radius: 0px;
                border-bottom-left-radius: 0px;
            }
            .el-input__inner {
                font-size: 12px;
                width: 296px;
                border: 1px solid #E0E0E0;
                border-top-left-radius: 2px;
                border-bottom-left-radius: 2px;
                border-top-right-radius: 0px;
                border-bottom-right-radius: 0px;
            }
            .el-input__prefix {
                left: 10px;
            }
            .iconfont1 {
                font-size: 14px;
            }
            .el-input.el-input--small.el-input--prefix {
                height: 34px;
                line-height: 34px;
            }
        }
        .el-form-item__error {
            padding: 0px;
        }
    }
</style>
