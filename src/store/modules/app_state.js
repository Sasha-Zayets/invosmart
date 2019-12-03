'use strict';

const state = {
    active_workspace_area: localStorage.getItem('active_workspace_area'),
};

const getters = {
    activeWorkspaceArea: state => state.active_workspace_area,
};

const mutations = {
    setActiveWorkspaceArea: (state, activeWorkspaceArea) => {
        state.active_workspace_area = activeWorkspaceArea;
        localStorage.setItem('active_workspace_area', activeWorkspaceArea);
    }
};

const actions = {};

export default {
    state,
    getters,
    mutations,
    actions
};