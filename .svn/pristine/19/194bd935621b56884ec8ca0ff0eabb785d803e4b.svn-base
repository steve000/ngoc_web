<template>
    <div>
        <el-table class="channelGoodsList" :data="channelGoodsList" border :height="tableHeight">
            <el-table-column width="100" label="行号">
                <template slot-scope="scope">
                    <div class="row-btn-show">
                        <div class="row-show" title="行号">
                            {{scope.row.excelNo?scope.row.excelNo:'--'}}
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="NGOC商品名称">
                <template slot-scope="scope">
                    <div class="row-show" :title="scope.row.inSkuName">
                        {{scope.row.inSkuName?scope.row.inSkuName:'--'}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="NGOC商品编码">
                <template slot-scope="scope">
                    <div class="row-show" :title="scope.row.inSkuId">
                        {{scope.row.outSkuId?scope.row.inSkuId:'--'}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="渠道商品名称">
                <template slot-scope="scope">
                    <div class="row-show" :title="scope.row.outSkuName">
                        {{scope.row.outSkuName?scope.row.outSkuName:'--'}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="渠道商品编码">
                <template slot-scope="scope">
                    <div class="row-show" :title="scope.row.channelSkuId">
                        {{scope.row.outSkuId?scope.row.outSkuId:scope.row.inSkuId}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="销售方式">
                <template slot-scope="scope">
                    <div class="row-show">
                        {{scope.row.saleType==0?'自营':scope.row.saleType==1?'代售':'代发'}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="发货方">
                <template slot-scope="scope">
                    <div class="row-show" :title="scope.row.vendorName">
                        {{scope.row.vendorName?scope.row.vendorName:'--'}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="100" label="最低价/元">
                <template slot-scope="scope" :title="scope.row.minPrice || 0">
                    <div class="row-show">
                        {{scope.row.minPrice || 0}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="100" label="最高价/元">
                <template slot-scope="scope">
                    <div class="row-show" :title="scope.row.maxPrice || 0">
                        {{scope.row.maxPrice || 0}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="备注">
                <template slot-scope="scope">
                    <div class="row-show" :title="scope.row.remark">
                        {{scope.row.remark?scope.row.remark:'--'}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="250" label="问题描述">
                <template slot-scope="scope">
                    <el-tooltip placement="left-start" effect="light">
                        <div slot="content">{{scope.row.errorMessage}}</div>
                        <div style="cursor:pointer;" :class="{'redColor':scope.row.dealResult=='E','greenColor':scope.row.dealResult=='S'}">
                            {{scope.row.errorMessage}}
                        </div>
                    </el-tooltip>
                    <!-- <div :class="{'redColor':scope.row.dealResult=='E','greenColor':scope.row.dealResult=='S'}" :title="scope.row.errorMessage">
                            {{scope.row.errorMessage}}
                        </div> -->
                </template>
            </el-table-column>
            <!-- <div slot="empty" class="table_slot_empty_text">
                    <div><img src="../../../layouts/images/nodata.png"/></div>
                <div>暂无数据</div>
                    </div> -->
        </el-table>
    </div>
</template>
<script>
import TableHeightMixins from "~/mixins/tableheight";
import {  mapState } from "vuex";
export default {
    mixins: [TableHeightMixins],
    name: "importChannelGoodsList",
    data() {
        return {
        };
    },
    props: ["channelGoodsList"],
    computed: {
    ...mapState({
        importChannelGoodsList: ({ channel }) => {
            return channel.importChannelGoodsResult;
        },
    })},
};
</script>

<style lang="scss">
.importChannelGoods {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  padding: 10px 30px 0;
  .title-wrapper {
    left: 30px;
    right: 30px;
    position: absolute;
    z-index: 10;
    background-color: white;
  }
  .table-wrapper {
    padding: 130px 0 0 0;
    width: 100%;
    overflow-y: hidden;
    .pagination-section {
      padding: 20px 0;
      text-align: right;
      right: 20px;
    }
  }
  .title {
    width: 100%;
    height: 44px;
    line-height: 44px;
    padding: 0 20px;
    font-size: 14px;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 20px;
    color: #333;
  }
  .channelName {
    display: inline-block;
    width: 300px;
  }
  .channelName {
    padding: 0 20px;
  }
  .channelGoodsList {
    padding: 0 20px;
    padding-top: 0 !important;
    border-top: none;
  }
  .el-table__empty-block {
    width: 100% !important;
    min-height: 44px;
    height: 44px;
    border: 1px solid #f2f6fd;
    border-top: none;
    .el-table__empty-text {
      top: 22px;
      font-size: 12px;
    }
  }
}

.select-file {
  display: inline-block;
  float: right;
}

.sureUploadFile {
  margin-top: 4px;
  margin-left: 15px;
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

.redColor {
  color: red;
}
.greenColor {
  color: green;
}
.import-download {
  color: #3b8cff;
  display: inline;
  font-size: 13px;
  i {
    margin-right: 6px;
  }
}
</style>
