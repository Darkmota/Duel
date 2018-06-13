<template>
  <div class="index">
    <el-header id="whatthefuck">
        <h2>shenmegui</h2>
      </el-header>
      <el-container id="frame">
      <el-main id="main">
        <div class="rate">
        <el-progress id="win-rate" type="circle" :percentage="80"></el-progress>
        <h1>胜率</h1>
        </div>
        <div class="line"></div>
      </el-main>
      <el-aside id="acco-info">
        <h1>帐号信息</h1>
        
        <div class="acco-info-line"></div>
        <h1>胜率</h1>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      ranking: [{username: 'test1', win: 130, lose: 30, point: 1190},
            {username: 'test2', win: 20, lose: 11, point: 134}],
      profile: {
        login: false,
        username: '',
        win: 0,
        lose: 0,
        point: 0,
        title: ''
      }
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-hd {
  position: fixed;
  width: 100%;
  height: 40px;
}
#whatthefuck{
   height:300px;
}
#frame{
  width:100%;
  height:600px;
  color: orange;
}
#main{
  height: 600px;
  background-color:lightgrey;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
#acco-info{
  margin-left: 20px;
  background-color: lightgrey;
  height:300px;
  width:100%;
  border-radius: 15px;
}
.line{
  margin-left: 50%;
  margin-top: -200px;
  width:1px;
  height:500px;
  background-color: white;
}
.rate{
  width:50%;
}
#win-rate{
  margin-top: 100px;
}
.acco-info-line{
  margin-left: 10%;
  width:220px;
  height:1px;
  background-color: white;
}
</style>
