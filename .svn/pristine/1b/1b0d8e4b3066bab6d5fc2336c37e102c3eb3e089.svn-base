<template>
    <div class="salesModuleList" @click="removeClickEffect('change-list-table-wrapper')">
        <div class="table-container">
            <div class="top-scroll-section">
                <!-- 筛选 -->
                <div class="top-search-wrapper">
                    <div class="filterControl">
                        <div class="filterDate">
                            <div style="display: flex;">
                                <SearchDate @onHandleDate="handleDate" ref="searchDate" :clearable="false"></SearchDate>
                                <div class="ml20">
                                    <span>渠道：</span>
                                    <el-select v-model="param.channelType" placeholder="请选择" @change="channelChange" size="medium" style="height: 34px;">
                                        <el-option v-for="item in channelTypeOptions" :key="item.channelId" :label="item.channelName" :value="item.channelId">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <div class="filterSearch">
                            <search showPlaceholder="请输入订单编号搜索" ref="search" @searchValue="getSearchValue" :showResetButton="showResetButton" @reset="getReset" :isShowSearchResult="isShowSearchResult" :count="totalCount"></search>
                        </div>
                    </div>
                </div>
                <div class="search_result_container" v-if="searchItemValueArray.length>0">
                    <search-result :searchItemValueArray="searchItemValueArray" :count="totalCount" @deleteItem="getDeleteItem"></search-result>
                </div>
                <div class="table-list-special-common-style" id="change-list-table-wrapper">
                    <el-table :data="salesList" border @selection-change="handleSelect" @row-click="setCurOperationRow" default-expand-all :cell-class-name="cellStyle">
                        <el-table-column type="expand" width="0">
                            <template slot-scope="scope">
                                <div class="remark-box remarkShow">
                                    <span @click="funEditRemark(scope.$index,scope.row)" class="salesEditRemark">备注：{{scope.row.remark?scope.row.remark:'无'}}
                                        <i class="iconfont1 icon-bianji other_hook"></i>
                                    </span>
                                    <!-- <edit-remark class="editRemark" @onEdit="changeCurrentOrderRemark($event,scope.$index,scope.row)" :remarkDetail="scope.row.remark" :returnId="scope.row.orderId"></edit-remark> -->
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="销售单编号" prop="orderId">
                            <template slot-scope="scope">
                                <div class="row-title-container">
                                    <div class="row-title-order">
                                        <div class="order-number change-order-number" @click="$router.push({path: `/sales/proxy/checkOrder/${scope.row.orderId}`})">
                                            <span>{{scope.row.orderId}}</span>
                                        </div>
                                    </div>
                                    <div class="operate-container">
                                        <div>
                                            <a class="plr5 clblue" @click="outboundFunc(scope.row)" v-if="scope.row.orderStatus === 1 || scope.row.orderStatus === 3">
                                                出库
                                            </a>
                                        </div>
                                        <div class="operate-container_div">
                                            <more-operat v-if="scope.row.orderStatus === 1" :buttonList="getButtonList(scope.row.orderStatus)" style="margin-top:2px;" @onClick="onClickOperateButton" @hide="getHide(scope.$index,'change-list-table-wrapper')" :isEnd="scope.$index===salesList.length-1" @show="setTableTrBg(scope.$index,'change-list-table-wrapper')" :row="scope.row"></more-operat>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="单据状态" width="150" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <div class="row-show">
                                    <span :class="returnClass(scope.row.orderStatus)"></span>
                                    {{statusText[scope.row.orderStatus]}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="客户" prop="channelName" show-overflow-tooltip width="130"></el-table-column>
                        <el-table-column label="销售数量" prop="saleCount" show-overflow-tooltip></el-table-column>
                        <el-table-column label="出库数量" prop="sendCount" show-overflow-tooltip width="130"></el-table-column>
                        <el-table-column label="订单金额(元)" prop="saleTotal" show-overflow-tooltip></el-table-column>
                        <div slot="empty" class="table_slot_empty_text">
                            <div><img src="../../../layouts/images/nodata.png" /></div>
                            <div>暂无数据</div>
                        </div>
                    </el-table>
                </div>
            </div>
            <div class="pagination-section" v-if="salesList.length">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="param.pageNo" background :page-size="param.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                </el-pagination>
            </div>
        </div>
        <!-- 弹框 -->
        <div class="model-container">
            <!-- 出库操作 -->
            <el-dialog title="出库操作" :visible.sync="outboundVisible" width="1060px" @close="closeOutboundVisible">
                <div>
                    <span style="font-size:14px;color: #666666; width:80px;">发货仓库：</span>
                    <el-select v-model="selectedWarehouse" placeholder="请选择发货仓库" style="width:200px;" @change="updataSelectedWarehouse">
                        <el-option v-for="item in warehouseOptions" :key="item.storehouseId" :label="item.storehouseName" :value="item.storehouseId">
                        </el-option>
                    </el-select>
                </div>
                <el-row class="mt30">
                    <el-table :data="outboundGoodsList" :height="outboundGoodsList.length ? '' : '38'" max-height="170" style="border: 1px solid #ebeef5;border-right: 1px solid #ebeef5;">
                        <el-table-column prop="skuName" label="商品名称" show-overflow-tooltip></el-table-column>
                        <el-table-column width="78">
                            <template slot-scope="scope">
                                <div v-show="selectedWarehouse && ((scope.row.saleCount - scope.row.sendCount) > scope.row.unableCount) " class="inventory">库存不足</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="skuId" label="商品编码" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="unitName" label="单位" show-overflow-tooltip width="80"></el-table-column>
                        <el-table-column prop="saleCount" label="销售数量" show-overflow-tooltipwidth="120"></el-table-column>
                        <el-table-column prop="sendCount" label="已出库" show-overflow-tooltip width="120"></el-table-column>
                        <el-table-column label="本次出库" width="120">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.outCount" size="small" style="width: 100px;" @keyup.native="setOutboundCount(scope.row, scope.$index)">
                                </el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="outboundVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveStoreout">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 批量出库 -->
            <el-dialog title="批量出库" :visible.sync="batchOutboundVisible" width="660px">
                <el-row>
                    <el-col :span="5" style="text-align:center;height: 34px;line-height: 34px;">发货仓库：</el-col>
                    <el-col :span="18">
                        <el-select v-model="totalCount" placeholder="请选择" style="width:100%;">
                            <el-option v-for="item in warehouseOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="batchOutboundVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updatePurchaseOrderFunction(3,remark)">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <edit-remark v-if="dialogVisible" :dialogVisible="dialogVisible" class="editRemark" v-on:onCancel="hideDialog" v-on:onEdit="changeCurrentOrderRemark($event)" :remarkDetail="remarkRow?remarkRow.remark:''" :returnId="remarkRow?remarkRow.orderId:''"></edit-remark>
    </div>
</template>
<script>
import TableHeightMixins from "~/mixins/tableheight";
import Search from "~/components/common/Search";
import MoreOperating from "~/components/common/MoreOperatingReturnOrder";
import MoreOperat from '~/components/common/MoreOperating';
import Modal from "~/components/Modal";
import { mapActions } from "vuex";
import QuitMixins from "~/mixins/quit";
import PlatformMixins from "~/mixins/platform";
import filters from "~/mixins/filters";
import SearchDate from "~/components/common/SearchDate";
import EditRemark from "~/components/common/EditRemark";
import utils from "~/utils/commonMethod";
import SearchResult from "~/components/common/SearchResult.vue";
import moreOperateMixin from '~/mixins/moreOperate';

export default {
    name: "proxyList",
    data() {
        return {
            // 出库商品列表
            outboundGoodsList: [],
            // 出库弹框
            outboundVisible: false,
            // 当前操作row信息
            curOperationRow: {},
            // 渠道
            channelTypeOptions: [],
            // 仓库地址
            warehouseOptions: [],
            // 选中仓库
            selectedWarehouse: "",
            // 表单选中数组
            selectOrderArr: [],
            // 表单选中长度
            selectOrderLength: 0,
            // 列表请求参数
            param: {
                pageSize: 10,
                pageNo: 1,
                orderStatus: null,
                searchContent: "",
                channelType: "",
                orderType: 14,
                addDate: "",
                errorType: 0
            },
            statusText: {
                0: "已取消",
                1: "未出库",
                2: "待出库",
                3: "部分出库",
                4: "已发货",
                5: "已完成"
            },
            // 批量出库
            batchOutboundVisible: false,
            remark: "",
            showResetButton: false,
            isSearch: false,
            isShowSearchResult: false,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            // 订单列表
            salesList: [],
            // 查询数量总数
            totalCount: 0,
            // 当前菜单1级
            level1: "1",
            // 当前菜单2级
            level2: "0",
            searchItemValueArray: [],
            dialogVisible: false,
            // 编辑备注
            remarkData: null,
            remarkIndex: null,
            remarkRow: null,
        };
    },
    mixins: [TableHeightMixins, QuitMixins, PlatformMixins, filters, moreOperateMixin],
    components: {
        Search,
        MoreOperating,
        Modal,
        SearchDate,
        EditRemark,
        SearchResult,
        MoreOperat
    },
    mounted() {
        this.refreshPage(this.param);
        this.getChannelAll();
        this.setTableHeight(300);
    },
    methods: {
        ...mapActions([
            "showPageLoading",
            "hidePageLoading",
            "queryChannelBySearch",
            "querySalesOrderList",
            "exportSalesOrder",
            "querySalesOutStoreList",
            "queryStoreList",
            "saveOutStore",
            "editOrderStatus",
            "editBatchOrderStatusAction",
            "updateOrderMemark"
        ]),
        // 关闭出库清除
        closeOutboundVisible() {
            this.warehouseOptions = []
            this.selectedWarehouse = ''
            this.outboundGoodsList = []
        },
        cellStyle({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 1) {
                return 'col-first';
            }
        },
        // 点击更多触发相应操作
        onClickOperateButton(type, row) {
            if (type === 'cancel') {
                this.modifyOrderStatus(row, 0)
            } else if (type === 'edit') {
                this.$router.push({ name: 'UpdateInsteadDelivery', params: { orderId: row.orderId } })
            }
        },
        getButtonList(inStatus) {
            let buttonArray = [];
            if (inStatus === 1) {
                buttonArray = [{ type: 'cancel', text: '取消订单' }, { type: 'edit', text: '编辑' }]
            }
            return buttonArray
        },
        /* 表格条件筛选 */
        // 时间改变
        // 按照时间来搜索
        handleDate(val, timeIndex) {
            this.param = Object.assign({}, this.param, val);
            const index = utils.matchStrOfArr(this.searchItemValueArray, "时间：");
            switch (timeIndex) {
                case 0:
                    index === -1
                        ? this.searchItemValueArray.push("时间：今天")
                        : this.$set(this.searchItemValueArray, index, `时间：今天`);
                    break;
                case 1:
                    index === -1
                        ? this.searchItemValueArray.push("时间：昨天")
                        : this.$set(this.searchItemValueArray, index, `时间：昨天`);
                    break;
                case 2:
                    index === -1
                        ? this.searchItemValueArray.push("时间：本周")
                        : this.$set(this.searchItemValueArray, index, `时间：本周`);
                    break;
                case undefined:
                    index === -1
                        ? this.searchItemValueArray.push(
                            `时间：${val.startDate}~${val.endDate}`
                        )
                        : this.$set(
                            this.searchItemValueArray,
                            index,
                            `时间：${val.startDate}~${val.endDate}`
                        );
                    break;
            }
            this.refreshPage(this.param);
        },
        // 删除搜索条件
        getDeleteItem(index) {
            const str = this.searchItemValueArray[index].split("：")[0];
            switch (str) {
                case "时间":
                    this.param.startDate = null;
                    this.param.endDate = null;
                    this.$refs.searchDate.curDate = null;
                    break;
                case "渠道":
                    this.param.channelType = null;
                    break;
                default:
                    this.param.searchContent = "";
                    this.$refs.search.searchForm.searchValue = "";
                    break;
            }
            setTimeout(() => {
                this.searchItemValueArray.splice(index, 1);
            }, 0);
            this.refreshPage(this.param);
        },
        // 编辑备注
        funEditRemark(_index, _one) {
            this.dialogVisible = true;
            this.remarkIndex = _index;
            this.remarkRow = _one;
        },
        hideDialog(data) {
            this.dialogVisible = data;
        },
        // 搜索
        getSearchValue(searchValue) {
            this.param.pageSize = 10;
            this.param.pageNo = 1;
            if (this.param.searchContent === "") {
                this.searchItemValueArray.push(searchValue);
            } else {
                this.$set(
                    this.searchItemValueArray,
                    this.searchItemValueArray.findIndex(
                        i => i === this.param.searchContent
                    ),
                    searchValue
                );
            }
            this.param.searchContent = searchValue;
            this.isSearch = true;
            this.refreshPage(this.param);
        },
        // 渠道筛选
        channelChange(val) {
            const obj = this.channelTypeOptions.find(i => i.channelId === val);
            const channelName = `渠道：${obj.channelName}`;
            if (utils.matchStrOfArr(this.searchItemValueArray, "渠道：") === -1) {
                this.searchItemValueArray.push(channelName);
            } else {
                this.$set(
                    this.searchItemValueArray,
                    utils.matchStrOfArr(this.searchItemValueArray, "渠道："),
                    channelName
                );
            }
            this.refreshPage(this.param);
        },
        // 出库
        // 设置本次出库数量
        setOutboundCount(item, index) {
            if (utils.isNum(item.outCount)) {
                this.$set(item, "outCount", Number(item.outCount))
                if (item.outCount < 0) {
                    this.$set(item, "outCount", Math.abs(item.outCount))
                }
                if (item.outCount > item.usableCount) {
                    this.$set(item, "outCount", item.usableCount)
                }
                const arr = this.outboundGoodsList.concat()
                arr.splice(index, 1)
                // 如果有skuid相同的订单
                if (arr.some(i => i.skuId === item.skuId)) {
                    // 当前skuid相同订单的出库数量总数
                    const sum = this.outboundGoodsList.filter(i => i.skuId === item.skuId).map(i => i.outCount).reduce((x, y) => (Number(x) + Number(y)))
                    // 剩余库存数 = 可用库存数 - 当前skuid相同订单的出库数量总数
                    const residueNum = item.unableCount - sum
                    if (residueNum < 0) {
                        const num = item.unableCount - item.oldOutCount
                        if (isNaN(num)) {
                            this.$set(item, "outCount", item.defalutCount)
                            this.$set(item, "oldOutCount", item.outCount)
                        } else {
                            const sum = arr.filter(i => i.skuId === item.skuId).map(i => i.outCount).reduce((x, y) => (Number(x) + Number(y)))
                            this.$set(item, "outCount", num > 0 ? item.unableCount - sum : 0)
                            this.$set(item, "oldOutCount", item.outCount)
                        }
                    } else if (residueNum === 0) {
                        this.$set(item, "outCount", item.outCount)
                        this.$set(item, "oldOutCount", item.outCount)
                    }
                }
            } else {
                this.$set(item, "outCount", undefined);
            }
        },
        // 设置备注
        changeCurrentOrderRemark(data) {
            this.updateOrderMemark({ orderId: data[1], remark: data[0] }).then(
                resp => {
                    this.$message({
                        message: "备注修改成功",
                        type: "success"
                    });
                    this.remarkRow.remark = data[0];
                    this.dialogVisible = false;
                }
            );
        },
        // 重置表单
        clearForm(name) {
            this.$refs[name].resetFields();
        },
        // 查询所有渠道
        getChannelAll() {
            this.queryChannelBySearch({ searchContent: '' }).then(res => {
                if (res.result.length) {
                    this.channelTypeOptions = res.result;
                }
            });
        },
        // 批量出库
        batchOutbound() {
            if (!this.selectOrderArr.length) {
                this.$message({
                    message: "请先选择需要批量出库的单据！",
                    type: "warning"
                });
            } else {
                if (
                    this.selectOrderArr.some(
                        x => x.orderStatus !== 1 || x.orderStatus !== 3
                    )
                ) {
                    this.batchOutboundVisible = true;
                }
            }
        },
        // 表格选中
        handleSelect(selectedArr) {
            this.selectOrderArr = selectedArr;
            this.selectOrderLength = selectedArr.length;
        },
        // 改变pageSize
        handleSizeChange(nSize) {
            this.param.pageSize = nSize;
            this.refreshPage(this.param);
        },
        // 改变pageNo
        handleCurrentChange(nPage) {
            this.param.pageNo = nPage;
            this.refreshPage(this.param);
        },
        // 刷新页面
        refreshPage(nval) {
            this.showPageLoading();
            this.queryListFunction(nval);
        },
        // 查询订单列表
        queryListFunction(param) {
            this.querySalesOrderList(param)
                .then(resp => {
                    this.hidePageLoading();
                    this.salesList = resp.result.map(i => {
                        i.saleTotal = i.saleTotal / 100;
                        return i;
                    });
                    this.totalCount = resp.totalCount;
                    if (this.isSearch) {
                        this.showResetButton = true;
                        this.isShowSearchResult = false;
                    }
                    this.selectOrderArr = []
                    this.$emit("loaded");
                })
                .catch(err => {
                    this.salesList = [];
                    this.totalCount = 0;
                });
        },
        // 重置
        getReset() {
            this.showResetButton = false;
            this.isShowSearchResult = false;
            this.param.searchContent = "";
            this.isSearch = false;
            this.refreshPage(this.param);
        },
        // 返回圆点class
        returnClass(status) {
            if (status === 0 || status === 6 || status === 5) {
                return " circle circle-8E939A";
            } else if (status === 1 || status === 2) {
                return " circle circle-FF6369";
            } else if (status === 3) {
                return " circle circle-FFA416";
            } else if (status === 4) {
                return " circle circle-66C23A";
            }
        },
        // 设置当前编辑row, 弹出编辑框
        setCurOperationRow(row, event, column) {
            const indexOrderId = row.orderId;
            const index = this.salesList.findIndex(function (i) {
                return i.orderId === indexOrderId;
            });
            this.curOperationRow = Object.assign({}, row, { $index: index });
        },
        // 导出订单
        exportOrders() {
            const {
                searchContent,
                addDate,
                channelType,
                orderType,
                orderStatus,
                errorType
            } = this.param;
            this.exportSalesOrder({
                searchContent,
                addDate,
                channelType,
                orderType,
                orderStatus,
                errorType
            }).then(res => {
                if (!document.getElementById("windowIframe")) {
                    const iframe = document.createElement("iframe");
                    iframe.src = res.fileUrl;
                    iframe.id = `windowIframe`;
                    iframe.style.display = "none";
                    document.body.appendChild(iframe);
                } else {
                    document.getElementById("windowIframe").src = res.fileUrl;
                }
            });
        },
        // 出库-选中仓库更新商品列表
        updataSelectedWarehouse(val) {
            if (val !== -1) {
                this.selectedWarehouse = val
            }
            this.querySalesOutStoreList({
                orderId: this.curOperationRow.orderId,
                storehouseId: val,
                type: 1
            }).then(res => {
                if (res && res.list) {
                    res.list.forEach(i => {
                        i.usableCount = (i.saleCount - i.sendCount) < 0 ? 0 : (i.saleCount - i.sendCount);
                        if (i.usableCount > i.unableCount) {
                            i.usableCount = i.unableCount;
                        }
                        i.defalutCount = i.outCount
                    });
                    this.outboundGoodsList = res.list;
                }
            });
        },
        // 出库初始化
        outboundFunc(row) {
            this.outboundVisible = true;
            this.queryStoreList({ bizType: 1, channelId: row.channelId }).then(res => {
                this.warehouseOptions = res
                this.updataSelectedWarehouse(-1)
            })
        },
        // 保存出库
        saveStoreout() {
            if (!this.selectedWarehouse) {
                this.$message({
                    type: "warning",
                    message: `请选择发货仓库`
                });
                return false
            }
            const curwarehouse = this.warehouseOptions.find(
                i => i.storehouseId === this.selectedWarehouse
            );
            const params = Object.assign({}, {
                relatedSheetId: this.curOperationRow.orderId,
                channelId: this.curOperationRow.channelId,
                stockId: curwarehouse.storehouseId,
                stockType: curwarehouse.storehouseType,
                remark: this.curOperationRow.remark,
                type: 1,
                bizType: 3
            })
            params.sendSkuList = this.outboundGoodsList.map(i => ({
                skuId: i.skuId,
                outCount: !i.outCount ? 0 : i.outCount,
                saleCount: i.saleCount,
                relatedSheetSeqNo: i.serialNo,
                skuPrice: i.price,
                productId: i.productId
            }))
            this.showPageLoading()
            this.saveOutStore(params).then(res => {
                this.refreshPage(this.param)
                this.outboundVisible = false
                this.hidePageLoading()
                if (res === -1) {
                    this.$message({
                        type: "error",
                        message: `中移物流请求超时，请到异常订单中重试`
                    });
                } else {
                    this.$message({
                        type: "success",
                        message: `出库成功`
                    });
                }
            }).catch(err => {
                this.hidePageLoading()
                this.$message({
                    type: "error",
                    message: err.msg
                })
            })
        },
        // 修改订单状态
        modifyOrderStatus(item, statu) {
            let confirmType = `warning`;
            let confirmText;
            if (statu === 0) {
                confirmText = `取消`;
            } else if (statu === 5) {
                confirmText = `完成`;
            }
            this.$confirm(`确认${confirmText}选中的订单？`, `${confirmText}订单`, {
                confirmButtonText: "确定",
                type: confirmType
            })
                .then(() => {
                    this.editOrderStatus({
                        orderId: item.orderId,
                        orderStatus: statu
                    }).then(res => {
                        if (res === 1) {
                            item.orderStatus = statu;
                            this.$message({
                                type: "success",
                                message: `${confirmText}订单成功`
                            });
                        }
                    });
                })
                .catch(() => { });
        },
        // 批量修改订单状态
        batchModifyOrderStatus(statu) {
            if (!this.selectOrderArr.length) {
                this.$message({
                    type: "warning",
                    message: `未选中订单`
                });
            } else {
                let confirmType = `warning`;
                let confirmText;
                if (statu === 0) {
                    confirmText = `取消`;
                } else if (statu === 5) {
                    confirmText = `完成`;
                }
                this.$confirm(`确认${confirmText}选中的订单？`, `${confirmText}订单`, {
                    confirmButtonText: "确定",
                    type: confirmType
                }).then(() => {
                    const param = { orderStatus: statu };
                    param.orderIdList = this.selectOrderArr.map(i => i.orderId);
                    this.editBatchOrderStatusAction(param).then(res => {
                        if (res === 1) {
                            this.refreshPage(this.params);
                            this.$message({
                                type: "success",
                                message: `${confirmText}订单成功`
                            });
                        }
                    });
                });
            }
        },
        // 可选控制
        selectable(row) {
            if (Number(row.orderStatus) === 0 || Number(row.orderStatus) === 5) {
                return 0;
            } else {
                return 1;
            }
        }
    },
    props: { flag: String, operationId: Number },
    watch: {
        flag: {
            handler: function (nval) {
                this.param.pageSize = 10;
                this.param.pageNo = 1;
                const level1 = (this.level1 = nval.split("-")[0]);
                const level2 = (this.level2 = nval.split("-")[1]);
                if (level1 === "1") {
                    //全部订单
                    if (level2 === undefined) {
                        this.param.orderStatus = "";
                    } else {
                        this.param.orderStatus = Number(level2);
                    }
                }
                this.getReset();
            }
        },
        operationId: function (nval) {
            console.log(nval)
            this.getReset()
        },
        '$route'(to, form) {
            if (form.name === 'CheckRepresentOrder') {
                this.refreshPage(this.param);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.salesModuleList {
  .table-container {
    button.is-plain {
      border-color: #409eff;
      color: #409eff;
    }
  }
}
</style>
