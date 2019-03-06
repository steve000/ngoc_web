<template>
  <div class="purchase-list">
    <div class="content pt20">
      <h4>基本信息</h4>
      <el-form :model="reducePromotionForm" ref="reducePromotionForm" :rules="rules" label-width="130px" size="mini">
        <div>
            <div class="displayStyle">
                <el-form-item label="促销标题：">
                    <el-input v-model="reducePromotionForm.promotionTitle" placeholder="请填写促销标题" class="row_width" size="small">
                    </el-input>
                </el-form-item>
            </div>
            <div class="displayStyle">
              <el-form-item label="促销类型：">
                <el-select
                  placeholder="请选择促销类型:"
                  size="small"
                  class="row_width"
                  v-model="reducePromotionForm.promotionType"
                  @change='changePromotionType'
                  :disabled='true'
                  >
                  <el-option label="普通满减" :value="0"></el-option>
                  <el-option label="支付满减" :value="1"></el-option>
                </el-select>
                <el-checkbox :disabled='true'
                   v-model="isYesOrNo" style="margin-left:20px;">整单满减</el-checkbox>
              </el-form-item>
            </div>
        </div>
        <div v-if='reducePromotionForm.promotionType==1'>
            <div class="displayStyle">
                <el-form-item label="支付方式：">
                    <el-select
                        placeholder="请选择促销类型"
                        size="small"
                        class="row_width"
                        v-model="reducePromotionForm.payName"
                        @change='changePaySelect'
                        >
                        <el-option v-for="(item,k) in payModeList" :key='k'  :label="item.payName" :value="item"></el-option>
                    </el-select>
                </el-form-item>
            </div>
        </div>
        <div>
            <div class="displayStyle">       
              <el-form-item label="促销开始时间：" prop="beginTime">
                <el-date-picker
                  v-model="reducePromotionForm.beginTime"
                  type="datetime"
                  :editable="false"
                  class="row_width" size="small"
                  placeholder="选择日期时间"
                  :default-time="['00:00:00']"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </div>  
            <div class="displayStyle">       
            
              <el-form-item label="促销结束时间：" prop="endTime">
                <el-date-picker
                  v-model="reducePromotionForm.endTime"
                  type="datetime" 
                  size="small" 
                  :editable="false"
                  class="row_width"           
                  placeholder="选择日期时间"
                  :default-time="['23:59:59']"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>        
              </el-form-item>
            </div>
        </div> 
        <div>
            <div class="displayStyle">  
              <el-form-item label="业务实体：">
                <el-select v-model="reducePromotionForm.groupName"
                  :multiple="false"
                  filterable
                  clearable
                  size="small"
                  popper-class="max-length"
                  placeholder="请选择或输入业务实体"
                  @change="getGroupInfo(reducePromotionForm.userGroupId)"
                  class="row_width"
                  >
                    <el-option
                    v-for="(item) in groupList"
                    :key="item.userGroupId"
                    :label="item.groupName"
                    :value="item.userGroupId">
                    </el-option>
                </el-select>
              </el-form-item>
            </div>  
            <div class="displayStyle">       
              <el-form-item label="促销详情描述：">
                <el-input v-model="reducePromotionForm.descriptions"
                  size="small" class="row_width" placeholder="促销详情描述"></el-input>

              </el-form-item>
            </div>
        </div>
        <div>
            <div class="displayStyle">
              <el-form-item label="备注：">
                <el-input type="textarea" :rows="3"
                          v-model="reducePromotionForm.remark" :maxlength="200" placeholder="请输入备注，最多200个字" size="small" style="width:760px;"></el-input>
                <span style="display:block">{{reducePromotionForm.remark.length}}/200</span>
              </el-form-item>
            </div>
        </div>
      </el-form>
    </div>
    <div class="content-wrapper">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="商品清单" name="first">
          <h4>商品清单</h4>
          <div class="addProduct" style="margin-top:20px;">
              <el-button :disabled="isYesOrNo" plain size="mini" @click="addGoodsMsg"><i class="el-icon-plus"></i>添加商品信息</el-button>
          </div>
          <el-table
            :data="reducePromotionList"
            style="width: 100%">
            <el-table-column type='index' widtn='60' label="操作">
              <template slot-scope="scope">
                <div v-if='isYesOrNo'><i class='el-icon-remove-outline'></i></div>
                <div v-else @click='deleteThisRow(scope)'><i class='el-icon-remove-outline'></i></div>
              </template>
            </el-table-column>
            <el-table-column
              prop="skuName"
              label="商品名称"
              width="180">
              <template slot-scope="scope">
                <el-select
                    :disabled="isYesOrNo" 
                    v-model="scope.row.skuName"
                    value-key="skuName"
                    :multiple="false"
                    filterable
                    placeholder="输入商品名称"
                    no-data-text="没有找到相关的商品"
                    @change="selectedSetGoods(scope.row)"
                    size="small">
                    <el-option
                        v-for="(item, k) in productList"
                        :key="k"
                        :label="item.skuName"
                        :value="item">
                    </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="skuId"
              label="sku编码"
              width="180">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.skuId" disabled></el-input>
              </template>
            </el-table-column>
          </el-table>            
        </el-tab-pane>
        <el-tab-pane label="满减条件" name="second">
          <h4>满减条件</h4>
          <div class="addProduct" style="margin-top:20px;">
            <el-button  plain size="mini" @click="addGoodsMsg"><i class="el-icon-plus"></i>添加满减条件</el-button>
          </div>
          <el-table :data='conList' style='width:300px'>
            <el-table-column type='index' widtn='60' label="操作">
              <template slot-scope="scope">
                <div @click='deleteThisRow(scope)'><i class='el-icon-remove-outline'></i></div>
              </template>
            </el-table-column>
            <el-table-column widtn='180' prop="needTotal" label="满足金额">
              <template slot-scope="scope">
                <el-input type='number' size="small" v-number-decimal-only v-model="scope.row.needTotal"></el-input>
              </template>
            </el-table-column>
            <el-table-column widtn='180' prop="descTotal" label="减免金额">
              <template slot-scope="scope">
                <el-input type='number' size="small" v-number-decimal-only v-model="scope.row.descTotal"></el-input>
              </template>
            </el-table-column>
          </el-table>

        </el-tab-pane>
    <div class="pl20 pb20" style="margin-top:10px;text-align:center;">
        <el-button type="primary" size="small" @click="submitCreateOrder('reducePromotionForm')">提交</el-button>
        <el-button plain type="primary" size="small" @click="quit(routesMapping.SalesOrder, true)">取消</el-button>
    </div>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import TableHeightMixins from "~/mixins/tableheight";
