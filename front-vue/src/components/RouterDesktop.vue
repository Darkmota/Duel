<template>
  <el-container id="app">
    <el-header id="header">
      <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
        <div class="icon"></div>
      </el-menu-item>
      <div v-if="isLogin">
        <a>{{$store.state.username}}</a>
        <el-button type="warning" style="border: none; margin-right:-60%; margin-top:10px" @click="logout">登出</el-button>
      </div>
      <div v-else>
        <el-button type="warning" style="border: none; margin-right:-60%; margin-top:10px" @click="loginFormVisible = true">登录</el-button>
      </div>
      </el-menu>
      <el-dialog v-if="formType === 'login'" title="登录" :visible.sync="loginFormVisible">
        <div class="input-container">
          <el-input v-model="username" placeholder="请输入用户名">
            <template name="c1" style="color:red" slot="prepend">用户名</template>
          </el-input>
          <el-input v-model="password" type="password" placeholder="请输入密码">
            <template slot="prepend">密码</template>
          </el-input>
        </div>
        <div class="button-container" style="margin-top: 10px;">
        </div>
        <div slot="footer" class="dialog-footer">
          <el-row>
            <el-col :span="18">
              <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" style="width: 90%" @click="formType = 'register', password = ''" plain>注册</el-button>
            </el-col>
          </el-row>
        </div>
      </el-dialog>
      <el-dialog v-else title="注册" :visible.sync="loginFormVisible">
        <div class="input-container">
          <el-input v-model="username" placeholder="请输入用户名">
            <template name="c1" style="color:red" slot="prepend">用户名</template>
          </el-input>
          <el-input v-model="password" type="password" placeholder="请输入密码">
            <template slot="prepend">密码</template>
          </el-input>
          <el-input v-model="repassword" type="password" placeholder="请重复密码">
            <template slot="prepend">重复</template>
          </el-input>
        </div>
        <div class="button-container" style="margin-top: 10px;">
        </div>
        <div slot="footer" class="dialog-footer">
          <el-row>
            <el-col :span="6">
              <el-button type="primary" style="width: 100%" @click="formType = 'login', password = ''" plain>返回登录</el-button>
            </el-col>
            <el-col :span="18">
              <el-button type="primary" style="width: 90%" @click="register">提交注册</el-button>
            </el-col>
          </el-row>
        </div>
      </el-dialog>
    </el-header>
    <el-container>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import DuelDesktop from './DuelDesktop';
import IndexDesktop from './IndexDesktop';
export default {
  name: 'RouterDesktop',
  mounted () {
    let username = window.localStorage.getItem('username');
    if (username) {
      this.$store.commit('setLogin', {
        token: window.localStorage.getItem('auth'),
        username: window.localStorage.getItem('username')
      })
    }
  },
  data () {
    return {
      onlineTime:0,
      winTimes:0,
      loginFormVisible: false,
      formType: 'login',
      username: '',
      password: '',
      repassword: '',
    }
  },
  computed:{
    isLogin() {
      return this.$store.getters.isLogin;
    }
  },
  methods: {
    login () {
      let token = "";
      if (token = window.localStorage.getItem('auth')) {
        console.log('Existing token: '+ token);
      }
      let loginMsg = {
        username: this.username,
        password: this.password,
      }
      this.$http.post('/api/login', loginMsg)
        .then((res) => {
          if (res.data.code === 0) {
            console.log('Received token: '+ res.data.data);
            this.loginFormVisible = false;
            this.$store.dispatch('doLogin', {token: res.data.data, username: this.username});
            this.$message.success({
              message: '登录成功',
            });
            //this.$router.push({path: '/duel'});
          }
          else {
            this.$message.error({
              message: '用户名或密码错误',
            });

          }
          console.log(res);
        })
        .catch(err => {
          this.msg = '服务器出错:'+err.message;
        });
    },
    logout () {
      this.$store.dispatch('doLogout');
    },
    registerCheck () {
      if (this.username === "") {
        this.$message.error({
          message: '用户名为空',
        });
        return false;
      }
      else if (typeof(this.username) !== "string") {
        this.$message.error({
          message: '非法用户名',
        });
        return false;
      }
      else if (this.username.length > 20) {
        this.$message.error({
          message: '用户名超过20个字符',
        });
        return false;
      }
      if (this.password === "") {
        this.$message.error({
          message: '密码为空',
        });
        return false;
      }
      else if (typeof(this.password) !== "string") {
        this.$message.error({
          message: '非法密码',
        });
        return false;
      }
      else if (this.password !== this.repassword) {
        this.$message.error({
          message: '两次输入的密码不一致',
        });
        return false;
      }
      else if (this.password.length > 20) {
        this.$message.error({
          message: '密码超过20个字符',
        });
        return false;
      }
      else {
        return true;
      }
    },
    register () {
      if (this.registerCheck()) {
        let token = "";
        if (token = window.localStorage.getItem('auth')) {
          console.log('Existing token: '+ token);
        }
        let registerMsg = {
          username: this.username,
          password: this.password,
        }
        this.$http.post('/api/register', registerMsg)
          .then((res) => {
            if (res.data.code === 0) {
              console.log('Received token: '+ res.data.data);
              this.$message.success({
                message: '注册成功，将自动登录',
              });
              window.localStorage.setItem('auth', res.data.data);
              this.$store.dispatch('doLogin', {token: res.data.data, username: this.username});
              this.$message.success({
                message: '登录成功',
              });
            }
            else {
              this.$message.error({
                message: '注册失败，用户名已存在',
              });
            }
            console.log(res);
          })
          .catch(err => {
            this.msg = '服务器出错:'+err.message;
          });
      }
    }
  },
}
function showSearch(){
    window.scroll(1000,200)
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-menu{
  margin-left: auto;
  min-width: 560px;
}
.icon{
  width:120px;
  height:57px;
  background-image:url( '../assets/img/icon(2).jpg');
  background-size:cover;
}
</style>
