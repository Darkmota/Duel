<template>
  <div class="duel">
    <div class="main">
      <canvas id="game" ref="game" width="1920" height="1080" style="top: 0; left: 0; z-index: 10;"></canvas>
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
    game_start(data) {
      this.Game.on("game_start", data);
    },
    token_time_out(data) {
      this.Game.on("token_time_out", data);
    },
    result(data) {
      this.Game.on("result", data);
    }
  },
  mounted () {
    this.GameElement = this.$refs.game;
    this.Game = Duel(window, this.GameElement, this.$socket);
    this.Game.init();
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
  background-image:url('../assets/img/s2.jpg');
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
