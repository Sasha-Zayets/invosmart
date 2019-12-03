'use strict';

import axios from 'axios';
import merge from 'deepmerge'

function customize(items) {
    function customizeItem (item) {
        item._name = item.is_company ? item.company_name : `${item.first_name} ${item.last_name}`;
    }

    if(Array.isArray(items)) items.forEach(item => customizeItem(item));
    else customizeItem(items);
    
    return items;
}

const state = {
    contacts: [],
    contact_template : {
        is_company: true,
        first_name: '',
        last_name: '',
        client_id: '',
        nds_number: '',
        invoice_adds: '',
        postcode: '',
        locality: '',
        extra_info: '',
        phone_number: '',
        client_number: '',
        email: '',
        invoice_lang: 0,
        country: 0,
        company_name: '',
        contact: '',
        business_number: '',
        department: '',
        registry_code: '',
        additional_adds: '',
        comments: ''
    },
    showInfo: false,
    showPaginated: 0,
    nameInfo: 'info',
    validFormContacts: false,
    noValidError: false,
    showNotestInfo: false,
    nameNotesInfo: 'info'
};

const getters = {
    contacts: state => state.contacts,
    contact: state => id => {
        if(!id) return null;

        let res = state.contacts.filter(contact => contact.id === id);
        
        return res.length > 0 ? res[0] : null;
    },
    contactTemplate: state => () => merge({}, state.contact_template),
    contactValidForm: state => state.validFormContacts
};

const mutations = {
    setContacts: (state, contacts) => state.contacts = contacts,
    addContact: (state, contact) => state.contacts.unshift(contact),
    updateContact: (state, update) => {
        let index = state.contacts.findIndex(contact => contact.id === update.id);
        if(index !== -1) state.contacts.splice(index, 1, update);
    },
    deleteContact: (state, contactId) => state.contacts = state.contacts.filter(item => item.id !== contactId),
    setShowInfo: (state, value) => state.showInfo = value,
    setShowNotestInfo: (state, value) => state.showNotestInfo = value,
    setShowPaginated: (state, value) => state.showPaginated = value,
    setNameInfo: (state, value) => state.nameInfo = value,
    setNameNotesInfo: (state, value) => state.nameNotesInfo = value,
    setValidFormContacts: (state, value) => state.validFormContacts = value
};

const actions = {
    async fetchContacts({commit, rootGetters}) {
        return axios({
            method: 'get',
            url: `http://invosmart.com:5015/api/v1/accounts/${rootGetters.accountId}/companies/${rootGetters.companyId}/contacts`,
            headers: {
                contentType: 'application/json; charset=utf-8',
                authorization: `Bearer ${rootGetters.accessToken}`
            }
        }).then(res => commit('setContacts', customize(res.data.result.contacts)));
    },

    async createContact({commit, rootGetters}, contact) {
        return axios({
            method: 'post',
            url: `http://invosmart.com:5015/api/v1/accounts/${rootGetters.accountId}/companies/${rootGetters.companyId}/contacts`,
            headers: {
                contentType: 'application/json; charset=utf-8',
                authorization: `Bearer ${rootGetters.accessToken}`,
            },
            data: contact
        }).then(res => commit('addContact', customize(res.data.result.contact)));
    },

    async updateContact({commit, rootGetters}, contact) {
        return axios({
            method: 'put',
            url: `http://invosmart.com:5015/api/v1/accounts/${rootGetters.accountId}/companies/${rootGetters.companyId}/contacts/${contact.id}`,
            headers: {
                contentType: 'application/json; charset=utf-8',
                authorization: `Bearer ${rootGetters.accessToken}`,
            },
            data: contact
        }).then(res => commit('updateContact', customize(res.data.result.updated)));
    },

    async deleteContact({commit, rootGetters}, contactId) {
        return axios({
            method: 'delete',
            url: `http://invosmart.com:5015/api/v1/accounts/${rootGetters.accountId}/companies/${rootGetters.companyId}/contacts/${contactId}`,
            headers: {
                contentType: 'application/json; charset=utf-8',
                authorization: `Bearer ${rootGetters.accessToken}`,
            }
        }).then(res => commit('deleteContact', contactId));
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};