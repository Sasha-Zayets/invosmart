'use strict';
import axios from 'axios';

const state = {
    id: localStorage.getItem('account_id'),
    registrationValid: false,
    userInfo: {}
};

const getters = {
    accountId: state => state.id,
    userInfo: state => state.userInfo
};

const mutations = {
    setAccountId: (state, accountId) => {
        state.id = accountId;
        localStorage.setItem('account_id', accountId);
    },
    setRegistrationValid: (state, value) => {
        state.registrationValid = value
    },
    setUserInfo: (state, value) => {
        state.userInfo = value
    }
};

const actions = {
    async getUserInfo ({commit, rootGetters}) {
        return axios({
            method: 'get',
            url: `http://invosmart.com:5005/api/v1/accounts/${rootGetters.accountId}/data`,
            headers: {
                contentType: 'application/json; charset=utf-8',
                authorization: `Bearer ${rootGetters.accessToken}`,
            }
        }).then(({data}) => {
            console.log(data.result.data);
            
            commit('setUserInfo', data.result.data)
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};