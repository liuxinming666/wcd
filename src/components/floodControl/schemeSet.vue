<template>
    <div>
        <Layout :style="{width:fullWidth,height:fullHeight}">
            <LayoutPanel region="north" :border="false" style="height:50px;">
                <div style="margin-left: 10px;margin-top: 15px;">
                    <el-radio v-model="radioSel" label="1">按设计运用</el-radio>
                    <el-radio v-model="radioSel" label="2">按现状运用</el-radio>
                </div>
            </LayoutPanel>
            <LayoutPanel region="center" :border="false">
                <div style="overflow: hidden; margin: 5px;">
                    龙 羊 峡 水 库 起 调 水位:
                    <el-input
                            :readonly="bEdit"
                            style="width: 100px;"
                            size="medium"
                            placeholder="请输入内容"
                            v-model="input1">
                    </el-input>
                    m
                </div>
                <div style="overflow: hidden; margin: 5px;">
                    龙羊峡水库年度汛限水位:
                    <el-input
                            :readonly="bEdit"
                            style="width: 100px;"
                            size="medium"
                            placeholder="请输入内容"
                            v-model="input2">
                    </el-input>
                    m
                </div>
                <div style="overflow: hidden; margin: 5px;">
                    刘 家 峡 水 库 起 调 水位:
                    <el-input
                            :readonly="bEdit"
                            style="width: 100px;"
                            size="medium"
                            placeholder="请输入内容"
                            v-model="input3">
                    </el-input>
                    m
                </div>
                <div style="overflow: hidden; margin: 5px;">
                    刘家峡水库年度汛限水位:
                    <el-input
                            :readonly="bEdit"
                            style="width: 100px;"
                            size="medium"
                            placeholder="请输入内容"
                            v-model="input4">
                    </el-input>
                    m
                </div>
                <div style="overflow: hidden; margin: 5px;margin-left: 18px;">
                    龙 刘 水 库 蓄 洪 比 例:
                    <el-input
                            :readonly="bEdit"
                            style="width: 100px;"
                            size="medium"
                            placeholder="请输入内容"
                            v-model="input5">
                    </el-input>
                </div>
                <div style="overflow: hidden; margin: 5px;">
                    宁 蒙 河 段 河道过流能力:
                    <el-input
                            :readonly="bEdit"
                            style="width: 100px;"
                            size="medium"
                            placeholder="请输入内容"
                            v-model="input5">
                    </el-input>
                    m³/s
                </div>
                <div style="margin-left: 100px;margin-top: 15px">
                    <el-button icon="el-icon-search" @click="onBtnClick" type="primary">确定</el-button>
                </div>
            </LayoutPanel>
        </Layout>
    </div>
</template>

<script>
    export default {
        name: "schemeSet",
        data(){
            return{
                radioSel:'1',
                input1:'2594',
                input2:'2594',
                input3:'1726',
                input4:'1726',
                input5:'3.5',
                input6:'5500',
                bEdit:true
            }
        },
        watch:{
            radioSel(val){
                if(val == '1'){
                    this.input1 = '2594';
                    this.input2 = '2594';
                    this.input3 = '1726';
                    this.input4 = '1726';
                    this.input5 = '3.5';
                    this.input6 = '5500';
                    this.bEdit = true;
                }
                else{
                    this.bEdit = false;
                }
            }
        },
        methods:{
            onBtnClick:function () {
                this.$message({
                    message: '设定完成',
                    type: 'success',
                    duration:1000
                });
            }
        }
    }
</script>

<style scoped>
    /deep/ .el-button{
        padding: 10px 10px;
    }
</style>
