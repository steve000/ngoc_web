<template>
	<div class="authority-users">
		<el-row class="authority-users-searchBox">
			<el-col :span='15' class="nav-set-btn">
				<el-button size='small' type="primary" plain icon="el-icon-service"  @click="isAddUserModalVisible = true">增加</el-button>
				<!-- <el-button size='small' type="primary" plain icon="el-icon-goods" @click="onUserLock">锁定</el-button> -->
				<!-- <el-button size='small' type="primary" plain icon="el-icon-sold-out"  @click="onUserUnlock">解锁</el-button> -->
				<!-- <el-button size='small' type="primary" plain icon="el-icon-picture"  @click="onUserRoleSetting">设置角色</el-button> -->
				<!-- <el-button size='small' type="primary" plain icon="el-icon-refresh" @click="resetPassword = true">重置密码</el-button> -->
			</el-col>
			<el-col :span='7' class='nav-exportUserMes'>
				<el-col :span='22'>
					 <el-input
					 	@keyup.enter.native="onSearchUser"
					 	size='small'
					    placeholder="输入用户名或者所属公司"

					    v-model="searchInput">
					    <i slot="prefix" class="el-input__icon el-icon-search" @click="onSearchUser"></i>


					  </el-input>
				</el-col>
			</el-col>
		</el-row>
		<el-row class="authority-users-dataList">
			<el-table :data='userList' border @selection="onSelectionChange">
			    <el-table-column
			      type="selection"
			      width="55">
			    </el-table-column>

			    <el-table-column
			      label="序号"
			      min-width="120">
			      <template slot-scope="scope">
                      {{ (param.pageNo - 1) * param.pageSize +  scope.$index + 1 }}</template>
			    </el-table-column>

			    <el-table-column
			    prop="userName"
			      min-width="120"
			      label="用户名">
			    </el-table-column>

			    <el-table-column
			      prop="fullName"
			      label="昵称"
			      min-width="120">
			    </el-table-column>

			    <el-table-column
			      prop="companyName"
			      label="所属公司"
			      min-width="120">
			    </el-table-column>

			    <el-table-column
			      prop="groupName"
			      label="用户实体"
			      min-width="120">
			    </el-table-column>

			    <el-table-column
			      prop="phone"
			      label="手机号"
			      min-width="120">
			    </el-table-column>

			     <el-table-column
				  prop="uType"
			      sortable
			      label="用户类型"
			      min-width="120">
			      <template slot-scope="scope">
                      <span v-if='scope.row.uType == 1'>系统管理员</span>
                      <span v-if='scope.row.uType == 2'>普通用户</span>
                  </template>
			    </el-table-column>

				<el-table-column
			      prop="mold"
			      sortable
			      label="账号类型"
			      min-width="120">
			      <template slot-scope="scope">
			      	  <span v-if='scope.row.mold == 0'>ngoc账号</span>
                      <span v-if='scope.row.mold == 1'>oa账号</span>
                  </template>
			    </el-table-column>

			    <el-table-column
			      prop="status"
			      label="状态"
			      min-width="120">
			      <template slot-scope="scope">
					  <span v-if='scope.row.status == 0'>未启用</span>
                      <span v-if='scope.row.status == 1'>已启用</span>
                      <span v-if='scope.row.status == 2'>已禁用</span>
					  <span v-if='scope.row.status == 3'>已锁定</span>
                      <span v-if='scope.row.status == 4'>已删除</span>
                  </template>
			    </el-table-column>
			    <el-table-column label="操作" min-width="200">
				    <template slot-scope="scope">
				        <span class="handleIcon" @click="ModifyUserIndorm(scope.$index, scope.row)">
							<el-tooltip class="item" effect="dark" content="修改用户" placement="top-start">
						      <i class="el-icon-edit-outline"></i>
						    </el-tooltip>
					    </span>
				        <span class="handleIcon" @click="onDeleteSingleUser(scope.$index, scope.row)">
				        	<el-tooltip class="item" effect="dark" content="删除用户" placement="top-start">
						      <i class="el-icon-delete"></i>
						    </el-tooltip>
				        </span>
				        <span class="handleIcon" @click="isResetPassword(scope.$index, scope.row)">
				        	<el-tooltip class="item" effect="dark" content="重置密码" placement="top-start">
						      <i class="el-icon-refresh"></i>
						    </el-tooltip>
				        </span>
				        <span class="handleIcon" v-if="scope.row.status == 1" @click="isLock_P(scope.row,2)">
				        	<el-tooltip class="item" effect="dark" content="锁定" placement="top-start">
						      <i class="el-icon-goods"></i>
						    </el-tooltip>
				        </span>
				         <span class="handleIcon" v-if="scope.row.status == 2" @click="isLock_P(scope.row,1)">
				         	<el-tooltip class="item" effect="dark" content="解锁" placement="top-start">
						      <i class="el-icon-sold-out"></i>
						    </el-tooltip>
				        </span>
				    </template>
				</el-table-column>
			</el-table>
			<div class="pagination-section">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
								:current-page="param.pageNo" background
								:page-size="param.pageSize" layout="total, sizes, prev, pager, next, jumper"
								:total="total">
				</el-pagination>
			</div>
		</el-row>

		<!-- 新增用户 -->
		<Modal  class="addUser" title="新增用户信息" @save="onSaveUser('addUserData')" v-model="isAddUserModalVisible">
			<el-form :model="addUserData"  ref="addUserData" label-width="100px"  :rules="rules">
				<el-form-item label="登录账号：" prop="userName">
				   <el-input v-model="addUserData.userName" placeholder="请输入英文&数字"></el-input>
				</el-form-item>

				<el-form-item label="登录密码：" prop="password">
				   <el-input label="默认66666" v-model="addUserData.password" ></el-input>
				   <div class="el-form-item__error" style="color:#606266
				   		">默认6666</div>
				</el-form-item>
				<el-form-item label="用户名：" prop="fullName">
				   <el-input v-model="addUserData.fullName" ></el-input>
				</el-form-item>

				<el-form-item label="用户状态：" prop="status">
				    <el-radio-group v-model="addUserData.status">
						<el-radio :label="0">未启用</el-radio>
					    <el-radio :label="1">启用</el-radio>
					    <el-radio :label="2">禁用</el-radio>
					    <el-radio :label="3">锁定</el-radio>	
						<el-radio :label="4">删除</el-radio>
				    </el-radio-group>
				</el-form-item>

				<el-form-item label="用户类型：" prop="uType">
				    <el-radio-group v-model="addUserData.uType">
				    	<el-radio label="系统管理员" ></el-radio>
					    <el-radio label="普通用户"></el-radio>
				    </el-radio-group>
				</el-form-item>

				<el-form-item label="账户类型：" prop="mold">
				    <el-radio-group v-model="addUserData.mold">
				    	<el-radio label="ngoc用户" ></el-radio>
					    <el-radio label="oa用户"></el-radio>
				    </el-radio-group>
				</el-form-item>

				<el-form-item label="公司：" prop="company" >
				  	<el-input v-model="addUserData.company" ></el-input>
				</el-form-item>
				<el-form-item label="部门：" prop="department" >
				  	<el-input v-model="addUserData.department" ></el-input>
				</el-form-item>
				<el-form-item label="邮件：" prop="email" >
				    <el-input v-model="addUserData.email" ></el-input>
				</el-form-item>
				<el-form-item label="电话：" prop="phone" >
				    <el-input v-model.numbrt="addUserData.phone" ></el-input>
				</el-form-item>
			</el-form>
		</Modal>
		<!-- 修改用户信息 -->
		<Modal class="addUser" title="修改用户信息" @close="onCloseModifyUser" @save="onSaveModifyUser('editData')" v-model="isModifyUser">
			<el-form :model="editData"  ref="editData" label-width="110px" :rules="rules">
				<el-form-item label="用户名：" prop="userName">
				   <el-input :disabled="true" v-model="editData.userName" ></el-input>
				</el-form-item>
				<!-- <el-form-item label="用户密码：" prop="password">
				   <el-input  type="password" v-model="editData.password" ></el-input>
				</el-form-item> -->
				<el-form-item label="昵称：" prop="fullName">
				   <el-input  v-model="editData.fullName" ></el-input>
				</el-form-item>
				<el-form-item label="用户状态：" prop="status">
					<el-radio-group v-model="editData.status">
				        <el-radio :label="0">未启用</el-radio>
					    <el-radio :label="1">启用</el-radio>
					    <el-radio :label="2">禁用</el-radio>
					    <el-radio :label="3">锁定</el-radio>	
						<el-radio :label="4">删除</el-radio>
				    </el-radio-group>
				</el-form-item>

				<el-form-item label="用户类型：" prop="uType">
				    <el-radio-group v-model="editData.uType" >
				        <el-radio :label="1" >系统管理员</el-radio>
					    <el-radio :label="2">普通用户</el-radio>
				    </el-radio-group>
				</el-form-item>
				<el-form-item label="公司：" prop="company" >
				  	<el-input  v-model="editData.companyName" ></el-input>
				</el-form-item>
				<el-form-item label="部门：" prop="department" >
				  	<el-input  v-model="editData.department" ></el-input>
				</el-form-item>
				<el-form-item label="邮件：" prop="email" >
				    <el-input  v-model="editData.email" ></el-input>
				</el-form-item>
				<el-form-item label="电话：" prop="phone" >
				    <el-input  v-model="editData.phone" ></el-input>
				</el-form-item>
			</el-form>
		</Modal>

		<!-- 新增2.0 -->
		<!-- <Modal  class="addUser" title="新增用户" @save='onSaveUser' v-model="isAddUserModalVisible1">
            <div class="user-box-select" >
                <div>&nbsp;&nbsp;是否OA用户</div>
                <div>
                    <el-checkbox v-model="checked">备选项</el-checkbox>
                </div>
            </div>
            <div class="user-box-select">
                <div><span>*&nbsp;</span>用户账号</div>
                <div>
                    <el-input v-model="addUser.userAccount"></el-input>
                </div>
            </div>
            <div class="user-box-select">
                <div><span>*&nbsp;</span>用户账号</div>
                <div class="addUserName">
                    <el-input v-model="addUser.userAccount"></el-input>
                    <div>
                        <el-radio v-model="radio" label="1">内部用户</el-radio>
                        <el-radio v-model="radio" label="2">外部用户</el-radio>
                    </div>

                </div>
            </div>

            <div class="user-box-select ">
                <div><span>*&nbsp;</span>公司名称</div>  
                <div>
                    <el-select v-model="addUser.companyName.value" placeholder="请选择">
                        <el-option
                            v-for="item in addUser.companyName"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                </div>
            </div>
            <div class="user-box-select ">
                <div><span>*&nbsp;</span>手机号</div>
                <el-input v-model="addUser.phone"></el-input>
            </div>
            <div class="user-box-select ">
                <div><span>*&nbsp;</span>邮箱</div>
                <el-input v-model="addUser.email"></el-input>
            </div>
		</ > -->


		<!-- <el-dialog  class="setRoles" title="设置角色" v-model="setRoles">
			<el-table
			    ref="multipleTable"
			    :data="setRolesData"
			    tooltip-effect="dark"
			    style="width: 100%"
			    >
			    <el-table-column
			      label="序号"
			      width="120">
			       <template slot-scope="scope">
			       	 <input type="checkbox">&nbsp;{{ scope.row.serialNumber}}
			       	 <input type="checkbox">&nbsp;{{ scope.row.serialNumber }}
			   		</template>
			    </el-table-column>
			    <el-table-column
			      prop="rolesName"
			      label="角色名"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="describe"
			      label="描述"
			      show-overflow-tooltip>
			    </el-table-column>
			  </el-table>
			  <span slot="footer" class="dialog-footer">
			    <el-button type="primary"  @click="setRoles = false">确 定</el-button>
			  </span>
		</el-dialog> -->

		<el-dialog  class="resetPassword" title="重置用户密码" :visible.sync="resetPassword">
			<div>是否对已选择的用户进行重置密码操作？</div>
			<div class="text-alignRight" style="text-align:right">
				<el-button @click="resetPassword = false">取消</el-button>
				<el-button type="danger" @click="resetPasswordSure = true">确认</el-button>
			</div>
			<div class="resetPasswordSureInner">
				<el-dialog
			      width="40%"
			      title="重置成功"
			      :visible.sync="resetPasswordSure"
			      append-to-body
			      >
			      	<div>密码重置成功！新密码已通过邮件发送给用。</div>
			      	<div slot="footer" class="dialog-footer">
				      	<el-button @click="() => {}">确定</el-button>
				    </div>
				</el-dialog>
			</div>
		</el-dialog>

		<!-- <el-dialog  class="addUser" title="修改用户信息" :visible.sync="ModifyUser">
            <div class="user-box-select ">
                <div><span>*&nbsp;</span>用户类型</div>
                <div>
                    <el-radio v-model="radio" label="1">内部用户</el-radio>
                </div>
            </div>
            <div class="user-box-select">
                <div><span>*&nbsp;</span>用户账号</div>
                <div>
                    admin
                </div>
            </div>
            <div class="user-box-select">
                <div><span>*&nbsp;</span>用户姓名</div>
                <div class="addUserName">
                    <el-input v-model="addUser.userAccount"></el-input>
                    <div>
                        <el-radio v-model="radio" label="1">男</el-radio>
                        <el-radio v-model="radio" label="2">女</el-radio>
                    </div>

                </div>
            </div>

            <div class="user-box-select ">
                <div><span>*&nbsp;</span>公司名称</div>
                <div>
                    <el-select v-model="addUser.companyName.value" placeholder="请选择">
                        <el-option
                            v-for="item in addUser.companyName"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                </div>
            </div>
            <div class="user-box-select ">
                <div><span>*&nbsp;</span>手机号</div>
                <el-input v-model="addUser.phone"></el-input>
            </div>
            <div class="user-box-select ">
                <div><span>*&nbsp;</span>邮箱</div>
                <div>111@123.com</div>
            </div>
            <div slot="footer" class="dialog-footer">
            <el-button @click="ModifyUser = false">取 消</el-button>
            <el-button type="primary" @click="ModifyUser = true">确 定</el-button>
            </div>
		</el-dialog> -->

	</div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import MessageMixins from '~/mixins/messages'
    import PlatforMixins from '~/mixins/platform'
    import Api from '~/utils/api';
    import DynamicTable from '~/components/DynamicTable'
    import Modal from '~/components/Modal'
	export default {
        name: 'UsersAuthority',
        mixins: [MessageMixins, PlatforMixins],
        components: {
            DynamicTable,
            Modal
        },
		data() {
			var checkPhone = (rule, value, callback) => {
		        if (!value) {
		          return callback(new Error('请输入电话'));
		        }
		        setTimeout(() => {
		        	const phoneReg = /^1[3|4|5|8][0-9]\d{4,8}$/
		        	console.log(phoneReg.test(value),'sss')
		        	if(!phoneReg.test(value)){
		        		callback(new Error('请输入正确的电话'));
		        	} else {
		        		callback();
		        	}
		        }, 1000);
		    };
		    var checkAcount =(rule, value, callback) => {
				console.log(value,"w2qw");
		    	if (!value) {
		          	return callback(new Error('请输入账号(英文或英文数字组合)'));
				}
				const regtest = /^[A-Za-z0-9]+$/ 
				if (!regtest.test(value)) {
					return callback(new Error('请输入正确格式登录账号'));
				} else {
		        	callback();
		        }

		    };
		    return {
		    	//新增用户信息
		    	addUserData:{
		    		userName:'',
		    		department:'',//部门名称
		    		password:'6666',
	        		status:'',
	        		company:'',
	        		email:'',
	        		phone:'',
	        		uType:'',
	        		fullName:''//昵称
				},
				// 用户信息
				userList: [],
				param: {
					pageNo: 1,
					pageSize: 10,
				},
				total: 0,
		        rules: {
		          userName: [
            		{ required: true,validator: checkAcount, trigger: 'blur' }
				  ],
				  fullName: [
		            { required: true, message: '昵称不能为空', trigger: 'blur' }
		          ],
		          company: [
		            { required: true, message: '公司名称不能为空', trigger: 'blur' }
		          ],
		          department: [
		            { required: true, message: '部门名称不能为空', trigger: 'blur' }
		          ],
		          email: [
		            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      				{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
		          ],
		          phone: [
		            { required: true,validator: checkPhone, trigger: 'blur,change' }
		          ],
		          area: [
		            { required: true, message: '请选择活动区域', trigger: 'blur' }
		          ],
		          status: [
		            { required: true, message: '请选择用户状态', trigger: 'change' }
		          ],
		          uType: [
		            { required: true, message: '请选择用户类型', trigger: 'blur,change' }
		          ],
		          mold: [
		            { required: true, message: '请选择账户类型', trigger: 'blur,change' }
		          ]
		        },
		        //修改用户的初始信息
				editData: {},
				editIndex: null,
		    	allMessage:'用户名不能为空',
		    	allMessageType:'success',
		    	isAddUserModalVisible: false,//是否显示新增用户
	        	isModifyUser:false,//是否显示修改用户
	        	labelPosition: 'left',
                // 选中用户的id
                userIds: '',
		    	radio: '1',
		      	searchInput:'',
		      	isAddUserModalVisible1: false,//是否显示新增用户
		      	checked: false,//是否为OA用户
		      	setRoles:false,//设置角色
		      	resetPassword:false,//重置密码
		      	resetPasswordSure:false,//确认重置密码
		      	ModifyUser:false,//修改每条用户信息
		        setRolesData: [{
		        	serialNumber:"1",rolesName:"管理员",describe:"管理员角色"},{
		        	serialNumber:"2",rolesName:"管理员",describe:"管理员角色"},{
		        	serialNumber:"3",rolesName:"管理员",describe:"管理员角色"},{
		        	serialNumber:"4",rolesName:"管理员",describe:"管理员角色"}],

		        addUser: {
		          userAccount: '',
		          phone:'',
		          email:'',
		          region: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: [],
		          resource: '',
		          desc: '',
		          companyName: [{
			          value: '选项1',
			          label: '咪咕文化'
			        }, {
			          value: '选项2',
			          label: '咪咕一级产品'
			        }, {
			          value: '选项3',
			          label: '新媒传信'
			        }],
			        value: ''
		        },
		        formLabelWidth: '120px',
			}
		},

	    mounted() {
            this.refreshPage();
        },
	    methods: {
			//查询所有用户列表用新的  旧的queryUserList  queryEntityUserList
			...mapActions(['queryEntityUserList', 'showPageLoading', 'hidePageLoading']),
			// 分页
            handleCurrentChange(pageNo) {
				console.log("修改pageNo",pageNo);
				this.param.pageNo = pageNo;
                this.userIds = [];
                this.refreshPage(this.param);
			},
			// 修改pageSize
			handleSizeChange(pageSize) {
				console.log("修改pageSize",pageSize);
				this.param.pageSize = pageSize;
				this.userIds = [];
				this.refreshPage(this.param);
			},
            //批量删除用户信息
            onDeleteUser(){
            	//必须选中用户才可进行删除操作
            	if(this.validateUserSelection()) {
            		const params = [ ...this.userIds ]
            		this.goResponeDelUser(params)
                }
            },

            //单个删除用户信息
            onDeleteSingleUser(index,val){
				console.log(val,"12345");
            	const params = {};
				params.uid = val.uid
				params.userGroupId = val.userGroupId
            	this.goResponeDelUser(params)
            },

            //请求删除用户的接口   
            goResponeDelUser(params){
            	this.$confirm('此操作将会删除该条数据, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
					// userDel  removeEntity  解除用户
            		Api.removeEntity(params).then( res => {
            			if(res.code == 0){
            				this.allMessage = res.msg;
            				this.messagePrompt()
            				this.refreshPage(this.param);

            			}else{
            				this.allMessage = res.msg;
            			}
            		})
		        }).catch(() => {
		          this.allMessage = '已取消删除';
		          this.allMessageType = 'info'
		          this.messagePrompt()
		        });
            },
            //保存新增的用户信息
            onSaveUser(formName) {
				console.log(formName,"新增");
            	this.$refs[formName].validate((valid) => {
					//新增用户
			        if (valid) {
			          	if(this.addUserData.status == '未启用' ){
			          		this.addUserData.status = 0;
			          	}else if(this.addUserData.status == '已启用' ){
			          		this.addUserData.status = 1;
			          	}else if(this.addUserData.status == '已禁用' ){
			          		this.addUserData.status = 2;
			          	}else if(this.addUserData.status == '已删除' ){
			          		this.addUserData.status = 3;
			          	}
			          	if(this.addUserData.uType == '系统管理员'){
			          		this.addUserData.uType = 1;
			          	}else if(this.addUserData.uType == '普通用户'){
			          		this.addUserData.uType = 2;
						  }
						if(this.addUserData.mold == 'ngoc用户'){
			          		this.addUserData.mold = 0;
			          	}else if(this.addUserData.mold == 'oa用户'){
			          		this.addUserData.mold = 1;
			          	}
			          	const params = { ...this.addUserData }
						  // console.log(params) 
						  // addUser  addEntity添加用户
			          	Api.addEntity(params).then( res => {
	            			if(res.code == 0){
	            				this.isAddUserModalVisible = false;
	            				this.allMessage = '新增用户' + res.msg;
	            				this.messagePrompt();
	            				this.refreshPage(this.param);
	            			}else{
	            				this.allMessage = '新增用户' + res.msg;
	            			}
	            		})
			        } else {//正则校验没有通过
			            return false;
			        }
		        });
            },

            //保存修改的用户信息
            onSaveModifyUser(formName) { 
				console.log(formName,"编辑");
            	if(this.editData.uType == 0){
            		this.allMessage = '您不是系统管理员不能修改';
            		this.allMessageType = 'warning'
        			this.messagePrompt()
            	}
            	const params = this.editData;
				// userModify editEntity编辑用户信息
            	Api.editEntity(params).then( res => {
        			if(res.code == 0){
						this.isModifyUser = false;
        				this.allMessage = '编辑用户' + res.msg;
        				this.messagePrompt()
        				this.refreshPage(this.param);
        			}else{
        				this.allMessage = '编辑用户' + res.msg;
        			}
        		})
			},
			onCloseModifyUser() {
				this.editData = {
					userName: '',
					department: '',//部门名称
					companyName: '',
					groupName: '',
					status: null,
					mold: null,
	        		company: '',
	        		email: '',
	        		phone: '',
	        		uType: null,
					fullName: '',//昵称
					userGroupId: null,
					uid: null,
				}
			},
            //信息提示的方法
            messagePrompt(){
            	this.$message({
		          showClose: true,
		          message:this.allMessage,
		          type: this.allMessageType,
		        });
            },

            //修改用户信息
            ModifyUserIndorm(index,val){
				console.log(val,'编辑用户');
				this.isModifyUser = true;
				this.editIndex = index;
				this.editData = {
					companyName: val.companyName,
					department: val.department,
					phone: val.phone,
					email: val.email,
					fullName: val.fullName,
					groupName: val.groupName,
					mold: val.mold,
					status: val.status,
					uType: val.uType,
					uid: val.uid,
					userGroupId: val.userGroupId,
					userName: val.userName,
				}
            },
            onSearchUser(){
				const paramss = Object.assign({}, this.param, { searchContent:this.searchInput })
            	this.refreshPage(paramss)
            },

            //重置密码
            isResetPassword(index,val){
        		this.$confirm('确定重置密码?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	const params = {
		        		uid:val.uid,
		        		password:'123456'
		        	}
					const params1 = { ...params }
					// 无新的 userModifyPwd    modifyPwdEntity
		        	Api.modifyPwdEntity(params1).then( res => {
            			if(res.code == 0){
            				this.allMessage = res.msg;
            				this.messagePrompt()
            			}else{
            				this.allMessage = res.msg;
            			}
            		})
		        }).catch(() => {
		          this.allMessage = '已取消重置';
		          this.allMessageType = 'info'
		          this.messagePrompt()
		        });
		   },
			//选择编辑
            onSelectionChange( selectedUsers ){
				//传uid 和  userGroupId对象
				console.log(selectedUsers,"123456")
                this.userIds = selectedUsers.map( user => user.uid)
            },

            isLock_P(val,type){
            	console.log(val.uid,type)
            	const params = { status:type, uids:val.uid}
            	console.log(params)
            	Api.updateUserStatus(params).then( res => {
        			if(res.code == 0){
        				this.allMessage = res.msg;
        				this.messagePrompt()
        				this.refreshPage(this.param);
        			}else{
        				this.allMessage = res.msg;
        			}
        		})

            	//新状态,锁定传入2,解锁传入1
            	//status == 1启用，表示要去禁用，

            },
            onUserLock(){
            	if(this.validateUserSelection()){

                }
            },

            onUserUnlock() {
                if(this.validateUserSelection()){

                }
            },

            onUserRoleSetting(){
                if(this.validateUserSelection()){

                }
            },

            validateUserSelection() {
                if(this.isUserSelected) {
                    return true
                }
                this.showWarning('请选中用户后再操作！')
                return false
            },


			refreshPage(otherParams = {}){
				const params = {...otherParams};
				console.log(params,"传参");
				this.showPageLoading();
				this.queryEntityUserList(params).then(resp => {
					console.log(resp);
					this.userList = resp.result;
					this.total = resp.totalCount;
					this.hidePageLoading();
				})
			},
		},
		computed: {

            // ...mapState({
            //     users: ({authorityUsers}) => authorityUsers.users
            // }),

            isUserSelected() {
                return this.userIds.length > 0
            }
		},
	}
