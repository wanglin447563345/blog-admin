<template>
    <div class="login">
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm">
            <el-form-item prop="user_name">
                <el-input v-model="loginForm.user_name" placeholder="请输入长度为2-32字符的用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm',loginForm)">登录</el-button>
            </el-form-item>
        </el-form>
        <div class="skip_r">
            还没有账号？ <span @click="skipRegister">立即注册</span>
        </div>
    </div>
</template>

<script>
    import cookie from 'js-cookie'
    import md5 from 'md5'
    import {login} from '../service/Api'
    export default {
        data() {
            let checkUserName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                } else {
                    if (value.length > 32||value.length <2) {
                        callback(new Error('用户名长度为2-32个字符'));
                    }
                    callback();
                }
            };
            let checkPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空'));
                } else {
                    callback();
                }
            };

            return {
                loginForm: {
                    user_name: '',
                    password: ''
                },
                rules: {
                    user_name: [
                        { validator: checkUserName, trigger: 'blur' }
                    ],
                    password: [
                        { validator: checkPassword, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(loginForm,data) {
                this.$refs[loginForm].validate((valid) => {
                    if (valid) {
                        login({user_name:data.user_name, password:md5(data.password)}).then(data=>{
                            if(data.errno===0){
                                cookie.set("userInfo",data.data,{expires:7});
                                this.$router.push("/dashboard")
                            }else {
                                this.$message.error(data.errmsg,)
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            skipRegister() {
                this.$router.push("/user/register")
            }
        }
    }
</script>

<style scope lang="less">
    .skip_r{
        text-align: right;
        padding:0 10px;
        span{
            cursor: pointer;
            &:hover{
                color: #409EFF;
            }
        }
    }
</style>