<template>
	<div class="createChannel">
		<div class="content">
			<!-- 新增渠道 -->
			<div class="title">
				<div>基本信息</div>
			</div>
			<el-form :rules="baseInfoRules" ref="baseInfoForm" label-width="110px" :model="createChannelParams" label-position="left">
				<div class="content-wrapper">
					<div>
						<div class="displayStyle">
							<el-form-item label="渠道名：" prop="channelName">
								<el-input size="small" v-model="createChannelParams.channelName" placeholder="请输入渠道名称" class="row_width">
								</el-input>
							</el-form-item>
						</div>
					</div>
					<div>
						<div class="displayStyle">
							<el-form-item label="渠道类型：" prop="channelType">
								<el-select  size="small" v-model="createChannelParams.channelType" placeholder="请选择渠道类型" class="row_width">
									<el-option v-for="item in channelTypeOptions" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</div>
					</div>
					<div>
						<div class="displayStyle" style="margin-bottom:2px;">
							<el-form-item prop="importTemplate" style="margin-bottom:14px;">
								<p slot="label">导入模板：</p>
								<el-select @change="downloadTemplate"  size="small" v-model="createChannelParams.importTemplate" placeholder="请选择导入模板" class="row_width">
									<el-option v-for="item in importModel" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</div>
            <a v-if="createChannelParams.importTemplate!=null" :href="fileUrl" :download="dowanloadFileName" class="import-download iconfont  icon-xiazai" style="margin-left:20px;">下载模板</a>
					</div>
					<div style="margin-left: 25px;">
						<el-form-item class="noneTip baseInfo-remark" label="备注：" label-width="85px">
							<el-input  size="small" type="textarea" :rows="4" v-model="createChannelParams.remark" resize="none">
							</el-input>
								<div class="limittext">200字以内</div>
						</el-form-item>
					</div>
				</div>
			</el-form>
			<!--联系方式-->
			<div class="title">
				<div>联系人信息</div>
			</div>
			<el-form :model="channelAddressTemp" :rules="rules" ref="ruleChannelAddressForm">
				<div class="content-padding">
					<div class="contact-info">
						<el-form-item label="联系人：" label-width="110px" prop="linkMan">
							<el-input  size="small" style="width: 300px;" v-model="channelAddressTemp.linkMan">
							</el-input>
						</el-form-item>
						<el-form-item label="联系电话：" label-width="110px" prop="phone">
							<el-input size="small" type="tel" style="width: 300px;" :maxlength="11" @keyup.native="onkeyup" v-model="channelAddressTemp.phone">
							</el-input>
						</el-form-item>
					</div>

					<el-form-item label="所在地区：" prop="area" label-width="110px">
						<RegionSelect @region="regionChange" ref="regionParams" :clearable="true" class="row_width"></RegionSelect>
					</el-form-item>

					<el-form-item style="margin-bottom:15px;" prop="address" label="详细地址：" label-width="110px">
						<el-input size="small" v-model="channelAddressTemp.address" placeholder="请输入详细地址">
						</el-input>
					</el-form-item>
				</div>
			</el-form>
			<div class="btn-box" style="margin-top:12px;">
				<el-button v-if="isChangeButtonVisible" size="small" style="width:90px;" @click="confirmChangeAddress('ruleChannelAddressForm')">
					确认修改
				</el-button>
				<el-button v-else size="small" style="width:90px;" @click="addNewChannelAddress('ruleChannelAddressForm')">
					确认添加
				</el-button>
			</div>

		<div class="addAddressListContainer">
			<div class="addressList">
				<el-table ref="channelAddressListTable" :data="channelAddressList" border highlight-current-row style="width: 100%">
					<el-table-column prop="linkMan" label="联系人">
					</el-table-column>
					<el-table-column label="联系人地址">
						<template slot-scope="scope">
							{{Array.isArray(scope.row.area)?scope.row.area.join('-'): scope.row.area}} {{scope.row.address}}
						</template>
					</el-table-column>
					<el-table-column prop="phone" label="联系电话">
					</el-table-column>
					<el-table-column label="操作" width="200">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="updateItemFromChannelAddressList(scope.$index)">编辑</el-button>
							<el-button type="text" size="small" @click="removeItemFromChannelAddressList(scope.$index)">删除</el-button>
							<el-button type="primary" class="defaultAddress" plain size="small" v-if="scope.row.isDefault==1">默认地址</el-button>
							<el-button type="primary" class="setDefaultAddress" plain size="small" @click="setDefaultAddress(scope.$index)" v-else>设为默认</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="btn-section">
				<el-button type="primary" size="small" style="width:90px;" :disabled="oneClick" @click="comfirmNewChannel('baseInfoForm')">提交</el-button>
				<el-button class="cancel-button" style="width:90px;" size="small" @click="OnBackLatePage">取消</el-button>
			</div>
		</div>
		</div>


	</div>
</template>
<script>
import RegionSelect from '~/components/common/RegionSelect';
import QuitMixins from '~/mixins/quit';
import PlatformMixins from '~/mixins/platform';
import { routesMapping } from '~/router';
import { mapActions } from 'vuex';
import { platform } from 'os';

