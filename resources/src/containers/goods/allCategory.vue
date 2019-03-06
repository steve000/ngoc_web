<template>
    <div class='events-query'>
        <!-- <bread-crumb> -->
           <!--  <span slot="filter" @click="isShowFilter=!isShowFilter">
                    <span v-if='!isShowFilter'>条件筛选</span>
                    <span v-else>收起</span>
                    <i :class="isShowFilter ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
            </span> -->
        <!-- </bread-crumb> -->
      <!--   <el-collapse-transition>
            <div class='form-section' v-if="isShowFilter">
                <el-form :inline="true" ref='form'  :rules="rules" :model="form" label-width="95px">
                     <el-form-item prop='ac' >
                        <el-input v-model='form.ac' placeholder="搜索商品"  prefix-icon="el-icon-search"></el-input>
                    </el-form-item>
                    <el-form-item prop='appid'>
                        <el-select v-model='form.appid' filterable  placeholder="选择类目">
                            <el-option
                                v-for="item in apps"
                                :key="item.appid"
                                :label="item.appname"
                                :value="item.appid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                      <el-form-item prop='appid'>
                        <el-select v-model='form.appid' filterable placeholder="选择品牌">
                            <el-option
                                v-for="item in apps"
                                :key="item.appid"
                                :label="item.appname"
                                :value="item.appid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                      <el-form-item prop='appid'>
                        <el-select v-model='form.appid' placeholder="选择状态">
                            <el-option
                                v-for="item in apps"
                                :key="item.appid"
                                :label="item.appname"
                                :value="item.appid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label=''>
                        <el-button type='primary' @click='doSearch(form)'>帅选</el-button>
                    </el-form-item>
                    <el-form-item label=''>
                        <el-button type='primary' @click='resetForm(form)'>重置条件</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-collapse-transition> -->
        <div class="function">
            <el-col :span="4">
                 <el-input
                    @keyup.enter.native="searchEnterFun"
                    size="small"
                    placeholder="搜索商品"
                    v-model="productName">
                    <i slot="prefix" class="el-input__icon el-icon-search" @click="onSearchGood"></i>
                </el-input>
            </el-col>
           <!--  <el-button type="primary" icon="el-icon-search">停用</el-button>
            <el-button type="primary" icon="el-icon-search">导入</el-button>
            <el-button type="primary" icon="el-icon-search">导出</el-button>
            <el-button type="primary" icon="el-icon-search">配置管理</el-button>
            <el-button type="primary" icon="el-icon-search">表头配置</el-button> -->
        </div>
        <el-row class="talble-title">
            <el-col :span="2" class="table-item"><b>商品操作</b></el-col>
            <el-col :span="3" class="table-item"><b>spu编码</b></el-col>
            <el-col :span="2" class="table-item"><b>sku编码</b></el-col>
            <el-col :span="3" class="table-item"><b>商品名称</b></el-col>
            <el-col :span="3" class="table-item"><b>品牌</b></el-col>
            <el-col :span="5" class="table-item"><b>规格</b></el-col>
            <el-col :span="2" class="table-item"><b>库存</b></el-col>
            <el-col :span="2" class="table-item"><b>零售价</b></el-col>
            <el-col :span="2" class="table-item"><b>成本价</b></el-col>
        </el-row>
        <el-row class="goodsList">
            <el-row class="table-body">
                <el-row class="table-content" v-for="(item,index) in goodsList" :key="index">
                        <el-row class="table-content-item">
                            <el-col :span="2" class="table-item">
                                <div class="handleButtonContainer" v-if="item.isShowDetail" @click="goodsListToggle(index)">
                                        <i class="el-icon-arrow-down"></i>
                                </div>
                                <div class="handleButtonContainer" v-else @click="goodsListToggle(index)">
                                        <i class="el-icon-arrow-right"></i>
                                </div>
                                <div class="handleButtonContainer">
                                    <router-link to="/goods/list/viewGoods">
                                       <el-button type="text" size="mini">查看</el-button>
                                    </router-link>
                                </div>
                            </el-col>
                           <el-col :span="3" class="table-item">
                                <div>
                                     <el-tooltip class="item" effect="light" :content="item.productId.toString()" placement="right-end">
                                        <el-button type="text" class="skuDetailItem">{{item.productId | doSubstring}}</el-button>
                                    </el-tooltip>
                                </div>
                            </el-col>
                            <el-col :span="2" class="table-item">{{item.block | doSubstring}}</el-col>
                            <el-col :span="3" class="table-item">
                                <div>
                                     <el-tooltip class="item" effect="light" :content="item.productName" placement="right-end">
                                        <el-button type="text" class="skuDetailItem">{{item.productName | doSubstring}}</el-button>
                                    </el-tooltip>
                                </div>
                            </el-col>
                            <el-col :span="3" class="table-item">
                                <div>
                                     <el-tooltip class="item" effect="light" :content="item.brandCnName.toString()" placement="right-end">
                                        <el-button type="text" class="skuDetailItem">{{item.brandCnName | doSubstring}}</el-button>
                                    </el-tooltip>
                                </div>
                            </el-col>
                            <el-col :span="5" class="table-item">{{item.block | doSubstring}}</el-col>
                            <el-col :span="2" class="table-item">{{item.block | doSubstring}}</el-col>
                            <el-col :span="2" class="table-item">{{item.block | doSubstring}}</el-col>
                            <el-col :span="2" class="table-item">{{item.block | doSubstring}}</el-col>
                        </el-row>
                        <el-row class="expand" v-show="item.isShowDetail" v-for="(val,i) in item.skuList" :key="i">
                            <el-col :span="2" class="table-item" :class="i!=item.skuList.length-1 ?'sku-item':'sku-item2' "><span>&nbsp</span></el-col>
                            <el-col :span="3" class="table-item" :class="i!=item.skuList.length-1 ?'sku2-item':'' "><span>&nbsp</span></el-col>
                            <el-col :span="2" class="table-item" >
                                 <el-tooltip class="item" effect="light" :content="val.skuId.toString()"     placement="right-end">
                                        <el-button type="text" class="skuDetailItem">{{val.skuId | doSubstring}}
                                        </el-button>
                                </el-tooltip>
                            </el-col>
                            <el-col :span="3" class="table-item">
                                <el-tooltip class="item" effect="light" :content="item.productName"     placement="right-end">
                                        <el-button type="text" class="skuDetailItem">{{item.productName | doSubstring}}
                                        </el-button>
                                </el-tooltip>
                            </el-col>
                            <el-col :span="3" class="table-item">
                                  <el-tooltip class="item" effect="light" :content="item.brandCnName" placement="right-end">
                                        <el-button type="text" class="skuDetailItem">{{item.brandCnName | doSubstring}}</el-button>
                                    </el-tooltip>
                            </el-col>
                            <el-col :span="5" class="table-item">
                                {{val.skuPreferentialPrice}}
                            </el-col>
                            <el-col :span="2" class="table-item">{{val.skuPreferentialPrice}}</el-col>
                            <el-col :span="2" class="table-item">{{val.skuPrice}}</el-col>
                            <el-col :span="2" class="table-item">{{val.skuCost}}</el-col>
                        </el-row>
                </el-row>
            </el-row>
        </el-row>
        <el-row class="footer">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="pageNo"
                               :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                               :total="totalCount">
                </el-pagination>
        </el-row>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import DynamicTable from '~/components/DynamicTable';
