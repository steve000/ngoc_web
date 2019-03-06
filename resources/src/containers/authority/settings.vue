<template>
	<el-row class="authority-setting">
		<el-row class="authority-setting-content">
			<el-form :model="settingForm"  ref="settingForm" :rules="rules" label-width="220px" class="authority-setting-form">

			  <el-form-item label="登录失败最大次数：" prop="loginFailMaxTimes">
				  	<el-col :span="20" :offset="1">
				  		<el-col :span="3"><el-input type="number" v-model.number="settingForm.loginFailMaxTimes" :min="1"  max="99"></el-input></el-col>
					  	<el-col :span="1"><span class="unit">次</span></el-col>
					  	<el-col :span="6"><p>(1~99任意整数)</p></el-col>
				  	</el-col>
			  </el-form-item>

			  <el-form-item label="用户账号自动解锁时间：" prop="autoUnlockTime">
			    	<el-col :span="20" :offset="1">
				  		<el-col :span="3"><el-input type="number" v-model.number="settingForm.autoUnlockTime" :min="1" max="59"></el-input></el-col>
					  	<el-col :span="1"><span class="unit">分</span></el-col>
					  	<el-col :span="6"><p>(1~59任意整数)</p></el-col>
				  	</el-col>
			  </el-form-item>
			  <!-- <el-form-item label="更新时间: " prop="updateAt">
			    	<el-col :span="20" :offset="1">
				  		<el-col :span="6">
				  			<el-input v-model.number="settingForm.updateAt" min="1" max="99" :disabled="true"></el-input>
				  		</el-col>
				  	</el-col>
			  </el-form-item> -->
			   <el-form-item label="Web会话保持时间: " prop="webSessionExpireTime">
			    	<el-col :span="20" :offset="1">
				  		<el-col :span="3">
				  			<el-input type="number" v-model.number="settingForm.webSessionExpireTime" min="1" max="1440"></el-input>
				  		</el-col>
					  	<el-col :span="1"><span class="unit">分 </span></el-col>
					  	<el-col :span="6"><p>(1~1440任意整数)</p></el-col>
				  	</el-col>
			  </el-form-item>

			   <el-form-item label="移动端会话保持时间: " prop="mobileSessionExpireTime">
			    	<el-col :span="20" :offset="1">
				  		<el-col :span="3">
				  			<el-input type="number" v-model.number="settingForm.mobileSessionExpireTime" min="60" max="43200">
				  			</el-input>
				  		</el-col>
					  	<el-col :span="1"><span class="unit">分 </span></el-col>
					  	<el-col :span="6"><p>(60~43200任意整数)</p></el-col>
				  	</el-col>
			  </el-form-item>
			   <el-form-item label="同一账号同时在线session数量: " prop="sessionValidNum">
			    	<el-col :span="20" :offset="1">
				  		<el-col :span="3">
				  			<el-input v-model.number="settingForm.sessionValidNum" type="number"></el-inputmin="1" max="99"> </el-input>
				  		</el-col>
					  	<el-col :span="1"><span class="unit">条  </span></el-col>
					  	<el-col :span="6"><p>(数字1)</p></el-col>
				  	</el-col>
			  </el-form-item>
		<!-- 	 <el-form-item label="邮件账号: ">
			    	<el-col :span="20" :offset="1" class="emailIdTop">
				  		<el-col :span="6"><el-input v-model="settingForm.emailHost"></el-input></el-col>
					  	<el-col :span="6" :offset="1"><p>邮件服务器地址</p></el-col>
				  	</el-col>
				  	<el-col :span="20" :offset="1" class="emailIdTop">
				  		<el-col :span="6"><el-input v-model.email="settingForm.emailAddr"></el-input></el-col>
					  	<el-col :span="6" :offset="1"><p>系统邮件账号</p></el-col>
				  	</el-col>
				  	<el-col :span="20" :offset="1" class="emailIdTop">
				  		<el-col :span="6"><el-input v-model.password="settingForm.emailPwd"></el-input></el-col>
					  	<el-col :span="6" :offset="1"><p>系统邮件账号密码</p></el-col>
				  	</el-col>
			  </el-form-item> -->
			  <el-form-item>
			    <el-button type="primary" @click="onSubmit('settingForm')" class="saveSettingInfo">保存设置</el-button>
			  </el-form-item>
			</el-form>
		</el-row>
	</el-row>
