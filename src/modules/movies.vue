<template>
  <div class="row">
    <div :data-id="movie.id" class="col-md-6 com-sm-12 mb-3 movie col-lg-3" v-if="movies.length" v-for="movie in movies">
      <div class="row">
        <div class="col-12">
          <div class="card bg-dark position-relative">
            <img style="height: 220px;cursor: pointer" class="card-img-top" v-bind:src="movie.img">
            <span class="badge bg-danger position-absolute top-0" style="right: 0">{{ movie.type }}</span>
            <div class="card-body">
              <a class="text-decoration-underline">{{ movie.name  | truncate(20) }}</a>
              <p v-if="movie.desc">{{ movie.desc | truncate(50) }}</p>
              <span><span class="badge bg-gradient p-2">{{ movie.catName[0].name }}</span></span>
              <span><span class="badge bg-gradient" style="border-radius: unset !important;">{{
                  movie.type
                }}</span></span>
              <span><span class="badge bg-gradient">Çıkış Tarihi: {{ movie.date | date2 }}</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!movies.length">
      <p class="text-danger text-center">Film Bulunamadı!</p>
    </div>
  </div>
</template>
<script>
export default {
  name:"movies",
  props:{
    movies:Array
  },
  data(){
    return{
    }
  },
  methods:{

  }
}
</script>
