<template>
    <div class="create-storehouse">
        <div style="width:100%; height: 10px; background-color: #E9EEF1"></div>
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper">
                <el-form :model="createForm" label-width="111px" label-position="left" :rules="rules" ref="createStockForm">
                    <div v-if="storehouseType == 2">
                        <div style="display: inline-block;position:relative">
                            <el-form-item label="货主" required>
                                <el-input size="small" v-model.trim="iotStorehouseVest" style="width: 300px" :maxlength="4" placeholder="请输入货主编码(4个字符以内)"
                                          @keyup.native="iotStorehouseVest = getStrLength(iotStorehouseVest, 4)"></el-input>
                            </el-form-item>
                        </div>
                        <el-tooltip effect="light" content="货主、物流仓编码、库存地点由线下告知，输入后进行系统验证" placement="right">
                            <i class="iconfont1 icon-wenhao fs16 ml5"></i>
                        </el-tooltip>

                        <div style="border-bottom: 1px solid #e5e5e5;padding-bottom:5px; margin-bottom: 15px;">
                            <div style="display: inline-block">
                                <el-form-item label="物流仓编码:" required>
                                    <el-input size="small" v-model.trim="externalStorehouseNo" style="width: 300px" :maxlength="3" placeholder="请输入中移物流仓编码(3个字符以内)"
                                              @keyup.native="externalStorehouseNo = getStrLength(externalStorehouseNo, 3)"></el-input>
                                </el-form-item>
                            </div>
                            <div style="display: inline-block; margin-left: 30px;">
                                <el-form-item label="库存地点:" required>
                                    <el-input size="small" v-model.trim="externalStorehouseSite" style="width: 300px" :maxlength="4" placeholder="请输入库存地点编码(4个字符以内)"
                                              @keyup.native="externalStorehouseSite = getStrLength(externalStorehouseSite, 4)"></el-input>
                                </el-form-item>
                            </div>
                            <el-button size="small" @click="searchCheck"
                                       style="margin-left: 10px;width: 60px; background-color: #f7f7f7">验证
                        </el-button>
                        </div>
                    </div>

                    <div style="position: relative">
                        <div style="display: inline-block">
                            <el-form-item label="仓库类型:" required style="width: 410px">
                                <el-select v-model="storehouseChildType" size="small" style="width: 300px;" placeholder="请选择">
                                    <el-option value="1" label="普通仓"></el-option>
                                    <el-option value="2" label="不良品仓"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <template v-if="storehouseChildType == 2">
                            <el-tooltip effect="light" content="新建不良品仓放置退换货场景的待验商品" placement="top">
                                <i class="iconfont1 icon-wenhao fs16 ml-5" style="position: absolute; margin-top: 12px;margin-left: 5px;"></i>
                            </el-tooltip>
                        </template>

                        <div style="display: inline-block; margin-left: 30px;">
                            <el-form-item label="仓库名称:" prop="storehouseName">
                                <el-input size="small" v-model.trim="createForm.storehouseName" style="width: 300px" :maxlength="20" placeholder="请输入仓库名称（20个字符以内）"
                                          @keyup.native="createForm.storehouseName = getStrLength(createForm.storehouseName,40)"></el-input>
                            </el-form-item>
                        </div>
                    </div>

                    <div>
                        <div style="display: inline-block">
                            <el-form-item label="仓库地址:" class="reset-form-label">
                                <address-select @selectAddress="selectAddress" v-if="!isClearAddress"></address-select>
                            </el-form-item>
                        </div>
                        <div style="display: inline-block; margin-left: 30px;">
                            <el-form-item label="详细地址:" class="reset-form-label" prop="storehouseAddress">
                                <el-input placeholder="请输入详细地址" size="small" v-model.trim="createForm.storehouseAddress" :maxlength="40"
                                          style="width: 300px"></el-input>
                            </el-form-item>
                        </div>
                    </div>

                    <template v-if="storehouseChildType == 1">
                        <div style="display: inline-block">
                            <el-form-item label="关联不良品仓:" class="reset-form-label">
                                <el-select v-model="relateStock" placeholder="请选择" size="small" style="width: 300px"
                                            @change="relateStockChange" key="不良">
                                    <el-option v-for="one in incommonStockList"
                                               :key="one.storehouseId" :value="one.storehouseId"
                                               :label="one.storehouseName"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <el-tooltip effect="light" content="该仓库发货订单对应的退换货商品返回关联的不良品仓" placement="right">
                            <i class="iconfont1 icon-wenhao fs16 ml5"></i>
                        </el-tooltip>
                    </template>
                    <template v-else>
                        <el-form-item label="关联普通仓" class="reset-form-label">
                            <el-select v-model="relateStockList" multiple placeholder="请选择" size="small"
                                       style="width: 300px" @change="relateStockListChange" key="良">
                                <el-option v-for="one in commonStockList"
                                           :key="one.storehouseId" :value="one.storehouseId"
                                           :label="one.storehouseName"></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-form>
            </div>
        </div>
        <div class="content">
            <relation-info @getLianXiRenInfo="getLianXiRenInfo"></relation-info>
        </div>
        <div class="btn-section">
            <el-button type="primary" @click="submit" size="small">提交</el-button>
            <el-button type="reset" @click="quit" size="small">取消</el-button>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import PlatformMixins from '~/mixins/platform'
    import QuitMixins from '~/mixins/quit'
    import MessageMixins from '~/mixins/messages';
    import {routesMapping} from '~/router'
    import AddressSelect from '~/components/common/AddressSelect'
    import RelationInfo from '~/components/common/LianXiRenInfo'
    export default{
        name: 'CreateStorehouse',
        mixins: [PlatformMixins, QuitMixins,MessageMixins],
        components: {AddressSelect, RelationInfo},
        data(){
            const checkName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入仓库名'));
                }
                let nameReg = /^[a-zA-Z0-9_\u4E00-\u9FA5]+$/
                let res = nameReg.test(value)
                if(!res){
                    callback(new Error('请输入正确的仓库名'));
                } else {
                    callback();
                }
            };
            const checkAddress = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入仓库详细地址'));
                }
                else if(value.length > 40){
                    callback(new Error('请输入小于40字地址'));
                } else {
                    callback();
                }
            };
            return {
                storehouseType: '',
                storehouseChildType: '1',
                iotStorehouseVest: '',
                externalStorehouseNo: '',
                externalStorehouseSite: '',
                createForm: {
                    storehouseType: '',
                    storehouseChildType: '1',
                    storehouseName: '',
                    provinceCode: '',
                    cityCode: '',
                    areaCode: '',
                    province: '',
                    city: '',
                    area: '',
                    storehouseAddress: '',
                    links: [],
                    releatedStorehouseList: []
                },
                rules: {
                    storehouseName: [{required: true, validator: checkName, trigger: 'change'}],
                    storehouseAddress: [{required: false, validator: checkAddress, trigger: 'change'}]
                },
                storehouseList: [],
                commonStockList: [],
                incommonStockList: [],
                relateStock: '',
                relateStockList: [],
                isClearAddress: false,
                checkExtStockStatus: 0, //0是初始值，1表示验证成功，2表示验证失败
//                createFormValidate: {
//                    storehouseName: [{required: true, message: "请输入仓库名称(最多20个汉字)", trigger: 'blur'}],
//                    selected: [{required: true, message: "请选择地区", trigger: 'blur'}],
//                    storehouseAddress: [{required: true, message: "请输入仓库名称(最多20个汉字)", trigger: 'blur'}],
//                },
                //    selected:['510000','510100','510104'],
                selected: []
            }
        },
        activated() {
            // 1本地仓，2中移物流仓
            this.storehouseType = this.$route.params.type
            this.createForm.storehouseType = this.storehouseType
            let params = {
                storehouseType: this.storehouseType
            }
            this.getStorehouseList(params).then(resp => {
                this.storehouseList = resp;
                this.commonStockList.splice(0, this.commonStockList.length)
                this.incommonStockList.splice(0, this.incommonStockList.length)
                this.commonStockList = this.storehouseList.filter(one => {
                    return one.storehouseChildType == 1
                })
                this.incommonStockList = this.storehouseList.filter(one => {
                    return one.storehouseChildType == 2
                })
            })
        },
        mounted(){
            // 1本地仓，2中移物流仓
            this.storehouseType = this.$route.params.type
            this.createForm.storehouseType = this.storehouseType
            let params = {
                storehouseType: this.storehouseType
            }
            this.getStorehouseList(params).then(resp => {
                this.storehouseList = resp;
                this.commonStockList.splice(0, this.commonStockList.length)
                this.incommonStockList.splice(0, this.incommonStockList.length)
                this.commonStockList = this.storehouseList.filter(one => {
                    return one.storehouseChildType == 1
                })
                this.incommonStockList = this.storehouseList.filter(one => {
                    return one.storehouseChildType == 2
                })
            })
        },
        watch: {
            storehouseChildType: function (nval, oval) {
                this.createForm.storehouseChildType = nval;
                this.clearData()
            }
        },
        methods: {
            ...mapActions(["createStorehouse", "getStorehouseList", "checkExtStorehouse","showPageLoading", "hidePageLoading"]),
            quitCreate(){
                this.quit(routesMapping.StorehouseConfig)
            },
            selectAddress(code, name){
                this.selected = code;
                this.createForm.provinceCode = code[0]
                this.createForm.cityCode = code[1]
                this.createForm.areaCode = code[2]
                this.createForm.province = name[0]
                this.createForm.city = name[1]
                this.createForm.area = name[2]
            },
            searchCheck(){
                if(this.externalStorehouseNo && this.externalStorehouseSite && this.iotStorehouseVest){
                    let params = {
                        storehouseNum: this.externalStorehouseNo,
                        storehouseSite: this.externalStorehouseSite,
                        storehouseType: this.storehouseType,
                        iotStorehouseVest: this.iotStorehouseVest
                    }
                    this.showPageLoading()
                    this.checkExtStorehouse(params).then(resp => {
                        this.showSuccess('校验成功')
                        this.checkExtStockStatus = 1;
                        this.hidePageLoading()
                    }).catch(e => {
                        this.showError(e.msg)
                        this.checkExtStockStatus = 2;
                        this.hidePageLoading()
                    })
                }else{
                    this.showWarning('请完成所需必填字段')
                }
            },
            getStrLength(data, len){
                if (data.length > len) {
                    return data.substr(0, len)
                } else {
                    return data
                }
            },
            relateStockChange(data){
                this.createForm.releatedStorehouseList = []
                this.createForm.releatedStorehouseList.push(data)
            },
            relateStockListChange(data){
                this.createForm.releatedStorehouseList = data
            },
            getLianXiRenInfo(data){
                this.createForm.links = data;
            },
            isAllDataComplete(){
                const data = this.createForm
                if(this.storehouseType == 1){
                    if (this.storehouseChildType && data.storehouseName) {
                        return true;
                    } else {
                        return false;
                    }
                }else if(this.storehouseType == 2){
                    this.createForm.externalStorehouseNo = this.externalStorehouseNo
                    this.createForm.externalStorehouseSite = this.externalStorehouseSite
                    this.createForm.iotStorehouseVest = this.iotStorehouseVest
                    if (this.storehouseChildType && data.storehouseName && data.externalStorehouseSite
                        && data.externalStorehouseNo && data.iotStorehouseVest) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            isExtCheckOk(){
                if(this.storehouseType == 1){
                    return true;
                }
                if(this.checkExtStockStatus == 0){
                    this.showWarning('请先校验货主、物流仓库编码和地点信息')
                    return false
                }else if(this.checkExtStockStatus != 1){
                //    this.showWarning('货主、物流仓库编码和地点信息校验错误，请重新输入并校验')
                //    return false
                    return true
                }else{
                    this.createForm.externalStorehouseNo = this.externalStorehouseNo
                    this.createForm.externalStorehouseSite = this.externalStorehouseSite
                    return true
                }
            },
            submit(){
                if(!this.isAllDataComplete()) {
                    this.showWarning('请完成所需必填字段')
                    return false;
                }
                if(!this.isExtCheckOk()){
                    return false;
                }
                this.$refs["createStockForm"].validate( valid => {
                    if(!valid){
                        return false
                    }else{
                        this.showPageLoading()
                        this.createStorehouse(this.createForm).then(resp => {
                            this.showSuccess()
                            this.hidePageLoading()
                            let THIS = this
                            window.setTimeout(function () {
                                THIS.quitCreate();
                                THIS.clearData()
                            }, 1000)
                        }).catch(res => {
                            this.hidePageLoading()
                        })
                    }
                })
            },
            clearData(){
                this.isClearAddress = true
                this.createForm.storehouseName = ''
                this.createForm.storehouseAddress = ''
                this.externalStorehouseNo = ''
                this.externalStorehouseSite = ''
                this.createForm.storehouseAddress = ''
                this.relateStock = ''
                this.relateStockList.splice(0,this.relateStockList.length)
                this.$nextTick( () => {
                    this.isClearAddress = false
                })
            }
        }
    }
</script>

<style lang="scss">
    .create-storehouse {
        margin: 0 30px;
        height: 100%;
        position: relative;
        background-color: #fff;
        .main-wrapper {
            width: 100%;
            height: 100%;
        }
        .area-select {
            vertical-align: middle;
        }
        .area-select.large {
            width: 300px;
        }
    }
</style>
