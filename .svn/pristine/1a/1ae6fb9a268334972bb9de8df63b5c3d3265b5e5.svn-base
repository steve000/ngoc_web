<template>
	<div class="channelManagement">
		<div class="left-section pull-left">
			<div class="add-section">
				<el-button type="primary" icon="el-icon-plus" class="addButton" @click="$router.push({path:'/config/channel/create'})">新增渠道</el-button>
			</div>
			<el-menu :active-text-color="activeColor" :unique-opened="true" @open="doopen" @close="doclose" :class="{'control-submenu-item': isActiveNavmenu}" @select="select">
				<el-submenu index="1" :class="{'menu-specail-wrapper': isActiveCur === 1}">
					<template slot="title">
						<div class="is-active-submenu noneArrow">
							<span class="iconfont icon-quanbu"></span>
							<div slot="title" class="menu-btn-space menu-btn-title ml6">全部渠道</div>
						</div>
					</template>
				</el-submenu>
                <div class="menu-height">
                    <el-submenu index="2" ref="submenu2" :class="{'menu-specail-wrapper': isActiveCur === 2,'scrollH':isActiveCur2==2 && scrollH}">
                        <template slot="title">
                            <div class="is-active-submenu noneArrow">
                                <span class="positionIcon" :class="{'isOpenPositionIcon':showMenu2}"></span>
                                <div slot="title" class="menu-btn-space menu-btn-title ml32 menu-btn-title2">非自营渠道</div>
                            </div>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,index) in typeB" :key='index' :index="String(index+1)" :title="item.channelName" @click="goFilterTable(item.channelId,item.channelName,index)" class="menuItem">{{item.channelName}}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3" ref="submenu3" :class="{'menu-specail-wrapper': isActiveCur === 3,'scrollH2':isActiveCur2==3 && scrollH2}">
                        <template slot="title">
                            <div class="is-active-submenu noneArrow">
                                <span class="positionIcon" :class="{'isOpenPositionIcon':showMenu3}"></span>
                                <div slot="title" class="menu-btn-space menu-btn-title ml32 menu-btn-title2">自营渠道</div>
                            </div>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,index) in typeA" :key='index' :index="String(index+100)" :title="item.channelName" @click="goFilterTable(item.channelId,item.channelName,index)" class="menuItem">{{item.channelName}}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </div>
            </el-menu>
		</div>
		<div class="main-section">
			<keep-alive>
				<all-channel @refreshOrderCount="refreshOrderCount" :operationId="operationId" v-if="!isActiveNavmenu" :showmeau-index="showmeauIndex"></all-channel>
				<filter-table v-else :channelId='channelId' :channel-name="channelName" :operationId="operationId"></filter-table>
			</keep-alive>
		</div>
	</div>
</template>

<script>
import { mapActions,mapState } from "vuex";
import allChannel from "~/components/channel/AllChannel";
import FilterTable from "~/components/channel/FilterTable";
import PlatformMixins from "~/mixins/platform";

export default {
  name: "ChannelManagement",
  mixins: [PlatformMixins],
  data() {
    return {
      typeA: [], //自发
      typeB: [], //非自发
      showmeauIndex: 1,
      channelId: "", // 渠道ID
      channelName: "",
      defaultIndex: ["1"], // 默认打开菜单
      isActiveCur: 1, // 当前打开菜单
      isActiveCur2: 1,
      activeColor: "#3B8CFF", // #424E67
      isActiveNavmenu: false, // 当点击主菜单时，为true
      scrollH: false,
      scrollH2: false,
      operationId: 1,
      showMenu2: false,
      showMenu3: false,
      itemIndex:null,
    };
  },
  methods: {
    // 渠道ID传递到子组件
    ...mapActions(["queryChannelAllAction"]),
    goFilterTable(id, channelName,index) {
      this.itemIndex=index;
      this.channelName = channelName;
      this.channelId = id;
      // this.$store.commit("CHANNEL_MANAGEMENT_ACTIVE_INDEX", {activeCurrentMenuIndex:this.isActiveCur2,itemIndex:index});
    },
    onPageRefresh(data) {
      this.operationId = this.operationId + 1;
    },
    // 根据选择的菜单做判断
    select(index, indexPath) {
      this.isActiveCur = null;
      this.activeColor = "#3B8CFF"; // 点击子菜单时菜单高亮
      this.isActiveNavmenu = true; // 恢复子菜单选中背景
    },
    refreshOrderCount(){
      this.queryChannelAllActionFunction();
          },
    doopen(index) {
      this.activeCurrentMenu(index);
      switch (parseInt(index)) {
        case 2:
          this.showMenu2 = true;
          this.showMenu3 = false;
          break;
        case 3:
          this.showMenu3 = true;
          this.showMenu2 = false;
          break;
        default:
          break;
      }
    },
    doclose(index) {
      this.activeCurrentMenu(index);
      switch (parseInt(index)) {
        case 2:
          this.showMenu2 = false;
          break;
        case 3:
          this.showMenu3 = false;
          break;
        default:
          break;
      }
    },
    activeCurrentMenu(index) {
      let _index=index?index:this.channelManagementActiveIndex1;
      this.flagMsg = -1;
      this.showmeauIndex = _index;
      this.activeColor = "#424E67"; // 点击主菜单时子菜单取消高亮
      this.isActiveNavmenu = false; // 清除子菜单选中背景
      this.isActiveCur = Number(_index); // 点击主菜单时主菜单高亮
      this.isActiveCur2 = Number(_index);
      let _child = "";
      if (_index == 2) {
        _child = this.$refs["submenu2"].$children[0].$children;
      } else if (_index == 3) {
        _child = this.$refs["submenu3"].$children[0].$children;
      }
      let _height = _child[0]?_child[0].$el.offsetHeight:[];
      if (_child.length > 10) {
        if (_index == 2) {
          this.scrollH = true;
        } else if (index == 3) {
          this.scrollH2 = true;
        } else {
          this.scrollH2 = this.scrollH = false;
        }
      }else{
        this.scrollH2 = this.scrollH = false;
      }
    },

    queryChannelAllActionFunction() {
      this.queryChannelAllAction({ pageNo: 1, pageSize: 1000 }).then(res => {
        this.typeA = [];
        this.typeB = [];
        let data = res.result;
        // 将自发和非自发分类
        for (let i of data) {
          if (parseInt(i.channelType) == 0) {
            this.typeA.push(i);
          } else if (parseInt(i.channelType) == 1) {
            this.typeB.push(i);
          }
        }
      });
      this.activeCurrentMenu(this.isActiveCur2);
    }
  },
  created() {
    this.queryChannelAllActionFunction();
  },
  components: {
    allChannel,
    FilterTable
  },
  watch: {
    '$route':{
      handler(to,from){
         if(from.path.indexOf("channel/create")!=-1 && from.path.indexOf("channel/createGood")==-1){
          this.queryChannelAllActionFunction();
        }
      }
    }
  },
  computed:{
    ...mapState({
        channelManagementActiveIndex1: ({
            channel
        }) => channel.channelManagementActiveIndex,

    }),
  }
};
</script>

