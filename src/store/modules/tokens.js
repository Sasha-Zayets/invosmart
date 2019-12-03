'use strict';

import axios from 'axios';

const state = {
    access_token: localStorage.getItem('access_token'),
    refresh_token: localStorage.getItem('refresh_token'),
    validToken: false
};

const getters = {
    accessToken: state => state.access_token,
    refreshToken: state => state.refresh_token,
    validToken : state => state.validToken
};

const mutations = {
    setTokens: (state, tokens) => {
        state.access_token = tokens.access_token;
        state.refresh_token = tokens.refresh_token;

        localStorage.setItem('access_token', tokens.access_token);
        localStorage.setItem('refresh_token', tokens.refresh_token);
    },
    resetTokens: (state) => {
        state.access_token = '';
        state.refresh_token = '';

        localStorage.setItem('access_token', '');
        localStorage.setItem('refresh_token', '');
    },
    setValidToken: (state, payload) => {
        state.validToken = payload
    }
};

const actions = {
    login({commit}, auth) {
        return axios({
            method: 'post',
            url: `http://invosmart.com:5005/api/v1/tokens`,
            headers: {
                contentType: 'application/json; charset=utf-8',
                authorization: `Basic ${btoa(`${auth.email}:${auth.password}`)}`,
            },
        }).then(res => {
            let {tokens, account} = res.data.result;
            commit('setTokens', tokens);
            commit('setAccountId', account.id);
        });
    },

    refresh({commit, getters}) {
        return axios({
            method: 'put',
            url: `http://invosmart.com:5005/api/v1/tokens`,
            headers: {
                contentType: 'application/json; charset=utf-8',
                authorization: `Bearer ${getters.refreshToken}`,
            }
        }).then(res => {
            let {tokens, account} = res.data.result;
            commit('setTokens', tokens);
            commit('setAccountId', account.id);
        });
    },

    async logout({commit, getters}) {
        let accessToken = getters.accessToken;

        commit('resetTokens');

        return axios({
            method: 'delete',
            url: `http://invosmart.com:5005/api/v1/tokens`,
                headers: {
                contentType: 'application/json; charset=utf-8',
                authorization: `Bearer ${accessToken}`,
            },
        })
    },

    async validTokens ({commit}, token) {
        return axios({
            method: 'get',
            url: `http://invosmart.com:5005/api/v1/registration/confirm/${token}`,
                headers: {
                contentType: 'application/json; charset=utf-8'
            },
        }).then(res => {
            commit('setValidToken', true)
        })
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};