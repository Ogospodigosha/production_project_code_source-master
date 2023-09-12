import axios from 'axios'
import Cookies from "js-cookie";


// // export const SERVER_URL = 'http://192.168.0.60:8000'
// export const SERVER_URL = 'https://develop.onbank.online'
// export const PRODUCTION_URL = true

export const instance = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'frm': 'window.location.search' || null,
        'fronturl': window.location.origin
    },
    // baseURL: SERVER_URL
})

const token = (name: string) => Cookies.get(name)
instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token('Bearer')}`
    return config;
})
