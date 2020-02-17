//导入路由组件
import router from '../router'
import axios from 'axios';
import Vue from 'vue'
import { Loading } from 'element-ui'
let loadinginstace
/* 请求拦截器 */
axios.interceptors.request.use(function (config) { // 每次请求时会从localStorage中获取token

    let token =localStorage.getItem('token') ;
    if (token) {
        config.headers.common['Authorization'] = token
    }
    /*Vue.$vux.loading.show({
        text: 'Loading'
    });*/
    // element ui Loading方法
    loadinginstace = Loading.service({
        lock: false,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)',
        customClass:"osloading"
        //fullscreen: false
    })
    return config
}, function (error) {
    /*Vue.$vux.loading.hide()*/
    loadinginstace.close()
    return Promise.reject(error)
})

/* 响应拦截器 */
axios.interceptors.response.use(function (response) {
    /*Vue.$vux.loading.hide()*/
    loadinginstace.close()
    // ①401 未认证
    if(response.status==401){
        localStorage.removeItem("token");
        router.replace({
            path: '/login' // 到登录页重新获取token
        })
    }else if(response.status==500){
        let msg=response.message;
        this.$messager.alert({
            title: "系统提示",
            icon: "info",
            msg: "错误提示："+msg
        });
    }
    else if(response.status==200){

        if(response.data.status==200){
            if (response.data.token) { // 判断token是否存在，如果存在说明需要更新token
                localStorage.setItem('token', response.data.token) // 覆盖原来的token(默认一天刷新一次)
            }
        }else  if(response.data.status==500){
            let msg=response.data.message;
            this.$messager.alert({
                title: "系统提示",
                icon: "info",
                msg: "错误提示："+msg
            });
        }
    }
    else {
        //TODO:未处理的返回类型
    }
    return response
}, function (error) {
    /*Vue.$vux.loading.hide()*/
    loadinginstace.close()
    return Promise.reject(error)
})

export default  axios