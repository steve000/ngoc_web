<template>
    <div class="entity-list">
        <div class="table-container">
            <el-row>
                <el-col :span="19">
                    <search @searchValue="getSearchValue"
                            :isClear='isClear'
                            :showPlaceholder="'输入用户姓名或用户名或电话或邮箱进行查询'">
                    </search>
                </el-col>
                <el-col :span="2">
                    <el-button v-if="param.userGroupId" size="small" class="addButton" type="primary" plain
                               icon="iconfont1 icon-guanlian icontianjia" @click="onAssociateUser()"
                               style="margin-left: 32px">关联用户
                    </el-button>
                    <div v-else style="color: white">fafafa</div>
                </el-col>
                <el-col :span="3">
                    <el-button style="float: right" size="small" class="addButton" type="primary"
                               icon="iconfont1 icontianjia icon-tianjia" @click="addEntityUser()">新增用户
                    </el-button>
                </el-col>
            </el-row>
            <div class="search_result_container" v-if="searchItemValueArray.length>0">
                <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount"
                               @deleteItem="getDeleteItem"></search-result>
            </div>
            <div class="table-wrapper" id="entityTable">
                <el-table :data="entityList" border :height="tableHeight">
                    <el-table-column label="姓名" prop="fullName" min-width="170">
                        <template slot-scope="scope">
                            <div class="row-btn-show">
                                <div class="row-show" :title="scope.row.fullName"
                                >{{scope.row.fullName}}
                                </div>
                                <div class="operate-container">
                                    <more-operating
                                        v-if="scope.row.mold === 0 || scope.row.groupName"
                                        :buttonList="getButtonList(scope.row)"
                                        @hide="getHide(scope.$index)"
                                        @emitClick="setTableTrBg(scope.$index)"
                                        @onClick="onClickOperateButton"
                                        :row="scope.row">
                                    </more-operating>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="所属公司" prop="companyName" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.companyName">{{scope.row.companyName}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="所属业务实体" prop="groupName" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.groupName">{{scope.row.groupName ? scope.row.groupName :'--'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="账号类型" prop="supplier" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="countText[scope.row.mold]">
                                {{countText[scope.row.mold]}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="用户名" prop="userName" min-width="130">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.userName">{{scope.row.userName}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="联系电话" prop="phone" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.phone">{{scope.row.phone}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="邮箱" prop="email" min-width="110">
                        <template slot-scope="scope">
                            <div class="row-show" :title="scope.row.email">{{scope.row.email}}</div>
                        </template>
                    </el-table-column>
                    <div slot="empty" class="table_slot_empty_text">
                        <div><img src="../../layouts/images/nodata.png"/></div>
                        <div>暂无数据</div>
                    </div>
                </el-table>
                <div class="pagination-section" v-if="entityList.length>0">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                   :current-page="param.pageNo" background
                                   :page-size="param.pageSize" layout="total, sizes, prev, pager, next, jumper"
                                   :total="totalCount">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div class="model-container">
            <Modal title="编辑用户" v-model="editUserDialog" width="660px" :okText="'确认修改'" :showCancelButton="false"
                   @save="onSaveEntity('editUserForm')">
                <el-form label-width="100px" :model="editUserForm" :rules="editUserFormValidate" ref="editUserForm">
                    <el-form-item label="用户名: ">
                        <el-input v-model="userName" :disabled="true" size="small" placeholder="请输入1-18位由字母和数字组合的用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名: " prop="fullName">
                        <el-input v-model="editUserForm.fullName" size="small" placeholder="请输入2~25个字"></el-input>
                    </el-form-item>
                    <el-form-item label="电话: " prop="phone">
                        <el-input v-model="editUserForm.phone" size="small" placeholder="请输入电话号码"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱: " prop="email">
                        <el-input v-model="editUserForm.email" size="small" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="所属业务实体: " prop="groupName">
                        <el-input v-model="groupName" :disabled="true" size="small"></el-input>
                    </el-form-item>
                </el-form>
            </Modal>
            <!--<Modal title="解绑" v-model="untieUserDialog" width="660px" :showCancelButton="false" @save="onUntieEntity"-->
            <!--:okText="'确认解绑'">-->
            <!--<span class="untieTitle">确认解除绑定关系？</span>-->
            <!--</Modal>-->
            <el-dialog class='modal'
                       :visible.sync="untieUserDialog"
                       title="解绑"
                       width="660px">
                <div class="bottom-border"></div>
                <span style="color:#666666 ">确认解除绑定关系？</span>
                <slot slot="footer" class="dialog-footer">
                    <el-button class="untieEntityBtn" @click="onUntieEntity"
                               style="background-color:  #FA5555;border-radius: 3px;color: white">确认解绑
                    </el-button>
                </slot>
            </el-dialog>
            <Modal title="关联用户" v-model=" associateUserDialog" width="800px" :okText="'确认关联'" :showCancelButton="false"
                   @close="closeAssociateUserEntity()" @save="onAssociateUserEntity">
                <el-form label-width="100px" :model="associateUserForm">
                    <div>
                        <div class="displayStyle">
                            <el-form-item label="所属公司:">
                                <el-input class="row_width" v-model="associateUserForm.companyName" :disabled="true"
                                          size="small"></el-input>
                            </el-form-item>
                        </div>
                        <div class="displayStyle" style="padding-left: 15px">
                            <el-form-item label="所属业务实体:" prop="groupName">
                                <el-input class="row_width" v-model="associateUserForm.groupName" :disabled="true"
                                          size="small"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <el-form-item label="账号类型: " prop="mold">
                            <el-select size="small"
                                       style="width: 260px"
                                       @change="chooseUntieEntityList"
                                       v-model="associateUserForm.mold"
                                       placeholder="请选择">
                                <el-option
                                    v-for="item in oaType"
                                    :key="item.mold"
                                    :label="item.name"
                                    :value="item.mold">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="搜索用户名: ">
                            <div class="searchUser">
                                <search @searchValue="getUntieSearchValue"
                                        :isClear='isUntieClear'
                                        :showPlaceholder="'输入用户名或姓名查询搜索'"
                                       >
                                </search>
                            </div>
                        </el-form-item>
                    </div>
                </el-form>
                <div class="search_result_container" v-if="searchUntieItemValueArray.length>0">
                    <search-result :searchItemValueArray="searchUntieItemValueArray"
                                   @deleteItem="getDeleteUntieItem"></search-result>
                </div>
                <div class="table-container">
                    <div class="table-wrapper">
                        <el-table :data="untieEntityList" border :height="tableHeight" class="noReleateUser"
                                  @selection-change="handleSelectionChange">
                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column label="姓名" prop="purchaseId" min-width="170">
                                <template slot-scope="scope">
                                    <div class="row-btn-show ">
                                        <div class="row-show" :title="scope.row.fullName">{{scope.row.fullName}}
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="账号类型" prop="storehouseName" min-width="110">
                                <template slot-scope="scope">
                                    <div class="row-show" :title="countText[scope.row.mold]">
                                        {{countText[scope.row.mold]}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="用户名" prop="status" min-width="110">
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.userName"
                                    >{{scope.row.userName}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="联系电话" prop="supplier" min-width="110">
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.phone">{{scope.row.phone}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column label="邮箱" prop="planArrivalTime" min-width="130">
                                <template slot-scope="scope">
                                    <div class="row-show" :title="scope.row.email">{{scope.row.email}}</div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="pagination-section" v-if="untieEntityList.length>0">
                            <el-pagination @size-change="handleUntieSizeChange"
                                           @current-change="handleUntieCurrentChange"
                                           :current-page="untieEntityListParam.pageNo" background
                                           :page-size="untieEntityListParam.pageSize"
                                           layout="total, sizes, prev, pager, next, jumper"
                                           :total="untieTotalCount">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal title="新增用户" v-model="addEntityUserDialog" width="660px" :okText="'确认添加'" :showCancelButton="false"
                   @close="closeAddEntityUser('addUserForm')" @save="addEntityUserData('addUserForm')">
                <el-form label-width="110px" :model="addUserForm" :rules="addUserFormValidate" ref="addUserForm">
                    <el-form-item label="账号类型: ">
                        <el-radio-group v-model="addUserForm.mold" @change="doChangeType">
                            <el-radio :label="1">OA用户</el-radio>
                            <el-radio :label="0">外协用户</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div v-if="addUserForm.mold === 0">
                        <el-form-item label="用户名: " prop="userName">
                            <el-input v-model="addUserForm.userName" size="small" placeholder="请输入1-18位由字母和数字组合的用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名: " prop="fullName">
                            <el-input v-model="addUserForm.fullName" size="small" placeholder="请输入2~25个字"></el-input>
                        </el-form-item>
                        <el-form-item label="电话: " prop="phone">
                            <el-input v-model="addUserForm.phone" size="small" placeholder="请输入电话号码"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱: " prop="email">
                            <el-input v-model="addUserForm.email" size="small" placeholder="请输入邮箱"></el-input>
                        </el-form-item>
                    </div>
                    <div v-else class="searchUser-wrap" >
                        <el-form-item label="用户名: " prop="userSearchKey">
                            <div class="user-div" >
                                <el-input
                                    size="small"
                                    @keyup.enter.native="searchEnterFun"
                                    placeholder="请输入OA账号/姓名进行搜索"
                                    type="text"
                                    icon="search"
                                    class="user-input"
                                    v-model="addUserForm.userSearchKey"
                                >
                                <i slot="prefix" class="iconfont1 icon-sousuo cursor sousuoIcon"
                                   @click="onSearchUser"></i>
                                </el-input>
                                <el-popover
                                    placement="left bottom"
                                    trigger="hover"
                                    popper-class="user-detail-card">
                                    <div class="detail-info" style="color: #333333 ">
                                        <i class="companyIcon iconfont1 icon-gongsixinxi"></i>
                                        <span class="compantyNameFont" style="color: #333333;padding-left: 10px ">{{selectUserInfor.companyName|| '--'}}</span>
                                    </div>
                                    <div class="detail-info">
                                        <span>用戶名:</span><span style="color: #333333 ">{{selectUserInfor.userName || '--'}}</span>
                                    </div>
                                    <div class="detail-info">
                                        <span>姓名:</span><span
                                        class="pad-left">{{selectUserInfor.fullName || '--'}}</span>
                                    </div>
                                    <div class="detail-info">
                                        <span>部门:</span><span class="pad-left">{{selectUserInfor.departmentName || '--'}}</span>
                                    </div>
                                    <div class="detail-info">
                                        <span>电话:</span><span class="pad-left">{{selectUserInfor.phone || '--'}}</span>
                                    </div>
                                    <div class="detail-info">
                                        <span>邮箱:</span><span class="pad-left">{{selectUserInfor.email || '--'}}</span>
                                    </div>
                                    <div class="user-list-item" slot="reference">
                                        <i slot="reference" v-if="selectUserInfor"
                                           class="user-icon iconfont1 icon-gerenxinxi"></i>
                                    </div>
                                </el-popover>
                                <div  :class="{'search-result':true, 'show-border': userSearchList.length > 0}">
                                    <div class="title" v-if="userSearchList.length>0 && addUserForm.userSearchKey.length>0">
                                        搜索结果
                                    </div>
                                    <div class="title"
                                         v-if="addUserForm.userSearchKey && (addUserForm.userSearchKey != selectUserInfor.fullName) && userSearchList.length === 0">
                                        没有找到相应人员
                                    </div>
                                    <div class="result" v-if="userSearchList.length > 0">
                                        <ul>
                                            <li v-for="(item, key) in userSearchList" :key="key">
                                                <el-popover
                                                    placement="right"
                                                    trigger="hover"
                                                    popper-class="user-detail-card">
                                                    <div class="detail-info" style="color: #333333 ">
                                                        <i class="companyIcon iconfont1 icon-gongsixinxi"></i>
                                                        <span class="compantyNameFont"
                                                              style="color: #333333;padding-left: 10px ">{{item.companyName || '--'}}</span>
                                                    </div>
                                                    <div class="detail-info">
                                                        <span>用戶名:</span><span style="color: #333333 ">{{item.userName || '--'}}</span>
                                                    </div>
                                                    <div class="detail-info">
                                                        <span>姓名:</span><span
                                                        class="pad-left">{{item.fullName || '--'}}</span>
                                                    </div>
                                                    <div class="detail-info">
                                                        <span>部门:</span><span class="pad-left">{{item.departmentName || '--'}}</span>
                                                    </div>
                                                    <div class="detail-info">
                                                        <span>电话:</span><span
                                                        class="pad-left">{{item.phone || '--'}}</span>
                                                    </div>
                                                    <div class="detail-info">
                                                        <span>邮箱:</span><span
                                                        class="pad-left">{{item.email || '--'}}</span>
                                                    </div>
                                                    <div class="user-list-item" slot="reference">
                                                        <user-list :user="item" @shiftData="shiftData"></user-list>
                                                    </div>
                                                </el-popover>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </el-form-item>
                    </div>
                    <el-form-item label="所属业务实体: " prop="userGroupId">
                        <el-select v-model="addUserForm.userGroupId" size="small" placeholder="请选择"
                                   style="width: 490px">
                            <el-option
                                v-for="(item,index) in entityUserList"
                                :key="index"
                                :label="item.groupName"
                                :value="item.userGroupId">
                                <span :title="item.groupName" class="row-show-more" style="float: left">{{ item.groupName }}</span>
                                <span
                                    style="float: right; color: #8492a6; font-size: 13px">{{ item.companyName }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </Modal>
        </div>
    </div>
</template>
<script>
    import TableHeightMixins from '~/mixins/tableheight';
    import Search from '~/components/common/Search';
    import MoreOperating from '~/components/common/MoreOperating';
    import Modal from '~/components/common/Modal';
    import {mapActions, mapState} from 'vuex'
    import PlatformMixins from '~/mixins/platform';
    import QuitMixins from '~/mixins/quit'
    import MessageMixins from '~/mixins/messages';
    import UserList from '~/components/common/UserList';
    import SearchResult from '~/components/common/SearchResult.vue'
    export default {
        name: 'EntityList',
        data() {
            //正则校验
            let validatorPhone = (rule, value, callback) => {
                let  reg=/^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(16([6]))|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))+\d{8}$/;
                if (!reg.test(this.editUserForm.phone)) {
                    return callback(new Error('请输入正确的电话号码!'));
                    return false
                } else {
                    return callback();
                }
            }
            let validatorPhoneA = (rule, value, callback) => {
                let  reg=/^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(16([6]))|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))+\d{8}$/;
                if (!reg.test(this.addUserForm.phone)) {
                    return callback(new Error('请输入正确的电话号码!'));
                    return false
                } else {
                    return callback();
                }
            }
            let validatorFullNameB = (rule, value, callback) => {
                if(value.length>25 || value.length<2){
                    return callback(new Error('请输入2~25个字'));
                }else{
                    return callback();
                }
            }
            let validatorFullNameA = (rule, value, callback) => {
                if(value.length>25 || value.length<2){

                    return callback(new Error('请输入2~25个字'));
                }else{
                    return callback();
                }
            }
            let validatorUserName = (rule, value, callback) => {
                var reg = /^(?=.*\d)(?=.*[a-zA-Z]).{1,18}$/;
                var reg1 = /^[a-zA-Z0-9]{1,18}$/;
                if (!reg.test(value.trim()) || !reg1.test(value.trim())) {
                    return callback(new Error('请输入1-18位由字母和数字组合的用户名!'));
                } else {
                    return callback();
                }
            }
            let validatorSearchUser = (rule, value, callback) => {
                if (value.length>0) {
                    if (this.selectUserInfor.fullName != value) {
                        this.selectUserInfor = ""
                        var uerSearch = this.addUserForm.userSearchKey.trim()
                        if(uerSearch.length>0){
                            this.searchOaCount({fullName: uerSearch}).then(res => {
                                if(uerSearch.length>0){
                                    this.userSearchList = res ? res : [];
                                    return callback();
                                }
                                else{
                                    this.userSearchList = [];
                                    return callback(new Error('请搜索用户名!'));
                                }
                            });
                        }else{
                            this.userSearchList = [];
                            return callback(new Error('请搜索用户名!'));
                        }
                    }else {
                        return callback();
                    }
                }else{
                    this.userSearchList = [];
                    return callback(new Error('请搜索用户名!'));
                }
            };
            return {
                associateUser: {
                    companyName: '',
                    groupName: ''
                },
                isClear:false,
                isUntieClear:false,
                searchItemValueArray:[],
                searchUntieItemValueArray:[],
                entityUserList: [],
                param: {
                    pageSize: 10,
                    pageNo: 1,
                    userGroupId: '',
                    companyId: '',
                    bindingType: '',
                    searchContent: ""
                },
                untieEntityListParam: {
                    pageSize: 10,
                    pageNo: 1,
                    userGroupId: '',
                    mold: '',
                    bindingType: 2,
                    searchContent: ""
                },
                userName: '',
                groupName: '',
                editUserDialog: false,   //编辑用户
                untieUserDialog: false,   //解绑用户
                associateUserDialog: false,  //关联用户
                addEntityUserDialog: false,  //新增用户
                editUserForm: {
                    uid: '',
                    email: '',
                    phone: '',
                    fullName: ''
                },
                addUserForm: {
                    userGroupId: '',
                    mold: 1,
                    email: '',
                    phone: '',
                    fullName: '',
                    userName: '',
                    userSearchKey: ''
                },
                removeEntityParam: {
                    userGroupId: '',
                    uid: ''
                },
                associateUserForm: {
                    companyName: '',
                    groupName: '',
                    mold: ""
                },
                oaType: [
                    {
                        mold: 0,
                        name: "外协"
                    },
                    {
                        mold: 1,
                        name: "oa"
                    },
                    {
                        mold: "",
                        name: "全部"
                    }
                ],

                editUserFormValidate: {
                    email: [{required: true, type: 'email', message: '请输入正确的邮箱地址!', trigger: 'change'}],
                    phone: [{required: true, validator: validatorPhone, trigger: 'change'}],
                    fullName: [{required: true, message: "请输入姓名", trigger: 'change'},
                        {required: true,validator: validatorFullNameA,trigger: 'change'
                    }]
                },
                addUserFormValidate: {
                    mold: [{required: true}],
                    email: [{required: true, type: 'email', message: '请输入正确的邮箱地址!', trigger:  'change'}],
                    phone: [{required: true, validator: validatorPhoneA, trigger: 'change'}],
                    fullName: [{required: true, message: "请输入姓名", trigger: 'change'},
                               {required: true,validator: validatorFullNameB,trigger: 'change'}],
                    userName: [{required: true, validator: validatorUserName, trigger: 'change'}],
                    userGroupId: [{required: true, message: "请选择业务实体", trigger: 'change'}],
                    userSearchKey: [{required: true, validator: validatorSearchUser, trigger: 'change'}]
                },
                countText: {
                    0: '外协账号',
                    1: 'oa账号',
                },
                isSearch: false,
                isShowSearchResult: false,
                showUntieResetButton: false,
                isUntieSearch: false,
                isShowUntieSearchResult: false,
                entityList: [],    //绑定的业务实体
                untieEntityList: [],  //未绑定的业务实体
                totalCount: 0,
                untieTotalCount: 0,
                uids: [],
                userSearchList: [],
                userSearchLoading: false,
                clickName: true,
                selectUserInfor: "",
            }
        },
        mixins: [MessageMixins, TableHeightMixins, QuitMixins, PlatformMixins],
        components: {Search, MoreOperating, Modal, UserList,SearchResult},
        props: {
            flag: {
                type: Object,
                default: function () {
                    return {}
                }
            }
        },
        watch: {
            flag: function (nval) {
                this.param.pageSize = 10;
                this.param.pageNo = 1;
                this.param.companyId = nval.companyId;
                this.param.userGroupId = nval.userGroupId;
                this.param.bindingType = nval.bindingType;
                this.associateUser.companyName = nval.companyName;
                this.associateUser.groupName = nval.groupName;
                this.initData();
            },
            operationId: function (nval) {
                this.initData();
            },
        },
        computed: {
            ...mapState({
//                purchaseList: ({purchaseList}) => purchaseList.purchaseList,
//                totalCount: ({purchaseList}) => purchaseList.basePage.totalCount,
//                queryPurchaseDetailsData: ({viewPurchaseOrder}) => viewPurchaseOrder.queryPurchaseDetails,
            }),
            isUserSelected() {
                return this.uids.length > 0
            },
        },
        mounted() {
            // this.refreshPage(this.param);
            this.setTableHeight(245)
        },
        methods: {
            ...mapActions(["searchOaCount", "queryConfigGroup", "associateUsers", "queryEntityUserList", "addEntity", "editEntity", "removeEntity", "showPageLoading", "hidePageLoading"]),
            handleSizeChange(nSize) {
                this.param.pageSize = nSize;
                this.refreshPage(this.param);
            },
            handleUntieSizeChange(nSize) {
                this.untieEntityListParam.pageSize = nSize;
                this.queryUntieEntityList()
            },
            handleCurrentChange(nPage) {
                this.param.pageNo = nPage;
                this.refreshPage(this.param);
            },
            handleUntieCurrentChange(nPage) {
                this.untieEntityListParam.pageNo = nPage;
                this.queryUntieEntityList()
            },
            refreshPage(nval) {
                this.showPageLoading();
                this.queryEntityListFunction(nval);
            },
            initData() {
                this.getReset();
            },
            shiftData(data) {
                this.addUserForm.userSearchKey = data.fullName;
                this.selectUserInfor = data;
                this.userSearchList = []
            },
            getSearchValue(searchValue) {
                this.param.pageSize = 10;
                this.param.pageNo = 1;
                this.isClear=false;
                this.param.searchContent = searchValue;
                this.searchItemValueArray = [searchValue];
                this.refreshPage(this.param);
            },
            getUntieSearchValue(searchValue) {
                this.untieEntityListParam.searchContent = searchValue;
                this.isUntieClear=false;
                this.searchUntieItemValueArray = [searchValue];
                this.queryUntieEntityList();
            },
            getDeleteItem(index){
                this.searchItemValueArray.splice(index);
                this.isClear = true;
                this.param.searchContent = "";
                this.refreshPage(this.param);
            },
            getDeleteUntieItem(index){
                this.searchUntieItemValueArray.splice(index);
                this.isUntieClear = true;
                this.untieEntityListParam.searchContent = "";
                this.queryUntieEntityList();
            },
            queryEntityListFunction(param) {
                this.queryEntityUserList(param).then((resp) => {
                    this.setTableHeight(245)
                    this.hidePageLoading();
                    this.entityList = resp.result;
                    this.totalCount = resp.totalCount;
                    if (this.isSearch) {
                        this.isShowSearchResult = true;
                    }
                }).catch((err) => {
                    this.entityList = [];
                    this.totalCount = 0;
                    this.hidePageLoading();
                });
            },
            getReset() {
                this.isShowSearchResult = false;
                this.param.searchContent = "";
                this.isSearch = false;
                this.refreshPage(this.param);
            },
            getHide(index){
                let eleClassList=document.getElementById('entityTable').getElementsByClassName('el-table')[0].getElementsByClassName('el-table__row')[index].classList;
                eleClassList.remove('success-row');
                let moreOperateClassList=document.getElementById('entityTable').getElementsByClassName('el-table')[0].getElementsByClassName('el-table__row')[index].getElementsByClassName('operate-container')[0].classList;
                moreOperateClassList.remove('display-block');
            },
            setTableTrBg(index){
                let eleClassList=document.getElementById('entityTable').getElementsByClassName('el-table')[0].getElementsByClassName('el-table__row')[index].classList;
                let moreOperateClassList=document.getElementById('entityTable').getElementsByClassName('el-table')[0].getElementsByClassName('el-table__row')[index].getElementsByClassName('operate-container')[0].classList;
                moreOperateClassList.add('display-block');
                eleClassList.add('success-row');
            },
            /*
            *  搜索用户组件,点击重置按钮,父组件回调事件
            */
            getUntieReset() {
                this.showUntieResetButton = false;
                this.isShowUntieSearchResult = false;
                this.untieEntityListParam.searchContent = "";
                this.isUntieSearch = false;
                this.queryUntieEntityList();
            },
            onUntieEntity() {
                this.showPageLoading()
                this.removeEntity(this.removeEntityParam).then(resp => {
                    console.log(resp,"1312")
                    if (resp) {
                        this.hidePageLoading();
                        this.showSuccess();
                        this.untieUserDialog = false;
                        this.refreshPage(this.param);
                    }else{
                        this.hidePageLoading();
                        this.showError("解绑失败");
                    }
                }).catch((error)=>{
                    this.showError(error)
                });
            },
            untieEntityFunction(row) {
                this.removeEntityParam = {
                    userGroupId: row.userGroupId,
                    uid: row.uid
                }
            },
            getButtonList(row) {
                let buttonArray = [];
                if (row.mold == 0) {
                    buttonArray.push({type: 'edit', text: '编辑'})
                }
                if (row.groupName) {
                    buttonArray.push({type: 'untie', text: '解绑'})
                }
                return buttonArray
            },
            onClickOperateButton(type, row) {
                if (type === 'edit') {
                    this.editEntityFunction(row);
                    this.editUserDialog = true;
                } else if (type === 'untie') {
                    this.untieUserDialog = true;
                    this.untieEntityFunction(row)
                }
            },
            //编辑用户
            editEntityFunction(row) {
                this.userName = row.userName;
                this.groupName = row.groupName;
                this.editUserForm = {
                    uid: row.uid,
                    email: row.email,
                    phone: row.phone,
                    fullName: row.fullName
                }
            },
            //打开关联用户弹窗
            onAssociateUser() {
                console.log(this.untieEntityListParam.searchContent)
                console.log(5555555)
                this.associateUserDialog = true;
                this.untieEntityListParam.pageNo = 1
                Object.assign(this.associateUserForm, this.flag);
                // setTimeout(()=>{
                //     this.$refs['searchUserName'].resetSearch('searchForm');
                // },200);
                this.queryUntieEntityList();

            },
            closeAssociateUserEntity() {
                this.getDeleteUntieItem()
                this.associateUserForm.mold = "";
                this.untieEntityListParam.searchContent = "";
                this.isUntieClear = true;
            },
            queryUntieEntityList() {
                this.untieEntityListParam.userGroupId = this.param.userGroupId;
                this.untieEntityListParam.mold = this.associateUserForm.mold
                this.queryEntityUserList(this.untieEntityListParam).then((resp) => {
                    this.setTableHeight(245);
                    this.hidePageLoading();
                    this.untieEntityList = resp.result;
                    this.untieTotalCount = resp.totalCount;
                    if (this.isUntieSearch) {
                        this.showUntieResetButton = true;
                        this.isShowUntieSearchResult = true;
                    }
                }).catch((err) => {
                    this.untieEntityList = [];
                    this.UntieTotalCount = 0;
                    this.hidePageLoading();
                });
            },
            //根据账号类型帅选
            chooseUntieEntityList() {
                this.queryUntieEntityList();
            },
            //点击确认修改编辑用户
            onSaveEntity(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            uid:this.editUserForm.uid,
                            email:this.editUserForm.email.trim(),
                            phone:this.editUserForm.phone,
                            fullName:this.editUserForm.fullName.trim(),
                        };
                        this.showPageLoading();
                        this.editEntity(params).then(res => {
                            this.showPageLoading();
                            this.refreshPage(this.param)
                            this.showSuccess()
                            this.editUserDialog = false;
                        }).catch(err => {
                            console.error(err)
                        });
                    } else {
                        return false;
                    }
                });
            },
            handleSelectionChange(val) {
                this.uids = val
            },
            //关联用户
            onAssociateUserEntity() {
                if (this.validateUserSelection()) {
                    let uidsArray = [];
                    this.uids.forEach((item) => {
                        uidsArray.push(item.uid);
                    })
                    var reqData = {
                        uids: uidsArray,
                        userGroupId: this.param.userGroupId
                    }
                    this.showPageLoading();
                    this.associateUsers(reqData).then(res => {
                        if(res){
                            this.hidePageLoading();
                            this.refreshPage(this.param);
                            this.showSuccess();
                            this.uids = [];
                            this.associateUserDialog = false;
                        }else{
                            this.hidePageLoading();
                            this.showError('关联用户失败')
                        }
                    }).catch(err => {
                        console.error(err)
                    });
                }
            },
            //判断是否选中用户
            validateUserSelection() {
                if (this.isUserSelected) {
                    return true
                }
                this.showWarning('请选中用户后再操作！')
                return false
            },
            getEntityList() {
                this.entityUserList = []
                this.queryConfigGroup().then((resp) => {
                    resp.result.forEach(item => {
                        item.userGroupList.forEach(one => {
                            one.companyName = item.companyName;
                            this.entityUserList.push(one)
                        })
                    })
                });
            },
            //新增用户
            addEntityUser() {
                this.addEntityUserDialog = true;
                this.getEntityList()
            },
            // 保存添加用户
            addEntityUserData(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.showPageLoading();
                        if (this.addUserForm.mold === 1) {
                            var reqData = {
                                userGroupId: this.addUserForm.userGroupId,
                                fullName: this.selectUserInfor.fullName.trim(),
                                userName: this.selectUserInfor.userName.trim(),
                                mold: 1,
                                phone: this.selectUserInfor.phone.trim(),
                                email: this.selectUserInfor.email.trim()
                            }
                        } else {
                            var reqData = {
                                userGroupId: this.addUserForm.userGroupId,
                                fullName: this.addUserForm.fullName.trim(),
                                userName: this.addUserForm.userName.trim(),
                                mold: 0,
                                phone: this.addUserForm.phone.trim(),
                                email: this.addUserForm.email.trim()
                            }
                        }
                        this.addEntity(reqData).then(res => {
                            this.hidePageLoading();
                            this.refreshPage(this.param);
                            this.showSuccess();
                            this.addEntityUserDialog = false;
                            this.addUserForm = {
                                userGroupId: '',
                                mold: 0,
                                email: '',
                                phone: '',
                                fullName: '',
                                userName: '',
                                userSearchKey: ''
                            }
                        }).catch(err => {
                            console.error(err)
                        });
                    } else {
                        this.showWarning('请先正确填写表单信息')
                        return false;
                    }
                });
            },
            closeAddEntityUser(formName) {
                this.$refs[formName].resetFields();
                this.addUserForm = {
                    userGroupId: '',
                    mold: 1,
                    email: '',
                    phone: '',
                    fullName: '',
                    userName: '',
                    userSearchKey: ''
                }
                this.userSearchList = []
            },
            onSearchUser() {
                this.searchUser()
            },
            searchEnterFun() {
                this.searchUser()
            },
            searchUser() {
                if (!this.addUserForm.userSearchKey) {
                    this.userSearchList = [];
                    return
                }
                if(this.addUserForm.userSearchKey.length>0){
                    this.searchOaCount({fullName: this.addUserForm.userSearchKey}).then(res => {
                        this.userSearchList = res ? res : [];
                    });
                }else{
                    this.showWarning("请输入用户名")
                }
            },
            doChangeType(){
                if(this.addUserForm.mold === 1){
                    this.addUserForm = {
                        userGroupId: '',
                        email: '',
                        mold:1,
                        phone: '',
                        fullName: '',
                        userName: '',
                        userSearchKey: ''
                    }
                }else{
                    this.selectUserInfor = "";
                    this.addUserForm.userGroupId = ''
                }
            }
        }
    }
