const axios = require('axios')

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
})


axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

module.exports = axiosInstance