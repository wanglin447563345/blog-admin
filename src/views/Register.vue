<template>
    <div class="register">
        <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm">
            <el-form-item prop="user_name">
                <el-input v-model="registerForm.user_name" placeholder="请输入长度为2-32字符的用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="registerForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item  prop="checkPass">
                <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"  placeholder="请再次输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('registerForm',registerForm)">注册</el-button>
            </el-form-item>
        </el-form>
        <div class="skip_l">
            已有账号？ <span @click="skipLogin">请登录</span>
        </div>
    </div>
</template>

<script>
import md5 from "md5";
import {register} from "../service/Api"
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
                    callback(new Error('请输入密码'));
                } else {
                    if (this.registerForm.checkPass !== '') {
                        this.$refs.registerForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            let checkPassword2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                registerForm: {
                    user_name: '',
                    password: '',
                    checkPass:''
                },
                rules: {
                    user_name: [
                        { validator: checkUserName, trigger: 'blur' }
                    ],
                    password: [
                        { validator: checkPassword, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: checkPassword2, trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            submitForm(registerForm,data) {
                this.$refs[registerForm].validate((valid) => {
                    if (valid) {
                        register({user_name:data.user_name,password:md5(data.password),control_user:0})
                            .then(data=>{
                                if(data.errno===0){
                                    this.$message({
                                        message: '注册更成功，请登录',
                                        type: 'success'
                                    });
                                    this.$router.push("/user/login")
                                }else {
                                    this.$message.error(data.errmsg)
                                }
                            })
                    } else {
                        return false;
                    }
                });
            },
            skipLogin() {

                this.$router.push("/user/login")
            }
        }
    }
</script>

<style scope lang="less">
    .skip_l{
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