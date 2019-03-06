<template>
    <div class="table-style-change">
        <el-table class="ProductListTable sale-list-table" :data="saleList">
            <el-table-column label="商品名称" prop="skuName" width="200">
                <div class="row-show">商品名称</div>
            </el-table-column>
            <el-table-column label="商品编码" prop="skuId">
                <div class="row-show">商品编码</div>
            </el-table-column>
            <el-table-column label="单位" prop="unitName" width="60">
                <div class="row-show">单位</div>
            </el-table-column>
            <el-table-column label="销售数量" prop="saleCount">
                <div class="row-show">销售数量</div>
            </el-table-column>
            <el-table-column label="已出库" prop="sendCount">
            </el-table-column>
            <el-table-column label="本次出库" width="100">
                <template slot-scope="scope">
                    <div class="outbound-ruleForm">
                        <el-input type="number" v-model.number="scope.row.thisOutbound" auto-complete="off"></el-input>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="submit-btn">
            <el-button type="primary">确认出库</el-button>
        </div>
    </div>
</template>

<script>
  export default {
      props: {
          saleList: Array,
      },
      name: "outbound-table",
      data() {
            return {
                tableData: [
                    {
                        name: '商品',
                        skuNumber: '商品',
                        unit: '商品',
                        saleAmount: '商品',
                        outbounded: '商品',
                        thisOutbound: 23,
                    },
                ],
            };
      },
      methods: {
          submitForm(formName) {
              this.$refs[formName].validate((valid) => {
                  if (valid) {
                      alert('submit!');
                  } else {
                      console.log('error submit!!');
                      return false;
                  }
              });
          },
      },
  }
</script>
<style lang="scss">
    .outbound-ruleForm{
        .el-input__inner{
            height: 26px;
            width: 76px;
            color: #666;
            border: 1px solid #eee;
        }
        .el-input.is-active .el-input__inner,.el-input__inner:focus{
            border-color: #666;
        }
    }
</style>
<style scoped lang="scss">
    .submit-btn{
        text-align: right;
        .el-button{
            width: 100px;
            height: 34px;
            line-height: 34px;
            padding: 0;
            margin-top: 20px;
        }
    }
</style>
