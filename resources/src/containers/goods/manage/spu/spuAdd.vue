   <template>
   <div class="content">
        <div class="title">
            <div>基本信息</div>
        </div>
        <div class="content-wrapper">
          <el-form ref="form" :model="spulist" label-width="130px" :rules="rules">
            <el-form-item label="产品名称：" class='form-margin-top' prop="productName">
              <el-col :span="10">
                <el-input :placeholder='isNo.productName' v-model="spulist.productName" :maxlength="20" class="rowUI" size="small"></el-input>
                <span>{{spulist.productName.length}}/20</span>
              </el-col>
            </el-form-item>
            <el-form-item label="产品分类：" class='form-margin-top'>
                <el-select ref='cateIdFirst' @change="change1" v-model="spulist.cateIdFirstName" :placeholder="isNo.cateIdFirst">
                  <el-option  v-for="(one) in this.cateIdFirstList" :key='one.cateId' :label='one.cateName' :value='one'></el-option>
                </el-select>
                <el-select ref='cateIdSecond' @change="change2" v-model="spulist.cateIdSecondName" :placeholder="isNo.cateIdSecond">
                  <el-option v-for="(one) in this.cateIdSecondList" :key='one.cateId' :label='one.cateName' :value='one'></el-option>
                </el-select>
                <el-select @change="change3" v-model="spulist.cateIdThirdName" placeholder="三级品类">
                  <el-option v-for="(one) in this.cateIdThirdList" :key='one.cateId' :label='one.cateName' :value='one'></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="品牌：" class='form-margin-top'>
              <el-col :span='10'>
                <el-select
                  v-model="currentBrandId"
                  value-key="productName"
                  filterable
                   class="rowUI" 
                   size="small"
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

            <el-form-item class='form-margin-top' label="产品简介：" prop="productInfo">
              <el-col :span='10'>
                <el-input  type="textarea" :rows="4" :maxlength="200" v-model='spulist.productInfo' placeholder="请输入备注，200字以内" style="min-width: 1100px;"></el-input>
                <span>{{spulist.productInfo.length}}/200</span>
              </el-col>
            </el-form-item>
            <el-form-item class='form-margin-top' style="text-align: center;">
              <el-button @click='closeView'>取消</el-button>
              <el-button @click="getGoSub()" type="primary" >提交</el-button>
            </el-form-item>
          </el-form>
        </div>
   </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import TableHeightMixins from "~/mixins/tableheight";
import PlatformMixins from "~/mixins/platform";
import { routesMapping } from "~/router";
import QuitMixins from '~/mixins/quit';

export default {
  name: "SpuAdd",
  data() {
    const productNameFail = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入产品名称'))
            }else {
                return callback();
            }
    }
    const productInfoFail = (rule, value, callback) => {
            if (value.length > 200) {
                return callback(new Error('请输入小于200字简介'))
            }else {
                return callback();
            }
		}
    return{
     cateIdFirstList:'',
     cateIdSecondList:'',
     cateIdThirdList:'',
     spulist:{
         brandId:'',
         cateIdFirst:'',
         cateIdSecond:'',
         cateIdThird:'',
         cateIdFirstName:'',
         cateIdSecondName:'',
         cateIdThirdName:'',
         productName:'',
         productInfo:'',
     },
     currentBrandId:'',
     subParams:{
       brandId:'',
       cateIdFirst:'',
       cateIdSecond:'',
       cateIdThird:'',
       productName:'',
       productInfo:'',
     },
     isNo:{cateIdFirst:'一级类目',cateIdSecond:'二级类目',productName:'输入产品名称'},
     datas:{
       level:1,
       parentCateId:'',
     },
     brandAllList: [],
     rules: {
       productName: [{ required: true, validator: productNameFail, trigger: 'blur' }],
        productInfo: [{ required: false, validator: productInfoFail, trigger: 'blur' }],
     }
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
    // this.skuNameFilter()
    //this.getGoodsConfigUnit();
    this.getQueryAllBrands();
  },
  
  methods: {
    ...mapActions(['manageCategoryAll','manageBrandAll','addSpu']),
    change1(val){
        this.subParams.cateIdFirst=val.cateId
        this.spulist.cateIdFirstName = val.cateName
        this.spulist.cateIdSecondName = ''
        this.spulist.cateIdThirdName = ''
        this.datas.parentCateId=val.cateId 
        this.datas.level=2
        this.getCategoryList(this.datas)
    //    get
    },
    change2(val){
        this.subParams.cateIdSecond=val.cateId
        this.spulist.cateIdSecondName = val.cateName
        
        this.spulist.cateIdThirdName = ''
        console.log()
        this.datas.parentCateId=val.cateId 
        this.datas.level=3
        this.getCategoryList(this.datas)
    },
    change3(val){
        this.subParams.cateIdThird = val.cateId
        this.spulist.cateIdThirdName = val.cateName
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
          this.cateIdFirstList = res.result;
          console.log('1级:',res.result)//.cateName,res.result.level)
        })
      }else if(datas.level==2){
        this.manageCategoryAll(datas).then(res=>{
          console.log(datas)
          this.cateIdSecondList=res.result
          console.log('2级:',res.result)//.cateName,res.result.level)
        })
      }else if(datas.level==3){
        this.manageCategoryAll(datas).then(res=>{
          console.log(datas)
          this.cateIdThirdList=res.result
          console.log('3级:',res.result)//.cateName,res.result.level)
        })
      }
      
    },

    getQueryAllBrands(){
      this.manageBrandAll().then(resp=>{
        console.log('品牌:',resp)
        this.brandAllList = resp.result
      })
    },

    //select模糊查询

    getGoSub(){
      this.subParams.brandId = this.spulist.brandId;
      this.subParams.productName = this.spulist.productName;
      this.subParams.productInfo = this.spulist.productInfo;

      if (this.subParams.productName == "") {
        this.$message({
          type: "warning",
          message: "请输入产品名称"
        });
      } else if (this.subParams.cateIdFirst == "") {
        this.$message({
          type: "warning",
          message: "请选择一级类目"
        });
      } else if (this.subParams.cateIdSecond == "") {
        this.$message({
          type: "warning",
          message: "请选择二级类目"
        });
      } else if (this.subParams.brandId == "") {
        this.$message({
          type: "warning",
          message: "请选择品牌"
        });
      } else {
        this.addSpu(this.subParams).then(resp => {
          this.$message({
            type: "success",
            message: "新增spu产品成功"
          });
          this.quit(this.routesMapping.SpuIndex, true);
        })
      }
    },
    closeView(){
      console.log('关闭')
      this.quit(this.routesMapping.SpuIndex, true)
    }
  }
};
</script>

<style lang="scss">

</style>
