<!--
/*
    仓库模块联系人交互部分封装的组件,点击 添加 按钮，添加到列表里同时触发emit事件
    传入参数： relationList，参数格式为：[{name: '', phone: '', email: ''}...], 非必填
             isEditStorehouse, 是否是编辑操作，编辑和新增页面共用该交互组件，但新增时联系人对联系人的操作都是前台操作，
                编辑时编辑联系人操作是与后台交互, 默认false
    返回：    emit('getLianXiRenInfo', relationList)，relationList是列表里的联系人数据
*/
-->

<template>
    <div class="lianxiren">
        <div class="content">
            <div class="title">
                <div style="display: inline-block">联系人信息</div>
            </div>

            <div class="content-wrapper">
                <div class="add-wrapper">
                    <el-button @click="openAddEdit" size="mini"
                               icon="iconfont1 icontianjia icon-tianjia">新增联系人</el-button>
                </div>
                <el-table :data="newData" style="width: 100%">
                    <el-table-column prop="linkman" label="联系人"></el-table-column>
                    <el-table-column prop="phone" label="联系电话"></el-table-column>
                    <el-table-column prop="email" label="邮箱"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="edit(scope.$index)">编辑</el-button>
                            <el-button type="text" @click="deleteRelation(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <!--
        <Modal :title="title" v-model="addContractDialogVisible" width="660px" :okText="'确认'" :showCancelButton="false"
               @save="add" >
            <el-form :model="info" label-width="90px" :rules="addContract" ref="addContract">
                <div>
                    <div style="display: inline-block;" >
                        <el-form-item label="联系人 : " prop="linkman">
                            <el-input v-model="info.linkman" size="small" placeholder="请输入联系人"
                                      style="width: 190px"></el-input>
                        </el-form-item>
                    </div>
                    <div style="display: inline-block;margin-left: 15px;">
                        <el-form-item label="联系电话 : " prop="phone">
                            <el-input v-model="info.phone" size="small" placeholder="请输入联系电话" type="number"
                                      style="width: 190px"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div style="display: inline-block;">
                    <el-form-item label="邮箱 : " prop="email">
                        <el-input v-model="info.email" size="small" placeholder="请输入邮箱"
                                  style="width: 490px"></el-input>
                    </el-form-item>
                </div>
            </el-form>
        </Modal>
