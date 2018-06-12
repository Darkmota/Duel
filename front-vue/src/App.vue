<template>
  <el-container id="app">
    <el-header>
      <el-button type="primary" style="border: none" @click="loginFormVisible = true">登录</el-button>
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
import Duel from './components/duel';
import Index from './components/index';
import DuelMobile from './components/duelmobile';
import IndexMobile from './components/indexmobile';
export default {
  name: 'App',
  data () {
    return {
      loginFormVisible: false,
      formType: 'login',
      username: '',
      password: '',
      repassword: '',
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
            this.$message.success({
              message: '登录成功',
            });
            window.localStorage.setItem('auth', res.data.data);
            this.loginFormVisible = false;
            this.$router.push({path: '/duel'});
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
              this.$router.push({path: '/'});
            }
            else {
              this.$message.error({
                message: '注册失败',
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
  components: {Duel, DuelMobile, Index, IndexMobile}
}
</script>

<style>
  .input-container .el-input-group__prepend {
    width: 50px;
  }
  .input-container .el-input {
    margin-top: 10px;
  }
</style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
