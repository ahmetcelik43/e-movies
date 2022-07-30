<template>
  <div ref="search" class="container-fluid position-relative d-none d-sm-none d-md-none d-lg-flex
 d-xl-flex d-xxl-flex search-container">
    <autocomplete :search="input"
                  placeholder="Movies Search"
                  aria-label="Movies Search"
                  ref="autocomplete"
                  @submit="submit($event)"
                  :get-result-value="getResultValue">
      <template #result="{ result, props}" >
        <li v-bind="props" v-for="r in result" @click="select(r.text)">
          <div class="wiki-title">
            {{ r.name }}
            {{ r.rating }}
          </div>
          <!--      <div class="wiki-snippet" v-html="result.snippet" />-->
        </li>
      </template>
    </autocomplete>
  </div>
</template>
<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'

export default {
  components: { Autocomplete },
  data () {
    return {
      tempArray: [],
    }
  },
  name: 'autoCompleteInput',
  methods: {
    getResultValue (result) {
      return result.text
    },
    submit (result) {
      return false
    },
    select (text) {
      console.log(text)
    },
    async input (term) {
      // this.desc=true;
      // const term = this.term
      if (term.length) {
        const r= await this.$store.dispatch('moviesAct', term)
        console.log(r)
        if(r.length==0){
          return [];
        }
        if (typeof r === 'object') {
          const values = r
          const result = Object.keys(values).map((key) => {
            const obj = {}
            obj[key] = values[key]
            return obj
          })
          return result
        }
        return r
      }
    }
  }
}
</script>
<style>

.autocomplete-input{
  width: 400px;
}
.autocomplete{
  width: 400px;
  float: right;
}
.img-thumbnail {
  max-height: 75px;
}
.autocomplete-result-list{
  overflow: hidden;

}
.autocomplete-result-list li{
  width: 100% !important;
  text-align: left;
}
.search-container{
  width: 400px;
  justify-content: flex-end;
}
</style>
