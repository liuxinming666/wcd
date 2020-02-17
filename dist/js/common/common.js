export default {
    //add by ym 2017/6/21 11:59
    /*实现DateAdd功能*/
    DateAdd: function (interval, number, date) {
        number = parseInt(number);
        if (typeof (date) == "string") {
            date = date.replace(/-/g, "/");
             date = new Date(date);
        }
        if (typeof (date) == "object") {
             date = date
        }
        switch (interval) {
            case "y": {
                date.setFullYear(date.getFullYear() + number);
                return date;
                break;
            }
            case "q": {
                date.setMonth(date.getMonth() + number * 3);
                return date;
                break;
            }
            case "m": {
                date.setMonth(date.getMonth() + number);
                return date;
                break;
            }
            case "w": {
                date.setDate(date.getDate() + number * 7);
                return date;
                break;
            }
            case "d": {
                date.setDate(date.getDate() + number);
                return date;
                break;
            }
            case "hh": {
                date.setHours(date.getHours() + number);
                return date;
                break;
            }
            case "mm": {
                date.setMinutes(date.getMinutes() + number);
                return date;
                break;
            }
            case "ss": {
                date.setSeconds(date.getSeconds() + number);
                return date;
                break;
            }
            default: {
                date.setDate(date.getDate() + number);
                return date;
                break;
            }
        }
    },
    //add by ym 2017/6/21 11:59
    /*保留2位小数*/
    changevalue: function (val, row) {
        //var s = "";
        //if ( val != null) {

        //        var f = parseFloat(val);
        //        if (isNaN(f)) {
        //            return "";
        //        }
        //        var f = Math.round(val * 100) / 100;
        //        s = f.toString();
        //        var rs = s.indexOf('.');
        //        if (rs < 0) {
        //            rs = s.length;
        //            s += '.';
        //        }
        //        while (s.length <= rs + 2) {
        //            s += '0';

        //    }
        //}
        //return s;
        return toDecimal(val, 2);
    },
//add by ym 2017/6/21 11:59
    /*保留1位小数*/
    Round1: function (val, row) {
        //var s = "";
        //if ( val != null ) {
        //    var f = parseFloat(val);
        //    if (isNaN(f)) {
        //        return "";
        //    }
        //    var f = Math.round(val * 10) / 10;
        //    s = f.toString();
        //    var rs = s.indexOf('.');
        //    if (rs < 0) {
        //        rs = s.length;
        //        s += '.';
        //    }
        //    while (s.length <= rs + 1) {
        //        s += '0';
        //    }
        //}
        //return s;
        return toDecimal(val, 1);
    },
    Round1New: function (val, row) {
        var s = "";
        if (val != null) {
            let f = parseFloat(val);
            if (isNaN(f) || f <= 0) {
                return "";
            }
            f = Math.round(val * 10) / 10;
            s = f.toString();
            let rs = s.indexOf('.');
            if (rs < 0) {
                rs = s.length;
                s += '.';
            }
            while (s.length <= rs + 1) {
                s += '0';
            }
        }
        return s;
    },
    toDecimal: function (x, dotnum) {

        if (x) {
            if (isNaN(x)) {
                return "";
            }
            let num = parseFloat(x);

            let f = Math.round(num * Math.pow(10, dotnum)) / Math.pow(10, dotnum);
            let s = f.toString();
            let rs = s.indexOf('.');
            if (rs < 0) {
                rs = s.length;
                s += '.';
            }
            while (s.length <= rs + dotnum) {
                s += '0';
            }
            //console.log(x + "," + s);
            return s;
        }
        return "";
    },

//add by ym 2017/8/15 14:20
    /*保留有效数*/
    /*v值*/
    /*sgnDgt保留有效数字个数*/
    changeQvalue: function (val, row) {
        val = SaveThreeN(val, 3);
        return val;
    },
    /*保留N位有效数字
      add by sun 2017/8/26
    */
    SaveThreeN: function (v, sgnDgt) {

        if (v == null) {
            return "";
        }
        let d = parseFloat(v);
        if (isNaN(d)) {
            return "";
        }
        let forated = d.toPrecision(sgnDgt);
        if (forated.indexOf(".") != -1) {
            if (forated.length > sgnDgt + 1) {
                return Number(forated);
            }
        } else {
            if (forated.length > sgnDgt) {
                return Number(forated);
            }
        }
        return forated;

    },
//add by ym 2017/7/18
    /*显示站类*/
    changesttp: function (val, row) {
        if (val != "" && val != null && val != undefined) {
            switch (val) {
                case "PP":
                    val = "雨量站";
                    break;
                case "DD":
                    val = "堰闸水文站";
                    break;
                case "RR":
                    val = "水库水文站";
                    break;
                case "ZZ":
                    val = "河道水位水文站";
                    break;
                case "ZQ":
                    val = "河道水文站";
                    break;
                case "MM":
                    val = "气象站";
                    break;
                case "BB":
                    val = "蒸发站";
                    break;
                case "DP":
                    val = "泵站";
                    break;
                case "ZG":
                    val = "地下水";
                    break;
            }

        } else {
            val = "";
        }
        return val;
    },
//add by ym 2017/7/19
    /*根据数字显示天气中文*/
    changewather: function (val, row) {
        if (val != "" && val != null && val != undefined) {
            switch (val) {
                case "5":
                    val = "雪";
                    break;
                case "6":
                    val = "雨夹雪";
                    break;
                case "7":
                    val = "雨";
                    break;
                case "8":
                    val = "阴";
                    break;
                case "9":
                    val = "晴";
                    break;


            }

        } else {
            val = "";
        }
        return val;
    },
//add by ym 2017/7/19
    /*根据数字显示水势中文*/
    changewptn: function (val, row) {
        if (val != "" && val != null && val != undefined) {
            switch (val) {
                case "4":
                    val = "<img src=\"/Content/images/j.gif\">";
                    break;
                case "5":
                    val = "<img src=\"/Content/images/s.gif\">";
                    break;
                case "6":
                    val = "<img src=\"/Content/images/p.gif\">";
                    break;
            }

        } else {
            val = "缺测";
        }
        return val;
    },

    //转换水势
    Rwtn:function(code) {
        let str = "";
        switch (code) {
            case "4":
                str = "↓";
                break;
            case "5":
                str = "↑";
                break;
            case "6":
                str = "-";
                break;
            default:
                str = "";
                break;
        }
        return str;

    },
//add by ym 2017/7/19
    /*根据数字显示堰闸闸水特征*/
    changeswchrcd: function (val, row) {
        if (val != "" && val != null && val != undefined) {
            switch (val) {
                case "1":
                    val = "干涸";
                    break;
                case "2":
                    val = "断流";
                    break;
                case "3":
                    val = "流向不定";
                    break;
                case "4":
                    val = "逆流";
                    break;
                case "5":
                    val = "起涨";
                    break;
                case "6":
                    val = "洪峰";
                    break;
                case "P":
                    val = "水电厂发电流量";
                    break;
            }

        } else {
            val = "";
        }
        return val;
    },
    /*转换UTC*/
    ToUTC: function (date) {
        date = date.replace(/-/g, "/");
        let dt = new Date(date); //StringToDate(date);

        return Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes());
    },
