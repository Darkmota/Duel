<template>
  <div class="duel">
    <div class="main">
      <canvas id="game" ref="game" width="400" height="300" style="top: 0; left: 0; z-index: 10;"></canvas>
      <div class="inf">
        <el-col id="inf-card":span="24">
          <el-card shadow="always">
            鼠标悬浮时显示
          </el-card>
        </el-col>
      </div>
      <div class="share"></div>
    </div>
  </div>
</template>

<script>
import Duel from '../assets/js/duel.js';
export default {
  name: 'DuelDesktop',
  data () {
    return {
      id: "",
      specialId: "",
      username: "",
      password: "",
      Game: null,
      GameElement: null,
    }
  },
  sockets: {
    connect() {
      this.id = this.$socket.id;
    },
    testEmit(data) {
      alert('this method was fired by the socket server. eg: io.emit("testEmit", data)')
    }
  },
  mounted () {
    this.GameElement = document.getElementById('game');
    this.Game = Duel(window, this.GameElement);
    this.Game.init();
    window.onresize = () => {
      let box = this.GameElement.getBoundingClientRect();
      this.Game.resize(box);
      this.Game.clear();
    }
    this.Game.start();
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
#game{
  width: 100%;
  height: 100%;
  background-color: grey;
}
.body{
  background-image:url(6326474d6f86ef6b8e105681f5434f9c867ef02a.jpg);
  background-size:cover;
}
.main{
  min-width: 600px;
  min-height: 400px;
  width: 60%;
  height: 60%;
  margin-top:50px;
  margin-left: 20%;
}
.duel{
  display: flex;
  flex-direction: column;
  width:100%;
  height:700px;
}
.inf{
  position: relative;
  margin-top:20px; 
  width:45%;
  height:50%;
  background-color: lightgrey;
}
#inf-card{
  height:300px;
}
.share{
  margin-top:20px; 
  width:45%;
  height:50%;
  background-color: lightgrey;
}
</style>
