<template>
    <div class='goods-view detailsBigBox'>
    	<el-row  class="DetailsLeftBox">
        <div class="viewLeftTop">
            <el-row >
                <el-col :span="8">
                    <h4 class="order">
                        <span>单号:</span>
                        <span >{{reducePromotionForm.promotionNo}}</span>
                    </h4>
                </el-col>
                <el-col :span="6">
                    <h4 class="order">
                        <span>审核状态:</span>
                        <span>{{reducePromotionForm.approveStatus==0?'草稿':'审核通过'}}</span>
                    </h4>
                </el-col>
                <el-col :span="6">
                    <h4 class="order">
                        <span>状态:</span>
                        <span>{{reducePromotionForm.status==0?'已保存':'已记账'}}</span>
                    </h4>
                </el-col>
                <el-col>
                    <div style="padding:15px 0" v-if="reducePromotionForm.approveStatus == 0">
                        <el-button type="primary" class="el-button cancel-button el-button--default el-button--small"   @click="goEdit">编辑</el-button>
                    </div>
                </el-col>
                <el-col>
                  <div class="content-wrapper">
                  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                    <el-tab-pane label="商品清单" name="first">
                      <h4>商品清单</h4>
                      <el-table
                        :data="combPromotionList"
                        style="width: 100%">
                        
                        <el-table-column
                          prop="skuName"
                          label="商品名称"
                          width="180">
    
                        </el-table-column>
                        <el-table-column
                          prop="skuId"
                          label="sku编码"
                          width="180">

                        </el-table-column>
                      </el-table>            
                    </el-tab-pane>
                    <el-tab-pane label="满减条件" name="second">
                      <h4>满减条件</h4>
                    
                      <el-table :data='conList' style='width:300px'>

                        <el-table-column widtn='120' prop="needTotal" label="满足金额">
                        
                        </el-table-column>
                        <el-table-column widtn='120' prop="descTotal" label="减免金额">
                        
                        </el-table-column>
                      </el-table>

                    </el-tab-pane>
   
                    <div class="pl20 pb20">
                        <el-button plain style="width:90px;" @click="quit(routesMapping.SalesOrder, true)">返回</el-button>
                    </div>
                  </el-tabs>
                </div>
                </el-col>            
            </el-row> 
            <!-- <el-row>
                  <el-button style="margin-left: 50%;margin-top:15px" @click="closeView()">返回</el-button>
            </el-row> -->
        </div>
      </el-row>
      <el-row class="DetailsRightBox" >
          <div class="content pt20">
            <h4>基本信息</h4>
            <el-form :model="reducePromotionForm" label-position='left' label-width="100px" size="mini">
              <el-form-item label="创建人:">
                <span>{{reducePromotionForm.createUsername}}</span>
              </el-form-item>
  
              <el-form-item label="创建时间:">
                <span>{{reducePromotionForm.createTime}}</span>
              </el-form-item>
  
              <el-form-item label="记账人:">
                <span>{{reducePromotionForm.accountUsername}}</span>
              </el-form-item>
  
              <el-form-item label="更新时间:">
                <span>{{reducePromotionForm.updateTime}}</span>
              </el-form-item>
  
              <el-form-item label="开始时间:">
                <span>{{reducePromotionForm.beginTime}}</span>
              </el-form-item>
  
              <el-form-item label="结束时间:">
                <span>{{reducePromotionForm.endTime}}</span>
              </el-form-item>
  
              <el-form-item label="促销标题:">
                <span>{{reducePromotionForm.promotionTitle}}</span>
              </el-form-item>

              <el-form-item label="促销类型:">
                <span>{{reducePromotionForm.promotionType==1?'支付满减':'普通满减'}}</span>
              </el-form-item>

              <el-form-item v-if='reducePromotionForm.promotionType==0' label="整单满减:">
                <span>{{reducePromotionForm.isBillPro==1?'是':'否'}}</span>
              </el-form-item>
              <el-form-item v-else label="支付方式:">
                <span>{{reducePromotionForm.payName}}</span>
              </el-form-item>


              <el-form-item label="促销详情描述:">
                <span>{{reducePromotionForm.descriptions}}</span>
              </el-form-item>

              <el-form-item label="业务实体:">
                <span>{{reducePromotionForm.groupName}}</span>
              </el-form-item>

              <el-form-item label="备注:">
                <span>{{reducePromotionForm.remark}}</span>
              </el-form-item>


            </el-form>
          </div>
      </el-row>
    </div>





  <!-- <div class="purchase-list">
    <div class="content pt20">
      <h4>基本信息</h4>
      <el-form :model="res"  label-width="120px" size="mini">
        <el-form-item label="促销标题">
          <el-input :disabled='true' v-model="res.promotionTitle" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="促销类型">
          <el-select :disabled='true' v-model="promotionTypeText"  placeholder="促销类型选择">
            <el-option label="自由组合" value="0"></el-option>
            <el-option label="固定套餐" value="1"></el-option>
            <el-option label="套餐自选" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="促销开始时间">
          <el-date-picker  :disabled='true'
            v-model="res.beginTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="促销结束时间">
          <el-date-picker :disabled='true'
            v-model="res.endTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>        
        </el-form-item>
        <el-form-item label="业务实体">
          <el-input :disabled='true' v-model="res.groupName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="促销详情描述">
          <el-input :disabled='true' v-model="res.descriptions" placeholder="促销详情描述"></el-input>

        </el-form-item>
      </el-form>
    </div> -->
    
 





    
  <!-- </div> -->
