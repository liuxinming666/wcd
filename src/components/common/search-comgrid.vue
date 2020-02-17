<template>
    <div>
       <ComboGrid
                 valueField="stcd"
                 textField="stnm"
                 v-model="comboBoxValue"
                 :data="comboBoxData"
                 :editable="true"
                 :panelStyle="{width:'400px'}"
                 @filterChange="onFilterChange"
                 @valueChange="valuechange"
                  style="width:200px;"
                 :lazy="true"
                 :placeholder="'输入站码、站名或拼音码'">
             <DataGrid slot="grid" :border="false">
                 <GridColumn field="stcd" title="站点" , width="30%" , align="center"></GridColumn>
                 <GridColumn field="stnm" title="站名" , width="35%" , align="center"></GridColumn>
                 <GridColumn field="sttp" title="站类" ,width="35%" , align="center"></GridColumn>
             </DataGrid>
         </ComboGrid>
    </div>
</template>

<script>
    export default {
        name: "station-comgrid",
        data() {
            return {
                comboBoxValue: "",//40100400
                comboBoxData: this.getdata('')//[]
            };
        },

        methods:{
            onFilterChange:function(event)
            {
                this.getdata(event.filterValue)
            },
            getdata:function(qparam){
                let params = {
                    params:{
                        q: qparam,
                        sttp: "'RR'"

                    }
                };
                this.axios.get('/api/lastrsvr/GetStaByKeywords',params)
                    .then(res => {
                        // 成功回调
                        for (let i = 0; i < res.data.data.length; i++) {
                            res.data.data[i]["sttp"]=this.commonjs.changesttp(res.data.data[i]["sttp"]);
                        }
                        this.comboBoxData = res.data.data;
                    }, res => {
                        alert(res);
                        // 错误回调
                    });
            },
            valuechange:function(){
               this.$emit('stationchange',this.comboBoxValue);
            }

        }
    }
</script>

<style scoped>

</style>