<style lang="scss">
.channelManagement {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .left-section {
      height: 100%;
    .add-section {
      padding: 10px 0;
      text-align: center;
      .addButton {
        width: 100px;
        height: 30px;
        padding: 0;
        font-size: 12px;
        border-radius: 2px;
      }
    }
      .menu-height {
        height: calc(100% - 44px);
          overflow: auto;
      }

    .el-menu {
        height: calc(100% - 50px);
      background-color: #e9eef1;
      &.control-submenu-item {
        .el-submenu {
          &.is-opened {
            .el-menu-item {
              &.is-active {
                background: #dde2e5;
              }
            }
          }
        }
      }
      .el-menu-item {
        line-height: 44px;
        height: 44px;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 14px;
      }
      .menu-btn-space {
        display: inline-block;
        width: 100px;
        // margin-left: 10px;
      }
      .el-submenu {
        .el-submenu__title {
          height: 44px;
          line-height: 44px;
          i {
            vertical-align: middle;
            margin-right: 5px;
            width: 16px;
            text-align: center;
            font-size: 16px;
          }
        }
        .el-menu-item {
          min-width: inherit;
        }
      }

      .el-menu-item-group {
        .el-menu-item {
          height: 36px;
          line-height: 36px;
          text-indent: 14px;
          font-size: 12px;
          color: #47526b;
        }
      }
    }
  }
  .positionIcon {
    position: absolute;
    left: 24px;
    color: #b3bbcd;
    top: 19px;
    width: 0px;
    height: 0px;
    border-width: 0px 0px 8px 8px;
    border-style: solid;
    border-color: #b3bbcd transparent #b3bbcd transparent;
    transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
  }
  .isOpenPositionIcon {
    transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
  }

  .ml32 {
    margin-left: 24px;
  }
  .ml6{
    margin-left: 6px;
  }
}
</style>

<style lang="scss" scope>
.menu-icon-place-holder {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
  display: inline-block;
}
.el-submenu .change-order-menu {
  min-width: 160px;
  padding-left: 0;
}
.change-order-specail-wrapper .menu-btn-title {
  font-size: 14px !important;
}

.menu-btn-title2{
  font-size:12px!important;
}
.menu-specail-wrapper {
  .el-submenu__title {
    background: #dde2e5;
  }
  .is-active-submenu {
    color: #3b8cff;
  }
  i {
    color: #3b8cff;
  }
}
.control-submenu-item .menu-specail-wrapper {
  .el-menu-item.is-active {
    background: #e9eef1 !important;
  }
}

.noneArrow {
  & + .el-submenu__icon-arrow {
    display: none !important;
  }
}
::-webkit-scrollbar {
  display: none;
}
.scrollH,
.scrollH2 {
  & > ul {
    height: 390px;
    overflow: scroll;
  }
}

.el-menu-item:focus, .el-menu-item:hover{
      background-color: #dde2e5;
}
.el-submenu__title{
  color:#424e76;
}
.el-select-dropdown__item{
  font-size:12px;
  padding-left:14px;
}
</style>
