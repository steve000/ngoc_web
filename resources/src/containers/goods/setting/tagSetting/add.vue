<!-- 标签新增 -->
<template>
    <div class="tagBox">
        <div class="content">
            <div class="title">
                <div>基本信息</div>
            </div>
            <div class="content-wrapper">
                <el-form label-width="110px" :model="tagData" ref="tagData">
                    <div class="displayStyle">
                        <el-form-item label="标签名称：" :rules="{ required: true, message: '标签名称不能为空'}">
                            <el-input v-model="tagData.tagName" placeholder="请输入品标签名" :maxlength="20" clearable class="rowUI" size="small">
                            </el-input>
                            <span>{{tagData.tagName.length}}/20</span>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="content" style="text-align: center;padding-top:20px;">
            <div class="pl20 pb20">
                <el-button type="primary" style="width:90px;" @click="submitCreateOrder">提交</el-button>
                <el-button plain style="width:90px;margin-left:40px;" @click="quit(routesMapping.tag, true)">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import PlatformMixins from "~/mixins/platform";
import QuitMixins from "~/mixins/quit";
import { routesMapping } from "~/router";
import { mapActions, mapState } from "vuex";
export default {
  name: "tagAdd",
  mixins: [PlatformMixins, QuitMixins],
  data() {
    return {
      // 商品名称loading
      queryGoodsNameLoading: false,
      // 编辑标签参数对象
      tagData: {
        tagName: ""
      },
      // 模糊查询商品名称
      searchKey: "",
      ifAddtag: 0,
      tagAll: []
    };
  },
  mounted() {
    this.getAllTag();
  },
  methods: {
    ...mapActions(["manageTagAdd","manageTagAll"]),
    // 拿到所有tag
    getAllTag() {
      this.manageTagAll().then(resp => {
        console.log(resp);
        this.tagAll = resp.result;
      })
    },
    // 提交编辑商品属性
    submitCreateOrder() {
      if (this.tagData.tagName == "") {
        this.$message({
          type: "warning",
          message: `标签名称不能为空`
        });
      } else if (this.tagData.tagName.length > 20) {
        this.$message({
          type: "warning",
          message: `标签名称太长`
        });
      } else if (
        this.tagAll.some((item,index) => {
            return item.tagName == this.tagData.tagName  //结果为true
        })
      ) {
        this.$message({
          type: "warning",
          message: `标签名已存在`
        });
      } else {
        this.manageTagAdd({
          tagName: this.tagData.tagName
        }).then(res => {
          console.log(res);
          if (res) {
            this.$message({
              type: "success",
              message: `新增标签` + res.msg
            });
            this.quit(this.routesMapping.tag, true);
          } else {
            this.$message({
              type: "warning",
              message: `新增标签处理失败`
            });
          }
        }).catch(err =>{
          this.$message({
              type: "warning",
              message: `新增标签` + err.msg
            });
        });
      }
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.tagBox {
  height: 100%;
  padding: 20px;
  .content {
    background-color: #fff;
    .title {
      font-size: 14px;
      color: #333333;
      line-height: 44px;
      height: 44px;
      background-color: #fff;
      border-bottom: 1px solid #e5e5e5;
    }
    .content-wrapper {
      padding: 20px 20px 1px 20px;
      .displayStyle {
        display: inline-block;
        width: 90%;
        padding-left: 25px;
        .row_width {
          width: 300px;
          height: 36px;
        }
      }
    }
    .addProduct {
      margin-bottom: 20px;
    }
    table thead th {
      background: #f6f7fb;
      width: 100px;
      height: 44px;
    }
    table {
      border: 1px solid #eee;
      border-collapse: collapse;
      margin: 0 auto;
      text-align: left;
      font-size: 12px;
      tr {
        border-bottom: 1px solid #eee;
        background: #ffffff;
        height: 44px;
        overflow: hidden;
        box-shadow: 0 1px 0 0 #f2f6fd;
        border: 1px solid #f0f3fa;
        transition: 1s;
        .iconfont1 {
          width: 16px;
          height: 16px;
          top: -6px;
          right: -1px;
          position: absolute;
          display: none;
          background-color: white;
          color: red;
          transition: 1s;
        }
        &:hover {
          //    border: 1px dashed #539EFF;
          outline: 1px dashed #539eff;
          outline-offset: 0px;
          transition: 1s;
          .iconfont1 {
            display: block;
            cursor: pointer;
            transition: 1s;
          }
        }
        td {
          padding-left: 5px;
          .table-input {
            width: 120px;
          }
        }
      }
    }
  }
  .orderContainer {
    margin: 20px;
    background-color: #fbfbfb;
    border: 1px solid #f1f1f1;
    text-align: right;
    font-size: 14px;
    color: #333333;
    .orderCount {
      height: 50px;
      line-height: 50px;
      margin-right: 15px;
      span {
        color: red;
        font-size: 18px;
      }
    }
  }
  .submitBtn {
    clear: both;
    padding: 20px;
    background-color: white;
  }
  .el-table__body-wrapper {
    overflow: inherit;
  }
  .createAddress_func {
    margin: 0 10px;
    padding: 3px;
    width: 58px;
    height: 20px;
    cursor: pointer;
    &.defalut_address {
      background-color: #ffeddd;
      color: #ff9624;
      border: 1px solid #ff9624;
    }
    &.set_defalutAddress {
      display: none;
      background-color: #ff9624;
      color: #fff;
      border: 1px solid #ff9624;
    }
  }
  .el-table__row:hover {
    .createAddress_func {
      &.set_defalutAddress {
        display: inline;
      }
    }
  }
  .inventory {
    background-color: #fa5555;
    color: #fff;
    font-size: 12px;
    width: 58px;
    height: 20px;
    line-height: 20px;
    text-align: center;
  }
}
</style>
