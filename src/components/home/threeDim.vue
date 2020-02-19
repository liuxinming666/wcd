<template>
    <div>
        <div id="cesiumContainer">
        </div>
    </div>
</template>

<script>
    var g_viewer = null;

    export default {
        name: "threeDim",
        data() {
            return {}
        },
        mounted: function () {
            this.initMap();
        },
        methods: {
            initMap: function () {
                g_viewer = new Cesium.Viewer('cesiumContainer', {
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

                g_viewer.scene.camera.flyTo({destination: rectangle});
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
