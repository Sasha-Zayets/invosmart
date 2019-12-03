import Vue from 'vue'
import Vuex from 'vuex'

import global from './modules/global'
import app_state from './modules/app_state'
import account from './modules/account'
import company from './modules/company'
import tokens from './modules/tokens'
import companies from './modules/companies'
import products from './modules/products'
import contacts from './modules/contacts'
import invoices from './modules/invoices'
import static_data from './modules/static_data'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app_state,
    account,
    company,
    tokens,
    companies,
    products,
    contacts,
    invoices,
    static_data,
    global,
  }
});
