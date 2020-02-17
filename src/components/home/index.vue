<template>
    <div style="overflow-y: auto; height: 100%;">
        <el-row>
            <el-col :span="24">
                <div class="top-wrap" style="background-image: url('images/getway/header.png')">
                    <h1 class="logo">
                        <img src="images/getway/header_logo.png" alt="logo" oldsrc="header_logo.png" oldid="283" related="1">
                    </h1>
                    <div style="float: right;padding-top: 50px;bottom:0;">
                        <MenuButton text="当前用户:亿水泰科" :plain="true" iconCls="icon-user">
                            <Menu>
                                <MenuItem iconCls="icon-edit" text="修改密码"></MenuItem>
                                <MenuItem iconCls="icon-back" text="退出"></MenuItem>
                            </Menu>
                        </MenuButton>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-menu
                        :default-active="activeMenuIndex"
                        class="el-menu-demo"
                        mode="horizontal"
                        background-color="#158BD7"
                        text-color="#fff"
                        :router="true"
                        active-text-color="#ffd04b">
                    <el-menu-item index="/">用户权限管理</el-menu-item>
                    <el-menu-item index="/2">数据库系统维护</el-menu-item>
                    <el-menu-item index="/frame">数据维护</el-menu-item>
                    <el-menu-item index="/4">数据查询</el-menu-item>
                    <el-menu-item index="/5">报表生成</el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="notice-wrap" style="background: url('images/getway/gradient.png') repeat-x;">
                    <div class="notice" style="background: url('images/getway/notice.png') no-repeat 10px center;">
                        <div class="notice-box">
                            <marquee id="warnMarquee" direction="left" behavior="scroll" loop="-1">
                                <a style="color: red;" target="_blank">用于显示重要紧急通知</a>
                                <a style="color: red;" target="_blank">用于显示重要紧急通知</a>
                                <a style="color: red;" target="_blank">用于显示重要紧急通知</a>
                                <a style="color: red;" target="_blank">用于显示重要紧急通知</a>
                            </marquee>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24" style="background-color: #2A89C6;">
                <div style="text-align: center;font-size: 12px;border-top: 3px solid #ddb376;">
                    <p>CopyRight 2020 亿水泰科版权所有</p>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "home",
        data(){
            return{
                activeMenuIndex:'/'     //当前选中的菜单
            }
        }
    }
</script>

<style scoped>
    .top-wrap {
        width: 100%;
        height: 88px;
        background-size: 100% 100%;
    }
    .logo {
        width: 625px;
        height: 88px;
        margin: 0 auto;
        padding-top: 20px;
        padding-left: 10px;
        float: left;
    }
    .el-menu-item{
        font-size: 20px;
    }
    .notice-wrap {
        width: 100%;
        height: 30px;
        line-height: 30px;
    }
    .notice {
        width: 1200px;
        height: 30px;
        font-size: 16px;
        padding-left: 50px;
        margin: 0 auto;
    }
    .notice-box {
        width: 1150px;
        height: 30px;
        overflow: hidden;
    }

    .ml-shuili-txt-link {
        height: 30px;
        margin-left: 14px;
        overflow: hidden;
        line-height: 30px;
        font-size: 16px;
        /* border-bottom: 1px dashed #cecece; */
        border-bottom: 1px dashed #666;
    }
</style>