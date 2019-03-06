import Vue from 'vue';

const inputValidate = function(name, regExp) {
    Vue.directive(name, {
        bind: function(el) {
            el.handler = function(e) {
                let input = null
                if (el.tagName === 'INPUT') {
                    input = el
                } else {
                    input = el.getElementsByTagName('input')[0] || el.getElementsByTagName('textarea')[0]
                }
                input.value = input.value.replace(regExp, '') // 忽略数字与字母以外的字符
                // if (!regExp.test(input.value)) return false;
                // return true;
            }
            el.addEventListener('input', el.handler, true)
        },
        unbind: function(el) {
            let input = el.tagName === 'INPUT' ?
                el :
                el.getElementsByTagName('input')[0]
            el.removeEventListener('input', el.handler, true)
        }
    })
}

/* 数字统一指代正整数 */


/**
 * @function 表单元素限制输入类型(数字与字母)
 * @directive: v-number-letter-only
 * @application: Input
 * @BusinessScenarios 密码
 */

const inputNumberLetterOnly = inputValidate('number-letter-only', /[^0-9a-zA-Z]+/) // 只允许数字或字母

/**
 * @function 表单元素限制输入类型(数字)
 * @directive: v-number-only
 * @application: Input
 * @BusinessScenarios 页数
 */
const inputNumberOnly = inputValidate('number-only', /[^0-9]+/) // 只允许数字

/**
 * @function 表单元素限制输入类型(数字|小数)
 * @directive: v-number-decimal-only
 * @application: Input
 * @BusinessScenarios 价格
 */
// const inputNumberDecimalOnly = inputValidate('number-decimal-only', /[^0-9.]+/) // 只允许数字和点
// const inputNumberDecimalOnly = inputValidate('number-decimal-only', /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/)  // 数字或小数
const inputNumberDecimalOnly = inputValidate('number-decimal-only', /([^1-9]{1}[^0-9]+\.[^0-9]{2}$)|(0\.[^0-9]{2}$)/)  // 数字或小数  
// const inputNumberDecimalOnly = inputValidate('number-decimal-only', /(^[1-9](\d){0,6}(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d([\d])?$)/) 

/**
 * @function 表单元素限制输入类型(数字|字母|汉字)
 * @directive: v-number-letter-chinese-only
 * @application: Input
 * @BusinessScenarios 密码
 */
const inputNumberLetterChineseOnly = inputValidate('number-letter-chinese-only', /[^A-Za-z0-9\u4e00-\u9fa5]+/)

/**
 * @function 表单元素限制输入类型(数字|字母|特殊符号)
 * @directive: v-number-letter-symbol-only
 * @application: Input
 * @BusinessScenarios 密码
 */
const inputNumberLetterSymbolOnly = inputValidate('number-letter-symbol-only', /[^a-zA-Z0-9:',!();\.\?\-\+\+\~\#\$\%\^\&\=\/\*\-，。；：‘’（）@！？]+/)

/**
 * @function 表单元素限制输入类型(数字|字母|空格|特殊符号)
 * @directive: v-number-letter-space-symbol-only
 * @application: Input
 * @BusinessScenarios 组织编号
 */
const inputNumberLetterSpaceSymbolOnly = inputValidate('number-letter-space-symbol-only', /[^a-zA-Z0-9\s:',!();\.\?\-\+\+\~\#\$\%\^\&\=\/\*\-，。；：‘’（）@！？]+/)

/**
 * @function 表单元素限制输入类型(数字|字母|特殊符号|汉字)
 * @directive: v-number-letter-chinese-symbol-only
 * @application: Input
 * @BusinessScenarios 用户名等名称
 */
const inputNumberLetterChineseSymbolOnly = inputValidate('number-letter-chinese-symbol-only', /\s/g)


// 正则中需要转义的字符:* . ? - + $ ^ [ ] ( ) { } | \ /
export { inputNumberLetterOnly, inputNumberOnly, inputNumberDecimalOnly, inputNumberLetterChineseOnly, inputNumberLetterSymbolOnly, inputNumberLetterSpaceSymbolOnly, inputNumberLetterChineseSymbolOnly }
