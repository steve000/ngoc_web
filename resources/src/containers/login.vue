<template>
    <div class="login-wrapper">
        <div class="login-content">
            <div class="login-logo">咪咕销售管理平台</div>
            <div class="login-conBox">
                <div class="login-title">
                    <ul>
                        <li class="actives">登录</li>
                    </ul>
                </div>
                <div class="login-box">
                    <el-form :model="form" :rules="rules" ref="form">
                        <div class="account-input">
                            <el-input v-model="form.username" placeholder="用户名" ></el-input>
                        </div>
                        <div class="account-input">
                            <el-input id="password" type="password" v-model="form.password" placeholder="密码" ></el-input>
                            <i class='pwd-hidden passIcon' v-if="isPasswordVisible" @click="togglePassword"></i>
                            <i class='pwd-visible passIcon' v-else @click="togglePassword"></i>
                        </div>
                        <el-form-item prop="imgcode" style="position:relative;">
                            <el-input v-model="form.imgcode" placeholder="验证码"></el-input>
                            <img :src="imgCodeURL" alt="图片验证码" @click="refreshImageCode" class="cursor">
                        </el-form-item>
                        <el-button type="primary" @click="submitForms('form')" class="submit" >登录</el-button>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="login-footer">
            Copyright © 2017 咪咕文化科技有限公司
        </div>
    </div>
</template>

<script>
import utils from '../utils/misc';
import cookies from '../utils/cookies';
import Api from '../utils/api';
import * as C from '../constants/api';
export default {
    name: 'Login',

    data() {
        var validateAccounts = (rule, value, callback) => {
            if (!this.form.username) {
                callback(new Error('请输入用户名'));
            } else if (!this.form.password) {
                callback(new Error('请输入密码'));
            } else if (!this.form.imgcode) {
                callback(new Error('请输入验证码'));
            } else {
                callback();
            }
        };

        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (value.length < 2) {
                    callback(new Error('密码长度大于2'));
                } else {
                    callback();
                }
            }
        };
        return {
            form: {
                username: 'zhangtao233',
                password: '5WVVLcUgyZ',
                imgcode: 'rrrr'
            },
            rules: {
                imgcode: [{ validator: validateAccounts, trigger: 'blur' }]
            },
            //密码的可见icon
            isPasswordVisible: false,
            imgCodeURL: ''
        };
    },

    beforeMount() {
        sessionStorage.setItem('tabCaches',"[]");
        this.refreshImageCode();
    },

    methods: {
        //第一部分
        togglePassword() {
            let v = document
                .getElementById('password')
            if (this.isPasswordVisible) {
                v.type = 'password';
            } else {
                v.type = 'text';
            }
            this.isPasswordVisible = !this.isPasswordVisible;
        },
        refreshImageCode() {
            this.imgCodeURL = C.CODE_IMG + '?t=' + Math.random();
        },

        resetForms(formNames) {
            this.$refs[formNames].resetFields();
        },
        //第一部分
        submitForms(formNames) {
            var vm = this;
            this.$refs[formNames].validate(valid => {
                if (valid) {
                    const params = { ...this.form };
                    // params.password = utils.base64Encode(
                    //     utils.rsaEncrypt(this.form.password)
                    // );
                    Api.login(params).then(res => {
                        console.log(res.sessionId)
                        sessionStorage.setItem('userName', res.username);
                        sessionStorage.setItem('ng', res.sessionId);
                        cookies.setCookie('ng',res.sessionId,1800000000);
                         vm.$router.push('/index/Home');
                    });
                } else {
                    return false;
                }
            });
        }
    }
};
</script>


<style lang='scss'>
.login-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    .login-content {
        height: 100%;
        flex: 1;
        background: url('../layouts/images/login_bg.jpg') center center;
        background-size: cover;
        .login-logo {
            position: absolute;
            top: 40px;
            left: 40px;
            font-size: 20px;
            color: #ffffff;
            text-shadow: 5px 2px 6px #666666;
        }

        .login-conBox {
            width: 330px;
            height: 345px;
            background: #fff;
            padding: 22px;
            position: absolute;
            right: 190px;
            top: 150px;
            border-radius: 5px;

            .login-title {
                height: 50px;
                margin-top: 20px;

                ul li {
                    float: left;
                    width: 284px;
                    font-size: 18px;
                    line-height: 18px;
                    color: #888;
                    text-align: center;
                    cursor: pointer;
                }
                .actives {
                    color: #46bafe !important;
                }
            }
            .login-box {
                .account-input {
                    position: relative;
                    margin-bottom: 20px;
                    .passIcon {
                        width: 21px;
                        height: 15px;
                        display: inline-block;
                        position: absolute;
                        background: url(../layouts/images/pwd-hidden.png) center
                            center no-repeat;
                        background-size: cover;
                        right: 13px;
                        top: 9px;
                        z-index: 99;
                    }
                    .pwd-visible {
                        opacity: 0.4;
                    }
                    .pwd-hidden {
                        opacity: 1;
                    }
                }
                .el-input__inner {
                    border: none;
                    border-radius: 0;
                    border-bottom: 1px solid #e0e0e0;
                }
                .el-input__icon:hover + .el-input__inner,
                .el-input__inner:hover {
                    box-shadow: 0px 0px 6px #fff;
                    border-bottom: 1px solid #e0e0e0 !important;
                }
                .el-input__inner::-webkit-input-placeholder {
                    color: #a0a0a0;
                }

                .cursor {
                    width: 124px;
                    position: absolute;
                    right: 0;
                    top: -3px;
                    height: 36px;
                }
                .submit {
                    width: 285px;
                    height: 34px;
                    background: #46bafe;
                    color: #fff;
                    text-align: center;
                    line-height: 34px;
                    margin-top: 20px;
                    padding: 0px;
                }
                .submit:hover {
                    opacity: 0.8;
                }
            }
        }
    }
    .login-footer {
        height: 60px;
        line-height: 60px;
        font-size: 14px;
        color: #333333;
        text-align: center;
        background-color: #ffffff;
    }
}
</style>
