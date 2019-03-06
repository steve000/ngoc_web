<template>
    <div class="editSupplier">
        <div style="width:100%; height: 10px; background-color: #E9EEF1"></div>
        <div class="content">
            <div class="title">
                <div><label class="red mr2">*</label>基本信息</div>
            </div>
            <div class="content-wrapper">
                <el-form :model="editSupplier" label-width="100px" label-position="left">
                    <div style="display:inline-block;margin-right: 30px;">
                        <el-form-item label="供应商编号:">
                            <el-input v-model="editSupplier.vendorNumber" size="small" style="width: 300px" disabled></el-input>
                        </el-form-item>
                    </div>
                    <div style="display:inline-block">
                        <el-form-item label="供应商名称:">
                            <el-input v-model="editSupplier.vendorName" size="small" style="width: 300px" disabled></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item label="状态:">
                        <el-select v-model="editSupplier.dataStatus" placeholder="请选择" size="small" disabled style="width: 300px">
                            <el-option v-for="item in statusList" :key="item.id" :value="item.id" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注:">
                        <el-input type="textarea" size="small" v-model.trim="editSupplier.comments"
                                  :autosize="{ minRows: 3, maxRows: 5}"
                                  placeholder="请输入备注(最多200个字符)" :maxlength="200"
                                  @keyup.native="editSupplier.comments = getStrLength(editSupplier.comments,200)"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="content">
            <fa-huo-ren-info :addressList="addressList" :isEditAddress="true" :id="supplierId" @getFaHuoRenInfo="getFaHuoRenInfo"></fa-huo-ren-info>
        </div>
        <div class="btn-section">
            <el-button type="primary" @click="submit" size="small" :disabled="disabled">提交</el-button>
            <el-button type="reset" @click="quitEdit" size="small" class="reset" :disabled="disabled">取消</el-button>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import PlatformMixins from '~/mixins/platform'
    import MessageMixins from '~/mixins/messages';
    import QuitMixins from '~/mixins/quit'
    import {routesMapping} from '~/router'
    import FaHuoRenInfo from '~/components/common/FaHuoRenInfo'
    export default{
        name: "EditSupplier",
        mixins: [PlatformMixins,QuitMixins,MessageMixins],
        components: {FaHuoRenInfo},
        data(){
            return{
                editSupplier: {},
                statusList: [{id: 1, name: '未启用'},{id: 2, name: '启用中'}],
                addressList: [],
                curAddress: [],
                newAddressList: [],
                supplierId: '',
                disabled: false,
            }
        },
        activated() {
            this.supplierId = this.$route.params.id;
            this.refreshPage();
        },
        mounted(){
            this.supplierId = this.$route.params.id;
            this.refreshPage();
        },
        methods: {
            ...mapActions(["queryGroupSupplierDetail","saveSupplierInfo", "modifySupplierInfo", "showPageLoading", "hidePageLoading", ]),
            quitEdit(){
                this.disabled = true;
                this.showPageLoading();
                this.showSuccess('已取消')
                setTimeout(() => {
                    this.hidePageLoading()
                    this.quit(routesMapping.SupplierManagement)
                    this.disabled = false;
                }, 2000)
            },
            refreshPage(){
                this.showPageLoading();
                this.queryGroupSupplierDetail({vendorSeqNo: this.supplierId}).then( resp => {
                    this.editSupplier = resp
                    if(resp.addressList){
                        this.addressList = resp.addressList
                        this.addressList.forEach(one => {
                            one.addressComplete = one.province + one.city + one.area + one.address
                        })
                    }
                    this.hidePageLoading()
                }).catch( error => {
                    this.hidePageLoading()
                    setTimeout( () => {
                        this.quitEdit()
                    }, 2000)
                })
            },
            getFaHuoRenInfo(data){
                this.newAddressList = data
                this.refreshPage()
            },

            getStrLength(data, len){
                if (data.length > len) {
                    return data.substr(0, len)
                } else {
                    return data
                }
            },
            submit(){
                this.disabled = true;
                this.showPageLoading()
                if(!this.editSupplier.vendorNumber) {
                    this.showError('请选择供应商！')
                    this.disabled = false;
                    this.hidePageLoading()
                    return false;
                }else{
                    this.doEdit()
                }
            },
            doEdit(){
                let params = {
                    vendorSeqNo: this.supplierId,
                    comments: this.editSupplier.comments
                }
                this.modifySupplierInfo(params).then(resp => {
                    this.showSuccess();
                    setTimeout(() => {
                        this.disabled = false;
                        this.quit(routesMapping.SupplierManagement)
                        this.hidePageLoading()
                    }, 1000)
                }).catch(res => {
                    this.hidePageLoading()
                    this.disabled = false;
                })
            },
        }
    }
</script>

<style lang="scss">
    .editSupplier{
        height: 100%;
        background-color: #fff;
        position: relative;
        margin: 0px 30px;
        .area-select.large {
            width: 300px;
        }
        .el-input__inner{
            font-size: 12px;
            color: #666;
        }
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
        }
    }
</style>
