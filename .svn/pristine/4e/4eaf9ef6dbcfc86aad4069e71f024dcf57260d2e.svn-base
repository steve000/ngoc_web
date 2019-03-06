<template>
    <div class="page-content-wrapper">
        <div class="page-header">
            <header>
                <div class="logo">
                    <div class="logo-img"></div>
                </div>
                <el-menu router background-color="#292C31" text-color="#fff" key="menu1"
                         :default-active="activeIndex" class="nav-menu" mode="horizontal">
                    <template v-if="utype != 1">
                        <el-menu-item index="/index/Home">首页</el-menu-item>
                        <!-- <el-menu-item index="/goods">商品</el-menu-item> -->
                        <el-submenu index="/goods" style="padding: 0px;">
                            <template slot="title">商品</template>
                            <el-submenu index="/goods/manage" class="newMenu">
                                <template slot="title">商品管理</template>
                                <el-menu-item index="/goods/manage/multiBarManage">多条码管理</el-menu-item>
                                <el-menu-item index="/goods/manage/digitalAttrManage">商品数字属性管理</el-menu-item>                          
                                <el-menu-item index="/goods/manage/generalPricePolicy">商品普通价格政策</el-menu-item>
                                <el-menu-item index="/goods/manage/specialPricePolicy">商品特殊价格政策</el-menu-item>
                                <el-menu-item index="/goods/manage/skuCommodityManagement">商品管理</el-menu-item>
                                <el-menu-item index="/goods/spu/index">产品管理</el-menu-item>
                                <el-menu-item index="/goods/manage/skuTag">商品标签设置管理</el-menu-item>
                                <el-menu-item index="/goods/manage/userGroupProduct">实体可用商品管理</el-menu-item>
                            </el-submenu>
                            <el-submenu index="/goods/card" class="newMenu">
                                <template slot="title">卡券管理</template>
                                <el-menu-item index="/goods/card/cardTypeM">卡券类别管理</el-menu-item>
                                <el-menu-item index="/goods/card/information">卡券信息管理</el-menu-item>
                            </el-submenu>
                            <el-submenu index="/goods/combinedSales" class="newMenu">
                                <template slot="title">组合销售</template>
                                <el-menu-item index="/goods/combinedSales/commodityRelease">可组合商品发布</el-menu-item>
                                <el-menu-item index="/goods/combinedSales/commodityPacking">商品打包</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <!-- <el-menu-item index="/purchase/purchaseorder">采购</el-menu-item> -->
                        <el-submenu index="/purchase">
                            <template slot="title">采购</template>
                            <el-submenu index="/contract" class="newMenu">
                                <template slot="title">合同管理</template>
                                    <el-menu-item index="/contract">合同设置</el-menu-item>
                            </el-submenu>
                            <el-submenu index="/purchase/manage" class="newMenu">
                                <template slot="title">采购管理</template>
                                    <!-- <el-menu-item index="/purchase/purchaseorder">采购订单</el-menu-item> -->
                                    <el-menu-item index="/purchase/purchaseorder/index">采购单</el-menu-item>
                                    <el-menu-item index="/purchase/purchaseReturnBill/index">退货单</el-menu-item>
                            </el-submenu>
                            <el-submenu index="/purchase/vendorChain" class="newMenu">
                                <template slot="title">供应链</template>
                                <el-menu-item index="/purchase/vendorRegisterRegister">供应商注册</el-menu-item>
                                <el-menu-item index="/purchase/vendorRegisterIndex">供应商审批</el-menu-item>
                                <el-menu-item index="/purchase/vendorIndex">供应商管理</el-menu-item>
                                <el-menu-item index="/purchase/vendorSpuIndex">供应商新品引进,推荐</el-menu-item>
                                <el-menu-item index="/purchase/userGroupVendorIndex">添加实体供应商</el-menu-item>
                            </el-submenu>
                        </el-submenu>

                        <el-submenu index="/sales">
                            <template slot="title">销售</template>
                            <el-menu-item index="/sales/order">销售订单</el-menu-item>
                            <el-menu-item index="/sales/return">销售退货</el-menu-item>
                            <el-menu-item index="/sales/change">销售换货</el-menu-item>
                            <el-menu-item index="/sales/proxy">代发订单</el-menu-item>
                            <el-submenu index="/sales/manage" class="newMenu">
                                <template slot="title">促销管理</template>
                                <el-menu-item index="/sales/promotion/normalPromotion">普通促销</el-menu-item>
                                <el-menu-item index="/sales/promotion/combIndex">组合促销</el-menu-item>                          
                                <el-menu-item index="/sales/promotion/conGroupPromotion">条件组合促销</el-menu-item>
                                <el-menu-item index="/sales/promotion/presentPromotion">赠券促销</el-menu-item>
                                <el-menu-item index="/sales/promotion/reducePromotion">满减促销</el-menu-item>
                            </el-submenu>
                            <el-submenu index="/sales/bill" class="newMenu">
                                <template slot="title">销售流水</template>
                                <el-menu-item index="/sales/bills">销售流水查询</el-menu-item>
                            </el-submenu>
                            <el-submenu index="/sales/channel" class="newMenu">
                                <template slot="title">渠道管理</template>
                                <el-menu-item index="/sales/channel/channelPlan">渠道计划及考核</el-menu-item>
                                <el-menu-item index="/sales/channel/channelPrice">渠道价格和存量定义</el-menu-item>
                            </el-submenu>
                        </el-submenu>

                        <el-submenu index="/stock">
                            <template slot="title">库存</template>
                            <el-menu-item index="/stock/storage">入库管理</el-menu-item>
                            <el-menu-item index="/stock/outbound">出库管理</el-menu-item>
                            <!-- <el-menu-item index="/stock/transfer">调拨管理</el-menu-item> -->
                            <el-menu-item index="/stock/management">库存管理</el-menu-item>
                            <!-- <el-menu-item index="/stock/storehouseLocation">仓位管理</el-menu-item> -->
                            <!-- <el-menu-item index="/stock/locationSku">仓位商品设置</el-menu-item> -->
                            <el-submenu index="/stock/wareHouse" class="newMenu">
                              <template slot="title">仓储</template>
                              <el-menu-item index="/stock/inventory">盘点单</el-menu-item>
                            </el-submenu>
                            <el-submenu index="/stock/costManagement" class="newMenu">
                              <template slot="title">费用管理</template>
                              <el-menu-item index="/stock/feeRule">费用自动计算规则定义</el-menu-item>
                              <el-menu-item index="/stock/costManagement/logisticsCostEntry">物流费用录入</el-menu-item>
                              <el-menu-item index="/stock/feeCompute">费用结算</el-menu-item>
                            </el-submenu>

                        </el-submenu>

                        <el-submenu index="/distribution">
                            <template slot="title">配送</template>
                            <el-menu-item index="/distribution/distributionOrder/index">配送单</el-menu-item>
                            <el-menu-item index="/distribution/requireOrder/index">要货单</el-menu-item>
                            <el-menu-item index="/distribution/returnOrder/index">配送退回单</el-menu-item>
                            <el-menu-item index="/distribution/recommend/createRequireOrder">推荐及生成要货单</el-menu-item>
                        </el-submenu>

                        <el-submenu index="/accountSettlement">
                            <template slot="title">结算</template>
                            <el-submenu index="/accountSettlement/manage" class="newMenu">
                                <template slot="title">结算管理</template>
                                <el-menu-item index="/accountSettlement/payCheck">经销对账单</el-menu-item>
                                <el-menu-item index="/accountSettlement/receiveCheck">应收对账单</el-menu-item>
                            </el-submenu>
                        </el-submenu>

                        <el-submenu index="/bonus">
                            <template slot="title">酬金</template>
                            <el-menu-item index="/bonus/settlement">酬金结算单</el-menu-item>
                            <el-menu-item index="/bonus/recommend">推荐管理</el-menu-item>
                        </el-submenu>

                        <el-submenu index="/service">
                            <template slot="title">服务</template>
                            <el-menu-item index="/service/afterSale">售后服务查询跟踪</el-menu-item>
                        </el-submenu>

                        <el-submenu index="/config">
                            <template slot="title">设置</template>
                            <el-submenu index="/goods/setting" class="newMenu">
                                <template slot="title">商品设置</template>
                                <el-menu-item index="/goods/setting/brand">品牌设置</el-menu-item>
                                <el-menu-item index="/goods/setting/category">类目设置</el-menu-item>
                                <el-menu-item index="/goods/setting/unit">计量设置</el-menu-item>
                                <el-menu-item index="/goods/setting/tag">标签设置</el-menu-item>
                            </el-submenu>
                            <el-menu-item index="/config/storehouse">仓库设置</el-menu-item>
                            <el-menu-item index="/stock/storehouseLocation">仓位设置</el-menu-item>
                            <el-menu-item index="/stock/locationSku">仓位商品设置</el-menu-item>
                            <el-menu-item index="/sales/splitRule">拆单规则设置</el-menu-item>
                            <!-- <el-menu-item index="/config/supplier">供应商设置</el-menu-item> -->
                            <!--<el-menu-item index="/config/client">客户设置</el-menu-item>-->
                            <el-menu-item index="/config/channel/management">渠道设置</el-menu-item>
                            <!-- <el-menu-item index="/config/commodity">商品设置</el-menu-item> -->
                        </el-submenu>

                        <!-- <el-submenu index="/authority">
                            <template slot="title">权限</template>
                            <el-menu-item index="/authority/index">权限配置</el-menu-item>
                            <el-menu-item index="/authority/users">用户管理</el-menu-item>
                            <el-menu-item index="/authority/roles">角色配置</el-menu-item>
                            <el-menu-item index="/authority/privilege">授权配置</el-menu-item>
                            <el-menu-item index="/authority/settings">系统设置</el-menu-item>
                        </el-submenu> -->

                        <el-submenu index="/system">
                            <template slot="title">系统</template>
                            <el-menu-item index="/system/entity">用户实体设置</el-menu-item>
                            <el-menu-item index="/authority/users">用户管理</el-menu-item>
                            <el-menu-item index="/authority/roles">角色配置</el-menu-item>
                            <el-menu-item index="/authority/privilege">授权配置</el-menu-item>
                            <el-menu-item index="/authority/settings">系统参数设置</el-menu-item>
                        </el-submenu>
                    </template>

                    <template v-else>
                        <el-menu-item index="/system/entity">系统设置</el-menu-item>
                    </template>

                    <div style="position: absolute; right: 0px;outline: none;">
                        <div class="avatar fs14">
                            <span style="opacity: 0.8">部门:</span>
                            <!--
                            <template v-if="userEntityList.length > 1" >
                                <el-select v-model="curEntityId" placeholder="请选择业务实体" size="small" class="entity-select"
                                           @change="changeEntity">
                                    <el-option v-for="item in userEntityList" :key="item.userGroupId"
                                               :value="item.userGroupId + ''" :label="item.groupName"></el-option>
                                </el-select>
                            </template>
                            <template v-else>
                                <span class="single-entity">{{userEntityList[0].groupName}}</span>
                            </template>
                            -->
                            <span class="single-entity row-show" :title="groupName">{{groupName}}</span>
                            <span class="separation"> | </span>
                        </div>

                        <el-submenu index="/user-operate" class="reset-submenu">
                            <template slot="title">
                                <i class="iconfont1 iconren icon-ren"></i>
                                <div class="row-show" style="display: inline-block;max-width: 100px;">{{currentUser}}</div>
                            </template>
                            <el-menu-item index="/notification/Index">操作记录</el-menu-item>
                            <el-menu-item index="/login"><span @click="onLogout">退出</span></el-menu-item>
                        </el-submenu>
                    </div>

                </el-menu>

                <!--
                <div class="message">
                    <div class="message-num-box" @click="$router.push('/notification/Index')">
                        <el-badge :value="notReadCount&&notReadCount.count" class="item">
                            <i class='iconfont1 icon-xiaoxi'></i>
                        </el-badge>
                        消息
                    </div>
                </div>
                -->

            </header>
            <router-tab refs='routerTab'></router-tab>
        </div>
        <div class="page-content">
            <keep-alive :include='cachedRoutes'>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { HOST_BASE } from "../constants/api";
