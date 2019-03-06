<template>
    <div class="viewSupplier">
        <div class="view-module">
            <div class="view-title-section">
                <div class="name">{{viewSupplier.vendorName}}</div>
                <div class="label line-height"><label>供应商编号:</label> {{viewSupplier.vendorNumber}}</div>
                <div class="label line-height"><label>状态:</label> {{showDataStatus(viewSupplier.dataStatus)}}</div>
                <div class="comment "><label>备注信息:</label>{{viewSupplier.comments ? viewSupplier.comments : '--'}}</div>
            </div>
            <div class="view-btn-section">
                <el-tooltip effect="light" content="编辑" placement="right" @click="">
                    <span class="editIcon" @click="nextToEdit()"><i class="el-icon-edit"></i></span>
                </el-tooltip>
            </div>
            <div class="view-table-section">
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="发货信息" name="first">
                        <div class="table-content">
                                <el-table :data="addressList" stripe style="width: 100%">
                                    <el-table-column prop="linkman" label="发货人" width="150"></el-table-column>
                                    <el-table-column label="发货地址">
                                        <template slot-scope="scope">
                                            <span>{{getCompleteAddress(scope.$index)}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="phoneNum" label="联系电话"></el-table-column>
                                    <el-table-column label="邮箱">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.email}}</span>
                                            <el-button  type="text">
                                                <span v-if="scope.row.isDef == 1" class="showDef" style="right: 40px; cursor: auto">默认地址</span>
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import PlatformMixins from '~/mixins/platform'
    import QuitMixins from '~/mixins/quit'
    import {routesMapping} from '~/router'
    export default{
        name: "ViewSupplier",
        mixins: [PlatformMixins,QuitMixins],
        data(){
            return{
                viewSupplier: {},
                addressList: [],
                statusList: [{id: 1, name: '未启用'},{id: 2, name: '启用'}],
                supplierId: '',
                activeName: "first"
            }
        },
        activated() {
            this.supplierId = this.$route.params.id;
            this.queryGroupSupplierDetail({vendorSeqNo: this.supplierId}).then( resp => {
                this.viewSupplier = resp
                if(resp.addressList.length > 0 && resp.addressList[0].linkman){
                    this.addressList = resp.addressList.sort(this.compare)
                }else{
                    this.addressList = []
                }
            }).catch( error => {
                setTimeout( () => {
                    this.quitView()
                }, 2000)
            })
        },
        mounted(){
            this.supplierId = this.$route.params.id;
            this.queryGroupSupplierDetail({vendorSeqNo: this.supplierId}).then( resp => {
                this.viewSupplier = resp
                if(resp.addressList.length > 0 && resp.addressList[0].linkman){
                    this.addressList = resp.addressList.sort(this.compare)
                }else{
                    this.addressList = []
                }
            }).catch( error => {
                setTimeout( () => {
                    this.quitView()
                }, 2000)
            })
        },
        methods: {
            ...mapActions(["queryGroupSupplierDetail"]),
            quitView(){
                this.quit(routesMapping.SupplierManagement)
            },
            showDataStatus(status){
                if(status == 1){
                    return "未启用"
                }else if(status == 2){
                    return "启用"
                }
            },
            submit(){
                let id = this.supplierId;
                this.shiftPage(routesMapping.EditSupplier,{name: 'EditSupplier', params: {id: id}})
            },
            getCompleteAddress(index){
                let data = this.addressList[index]
                let aa = data.province + data.city + data.area + data.address
                if(aa == 0){
                    aa = ''
                }
                return aa
            },
            nextToEdit(){
                this.shiftPage('', `/config/supplier/edit/${this.supplierId}`)
            },
            compare(obj1, obj2){
                let val1 = obj1.isDef;
                let val2 = obj2.isDef;
                if(val1 < val2){
                    return -1;
                }else if(val1 > val2){
                    return 1;
                }else{
                    return 0;
                }
            },
        }
    }
</script>

<style lang="scss">
.viewSupplier{
    padding: 10px 30px 0;
    background-color: rgb(233,238,241);
    width: 100%;
    height: 100%;
}
</style>
