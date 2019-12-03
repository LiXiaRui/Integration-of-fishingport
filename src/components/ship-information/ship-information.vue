<template>
  <div class="hello">
    {{msg}}
  
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
    
  },
  methods: {
      handleClick(row) {
        console.log(row);
      },
      goTo(path) {
          console.log("success");
          this.$router.replace(path);
      }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
