<template>
	<el-row class="authority-roles">
		<el-row class="authority-roles-searchBox">
			<el-col :span='19' class="authority-roles-searchBox-add">
				<el-col :span="2">
					<el-button size='small' type="primary" plain icon="el-icon-plus" @click="showAddDialog">增加
					</el-button>
				</el-col>
				<el-col :span="3">
					<el-button size='small' type="primary" plain @click="onDeleteRoles">批量删除
					</el-button>
				</el-col>
			</el-col>
			<el-col :span='4'>
				<el-col :span='24'>
					 <el-input size='small'
					 @change="onSearchRoleList"
					    placeholder="输入角色名称"
					    prefix-icon="el-icon-search"
					    v-model="searchInput">
					  </el-input>
				</el-col>
			</el-col>
		</el-row>
		<el-row class="authority-roles-dataList">
			  <!-- <dynamic-table
		        :data='roles.result'
                :pageNo='roles.pageNo'
                :pageSize='roles.pageSize'
                :total='roles.total'
                @pagination='onPagiation'
                @selection="onSelectionChange"
			    > -->
			<el-table :data='roleList' border @selection-change="onSelectionChange">
			   	<!-- <el-table-column
			      fixed
			      label="序号">
			       <template slot-scope="scope">
                      {{ (roles.pageNo - 1) * roles.pageSize +  scope.$index + 1 }}
                  </template>
			    </el-table-column> -->
			     <el-table-column
			      type="selection" width="55">
			    </el-table-column>
			    <el-table-column
			      prop="roleId"
			      label="角色id"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="roleName"
			      label="角色名称"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="roleDesc"
			      label="角色的描述"
			      >
			    </el-table-column>
			    <el-table-column
			      label="角色状态"
			      >
			      <template slot-scope="scope">
                      <span v-if='scope.row.status == 0'>启用</span>
                      <span v-if='scope.row.status == 1'>未启用</span>
                      <span v-if='scope.row.status == 2'>已删除</span>
                  </template>
			    </el-table-column>
				<el-table-column
			      label="角色类型"
			      >
			      <template slot-scope="scope">
                      <span v-if='scope.row.roleType == 1'>管理员角色</span>
                      <span v-if='scope.row.roleType == 2'>普通用户角色</span>
					  <span v-if='scope.row.roleType == 0'>未知角色</span>
                  </template>
			    </el-table-column>
			    <el-table-column
			      label="创建时间"
			      >
			       <template slot-scope="scope">
                      {{scope.row.createAt}}
                  </template>
			    </el-table-column>
			    <el-table-column
			      label="更新时间"
			      >
			       <template slot-scope="scope">
                      {{scope.row.updateAt}}
                  </template>
			    </el-table-column>
			    <el-table-column
			      fixed="right"
			      label="操作"
			      >
			      <template slot-scope="scope">
			       	<div class="handleButtonContainer"  @click="editRoles(scope.row)">
		       		 	<el-tooltip class="item" effect="light" content="编辑" placement="bottom" visible-arrow="false" size="mini">
			       		 	<i class="el-icon-edit-outline"></i>
			       			<!-- <el-button type="text" icon="el-icon-edit-outline"></el-button> -->
		       			</el-tooltip>
			       	</div>
		       	 	<div class="handleButtonContainer" @click="designatedUser(scope.row.roleId)">
		       	 		<el-tooltip class="item" effect="light" content="指定用户" placement="bottom">
		       				<i class="icon-locked"></i>
		       			</el-tooltip>
			       	</div>
		       	 	<div class="handleButtonContainer" @click="setAuthority(scope.row.roleId)">
		       	 		<el-tooltip class="item" effect="light" content="设置权限" placement="bottom">
		       				<i class="icon-unlocked"></i>
		       			</el-tooltip>
			       	</div>
			       	<div class="handleButtonContainer" @click="addUser(scope.row)">
		       	 		<el-tooltip class="item" effect="light" content="添加用户" placement="bottom">
		       				<i class="icon-square-add"></i>
		       			</el-tooltip>
			       	</div>
		       	 	<div class="handleButtonContainer" @click="deleteRoleItem(scope.row.roleId)" v-if="scope.row.roleId != 30000 && scope.row.status != 2">
		       	 		<el-tooltip class="item" effect="light" content="删除" placement="bottom" >
		       				<i class="el-icon-delete"></i>
		       			</el-tooltip>
			       	</div>
			      </template>
			    </el-table-column>
			</el-table>
			<div class="pagination-section">
				<el-pagination @size-change="roleHandleSizeChange" @current-change="roleHandleCurrentChange"
								:current-page="roleParam.pageNo" background
								:page-size="roleParam.pageSize" layout="total, sizes, prev, pager, next, jumper"
								:total="roleTotal">
				</el-pagination>
			</div>
		</el-row>
		<!-- 新增或修改角色弹窗 -->
		 <Modal :title="isAdd?'新增角色信息':'修改角色信息'" @close="onCloseRole" @save="onSaveUser('ruleForm')" v-model="addDialog">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px">
                <el-form-item label="角色名称：" prop="roleName">
                	<el-col >
                		<el-input type="text" v-model="ruleForm.roleName" auto-complete="off"></el-input>
                	</el-col>
                </el-form-item>
                <!-- <el-form-item label="角色状态：" prop="status">
                	<el-col >
                		  <el-select v-model="ruleForm.status" placeholder="请选择">
						    <el-option :value="0" label="启用"></el-option>
                            <el-option :value="1" label="禁用"></el-option>
                        	<el-option :value="2" label="已删除"></el-option>
						  </el-select>
                	</el-col>
                </el-form-item> -->

				<el-form-item label="角色状态：" prop="status">
					<el-radio-group v-model="ruleForm.status">
						<el-radio :label="0">启用</el-radio>
					    <el-radio :label="1">禁用</el-radio>
					    <el-radio :label="2">已删除</el-radio>
				    </el-radio-group>
				</el-form-item>

				<el-form-item label="角色类型：" prop="roleType">
				    <el-radio-group v-model="ruleForm.roleType">
				    	<!-- <el-radio :value="1" label="管理员角色" ></el-radio> -->
					    <!-- <el-radio :value="2" label="普通用户角色"></el-radio> -->
						<el-radio :label="1" >管理员角色</el-radio>
					    <el-radio :label="2">普通用户角色</el-radio>
						<el-radio :label="0">未知角色</el-radio>
				    </el-radio-group>
				</el-form-item>
                <el-form-item label="描述：" prop="roleDesc">
                	<el-col>
                		 <el-input type="textarea" v-model="ruleForm.roleDesc" auto-complete="off"></el-input>
                	</el-col>
                </el-form-item>
            </el-form>
        </Modal>
        <!-- 指定用户弹窗 -->
        <el-dialog title="指定用户" :visible.sync="dialogDesignatedUser">
			  <!-- <dynamic-table
			    max-height="500"
		        :data='userList.result'
	            :pageNo='userList.pageNo'
	            :pageSize='userList.pageSize'
	            :total='userList.total'
	            @pagination='onDesignPagiation'> -->
			<el-table max-height="500" :data='userList' border>
			    <el-table-column
			      prop="uid"
			      label="用户Id"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="username"
			      label="用户名称"
			      >
			    </el-table-column>
			     <el-table-column
			      prop="company"
			      label="公司名称"
			      >
			    </el-table-column>
			      <el-table-column
			      prop="department"
			      label="部门名称"
			      >
			    </el-table-column>
			      <el-table-column
			      prop="phone"
			      label="电话号码"
			      >
			    </el-table-column>
			</el-table>
			<div class="pagination-section">
				<el-pagination @size-change="userHandleSizeChange" @current-change="userHandleCurrentChange"
								:current-page="userParam.pageNo" background
								:page-size="userParam.pageSize" layout="total, sizes, prev, pager, next, jumper"
								:total="userTotal">
				</el-pagination>
			</div>
		</el-dialog>
		<!-- 设置权限弹窗 -->
		<Modal title="设置权限" v-model="dialogSetAuthority" max-height="400" @save="onSaveGrant">
			<el-row class="privilege-left-tree">
				<el-tree :data="PrivilegeTreeDate" :props="defaultProps" show-checkbox @node-click="handleNodeClick" :highlight-current='true' ref="tree" :default-expand-all='true' node-key="menuId">
				</el-tree>
			</el-row>
		</Modal>
		<!-- 新增用户 -->
		<Modal title="新增用户" v-model="dialogAddUser" @save="onSaveUserBtn">
			<el-row class="authority-roles-dataList">
			<!-- <dynamic-table
		        :data='noUserList.result'
                :pageNo='noUserList.pageNo'
                :pageSize='noUserList.pageSize'
                :total='noUserList.total'
                @pagination='onAddUserPagiation'
                @selection="onSelectionChangeUser"> -->
			<el-table :data='noUserList' border @selection-change="onSelectionChangeUser">
			    <el-table-column
			      type="selection">
			    </el-table-column>
			    <el-table-column
			      prop="username"
			      label="用户名称"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="company"
			      label="公司名称"
			      >
			    </el-table-column>
			     <el-table-column
			      prop="phone"
			      label="电话"
			      >
			    </el-table-column>
			      <el-table-column
			      prop="updateAt"
			      label="更新时间"
			      >
			    </el-table-column>
			     <el-table-column
			      label="状态"
			      >
			       <template slot-scope="scope">
                      <span v-if='scope.row.status == 0'>未启用</span>
                      <span v-if='scope.row.status == 1'>启用</span>
                      <span v-if='scope.row.status == 2'>禁用</span>
                  </template>
			    </el-table-column>
			</el-table>
			<div class="pagination-section">
				<el-pagination @size-change="noUserHandleSizeChange" @current-change="noUserHandleCurrentChange"
								:current-page="noUserParam.pageNo" background
								:page-size="noUserParam.pageSize" layout="total, sizes, prev, pager, next, jumper"
								:total="noUserTotal">
				</el-pagination>
			</div>
		</el-row>
		</Modal>
	</el-row>
