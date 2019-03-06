<template>
    <div class="entityConfig">
        <div class="left-section pull-left">
            <div class="add-section">
                <el-button type="primary" class="addButton" size="small" icon="iconfont1 icontianjia icon-tianjia" @click="showCreateEntity">新增业务实体</el-button>
            </div>
            <div class="menu-entity-container">
                <ul class="menu-entity">
                    <li class="menu-item" click = null :class="{'isactive': click == null}" @click="showEntity(null,'','')">
                       <div class="entity-first-title">
                           <i class="iconfont1 iconquanbu icon-quanbu"></i>
                           <span class="menu-btn-space">全部</span>
                       </div>
                    </li>
                    <li class="menu-item" v-for='(model,index) in entityConfig'>
                        <div @click="showEntity(index,model,'')" class="entity-child-title" :class="{'isactive': click == index }">
                            <div class="positionIcon" :class="{ 'isOpenPositionIcon': !model.showChild}" ></div>
                            <span :title="model.companyName"  class="row-show">{{model.companyName}}</span>
                        </div>
                        <ul class="menu-item-child" v-if="model.showChild">
                            <li :title="item.groupName" class="row-show" v-for="(item,n) in model.userGroupList" :key="n" :class="{'isactive': click == index+'_'+n }"  @click="showEntity(index+'_'+n,model,item)">
                                {{item.groupName}}
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="model-container">
            <Modal title="新增业务实体" v-model="createEntityDialog" width="660px" :okText="'保存'" :showCancelButton="false"
                   @save="onCreateEntity('createEntityForm')" @close="closeAddEntity('createEntityForm')">
                <el-form label-width="100px" :model="createEntityForm" :rules="rules" ref="createEntityForm">
                    <el-form-item label="实体名称: " prop="groupName">
                        <el-input size="small"  v-model="createEntityForm.groupName" placeholder="请输入实体名称，2~40个字以内"></el-input>
                    </el-form-item>
                    <el-form-item label="所属公司: " prop="companyId">
                        <el-select
                            style="width: 500px"
                            size="small"
                            popper-class="max-length"
                            v-model="createEntityForm.companyId" filterable placeholder="请选择"
                            class="row_width">
                            <el-option
                                v-for="item in companyList"
                                :key="item.companyId"
                                :label="item.companyName"
                                :value="item.companyId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注: " prop="remark" class="remark" >
                        <el-input type="textarea" v-model="createEntityForm.remark" :rows="3" placeholder="请输入备注，200字以内"></el-input>
                    </el-form-item>
                </el-form>
            </Modal>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <entity-list :flag="flagMsg"></entity-list>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex';
    import Modal from '~/components/common/Modal';
    import PlatformMixins from '~/mixins/platform';
    import {routesMapping} from '~/router';
    import EntityList from '~/components/system/EntityList';
    import MessageMixins from '~/mixins/messages';
    export default{
        name: "EntityConfig",
        mixins: [MessageMixins, PlatformMixins],
        components:{EntityList,Modal},
        data(){
            let validatorGroupNameLength = (rule, value, callback) => {
                if(value.length>40 || value.length<2){
                    return callback(new Error('请输入2~40个以内的字'));
                    return false
                }else{
                    return callback();
                }
            }
            let validatorRemark = (rule, value, callback) => {
                if(value.length>200){
                    return callback(new Error('请输入200个字'));
                    return false
                }else{
                    return callback();
                }
            }
            return {
                flashPage: '',
                flagMsg: {
                    bindingType:0
                },
                click: null,
                isactive:false,
                companyList:[],
                createEntityDialog:false,
                createEntityForm:{
                    groupName:'',
                    companyId:'',
                    remark:''
                },
                rules:{
                    groupName:[
                        {required: true, message: "请输入实体名称", trigger: 'change'},
                        {required: true, validator: validatorGroupNameLength, trigger: 'change'}],
                    companyId:[{required: true, message: "请选择公司", trigger: 'change'}],
                    remark:[{required: false, validator: validatorRemark, trigger: 'change'}],
                }
            }
        },

        computed: {
            ...mapState({
                entityConfig:({ entityConfig }) => {
                    return entityConfig.userGroupList
                },
            }),
        },
        mounted(){
            this.showEntity(null,'','');
            this.getEntityList();
            // this.getCompanyList();
        },
        methods: {
            ...mapActions(['queryConfigGroup','queryCompanyList','createEntity','showPageLoading','hidePageLoading']),
            getEntityList(){
                this.queryConfigGroup().then((resp)=>{});
            },
            getStrLength(data, len){
                if (data.length > len) {
                    return data.substr(0, len)
                } else {
                    return data
                }
            },
            showEntity(index,model,item){
                this.click = index;
                if(index==null){
                    this.flagMsg = {
                        bindingType : 0
                    }
                }
                if (model) {
                    model.showChild = !model.showChild;
                    this.$set(this.entityConfig,index,model);
                    this.flagMsg = {
                        bindingType :1,
                        companyId :model.companyId,
                        companyName:model.companyName,
                    };
                }
                if(item){
                    model.showChild = !model.showChild;
                    this.flagMsg = {
                        bindingType :1,
                        companyId :model.companyId,
                        userGroupId : item.userGroupId,
                        groupName:item.groupName,
                        companyName:model.companyName,
                    }
                }
            },
            closeAddEntity(formName){
                this.$refs[formName].resetFields();
                this.createEntityForm = {
                    groupName:'',
                    companyId:'',
                    remark:''
                }
            },
            //获取公司列表
            getCompanyList(){
                this.queryCompanyList().then((resp) => {
                    console.log(resp)
                    this.companyList = resp
                });
            },
            //创建业务实体
            showCreateEntity(){
                this.createEntityDialog =  true;
            },
            onCreateEntity(formName){
                this.$refs[formName].validate(valid=> {
                    if (valid) {
                        let length = this.createEntityForm.remark.length;
                        if(length>400){
                            this.showWarning('备注长度不能大于200汉字')
                            return false
                        }
                        // for(var p in params){
                        // 	(p && params[p]) ? params[p] = params[p].toString().trim() : ''
                        // }
                        var  params = {
                            groupName : this.createEntityForm.groupName.trim(),
                            companyId:this.createEntityForm.companyId,
                            remark:this.createEntityForm.remark.trim()
                        }
                        this.showPageLoading();
                        this.createEntity(params).then((resp) => {
                            this.hidePageLoading();
                            this.showSuccess("操作成功");
                            this.createEntityDialog = false;
                            this.getEntityList();
                            this.createEntityForm={
                                groupName:'',
                                companyId:'',
                                remark:''
                            }
                        })
                    }else{
                        this.showWarning('请先正确填写表单信息!')
                        return false
                    }
                })
            }
        }

    }
