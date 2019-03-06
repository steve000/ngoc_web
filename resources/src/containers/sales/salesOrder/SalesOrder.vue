<template>
    <div class="salesModule">
        <div class="left-section pull-left">
            <div class="add-section">
                <el-dropdown visible-arrow="false" size="small">
                    <el-button type="primary" icon="el-icon-plus" class="addButton">
                        新增销售单
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="$router.push('/sales/order/createOrder')">新增销售订单</el-dropdown-item>
                        <el-dropdown-item @click.native="$router.push('/sales/import/salesOrders')">导入订单</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <el-menu unique-opened @open="activeCurrentMenu" @close="activeCurrentMenu" @select="change" :default-openeds="defaultIndex" :active-text-color="activeColor" :class="{'control-submenu-item': isActiveNavmenu}" default-active="1">
                <el-submenu index="1" :class="{'menu-specail-wrapper': isActiveCur === 1}">
                    <template slot="title">
                        <div class="is-active-submenu">
                            <i class="iconfont1 icon-quanbu"></i>
                            <div slot="title" class="menu-btn-space menu-btn-title" style="color: inherit;">发货订单</div>
                        </div>
                    </template>
                    <el-menu-item-group ref="selfOrder11" class="selfOrder11">
                        <el-menu-item :index="item.id" v-for="(item,index) in menuLevel1" class="change-order-menu" :key="index">
                            <div slot="title" :ref="'homeToOrder'+item.id.split('-')[1]" @click="showPurchase(item.id)" class="menu-btn-space">{{item.val}}
                                <span v-if="typeof menuItem1[index] === 'number'">({{ typeof menuItem1[index] === 'number' ? menuItem1[index] : 0 }})</span>
                            </div>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2" :class="{'menu-specail-wrapper': isActiveCur === 2}">
                    <template slot="title">
                        <div class="is-active-submenu">
                            <i class="iconfont1 icon-daishoudingdan"></i>
                            <div slot="title" class="menu-btn-space menu-btn-title">代售订单</div>
                        </div>

                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="item.id" v-for="(item,index) in menuLevel2" class="change-order-menu" :key="index">
                            <div slot="title" @click="showPurchase(item.id)" class="menu-btn-space">{{item.val}}
                                <span v-if="typeof menuItem2[index] === 'number'">({{ typeof menuItem2[index] === 'number' ? menuItem2[index] : 0 }})</span>
                            </div>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3" :class="{'menu-specail-wrapper': isActiveCur === 3}">
                    <template slot="title">
                        <div class="is-active-submenu">
                            <i class="iconfont1 icon-daifadingdan"></i>
                            <div slot="title" class="menu-btn-space menu-btn-title">代发订单</div>
                        </div>

                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="item.id" v-for="(item,index) in menuLevel3" class="change-order-menu" :key="index">
                            <div slot="title" @click="showPurchase(item.id)" class="menu-btn-space">{{item.val}}
                                <span v-if="typeof menuItem3[index] === 'number'">({{ typeof menuItem3[index] === 'number' ? menuItem3[index] : 0 }})</span>
                            </div>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4" :class="{'menu-specail-wrapper': isActiveCur === 4}">
                    <template slot="title">
                        <div class="is-active-submenu">
                            <i class="iconfont1 icon-yichangdingdan"></i>
                            <div slot="title" class="menu-btn-space menu-btn-title">异常订单</div>
                        </div>
                    </template>
                    <el-menu-item-group ref="selfOrder14" class="selfOrder14">
                        <el-menu-item :index="item.id" v-for="(item,index) in menuLevel4" class="change-order-menu" :key="index">
                            <div slot="title" @click="showPurchase(item.id)" class="menu-btn-space">{{item.val}}
                                <span v-if="typeof menuItem4[index] === 'number'">({{ typeof menuItem4[index] === 'number' ? menuItem4[index] : 0 }})</span>
                            </div>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </div>
        <div class="main-section">
            <div class="main-wrapper">
                <sales-list :operationId="operationId" @loaded="loaded" :flag="flagMsg"></sales-list>
            </div>
        </div>
    </div>
</template>


