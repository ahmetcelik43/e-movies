import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'
import movies from '../json/movies.json'
import cats from '../json/cats.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: null
  },
  getters: {
    getMovies: state => state.movies,

  },
  mutations: {
    mutmovieWithCat (state, payload) {
      state.movies = payload
    },
  },
  actions: {
    moviesAct (context, term) {
      let movies = require('../json/movies.json')
      movies = movies.filter((item) => {
        return item.name.toString().toLowerCase().indexOf(term.toString().toLowerCase()) > -1
      })
      return movies
      // context.commit('pageTitleMut',window.location.pathname)
    },
    catsAct (context) {
      const cats = require('../json/cats.json')
      return cats
      // context.commit('pageTitleMut',window.location.pathname)
    },
    movieWithCatAct (context) {
      const movies = require('../json/movies.json')
      const cats = require('../json/cats.json')
      const movieWithCat = movies.map((item) => {
        let obj = item
        obj['catName'] = cats.filter((cat) => {
          return cat.id == item.cat
        })
        return obj
      })
      return movieWithCat
    },
    filterByCat (context, catId) {
      const movies = require('../json/movies.json')
      if (!catId) {
        return movies
      }
      const movieWithCat = movies.filter((item) => {
        return item.cat.toString() == catId
      })
      return movieWithCat
    },
    getAllMovie () {
      return require('../json/movies.json')
    },
    catByDateFilter (context, type) {
      let movies = require('../json/movies.json')
      const now = new Date(Date.now())

      function subtractDays (numOfDays, date = new Date()) {
        date.setDate(date.getDate() - numOfDays)
        return date
      }

      switch (type) {
        case 'oneMonth': {
          const date = subtractDays(30, now)
          movies = movies.filter((item) => {
            return date < new Date(item.date)
          })
          console.log(movies)
        }
        case 'oneThree': {
          const date = subtractDays(90, now)
          movies = movies.filter((item) => {
            return date < new Date(item.date)
          })
        }
        case 'oneYear': {
          const date = subtractDays(365, now)
          movies = movies.filter((item) => {
            return date < new Date(item.date)
          })
        }
      }
      return movies
    },
    filterByCustomDate (context, payload) {
      let movies = require('../json/movies.json')
      const now = new Date(Date.now())
      movies = movies.filter((item) => {
        return payload.startDate < new Date(item.date) && new Date(item.date) < payload.endDate
      })
      console.log(movies)
      return movies
    },
    orderMovie (context, payload) {
      let movies = require('../json/movies.json')
      let result1 = movies.filter((item) => {
        return payload.ids.indexOf(item.id.toString()) > -1
      })
      result1.sort((item, item2) => {
        return new Date(item.date) - new Date(item2.date)
      })
      console.log(result1)
      if (payload.order == 'EnEski') {
        return result1
      } else if(payload.order == 'EnYeni'){
        return result1.reverse()
      }
    }
  }
})
