    // 时间区间显示组件
    // 传入参数：1.ISRESET：是否重置时间，默认FALSE
    // EMIT：1.DATE：选择时间时执行，返回THIS.TIME对象

<template>
    <div class="date-range">
        <label v-if="showTtextNone">创建时间：</label>
        <div class="button-list">
            <label :class="{'isClickActive':type==='today'}" @click="getDate('today')">今天</label>
            <label :class="{'isClickActive':type==='week'}" @click="getDate('week')">本周</label>
            <label :class="{'isClickActive':type==='month'}" @click="getDate('month')">本月</label>
        </div>
        <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="～"
            :editable="false"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            >
        </el-date-picker>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: 'selectDateInterval',
        data () {
            return {
                dateRange: [],
                type: 'all',
                pickerOptions: { // 限制只能选择当天以前的日期
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e6;
                    }
                },
                time: {
                    createStartTime: '',
                    createEndTime: ''
                },
                showTtextNone: true
            }
        },
        props:{
          isReset:{
              type:Boolean,
              default: false
          },
          textNone: {}
        },
        watch:{
            isReset (nval) {
                if(nval){
                    this.type='all';
                    this.dateRange = [];
                }
            },
            dateRange(nval){
                this. getDateRange();
            }
        },
        mounted() {
            if (this.textNone === false) {
                this.showTtextNone = false 
            } else if (this.textNone === undefined) {
                this.showTtextNone = true
            }
        },
        methods: {
            getDateRange(){
                if (this.dateRange !== null && this.dateRange.length > 0) {
                    this.time.createStartTime = this.dateRange[0];
                    let now = moment().startOf('day').format('YYYY-MM-DD');
                    if (now === this.dateRange[1]) {
                        this.time.createEndTime = moment().format('YYYY-MM-DD');
                    } else {
                        this.time.createEndTime = moment(this.dateRange[1], 'YYYY-MM-DD').endOf('day').format('YYYY-MM-DD');
                    }
                } else {
                    this.type = 'all';
                    this.time.createStartTime = "";
                    this.time.createEndTime = "";
                }
               this.$emit('date',this.time);
            },
            getDate(type){
                this.type = type;
                switch (type) {
                    case 'today':
                        this.time.createStartTime = moment().startOf('day').format('YYYY-MM-DD');
                        this.time.createEndTime = moment().format('YYYY-MM-DD');
                        break;
                    case 'week':
                        let day = new Date().getDay();
                        let num = 0;
                        day === 0 ? num = 6 : num = day - 1;
                        this.time.createStartTime = moment().subtract(num, 'day').startOf('day').format('YYYY-MM-DD');
                        this.time.createEndTime = moment().day(7).format('YYYY-MM-DD')
                        break;
                    case 'month':
                        this.time.createStartTime = moment().startOf('months').format('YYYY-MM-DD');
                        this.time.createEndTime = moment().endOf('month').format('YYYY-MM-DD');
                        break;
                    default:
                }
                this.dateRange = [this.time.createStartTime,this.time.createEndTime];
            }
        }
    }
</script>

<style lang="scss">
    .date-range {
        vertical-align: middle;
        display: flex;
        label {
            color: #333333;
            font-size: 12px;
            line-height: 34px;
        }
        .button-list {
            margin: 0px 11px 0px 4px;
            label {
                width: 48px;
                height: 34px;
                line-height: 34px;
                text-align: center;
                background-color: #ffffff;
                font-size: 12px;
                color: #666666;
                border: 1px solid #E0E0E0;
                display: inline-block;
            }
            label:nth-child(2) {
                border-left: none;
                border-right: none;
                margin-left: -3.8px;
            }
            label:nth-child(1) {
                border-top-left-radius: 2px;
                border-bottom-left-radius: 2px;

            }
            label:nth-child(3) {
                border-top-right-radius: 2px;
                border-bottom-right-radius: 2px;
                margin-left: -4px;
            }
            .isClickActive {
                color: #FFFFFF;
                background-color: #3B8CFF;
                border-color: #3B8CFF;
            }
        }
        .el-date-editor .el-range-input, .el-date-editor .el-range-separator {
            font-size: 12px;
        }
        .el-date-editor .el-range-separator {
            width: 20px;
        }
        .el-date-editor.el-input__inner{
            padding: 0px 10px!important;
        }
        .el-date-editor {
            border: 1px solid #E0E0E0;
            border-radius: 1px;
            width: 210px;
            height: 34px;
            line-height: 20px;
            font-size: 12px;
            color: #666666;
            .el-range__icon {
                display: none;
            }
            .el-range__close-icon {
                position: absolute;
                top: 0px;
                line-height: 39px;
            }

        }
    }
</style>