</template>
<script>
	import {mapActions, mapState} from 'vuex';
	import MessageMixins from '~/mixins/messages';
	import PlatformMixins from '~/mixins/platform';
	import Api from '~/utils/api';
	import misc from '~/utils/misc'
	import DynamicTable from '~/components/DynamicTable';
	import Modal from '~/components/Modal'
export default {
	name: 'SystemSetting',
	mixins: [MessageMixins, PlatformMixins],
	data() {
		const validatorloginFail = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入数字'))
            } else if ( value > 99 || value < 1 ) {
                return callback(new Error('输入范围：1-99'))
            } else {
                return callback();
            }
		}
		const validatorautoUnlock = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入数字'))
            } else if ( value > 59 || value < 1 ) {
                return callback(new Error('输入范围：1-59'))
            } else {
                return callback();
            }
		}
		const validatorwebSession = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入数字'))
            } else if ( value > 14400 || value < 1 ) {
                return callback(new Error('输入范围：1-14400'))
            } else {
                return callback();
            }
		}
		const validatormobileSession = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入数字'))
            } else if ( value > 43200 || value < 60 ) {
                return callback(new Error('输入范围：60~43200'))
            } else {
                return callback();
            }
		}
		const validatorsession = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入数字'))
            } else if ( value != 1 ) {
                return callback(new Error('输入数字1'))
            } else {
                return callback();
            }
        }
		return {
		   	settingForm: {
		          updateAt: '', //无
		          autoUnlockTime: '',
		          emailAddr: '', //系统邮件账号 无
		          emailHost: '', //邮件服务器地址 无
		          emailPwd: '', // 系统邮件账号密码 无
		          loginFailMaxTimes: '',
		          mobileSessionExpireTime: '',
		          sessionValidNum: 1,  //同一账号同时在线session数量
		          webSessionExpireTime:'' //Web会话保持时间
   			 },
   			 rules:{
					loginFailMaxTimes:[{ required: true, validator: validatorloginFail, trigger: 'blur' }],
					autoUnlockTime:[{ required: true, validator: validatorautoUnlock, trigger: 'blur' }],
					webSessionExpireTime:[{ required: true, validator: validatorwebSession, trigger: 'blur' }],
					mobileSessionExpireTime:[{ required: true, validator: validatormobileSession, trigger: 'blur' }],
					sessionValidNum:[{ required: true, validator: validatorsession, trigger: 'blur' }],
						
   			 		updateAt:[{ required: true, message: '请输入1~99任意数字', trigger: 'blur' }],
   			 		sessionTime:[{ required: true, message: '请输入1~1440任意数字', trigger: 'blur' }],
   			 		emailHost:[{ required: true, message: '请输入邮件服务器地址', trigger: 'blur' }],
   			 		emailAddr:[{ required: true, message: '请输入发件人帐号', trigger: 'blur' }],
   			 		emailPwd:[{ required: true, message: '请输入发件人密码', trigger: 'blur' }],
   			 		
   			 }
		}
	},
	methods:{
		getSettingInfo(){
			 Api.getSettingInfo().then((res)=>{
			 	this.settingForm = res
	                 console.log(res)
	                 // console.log(5555)
              })
		},
		 onSubmit(formName) {
		 	console.log(555)
    	 	this.$refs[formName].validate((valid) => {
	          if (valid) {
	          	var repdata= {
	          		loginFailMaxTimes: this.settingForm.loginFailMaxTimes,
	          		autoUnlockTime: this.settingForm.autoUnlockTime,
	          		webSessionExpireTime: this.settingForm.webSessionExpireTime,
	          		mobileSessionExpireTime: this.settingForm.mobileSessionExpireTime,
	          		sessionValidNum: this.settingForm.sessionValidNum
	          	}
	             Api.getSettingSave(repdata).then(()=>{
	             	this.showSuccess();
	             	this.getSettingInfo();
              })
	          } else {
	            return false;
	          }
    		});
      }
	},
	  beforeMount(){ 
            // this.getSettingInfo();
        },
}
</script>
<style lang='scss'>
	.authority-setting {
		background-color: white;
		padding:10px;
		.authority-setting-form{
			 height: 100%;
			.emailIdTop{
				margin-top:10px;
			}
			p{
				color:lightgray;
			}
			.saveSettingInfo{
				margin-left:40px;
			}
		}
	}
	.unit{
		margin-left:5px
	}

</style>