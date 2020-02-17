<template>
    <el-tabs type="border-card">
        <el-tab-pane label="自定义数据">
            <div>
                <div>
                    <el-select class="sel" multiple collapse-tags
                               v-model="curContacts" style="width: 120px;" placeholder="选择接收人">
                        <el-option
                                v-for="item in contacts"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                    &nbsp;&nbsp;
                    <el-button icon="el-icon-print" type="primary">发送数据</el-button>
                </div>
                <div>
                    <el-input
                            type="textarea"
                            :rows="800"
                            :autosize="{ minRows: 5, maxRows: 800}"
                            placeholder="请输入内容"
                            v-model="textarea2">
                    </el-input>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="条件查询数据">
            <div>
            <Layout>
                <LayoutPanel :border="false" region="north" style="height:50px;">
                    <div>
                        <div style="margin-left: 15px;margin-top: 5px;float: left;">
                            行政区域选择:
                            <el-select class="sel" style="width: 120px;" v-model="curCity" placeholder="选择市(洲)">
                                <el-option
                                        v-for="item in citys"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>
                            &nbsp;&nbsp;
                            <el-select class="sel" style="width: 120px;" v-model="curCounty" placeholder="选择区(县)">
                                <el-option
                                        v-for="item in county"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>
                            数据类型选择:
                            <el-select class="sel" style="width: 120px;" v-model="curDataType" placeholder="选择数据类型">
                                <el-option
                                        v-for="item in dataType"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <el-button icon="el-icon-search" type="primary" @click="onBtnClick">查询</el-button>
                        </div>
                        <div style="margin-left: 15px;margin-top: 5px;float: right;">
                            <el-select class="sel" multiple collapse-tags
                                       v-model="curContacts" style="width: 120px;" placeholder="选择接收人">
                                <el-option
                                        v-for="item in contacts"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>
                            &nbsp;&nbsp;
                            <el-button icon="el-icon-print" type="primary">发送数据</el-button>
                        </div>
                    </div>
                </LayoutPanel>
                <LayoutPanel :border="false" region="center" style="height:100%">
                    <el-table v-if="nShow == 1"
                              :data="tableData"
                              :span-method="objectSpanMethod"
                              :height="tableHeight"
                              border
                              style="width: 100%">
                        <el-table-column
                                type="index"
                                width="40">
                        </el-table-column>
                        <el-table-column
                                prop="col0"
                                label="所属乡镇">
                        </el-table-column>
                        <el-table-column
                                prop="col1"
                                label="站名">
                        </el-table-column>
                        <el-table-column
                                prop="col2"
                                label="昨日降雨(mm)">
                        </el-table-column>
                        <el-table-column
                                prop="col3"
                                label="今日降雨(mm)">
                        </el-table-column>
                        <el-table-column
                                prop="col4"
                                label="三小时(mm)">
                        </el-table-column>
                        <el-table-column
                                prop="col5"
                                :label="col5Label + '(mm)'">
                        </el-table-column>
                        <el-table-column
                                prop="col6"
                                :label="col6Label + '(mm)'">
                        </el-table-column>
                    </el-table>
                    <el-table v-if="nShow == 2"
                              :data="tableData"
                              :span-method="objectSpanMethod"
                              :height="tableHeight"
                              border
                              style="width: 100%">
                        <el-table-column
                                type="index"
                                width="40">
                        </el-table-column>
                        <el-table-column
                                prop="col0"
                                label="所属乡镇">
                        </el-table-column>
                        <el-table-column
                                prop="col1"
                                label="站名">
                        </el-table-column>
                        <el-table-column
                                prop="col2"
                                label="8时水位(m)">
                        </el-table-column>
                        <el-table-column
                                prop="col3"
                                label="8时流量(m³/s)">
                        </el-table-column>
                        <el-table-column
                                prop="col4"
                                label="时间">
                        </el-table-column>
                        <el-table-column
                                prop="col5"
                                label="8时水位(m)">
                        </el-table-column>
                        <el-table-column
                                prop="col6"
                                label="8时流量(m³/s)">
                        </el-table-column>
                    </el-table>
                </LayoutPanel>
            </Layout>
            <!--<el-row :gutter="10">
                <div style="margin-left: 15px;">
                    行政区域选择:
                    <el-select v-model="curCity" placeholder="请选择">
                        <el-option
                                v-for="item in citys"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </div>
            </el-row>-->
        </div>
        </el-tab-pane>
    </el-tabs>

