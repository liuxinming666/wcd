<template>
    <section class="fl_container">
        <img src="../../public/images/j_llogo.png" class="fl_timg" />
        <article class="fl_main">
            <!-- 输入框组                      开始     -->
            <form id="loginForm" class="bs-example bs-example-form fl_form1" role="form">
                <div class="input-group">
                    <!--<input id="username" name="username" type="text" class="form-control j_rinput1" placeholder="请输入用户名">-->
                    <TextBox v-model="username" style="width: 250px;" iconCls="icon-man" class="form-control j_rinput1" placeholder="请输入用户名"></TextBox>
                </div>
                <br>
                <div class="input-group">
                    <!--<input id="userpwd" name="userpwd" type="password" class="form-control j_rinput1" placeholder="请输入密码">-->
                    <PasswordBox v-model="password" style="width: 250px;" placeholder="请输入密码"></PasswordBox>
                </div>
                <br />
                <p class="j_btncon">
                    <button type="button" style="height: 30px;" class="btn fl_btn1">重置</button>&nbsp;&nbsp;
                    <button @click="onClickBtnLogin" type="button" style="height: 30px;" class="btn fl_btn1">登录</button>
                </p>
            </form>
            <!-- 输入框组                      结束      -->
        </article>
    </section>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                username:"",
                password:""
            }
        },
        methods:{
            onClickBtnLogin:function () {
                //this.$router.push({name:'frame',params:{curUser:this.username}});
                //this.axios.get('/login', {params:{username: this.username, password: this.password}})
                let param = new URLSearchParams();
                param.append("username", this.username);
                param.append("password",  this.password)
                this.axios.post('/login', param)
                    .then(res => {
                        //console.log(res)
                        if(res.data.status==200){
                            // 写入登陆信息
                            window.localStorage.setItem('token', res.data.data);
                            this.$router.push({name:'frame'});
                            /*this.$messager.alert({
                                title: "系统提示",
                                icon: "info",
                                msg: "登陆成功!"
                            });*/
                        }else{
                            this.$messager.alert({
                                title: "系统提示",
                                icon: "info",
                                msg: res.data.message
                            });
                        }
                        // 成功回调-end
                    }, res => {
                        alert(res.data);
                        // 错误回调
                    });
            }
        }
    }
</script>

<style scoped>
    @import "../../public/css/jcj_login.css";

    .panel-body {
        font-size: 14px;
    }

    .panel-header {
        background: #9be2fd;
        filter: "";
    }

    .panel-title {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #251C1F;
    }
</style>