import Modal from '~/components/Modal';
import Api from '~/utils/api';
import BreadCrumb from '~/components/BreadCrumb'
export default {
    props: { operationId: String, flag: String },
    name: 'GoodsList',
    components: {
        DynamicTable,
        Modal,
        BreadCrumb
    },

    data() {
        const validator = [{ required: true, trigger: 'blur' }];
        const validatorNumber = [
            { required: true, trigger: 'blur', type: 'number' }
        ];
        return {
            isShowFilter:false,
            pageSize: 10,
            pageNo: 1,
            totalCount: 0,
            goodsList:[], //商品列表
            cateId:"",  //品类ID
            productId:"", //产品ID
            productName:"", //搜索商品名称
            rules: {
                appid: validatorNumber,
                username: validator,
                ac: validator
            },
            form: {
                appid: '',
                ac: '',
            },
            apps:[
             {
                 value: 'appid',
                 label: 'appname'
                }
            ]
        };
    },
      watch: {
        flag: function(nval, oval){
            console.log(nval)
            this.refreshPage(nval);
        }
    },
     computed: {
         ...mapState({
                list: ({goodsList}) => goodsList.list,
            }),
    },
    beforeMount() {
        this.refreshPage();
    },
    methods: {
       ...mapActions(["queryGoodsList", "showPageLoading", "hidePageLoading"]),
       //模糊查询
      onSearchGood(){
        this.refreshPage()
       },
       searchEnterFun(e){
         var keyCode = window.event? e.keyCode:e.which;
                //  console.log('回车搜索',keyCode,e);
                 if(keyCode == 13 && this.productName){
                     this.refreshPage()
                 }
       },
       //获取商品列表
       refreshPage(nval){
            this.showPageLoading();
            var params = {
                pageSize : this.pageSize,
                pageNo: this.pageNo,
                cateId: nval,
                productName : this.productName,

            }
            Api.queryGoodsList(params).then((res)=>{
                      this.hidePageLoading()
                      this.goodsList = res.result;
                      this.totalCount = res.totalCount;
                  })
       },
       //根据商品Id查询sku列表
       getSkuList(index){
            this.showPageLoading();
            const params = {
                productId : this.productId,
            };
             Api.queryGoodsListSku(params).then((res)=>{
                      this.hidePageLoading();
                      var item = this.goodsList[index];
                      item.skuList = res.result;
                      console.log(item.skuList)
                      item.skuList.forEach(val=>{
                        val.skuAttrs.forEach(sku=>{
                                console.log(sku.attrName)
                                console.log(8888)
                                return
                            })
                      })
                      this.$set(this.goodsList,index,item);
                  })
        },

        doSearch(formName) {
            this.$refs.form.validate(valid => {
                if (!valid) return;
                this.refresh({ pageNo: 1 });
            });
        },
        //点击展开
        goodsListToggle(index){
            var item = this.goodsList[index]
            item.isShowDetail = !item.isShowDetail
            if (item && item.isShowDetail) {
                this.productId = item.productId;
                this.getSkuList(index);
            }else{
                 this.$set(this.goodsList,index,item)
            }
        },

        //重置条件
        resetForm(formName) {
            this.$refs.form.resetFields();
      },
        //分页
        onPagiation(pageNo) {
            this.refreshPage({pageNo})
        },
        handleSizeChange(nSize){
            this.pageSize = nSize;
            this.refreshPage();
            },
        handleCurrentChange(nPage){
            this.pageNo = nPage;
            this.refreshPage();
       },
   },
    filters:{
        doSubstring(value){
            if(value){
                var val = value+"";
                return val.length>6 ? val.substring(0,6)+"..." : val;
            }else{
                return "--";
            }
        },
    },
};
</script>

