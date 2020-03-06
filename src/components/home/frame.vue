<template>
    <div>
        <Layout v-bind:style="{width:fullWidth, height:fullHeight}">
            <LayoutPanel region="north" style="height:70px;">
                <top :curUser="curUser" @changeLeft="changeLeft"
                     @monitWaring="monitWaring"
                     @floodAnaly="floodAnaly"
                     @contaAnaly="contaAnaly"></top>
            </LayoutPanel>
            <LayoutPanel region="west"
                         v-bind:split="true"
                         v-bind:bodyStyle="{padding:'0px'}"
                         v-bind:panelStyle="{width: lefComponentWidth + 'px',minWidth:'0px'}">
                <component :is="curLeftComponent"
                           ref="leftComponent"
                           :menuData="leftMenuData"
                           @changeCenter="changeCenter"
                           @changeLeft="changeLeft"></component>
            </LayoutPanel>
            <LayoutPanel region="center" style="height: 100%">
                <componet :is="curCenterComponent" v-show="!bShowMap"></componet>
                <div id="cesiumContainer" @mousemove="onCesiumMouseMove" v-show="bShowMap">
                    <div id="main" v-show="bShowFloodEvo"
                         style="height: 250px;width: 500px;position: absolute;z-index: 1;margin: 0px;">
                    </div>
                    <img ref="imgGif" v-show="bGifShow"
                         style="position: absolute;
                         z-index: 1;top: -20px;left: -20px;"
                         src="/images/warn/red.gif">
                    <el-button v-show="bShowFloodAnaly" @click="onHomeBtnClick"
                               type="success"
                               icon="el-icon-map-location"
                               class="location-bar no-print" style="right:10px;top:5px;">回到初始视角</el-button>
                    <div v-show="bShowFloodAnaly" class="location-bar no-print" style="left: 2px; top: 50px;">
                        涉及乡镇(个)：{{flood1}}<br/>
                        漫滩水深(米)：{{flood2}}<br/>
                        淹没滩地(亩)：{{flood3}}<br/>
                        淹没耕地(亩)：{{flood4}}<br/>
                        进水村庄(个)：{{flood5}}<br/>
                    </div>
                    <!--<div v-show="bShowFloodAnaly" class="location-bar no-print" style="left: 300px; bottom: 10px; width: 600px;display: inline-block;">
                        <div style="display: inline-block;width: 350px;">
                            控制站水位:
                            <el-slider
                                    v-model="sliderValue"
                                    show-input>
                            </el-slider>
                        </div>
                        <div style="display: inline-block;width: 150px;position:absolute;left:380px;bottom: 5px;">
                            流量:<br/>
                            <el-input
                                    style="width: 100px;"
                                    placeholder="请输入内容"
                                    v-model="input"
                                    :disabled="true">
                            </el-input>
                        </div>
                    </div>-->
                </div>
                <div class="btn-toolbar no-print" v-show="bShowMap">
                    <div id="toolbar" class="btn-group"
                         style="margin: 5px 5px 5px 8px;">
                        <a data-toggle="dropdown" title="图层管理" @click="onClickLayerMan"
                           class="btn btn-inverse widget-btn">
                            <span class="fa fa-tasks"></span>
                        </a>
                    </div>
                </div>
                <div ref="tooltipView" id="tooltip-view"
                     :style="{transform:'translate3d(' + toolTipLeft + ',' + toolTipTop + ',0)' }"
                     class="cesium-popup" v-show="bShowTooltip">
                    <div class="cesium-popup-content-wrapper  cesium-popup-background">
                        <div id="tooltip-content" class="cesium-popup-content cesium-popup-color">
                            <div style="margin: 5px;" v-for="(item,index) in toolTipContent">
                                {{item}}
                            </div>
                        </div>
                    </div>
                    <div class="cesium-popup-tip-container">
                        <div class="cesium-popup-tip  cesium-popup-background">
                        </div>
                    </div>
                </div>
                <div ref="divLayer" id="divLayer" v-show="bShowLayerDiv"
                     style="z-index: 19891015; width: 200px; height: 562px;top: 70px; left: 5px;"
                     class="layui-layer layui-layer-iframe layui-layer-border layer-mars-dialog2">
                    <div class="layui-layer-title" style="cursor: move;"
                         @mousemove="onLayerDivMouseMove"
                         @mousedown="onLayerDivMouseDown"
                         @mouseup="onLayerDivMouseUp">
                        <table style="height: 100%; width: 180px; margin: 0px;">
                            <tr>
                                <td>
                                    图层管理
                                </td>
                                <td align="right">
                                    <img style="cursor: pointer;" @click="bShowLayerDiv=false" src="/Images/close1.png" />
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div id="" class="layui-layer-content" style="height: 430px; overflow: auto;">
                        <Tree :data="treeData"
                              :checkbox="true"
                              @nodeExpand="onTreeNodeExpand($event)"
                              @nodeClick="onTreeNodeClick($event)"
                              @checkChange="onTreeNodeChecked($event)"
                              @nodeUncheck="onTreeNodeUnChecked($event)">
                        </Tree>
                    </div>
                </div>
                <!--<el-tooltip class="item" effect="dark"
                            placement="top-start">
                    <div slot="content">
                        <div style="margin: 5px;" v-for="(item,index) in toolTipContent">
                            {{item}}
                        </div>
                    </div>
                    <div ref="tooltipView"
                         style="width: 30px;height: 30px;
                         margin-left: -15px;margin-top: -5px;"
                         :style="{
                         position: 'absolute',
                         top:toolTipTop,
                         left: toolTipLeft}">
                    </div>
                </el-tooltip>-->
                <Dialog ref="digWarning"
                        :title="'监测预警'"
                        :dialogStyle="{width:'230px',height:'450px',background: '#12346B',}"
                        :modal="false"
                        :closed="true"
                        :closable="false"
                        :borderType="'thin'"
                        :draggable="true"
                        :resizable="true">
                    <div slot="header" style="color: #9EA5DE">监测预警</div>
                    <div>
                        <el-tabs type="border-card">
                            <el-tab-pane label="雨情">
                                <div>
                                    <div v-for="(item,index) in rainWarningData" style="cursor: pointer;" @click="flyToPos(item.pos)">
                                        <table>
                                            <tr>
                                                <td rowspan="2"><img src="/images/warn/rw.gif"></td>
                                                <td>{{item.stnm}}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: red">{{'1小时雨量:' + item.value + 'mm'}}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="水情">
                                <div>
                                    <div v-for="(item,index) in waterWarningData" style="cursor: pointer;" @click="flyToPos(item.pos)">
                                        <table>
                                            <tr>
                                                <td rowspan="2"><img src="/images/warn/ww.gif"></td>
                                                <td>{{item.stnm}}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: red">{{'流量:' + item.value + 'm³/s'}}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="旱情">
                                <div>
                                    <div v-for="(item,index) in dryWarningData" style="cursor: pointer;" @click="flyToPos(item.pos)">
                                        <table>
                                            <tr>
                                                <td rowspan="2"><img src="/images/warn/dw.gif"></td>
                                                <td>{{item.stnm}}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: red">{{'(0-20cm土壤湿度:)' + item.value}}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="水资源">水资源预警</el-tab-pane>
                            <el-tab-pane label="险情">险情预警</el-tab-pane>
                        </el-tabs>
                    </div>
                </Dialog>
                <Dialog ref="stationInfo"
                        :dialogStyle="{width:'450px',height:'350px',background: '#12346B',}"
                        :modal="false"
                        :closed="true"
                        :closable="true"
                        :borderType="'thin'"
                        :draggable="true"
                        :resizable="true">
                    <div slot="header" style="color: #9EA5DE">{{stationInfoWndTitle}}</div>
                    <div>
                        <componet :is="curStationInfoComponent"></componet>
                    </div>
                </Dialog>
            </LayoutPanel>
        </Layout>
    </div>
</template>

