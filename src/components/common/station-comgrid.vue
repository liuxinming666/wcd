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
                :multiple="multiple"
                :placeholder="'输入站码、站名或拼音码'">
            <DataGrid slot="grid" :border="false">
                <GridColumn field="stcd" title="站点", width="30%",align="center"></GridColumn>
                <GridColumn field="stnm" title="站名", width="35%",align="center"></GridColumn>
                <GridColumn field="sttp" title="站类" ,width="35%",align="center"></GridColumn>
            </DataGrid>
        </ComboGrid>
    </div>
</template>

<script>
    export default {
        name: "station-comgrid",
        data() {
            return {
                comboBoxValue: "",
                comboBoxData: this.getdata('')
            };
        },
        props:['sttp','multiple'],
        methods:{
            onFilterChange:function(event)
            {
                this.getdata(event.filterValue)
            },
            getdata:function(qparam){
                let params = {
                    params:{
                        keywords: qparam,
                        sttp:this.sttp
                    }
                };
                this.axios.get('/api/station/getStaionsInfoByKeywords',params)
                    .then(res => {
                        this.comboBoxData = res.data;
                    }, res => {
                        alert("error");
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