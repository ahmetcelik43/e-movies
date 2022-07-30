<template>
  <div>
    <div class="filter-header">
      <span class="text-light mb-2">Çıkış Tarihine Göre Filtrele:</span>
    </div>
    <date-range-picker
        ref="picker" class="text-black"
        :locale-data="locale"
        :singleDatePicker="singleDatePicker"
        :opens="'left'"
        v-model="dateRange"
        @update="updateValues"
    >
      <template v-slot:input="picker" style="min-width: 350px;">
        {{ picker.startDate  | date }} - {{ picker.endDate | date }}
      </template>
    </date-range-picker>
    <ul class="list-unstyled text-light">
      <li class="filtre d-block">
        <a @click="catByDateFilter('oneMonth')">&gt; Son Bir Ay İçerisindeki</a>
      </li>
      <li>
        <a @click="catByDateFilter('oneThree')">&gt; Son Üç Ay İçerisindeki</a>
      </li>
      <li>
        <a @click="catByDateFilter('oneYear')">&gt; Son Bir Yıl İçerisindeki</a>
      </li>
    </ul>
  </div>
</template>
<script>
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
export default {
  name:"dateFilter",
  components:{DateRangePicker},
  filters: {
    date (val) {
      return val ? val.toLocaleDateString() : ''
    }
  },
  data(){
    return{
      dateRange: Date.now(),
      locale: {
        direction: 'ltr',
        format: 'dd/mm/yyyy',
        separator: ' - ',
        applyLabel: 'Uygula',
        cancelLabel: 'Vazgeç',
        weekLabel: 'W',
        customRangeLabel: 'Custom Range',
        daysOfWeek: ['Pzr', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
        monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
        firstDay: 0
      },
    }
  },
  methods:{
    async catByDateFilter(type){
      const data = await this.$store.dispatch('catByDateFilter', type)
      this.$emit('callParentFn',data)
    },
    async allMovie(){
      const data = await this.$store.dispatch('getAllMovie')
      this.$emit('callParentFn',data)
    },
    async updateValues () {
      console.log(this.dateRange)
      const data = await this.$store.dispatch('filterByCustomDate', this.dateRange)
      this.$emit('callParentFn',data)
    },
  },


}
</script>
