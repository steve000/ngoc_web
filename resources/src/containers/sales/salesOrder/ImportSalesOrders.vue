<template>
    <div class="storehouseconfig sales-import">
        <div class="title-wrapper">
            <el-form ref="form" label-width="68px">
                <el-form-item label="订单来源">
                    <el-select style="font-size:14px;" v-model="currentChannel" placeholder="请选择" size="medium">
                        <el-option v-for="item in allChannelList" :key="item.channelId" :label="item.channelName" :value="item.channelId">
                        </el-option>
                    </el-select>
                    <el-button class="pull-right sureUploadFile" size="small" type="primary" @click="importOrdersDataQueryFunction" :disabled="isSelectImportFile">确认</el-button>
                    <el-upload class="select-file " action="" :limit="1" :before-upload="beforeUpload" :file-list="fileList" accept="file">
                        <el-button class="choice-button" size="small" type="primary" plain>选择文件</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-wrapper">
            <el-table :data="resultOrderLists" border :height="tableHeight">
                <el-table-column label="订单号">
                    <template slot-scope="scope">
                        <div class="row-btn-show">
                            <div class="row-show" :title="scope.row.orderId">
                                {{scope.row.orderId?scope.row.orderId:'--'}}
                            </div>
                            <!--<el-button type="text" @click="delStorehouse(scope.row.storehouseId)" v-if="!scope.row.productTotalCount && scope.row.status != 2">删除</el-button>-->
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="外部订单行项">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.serialNo">
                            {{scope.row.serialNo?scope.row.serialNo:'--'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="商品编码">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.skuId">
                            {{scope.row.skuId?scope.row.skuId:'--'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="数量">
                    <template slot-scope="scope">
                        <div class="row-show" :title="scope.row.saleCount">
                            {{scope.row.saleCount?scope.row.saleCount:'--'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="单价">
                    <template slot-scope="scope">
                        <div class="row-show">
                            {{scope.row.price?scope.row.price:'--'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="运输方式">
                    <template slot-scope="scope">
                        <div class="row-show">
                            --
                        </div>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="签收标准">
                    <template slot-scope="scope">
                        <div class="row-show">
                            --
                        </div>
                    </template>
                </el-table-column> -->
                <el-table-column label="收货人">
                    <template slot-scope="scope">
                        <div class="row-show">
                            {{scope.row.custLinkMan?scope.row.custLinkMan:'--'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="电话">
                    <template slot-scope="scope">
                        <div class="row-show">
                            {{scope.row.custLinkTel?scope.row.custLinkTel:'--'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="收货地址">
                    <template slot-scope="scope">
                        <div class="row-show">
                            {{scope.row.custAddress?scope.row.custAddress:'--'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="区县内部划分">
                    <template slot-scope="scope">
                        <div class="row-show">
                            --
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="加急标识">
                    <template slot-scope="scope">
                        <div class="row-show">
                            --
                        </div>
                    </template>
                </el-table-column>
                <div slot="empty" class="table_slot_empty_text">
                    <div><img src="../../../layouts/images/nodata.png" /></div>
                    <div>暂无数据</div>
                </div>
            </el-table>
            <!--<div class="pagination-section">-->
            <!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"-->
            <!--:current-page.sync="pageNo" background-->
            <!--:page-size="pageSize"-->
            <!--layout="total, sizes, prev, pager, next, jumper"-->
            <!--:total="totalCount">-->
            <!--</el-pagination>-->
            <!--</div>-->
        </div>
        <el-dialog title="导入结果" :visible.sync="isRemarkDialogVisibleSuccess" width="30%">
            <div>
                <span class="el-icon-warning colorGreen" @click.native="getResultDownloadFile"></span>成功导入！</div>
            <span slot="footer" class="dialog-footer">
                <!-- <a class="el-icon-download" :href="fileUrl" :download="fileName" ref="download">下载解析结果</a> -->
                <el-button type="primary" @click="isRemarkDialogVisibleSuccess=false;quit(routesMapping.SalesOrder);" size="mini">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="导入结果" :visible.sync="isRemarkDialogVisibleFail" width="30%">
            <div>
                <span class="el-icon-warning colorYellow" @click.native="getResultDownloadFile"></span>未能成功导入，本次导入操作{{resultOrderLists.length}},存在{{failCount}}条异常解析，请下载解析结果。</div>
            <span slot="footer" class="dialog-footer">
                <a class="el-icon-download" :href="fileUrl" :download="fileName" ref="download">下载解析结果</a>
                <el-button type="primary" @click="btnDo" size="mini">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import QuitMixins from "~/mixins/quit";
import { routesMapping } from "~/router";
import PlatformMixins from "~/mixins/platform";
import messages from "~/mixins/messages";
import TableHeight from "~/mixins/tableheight";
export default {
    name: "ImportSalesOrders",
    mixins: [PlatformMixins, TableHeight, messages, QuitMixins],
    data() {
        return {
            storehouseList: [],
            pageNo: 1,
            pageSize: 10,
            totalCount: 0,
            fileList: [],
            resultOrderLists: [],
            form_data: "",
            isSelectImportFile: true,
            isRemarkDialogVisibleSuccess: false,
            isRemarkDialogVisibleFail: false,
            failCount: "",
            sucCount: "",
            allChannelList: [],
            currentChannel: "",
            importBatchId: "",
            fileUrl: null,
            queryChannelParams: {
                pageNo: 1,
                pageSize: 9999,
                importTemplate: ""
            },
            fileType: null,
            fileName: null,
            downLoadfileName: null
        };
    },
    mounted() {
        this.initGetChannelData();
        this.setTableHeight(220);
    },
    methods: {
        ...mapActions([
            "importSalesOrders",
            "showPageLoading",
            "hidePageLoading",
            "importOrdersDataQuery",
            "channelQueryWithTemplateAction",
            "dataConfirmImport",
            "resultDownload"
        ]),
        initGetChannelData() {
            this.channelQueryWithTemplateAction(this.queryChannelParams).then(
                resp => {
                    this.allChannelList = resp.result;
                }
            );
        },
        btnDo() {
            this.isRemarkDialogVisibleFail = false;
            if (this.failCount != 0) {
                this.quit(routesMapping.SalesOrder);
            }
        },
        beforeUpload(file) {
            if (this.currentChannel) {
                let fileName = file.name;
                let index = fileName.indexOf(".");
                let ext = (this.fileType = fileName.substring(index + 1, file.length));
                if (!(ext == "xls" || ext == "xlsx" || ext == "csv")) {
                    this.$message({
                        message: "上传的文件格式不正确，请选择Excel文件(*.xls)！",
                        type: "warning"
                    });
                } else {
                    let formData = new FormData();
                    formData.append("file", file);
                    formData.append("channelType", this.currentChannel);
                    this.isSelectImportFile = false;
                    this.showPageLoading();
                    this.importSalesOrders(formData).then(resp => {
                        this.hidePageLoading();
                        this.resultOrderLists = resp.result;
                        if (this.resultOrderLists.length >= 1) {
                            this.importBatchId = this.resultOrderLists[0].importBatchId;
                        } else {
                            this.showWarning("未找到相应的模板，请确认导入模板类型是否正确!");
                        }

                        this.isRemarkDialogVisibleFail = false;
                    });
                }
            } else {
                this.$message({
                    message: "请选择订单来源",
                    type: "warning"
                });
            }
            return false;
        },
        importOrdersDataQueryFunction() {
            this.showPageLoading();
            this.dataConfirmImport({
                channelType: this.currentChannel,
                batchId: this.importBatchId.toString()
            })
                .then(resp => {
                    this.isSelectImportFile = true;
                    this.sucCount = resp.sucCount;
                    this.failCount = resp.failCount;
                    return this.resultDownload({
                        batchId: this.importBatchId,
                        channelType: this.currentChannel,
                        dataType: "file"
                    });
                })
                .then(resp => {
                    let _fileType = this.fileType == "csv" ? "text/csv;charset=utf-8;" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                    if (this.failCount != 0) {
                        this.isRemarkDialogVisibleFail = true;
                        this.fileName = this.fileType == "csv" ? "导入失败.csv" : "导入失败.xls";
                    } else {
                        this.isRemarkDialogVisibleSuccess = true;
                        // this.$store.commit("IMPORT_SALES_ORDER_SUCESS", Math.random());
                        this.fileName = this.fileType == "csv" ? "导入成功.csv" : "导入成功.xls";
                    }

                    let blob = new Blob([resp], { type: _fileType });
                    let objectUrl = URL.createObjectURL(blob);
                    this.fileUrl = objectUrl;
                    this.hidePageLoading();
                });
        },
        getResultDownloadFile() { }
    }
};
</script>

<style lang="scss">
.storehouseconfig {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  padding: 10px 20px 0;
  .title-wrapper {
    left: 20px;
    right: 20px;
    position: absolute;
    z-index: 10;
    padding: 20px 20px 0 20px;
    background-color: #fefefe;
  }
  .table-wrapper {
    padding: 77px 20px 0 20px;
    width: 100%;
    overflow-y: hidden;
    .pagination-section {
      padding: 20px 0;
      text-align: right;
      right: 20px;
    }
  }
}
.select-file {
  display: inline-block;
  float: right;
}
.sureUploadFile {
  margin-top: 4px;
  margin-left: 10px;
}
.colorGreen {
  color: rgba(70, 255, 62, 0.76);
  margin-right: 5px;
  display: inline-block;
}
.colorYellow {
  color: rgba(255, 242, 21, 0.76);
  margin-right: 5px;
  display: inline-block;
}

.sales-import {
  .choice-button {
    color: #3b8cff;
    border: 1px solid #bfd9fe;
    background-color: #fff;
  }
  .el-table__body-wrapper{
      overflow-y: scroll!important;
  }
}
</style>
