<template>
    <div>
        <ComboBox inputId="c1" :hasDownArrow="true" v-model="comboBoxValue"
                  style="height: 25px;" :placeholder="'输入站码、站名或拼音码'"
                  :data="comboBoxData" @filterChange="onFilterChange"></ComboBox>
    </div>
</template>

<script>
    export default {
        name: "station-search-bykey",
        data() {
            return {
                comboBoxValue: "",
                comboBoxData: []
            };
        },
        methods:{
            //在输入框中输入关键字
            onFilterChange:function (event) {
                let params = {
                    params:{
                        keywords: event.filterValue
                    }
                };
                this.axios.get('/api/getStaionsInfoByKeywords',params)
                    .then(res => {
                        debugger;
                        // 成功回调
                        let data = res.data;
                        let length = data.length;
                        this.comboBoxData = [];
                        for (let i=0;i<length;i++)
                        {
                            this.comboBoxData.push({value:data[i].stcd,text:data[i].stnm});
                        }
                    }, res => {
                        debugger;
                        // 错误回调
                    });
            }
        }
    }
</script>

<style scoped>

</style>