</template>
<script>
import { mapActions, mapState } from "vuex";
import TableHeightMixins from "~/mixins/tableheight";
import PlatformMixins from "~/mixins/platform";
import { routesMapping } from "~/router";
import QuitMixins from '~/mixins/quit';

export default {
  name: "ListDetails",
  data() {
    return{
      combPromotionList:[],
      conList:[],
      goodsAllList:[],
      productList:[],
      getCombPromotionList:{},
      activeName2: 'first',
      reducePromotionForm:{},
      promotionTypeText:'',
      payModeList:[]
    }
  },
  mixins: [TableHeightMixins, PlatformMixins,QuitMixins], //判断高度，
  components: {
   
  },
  computed: {
    ...mapState({})
  },
  mounted() {
   // this.getCategoryList(this.datas);
    this.getSessRow()
    //this.getGoodsConfigUnit();
    //this.getQueryAllBrands();
  },
  methods: {
    ...mapActions(['manageCategoryAll','querySkuCodeByProductName','payTypeList','manageBrandAll','combPromotionEdit','reducePromotionInfo']),
    getSessRow(){
             let params = {
                id: parseInt(this.$route.params.id)
              }
             this.reducePromotionInfo(params).then(res=>{
                this.reducePromotionForm=res//全数据
                this.combPromotionList=res.skuList//商品列表
                console.log('接收值',this.combPromotionList)
                this.conList=res.conList//满减条件列表
                this.conList.forEach(item => {
                    item.needTotal = item.needTotal / 100
                    item.descTotal = item.descTotal / 100
                })
                // if(this.res.promotionType===0){
                //   this.promotionTypeText='自由组合' 
                // }else if(this.res.promotionType===1){
                //   this.promotionTypeText='固定套餐';
                //   this.moustCountTotal()
                // }else{
                //   this.promotionTypeText='套餐自选';                  
                //   this.moustCountTotal()
                // };
              })
            //  this.queryProductList()
            //  this.qayTypeListFunction()
             //this.spulist=
    },

    //算总数量
    // moustCountTotal(){
    //   if(this.res.promotionType){
    //   let mustCountAll1=0
    //     for(let i=0;i<this.combPromotionList.length;i++){
    //     mustCountAll1 = parseInt(mustCountAll1) + parseInt(this.combPromotionList[i].mustCount)
    //     //console.log('i值',i)//this.combPromotionList[i])
    //     }  
    //     console.log(mustCountAll1,'合计:')
    //     this.conList[0].buyCount = mustCountAll1
    //     //this.conList[0].buyCount=this.mustCountAll
    //   }
    // },

    //支付方式查询
    payTypeListFunction(){
        let params={status:1}
        this.payTypeList(params).then(res=>{
            this.payModeList=res.result
        })
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
         this.combPromotionList.push({addTotal:"0",canReplace:0,mustCount:0,replaceSkuId:"--",
          replaceSkuName:"",skuId:"--",skuName:""});
        }else{
          this.conList.push({buyCount:'',buyTotal:''})
        }
    },
    //编辑跳转
    goEdit(){
      let kid = this.$route.params.id
      this.$router.push(`/sales/promotion/reducePromotionEdit/${kid}`)
    },
    handleClick(tab, event) {
      }
    // change1(){
    //     this.datas.parentCateId= this.spulist.cateIdFirst
    //     this.datas.level=2
    //     this.getCategoryList(this.datas)
    // //    get
    // },
    
    // change2(){
    //   console.log(2)
    // },
    // changeCompany(){},

    // changeBrand(val){
    //   this.spulist.brandId=val.brandId
    //   this.currentBrandId = val.brandCnName
    //   console.log(val.brandId,this.currentBrandId)
    // },
    // getCategoryList(datas){
    //   if(datas.level==1){
    //     this.manageCategoryAll(datas).then(res=>{
    //       console.log(datas)
    //       this.cateIdFirstList = res.result;
    //       console.log('1级:',res.result)//.cateName,res.result.level)
    //     })
    //   }else{
    //     this.manageCategoryAll(datas).then(res=>{
    //       console.log(datas)
    //       this.cateIdSecondList=res.result
    //       console.log('2级:',res.result)//.cateName,res.result.level)
    //     })
    //   }
      
    // },
    // // getGoodsConfigUnit(){
    // //   this.goodsConfigUnitQuery().then(res=>{
        
    // //   })
    // // },
    // getQueryAllBrands(par){
    //   this.manageBrandAll(par).then(res=>{
    //     console.log('品牌:',res.result)
    //     this.brandAllList = res.result
    //   })
    // },

    // //select模糊查询
    // skuNameFilter(string){
    //   if(string){
    //     let par = {cateName:string}
        
    //     this.getQueryAllBrands(par)
    //   }
      
    // },
    // getGoSub(){
    //     console.log(this.spulist)
    //   this.editSpu(this.spulist).then(
        
    //     this.quit(routesMapping.PurchaseOrder,true)
    //   )
    // },
    // closeView(){
    //   console.log('关闭')
    //   this.quit(routesMapping.PurchaseOrder,true)
    // }
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
  .content-wrapper,.pt20{padding:15px}
  .el-textarea.is-disabled .el-textarea__inner,.el-input.is-disabled .el-input__inner{color:#000}
}
</style>
