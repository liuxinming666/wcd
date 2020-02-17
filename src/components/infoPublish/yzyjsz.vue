<template>
    <div>
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item>
                <template slot="title">
                    <span style="font-weight: bold;">雨情预警阈值设置</span>
                </template>
                <div>
                    1小时累计雨量:<el-input style="width: 150px;" placeholder="请输入内容"></el-input>
                    3小时累计雨量:<el-input style="width: 150px;" placeholder="请输入内容"></el-input>
                    6小时累计雨量:<el-input style="width: 150px;" placeholder="请输入内容"></el-input>
                </div>
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                    <span style="font-weight: bold;">水情预警阈值设置</span>
                </template>
                水位:<el-input style="width: 150px;" placeholder="请输入内容"></el-input>
                流量:<el-input style="width: 150px;" placeholder="请输入内容"></el-input>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    export default {
        name: "yzyjsz"
    }
</script>

<style scoped>

</style>