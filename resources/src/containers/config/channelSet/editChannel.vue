<template>
	<div class="createChannel edit-channel">
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
								<el-select size="small" v-model="createChannelParams.channelType" placeholder="请选择渠道类型" class="row_width">
									<el-option v-for="item in channelTypeOptions" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</div>
						<div class="displayStyle">
							<el-form-item prop="importTemplate">
								<p slot="label" style="padding-left: 10px">导入模板：</p>
								<el-select size="small" v-model="createChannelParams.importTemplate" placeholder="请选择导入模板" class="row_width">
									<el-option v-for="item in importModel" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</div>
					</div>
					<div>
						<el-form-item style="margin-left:10px;margin-top:5px;"  class="baseInfo-remark" label="备注：" label-width="110px">
							<el-input style="margin-left:-10px;" size="small" type="textarea" :rows="4" v-model="createChannelParams.remark" resize="none">
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
							<el-input size="small" style="width: 300px;" v-model="channelAddressTemp.linkMan">
							</el-input>
						</el-form-item>
						<el-form-item label="联系电话：" label-width="110px" prop="phone">
							<el-input size="small" type="tel" maxlength="11" style="width: 300px;" @keyup.native="onkeyup" v-model="channelAddressTemp.phone">
							</el-input>
						</el-form-item>
					</div>

					<el-form-item label-width="110px" label="所在地区：" prop="area">
						<RegionSelect @region="regionChange" :clearable="true" ref="regionParams" class="row_width"></RegionSelect>
					</el-form-item>

					<el-form-item prop="address" label="详细地址：" label-width="110px">
						<el-input size="small" v-model="channelAddressTemp.address">
						</el-input>
					</el-form-item>
				</div>
			</el-form>
			<div class="btn-box">
				<el-button size="small" class="btnStyle2" v-if="isChangeButtonVisible" style="width:90px;" @click="confirmChangeAddress('ruleChannelAddressForm')">
					确认修改
				</el-button>
				<el-button size="small" class="btnStyle2" v-else style="width:90px;" @click="addNewChannelAddress('ruleChannelAddressForm')">
					添加
				</el-button>
			</div>
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
							<el-button size="small" type="text" @click="updateItemFromChannelAddressList(scope.$index)">
								编辑
							</el-button>
							<el-button size="small" type="text" @click="deleteAddress(scope.$index)">
								删除
							</el-button>
							<el-button size="small" type="primary" class="defaultAddress" plain v-if="scope.row.isDefault==1">默认地址
							</el-button>
							<el-button size="small" type="primary" class="setDefaultAddress" plain @click="setDefaultAddress(scope.$index)" v-else>设为默认
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="btn-section">
				<el-button size="small" type="primary"  :disabled="oneClick" style="width: 90px;" @click="comfirmUpdateChannel('baseInfoForm')">提交</el-button>
				<el-button size="small" class="cancel-button"  style="width: 90px;" @click="OnBackLatePage">取消</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import QuitMixins from "~/mixins/quit";
