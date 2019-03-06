<template>
    <div class='events-query'>
        <bread-crumb>
           <!--  <span slot="filter" @click="isShowFilter=!isShowFilter">
                    <span v-if='!isShowFilter'>条件筛选</span> 
                    <span v-else>收起</span> 
                    <i :class="isShowFilter ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
            </span> -->
        </bread-crumb>
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
                    size="small"
                    placeholder="搜索商品"
                    prefix-icon="el-icon-search"
                    v-model="goodsName">
                </el-input>
            </el-col>
             
           <!--  <el-button type="primary" icon="el-icon-search">停用</el-button>
            <el-button type="primary" icon="el-icon-search">导入</el-button>
            <el-button type="primary" icon="el-icon-search">导出</el-button>
            <el-button type="primary" icon="el-icon-search">配置管理</el-button>
            <el-button type="primary" icon="el-icon-search">表头配置</el-button> -->
        </div>
        <div class="search-results" v-if="list">
          <dynamic-table
            :data='list.result'
            :pageNo='list.pageNo'
            :pageSize='list.pageSize'
            :total='list.total'
            @pagination='onPagiation'
            >
                <el-table-column type="selection" ></el-table-column>
                <el-table-column label='spu编码' prop='productId' width="150"></el-table-column>
                <el-table-column label='条码' prop='opttime' width="150"></el-table-column>
                <el-table-column label='商品名称'  prop='productName' width="150"></el-table-column>
                <el-table-column label='商品详情' prop='productDetails' width="150"></el-table-column>
                <el-table-column label='商品介绍' prop='productInfo' width="150"></el-table-column>
                <el-table-column label='规格' prop='accounttype' width="150"></el-table-column>
                <el-table-column label='销售价' prop='accounttype' width="150"></el-table-column>
                <el-table-column label='成本价' prop='accounttype' width="150"></el-table-column>
                <el-table-column type="expand" label='商品操作' width="100">
                    <el-button></el-button>
                    <template slot-scope="props">
                        <div class="mytable">
                            <table>
                                <tbody>
                                    <tr>
                                        <td> <span class="item">小米</span></td>
                                        <td><span class="item">小米</span></td>
                                        <td>小米</td>
                                        <td>小米</td>
                                        <td>未知</td>
                                        <td>1234567</td>
                                        <td>火星文明</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                  </template>
             </el-table-column>
          </dynamic-table>
      </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import DynamicTable from '~/components/DynamicTable';
import Modal from '~/components/Modal';
import * as C from '~/constants/api';
import utils from '~/utils/misc';
import Api from '~/utils/api';
import BreadCrumb from '~/components/BreadCrumb'
export default {
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
            goodsName:"", //搜索商品名称
            rules: {
                appid: validatorNumber,
                username: validator,
                ac: validator,
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
       //获取角色列表
        refreshPage(otherParams = {}){
            const params = { ...otherParams };
            this.showPageLoading();
            
            this.queryGoodsList(params).then( resp => {
                this.hidePageLoading()
            });
        },
        doSearch(formName) {
            this.$refs.form.validate(valid => {
                if (!valid) return;
                this.refresh({ pageNo: 1 });
            });
        },

        //重置条件
        resetForm(formName) {
            this.$refs.form.resetFields();
      },
        //分页
        onPagiation(pageNo) {
            this.refreshPage({pageNo})
        }
    },
};
</script>

<style lang='scss'>
.events-query {
    height: 100%;
    margin: -15px;
    .function{
        padding:20px;
    }
    .form-section {
        padding-top: 10px;
        padding-left:10px;
        background: white;
        margin-bottom: 10px;
    }
}
.el-table th{
        background-color:#F2F8FF;
    }
//table
.mytable
  {
    width: 100%;
    height: auto;
    margin: 0 auto;
  }
  .mytable table
  {
    width: 78%;
    padding: 0;
    margin-left: 198px;
    border: 1px solid #999;
    padding: 0;
    border-collapse: collapse;
    font-size: 15px;
  }
  .mytable td 
  {
    height: 66px;
    line-height:66px;
    padding-left:5px;
    line-height: 30px;
    text-align: left;
    width:150px;
    border: 1px solid lightgrey;
    padding: 0;
}
  .el-table__expanded-cell[class*=cell]{
    padding: 0;
    margin: 0;
  }
.item{
    padding-left:10px;
}

</style>
