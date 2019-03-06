   <template>
    <div class="purchase-list">
      <el-form ref="form" :model="spulist" label-width="140px">
        <el-form-item label="产品名称" class='form-margin-top'>
          <el-col :span="10">
          <el-input v-model="spulist.productName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="产品分类" class='form-margin-top'>
            <el-select @change="change1()" v-model="spulist.cateIdFirst" placeholder="一级品类">
              <el-option  v-for="(one) in this.cateIdFirstList" :key='one.cateId' :value='one.cateName'></el-option>
            </el-select>
            <el-select @change="change2()" v-model="spulist.cateIdSecond" placeholder="二级品类">
              <el-option v-for="(one) in this.cateIdSecondList" :key='one.cateId' :value='one.cateName'>{{one.cateName}}</el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="品牌" class='form-margin-top'>
          <el-col :span='10'>
            <el-select
              v-model="currentBrandId"
              :filter-method="skuNameFilter"
              value-key="productName"
              filterable
              placeholder="选择产品名称："
              no-data-text="没有找到相关的产品"
              @change="changeBrand"
              >
              <el-option
              v-for="(item) in brandAllList"
              :key="item.brandId"
              :label="item.brandCnName"
              :value="item">
              </el-option>
            </el-select>



          </el-col>
        </el-form-item>
        <!-- <el-form-item label="单位">
          <el-col :span='10'>
            <el-select @change='changeCompany()' v-model='spulist.'></el-select>
          </el-col>
        </el-form-item> -->
        <el-form-item class='form-margin-top' label="产品简介">
          <el-col :span='10'>
            <el-input  type="textarea"  v-model='spulist.productInfo'></el-input>
          </el-col>
        </el-form-item>
        <el-form-item class='form-margin-top'>
          <el-button type="primary" >立即创建</el-button>
          <el-button @click='closeView'>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
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
     cateIdFirstList:'',
     cateIdSecondList:'',
     spulist:{
         brandId:'',
         cateIdFirst:'',
         cateIdSecond:'',
         cateIdThird:'',
         productName:'',
         productInfo:'',
     },
     currentBrandId:''
     ,
     datas:{
       level:1,
       parentCateId:'',
     },
     
        brandAllList: [],
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
    this.getCategoryList(this.datas);
    //this.getGoodsConfigUnit();
    //this.getQueryAllBrands();
  },
  
  methods: {
    ...mapActions(['manageCategoryAll','manageBrandAll']),
    change1(){
        this.datas.parentCateId= this.spulist.cateIdFirst
        this.datas.level=2
        this.getCategoryList(this.datas)
    //    get
    },
    change2(){
      console.log(2)
    },
    changeCompany(){

    },
    changeBrand(val){
      this.spulist.brandId=val.brandId
      this.currentBrandId = val.brandCnName
      console.log(val.brandId,this.currentBrandId)
    },
    getCategoryList(datas){
      if(datas.level==1){
        this.manageCategoryAll(datas).then(res=>{
          console.log(datas)
          console.log('1级:',res.result)//.cateName,res.result.level)
        })
      }else{
        this.manageCategoryAll(datas).then(res=>{
          console.log(datas)
          this.cateIdSecondList=res.result
          console.log('2级:',res.result)//.cateName,res.result.level)
        })
      }
      
    },
    // getGoodsConfigUnit(){
    //   this.goodsConfigUnitQuery().then(res=>{
    //     console.log(res)
    //   })
    // },
    getQueryAllBrands(par){
      //let params={brandCnName:par}
      this.manageBrandAll(par).then(res=>{
        console.log('品牌:',res.result)
        this.brandAllList = res.result
      })
    },

    //select模糊查询
    skuNameFilter(string){
      if(string){
        let par = {brandCnName:string}
        
        this.getQueryAllBrands(par)
      }
      
    },
    getGoSub(){
      this.addSpu(this.spulist).then(
        //
      )
    },
    closeView(){
      console.log('关闭')
      this.quit(this.routesMapping.SpuIndex, true)
    }
  }
};
</script>

<style lang="scss">
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
}
</style>
