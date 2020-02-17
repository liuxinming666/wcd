<template>
    <div>
        <Layout :style="{width:fullWidth,height:fullHeight}">
            <LayoutPanel region="north" style="height:50px;">
                <div>
                    <div style="margin-left: 15px;margin-top: 5px;float: left;">
                        年份选择:
                        <el-select class="sel" style="width: 150px;" v-model="curYear" placeholder="选择年份">
                            <el-option
                                    v-for="item in yearsData"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                        &nbsp;&nbsp;
                        <el-button icon="el-icon-search" @click="onBtnClick" type="primary">查询</el-button>
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
        name: "szyzlfb",
        data(){
            return{
                fullWidth:(document.documentElement.clientWidth - 205) + 'px',
                fullHeight:(document.documentElement.clientHeight - 100) + 'px',
                chartWidth:(document.documentElement.clientWidth * 0.3) + 'px',
                tableHeight:document.documentElement.clientHeight - 150,
                tableWidth:document.documentElement.clientWidth * 0.5,
                tableData:[],
                nShowType:1,
                tabVale:'',
                yearsData:[2020,2019,2018,2017,2016,2015,2014,2013],
                curYear:'2019',
                citys:['兰州市','嘉峪关市','金昌市','白银市','天水市','武威市','张掖市','平凉市','酒泉市','庆阳市','定西市','陇南市','临夏回族自治州','甘南藏族自治州'],
            }
        },
        mounted:function () {
            this.onBtnClick();
        },
        methods:{
            onBtnClick:function () {
                let Mock = require('mockjs');
                let data = [];
                this.tableData = [];
                for(let i=0;i<this.citys.length;i++){
                    let valTmp = Mock.Random.float( 2, 10, 2, 2 );
                    data.push({
                        name: this.citys[i],
                        y: valTmp,
                    });

                    this.tableData.push({
                        col0:this.citys[i],
                        col1:(29797.6 * (valTmp / 100)).toFixed(2),
                        col2:valTmp.toFixed(2),
                    });
                }
                data[0].sliced = true;
                data[0].selected = true;

                let chart1 = new Highcharts.Chart(this.$refs.chart1,
                    {
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie',
                            height:375
                        },
                        credits: {
                            enabled: false//不显示LOGO
                        },
                        title: {
                            text: ''
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: false
                                },
                                showInLegend: true
                            }
                        },
                        series: [{
                            name: '占全省',
                            colorByPoint: true,
                            data: data
                        }]
                    });
                let chart2 = new Highcharts.Chart(this.$refs.chart2,
                    {
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie',
                            height:375
                        },
                        credits: {
                            enabled: false//不显示LOGO
                        },
                        title: {
                            text: ''
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: false
                                },
                                showInLegend: true
                            }
                        },
                        series: [{
                            name: '占全省',
                            colorByPoint: true,
                            data: data
                        }]
                    });
            }
        },
        watch:{
            tabVale(val){
                this.nShowType = val;
            }
        }
    }
</script>

<style scoped>
    .highcharts-container {
        width: 95%;
        height: 100%;
    }
</style>
