<template>
    <el-container>
        <el-header>
            <div class="logo">
                博客后台管理系统
            </div>
            <el-dropdown @command="routerPassword">
                <span class="el-dropdown-link">
                     用户<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">修改密码</el-dropdown-item>
                    <el-dropdown-item command="b">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <div class="content">
            <el-aside width="280px">
                <!--这里要注意:router,不能router-->
                <el-menu
                        :default-active=nav_active
                        :router="true"
                        class="el-menu-vertical-demo"
                        @select="handleSelect"
                        background-color="#262626"
                        text-color="#fff"
                        active-text-color="#1890ff">
                    <el-menu-item index="/dashboard">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>访问统计</span>
                        </template>
                    </el-menu-item>
                    <el-submenu index="/article">
                        <template slot="title">
                            <i class="el-icon-tickets"></i>
                            <span slot="title">文章管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/article-list">文章列表</el-menu-item>
                            <el-menu-item index="/article-add">发表文章</el-menu-item>
                            <el-menu-item index="/article-type">文章类别</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="/discuss-list">
                        <i class="el-icon-message"></i>
                        <span slot="title">评论</span>
                    </el-menu-item>
                    <el-menu-item index="/user-list">
                        <i class="el-icon-setting"></i>
                        <span slot="title">用户</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <transition name="fade">
                <router-view></router-view>
                </transition>
            </el-main>
        </div>
    </el-container>
</template>

<script>
    export default {
        name:"dashboard_layout",
        data() {
            return{
                nav_active:''
            }
        },
        created(){
            this.nav_active=this.$route.path  //激活当前导航
        },
        methods: {
            handleSelect(e){
                this.nav_active=e
            },
            routerPassword(params){
                if(params==='a'){
                    this.nav_active='';
                    this.$router.push('/change-password')
                }else {
                    this.$router.push('/user/login')
                }
            }
        }
    }
</script>

<style scope lang="less">
    .el-container{
        height: 100%;
    }
    .el-header{
        background: #002329;
        color: #fff;
        /*line-height: 60px;*/
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .logo{
        font-size: 20px;
    }
    .el-dropdown{
        color: #fff;
    }
    .content{
        height: calc(~"100% - 60px");
        display: flex;
        background: #eee;
    }
    .el-aside{
        height: 100%;
        background: #262626;
    }
    .el-main{
        height: 100%;
    }
    .fade-enter-active{
        transform: scale(0.5);
        transition: all 0.5s;
    }
    .fade-enter-to {
        transform: scale(1);
    }
    .fade-leave-to{
        transform: scale(1);
        opacity: 1;
    }
    .fade-leave-active{
        transform: scale(0.1);
        opacity: 0;
        transition: all 0.5s;
    }
</style>