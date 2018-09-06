<template>
    <div class="user_layout">
        <div class="login_form">
            <h1>博客后台管理系统</h1>
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm">
                <el-form-item prop="user_name">
                    <el-input v-model="loginForm.user_name" placeholder="请输入长度为2-32字符的用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
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
                    pass: [
                        { validator: checkUserName, trigger: 'blur' }
                    ],
                    age: [
                        { validator: checkPassword, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scope lang="less">
    .user_layout{
        height: 100%;
        background: #002329;
        color: #d9d9d9;
        display: flex;
        padding-top: 8%;
        justify-content: center;
    }
    .login_form{
        width: 380px;
    }
    h1{
        text-align: center;
        margin-bottom: 70px;
    }
    .el-button{
        width: 100%;
        margin-top: 20px;
    }
</style>