import { mapActions } from "vuex";
import RegionSelect from "~/components/common/RegionSelect";
import PlatformMixins from "~/mixins/platform";
import { routesMapping } from "~/router";
export default {
  name: "EditChannel",
  mixins: [QuitMixins, PlatformMixins],
  components: { RegionSelect },
  data() {
    let validatorAddress = (rule, value, callback) => {
      if (!this.channelAddressTemp.address) {
        return callback(new Error("请输入详细地址"));
      } else {
        return callback();
      }
    };
    let validatorArea = (rule, value, callback) => {
      let _valid=this.$refs.regionParams.checkedItems.some(item=>{return item==null});
      if (this.$refs.regionParams.checkedItems.length < 3 || _valid) {
        return callback(new Error("请完整选择所在地区"));
      } else {
        return callback();
      }
    };
    return {
      // 创建渠道参数
      createChannelParams: {
        channelName: "", // 名称
        channelType: "", // 类型
        remark: "", //备注
        addressList: [], //地址
        channelShortName: "",
        importTemplate: "" //渠道模板
      },
      currentIndex: 99999,
      isChangeButtonVisible: false,
      //地址信息
      channelAddressTemp: {
        channelId: this.$route.params.channelId,
        area: [],
        areaCode: [],
        linkMan: "",
        phone: "",
        address: "",
        isDefault: ""
      },
      // 联系人信息校验
      rules: {
        linkMan: [
          { required: true, message: "请输入联系人", trigger: "change" }
        ],
        phone: [
          { required: true, message: "请输入联系电话", trigger: "change" }
        ],
        address: [
          { required: true, validator: validatorAddress, trigger: "change" }
        ],
        area: [{ required: true, validator: validatorArea, trigger: "change" }]

      },
      //基本信息效验
      baseInfoRules: {
        channelName: [
          { required: true, message: "请输入渠道名称", trigger: "change" }
        ],
        channelType: [
          { required: true, message: "请选择渠道类型", trigger: "change" }
        ],
      },
      // 渠道类型
      channelTypeOptions: [
        { label: "自营渠道", value: "0" },
        { label: "非自营渠道", value: "1" }
      ],
      //添加渠道地址
      channelAddressList: [],
      paramsChannel: {
        pageNo: 1,
        pageSize: 999,
        channelType: parseInt(this.$route.params.channelId)
      },
      importModel: [
        { label: "线下", value: 0 },
        { label: "H5", value: 1 },
        { label: "天猫淘宝", value: 2 },
        { label: "京东", value: 3 },
        { label: "积分商城", value: 4 },
        { label: "团购平台", value: 5 },
        { label: "有赞微店", value: 6 },
        { label: "移动商城", value: 7 }
      ],
      maxRemarkLength: 200,
      alreadyRemarkLength: 0,
      isValidBaseInfo: false,
      oneClick: false,
    };
  },
  mounted() {
    this.createChannelParams.channelName = this.$route.params.channelName;
    this.createChannelParams.channelType = this.$route.params.channelType;
    this.createChannelParams.channelId = this.$route.params.channelId;
    this.functionQueryAddressByChannelId();
  },
  watch: {
    "createChannelParams.remark": {
      handler(nval, oval) {
        if (String(nval).length > 200) {
          this.$message({
            type: "warning",
            message: `备注长度不能大于200字符，默认取前200个字符！`
          });
          this.$nextTick(() => {
            this.createChannelParams.remark =String(nval).substring(0,200);
          });
        }
      }
    },
    'createChannelParams.channelName':{
      handler(nval, oval) {
        if (String(nval).length > 20) {
          this.$message({
            type: "warning",
            message: `渠道名长度不能大于20字符，默认取前20个字符！`
          });
          this.$nextTick(() => {
            this.createChannelParams.channelName =String(nval).substring(0,20);
          });
        }
      }
    }
  },
  methods: {
    ...mapActions([
      "showPageLoading",
      "hidePageLoading",
      "updateChannelAction",
      "queryAddressByChannelIdAction",
      "queryChannelByIdAction",
      "createChannelAddressAction"
    ]),
    resetForm(createChannelParams) {
      this.$refs[createChannelParams].resetFields();
    },
    regionChange(region, regionName) {
      this.channelAddressTemp.area = regionName;
      this.channelAddressTemp.areaCode = region;
    },
    //post更新地址信息
    comfirmUpdateChannel(createChannelParams) {
            let validIs = this.returnValues((({ area,linkMan,phone,address}) => ({ area,linkMan,phone,address }))(this.$refs.ruleChannelAddressForm.$options.propsData.model));
      const isPassValid= validIs.map(val=>{
        if(Array.isArray(val)){
          let _valid=val.every(item=>{return item==null});
           if(val.length==3 && _valid){
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
            type: "warning",
            message: "请先确认修改/添加联系人信息"
          });

          
        }else if(isPassValid3){
            this.$message({
            message: "先确认添加联系人信息"
          }); 
        }else{
          this.$refs.ruleChannelAddressForm.resetFields();
          this.isValidBaseInfo = false;
         this.$refs[createChannelParams].validate(valid => {
        if (valid) {
          this.oneClick = true;
          let _channelAddressList = this.channelAddressList;
          _channelAddressList.forEach((item, index) => {
            if (Array.isArray(item.area)) {
              this.$set(
                this.channelAddressList[index],
                "area",
                item.area.join("-")
              );
            }
          });

          this.createChannelParams.addressList = this.channelAddressList;
         this.createChannelParams.addressList.forEach((item,index)=>{
         this.$set(this.createChannelParams.addressList[index],'city',item.area.split("-")[1]);
         this.$set(this.createChannelParams.addressList[index],'province',item.area.split("-")[0]);
         this.$set(this.createChannelParams.addressList[index],'area',item.area.split("-")[2]);
         this.$set(this.createChannelParams.addressList[index],'cityCode',item.areaCode[1]);
         this.$set(this.createChannelParams.addressList[index],'provinceCode',item.areaCode[0]);
         this.$set(this.createChannelParams.addressList[index],'areaCode',item.areaCode[2]);
         })
          this.showPageLoading();
          this.updateChannelAction(this.createChannelParams).then(res => {
            this.hidePageLoading();
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.OnBackLatePage();
            this.oneClick = false;
          }).catch(error=>{
            this.oneClick = false;
          });
        } else {
          return false;
        }
      });
        }
    }, //添加渠道地址信息
    addNewChannelAddress(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _channelAddressTemp = JSON.parse(
            JSON.stringify(this.channelAddressTemp)
          );
          let _area = _channelAddressTemp.area;
          let _areaCode = _channelAddressTemp.areaCode;
          let obj = Object.assign(
            {},
            _channelAddressTemp,
            { province: _area[0] },
            { city: _area[1] },
            { area: _area[2] },
            { provinceCode: _areaCode[0] },
            { cityCode: _areaCode[1] },
            { areaCode: _areaCode[2] }
          );
          this.showPageLoading();
          this.createChannelAddressAction(obj).then(resp => {
            this.hidePageLoading();
            this.functionQueryAddressByChannelId();
          });
          this.resetForm(formName);
          this.$refs.regionParams.checkedItems = [null,null,null];
          this.channelAddressTemp.area=[];
          this.channelAddressTemp=Object.assign({},this.channelAddressTemp,{area:[]});
        } else {
          this.$message({
            type: "warning",
            message: "请填写联系人信息"
          });
        }
      });
    },
    returnValues(obj) {
      return Object.keys(obj).map(function(key) {
        return obj[key];
      });
    },
    //删除地址
    removeItemFromChannelAddressList(_index) {
      this.channelAddressList.splice(_index, 1);
    },
    deleteAddress(index) {
      this.$confirm("确认删除该联系人信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.removeItemFromChannelAddressList(index);
        })
        .catch(() => {});
    },
    //设置默认地址
    setDefaultAddress(_index) {
      this.channelAddressList.map((item, index) => {
        if (_index != index) {
          item.isDefault = 0;
        } else {
          item.isDefault = 1;
        }
      });
    },
    //更新地址列表

    updateItemFromChannelAddressList(_index) {
      this.isChangeButtonVisible = true;
      this.currentIndex = _index;
      this.channelAddressTemp = Object.assign(
        {},
        this.channelAddressList[_index]
      );
      this.$refs.regionParams.checkedItems=this.channelAddressTemp.areaCode;
      this.$set(
        this.channelAddressTemp,
        "area",
        this.channelAddressTemp.area.split?this.channelAddressTemp.area.split("-"):this.channelAddressTemp.area
      );
    },
    //确认地址修改信息
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
      this.resetForm("ruleChannelAddressForm");
          }});
    }, //返回
    OnBackLatePage() {
     this.quit(routesMapping.ChannelManagement);
    },
    /**
     * 根据渠道id查询地址
     */
    functionQueryAddressByChannelId() {
      this.showPageLoading();
      this.queryAddressByChannelIdAction({
        channelId: this.$route.params.channelId
      }).then(resp => {
        this.hidePageLoading();
        this.channelAddressList = resp.result;
       this.channelAddressList.forEach((item,index)=>{
         this.$set(this.channelAddressList[index],'area',[item.province,item.city,item.area]);
         this.$set(this.channelAddressList[index],'areaCode',[item.provinceCode,item.cityCode,item.areaCode]);
      })
      });
      this.queryChannelByIdAction({
        channelId: this.$route.params.channelId
      }).then(resp => {
        this.createChannelParams.remark = resp.remark;
        this.createChannelParams.importTemplate = resp.importTemplate
          ? parseInt(resp.importTemplate)
          : "";
      });
    },
    onkeyup() {
      this.channelAddressTemp.phone = this.channelAddressTemp.phone.replace(/[^\d]/g,"");
    }
  }
};
</script>

