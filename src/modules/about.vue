<template>
  <div class="container-fluid">
    <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item text-white"><router-link :to="{name:'home'}"><h2>Home</h2></router-link></li>
        <li class="breadcrumb-item active text-white" aria-current="page"><a><h1>About me</h1></a></li>
      </ol>
    </nav>

    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <img class="img-thumbnail" style="width: 216px;min-height: 300px;" src="/assets/me.jpg">
      </div>
      <div class="col-12 mt-4 text-white text-center">
        Full Stack Web Developer
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"about",
  metaInfo: {
    title: 'About Me - Movies App',
    htmlAttrs: {
      lang: 'en',
      amp: true
    }
  },
}
</script>
