<template>
  <div class="hello">
    <h1>桌面端游戏界面</h1>
    <canvas id="game" ref="game" width="400" height="300" style="position: fixed; top: 0; left: 0; z-index: 10;"></canvas>
  </div>
</template>

<script>
import Duel from '../assets/js/duel.js';
export default {
  name: 'duel',
  data () {
    return {
      username: "",
      password: "",
      Game: null,
      GameElement: null,
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
</style>
