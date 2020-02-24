<template>
    <div>
        <div v-if="bShow">
            <div style="margin: 10px; width: 500px;">
                <span style="text-align: center;">调度方案数据准备状态</span>
                <el-steps :active="2" align-center>
                    <el-step title="已完成" description="设计洪水过程选取"></el-step>
                    <el-step title="已完成" description="调度方案设定"></el-step>
                </el-steps>
            </div>
            <div style="margin: 20px;">
                <span>方案名称:</span>&nbsp;&nbsp;
                <el-input v-model="inputName" style="width: 150px;" placeholder="方案名称"></el-input>
                <br/>
            </div>
            <div style="margin-top: 20px;margin-left: 50px;">
                <span>备注:</span>&nbsp;&nbsp;
                <el-input
                        type="textarea"
                        v-model="inputContent"
                        style="width: 450px;"
                        :rows="5"
                        placeholder="备注"></el-input>
            </div>
            <div style="margin-top: 50px;margin-left: 50px;">
                <el-button icon="el-icon-search" @click="onBtnClick" type="primary">计算</el-button>
            </div>
        </div>
        <div v-show="!bShow">
            <div style="margin: 10px;">
                <el-row>
                    <el-col :span="2"><div>概要信息:</div></el-col>
                    <el-col :span="4"><div>方案名称:qj-1964-5</div></el-col>
                    <el-col :span="4"><div>生成人:管理员</div></el-col>
                    <el-col :span="6"><div>生成时间:{{curTime}}</div></el-col>
                    <el-col :span="8"><div>备注:{{inputContent}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="2"><div>设计洪水:</div></el-col>
                    <el-col :span="4"><div>洪水典型年:1964</div></el-col>
                    <el-col :span="4"><div>地区组成:同频率</div></el-col>
                    <el-col :span="6"><div>洪水重现期:5年一遇</div></el-col>
                    <el-col :span="8"><div></div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="2"><div>方案设定:</div></el-col>
                    <el-col :span="4"><div>龙羊峡起调水位:2594m</div></el-col>
                    <el-col :span="4"><div>龙羊峡汛限水位:2594m</div></el-col>
                    <el-col :span="4"><div>刘家峡起调水位:1726m</div></el-col>
                    <el-col :span="4"><div>刘家峡汛限水位:1726m</div></el-col>
                    <el-col :span="6"><div>宁蒙河段过流能力:5500m³/s</div></el-col>
                </el-row>
                <el-divider></el-divider>
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
                                    label="时段">
                            </el-table-column>
                            <el-table-column
                                    prop="col1"
                                    label="龙羊峡入库">
                            </el-table-column>
                            <el-table-column
                                    prop="col2"
                                    label="龙羊峡出库">
                            </el-table-column>
                            <el-table-column
                                    prop="col3"
                                    label="刘家峡入库">
                            </el-table-column>
                            <el-table-column
                                    prop="col4"
                                    label="刘家峡出库">
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </div>
        </div>
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
        name: "schemeCal",
        data(){
            return{
                inputName:"qj-1964-5",
                inputContent:"",
                bShow:true,
                curTime:'',
                tableData:[]
            }
        },
        mounted:function(){
            let Mock = require('mockjs');
            this.curTime = Mock.Random.now('yyyy-MM-dd HH:mm');
        },
        methods:{
            onBtnClick:function () {
                this.bShow = false;
                this.$message({
                    message: '计算完成',
                    type: 'success',
                    duration:1000
                });
                this.initChart();
            },
            initChart:function () {
                debugger;
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
                        col0:'1964-' + Mock.Random.datetime('MM-dd'),
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
                            text: '调度方案过程线'
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
                                pointStart: Date.UTC('1964', 6, 8), // 开始值
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
                            name: '龙羊峡出库',
                            data: data2
                        }, {
                            name: '刘家峡入库',
                            data: data3
                        }, {
                            name: '刘家峡出库',
                            data: data4
                        }]
                    }
                );

            },
        }
    }
</script>

<style scoped>
    .highcharts-container {
        width: 95%;
        height: 100%;
    }

    /deep/ .el-divider--horizontal{
        margin: 5px;
    }
</style>