<style lang='scss' scoped>
.events-query {
    background-color:white;
    .function{
        padding:20px;
        margin-bottom:30px;
    }
    .goodsList{
        background-color: white;
        position: fixed;
        top: 212px;
        left: 185px;
        right: 20px;
        bottom: 73px;
    }
    .footer{
        position:fixed;
        bottom:20px;
        width:100%;
        text-align:right;
        right:20px;
        .el-pagination {
            .btn-prev, .btn-next{
                i{
                    visibility: hidden;
                }
            }
            .btn-prev{
                &:before{
                    content:"上一页"
                }
            }
            .btn-next{
                &:before{
                    content:"下一页"
                    }
                }
        }
    }
    .form-section {
        padding-top: 10px;
        padding-left:10px;
        background: white;
        margin-bottom: 10px;
    }
    .talble-title{
        line-height:56px;
        border : 1px solid #ebeef5;
        border-bottom:none;
        border-right:none;
        border-left:none;
        background-color:#F2F8FF;
        font-size:14px;
    }
    .table-content{
        line-height:50px;
    }
    .table-body{
        height:100%;
        overflow:auto;
    }
    .table-item{
        border-bottom : 1px solid #ebeef5;
       text-align:center;
    }
    .table-item:first-child {
        border-left : 1px solid #ebeef5;
    }
    .sku-item{
        border-left:none;
        border-right:none;
        border-bottom:none;
    }
    .sku-item2{
        border-right:none;
    }
    .sku2-item{
        border-bottom:none;
    }
    .skuDetailItem{
        color:black;
        font-size:13px;
    }
    .handleButtonContainer{
            line-height:26px;
            display:inline-block;
            text-align:center;
            vertical-align:middle;
            padding-right:5px;
        }

}

</style>
