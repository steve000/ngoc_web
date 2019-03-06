<template>
    <div class="view-storehouse" :key="flag">
        <div class="view-module">
            <div class="view-title-section">
                <div class="name" style="display: block">{{storehouseInfo.storehouseName}}</div>
                <div v-if="storehouseInfo.storehouseType == 2">
                    <div class="label"><span>货主 : </span>{{externalStorehouseInfo.iotStorehouseVest}}</div>
                    <div class="label"><span>物流仓编码 : </span>{{externalStorehouseInfo.extStorehouseNum}}</div>
                    <div class="label"><span>库存地点 : </span>{{externalStorehouseInfo.extStorehouseSite}}</div>
                </div>
                <div class="label"><span>状态 :</span> {{getStorehouseStatus(storehouseInfo.status)}}</div>
                <div class="label"><span>仓库编号 :</span> {{storehouseInfo.storehouseId}}</div>
                <div class="label"><span>仓库类型 :</span> {{getStorehouseType}}</div>
                <div class="label"><span>仓库地址 :</span> {{getStorehouseAddress}}</div>
            </div>
            <div class="view-btn-section">
                <el-tooltip effect="light" content="编辑" placement="right" @click="">
                    <span class="editIcon" @click="nextToEdit()"><i class="el-icon-edit"></i></span>
                </el-tooltip>
            </div>
            <div class="view-table-section">
                <el-tabs v-model="activeName" type="card">
                    <template v-if="storehouseInfo">
                        <template v-if="storehouseInfo.storehouseChildType == 1" >
                            <el-tab-pane label="关联不良品仓" name="first" key="first" @click="onclick('first')">
                                <div class="table-content" key="1">
                                    <el-table :data="inspectStorehouse" stripe style="width: 100%">
                                        <el-table-column prop="storehouseId" label="不良品仓编号"></el-table-column>
                                        <el-table-column prop="storehouseName" label="不良品仓名称"></el-table-column>
                                    </el-table>
                                </div>
                            </el-tab-pane>
                        </template>
                        <template v-else >
                            <el-tab-pane label="关联普通仓" name="first" key="second" @click="onclick('second')">
                                <div class="table-content" key="2">
                                    <el-table :data="storehouseList" stripe style="width: 100%">
                                        <el-table-column prop="storehouseId" label="普通仓编号"></el-table-column>
                                        <el-table-column prop="storehouseName" label="普通仓名称"></el-table-column>
                                    </el-table>
                                </div>
                            </el-tab-pane>
                        </template>
                        <el-tab-pane label="联系信息" name="third" key="third" @click="onclick('third')">
                            <div class="table-content" key="3">
                                <el-table :data="storehouseInfo.links" stripe style="width: 100%">
                                    <el-table-column prop="linkman" label="联系人"></el-table-column>
                                    <el-table-column prop="phone" label="联系电话"></el-table-column>
                                    <el-table-column prop="email" label="邮箱"></el-table-column>
                                </el-table>
                            </div>
                        </el-tab-pane>
                    </template>

                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex"
    export default{
        name: "ViewStorehouse",
        props: {
            flag: String, operationId: String
        },
        data(){
            return {
                storehouseInfo: '',
                inspectStorehouse: [],
                externalStorehouseInfo: [],
                storehouseList: [],
                activeName: "first",
            }
        },
        computed: {
            getStorehouseType(){
                if (this.storehouseInfo) {
                    let name1 = '', name2 = '';
                    if (this.storehouseInfo.storehouseType == 1) {
                        name1 = "本地"
                    } else {
                        name1 = "中移物流"
                    }
                    if (this.storehouseInfo.storehouseChildType == 1) {
                        name2 = "普通仓"
                    } else {
                        name2 = "不良品仓"
                    }
                    return name1 + name2
                }
            },
            getStorehouseAddress(){
                if(this.storehouseInfo){
                    let res = this.storehouseInfo
                    if(res.city != '市辖区' && res.city != '县'){
                        return res.province + res.city + res.area + res.storehouseAddress
                    }else{
                        return res.province + res.area + res.storehouseAddress
                    }
                }
            }
        },
        watch: {
            flag: function (nval, oval) {
               this.refreshPage()
            },
            operationId: function (nval, oval) {
                this.refreshPage()
            },
            activeName: function (nval, oval) {

            }
        },
        activated() {
            this.refreshPage()
        },
        mounted(){
            this.refreshPage()
        },
        methods: {
            ...mapActions(["queryStorehouseById","showPageLoading","hidePageLoading"]),
            refreshPage(){
                this.showPageLoading()
                this.queryStorehouseById({storehouseId: this.flag}).then(resp => {
                    this.hidePageLoading()
                    this.storehouseInfo = resp;
                    this.storehouseList = resp.storehouseList;
                    this.externalStorehouseInfo = resp.externalStorehouseInfo
                    this.inspectStorehouse = [resp.inspectStorehouse]
                }).catch(res => {
                    this.hidePageLoading()
                })
            },
            onclick(data){
                this.$message({
                    type: 'info',
                    message: data
                })
            },
            nextToEdit(){
                this.$router.push({name: 'EditStorehouse', params: {storehouseId: this.flag}});
            },
            getStorehouseStatus(status){
                let res = ''
                switch(status){
                    case 0:
                        res = "启用";
                        break;
                    case 1:
                        res = "禁用";
                        break;
                    case 2:
                        res = "删除";
                        break;
                    case 3:
                        res = "盘点冻结";
                        break;
                    case 4:
                        res = "锁定";
                        break;
                }
                return res;
            },

        }
    }
</script>

<style lang="scss">
    .view-storehouse {

    }
</style>
