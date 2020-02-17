<template>
    <div>
        我是左边组件<br>
        <button @click="onClickBtnSwitch">地图切换</button>
    </div>
</template>

<script>
    export default {
        name: "left",
        props:{
            bShowMap:{}
        },
        methods:{
            onClickBtnSwitch:function () {
                this.$emit('switchCenter',!this.bShowMap);
            }
        }
    }
</script>

<style scoped>

</style>