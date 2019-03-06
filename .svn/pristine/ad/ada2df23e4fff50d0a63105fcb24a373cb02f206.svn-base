/**
* 收货信息
* disabled：true or false，是否禁止选择
* labelWidth： label的宽度
* buttonName： 保存按钮的名称
**/
<template>
    <div class="receivingInformation">
        <el-form :model="ReceivingInformationParams" :rules="ReceivingInformationRules" :label-width="labelWidth" ref="ReceivingInformationParams" label-position="left">
            <div>
                <div class="displayStyle">
                    <el-form-item label="联系人：" prop="linkMan">
                        <el-input
                            :maxlength="16"
                            v-model="ReceivingInformationParams.linkMan"
                            placeholder="请输入联系人"
                            class="col_width linkMan"
                            :disabled="disabled">
                        </el-input>
                    </el-form-item>
                </div>
                <div class="displayStyle">
                    <el-form-item label="联系电话：" prop="phone">
                        <el-input
                            v-model="ReceivingInformationParams.phone"
                            :maxlength='12'
                            placeholder="请输入联系电话"
                            class="col_width phone"
                            :disabled="disabled">
                        </el-input>
                    </el-form-item>
                </div>
            </div>
            <div>
                <div class="displayStyle">
                    <el-form-item label="所在地区：" prop="region">
                        <el-cascader
                            :options="datas"
                            placeholder="请选择区域"
                            :change-on-select="true"
                            v-model="ReceivingInformationParams.region"
                            :props="{value: 'code', label: 'name', children: 'children'}"
                            :before-filter='changeRegion'
                            :clearable="false"
                            class="col_width region"
                            :disabled="disabled">
                        </el-cascader>
                    </el-form-item>
                </div>
            </div>
            <div>
                <div class="displayStyle">
                    <el-form-item label="详细地址：" prop="address">
                        <el-input
                            v-model="ReceivingInformationParams.address"
                            placeholder="请输入详细地址"
                            :maxlength='199'
                            class="col_width2 address"
                            :disabled="disabled">
                        </el-input>
                    </el-form-item>
                </div>
            </div>
            <div>
                <el-button @click="submit" class="saveAdd">{{ buttonName }}</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import api from '~/utils/api.js'
import {mapActions, mapState} from 'vuex';
export default {
    name: 'creaeteSalesOrder',
    data() {
        const validatorLinkTel = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('输入联系电话'))
            } else if (!value || !/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(value)) {
                return callback(new Error('请正确输入联系电话'))
            } else {
                return callback();
            }
        }
        return {
            // 新增收货地址参数
            ReceivingInformationParams: {
                linkMan: '',
                phone: '',
                region: [],
                regionName: [],
                address: '',
                isDefault: '0',
            },
            // 新增收货地址校验
            ReceivingInformationRules: {
                linkMan: [
                    { required: true, message: '请输入联系人', trigger: 'blur' },
                    {  max: 15, message: '长度不超过16个字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, validator: validatorLinkTel, trigger: 'blur' },
                ],
                region: [
                    { required: true, message: '请选择收货地址', trigger: 'change', type: 'array' },
                ],
                address: [
                    { required: true, message: '请输入详细地址', trigger: 'blur' },
                    {  max: 199, message: '长度不超过200个字符', trigger: 'blur' }
                ]
            },
            // 省市区数据
            datas: [],
            // 最大几级
            maxLevel: 3,
            // 省市区暂存对比
            checkedItemsFull: [null, null, null],
            regionDisabled: false
        }
    },
    methods: {
        ...mapActions(['queryProvinceCityArea']),
        // 提交收貨地址
        submit() {
            this.$refs['ReceivingInformationParams'].validate((valid) => {
                if (valid) {
                    this.$emit('submit', this.ReceivingInformationParams)
                } else {
                    return false;
                }
            })
        },
        // 重置校验表单
        clearForm(name) {
            this.$refs[name].clearValidate();
        },
        // 重置表单
        resetForm(name) {
            this.$refs[name].resetFields();
        },
        // 省市区
        // 保存省市区数据
        saveData(result, datas) {
            if (result) {
                let _data = result || null
                if (_data === null || !_data.length) {
                    _data = result
                    this.ReceivingInformationParams.region = [_data.code]
                    this.checkedItemsFull = [null, null, _data.code]
                    _data = [Object.assign({ level: this.maxLevel }, _data)]
                }
                if (_data !== null || _data.length) {
                    if (_data[0].level < this.maxLevel) {
                        _data.forEach((x) => {
                            if (x.children === undefined) {
                                x.children = []
                            }
                        })
                    }
                    if (this.ReceivingInformationParams.region.length && datas) {
                        datas.children = _data
                    } else {
                        this.datas = _data
                    }
                }
                this.$emit('region', this.checkedItemsFull, this.ReceivingInformationParams.regionName)
            }
        },
        // 请求省市区数据
        async getData({ params = { code: '', level: 1 }, datas } = {}) {
            return api.queryProvinceCityArea(params).then((response) => {
                if (response) {
                  this.saveData(response, datas)
                  return response
                }
            })
        },
        // 省市区选中后
        async changeRegion(val) {
            let datas = this.datas
            this.checkedItemsFull = [null, null, null]
            for (let i = 0; i < val.length; i++) {
                if (val[i] == null || val[i] === '') {
                    continue
                }
                const itemIndex = datas.findIndex((data) => {
                    return Number(data.code) === Number(val[i])
                })
                const pos = datas[itemIndex].level + 2 - this.maxLevel
                this.$set(this.checkedItemsFull, pos, val[i])
                this.$set(this.ReceivingInformationParams.regionName, pos, datas[itemIndex].name)
                if (datas[itemIndex].level < this.maxLevel && (datas[itemIndex].children === undefined || (datas[itemIndex].children && !datas[itemIndex].children.length))) {
                    const result = await this.getData({ params: { code: val[i], level: pos + 2 }, datas: datas[itemIndex] })
                    datas = result
                } else {
                    datas = datas[itemIndex].children
                }
            }
        }
    },
    props: {
        disabled: {
            type: Boolean,
            default() {
                return false
            }
        },
        labelWidth: {
            type: String,
            default() {
                return '110px'
            }
        },
        buttonName: {
            type: String,
            default() {
                return '保存地址'
            }
        }
    },
    watch: {
        'ReceivingInformationParams.region': {
            handler: function (val) {
                this.changeRegion(val)
            },
            deep: true
        }
    },
    mounted() {
        this.getData()
    }
}
</script>

<style lang="scss" scoped>
.receivingInformation {
    width: 100%;
    height: 100%;
    .displayStyle {
        display: inline-block;
        padding-left: 25px;
        .col_width{
            width: 300px;
            height: 36px;
        }
        .col_width2{
            width: 740px;
            height: 36px;
        }
    }
    .saveAdd.el-button {
        border: 1px solid #D4E6FF;
        color: #3B8CFF;
        margin-left: 135px;
        &:focus, &:hover {
            background-color: transparent;
        }
    }
}
</style>
