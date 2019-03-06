<template>
    <div class="modal-container">
        <el-dialog class='modal'
                   :close-on-press-escape="false"
                   :close-on-click-modal="false"
                   :visible.sync="dialogVisible"
                   :title="title"
                   @close="onClose"
                   :width="width">
            <slot>暂无数据</slot>
            <span slot="footer" class="dialog-footer" v-if="footerVisible">
            <slot name='footer'>
                <el-button @click="dialogVisible=false">{{cancelText}}</el-button>
                <el-button type="primary" @click="onSave">{{okText}}</el-button>
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
            width:{
                type:String,
                default: '50%'
            },
            title:{
                type:String,
                default:''
            },

            footerVisible:{
                type:Boolean,
                default:true
            },
            cancelText: {
                type: String,
                default: "取消"
            },
            okText: {
                type: String,
                default: "确定"
            }
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

        methods: {
            onClose(){
                this.$emit("close");
            },

            onSave(){
               this.$emit("save");
            }
        }


    }
</script>

