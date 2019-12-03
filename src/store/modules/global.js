'use strict';

const state = {
    pageInfo: {},
    loading: false
};

const getters = {
    loading: state => state.loading
}

const mutations = {
    setPageInfo: (state, page) => {
        state.pageInfo = page
    },
    setLoading: (state, value) => {
        state.loading = value
    }
};

export default {
    state,
    getters,
    mutations
};