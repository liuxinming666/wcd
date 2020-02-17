<template>
    <div style="width: 100%;height: 100%;">
        <Layout style="width: 100%;height: 100%;">
            <LayoutPanel region="east" title="工具栏" collapsible="true"
                         expander="true" collapsed="true" collapsedSize="20"
                         style="width:200px;">
                <Accordion style="height:200px">
                    <AccordionPanel :title="'模式选择'">
                        <div>
                            <label><input id="rbEChart" @click="onFrameModeSetChange('1')"
                                          name="setFrameMode" type="radio" value="1" checked />极速模式</label>
                            <label><input id="rbTensorflow" @click="onFrameModeSetChange('2')"
                                          name="setFrameMode" type="radio" value="2" />普通模式</label>
                        </div>
                    </AccordionPanel>
                    <AccordionPanel :title="'拟合方法'">
                        <div>
                            <label><input name="setRadio" @click="onModeSetChange('5');" type="radio" value="5" />线&nbsp;&nbsp;&nbsp;性</label>&nbsp;&nbsp;
                            <label><input name="setRadio" @click="onModeSetChange('1');" type="radio" value="1" checked />二项式</label>
                        </div>
                        <div>
                            <label><input name="setRadio" @click="onModeSetChange('6');" type="radio" value="6" />三项式</label>&nbsp;&nbsp;
                            <label><input name="setRadio" @click="onModeSetChange('7');" type="radio" value="7" />四项式</label>
                        </div>
                        <div>
                            <label><input name="setRadio" @click="onModeSetChange('2');" type="radio" value="2" />对&nbsp;&nbsp;&nbsp;数</label>&nbsp;&nbsp;
                            <label><input name="setRadio" @click="onModeSetChange('3');" type="radio" value="3" />指&nbsp;&nbsp;&nbsp;数</label>
                        </div>
                        <div>
                            <label id="labelMi" style="display:none;"><input name="setRadio" onchange="onModeSetChange(this);" type="radio" value="4" />幂</label>
                        </div>
                        <div>
                            <label><input id="chkIsRope" onchange="onChkIsRopeChange(this);" type="checkbox" />&nbsp;是否考虑绳套</label>
                        </div>
                    </AccordionPanel>
                    <AccordionPanel :title="'图表设置'">
                        <p>Content3</p>
                    </AccordionPanel>
                </Accordion>
            </LayoutPanel>
            <LayoutPanel region="center" style="height:100%">
                <div ref="chart" class="highcharts-container">
                </div>
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
        name: "zqrl-set",
        props:{
            stcd:"",
            stnm:"",
            parWnd:{}
        },
        data(){
            return {
                chart: null,
                g_threeLineData:null,//实测点数据集
                sTypeMode:'1',//模式选择，默认极速模式
                g_lineModeSet:'1',//拟合方法选择，默认二项式
                g_xMaxTrain:0,   //训练数据X的最大值
                g_yMaxTrain:0,   //训练数据Y的最大值
                g_xMinTrain:0,    //训练数据X的最小值
                g_yMinTrain:0,    //训练数据Y的最小值
                //模型变量设置
                a:tf.variable(tf.scalar(Math.random())),
                b:tf.variable(tf.scalar(Math.random())),
                c:tf.variable(tf.scalar(Math.random())),
                d:tf.variable(tf.scalar(Math.random())),
                e:tf.variable(tf.scalar(Math.random())),
                aECStat:tf.variable(tf.scalar(Math.random())),
                bECStat:tf.variable(tf.scalar(Math.random())),
                cECStat:tf.variable(tf.scalar(Math.random())),
                dECStat:tf.variable(tf.scalar(Math.random())),
                eECStat:tf.variable(tf.scalar(Math.random())),
            }
        },
        mounted:function () {
            this.initData();
            //this.setChartData();
        },
        methods:{
            //根据测站编码获取实测点数据
            initData:function() {
                let params = {
                    params:{
                        stcd: this.stcd
                    }
                };
                this.axios.get('/api/getMeasurDataByStcd',params)
                    .then(res => {
                        // 成功回调
                        let data = res.data;
                        this.g_threeLineData = res.data;
                        let length = data.length;

                        let meaPtData = new Array();
                        for (let i=0;i<length;i++){
                            meaPtData.push({x:parseFloat(data[i].q),y:parseFloat(data[i].z)});
                        }

                        let series = new Array();
                        series.push({type:"scatter",name:"实测点",data:meaPtData});

                        this.setChartData(series);
                    }, res => {
                        debugger;
                        // 错误回调
                    });
            },
            //初始化图表
            setChartData:function (series) {
                let options = {
                    title: {
                        text: this.stnm + '水位流量关系曲线'                 // 标题
                    },
                    credits:{
                        enabled: false
                    },
                    tooltip:{
                        formatter:function () {
                            return "<b>水位:</b><b>" + this.y + "</b><br/><b>流量:</b><b>" + this.x + "</b>";
                        }  
                    },
                    xAxis: {
                        title:{
                            text:"流量(m³/s)"
                        },
                        gridLineWidth:1
                    },
                    yAxis: {
                        title: {
                            text: '水位(m)'                // y 轴标题
                        },
                        gridLineWidth:1
                    },
                    series: series
                };
                this.chart = new Highcharts.Chart(this.$refs.chart,options);

                this.fitLineECStat();
            },
            //图表重适应容器大小
            reflowChart:function () {
                debugger;
                this.chart.reflow();
            },
            //模式选择单选框
            onFrameModeSetChange:function (sType) {
                this.shippingType = sType;
                if(sType == '1')
                {
                    //alert('极速模式');
                    this.fitLineECStat();
                }
                else {
                    alert('普通模式');
                }
            },
            //拟合方法选择单选框
            onModeSetChange:function (sType) {
                this.g_lineModeSet = sType;
            },
            //拟合线,利用ecStat
            fitLineECStat:async function() {
                let trainData = this.processTrainDataECStat();
                let xAry = trainData['xNor'].dataSync();
                let yAry = trainData['yNor'].dataSync();

                let length = (trainData['xNor'].dataSync()).length;
                let logicData = new Array();

                for (var i = 0; i < length; i++) {
                    logicData.push([parseFloat(xAry[i]), parseFloat(yAry[i])]);
                }

                //相当于参数训练
                let myRegression;
                switch (this.g_lineModeSet) {
                    case '1'://二项式
                        myRegression = ecStat.regression('polynomial', logicData, 2);
                        this.aECStat = tf.scalar(myRegression.parameter[2], 'float32');
                        this.bECStat = tf.scalar(myRegression.parameter[1], 'float32');
                        this.cECStat = tf.scalar(myRegression.parameter[0], 'float32');
                        break;
                    case '6'://三项式
                        myRegression = ecStat.regression('polynomial', logicData, 3);
                        this.aECStat = tf.scalar(myRegression.parameter[3], 'float32');
                        this.bECStat = tf.scalar(myRegression.parameter[2], 'float32');
                        this.cECStat = tf.scalar(myRegression.parameter[1], 'float32');
                        this.dECStat = tf.scalar(myRegression.parameter[0], 'float32');
                        break;
                    case '7'://四项式
                        myRegression = ecStat.regression('polynomial', logicData, 4);
                        this.aECStat = tf.scalar(myRegression.parameter[4], 'float32');
                        this.bECStat = tf.scalar(myRegression.parameter[3], 'float32');
                        this.cECStat = tf.scalar(myRegression.parameter[2], 'float32');
                        this.dECStat = tf.scalar(myRegression.parameter[1], 'float32');
                        this.eECStat = tf.scalar(myRegression.parameter[0], 'float32');
                        break;
                    case '2'://对数
                        myRegression = ecStat.regression('logarithmic', logicData);
                        this.aECStat = tf.scalar(myRegression.parameter['gradient'], 'float32');
                        this.bECStat = tf.scalar(myRegression.parameter['intercept'], 'float32');
                        break;
                    case '3'://指数
                        myRegression = ecStat.regression('exponential', logicData);
                        this.aECStat = tf.scalar(myRegression.parameter['coefficient'], 'float32');
                        this.bECStat = tf.scalar(myRegression.parameter['index'], 'float32');
                        this.cECStat = tf.scalar(0);
                        break;
                    case '4'://幂
                        myRegression = ecStat.regression('polynomial', logicData, 2);
                        this.aECStat = tf.scalar(myRegression.parameter[2], 'float32');
                        this.bECStat = tf.scalar(myRegression.parameter[1], 'float32');
                        this.cECStat = tf.scalar(myRegression.parameter[0], 'float32');
                        break;
                    case '5'://线性
                        myRegression = ecStat.regression('linear', logicData);
                        this.aECStat = tf.scalar(myRegression.parameter['gradient'], 'float32');
                        this.bECStat = tf.scalar(myRegression.parameter['intercept'], 'float32');
                        break;
                }
                debugger;
                /*var xData = generateXData(15);
                var yPre = predictECStat(xData);

                var realData = processPredictData(xData, yPre);
                var xReal = realData['xReal'];
                var yReal = realData['yReal'];
                var xRealAry = xReal.dataSync();
                var yRealAry = yReal.dataSync();

                var sShow = myRegression.expression;
                sShow = sShow.replace(/x/g, 'h');
                sShow = sShow.replace(/y/g, 'q');

                //显示公式
                //$("#spanFormula").html(sShow);

                var data = g_threeLineData.rows;
                var length = g_threeLineData.total;

                var serAry = new Array();   //数据数组
                var gridDataAry = new Array();

                var dataMeaTmp = new Array();
                var dataMeaStyleTmp = new Array();  //数据点带样式
                var dataLineTmp = new Array();  //拟合的曲线
                for (var i = 0; i < length; i++) {
                    //实测点数据
                    var zqMeaTmp = new Array();
                    zqMeaTmp.push(parseFloat(data[i].Q))
                    zqMeaTmp.push(parseFloat(data[i].Z))
                    dataMeaTmp.push(zqMeaTmp);

                    var sColor;
                    if ($("#chkIsRope").prop("checked") == false) {
                        sColor = 'rgba(0, 0, 256, 0.5)';
                    }
                    else {//涨
                        if (data[i].WPTN == '5') {
                            sColor = 'rgba(256, 0, 0, 0.5)';
                        }//洛
                        else if (data[i].WPTN == '4') {
                            sColor = 'rgba(0, 256, 0, 0.5)';
                        }//平
                        else if (data[i].WPTN == '6') {
                            sColor = 'rgba(0, 0, 256, 0.5)';
                        }
                    }

                    dataMeaStyleTmp.push({ name: data[i].WPTN, value: zqMeaTmp, itemStyle: { color: sColor } });
                    //gridDataAry.push({ 'coluZ': data[i].Z, 'coluForeQ': parseFloat(yReal.dataSync()[i]).toFixed(2), 'coluMeaQ': parseFloat(data[i].Q) });
                }
                g_aryMeaPtData = dataMeaTmp;

                length = xRealAry.length;
                for (var i = 0; i < length; i++) {
                    //拟合的曲线数据
                    var zqSimTmp = new Array();
                    //zqSimTmp.push(parseFloat(parseFloat(yRealAry[i]).toFixed(2)));
                    //zqSimTmp.push(parseFloat(parseFloat(xRealAry[i]).toFixed(2)));
                    zqSimTmp.push(parseFloat(yRealAry[i]));
                    zqSimTmp.push(parseFloat(xRealAry[i]));
                    dataLineTmp.push(zqSimTmp);

                    gridDataAry.push({ 'coluZ': parseFloat(parseFloat(xRealAry[i]).toFixed(2)), 'coluForeQ': parseFloat(parseFloat(yRealAry[i]).toFixed(2)) });
                }

                var objMea = {
                    id: 'meaPt',
                    name: '实测点',
                    type: 'scatter',
                    data: dataMeaStyleTmp,
                    itemStyle: {
                        color: 'rgba(0, 0, 256, 0.5)'
                    }
                };

                //if ($("#chkIsRope").prop("checked") == false) {
                //    objMea.itemStyle = { color: 'rgba(0, 0, 256, 0.5)' };
                //}


                var objLine = {
                    name: '预测曲线',
                    id: 'simLine',
                    type: 'line',
                    data: dataLineTmp,
                    //data: lossAry,
                    symbolSize: symbolSize,
                    showSymbol: true,
                    smooth: true,
                };
                g_arySimLineData = dataLineTmp;

                var hisLine = {
                    name: '历史曲线',
                    id: 'hisLine',
                    type: 'line',
                    data: [],
                    //data: lossAry,
                    symbolSize: symbolSize,
                    showSymbol: false,
                    smooth: true,
                };

                serAry.push(objLine);
                serAry.push(hisLine);
                serAry.push(objMea);

                $('#wPro').window('close');

                SetZqrlSimChartData(serAry);
                if ($("#chkIsRope").prop("checked") == true) {
                    fitAgain();
                }

                ShowTable(gridDataAry, g_stnm);*/
            },
            //生成训练的数据，特征缩放，根据ECStat的特性进行定制
            processTrainDataECStat:function() {
                let data = this.g_threeLineData;
                let length = this.g_threeLineData.length;
                var xAry = new Array();
                var yAry = new Array();
                for (var i = 0; i < length; i++) {
                    xAry.push(data[i].z)
                    yAry.push(data[i].q)
                }

                let xs = tf.tensor2d(xAry, [length, 1]);
                let ys = tf.tensor2d(yAry, [length, 1]);

                //计算X,Y的最大值和最小值
                this.g_xMaxTrain = xs.max();   //训练数据X的最大值
                this.g_yMaxTrain = ys.max();   //训练数据Y的最大值
                this.g_xMinTrain = xs.min();    //训练数据X的最小值
                this.g_xMinTrain = tf.sub(this.g_xMinTrain, tf.scalar(0.001, 'float32'));
                this.g_yMinTrain = ys.min();    //训练数据Y的最小值
                this.g_yMinTrain = tf.sub(this.g_yMinTrain, tf.scalar(0.001, 'float32'));

                //X,Y标准化,特征缩放
                let xNor = tf.div(xs.sub(this.g_xMinTrain), this.g_xMaxTrain.sub(this.g_xMinTrain)); //tf.div(xs.sub(g_xMeanTrain), g_xStdTrain); //tf.batchNormalization(xs, g_xMeanTrain, xVar);
                let yNor = tf.div(ys.sub(this.g_yMinTrain), this.g_yMaxTrain.sub(this.g_yMinTrain));//tf.div(ys.sub(g_yMeanTrain), g_yStdTrain);
                return { 'xNor': xNor, 'yNor': yNor };
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