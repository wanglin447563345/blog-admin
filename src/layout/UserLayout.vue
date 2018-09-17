<template>
    <div class="user_layout">
        <div class="login_form">
            <h1>博客后台管理系统</h1>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

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
    .login_form .el-button{
        width: 100%;
        margin-top: 20px;
    }
</style>
