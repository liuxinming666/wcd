(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-42c73f4e"],{"1f54":function(t,a,e){},"20f3":function(t,a,e){"use strict";var r=e("1f54"),n=e.n(r);n.a},"2c4d":function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticStyle:{width:"100%",height:"100%"}},[e("Layout",{staticStyle:{width:"100%",height:"100%"}},[e("LayoutPanel",{staticStyle:{width:"200px"},attrs:{region:"east",title:"工具栏",collapsible:"true",expander:"true",collapsed:"true",collapsedSize:"20"}},[e("Accordion",{staticStyle:{height:"200px"}},[e("AccordionPanel",{attrs:{title:"模式选择"}},[e("div",[e("label",[e("input",{attrs:{id:"rbEChart",name:"setFrameMode",type:"radio",value:"1",checked:""},on:{click:function(a){return t.onFrameModeSetChange("1")}}}),t._v("极速模式")]),e("label",[e("input",{attrs:{id:"rbTensorflow",name:"setFrameMode",type:"radio",value:"2"},on:{click:function(a){return t.onFrameModeSetChange("2")}}}),t._v("普通模式")])])]),e("AccordionPanel",{attrs:{title:"拟合方法"}},[e("div",[e("label",[e("input",{attrs:{name:"setRadio",type:"radio",value:"5"},on:{click:function(a){return t.onModeSetChange("5")}}}),t._v("线 性")]),t._v(" "),e("label",[e("input",{attrs:{name:"setRadio",type:"radio",value:"1",checked:""},on:{click:function(a){return t.onModeSetChange("1")}}}),t._v("二项式")])]),e("div",[e("label",[e("input",{attrs:{name:"setRadio",type:"radio",value:"6"},on:{click:function(a){return t.onModeSetChange("6")}}}),t._v("三项式")]),t._v(" "),e("label",[e("input",{attrs:{name:"setRadio",type:"radio",value:"7"},on:{click:function(a){return t.onModeSetChange("7")}}}),t._v("四项式")])]),e("div",[e("label",[e("input",{attrs:{name:"setRadio",type:"radio",value:"2"},on:{click:function(a){return t.onModeSetChange("2")}}}),t._v("对 数")]),t._v(" "),e("label",[e("input",{attrs:{name:"setRadio",type:"radio",value:"3"},on:{click:function(a){return t.onModeSetChange("3")}}}),t._v("指 数")])]),e("div",[e("label",{staticStyle:{display:"none"},attrs:{id:"labelMi"}},[e("input",{attrs:{name:"setRadio",onchange:"onModeSetChange(this);",type:"radio",value:"4"}}),t._v("幂")])]),e("div",[e("label",[e("input",{attrs:{id:"chkIsRope",onchange:"onChkIsRopeChange(this);",type:"checkbox"}}),t._v(" 是否考虑绳套")])])]),e("AccordionPanel",{attrs:{title:"图表设置"}},[e("p",[t._v("Content3")])])],1)],1),e("LayoutPanel",{staticStyle:{height:"100%"},attrs:{region:"center"}},[e("div",{ref:"chart",staticClass:"highcharts-container"})])],1)],1)},n=[],i=(e("acd8"),e("4c53"),e("96cf"),e("89ba")),s=e("e591"),o=e.n(s),c=e("33c6"),l=e.n(c),h=e("4523"),f=e.n(h),u=e("67d5"),d=e.n(u),p=e("b6d1"),b=e.n(p);l()(o.a),f()(o.a),d()(o.a),b()(o.a);var g={name:"zqrl-set",props:{stcd:"",stnm:"",parWnd:{}},data:function(){return{chart:null,g_threeLineData:null,sTypeMode:"1",g_lineModeSet:"1",g_xMaxTrain:0,g_yMaxTrain:0,g_xMinTrain:0,g_yMinTrain:0,a:tf.variable(tf.scalar(Math.random())),b:tf.variable(tf.scalar(Math.random())),c:tf.variable(tf.scalar(Math.random())),d:tf.variable(tf.scalar(Math.random())),e:tf.variable(tf.scalar(Math.random())),aECStat:tf.variable(tf.scalar(Math.random())),bECStat:tf.variable(tf.scalar(Math.random())),cECStat:tf.variable(tf.scalar(Math.random())),dECStat:tf.variable(tf.scalar(Math.random())),eECStat:tf.variable(tf.scalar(Math.random()))}},mounted:function(){this.initData()},methods:{initData:function(){var t=this,a={params:{stcd:this.stcd}};this.axios.get("/api/getMeasurDataByStcd",a).then((function(a){var e=a.data;t.g_threeLineData=a.data;for(var r=e.length,n=new Array,i=0;i<r;i++)n.push({x:parseFloat(e[i].q),y:parseFloat(e[i].z)});var s=new Array;s.push({type:"scatter",name:"实测点",data:n}),t.setChartData(s)}),(function(t){}))},setChartData:function(t){var a={title:{text:this.stnm+"水位流量关系曲线"},credits:{enabled:!1},tooltip:{formatter:function(){return"<b>水位:</b><b>"+this.y+"</b><br/><b>流量:</b><b>"+this.x+"</b>"}},xAxis:{title:{text:"流量(m³/s)"},gridLineWidth:1},yAxis:{title:{text:"水位(m)"},gridLineWidth:1},series:t};this.chart=new o.a.Chart(this.$refs.chart,a),this.fitLineECStat()},reflowChart:function(){this.chart.reflow()},onFrameModeSetChange:function(t){this.shippingType=t,"1"==t?this.fitLineECStat():alert("普通模式")},onModeSetChange:function(t){this.g_lineModeSet=t},fitLineECStat:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var a,e,r,n,i,s,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:for(a=this.processTrainDataECStat(),e=a["xNor"].dataSync(),r=a["yNor"].dataSync(),n=a["xNor"].dataSync().length,i=new Array,s=0;s<n;s++)i.push([parseFloat(e[s]),parseFloat(r[s])]);t.t0=this.g_lineModeSet,t.next="1"===t.t0?9:"6"===t.t0?14:"7"===t.t0?20:"2"===t.t0?27:"3"===t.t0?31:"4"===t.t0?36:"5"===t.t0?41:45;break;case 9:return o=ecStat.regression("polynomial",i,2),this.aECStat=tf.scalar(o.parameter[2],"float32"),this.bECStat=tf.scalar(o.parameter[1],"float32"),this.cECStat=tf.scalar(o.parameter[0],"float32"),t.abrupt("break",45);case 14:return o=ecStat.regression("polynomial",i,3),this.aECStat=tf.scalar(o.parameter[3],"float32"),this.bECStat=tf.scalar(o.parameter[2],"float32"),this.cECStat=tf.scalar(o.parameter[1],"float32"),this.dECStat=tf.scalar(o.parameter[0],"float32"),t.abrupt("break",45);case 20:return o=ecStat.regression("polynomial",i,4),this.aECStat=tf.scalar(o.parameter[4],"float32"),this.bECStat=tf.scalar(o.parameter[3],"float32"),this.cECStat=tf.scalar(o.parameter[2],"float32"),this.dECStat=tf.scalar(o.parameter[1],"float32"),this.eECStat=tf.scalar(o.parameter[0],"float32"),t.abrupt("break",45);case 27:return o=ecStat.regression("logarithmic",i),this.aECStat=tf.scalar(o.parameter["gradient"],"float32"),this.bECStat=tf.scalar(o.parameter["intercept"],"float32"),t.abrupt("break",45);case 31:return o=ecStat.regression("exponential",i),this.aECStat=tf.scalar(o.parameter["coefficient"],"float32"),this.bECStat=tf.scalar(o.parameter["index"],"float32"),this.cECStat=tf.scalar(0),t.abrupt("break",45);case 36:return o=ecStat.regression("polynomial",i,2),this.aECStat=tf.scalar(o.parameter[2],"float32"),this.bECStat=tf.scalar(o.parameter[1],"float32"),this.cECStat=tf.scalar(o.parameter[0],"float32"),t.abrupt("break",45);case 41:return o=ecStat.regression("linear",i),this.aECStat=tf.scalar(o.parameter["gradient"],"float32"),this.bECStat=tf.scalar(o.parameter["intercept"],"float32"),t.abrupt("break",45);case 45:case 46:case"end":return t.stop()}}),t,this)})));function a(){return t.apply(this,arguments)}return a}(),processTrainDataECStat:function(){for(var t=this.g_threeLineData,a=this.g_threeLineData.length,e=new Array,r=new Array,n=0;n<a;n++)e.push(t[n].z),r.push(t[n].q);var i=tf.tensor2d(e,[a,1]),s=tf.tensor2d(r,[a,1]);this.g_xMaxTrain=i.max(),this.g_yMaxTrain=s.max(),this.g_xMinTrain=i.min(),this.g_xMinTrain=tf.sub(this.g_xMinTrain,tf.scalar(.001,"float32")),this.g_yMinTrain=s.min(),this.g_yMinTrain=tf.sub(this.g_yMinTrain,tf.scalar(.001,"float32"));var o=tf.div(i.sub(this.g_xMinTrain),this.g_xMaxTrain.sub(this.g_xMinTrain)),c=tf.div(s.sub(this.g_yMinTrain),this.g_yMaxTrain.sub(this.g_yMinTrain));return{xNor:o,yNor:c}}}},m=g,S=(e("20f3"),e("2877")),v=Object(S["a"])(m,r,n,!1,null,"0dec8bb6",null);a["default"]=v.exports},"4c53":function(t,a,e){"use strict";var r=e("23e7"),n=e("857a"),i=e("eae9");r({target:"String",proto:!0,forced:i("sub")},{sub:function(){return n(this,"sub","","")}})}}]);
//# sourceMappingURL=chunk-42c73f4e.18e77bb9.js.map