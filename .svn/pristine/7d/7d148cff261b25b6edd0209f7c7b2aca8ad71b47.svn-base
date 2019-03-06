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
                  v-model="spulist.brandCnName"
                  value-key="brandCnName"
                  class="rowUI" 
                  size="small"
                  filterable
                  placeholder="选择产品名称："
                  no-data-text="没有找到相关的产品"
                  @change="changeBrand"
                  >
                  <el-option
                  v-for="(item, index) in brandAllList"
                  :key="item.brandId"
                  :label="item.brandCnName"
                  :value="item">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item class='form-margin-top' label="产品简介：" prop="productInfo">
              <el-col :span='10'>
                <el-input type="textarea" :rows="4" :maxlength="200" v-model='spulist.productInfo' placeholder="请输入备注，200字以内" style="min-width: 1100px;"></el-input>
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
  name: "SpuEdit",
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
         productId: "",
         productInfo:'',
     },
     isNo:{cateIdFirst:'一级类目',cateIdSecond:'二级类目',productName:'输入产品名称'},
     subParams:{
       brandId:'',
       cateIdFirst:'',
       cateIdSecond:'',
       cateIdThird:'',
       productName:'',
       productId: parseInt(this.$route.params.productID),
       productInfo:'',
     },
     currentBrandId:''
     ,
     datas:{
       level: 1,
       parentCateId:'',
     },
    brandAllList: [],
    rules: {
       productName: [{ required: true, validator: productNameFail, trigger: 'blur' }],
        productInfo: [{ required: true, validator: productInfoFail, trigger: 'blur' }],
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
    this.getSessRow(); // 根据id拿到编辑
    this.getQueryAllBrands(); // 拿到所有品牌供选择
  },
  
  methods: {
    ...mapActions(['manageCategoryAll','manageBrandAll','editSpu','querySpu']),
    getSessRow(){
      let params ={productId: parseInt(this.$route.params.productID)}
      console.log(this.$route.params,'传参')
      this.querySpu(params).then(resp=>{
          this.spulist = resp[0]
          console.log(resp,"回显")
      })
    },
    
    change1(val) {
      console.log(val,"eq321");
        this.spulist.cateIdFirstName = val.cateName
        this.spulist.cateIdFirst = val.cateId
        this.spulist.cateIdSecondName = ""
        this.spulist.cateIdSecond = ""
        this.spulist.cateIdThirdName = ""
        this.spulist.cateIdThird = ""
        this.datas.parentCateId = val.cateId
        this.datas.level = val.level + 1
        this.getCategoryList(this.datas)
    },
    change2(val) {
        this.spulist.cateIdSecondName = val.cateName
        this.spulist.cateIdSecond = val.cateId
        this.spulist.cateIdThirdName = ""
        this.spulist.cateIdThird = ""
        this.datas.parentCateId = val.cateId 
        this.datas.level = val.level + 1
        this.getCategoryList(this.datas)
    },
    change3(val) {
      this.spulist.cateIdThirdName = val.cateName
      this.spulist.cateIdThird = val.cateId
    },

    changeBrand(val) {
      this.spulist.brandId = val.brandId
      this.currentBrandId = val.brandCnName
      console.log(val.brandId,this.currentBrandId)
    },
    getCategoryList(datas) {
      if(datas.level == 1 ){
        this.manageCategoryAll(datas).then(res=>{
          console.log(datas)
          this.cateIdFirstList = res.result;
          console.log('1级:',res.result)//.cateName,res.result.level)
        })
      } else if(datas.level == 2 ) {
        this.manageCategoryAll(datas).then(res=>{
          console.log(datas)
          this.cateIdSecondList = res.result
          console.log('2级:',res.result)//.cateName,res.result.level)
        })
      } else if(datas.level == 3){
        this.manageCategoryAll(datas).then(res=>{
          console.log(datas)
          this.cateIdThirdList=res.result
          console.log('3级:',res.result)//.cateName,res.result.level)
        })
      }
      
    },
    getQueryAllBrands(par) {
      this.manageBrandAll(par).then(resp=>{
        this.brandAllList = resp.result;
      })
    },

    getGoSub() {
      this.subParams.brandId = this.spulist.brandId;
      this.subParams.productName = this.spulist.productName;
      this.subParams.productInfo = this.spulist.productInfo;
      this.subParams.cateIdFirst = this.spulist.cateIdFirst;
      this.subParams.cateIdSecond = this.spulist.cateIdSecond;
      this.subParams.cateIdThird = this.spulist.cateIdThird;
      console.log(this.subParams,"参数")

      if (this.subParams.productName == "") {
        this.$message({
          type: "warning",
          message: "请输入产品名称"
        });
      } else if (this.subParams.cateIdFirst == "") {
        this.$message({
          type: "warning",
          message: "请选择类目"
        });
      } else if (this.subParams.brandId == "") {
        this.$message({
          type: "warning",
          message: "请选择品牌"
        });
      } else {
        this.editSpu(this.subParams).then(resp => {
          this.$message({
            type: "success",
            message: "spu产品编辑成功"
          });
          this.quit(this.routesMapping.SpuIndex, true);
        })
      }
    },
    closeView(){
      console.log('关闭')
      this.quit(this.routesMapping.SpuIndex,true)
    }
  }
};
</script>

<style lang="scss">

</style>
