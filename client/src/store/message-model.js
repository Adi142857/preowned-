import axiosInstance from '@/api/index.js'

export default {
    state: {
        chatDialog: false,
        chat: {
            messages: []
        },
    },
    mutations: {
        setChatDialog(state, payload) {
            state.chatDialog = payload
        },
        setChat(state, payload) {
            state.chat = payload
        },
        clearChat(state) {
            state.chat = {
                messages: []
            };
        }
    },
    actions: {
        openChat({ commit }, payload) {
            commit('setChatDialog', true)
            commit('loading', true);
            axiosInstance.post(`/chat/getOrCreateChat`, {
                productId: payload._id,
            })
                .then(response => {
                    commit('loading', false);
                    commit('setChat', response.data)
                })
                .catch(error => {
                    commit('loading', false);
                    console.log(error)
                })
        },
        sendMessage({ commit }, payload) {
            commit('loading', true);
            axiosInstance.post(`/chat/${payload.chatId}`, {
                message: payload.message
            }).then(response => {
                commit('loading', false);
                commit('setChat', response.data)
            }).catch(error => {
                commit('loading', false);
                console.log(error)
            })
        },
        closeChat({ commit }) {
            commit('setChatDialog', false)
            commit('clearChat');
        },
    },
}