//add by ym 2017-11-01
//按照浮点数真实大小排序
    numberSort: function (a, b) {
        let number1 = parseFloat(a);
        let number2 = parseFloat(b);

        return (number1 > number2 ? 1 : -1);
    },
    /**
     * 格式化字符串
     * 用法:
     .formatString("{0}-{1}","a","b");
     */
    formatString: function () {
        for (let i = 1; i < arguments.length; i++) {
            let exp = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            arguments[0] = arguments[0].replace(exp, arguments[i]);
        }
        return arguments[0];
    },

    /**
     * 格式化时间显示方式
     * 用法:format="yyyy-MM-dd hh:mm:ss";
     */
    formatDate: function (v, format) {
        if (!v) return "";
        let d = v;
        if (typeof v === 'string') {
            if (v.indexOf("/Date(") > -1)
                d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
            else
                d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
        }
        let o = {
            "M+": d.getMonth() + 1,  //month
            "d+": d.getDate(),       //day
            "h+": d.getHours(),      //hour
            "m+": d.getMinutes(),    //minute
            "s+": d.getSeconds(),    //second
            "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
            "S": d.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    },

    /**
     * 格式化数字显示方式
     * 用法
     * formatNumber(12345.999,'#,##0.00');
     * formatNumber(12345.999,'#,##0.##');
     * formatNumber(123,'000000');
     */
    formatNumber: function (v, pattern) {
        if (v == null)
            return v;
        let strarr = v ? v.toString().split('.') : ['0'];
        let fmtarr = pattern ? pattern.split('.') : [''];
        let retstr = '';
        // 整数部分
        let str = strarr[0];
        let fmt = fmtarr[0];
        let i = str.length - 1;
        let comma = false;
        for (let f = fmt.length - 1; f >= 0; f--) {
            switch (fmt.substr(f, 1)) {
                case '#':
                    if (i >= 0) retstr = str.substr(i--, 1) + retstr;
                    break;
                case '0':
                    if (i >= 0) retstr = str.substr(i--, 1) + retstr;
                    else retstr = '0' + retstr;
                    break;
                case ',':
                    comma = true;
                    retstr = ',' + retstr;
                    break;
            }
        }
        if (i >= 0) {
            if (comma) {
                let l = str.length;
                for (; i >= 0; i--) {
                    retstr = str.substr(i, 1) + retstr;
                    if (i > 0 && ((l - i) % 3) == 0) retstr = ',' + retstr;
                }
            } else retstr = str.substr(0, i + 1) + retstr;
        }
        retstr = retstr + '.';
        // 处理小数部分
        str = strarr.length > 1 ? strarr[1] : '';
        fmt = fmtarr.length > 1 ? fmtarr[1] : '';
        i = 0;
        for (let f = 0; f < fmt.length; f++) {
            switch (fmt.substr(f, 1)) {
                case '#':
                    if (i < str.length) retstr += str.substr(i++, 1);
                    break;
                case '0':
                    if (i < str.length) retstr += str.substr(i++, 1);
                    else retstr += '0';
                    break;
            }
        }
        return retstr.replace(/^,+/, '').replace(/\.$/, '');
    },


    //把一串数字转为制定格式（改变时间）
    transferTime: function (cTime,format) {
        //将json串的一串数字进行解析
        let jsonDate = new Date(parseInt(cTime));
        //为Date对象添加一个新属性，主要是将解析到的时间数据转换为我们熟悉的“yyyy-MM-dd hh:mm:ss”样式
        Date.prototype.format = function (format) {
            let o = {

                //获得解析出来数据的相应信息，可参考js官方文档里面Date对象所具备的方法

                "y+": this.getFullYear(),//得到对应的年信息
                "M+": this.getMonth() + 1, //得到对应的月信息，得到的数字范围是0~11，所以要加一
                "d+": this.getDate(), //得到对应的日信息
                "h+": this.getHours(), //得到对应的小时信息 
                "m+": this.getMinutes(), //得到对应的分钟信息
                "s+": this.getSeconds(), //得到对应的秒信息

            }

            //将年转换为完整的年形式
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1,
                    (this.getFullYear() + "")
                        .substr(4 - RegExp.$1.length));
            }

            //连接得到的年月日 时分秒信息
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1,
                        RegExp.$1.length == 1 ? o[k] : ("00" + o[k])
                            .substr(("" + o[k]).length));
                }
            }
            return format;
        }
        let newDate = jsonDate.format(format);
        return newDate;
    }

}