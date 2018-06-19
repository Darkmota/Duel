<template>
  <div class="index">
    <!-- <el-header id="whatthefuck">
      </el-header> -->

<<<<<<< HEAD:front-vue/src/components/index.vue
      <el-carousel :interval="5000" height="500px">
        <el-carousel-item v-for="item in 4" :key="item">
        </el-carousel-item>
      </el-carousel>

=======
      <el-carousel :interval="5000" arrow="always" height="500px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
>>>>>>> 9c698f8fbeb69d5ae01b14dee8c6bc7d3cc86185:front-vue/src/components/IndexDesktop.vue
      <el-container id="frame">
      <el-main id="main">
        <div class="photo"><!-- <div class="bf-billboard__ratio" style="filter: blur(1.63934px); transform: scale(1.06831);"><picture class="bf-billboard__picture"><source media="(max-width: 320px)" srcset="https://media.contentapi.ea.com/content/dam/bf/images/2018/05/bf5-billboard-homepage-xl.jpg.adapt.crop16x9.320w.jpg"><source media="(max-width: 767px)" srcset="https://media.contentapi.ea.com/content/dam/bf/images/2018/05/bf5-billboard-homepage-xl.jpg.adapt.crop16x9.767w.jpg"><source media="(max-width: 1023px)" srcset="https://media.contentapi.ea.com/content/dam/bf/images/2018/05/bf5-billboard-homepage-xl.jpg.adapt.crop16x9.1023w.jpg"><source media="(max-width: 1455px)" srcset="https://media.contentapi.ea.com/content/dam/bf/images/2018/05/bf5-billboard-homepage-xl.jpg.adapt.crop16x9.1455w.jpg"><source media="(min-width: 1456px)" srcset="https://media.contentapi.ea.com/content/dam/bf/images/2018/05/bf5-billboard-homepage-xl.jpg.adapt.crop16x9.1920w.jpg"><img class="bf-billboard__image" src="https://media.contentapi.ea.com/content/dam/bf/images/2018/05/bf5-billboard-homepage-xl.jpg.adapt.crop16x9.320w.jpg"></picture><dom-if style="display: none;"><template is="dom-if"></template></dom-if>
          <dom-if style="display: none;"><template is="dom-if"></template></dom-if><div class="bf-billboard__twitch-backgrounder" hidden=""><div id="twitchHolder" class="bf-billboard__twitch-holder"><iframe src="https://player.twitch.tv/?allowfullscreen&amp;channel=battlefield&amp;layout=video&amp;muted&amp;!autoplay&amp;preload=metadata&amp;!showMature&amp;origin=https%3A%2F%2Fwww.battlefield.com" width="640" height="390" frameborder="0" scrolling="no" allow="autoplay; fullscreen" allowfullscreen=""></iframe></div></div></div> --></div>
        <div class="photo">
          <div class="info">
            <div class="info-text">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXSS</div>
          <div class="KnowMore"><a href="https://www.baidu.com" target="_blank">了解更多</a></div>
        </div>
        </div>
        <div class="photo"></div>
        <!-- <div class="rate">
        <el-progress id="win-rate" type="circle" :percentage="80"></el-progress>
        <h1>胜率</h1>
        </div>
        <div class="line"></div> -->
      </el-main>
      <!-- <el-aside id="acco-info">
        <div id="acco-info-i">帐号信息</div>

        <div class="acco-info-line"></div>
        <div>胜率</div>
      </el-aside> -->
          </el-container>
      <el-footer id="foot">
      </el-footer>

  </div>
</template>

<script>
import DuelDesktop from './DuelDesktop';
export default {
  name: 'IndexDesktop',
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
    console.log(this.$mobile.isMobile);
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
  height: 1030px;
  background-color:lightgrey;
}
#acco-info{
  margin-left: 20px;
  background-color: lightgrey;
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
  .el-carousel__item:nth-child(2n) {
    background-image:url( @1984的温切斯特54.jpg);
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-image:url( @1984的温切斯特62.jpg);
  }
  .photo{
    display:flex;
    flex-direction: row;
    width:100%;
    height:33%;
    background-image:url( @1984的温切斯特62.jpg);
  }
  .info{
  margin-left: 70%;
  margin-top: 5%;
  width:20%;
  height:66%;
  }
  .info-text{
    word-wrap: break-word;
    width:100%;
    height:66%;
  }
  .KnowMore{
    align-items: bottom;

    color:orange;
  }
  #foot{
    background-color: #d3dce6;
    height:100px;
  }

</style>
