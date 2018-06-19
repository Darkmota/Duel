
<template>
  <div class="hello">
    <mt-header id="head" fixed title="DUEL">
        <router-link to="/RouterDesktop" slot="left">
          <mt-button icon="sign">返回
          <mt-popup
            v-model="sign"
            position="left">
          </mt-popup>
          </mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    
    <div id="swap">
      <mt-swipe :auto="4000" id="photo-swap">
        <mt-swipe-item>1</mt-swipe-item>
        <mt-swipe-item>2</mt-swipe-item>
        <mt-swipe-item>3</mt-swipe-item>
      </mt-swipe>
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <li v-for="item in list">{{ item }}</li>
      </ul>
    </div>
    <div class="intruduction">
      <div class="photo">
        
      </div>
    </div>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="外卖">
        <img slot="icon">
        <div class="startgame">
          <mt-button size="large">Start Game</mt-button>
        </div>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'IndexMobile',
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
  },

loadMore() {
  this.loading = true;
  setTimeout(() => {
    let last = this.list[this.list.length - 1];
    for (let i = 1; i <= 10; i++) {
      this.list.push(last + i);
    }
    this.loading = false;
  }, 2500);
},
}
// var swap = new Vue({
//         el: '#app',
//         methods: {
//             prev: function () {
//                 this.$refs.swipeWrapper.prev();
//                 console.log(this.$children);
//             },
//             next: function () {
//                 this.$refs.swipeWrapper.next();
//             }
//         }
//     });

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-hd {
  width: 100%;
  height: 40px;
}
#frame{
   height:800px;
  width: 100%;
  background-color: black;
}
.guide{
  width:100%;
  height:50px;
  border-bottom: 1px solid lightgrey;
}
.hello{
  margin:-8px;
  position:fixed;
  height:800px;
  width: 100%;
}
#swap{
  height:200px;
  background-color: lightblue;
}
.photo-swap{
  height:200px;
}
.startgame{
  margin-top: 30px;
  height: 30px;
}
/* #swap{
        width: 100%;
        height: 100%;
    }
    .swipe-wrapper{
        width: 100%;
        height: 300px;
    }
    */
    .swip-item-1{
        background: red;
    }
    .swip-item-2{
        background: blue;
    }
    .swip-item-3{
        background: green;
    }
    .item{
        text-align: center;
        font-size: 40px;
        color: white;
    }
/*
    .button-wrapper{
        display: flex;
        height: 100px;
    }
    .flex-item{
        flex: 1;
        display: inline-block;
        text-align: center;
        height: 100%;
        line-height: 100%;
        font-size: 40px;
    }
    .prev-button{
        background: darkorange;
    }
    .next-button{
        background: green;
    }*/
</style>
