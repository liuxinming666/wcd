<template>
    <div>
        <Layout>
            <LayoutPanel region="north" style="height:50px;">
                <div>
                    <div style="margin-left: 15px;margin-top: 5px;float: left;">
                        行政区域选择:
                        <el-select class="sel" style="width: 150px;" v-model="curCity" placeholder="选择市(洲)">
                            <el-option
                                    v-for="item in citys"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                        &nbsp;&nbsp;
                        <el-select class="sel" style="width: 150px;" v-model="curCounty" placeholder="选择区(县)">
                            <el-option
                                    v-for="item in county"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                        &nbsp;&nbsp;
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
                <div ref="chart" class="highcharts-container"></div>
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
        name: "szylyl",
        data(){
            return {
                chart: null,
                citys:['兰州市','嘉峪关市','金昌市','白银市','天水市','武威市','张掖市','平凉市','酒泉市','庆阳市','定西市','陇南市','临夏回族自治州','甘南藏族自治州'],
                curCity:'兰州市',
                county:[],
                curCounty:'',
                yearsData:[2020,2019,2018,2017,2016,2015,2014,2013],
                curYear:'2019'
            }
        },
        mounted:function () {
            this.initCounty();

            this.onBtnClick();
        },
        watch:{
            curCity(val){
                this.initCounty();
            }
        },
        methods:{
            initCounty:function () {
                let Mock = require('mockjs');
                let length = 5 + Mock.Random.integer(5, 13);
                this.county = [];
                for(let i = 0;i<length;i++){
                    this.county.push(Mock.Random.county());
                }
                this.curCounty = this.county[0];
            },
            onBtnClick:function () {
                this.chart = new Highcharts.Chart(this.$refs.chart,{
                    chart: {
                        type: 'column'
                    },
                    credits:{
                        enabled: false
                    },
                    title: {
                        text: '水资源用水效率'
                    },
                    xAxis: {
                        categories: [
                            '一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'
                        ],
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: '利用率 (%)'
                        }
                    },
                    tooltip: {
                        // head + 每个 point + footer 拼接成完整的 table
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            borderWidth: 0
                        }
                    },
                    series: [{
                        name: '水资源利用率',
                        data: [0.9, 0.5, 0.4, 0.2, 0.5, 0.7, 0.6, 0.5, 0.4, 0.1, 0.6, 0.4]
                    }]
                });
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
