<!--
/*
    省市区三级地址选择组件，依次选择省市区后触发emit('selectAddress',address)
    传入参数：   type，值1或2; 1代表curAddress数组是省市区code; 2代表curAddress数组是省市区名称； 默认为2，非必填
                curAddress数组，内容是[省名称，市名称，区名称],非必填, 默认为空;
                isClear, 为true时清空列表，默认为false, 非必填
    返回： emit('selectAddress',addressCode,addressName); selectAddress是方法，
                                addressCode是返回的三级地址：省市区的code码数组
                                addressName是返回的三级地址：省市区的名称数组
*/
-->
<template>
    <div class="address-select">
        <el-form :model="address" :rules="rules" ref="addressSelect">
            <el-form-item prop="province" style="display: inline-block">
                <el-select
                    size="small"
                    v-model="address.province"
                    class="address-select-width"
                    @change="choseProvince"
                    :placeholder="'省级地区'">
                    <el-option
                        v-for="(item,index) in provinceList"
                        :key="item.provinceCode"
                        :label="item.province"
                        :value="index + 1">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item prop="city" style="display: inline-block">
                <el-select
                    size="small"
                    :disabled="!address.province"
                    v-model="address.city"
                    class="address-select-width"
                    @change="choseCity"
                    :placeholder="'市级地区'">
                    <el-option
                        v-for="(item,index) in cityList"
                        :key="item.cityCode"
                        :label="item.city"
                        :value="index + 1">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item prop="area" style="display: inline-block">
                <el-select
                    size="small"
                    :disabled="!address.city"
                    v-model="address.area"
                    class="address-select-width"
                    @change="choseArea"
                    :placeholder="'区级地区'">
                    <el-option
                        v-for="(item,index) in areaList"
                        :key="item.areaCode"
                        :label="item.area"
                        :value="index + 1">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    export default{
        name: "AddressSelect",
        props: {
            curAddress: {
                type: Array,
                required: false
            },
            type: {
                type: Number,
                required: false,
                default: 2
            },
            isClear: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data(){
            return {
                address: {
                    province: '',
                    city: '',
                    area: '',
                },
                rules: {
                    province: [{required: true, message: '请选择省份'}],
                    city: [{required: true, message: '请选择市'}],
                    area: [{required: true, message: '请选择区'}],
                },
                provinceList: [],
                cityList: [],
                areaList: [],
                isClick: true,
            }
        },
        watch:{
            isClear: function (nval, oval) {
                if(nval){
                    this.clearData()
                }
            }
        },
        mounted(){
            if (this.curAddress && this.curAddress.length == 3) {
                this.isClick = false;
            }
            this.queryProvinceList().then(resp => {
                this.provinceList.splice(0, this.provinceList.length)
                this.provinceList = resp;
                if (!this.isClick) {
                    let res = ''

                    if(this.type == 2){
                        res = this.provinceList.findIndex(one => {
                            return one.province == this.curAddress[0]
                        })
                    }else if(this.type == 1){
                        res = this.provinceList.findIndex(one => {
                            return one.provinceCode == this.curAddress[0]
                        })
                    }
                    if (res > -1) {
                        this.address.province = res + 1
                        this.choseProvince(res + 1)
                    }
                }
            })
        },
        methods: {
            ...mapActions(["queryProvinceList", "queryCityList", "queryAreaList"]),
            choseProvince(index){
                if (index > 0) {
                    let data = this.provinceList[index - 1]
                    this.queryCityList({provinceCode: data.provinceCode}).then(resp => {
                        this.cityList.slice(0, this.cityList.length)
                        this.cityList = resp;
                        if (!this.isClick) {
                            let res = ''
                            if(this.type == 2){
                                res = this.cityList.findIndex(one => {
                                    return one.city == this.curAddress[1]
                                })
                            }else if(this.type == 1){
                                res = this.cityList.findIndex(one => {
                                    return one.cityCode == this.curAddress[1]
                                })
                            }
                            if (res > -1) {
                                this.address.city = res + 1
                                this.choseCity(res + 1)
                            }
                        } else {
                            this.address.city = ''
                            this.address.area = ''
                            this.areaList.splice(0, this.areaList.length)
                            this.varify()
                        }
                    })
                }
            },
            choseCity(index){
                if (index > 0) {
                    let data = this.cityList[index - 1]
                    this.queryAreaList({cityCode: data.cityCode}).then(resp => {
                        this.areaList.slice(0, this.areaList.length)
                        this.areaList = resp
                        if (!this.isClick) {
                            let res = ''
                            if(this.type == 2){
                                res = this.areaList.findIndex(one => {
                                    return one.area == this.curAddress[2]
                                })
                            }else if(this.type == 1){
                                res = this.areaList.findIndex(one => {
                                    return one.areaCode == this.curAddress[2]
                                })
                            }
                            if (res > -1) {
                                this.address.area = res + 1
                                this.choseArea(res + 1)
                            }
                            this.isClick = true
                        } else {
                            this.address.area = ''
                            this.varify()
                        }
                    })
                }
            },
            choseArea(index){
                let res = this.address
                let addressCode = [this.provinceList[res.province - 1].provinceCode, this.cityList[res.city - 1].cityCode, this.areaList[res.area - 1].areaCode]
                let addressName = [this.provinceList[res.province - 1].province, this.cityList[res.city - 1].city, this.areaList[res.area - 1].area]
                this.$emit("selectAddress", addressCode, addressName)
            },
            varify(){
                this.$refs['addressSelect'].validate((valid) => {
                    if (!valid) {
                        return false
                    }
                })
            },
            clearVarify(){
                this.$refs['addressSelect'].resetFields();
            },
            clearData(){
                this.address.province = ''
                this.address.city = ''
                this.address.area = ''
                this.cityList.slice(0, this.cityList.length)
                this.areaList.slice(0, this.areaList.length)
                this.$emit("selectAddress",[],[])
            }
        }
    }
</script>

<style lang="scss">
    .address-select {
        .address-select-width{
            width: 97px;
        }
    }
</style>