import PlatformMixins from "~/mixins/platform";
import { directives } from '~/utils/directives/index'
import { routesMapping } from "~/router";
import QuitMixins from '~/mixins/quit';

export default {
  name: "reduceAdd",
  data() {
    // 正则校验
    let beginTime = (rule, value, callback) => {
        let now = new Date()
        let time = new Date(value)
        if (!value) {
            return callback(new Error('请选择开始时间!'));
        } else if (time.getTime() < now.getTime()) {
            return callback(new Error('请选择晚于当前时间'));
        } else {
            return callback();
        }
    }
    let endTime = (rule, value, callback) => {
        let now = new Date()
        let time = new Date(value)
        let beginTime = new Date(this.reducePromotionForm.beginTime)
        if (!value) {
            return callback(new Error('请选择结束时间!'));
        } else if (time.getTime() < now.getTime()) {
            return callback(new Error('请选择晚于当前时间'));
        } else if (time.getTime() < beginTime.getTime()) {
            return callback(new Error('请选择晚于开始时间'));
        } else {
            return callback();
        }
    }
    let userGroupId = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请选择业务实体!'));
        } else {
            return callback();
        }
    }
    return{
      reducePromotionList:[{skuId:null,skuName:""}],
      conList:[{needTotal:'',descTotal:''}],
      goodsAllList:[],
      productList:[],
      getCombPromotionList:{},
      activeName2: 'first',
      reducePromotionForm:{
        remark: '',
      },
      promotionTypeText:'',
      isYesOrNo:false,      
      payModeList:[],
      groupList:[],
      rules: {
        beginTime: [{required: true, validator: beginTime, trigger: 'change'}],
        endTime:[{required: true, validator: endTime, trigger: 'change'}],
        userGroupId:[{required: true, validator: userGroupId, trigger: 'change'}],
      }, 
    }
  },
  mixins: [TableHeightMixins, PlatformMixins,QuitMixins], //判断高度，
  components: {
   
  },
  //props: {},
  watch: {
  },
  computed: {
    ...mapState({})
  },
  mounted() {
   // this.getCategoryList(this.datas);
    this.getSessRow()
    this.groupFilter()
    //this.getGoodsConfigUnit();
    //this.getQueryAllBrands();
  },
  watch:{
  },
  methods: {
    ...mapActions(['userGroupAll','manageCategoryAll','payTypeList','querySkuCodeByProductName','manageBrandAll','reducePromotionEdit','reducePromotionInfo']),
    getSessRow(){
             let params = {
                id: parseInt(this.$route.params.id)
              }
             this.reducePromotionInfo(params).then(res=>{
                this.reducePromotionForm=res//全数据
                this.reducePromotionList=res.skuList//商品列表
                console.log('接收值',this.reducePromotionForm,res)
                this.conList=res.conList//满减条件列表
                this.conList.forEach(item => {
                    item.needTotal = item.needTotal / 100
                    item.descTotal = item.descTotal / 100
                })
                if(this.reducePromotionForm.promotionType==0){
                  this.reducePromotionForm.payName=''
                  this.reducePromotionForm.payCode=null
                }else if(this.reducePromotionForm.promotionType==1){
                  this.payTypeListFunction()
                 // this.moustCountTotal()
                };
                this.isYesOrNo= this.reducePromotionForm.isBillPro==0?false:true
              
                if(res.skuList.length<1){
                  this.reducePromotionList.push({skuId:null,skuName:""});
                }
                if(res.conList.length<1){
                  this.conList.push({needTotal:'',descTotal:''})
                }
              }),
             this.queryProductList()
             
             //this.spulist=
    },

    //业务实体搜索
    groupFilter(){
            let par = {
            status: 1,  // 状态启用
            }
            this.userGroupAll(par).then(res => {
                this.groupList = res.result;
            });
        
    },

    getGroupInfo(val){
        this.groupList.forEach((item, index) => {
            if (item.userGroupId == val) {
                this.reducePromotionForm.userGroupId = item.userGroupId
                this.reducePromotionForm.groupName = item.groupName
            }
        })
    },

    //支付方式查询
    payTypeListFunction(){
      if (!this.payModeList.length) {
        let params={status:1}
        this.payTypeList(params).then(res=>{
            this.payModeList=res.result
            console.log(this.payModeList)
        })
      }
    },
    //设置支付方式
    changePaySelect(val){
        this.reducePromotionForm.payCode=val.payCode
        this.reducePromotionForm.payName=val.payName
    },
    
    // 设置商品信息
    selectedSetGoods(row) {
      row.skuId=row.skuName.skuId
      row.skuName=row.skuName.skuName
      },
    selectreplaceSkuName(row){
      row.replaceSkuId=row.replaceSkuName.skuId
      row.replaceSkuName=row.replaceSkuName.skuName
      
    },
    //
    changePromotionType(val){
      this.reducePromotionForm.promotionType=val
      if(val!=1){
          this.reducePromotionForm.payName=''
          this.reducePromotionForm.payCode=null
      }
      if (val == 1) {
        this.payTypeListFunction()
      }
    },
    // 查询所有商品
    queryProductList(val) {
        this.querySkuCodeByProductName({searchContent: ''}).then((res) => {
            if (res.result) {
                this.productList = res.result.map(i => {
                    i.price = i.price / 100
                    return i
                })
            } else {
                this.productList = []
            }
        })
    },
    
    // 表格初始化
    addGoodsMsg(){
       if(this.activeName2==='first'){
         this.reducePromotionList.push({skuId:null,skuName:""});
        }else{
          this.conList.push({needTotal:'',descTotal:''})
        }
        
    },
    //提交
    submitCreateOrder(reducePromotionForm){
      
      this.$refs[reducePromotionForm].validate((valid) => {
          if (valid) {
              let goArr = true

              this.reducePromotionForm.skuList=this.reducePromotionList
              this.reducePromotionForm.conList=this.conList
              this.reducePromotionForm.isBillPro = this.isYesOrNo == false ? 0 : 1
              
              if(this.reducePromotionForm.promotionType!=1) {
                this.reducePromotionForm.payCode=null
                this.reducePromotionForm.payName=null
              }
              let params = this.reducePromotionForm
              let newdate = new Date()
              console.log(params, 11)
              if(params.endTime<params.beginTime) {
                this.$message({
                  type: "warning",
                  message: "结束时间不能小于开始时间"
                })
                goArr = false
              } else if(!params.endTime){
                this.$message({
                  type: "warning",
                  message: "结束时间不能为空"
                })
                goArr = false
              }else if(!params.beginTime){
                this.$message({
                  type: "warning",
                  message: "开始时间不能为空"
                })
                goArr = false
              }else if(params.beginTime<newdate){
                this.$message({
                  type: "warning",
                  message: "开始时间不能小于当前时间"
                })
                goArr = false
              }
              if (!params.isBillPro && !params.skuList.length) {
                this.$message({
                  type: "warning",
                  message: "商品信息不能为空"
                })
                goArr = false
              }
              if (!params.isBillPro && params.skuList.length) {
                params.skuList.forEach(item => {
                  if (!item.skuName) {
                    this.$message({
                      type: "warning",
                      message: "商品名称不能为空"
                    })
                    goArr = false
                  }
                })
              }
              if (!params.conList.length) {
                this.$message({
                  type: "warning",
                  message: "满减条件不能为空"
                })
                goArr = false
              } else {
                params.conList.forEach(item => {
                  if (item.needTotal <= 0 || item.descTotal <= 0) {
                    this.$message({
                      type: "warning",
                      message: "满足金额，减免金额必须大于0"
                    })
                    goArr = false
                  }
                  if (item.descTotal > item.needTotal) {
                    this.$message({
                      type: "warning",
                      message: "减免金额必须小于满足金额"
                    })
                    goArr = false
                  }
                })
              }
              if (params.conList.length > 1) {
                let newArr = []
                let newArr2 = []
                params.conList.forEach(item => {
                  if (item.needTotal) {
                      newArr.push(item.needTotal)
                  }
                  if (item.descTotal) {
                      newArr2.push(item.descTotal)
                  }
                })
                if (newArr.length) {
                  var nary=newArr.sort(); 
                  for(var i=0;i<params.conList.length;i++){
                    if (nary[i]==nary[i+1]){
                      // console.log("数组重复内容："+nary[i]);
                      this.$message({
                        type: 'warning',
                        message: '满足金额不能重复'
                      });
                      goArr = false
                    } 
                  }
                }
                if (newArr2.length) {
                  var nary2=newArr2.sort(); 
                  for(var i=0;i<params.conList.length;i++){
                    if (nary2[i]==nary2[i+1]){
                      // console.log("数组重复内容："+nary2[i]);
                      this.$message({
                        type: 'warning',
                        message: '减免金额不能重复'
                      });
                      goArr = false
                    }
                  }
                }
              }
              if (goArr) {
                params.conList.forEach(item => {
                    item.needTotal = item.needTotal * 100
                    item.descTotal = item.descTotal * 100
                })
                this.reducePromotionEdit(params).then(res => {
                  this.$message({
                    type: "success",
                    message: `操作成功`
                  });
                  this.quit(routesMapping.reducePromotion, true);
                }); 
              }
          } else {
              this.$message({
                  type: 'warning',
                  message: '请填写必填项'
              });
          return false;
          }
      });


     },

    deleteThisRow(row){
      let index = row.$index
      if(this.activeName2==='first'){
      this.reducePromotionList.splice(index, 1)}
      else {this.conList.splice(index, 1)}
    },
    handleClick(tab, event) {
      }
  }
};
</script>

