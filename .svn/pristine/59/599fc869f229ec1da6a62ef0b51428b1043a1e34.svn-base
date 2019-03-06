<template>
    <div class="addSupplier">
        <div style="width:100%; height: 10px; background-color: #E9EEF1"></div>
        <div class="search-supplier pt20 pb20 fs14">
            <label>
                <span style="color: #f00">*</span>
                搜索供应商:
            </label>
            <el-select v-model="searchContent" popper-class="max-length" clearable @clear="clearSupplier"
                       filterable remote reserve-keyword style="width: 300px; font-size: 14px;" size="small"
                       placeholder="请输入供应商编号或名称进行搜索"
                       :remote-method="remoteMethod" :loading="loading" @change="querySupplierDetail">
                <el-option :value="item.vendorNumber" :label="item.vendorName" :key="index" size="small"
                           v-for="(item,index) in supplierList">
                    <div class="">
                        <span>{{item.vendorNumber}}</span>
                        <span>{{item.vendorName}}</span>
                    </div>
                </el-option>
            </el-select>
            <div style="display: inline-block; margin-left: 10px;" v-if="!newSupplier.vendorNumber">
                <el-tooltip effect="light" style="color:#888" class="reset-tooltip-right-color" content="供应商信息源于咪咕主数据平台，添加后该供应商默认为未启用，启用后才能进行业务操作" placement="right">
                    <i class="iconfont1 icon-wenhao fs16" style="color:#bdbdbd"></i>
                </el-tooltip>
            </div>
        </div>
        <template v-if="newSupplier.vendorNumber">
            <div class="content pt20">
                <div class="title">
                    <div>基本信息</div>
                </div>
                <div class="content-wrapper">
                    <el-form :model="newSupplier" label-width="100px" label-position="left">
                        <div style="display:inline-block; margin-right:30px;margin-bottom: 5px">
                            <el-form-item label="供应商编号:" required>
                                <el-input v-model="newSupplier.vendorNumber" size="small" style="width: 300px"
                                          disabled></el-input>
                            </el-form-item>
                        </div>
                        <div style="display:inline-block;margin-bottom: 5px">
                            <el-form-item label="供应商名称:" required>
                                <el-input v-model="newSupplier.vendorName" size="small" style="width: 300px"
                                          disabled></el-input>
                            </el-form-item>
                        </div>
                        <el-form-item label="备注:" class="reset-form-label">
                            <el-input type="textarea" size="small" v-model.trim="newSupplier.comments"
                                      :autosize="{ minRows: 3, maxRows: 5}"
                                      placeholder="请输入备注(最多200个字符)" :maxlength="200"
                                      @keyup.native="newSupplier.comments = getStrLength(newSupplier.comments,200)"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <div class="content">
                <fa-huo-ren-info :addressList="addressList" @getFaHuoRenInfo="getFaHuoRenInfo"></fa-huo-ren-info>
            </div>
            <div class="btn-section">
                <el-button type="primary" @click="submit" size="small" :disabled="disabled">提交</el-button>
                <el-button type="reset" @click="quitAdd" size="small" class="reset" :disabled="disabled">取消</el-button>
            </div>
        </template>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import PlatformMixins from '~/mixins/platform';
    import MessageMixins from '~/mixins/messages';
    import QuitMixins from '~/mixins/quit';
    import {routesMapping} from '~/router';
    import FaHuoRenInfo from '~/components/common/FaHuoRenInfo';
    export default{
        name: 'AddSupplier',
        mixins: [PlatformMixins, QuitMixins, MessageMixins],
        components: {FaHuoRenInfo},
        data () {
            return {
                newSupplier: {
                    vendorSeqNo: '',
                    vendorNumber: '',
                    vendorName: '',
                    dataStatus: 2,
                    comments: '',
                    addressList: []
                },
                addressList: [],
                newAddressList: [],
                loading: false,
                supplierList: [],
                searchContent: '',
                disabled: false
            };
        },
        methods: {
            ...mapActions(['addSupplier', 'queryAllSupplierList', 'showPageLoading',
                'hidePageLoading', 'querySupplierBaseDetail']),
            clearSupplier () {
                this.supplierList = [];
                this.newSupplier.vendorSeqNo = '';
                this.newSupplier.vendorName = '';
                this.newSupplier.vendorNumber = '';
            },
            remoteMethod (str) {
                if (str.length > 0) {
                    this.loading = true;
                    let params = {
                        searchContent: str,
                        isPage: false
                    }
                    this.queryAllSupplierList(params).then(resp => {
                        this.supplierList = resp.vendorList;
                        this.loading = false;
                    }).catch(resp => {
                        this.clearSupplier();
                        this.loading = false;
                    });
                } else {
                    this.clearSupplier();
                }
            },
            querySupplierDetail (val) {
                if (val) {
                    this.querySupplierBaseDetail({vendorNumber: val}).then(resp => {
                        this.newSupplier.vendorSeqNo = resp.vendorSeqNo;
                        this.newSupplier.vendorName = resp.vendorName;
                        this.newSupplier.vendorNumber = resp.vendorNumber;
                    });
                }
            },
            getFaHuoRenInfo (data) {
                this.newAddressList = data;
            },
            quitAdd () {
                this.disabled = true;
                this.showPageLoading();
                this.showSuccess('已取消');
                setTimeout(() => {
                    this.disabled = false;
                    this.quit(routesMapping.SupplierManagement);
                    this.hidePageLoading();
                }, 2000);
            },
            getStrLength (data, len) {
                if (data.length > len) {
                    return data.substr(0, len);
                } else {
                    return data;
                }
            },
            submit () {
                this.disabled = true;
                this.showPageLoading();
                if (!this.newSupplier.vendorSeqNo) {
                    this.showError('请选择供应商！');
                    this.hidePageLoading();
                    this.disabled = false;
                    return false;
                } else {
                    this.doAdd();
                }
            },
            doAdd () {
                this.newSupplier.addressList = this.newAddressList;
                this.addSupplier(this.newSupplier).then(resp => {
                    this.showSuccess('添加成功');
                    let THIS = this;
                    window.setTimeout(function () {
                        THIS.disabled = false;
                        THIS.quit(routesMapping.SupplierManagement);
                        THIS.hidePageLoading();
                       }, 1000);
                }).catch(res => {
                    this.hidePageLoading();
                    this.disabled = false;
                })
            },
        }
    }
</script>

<style lang="scss">

    .addSupplier {
        height: 100%;
        background-color: #fff;
        position: relative;
        margin: 0px 30px;
        .search-supplier {
            background-color: #f6f7fb;
            padding-left: 30px;
            label {
                margin-right: 8px;
            }

            .el-select .el-input input{
                font-size: 14px;
            }
        }
        .area-select.large {
            width: 300px;
        }
        .el-input__inner {
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
    .reset-tooltip-right-color{
        color: #888;
    }
</style>
