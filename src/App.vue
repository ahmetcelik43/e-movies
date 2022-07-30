<template>
  <div id="app">
    <navbar></navbar>
    <div id="main-content" class="container-fluid mt-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './modules/navbar'
export default {
  name: 'app',
  components: { Navbar },
  data () {
    return {
      msg: 'Welcome to your prerender-spa-plugin Vuejs 2.0 demo app!'
    }
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
}
</style>
