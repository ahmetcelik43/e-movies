<template>
  <div>
    <div class="filter-header">
      <span class="text-light mb-2">Kategoriye Göre Filtrele:</span>

    </div>
    <ul class="list-unstyled text-light">
      <li class="filtre d-block" v-for="cat in cats">
        <a @click="catByFilter(cat.id)">&bull; {{ cat.name }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default{
  name:"catFilter",
  props:{
    cats:Array
  },
  methods:{
    async catByFilter(catId){
      console.log(1)
      const data = await this.$store.dispatch('filterByCat', catId)
      this.$emit('callParentFn',data)
    },

  }
}
</script>
