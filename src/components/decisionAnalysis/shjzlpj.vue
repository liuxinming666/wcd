<template>
    <div>
        <Layout>
            <LayoutPanel region="north" style="height:50px;">
                <div>
                    <div style="margin-left: 15px;margin-top: 5px;float: left;">
                        行政区域选择:
                        <el-select class="sel" style="width: 150px;" v-model="curCity" placeholder="选择市(洲)">
                            <el-option
                                    v-for="item in citys"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                        &nbsp;&nbsp;
                        <el-select class="sel" style="width: 150px;" v-model="curCounty" placeholder="选择区(县)">
                            <el-option
                                    v-for="item in county"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                        &nbsp;&nbsp;
                        月份选择:
                        <el-date-picker
                                style="width: 150px;"
                                v-model="value2"
                                type="month"
                                placeholder="选择月">
                        </el-date-picker>
                        &nbsp;&nbsp;
                        <el-button icon="el-icon-search" @click="onBtnClick" type="primary">查询</el-button>
                    </div>
                </div>
            </LayoutPanel>
            <LayoutPanel region="center" :border="false" style="height:100%">
                <div>
                    <el-table
                            :data="tableData"
                            :height="tableHeight"
                            border
                            style="width: 100%">
                        <el-table-column
                                type="index"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                prop="col1"
                                label="河流名称">
                        </el-table-column>
                        <el-table-column
                                prop="col2"
                                label="总体水质">
                        </el-table-column>
                        <el-table-column
                                prop="col3"
                                label="所属街镇园区">
                        </el-table-column>
                        <el-table-column
                                prop="col4"
                                label="总体水质">
                        </el-table-column>
                    </el-table>
                </div>
            </LayoutPanel>
        </Layout>
    </div>
</template>

<script>
    export default {
        name: "shjzlpj",
        data(){
            return{
                fullHeight:(document.documentElement.clientHeight - 80) + 'px',
                tableData:[],
                tableHeight:document.documentElement.clientHeight - 150,
                citys:['兰州市','嘉峪关市','金昌市','白银市','天水市','武威市','张掖市','平凉市','酒泉市','庆阳市','定西市','陇南市','临夏回族自治州','甘南藏族自治州'],
                curCity:'兰州市',
                county:[],
                curCounty:'',
                value2:''
            }
        },
        mounted:function () {
            this.initCounty();

            var now = new Date();
            this.value2 = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())).toISOString().slice(0, 10);

            this.onBtnClick();
        },
        watch:{
            curCity(val){
                this.initCounty();
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
            onBtnClick:function () {
                let Mock = require('mockjs');
                this.tableData = [];
                for(let i=0;i<50;i++){
                    this.tableData.push({
                        col1:Mock.Random.cword( 2, 5 ) + '河',
                        col2:Mock.Random.cword('12345') + '类',
                        col3:Mock.Random.cword(2,5) + Mock.Random.cword('乡镇'),
                        col4:Mock.Random.cword('12345') + '类'
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>
