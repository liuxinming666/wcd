<template>
    <div style="overflow-x: hidden;overflow-y:hidden;">
        <el-row :gutter="0">
            <el-col :span="12"><div :style="{height:colHeight + 'px',width:colWidth + 'px'}" class="bg-purple">我是分块一</div></el-col>
            <el-col :span="12"><div :style="{height:colHeight + 'px',width:colWidth + 'px'}" class="bg-purple">我是分块二</div></el-col>
        </el-row>
        <el-row :gutter="0">
            <el-col :span="12"><div :style="{height:colHeight + 'px',width:colWidth + 'px'}" class="bg-purple">我是分块三</div></el-col>
            <el-col :span="12"><div :style="{height:colHeight + 'px',width:colWidth + 'px'}" class="bg-purple">我是分块四</div></el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "sysIndex",
        data(){
            return{
                colHeight:0,       //每个小窗口的高度
                colWidth:400     //每个小窗口的宽度
            }
        },
        mounted:function () {
            this.colHeight = Math.floor((document.documentElement.clientHeight - 70)/2);
            this.colWidth = Math.floor(document.documentElement.clientWidth/2);
        }
    }
</script>

<style scoped>
    .bg-purple {
        background: #d3dce6;
    }
</style>