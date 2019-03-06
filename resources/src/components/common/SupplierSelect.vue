<!--/***供应商select选择器
**/-->
<template>
    <div class="supplier-select">
        <el-form-item label="供应商：">
            <el-select v-model="vendorSeqNo"
                       :filter-method="supplierFilter"
                       filterable
                       clearable
                       size="small"
                       @clear="dataClear()"
                       @change="dataChange(vendorSeqNo)"
                       :popper-class="'max-length'"
                       placeholder="供应商编号或者名称"
            >
                <el-option
                    v-for="item in supplierList"
                    :key="item.vendorSeqNo"
                    :label="item.vendorName"
                    :value="item.vendorSeqNo">
                </el-option>
            </el-select>
        </el-form-item>
    </div>
</template>

<script>
    import misc from '~/utils/misc';
    import {mapActions} from 'vuex'

    export default {
        name: "supplier-select",
        mounted() {
            this.getSupplierList()
        },
        data() {
            return {
                supplierList: [],
                supplierListTemp: [],
                vendorSeqNo: ""
            }
        },
        methods: {
            ...mapActions(['vendorQuerylistbyusergroupid']),
            supplierFilter(string) {//自定义搜索函数
                let length = misc.getLength(string);
                if (!string) {
                    return this.supplierList = this.supplierListTemp
                }
                if (length > 0 && length < 4) {
                    this.supplierList = [];
                    this.setSelectTips();
                } else {
                    this.supplierList = this.supplierListTemp.filter((item) => {
                        if ((item.vendorSeqNo && item.vendorSeqNo.toString().indexOf(string) >= 0) || (item.vendorName && item.vendorName.toString().indexOf(string) >= 0)) {
                            return item
                        }
                    });
                    if (this.supplierList.length <= 0) {
                        this.setSelectTipsDataNone();
                    }
                }
            },
            setSelectTipsDataNone() {
                setTimeout(() => {
                    let aa = document.getElementsByClassName("el-select-dropdown__empty")[0]
                    if (aa && aa.textContent) {
                        aa.textContent = "无数据"
                    }
                }, 50);
            },
            setSelectTips() {
                setTimeout(() => {
                    let aa = document.getElementsByClassName("el-select-dropdown__empty")[0];
                    if (aa && aa.textContent) {
                        aa.textContent = "请输入不少于4个字符查询条件"
                    }

                }, 50);
            },
            getSupplierList() {
                let datas = {
                    userGroupId: sessionStorage.getItem("entityId")
                }
                this.vendorQuerylistbyusergroupid(datas).then((resp) => {
                    if (resp.result && resp.result.length > 0) {
                        console.log("==" + resp.result)
                        this.supplierList = resp.result;
                        this.supplierListTemp = resp.result;
                    }
                })
            },
            dataClear() {
                this.vendorSeqNo = ''
            },
            dataChange() {
                this.$emit('SelectVavue', this.vendorSeqNo);
            },

        },
    }
</script>

<style lang="scss">


</style>
