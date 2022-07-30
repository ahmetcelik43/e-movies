<template>
  <div class="container-fluid">
    <!--    <nav style="&#45;&#45;bs-breadcrumb-divider: '>';" aria-label="breadcrumb">-->
    <!--      <ol class="breadcrumb">-->
    <!--        <li class="breadcrumb-item active text-white"><h2>Home</h2></li>-->
    <!--      </ol>-->
    <!--    </nav>-->

    <div class="row">
      <div class="col-lg-9 col-md-8 col-sm-12 ">
        <div class="filter-header mb-4 mt-3">
          <span class="text-light  d-inline-block">Anasayfa</span>
          <select @change="orderMovie" v-model="order" class="form-control-sm d-inline-block float-end bg-dark order-inp"
                  style="width: 200px;margin-top: -11px"
          >
            <option value="0" selected disabled>Sıralama Uygulayın</option>
            <option value="EnYeni">Çıkış Tarihi:En Yeni</option>
            <option value="EnEski">Çıkış Tarihi:En Eski</option>
          </select>
        </div>
        <div class="movies text-light vld-parent">
          <loading v-model:active="isLoading"
                   :can-cancel="true"
                   id="loading"
                   :color="'lightblue'"
                   :loader="'spinner'"
                   :background-color="'transparent'"
                   :on-cancel="onCancel"
                   :is-full-page="false"
          />
          <movies :movies="pageOfItems"></movies>
          <div class="d-flex justify-content-center w-100">
            <jw-pagination class="pagin" :items="movies" :labels="labels" :pageSize="pageSize"
                           @changePage="onChangePage" :styles="customStyles"
            ></jw-pagination>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-12 card bg-dark p-0">
        <div class="card-header text-light">
          <span>Filtreler</span>
        </div>
        <div class="card-body">
          <button class="w-100 btn btn-success btn-sm mb-3" @click="catByFilter(0)">Tümünü Geri Yükle</button>
          <cat-filter :cats="cats" @callParentFn="filter"></cat-filter>

          <date-filter @callParentFn="filter"></date-filter>

        </div>

      </div>
    </div>
  </div>
</template>
<script>
import mapGetters from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import Movies from './movies'
import CatFilter from './catFilter'
import DateFilter from './dateFilter'

export default {
  name: 'about',
  components: {
    DateFilter,
    CatFilter,
    Movies,
    Loading
  },
  async created () {
    this.movies = await this.$store.dispatch('movieWithCatAct', null)
    this.cats = await this.$store.dispatch('catsAct', null)
  },
  metaInfo: {
    title: 'Home - Movies App',
    htmlAttrs: {
      lang: 'en',
      amp: true
    }
  },
  data () {
    return {
      order:0,
      labels: {
        first: 'İleri',
        last: 'Son',
        previous: 'Önceki',
        next: 'İleri'
      },
      pageOfItems: [],
      movies: null,
      cats: null,
      isLoading: false,
      fullPage: true,
      pageSize: 5,
      customStyles: {
        ul: {},
        li: {
          display: 'inline-block',
          background: '#282828'
        },
      }
    }
  },
  methods: {
    async orderMovie(){

      const els=document.getElementsByClassName('movie')
      let ids=[]
      Array.prototype.forEach.call(els, function (item) {
        ids.push(item.dataset.id)
      });
      this.movies = await this.$store.dispatch('orderMovie',{ids:ids,order:this.order})
    },
    onChangePage (pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems
    },
    async allMovie () {
      his.movies = await this.$store.dispatch('getAllMovie')
    },
    filter (dt) {
      document.getElementById('loading').style.display = 'block'
      this.movies = dt
      setTimeout(function () {
        document.getElementById('loading').style.display = 'none'
      }, 500)
    },
    async catByFilter (catId) {

      // const els=document.getElementsByClassName('movie')
      // let ids=[]
      // Array.prototype.forEach.call(els, function (item) {
      //   ids.push(item.dataset.id)
      // });
      document.getElementById('loading').style.display = 'block'
      this.movies = await this.$store.dispatch('filterByCat', catId)
      setTimeout(function () {
        document.getElementById('loading').style.display = 'none'
      }, 500)
    },

  }
}
</script>
