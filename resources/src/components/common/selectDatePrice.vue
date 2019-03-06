    // 时间区间显示组件
    // 传入参数：1.ISRESET：是否重置时间，默认FALSE
    // EMIT：1.DATE：选择时间时执行，返回THIS.TIME对象

<template>
    <div class="date-range">
        <!-- <label>创建时间：</label> -->
        <div class="button-list">
            <label :class="{'isClickActive':type==='today'}" @click="getDate('today')">今天</label>
            <label :class="{'isClickActive':type==='yesterday'}" @click="getDate('yesterday')">昨天</label>
            <label :class="{'isClickActive':type==='week'}" @click="getDate('week')">本周</label>
        </div>
        <el-date-picker
            @change="changeDateRange"
            v-model="time.dateRange"
            type="date"
            size="small"
            :editable="false"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
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
                type: 'all',
                time: {
                    dateRange: '',
                    dateStatus: ''
                },
            }
        },
        props:{
          isReset:{
              type:Boolean,
              default: false
          }
        },
        watch:{
            isReset (nval) {
                if(nval){
                    this.type='all';
                    this.time.dateRange = '';
                }
            },
            dateRange(nval){
                console.log(nval, 111)
            }
        },
        methods: {
            getDate(type){
                this.type = type;
                switch (type) {
                    case 'today':
                        this.time.dateStatus = '1'
                        this.time.dateRange = ''
                        break;
                    case 'yesterday':
                        this.time.dateStatus = '0'
                        this.time.dateRange = ''
                        break;
                    case 'week':
                        this.time.dateStatus = '3'
                        this.time.dateRange = ''
                        break;
                    default:
                }
                this.$emit('date', this.time);
            },
            changeDateRange(val) {
                if (val) {
                    this.time.dateStatus = '6'
                    this.time.dateRange = val
                }
                this.$emit('date', this.time);
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
            border: none;
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
