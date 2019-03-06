<template>
	<el-row class="authority-privilege">
		<el-row class="authority-privilege-box">
			<el-row class="privilege-left-tree">
				<el-tree :data="PrivilegeTreeDate" :props="defaultProps" @node-click="handleNodeClick" :highlight-current='true' node-key="id">
				</el-tree>
			</el-row>
			<el-row class="privilege-right-tab">
				<el-row>
					<el-col :span="20"><h3>权限管理</h3></el-col>
				</el-row>
				<el-row class="authority-privilege-function">
					<el-col :span='19' class="authority-roles-searchBox-add">
						<el-col :span="4">
							<el-button size='small' type="primary" plain icon="el-icon-plus" @click="onAddMenu">新增菜单
							</el-button>
						</el-col>
						<el-col :span="4">
							<el-button size='small' type="primary" plain @click="onBatchDelete">批量删除
							</el-button>
						</el-col>
					</el-col>
				</el-row>
				<el-row class="roleInfoList">
					  <el-table
					  @selection-change="handleSelectionChange"
					    :data="tableData"
					    stripe
					    style="width: 100%">
					      <el-table-column
					      type="selection"
					      >
					    </el-table-column>
					    <el-table-column
					      prop="menuId"
					      label="菜单Id"
					      width="180">
					    </el-table-column>
					    <el-table-column
					      prop="label"
					      label="菜单名称"
					      width="180">
					    </el-table-column>
					    <el-table-column
					      prop="menuUrl"
					      label="菜单地址">
					    </el-table-column>
					    <el-table-column
					      prop="menuType"
					      label="菜单类型">
					    </el-table-column>
					    <el-table-column
					      prop="createAt"
					      label="创建时间">
					    </el-table-column>
					     <el-table-column
			      fixed="right"
			      label="操作"
			      >
			      <template slot-scope="scope">
			       	<div class="handleButtonContainer"  @click="editPrivilege(scope.row,scope.row.menuId)">
		       		 	<el-tooltip class="item" effect="light" content="编辑" placement="bottom" visible-arrow="false" size="mini">
			       		 	<i class="el-icon-edit-outline"></i>
		       			</el-tooltip>
			       	</div>
		       	 	<div class="handleButtonContainer" @click="onMoveUpPrivilege(scope.row)" >
		       	 		<el-tooltip class="item" effect="light" content="上移" placement="bottom" >
		       				<i class="el-icon-upload2" :disabled="isDisable"></i>
		       			</el-tooltip>
			       	</div>
	       		 	<div class="handleButtonContainer" @click="onMoveDownPrivilege(scope.row)">
		       	 		<el-tooltip class="item" effect="light" content="下移" placement="bottom" >
		       				<i class="el-icon-download"></i>
		       			</el-tooltip>
			       	</div>
			      </template>
			    </el-table-column>
					  </el-table>
			</el-row>
			</el-row>
		</el-row>
			<!-- 新增权限弹窗 -->
		 <Modal :title="isAdd ? '新增权限信息' : '修改权限信息'" @close="onCloseRole" @save="onSavePrivilege('savePrivilegeForm')" v-model="isAddMenuDialogVisible">
            <el-form :model="savePrivilegeForm" :rules="rules" ref="savePrivilegeForm" label-width="130px">
                <el-form-item label="菜单名称：" prop="menuName">
                	<el-col >
                		<el-input type="text" v-model="savePrivilegeForm.menuName" auto-complete="off" min="4" max="5000"></el-input>
                	</el-col>
                </el-form-item>
                <el-form-item label="菜单类型：" prop="menuType">
                	<el-col >
                		  <el-select v-model="savePrivilegeForm.menuType" placeholder="请选择">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
                	</el-col>
                </el-form-item>
                <el-form-item label="菜单地址：" prop="menuUrl">
                	<el-col>
                		 <el-input type="textarea" v-model="savePrivilegeForm.menuUrl" auto-complete="off"></el-input>
                	</el-col>
                </el-form-item>
            </el-form>
        </Modal>
	</el-row>
