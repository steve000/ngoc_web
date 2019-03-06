<template>
    <el-row class="viewPurchase detailsBigBox">
        <!-- 左边信息 -->
        <el-row  class="viewPurchaseLeft DetailsLeftBox">
            <div class="viewLeftTop">
                <el-row >
                  <el-upload class="import-card-information" action="" :limit="1" :before-upload="beforeUpload" accept="file" style="display:inline-block;">
                    <el-button type="primary" size="small" style="margin-top:10px;display:inline-block;">选择文件</el-button>  
                  </el-upload>
                  
                  <!-- <el-button type="primary" size="small" style="margin-top:10px;display:inline-block;" @click="importExcel">下载模板</el-button>   -->
                  <a :href="fileUrl" :download="dowanloadFileName" class="down-load-temp">下载模板</a>
                </el-row>
            </div>

            <!-- <el-row> -->
            <div style="padding: 20px 20px 0;">
              <el-table :data="tableList">
                  <el-table-column label="行号">
                      <template slot-scope="scope">
                          <div class="row-show" :title="scope.row.seq">
                              {{scope.row.seq}}
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column label="费用名称"  prop="feeName">
                      <template slot-scope="scope">
                          <div class="row-show" :title="scope.row.feeName">
                              {{scope.row.feeName ? scope.row.feeName : '--'}}
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column label="费用金额" prop="feeTotal" >
                      <template slot-scope="scope">
                          <div class="row-show" :title="scope.row.feeTotal">
                              {{scope.row.feeTotal ? scope.row.feeTotal : '--'}}

                          </div>
                      </template>
                  </el-table-column>
                  <!-- <el-table-column label="支付实体" prop="">
                      <template slot-scope="scope" >
                          <div class="row-show" :title="this.payGroupName">
                              {{this.payGroupName ? this.payGroupName : '--'}}
                          </div>
                      </template>
                  </el-table-column> -->
                  <el-table-column label="收款实体" prop="recGroupName">
                      <template slot-scope="scope" >
                          <div class="row-show" :title="scope.row.recGroupName">
                              {{scope.row.recGroupName ? scope.row.recGroupName : '--'}}
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column label="备注" prop="remark" min-width="120">
                      <template slot-scope="scope" >
                          <div class="row-show" :title="scope.row.remark">
                              {{scope.row.remark ? scope.row.remark : '--'}}
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column label="问题描述" min-width="140">
                      <template slot-scope="scope" >
                          <div class="row-show" :title="scope.row.responseDesc">
                              {{scope.row.responseDesc ? scope.row.responseDesc : '--'}}
                          </div>
                      </template>
                  </el-table-column>
              </el-table>
              <div class="orderBox">
                <el-button type="primary" size="small"  @click="goBack()">返回</el-button>  
              </div>
            </div>
            <!-- </el-row> -->
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
        name: 'logisticsCostEntryDetails',
        mixins: [platform,QuitMixins],
        components: {},
        data() {
            return {
              // 需要提交的表单数据
              tableList: [],
              payGroupName: '',
              payUserGroupId: '',
              dowanloadFileName: "", //下载模板名
              fileUrl: null, //下载路径
            }
        },
        created() {
            this.stockLogisticscostDownload({ dataType: "file" }).then(
                resp => {
                    this.dowanloadFileName = "物流费用模板下载.xls";
                    let blob = new Blob([resp], {
                        type:
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    });
                    let objectUrl = URL.createObjectURL(blob);
                    this.fileUrl = objectUrl;
                }
            );
        },
        mounted(){
        },
        activated() {
        },
        methods: {
            ...mapActions(["stockLogisticscostImport", "stockLogisticscostDownload", "showPageLoading", "hidePageLoading"]),
            beforeUpload(file) {
              let fileName = file.name;
              let index = fileName.indexOf(".");
              let ext = fileName.substring(index + 1, file.length);
              if (ext != "xlsx") {
                this.$message({
                  message: "上传的文件格式不正确，请选择Excel文件(*.xlsx)！",
                  type: "warning"
                });
              } else {
                let formData = new FormData();
                formData.append("file", file);
                this.showPageLoading();
                this.stockLogisticscostImport(formData).then(resp => {
                //   console.log(resp)
                  this.tableList = resp.result
                  this.hidePageLoading();
                  if (resp.status === 0) {
                    this.$message({
                      message: "导入失败",
                      type: "error"
                    });
                  } else {
                    this.$message({
                      message: "导入成功",
                      type: "success"
                    });
                    // this.operationId = this.operationId + 1
                    // this.$router.go(0);
                  }
                });
              }
              return false;
            },
            importExcel(){
            //   this.payGroupName = sessionStorage.getItem('entityName')
            //   this.payUserGroupId = sessionStorage.getItem('entityId',)
            //     let datas = {
            //         payGroupName: this.payGroupName,
            //         payUserGroupId: this.payUserGroupId
            //     }
              this.stockLogisticscostDownload().then((res) =>{
                  console.log(res, 111)
                // window.location.href = res.filename + ''
              })
            },
            //去编辑页面
            editPurchaseOrder() {
                this.$router.push({path: `/stock/costManagement/logisticsCostEntryEdit/`, query:{id: this.$route.query.id}})
            },
            // 返回
            goBack() {
                this.$message({
                    type: 'success',
                    message: `操作成功`
                })
              this.quit(routesMapping.logisticsCostEntry,true)
            }
        },
    }
