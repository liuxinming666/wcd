<template>
    <div style="background-color: #14356A" class="head-north">
        <span class="head-left" style="height: 100%; padding-top: 5px;">
            <a href="/" target="_parent" style="margin-top: 5px;float: left;"><img id="syslogo" name="syslogo" src="../../../public/_fileupload/sysPic/oklogo.png" title="系统首页" style="margin-top:0;" /></a>
            <label id="sysname" style="color:#9EA5DE;font-size: 25px; font-weight:bold;margin-top: 8px; margin-left: 12px;display: inline-block;" name="sysname">水利综合决策子系统</label>
        </span>
        <ul class="nav">
            <li v-for="(item,index) in menuData" style="width: 120px;">
                <a :class="index==nSelMenu?'selected':''" style="width: 120px;" @click="onClickTopMenu(item,index);">
                    <img :src="item.iconURL" style="height:25px;width:25px;" :title="item.menuName">
                    <h2>{{item.menuName}}</h2>
                </a>
            </li>
        </ul>
        <div class="head-right">
            <MenuButton :text="'当前用户为:' + curUser" :plain="true" iconCls="icon-user">
                <Menu>
                    <MenuItem text="修改密码" iconCls="icon-edit"></MenuItem>
                    <MenuItem text="安全退出" iconCls="icon-user_go"></MenuItem>
                </Menu>
            </MenuButton>
            <div class="user" style="padding-right:10px;">
                <i>超警提醒：</i>
                <a href="javascript:;" onclick="msgMore();"><b id="msgNum">0</b></a>
                <audio id="audio" hidden="true"></audio>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "top",
        props:{
            curUser:{
                type:String
            }
        },
        data(){
            return{
                menuData:[
                    {
                        menuName:'综合信息展示',
                        iconURL:'/images/menuimg/f2_nav1_2.png',
                        url:'infoShow/left'
                    },
                    {
                        menuName:'监测预警',
                        iconURL:'/images/menuimg/f2_nav2_2.png',
                        url:'monitWarning/left'
                    },
                    {
                        menuName:'决策分析',
                        iconURL:'/images/menuimg/f2_nav3_2.png',
                        url:'decisionAnalysis/left'
                    },
                    {
                        menuName:'信息发布',
                        iconURL:'/images/menuimg/f2_nav4_2.png',
                        url:'infoPublish/left'
                    }
                ],
                //当前选中的菜单索引
                nSelMenu:0
            }
        },
        mounted:function () {
            /*this.axios.get('api/menu/topMenu', {})
                .then(res => {
                    this.menuData = res.data;
                    // 成功回调
                }, res => {
                    debugger;
                    // 错误回调
                });*/
        },
        methods:{
            onClickTopMenu:function (menuItem,menuIndex) {
                if(menuIndex == 1) {
                    //alert('监测预警');
                    this.$emit('monitWaring');
                }
                else{
                    this.$emit('changeLeft',menuItem);
                }
                this.nSelMenu = menuIndex;
            }
        }
    }
</script>

<style scoped>
    @import "../../../public/css/icon/icon.css";
    @import "../../../public/css/site.css";

    .head-left {
        height: 100%;
        padding-top: 5px;
    }

    .head-left a {
        margin-top: 5px;
        float: left;
    }

    #sysname {
        font-size: 19px;
        margin-top: 17px;
        margin-left: 12px;
    }

    .panel-body {
        font-size: 14px;
    }

    .panel-header {
        background: #9be2fd;
        filter: "";
    }

    .panel-title {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #251C1F;
    }

    .sms-warning, .sms-warning:hover {
        color: #FFFFFF;
        background: #F89406;
        z-index: 2;
    }

    .sms-primary, .sms-primary:hover {
        color: #FFFFFF;
        background: #3968C6;
        z-index: 2;
    }

    #popMessage {
        width: 100%;
        height: 100%;
        margin-bottom: -20px;
    }

    #popMessage .messager-icon {
        color: #FFAA06;
        float: left;
        margin-top: 10%;
        margin-left: 15px;
        margin-right: 20px;
    }

    #popIntro {
        line-height: 150%;
        color: #666;
        min-height: 60px;
    }

    #setting {
        text-align: left;
        line-height: 24px;
        margin: 8px 0 0 0;
        float: left;
    }

    #popMore {
        text-align: right;
        line-height: 24px;
        /*margin: 8px 0 0 0;*/
    }
</style>