</template>

<script>
    export default {
        name: "sssjfb",
        data(){
            return{
                citys:['兰州市','嘉峪关市','金昌市','白银市','天水市','武威市','张掖市','平凉市','酒泉市','庆阳市','定西市','陇南市','临夏回族自治州','甘南藏族自治州'],
                curCity:'兰州市',
                county:[],
                curCounty:'',
                dataType:['雨情','水情','水资源','水环境','工情','旱情'],
                curDataType:'雨情',
                contacts:[],
                curContacts:'',
                textarea2:'',
                nShow:1,
                fullWidth:(document.documentElement.clientWidth - 202) + 'px',
                fullHeight:(document.documentElement.clientHeight - 72) + 'px',
                tableHeight:document.documentElement.clientHeight - 195,
                tableData:[],
                col5Label:'',
                col6Label:''
            }
        },
        mounted:function(){
            this.initCounty();
            this.initContacts();

            let dateNow = new Date();
            let hh1 = dateNow.getHours();
            let hh2 = hh1 - 1;
            this.col5Label = hh2 + '-' + hh1 + '时';

            this.col6Label = hh1 + '时(0-' + dateNow.getMinutes() + ')';

            this.onBtnClick();
        },
        watch:{
            curCity(val){
                this.initCounty();
            },
            curDataType(val){
                this.tableData = [];
                if(val == '雨情'){
                    this.nShow = 1;
                }
                else if(val == '水情'){
                    this.nShow = 2;
                }
                else{
                    this.nShow = 3;
                }
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
            initContacts:function(){
                debugger;
                let Mock = require('mockjs');
                for(let i=0;i<50;i++){
                    this.contacts.push(Mock.Random.cname());
                }
            },
            objectSpanMethod:function({ row, column, rowIndex, columnIndex }){
                let Mock = require('mockjs');
                let rowMerge = Mock.Random.integer(5,10);
                if(columnIndex == 1){
                    if(rowIndex % 5 == 0){
                        return {
                            rowspan: 5,
                            colspan: 1
                        };
                    }
                    else{
                        return {
                            rowspan: 0,
                            colspan: 1
                        };
                    }
                }
            },
            //查询按钮点击
            onBtnClick:function () {
                this.tableData = [];
                let Mock = require('mockjs');
                if(this.curDataType == '雨情'){
                    for(let i = 0;i < 100;i++){
                        this.tableData.push({
                            col0:Mock.Random.cword( 2, 3) + Mock.Random.cword('乡镇'),
                            col1:Mock.Random.cword( 2, 3) + '站',
                            col2:Mock.Random.float(10, 50, 2, 2),
                            col3:Mock.Random.float(10, 40, 2, 2),
                            col4:Mock.Random.float(8, 35, 2, 2),
                            col5:Mock.Random.float(5, 20, 2, 2),
                            col6:Mock.Random.float(5, 15, 2, 2),
                        });
                    }
                }
                else if(this.curDataType == '水情'){
                    for(let i = 0;i < 30;i++){
                        this.tableData.push({
                            col0:Mock.Random.cword( 2, 3) + Mock.Random.cword('乡镇'),
                            col1:Mock.Random.cword( 2, 3) + '站',
                            col2:Mock.Random.float(70, 80, 2, 2),
                            col3:Mock.Random.float(2000, 3000, 2, 2),
                            col4:Mock.Random.time('HH:mm'),
                            col5:Mock.Random.float(70, 80, 2, 2),
                            col6:Mock.Random.float(2000, 3000, 2, 2),
                        });
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .sel /deep/ .el-input__inner{
            height: 30px;
    }
</style>
