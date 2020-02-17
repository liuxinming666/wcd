<template>
    <div>
        <Layout>
            <LayoutPanel region="west" :split="true"
                         :bodyStyle="{padding:'0px'}"
                         :panelStyle="{width: '200px',minWidth:'0px'}" style="overflow: hidden;">
                <div>
                    <Tree :data="treeData"
                          @nodeExpand="onTreeNodeExpand($event)"
                          @nodeClick="onTreeNodeClick($event)">
                    </Tree>
                </div>
            </LayoutPanel>
            <LayoutPanel region="center" :style="{height:pageHeight}">
                <div>
                    <el-table
                            :data="tableData"
                            :height="tableHeight"
                            :border = "true">
                        <el-table-column v-for="(item,index) in tableField"
                                         :prop="item.COLUMN_NAME"
                                         :formatter="item.FORMATTER"
                                         :label="item.COMMENTS">
                        </el-table-column>
                        <el-table-column
                                align="right" width="150">
                            <template slot="header" slot-scope="scope">
                                <div class="el-table-add-row" style="width: 99.2%;cursor: pointer;" @click="handleTableAddData">
                                    <span>+ 添加数据</span>
                                </div>
                            </template>
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        @click="handleTableDataEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleTableDataDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            style="height: 10px;"
                            @size-change="handlerPageSizeChange($event)"
                            @current-change="handlerPageNumChange($event)"
                            :hide-on-single-page="false"
                            :page-size="20"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="dataTotalNum">
                    </el-pagination>
                    <Dialog ref="d1"
                            @close="btnEditDataClose"
                            v-if="editDialogShow"
                            :closed="true"
                            iconCls="icon-edit"
                            :title="'编辑数据'"
                            :draggable="true"
                            :dialogStyle="{width:'400px',height:'450px'}"
                            :modal="true">
                        <div>
                            <div v-for="(item,index) in tableField">
                                <el-tag type="success">{{item.COMMENTS + ':'}}</el-tag>
                                <el-input
                                        size="medium"
                                        v-model="curEditRow[item.COLUMN_NAME]">
                                </el-input>
                            </div>
                            <el-button style="float: right; margin: 5px;"
                                       @click="btnEditDataCancel"
                                       type="primary">
                                取消
                            </el-button>
                            <el-button style="float: right; margin: 5px;"
                                       type="danger"
                                       @click="btnEditDataOk">
                                确定
                            </el-button>
                        </div>
                    </Dialog>
                    <Dialog ref="dAdd"
                            :closed="true"
                            iconCls="icon-add"
                            :title="'添加数据'"
                            :draggable="true"
                            :dialogStyle="{width:'400px',height:'450px'}"
                            :modal="true">
                        <div>
                            <div v-for="(item,index) in tableField">
                                <el-tag type="success">{{item.COMMENTS + ':'}}</el-tag>
                                <el-input
                                        @input="inputChange"
                                        size="medium"
                                        :readonly="false"
                                        v-model="curAddRow[item.COLUMN_NAME]">
                                </el-input>
                            </div>
                            <el-button style="float: right; margin: 5px;"
                                       @click="btnAddDataCancel"
                                       type="primary">
                                取消
                            </el-button>
                            <el-button style="float: right; margin: 5px;"
                                       type="danger"
                                       @click="btnAddDataOk">
                                确定
                            </el-button>
                        </div>
                    </Dialog>
                </div>
            </LayoutPanel>
        </Layout>
    </div>
</template>