</script>
<style lang='scss'>
    .viewPurchase{
        .down-load-temp{
            border: 1px solid #dcdfe6;
            outline: 0;
            transition: .1s;
            margin-left:10px;
            font-size: 12px;
            border-radius: 3px;
            padding: 10px 15px;
            color: #fff;
            background-color: #3B8CFF;
            border-color: #3B8CFF;
            margin-top: 10px;
            display: inline-block;
            font-weight: 500;
            line-height: 1;
            cursor: pointer;
            &:hover{
                background: #66b1ff;
                border-color: #66b1ff;
                color: #fff;
            }
        }
        .stepDiv{
            color:#666666;
            padding:22px 22px 0 22px;
            .el-col.el-col-3{
                div{
                    text-align:center;
                }
            }
            .styleTime, .styleStepName{
                font-size:14px;
                color:#333333;
                line-height:30px;
            }
            .styleStepName{
                margin-left:30px;
            }
            .stepVerticalLine{
                width:1px;
                height:30px;
                background-color:#ECEEF5;
                margin:14px 0 0px 6.2%;
            }
        }
        .orderBox{
            background-color: white;  margin-top:20px;
            .orderContainer{
                background-color: #FBFBFB; padding: 0px 20px; border: 1px solid #F1F1F1; height: 50px;
                line-height: 50px;
                .orderCount{
                    float: right;
                    span{
                        color: red; font-size: 18px;
                    }
                }
            }
        }
        .goodsStatus{
            i{
                font-style:normal;
            }
        }
        table{
            width: 100% !important;
        }
        .el-table {
            font-size: 12px;
            color: #888;
            border: 1px solid #eceef5;
            border-bottom: none;
        }
        .el-table__empty-block {
            border-bottom: 1px solid #eceef5;
        }
        padding:20px 20px 0 20px;
        .editDetailsDialogTab{
            margin-top:20px;
        }
        .model-container {
            height: auto;
        }
        .el-form-item__label{
            font-size: 12px;
            line-height: 24px!important;
            color:#666666;
        }
        .el-form-item__content{
            line-height: 24px!important;
            font-size: 12px;
            span{
                color:#333333;
            }
        }
        .el-table th, .el-table tr{
            font-size: 12px;
        }
        .edieOrderDetailsLeft{
            width:77%;
            display:inline-block;
        }
        .edieOrderDetailsRight{
            border:1px solid #ECEEF5;
        }
        .edieOrderDetailsRight{
            width:21%; display:inline-block; margin-left:10px; padding:20px; vertical-align: top; background-color: white;
            h3{
                margin-bottom:10px;font-size:14px;
            }
            .IndexNum{
                i{
                    font-style:normal;
                }
            }
            .el-form-item{
                margin-bottom:5px;
            }
        }
    }
    .page-content{
        background: #e9eef1;
    }
</style>
<style lang='scss' scoped>
    .procurements-config-wrapper{
        overflow:inherit;
    }
</style>
