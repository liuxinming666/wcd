<template>
    <div>
        <el-row>
            <el-col :span="12">
                <div style="margin: 10px;">
                    <el-table
                            :data="tableData"
                            :border="true"
                            :header-cell-style="{color:'#606266'}"
                            style="font-size: 12px;">
                        <el-table-column
                                prop="col1"
                                label="防洪工程运行情况评价">
                        </el-table-column>
                        <el-table-column
                                prop="col2"
                                label="龙羊峡水库">
                        </el-table-column>
                        <el-table-column
                                prop="col3"
                                label="刘家峡水库">
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <el-col :span="12">
                <div style="margin: 10px;">
                    <span style="color: #7698B8;font-weight: bolder;">防洪效果评价</span>
                </div>
                <div style="font-size: 15px;">
                    <el-divider></el-divider>
                    <span>防洪断面削峰率</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>5.06%</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>防洪断面标准提高</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>3.15%</span>
                    <el-divider></el-divider>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div style="margin: 10px;">
                    <span style="color: #7698B8;font-weight: bolder;">洪灾损失评价</span>
                </div>
                <div style="font-size: 15px; margin: 10px;">
                    <el-divider></el-divider>
                    <span>淹没面积(k㎡)</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>53</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>淹没时间(天)</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>3</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>淹没人口</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>10</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>淹没直接经济损失(亿元)</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>20</span>
                    <el-divider></el-divider>
                </div>
            </el-col>
            <el-col :span="24">
                <div style="margin: 10px;">
                    <span style="color: #7698B8;font-weight: bolder;">方案可行性评价</span>
                </div>
                <div style="font-size: 15px; margin: 10px;">
                    <el-divider></el-divider>
                    <span>需龙库防洪库容(亿m³)</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>10</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>需刘库防洪库容(亿m³)</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>11</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>需宁蒙河段过流能力(m³/s)</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>5600</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>需迁移人口(万人)</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>20</span>
                    <el-divider></el-divider>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "schemeEval",
        data(){
            return{
                tableData: [{
                    col1: '最高库水位(m)',
                    col2: '2594',
                    col3: '1726'
                }, {
                    col1: '最大蓄水量(亿m³)',
                    col2: '224.8597',
                    col3: '29.38'
                }, {
                    col1: '最大泄流量(m³/s)',
                    col2: '3089',
                    col3: '3857'
                }]
            }
        }
    }
</script>

<style scoped>
</style>
