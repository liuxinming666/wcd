(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ac0a7"],{"189c":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ComboGrid",{staticStyle:{width:"200px"},attrs:{valueField:"stcd",textField:"stnm",data:t.comboBoxData,editable:!0,panelStyle:{width:"400px"},lazy:!0,multiple:t.multiple,placeholder:"输入站码、站名或拼音码"},on:{filterChange:t.onFilterChange,valueChange:t.valuechange},model:{value:t.comboBoxValue,callback:function(e){t.comboBoxValue=e},expression:"comboBoxValue"}},[a("DataGrid",{attrs:{slot:"grid",border:!1},slot:"grid"},[a("GridColumn",{attrs:{field:"stcd",title:"站点",",":"",width:"30%",",align":"center"}}),a("GridColumn",{attrs:{field:"stnm",title:"站名",",":"",width:"35%",",align":"center"}}),a("GridColumn",{attrs:{field:"sttp",title:"站类",",width":"35%",",align":"center"}})],1)],1)],1)},i=[],n={name:"station-comgrid",data:function(){return{comboBoxValue:"",comboBoxData:this.getdata("")}},props:["sttp","multiple"],methods:{onFilterChange:function(t){this.getdata(t.filterValue)},getdata:function(t){var e=this,a={params:{keywords:t,sttp:this.sttp}};this.axios.get("/api/station/getStaionsInfoByKeywords",a).then((function(t){e.comboBoxData=t.data}),(function(t){alert("error")}))},valuechange:function(){this.$emit("stationchange",this.comboBoxValue)}}},l=n,r=a("2877"),s=Object(r["a"])(l,o,i,!1,null,"dc7d02a4",null);e["default"]=s.exports}}]);
//# sourceMappingURL=chunk-2d0ac0a7.c96b97c2.js.map