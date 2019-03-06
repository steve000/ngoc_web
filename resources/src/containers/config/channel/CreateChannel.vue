<template>
    <div class="create-channel">
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
        </div>
        <div class="content-wrapper">
            <el-form label-position="left"
                     label-width="110px"
                     :model="createChannelForm"
                     :rules="rules"
                     ref="createChannelForm">
                <div class="flex-container">
                    <div class="flex-item">
                        <el-form-item label="渠道名：">
                            <el-input v-model="createChannelForm.channelName" class="row_width" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="flex-container">
                    <div class="flex-item">
                        <el-form-item label="备注：">
                            <el-input v-model="createChannelForm.channelName" class="row_width" size="small">
                            </el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="flex-container">
                    <div class="flex-item">
                        <el-form-item label="渠道售卖商品：">
                            <el-button size="small" >导入Excel</el-button>
                        </el-form-item>
                    </div>
                </div>
                <div class="channel-table-wrapper">
                    <el-table :data="channelProductList" border  width="100%">
                        <el-table-column label="NGOC商品名称" prop="purchaseId" min-width="170">
                            <template slot-scope="scope">
                                <div class="row-show" :title="scope.row.purchaseId"
                                     @click="">{{scope.row.purchaseId}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="NGOC商品编码" prop="storehouseName" min-width="110">
                            <template slot-scope="scope">
                                <div class="row-show" :title="scope.row.storehouseName">{{scope.row.storehouseName}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="渠道商商品名称" prop="supplier" min-width="110">
                            <template slot-scope="scope">
                                <div class="row-show" :title="scope.row.supplier">{{scope.row.supplier}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="渠道商品编码" prop="totalAmount" min-width="110">
                            <template slot-scope="scope">
                                <div class="row-show" :title="scope.row.totalAmount">{{scope.row.totalAmount}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="销售方式" prop="totalAmount" min-width="110">
                            <template slot-scope="scope">
                                <div class="row-show" :title="scope.row.totalAmount">{{scope.row.totalAmount}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="代发客户" prop="totalAmount" min-width="110">
                            <template slot-scope="scope">
                                <div class="row-show" :title="scope.row.totalAmount">{{scope.row.totalAmount}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="销售单价/元" prop="totalAmount" min-width="110">
                            <template slot-scope="scope">
                                <div class="row-show" :title="scope.row.totalAmount">{{scope.row.totalAmount}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="校验结果" prop="totalAmount" min-width="110">
                            <template slot-scope="scope">
                                <div class="row-show" :title="scope.row.totalAmount">{{scope.row.totalAmount}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" prop="totalAmount" min-width="110">
                            <template slot-scope="scope">
                                <div class="row-show" :title="scope.row.totalAmount">{{scope.row.totalAmount}}</div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-form>
        </div>
        <div class="submitBtn">
            <el-button size="small" @click="">取消</el-button>
            <el-button  type="primary" @click="" size="small">提交</el-button>
        </div>
    </div>
</template>

<script>
import PlatformMixins from "~/mixins/platform";
export default {
  components: {},
  name: "createChannel",
  data () {
    return {
      createChannelForm: {},
      rules: {},
      channelProductList: []
    };
  },
  mixins: [PlatformMixins]
};
</script>

<style lang="scss">
.create-channel {
  height: auto;
  margin: 10px 30px 0px 30px;
  .content {
    .title {
      color: #333;
      background-color: #ffffff;
      border-bottom: 1px solid #e5e5e5;
    }
  }
  .content-wrapper {
    padding: 20px 20px 1px 5px;
    background-color: #ffffff;
  }
  .flex-container {
    display: flex;
    .flex-item {
      min-width: 390px;
      padding-left: 25px;
    }
  }
  .channel-table-wrapper {
    padding-left: 25px;
    width: 100%;
  }
  .submitBtn {
    padding: 20px;
    background-color: white;
  }
}
</style>
