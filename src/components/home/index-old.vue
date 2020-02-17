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
                    <el-menu-item index="/3">数据维护</el-menu-item>
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

        <el-row style="height: 306px;">
            <el-col :span="8">
                <div style="margin: 5px;">
                    <el-carousel :interval="5000" arrow="always" height="280px">
                        <el-carousel-item>
                            <el-image src="images/getway/demo1.jpg" :fit="'fill'"></el-image>
                        </el-carousel-item>
                        <el-carousel-item>
                            <el-image src="images/getway/demo1.jpg" :fit="'fill'"></el-image>
                        </el-carousel-item>
                        <el-carousel-item>
                            <el-image src="images/getway/demo1.jpg" :fit="'fill'"></el-image>
                        </el-carousel-item>
                        <el-carousel-item>
                            <el-image src="images/getway/demo1.jpg" :fit="'fill'"></el-image>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </el-col>
            <el-col :span="10">
                <div style="margin: 5px;">
                    <Panel title="新闻信息" style="height:300px">
                        <div>
                            <ul class="tab2-txt" style="display: block;">
                                <li class="ml-shuili-txt-link">
                                    <a href="http://www.mwr.gov.cn/xw/slyw/201912/t20191231_1384612.html" target="_blank" class="fl hot-txt-left">服务“一带一路”与国际化水利人才培养论坛举办</a>                        <span class="fr hot-txt-right">1-2</span>
                                </li>
                                <li class="ml-shuili-txt-link">
                                    <a href="http://www.mwr.gov.cn/xw/slyw/201912/t20191219_1375478.html" target="_blank" class="fl hot-txt-left">全国水利一张图（2019版）正式发布</a>                        <span class="fr hot-txt-right">12-23</span>
                                </li>
                                <li class="ml-shuili-txt-link">
                                    <a href="http://www.mwr.gov.cn/xw/slyw/201911/t20191121_1368218.html" target="_blank" class="fl hot-txt-left">水利部召开“不忘初心、牢记使命”主题教育整改落</a>                        <span class="fr hot-txt-right">11-28</span>
                                </li>
                                <li class="ml-shuili-txt-link">
                                    <a href="http://www.mwr.gov.cn/xw/slyw/201911/t20191122_1368334.html" target="_blank" class="fl hot-txt-left">魏山忠主持纠正河湖“四乱”突出问题专项整治工作</a>                        <span class="fr hot-txt-right">11-28</span>
                                </li>
                                <li class="ml-shuili-txt-link">
                                    <a href="http://www.mwr.gov.cn/xw/slyw/201911/t20191113_1367516.html" target="_blank" class="fl hot-txt-left">鄂竟平出席中欧水资源交流平台第七次年度高层对话</a>                        <span class="fr hot-txt-right">11-19</span>
                                </li>
                                <li class="ml-shuili-txt-link">
                                    <a href="http://www.mwr.gov.cn/xw/slyw/201911/t20191101_1366709.html" target="_blank" class="fl hot-txt-left">水利部党组巡视工作领导小组召开会议听取第六轮巡</a>                        <span class="fr hot-txt-right">11-5</span>
                                </li>
                                <li class="ml-shuili-txt-link">
                                    <a href="http://www.mwr.gov.cn/xw/slyw/201910/t20191009_1364652.html" target="_blank" class="fl hot-txt-left">蒋旭光检查南水北调中线工程安全运行加固措施落实</a>                        <span class="fr hot-txt-right">10-14</span>
                                </li>
                                <li class="ml-shuili-txt-link">
                                    <a href="http://www.mwr.gov.cn/xw/slyw/201909/t20190921_1363763.html" target="_blank" class="fl hot-txt-left">水利部党组召开扩大会议 传达学习贯彻习近平总书...</a>                        <span class="fr hot-txt-right">10-14</span>
                                </li>
                            </ul>
                        </div>
                    </Panel>
                </div>
            </el-col>
            <el-col :span="6">
                <div style="margin: 5px;">
                    <Panel title="办公助手" style="height:300px">
                        <div>
                            <el-image src="images/getway/bgzs.png" :fit="'fill'" style="height: 250px;"></el-image>
                        </div>
                    </Panel>
                </div>
            </el-col>
        </el-row>

        <el-row style="height: 306px;">
            <el-col :span="8">
                <div style="margin: 5px;">
                    <Panel title="水情信息" style="height:300px">
                    </Panel>
                </div>
            </el-col>
            <el-col :span="8">
                <div style="margin: 5px;">
                    <Panel title="雨情信息" style="height:300px">
                    </Panel>
                </div>
            </el-col>
            <el-col :span="8">
                <div style="margin: 5px;">
                    <Panel title="工情信息" style="height:300px">
                    </Panel>
                </div>
            </el-col>
        </el-row>

        <el-row style="height: 306px;">
            <el-col :span="8">
                <div style="margin: 5px;">
                    <Panel title="工程安全信息" style="height:300px">
                    </Panel>
                </div>
            </el-col>
            <el-col :span="8">
                <div style="margin: 5px;">
                    <Panel title="计算机监控信息" style="height:300px">
                    </Panel>
                </div>
            </el-col>
            <el-col :span="8">
                <div style="margin: 5px;">
                    <Panel title="工程维护信息" style="height:300px">
                    </Panel>
                </div>
            </el-col>
        </el-row>

        <el-row style="height: 306px;">
            <el-col :span="8">
                <div style="margin: 5px;">
                    <Panel title="工程基础信息" style="height:300px">
                    </Panel>
                </div>
            </el-col>
            <el-col :span="8">
                <div style="margin: 5px;">
                    <Panel title="气象信息" style="height:300px">
                    </Panel>
                </div>
            </el-col>
            <el-col :span="8">
                <div style="margin: 5px;">
                    <Panel title="历史大洪水信息" style="height:300px">
                    </Panel>
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