import RouterTab from "../components/RouterTab";
import cookies from "../utils/cookies";
export default {
  name: "MainIndex",
  components: {
    RouterTab
  },
  data() {
    return {
      //    curEntityId: '',
      groupId: "",
      groupName: "",
      utype: "",
      menuListData: [],
    };
  },

  //        watch: {
  //            userEntityList: function (nval, oval) {
  //                if (nval.length == 1) {
  //                    this.curEntityId = nval[0].userGroupId
  //                }
  //                this.curEntityId = nval[0].userGroupId
  //            }
  //        },
  computed: {
    ...mapState({
      currentUser: ({ root }) => root.currentUser,
      tabCaches: ({ root }) => root.tabCaches,
      //     userEntityList: ({root}) => root.userEntityList,
      notReadCount: ({ notification }) => notification.notReadCount
    }),

    activeIndex() {
      const path = this.$route.path;
      console.log(path,"089896785")
      const routesMapping = {
        '/sales/order': '/sales/order',  //销售模块
        '/sales/import/salesOrders': '/sales/order',
        '/sales/check/salesOrder': '/sales/order',
        "/sales/return": "/sales/return",
        "/sales/change": "/sales/change",
        "/sales/proxy": "/sales/proxy",
        "/stock/storage": "/stock/storage", // 入库模块
        "/stock/outbound": "/stock/outbound", // 出库模块
        "/stock/CreateOutbound": "/stock/outbound",
        '/stock/ViewOutbound': '/stock/outbound',
        "/stock/OutboundPageDetail": "/stock/outbound",
        "/stock/SetOutboundPage": "/stock/outbound",
        "/stock/transfer": "/stock/transfer", // 调拨模块
        "/stock/management": "/stock/management", // 库存管理模块
        "/stock/inventory": "/stock/inventory", // 盘点
        "/stock/costManagement": "/stock/costManagement", // 物流费用录入
        "/contract": "/contract", //合同
        "/config/storehouse": "/config/storehouse", //仓库模块
        "/config/supplier": "/config/supplier", //供货商管理模块
        "/config/client": "/config/client", //客户设置
        "/config/commodity": "/config/commodity", // 商品设置
        "/bonus/settlement": "/bonus/settlement",//酬金结算单
        "/bonus/recommend": "/bonus/recommend",//推荐管理
        "/system/entity": "/system/entity", //系统设置

      };
      for (let key in routesMapping) {
        if (path.indexOf(key) === 0) {
          return routesMapping[key];
        }
      }
      return path;
    },
    cachedRoutes() {
      return this.tabCaches.map(item => item.name);
    }
  },
  mounted() {
    const userName = sessionStorage.getItem("userName");
    userName && this.changeCurrentUser(userName);
    //    this.getEntity()
    this.groupId = sessionStorage.getItem("entityId");
    this.groupName = sessionStorage.getItem("entityName");
    this.utype = sessionStorage.getItem("utype");
    //    this.getNotReadMessage();
    this.menuListData = JSON.parse(localStorage.getItem('menuList'));
  },
  methods: {
    handleCommand(item) {
      if (item == "a") {
        this.$router.push("/notification/Index");
      } else {
        this.onLogout();
      }
    },
    onLogout() {
      //   this.logout()
      window.location.href = `${HOST_BASE}/#/login`;
      sessionStorage.setItem("tabCaches", "[]");
      setTimeout(() => {
        cookies.delCookie("ng");
        //        this.$router.push('/login')
        window.location.reload();
      }, 50);
    },
    getEntity() {
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        this.changeCurrentUserId(userId).then(resp => {
          this.getUserEntityListDo({ uid: userId }).then(res => {
            //debugger
            if (res && res.result && res.result.length > 0) {
              this.setCurEntity();
            } else {
              this.$message({
                type: "info",
                message: "业务实体返回错误!"
              });
              let THIS = this;
              // setTimeout(function () {
              //     THIS.logout()
              // }, 2000)
            }
          });
        });
      } else {
        this.onLogout();
      }
    },
    setCurEntity() {
      const entityId = sessionStorage.getItem("entityId");
      if (entityId) {
        let res = this.userEntityList.find(one => {
          return one.userGroupId == entityId;
        });
        if (res) {
          this.curEntityId = entityId;
        } else {
          this.curEntityId = this.userEntityList[0].userGroupId;
          this.setEntityStorage();
        }
      } else {
        this.curEntityId = this.userEntityList[0].userGroupId;
        this.setEntityStorage();
      }
    },
    setEntityStorage() {
      sessionStorage.setItem("entityId", this.userEntityList[0].userGroupId);
      sessionStorage.setItem("entityName", this.userEntityList[0].groupName);
    },
    changeEntity(data) {
      sessionStorage.setItem("entityId", this.curEntityId);
      this.changeCurrentEntityId({ entityId: this.curEntityId });
      this.userEntityList.forEach(one => {
        if (one.userGroupId == data) {
          sessionStorage.setItem("entityName", one.groupName);
          this.changeCurrentEntity({ entityName: one.groupName });
        }
      });
    },
    // 查询未读消息
    getNotReadMessage() {
      this.queryMessageNotRead().then(res => {});
    },
    ...mapActions([
      "changeCurrentUser",
      "changeCurrentUserId",
      "getUserEntityListDo",
      "changeCurrentEntity",
      "changeCurrentEntityId",
      "queryMessageNotRead",
      "logout"
    ])
  }
};
</script>

