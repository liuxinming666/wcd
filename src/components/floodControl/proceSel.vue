<template>
    <div>
        <Layout :style="{width:fullWidth,height:fullHeight}">
            <LayoutPanel region="north" style="height:50px;">
                <div>
                    <div style="margin-left: 15px;margin-top: 5px;float: left;">
                        洪水典型年:
                        <el-select style="width: 150px;" v-model="curYear" placeholder="选择年份">
                            <el-option
                                    v-for="item in yearsData"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                        &nbsp;&nbsp;
                        地区组成:
                        <el-select style="width: 150px;" v-model="regionSel" placeholder="地区组成">
                            <el-option
                                    v-for="item in regionSelData"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                        &nbsp;&nbsp;
                        洪水重现期:
                        <el-select style="width: 150px;" v-model="reapPer" placeholder="地区组成">
                            <el-option
                                    v-for="item in reapPerData"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                        &nbsp;&nbsp;
                        <el-button icon="el-icon-search" @click="onBtnClick" type="primary">提取</el-button>
                    </div>
                </div>
            </LayoutPanel>
            <LayoutPanel region="center">
                <el-tabs v-model="tabVale" type="border-card">
                    <el-tab-pane label="地表水资源分布">
                        <div>
                            <Layout style="height: 600px;">
                                <LayoutPanel :border="false" region="west" v-bind:style="{width:chartWidth}">
                                    <div ref="chart1" class="highcharts-container">
                                    </div>
                                </LayoutPanel>
                                <LayoutPanel :border="false" region="center" style="width: 600px;">
                                    <div>
                                        <el-table :data="tableData"
                                                  :height="tableHeight"
                                                  border
                                                  style="width: 100%">
                                            <el-table-column
                                                    type="index"
                                                    width="40">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="col0"
                                                    label="行政区划">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="col1"
                                                    label="地表水资源量(亿m³)">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="col2"
                                                    label="占全省地表水资源百分比">
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </LayoutPanel>
                            </Layout>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="地下水资源分布">
                        <div>
                            <Layout style="height: 500px;">
                                <LayoutPanel :border="false" region="west" v-bind:style="{width:chartWidth}">
                                    <div ref="chart2" class="highcharts-container">
                                    </div>
                                </LayoutPanel>
                                <LayoutPanel :border="false" region="center" style="height:100%;width: 600px;">
                                    <div>
                                        <el-table :data="tableData"
                                                  :height="tableHeight"
                                                  border
                                                  style="width: 100%">
                                            <el-table-column
                                                    type="index"
                                                    width="40">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="col0"
                                                    label="行政区划">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="col1"
                                                    label="地下水资源量(亿m³)">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="col2"
                                                    label="占全省地表水资源百分比">
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </LayoutPanel>
                            </Layout>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </LayoutPanel>
        </Layout>
    </div>
</template>

<script>
    export default {
        name: "proceSel",
        data(){
            return{
                yearsData:[1964,1973,1998,2003],
                curYear:1964,
                regionSelData:['同频率','典型地区','随机模拟'],
                regionSel:'同频率',
                reapPerData:[6,5,4,3,2,1],
                reapPer:5
            }
        }
    }
</script>

<style scoped>
    /deep/ .el-input__inner{
        height: 30px;
    }

    /deep/ .el-button{
        padding: 10px 10px;
    }
</style>