<script>
import { mapActions, mapState, mapGetters } from "vuex";
import salesList from "~/components/sales/salesOrder/SalesList";
import PlatformMixins from "~/mixins/platform";
export default {
  name: "SalesOrder",
  mixins: [PlatformMixins],
  data() {
    return {
      operationId: 1, // 传入要搜索的ID，如果是同一个函数通过不同id调取数据的话
      flagMsg: "1-0", // 传入要搜索的类型，如果是根据显示类型获取数据的话
      isActiveCur: 1, // 当前打开菜单
      isActiveNavmenu: false, // 当点击主菜单时，为true
      defaultIndex: ["1"], // 默认打开菜单
      activeColor: "#3B8CFF", //
      timeLen: null,
      menuLevel1: [
        {
          id: "1-1",
          val: "未发货"
        },
        {
          id: "1-2",
          val: "待出库"
        },
        {
          id: "1-3",
          val: "部分发货"
        },
        {
          id: "1-4",
          val: "已发货"
        },
        {
          id: "1-5",
          val: "已完成"
        },
        {
          id: "1-0",
          val: "已取消"
        }
      ], // 自发
      menuLevel2: [
        {
          id: "2-1",
          val: "未发货"
        },
        {
          id: "2-5",
          val: "已完成"
        },
        {
          id: "2-0",
          val: "已取消"
        }
      ], // 代售
      menuLevel3: [
        {
          id: "3-1",
          val: "未发货"
        },
        {
          id: "3-5",
          val: "已完成"
        },
        {
          id: "3-0",
          val: "已取消"
        }
      ], // 代发
      menuLevel4: [
        {
          id: "4-1",
          val: "已拒收"
        },
        {
          id: "4-2",
          val: "超时未出库"
        },
        {
          id: "4-3",
          val: "超时未送达"
        },
        {
          id: "4-5",
          val: "出库异常"
        },
        {
          id: "4-6",
          val: "地址信息异常"
        }
      ], // 异常
      menuItem1: [],
      menuItem2: [],
      menuItem3: [],
      menuItem4: []
    };
  },
  created() {},
  methods: {
    ...mapActions(["statisticsOrderNumAction"]),
    loaded() {
      let _orderStatus = "";
      let _errorType = "";
      let _isErrorType = "";
      try {
        _orderStatus = this.homeToStatus1;
        _errorType = this.homeToErrorStatus1.errorType;
        _isErrorType = this.homeToErrorStatus1.isErrorType;
      } catch (error) {}
      this.timeLen = null;

      if (_isErrorType) {
        if (_errorType && typeof _errorType === "number") {
          this.defaultIndex = ["4"];
          this.isActiveCur = 4;
          switch (_errorType) {
            case 1:
              this.showPurchase("4-1");
              break;
            case 2:
              this.showPurchase("4-2");
              break;
            case 3:
              this.showPurchase("4-3");
              break;
            case 4:
              this.showPurchase("4-4");
              break;
            case 5:
              this.showPurchase("4-6");
              break;
          }

          let _selfOrder = Array.from(this.$refs.selfOrder14.$children);
          _selfOrder.forEach((item, index) => {
            if (index == _errorType - 1) {
              item.$el.style.color = "#3b8cff";
              item.$el.click();
            } else {
              item.$el.style.color = "#737D8F";
            }
          });
          this.$store.commit("HOME_TO_ORDERSALES_ERRORSTATUS", "");
        }
      } else {
        if (_orderStatus && typeof _orderStatus === "number") {
          if (_orderStatus >= 24) this.timeLen = _orderStatus;
          this.defaultIndex = ["1"];
          this.isActiveCur = 1;
          switch (_orderStatus) {
            case 1:
              this.showPurchase("1-1");
              break;
            case 24:
              this.showPurchase("1-1-24");
              break;
            case 48:
              this.showPurchase("1-1-48");
              break;
            case 72:
              this.showPurchase("1-1-72");
              break;
            case 2:
              this.showPurchase("1-2");
              break;
            case 3:
              this.showPurchase("1-3");
              break;
            case 4:
              this.showPurchase("1-4");
              break;
            case 5:
              this.showPurchase("1-5");
              break;
            default:
              break;
          }

          let _selfOrder = Array.from(this.$refs.selfOrder11.$children);
          if (this.timeLen) {
            _orderStatus = 1;
          }
          _selfOrder.forEach((item, index) => {
            if (index == _orderStatus - 1) {
              item.$el.style.color = "#3b8cff";
              item.$el.click();
            } else {
              item.$el.style.color = "#737D8F";
            }
          });
          this.$store.commit("HOME_TO_ORDERSALES_STATUS", "");
        }
      }
      this.queryMuneNum();
    },
    // 激活当前菜单
    activeCurrentMenu(index) {
      this.flagMsg = index;
      this.activeColor = "#737D8F"; // 点击主菜单时子菜单取消高亮
      this.isActiveNavmenu = true; // 清除子菜单选中背景
      this.isActiveCur = Number(index); // 点击主菜单时主菜单高亮
    },
    onPageRefresh() {
      this.operationId = this.operationId + 1;
      // this.queryMuneNum()
    },
    change(i) {
      this.activeColor = "#3B8CFF"; // 点击子菜单时菜单高亮
      this.isActiveNavmenu = false; // 恢复子菜单选中背景
      this.isActiveCur = -1;
    },
    showPurchase(val) {
      this.flagMsg = val;
    },
    queryMuneNum(level1) {
      this.statisticsOrderNumAction({
        orderType: `11,12,13`,
        invType: 1
      }).then(res => {
        this.menuItem1 = [];
        for (let i = 0; i < res.length; i++) {
          this.menuItem1.push(res[i].count);
        }
      });
      this.statisticsOrderNumAction({
        orderType: 12,
        invType: 0
      }).then(res => {
        this.menuItem2 = [];
        for (let i = 0; i < res.length; i++) {
          this.menuItem2.push(res[i].count);
        }
      });
      this.statisticsOrderNumAction({
        orderType: 13,
        invType: 0
      }).then(res => {
        this.menuItem3 = [];
        for (let i = 0; i < res.length; i++) {
          this.menuItem3.push(res[i].count);
        }
      });
      this.statisticsOrderNumAction({
        errorType: 1
      }).then(res => {
        this.menuItem4 = [];
        for (let i = 0; i < res.length; i++) {
          this.menuItem4.push(res[i].count);
        }
      });
    }
  },
  mounted() {
    // this.queryMuneNum()
  },
  components: {
    salesList
  },
  watch: {
    homeToErrorStatus1: {
      handler() {
        this.loaded();
      }
    },
    homeToStatus1: {
      handler(nval, oval) {
        this.loaded();
      }
    }
  },
  computed: {
    ...mapState({
      tabCaches: ({ root }) => root.tabCaches,
      homeToStatus1: ({ home }) => home.homeToStatus,
      homeToErrorStatus1: ({ home }) => home.homeToErrorStatus._error
    })
    // ...mapGetters({
    //     importSalesOrderStatus: 'importSalesOrderStatus'
    // })
  }
};
</script>
