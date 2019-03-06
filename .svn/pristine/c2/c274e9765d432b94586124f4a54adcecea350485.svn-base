<template>
	<div class="importChannelGoods disableBorderStyle">
		<div class="title-wrapper">
			<div class="title baseInfoTitle">基本信息</div>
			<el-form class="channelName" label-width="80px" :rules="rules" ref="validateChannelForm">
				<el-form-item label="渠道名：" prop="channelName">
					<el-input placeholder="输入客户名称" size="small" v-model="channelForm.channelName" class="channelName" disabled></el-input>
				</el-form-item>
			</el-form>
		</div>
		<div class="table-wrapper">
			<div class="title">渠道售卖商品
				<el-upload class="select-file" action="" :limit="1" :before-upload="beforeUpload" accept="file">
					<span slot="trigger" class="import-download iconfont">
						<i class="icon-daoru"></i>导入Excel</span>
					<a :href="fileUrl" :download="dowanloadFileName" class="import-download iconfont  icon-xiazai" style="margin-left:20px;">下载模板</a>
				</el-upload>
			</div>
			<keep-alive>
				<channel-goods-list :channelGoodsList="importChannelGoodsList.result"></channel-goods-list>
			</keep-alive>
			<!-- <div class="submitImport">
                <el-button class="sureUploadFile" size="small" type="primary" :disabled="isImportSuccess" @click="confirmImportChannelGoods">确认添加</el-button>
                <el-button size="small" type="primary" plain @click="OnBackLatePage">取消</el-button>
            </div> -->
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PlatformMixins from "~/mixins/platform";
import TableHeight from "~/mixins/tableheight";
import QuitMixins from "~/mixins/quit";
import channelGoodsList from "~/components/channel/importChannelGoodsList";
import {routesMapping} from '~/router'

export default {
	name: "importChannelGoods",
	mixins: [PlatformMixins, TableHeight, QuitMixins],
	components: { channelGoodsList },
	data() {
		let validateChannelName = (rule, value, callback) => {
			if (!this.channelForm.channelName) {
				return callback(new Error("请输入渠道名"));
			} else {
				return callback(this.channelQueryFunction());
			}
		};
		return {
			isImportSuccess: true,
			batchId: "",
			dowanloadFileName: "",
			fileUrl: null,
			channelForm: {
				channelName: "",
				resultExportsLists: [],
				channelType: ""
			},
			rules: {
				channelName: [
					{ required: true, trigger: "blur", validator: validateChannelName }
				]
			}
		};
	},
	mounted() {
		this.setTableHeight(200);
		this.channelForm.channelType = this.$route.params.channelId;
		this.channelForm.channelName = this.$route.params.channelName;
	},
	created() {
		this.queryDownloadChannelGoodsTemplateAction({ dataType: "file" }).then(
			resp => {
				this.dowanloadFileName = "渠道公用模板下载.xls";
				let blob = new Blob([resp], {
					type:
						"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				});
				let objectUrl = URL.createObjectURL(blob);
				this.fileUrl = objectUrl;
			}
		);
	},
	computed: {
		...mapState({
			importChannelGoodsList: ({ channel }) => {
				return channel.importChannelGoodsResult;
			},
		})
	},
	methods: {
		...mapActions([
			"showPageLoading",
			"hidePageLoading",
			"postImportChannelGoodsAction",
			"queryChannelAllAction",
			"postDataConfirmImportAction",
			"queryDownloadChannelGoodsTemplateAction"
		]),
		beforeUpload(file) {
			let THIS=this;
			if (this.channelForm.channelType) {
				let fileName = file.name;
				let index = fileName.indexOf(".");
				let ext = fileName
					.substring(index + 1, file.length)
					.replace(/\s*/g, "");
				if (!(ext == "xlsx" || ext == "xls" || ext == "cvs")) {
					this.$message({
						message: "上传的文件格式不正确，请选择Excel文件！",
						type: "warning"
					});
				} else {
					let formData = new FormData();
					formData.append("file", file);
					formData.append("channelType", this.channelForm.channelType);
					this.isSelectImportFile = false;
					this.showPageLoading();
					this.postImportChannelGoodsAction(formData).then(resp => {
						this.hidePageLoading();
						if (this.importChannelGoodsList.status === 1) {
							this.$message({
								message: "导入失败",
								type: "error",
							});
							let errorList = resp.result.filter(value => {
								return value.dealResult === "E";
							});
							this.channelForm.resultExportsLists = errorList;
							this.isImportSuccess = true;
						} else {
							if (this.importChannelGoodsList.result.length >= 1) {
								this.$message({
									message: "导入成功",
									type: "success",
									onClose(){
                    // THIS.quit(routesMapping.ChannelManagement);
									}
								});
							} else {
								this.$message({
									message: "请检查导入数据是否为空!",
									type: "warning"
								});
							}

							this.channelForm.resultExportsLists = this.importChannelGoodsList.result;
							this.isImportSuccess = false;
						}
					});
				}
			} else {
				this.$message({
					message: "请输入渠道名",
					type: "warning"
				});
			}
			return false;
		},
		OnBackLatePage() {
			this.quit();
		},
		channelQueryFunction() {
			this.queryChannelAllAction({
				searchContent: this.channelForm.channelName
			}).then(resp => {
				this.channelForm.channelType = resp.result[0].channelType;
				if (resp.result.length) {
					this.$message({
						message: "查询成功",
						type: "success"
					});
				} else {
					this.$message({
						message: "查询失败",
						type: "warning"
					});
				}
			});
		},
		confirmImportChannelGoods() {
			this.postDataConfirmImportAction({ batchId: this.batchId }).then(
				resp => { }
			);
		},
		onPageRefresh(){
			console.log("+++++++++++++++++++++");
		}
	}
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
	.el-table__body-wrapper{
		overflow-y: scroll;
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
