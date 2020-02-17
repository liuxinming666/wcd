<template>
    <div>
        <Tabs style="color: red;" :headerHeight="20">
            <TabPanel :title="'图表'">
                <template slot="header">
                    <div>
                        <p style="font-size: small;">图表</p>
                    </div>
                </template>
                <div>
                    <div ref="chart" class="highcharts-container">
                    </div>
                </div>
            </TabPanel>
            <TabPanel :title="'表格'">
                <template slot="header">
                    <div>
                        <p style="font-size: small;">表格</p>
                    </div>
                </template>
                <div>
                    <el-table
                            :data="tableData"
                            :height="296"
                            border
                            style="width: 100%">
                        <el-table-column
                                type="index"
                                width="40">
                        </el-table-column>
                        <el-table-column
                                prop="col1"
                                label="时间">
                        </el-table-column>
                        <el-table-column
                                prop="col3"
                                label="水位(m)">
                        </el-table-column>
                        <el-table-column
                                prop="col2"
                                label="流量(m³/s)">
                        </el-table-column>
                    </el-table>
                </div>
            </TabPanel>
        </Tabs>
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
        name: "sqyj",
        data(){
            return{
                categories:[],
                data:[],
                tableData:[]
            }
        },
        mounted:function () {
            let Mock = require('mockjs');

            this.categories = [];
            this.data = [];
            this.tableData = [];
            for(let i=0;i<12;i++){
                this.categories.push((i + 8) + ':00');
                this.data.push(3000 + Math.random() * 2000);

            }

            this.data[11] = 5000.27;

            for(let i=0;i<this.data.length;i++){
                this.tableData.push({
                    col1:this.categories[i],
                    col2:this.data[i].toFixed(2),
                    col3:(Math.random() * 100).toFixed(2)
                });
            }

            let chart = new Highcharts.Chart(this.$refs.chart,{
                chart: {
                    type: 'line',
                    height:296,
                    width:450
                },
                credits:{
                    enabled: false
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: this.categories,
                    crosshair: true
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },
                tooltip: {
                    // head + 每个 point + footer 拼接成完整的 table
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.2f}m³/s</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        borderWidth: 0
                    },
                    series: {
                        colorByPoint: true
                    }
                },
                series: [{
                    name: '流量',
                    data: this.data,
                    showInLegend: false
                }]
            });
        }
    }
</script>

<style scoped>

</style>