</script>

<style lang="scss">
    .entity-list {
        .search-component{
            right: 0px;
        }
        .table-container {
            .row-btn-show div{
                color: black;
                 cursor: default;
            }
            .el-table__body-wrapper tbody tr:hover{
                .operate-container{
                    display: block;
                }
            }
            .operate-container {
                padding-right: 16px;
                min-width: 71px;
                display: none;
                div {
                    float: right;
                }
            }
            .searchUser{
                padding-right: 9px;
            }
            padding-top: 25px;
            background-color: #fff;
            height: 100%;
            .icontianjia {
                margin-right: 8px;
                margin-left: -6px;
                margin-top: 1px;
                font-size: 10px;
                width: 10px;
                height: 10px;
            }
            .addButton {
                display: flex;
                margin: auto;
                font-size: 13px;
            }
            .el-table__body-wrapper {
                overflow-x: hidden;
            }
        }
        .display-flex {
            display: flex;
        }
        .icon-shijian {
            font-size: 12px;
        }
        .icon-bianji {
            font-size: 12px;
        }
        .model-container {
            height: auto;
            .untieTitle {
                color: #666666;
                font-size: 14px;
            }
            .displayStyle {
                display: inline-block;
                .row_width {
                    width: 260px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    height: 36px;
                    color: #333333;
                }
            }
            .table-container {
                padding-top: 25px;
                background-color: #fff;
                height: 100%;
                .icontianjia {
                    margin-right: 8px;
                    margin-left: -6px;
                    margin-top: 1px;
                    font-size: 10px;
                    width: 10px;
                    height: 10px;
                }
                .addButton {
                    display: flex;
                    margin: auto;
                    font-size: 13px;
                }

                .el-table__body-wrapper {
                    overflow-x: hidden;
                }
            }
        }
        .search-box{
            text-align:left !important;
        }
        .show-more {
            display: flex;
            width: 100%;
            height: 44px;
            justify-content: space-between;
            position: relative;
            &:hover {
                .show-more-icon {
                    display: block;
                }
            }
            .show-more-content {
                white-space: nowrap;
                overflow: hidden;
                max-width: 108px;
                text-overflow: ellipsis;
            }
            .show-more-icon {
                font-size: 12px;
                position: absolute;
                right: 0px;
                display: none;
                z-index: 10;
            }
        }
        .user-div {
            position: relative;
            .user-icon {
                position: absolute;
                right: 10px;
                top: 13px;
                color: #AAAAAA;
                width: 10.5px;
                height: 14px;
            }
            .sousuoIcon {
                width: 14px;
                height: 14px;
                color: #bebebe;
            }
        }
        .searchUser-wrap {
            position: relative;
            .search-result {
                max-height: 300px;
                overflow-y:scroll;
                width: 250px;
                z-index: 300;
                background: #FFFFFF;
                li:hover {
                    background-color: #F6FAFE;
                    font-weight: 800;
                }
                position: absolute;
                .title {
                    padding: 12px 10px;
                    font-size: 12px;
                    color: #666;
                    line-height: 12px;
                }
            }
            .search-result.show-border{
                border: 1px solid lightgray;
                border-radius: 2px;
            }
            .showDetail {
                background-color: white;
                width: 250px;
                z-index: 400;
                border: 1px solid #DCDFE5;
                .user-detail-card {
                    min-width: 229px;
                    padding: 20px 30px !important;
                    z-index: 2099 !important;
                    font-size: 14px !important;
                    background: #FFFFFF;
                    .detail-info {
                        padding: 10px 0px;
                        font-size: 12px;
                        span {
                            padding-right: 15px;
                            width: 48px;
                            color: #888888;
                        }
                        .companyIcon {
                            width: 16px;
                            height: 14px;
                            color: #666666;
                        }
                        .pad-left {
                            color: #333333;
                            padding-left: 10px;
                        }
                    }
                }
            }
        }
        .result{
            ul > li {
                font-size: 14px;
                position: relative;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #48576a;
                line-height: 1.5;
                box-sizing: border-box;
                cursor: pointer;
                .user-list-item {
                    position: relative;
                    padding: 8px 10px;
                    display: table;
                    width: 100%;
                }
            }
        }

        .el-input.is-disabled .el-input__inner {
            background-color: #f0f0f0;
            border: 1px solid #EEEEEE;
            color: #333333;
        }
        .el-input__inner {
            border: 1px solid #EEEEEE;
            color: #333333;
        }
        .el-form-item__label {
            color: #666666;
        }
        .el-dialog__header {
            padding: 20px 23.7px 20px 30px;
            color: #333333;
            .el-dialog__title {
                font-size: 16px;
                color: #333333;
            }
            .el-dialog__headerbtn {
                right: 30px;
                font-size: 23px;
            }
        }
        .el-form-item__content{
            margin-top: 2px;
        }
        .el-dialog__body {
            padding: 0px 30px 20px 30px;
            .bottom-border {
                width: 100%;
                border-bottom: 1px solid #F3F3F3;
                margin-bottom: 20px;
            }
        }
        .el-dialog__footer {
            padding: 0px 30px 30px;
        }
    }
    .user-detail-card {
        min-width: 229px;
        padding: 20px 30px !important;
        z-index: 3011 !important;
        font-size: 14px !important;
        background: #FFFFFF;
        border: 1px solid #DCDFE5;
        box-shadow: 0 4px 4px 0 #E8E8E8;
        .detail-info {
            padding: 10px 0px;
            font-size: 12px;
            span {
                padding-right: 15px;
                width: 48px;
                color: #888888;
            }
            .pad-left {
                color: #333333;
                padding-left: 10px;
            }
        }
    }
    .row-show-more{
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        width: 390px;
        text-overflow: ellipsis;
    }
    .table-wrapper{
        .el-table.noReleateUser{
            height: 245px!important;
        }

    }
</style>


