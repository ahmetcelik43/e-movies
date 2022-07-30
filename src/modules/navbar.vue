<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">

      <router-link :class="$route.name=='home' ? 'link-active':''"  to="/" class="navbar-brand text-white">
        <img src="/assets/logo.jpg">
        Movies App</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item text-white" >
            <router-link :to="{name:'aboutMe'}" :class="$route.name=='aboutMe' ? 'link-active':''" class="nav-link active">About Me</router-link>
          </li>
          <li class="nav-item dropdown ">
            <a class="nav-link dropdown-toggle text-white" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Categories
            </a>
            <ul class="dropdown-menu">
              <li v-for="cat in cats"><a class="dropdown-item">{{cat.name}}</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <auto-complete-input></auto-complete-input>

    </div>
  </nav>
</template>
<script>
import AutoCompleteInput from './autocomplete'
export default {
  components: { AutoCompleteInput },
  async created () {
    this.cats= await this.$store.dispatch('catsAct')
  },
  data(){
    return{
      cats:null
    }
  }
}
</script>
