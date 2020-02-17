<template>
    <div :style="{background: '#12346B', height: fullHeight + 'px'}">
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="#12346B"
                text-color="#9EA5DE"
                :default-active="curActiveIndex"
                @select="onClickMenuItem">
            <el-menu-item index="decisionAnalysis/szyzlfb">
                <i class="el-icon-location"></i>
                <span slot="title">水资源总量分布</span>
            </el-menu-item>
            <el-menu-item index="decisionAnalysis/yszlkk">
                <i class="el-icon-location"></i>
                <span slot="title">用水总量考核</span>
            </el-menu-item>
            <el-menu-item index="decisionAnalysis/szylyl">
                <i class="el-icon-location"></i>
                <span slot="title">用水效率考核</span>
            </el-menu-item>
            <el-menu-item index="decisionAnalysis/shjzlpj">
                <i class="el-icon-location"></i>
                <span slot="title">水环境质量评价</span>
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
            this.onClickMenuItem('decisionAnalysis/szyzlfb','');
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