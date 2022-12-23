import auth from './auth-model'
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: false,
        isLoggedIn: localStorage.getItem('token') ? true : false,
        formDialog: false,
        syllabusDialog: false,
        resDialog: false,
        flash: {
            message: null,
            type: null,
            show: false
        },
        resource: {},
        resDetailsDialog: false,
    },
    mutations: {
        loading(state, payload) {
            state.loading = payload
        },
        setLoggedIn(state, payload) {
            state.isLoggedIn = payload.isLoggedIn
        },
        setFormDialog(state, payload) {
            state.formDialog = payload
        },
        setSyllabusDialog(state, payload) {
            state.syllabusDialog = payload
        },
        setResDialog(state, payload) {
            state.resDialog = payload
        },
        setResDetailsDialog(state, payload) {
            state.resDetailsDialog = payload
        },
        setResource(state, payload) {
            state.resource = payload
        },
        flashSuccess(state, payload) {
            state.flash.message = payload ? payload : 'Success!'
            state.flash.type = 'success'
            state.flash.show = true
        },
        flashError(state, payload) {
            state.flash.message = payload ? payload : 'Error :/'
            state.flash.type = 'error'
            state.flash.show = true
        },
        clearFlash(state) {
            state.flash = {
                message: null,
                type: null,
                show: false
            }
        }
    },
    modules: {
        auth
    }
})