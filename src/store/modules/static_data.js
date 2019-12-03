'use strict';
import axios from 'axios'

const state = {
    indexCountries: 0,
    userCountries: '',
    countries: [
    ],
    priorityCountries: [],
    languages: [
        {
            value: 0,
            id: 0,
            name: 'Русский'
        },
        {
            value: 1,
            id: 1,
            name: 'English'
        },
        {
            value: 2,
            id: 2,
            name: 'Deutsch'
        }
    ],
    unit_types: [
        {
            value: 0,
            name: 'Другое'
        },
        {
            value: 1,
            name: 'Ящ.'
        },
        {
            value: 2,
            name: 'Упак.'
        },
        {
            value: 3,
            name: 'Маечка'
        },
        {
            value: 4,
            name: 'Короб.'
        }
    ],
    currencies: [
        {
            value: 0,
            name: 'USD $',
            sign: '$'
        },
        {
            value: 1,
            name: 'EUR €',
            sign: '€'
        }
    ]
    
};

const getters = {
    countries: state => state.countries,
    languages: state => state.languages,
    unitTypes: state => state.unit_types,
    currencies: state => state.currencies,
    userCountries: state => state.userCountries,
    indexCountries: state => state.indexCountries,
    priorityCountries: state => state.priorityCountries
};

const mutations = {
    setCountries: (state, payload) => {
        state.countries = payload

        const temp = []

        payload.filter(el => {
            if (el.id === 246 || el.id === 428 || el.id === 440 || el.id === 233) {
                temp.push(el)
            }
        })

        state.priorityCountries = temp
    },
    setUserCountries: (state, payload) => {
        state.countries.filter((el, index) => {
            if(el.code === payload) {
                state.userCountries = el.code
                state.indexCountries = parseInt(index)

                localStorage.setItem('countries', el.code)
                localStorage.setItem('countriesIndex', index)
            }
        })
    },
    setCountriesUser: (state, payload) => {
        state.userCountries = payload
    },
    setIndexCountries: (state, payload) => {
        state.indexCountries = payload
    }
};

const actions = {
    async userCountries ({commit}) {
        const response = await axios.get("https://ipinfo.io/?token=de204919741a86");
        commit('setUserCountries', response.data.country.toLowerCase())
    },
    async allCountries ({commit, rootGetters}, langCode) {
        return axios({
            method: 'get',
            url: `http://invosmart.com:5030/api/v1/countries/${langCode}`,
            headers: {
                contentType: 'application/json; charset=utf-8',
                authorization: `Bearer ${rootGetters.accessToken}`
            }
        }).then(res => {
            commit('setCountries', res.data.result.countries)
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};