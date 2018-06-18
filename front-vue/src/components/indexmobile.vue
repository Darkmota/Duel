
<template>
  <div class="hello">
      
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
</template>

<script>
export default {
  name: 'indexmobile',
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
   height:800px;
  width: 100%;
  background-color: black;
}
.hello{
  height:800px;
  width: 100%;
}
.photo-swap{
  background-color: blue;
}
</style>
