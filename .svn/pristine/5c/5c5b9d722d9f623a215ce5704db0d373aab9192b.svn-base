<!---
    弹窗组件
    参数：1.value：是否显示弹窗
          2.width：弹窗宽度，默认50%
          3.title：弹窗标题
          4.footerVisible：是否显示弹窗底部，默认true
          5.cancelText：取消按钮文字，默认取消
          6.showCancelButton：是否显示取消按钮，默认true
          7.okText：确认按钮文字，默认确定
          8.showOkButton:是否显示确认按钮，默认true
    emit：1.close：关闭弹窗时
          2.save：点击确认时
-->
<template>
    <div class="modal-container">
        <el-dialog class='modal'
                   :close-on-press-escape="false"
                   :close-on-click-modal="false"
                   :visible.sync="dialogVisible"
                   :title="title"
                   @close="onClose"
                   :width="width">
            <div class="bottom-border"></div>
            <slot>暂无数据</slot>
            <span slot="footer" class="dialog-footer" v-if="footerVisible">
                <slot name='footer'>
                    <el-button @click="dialogVisible=false" v-if="showCancelButton">{{cancelText}}</el-button>
                    <el-button type="primary" size='small'  v-if="showOkButton" @click="onSave">{{okText}}</el-button>
                </slot>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "Modal",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            width: {
                type: String,
                default: '50%'
            },
            title: {
                type: String,
                default: ''
            },

            footerVisible: {
                type: Boolean,
                default: true
            },
            cancelText: {
                type: String,
                default: "取消"
            },
            showCancelButton:{
                type: Boolean,
                default: true
            },
            okText: {
                type: String,
                default: "确定"
            },
            showOkButton:{
                type: Boolean,
                default: true
            },
        },
        data(){
            return {
//                dialogVisible: false
            }
        },
        computed: {
            dialogVisible: {
                get: function () {
                    return this.value
                },
                set: function (nval) {
                    if (!nval) {
                        this.$emit("input", false);
                        this.$emit("close");
                    }
                }
            }
        },
        mounted(){
          console.log(this.showCancelButton)
        },
        methods: {
            onClose(){
                this.$emit("close");
            },

            onSave(){
                this.$emit("save");
            },
        }
    }
</script>
<style lang="scss">
    .modal-container {
        .el-dialog__header {
            padding: 20px 23.7px 20px 30px;
            color: #333333;
            .el-dialog__title {
                font-size: 16px;
                color: #333333;
            }
            .el-dialog__headerbtn {
                right: 30px;
                font-size: 23px;
            }
        }
        .el-dialog__body {
            padding: 0px 30px 20px 30px;
            .bottom-border {
                width: 100%;
                border-bottom: 1px solid #F3F3F3;
                margin-bottom: 20px;
            }
        }
        .el-dialog__footer {
            padding: 0px 30px 30px;
        }
    }
</style>
