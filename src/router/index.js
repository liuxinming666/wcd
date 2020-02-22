import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/Login'
import home from '@/components/home/index'
import frame from '@/components/home/frame'
import threeDim from '@/components/home/threeDim'

Vue.use(Router)
/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
const router= new Router({
        routes: [
            {path: '/login', component: login, name: 'login'},
            {path: '/', component: frame, name: 'frame'},
            {path: '/threeDim', component: threeDim, name: 'threeDim'},
        ]
    }
);

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
/*router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        let token = localStorage.getItem('token');
        //alert(token)
        if (token === 'null' || token === ''||token===null) {
            next('/login');
        } else {
            next();
        }
    }
});*/


export default router
