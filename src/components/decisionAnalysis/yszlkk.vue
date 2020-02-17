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
            <LayoutPanel region="center" style="height:100%">
                <el-tabs type="border-card">
                    <el-tab-pane label="柱状图">
                        <div>
                            <div ref="chart" class="highcharts-container">
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="数据表">
                        <div>
                            <el-table :data="tableData"
                                      :height="375"
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
                                        label="年度指标(亿m³)">
                                </el-table-column>
                                <el-table-column
                                        prop="col2"
                                        label="年累计用水量(亿m³)">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <!--<Layout v-bind:style="{width:fullWidth, height:fullHeight}">
                    <LayoutPanel :border="false" region="west" v-bind:style="{width:chartWidth}">
                        <div ref="chart1" class="highcharts-container">
                        </div>
                    </LayoutPanel>
                    <LayoutPanel :border="false" region="center" style="height:100%;width: 600px;">
                        <div>
                            <el-table :data="tableData"
                                      :span-method="objectSpanMethod"
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
                </Layout>-->
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
        name: "yszlkk",
        data(){
            return{
                value2:[],
                yearsData:[2020,2019,2018,2017,2016,2015,2014,2013],
                curYear:'2019',
                citys:['兰州市','嘉峪关市','金昌市','白银市','天水市','武威市','张掖市','平凉市','酒泉市','庆阳市','定西市','陇南市','临夏回族自治州','甘南藏族自治州'],
                data1:[],
                data2:[],
                tableData:[]
            }
        },
        mounted:function () {
            var now = new Date();
            var startDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())).toISOString().slice(0, 10);
            var endDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()+1)).toISOString().slice(0, 10);
            this.value2=[];
            this.value2.push(startDate);
            this.value2.push(endDate);

            this.onBtnClick();
        },
        methods:{
            onBtnClick:function () {
                this.data1 = [];
                this.data2 = [];
                let Mock = require('mockjs');
                for(let i=0;i<this.citys.length;i++){
                    let fTmp1 = Mock.Random.float( 2, 10, 2, 2 );
                    let fTmp2 = Mock.Random.float( 2, 12, 2, 2 );
                    this.data1.push(fTmp1);
                    this.data2.push(fTmp2);

                    this.tableData.push({
                        col0:this.citys[i],
                        col1:fTmp2,
                        col2:fTmp1
                    });
                }

                let chart = new Highcharts.Chart(this.$refs.chart,
                    {
                        chart: {
                            type: 'column',
                            height:375
                        },
                        credits: {
                            enabled: false//不显示LOGO
                        },
                        title: {
                            text: '用水总量考核'
                        },
                        xAxis: {
                            categories: this.citys
                        },
                        yAxis: [{
                            title: {
                                text: '亿(m³)'
                            }
                        }],
                        legend: {
                            shadow: false
                        },
                        tooltip: {
                            shared: true
                        },
                        plotOptions: {
                            column: {
                                grouping: false,
                                shadow: false,
                                borderWidth: 0
                            }
                        },
                        series: [{
                            name: '年累计用水量',
                            color: 'rgba(165,170,217,1)',
                            data: this.data1,
                            pointPadding: 0.3 // 通过 pointPadding 和 pointPlacement 控制柱子位置

                        }, {
                            name: '年度指标值',
                            color: 'rgba(255,0,0,.9)',
                            data: this.data2,
                            pointPadding: 0.4
                        }]
                    }
                );
            }
        }
    }
</script>

<style scoped>
    .sel /deep/ .el-input__inner{
        height: 30px;
    }
    .highcharts-container {
        width: 95%;
        height: 100%;
    }
</style>
