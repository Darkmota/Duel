<template>
  <div class="hello">
    <el-container id="frame">
    </el-container>
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
</style>
