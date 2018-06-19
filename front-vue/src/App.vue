<template>
  <router-view/>
</template>

<script>

import RouterDesktop from './components/RouterDesktop';
import RouterMobile from './components/RouterMobile';
export default {
  name: 'App',
  components: {RouterDesktop, RouterMobile}
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
#header{
  background-color: lightgrey;
}
</style>
