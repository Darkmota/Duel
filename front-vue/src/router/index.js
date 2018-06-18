import Vue from 'vue'
import Router from 'vue-router'
import jwt from 'jwt-simple'
import Duel from '@/components/duel'
import DuelMobile from '@/components/duelmobile'
import Index from '@/components/index'
import IndexMobile from '@/components/indexmobile'

Vue.use(Router);
let router = null;
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  console.log('MOBILE');
  router = new Router({
    routes: [
      {
        path: '/',
        redirect: 'index'
      },
      {
        path: '/index',
        name: 'IndexMobile',
        component: IndexMobile
      },
      {
        path: '/duel',
        name: 'DuelMobile',
        component: DuelMobile
      }
    ]
  });
}
else {
    console.log('NOT MOBILE');
    router = new Router({
    routes: [
      {
        path: '/',
        redirect: 'index'
      },
      {
        path: '/index',
        name: 'Index',
        component: Index
      },
      {
        path: '/duel',
        name: 'Duel',
        component: Duel
      }
    ]
  });
}

router.beforeEach((to, from, next) => {
    var token;
    if (token = localStorage.getItem('token')) {
        let decoded = jwt.decode(token, secret.jwt_secret);
        if (decoded.username !== undefined) {
            //+ TODO: 连接数据库检查用户是否存在。
        }
    }
    next();
});

export default router;