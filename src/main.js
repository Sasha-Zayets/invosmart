import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import filtersContainer from './assets/scripts/filters'
import './assets/css/global.scss'
import './assets/css/reset-slider.scss'
import 'overlayscrollbars/css/OverlayScrollbars.css'
import router from './router'
import store from './store'
import VModal from 'vue-js-modal'
import './localization/ml'
import 'simplebar' // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css'
Vue.config.productionTip = false

Vue.prototype.$http = axios

Vue.use(VModal)
filtersContainer.setFilters(Vue)

require('./assets/css/grid.min.css')

const lang = localStorage.getItem('lang')

if(lang != null) {
  Vue.prototype.$lang = lang
} else {
  Vue.prototype.$lang = 'en'
}

new Vue({
  router,
  store,
  created () {
    this.$store.dispatch('allCountries', this.$lang)
      .then(data => {
        const countries = localStorage.getItem('countries')
        
        if(countries == undefined) {
          this.$store.dispatch('userCountries')
        } else {
          const index = localStorage.getItem('countriesIndex')

          this.$store.commit('setCountriesUser', countries)
          this.$store.commit('setIndexCountries', index)
        }
      })
  },
  render: h => h(App)
}).$mount('#app')