</template>
<script>
import { mapActions, mapState } from "vuex";
import MessageMixins from "~/mixins/messages";
import PlatformMixins from "~/mixins/platform";
import Api from "~/utils/api";
import misc from '~/utils/misc'
import DynamicTable from "~/components/DynamicTable";
import Modal from "~/components/Modal";
export default {
  name: "PrivilegeAuthority",
  mixins: [MessageMixins, PlatformMixins],
  components: {
    DynamicTable,
    Modal
  },
  data() {
    return {
      isAdd: true,
      isDisable: false, //上下移禁用
      selectMenuId: "", //选中ID
      menuIdIds: [], //选中要删除的menuIdId
      options: [
        {
          value: "button",
          label: "button"
        },
        {
          value: "menu",
          label: "menu"
        }
      ],
      savePrivilegeForm: {
        menuName: "",
        menuType: "",
        menuUrl: "",
        parentId: "",
        menuId: null
      },
      rules: {
        menuName: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" },
          {
            min: 4,
            max: 20,
            message: "请输入长度范围是4-20的菜单字符",
            trigger: "change,blur"
          }
        ],
        menuType: [
          { required: true, message: "请选择菜单类型", trigger: "blur" }
        ],
        menuUrl: [
          { required: true, message: "请输入菜单地址", trigger: "blur" }
        ]
      },
      PrivilegeTreeDate: [
        {
          label: "权限信息",
          children: []
        }
      ],

      defaultProps: {
        children: "children",
        label: "label"
      },
      tableData: [],
      isAddMenuDialogVisible: false
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data, "click-node");
      this.selectMenuId = data.menuId;
      this.tableData = data.children;
    },
    transfer(menuList) {
      menuList.map(menu => {
        menu.label = menu.menuName;
        delete menu.menuName;
        if (menu.children) {
          this.transfer(menu.children);
        }
      });
    },

    //获取菜单列表 tree
    refreshPage() {
      Api.queryPrivilegeList().then(res => {
        this.PrivilegeTreeDate[0].children = res.treeList;
        this.transfer(this.PrivilegeTreeDate[0].children);
      });
    },

    //点击新增菜单按钮
    onAddMenu() {
      this.isAdd = true;
      this.savePrivilegeForm.parentId = this.selectMenuId;
      this.isAddMenuDialogVisible = true;
	  console.log(this.savePrivilegeForm.parentId);
	//   不需要判断selectMenuId是否为空，为空时一级菜单
    //   if(!this.selectMenuId  || this.PrivilegeTreeDate[0].children.parentId==0){
    //   	this.isAddMenuDialogVisible = false;
    //   	this.showWarning('请选中左侧的权限菜单后再操作!')
    //        		return false
    //   }else{

    //   }
	},

	//点击编辑按钮
    editPrivilege(row, menuId) {
      console.log(row, menuId, "e23213");
      this.isAdd = false;
      this.isAddMenuDialogVisible = true;
      this.savePrivilegeForm = {
        menuName: row.label,
        menuType: row.menuType,
        menuUrl: row.menuUrl,
        parentId: row.parentId,
        menuId: menuId
      };
	},
	
	//点击取消
    onCloseRole() {
      this.savePrivilegeForm = {
        menuName: "",
        menuType: "",
        menuUrl: "",
        parentId: "",
        menuId: ""
      };
    },
	
	    //点击保存-------新增&&編輯
    onSavePrivilege(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isAdd) {
            var params = {
              menuName: this.savePrivilegeForm.menuName,
              menuType: this.savePrivilegeForm.menuType,
              menuUrl: this.savePrivilegeForm.menuUrl,
              parentId: this.savePrivilegeForm.parentId || 0
            };
            // for (var p in params) {
            //   p && params[p] ? (params[p] = params[p].trim()) : "";
            // }
            console.log("save menu",params);
            Api.saveRivilege(params)
              .then(res => {
                console.log(res);
                console.log(6666666);
                if (res.code == 9906) {
                  this.$message.error("该菜单已存在，请重新输入");
                }
                this.refreshPage();
                this.showSuccess();
                this.isAddMenuDialogVisible = false;
                location.reload("/authority/privilege");
                return;
              })
              .catch(err => {
                console.error(err);
              });
          } else {
            console.log(this.savePrivilegeForm, "编辑。。。");
            const params = { ...this.savePrivilegeForm };
            Api.saveRivilege(params)
              .then(res => {
                this.refreshPage();
                this.showSuccess();
                this.isAddMenuDialogVisible = false;
                location.reload("/authority/privilege");
              })
              .catch(err => {
                console.error(err);
              });
          }
        }
      });
    },

    //选中权限列表进行操作
    handleSelectionChange(val) {
      this.menuIdIds = val;
    },

    // 上移
    onMoveUpPrivilege(row) {
      console.log(row.orderNum);
      console.log(row.menuId);
      console.log(44444);

      const params = {
        id: row.menuId,
        listorder: row.orderNum - 1
      };
      Api.movePrivilege(params)
        .then(res => {
          this.showSuccess();
          this.refreshPage();
          location.reload("/authority/privilege");
        })
        .catch(err => {
          console.error(err);
        });
    },

    //下移
    onMoveDownPrivilege(row) {
      const params = {
        id: row.menuId,
        listorder: row.orderNum + 1
      };
      Api.movePrivilege(params)
        .then(res => {
          this.showSuccess();
          this.refreshPage();
          location.reload("/authority/privilege");
        })
        .catch(err => {
          console.error(err);
        });
    },

    //批量删除
    onBatchDelete() {
      if (this.validatePrivilegeSelection()) {
        const h = this.$createElement;
        this.$msgbox({
          title: "提示",
          message: h("p", null, [h("span", null, "确定批量删除？ ")]),
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = "执行中...";
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
          let DeteteList = [];
          this.menuIdIds.forEach(item => {
            DeteteList.push(item.menuId);
          });
          console.log(222);
          Api.deletePrivilege(DeteteList)
            .then(data => {
              this.refreshPage();
              this.showSuccess();
              location.reload("/authority/privilege");
            })
            .catch(err => {
              this.menuIdIds = [];
            })
            .catch(err => {
              console.error(err);
            });
        });
      }
    },
    //判断是否选中权限列表
    validatePrivilegeSelection() {
      if (this.isPrivilegeSelected) {
        return true;
      }
      this.showWarning("请选中菜单后再操作！");
      return false;
    }
  },
  beforeMount() {
    this.refreshPage();
  },

  computed: {
    isPrivilegeSelected() {
      return this.menuIdIds.length > 0;
    }
  }
};
</script>
<style lang='scss'>
.authority-privilege {
  .authority-privilege-box {
    width: 100%;
    .privilege-left-tree {
      width: 26%;
      float: left;
      height: 80rem;
      background: #fff;
      box-shadow: 3px 0px 3px #888888;
    }
    .privilege-right-tab {
      padding: 20px;
      width: 73%;
      float: right;
      background: #fff;
      .add-privilege {
        padding-left: 50px;
      }
      .roleInfoList {
        margin-top: 20px;
      }
    }
  }
}
.handleButtonContainer {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #eceff1;
  display: inline-block;
  text-align: center;
  vertical-align: top;
  i {
    line-height: 24px;
    height: 20px;
    vertical-align: middle;
    color: #409eff;
    cursor: pointer;
  }
}
.authority-privilege-function {
  padding: 20px;
  background-color: #fff;
}
</style>


