<!--
/*
    供应商模块发货信息交互部分封装的组件,点击 添加 按钮，添加到列表里同时触发emit事件
    传入参数： addressList，参数格式为：[{linkman: '', phoneNum '', email: '', address: '', province: '',
                                        city: '', area: ''}...], 非必填
             isEditAddress, 是否是编辑操作，编辑和新增页面共用该交互组件，但新增时联系人对联系人的操作都是前台操作，
                编辑时编辑联系人操作是与后台交互, 默认false,
             id, isEditAddress为true时必填，为供应商的id
    返回：    emit('getFaHuoRenInfo', addressList)，addressList是列表里的地址数据
*/
-->
<template>
    <div class="fa-huo-ren-info">
        <div class="title">
            <div style="display: inline-block">发货信息</div>
        </div>
        <div class="content-wrapper">
            <div class="add-wrapper">
                <el-button @click="openAddEdit" class="apply" size="mini"
                           icon="iconfont1 icontianjia icon-tianjia">新增地址
                </el-button>
            </div>
            <div v-if="addressList.length > 0 && addressList[0].linkman" class="mt15">
                <el-table :data="addressList" stripe>
                    <el-table-column prop="linkman" label="发货人"></el-table-column>
                    <el-table-column label="发货地址">
                        <template slot-scope="scope">
                            <div class="row-show">
                                {{scope.row.addressComplete == '0' ? '' : scope.row.addressComplete}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="email" label="邮箱"></el-table-column>
                    <el-table-column prop="phoneNum" label="联系电话"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="editAddress(scope.$index)">编辑</el-button>
                            <el-button type="text" @click="deleteAddress(scope.$index)">删除

                            </el-button>
                            <el-button type="text" @click="setDef(scope.$index)">
                                <span v-if="scope.row.isDef == 1" class="showDef">默认地址</span>
                                <span v-else class="showSetDef">设为默认</span>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <!--
        <Modal :title="title" v-model="addAddressDialogVisible" width="660px" :okText="'确定'" :showCancelButton="false"
               @save="addAddress" @close="clearVarify">
            <el-form label-width="85px" :model="address" ref="addressAddEdit" :rules="addressValidate" label-position="left">
                <div>
                    <div style="display: inline-block;margin-right:30px;">
                        <el-form-item label="发货人:" prop="linkman">
                            <el-input v-model="address.linkman" size="small" style="width: 200px"
                                      placeholder="请输入联系人(最多10个汉字)" :maxlength="20"
                                      @keyup.native="address.linkman = getStrLength(address.linkman,20)"></el-input>
                        </el-form-item>
                    </div>
                    <div style="display: inline-block">
                        <el-form-item label="联系电话:" prop="phoneNum">
                            <el-input v-model="address.phoneNum" size="small" type="number" style="width: 200px"
                                      placeholder="请输入联系电话"></el-input>
                        </el-form-item>
                    </div>
                </div>

                <div style="display: inline-block;margin-right:30px;">
                    <el-form-item label="邮箱:" prop="email">
                        <el-input v-model="address.email" size="small" style="width: 520px"
                                  placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                </div>
                <div style="display: inline-block">
                    <el-form-item label="发货地址:" required>

                        <address-select @selectAddress="selectAddress" v-if="!isClearAddress"
                                        ref="addressSelect" :curAddress="curAddress"></address-select>
                    </el-form-item>
                </div>
                <el-form-item label="详细地址:" prop="address">
                    <el-input v-model="address.address" size="small" placeholder="请输入详细地址(最多45个汉字)"
                              :maxlength="90"
                              @keyup.native="address.address = getStrLength(address.address, 90)"
                              style="width: 520px"></el-input>
                </el-form-item>
            </el-form>
        </Modal>
-->

        <el-dialog :title="title" :visible.sync="addAddressDialogVisible" width="660px" @close="clearVarify">
            <el-form label-width="85px" :model="address" ref="addressAddEdit" :rules="addressValidate" label-position="left">
                <div>
                    <div style="display: inline-block;margin-right:30px;">
                        <el-form-item label="发货人:" prop="linkman">
                            <el-input v-model.trim="address.linkman" size="small" style="width: 200px"
                                      placeholder="请输入联系人"></el-input>
                        </el-form-item>
                    </div>
                    <div style="display: inline-block">
                        <el-form-item label="联系电话:" prop="phoneNum">
                            <el-input v-model.trim="address.phoneNum" size="small" type="number" style="width: 200px"
                                      placeholder="请输入联系电话"></el-input>
                        </el-form-item>
                    </div>
                </div>

                <div style="display: inline-block;margin-right:30px;">
                    <el-form-item label="邮箱:" prop="email">
                        <el-input v-model.trim="address.email" size="small" style="width: 520px"
                                  placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                </div>
                <div style="display: inline-block">
                    <el-form-item label="发货地址:" required>
                        <!--
                        <el-cascader size="small" :options="options" style="width: 300px" placeholder="请选择地区"
                                     v-model="selected"></el-cascader>
                                     -->
                        <address-select @selectAddress="selectAddress" v-if="!isClearAddress"
                                        ref="addressSelect" :curAddress="curAddress"></address-select>
                    </el-form-item>
                </div>
                <el-form-item label="详细地址:" prop="address">
                    <el-input v-model.trim="address.address" size="small" placeholder="请输入详细地址"
                              style="width: 520px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="addAddress"
                               style="float:right; margin:7px 16px -14px 0; width: 100px">确定
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import MessageMixins from '~/mixins/messages';
    import {routesMapping} from '~/router'
    import utils from '~/utils/misc'
    import AddressSelect from '~/components/common/AddressSelect'
    import Modal from '~/components/common/Modal';
    export default{
        name: 'FaHuoRenInfo',
        components: {AddressSelect, Modal},
        mixins: [MessageMixins],
        props: {
            addressList: {
                type: Array,
                required: false,
            },
            isEditAddress: {
                type: Boolean,
                default: false
            },
            id: {
                type: String,
                default: '',
            }
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
                if (value == '') {
                    callback(new Error('请输入联系电话'))
                } else {
                    const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                    let res = phoneReg.test(value)
                    if (res) {
                        callback()
                    } else {
                        callback(new Error('输入的电话有误！'))
                    }
                }
            }
            return {
                address: {
                    linkman: '',
                    phoneNum: '',
                    province: '',
                    provinceCode: '',
                    city: '',
                    cityCode: '',
                    area: '',
                    areaCode: '',
                    email: '',
                    address: '',
                    addressComplete: '',
                    selected: [],
                    isDef: 2,
                    tmpId: '',
                },
                addAddressDialogVisible: false,
                editId: -1,
                addressValidate: {
                    linkman: [{required: true, message: "请输入联系人", trigger: 'blur'}],
                    phoneNum: [{required: true, validator: validatePhone, trigger: 'blur'}],
                    address: [{required: true, message: "请输入详细地址", trigger: 'blur'}],
                    email: [{required: true, validator: validateEmail, trigger: 'blur'}]
                },
                isClearAddress: false,
                selected: [],
                selectedName: [],
                curAddress: [],
                title: '新增地址'
            }
        },
        methods: {
            ...mapActions([,"modifySupplierAddress","addSupplierAddress"]),
            clearVarify(){
                setTimeout(() => {
                    this.$refs["addressAddEdit"].resetFields();
                }, 100)
                this.clearData()
            },
            selectAddress(code, name){
                this.selected = code;
                this.selectedName = name
            },
            getCurEditAddressIndex(){
                let curIndex = ''
                this.addressList.forEach((one, index) => {
                    if (one.tmpId == this.editId) {
                        curIndex = index;
                        return curIndex;
                    }
                })
                return curIndex;
            },
            openAddEdit(){
                this.isClearAddress = false
                this.addAddressDialogVisible = true;
                this.title = '新增地址'
            },
            addAddress(){
                this.$refs['addressAddEdit'].validate(res => {
                    this.$refs['addressSelect'].varify(item => {
                        if (!item) {
                            return false
                        }
                    })
                    if (res && this.getAddressInfo()) {
                        if(!this.address.tmpId){
                            this.address.tmpId = (new Date()).getTime()
                        }
                        let data = utils.cloneDeep(this.address)
                        if (data.tmpId == this.editId) { // 编辑
                            this.doEditAddress(data)
                        } else {                         // 添加
                            this.doAddAddress(data)
                        }
                        this.addAddressDialogVisible = false;
                    } else {
                        return false;
                    }
                })
            },
            doAddAddress(data){
                if(this.isEditAddress){             // 编辑页面的添加操作
                    if(this.id === ''){
                        return false
                    }else{
                        data.vendorSeqNo = this.id
                    }
                    this.addSupplierAddress(data).then(resp => {
                        this.addressList.unshift(data)
                        this.$emit('getFaHuoRenInfo', this.addressList)
                    })
                }else{                              // 添加页面的添加操作
                    this.addressList.unshift(data)
                    this.$emit('getFaHuoRenInfo', this.addressList)
                }
            },
            doEditAddress(data){
                let curIndex = this.getCurEditAddressIndex()
                if(this.isEditAddress){             // 编辑页面的编辑操作
                    if(this.id === ''){
                        return false
                    }else{
                        data.vendorSeqNo = this.id
                    }
                    data.addressId = this.addressList[curIndex].addressId
                    this.modifySupplierAddress(data).then(resp => {
                        this.addressList.splice(curIndex, 1, data)
                        this.$emit('getFaHuoRenInfo', this.addressList)
                        this.editId = -1;
                    })
                }else{                              // 添加页面的编辑操作
                    this.addressList.splice(curIndex, 1, data)
                    this.$emit('getFaHuoRenInfo', this.addressList)
                    this.editId = -1;
                }
            },
            editAddress(index){
                this.title = '编辑地址'
                this.isClearAddress = false
                if(!this.addressList[index].tmpId){
                    this.addressList[index].tmpId = (new Date()).getTime()
                }
                this.editId = this.addressList[index].tmpId;
                this.address = utils.cloneDeep(this.addressList[index])
                this.curAddress.splice(0,this.curAddress.length)
                this.curAddress = [this.address.province,this.address.city,this.address.area]
                this.addAddressDialogVisible = true;
            },
            deleteAddress(index){
                this.$confirm('确认删除该地址?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.doDeleteAddress(index)
                }).catch(() => {
                    this.showQuit()
                });
            },
            doDeleteAddress(index){
                if(this.isEditAddress){     // 编辑页面的操作
                    this.addressList[index].dataStatus = 2
                    this.addressList[index].vendorSeqNo = this.id;
                    this.modifySupplierAddress(this.addressList[index]).then(resp => {
                        this.addressList.splice(index, 1)
                        this.$emit('getFaHuoRenInfo', this.addressList)
                        this.showSuccess();
                    })
                }else{                      // 新增页面的操作
                    this.addressList.splice(index, 1)
                    this.$emit('getFaHuoRenInfo', this.addressList)
                    this.showSuccess();
                }
            },
            setDef(index){
                if(this.isEditAddress){   // 编辑页面的操作
                    this.addressList.forEach( (one,num) => {
                        if(one.isDef == 1){
                            one.isDef = 2;
                            one.vendorSeqNo = this.id
                            this.modifySupplierAddress(one);
                            this.$emit('getFaHuoRenInfo', this.addressList)
                        }
                        if(num == index){
                            one.isDef = 1
                            one.vendorSeqNo = this.id
                            this.modifySupplierAddress(one).then(resp => {
                                this.$emit('getFaHuoRenInfo', this.addressList)
                            })
                        }
                    })
                }else{                  // 新增页面的操作
                    this.addressList.forEach((one, num) => {
                        if (num == index) {
                            one.isDef = 1;
                        } else {
                            one.isDef = 2;
                        }
                    })
                    this.$emit('getFaHuoRenInfo', this.addressList)
                }
            },
            getAddressInfo(){
                let data = this.selected, name = this.selectedName
                if (data.length == 3) {
                    this.address.selected = data;
                    this.address.provinceCode = data[0];
                    this.address.cityCode = data[1];
                    this.address.areaCode = data[2];
                    this.address.province = name[0]
                    this.address.city = name[1]
                    this.address.area = name[2]
                    this.address.addressComplete = name[0] + name[1] + name[2] + this.address.address
                    return true
                } else {
                    return false
                }
            },
            clearData(){
                this.isClearAddress = true
                this.address.province = ''
                this.address.city = ''
                this.address.area = ''
                this.address.provinceCode = ''
                this.address.cityCode = ''
                this.address.areaCode = ''
                this.address.linkman = ''
                this.address.phoneNum = ''
                this.address.address = ''
                this.address.email = ''
                this.address.isDef = 2
                this.address.tmpId = ''
                this.address.addressComplete = ''
                this.selected = []
                this.editId = -1;
                this.curAddress = []
            }
        }
    }
</script>

<style lang="scss">
    .fa-huo-ren-info {
        .content-wrapper {
            .add-wrapper {
                margin-bottom: 20px;
                .icontianjia {
                    margin-right: 5px;
                    margin-left: -6px;
                    margin-top: 1px;
                    font-size: 10px;
                    width: 10px;
                    height: 10px;
                }
            }
        }
    }
</style>
