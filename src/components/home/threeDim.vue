<template>
    <div>
        <div id="cesiumContainer" @mousemove="onCesiumMouseMove($event)">
            <div id="div_location_jwd" class="location-bar no-print" style="left: 2px; bottom: 2px;">
                {{coordShow}}
            </div>
            <div id="div_location_jwd" class="location-bar no-print" style="left: 2px; bottom: 30px;">
                <button @click="onBtnClick">开始</button>
            </div>
        </div>
    </div>
</template>

<script>
    var g_viewer = null;



    export default {
        name: "threeDim",
        data() {
            return {
                coordShow:'',
                bDraw:false,
                entity:null,
                polygonPts:[]
            }
        },
        mounted: function () {
            this.initMap();
        },
        methods: {
            initMap: function () {
                /*g_viewer = new Cesium.Viewer('cesiumContainer', {
                    imageryProvider: new Cesium.UrlTemplateImageryProvider({
                        url: '/Mapdata/js/{z}/{x}/{y}.png',
                        tilingScheme: new Cesium.WebMercatorTilingScheme(),
                        minimumLevel: 0,
                        rectangle:  rectangle,
                        maximumLevel: 13
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
                    sceneMode: Cesium.SceneMode.SCENE3D});

                let rectangle = new Cesium.Rectangle(Cesium.Math.toRadians(113.59863),Cesium.Math.toRadians(34.738766),Cesium.Math.toRadians(113.88431),Cesium.Math.toRadians(34.89258));

                g_viewer.scene.camera.flyTo({destination: rectangle});*/

                let viewerOption = {
                    imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
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
                    sceneMode: Cesium.SceneMode.SCENE3D//SCENE3D
                };
                g_viewer = new Cesium.Viewer('cesiumContainer', viewerOption);

                //let scene = g_viewer.scene;
                //scene.globe.depthTestAgainstTerrain = true;

                g_viewer.screenSpaceEventHandler.setInputAction(
                    this.onCesiumLeftClick,
                    Cesium.ScreenSpaceEventType.LEFT_CLICK);

                g_viewer.screenSpaceEventHandler.setInputAction(
                    this.onCesiumLeftDoubleClick,
                    Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

                /*let adapCoordi = [
                    112.35481473,36.7676545,-1000,
                    112.405517,36.7676545,-1000,
                    112.405517,36.73113302,-1000,
                    112.35481473,36.73113302,-1000
                ];*/
                //绘制一个矩形
                /*let entity = g_viewer.entities.add({
                    polygon:{
                        hierarchy : Cesium.Cartesian3.fromDegreesArrayHeights(adapCoordi),
                        material: new Cesium.Color.fromBytes(64, 157, 253, 150),
                        perPositionHeight: true,
                        extrudedHeight: 0.0
                    }
                });

                g_viewer.flyTo(entity);*/

                g_viewer._cesiumWidget._creditContainer.style.display = "none";// 隐藏版权
            },
            onCesiumMouseMove:function (e) {
                //屏幕坐标
                let screenPt = new Cesium.Cartesian2(e.clientX, e.clientY);

                //世界坐标
                let carPt = g_viewer.scene.globe.pick(g_viewer.camera.getPickRay(screenPt), g_viewer.scene);
                let catG = g_viewer.scene.globe.ellipsoid.cartesianToCartographic(carPt);
                let xx = Cesium.Math.toDegrees(catG.longitude);
                let yy = Cesium.Math.toDegrees(catG.latitude);
                let hh = catG.height;

                if(this.bDraw){
                    if((this.polygonPts.length / 2)  >= 3){
                        /*this.polygonPts[this.polygonPts.length - 3] = xx;
                        this.polygonPts[this.polygonPts.length - 2] = yy;
                        this.polygonPts[this.polygonPts.length - 1] = hh;*/
                        this.polygonPts[this.polygonPts.length - 2] = xx;
                        this.polygonPts[this.polygonPts.length - 1] = yy;
                    }
                }

                this.coordShow = "经度:" + xx + "  纬度:" + yy + "  高程:" + parseInt(hh) + "米"
            },
            onBtnClick:function(){
                this.entity = null;
                this.bDraw = true;
                this.polygonPts = [];
            },
            onCesiumLeftClick:function(movement){
                //屏幕坐标
                var wp = g_viewer.scene.globe.pick(
                    g_viewer.camera.getPickRay(movement.position),
                    g_viewer.scene);
                var screenPt = new Cesium.Cartesian2(movement.position.x, movement.position.y);
                //世界坐标
                var carPt = g_viewer.scene.globe.pick(g_viewer.camera.getPickRay(screenPt), g_viewer.scene);
                var catG = g_viewer.scene.globe.ellipsoid.cartesianToCartographic(carPt);
                var xx = Cesium.Math.toDegrees(catG.longitude);
                var yy = Cesium.Math.toDegrees(catG.latitude);
                var hh = catG.height;

                if(this.bDraw){
                    if(this.entity == null){
                        //this.polygonPts.push(xx,yy,hh);
                        this.polygonPts.push(xx,yy);

                        let retVal = Cesium.Cartesian3.fromDegreesArray([
                            112.17796819972155,
                            30.284796490426068,
                            112.47190037692181,
                            30.28852061203611,
                            112.4672880468794,
                            30.07758864193922]);

                        this.entity = g_viewer.entities.add({
                            polygon:{
                                hierarchy : new Cesium.CallbackProperty(this.updateHierarchy, false),//Cesium.Cartesian3.fromDegreesArray(this.polygonPts),
                                material: new Cesium.Color.fromBytes(64, 157, 253, 150),
                                perPositionHeight: true,
                                extrudedHeight: 0.0,
                                heightReference:Cesium.HeightReference.CLAMP_TO_GROUND,
                                extrudedHeightReference:Cesium.HeightReference.CLAMP_TO_GROUND
                            }
                        });
                        //this.entity.polygon.hierarchy._value.positions = new Cesium.CallbackProperty(this.updateHierarchy, false);
                        debugger;
                        g_viewer.flyTo(this.entity);
                    }
                    else{
                        //this.polygonPts.push(xx,yy,hh);
                        this.polygonPts.push(xx,yy);

                        //this.entity.polygon.hierarchy = Cesium.Cartesian3.fromDegreesArray(this.polygonPts);
                    }
                }
            },
            onCesiumLeftDoubleClick:function(movement){
                this.bDraw = false;
            },
            updateHierarchy:function(time, result){
                return new Cesium.PolygonHierarchy(
                    //Cesium.Cartesian3.fromDegreesArrayHeights(this.polygonPts),
                    Cesium.Cartesian3.fromDegreesArray(this.polygonPts),
                    []);
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
</style>
