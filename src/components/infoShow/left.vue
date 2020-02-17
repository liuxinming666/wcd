<template>
    <div :style="{background: '#12346B', height: fullHeight + 'px'}">
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="#12346B"
                text-color="#9EA5DE"
                :default-active="curActiveIndex"
                @select="onClickMenuItem">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>雨情</span>
                </template>
                <el-menu-item index="infoShow/sdyq">时段雨情</el-menu-item>
                <el-menu-item index="infoShow/dryq">多日雨情</el-menu-item>
                <el-menu-item index="infoShow/jzhdtj">极值滑动统计</el-menu-item>
                <el-menu-item index="infoShow/yqfx">雨情分析</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>水情</span>
                </template>
                <el-menu-item index="infoShow/zxsq">最新水情</el-menu-item>
                <el-menu-item index="infoShow/swllgcx">水位流量过程线</el-menu-item>
                <el-menu-item index="infoShow/sqjz">水情均值</el-menu-item>
                <el-menu-item index="infoShow/dzlldb">多站流量对比</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>水资源</span>
                </template>
                <el-menu-item-group>
                    <!--<el-menu-item index="1-1">最新水情</el-menu-item>
                    <el-menu-item index="1-2">河道水情</el-menu-item>
                    <el-menu-item index="1-2">水位流量过程线</el-menu-item>
                    <el-menu-item index="1-2">水情均值</el-menu-item>
                    <el-menu-item index="1-2">多站流量对比</el-menu-item>-->
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>水环境</span>
                </template>
                <el-menu-item-group>
                    <!--<el-menu-item index="1-1">最新水情</el-menu-item>
                    <el-menu-item index="1-2">河道水情</el-menu-item>
                    <el-menu-item index="1-2">水位流量过程线</el-menu-item>
                    <el-menu-item index="1-2">水情均值</el-menu-item>
                    <el-menu-item index="1-2">多站流量对比</el-menu-item>-->
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>工情</span>
                </template>
                <el-menu-item-group>
                    <!--<el-menu-item index="1-1">最新水情</el-menu-item>
                    <el-menu-item index="1-2">河道水情</el-menu-item>
                    <el-menu-item index="1-2">水位流量过程线</el-menu-item>
                    <el-menu-item index="1-2">水情均值</el-menu-item>
                    <el-menu-item index="1-2">多站流量对比</el-menu-item>-->
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>旱情</span>
                </template>
                <el-menu-item-group>
                    <!--<el-menu-item index="1-1">最新水情</el-menu-item>
                    <el-menu-item index="1-2">河道水情</el-menu-item>
                    <el-menu-item index="1-2">水位流量过程线</el-menu-item>
                    <el-menu-item index="1-2">水情均值</el-menu-item>
                    <el-menu-item index="1-2">多站流量对比</el-menu-item>-->
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "left",
        data(){
            return{
                fullHeight:document.documentElement.clientHeight - 71,
                curActiveIndex:''
            }
        },
        mounted:function(){
            this.onClickMenuItem('infoShow/sdyq','');
        },
        methods:{
            onClickMenuItem:function (index,indexPath) {
                this.curActiveIndex = index;
                this.$emit('changeCenter',false,index);
                if(index == 'infoShow/yqfx'){
                    this.$emit('changeLeft',{
                        menuName:'雨情分析',
                        description:'menu',
                        url:'infoShow/yqfx_left'
                    });
                }
                //alert(index);
            }
        }
    }
</script>

<style scoped>

</style>