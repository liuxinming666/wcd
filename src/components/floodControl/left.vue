<template>
    <div :style="{background: '#12346B', height: fullHeight + 'px'}">
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="#12346B"
                text-color="#9EA5DE"
                :default-active="curActiveIndex"
                @select="onClickMenuItem">
            <el-menu-item index="floodControl/proceSel">
                <i class="el-icon-location"></i>
                <span slot="title">设计洪水过程选取</span>
            </el-menu-item>
            <el-menu-item index="infoPublish/dxxxfb">
                <i class="el-icon-location"></i>
                <span slot="title">调度方案设定</span>
            </el-menu-item>
            <el-menu-item index="infoPublish/yzyjsz">
                <i class="el-icon-location"></i>
                <span slot="title">调度方案计算</span>
            </el-menu-item>
            <el-menu-item index="infoPublish/zzxxfb">
                <i class="el-icon-location"></i>
                <span slot="title">调度方案分析评价</span>
            </el-menu-item>
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
            this.onClickMenuItem('floodControl/proceSel','');
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
