* 消息->按时间搜索组件
* importParams:null
* 时间搜索组件，可选时间段，快捷选择方式，今天，本周，本月 向上返回一个对象，data: {startDate: '2018-09-12', endDate: '2018-08-12'};
* exports:null
**/
<template>
    <div class="search-date-wrapper">
        <div class="quick-choose">
            <span class="create-time">通讯时间：</span>
            <div class="choose-btn-group">
                <span :class="{'choose-btn': true, 'active':index === curIndex}" v-for="item,index in quickChoose" @click="handleDate(index)">{{item}}</span>
            </div>
        </div>
        <div>
            <el-date-picker
                v-model="curDate"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="～"
                prefix-icon="false"
                size="small"
                format="yyyy-MM-dd"
                class="reset-dater-style"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                :default-time="['00:00:00', '23:59:59']"
                @blur="onBlurFirstChange"
                @focus="onFocusFirstChange"
                @change="dateChange">
            </el-date-picker>
        </div>
    </div>
</template>

<script>
    import utils from '~/utils/commonMethod';
  export default {
    name: "search-date",
      data() {
        return {
            quickChoose: ['今天', '本周', '本月'],
            curDate: null,
            curIndex: -1, // 当前选择的事件
            pickerOptions: { // 限制只能选择当天以前的日期
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e6;
                }
            },
            isFirstChange: false,
        };
      },
      methods: {
          handleDate(i) {
              this.curIndex = i;
              switch (i) {
                  case 0: this.curDate = [this.getTime(), this.getTime()]; break;
                  case 1: this.curDate = [this.getTime('week'), this.getTime()]; break;
                  case 2: this.curDate = [this.getTime('month'), this.getTime()]; break;
              }
              const datas = {
                  startDate: this.formatYearOne(this.curDate[0]),
                  endDate: this.formatYearOne(this.curDate[1]),
              };
              //callback 当前选中时间
              this.$emit('onHandleDate', datas);
          },
          dateChange() {
              if (this.curDate) {
                  if (!this.isFirstChange) {
                      return;
                  }
                  const datas = {
                      startDate: this.formatYearOne(this.curDate[0]),
                      endDate: this.formatYearOne(this.curDate[1]),
                  };
                  this.$emit('onHandleDate', datas);
              } else {
                  const datas = {
                      startDate: null,
                      endDate: null,
                  };
                  this.curIndex = null;
                  this.$emit('onHandleDate', datas);
              }

          },
          onBlurFirstChange() { // 失去焦点时
              if (this.curDate && !this.isFirstChange) {
                  this.isFirstChange = true;
              }
          },
          onFocusFirstChange() { // 获得焦点时
              if (!this.curDate) {
                  this.isFirstChange = true;
              }
          },
          // 日期格式化
          formatYearOne(data){
              return utils.formatYearOne(data)
          },
          // 获取本月，本周，昨天开始日期
          getTime(data){
              return utils.getTime(data)
          },
      },
      watch: {
            curDate: function(val) {
                if (!val) {
                    this.dateChange()
                }
            }
      }
  }
</script>

<style lang="scss">
.search-date-wrapper {
    .el-range-separator{
        width: 16px;
        display: inline-block;
        color: #999;
        padding: 0;
        line-height: 32px;
    }
    .el-range-input{
        height: auto;
        font-size: 12px !important;
    }
    .reset-dater-style{
        width: 200px;
        height: 34px;
        border-radius: 2px;
        border-color: #E0E0E0;
    }
    .el-range__icon{
        display: none;
    }
    .el-range-editor.el-input__inner {
        padding: 0;
    }
}
</style>
<style scoped lang="scss">
    .search-date-wrapper{
        display: flex;
        .quick-choose{
            color: #333;
        }
        .choose-btn-group{
            display: inline-block;
            margin-right: 10px;
            border-radius: 2px;
            font-size: 0;
            color: #666;
        }
        .choose-btn{
            border: 1px solid #E0E0E0;
            font-size: 12px;
            display: inline-block;
            height: 34px;
            line-height: 34px;
            width: 44px;
            text-align: center;
        }
        .choose-btn:nth-of-type(1){
            border-right-color: #fff;
        }
        .choose-btn:nth-of-type(2){
            border-left-color: #fff;
            border-right-color: #fff;
        }
        .choose-btn:nth-of-type(3){
            border-left-color: #fff;
        }
        .choose-btn:hover{
            cursor: pointer;
        }
        .choose-btn.active{
            color: #3B8CFF;
            border: 1px solid #BFD9FE;
        }
        .create-time{
            color: #333;
        }
    }
</style>
