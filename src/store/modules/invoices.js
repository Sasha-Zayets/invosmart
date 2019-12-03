'use strict';

import axios from 'axios';
import merge from 'deepmerge'

function customize(items) {
    function customizeItem (item) {
        item._number = `${item.prefix}${item.invoice_index}${item.suffix}`;
        item._contact = item.contact.is_company ? item.contact.company_name : `${item.contact.first_name} ${item.contact.last_name}`;
    }

    if(Array.isArray(items)) items.forEach(item => customizeItem(item));
    else customizeItem(items);
    
    return items;
}

const state = {
    invoices: [],
    invoice_template : {
        currency: 0,
        invoice_date: '',
        payment_term: '',
        prefix: '',
        suffix: '',
        reference_number: '',
        link: '',
        note: '',
        description_before: '',
        invoice_index: 0,

        contact: null,
        products: [],
    }
};

const getters = {
    invoices: state => state.invoices,
    invoiceTemplate: (state) => () => {

        return merge({}, state.invoice_template);
    },
};

const mutations = {
    setInvoices: (state, invoices) => state.invoices = invoices,
    addInvoice: (state, invoice) => state.invoices.unshift(invoice),
    updateInvoice: (state, update) => {
        let index = state.invoices.findIndex(invoice => invoice.id === update.id);
        if(index !== -1) state.invoices.splice(index, 1, update);
    },
    deleteInvoice: (state, invoiceId) => state.invoices = state.invoices.filter(item => item.id !== invoiceId),
};

const actions = {
    async fetchInvoices({commit, rootGetters}) {
        return axios({
            method: 'get',
            url: `http://invosmart.com:5025/api/v1/accounts/${rootGetters.accountId}/companies/${rootGetters.companyId}/invoices`,
            headers: {
                contentType: 'application/json; charset=utf-8',
                authorization: `Bearer ${rootGetters.accessToken}`
            }
        }).then(res => {
            commit('setInvoices', customize(res.data.result.invoices))
        });
    },

    async createInvoice({commit, rootGetters}, invoice) {
        return axios({
            method: 'post',
            url: `http://invosmart.com:5025/api/v1/accounts/${rootGetters.accountId}/companies/${rootGetters.companyId}/invoices`,
            headers: {
                contentType: 'application/json; charset=utf-8',
                authorization: `Bearer ${rootGetters.accessToken}`,
            },
            data: invoice
        }).then(res => commit('addInvoice', customize(res.data.result.invoice)));
    },

    async updateInvoice({commit, rootGetters}, invoice) {
        return axios({
            method: 'put',
            url: `http://invosmart.com:5025/api/v1/accounts/${rootGetters.accountId}/companies/${rootGetters.companyId}/invoices/${invoice.id}`,
            headers: {
                contentType: 'application/json; charset=utf-8',
                authorization: `Bearer ${rootGetters.accessToken}`,
            },
            data: invoice
        }).then(res => commit('updateInvoice', customize(res.data.result.updated)));
    },

    async deleteInvoice({commit, rootGetters}, invoiceId) {
        return axios({
            method: 'delete',
            url: `http://invosmart.com:5025/api/v1/accounts/${rootGetters.accountId}/companies/${rootGetters.companyId}/invoices/${invoiceId}`,
            headers: {
                contentType: 'application/json; charset=utf-8',
                authorization: `Bearer ${rootGetters.accessToken}`,
            }
        }).then(res => commit('deleteInvoice', invoiceId));
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
