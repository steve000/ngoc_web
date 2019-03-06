<template>
  <div class='addCardType-view'>
    <!-- 基本信息 -->
    <div class="content">
      <div class="title">
        <div>新增卡片类别</div>
      </div>
      <div class="content-wrapper">
        <el-form label-width="100px">
          <div>
            <div class="displayStyle">
              <el-form-item label="发行实体：" required>
                <el-input v-model="params.issueEntity" disabled class="row_width" size="small" placeholder="登录实体">
                </el-input>
              </el-form-item>
            </div>
            <div class="displayStyle">
              <el-form-item label="类型名称：" required label-width="110px">
                <el-input v-model="params.typeName" class="row_width" size="small" :maxlength='20' placeholder="请输入卡券名称，20字以内">
                </el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="displayStyle">
              <el-form-item label="类型编码：" required>
                <el-input v-model="params.typeCoding" class="row_width" size="small" :maxlength='20' ></el-input>
                <div v-show="params.codeJudgment">编码不能重复</div>

              </el-form-item>
            </div>
          </div>
          <div style="margin-left: 25px;">
            <el-form-item label="描述：">
              <el-input type="textarea" :rows="6" :maxlength='200' v-model="params.remark" placeholder="请输入备注，200个字以内"></el-input>
              <span>{{params.remark.length}}/200</span>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <!-- <div class="btn-section pt20">
      <el-row :gutter="20">
        <el-col :span="3"  :offset="8">
          <el-button class="cancel-button" @click="savePurchase()" size="small">保存</el-button>
        </el-col>
        <el-col :span="3" :offset="2">
          <el-button size="small" class="cancel-button" @click="OnBackLatePage">取消</el-button>
        </el-col>
      </el-row>
    </div> -->
    <div class="btn-section pt20">
      <el-row :gutter="20">
        <el-col :span="3"  :offset="8">
          <el-button size="small" type="primary" plain @click="OnBackLatePage">取消</el-button>
        </el-col>
        <el-col :span="3" :offset="2">
          <el-button @click="savePurchase()" type="primary" size="small">保存</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import MessageMixins from "~/mixins/messages";
import PlatformMixins from "~/mixins/platform";
import QuitMixins from "~/mixins/quit";
import { routesMapping } from "~/router";

//import CardTypeList from '~/containers/goods/cardTypeM'
//import ProductList from '~/containers/purchase/PurchaseProductList';
export default {
  name: "addCardType",
  mixins: [MessageMixins, PlatformMixins, QuitMixins],
  components: {  },
  data() {
    return {
      params: {
        issueEntity: "",
        typeCoding: "",
        typeName: "",
        remark: "",
        getcaryList: "",
        codeJudgment: false,
        listIndex: '',
      }
    };
  },
  mounted() {
    this.params.issueEntity=sessionStorage.getItem('entityName')
   },
  computed: {
    ...mapState({
      //getcaryAllList:({outboundWarehouseList}) => outboundWarehouseList.productList
    })
  
    //getcaryList:({outboundWarehouseList}) => outboundWarehouseList.productList,
  },
  methods: {
    ...mapActions([
      "ContractPurchaseSkuList",
      "queryEntityContractList",
      "QueryPurchaseOrderDetailList",
      "showPageLoading",
      "createProcureOrder",
      "addCardType",
      "hidePageLoading"
    ]),

    addCardTypeForm(tCoding, tName, tremark) {
      console.log("进保存")
      let params = { typeCode: tCoding, typeName: tName, remark: tremark }
      this.$confirm("确认保存此条卡券类型", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.addCardType(params)
            .then(resp => {
              this.$message({
                type: 'success',
                message: `新增券码类型` + resp.msg
              })
              this.quit(this.routesMapping.CardType, true)
            })
            .catch(err => {
              console.log(err,"dwqeqw");
              this.$message({
                type: 'warning',
                message: err.msg
              })
            })
        }).catch(err => { console.log('取消保存') })
    },

    savePurchase() {
      // console.log(1111111119)
      let tCoding = this.params.typeCoding;
      let tName = this.params.typeName;
      let tremark = this.params.remark;
      let allList = this.params.getcaryList;

      this.getListIndex(tCoding, allList)

      if (tName == "" || tCoding == "") {
        this.$message({
          type: 'warning',
          message: `卡券名称和卡券编码不能为空`
        })
      // }else if(typeof(tCoding)!="number"){
      //   console.log(tCoding)
      //   this.$message({
      //     type:'warning',
      //     message:'卡券类型编码为数字'
      //   })
      }else if(tName.length>20){
        this.$message({
          type:'warning',
          message:"类型名称过长,字数不能超过20"
        })
      }else if(tCoding.length>20){
        this.$message({
          type:'warning',
          message:"类型编码过长,字数不能超过20"
        })
      } 
      else {
        if (this.params.listIndex < 0) {
          this.addCardTypeForm(tCoding, tName, tremark)
        } else {
          this.$message({
            type:'warning',
            message:'卡券编码重复'
          })
        }
      }
    },

    getListIndex(tCoding, allList) {
      for (let i in allList) {
        //   for (let x in allList[i]) {
        if (tCoding == allList[i].typeCode) {
          return this.params.listIndex = i;
        }
      } return this.params.listIndex = 0 - 1;
    },
    //点击取消
    OnBackLatePage() {
      this.quit(this.routesMapping.CardType, true);
    },
    getCardTypeAllList(val) {
      console.log(val)
      this.getcaryList = val[0];
    }
  }
};
</script>
<style lang='scss' scoped>
.addCardType-view {
  height: 100%;
  position: relative;
  padding: 10px 30px 0px 30px;
  .content {
    .title {
      color: #333;
      font-weight: 700;
      background-color: #ffffff;
      border-bottom: 1px solid #e5e5e5;
      .receiveTitle {
        display: inline-block;
      }
      .downIcon {
        cursor: pointer;
        transition: 1s;
      }
    }
    .content-wrapper {
      padding: 20px 20px 1px 10px;
      .displayStyle,
      .displayStyle1 {
        display: inline-block;
        padding-left: 25px;
        .row_width {
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
      .contarctInformation {
        margin-left: 126px;
        margin-bottom: 15px;
        .contarctInformation_form {
          background-color: #f8f9fb;
          padding-bottom: 6px;
          padding-top: 18px;
          .contractInfo1,
          .contractInfo2 {
            display: inline-block;
            .contract_row_width {
              width: 240px;
            }
          }
        }
      }
      .supplierNo {
        margin-left: 195px;
      }
      .text-dash-show {
        font-size: 14px;
      }
    }
    .addProduct {
      margin-bottom: 16px;
    }
  }
  .orderBox {
    background-color: white;
    padding: 0px 20px;
    .orderContainer {
      background-color: #fbfbfb;
      padding: 0px 20px;
      border: 1px solid #f1f1f1;
      height: 50px;
      line-height: 50px;
      .orderCount {
        float: right;
        span {
          color: red;
          font-size: 18px;
        }
      }
    }
  }
  .cancel-button {
    color: #3b8cff;
    border: 1px solid #bfd9fe;
  }
  .unvalid {
    border-radius: 5px;
  }
  .el-table__body-wrapper {
    overflow: inherit;
  }
}
</style>
