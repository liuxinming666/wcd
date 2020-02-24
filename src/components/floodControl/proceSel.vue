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
                <el-row>
                    <el-col :span="12">
                        <div ref="chart" class="highcharts-container">
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <el-table :data="tableData"
                                          :height="375"
                                          border
                                          style="width: 100%">
                                    <el-table-column
                                            prop="col0"
                                            label="日期">
                                    </el-table-column>
                                    <el-table-column
                                            prop="col1"
                                            label="龙羊峡入库">
                                    </el-table-column>
                                    <el-table-column
                                            prop="col2"
                                            label="龙刘区间">
                                    </el-table-column>
                                    <el-table-column
                                            prop="col3"
                                            label="刘家峡入库">
                                    </el-table-column>
                                    <el-table-column
                                            prop="col4"
                                            label="刘兰区间">
                                    </el-table-column>
                                </el-table>
                    </el-col>
                </el-row>
            </LayoutPanel>
        </Layout>
    </div>
</template>

<script>
    import Highcharts from 'highcharts/highstock';
    import HighchartsMore from 'highcharts/highcharts-more';
    import HighchartsDrilldown from 'highcharts/modules/drilldown';
    import Highcharts3D from 'highcharts/highcharts-3d';
    import Highmaps from 'highcharts/modules/map';

    HighchartsMore(Highcharts)
    HighchartsDrilldown(Highcharts);
    Highcharts3D(Highcharts);
    Highmaps(Highcharts);

    export default {
        name: "proceSel",
        data(){
            return{
                yearsData:[1964,1973,1998,2003],
                curYear:1964,
                regionSelData:['同频率','典型地区','随机模拟'],
                regionSel:'同频率',
                reapPerData:[5,10,20,30,40,50,100],
                reapPer:5,
                tableData:[]
            }
        },
        mounted:function(){
            this.initChart();
        },
        methods:{
            initChart:function () {
                let Mock = require('mockjs');
                let data1 = [],data2 = [],data3 = [],data4 = [];
                this.tableData = [];
                for(let i = 0;i < 10;i++){
                    let tmp1 = Mock.Random.float(1500,4000,2,2);
                    let tmp2 = Mock.Random.float(2000,4500,2,2);
                    let tmp3 = Mock.Random.float(2000,4300,2,2);
                    let tmp4 = Mock.Random.float(1600,4000,2,2);
                    data1.push(tmp1);
                    data2.push(tmp2);
                    data3.push(tmp3);
                    data4.push(tmp4);

                    this.tableData.push({
                        col0:this.curYear + '-' + Mock.Random.datetime('MM-dd'),
                        col1:tmp1,
                        col2:tmp2,
                        col3:tmp3,
                        col4:tmp4
                    });
                }

                let chart = new Highcharts.Chart(this.$refs.chart,
                    {
                        chart:{
                            type:'spline'
                        },
                        credits: {
                            enabled: false//不显示LOGO
                        },
                        title: {
                            text: '流量过程线'
                        },
                        yAxis: {
                            title: {
                                text: '流量(m³/s)'
                            }
                        },
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'top'
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.y}m³/s</b>'
                        },
                        plotOptions: {
                            series: {
                                label: {
                                    connectorAllowed: false
                                },
                                pointStart: Date.UTC(this.curYear, 6, 8), // 开始值
                                pointInterval: 5 * 24 * 3600 * 1000,// 间隔一天,
                                marker:{
                                    enabled:false
                                }
                            }
                        },
                        xAxis: {
                            type: 'datetime',
                            dateTimeLabelFormats: {
                                day: '%Y-%m-%d'
                            },
                            tickInterval:1
                        },
                        series: [{
                            name: '龙羊峡入库',
                            data: data1
                        }, {
                            name: '刘家峡入库',
                            data: data2
                        }, {
                            name: '龙刘区间',
                            data: data3
                        }, {
                            name: '刘兰区间',
                            data: data4
                        }]
                    }
                );

            },
            onBtnClick:function () {
                this.initChart();
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

    .highcharts-container {
        width: 95%;
        height: 100%;
    }
</style>