<style lang="scss">
.page-content{background-color: #fff;
    }
.purchase-list {
  .table-container {
    padding-top: 20px;
    background-color: #fff;
    height: 100%;
    .nav-top {
      display: flex;
      height: auto;
      justify-content: space-between;
      align-items: flex-start;
    }
    .table-wrapper {
      width: 100%;
      .el-table__body-wrapper tbody tr:hover {
        .operate-container_div {
          display: block;
        }
      }
      .operate-container {
        padding-right: 16px;
        min-width: 72px;
        font-size: 12px;
        .operate-container_div {
          display: none;
        }
        div {
          float: right;
        }
      }
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
  }
  .date-conatiner {
    &:hover {
      .date-edit-contaniner .date-picker-container {
        display: block;
      }
      .date-edit-contaniner .date-edit {
        display: block;
      }
    }
    .date-edit-contaniner {
      position: relative;
      text-align: right;
      .date-edit {
        cursor: pointer;
        position: absolute;
        z-index: 9;
        width: 20px;
        display: none;
      }
      .date-picker-container {
        opacity: 0;
        position: absolute;
        left: -88px;
        z-index: 10;
        width: 120px;
        display: none;
        .el-input--small .el-input__inner {
          cursor: pointer;
          border: none;
        }
        .el-input {
          width: 120px;
        }
        .el-input__prefix {
          display: none;
        }
      }
    }
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
      min-width: 108px;
      text-overflow: ellipsis;
    }
    .show-more-icon {
      min-width: 28px;
      font-size: 12px;
      position: absolute;
      right: 0px;
      display: none;
      z-index: 10;
    }
  }
  .font-color-F56C6C {
    color: #f56c6c;
  }
  .select-storehouse-container {
    margin-bottom: 12px;
    .el-input__inner {
      height: 34px;
      color: #666666;
      border: 1px solid #e0e0e0;
    }
    .el-form-item__label {
      font-size: 14px;
      color: #151515;
    }
  }
  .textarea-container {
    position: relative;
    .textarea-tips {
      color: #9c9c9c;
      position: absolute;
      top: 138px;
    }
  }
  .form-margin-top{
    margin-top:15px;
  }
  .displayStyle ,.displayStyle1{
    display: inline-block;
    padding-left: 25px;
    .row_width{
        width: 300px;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 36px;
        color: #666666;
    }
    .sousuoIcon {
        width: 14px;
        height: 14px;
        color: #bebebe;
    }
}
.contarctInformation{
    margin-left: 126px;
    margin-bottom: 15px;
    .contarctInformation_form{
        background-color: #F8F9FB;
        padding-bottom: 6px;
        padding-top: 18px;
        .contractInfo1,.contractInfo2{
            display: inline-block;
            .contract_row_width{
                width: 240px;
            }
        }
    }
}
.supplierNo{
    margin-left: 195px;
}
.text-dash-show{
    font-size: 14px;
  }
    
  .content-wrapper,.pt20{padding:15px}
  .el-textarea.is-disabled .el-textarea__inner{color:#000}
}
</style>
