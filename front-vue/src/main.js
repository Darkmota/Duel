// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import VueSocketio from 'vue-socket.io';
import jwt from 'jwt-simple';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'
import { Swipe, SwipeItem } from 'mint-ui';
import axios from 'axios'

Vue.use(Vuex);
Vue.use(MintUI);
Vue.use(ElementUI);
Vue.use(VueSocketio, 'http://127.0.0.1:3000');
Vue.prototype.$http = axios;
Vue.prototype.$jwt = jwt;
Vue.prototype.$mobile = {isMobile: (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))};
Vue.config.productionTip = false;

axios.interceptors.request.use(
    config => {
        let token = window.localStorage.getItem('auth');
        if (token) {
            config.headers.auth = token;
        }
        return config;
    },
    error => {
        throw(error)
    })

let store = new Vuex.Store({
    state: {
        isLogin: false,
        username: false,
        token: false,
        profile: {
            win: 0,
            lose: 0,
            point: 0
        },
        duel: {
            socketId: false,
            myMP: 0,
            enemyMP: 0,
            myMove: false,
            enemyMove: false,
            round: 1,
            animeTime: 0
        }
    },
    getters: {
        isLogin: state => {
            if (state.username && typeof(state.username.length) !== 'string') {
                state.username = window.localStorage.getItem('username');
                state.isLogin = true;
            }
            return state.isLogin;
        }
    },
    mutations: {
        setLogin (state, status) {
            state.isLogin = status;
        },
        getName (state) {
            return state.username;
        },
        setName (state, username) {
            state.username = username;
        },
        getToken (state) {
            return state.token;
        },
        setToken (state, token) {
            state.token = token;
            window.localStorage.setItem('auth', token);
        },
        clearToken (state) {
            window.localStorage.removeItem('auth');
        }
    },
    actions: {
        doLogin (ctx, data) {
            window.localStorage.setItem('username', data.username);
            ctx.commit('setToken', data.token);
            ctx.commit('setName', data.username)
            ctx.commit('setLogin', true);
        },
        doLogout (ctx) {
            ctx.commit('clearToken');
            ctx.commit('setName', false);
            ctx.commit('setLogin', false);
            window.localStorage.removeItem('username');
        },
    }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
})
