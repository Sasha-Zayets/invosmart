'use strict';

import axios from 'axios';
import merge from 'deepmerge'

const state = {
    products: [],
    product_template : {
        is_new: true,
        product_name: '',
        num: '',
        description: '',
        unit_type: 0,
        price: 0,
        nds: 0,
        nds_on: true,
        count: 0,
        discount: 0,
    },
    nameInfo: 'info',
    showInfo: false,
    validProducts: false,
};

const getters = {
    products: state => state.products,
    product: state => id => {
        let products = state.products.filter(product => product.id == id);
        return products.length > 0 ? products[0] : null;
    },
    productTemplate: state => () => merge({}, state.product_template),
};

const mutations = {
    setProducts: (state, products) => state.products = products,
    addProduct: (state, product) => state.products.unshift(product),
    updateProduct: (state, update) => {
        let index = state.products.findIndex(product => product.id === update.id);
        if(index !== -1) state.products.splice(index, 1, update);
    },
    deleteProduct: (state, productId) => state.products = state.products.filter(item => item.id !== productId),
    setValidProduct: (state, value) => state.validProducts = value,
};

const actions = {
    async fetchProducts({commit, rootGetters}) {
        return axios({
            method: 'get',
            url: `http://invosmart.com:5020/api/v1/accounts/${rootGetters.accountId}/companies/${rootGetters.companyId}/products`,
            headers: {
                contentType: 'application/json; charset=utf-8',
                authorization: `Bearer ${rootGetters.accessToken}`
            }
        }).then(res => commit('setProducts', res.data.result.products));
    },

    async createProduct({commit, rootGetters}, product) {
        console.log(product)
        return axios({
            method: 'post',
            url: `http://invosmart.com:5020/api/v1/accounts/${rootGetters.accountId}/companies/${rootGetters.companyId}/products`,
            headers: {
                contentType: 'application/json; charset=utf-8',
                authorization: `Bearer ${rootGetters.accessToken}`,
            },
            data: product
        }).then(res => commit('addProduct', res.data.result.product));
    },

    async updateProduct({commit, rootGetters}, product) {
        return axios({
            method: 'put',
            url: `http://invosmart.com:5020/api/v1/accounts/${rootGetters.accountId}/companies/${rootGetters.companyId}/products/${product.id}`,
            headers: {
                contentType: 'application/json; charset=utf-8',
                authorization: `Bearer ${rootGetters.accessToken}`,
            },
            data: product
        }).then(res => commit('updateProduct', res.data.result.updated));
    },

    async deleteProduct({commit, rootGetters}, productId) {
        return axios({
            method: 'delete',
            url: `http://invosmart.com:5020/api/v1/accounts/${rootGetters.accountId}/companies/${rootGetters.companyId}/products/${productId}`,
            headers: {
                contentType: 'application/json; charset=utf-8',
                authorization: `Bearer ${rootGetters.accessToken}`,
            }
        }).then(res => commit('deleteProduct', productId));
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
