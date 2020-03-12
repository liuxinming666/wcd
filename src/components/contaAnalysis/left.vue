<template>
    <div :style="{background: '#12346B', height: fullHeight + 'px'}">
        <el-menu
                class="el-menu-vertical-demo"
                background-color="#12346B"
                text-color="#9EA5DE"
                :default-active="curActiveIndex"
                @select="onClickMenuItem">
            <el-menu-item index="contaAnalysis/bhqsfx">
                <i class="el-icon-location"></i>
                <span slot="title">污染物变化趋势分析</span>
            </el-menu-item>
            <el-menu-item index="contaAnalysis/ndbhfx">
                <i class="el-icon-location"></i>
                <span slot="title">污染物浓度变化分析</span>
            </el-menu-item>
            <el-menu-item index="contaAnalysis/bhtzfx">
                <i class="el-icon-location"></i>
                <span slot="title">污染物变化特征分析</span>
            </el-menu-item>
            <el-menu-item index="contaAnalysis/ztpj">
                <i class="el-icon-location"></i>
                <span slot="title">总体评价</span>
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
            this.onClickMenuItem('contaAnalysis/bhqsfx','');
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