<script>
    //import Cesium from "cesium/Cesium";
    //import widget from "cesium/Widgets/widgets.css";
    import Top from "./top";
    import Left from "./left";
    var echarts = require('echarts');

    var g_viewer = null;

    export default {
        name: "frame",
        components: {
            Left,
            Top},
        data(){
            return{
                fullWidth:document.documentElement.clientWidth + 'px',
                fullHeight:document.documentElement.clientHeight + 'px',
                bShowMap:true,
                bShowTooltip:false,     //是否显示tooltip框
                toolTipTop:'0px',       //提示框位置X
                toolTipLeft:'0px',
                toolTipContent:[],      //提示框的显示内容
                bShowLayerDiv:false,    //图层窗口当前是否显示
                bLayerDivDown:false,    //图层窗口当前鼠标是否是按下
                treeData:[
                    {
                        id:'engiData',
                        text:'水利工程',
                        state: 'closed'
                    },
                    {
                        id:'videoData',
                        text:'视频监控',
                        state:'closed'
                    }
                ],  //树数据
                g_divLayer_objX:0,
                g_divLayer_objY:0,
                g_divLayer_mouseX:0,
                g_divLayer_mouseY:0,
                stationInfoWndTitle:'',
                curStationInfoComponent:{},
                curUser:"",
                curLeftComponent:{},        //当前左侧的组件
                lefComponentWidth:'200',    //当前左侧组件的宽度
                curCenterComponent:{},      //当前中间的组件
                leftMenuData:[],     //左侧菜单数据
                curActiveIndex:'',
                dataSourceEngi:new Cesium.CustomDataSource('engiData'),
                dataSourceVideo:new Cesium.CustomDataSource('videoData'),
                rainWarningData:[],     //雨情预警数据
                dataSourceRW:new Cesium.CustomDataSource('RW'),     //雨情预警ds
                waterWarningData:[],    //水情预警数据
                dataSourceWW:new Cesium.CustomDataSource('WW'),     //水情预警ds
                dryWarningData:[],    //旱情预警数据
                dataSourceDW:new Cesium.CustomDataSource('DW'),     //旱情预警ds
                sliderValue:0,
                bShowFloodAnaly:false,
                randomTxt:'',    //随机字符串,
                //淹没分析用的相关变量
                polygonEntities:[],
                height_max:800,
                height_min:200,
                extrudedHeight:this.height_min,
                polygon_degrees:[
                    115.8784, 40.0198,
                    115.9473, 40.0381,
                    115.9614, 40.0073,
                    115.9042, 39.9912
                ],
                timer:null,
                speed: 20,
                flood1:1,
                flood2:0.3,
                flood3:3200,
                flood4:1900,
                flood5:1,
                //洪水演进所需的数据
                bShowFloodEvo:false,        //是否显示流量过程线
                bbox:[93.412690,32.596075,108.709382,42.793593],//生成数据的边界
                linePts:[ [ 105.95996122523042, 34.544616981388629 ], [ 105.9464612259049, 34.556016980998947 ], [ 105.94006122574501, 34.558316980943971 ], [ 105.91466122533535, 34.559316981193774 ], [ 105.90826122517547, 34.557816981268729 ], [ 105.86566122568507, 34.567116981163792 ], [ 105.86756122517045, 34.573916980884007 ], [ 105.87676122584998, 34.585116981163821 ], [ 105.85336122593986, 34.610116981113833 ], [ 105.84526122562511, 34.611716981153791 ], [ 105.83526122582498, 34.609516981323679 ], [ 105.83076122515047, 34.619316980893984 ], [ 105.82446122510549, 34.621616980839065 ], [ 105.79706122509555, 34.615816981368653 ], [ 105.78896122568005, 34.620316981143844 ], [ 105.77806122574503, 34.621916981183801 ], [ 105.7626612251355, 34.622016981298714 ], [ 105.7580612252454, 34.626516981073848 ], [ 105.75816122536031, 34.63631698064421 ], [ 105.75546122585496, 34.638616980589234 ], [ 105.74366122578499, 34.637916980684167 ], [ 105.73826122587491, 34.641716980554236 ], [ 105.73576122570006, 34.666616981288712 ], [ 105.71856122572007, 34.676416980859017 ], [ 105.68946122555519, 34.681116980864033 ], [ 105.68216122526042, 34.684216980829035 ], [ 105.66586122541526, 34.697116981263719 ], [ 105.64406122554516, 34.697916981283697 ], [ 105.63776122550024, 34.701016981248756 ], [ 105.62416122516049, 34.713816980669151 ], [ 105.61056122572006, 34.714616980689186 ], [ 105.5932612256251, 34.71251698097393 ], [ 105.56056122581998, 34.721616980639169 ], [ 105.54596122523043, 34.713416981108821 ], [ 105.53576122520042, 34.698416980958939 ], [ 105.52756122567007, 34.693216981278738 ], [ 105.52306122589493, 34.696216981128828 ], [ 105.51946122535531, 34.704516980774088 ], [ 105.51126122582497, 34.706016980699133 ], [ 105.49856122562011, 34.717416981208771 ], [ 105.49406122584497, 34.718116981113837 ], [ 105.49136122544024, 34.721916980983963 ], [ 105.47776122510049, 34.728016980799055 ], [ 105.47136122583998, 34.727316980893988 ], [ 105.47226122597488, 34.722016981098875 ], [ 105.46946122545523, 34.720516981173773 ], [ 105.45226122547524, 34.732616980689158 ], [ 105.44306122569509, 34.736016980998897 ], [ 105.42686122596484, 34.74101698134865 ], [ 105.38676122575004, 34.751616980938991 ], [ 105.37676122594991, 34.754716980903993 ], [ 105.35856122572005, 34.754716980903993 ], [ 105.34406122524541, 34.760016980699163 ], [ 105.3221612252604, 34.76161698073912 ], [ 105.30856122581997, 34.760916980834054 ], [ 105.2830612252954, 34.752616981188794 ], [ 105.24566122548521, 34.754216981228751 ], [ 105.23296122528041, 34.751216981378661 ], [ 105.22746122525541, 34.747516980724129 ], [ 105.21016122516045, 34.746016980799084 ], [ 105.19746122585497, 34.750516980574218 ], [ 105.18836122529035, 34.756616981288687 ], [ 105.18286122526541, 34.757716980754083 ], [ 105.16836122569009, 34.767116980764115 ], [ 105.13736122514047, 34.767916980784094 ], [ 105.12366122558518, 34.770916980634183 ], [ 105.09036122509053, 34.773216980579264 ], [ 105.08686122556514, 34.775916980983936 ], [ 105.08366122548523, 34.776216981328673 ], [ 105.05906122509555, 34.782316981143822 ], [ 105.04226122557515, 34.780416980759128 ], [ 105.03626122587491, 34.778516981273697 ], [ 105.01986122591489, 34.770216980729117 ], [ 105.01626122537533, 34.765016981048916 ], [ 104.9961612256601, 34.75371698065419 ], [ 104.96256122572004, 34.740916981233738 ], [ 104.93886122546525, 34.73481698051927 ], [ 104.90976122530037, 34.728816980819033 ], [ 104.88696122518047, 34.728016980799055 ], [ 104.88426122567506, 34.729516980724156 ], [ 104.87786122551523, 34.731016980649201 ], [ 104.86786122571505, 34.738516981173802 ], [ 104.85416122526038, 34.755816981268708 ], [ 104.84686122586493, 34.758816981118855 ], [ 104.83136122514048, 34.759616981138834 ], [ 104.82136122534035, 34.76861698068916 ], [ 104.82126122522544, 34.794216981328702 ], [ 104.81856122572003, 34.797916981083858 ], [ 104.80306122589491, 34.799416981008903 ], [ 104.78856122542027, 34.792616981288688 ], [ 104.76846122570504, 34.796316981043901 ], [ 104.75936122514048, 34.803116980764116 ], [ 104.75656122552022, 34.809116981363672 ], [ 104.75016122536033, 34.816616980988954 ], [ 104.73916122531034, 34.839916980784096 ], [ 104.74366122508553, 34.848216981328676 ], [ 104.72446122550519, 34.860216980729149 ], [ 104.71996122573006, 34.86771698125375 ], [ 104.71986122561515, 34.875216980879031 ], [ 104.72986122541528, 34.899316980694152 ], [ 104.72986122541528, 34.903816981368664 ], [ 104.73066122543526, 34.921916980584228 ], [ 104.71596122563011, 34.945216981278691 ], [ 104.70956122547022, 34.964016981298698 ], [ 104.70546122525542, 34.968216980729153 ], [ 104.70126122582496, 34.973816980869003 ], [ 104.69396122553019, 34.97681698071915 ], [ 104.67846122570506, 34.984216981128839 ], [ 104.6645612259199, 35.015016980549262 ], [ 104.65176122560013, 35.028616980889012 ], [ 104.59686122546526, 35.04871698060424 ], [ 104.59586122521546, 35.05171698135365 ], [ 104.5839612259299, 35.055416981108863 ], [ 104.54286122546523, 35.057516980824062 ], [ 104.5328612256651, 35.058216980729128 ], [ 104.51996122523042, 35.062716981403639 ], [ 104.46036122509054, 35.095616980539262 ], [ 104.4457612254003, 35.101516981023906 ], [ 104.42926122532538, 35.104516980873996 ], [ 104.40086122596489, 35.105116980664206 ], [ 104.39816122556016, 35.103516980624192 ], [ 104.36156122577, 35.101116980564257 ], [ 104.34516122580999, 35.104816981218733 ], [ 104.28726122582498, 35.136116981213775 ], [ 104.26436122559016, 35.141916980684186 ], [ 104.26066122583495, 35.144916980534276 ], [ 104.24236122549024, 35.146316981243729 ], [ 104.22586122541526, 35.141716981353682 ], [ 104.19586122511549, 35.125716980953939 ], [ 104.1796612253853, 35.106016980799097 ], [ 104.12426122557514, 35.064316980544277 ], [ 104.11806122564514, 35.047716981253757 ], [ 104.11266122573505, 35.042416980559267 ], [ 104.09986122541528, 35.040016981398651 ], [ 104.0879612252304, 35.042216981228762 ], [ 104.07616122516049, 35.037616981338658 ], [ 104.07256122552019, 35.032316980644168 ], [ 104.07476122535036, 34.998416981258742 ], [ 104.06686122526537, 34.968316980844065 ] ],      //随机生成线的坐标集合
                routePts:[],     //播放路径的坐标点集合
                polyPositions:null,     //当前路径的坐标点
                polyColor:null,      //当前线的颜色
                curRouteIndex:1,        //当前路径走到的点
                eChartsTitle:'',
                bGifShow:false,     //动图是否显示
            }
        },
        beforeMount:function(){
            this.curLeftComponent=() => import('@/components/floodControl/left');
            this.curCenterComponent=() => import('@/components/home/centerContent');
            //this.curStationInfoComponent=() => import('@/components/monitWarning/jksp');
        },
        mounted:function(){
            this.initMap();
            _.reverse(this.linePts);
        },
        methods:{
            //初始化地图
            initMap:function () {
                let viewerOption = {
                    /*imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
                        url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=3b6e1ded5e34e4a985ce9167106c62a0",
                        layer: "tdtBasicLayer",
                        style: "default",
                        format: "image/jpeg",
                        tileMatrixSetID: "GoogleMapsCompatible",
                        maximumLevel: 18
                    }),
                    terrainProvider:new Cesium.CesiumTerrainProvider({
                        url:"https://lab.earthsdk.com/terrain/577fd5b0ac1f11e99dbd8fd044883638",
                        requestVertexNormals: true,
                        requestWaterMask: true
                    }),*/
                    imageryProvider: new Cesium.UrlTemplateImageryProvider({
                        url: 'http://115.29.141.58:8098/MapData/china/{z}/{x}/{y}.png',
                        tilingScheme: new Cesium.WebMercatorTilingScheme(),
                        minimumLevel: 0,
                        maximumLevel: 8
                    }),
                    terrainProvider:new Cesium.CesiumTerrainProvider({
                        url: 'http://115.29.141.58:8098/MapData/hongshuiDEM',
                        requestVertexNormals: true,
                        requestWaterMask: true
                    }),
                    geocoder: true,
                    baseLayerPicker: false,
                    fullscreenButton: false,
                    homeButton: false,
                    infoBox: false,
                    selectionIndicator: false,
                    timeline: false,
                    navigationHelpButton: false,
                    navigationInstructionsInitiallyVisible: false,
                    animation: false,
                    sceneMode: Cesium.SceneMode.SCENE3D//SCENE2D
                };
                g_viewer = new Cesium.Viewer('cesiumContainer', viewerOption);

                //加载甘肃的影像
                g_viewer.imageryLayers.addImageryProvider(
                    new Cesium.UrlTemplateImageryProvider({
                        url: 'http://115.29.141.58:8098/MapData/gansu/{z}/{x}/{y}.png',
                        tilingScheme: new Cesium.WebMercatorTilingScheme(),
                        minimumLevel: 0,
                        maximumLevel: 11
                    }));

                //加载洪水淹没部分的影像
                g_viewer.imageryLayers.addImageryProvider(
                    new Cesium.UrlTemplateImageryProvider({
                        url: 'http://115.29.141.58:8098/MapData/hongshui/{z}/{x}/{y}.png',
                        tilingScheme: new Cesium.WebMercatorTilingScheme(),
                        minimumLevel: 0,
                        maximumLevel: 17
                    }));

                //加载高清影像
                /*g_viewer.imageryLayers.addImageryProvider(
                    new Cesium.UrlTemplateImageryProvider({
                        url: 'http://115.29.141.58:8098/MapData/gaoqing/{z}/{x}/{y}.png',
                        tilingScheme: new Cesium.WebMercatorTilingScheme(),
                        minimumLevel: 0,
                        maximumLevel: 22
                    }));*/

                //加载甘肃省界
                let bjDs = new Cesium.GeoJsonDataSource.load('/MapData/ShengJie_line.txt', {
                    stroke: Cesium.Color.HOTPINK,
                    fill: Cesium.Color.PINK,
                    strokeWidth: 1,
                    markerSymbol: '?'
                })
                g_viewer.dataSources.add(bjDs);

                //加载河流线
                let river3 = new Cesium.GeoJsonDataSource.load('/MapData/gs_river3.txt', {
                    stroke: new Cesium.Color(0, 0, 1, 0.5),
                    fill: new Cesium.Color(0, 0, 1, 0.5),
                    strokeWidth: 1,
                    markerSymbol: '?'
                })
                g_viewer.dataSources.add(river3);
                let river4 = new Cesium.GeoJsonDataSource.load('/MapData/gs_river4.txt', {
                    stroke: new Cesium.Color(0, 0, 1, 0.5),
                    fill: new Cesium.Color(0, 0, 1, 0.5),
                    strokeWidth: 1,
                    markerSymbol: '?'
                })
                g_viewer.dataSources.add(river4);
                let river5 = new Cesium.GeoJsonDataSource.load('/MapData/gs_river5.txt', {
                    stroke: new Cesium.Color(0, 0, 1, 0.5),
                    fill: new Cesium.Color(0, 0, 1, 0.5),
                    strokeWidth: 1,
                    markerSymbol: '?'
                })
                     g_viewer.dataSources.add(river5);

                g_viewer.clock.onTick.addEventListener(this.onCesiumTick);

                g_viewer.scene.globe.baseColor = Cesium.Color.BLACK;

                /*let rectangle = new Cesium.Rectangle(
                    Cesium.Math.toRadians(73.66),
                    Cesium.Math.toRadians(3.86),
                    Cesium.Math.toRadians(135.05),
                    Cesium.Math.toRadians(53.55));

                g_viewer.scene.camera.flyTo({destination: rectangle});*/

                g_viewer._cesiumWidget._creditContainer.style.display = "none";// 隐藏版权
            },
            //cesium自带的定时器事件
            onCesiumTick:function(){
                if(g_viewer.camera.pitch > -0.4 && this.bShowFloodAnaly){
                    g_viewer.camera.setView({
                        orientation: {
                            pitch : -0.4
                        }
                    });
                    //this.g_viewer.scene.screenSpaceCameraController.enableTilt = false;
                }
            },
            //树节点复选事件
            onTreeNodeChecked:function(event){
                if(event.length == 0){
                    return;
                }

                for(let i=0;i<event.length;i++){
                    if(!event[i].entity){
                        //组
                        this.onTreeNodeExpand(event[i]);
                    }
                    else{
                        event[i].entity.show = true;
                    }
                }
            },
            //树节点取消复选事件
            onTreeNodeUnChecked:function(event){
                if(!event.entity){
                    //组
                    for(let i=0;i<event.children.length;i++){
                        event.children[i].entity.show = false;
                    }
                    //g_viewer.dataSources.getByName(event.id)[0].show = false;
                }
                else {
                    //实体
                    event.entity.show = false;
                }
            },
            //展开树节点事件
            onTreeNodeExpand:function (event) {
                debugger;
                let node = event;
                if (!node.children){
                    let aryDS = g_viewer.dataSources.getByName(node.id);
                    let entities = aryDS[0].entities;
                    let nodeData = [];

                    for(let i = 0;i < entities.values.length;i++){
                        nodeData.push({
                            id:entities.values[i].label.text.getValue(),
                            text:entities.values[i].label.text.getValue(),
                            checkState:node.checkState,
                            entity:entities.values[i]
                        });
                        if(node.checkState == 'checked'){
                            entities.values[i].show = true;
                        }
                    }
                    this.$set(node, "children", nodeData);
                }
            },
            //点击树节点事件
            onTreeNodeClick:function(node){
                g_viewer.flyTo(node.entity);
            },
            //图层管理窗口上鼠标移动事件
            onLayerDivMouseMove:function(e){
                if(this.bLayerDivDown){
                    let x = e.clientX;
                    let y = e.clientY;
                    this.$refs.divLayer.style.left = parseInt(this.g_divLayer_objX) + parseInt(x) - parseInt(this.g_divLayer_mouseX) + "px";
                    this.$refs.divLayer.style.top = parseInt(this.g_divLayer_objY) + parseInt(y) - parseInt(this.g_divLayer_mouseY) + "px";
                }
            },
            //图层管理窗口上鼠标按下事件
            onLayerDivMouseDown:function(e){
                this.g_divLayer_objX = this.$refs.divLayer.offsetLeft;
                this.g_divLayer_objY = this.$refs.divLayer.offsetTop;
                this.g_divLayer_mouseX = e.clientX;
                this.g_divLayer_mouseY = e.clientY;
                this.bLayerDivDown = true;
            },
            //图层管理窗口上鼠标弹起事件
            onLayerDivMouseUp:function(e){
                if(this.bLayerDivDown){
                    let x = e.clientX;
                    let y = e.clientY;
                    this.$refs.divLayer.style.left = parseInt(this.g_divLayer_objX) + parseInt(x) - parseInt(this.g_divLayer_mouseX) + "px";
                    this.$refs.divLayer.style.top = parseInt(this.g_divLayer_objY) + parseInt(y) - parseInt(this.g_divLayer_mouseY) + "px";
                    this.bLayerDivDown = false;
                }
            },
            //点击图层管理按钮
            onClickLayerMan:function(){
                this.bShowLayerDiv = !this.bShowLayerDiv;
            },
            //地图上的鼠标移动事件
            onCesiumMouseMove:function(e){
                //屏幕坐标
                let screenPt = new Cesium.Cartesian2(e.clientX, e.clientY - 70);
                //世界坐标
                let carPt = g_viewer.scene.globe.pick(
                    g_viewer.camera.getPickRay(screenPt),
                    g_viewer.scene);
                let catG = g_viewer.scene.globe.ellipsoid.cartesianToCartographic(carPt);
                let xx = Cesium.Math.toDegrees(catG.longitude);
                let yy = Cesium.Math.toDegrees(catG.latitude);
                let hh = catG.height;

                this.bShowTooltip = false;

                // Pick a new feature
                let pickedFeature = g_viewer.scene.pick(screenPt);
                if (!Cesium.defined(pickedFeature)) {
                    //clickHandler(movement);
                    return;
                }
                else{
                    if (pickedFeature instanceof Cesium.Cesium3DTileFeature) {
                        //var propertyNames = feature.getPropertyNames();
                    }
                    else{
                        //alert('有对象');
                        if(pickedFeature.id.description.getValue())
                        {
                            if(pickedFeature.id.description.getValue().indexOf('预警') != -1){
                                this.bShowTooltip = false;
                                /*let divX = e.clientX;//- this.$refs.tooltipView.offsetWidth / 2;
                                let divY = e.clientY - 70;// - this.$refs.tooltipView.offsetHeight - 10;*/
                                let divX = e.clientX - this.$refs.tooltipView.offsetWidth / 2;//- this.$refs.tooltipView.offsetWidth / 2;
                                let divY = e.clientY - 70 - this.$refs.tooltipView.offsetHeight;// - this.$refs.tooltipView.offsetHeight - 10;
                                //this.toolTipTop = divY + 'px';
                                //this.toolTipLeft = divX + 'px';
                                this.toolTipContent = pickedFeature.id.description.getValue().split('$');
                            }
                        }

                        //alert(divX);
                    }
                }
            },
            //地图上的左键单击事件
            onCesiumLeftClick:function(movement){
                //屏幕坐标
                let screenPt = new Cesium.Cartesian2(movement.position.x, movement.position.y);

                //世界坐标
                let carPt = g_viewer.scene.globe.pick(g_viewer.camera.getPickRay(screenPt), g_viewer.scene);
                let catG = g_viewer.scene.globe.ellipsoid.cartesianToCartographic(carPt);
                let xx = Cesium.Math.toDegrees(catG.longitude);
                let yy = Cesium.Math.toDegrees(catG.latitude);
                let hh = catG.height;
debugger;
                // Pick a new feature
                let pickedFeature = g_viewer.scene.pick(movement.position);
                if (!Cesium.defined(pickedFeature)) {
                    //clickHandler(movement);
                    return;
                }
                else{
                    if (pickedFeature instanceof Cesium.Cesium3DTileFeature) {
                        //var propertyNames = feature.getPropertyNames();
                    }
                    else{
                        //alert('有对象');
                        debugger;
                        if(!pickedFeature.id.description){
                            if(pickedFeature.id.label.text.getValue().indexOf('监控') != -1){
                                this.curStationInfoComponent=() => import('@/components/' + 'monitWarning/jksp');

                            }
                            else if(pickedFeature.id.label.text.getValue().indexOf('工程') != -1){
                                this.curStationInfoComponent=() => import('@/components/' + 'monitWarning/slgc');
                            }
                            this.stationInfoWndTitle = pickedFeature.id.label.text.getValue();
                            this.$refs.stationInfo.open();
                        }
                        else{
                            if(pickedFeature.id.description.getValue().indexOf('雨情预警') != -1){
                                //alert('雨情预警');
                                this.curStationInfoComponent=() => import('@/components/' + 'monitWarning/yqyj');
                                let sAry = pickedFeature.id.description.getValue().split('$');
                                this.stationInfoWndTitle = sAry[1] + '雨量详细信息';
                            }
                            else if(pickedFeature.id.description.getValue().indexOf('水情预警') != -1){
                                this.curStationInfoComponent=() => import('@/components/' + 'monitWarning/sqyj');
                                let sAry = pickedFeature.id.description.getValue().split('$');
                                this.stationInfoWndTitle = sAry[1] + '流量过程';
                            }
                            else if(pickedFeature.id.description.getValue().indexOf('旱情预警') != -1){
                                this.curStationInfoComponent=() => import('@/components/' + 'monitWarning/hqyj');
                                let sAry = pickedFeature.id.description.getValue().split('$');
                                this.stationInfoWndTitle = sAry[1] + '墒情信息';
                            }

                            this.$refs.stationInfo.open();
                        }
                    }
                }
            },
            //停止淹没分析
            stopFloodAnaly:function(){
                debugger;
                this.bShowFloodEvo = false;
                this.bShowFloodAnaly = false;
                this.bGifShow = false;
                //允许缩放
                g_viewer.scene.screenSpaceCameraController.enableZoom = true;
                if(this.timer){
                    g_viewer.entities.removeAll();
                    window.clearInterval(this.timer);
                    this.timer = null;
                }
            },
            //初始化图表
            initEChart:function () {
                let myChart = echarts.init(document.getElementById('main'));

                let colors = ['#5793f3', '#d14a61', '#675bba'];
                let option = {
                    color: colors,
                    title: {
                        text: this.eChartsTitle,
                        textStyle:{
                            'color': '#FFFFFF'
                        },
                        x:'center'
                    },
                    tooltip: {
                        trigger: 'none',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    grid: {
                        top: 70,
                        bottom: 50
                    },
                    xAxis: [
                        {
                            axisLabel:{color:'rgb(255,255,255)'},
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine: {
                                onZero: false,
                                lineStyle: {
                                    color: colors[1]
                                }
                            },
                            axisPointer: {
                                label: {
                                    formatter: function (params) {
                                        return '时间:' + params.value;
                                    }
                                }
                            },
                            data: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00']
                        }
                    ],
                    yAxis: [
                        {
                            name:'水位(m)',
                            nameTextStyle:{color:'#FFFFFF'},
                            type: 'value',
                            min: 0,
                            max: 250,
                            interval: 50,
                            axisLabel:{color:'rgb(255,255,255)'}
                        },
                        {
                            name:'流量(m³/s)',
                            nameTextStyle:{color:'#FFFFFF'},
                            type: 'value',
                            min: 0,
                            max: 250,
                            interval: 50,
                            axisLabel:{color:'rgb(255,255,255)'}
                        }
                    ],
                    series: [
                        {
                            name: '流量',
                            type: 'line',
                            yAxisIndex: 1,
                            smooth: true,
                            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                        },
                        {
                            name: '水位',
                            type: 'line',
                            smooth: true,
                            data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
                        }
                    ]
                };

                myChart.clear();
                myChart.setOption(option,true);
            },
            //初始化图表2
            initEChart2:function(){
                let myChart = echarts.init(document.getElementById('main'));

                let colors = ['#5793f3', '#d14a61', '#675bba'];
                let option = {
                    color: colors,
                    title: {
                        text:'污染物到达时间:2020年1月2日 08:00',
                        subtext:this.eChartsTitle,
                        textStyle:{
                            'color': '#FFFFFF'
                        },
                        x:'center'
                    },
                    tooltip: {
                        trigger: 'none',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    grid: {
                        top: 70,
                        bottom: 50
                    },
                    xAxis: [
                        {
                            axisLabel:{color:'rgb(255,255,255)'},
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine: {
                                onZero: false,
                                lineStyle: {
                                    color: colors[1]
                                }
                            },
                            axisPointer: {
                                label: {
                                    formatter: function (params) {
                                        return '时间:' + params.value;
                                    }
                                }
                            },
                            data: [
                                '10-05 08:00',
                                '10-06 08:00',
                                '10-07 08:00',
                                '10-08 08:00',
                                '10-09 08:00',
                                '10-10 08:00',
                                '10-11 08:00',
                                '10-12 08:00',
                                '10-13 08:00',
                                '10-14 08:00',
                                '10-15 08:00',
                                '10-16 08:00',
                                '10-17 08:00',
                                '10-18 08:00',
                                '10-19 08:00'
                            ]
                        }
                    ],
                    yAxis: [
                        {
                            nameTextStyle:{color:'#FFFFFF'},
                            type: 'value',
                            axisLabel:{color:'rgb(255,255,255)'}
                        }
                    ],
                    series: [
                        {
                            name: '水质变化情况',
                            type: 'line',
                            smooth: true,
                            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,2.0,1.9,1.8]
                        }
                    ]
                };

                myChart.clear();
                myChart.setOption(option,true);
            },
            //点击了顶部菜单淹没分析
            floodAnaly:function(){
                this.lefComponentWidth = "0";
                this.bShowMap = true;

                this.bShowLayerDiv = false;
                this.$refs.digWarning.close();
                this.$refs.stationInfo.close();

                this.stopFloodAnaly();
                this.curRouteIndex = 1;
                //g_viewer.scene.globe.clippingPlanes.enabled = true;
                g_viewer.scene.globe.clippingPlanes = null;
                this.floodEvo();
            },
            //点击了顶部菜单污染物演进
            contaAnaly:function(){
                this.lefComponentWidth = "0";
                this.bShowMap = true;

                this.bShowLayerDiv = false;
                this.$refs.digWarning.close();
                this.$refs.stationInfo.close();

                this.stopFloodAnaly();
                this.curRouteIndex = 1;
                g_viewer.scene.globe.clippingPlanes = null;

                this.contaEvo();
            },
            //开始局部的污染物模拟
            startContaAnaly:async function(){
                debugger;
                let dsTmp = await new Cesium.GeoJsonDataSource.load('/MapData/polygon.txt', {
                    /*stroke: new Cesium.Color(0, 0, 1, 0.5),
                    fill: Cesium.Color.PINK,*/
                    strokeWidth: 1,
                    markerSymbol: '?'
                });
                let entityObj = dsTmp.entities.values[0];
                entityObj.polygon.material = new Cesium.ImageMaterialProperty({
                    image:'/images/test.png'
                });
                let entity = g_viewer.entities.add(entityObj);
                /*polygon.entities.values[0].polygon.material = new Cesium.ImageMaterialProperty({
                    image:'/MapData/t0.png'
                });

                g_viewer.dataSources.add(polygon);*/
                debugger;

                g_viewer.flyTo(entity,{
                    duration:0.001
                });
            },
            //飞行完成后沿着线进行演进
            contaEvoFlyEnd:function(){
                g_viewer.scene.camera.moveEnd.removeEventListener(this.contaEvoFlyEnd);

                this.timer = window.setInterval(() => {
                    if (this.curRouteIndex <= this.routePts.length) {

                        if((this.curRouteIndex % 5) == 0){
                            this.polyColor = new Cesium.Color(224/255, 118/255, 31/255,
                                (this.routePts.length - this.curRouteIndex) /this.routePts.length);
                        }

                        if(this.curRouteIndex == 100){
                            this.bShowFloodEvo = true;
                            this.eChartsTitle = "水质站A水质变化曲线";
                            this.initEChart2();
                        }

                        /*if(this.curRouteIndex == 800){
                            this.bShowFloodEvo = false;
                        }*/

                        if(this.curRouteIndex == 250){
                            this.bShowFloodEvo = true;
                            this.eChartsTitle = "水质站B水质变化曲线";
                            this.initEChart2();
                        }

                        if(this.curRouteIndex == 300){
                            if(this.timer){
                                debugger;
                                this.bShowFloodEvo = false;
                                //this.bGifShow = false;
                                g_viewer.entities.removeAll();
                                window.clearInterval(this.timer);
                                this.timer = null;

                                //开始淹没分析
                                //this.bShowFloodAnaly = true;
                                //this.startContaAnaly();
                            }
                        }

                        if((this.curRouteIndex - 50) > 0){
                            this.polyPositions = Cesium.Cartesian3.fromDegreesArray(
                                _.flatten(_.slice(this.routePts,this.curRouteIndex - 50,this.curRouteIndex))
                            );
                        }
                        else{
                            this.polyPositions = Cesium.Cartesian3.fromDegreesArray(
                                _.flatten(_.slice(this.routePts,0,this.curRouteIndex))
                            );
                        }
                        this.curRouteIndex = this.curRouteIndex + 1;
                    } else {
                        if(this.timer){
                            this.bShowFloodEvo = false;
                            /*this.bGifShow = false;*/
                            g_viewer.entities.removeAll();
                            window.clearInterval(this.timer);
                            this.timer = null;

                            //开始局部分析
                            /*this.bShowFloodAnaly = true;
                            this.startFloodAnaly();*/
                        }
                    }
                }, 10);
            },
            //污染物沿着线进行演进
            contaEvo:function(){
                this.randomLineString2();

                //window.setTimeout(this.contaEvoFlyEnd,3000);
                //g_viewer.scene.camera.moveEnd.addEventListener(this.contaEvoFlyEnd);
            },
            //随机绘制线污染物
            randomLineString2:function () {
                debugger;
                g_viewer.scene.globe.depthTestAgainstTerrain = false;
                g_viewer.entities.removeAll();
                /*let lineStrings = turf.randomLineString(
                    1,
                    {
                        bbox: this.bbox,
                        num_vertices:400,
                        max_length:0.01,
                        max_rotation:Math.PI/100
                    }
                );
                this.linePts = lineStrings.features[0].geometry.coordinates;*/

                let entity = g_viewer.entities.add({
                    polyline:{
                        positions:Cesium.Cartesian3.fromDegreesArray(
                            _.flatten(this.linePts)
                        ),
                        material:new Cesium.ColorMaterialProperty(
                            new Cesium.Color(0, 0, 1, 0.5)),
                        width:10,
                        clampToGround:true
                    }
                });

                let rectangleChina = new Cesium.Rectangle(
                    Cesium.Math.toRadians(73.66),
                    Cesium.Math.toRadians(3.86),
                    Cesium.Math.toRadians(135.05),
                    Cesium.Math.toRadians(53.55));

                g_viewer.scene.camera.flyTo({destination: rectangleChina});

                g_viewer.scene.camera.moveEnd.addEventListener(this.contaEvoFlyEnd);
                let rectangle = new Cesium.Rectangle(
                    Cesium.Math.toRadians(104.066861),
                    Cesium.Math.toRadians(34.544617),
                    Cesium.Math.toRadians(105.959961),
                    Cesium.Math.toRadians(35.146317));

                g_viewer.scene.camera.flyTo({destination: rectangle});

                //g_viewer.flyTo(entity,{duration:3});

                this.routePts = [];
                this.routePts.push(this.linePts[0]);
                for(let i = 1;i < this.linePts.length;i++){
                    let pt1Tmp = turf.point(this.linePts[i-1]);
                    let pt2Tmp = turf.point(this.linePts[i]);
                    //这两个点之间的距离
                    let pt1ToPt2Dis = turf.distance(
                        pt1Tmp,
                        pt2Tmp,
                        {units: 'kilometers'});
                    let totalDis = 0;   //当前两点之间路径距离的总和
                    while(true){
                        let bearing = turf.bearing(pt1Tmp, pt2Tmp);

                        let distance = 1000 / 1000;  //两点间隔为500米
                        let options = {units: 'kilometers'};

                        let destination = turf.destination(
                            pt1Tmp,
                            distance,
                            bearing,
                            options);
                        this.routePts.push(destination.geometry.coordinates);

                        totalDis =  totalDis + distance;
                        if(totalDis >= pt1ToPt2Dis){
                            break;
                        }
                    }

                }
                debugger;
                this.polyColor = new Cesium.Color(224/255, 118/255, 31/255, 1);
                let entity2 = g_viewer.entities.add({
                    polyline:{
                        positions:new Cesium.CallbackProperty(
                            () => this.polyPositions, false
                        ),
                        /*material:new Cesium.ImageMaterialProperty({
                            image:'/images/test.png'
                        }),*/
                        material:new Cesium.ColorMaterialProperty(
                            new Cesium.CallbackProperty(
                                () => this.polyColor, false
                            )
                        ),
                        clampToGround:true,
                        width:8,
                        zIndex:99
                    }
                });

                let entity3 = g_viewer.entities.add({
                    position : Cesium.Cartesian3.fromDegrees(
                        this.routePts[100][0],
                        this.routePts[100][1]),
                    show:true,
                    billboard : {
                        image : '/images/geoImg/engi.png',
                        scale:0.7,
                        horizontalOrigin:Cesium.HorizontalOrigin.RIGHT,
                        distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0.0, 2000000.0)
                    },
                    label : {
                        text : '水质站点A',
                        scale:0.5,
                        fillColor:Cesium.Color.BLUE,
                        showBackground:true,
                        backgroundColor:new Cesium.Color(240/255, 240/255, 240/255, 0.8),
                        horizontalOrigin:Cesium.HorizontalOrigin.LEFT,
                        distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0.0, 2000000.0)
                    }
                });

                let entity4 = g_viewer.entities.add({
                    position : Cesium.Cartesian3.fromDegrees(
                        this.routePts[250][0],
                        this.routePts[250][1]),
                    show:true,
                    billboard : {
                        image : '/images/geoImg/engi.png',
                        scale:0.7,
                        horizontalOrigin:Cesium.HorizontalOrigin.RIGHT,
                        distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0.0, 2000000.0)
                    },
                    label : {
                        text : '水质站点B',
                        scale:0.5,
                        fillColor:Cesium.Color.BLUE,
                        showBackground:true,
                        backgroundColor:new Cesium.Color(240/255, 240/255, 240/255, 0.8),
                        horizontalOrigin:Cesium.HorizontalOrigin.LEFT,
                        distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0.0, 2000000.0)
                    }
                });
            },
            //淹没分析时点击回到初始视角按钮
            onHomeBtnClick:function(){
                let rectangle = new Cesium.Rectangle(
                Cesium.Math.toRadians(115.8784),
                Cesium.Math.toRadians(39.9912),
                Cesium.Math.toRadians(115.9614),
                Cesium.Math.toRadians(40.0381));

                g_viewer.scene.camera.flyTo({destination: rectangle});
            },
            //飞行完成后进行洪水演进
            floodEvoFlyEnd:function(){
                g_viewer.scene.camera.moveEnd.removeEventListener(this.floodEvoFlyEnd);
                this.bGifShow = true;
                this.timer = window.setInterval(() => {
                    if (this.curRouteIndex <= this.routePts.length) {
                        if(this.curRouteIndex == 100){
                            debugger;
                            this.bShowFloodEvo = true;
                            this.eChartsTitle = "民和站水位流量过程线";
                            this.initEChart();
                        }

                        /*if(this.curRouteIndex == 800){
                            this.bShowFloodEvo = false;
                        }*/

                        if(this.curRouteIndex == 250){
                            this.bShowFloodEvo = true;
                            this.eChartsTitle = "小川站水位流量过程线";
                            this.initEChart();
                        }

                        if(this.curRouteIndex == 251){
                            if(this.timer){
                                debugger;
                                this.bShowFloodEvo = false;
                                this.bGifShow = false;
                                g_viewer.entities.removeAll();
                                window.clearInterval(this.timer);
                                this.timer = null;

                                //开始淹没分析
                                this.bShowFloodAnaly = true;
                                this.startFloodAnaly();
                            }
                        }

                        //峰头绘制动态图标
                        let htmlOverlay = this.$refs.imgGif;
                        let pos = this.routePts[this.curRouteIndex];
                        g_viewer.scene.preRender.addEventListener(function () {
                            let position = Cesium.Cartesian3.fromDegrees(
                                pos[0],
                                pos[1]);

                            let canvasPosition = g_viewer.cesiumWidget.scene.cartesianToCanvasCoordinates(position);

                            if (Cesium.defined(canvasPosition)){
                                htmlOverlay.style.top = canvasPosition.y + 'px';
                                htmlOverlay.style.left = canvasPosition.x + 'px';
                            }
                        });
                        this.polyPositions = Cesium.Cartesian3.fromDegreesArray(
                            _.flatten(_.slice(this.routePts,0,this.curRouteIndex))
                        );

                        this.curRouteIndex = this.curRouteIndex + 1;
                    } else {
                        if(this.timer){
                            debugger;
                            this.bShowFloodEvo = false;
                            this.bGifShow = false;
                            g_viewer.entities.removeAll();
                            window.clearInterval(this.timer);
                            this.timer = null;

                            //开始淹没分析
                            this.bShowFloodAnaly = true;
                            this.startFloodAnaly();
                        }
                        /*this.curRouteIndex = 1;
                        this.polyPositions = Cesium.Cartesian3.fromDegreesArray(
                            _.flatten(_.slice(this.routePts,0,this.curRouteIndex))
                        );*/
                    }
                }, 10);
            },
            //沿着线进行洪水演进
            floodEvo:function(){
                //禁止用户缩放
                //g_viewer.scene.screenSpaceCameraController.enableZoom = false;
                this.randomLineString();
                //window.setTimeout(this.floodEvoFlyEnd,3000);
            },
            //随机绘制线
            randomLineString:function () {
                g_viewer.scene.globe.depthTestAgainstTerrain = false;
                g_viewer.entities.removeAll();
                /*let lineStrings = turf.randomLineString(
                    1,
                    {
                        bbox: this.bbox,
                        num_vertices:400,
                        max_length:0.01,
                        max_rotation:Math.PI/100
                    }
                );
                this.linePts = lineStrings.features[0].geometry.coordinates;*/
                //debugger;
                let entity = g_viewer.entities.add({
                    polyline:{
                        positions:Cesium.Cartesian3.fromDegreesArray(
                            _.flatten(this.linePts)
                        ),
                        material:new Cesium.ColorMaterialProperty(
                            new Cesium.Color(0, 0, 1, 0.5)),
                        width:10,
                        clampToGround:true
                    }
                });

                this.routePts = [];
                this.routePts.push(this.linePts[0]);
                for(let i = 1;i < this.linePts.length;i++){
                    let pt1Tmp = turf.point(this.linePts[i-1]);
                    let pt2Tmp = turf.point(this.linePts[i]);
                    //这两个点之间的距离
                    let pt1ToPt2Dis = turf.distance(
                        pt1Tmp,
                        pt2Tmp,
                        {units: 'kilometers'});
                    let totalDis = 0;   //当前两点之间路径距离的总和
                    while(true){
                        let bearing = turf.bearing(pt1Tmp, pt2Tmp);

                        let distance = 1000 / 1000;  //两点间隔为1000米
                        let options = {units: 'kilometers'};

                        let destination = turf.destination(
                            pt1Tmp,
                            distance,
                            bearing,
                            options);
                        this.routePts.push(destination.geometry.coordinates);

                        totalDis =  totalDis + distance;
                        if(totalDis >= pt1ToPt2Dis){
                            break;
                        }
                    }

                }

                let rectangleChina = new Cesium.Rectangle(
                    Cesium.Math.toRadians(73.66),
                    Cesium.Math.toRadians(3.86),
                    Cesium.Math.toRadians(135.05),
                    Cesium.Math.toRadians(53.55));

                g_viewer.scene.camera.flyTo({destination: rectangleChina});

                g_viewer.scene.camera.moveEnd.addEventListener(this.floodEvoFlyEnd);
                let rectangle = new Cesium.Rectangle(
                    Cesium.Math.toRadians(104.066861),
                    Cesium.Math.toRadians(34.544617),
                    Cesium.Math.toRadians(105.959961),
                    Cesium.Math.toRadians(35.146317));

                g_viewer.scene.camera.flyTo({destination: rectangle});
                //g_viewer.flyTo(entity);

                let entity2 = g_viewer.entities.add({
                    polyline:{
                        positions:new Cesium.CallbackProperty(
                            () => this.polyPositions, false
                        ),
                        /*material:new Cesium.ImageMaterialProperty({
                            image:'/images/test.png'
                        }),*/
                        material:new Cesium.ColorMaterialProperty(
                            new Cesium.Color(1, 1, 0, 0.8)
                        ),
                        clampToGround:true,
                        width:8,
                        zIndex:99
                    }
                });

                let entity3 = g_viewer.entities.add({
                    position : Cesium.Cartesian3.fromDegrees(
                        this.routePts[100][0],
                        this.routePts[100][1]),
                    show:true,
                    billboard : {
                        image : '/images/geoImg/engi.png',
                        scale:0.7,
                        horizontalOrigin:Cesium.HorizontalOrigin.RIGHT,
                        distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0.0, 2000000.0)
                    },
                    label : {
                        text : '民和站',
                        scale:0.5,
                        fillColor:Cesium.Color.BLUE,
                        showBackground:true,
                        backgroundColor:new Cesium.Color(240/255, 240/255, 240/255, 0.8),
                        horizontalOrigin:Cesium.HorizontalOrigin.LEFT,
                        distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0.0, 2000000.0)
                    }
                });

                let entity4 = g_viewer.entities.add({
                    position : Cesium.Cartesian3.fromDegrees(
                        this.routePts[250][0],
                        this.routePts[250][1]),
                    show:true,
                    billboard : {
                        image : '/images/geoImg/engi.png',
                        scale:0.7,
                        horizontalOrigin:Cesium.HorizontalOrigin.RIGHT,
                        distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0.0, 2000000.0)
                    },
                    label : {
                        text : '小川站',
                        scale:0.5,
                        fillColor:Cesium.Color.BLUE,
                        showBackground:true,
                        backgroundColor:new Cesium.Color(240/255, 240/255, 240/255, 0.8),
                        horizontalOrigin:Cesium.HorizontalOrigin.LEFT,
                        distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0.0, 2000000.0)
                    }
                });
            },
            //开始洪水淹没分析
            startFloodAnaly:function(){
                this.initViewStatus();
                this.loadGrandCanyon();
                this.drawPoly(this.polygon_degrees);

                let numTmp = 1;

                this.timer = window.setInterval(() => {
                    if ((this.height_max > this.extrudedHeight) && (this.extrudedHeight >= this.height_min)) {
                        this.extrudedHeight = this.extrudedHeight + Number(this.speed);
                        this.flood1 = this.flood1 + 1;
                        this.flood2 = (parseFloat(this.flood2) + 0.01).toFixed(2);
                        this.flood3 = this.flood3 + 100;
                        this.flood4 = this.flood4 + 100;
                        this.flood5 = this.flood5 + 1;
                    } else {
                        numTmp = numTmp + 1;
                        if(numTmp <= 3){
                            this.extrudedHeight = Number(this.height_min);
                            this.flood1 = 1;
                            this.flood2 = 0.3;
                            this.flood3 = 3200;
                            this.flood4 = 1900;
                            this.flood5 = 1;
                        }
                        else{
                            this.extrudedHeight = Number(this.height_max);
                        }
                        /*this.flood1 = 1;
                        this.flood2 = 0.3;
                        this.flood3 = 3200;
                        this.flood4 = 1900;
                        this.flood5 = 1;*/
                    }
                }, 500);
            },
            //淹没分析时初始化视角
            initViewStatus:function () {
                let scene = g_viewer.scene;
                scene.globe.depthTestAgainstTerrain = true;
                scene.camera.setView({
                    // 摄像头的位置
                    destination: Cesium.Cartesian3.fromDegrees(115.9216, 39.9870, 1500.0),
                    orientation: {
                        heading: Cesium.Math.toRadians(0.0),//默认朝北0度，顺时针方向，东是90度
                        pitch: Cesium.Math.toRadians(-20),//默认朝下看-90,0为水平看，
                        roll: Cesium.Math.toRadians(0)//默认0
                    }
                });
                g_viewer.skyAtmosphere = false;
            },
            // 淹没分析时切割一部分地形
            loadGrandCanyon:function () {
                let globe = g_viewer.scene.globe;
                let position = Cesium.Cartographic.toCartesian(
                    new Cesium.Cartographic.fromDegrees(115.9165534, 40.0139345, 100)
                );
                let distance = 3000.0;
                let boundingSphere = new Cesium.BoundingSphere(position, distance);

                globe.clippingPlanes = new Cesium.ClippingPlaneCollection({
                    modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(position),
                    planes: [
                        new Cesium.ClippingPlane(new Cesium.Cartesian3(1.5, 0.0, 0.0), distance),
                        new Cesium.ClippingPlane(new Cesium.Cartesian3(-1.5, 0.0, 0.0), distance),
                        new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 1.5, 0.0), distance),
                        new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, -1.5, 0.0), distance)
                    ],
                    unionClippingRegions: true
                });
                globe.clippingPlanes.enabled = true;
                g_viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.5, -0.5, boundingSphere.radius * 5.0));
                g_viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
            },
            //淹没分析时绘制面
            drawPoly:function (degrees) {
                let entity = g_viewer.entities.add({
                    polygon: {
                        hierarchy: {},
                        material: new Cesium.Color.fromBytes(64, 157, 253, 100),
                        perPositionHeight: true,
                    }
                });

                entity.polygon.hierarchy = new Cesium.PolygonHierarchy(
                    Cesium.Cartesian3.fromDegreesArray(degrees)
                );
                entity.polygon.extrudedHeight = new Cesium.CallbackProperty(
                    () => this.extrudedHeight, false
                );
                this.polygonEntities.push(entity);
            },
            //点击了顶部菜单监测预警
            monitWaring:function(){
                g_viewer.scene.globe.depthTestAgainstTerrain = false;
                this.stopFloodAnaly();
                if(this.timer){
                    window.clearInterval(this.timer);
                    this.timer = null;
                }

                g_viewer.scene.globe.clippingPlanes = null;
                g_viewer.scene.globe.depthTestAgainstTerrain = false;
                g_viewer.skyAtmosphere = true;

                g_viewer.entities.removeAll();
                this.lefComponentWidth = "0";
                this.bShowMap = true;
                this.bShowFloodAnaly = false;
                this.bShowFloodEvo = false;
                this.bGifShow = false;

                //加载工程地理信息
                g_viewer.dataSources.add(this.dataSourceEngi);

                //加载视频监控信息
                g_viewer.dataSources.add(this.dataSourceVideo);

                //加载预警信息
                g_viewer.dataSources.add(this.dataSourceRW);
                g_viewer.dataSources.add(this.dataSourceWW);
                g_viewer.dataSources.add(this.dataSourceDW);

                let rectangle = new Cesium.Rectangle(
                    Cesium.Math.toRadians(this.bbox[0]),
                    Cesium.Math.toRadians(this.bbox[1]),
                    Cesium.Math.toRadians(this.bbox[2]),
                    Cesium.Math.toRadians(this.bbox[3]));

                g_viewer.scene.camera.flyTo({destination: rectangle});

                //g_viewer.flyTo(bjDs,{duration:1});

                //截获地图的左键单击事件
                g_viewer.screenSpaceEventHandler.setInputAction(
                    this.onCesiumLeftClick,
                    Cesium.ScreenSpaceEventType.LEFT_CLICK
                );

                //this.initMap();

                //生成预警数据
                this.generateWaringData();

                this.$refs.digWarning.open();

                //生成地理信息
                this.generateGeoInfo();
            },
            //切换地图和内容
            switchCenter:function (bShowMap) {
                this.bShowMap = bShowMap;
            },
            //根据名称更换左边组件
            changeLeft:function (menuItem) {
                if(menuItem.description == "blank") {
                    alert("打开新窗口");
                }
                else if(menuItem.description == "menu") {
                    this.bShowMap = false;
                    this.lefComponentWidth = "200";
                    this.curLeftComponent=() => import('@/components/' + menuItem.url);
                }
                else if(menuItem.description == "noconditionmap"){
                    //alert("无条件地图显示");
                    this.bShowMap = false;
                    this.lefComponentWidth = "0";
                    this.curCenterComponent=() => import('@/components/home/centerContent');
                }
                else if(menuItem.description == "menuiframe"){
                    //alert("左侧IFrame");
                    this.bShowMap = true;
                    this.lefComponentWidth = "200";
                    this.curLeftComponent=() => import('@/components/' + menuItem.url);
                }
                else if(menuItem.description == "mainiframe"){
                    alert("中间内容IFrame");
                }
                else if(menuItem.description == "mainiframeMap"){
                    this.bShowMap = false;
                    this.lefComponentWidth = "0";
                    this.curCenterComponent=() => import('@/components/' + menuItem.url);
                }
                else if(menuItem.description == "leftcondition"){
                    alert("leftcondition");
                }
                else{
                    this.bShowMap = false;
                    this.bShowLayerDiv = false;
                    this.$refs.digWarning.close();
                    this.$refs.stationInfo.close();
                    this.lefComponentWidth = "200";
                    this.curLeftComponent=() => import('@/components/' + menuItem.url);
                    //this.curCenterComponent=() => import('@/components/home/centerContent');
                    //this.LoadMenu(menuItem.menuCode,menuItem.menuName,menuItem.url);
                }
            },
            //更换中间组件和设置是否显示地图
            changeCenter:function(bShowMap,centerComponent){
                this.bShowMap = bShowMap;
                if(centerComponent != "")
                {
                    this.curCenterComponent=() => import('@/components/' + centerComponent);
                }
            },
            //加载左侧菜单
            LoadMenu:function (parentCode, menuText, selectUrl) {
                let params = {
                    params:{
                        parentCode: parentCode
                    }
                };
                this.axios.get('/api/menu/children',params)
                    .then(res => {
                        // 成功回调
                        this.leftMenuData = res.data.data;
                    }, res => {
                        // 错误回调
                        debugger;
                    });
            },
            flyToPos:function(pos){
                g_viewer.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(pos[0], pos[1], 120000)//(108.56211031535, 37.35117012468, 2000000)
                });
            },
            //生成随机预警数据
            generateWaringData:function () {
                this.randomTxt = "";
                let Mock = require('mockjs');
                let bbox = [93.412690,32.596075,108.709382,42.793593];

                //生成雨情预警数据
                this.rainWarningData = new Array();
                this.dataSourceRW.entities.removeAll();
                for(let i=0;i<8;i++){
                    let pos = turf.randomPosition(bbox)
                    let stnm = this.randomTxt + Mock.Random.cword( 2, 2 ) + '雨量站';
                    let value = 450.67;
                    this.rainWarningData.push({
                        pos:pos,
                        stnm:stnm,
                        value:value     //雨量值200到500之间
                    });

                    let entity = this.dataSourceRW.entities.add({
                        description:'雨情预警$' + stnm + '$1小时雨量:' + value + 'mm',
                        position : Cesium.Cartesian3.fromDegrees(pos[0],pos[1]),
                        billboard : {
                            image : '/images/warn/rw.png',
                            scale:0.7,
                            horizontalOrigin:Cesium.HorizontalOrigin.RIGHT,
                            distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0.0, 2000000.0)
                        }
                    });
                }

                //生成水情预警数据
                this.waterWarningData = new Array();
                this.dataSourceWW.entities.removeAll();
                for(let i=0;i<5;i++){
                    let pos = turf.randomPosition(bbox)
                    let stnm = this.randomTxt + Mock.Random.cword( 2, 2 ) + '水文站';
                    //let value = (3000 + Math.random() * 2000).toFixed(2);
                    let value = 5000.27;
                    this.waterWarningData.push({
                        pos:pos,
                        stnm:stnm,
                        value:value     //流量值3000到5000之间
                    });

                    let entity = this.dataSourceWW.entities.add({
                        description:'水情预警$' + stnm + '$流量:' + value + 'm³/s',
                        position : Cesium.Cartesian3.fromDegrees(pos[0],pos[1]),
                        billboard : {
                            image : '/images/warn/ww.png',
                            scale:0.7,
                            horizontalOrigin:Cesium.HorizontalOrigin.RIGHT,
                            distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0.0, 2000000.0)
                        }
                    });
                }

                //生成旱情预警数据
                this.dryWarningData = new Array();
                this.dataSourceDW.entities.removeAll();
                for(let i=0;i<3;i++){
                    let pos = turf.randomPosition(bbox)
                    let stnm = this.randomTxt + Mock.Random.cword( 2, 2 ) + '墒情站';
                    //let value = (Math.random() * 0.5).toFixed(2);
                    let value = 0.16;
                    this.dryWarningData.push({
                        pos:pos,
                        stnm:stnm,
                        value:value     //（0-20cm）土壤相对含水量0-0.5
                    });

                    let entity = this.dataSourceDW.entities.add({
                        description:'旱情预警$' + stnm + '$土壤湿度:' + value,
                        position : Cesium.Cartesian3.fromDegrees(pos[0],pos[1]),
                        billboard : {
                            image : '/images/warn/dw.png',
                            scale:0.7,
                            horizontalOrigin:Cesium.HorizontalOrigin.RIGHT,
                            distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0.0, 2000000.0)
                        }
                    });
                }

                //alert(this.randomTxt);
            },
            //生成随机地理数据
            generateGeoInfo:function () {
                let Mock = require('mockjs');
                let bbox = [93.412690,32.596075,108.709382,42.793593];
                //生成工程信息
                this.dataSourceEngi.entities.removeAll();
                for(let i=0;i<5;i++){
                    let pos = turf.randomPosition(bbox);
                    let posName = Mock.Random.cword( 2, 2 ) + '工程';

                    let entity = this.dataSourceEngi.entities.add({
                        position : Cesium.Cartesian3.fromDegrees(pos[0],pos[1]),
                        show:false,
                        billboard : {
                            image : '/images/geoImg/engi.png',
                            scale:0.7,
                            horizontalOrigin:Cesium.HorizontalOrigin.RIGHT,
                            distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0.0, 2000000.0)
                        },
                        label : {
                            text : posName,
                            scale:0.5,
                            fillColor:Cesium.Color.BLUE,
                            showBackground:true,
                            backgroundColor:new Cesium.Color(240/255, 240/255, 240/255, 0.8),
                            horizontalOrigin:Cesium.HorizontalOrigin.LEFT,
                            distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0.0, 2000000.0)
                        }
                    });
                }

                //生成视频信息
                this.dataSourceVideo.entities.removeAll();
                for(let i=0;i<5;i++){
                    let pos = turf.randomPosition(bbox);
                    let posName = Mock.Random.cword( 2, 2 ) + '监控';

                    let entity = this.dataSourceVideo.entities.add({
                        position : Cesium.Cartesian3.fromDegrees(pos[0],pos[1]),
                        show:false,
                        billboard : {
                            image : '/images/geoImg/video.gif',
                            scale:0.7,
                            horizontalOrigin:Cesium.HorizontalOrigin.RIGHT,
                            distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0.0, 2000000.0)
                        },
                        label : {
                            text : posName,
                            scale:0.5,
                            fillColor:Cesium.Color.DEEPSKYBLUE,
                            showBackground:true,
                            backgroundColor:new Cesium.Color(240/255, 240/255, 240/255, 0.8),
                            horizontalOrigin:Cesium.HorizontalOrigin.LEFT,
                            distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0.0, 2000000.0)
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped>
    #cesiumContainer {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    .window .window-header {
        background: #12346B;
        left: 0px;
        padding: 0px 0px 6px 0px;
    }

    /deep/ .el-input__inner {
        height: 30px;
    }
</style>