export default {
  name: 'CreateChannel',
  mixins: [QuitMixins, PlatformMixins],
  components: { RegionSelect },
  data() {
    let validatorAddress = (rule, value, callback) => {
      if (!this.channelAddressTemp.address) {
        return callback(new Error('请输入详细地址'));
      } else {
        return callback();
      }
    };
    let validatorArea = (rule, value, callback) => {
      let _valid=this.$refs.regionParams.checkedItems.some(item=>{return item==null});
      if (this.$refs.regionParams.checkedItems.length < 3 || _valid) {
        return callback(new Error('请完整选择所在地区'));
      } else {
        return callback();
      }
    };
    let validatorRemark = (rule, value, callback) => {
      this.alreadyRemarkLength = value.length;
      if (value.length > this.maxRemarkLength) {
        return callback(new Error(`输入字数过多`));
      } else {
        return callback();
      }
    };
    return {
      // 创建渠道参数
      createChannelParams: {
        channelName: '', // 名称
        channelType: 1, // 类型
        remark: '', // 备注
        addressList: [], // 地址
        channelShortName: '',
        importTemplate: null
      },
      currentIndex: '',
      isChangeButtonVisible: false,
      oneClick: false,
      maxNameLength: 200,
      alreadyNameLength: 0,
      maxRemarkLength: 200,
      alreadyRemarkLength: 0,
      channelAddressTemp: {
        area: [],
        areaCode: [],
        linkMan: '',
        phone: '',
        address: '',
        isDefault: ''
      },
      // 创建渠道校验
      rules: {
        linkMan: [
          { required: true, message: '请输入联系人', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'change' }
        ],
        address: [
          { required: true, validator: validatorAddress, trigger: 'change' }
        ],
        area: [{ required: true, validator: validatorArea, trigger: 'change' }]
      },
      baseInfoRules: {
        remark: [
          { required: false, validator: validatorRemark, trigger: 'change' }
        ],
        channelType: [
          { required: true, message: '请选择渠道类型', trigger: 'change' }
        ],
        channelName:[
          { required: true, message: '请输入渠道名', trigger: 'change' }
        ]
      },
      // 渠道类型
      channelTypeOptions: [
        { label: '自营渠道', value: 0 },
        { label: '非自营渠道', value: 1 }
      ],
      // 导入模板
      importModel: [
        { label: '线下', value: 0 },
        { label: 'H5', value: 1 },
        { label: '天猫淘宝', value: 2 },
        { label: '京东', value: 3 },
        { label: '积分商城', value: 4 },
        { label: '团购平台', value: 5 },
        { label: '有赞微店', value: 6 },
        { label: '移动商城', value: 7 }
      ],
      //添加渠道地址
      channelAddressList: [],
      isValidBaseInfo: false,
      dowanloadFileName:'',
      fileUrl:'',
    };
  },
  mounted() {},
  watch: {
    'createChannelParams.remark': {
      handler(nval, oval) {
        if (String(nval).length > 200) {
          this.$message({
            type: 'warning',
            message: `备注长度不能大于200字符，默认取前200个字符！`
          });
          this.$nextTick(() => {
            this.createChannelParams.remark = String(nval).substring(0, 200);
          });
        }
      }
    },
    'createChannelParams.channelName':{
      handler(nval,oval){
        if (String(nval).length > 20) {
          this.$message({
            type: 'warning',
            message: `渠道名长度不能大于20字符，默认取前20个字符！`
          });
          this.$nextTick(() => {
            this.createChannelParams.channelName = String(nval).substring(0, 20);
          });
        }
      }
    },
    'channelAddressTemp.linkMan':{
      handler(nval,oval){
        if (String(nval).length > 20) {
          this.$message({
            type: 'warning',
            message: `联系人长度不能大于20字符，默认取前20个字符！`
          });
          this.$nextTick(() => {
            this.channelAddressTemp.linkMan = String(nval).substring(0, 20);
          });
        }
      }
    }
  },
  methods: {
    ...mapActions(['addStatusAction', 'showPageLoading', 'hidePageLoading','queryDownloadChannelGoodsTemplateAction','downloadOrderTemplateAction']),
    regionChange(region, regionName) {
      let _valid=region.every(item=>{return item==null});
      this.channelAddressTemp.area = _valid?[null,null,null]:regionName;
      this.channelAddressTemp.areaCode = region;
    },
    resetForm(createChannelParams) {
      this.$refs[createChannelParams].resetFields();
    },
    downloadTemplate(data){
    this.downloadOrderTemplateAction({ dataType: "file",channelType:parseInt(data) }).then(
			resp => {
				this.dowanloadFileName = this.importModel[data].label+"渠道订单导入模板.xls";
				let blob = new Blob([resp], {
					type:
						"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				});
				let objectUrl = URL.createObjectURL(blob);
				this.fileUrl = objectUrl;
			}
		);
    },
    comfirmNewChannel(createChannelParams) {
      let validIs = this.returnValues((({ area,linkMan,phone,address}) => ({ area,linkMan,phone,address }))(this.$refs.ruleChannelAddressForm.$options.propsData.model));
      const isPassValid= validIs.map(val=>{
        if(Array.isArray(val)){
          let _valid=val.every(item=>{return item==null});
          if(val.length==3 && !_valid){
            return true;
          }else{
            return false;
          }
        }else{
          if(val){
            return true;
          }else{
            return false;
          }
        }
      })

      // console.log(validIs);
      console.log(isPassValid);
      // console.log(this.channelAddressTemp);


      let isPassValid2=null;
      let isPassValid3=null;
      if(isPassValid.indexOf(true)==-1){
        isPassValid2=true;
      }else if(isPassValid.indexOf(false)==-1){
        isPassValid2=true;
        isPassValid3=true;
      }else{
        isPassValid2=isPassValid.every(val=>{
        return val;
      })
      }

        if (!isPassValid2) {
          this.$refs.ruleChannelAddressForm.validate(valid => {});
            this.$message({
            type: 'warning',
            message: '请填写完整联系人信息'
          });


        }else if(isPassValid3){
            this.$message({
            message: '先确认添加联系人信息'
          });
        } else {
          this.$refs.ruleChannelAddressForm.resetFields();
          this.isValidBaseInfo = false;
          this.$refs[createChannelParams].validate(valid => {
            if (valid) {
              this.oneClick = true;
              let _channelAddressList = this.channelAddressList;
              console.log(_channelAddressList);
              _channelAddressList.forEach((item, index) => {
                let obj = Object.assign(
                  {},
                  item,
                  { province: item.area.split?item.area.split('-')[0]:item.area[0] },
                  { city: item.area.split?item.area.split('-')[1]:item.area[1] },
                  { area: item.area.split?item.area.split('-')[2]:item.area[2] },
                  { provinceCode: item.areaCode[0] },
                  { cityCode: item.areaCode[1] },
                  { areaCode: item.areaCode[2] }
                );
                this.$set(this.channelAddressList, index, obj);
              });
              this.createChannelParams.addressList = this.channelAddressList;

              this.addStatusAction(this.createChannelParams)
                .then(res => {
                  this.$message({
                    type: 'success',
                    message: '添加成功'
                  });
                  this.quit(routesMapping.ChannelManagement,true);
                  this.oneClick = false;
                })
                .catch(error => {
                  this.oneClick = false;
                });
            } else {
              return false;
            }
          });
        }
    },
    returnValues(obj) {
      return Object.keys(obj).map(function(key) {
        return obj[key];
      });
    },
    addNewChannelAddress(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _channelAddressTemp = JSON.parse(
            JSON.stringify(this.channelAddressTemp)
          );
          _channelAddressTemp.area = _channelAddressTemp.area.join('-');
          this.channelAddressList.push(_channelAddressTemp);
          this.resetForm('ruleChannelAddressForm');
          // this.$refs.regionParams.checkedItems = [];
          this.$refs.regionParams.checkedItems = [null,null,null];
          // this.$refs.regionParams.resetForm('ReceivingInformationParams')
          this.channelAddressTemp.area=[];
          this.channelAddressTemp=Object.assign({},this.channelAddressTemp,{area:[]});
          // this.$message({
          //   type: 'warning',
          //   message: '请填写联系人信息'
          // });
        }
      });
    },
    removeItemFromChannelAddressList(_index) {
      this.channelAddressList.splice(_index, 1);
    },
    setDefaultAddress(_index) {
      this.channelAddressList.map((item, index) => {
        if (_index != index) {
          item.isDefault = 0;
        } else {
          item.isDefault = 1;
        }
      });
    },
    updateItemFromChannelAddressList(_index) {
      this.isChangeButtonVisible = true;
      this.currentIndex = _index;
      this.channelAddressTemp = Object.assign(
        {},
        this.channelAddressList[_index]
      );
      // console.log(this.channelAddressTemp.area);
      this.$refs.regionParams.checkedItems=this.channelAddressTemp.areaCode;
        this.$set(
        this.channelAddressTemp,
        'area',
        this.channelAddressTemp.area.split?this.channelAddressTemp.area.split('-'):this.channelAddressTemp.area
      );
    },
    confirmChangeAddress(formName) {
        this.$refs[formName].validate(valid => {
          if(valid){
        this.$set(
        this.channelAddressList,
        this.currentIndex,
        JSON.parse(JSON.stringify(this.channelAddressTemp))
      );
      this.isChangeButtonVisible = false;
      this.$refs.regionParams.checkedItems = [null,null,null];
      this.resetForm('ruleChannelAddressForm');
          }
          });
    },
    OnBackLatePage() {
      this.quit(routesMapping.ChannelManagement, true);
    },
    onkeyup() {
      this.channelAddressTemp.phone = this.channelAddressTemp.phone.replace(
        /[^\d]/g,
        ''
      );
    }
  }
};
</script>

