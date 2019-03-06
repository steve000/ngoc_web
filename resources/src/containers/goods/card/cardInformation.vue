<template>
    <!-- 商品 > 卡券管理 > 卡券信息管理 -->
    <div id="cardInformation" class="wrapper">
        <div class="left-section pull-left">
          <div class="add-section">
            <el-upload class="import-card-information" action="" :limit="1" :before-upload="beforeUpload" accept="file">
              <el-button size="small" type="primary" plain class="addButton"><i class="el-icon-plus"></i>导入卡券信息</el-button>
            </el-upload>

            <!-- <el-upload class="select-file" action="" :limit="1" :before-upload="beforeUpload" accept="file">
              <span slot="trigger" class="import-download iconfont">
                <i class="icon-daoru"></i>导入Excel</span>
            </el-upload> -->
          </div>
          <el-menu default-active="1">
              <el-menu-item index="1">
                  <i class="iconfont1 iconquanbu icon-quanbu"></i>
                  <div slot="title" @click="showPurchase('-1','all')" class="menu-btn-space">全部卡券信息</div>
              </el-menu-item>
          </el-menu>
        </div>
        <div class="main-section">
            <information-list  :cardInfoList="importDataList"></information-list>
        </div>
    </div>

</template>

<script>
import { mapActions, mapState } from "vuex";
import PlatformMixins from "~/mixins/platform";
import { routesMapping } from "~/router";
import QuitMixins from "~/mixins/quit";
import informationList from "~/components/goods/card/informationList";

export default {
  name: "card-information",
  mixins: [PlatformMixins, QuitMixins],
  components: {
    informationList
  },
  created() {},
  data() {
    return {
      operationId: 1, // 传入要搜索的ID，如果是同一个函数通过不同id调取数据的话
      flagMsg: "", // 传入要搜索的类型，如果是根据显示类型获取数据的话
      click: "",
      importDataList: []
    };
  },
  methods: {
    ...mapActions([
      "showPageLoading",
      "hidePageLoading",
      "importCardInforAction",
    ]),
    beforeUpload(file) {
      let fileName = file.name;
      let index = fileName.indexOf(".");
      let ext = fileName.substring(index + 1, file.length).replace(/\s*/g, "");
      if (!(ext == "xlsx" || ext == "xls" || ext == "cvs")) {
        this.$message({
          message: "上传的文件格式不正确，请选择Excel文件(*.xlsx)！",
          type: "warning"
        });
      } else {
        let formData = new FormData();
        formData.append("file", file);
        this.showPageLoading();
        this.importCardInforAction(formData).then(resp => {
          console.log(resp)
          let returnData = resp.result
          this.hidePageLoading();
          if (resp.status === 1) {
            this.$message({
              message: returnData[0].errorMessage,
              type: "error",
            });
          } else {
            if (returnData.length >= 1) {
								this.$message({
									message: "导入成功",
									type: "success",
                });
                this.importDataList = returnData;
							} else {
								this.$message({
									message: "请检查导入数据是否为空!",
									type: "warning"
								});
              }
          }
        });
      }
      return false;
    }
  }
};
</script>

<style lang="scss">
#cardInformation {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .left-section {
    .add-section {
        padding: 10px;
        text-align: center;
        .addButton {
            display: flex;
          margin: auto;
          font-size: 14px;
        }
    }
    .iconquanbu {
        margin-left: 10px;
        margin-right: 5px;
    }
    .el-menu {
        background-color: #E9EEF1;
        .divide-line {
            margin-left: 20px;
            width: 120px;
            border-bottom: 1px solid #DDE2E5;
        }
        .el-menu-item {
            line-height: 44px;
            height: 44px;
            color: #424E67;
        }
        .el-menu-item.is-active {
            color: #3B8CFF;
            background-color: #dde2e5;
        }
        .el-menu-item:hover {
            background-color: #dde2e5;
        }
        .menu-btn-space {
            display: inline-block;
            width: 100px;
            font-size: 12px;
        }
        .menu-icon-place-holder {
            margin-right: 5px;
            width: 24px;
            text-align: center;
            font-size: 18px;
            vertical-align: middle;
            display: inline-block;
        }
        .el-menu-item:nth-child(1) {
            .menu-btn-space {
                font-size: 14px;
            }
        }
    }
    .import-card-information {
      display: flex;
      margin: auto;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
  .main-section {
    .main-wrapper {
      .block-color {
        width: 100%;
        height: 100%;
        background-color: #fff;
        position: relative;
      }
    }
  }
}
</style>
