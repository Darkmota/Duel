<template>
    <div class="index">
    <el-carousel :interval="5000" height="600px">
        <el-carousel-item v-for="item in 4" :key="item">
        </el-carousel-item>
    </el-carousel>
    <el-container id="frame">
        <el-main id="main">
            <div class="photo-0">
                <div class="info-0">
                <div class="info-text">孩童时期，我们总会被电视剧，电影的情节所吸引，模仿并于其他孩子进行分享和游戏</div>
                </div>
            </div>
            <div class="photo-1">
            <div class="info-1">
            <div class="info-text">这启发了我们，所以我们根据牛仔的经典元素于儿童游戏相结合，制作了这款“决斗”游戏。</div>
            </div>
            </div>
            <div class="photo-2"></div>
            <div class="startgame">
                <el-button id="game-button" @click="toDuel">
                <div class="icon"></div>
                </el-button>
            </div>
        </el-main>
    </el-container>
    <el-footer id="foot">
    制作人员：王绎朝，梅思远。
    </el-footer>
    </div>
</template>

<script>
import DuelDesktop from './DuelDesktop';
export default {
  name: 'IndexDesktop',
  data () {
    return {
      active: 0,
      activeName: 'second',
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
    console.log(this.$mobile.isMobile);
  },
  computed: {
  },
  methods: {
    toDuel() {
        this.$router.push({path: '/duel'});
    },
    next() {
        if (this.active++ > 2) this.active = 0;
    },
    handleClick(tab, event) {
        console.log(tab, event);
    }
  },
  data: () => ({
      show2: true
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .front-image{
    width: 100%;
    height: 300px;
  }
  .m-hd {
    position: fixed;
    width: 100%;
    height: 40px;
  }
  #frame{
    width:100%;
    height:1530px;
    color: orange;
  }
  .index{
    margin-left:-20px;
    margin-right:-20px;
  }
  #main{
    margin-top: -20px;
    margin-left:-30px;
    margin-right:-20px;
    height: 1530px;
  }
  #acco-info{
    margin-left: 20px;
    height:300px;
    width:100%;
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
  #acco-info-i{
    text-align: left
  }
  .el-carousel__item{
    color:orange;
  }
  .el-carousel__item:nth-child(4) {
    background:url( '../assets/img/s1.jpg') no-repeat 0px -100px;
    background-size:cover;
  }
   .el-carousel__item:nth-child(3) {
    background:url('../assets/img/s2.jpg') no-repeat 0px -100px;
    background-size:cover;
  }
  .el-carousel__item:nth-child(5) {
    background:url( '../assets/img/s3.jpg') no-repeat 0px -100px;
    background-size:cover;
  }
  .el-carousel__item:nth-child(6) {
    background:url( '../assets/img/s5.jpg') no-repeat 0px -100px;
    background-size:cover;
  }
  .photo-0{
    display:flex;
    flex-direction: row;
    width:100%;
    height:600px;
    background:url( '../assets/img/s5.jpg') no-repeat 0px -100px;
    background-size:cover;
    transition: all 1s;
  }
  .photo-0:hover{
    transform: scale(1.1);
    filter:alpha(Opacity=50);-moz-opacity:1;opacity: 0.7
  }
    .photo-1{
    display:flex;
    flex-direction: row;
    width:100%;
    height:600px;
    background:url( '../assets/img/s4.jpg') no-repeat 0px -100px;
    background-size:cover;
    transition: all 1s;
  }
    .photo-1:hover{
    transform: scale(1.1);
    filter:alpha(Opacity=50);-moz-opacity:1;opacity: 0.7
  }
  .info-0{
  margin-left: 50%;
  margin-top: 12%;
  width:20%;
  height:66%;
  }
  .info-text:hover{
    filter:alpha(Opacity=100);-moz-opacity:1;opacity: 1
  }
  .info-1{
  margin-left: 40%;
  margin-top: 10%;
  width:20%;
  height:30%;
   
  }
  .info-text{
    word-wrap: break-word;
    width:100%;
    height:66%;
    filter:alpha(Opacity=50);-moz-opacity:0.8;opacity: 0.5
  }
  #foot{
    background-color: #d3dce6;
    height:100px;
  }
.step{
  margin-left: 30px;
}
#click{

}
.transition-box {
    margin-bottom: 10px;
    width: 300px;
    height:300px;
    border-radius: 4px;
    border:1px solid lightgrey;
    background-color: white;
    text-align: center;
    color: orange;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
.win-times{
  font-size: 40px;
}
#tree{
  position: fixed;
}

#game-button{
  margin-top: 30px;
  border:none;
}
.icon{
  width:400px;
  height:200px;
  background-image:url( '../assets/img/icon.jpg');
    background-size:cover;
}
.foot{
  margin-top: 20px;
}
</style>