</script>

<style lang='scss'>
.page-content {
	.authority-users {
		padding: 0 20px;
	}
}
$font-size:16px;
$nav-margin:2%;
.authority-users {
	background:#fff;
	.nav-set-btn, .nav-exportUserMes{
		.el-button--primary.is-plain{
			font-size: $font-size;
			background-color: #fff;
		    background:#fff;
		    color:#409EFF;
		    &:hover{
		    	color:#409EFF;
		    }
		}

	}
	.authority-users-searchBox{
		margin:$nav-margin 0;
		padding-top:$nav-margin;
	}
	.authority-users .authority-users {
		background-color: white;
		.authority-roles-searchBox{
		padding-top:20px;
		}
	}
	.exportBtn{
		.el-button--primary.is-plain{
			width:80%;
		}
	}
	.el-table th{
		background-color:#F2F8FF;
	}
	.el-table .cell{
		text-align:center;
		.statusIcon, .handleIcon{
			width:30px;
			border:1px solid #dcdcdc;
			line-height:30px;
			text-align:center;
			height:30px;
			display:inline-block;
			border-radius:50%;
			font-size: $font-size;
		}
		.statusIcon{
			background:#74c480;
			color:#fff;
		}
	}
	.el-pagination-tab{
		text-align:right;
		margin:$nav-margin;
		font-size:$font-size;

	}
	.el-pagination {
		.btn-prev, .btn-next{
			i{
				display:none;
			}
		}
		.btn-prev{
			&:before{
				content:"上一页"
			}
		}
		.btn-next{
			&:before{
				content:"下一页"
			}
		}
	}
	.authority-users .authority-users {
		background-color: white;
		.authority-roles-searchBox{
		padding-top:20px;
		}
	}
	.exportBtn{
		.el-button--primary.is-plain{
			width:80%;
		}
	}
	.el-table th{
		background-color:#F2F8FF;
	}
	.el-table .cell{
		text-align:center;
		.statusIcon, .handleIcon{
			width:30px;
			border:1px solid #dcdcdc;
			line-height:30px;
			text-align:center;
			height:30px;
			display:inline-block;
			border-radius:50%;
			font-size: $font-size;
		}
		.statusIcon{
			background:#74c480;
			color:#fff;
		}
	}
	.el-pagination-tab{
		text-align:right;
		margin:$nav-margin;
		font-size:$font-size;

	}
	.el-pagination {
		.btn-prev, .btn-next{
			i{
				display:none;
			}
		}
		.btn-prev{
			&:before{
				content:"上一页"
			}
		}
		.btn-next{
			&:before{
				content:"下一页"
			}
		}
	}
	.resetPassword{
		width: 80%;
    	margin-left: 10%;
	}
	.setRoles, .addUser, .resetPassword{
		.el-dialog__header {
		    margin: 15px 15px 10px;
		    border-bottom: 1px solid #dcdcdc;
		    padding: 15px 15px 10px;
		}

	}
	.addUser{
		.user-box-select{
			width:90%;
			margin-left:5%;

			>div{
				float:left;
				margin-bottom:4%;
				&:first-child{
					width:20%;
					span{
						color:red;
					}
				}
				&:last-child{
					width:80%;
				}

			}
			.addUserName{
				>div{
					float:left;
					&:first-child {
						width:50%;
					}
					&:last-child{
						width:50%;
						text-align:center;
						line-height:40px;
					}
				}
			}
			.el-select{
				width:100%;
			}
		}
	}
	.resetPassword {
		.el-dialog__body{
			.text-alignRight{
				text-align:right;

			}

		}
	}
}

</style>
