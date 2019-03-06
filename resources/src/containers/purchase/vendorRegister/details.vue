<template>
    <el-row class="viewPurchase detailsBigBox">
        <!-- 左边信息 -->
        <el-row  class="viewPurchaseLeft DetailsLeftBox">
            <div class="viewLeftTop">
                <el-row >
                        <h4 class="order">供应商名称：{{ vendorRegisterForm.vendorName}}</h4>
                        <h4 class="status goodsStatus">引进状态：<span v-if="vendorRegisterForm.importStatus == 1">已引进</span><span v-if="vendorRegisterForm.importStatus == 0">未引进</span></h4>
                        <h4 class="status">审批状态：<span v-if="vendorRegisterForm.approveStatus == 0">草稿</span><span v-if="vendorRegisterForm.approveStatus == 1">审批通过</span></h4>
                </el-row>
            </div>
            <!-- <el-row> -->
            <el-row class="viewPurchaseRight DetailsRightBox" >
                <h3>联系信息</h3>
                <el-form :modle="vendorRegisterForm" label-position="left" class="TotalBasic">
                    <el-form-item label="联系人：">
                        <span>{{vendorRegisterForm.linkman ? vendorRegisterForm.linkman : '--'}}</span>
                    </el-form-item>
                    <el-form-item label="联系电话：">
                        <span>{{vendorRegisterForm.phoneNum ? vendorRegisterForm.phoneNum : '--'}}</span>
                    </el-form-item>
                    <el-form-item label="邮箱：">
                        <span>{{vendorRegisterForm.email ? vendorRegisterForm.email : '--'}}</span>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row style="padding-left:20px;">
                 <el-button type="primary" size="small"  @click="goBack()">返回</el-button>  
            </el-row>
            <!-- </el-row> -->
        </el-row>
        <!--右边基本信息-->
        <el-row class="viewPurchaseRight DetailsRightBox" >
            <h3>基本信息</h3>
            <el-form :modle="vendorRegisterForm" label-position="left" class="TotalBasic">
              <el-form-item label="注册时间：">
                  <span>{{vendorRegisterForm.registerTime ? vendorRegisterForm.registerTime : '--'}}</span>
              </el-form-item>
              <el-form-item label="地址：">
                  <span>{{vendorRegisterForm.areaAddress ? vendorRegisterForm.areaAddress : '--'}}</span>
              </el-form-item>
              <el-form-item label="简介：">
                  <span style="word-wrap: break-word;">{{vendorRegisterForm.introduce ? vendorRegisterForm.introduce : '--'}}</span>
              </el-form-item>
              <el-form-item label="备注：">
                  <span style="word-wrap:break-word">{{vendorRegisterForm.comments ? vendorRegisterForm.comments : '--'}}</span>
              </el-form-item>
            </el-form>
        </el-row>
    </el-row>
</template>
<script>
    import {routesMapping} from '~/router'
    import {mapActions, mapState} from 'vuex'
    import platform from '~/mixins/platform';
    import QuitMixins from '~/mixins/quit';
    import Modal from '~/components/common/Modal.vue';
    export default {
        name: 'vendorRegisterDetails',
        mixins: [platform,QuitMixins],
        components: {},
        data() {
            return {
                // 需要提交的表单数据
                vendorRegisterForm: {},
            }
        },
        mounted(){
            this.refreshPage();
        },
        activated() {
           this.refreshPage();
        },
        methods: {
            ...mapActions(["purchaseVendorregisterQuery","showPageLoading", "hidePageLoading"]),
            refreshPage(){
                let datas = {
                    id: this.$route.params.id,
                }
              this.purchaseVendorregisterQuery(datas).then((res) =>{
                this.vendorRegisterForm = res
                this.vendorRegisterForm.areaAddress = this.vendorRegisterForm.province + '-' + this.vendorRegisterForm.city + '-' + this.vendorRegisterForm.area + '-' + this.vendorRegisterForm.address
              })
            },
            // 返回
            goBack() {
                this.quit(routesMapping.vendorRegisterIndex,true)
            }
        },
    }
</script>
<style lang='scss'>
    .viewPurchase{
        .DetailsLeftBox { 
            .viewLeftTop {
                .goodsStatus,
                .order,
                .status {
                    font-size: 14px;
                    font-weight: 700;
                    margin-left: 70px;
                }
            }
            .el-form-item {
                margin-bottom: 10px;
            }
        }
    }
</style>
