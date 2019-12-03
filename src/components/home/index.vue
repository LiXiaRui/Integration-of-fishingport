<template>
  <div class="hello">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-submenu index="shipInformation">
            <template slot="title" >渔船基本信息</template>
            <el-submenu index="2-1">
              <template slot="title">统计分析</template>
              <el-menu-item index="2-1-1">渔船类型统计</el-menu-item>
              <el-menu-item index="2-1-2">渔船归属统计</el-menu-item>
              <el-menu-item index="2-1-3">在港离港统计</el-menu-item>
            </el-submenu>
            <el-submenu index="2-2">
              <template slot="title">统计分析</template>
              <el-menu-item index="2-2-1">渔船信息检索</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">渔船船员信息</template>
            <el-submenu index="3-1">
              <template slot="title">统计分析</template>
              <el-menu-item index="3-1-1">年龄统计</el-menu-item>
              <el-menu-item index="3-1-2">性别统计</el-menu-item>
              <el-menu-item index="3-1-3">健康统计</el-menu-item>
            </el-submenu>
            <el-submenu index="3-2">
              <template slot="title">基本查询</template>
              <el-menu-item index="3-2-1">等级状态查询</el-menu-item>
              <el-menu-item index="3-2-1">持证状态查询</el-menu-item>
              <el-menu-item index="3-2-1">人员信息检索</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu>
        <div class="line"></div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>


    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.goTo(key);
      console.log(key, keyPath);
    },
    goTo(path) {
      console.log("success");
      this.$router.replace(path);
}
  }
}
 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