<script>


    export default {
        name: "dataMaintain",
        data(){
            return{
                pageHeight:(document.documentElement.clientHeight - 75) + 'px',//当前组件的页面高度
                tableHeight:(document.documentElement.clientHeight - 101 - 10).toString(),        //当前表格的高度
                treeData:[
                    {
                        id:'RTDB',
                        text:'实时水雨情库',
                        state: 'closed'
                    },
                    {
                        id:'JAVADTX',
                        text:'系统管理数据库',
                        state:'closed'
                    }
                ],  //树数据
                tableField:[{
                    COLUMN_NAME:'暂无数据',
                    COMMENTS:'暂无数据'
                }],     //表格的字段数据
                tableData:null,      //表格的数据
                dataTotalNum:0,      //数据的总条数
                pageSize:20,     //表格一页显示多少条数数据
                curPageNum:1,        //当前页码数
                curTableName:'',     //当前数据表对应数据库中的表名，带用户名的
                editDialogShow:true,
                curEditRow:{'暂无数据':''},    //当前进行编辑的行
                curEditRorOri:null,      //当前进行编辑的行的原始数据
                curAddRow:{'暂无数据':''}      //当前要添加的行的数据
            }
        },
        methods:{
            //展开树节点事件
            onTreeNodeExpand:function (event) {
                let node = event;
                if (!node.children){
                    let params = {
                        params:{
                            owner: node.id
                        }
                    };

                    this.axios.get('api/dbInfo/getAllTablesByOwner', params)
                        .then(res => {
                            // 成功回调
                            let retData = res.data;
                            let nodeData = [];
                            for(let i = 0;i<retData.length;i++){
                                let tmpId = node.id + '.' + retData[i].TABLE_NAME;
                                let tmpName;
                                if(!retData[i].COMMENTS)
                                {
                                    tmpName = retData[i].TABLE_NAME;
                                }
                                else
                                {
                                    tmpName = retData[i].COMMENTS;
                                }
                                nodeData.push({id:tmpId,text:tmpName});
                            }
                            this.$set(node, "children", nodeData);
                        }, res => {
                            debugger;
                            // 错误回调
                        });
                }
            },
            //点击树节点事件
            onTreeNodeClick:function(node){
                this.curTableName = node.id;
                let params = {
                    params:{
                        pageNum:this.curPageNum,
                        pageSize:this.pageSize,
                        tableName: this.curTableName
                    }
                };

                this.axios.get('api/dbQuery/getTableDataByName', params)
                    .then(res => {
                        // 成功回调
                        let tableField = res.data[0];   //表字段信息
                        let tableData = res.data[1];    //表中数据

                        //重构表的字段数据
                        this.tableField = new Array();
                        this.curAddRow = {};
                        for(let i=0;i<tableField.length;i++){
                            //判断字段的注释是否为空
                            let comentsTmp;
                            if(!tableField[i].COMMENTS) {
                                comentsTmp = tableField[i].COLUMN_NAME;
                            }
                            else{
                                comentsTmp = tableField[i].COMMENTS;
                            }

                            //判断特定字段数据的格式化
                            let formatter = null;
                            /*if(tableField[i].DATA_TYPE == 'DATE'){//当字段类型为日期时，时间戳进行日期格式化
                                formatter = function (row, column, cellValue) {
                                    if(!cellValue){
                                        return '';
                                    }
                                    else{
                                        return new Date(parseInt(cellValue)).toLocaleString().replace(/:\d{1,2}$/,' ');
                                    }
                                };
                            }*/

                            //为添加行做准备
                            this.curAddRow[tableField[i].COLUMN_NAME] = "";

                            this.tableField.push({
                                COLUMN_NAME:tableField[i].COLUMN_NAME,
                                COMMENTS:comentsTmp,
                                FORMATTER:formatter,
                                DATA_TYPE:tableField[i].DATA_TYPE,
                                DATA_LENGTH:tableField[i].DATA_LENGTH,
                                NULLABLE:tableField[i].NULLABLE
                            });
                        }

                        this.tableData = tableData.list;
                        this.dataTotalNum = tableData.total;
                    }, res => {
                        debugger;
                        // 错误回调
                    });
            },
            //当前页码发生改变时
            handlerPageNumChange:function (curPageNum) {
                this.curPageNum = curPageNum;

                this.curPageNum = 1;
                let params = {
                    params:{
                        pageNum:this.curPageNum,
                        pageSize:this.pageSize,
                        tableName: this.curTableName
                    }
                };

                this.axios.get('api/dbQuery/getTableDataByName', params)
                    .then(res => {
                        // 成功回调
                        let tableField = res.data[0];   //表字段信息
                        let tableData = res.data[1];    //表中数据

                        //重构表的字段数据
                        this.tableData = tableData.list;
                    }, res => {
                        debugger;
                        // 错误回调
                    });
            },
            //每页显示条数发生改变时
            handlerPageSizeChange:function(pageSize){
                this.pageSize = pageSize;

                let params = {
                    params:{
                        pageNum:this.curPageNum,
                        pageSize:this.pageSize,
                        tableName: this.curTableName
                    }
                };

                this.axios.get('api/dbQuery/getTableDataByName', params)
                    .then(res => {
                        // 成功回调
                        let tableField = res.data[0];   //表字段信息
                        let tableData = res.data[1];    //表中数据

                        //重构表的字段数据
                        this.tableData = tableData.list;
                    }, res => {
                        debugger;
                        // 错误回调
                    });
            },
            //表格数据添加
            handleTableAddData:function(){
                debugger;
                this.$refs.dAdd.open();
                //alert('添加数据');
            },
            //表格数据删除
            handleTableDataDelete:function (index, row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let fields = "",values = "",fieldsType = "";

                    for(let i = 0;i < this.tableField.length;i++){
                        fields = fields + this.tableField[i].COLUMN_NAME + ",";
                        fieldsType = fieldsType + this.tableField[i].DATA_TYPE + ",";
                        values = values + "'" + row[this.tableField[i].COLUMN_NAME] + "',";
                    }

                    let params = {
                        params:{
                            fields:fields,
                            fieldsType:fieldsType,
                            tableName: this.curTableName,
                            values:values,
                        }
                    };

                    this.axios.get('api/dbOper/delData', params)
                        .then(res => {
                            // 成功回调
                            this.tableData.splice(index, 1);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }, res => {
                            // 错误回调
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //表格数据编辑
            handleTableDataEdit:function(index, row){
                //alert('编辑数据');
                this.curEditRow = row;
                this.curEditRorOri = _.cloneDeep(row);
                //this.editDialogShow = true;
                //this.sleep(1000);
                this.$refs.d1.open();
            },
            sleep:function(delay) {
                var start = (new Date()).getTime();
                while ((new Date()).getTime() - start < delay) {
                    continue;
                }
            },
            //数据修改后提交
            btnEditDataOk:function(){
                let fields = "",values = "",fieldsType = "",oriValues="";
                let tableName =  this.curTableName;

                for(let i = 0;i < this.tableField.length;i++){
                    fields = fields + this.tableField[i].COLUMN_NAME + ",";
                    fieldsType = fieldsType + this.tableField[i].DATA_TYPE + ",";
                    values = values + "'" + this.curEditRow[this.tableField[i].COLUMN_NAME] + "',";
                    oriValues = oriValues + "'" + this.curEditRorOri[this.tableField[i].COLUMN_NAME] + "',";
                }

                let params = {
                    params:{
                        fields:fields,
                        fieldsType:fieldsType,
                        tableName: this.curTableName,
                        values:values,
                        oriValues:oriValues
                    }
                };
                debugger;
                this.axios.get('api/dbOper/updateData', params)
                    .then(res => {
                        // 成功回调
                        debugger;
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        this.$refs.d1.close();
                    }, res => {
                        // 错误回调
                        debugger;
                        this.$message({
                            type: 'info',
                            message: '已取消修改'
                        });
                        this.handlerPageNumChange(this.curPageNum);
                        this.$refs.d1.close();
                    });
            },
            //数据修改取消
            btnEditDataCancel:function(){
                this.$message({
                    type: 'info',
                    message: '已取消修改'
                });
                this.handlerPageNumChange(this.curPageNum);
                this.$refs.d1.close();
            },
            //数据修改窗口关闭
            btnEditDataClose:function(){
                this.handlerPageNumChange(this.curPageNum);
                this.$refs.d1.close();
            },
            //添加数据后提交
            btnAddDataOk:function(){
                let fields = "",values = "",fieldsType = "";
                for(let i = 0;i < this.tableField.length;i++){
                    if(_.trim(this.curAddRow[this.tableField[i].COLUMN_NAME]) != ""){
                        fields = fields + this.tableField[i].COLUMN_NAME + ",";
                        fieldsType = fieldsType + this.tableField[i].DATA_TYPE + ",";
                        values = values + "'" + this.curAddRow[this.tableField[i].COLUMN_NAME] + "',";
                    }
                }

                let params = {
                    params:{
                        fields:fields,
                        fieldsType:fieldsType,
                        tableName: this.curTableName,
                        values:values
                    }
                };

                this.axios.get('api/dbOper/insertIntoData', params)
                    .then(res => {
                        // 成功回调
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                        this.handlerPageNumChange(this.curPageNum);
                        this.$refs.dAdd.close();
                    }, res => {
                        // 错误回调
                        this.$refs.dAdd.close();
                    });
                debugger;
            },
            //添加数据取消
            btnAddDataCancel:function(){
                this.$refs.dAdd.close();
            },
            inputChange:function(val){
                this.$forceUpdate();
            },
            btnTest:function () {
                debugger;
                alert(this.txtTest.first);
            }
        }
    }
</script>

<style scoped>
</style>