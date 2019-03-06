import findIndex from 'lodash.findindex'
import cloneDeep from 'lodash.clonedeep'
import dateUtils from "element-ui/lib/utils/date"
import MD5 from 'blueimp-md5'
//import xss from 'xss'
import * as C from '../constants/api'
import Base64Encoder from "./base64"
import RSAEncrypt from "./rsa"
import moment from 'moment'

export default {

    findIndex(array, callback){
        return findIndex(array, callback)
    },

    formatDate(date, format = 'yyyy-MM-dd HH:mm:ss'){
        return dateUtils.format(date, format)
    },

    formatMomentData(data){
        return moment(data).format('YYYY-MM-DD HH:mm:ss')
    },

    parseDate(str, format = 'yyyy-MM-dd HH:mm:ss'){
        return dateUtils.parse(str, format);
    },

    trim(str) {
        return `${str}`.replace(/^\s*|\s*$/g, '')
    },

    md5(str){
        return MD5(`${str}`);
    },

    rsaEncrypt(str){
        const {RSAKeyPair, RSAConstants, encrypt} = RSAEncrypt;
        const keyPair = new RSAKeyPair(C.RSA_COMPONENT, "", C.RSA_MODULUS, C.RSA_KEY_LENGTH);
        const value = encrypt(keyPair, str, RSAConstants.PKCS1Padding);
        const fn = Base64Encoder.encode;
        return fn.call(null, value)
    },

    xssFilter(str) {
        return xss(str);
    },

    cloneDeep(obj){
        return cloneDeep(obj);
    },

    getLength(val) {
        /*
        let len = 0;
        val = val + '';
        for (var i = 0; i < val.length; i++) {
            var patt = new RegExp(/[^\x00-\xff]/ig);
            var a = val[i];
            if (patt.test(a))
            {
                len += 2;
            }
            else
            {
                len += 1;
            }
        }
        return len;
        */
        return val.length
    },
    validatePrice(price,_this){
        let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if (price && !reg.test(price)) {
            _this.$message.error('请输入正确价格');
            return
        }
        let priceString = price !== undefined ? String(price).split('.')[0] : '';
        if (Number(price) > 9999999.99 || priceString.length > 8) {
            _this.$message.error('您输入的价格超过最大值，请重新输入');
            return
        }
        return true
    },
}
