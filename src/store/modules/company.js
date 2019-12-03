'use strict';

const state = {
    id: localStorage.getItem('company_id'),
};

const getters = {
    companyId: state => state.id,
};

const mutations = {
    setCompanyId: (state, companyId) => {
        state.id = companyId;
        localStorage.setItem('company_id', companyId);
    }
};

const actions = {};

export default {
    state,
    getters,
    mutations,
    actions
};