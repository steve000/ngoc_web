<template>
    <div class="edit-storehouse">
        <div style="width:100%; height: 10px; background-color: #E9EEF1"></div>
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper">
                <el-form label-position="left" label-width="110px" :model="editStorehouse" :rules="rules"
                         ref="editStorehouse">

                    <div v-if="editStorehouse.storehouseType==2"> <!-- 中移物流仓 -->
                        <el-form-item label="货主：">
                            <el-input v-model="editStorehouse.externalStorehouseInfo.iotStorehouseVest" size="small"
                                      :disabled="true" style="width: 300px"></el-input>
                        </el-form-item>
                        <div style="border-bottom: 1px solid #e5e5e5;padding-bottom:5px; margin-bottom: 15px;">
                            <div style="display: inline-block">
                                <el-form-item label="物流仓编码：">
                                    <el-input v-model="editStorehouse.externalStorehouseInfo.extStorehouseNum" size="small"
                                              :disabled="true" style="width: 300px"></el-input>
                                </el-form-item>
                            </div>
                            <div style="display: inline-block; margin-left: 30px">
                                <el-form-item label="库存地点：">
                                    <el-input v-model="editStorehouse.externalStorehouseInfo.extStorehouseSite" size="small"
                                              :disabled="true" style="width: 300px"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>


                    <div>
                        <div style="display: inline-block">
                            <el-form-item label="仓库编号：">
                                <el-input v-model="editStorehouse.storehouseId" size="small" style="width: 300px"
                                          :disabled="true"></el-input>
                            </el-form-item>
                        </div>
                        <div style="display: inline-block; margin-left: 30px;">
                            <el-form-item label="状态：">
                                <el-select v-model="editStorehouse.status" size="small" style="width: 300px;" placeholder="请选择" disabled>
                                    <el-option :value="0" label="启用"></el-option>
                                    <el-option :value="1" label="禁用"></el-option>
                                    <el-option :value="2" label="删除"></el-option>
                                    <el-option :value="3" label="盘点冻结"></el-option>
                                    <el-option :value="4" label="锁定"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>

                    <div>
                        <div style="display: inline-block">
                            <el-form-item label="仓库类型："  style="width: 410px">
                                <el-select v-model="storehouseTypeFlag" size="small" style="width: 300px;" placeholder="请选择" disabled>
                                    <el-option value="11" label="本地普通仓"></el-option>
                                    <el-option value="12" label="本地不良品仓"></el-option>
                                    <el-option value="21" label="中移物流普通仓"></el-option>
                                    <el-option value="22" label="中移物流不良品仓"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div style="display: inline-block; margin-left: 30px;">
                            <el-form-item label="仓库名称：">
                                <el-input v-model="editStorehouse.storehouseName" size="small" style="width: 300px"
                                          :disabled="true"></el-input>
                            </el-form-item>
                        </div>
                    </div>

                    <el-row v-if="editStorehouse.storehouseChildType=='2'">  <!--  不良品仓 -->
                        <el-col :span="8">
                            <el-form-item label="关联普通仓：" style="width: 855px">
                                <el-table :data="editStorehouse.storehouseList" width="100%" border>
                                    <el-table-column label="仓库名称" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.storehouseName">
                                                {{scope.row.storehouseName}}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="仓库编号" min-width="110">
                                        <template slot-scope="scope">
                                            <div class="row-show" :title="scope.row.storehouseSite">
                                                {{scope.row.storehouseId}}
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div v-if="editStorehouse.storehouseChildType=='1'">  <!-- 普通仓 -->
                        <div style="display: inline-block">
                            <el-form-item label="不良品仓名称：">
                                <el-input v-model="editStorehouse.inspectStorehouse.storehouseName" size="small" style="width: 300px"
                                          :disabled="true"></el-input>
                            </el-form-item>
                        </div>
                        <div style="display: inline-block; margin-left: 30px;">
                            <el-form-item label="不良品仓编号：">
                                <el-input v-model="editStorehouse.inspectStorehouse.storehouseId" size="small" style="width: 300px"
                                          :disabled="true"></el-input>
                            </el-form-item>
                        </div>
                    </div>

                    <div>
                        <div style="display: inline-block" v-if="selected.length == 3">
                            <el-form-item label="仓库地址：">
                                <address-select @selectAddress="selectAddress"  :type="1" :curAddress="selected"></address-select>
                            </el-form-item>
                        </div>
                        <div style="display: inline-block;margin-left: 30px;">
                            <el-form-item label="详细地址：">
                                <el-input v-model.trim="editStorehouse.storehouseAddress" size="small" style="width: 300px"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="content">
                <relation-info @getLianXiRenInfo="getLianXiRenInfo"
                               :relationList="editStorehouse.links"
                               :isEditStorehouse="true"
                               @deleteStorehouseLink="deleteStorehouseLinkFunction"
                               @modifyStorehouseLink="modifyStorehouseLinkFunction"
                               @addStorehouseLink="addStorehouseLinkFunction"
                ></relation-info>
        </div>
        <div class="btn-section pt20">
            <el-button type="primary" size="small" @click="modifyStorehouseFunction">提交</el-button>
            <el-button class="reset" size="small" @click="quit(routesMapping.StorehouseConfig)">取消</el-button>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import PlatformMixins from '~/mixins/platform';
    import QuitMixins from '~/mixins/quit';
    import AddressSelect from '~/components/common/AddressSelect'
    import RelationInfo from '~/components/common/LianXiRenInfo'
    import MessageMixins from '~/mixins/messages';
    export default {
        components: {
            AddressSelect,
            RelationInfo
        },
        name: 'EditStorehouse',
        data () {
            return {
                rules: {},
                editStorehouse: {
                    externalStorehouseInfo: {},
                    inspectStorehouse: {},
                    storehouseList: [],
                },
                selected: [],
                selectedName: [],
                storehouseId: '',
                storehouseTypeFlag: ''
            }
        },
        mixins: [PlatformMixins, QuitMixins,MessageMixins],
        activated(){
            this.storehouseId = this.$route.params.storehouseId;
            this.queryStorehouseByIdFunction({storehouseId: this.storehouseId});
        },
        mounted(){
            this.storehouseId = this.$route.params.storehouseId;
            this.queryStorehouseByIdFunction({storehouseId: this.storehouseId});
        },
        methods: {
            ...mapActions(["queryStorehouseById", 'modifyStorehouseLink', 'deleteStorehouseLink',
                'modifyStorehouse', 'addStorehouseLink', "showPageLoading", "hidePageLoading"]),
            queryStorehouseByIdFunction(param){
                this.queryStorehouseById(param).then((res) => {
                    res.storehouseListValue = [];
                    res.inspectStorehouseValue = [];
                    res.storehouseChildType = String(res.storehouseChildType);
                    this.editStorehouse = res;
                    this.storehouseTypeFlag = res.storehouseType + '' + res.storehouseChildType
                    this.selected = [res.provinceCode, res.cityCode, res.areaCode]
                    this.selectedName = [res.province, res.city, res.area]
                })
            },
            selectAddress(code, name){
                this.selected = code;
                this.selectedName = name;
            },
            getLianXiRenInfo(data){
                this.editStorehouse.links = data;
            },
            deleteStorehouseLinkFunction(link, data, index){
                this.deleteStorehouseLink({
                    storehouseId: this.storehouseId,
                    linkSeqNo: link.linkSeqNo
                }).then((res) => {
                    this.showSuccess('删除成功')
                    this.editStorehouse.links = data;
                    this.editStorehouse.links.splice(index, 1);
                    this.queryStorehouseByIdFunction({storehouseId: this.storehouseId});
                })
            },
            modifyStorehouseLinkFunction(link, data, index){
                link.storehouseId = this.storehouseId;
                this.modifyStorehouseLink(link).then((res) => {
                    this.showSuccess('修改成功')
                    this.editStorehouse.links = data;
                    this.editStorehouse.links.splice(index, 1, {...link});
                    this.queryStorehouseByIdFunction({storehouseId: this.storehouseId});
                });
            },
            addStorehouseLinkFunction(link, data){
                link.storehouseId = this.storehouseId;
                this.addStorehouseLink(link).then((res) => {
                    this.showSuccess('新增成功')
                    this.editStorehouse.links = data;
                    this.editStorehouse.links.unshift(link);
                    this.queryStorehouseByIdFunction({storehouseId: this.storehouseId});
                })
            },
            modifyStorehouseFunction(){
                let params = {
                    storehouseAddress: this.editStorehouse.storehouseAddress,
                    provinceCode: this.selected[0],
                    cityCode: this.selected[1],
                    areaCode: this.selected[2],
                    storehouseId: this.storehouseId,
                    province: this.selectedName[0],
                    city: this.selectedName[1],
                    area: this.selectedName[2]
                }
                this.showPageLoading()
                this.modifyStorehouse(params).then((res) => {
                    this.showSuccess('修改成功')
                    this.hidePageLoading()
                    this.quit(this.routesMapping.StorehouseConfig);
                }).catch(res => {
                    this.hidePageLoading()
                })
            }
        }
    }
</script>

<style lang="scss">
    .edit-storehouse {
        margin: 0px 30px;
        height: 100%;
        background-color: #fff;
    }
</style>