<style lang='scss'>
@import "../layouts/css/index.scss";

.page-header {
  position: absolute;
  top: 0;
  z-index: 99;
  min-width: 100%;
  header {
    height: 60px;
    background-color: #2f2f2f;
    display: block;
    position: relative;
    font-size: 16px;
    .logo {
      height: 100%;
      line-height: inherit;
      width: 160px;
      overflow: hidden;
      display: inline-block;
      text-align: center;
      .logo-img {
        position: relative;
        top: 17px;
        display: inline-block;
        margin: auto auto;
        width: 138px;
        height: 25px;
        overflow: hidden;
        background: transparent url("../layouts/images/logo_title.png") center
          center no-repeat;
        background-size: contain;
      }
    }
    .nav-menu {
      display: inline-block;
      border-bottom: none;
      margin-left: -5px;
      height: 60px;
      .el-submenu__title {
        i {
          color: inherit;
        }
      }
    }
    /*消息*/
    .message {
      position: absolute;
      top: 0;
      right: 265px;
      padding-left: 35px;
      color: #fff;
      line-height: $header-height;
      cursor: pointer;
    }
    .message-num-box {
      height: 34px;
      margin-top: 14px;
      line-height: 34px;
      font-size: 14px;
      .item {
        margin-right: 8px;
      }
    }
    .icon-xiaoxi {
      font-size: 20px;
    }
    .avatar {
      display: inline-block;
      padding-left: 35px;
      .entity-select {
        width: 126px;
        margin-right: 3px;
        text-overflow: ellipsis;
        * {
          background-color: #2f2f2f;
          border-color: #2f2f2f;
          line-height: inherit;
          color: #fff;
        }
        .el-input.is-focus .el-input__inner {
          border-color: #2f2f2f;
        }
        .el-input__inner {
          padding: 0 5px;
          color: #fff;
        }
      }
      .single-entity {
        max-width: 100px;
        text-align: left;
        /*text-overflow: ellipsis;*/
        /*word-break: keep-all;*/
        /*overflow: hidden;*/
        /*white-space: nowrap;*/
        margin-right: 10px;
        margin-left: 3px;
        display: inline-block;
        color: #fff;
        vertical-align: middle;
        font-size: 14px;
      }
      .separation {
        display: inline-block;
        margin-right: 15px;
      }
      .iconren {
        margin-top: 1px;
        margin-right: 1px;
        font-size: 14px;
        color: #fff;
      }
      span {
        text-align: center;
        color: #fff;
        line-height: 60px;
      }
    }

    .reset-submenu.el-submenu {
      float: right;
      margin: 0 20px 0 0;
      &.is-active .el-submenu__title {
        border-bottom: none !important;
        color: #fff !important;
      }
    }

    .el-menu {
      position: static;
    }
    .el-menu-item,
    .el-submenu__title {
      padding: 0;
      font-size: 14px;
    }
    .el-menu li {
      padding: 0px;
      margin: 0 19px;
    }
    .el-menu--horizontal > .el-menu-item.is-active,
    .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
      border-bottom: 2px solid #3b8cff;
      color: #3b8cff;
      height: 46px;
      padding: 0;
      font-size: 14px;
      background-color: inherit;
    }
    .el-menu-item {
      color: #666;
    }
    .el-menu-item:hover {
      color: #333;
      background-color: #2f2f2f !important;
    }
    .el-submenu > .el-submenu__title {
      background-color: #2f2f2f !important;
    }
    .el-menu--horizontal .el-submenu > .el-menu {
      width: 140px;
      background-color: #fff !important;
      li {
        background-color: #fff !important;
        color: #666 !important;
        text-align: left;
        font-size: 12px;
        padding-left: 12px;
        margin: 0px;
        width: 140px;
        min-width: 140px;
        &:hover {
          color: #333 !important;
          background-color: #f6fafe !important;
        }
        &.is-active {
          color: #333 !important;
          background-color: #f6fafe !important;
        }
      }
    }
  }
}

