import moment from 'moment';
export default {
    formatYearOne(date) {
        return moment(date).format('YYYY-MM-DD');
    },
    formatYearTwo(date) {
        return moment(date).format('YYYY.MM.DD')
    },
    formatFullDate(date) {
        return moment(date).format('YYYY/MM/DD HH:mm:ss')
    },
    formatFullDateAnother(date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    // 获取日期  默认获取当天日期，getTime('week') 获取本周开始日期；getTime('month') 本月开始日期，getTime('pre'),昨天日期
    getTime(type) {
        switch (type) {
        case 'week':
            var weekOfday = moment().format('E');
            return moment().add(-weekOfday + 1, 'days').format('YYYY-MM-DD'); // 获取本周开始日期
        case 'pre':
            return moment().add(-1, 'days').format('YYYY-MM-DD'); // 获取昨天日期
        case 'month':
            return moment().format('YYYY-MM-01'); // 本月
        case 'oneDaysAgo':
            return moment().add(-2, 'days').format('YYYY-MM-DD'); // 2天前
        case 'TwoDaysAgo':
            return moment().add(-3, 'days').format('YYYY-MM-DD'); // 3天前
        case 'ThreeDaysAgo':
            return moment().add(-4, 'days').format('YYYY-MM-DD'); // 本月
        case 'year':
            return moment().add(-90, 'days').format('YYYY-MM-DD'); // 本月
        default:
            return moment().format('YYYY-MM-DD'); // 默认获取当天日期
        }
    },
    // 获取对象的一部分数据
    getPartAttr: (obj, arr) => arr.reduce((iter, val) => (val in obj && (iter[val] = obj[val]), iter), {}),
    // 比较日志详情的列表不同项
    comparePreAfter (row, content, propName, value, isPre = false) {
        if (!content) {
            return;
        }
        // 编辑前只是删除项标红
        if (isPre) {
            const item = content.find(val => val.orderSkuId === row.orderSkuId);
            if (!item) return true;
            return false;
        }
        let items = {};
        if (row.orderSkuId) {
            items = content.find(val => val.orderSkuId === row.orderSkuId);
        } else {
            items = content.find(val => val.serialNo === row.serialNo && val.skuId === row.skuId);
        }
        if (!items) return true;
        if (String(items[propName]) !== String(value)) {
            return true;
        } else {
            return false;
        }
    },
    // 去除字符串前后空格
    trim (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    // 判断传入数据是不是json
    isJson (obj) {
        var isjson = typeof (obj) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length;
        return isjson;
    },
    // 模糊匹配数组里的字符串
    matchStrOfArr (arr, str) {
        return arr.findIndex(i => i ? i.match(str) : false);
    },
    // 验证字符串里面是否含有非数字
    ifNoNum (s) {
        var patrn = /(^[1-9](\d){0,6}(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d([\d])?$)/;
        if (!patrn.test(s)) return false;
        return true;
    },
    // 验证字符串里面是否是整数最多5位
    isDigit (s) {
        var patrn = /^\d{0,7}$/;
        if (!patrn.test(s)) return false;
        return true;
    },
    // 验证字符串里面是否是整数
    isNum (s) {
        var patrn = /^\d+$/;
        if (!patrn.test(s)) return false;
        return true;
    },
    // 乘法不丢失精度
    mul (arg1, arg2) {
        if (arg1 !== undefined && arg2 !== undefined) {
            var m = 0;
            var s1 = arg1.toString();
            var s2 = arg2.toString();
            try { m += s1.split('.')[1].length; } catch (e) {}
            try { m += s2.split('.')[1].length; } catch (e) {}
            return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
        }
    }
};
