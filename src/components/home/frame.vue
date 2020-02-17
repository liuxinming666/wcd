<template>
    <div>
        <Layout v-bind:style="{width:fullWidth, height:fullHeight}">
            <LayoutPanel region="north" style="height:70px;">
                <top :curUser="curUser" @changeLeft="changeLeft"
                     @monitWaring="monitWaring"></top>
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
                randomTxt:''    //随机字符串
            }
        },
        beforeMount:function(){
            this.curLeftComponent=() => import('@/components/infoShow/left');
            this.curCenterComponent=() => import('@/components/home/centerContent');
            //this.curStationInfoComponent=() => import('@/components/monitWarning/jksp');
        },
        mounted:function(){
            this.initMap();
        },
        methods:{
            //初始化地图
            initMap:function () {
                let viewerOption = {
                    imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
                        url: "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=3b6e1ded5e34e4a985ce9167106c62a0",
                        // "https://t0.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=3b6e1ded5e34e4a985ce9167106c62a0",
                        //"http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=3b6e1ded5e34e4a985ce9167106c62a0",

                        layer: "tdtVecBasicLayer",//"tdtBasicLayer",
                        style: "default",
                        format: "image/jpeg",
                        tileMatrixSetID: "GoogleMapsCompatible",
                        minimumLevel: 1,
                        maximumLevel: 18,
                        show: false
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
                    sceneMode: Cesium.SceneMode.SCENE2D//SCENE3D
                };
                g_viewer = new Cesium.Viewer('cesiumContainer', viewerOption);
                g_viewer._cesiumWidget._creditContainer.style.display = "none";// 隐藏版权
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
            //点击了顶部菜单监测预警
            monitWaring:function(){
                this.lefComponentWidth = "0";
                this.bShowMap = true;

                //加载甘肃省界
                let bjDs = new Cesium.GeoJsonDataSource.load('/MapDate/ShengJie_line.txt', {
                    stroke: Cesium.Color.HOTPINK,
                    fill: Cesium.Color.PINK,
                    strokeWidth: 1,
                    markerSymbol: '?'
                })
                g_viewer.dataSources.add(bjDs);

                //加载工程地理信息
                g_viewer.dataSources.add(this.dataSourceEngi);

                //加载视频监控信息
                g_viewer.dataSources.add(this.dataSourceVideo);

                //加载预警信息
                g_viewer.dataSources.add(this.dataSourceRW);
                g_viewer.dataSources.add(this.dataSourceWW);
                g_viewer.dataSources.add(this.dataSourceDW);

                g_viewer.flyTo(bjDs,{duration:1});

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
</style>