-->

        <el-dialog :title="title" :visible.sync="addContractDialogVisible" width="626px">
            <el-form :model="info" label-width="90px" :rules="addContract" ref="addContract" label-position="left">
                <div>
                    <div style="display: inline-block;" >
                        <el-form-item label="联系人 : " prop="linkman">
                            <el-input v-model.trim="info.linkman" size="small" placeholder="请输入联系人"
                                      style="width: 190px"></el-input>
                        </el-form-item>
                    </div>
                    <div style="display: inline-block;margin-left: 15px;">
                        <el-form-item label="联系电话 : " prop="phone">
                            <el-input v-model.trim="info.phone" size="small" placeholder="请输入联系电话" type="number"
                                      style="width: 190px" v-number-only></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div style="display: inline-block;">
                    <el-form-item label="邮箱 : " prop="email">
                        <el-input v-model.trim="info.email" size="small" placeholder="请输入邮箱"
                                  style="width: 490px"></el-input>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button type="primary" size="small" @click="add" style="float:right; margin:7px 5px -14px 0; width: 100px">确认</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
    import utils from "~/utils/misc"
    import Modal from '~/components/common/Modal';
    import { directives } from '~/utils/directives/index'
    import MessageMixins from '~/mixins/messages';
    export default{
        name: 'LianXiRenInfo',
        components: {Modal},
        mixins: [MessageMixins],
        props: {
            relationList: {
                type: Array,
                required: false,
            },
            isEditStorehouse: {
                type: Boolean,
                default: false
            },
        },
        data(){
            var validateEmail = (rule, value, callback) => {
                if (value == '') {
                    callback(new Error('请输入邮箱'))
                } else {
                    const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,5}$/
                    let res = emailReg.test(value)
                    if (res) {
                        callback()
                    } else {
                        callback(new Error('输入的邮箱有误！'))
                    }
                }
            }
            var validatePhone = (rule, value, callback) => {
//                if (value == '') {
//                    callback(new Error('请输入联系电话'))
//                } else {
//                    const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
//                    let res = phoneReg.test(value)
//                    if (res) {
//                        callback()
//                    } else {
//                        callback(new Error('输入的电话有误！'))
//                    }
//                }
                if(value.length>11 || !value){
                    callback(new Error('请输入11位数字以内的电话号码！'));
                }else{
                    callback();
                }
            }
            return {
                newData: [],
                info: {
                    linkman: '',
                    phone: '',
                    email: '',
                    isEdit: false,
                },
                addContract: {
                    linkman: [{required: true, message: "请输入联系人", trigger: 'blur'}],
                    phone: [{required: true, validator: validatePhone, trigger: 'blur'}],
                    email: [{required: true, validator: validateEmail, trigger: 'blur'}]
                },
                isOpen: true,
                addContractDialogVisible: false,
                title: '新增联系人'
            }
        },
        watch: {
            relationList: function (nval, oval) {
                if (nval.length > 0 && nval[0].linkman) {
                    this.newData = nval
                }else{
                    this.newData = []
                }
            }
        },
        methods: {
            openAddEdit(){
                this.addContractDialogVisible = true;
                this.clearVarify()
                this.title = '新增联系人'
            },
            add(){
                this.$refs['addContract'].validate(res => {
                    if(!res){
                        return false
                    }else{

                        if (this.info.isEdit) { // 编辑
                            if (!this.isEditStorehouse) {   // 编辑页面的操作
                                let index = this.newData.findIndex(one => {
                                    return one.isEdit
                                })
                                this.info.isEdit = false
                                this.newData.splice(index, 1, utils.cloneDeep(this.info))
                                this.clearInfo()
                                this.addContractDialogVisible = false
                            } else {                        // 添加页面的操作
                                let index = this.newData.findIndex(one => {
                                    return one.isEdit
                                });
                                this.info.isEdit = false;
                                this.$emit('modifyStorehouseLink', {...this.info}, this.newData,index);
                                this.clearInfo();
                                this.addContractDialogVisible = false
                            }
                        } else {                // 添加
                            if(!this.isEditStorehouse){        // 编辑页面的操作
                                let res = utils.cloneDeep(this.info);
                                this.newData.unshift(res);
                                this.clearInfo();
                                this.$emit('getLianXiRenInfo', this.newData)
                                this.addContractDialogVisible = false
                            }else{                             // 添加页面的操作
                                let res = utils.cloneDeep(this.info);

                                this.$emit('addStorehouseLink', {...this.info},this.newData);
                                this.clearInfo();
                                this.addContractDialogVisible = false
                            }
                        }

                    }
                })
            },
            clearInfo(){
                this.info.linkman = ''
                this.info.phone = ''
                this.info.email = ''
                this.info.isEdit = false
            },
            clearVarify(){
                setTimeout(() => {
                    this.$refs['addContract'].resetFields();
                }, 80)
            },
            edit(index){
                this.title = '编辑联系人'
                this.newData.forEach(one => {
                    one.isEdit = false
                });
                this.newData[index].isEdit = true;
                let res = utils.cloneDeep(this.newData[index]);
                this.info = res;
                this.addContractDialogVisible = true
            },
            deleteRelation(index){
                this.$confirm('确认删除该联系人?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.doDelete(index)
                }).catch(() => {
                    this.showQuit()
                });
            },
            doDelete(index){
                if (!this.isEditStorehouse) {
                    if (this.newData[index].isEdit) {
                        this.clearInfo()
                    }
                    this.newData.splice(index, 1);
                    this.showSuccess();
                } else {
                    this.$emit('deleteStorehouseLink', this.newData[index], this.newData, index);
                }
            },
            isPhoneNumCorrect(phoneNum){
                let data = phoneNum + '';
                const myreg = /^[1][3,4,7,8][0-9]{9}$/;
                if (!myreg.test(data)) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    }
</script>

<style lang="scss">
    .lianxiren {
        .content-wrapper{
            .add-wrapper{
                margin-bottom: 20px;
                .icontianjia{
                    margin-right: 5px;
                    margin-left: -6px;
                    margin-top: 1px;
                    font-size: 10px;
                    width: 10px;
                    height: 10px;
                }
            }
            .el-table .el-table__body-wrapper.is-scrolling-none{
                border-left: 1px solid #eee;
                border-right: 1px solid #eee;

                .el-table__empty-text{
                    font-size: 12px;
                }
            }
            .el-table__empty-block{
                border-bottom: 1px solid #eee;
            }
        }
    }
</style>