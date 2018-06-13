<template>
  <div>
  <div class="index">
    <el-container id="frame">
      <el-header whatthefuck>
        <h2>shenmegui</h2>
      </el-header>
      <el-aside id="acco-info">
      </el-aside>
    </el-container>
  </div>
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
#frame{
  width:100%;
  height:300px;
  background-color: black;
  color: orange;
}
#acco-info{
  background-color: lightgrey;
  height:300px;
  width:100%;
}
</style>
