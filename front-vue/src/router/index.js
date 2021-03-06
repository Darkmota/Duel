import Vue from 'vue'
import Router from 'vue-router'
import jwt from 'jwt-simple'
import DuelDesktop from '@/components/DuelDesktop'
import DuelMobile from '@/components/DuelMobile'
import IndexDesktop from '@/components/IndexDesktop'
import IndexMobile from '@/components/IndexMobile'
import RouterDesktop from '@/components/RouterDesktop'
import RouterMobile from '@/components/RouterMobile'

Vue.use(Router);
let router = null;
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  console.log('MOBILE');
  router = new Router({
    routes: [
      {
        path: '/',
        name: 'RouterMobile',
        component: RouterMobile,
        children: [
          {
            path: 'index',
            name: 'IndexMobile',
            component: IndexMobile
          },
          {
            path: 'duel',
            name: 'DuelMobile',
            component: DuelMobile
          }
        ]
      },
    ]
  });
}
else {
    console.log('DESKTOP');
    router = new Router({
    routes: [
      {
        path: '/',
        name: 'RouterDesktop',
        redirect: 'index',
        component: RouterDesktop,
        children: [
          {
            path: 'index',
            name: 'IndexDesktop',
            component: IndexDesktop
          },
          {
            path: 'duel',
            name: 'DuelDesktop',
            component: DuelDesktop
          }
        ]
      },
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