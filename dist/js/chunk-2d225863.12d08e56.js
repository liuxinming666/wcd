(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d225863"],{e585:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{"overflow-x":"hidden","overflow-y":"hidden"}},[n("el-menu",{key:e.menuData,ref:"elMenu",staticClass:"el-menu-vertical-demo",staticStyle:{border:"0px",margin:"0px"},attrs:{"default-active":e.curActiveIndex},on:{select:e.onClickMenuItem}},[e._l(e.menuData,(function(t,a){return 0==t.submenu.length?n("el-menu-item",{attrs:{index:t.code+"$"+t.url}},[n("i",{staticClass:"el-icon-location"}),n("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(t.name))])]):e._e()})),e._l(e.menuData,(function(t,a){return 0!=t.submenu.length?n("el-submenu",{attrs:{index:t.code}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-menu"}),n("span",[e._v(e._s(t.name))])]),e._l(t.submenu,(function(t,a){return n("el-menu-item",{attrs:{index:t.code+"$"+t.url}},[e._v(e._s(t.name)+" ")])}))],2):e._e()}))],2)],1)},u=[],i=(n("ac1f"),n("1276"),{name:"leftMenu",data:function(){return{curActiveIndex:""}},props:{menuData:{}},watch:{menuData:{handler:function(e,t){this.initMenu()}}},methods:{onClickMenuItem:function(e,t){this.curActiveIndex=e;var n=e.split("$");"null"==n[1]?this.$emit("changeCenter",!0,""):this.$emit("changeCenter",!1,n[1])},initMenu:function(){for(var e=!1,t=0;t<this.menuData.length;t++){if(e)break;if(0==this.menuData[t].submenu.length){var n=this.menuData[t].code+"$"+this.menuData[t].url;this.onClickMenuItem(n,""),e=!0}}for(var a=0;a<this.menuData.length;a++){if(e)break;if(0!=this.menuData[a].submenu.length){var u=this.menuData[a].submenu[0].code+"$"+this.menuData[a].submenu[0].url;this.onClickMenuItem(u,""),e=!0}}}}}),s=i,l=n("2877"),r=Object(l["a"])(s,a,u,!1,null,"be1af0fe",null);t["default"]=r.exports}}]);
//# sourceMappingURL=chunk-2d225863.12d08e56.js.map