</template>
<script>
    import {mapActions, mapState} from 'vuex'
    import MessageMixins from '~/mixins/messages'
    import  PlatformMixins from '~/mixins/platform'
	import Api from '~/utils/api';
	import misc from '~/utils/misc'
    import DynamicTable from '~/components/DynamicTable'
    import Modal from '~/components/Modal'
	export default {
		name: 'RolesAuthority',
	    mixins: [MessageMixins, PlatformMixins],
        components: {
            DynamicTable,
            Modal
        },
		  data () {
	        return {
				// 拿到数据
				userList: [],
				userTotal: 0,
				roleList: [],
				roleTotal: 0,
				noUserList: [],
				noUserTotal: 0,
				userParam: {
					pageNo: 1,
	        		pageSize: 10,
				},
				roleParam: {
					pageNo: 1,
	        		pageSize: 10,
				},
				noUserParam: {
					pageNo: 1,
	        		pageSize: 10,
				},
				// ----------
				roleId:'',
				userGroupId: '',
                roleIds: [],// 选中用户的id
                userIds:[],
	        	searchInput:null, //角色查询
	        	counts:null,
	        	addDialog:false,
	        	isAdd:true,
	        	addLoading: false,
	        	superManager:false, //超级管理员
	        	selectRoleId : '',
	        	ruleForm:{
	        		roleName:'',
	        		status: 0,
					roleDesc:'',
					roleType: 1
	        	},
	        	rules:{
	        		roleName:[{ required: true, message: '请输入1-32位中文或英文', trigger: 'blur' }],
					status:[{required: true, message: '请选择角色状态', trigger: 'blur'}],
					roleType:[{required: true, message: '请选择角色类型', trigger: 'blur'}]
	        	},
	        	options:[
		        	{
		        		value: '0',
          				label: '启用'
		        	},
		        	{
		        		value: '1',
          				label: '禁用'
					},
					{
		        		value: '2',
          				label: '已删除'
		        	},
	        	],
	        	dialogDesignatedUser:false,  //指定用户弹窗
	        	dialogSetAuthority:false,  //设置权限弹窗
	        	dialogAddUser:false,  //新增用户弹窗
	        	PrivilegeTreeDate: [{
		         	label: '权限信息',
		          	children: [
			        ]
		        }],

		        defaultProps: {
		          children: 'children',
		          label: 'label'
		        },
	        }
	    },
	    methods:{
	    	...mapActions(['queryRoles', 'showPageLoading', 'hidePageLoading','queryRolesUerList','queryNoUserList']),

	    	//获取角色列表
	   		refreshPage(otherParams = {}){
	   			const params = { ...otherParams };
                this.showPageLoading();
                this.queryRoles(params).then(resp => {
					console.log(resp,"角色");
					this.roleList = resp.result;
					this.roleTotal = resp.totalCount;
					this.hidePageLoading();
				});
			},
			// 角色分页
            roleHandleCurrentChange(pageNo) {
				console.log("角色修改pageNo",pageNo);
				this.roleParam.pageNo = pageNo;
                this.roleIds = [];
                this.refreshPage(this.roleParam);
			},
			// 角色修改pageSize
			roleHandleSizeChange(pageSize) {
				console.log("角色修改pageSize",pageSize);
				this.roleParam.pageSize = pageSize;
				this.roleIds = [];
				this.refreshPage(this.roleParam);
			},
		    onSearchRoleList(){
				const paramss = Object.assign({}, this.roleParam, { roleName: this.searchInput })
		        this.refreshPage(paramss);
		    },
		    //获取指定用户列表
		    getuserList(){
		    	console.log(this.selectRoleId);
		    	var params = {
		    		roleId: this.selectRoleId,
					pageNo: this.userParam.pageNo,
					pageSize: this.userParam.pageSize
		    	}
	    	    this.showPageLoading()
                this.queryRolesUerList(params).then(resp => {
					console.log(resp,"用户");
					this.userList = resp.result;
					this.userTotal = resp.totalCount;
					this.hidePageLoading();
				})
			},
			// 指定用户分页
            userHandleCurrentChange(pageNo) {
				console.log("指定用户修改pageNo",pageNo);
				this.userParam.pageNo = pageNo;
                this.getuserList();
			},
			// 指定用户修改pageSize
			userHandleSizeChange(pageSize) {
				console.log("指定用户修改pageSize",pageSize);
				this.userParam.pageSize = pageSize;
				this.getuserList();
			},

		    //根据角色id获取该角色下没有的uerList  （新增用户）
		    getNoUserList(){
		    	var params = {
					roleId: this.roleId,
					userGroupId: this.userGroupId,
		    		pageSize: this.noUserParam.pageSize,
		    		pageNo: this.noUserParam.pageNo
		    	}
	    	    this.showPageLoading()
                this.queryNoUserList(params).then(resp => {
					console.log(resp,"无用户");
					this.noUserList = resp.result;
					this.noUserTotal = resp.totalCount;
					this.hidePageLoading();
				})
			},
			// 新增角色下用户分页
            noUserHandleCurrentChange(pageNo) {
				console.log("新增用户修改pageNo",pageNo);
				this.noUserParam.pageNo = pageNo;
                this.getNoUserList();
			},
			// 新增角色下用户修改pageSize
			noUserHandleSizeChange(pageSize) {
				console.log("新增用户修改pageSize",pageSize);
				this.noUserParam.pageSize = pageSize;
				this.getNoUserList();
			},

            //选中角色列表进行操作
            onSelectionChange(selectedRoles){
				this.roleIds = selectedRoles;
				console.log(this.roleIds,"选择角色进行操作");
            },

			//新增用户选择进行操作
            onSelectionChangeUser(selectedUers){
				this.userIds = selectedUers.map( user => user.uid);
				console.log(this.userIds,"选择用户拿到uid进行新增");
            },

            //批量删除角色
            onDeleteRoles(){
            	if(this.validateRoleSelection()){
					const h = this.$createElement;
					this.$msgbox({
						title: '提示',
						message: h('p', null, [
							h('span', null, '确定批量删除？ '),
						]),
						showCancelButton: true,
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						beforeClose: (action, instance, done) => {
							if (action === 'confirm') {
								instance.confirmButtonLoading = true;
								instance.confirmButtonText = '执行中...';
								setTimeout(() => {
									done();
									setTimeout(() => {
										instance.confirmButtonLoading = false;
									}, 300);
								}, 3000);
							} else {
								done();
							}
						}
					}).then(action => {
						let  DeteteList = [];
						this.roleIds.forEach((item)=>{
							if(item.roleId != 30000){
								DeteteList.push(item.roleId);
							}
						})
						if (DeteteList.length > 1) {
							Api.deleteRole(DeteteList).then(()=>{
								this.showSuccess();
								this.refreshPage(this.roleParam)
							})
						} else {
							this.$message("请添加多个删除")
						}
					});
                }

            },
            // 单个删除角色
	    	deleteRoleItem(roleId){
	    		  this.$confirm('此操作将永久删除, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        var roleIds = []
		        roleIds.push(roleId)
		        Api.deleteRole(roleIds).then(()=>{
	                  this.showSuccess();
	                  this.refreshPage(this.roleParam);
	              })
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });
		        });
	    	},

            //判断是否选中角色列表
          	validateRoleSelection() {
            	if(this.isRoleSelected) {
                	return true
            }
            	this.showWarning('请选中角色后再操作！')
            		return false

            },

            validateUserSelection(){

        		if(this.isUserSelected){
        			return true
    		}
        		this.showWarning('请选中角色后再操作！')
            		return false
            },

	    	//点击确认添加按钮
	    	onSaveUser(formName){
	    		var that = this;
    		   	this.$refs[formName].validate((valid) => {
		          if (valid) {
		             if(this.isAdd){
			             	var params = { ...this.ruleForm };
			             	// for(var p in params){
                         // 	(p && params[p]) ? params[p] = params[p].trim() : ''
                         // }
			             	Api.addRole(params).then(res => {
	             	  	 	this.refreshPage(this.roleParam)
		                   	this.showSuccess()
                            this.addDialog = false;
                    	}).catch(err => {
		                    console.error(err)
		                });
		             }else{
		             	var params = that.ruleForm ;
		             	// for(var p in params){
			             // 		(p && params[p]) ? params[p] = params[p].trim() : ''
			             // 	}
		             	Api.editRole(params).then(data => {
	                    this.refreshPage(this.roleParam)
	                    this.showSuccess()
	                    this.addDialog = false;
		                }).catch(err => {
		                    console.error(err)
		                })
		             }
		          } else {
		            return false;
		          }
        		});
	    	},
	    	//点击取消
	    	onCloseRole(){
	    		this.ruleForm = {
	        		roleName:'',
	        		status:'',
	        		roleDesc:''
	        	}
	    	},
	    	//点击编辑角色信息
	    	editRoles(row){
				console.log(row,'编辑信息');
	    		this.addDialog = true;
	    		this.isAdd = false;
    		  	this.ruleForm = {
	                roleId: row.roleId,
	                roleName: row.roleName,
	                status: row.status,
					roleDesc: row.roleDesc,
					roleType: row.roleType
            	}
			},
			//点击新增角色信息
			showAddDialog(){
				this.isAdd = true;
	    		this.addDialog = true;
	    	},
			 //添加用户
          	addUser(row){
				console.log(row,"1213")
				this.dialogAddUser = true;
				this.roleId = row.roleId
				this.userGroupId = row.userGroupId
          	 	this.getNoUserList()
			},
			//点击保存添加用户
          	 onSaveUserBtn(){
          	 	if(this.validateUserSelection()){
          	 		const params = {
          	 			uid : this.userIds,
						roleId : this.roleId
          	 		}
          	 		 Api.addRolesUser(params).then(()=>{
	                  this.showSuccess();
	                  this.refreshPage(this.roleParam)
	                  this.dialogAddUser = false
	              })}
          	 },
	    	//点击指定用户
	    	designatedUser(rolesId){
	    		console.log(rolesId)
	    		this.selectRoleId = rolesId;
	    		this.dialogDesignatedUser = true;
	    		this.getuserList()
			},
			transfer (menuList){
		    	menuList.map((menu) =>{
					menu.label = menu.menuName
					delete menu.menuName
					if(menu.children){
						this.transfer(menu.children)
					}
				})
		    },
		     handleNodeClick(data) {
		        console.log(data,"节点点击选中");
		    },
	    	//点击权限设置
	    	setAuthority(rolesId){
				console.log(rolesId,"拿到roleId");
	    		this.dialogSetAuthority = true;
	    		this.selectRoleId = rolesId;
	    		Api.queryPrivilegeList().then((res)=>{
	                  this.PrivilegeTreeDate[0].children = res.treeList;
	                  this.transfer(this.PrivilegeTreeDate[0].children);
              	});
              	const params = {
	    			roleId:rolesId
	    		};
	    		//获取所有权限集合
              	Api.setMenu(params).then((res)=>{
	                  console.log(res)
	                  console.log(88888)
	                  let menuIdArray = []
	                  res.forEach(item=>{
	                  	menuIdArray.push(item.menuId)
	                  })
	                  this.$refs.tree.setCheckedKeys(menuIdArray);
	                  console.log(menuIdArray,"已选中部分")
	                  return

              	})
	    	},
    		//根据id获取该id下有哪些权限
          	 onSaveGrant(){
				// let menuIdsArray = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
				let menuIdsArray = this.$refs.tree.getCheckedKeys()
				// menuIdsArray = menuIdsArray.filter(item => {
				// 	return item != undefined || item != null
				// })
				console.log(menuIdsArray,"重新选中");
				const params = {
					roleId: this.selectRoleId,
					menuIds: menuIdsArray
				}
				Api.grantRivilege(params).then(()=>{
						this.showSuccess()
						this.dialogSetAuthority = false;
						this.refreshPage(this.roleParam)
				})
			},
			getCheckedAll(){
				return this.flatState.filter(function (e) {
					if(e.node.indeterminate){
						return e.node.indeterminate
					}
					return e.node.checked
				}).map(function (e) {
					return e.node
				})
			},
			  
			//   状态值转化
			getStatus(status) {
				console.log(status,"123status",this.options[status].label)
				// if(status) return this.options[status].label
				if(status) return this.options[status].value
			},
	    },
	      beforeMount(){
            this.refreshPage(this.roleParam);
        },

         computed: {
        	//   ...mapState({
            //     roles: ({authorityRoles}) => authorityRoles.roles,
            //     userList:({authorityRoles}) => authorityRoles.userList,
            //     noUserList:({authorityRoles}) => authorityRoles.noUserList
            // }),
        	//     判断是否选中角色列表
            isRoleSelected() {
                return this.roleIds.length > 0
            },
             isUserSelected() {
                return this.userIds.length > 0
            }

        }
    }

</script>
<style lang='scss'>
	.authority-roles {
		background-color: white;
		.authority-roles-searchBox{
			padding:20px 0px 20px 0px;
			border-bottom:1px dashed lightgray;
				.authority-roles-searchBox-add{
					margin-left:20px;
					}
			}
	}
	.handleButtonContainer{
		width:30px;
		height:30px;
		border-radius:50%;
		background-color:#eceff1;
		display:inline-block;
		text-align:center;
		vertical-align:top;
			i{
				line-height: 24px;
			    height: 20px;
			    vertical-align: middle;
			    color: #409eff;
		        cursor: pointer;
			}
	}
	.authority-roles-dataList{
		padding:10px;
	}
	.el-table th{
		background-color:#F2F8FF;
	}
	.privilege-left-tree{
		height:500px;
		overflow-y: scroll
	}

</style>
