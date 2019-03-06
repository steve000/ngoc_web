<template>
	<div class="channel-list">
		<el-table class="table1" ref="refTableData" :data="tableData" :height="tableHeight" style="width: 100%">
			<el-table-column class="hideMoreText" prop="channelName" label="渠道名" width="300">
				<template slot-scope="scope">
					<div class="ChannelOperatingWrap">
						<span>
							{{scope.row.channelName}}
						</span>
						<ChannelOperating class="ChannelOperating" :data="scope.row" @onDelSuccess="delSuccess"></ChannelOperating>
					</div>
				</template>
			</el-table-column>
			<!-- <el-table-column
                width="50">
                <template slot-scope="scope">
                    <ChannelOperating :data="scope.row" @onDelSuccess="delSuccess"></ChannelOperating>
                </template>
            </el-table-column> -->

			<el-table-column label="渠道状态">
				<template slot-scope="scope">
					<el-select placeholder="请选择" style="width: 100px" size="mini" @change="valChange(scope.row.channelId,scope.row.status)" v-model="scope.row.status">
						<el-option :value="0" label="启用"></el-option>
						<el-option :value="1" label="停用"></el-option>
					</el-select>
				</template>
			</el-table-column>

			<el-table-column prop="createUserName" label="创建人">
			</el-table-column>
			<el-table-column label="创建时间">
				<template slot-scope="scope">
					<div class="row-show">{{calDate(scope.row.createTime)}}</div>
				</template>
			</el-table-column>
			            <div slot="empty" class="table_slot_empty_text">
                    <div><img src="../../layouts/images/nodata.png"/></div>
                <div>暂无数据</div>
                    </div>
		</el-table>
		<div class="pagination">
			<el-pagination background ref="pagination" @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" @size-change="handleCurrentSizeChange" :total="total">
			</el-pagination>
		</div>

	</div>
</template>
<script>
import PlatformMixins from "~/mixins/platform";
import misc from "~/utils/misc";
import ChannelOperating from "~/components/common/ChannelOperating";
import { mapActions } from "vuex";
import TableHeightMixins from "~/mixins/tableheight";
export default {
	mixins: [TableHeightMixins],
	data() {
		return {
			tableData: [],
			selected: "启用",
			pageNo: 1, // 当前页
			total: 0, // 总数
			pRef: null,
			channelType: "",
			pageSize: 10
		};
	},
	components: {
		ChannelOperating
	},
	mounted() {
		this.setTableHeight(200);
		this.pRef = this.$refs.pagination;
		this.getdata();
	},
	methods: {
		...mapActions([
			"changeList",
			"showPageLoading",
			"hidePageLoading",
			"changeStatusUpdate",
			"queryChannelAllAction",
			"updataStatusAction"
		]),
		getdata() {
			this.showPageLoading();
			let _arguments = arguments;
			this.queryChannelAllAction({
				pageNo: arguments[0],
				pageSize: this.pageSize,
				channelType: this.channelType
			}).then(res => {
				this.hidePageLoading();
				this.tableData = res.result;
				this.total = res.totalCount;
			});
		},
		valChange(id, status) {
			this.updataStatusAction({ channelId: id, status: status }).then(res => {
				this.getdata(this.pageNo);
			});
		},
		calDate: function (createTime) {
			return misc.formatDate(new Date(createTime), "yyyy-MM-dd HH:mm:ss");
		},
		handleCurrentChange(val) {
			this.pageNo = val;
			this.getdata(this.pageNo);
		},
		handleCurrentSizeChange(val) {
			this.pageSize = val;
			this.getdata();
		},
		// 删除渠道
		delSuccess() {
			let _pageNo = this.tableData.length >= 2 ? this.pageNo : --this.pageNo;
			this.getdata(_pageNo);
			this.$emit("refreshOrderCount");
		}
	},
	props: ["showmeauIndex", "operationId"],
	watch: {
		showmeauIndex: function () {
			if (this.showmeauIndex == 1) {
				this.channelType = "";
			} else if (this.showmeauIndex == 2) {
				this.channelType = 1;
			} else if (this.showmeauIndex == 3) {
				this.channelType = 0;
			}
			this.getdata();
			this.pageNo=1;
		},
		operationId: function () {
			this.getdata();
			this.pageNo=1;
		}
	}
};
</script>

<style lang="scss">
.pagination {
  float: right;
  margin-top: 30px;
}
.sales-list {
  padding: 20px;
}
.hideMoreText {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.moreOperation {
  visibility: hidden;
  cursor: pointer;
  &:hover {
    visibility: visible;
  }
}
.ChannelOperatingWrap {
  display: flex;
  & > span {
    flex: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .operate-div {
    margin-right: 20px;
  }
}
</style>


<style lang="scss">
.channel-list{
	padding:20px 20px 0;
    .table1 .el-table__row {
      .popover222 {
      visibility: hidden;
      cursor: pointer;
      }
       &:hover {
      .popover222 {
        visibility: visible;
      }
    }
  }
}
</style>

