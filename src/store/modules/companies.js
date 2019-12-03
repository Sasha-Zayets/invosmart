'use strict';

import axios from 'axios'
import merge from 'deepmerge'

const state = {
    companies: [],
    company_template : {
        company_name: ''
    }
};

const getters = {
    companies: state => state.companies,
    companyTemplate: state => () => merge({}, state.company_template),
};

const mutations = {
    setCompanies: (state, companies) => state.companies = companies,
    addCompany: (state, company) => state.companies.unshift(company),
};

const actions = {
    async fetchCompanies({commit, rootGetters}) {
        return axios({
            method: 'get',
            url: `http://invosmart.com:5010/api/v1/accounts/${rootGetters.accountId}/companies`,
            headers: {
                contentType: 'application/json; charset=utf-8',
                authorization: `Bearer ${rootGetters.accessToken}`
            }
        }).then(res => commit('setCompanies', res.data.result.companies));
    },

    async createCompany({commit, rootGetters}, company) {
        return axios({
            method: 'post',
            url: `http://invosmart.com:5010/api/v1/accounts/${rootGetters.accountId}/companies`,
            headers: {
                contentType: 'application/json; charset=utf-8',
                authorization: `Bearer ${rootGetters.accessToken}`,
            },
            data: company
        }).then(res => commit('addCompany', res.data.result.company));
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
