<template>
    
    <div class='goods-view detailsBigBox'>
    	<el-row  class="DetailsLeftBox">
            <div class="viewLeftTop">
                <el-row >
                    <el-col :span="8">
                        <h4 class="order">
                            <span>单号:</span>
                            <span >{{res.billNo}}</span>
                        </h4>
                    </el-col>
                    <el-col :span="8">
                        <h4 class="order">
                            <span>审批状态:</span>
                            <span>{{isShowBtn?'草稿':'审批通过'}}</span>
                        </h4>
                    </el-col>
                    <el-col :span="8">
                        <h4 class="order">
                            <span style="margin-left:10px;">状态:</span>
                            <span>{{res.status==0?'已保存':'已记账'}}</span>
                        </h4>
                    </el-col>
                    <el-col>
                        <div style="margin:15px 0">
                            <el-button type="primary" v-if="isShowBtn" class="el-button cancel-button el-button--default el-button--small"   prop="channelId" @click="goEdit">编辑</el-button>
                        </div>
                    </el-col>
                    <el-col>
                        <PricepolicyTabs v-bind:priceList="priceList" :stats='stats' :userGroupList='userGroupList'></PricepolicyTabs>
                    </el-col>
                </el-row> 
                <el-row>
                    <el-button style="margin-left: 50%;margin-top:15px" @click="closeView()">返回</el-button>
                </el-row>
            </div>
        </el-row>
         <el-row class="DetailsRightBox" >
            <h3>基本信息</h3>
            <el-form :modle="res" label-position="left" class="TotalBasic">
                    <el-form-item label="制单人：">
                        <span>{{res.createUsername}}</span>
                    </el-form-item>
                    <el-form-item label="审核人：">
                       <span>{{res.approveUsername}}</span>
                    </el-form-item>
                    <el-form-item label="记账人：">
                       <span>{{res.accountUsername}}</span>
                    </el-form-item>
                    <el-form-item label="创建时间：">
                       <span>{{res.createTime}}</span>
                    </el-form-item>
                    <el-form-item label="最后操作人：">
                       <span>{{res.operateUsername}}</span>
                    </el-form-item>
                    <el-form-item label="更新时间：">
                       <span>{{res.updateTime}}</span>
                    </el-form-item>
                    <el-form-item label="定价方式：">
                       <span>{{res.priceFixType==0?'统一':'分别'}}</span>
                    </el-form-item>
                    <el-form-item label="调整零售价：">
                       <span>{{res.isSalePrice==true?'是':'否'}}</span>
                    </el-form-item>
                    <el-form-item label="调整会员价：">
                       <span>{{res.isVipPrice==true?'是':'否'}}</span>
                    </el-form-item>
                    <el-form-item label="调整团购价：">
                       <span>{{res.isVipPrice==true?'是':'否'}}</span>
                    </el-form-item>
                    <el-form-item label="备注：">
                       <span>{{res.remark}}</span>
                    </el-form-item>
            </el-form>
        </el-row>
    
    </div>
    
    
</template>
<script>
import { mapActions, mapState } from "vuex";
import MessageMixins from "~/mixins/messages";
import PlatformMixins from "~/mixins/platform";
import QuitMixins from "~/mixins/quit";
import { routesMapping } from "~/router";
import PricepolicyTabs from "~/components/goods/manage/pricepolicyTabs";

export default {
  name: "specialgoodsviewInfo",
  mixins: [MessageMixins, PlatformMixins, QuitMixins],  
  components: { PricepolicyTabs },
  data(){
      return{
          priceList: [],
          userGroupList:[],
          stats:{
              pdz:0,
              isSalePrice:'0',
              isVipPrice:'0',
              isGroupPrice:'0',
              priceFixType:'',
          },
          kid: '',
          billNo: '',
          res:{},
          isShowBtn: false,
      }
  },
  mounted() {
      this.queryPricepolicy()
  },
  methods: {
      ...mapActions(['priceSpecialGoodsCheck',
                    'priceSpecialGoodsAdd',
                    'priceSpecialGoodsQuery',
                    'priceSpecialGoodsDelete',
                    'priceSpecialGoodsEditType',
                    'priceSpecialGoodsEdit'
      ]),
      queryPricepolicy(){
            this.kid=this.$route.params.id
            this.billNo=this.$route.params.billNo
            if (this.$route.params.approveStatus == 0) {
                this.isShowBtn = true
            } else if (this.$route.params.approveStatus == 1) {
                this.isShowBtn = false
            }
            this.priceSpecialGoodsCheck({id: this.kid, billNo: this.billNo}).then(res=>{
                this.priceList = res.productList
                this.userGroupList = res.userGroupList
                this.res=res
                this.stats.priceFixType = res.priceFixType
                this.priceList.forEach(item => {
                    item.salePrice = (Number(item.salePrice) / 100).toFixed(2)
                    item.vipPrice = (Number(item.vipPrice) / 100).toFixed(2)
                    item.groupPrice = (Number(item.groupPrice) / 100).toFixed(2)
                });
                console.log(this.$route.params)
                console.log(this.res)
            })
      },
      goEdit(){
        this.$router.push({path: `/goods/manage/editSpecialPrice/${this.$route.params.id}/${this.$route.params.billNo}`});
      },
    closeView(){
        this.OnBackLatePage();
    },
    //点击取消
    OnBackLatePage() {
        this.$message({
            type: 'success',
            message: `操作成功`
        })
        this.quit(routesMapping.SpecialPricePolicy,true)
    },

  }
}
</script>
