<template>
    <div style="overflow-x: hidden; overflow-y: hidden;">
        <el-menu
                ref="elMenu"
                :key="menuData"
                style="border: 0px; margin: 0px;"
                class="el-menu-vertical-demo"
                :default-active="curActiveIndex"
                @select="onClickMenuItem">
            <el-menu-item v-for="(item,index) in menuData"
                          :index="item.code + '$' + item.url"
                          v-if="item.submenu.length == 0">
                <i class="el-icon-location"></i>
                <span slot="title">{{item.name}}</span>
            </el-menu-item>
            <el-submenu v-for="(item,index) in menuData"
                        :index="item.code"
                        v-if="item.submenu.length != 0">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{item.name}}</span>
                </template>
                <el-menu-item
                        v-for="(subItem,subIndex) in item.submenu"
                        :index="subItem.code + '$' + subItem.url">{{subItem.name}}
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "leftMenu",
        data(){
            return{
                curActiveIndex:''
            }
        },
        props:{
            menuData:{}
        },
        watch:{
            'menuData':{
                handler(newValue, oldValue){
                    this.initMenu();
                    //this.$refs.elMenu.open('1201');
                }
            }
        },
        methods:{
            //点击了菜单项
            onClickMenuItem:function (index,indexPath) {
                //this.$refs.elMenu.activeIndex = index;
                this.curActiveIndex = index;
                let aryTmp = index.split('$');
                if(aryTmp[1] == 'null')
                {
                    this.$emit('changeCenter',true,'');
                }
                else
                {
                    this.$emit('changeCenter',false,aryTmp[1]);
                }
            },
            //初始化菜单项
            initMenu:function () {
                let bBreak = false;

                for(let i = 0;i < this.menuData.length;i++){
                    if(bBreak)
                    {
                        break;
                    }

                    if(this.menuData[i].submenu.length == 0)
                    {
                        let index = this.menuData[i].code + '$' + this.menuData[i].url;
                        this.onClickMenuItem(index,'');
                        bBreak = true;
                    }
                }

                for(let j = 0;j < this.menuData.length;j++){
                    if(bBreak)
                    {
                        break;
                    }
                    //alert(this.menuData[j].submenu[0].name);
                    if(this.menuData[j].submenu.length != 0)
                    {
                        let index = this.menuData[j].submenu[0].code + '$' + this.menuData[j].submenu[0].url;
                        this.onClickMenuItem(index,'');
                        bBreak = true;
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>