.page-content {
  width: 100%;
  position: absolute;
  background: #e9eef1;
  top: 97px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
}

.dropdown-style-reset {
  width: 100px;
  padding: 0;
  li.el-dropdown-menu__item {
    padding: 0 0 0 12px;
    color: #666666;
    font-size: 12px;
    &:hover {
      color: #333333;
      background-color: #fff;
    }
  }
}

// 三级菜单覆盖之前非通用样式
.page-header header .el-menu--horizontal .el-submenu .el-menu-item {
  float: left;
}
.page-header header .el-menu--horizontal .el-submenu > .el-menu .newMenu {
    height: 36px;
    line-height: 36px;
    background-color: #fff !important;
    color: #666 !important;
    text-align: left;
    font-size: 12px;
    padding-left: 12px;
    padding-right: 10px;
    margin: 0px;
    width: 140px;
    min-width: 140px;
  // color: #000 !important;
  .el-submenu__title {
    height: 36px;
    line-height: 36px;
    background-color: #fff !important;
    color: #666 !important;
    font-size: 12px;
    margin: 0px;
  }
  .el-submenu__title.is-active {
    color: #3b8cff !important;
  }
  .el-menu {
    left: 140px;
    top: 0px;
    .el-menu-item {
        color: #666 !important;
        // background-color: rgb(41, 44, 49) !important;
    }
    .el-menu-item.is-active {
        color: #3b8cff !important;
    }
  }
}
</style>
