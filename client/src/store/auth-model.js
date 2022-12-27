import axiosInstance from '@/apiClient'

export default {
    state: {
        token: localStorage.getItem('token') || '',
        refreshToken: localStorage.getItem('refresh-token') || '',
        userId: localStorage.getItem('user-id') || '',
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload.token
            localStorage.setItem('token', payload.token)
        },
        setUser(state, payload) {
            state.userId = payload.user
            localStorage.setItem('user-id', payload.user)
        },
        setRefreshToken(state, payload) {
            state.refreshToken = payload.refreshToken
            localStorage.setItem('refresh-token', payload.refreshToken)
        },
        logout(state) {
            state.token = ''
            state.refreshToken = ''
            state.user = ''
            localStorage.removeItem('token')
            localStorage.removeItem('refresh-token')
            localStorage.removeItem('user-id')
        }
    },
    actions: {
        login({ commit }, payload) {
            commit('loading', true)
            return new Promise((resolve) => {
                axiosInstance.post('/auth/login', payload)
                    .then(response => {
                        commit('loading', false)
                        commit('setToken', { token: response.data.token })
                        commit('setRefreshToken', { refreshToken: response.data.refreshToken })
                        commit('setUser', { user: response.data.user.id })
                        commit('setLoggedIn', { isLoggedIn: true })
                        commit('flashSuccess', 'Logged in successfully!')
                        resolve()
                    })
                    .catch(error => {
                        commit('loading', false)
                        if (error.response.data.message)
                            commit('flashError', error.response.data.message)
                        else
                            commit('flashError', 'Something went wrong!')
                    })
            })
        },
        register({ commit }, payload) {
            commit('loading', true)
            return new Promise((resolve) => {
                axiosInstance.post(`/auth/register`, payload)
                    .then(response => {
                        commit('loading', false)
                        commit('setToken', { token: response.data.token })
                        commit('setUser', { user: response.data.user.id })
                        commit('setRefreshToken', { refreshToken: response.data.refreshToken })
                        commit('setLoggedIn', { isLoggedIn: true })
                        resolve()
                    })
                    .catch(error => {
                        commit('loading', false)
                        if (error.response.data.message)
                            commit('flashError', error.response.data.message)
                        else
                            commit('flashError', 'Something went wrong!')
                    })
            })
        },
        logout({ commit }) {
            commit('logout')
            commit('setLoggedIn', { isLoggedIn: false })
            commit('flashSuccess', 'Logged out successfully!')
        },
        refreshTokens({ commit }, payload) {
            commit('setToken', { token: payload.token });
            commit('setRefreshToken', { refreshToken: payload.refreshToken });
        },
    }
}