</script>
<style lang="scss">
    .entityConfig{
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        .left-section{
            .add-section {
                padding: 20px 0;
                .icontianjia{
                    margin-right: 8px;
                    margin-left: -6px;
                    margin-top: 1px;
                    font-size: 10px;
                    width: 10px;
                    height: 10px;
                    font-size: 12px;
                }
                .addButton {
                    display: flex;
                    margin: auto;
                    font-size: 12px;
                }
            }
            .menu-entity-container{
                width: 100%;
                height: 100%;
                overflow-y: auto;
                padding-bottom: 75px;
                .menu-entity{
                    font-size:14px;
                    .menu-item{
                        line-height: 44px;
                        cursor:pointer;
                        box-sizing: border-box;
                        .entity-first-title{
                            padding-left: 12px;
                        }
                        .entity-child-title{
                            padding-left: 47px;
                            /*color: #424E67;*/
                            font-weight: 600;
                            position: relative;
                            font-size: 12px;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                            .positionIcon{
                                position: absolute;
                                left:30px;
                                color: #B3BBCD;
                                top:18px;
                                width: 0px;
                                height: 0px;
                                border-width:0px 0px 8px 8px;
                                border-style:solid;
                                border-color:#B3BBCD transparent #B3BBCD  transparent;
                            }
                            .isOpenPositionIcon{
                                transform:rotate(-45deg);
                                -ms-transform:rotate(-45deg); 	/* IE 9 */
                                -moz-transform:rotate(-45deg); 	/* Firefox */
                                -webkit-transform:rotate(-45deg); /* Safari 和 Chrome */
                                -o-transform:rotate(-45deg); 	/* Opera */
                            }
                            .iconxiala{
                                font-size: 4px;
                                padding-right: 3px;
                            }
                            .iconarrow{
                                font-size: 12px;
                                color: #B3BBCD;
                                padding-right: 8px;
                            }
                            .iconRight{
                                font-size: 17px;
                                vertical-align: middle;
                                color: #B3BBCD;
                            }
                        }
                        .menu-item-child li{
                            padding-left: 54px;
                            font-size: 12px;
                            /*color: #424E67;*/
                        }
                    }
                    .isactive{
                        color: #3B8CFF;
                        background-color: #dde2e5;
                    }
                }
                .iconquanbu{
                    margin-left: 10px;
                    margin-right: 5px;
                }
            }

        }
        .main-section {
            .main-wrapper {
                .block-color {
                    width: 100%;
                    height: 100%;
                    background-color: #fff;
                    position: relative;
                }
            }
        }
        .model-container {
            height: auto;
        }
        .el-textarea__inner{
            border: 1px solid #E0E0E0;
            color: #333333;
            &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                color:#9c9c9c!important;
            }
            &::-moz-placeholder { /* Mozilla Firefox 19+ */
                color:#9c9c9c!important;
            }
            &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                color:#9c9c9c!important;
            }
        }
        .el-textarea{
            margin-top: 4px;
        }
        .el-form-item__content{
            margin-top: 2px;
        }
        .el-input__inner {
            border: 1px solid #EEEEEE;
            color: #333333;
        }
        .el-form-item__label{
            color: #2A2A2A ;
        }
    }
</style>
